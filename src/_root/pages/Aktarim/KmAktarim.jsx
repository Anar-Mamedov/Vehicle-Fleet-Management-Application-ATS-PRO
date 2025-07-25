import React, { useState, useEffect } from "react";
import { Upload, Table, Button, Typography, Modal, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { stringSimilarity } from "./utils";
import * as XLSX from "xlsx";
import httpAktarim from "../../../api/httpAktarim";

const { Dragger } = Upload;
const { Option } = Select;
const { Title } = Typography;

const BaslikEslemeModal = ({ visible, onClose, excelHeaders, dbHeaders, onSave }) => {
  const [eslesmeler, setEslesmeler] = useState({});

  useEffect(() => {
    const otomatikEslesmeler = {};
    dbHeaders.slice(0, 2).forEach((dbHeader) => {
      let maxSimilarity = 0;
      let bestMatch = null;
      excelHeaders.forEach((excelHeader) => {
        const similarity = stringSimilarity(dbHeader, excelHeader);
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          bestMatch = excelHeader;
        }
      });
      if (bestMatch) {
        otomatikEslesmeler[dbHeader] = bestMatch;
      }
    });

    setEslesmeler(otomatikEslesmeler);
  }, [dbHeaders, excelHeaders]);

  const handleEslesmeChange = (dbHeader, excelHeader) => {
    setEslesmeler((prev) => ({ ...prev, [dbHeader]: excelHeader }));
  };

  const handleSave = () => {
    onSave(eslesmeler);
    onClose();
  };

  return (
    <Modal
      title="Başlık Eşleştirme"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Kaydet
        </Button>,
      ]}
    >
      <Table
        dataSource={dbHeaders
          .filter((header) => header !== "SIRANO") // 👈 filtreleme burada
          .map((header, index) => ({
            key: `${header}_${index}`,
            dbHeader: header,
          }))}
        columns={[
          { title: "Veritabanı Başlık", dataIndex: "dbHeader", key: "dbHeader" },
          {
            title: "Excel Başlık",
            dataIndex: "excelHeader",
            key: "excelHeader",
            render: (_, record) => (
              <Select
                style={{ width: "100%" }}
                placeholder="Excel başlığı seç"
                value={eslesmeler[record.dbHeader]}
                onChange={(value) => handleEslesmeChange(record.dbHeader, value)}
                allowClear // Kullanıcı boş bırakabilsin istersen bu da dursun
              >
                {excelHeaders.map((excelHeader) => (
                  <Option key={excelHeader} value={excelHeader}>
                    {excelHeader}
                  </Option>
                ))}
              </Select>
            ),
          },
        ]}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};

const KmAktarim = () => {
  const [fileList, setFileList] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [columns, setColumns] = useState([]);
  const [kontrolSonuclari, setKontrolSonuclari] = useState([]);
  const [eslemeModalVisible, setEslemeModalVisible] = useState(false);
  const [eslesmisVeriler, setEslesmisVeriler] = useState([]);
  const [isMapped, setIsMapped] = useState(false);
  const [eslesmisColumns, setEslesmisColumns] = useState([]);
  const [dbHeaders, setDbHeaders] = useState([]);
  const [tikSayisi, setTikSayisi] = useState(0);
  const [carpiSayisi, setCarpiSayisi] = useState(0);

  // Excel serial date -> JS Date
  function excelSerialToJSDate(serial) {
    // Excel serial tarihinde tam sayı kısmı gün, ondalık kısım saat
    const utc_days = Math.floor(serial - 25569);
    const utc_seconds = Math.round((serial - 25569 - utc_days) * 86400);
    const date = new Date(utc_days * 86400 * 1000);
    date.setSeconds(date.getSeconds() + utc_seconds);
    return date;
  }

  // Excel serial time -> "HH:mm:ss"
  function excelSerialToTimeString(serial) {
    const totalSeconds = Math.round(serial * 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  // Date objesi -> "dd.mm.yyyy"
  function formatDateTime(dateObj) {
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return "";
    const pad = (n) => n.toString().padStart(2, "0");
    return `${pad(dateObj.getDate())}.${pad(dateObj.getMonth() + 1)}.${dateObj.getFullYear()}`;
  }

  // Veritabanı başlıklarını getir (ID ile bitenleri hariç tut)
  const fetchDbHeaders = async () => {
    try {
      const response = await httpAktarim.post("/api/KmAktarim/kmbaslik");
      const filteredHeaders = response.data.filter(
        (header) =>
          !header.toUpperCase().endsWith("_ID") &&
          header.toUpperCase() !== "ID" &&
          header.toUpperCase() !== "SIRANO" &&
          header.toUpperCase() !== "SEFERSIRANO" &&
          header.toUpperCase() !== "YAKITSIRANO"
      );
      setDbHeaders(filteredHeaders);
    } catch (error) {
      console.error("Veritabanı başlıkları alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchDbHeaders();
  }, []);

  // Excel dosya yükleme handler'ı
  const handleUpload = (info) => {
    const file = info.fileList[info.fileList.length - 1];
    if (file && file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const ab = e.target.result;
        const wb = XLSX.read(ab, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const headers = data[0];

        const dynamicColumns = headers.map((header) => ({
          title: header,
          dataIndex: header,
          key: header,
          ellipsis: true,
        }));
        setColumns(dynamicColumns);

        const jsonData = data.slice(1).map((row, index) => {
          let rowData = {};
          headers.forEach((header, i) => {
            let cellValue = row[i] || "";

            if (header.toUpperCase() === "TARIH") {
              if (typeof cellValue === "number") {
                // Excel serial date
                const dateObj = excelSerialToJSDate(cellValue);
                cellValue = formatDateTime(dateObj);
              } else if (typeof cellValue === "string" && cellValue.trim() !== "") {
                // Tarih string ise, örn: "22.06.2025"
                // Burada dilersen kontrol edip parse da edebilirsin
                // Ya da olduğu gibi bırakabilirsin
                cellValue = cellValue.trim();
              } else {
                // Boş veya geçersizse boş bırak
                cellValue = "";
              }
            }

            if (header.toUpperCase() === "SAAT" && typeof cellValue === "number") {
              cellValue = excelSerialToTimeString(cellValue);
            }

            rowData[header] = cellValue;
          });
          return { key: index, ...rowData };
        });

        console.log("JSON Data örnek:", jsonData.slice(0, 3)); // Burada kesin sonucu kontrol et
        setJsonData(jsonData);
        setIsFileUploaded(true);
        setKontrolSonuclari([]); // Önceki kontrol sonuçlarını temizle
      };
      reader.readAsArrayBuffer(file.originFileObj);
    }
    setFileList(info.fileList);
  };

  // API kontrol işlemi
  const handleKontrolEt = async () => {
    try {
      console.log("Eslesmis Veriler Örneği (ilk 5):", eslesmisVeriler.slice(0, 5));

      const kontrolList = eslesmisVeriler
        .filter((d) => d.TARIH && d.SAAT && d.YENI_KM !== undefined && d.YENI_KM !== null)
        .map((d) => {
          let dateObj;
          if (typeof d.TARIH === "number") {
            dateObj = excelSerialToJSDate(d.TARIH);
          } else if (typeof d.TARIH === "string") {
            const convertedValue = d.TARIH.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$2/$1/$3");
            dateObj = new Date(convertedValue);
          } else {
            dateObj = new Date(d.TARIH);
          }
          const tarihStr = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd

          let saatStr = d.SAAT;
          if (typeof d.SAAT === "number") {
            saatStr = excelSerialToTimeString(d.SAAT);
          }

          return {
            Plaka: String(d.PLAKA || "").trim(),
            Tarih: tarihStr,
            Saat: saatStr,
            GuncelKm: Number(d.YENI_KM),
          };
        });

      console.log("Filtreye Takılmayan Kayıtlar (kontrolList):", kontrolList);

      const eksikVeriler = eslesmisVeriler.filter((d) => !d.TARIH || !d.SAAT || d.GUNCELKM === undefined || d.GUNCELKM === null);
      console.log("Filtre Dışında Kalan Eksik Kayıtlar:", eksikVeriler);

      if (kontrolList.length === 0) {
        message.warning("Geçerli tarih, saat ve KM içeren kayıt bulunamadı.");
        return;
      }

      const response = await httpAktarim.post("/api/KmAktarim/kontrolkm", kontrolList);

      const merged = eslesmisVeriler.map((d) => {
        const found = response.data.find((x) => x.plaka?.trim().toLowerCase() === (d.PLAKA || "").trim().toLowerCase());
        const sonucMesajlari = found?.sonuc?.map((s) => s.message) || [];
        return { ...d, Sonuc: sonucMesajlari };
      });

      const tik = merged.filter((item) => (item.Sonuc?.length ?? 0) === 0).length;
      const carpi = merged.filter((item) => (item.Sonuc?.length ?? 0) > 0).length;

      setTikSayisi(tik);
      setCarpiSayisi(carpi);
      setKontrolSonuclari(merged);

      message.success("Kontrol tamamlandı.");
    } catch (err) {
      console.error("API hata:", err);
      message.error("API kontrol hatası.");
    }
  };

  // Kontrol Sonucu kolonunu ekle
  const kontrolColumns = [
    ...columns,
    {
      title: "Kontrol Sonucu",
      dataIndex: "Sonuc",
      key: "kontrol",
      render: (messages) =>
        messages?.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} style={{ color: "red" }}>
              {msg}
            </div>
          ))
        ) : (
          <div style={{ color: "green" }}>✔️</div>
        ),
    },
  ];

  // Eşleştirme sonrası verileri düzenle ve set et
  const handleEslesmeKaydet = (eslesmeler) => {
    const eslesmisVeri = jsonData.map((row) => {
      let newRow = {};

      Object.entries(eslesmeler).forEach(([dbHeader, excelHeader]) => {
        let value = row[excelHeader];

        if (dbHeader.toUpperCase() === "TARIH" && typeof value === "string") {
          const convertedValue = value.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$2/$1/$3");
          const parsed = new Date(convertedValue);
          newRow[dbHeader] = isNaN(parsed.getTime()) ? "" : formatDateTime(parsed);
        } else {
          newRow[dbHeader] = value;
        }
      });

      return newRow;
    });

    const newColumns = Object.entries(eslesmeler)
      .filter(([_, excelHeader]) => !!excelHeader)
      .map(([dbHeader]) => ({
        title: dbHeader,
        dataIndex: dbHeader,
        key: dbHeader,
      }));

    setEslesmisVeriler(eslesmisVeri);
    setEslesmisColumns(newColumns);
    setIsMapped(true);
  };

  // Veritabanına kaydet
  const handleVeritabaninaKaydet = async () => {
    const temizKayitlar = kontrolSonuclari.filter((item) => !item.Sonuc || item.Sonuc.length === 0);

    if (temizKayitlar.length === 0) {
      message.warning("Gönderilecek sorunsuz kayıt bulunamadı.");
      return;
    }

    const toSqlDate = (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      const pad = (n) => n.toString().padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const kmKayitlar = temizKayitlar.map((item) => ({
      plaka: String(item.PLAKA).trim(),
      guncelKm: item.GUNCELKM ? Number(item.GUNCELKM) : null,
      tarih: toSqlDate(item.TARIH),
      saat: item.SAAT || "00:00",
    }));

    try {
      await httpAktarim.post("/api/KmAktarimKayit/kmaktar", kmKayitlar);
      message.success("KM verileri başarıyla kaydedildi.");

      // Kaydedilen temiz kayıtları kaldır, sadece hatalıları bırak
      const hataliKayitlar = kontrolSonuclari.filter((item) => item.Sonuc && item.Sonuc.length > 0);
      setKontrolSonuclari(hataliKayitlar);
    } catch (error) {
      console.error("Veri kaydederken hata oluştu:", error);
      message.error("Kaydetme işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Button type="default" href="/file/ornek-km-sablonu.xlsx" download>
          Km Aktarım Şablonunu İndir
        </Button>
      </div>

      <h4>LÜTFEN KM AKTARIMI İŞLEMİ İÇİN YUKARIDAKİ BUTONA TIKLAYARAK ŞABLONU İNDİRİNİZ.</h4>

      <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "10px" }}>
        <Dragger fileList={fileList} onChange={handleUpload} beforeUpload={() => false} multiple={false} accept=".xlsx, .xls">
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Dosyayı sürükleyip buraya bırakın ya da tıklayın.</p>
          <p className="ant-upload-text">(Yalnızca Excel Dosyası)</p>
        </Dragger>
      </div>

      {isFileUploaded && <h4>KM LİSTESİ AKTARIMI İÇİN EXCEL DOSYASINDAKİ TABLO BAŞLIKLARI İLE VERİTABANI BAŞLIKLARINI EŞLEŞTİRMENİZ GEREKMEKTEDİR.</h4>}

      {isFileUploaded && (
        <>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Button key="submit" type="primary" onClick={() => setEslemeModalVisible(true)}>
              Başlıkları Eşleştir
            </Button>
          </div>

          <h4>Dosyası İçeriği:</h4>
          <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "20px" }}>
            <Table
              columns={(eslesmisColumns.length > 0 ? eslesmisColumns : columns).map((col) => ({
                ...col,
                width: col.width || 150, // varsayılan genişlik ver
                ellipsis: true, // taşma varsa üç nokta
              }))}
              dataSource={eslesmisVeriler.length > 0 ? eslesmisVeriler : jsonData}
              pagination={false}
              rowKey="PLAKA"
              scroll={{ x: "max-content" }} // yatay kaydırma aktif
            />
          </div>
        </>
      )}

      <BaslikEslemeModal
        visible={eslemeModalVisible}
        onClose={() => setEslemeModalVisible(false)}
        excelHeaders={columns.map((col) => col.title)}
        dbHeaders={dbHeaders}
        onSave={handleEslesmeKaydet}
      />

      {isMapped && (
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Button key="submit" type="primary" onClick={handleKontrolEt} style={{ backgroundColor: "green", borderColor: "white" }}>
            Kontrol Et
          </Button>
        </div>
      )}

      {kontrolSonuclari.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Kontrol Sonuçları:</h4>
          <p>
            ✅ Aktarım İçin Uygun: {tikSayisi} | ❌ Hata: {carpiSayisi}
          </p>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <Table
              columns={[
                ...eslesmisColumns,
                {
                  title: "Sonuç",
                  dataIndex: "Sonuc",
                  key: "plaka",
                  render: (text) => {
                    const errors = Array.isArray(text) ? text : [];
                    return errors.length > 0 ? <span style={{ color: "red" }}>❌ {errors.join(", ")}</span> : <span style={{ color: "green" }}>✅ Hata Yok</span>;
                  },
                },
              ]}
              dataSource={kontrolSonuclari}
              pagination={false}
              rowKey="PLAKA"
            />
          </div>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Button
              key="devam"
              type="primary"
              onClick={handleVeritabaninaKaydet} // ← fonksiyon burada
            >
              Veritabanına Kaydet
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default KmAktarim;

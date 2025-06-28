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

const KazaAktarim = () => {
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

  function excelDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    const total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds - hours * 3600) / 60);

    date_info.setHours(hours);
    date_info.setMinutes(minutes);
    date_info.setSeconds(seconds);

    return date_info;
  }

  const formatDateTime = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return ""; // 🔐 Geçersizse boş string dön

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  const fetchDbHeaders = async () => {
    try {
      const response = await httpAktarim.post("/api/KazaAktarim/kazabaslik");

      // ID ile biten veya tamamen ID olanları filtrele
      const filteredHeaders = response.data.filter((header) => !header.toUpperCase().endsWith("_ID") && header.toUpperCase() !== "ID" && header.toUpperCase() !== "SIRANO");

      setDbHeaders(filteredHeaders);
    } catch (error) {
      console.error("Veritabanı başlıkları alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchDbHeaders();
  }, []);

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
                const dateObj = excelDateToJSDate(cellValue);
                cellValue = formatDateTime(dateObj); // geçerli tarih garantili
              } else if (typeof cellValue === "string" || cellValue instanceof Date) {
                const dateObj = new Date(cellValue);
                if (!isNaN(dateObj.getTime())) {
                  cellValue = formatDateTime(dateObj);
                } else {
                  cellValue = ""; // Geçersiz string varsa temizle
                }
              }
            }

            rowData[header] = cellValue;
          });
          return { key: index, ...rowData };
        });

        setJsonData(jsonData);
        setIsFileUploaded(true);
        setKontrolSonuclari([]); // önceki kontrol sonuçlarını temizle
      };
      reader.readAsArrayBuffer(file.originFileObj);
    }
    setFileList(info.fileList);
  };

  function toSqlDateTime(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) return null;

    const pad = (n) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }

  // API kontrol işlemi
  const handleKontrolEt = async () => {
    try {
      const kontrolList = eslesmisVeriler
        .filter((d) => d.TARIH !== undefined && d.TARIH !== null && d.TARIH !== "")
        .map((d) => {
          let dateObj;

          if (typeof d.TARIH === "number") {
            dateObj = excelDateToJSDate(d.TARIH);
          } else if (typeof d.TARIH === "string") {
            const convertedValue = d.TARIH.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$2/$1/$3");
            dateObj = new Date(convertedValue);
          } else {
            dateObj = new Date(d.TARIH);
          }

          return {
            plaka: String(d.PLAKA || "").trim(),
            kazaTarih: dateObj.toISOString(), // ISO format kullanılıyor
            surucu: d.SURUCUKOD ? String(d.SURUCUKOD).trim() : null,
          };
        })
        .filter((item) => item.kazaTarih !== null);

      if (kontrolList.length === 0) {
        message.warning("Geçerli kaza tarihi olan kayıt bulunamadı.");
        return;
      }

      // Yeni API'ye gönderiyoruz
      const response = await httpAktarim.post("/api/KazaAktarim/kazakontrol", kontrolList);

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

      message.success("Kaza kontrolü tamamlandı.");
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

  const handleEslesmeKaydet = (eslesmeler) => {
    const eslesmisVeri = jsonData.map((row) => {
      let newRow = {};

      Object.entries(eslesmeler).forEach(([dbHeader, excelHeader]) => {
        let value = row[excelHeader];

        // TARIH kolonunu yeniden parse et
        if (dbHeader.toUpperCase() === "TARIH" && typeof value === "string") {
          // Türkçe tarih stringini İngilizce parse edilebilir hale getir
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

  const handleVeritabaninaKaydet = async () => {
    const temizKayitlar = kontrolSonuclari.filter((item) => !item.Sonuc || item.Sonuc.length === 0);

    if (temizKayitlar.length === 0) {
      message.warning("Gönderilecek sorunsuz kayıt bulunamadı.");
      return;
    }

    const toSqlDateTime = (dateStr) => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return null;
      const pad = (n) => n.toString().padStart(2, "0");
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    const apiFormatKayitlar = temizKayitlar.map((item) => ({
      plaka: item.PLAKA,
      kazaTarih: toSqlDateTime(item.TARIH),
      surucu: item.SURUCU || null,
      lokasyon: item.LOKASYON || null,
      aciklama: item.ACIKLAMA || null,
      karsiPlaka: item.KARSIPLAKA || null,
      karsiSurucu: item.KARSISURUCU || null,
      karsiSigorta: item.KARSISIGORTA || null,
      surucuKasli: item.SURUCUKASLI || null,
      surucuKtali: item.SURUCKUTALI || null,
      geriOdemeTarih: toSqlDateTime(item.GERIODEMETARIH),
      faturaTarih: toSqlDateTime(item.FATURATARIH),
      geriOdemeTutar: item.GERIODEMETUTAR ? Number(item.GERIODEMETUTAR) : null,
      faturaTutar: item.FATURATUTAR ? Number(item.FATURATUTAR) : null,
      belgeNo: item.BELGENO || null,
      bankaHesap: item.BANKAHESAP || null,
      bolge: item.BOLGE || null,
      saat: item.SAAT || null,
      aracKm: item.ARACKM ? Number(item.ARACKM) : null,
      sigortaSiraNo: item.SIGORTASIRANO ? Number(item.SIGORTASIRANO) : null,
      servisSiraNo: item.SERVISSIRANO ? Number(item.SERVISSIRANO) : null,
      geriOdemeBanka: item.GERIODEMEBANKA || null,
      geriOdemeAciklama: item.GERIODEMEACIKLAMA || null,
      hasarNo: item.HASARNO || null,
      kazaTuru: item.KAZATURU || null,
      kazaSekli: item.KAZASEKLI || null,
      asliKusur: item.ASLIKUSUR || null,
      taliKusur: item.TALIKUSUR || null,
      banka: item.BANKA || null,
      kazaOzelAlan1: item.KAZAOZELALAN1 || null,
      kazaOzelAlan2: item.KAZAOZELALAN2 || null,
      kazaOzelAlan3: item.KAZAOZELALAN3 || null,
      kazaOzelAlan4: item.KAZAOZELALAN4 || null,
      kazaOzelAlan5: item.KAZAOZELALAN5 || null,
      kazaOzelAlan6: item.KAZAOZELALAN6 || null,
      kazaOzelAlan7: item.KAZAOZELALAN7 || null,
      kazaOzelAlan8: item.KAZAOZELALAN8 || null,
    }));

    try {
      await httpAktarim.post("/api/KazaAktarim/kazaaktar", apiFormatKayitlar);
      message.success("Veritabanına başarıyla kaydedildi.");

      // Başarıyla kaydedilenleri sil, hatalılar kalsın
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
        <Button type="default" href="/file/ornek-kaza-sablonu.xlsx" download>
          Kaza Aktarım Şablonunu İndir
        </Button>
      </div>

      <h4>LÜTFEN KAZA AKTARIMI İŞLEMİ İÇİN YUKARIDAKİ BUTONA TIKLAYARAK ŞABLONU İNDİRİNİZ.</h4>

      <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "10px" }}>
        <Dragger fileList={fileList} onChange={handleUpload} beforeUpload={() => false} multiple={false} accept=".xlsx, .xls">
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Dosyayı sürükleyip buraya bırakın ya da tıklayın.</p>
          <p className="ant-upload-text">(Yalnızca Excel Dosyası)</p>
        </Dragger>
      </div>

      {isFileUploaded && <h4>KAZA LİSTESİ AKTARIMI İÇİN EXCEL DOSYASINDAKİ TABLO BAŞLIKLARI İLE VERİTABANI BAŞLIKLARINI EŞLEŞTİRMENİZ GEREKMEKTEDİR.</h4>}

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

export default KazaAktarim;

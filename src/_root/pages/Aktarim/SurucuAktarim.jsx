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
          .filter((header) => header !== "DORSE_PLAKA") // 👈 filtreleme burada
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

const AracAktarim = () => {
  const [fileList, setFileList] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [kontrolSonuclari, setKontrolSonuclari] = useState([]);
  const [eslemeModalVisible, setEslemeModalVisible] = useState(false);
  const [eslesmisVeriler, setEslesmisVeriler] = useState([]);
  const [isMapped, setIsMapped] = useState(false);
  const [eslesmisColumns, setEslesmisColumns] = useState([]);
  const [dbHeaders, setDbHeaders] = useState([]);
  const [tikSayisi, setTikSayisi] = useState(0);
  const [carpiSayisi, setCarpiSayisi] = useState(0);

  const fetchDbHeaders = async () => {
    try {
      const response = await httpAktarim.post("/api/SurucuAktarim/surucubaslik");

      // ID ile biten veya tamamen ID olanları filtrele
      const filteredHeaders = response.data.filter((header) => !header.toUpperCase().endsWith("_ID") && header.toUpperCase() !== "ID" && header.toUpperCase() !== "SURUCUKOD");

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
            rowData[header] = row[i] || "";
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

  // API kontrol işlemi
  const handleKontrolEt = async () => {
    try {
      // API'ye gönderilecek sürücü + lokasyon listesi
      const kontrolList = eslesmisVeriler.map((d) => ({
        Isim: String(d.ISIM || ""), // API modeline uygun: Isim
        lokasyon: String(d.BOLGE || ""), // API modeline uygun: Lokasyon
      }));

      const response = await httpAktarim.post("/api/SurucuAktarim/kontrolsurucu", kontrolList);

      const merged = eslesmisVeriler.map((d) => {
        const matched = response.data.find(
          (x) => x.Surucu?.trim().toLowerCase() === d.SURUCU?.trim().toLowerCase() && x.Lokasyon?.trim().toLowerCase() === d.BOLGE?.trim().toLowerCase()
        );
        const sonucMesajlari = matched ? matched.Sonuc?.map((s) => s.Message) || [] : [];
        return { ...d, Sonuc: sonucMesajlari };
      });

      // ✔ ve ❌ sayıları
      const tik = merged.filter((item) => (item.Sonuc?.length ?? 0) === 0).length;
      const carpi = merged.filter((item) => (item.Sonuc?.length ?? 0) > 0).length;
      setTikSayisi(tik);
      setCarpiSayisi(carpi);

      setKontrolSonuclari(merged);
      message.success("Sürücü ve Lokasyon kontrolü tamamlandı.");
    } catch (err) {
      console.error("API hata:", err);
      message.error("Sürücü kontrol API hatası.");
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
        if (excelHeader) {
          newRow[dbHeader] = row[excelHeader];
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

    const temizKayitlarAPIFormat = temizKayitlar.map((item) => ({
      SurucuKod: item.SURUCUKOD,
      Isim: item.SURUCU,
      SskNo: item.SSKNO,
      Ehliyet: item.EHLIYET,
      Sinif: item.SINIF,
      EhliyetNo: item.EHLIYETNO,
      Bolge: item.BOLGE,
      KanGrubu: item.KANGRUBU,
      DogumTarih: item.DOGUMTARIH,
      IsTarih: item.ISTARIH,
      AyrilmaTarih: item.AYRILMATARIH,
      Adres: item.ADRES,
      Il: item.IL,
      Ilce: item.ILCE,
      Telefon1: item.TELEFON1,
      Telefon2: item.TELEFON2,
      Fax: item.FAX,
      Gsm: item.GSM,
      CezaPuan: item.CEZAPUAN,
      Aciklama: item.ACIKLAMA,
      Unvan: item.UNVAN,
      TcKimlikNo: item.TCKIMLIKNO,
      BelgeNo: item.MYB_BELGENO,
      VerilisTarih: item.MYB_VERILISTARIH,
      MybTuru: item.MYB_TURU,
      MybKapsadigiDiger: item.MYB_KAPSADIGI_DIGER,
      KimlikSeriNo: item.KIMLIK_SERINO,
      BabaAdi: item.BABA_ADI,
      AnaAdi: item.ANA_ADI,
      DogumYeri: item.DOGUM_YERI,
      MedeniHali: item.MEDENI_HALI,
      Dini: item.DINI,
      KayitliOlduguIl: item.KAYITLIOLDUGUIL,
      KayitliOlduguIlce: item.KAYITLIOLDUGUILCE,
      MahalleKoy: item.MAHALLEKOY,
      KimlikCiltNo: item.CILTNO,
      KimlikAileSiraNo: item.AILESIRANO,
      KimlikSiraNo: item.SIRANO,
      KimlikVerildigiYer: item.VERILDIGIYER,
      KimlikVerilisNedeni: item.VERILISNEDENI,
      KimlikKayitNo: item.KAYITNO,
      KimlikVerilisTarih: item.VERILISTARIH,
      VergiNo: item.VERGINO,
      EhliyetVerildigiIlIlce: item.EHLIYETVERILDIGIIL,
      EhliyetBelgeTarih: item.EHLIYETBELGETARIH,
      EhliyetSeriNo: item.EHLIYETSERINO,
      EhliyetKullanıldigiCihazProtez: item.EHLIYETCIHAZ,
      EgitimDurumu: item.EGITIMDURUMU,
      MezunOlduguOkul: item.OKUL,
      MezunOlduguBolum: item.BOLUM,
      MezuniyetTarih: item.MEZUNIYETTARIH,
      OzelAlan1: item.SURUCUOZELALAN1,
      OzelAlan2: item.SURUCUOZELALAN2,
      OzelAlan3: item.SURUCUOZELALAN3,
      OzelAlan4: item.SURUCUOZELALAN4,
      OzelAlan5: item.SURUCUOZELALAN5,
      OzelAlan6: item.SURUCUOZELALAN6,
      OzelAlan7: item.SURUCUOZELALAN7,
      OzelAlan8: item.SURUCUOZELALAN8,
      Lokasyon: item.BOLGE, // Lokasyon tanımı gönderiliyor
      Departman: item.DEPARTMAN,
      SurucuTip: item.SURUCUTIP,
      SurucuGorev: item.SURUCUGOREV,
    }));

    try {
      await httpAktarim.post("/api/SurucuAktarimKayit/surucuaktar", temizKayitlarAPIFormat);
      message.success("Sürücüler başarıyla kaydedildi.");

      const hataliKayitlar = kontrolSonuclari.filter((item) => item.kontrolMesaji && item.kontrolMesaji.trim() !== "");
      setKontrolSonuclari(hataliKayitlar);
    } catch (error) {
      console.error("Sürücü kaydederken hata:", error);
      message.error("Sürücü kaydı sırasında hata oluştu.");
    }
  };

  return (
    <>
      <div style={{ marginBottom: 15 }}>
        <Button type="default" href="/file/ornek-surucu-sablonu.xlsx" download>
          Örnek Excel Şablonunu İndir
        </Button>
      </div>

      <h4>LÜTFEN SÜRÜCÜ AKTARIMI İŞLEMİ İÇİN YUKARIDAKİ BUTONA TIKLAYARAK ÖRNEK ŞABLONU İNDİRİNİZ.</h4>

      <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "10px" }}>
        <Dragger fileList={fileList} onChange={handleUpload} beforeUpload={() => false} multiple={false} accept=".xlsx, .xls">
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Dosyayı sürükleyip buraya bırakın ya da tıklayın.</p>
          <p className="ant-upload-text">(Yalnızca Excel Dosyası)</p>
        </Dragger>
      </div>

      {isFileUploaded && <h4>SÜRÜCÜ LİSTESİ AKTARIMI İÇİN EXCEL DOSYASINDAKİ TABLO BAŞLIKLARI İLE VERİTABANI BAŞLIKLARINI EŞLEŞTİRMENİZ GEREKMEKTEDİR.</h4>}

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

export default AracAktarim;

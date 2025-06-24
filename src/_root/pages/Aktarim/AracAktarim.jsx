import React, { useState, useEffect } from "react";
import { Upload, Table, Button, Typography, Modal, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { stringSimilarity } from './utils';
import * as XLSX from "xlsx";
import httpAktarim from "../../../api/httpAktarim";

const { Dragger } = Upload;
const { Option } = Select;
const { Title } = Typography;

const BaslikEslemeModal = ({ visible, onClose, excelHeaders, dbHeaders, onSave }) => {
    const [eslesmeler, setEslesmeler] = useState({});

    useEffect(() => {
    const otomatikEslesmeler = {};
    dbHeaders.slice(0, 6).forEach((dbHeader) => {
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
      <Button key="back" onClick={onClose}>İptal</Button>,
      <Button key="submit" type="primary" onClick={handleSave}>Kaydet</Button>,
    ]}
  >
    <Table
      dataSource={dbHeaders
        .filter((header) => header !== "DORSE_PLAKA") // 👈 filtreleme burada
        .map((header, index) => ({
          key: `${header}_${index}`,
          dbHeader: header,
        }))
      }
      columns={[
        { title: 'Veritabanı Başlık', dataIndex: 'dbHeader', key: 'dbHeader' },
        {
          title: 'Excel Başlık',
          dataIndex: 'excelHeader',
          key: 'excelHeader',
          render: (_, record) => (
            <Select
              style={{ width: '100%' }}
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
    const response = await httpAktarim.post("/api/AracAktarim/aracbaslik");

    // ID ile biten veya tamamen ID olanları filtrele
    const filteredHeaders = response.data.filter(
      (header) =>
    !header.toUpperCase().endsWith("_ID") &&
    header.toUpperCase() !== "ID" &&
    header.toUpperCase() !== "DORSE_PLAKA"
    );

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
    const kontrolList = eslesmisVeriler.map((d) => ({
      plaka: String(d.PLAKA || ""),
      lokasyon: String(d.BOLGE || ""),
      yakitTipi: String(d.YAKITTIP || ""),
      surucu: String(d.SURUCU || ""),
    }));

    const response = await httpAktarim.post("/api/AracAktarim/kontrolarac", kontrolList);

    const merged = eslesmisVeriler.map((d) => {
      const found = response.data.find(
        (x) => x.plaka?.trim().toLowerCase() === d.PLAKA?.trim().toLowerCase()
      );
      const sonucMesajlari = found ? found.sonuc?.map((s) => s.message) || [] : [];
      return { ...d, Sonuc: sonucMesajlari };
    });

    // ✅ Burada ✔ ve ❌ sayılarını hesaplıyoruz
    const tik = merged.filter(item => (item.Sonuc?.length ?? 0) === 0).length;
    const carpi = merged.filter(item => (item.Sonuc?.length ?? 0) > 0).length;
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
  const temizKayitlar = kontrolSonuclari.filter(item => !item.Sonuc || item.Sonuc.length === 0);

  if (temizKayitlar.length === 0) {
    message.warning("Gönderilecek sorunsuz kayıt bulunamadı.");
    return;
  }

  const temizKayitlarAPIFormat = temizKayitlar.map(item => ({
    plaka: item.PLAKA,
    aracTipi: item.ARACTIP,
    lokasyon: item.BOLGE,
    marka: item.MARKA,
    model: item.MODEL,
    yakitTipi: item.YAKITTIP,
    guncelKm: item.GUNCELKM,
    uretimYili: item.URETIMYILI,
    aracGrubu: item.GRUP,
    aracCinsi: item.ARACCINSI,
    renk: item.RENK,
    aracDurumu: item.ARACDURUMU,
    mulkiyet: item.MULKIYET,
    departman: item.DEPARTMAN,
    surucu: item.SURUCU,
    muayeneTarihi: item.MUAYENETARIHI,
    sozlesmeTarihi: item.SOZLESMETARIHI,
    egzosEmisyonTarihi: item.EGZOSEMISSYONTARIHI,
    vergiTarihi: item.VERGITARIHI,
    aracOzelAlan1: item.ARACOZELALAN1,
    aracOzelAlan2: item.ARACOZELALAN2,
    aracOzelAlan3: item.ARACOZELALAN3,
    aracOzelAlan4: item.ARACOZELALAN4,
    aracOzelAlan5: item.ARACOZELALAN5,
    aracOzelAlan6: item.ARACOZELALAN6,
    aracOzelAlan7: item.ARACOZELALAN7,
    aracOzelAlan8: item.ARACOZELALAN8,
  }));

  try {
    await httpAktarim.post("/api/AracAktarimKayit/aracaktar", temizKayitlarAPIFormat);
    message.success("Veritabanına başarıyla kaydedildi.");

    const hataliKayitlar = kontrolSonuclari.filter(item => item.kontrolMesaji && item.kontrolMesaji.trim() !== "");
    setKontrolSonuclari(hataliKayitlar);
  } catch (error) {
    console.error("Veri kaydederken hata oluştu:", error);
    message.error("Kaydetme işlemi sırasında bir hata oluştu.");
  }
};

  return (
    <>

    <div style={{ marginBottom: 15 }}>
      <Button type="default" href="/public/file/ornek-arac-sablonu.xlsx" download>
        Araç Aktarım Şablonunu İndir
      </Button>
    </div>

    <h4>
      LÜTFEN ARAÇ AKTARIMI İŞLEMİ İÇİN YUKARIDAKİ BUTONA TIKLAYARAK ÖRNEK ŞABLONU İNDİRİNİZ.
    </h4>

    <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '10px' }}>
      <Dragger
        fileList={fileList}
        onChange={handleUpload}
        beforeUpload={() => false}
        multiple={false}
        accept=".xlsx, .xls"
      >
        <p className="ant-upload-drag-icon"><UploadOutlined /></p>
        <p className="ant-upload-text">Dosyayı sürükleyip buraya bırakın ya da tıklayın.</p>
        <p className="ant-upload-text">(Yalnızca Excel Dosyası)</p>
      </Dragger>
    </div>

        {isFileUploaded && (
            <h4>
                ARAÇ LİSTESİ AKTARIMI İÇİN EXCEL DOSYASINDAKİ TABLO BAŞLIKLARI İLE VERİTABANI BAŞLIKLARINI EŞLEŞTİRMENİZ GEREKMEKTEDİR.
            </h4>
        )}

        {isFileUploaded && (
  <>
    <div style={{ textAlign: 'right', marginTop: '10px' }}>
      <Button key="submit" type="primary" onClick={() => setEslemeModalVisible(true)}>
        Başlıkları Eşleştir
      </Button>
    </div>

    <h4>Dosyası İçeriği:</h4>
<div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
  <Table
    columns={(eslesmisColumns.length > 0 ? eslesmisColumns : columns).map(col => ({
      ...col,
      width: col.width || 150, // varsayılan genişlik ver
      ellipsis: true, // taşma varsa üç nokta
    }))}
    dataSource={eslesmisVeriler.length > 0 ? eslesmisVeriler : jsonData}
    pagination={false}
    rowKey="PLAKA"
    scroll={{ x: 'max-content' }} // yatay kaydırma aktif
  />
</div>
  </>
)}

        <BaslikEslemeModal
            visible={eslemeModalVisible}
            onClose={() => setEslemeModalVisible(false)}
            excelHeaders={columns.map(col => col.title)}
            dbHeaders={dbHeaders}
            onSave={handleEslesmeKaydet}
        />

        {isMapped && (
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleKontrolEt}
                    style={{ backgroundColor: 'green', borderColor: 'white' }}
                >
                    Kontrol Et
                </Button>
            </div>
        )}

        {kontrolSonuclari.length > 0 && (
            <div style={{ marginTop: '20px' }}>
                <h4>Kontrol Sonuçları:</h4>
                <p>✅ Aktarım İçin Uygun: {tikSayisi} | ❌ Hata: {carpiSayisi}</p>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Table
                        columns={[
                            ...eslesmisColumns,
                            {
                                title: 'Sonuç',
                                dataIndex: 'Sonuc',
                                key: 'plaka',
                                render: (text) => {
                                const errors = Array.isArray(text) ? text : [];
                                return errors.length > 0 ? (
                                <span style={{ color: 'red' }}>
                                  ❌ {errors.join(', ')}
                                </span>
                                ) : (
                                <span style={{ color: 'green' }}>
                                  ✅ Hata Yok
                                </span>
                                );
                            }
                            },
                        ]}
                        dataSource={kontrolSonuclari}
                        pagination={false}
                        rowKey="PLAKA"
                    />
                </div>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
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
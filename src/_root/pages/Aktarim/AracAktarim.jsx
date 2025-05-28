import React, { useState, useEffect } from "react";
import { Upload, Table, Button, Typography, Modal, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { stringSimilarity } from './utils';
import * as XLSX from "xlsx";

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
               dataSource={dbHeaders.map((header, index) => ({ key: `${header}_${index}`, dbHeader: header }))}
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
  const [dbHeaders] = useState([
        'PLAKA', 'ARAC_TIPI', 'LOKASYON', 'MARKA', 'MODEL',
        'YAKIT_TIPI', 'URETIM_YILI', 'ARAC_GRUBU', 'ARAC_CINSI',
        'RENK', 'MULKIYET', 'DEPARTMAN', 'SURUCU',
        'MUAYENE_TARIHI', 'SOZLESME_TARIHI', 'EGZOS_EMISYON',
        'VERGI', 'OZEL_ALAN_1', 'OZEL_ALAN_2', 'OZEL_ALAN_3',
        'OZEL_ALAN_4', 'OZEL_ALAN_5', 'OZEL_ALAN_6',
        'OZEL_ALAN_7', 'OZEL_ALAN_8', 'OZEL_ALAN_9',
        'OZEL_ALAN_10', 'OZEL_ALAN_11', 'OZEL_ALAN_12'
    ]);

  const handleUpload = (info) => {
        const file = info.fileList[info.fileList.length - 1];
        if (file && file.originFileObj) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const ab = e.target.result;
                const wb = XLSX.read(ab, { type: 'array' });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                const headers = data[0];
    
                const dynamicColumns = headers.map((header) => ({
                    title: header,
                    dataIndex: header,
                    key: header,
                }));
                setColumns(dynamicColumns);
    
                const jsonData = data.slice(1).map((row, index) => {
                    let rowData = {};
                    headers.forEach((header, i) => {
                        const cellValue = row[i];
                        
                        // `URETIM_YILI` için herhangi bir formatlama işlemi yapmıyoruz.
                        rowData[header] = cellValue || '';
                    });
                    return { key: index, ...rowData };
                });
    
                setJsonData(jsonData);
                setIsFileUploaded(true);
            };
            reader.readAsArrayBuffer(file.originFileObj);
        }
        setFileList(info.fileList);
    };

  const handleKontrolEt = () => {
    // Sahte kontrol sonuçları örneği
    const result = excelData.map((item, index) => ({
      key: index,
      ...item,
      kontrol: "✅ Uygun", // örnek sonuç
    }));

    setKontrolSonuclari(result);
  };

  const kontrolColumns = [
    ...columns,
    {
      title: "Kontrol Sonucu",
      dataIndex: "kontrol",
      key: "kontrol",
    },
  ];

  const handleEslesmeKaydet = (eslesmeler) => {
        const eslesmisVeri = jsonData.map((row) => {
            let newRow = {};
            Object.keys(eslesmeler).forEach((dbHeader) => {
                const excelHeader = eslesmeler[dbHeader];
                newRow[dbHeader] = row[excelHeader];
            });
            return newRow;
        });

        const newColumns = Object.keys(eslesmeler).map((dbHeader) => ({
            title: dbHeader,
            dataIndex: dbHeader,
            key: dbHeader,
        }));

        setEslesmisVeriler(eslesmisVeri);
        setEslesmisColumns(newColumns);
        setIsMapped(true);
    };

  return (
    <>

    <div style={{ marginBottom: 15 }}>
      <Button type="default" href="/public/file/ornek-arac-sablonu.xlsx" download>
        Örnek Excel Şablonunu İndir
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
                                            ❌ {errors.map(err => err.message).join(', ')}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'green' }}>
                                            ✅ Hata Yok
                                        </span>
                                    );
                                },
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
                        onClick={handleVeritabaninaKaydet}
                        icon={<SaveOutlined />}
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
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Modal, Table } from 'antd';
import { CSVLink } from 'react-csv';
import { CheckOutlined, CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';

import http from "../../../../../../api/http.jsx";
// import CreateModal from "./Insert/CreateModal";
import EditModal from '../IkinciTablo/IkinciTablo.jsx';

// Türkçe karakterleri İngilizce karşılıkları ile değiştiren fonksiyon
const normalizeText = (text) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'G')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'U')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 'S')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'O')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'C');
};

export default function MainTable({ isActive }) {
  const [loading, setLoading] = useState(false);
  const { control, watch, setValue } = useFormContext();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]); // Seçilen satırların verilerini tutacak state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loadings, setLoadings] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [filteredData1, setFilteredData1] = useState([]);

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = (date) => {
    if (!date) return '';

    // Örnek bir tarih formatla ve ay formatını belirle
    const sampleDate = new Date(2021, 0, 21); // Ocak ayı için örnek bir tarih
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes('January')) {
      monthFormat = 'long'; // Tam ad ("January")
    } else if (sampleFormatted.includes('Jan')) {
      monthFormat = 'short'; // Üç harfli kısaltma ("Jan")
    } else {
      monthFormat = '2-digit'; // Sayısal gösterim ("01")
    }

    // Kullanıcı için tarihi formatla
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: 'numeric',
      month: monthFormat,
      day: '2-digit',
    });
    return formatter.format(new Date(date));
  };

  const formatTime = (time) => {
    if (!time || time.trim() === '') return ''; // `trim` metodu ile baştaki ve sondaki boşlukları temizle

    try {
      // Saati ve dakikayı parçalara ayır, boşlukları temizle
      const [hours, minutes] = time
        .trim()
        .split(':')
        .map((part) => part.trim());

      // Saat ve dakika değerlerinin geçerliliğini kontrol et
      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
        // throw new Error("Invalid time format"); // hata fırlatır ve uygulamanın çalışmasını durdurur
        console.error('Invalid time format:', time);
        // return time; // Hatalı formatı olduğu gibi döndür
        return ''; // Hata durumunda boş bir string döndür
      }

      // Geçerli tarih ile birlikte bir Date nesnesi oluştur ve sadece saat ve dakika bilgilerini ayarla
      const date = new Date();
      date.setHours(hoursInt, minutesInt, 0);

      // Kullanıcının lokal ayarlarına uygun olarak saat ve dakikayı formatla
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının yerel ayarlarına göre otomatik seçim yapmasına izin ver
      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: '2-digit',
        // hour12 seçeneği burada belirtilmiyor; böylece otomatik olarak kullanıcının sistem ayarlarına göre belirleniyor
      });

      // Formatlanmış saati döndür
      return formatter.format(date);
    } catch (error) {
      console.error('Error formatting time:', error);
      return ''; // Hata durumunda boş bir string döndür
      // return time; // Hatalı formatı olduğu gibi döndür
    }
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  const columns = [
    {
      title: 'Personel İsim',
      dataIndex: 'PRS_ISIM',
      key: 'PRS_ISIM',
      width: 200,
      ellipsis: true,
      render: (text, record) => (
        <a onClick={() => onRowClick(record)}>{text}</a> // Updated this line
      ),
    },
    {
      title: 'Personel Ünvan',
      dataIndex: 'PRS_UNVAN',
      key: 'PRS_UNVAN',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'İş Emri Sayısı',
      dataIndex: 'ISEMRI_SAYISI',
      key: 'ISEMRI_SAYISI',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Toplam Çalışma Süresi (dk.)',
      dataIndex: 'TOPLAM_CALISMA_SURESI',
      key: 'TOPLAM_CALISMA_SURESI',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Ortalama Çalışma Süresi (dk.)',
      dataIndex: 'ORTALAMA_CALISMA_SURESI',
      key: 'ORTALAMA_CALISMA_SURESI',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Toplam Maliyet',
      dataIndex: 'TOPLAM_MALIYET',
      key: 'TOPLAM_MALIYET',
      width: 200,
      ellipsis: true,
    },
  ];

  const secilenIsEmriID = watch('secilenIsEmriID');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await http.get(`PersonelRaporGetTip?RaporTipID=1`);
      const fetchedData = response.map((item) => ({
        ...item,
        key: item.TB_PERSONEL_ID,
        ORTALAMA_CALISMA_SURESI: item.TOPLAM_CALISMA_SURESI && item.ISEMRI_SAYISI ? (item.TOPLAM_CALISMA_SURESI / item.ISEMRI_SAYISI).toFixed(2) : '',
      }));
      setData(fetchedData);
    } catch (error) {
      console.error('API isteği sırasında hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Bağımlılık dizisi boş, bu yüzden useEffect yalnızca bileşen ilk render edildiğinde çalışır

  const onRowSelectChange = (selectedKeys, selectedRows) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRowsData(selectedRows); // Seçilen satırların verilerini state'e ekler
  };

  const onRowClick = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const refreshTable = useCallback(() => {
    fetch(); // fetch fonksiyonu tabloyu yeniler
  }, [fetch]);

  // Arama işlevselliği için handleSearch fonksiyonları
  const handleSearch1 = (e) => {
    const value = e.target.value;
    setSearchTerm1(value);
    const normalizedSearchTerm = normalizeText(value);
    if (value) {
      const filtered = data.filter((item) =>
        Object.keys(item).some((key) => item[key] && normalizeText(item[key].toString()).toLowerCase().includes(normalizedSearchTerm.toLowerCase()))
      );
      setFilteredData1(filtered);
    } else {
      setFilteredData1(data);
    }
  };

  // csv dosyası için tablo başlık oluştur

  const csvHeaders = columns.map((col) => ({
    label: col.title,
    key: col.dataIndex,
  }));

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  return (
    <div style={{ marginBottom: '25px' }}>
      {/*<CreateModal onRefresh={refreshTable} secilenIsEmriID={secilenIsEmriID} />*/}
      <div
        style={{
          display: 'flex',
          marginBottom: '15px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Input placeholder="Arama..." value={searchTerm1} onChange={handleSearch1} style={{ width: '300px' }} />

        {/*csv indirme butonu*/}
        <CSVLink data={data} headers={csvHeaders} filename={`personel_raporu.csv`} className="ant-btn ant-btn-primary">
          <Button type="primary" icon={<DownloadOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
            İndir
          </Button>
        </CSVLink>
      </div>

      <Table
        size="small"
        // rowSelection={{
        //   type: "checkbox",
        //   selectedRowKeys,
        //   onChange: onRowSelectChange,
        // }}
        // onRow={(record) => ({
        //   onClick: () => onRowClick(record),
        // })}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          position: ['bottomRight'],
          showTotal: (total, range) => `Toplam ${total}`,
          showQuickJumper: true,
        }}
        columns={columns}
        dataSource={filteredData1.length > 0 || searchTerm1 ? filteredData1 : data}
        loading={loading}
      />
      {isModalVisible && (
        <EditModal
          selectedRowBirinciTablo={selectedRow}
          isModalVisibleBirinciTablo={isModalVisible}
          onModalClose={() => {
            setIsModalVisible(false);
            setSelectedRow(null);
          }}
          onRefresh={refreshTable}
          secilenIsEmriID={secilenIsEmriID}
        />
      )}
    </div>
  );
}

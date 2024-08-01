import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Button, Popover, Modal, DatePicker, ConfigProvider, Input } from 'antd';
import { DownloadOutlined, MoreOutlined } from '@ant-design/icons';

import http from "../../../../api/http.jsx";
import trTR from 'antd/lib/locale/tr_TR';
import { Controller, useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import customFontBase64 from './RobotoBase64.js';
import { CSVLink } from 'react-csv';

const { Text } = Typography;

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

function ArizaliMakineler(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [filteredData1, setFilteredData1] = useState([]);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const downloadPDF = () => {
    const doc = new jsPDF();

    // jsPDF içinde kullanım
    doc.addFileToVFS('Roboto-Regular.ttf', customFontBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');

    doc.setFont('Roboto');

    const columns = ['Makine Kodu', 'Makine Tanımı', 'Makine Tipi', 'Lokasyon', 'İş Emri Sayısı'];
    const tableData = data.map((item) => {
      return [item.MAKINE_KODU, item.MAKINE_TANIMI, item.MAKINE_TIPI, item.LOKASYON, item.IS_EMRI_SAYISI];
    });

    doc.autoTable({
      head: [columns],
      body: tableData,
    });

    doc.save('arizali_makineler.pdf');
  };

  const columns = [
    {
      title: 'Makine Kodu',
      dataIndex: 'MAKINE_KODU',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Makine Tanımı',
      dataIndex: 'MAKINE_TANIMI',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Makine Tipi',
      dataIndex: 'MAKINE_TIPI',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Lokasyon',
      dataIndex: 'LOKASYON',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'İş Emri Sayısı',
      dataIndex: 'IS_EMRI_SAYISI',
      width: 100,
      ellipsis: true,
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetArizaliMakineler`);
      const formattedData = response.map((item) => {
        return {
          ...item,
          key: Math.random(),
        };
      });
      setData(formattedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>

      {/*<div style={{ cursor: "pointer" }} onClick={downloadPDF}>*/}
      {/*  İndir*/}
      {/*</div>*/}
    </div>
  );

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
    <ConfigProvider locale={trTR}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '5px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          border: '1px solid #f0f0f0',
        }}
      >
        <div
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: '17px' }}>Arızalı Makineler</Text>
          <Popover placement="bottom" content={content} trigger="click">
            <Button
              type="text"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 5px',
                height: '32px',
                zIndex: 3,
              }}
            >
              <MoreOutlined
                style={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              />
            </Button>
          </Popover>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
            overflow: 'auto',
            height: '100vh',
            padding: '0px 10px 0 10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Input placeholder="Arama..." value={searchTerm1} onChange={handleSearch1} style={{ width: '300px' }} />

            {/*csv indirme butonu*/}
            <CSVLink data={data} headers={csvHeaders} filename={`arizali_makineler.csv`} className="ant-btn ant-btn-primary">
              <Button type="primary" icon={<DownloadOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
                İndir
              </Button>
            </CSVLink>
          </div>
          <Spin spinning={isLoading}>
            <Table
              columns={columns}
              dataSource={filteredData1.length > 0 || searchTerm1 ? filteredData1 : data}
              size="small"
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                position: ['bottomRight'],
                showTotal: (total, range) => `Toplam ${total}`,
                showQuickJumper: true,
              }}
            />
          </Spin>
        </div>

        {/* Expanded Modal */}
        <Modal
          title={
            <div>
              <Text style={{ fontWeight: '500', fontSize: '17px' }}>Arızalı Makineler</Text>
            </div>
          }
          centered
          open={isExpandedModalVisible}
          onOk={() => setIsExpandedModalVisible(false)}
          onCancel={() => setIsExpandedModalVisible(false)}
          width="90%"
          destroyOnClose
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px',
              }}
            >
              <Input placeholder="Arama..." value={searchTerm1} onChange={handleSearch1} style={{ width: '300px' }} />

              {/*csv indirme butonu*/}
              <CSVLink data={data} headers={csvHeaders} filename={`arizali_makineler.csv`} className="ant-btn ant-btn-primary">
                <Button type="primary" icon={<DownloadOutlined />} loading={loadings[1]} onClick={() => enterLoading(1)}>
                  İndir
                </Button>
              </CSVLink>
            </div>
            <Spin spinning={isLoading}>
              <Table
                columns={columns}
                dataSource={filteredData1.length > 0 || searchTerm1 ? filteredData1 : data}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  position: ['bottomRight'],
                  showTotal: (total, range) => `Toplam ${total}`,
                  showQuickJumper: true,
                }}
                scroll={{ y: 'calc(100vh - 380px)' }}
              />
            </Spin>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default ArizaliMakineler;

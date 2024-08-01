import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Button, Popover, Modal, DatePicker, ConfigProvider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import trTR from 'antd/lib/locale/tr_TR';

import http from "../../../../api/http.jsx";
import { Controller, useFormContext } from 'react-hook-form';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import customFontBase64 from './RobotoBase64.js';
import PersonelKPI from './PersonelSekmesi/Table/MainTable.jsx';

const { Text } = Typography;

function PersonelKPITablosu(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [localeDateFormat, setLocaleDateFormat] = useState('DD/MM/YYYY'); // Varsayılan format
  const [localeTimeFormat, setLocaleTimeFormat] = useState('HH:mm'); // Default time format
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [bitisTarihi, setBitisTarihi] = useState();
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

    const columns = ['İş Emri Tipi', 'İş Emri Sayısı', 'Toplam Maliyet', 'Ortalama Çalışma Süresi (dk)', 'Toplam Çalışma Süresi (dk)'];
    const tableData = data.map((item) => {
      // Calculate the average work time for each item
      const averageWorkTime = item.IS_EMRI_SAYISI !== 0 ? item.TOPLAM_CALISMA_SURESI / item.IS_EMRI_SAYISI : 0;

      return [
        item.IS_EMRI_TIPI,
        item.IS_EMRI_SAYISI,
        item.TOPLAM_MALIYET,
        averageWorkTime.toFixed(2), // Format the average work time to two decimal places
        item.TOPLAM_CALISMA_SURESI,
      ];
    });

    doc.autoTable({
      head: [columns],
      body: tableData,
    });

    doc.save('is_emirleri_ozet_tablo.pdf');
  };

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format('YYYY-MM-DD') : '';
  };

  // sistemin locale'una göre tarih formatlamasını yapar
  const formatDateWithLocale = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(navigator.language).format(date);
  };

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

  useEffect(() => {
    // Format the date based on the user's locale
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace('2021', 'YYYY').replace('21', 'DD').replace('11', 'MM'));

    // Format the time based on the user's locale
    const timeFormatter = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
    });
    const sampleTime = new Date(2021, 10, 21, 13, 45); // Use a sample time, e.g., 13:45
    const formattedSampleTime = timeFormatter.format(sampleTime);

    // Check if the formatted time contains AM/PM, which implies a 12-hour format
    const is12HourFormat = /AM|PM/.test(formattedSampleTime);
    setLocaleTimeFormat(is12HourFormat ? 'hh:mm A' : 'HH:mm');
  }, []);

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const baslamaTarihiValue = watch('baslamaTarihi1');
    const bitisTarihiValue = watch('bitisTarihi1');
    const aySecimiValue = watch('aySecimi1');
    const yilSecimiValue = watch('yilSecimi1');

    if (!baslamaTarihiValue && !bitisTarihiValue && !aySecimiValue && !yilSecimiValue) {
      const currentYear = dayjs().year();
      const firstDayOfYear = dayjs().year(currentYear).startOf('year').format('YYYY-MM-DD');
      const lastDayOfYear = dayjs().year(currentYear).endOf('year').format('YYYY-MM-DD');
      setBaslamaTarihi(firstDayOfYear);
      setBitisTarihi(lastDayOfYear);
    } else if (baslamaTarihiValue && bitisTarihiValue) {
      setBaslamaTarihi(formatDateWithDayjs(baslamaTarihiValue));
      setBitisTarihi(formatDateWithDayjs(bitisTarihiValue));
    } else if (aySecimiValue) {
      const startOfMonth = dayjs(aySecimiValue).startOf('month');
      const endOfMonth = dayjs(aySecimiValue).endOf('month');
      setBaslamaTarihi(formatDateWithDayjs(startOfMonth));
      setBitisTarihi(formatDateWithDayjs(endOfMonth));
    } else if (yilSecimiValue) {
      const startOfYear = dayjs(yilSecimiValue).startOf('year');
      const endOfYear = dayjs(yilSecimiValue).endOf('year');
      setBaslamaTarihi(formatDateWithDayjs(startOfYear));
      setBitisTarihi(formatDateWithDayjs(endOfYear));
    }
  }, [watch('baslamaTarihi1'), watch('bitisTarihi1'), watch('aySecimi1'), watch('yilSecimi1')]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  useEffect(() => {
    if (isModalVisible === true) {
      reset({
        baslamaTarihi1: undefined,
        bitisTarihi1: undefined,
        aySecimi1: undefined,
        yilSecimi1: undefined,
      });
    }
  }, [isModalVisible]);

  const columns = [
    {
      title: 'İş Emri Tipi',
      dataIndex: 'IS_EMRI_TIPI',
      width: 260,
      ellipsis: true,
    },
    {
      title: 'İş Emri Sayısı',
      dataIndex: 'IS_EMRI_SAYISI',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Toplam Maliyet',
      dataIndex: 'TOPLAM_MALIYET',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Ortalama Çalışma Süresi (dk)',
      dataIndex: 'ORTALAMA_CALISMA_SURESI',
      width: 100,
      ellipsis: true,
      render: (text, record) => {
        // Ensure that IS_EMRI_SAYISI is not zero to avoid division by zero error
        const average = record.IS_EMRI_SAYISI !== 0 ? record.TOPLAM_CALISMA_SURESI / record.IS_EMRI_SAYISI : 0;
        // Return the calculated average, optionally you can format it as needed
        return average.toFixed(2); // Adjust the number of decimal places as needed
      },
    },
    {
      title: 'Toplam Çalışma Süresi (dk)',
      dataIndex: 'TOPLAM_CALISMA_SURESI',
      width: 100,
      ellipsis: true,
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetIsEmriOzetTable?startDate=${baslamaTarihi}&endDate=${bitisTarihi}`);
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
    if (baslamaTarihi && bitisTarihi) {
      fetchData();
    }
  }, [baslamaTarihi, bitisTarihi]);

  const content1 = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => showModal('Tarih Aralığı Seç')}>
        Tarih Aralığı Seç
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => showModal('Ay Seç')}>
        Ay Seç
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => showModal('Yıl Seç')}>
        Yıl Seç
      </div>
    </div>
  );

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ cursor: 'pointer' }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>
      {/*<Popover placement="right" content={content1} trigger="click">*/}
      {/*  <div style={{ cursor: "pointer" }}>Süre Seçimi</div>*/}
      {/*</Popover>*/}
      {/*<div style={{ cursor: "pointer" }} onClick={downloadPDF}>*/}
      {/*  İndir*/}
      {/*</div>*/}
    </div>
  );

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
          <Text style={{ fontWeight: '500', fontSize: '17px' }}>
            Personel KPI
            {/*{`(${*/}
            {/*  baslamaTarihi && bitisTarihi*/}
            {/*    ? `${formatDateWithLocale(*/}
            {/*        baslamaTarihi*/}
            {/*      )} / ${formatDateWithLocale(bitisTarihi)}`*/}
            {/*    : ""*/}
            {/*})`}*/}
          </Text>
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
          <Spin spinning={isLoading}>
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
              <PersonelKPI />
            </div>

            {/*<Table*/}
            {/*  columns={columns}*/}
            {/*  dataSource={data}*/}
            {/*  size="small"*/}
            {/*  pagination={{*/}
            {/*    defaultPageSize: 10,*/}
            {/*    showSizeChanger: true,*/}
            {/*    pageSizeOptions: ["10", "20", "50", "100"],*/}
            {/*    position: ["bottomRight"],*/}
            {/*    showTotal: (total, range) => `Toplam ${total}`,*/}
            {/*    showQuickJumper: true,*/}
            {/*  }}*/}
            {/*/>*/}
          </Spin>
        </div>

        <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
          {modalContent === 'Tarih Aralığı Seç' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div>Tarih Aralığı Seç:</div>
              <Controller
                name="baslamaTarihi1"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: '130px' }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
              />
              {' - '}
              <Controller
                name="bitisTarihi1"
                control={control}
                render={({ field }) => <DatePicker {...field} style={{ width: '130px' }} format={localeDateFormat} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
          {modalContent === 'Ay Seç' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div>Ay Seç:</div>
              <Controller
                name="aySecimi1"
                control={control}
                render={({ field }) => <DatePicker {...field} picker="month" style={{ width: '130px' }} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
          {modalContent === 'Yıl Seç' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div>Yıl Seç:</div>
              <Controller
                name="yilSecimi1"
                control={control}
                render={({ field }) => <DatePicker {...field} picker="year" style={{ width: '130px' }} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
        </Modal>
        {/* Expanded Modal */}
        <Modal
          title={
            <div>
              <Text style={{ fontWeight: '500', fontSize: '17px' }}>
                Personel KPI
                {/*{`(${*/}
                {/*  baslamaTarihi && bitisTarihi*/}
                {/*    ? `${formatDateWithLocale(*/}
                {/*        baslamaTarihi*/}
                {/*      )} / ${formatDateWithLocale(bitisTarihi)}`*/}
                {/*    : ""*/}
                {/*})`}*/}
              </Text>
            </div>
          }
          centered
          open={isExpandedModalVisible}
          onOk={() => setIsExpandedModalVisible(false)}
          onCancel={() => setIsExpandedModalVisible(false)}
          width="90%"
          destroyOnClose
        >
          <div style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
            <Spin spinning={isLoading}>
              <PersonelKPI />
              {/*<Table*/}
              {/*  columns={columns}*/}
              {/*  dataSource={data}*/}
              {/*  pagination={{*/}
              {/*    defaultPageSize: 10,*/}
              {/*    showSizeChanger: true,*/}
              {/*    pageSizeOptions: ["10", "20", "50", "100"],*/}
              {/*    position: ["bottomRight"],*/}
              {/*    showTotal: (total, range) => `Toplam ${total}`,*/}
              {/*    showQuickJumper: true,*/}
              {/*  }}*/}
              {/*  scroll={{ y: "calc(100vh - 380px)" }}*/}
              {/*/>*/}
            </Spin>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default PersonelKPITablosu;

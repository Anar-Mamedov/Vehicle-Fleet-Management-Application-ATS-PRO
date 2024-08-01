import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer } from 'recharts';
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from 'antd';

import http from "../../../../api/http.jsx";
import { MoreOutlined, PrinterOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';

const { Text } = Typography;

const monthNames = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

function TamamlanmaOranlari(props = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const [visibleSeries, setVisibleSeries] = useState({
    IsEmri: true,
    IsTalebi: true,
  });
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  const yilSecimi1 = watch('yilSecimi1');

  useEffect(() => {
    const yilSecimiValue = watch('yilSecimi1');
    if (!yilSecimiValue) {
      // Eğer baslamaTarihi değeri undefined ise, sistem saatinden o senenin yıl hanesini alıp setBaslamaTarihi'ye atar
      const currentYear = dayjs().format('YYYY');
      setBaslamaTarihi(currentYear);
    } else if (yilSecimiValue) {
      // Ant Design DatePicker returns a moment object when a date is picked.
      // To extract only the year and set it as the state, use the format method of the moment object.
      const yearOnly = yilSecimiValue.format('YYYY');
      setBaslamaTarihi(yearOnly);
    }
  }, [yilSecimi1]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(`GetTamamlanmisIsEmirleriIsTalepleri?ID=2&year=${baslamaTarihi}`);

      const transformedData = response.reduce((acc, item) => {
        const monthName = monthNames[item.AY];
        const month = acc.find((el) => el.AY === monthName);
        if (month) {
          month[item.TIP] = item.DEGER;
        } else {
          acc.push({ AY: monthName, [item.TIP]: item.DEGER });
        }
        return acc;
      }, []);

      setData(transformedData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (baslamaTarihi) {
      fetchData();
    }
  }, [baslamaTarihi]);

  const downloadPDF = () => {
    const element = document.getElementById('chart-container');
    const opt = {
      margin: 10,
      filename: 'tamamlanma_oranlari.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().set(opt).from(element).save();
  };

  const handleLegendClick = (dataKey) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  const CustomLegend = ({ payload }) => {
    const customNames = {
      IsEmri: 'İş Emri',
      IsTalebi: 'İş Talebi',
    };

    const handleToggleAll = () => {
      const allVisible = Object.values(visibleSeries).every((value) => value);
      setVisibleSeries({
        IsEmri: !allVisible,
        IsTalebi: !allVisible,
      });
    };

    return (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          margin: 0,
        }}
      >
        <li
          style={{
            cursor: 'pointer',
            color: Object.values(visibleSeries).every((value) => value) ? 'black' : 'gray',
          }}
          onClick={handleToggleAll}
        >
          Tümü
        </li>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              cursor: 'pointer',
              color: visibleSeries[entry.dataKey] ? entry.color : 'gray',
            }}
            onClick={() => handleLegendClick(entry.dataKey)}
          >
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                backgroundColor: visibleSeries[entry.dataKey] ? entry.color : 'gray',
                marginRight: '5px',
              }}
            ></span>
            {customNames[entry.dataKey] || entry.value}
          </li>
        ))}
      </ul>
    );
  };

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // reset();
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue('yilSecimi1', null);
      // reset({
      //   yilSecimi1: undefined,
      // });
    }
  }, [isModalVisible]);

  const content1 = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
      <Popover placement="right" content={content1} trigger="click">
        <div style={{ cursor: 'pointer' }}>Süre Seçimi</div>
      </Popover>
      <div style={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
        Bilgi
      </div>
    </div>
  );

  const steps = [
    {
      title: 'Bilgi',
      description: (
        <div
          style={{
            overflow: 'auto',
            height: '100%',
            maxHeight: '200px',
          }}
        >
          <p>
            Bu grafikte, belirli bir zaman diliminde tamamlanmış iş talepleri ve iş emirleri oranları gösterilmektedir. Grafik, yatay eksende zamanı (örneğin, günler, haftalar veya
            aylar) ve dikey eksende tamamlanmış iş talepleri ve iş emirleri sayısını göstermektedir. Her bir çubuk, toplam iş talepleri veya iş emirleri sayısına göre tamamlanmış
            olanları temsil etmektedir.
          </p>
          <p>
            Bu grafik, yöneticilere belirli bir dönemdeki işlerin ne kadarının tamamlandığını görsel olarak göstererek performansı değerlendirmelerine yardımcı olabilir. Ayrıca
            trendleri izlemek ve performansı zaman içinde karşılaştırmak için kullanılabilir.
          </p>
        </div>
      ),

      target: () => ref1.current,
    },
  ];

  return (
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
        <Text
          title={`Tamamlanmış İş Talepleri ve İş Emirleri Oranları${baslamaTarihi ? ` (${baslamaTarihi})` : ''}`}
          style={{
            fontWeight: '500',
            fontSize: '17px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 'calc(100% - 50px)',
          }}
        >
          Tamamlanmış İş Talepleri ve İş Emirleri Oranları
          {baslamaTarihi && ` (${baslamaTarihi})`}
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
            <MoreOutlined style={{ cursor: 'pointer', fontWeight: '500', fontSize: '16px' }} />
          </Button>
        </Popover>
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <div style={{ width: '100%', height: 'calc(100% - 5px)' }}>
            <ResponsiveContainer ref={ref1} width="100%" height="100%">
              <BarChart
                width="100%"
                height="100%"
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="AY" />
                <YAxis />
                <Tooltip />
                <Legend content={<CustomLegend />} />
                <Bar dataKey="IsEmri" stackId="a" fill="#8884d8" hide={!visibleSeries.IsEmri} name="İş Emri">
                  {/*<LabelList dataKey="IsEmri" position="insideTop" />*/}
                </Bar>
                <Bar dataKey="IsTalebi" stackId="a" fill="#82ca9d" hide={!visibleSeries.IsTalebi} name="İş Talebi">
                  {/*<LabelList dataKey="IsTalebi" position="insideTop" />*/}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '98%',
            }}
          >
            <Text
              title={`Tamamlanmış İş Talepleri ve İş Emirleri Oranları${baslamaTarihi ? ` (${baslamaTarihi})` : ''}`}
              style={{
                fontWeight: '500',
                fontSize: '17px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 50px)',
              }}
            >
              Tamamlanmış İş Talepleri ve İş Emirleri Oranları
              {baslamaTarihi && ` (${baslamaTarihi})`}
            </Text>
            <PrinterOutlined style={{ cursor: 'pointer', fontSize: '20px' }} onClick={downloadPDF} />
          </div>
        }
        centered
        open={isExpandedModalVisible}
        onOk={() => setIsExpandedModalVisible(false)}
        onCancel={() => setIsExpandedModalVisible(false)}
        width="90%"
        destroyOnClose
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
            overflow: 'auto',
            height: 'calc(100vh - 180px)',
          }}
        >
          <ResponsiveContainer id="chart-container" width="100%" height="100%">
            <BarChart
              width="100%"
              height="100%"
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="AY" />
              <YAxis />
              <Tooltip />
              <Legend content={<CustomLegend />} />
              <Bar dataKey="IsEmri" stackId="a" fill="#8884d8" hide={!visibleSeries.IsEmri} name="İş Emri">
                <LabelList style={{ fill: 'white' }} dataKey="IsEmri" position="insideTop" />
              </Bar>
              <Bar dataKey="IsTalebi" stackId="a" fill="#82ca9d" hide={!visibleSeries.IsTalebi} name="İş Talebi">
                <LabelList style={{ fill: 'white' }} dataKey="IsTalebi" position="insideTop" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default TamamlanmaOranlari;

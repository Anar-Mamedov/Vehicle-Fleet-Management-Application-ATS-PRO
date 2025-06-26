import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../../../api/http";

const { Text, Link } = Typography;

export default function TarihceTablo({ workshopSelectedId, onSubmit, selectedRows }) {
  const { control, watch, setValue } = useFormContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = (date) => {
    if (!date) return "";

    // Örnek bir tarih formatla ve ay formatını belirle
    const sampleDate = new Date(2021, 0, 21); // Ocak ayı için örnek bir tarih
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long"; // Tam ad ("January")
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short"; // Üç harfli kısaltma ("Jan")
    } else {
      monthFormat = "2-digit"; // Sayısal gösterim ("01")
    }

    // Kullanıcı için tarihi formatla
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  const formatTime = (time) => {
    if (!time) return "";

    try {
      // Saati ve dakikayı parçalara ayır (varsayılan olarak "HH:MM:SS" veya "HH:MM" formatında beklenir)
      const [hours, minutes] = time.split(":");

      // Geçerli tarih ile birlikte bir Date nesnesi oluştur ve sadece saat ve dakika bilgilerini ayarla
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

      // Kullanıcının lokal ayarlarına uygun olarak saat ve dakikayı formatla
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının yerel ayarlarına göre otomatik seçim yapmasına izin ver
      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "2-digit",
        // hour12 seçeneği burada belirtilmiyor; böylece otomatik olarak kullanıcının sistem ayarlarına göre belirleniyor
      });

      // Formatlanmış saati döndür
      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return ""; // Hata durumunda boş bir string döndür
    }
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  const columns = [
    {
      title: "İşlem",
      dataIndex: "ITL_ISLEM",
      key: "ITL_ISLEM",
      width: "150px",
      ellipsis: true,
    },
    {
      title: "Tarih",
      dataIndex: "ITL_TARIH",
      key: "ITL_TARIH",
      width: "150px",
      ellipsis: true,
      render: (text) => formatDate(text),
    },
    {
      title: "Saat",
      dataIndex: "ITL_SAAT",
      key: "ITL_SAAT",
      width: "150px",
      ellipsis: true,
      render: (text) => formatTime(text),
    },
    {
      title: "Durum",
      dataIndex: "ITL_ISLEM_DURUM",
      key: "ITL_ISLEM_DURUM",
      width: "150px",
      ellipsis: true,
    },
    {
      title: "Açıklama",
      dataIndex: "ITL_ACIKLAMA",
      key: "ITL_ACIKLAMA",
      width: "250px",
      ellipsis: true,
    },
  ];

  const fetch = useCallback(() => {
    setLoading(true);
    const selectedKey = selectedRows.map((item) => item.key);
    console.log("filterKey", selectedKey);
    AxiosInstance.get(`IsTalepTarihce?talepID=${selectedKey}`)
      .then((response) => {
        const fetchedData = response.map((item) => ({
          ...item,
          key: item.TB_IS_TALEP_LOG_ID,
          ITL_IS_TANIM_ID: item.ITL_IS_TANIM_ID,
          ITL_KULLANICI_ID: item.ITL_KULLANICI_ID,
          ITL_TARIH: item.ITL_TARIH,
          ITL_SAAT: item.ITL_SAAT,
          ITL_ISLEM: item.ITL_ISLEM,
          ITL_ACIKLAMA: item.ITL_ACIKLAMA,
          ITL_ISLEM_DURUM: item.ITL_ISLEM_DURUM,
          ITL_TALEP_ISLEM: item.ITL_TALEP_ISLEM,
          ITL_OLUSTURAN_ID: item.ITL_OLUSTURAN_ID,
          ITL_OLUSTURMA_TARIH: item.ITL_OLUSTURMA_TARIH,
        }));
        setData(fetchedData);
      })
      .finally(() => setLoading(false));
  }, [selectedRows]);

  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
    if (!isModalVisible) {
      fetch();
      setSelectedRowKeys([]);
    }
  };

  const handleModalOk = () => {
    const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
    if (selectedData) {
      onSubmit && onSubmit(selectedData);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
  }, [workshopSelectedId]);

  useEffect(() => {
    if (isModalVisible) {
      // Tablodan seçilen kayıtların IST_KOD ve IST_TANIMI değerlerini birleştir ve / ile ayır
      const istKodlarVeKonular = selectedRows.map((row) => `${row.IST_KOD} / ${row.IST_TANIMI}`).join(", ");
      setValue("fisNo", istKodlarVeKonular); // "fisNo" alanını güncelle
    }
  }, [isModalVisible, setValue, selectedRows]);

  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };
  return (
    <div>
      <Button style={{ display: "flex", padding: "0px 0px", alignItems: "center", justifyContent: "flex-start" }} onClick={handleModalToggle} type="submit">
        {" "}
        Tarihçe{" "}
      </Button>
      <Modal width={1200} centered title="İş Talebi Tarihçesi" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <div style={{ marginBottom: "10px" }}>
          <Controller
            name="fisNo"
            control={control}
            render={({ field }) => (
              <Text {...field} style={{ fontSize: "14px", fontWeight: "600" }}>
                İş Tanımı: {field.value}
              </Text>
            )}
          />
        </div>
        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: onRowSelectChange,
          }}
          columns={columns}
          dataSource={data}
          loading={loading}
          scroll={{
            // x: "auto",
            y: "calc(100vh - 360px)",
          }}
        />
      </Modal>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { t } from "i18next";
import dayjs from "dayjs";
import { getVakifbankToken } from "../../../../api/VakifBankToken";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const HgsEntegrasyon = ({ setStatus, onRefresh }) => {
  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const [dateRange, setDateRange] = useState([]);
  const [productNumber, setProductNumber] = useState("");

  const sendToVakifbank = async () => {
    if (!dateRange || dateRange.length !== 2 || !productNumber) {
      console.error("Gerekli bilgiler eksik");
      return;
    }
  
    setLoading(true);
    try {
      const tokenResponse = await getVakifbankToken();
      const accessToken = tokenResponse.access_token;
  
      const body = {
        StartDate: dayjs(dateRange[0]).format("YYYY-MM-DD"),
        EndDate: dayjs(dateRange[1]).format("YYYY-MM-DD"),
        ProductNumber: productNumber,
      };
  
      const response = await fetch("https://apigw.vakifbank.com.tr:8443/FPSInquirePass", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log("Vakifbank cevabı:", data);
      setStatus("Başarılı");
    } catch (error) {
      console.error("Hata:", error);
      setStatus("Hata");
    } finally {
      setLoading(false);
    }
  };

  const defaultValues = {
    aktif: true,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  const onSubmit = handleSubmit((values) => {
      const body = [
        {
          tarih: values.tarih,
          saat: values.saat || "00:00",
          aracId: values.aracId,
          surucuId: values.surucuId,
          otoYolKodId: values.otoYolKodId,
          girisTarih: values.girisTarih,
          girisSaat: values.girisSaat ? dayjs(values.girisSaat).format("HH:mm") : "00:00",
          cikisTarih: values.cikisTarih,
          cikisSaat: values.cikisSaat ? dayjs(values.cikisSaat).format("HH:mm") : "00:00",
          girisYeriKodId: values.girisYeriKodId,
          cikisYeriKodId: values.cikisYeriKodId,
          odemeTuruKodId: values.odemeTuruKodId,
          gecisUcreti: values.gecisUcreti,
          odemeDurumuKodId: values.odemeDurumuKodId,
          fisNo: values.fisNo,
          gecisKategorisiKodId: values.gecisKategorisiKodId,
          guzergahId: values.guzergahId,
        }
      ];
    
      AddHgsItemService(body).then((res) => {
        if (res.data.statusCode === 200) {
          onRefresh();
          reset(defaultValues);
          setopenModal(false);
          setIsValid("normal");
          setActiveKey("1");
          setLoading(false);
        }
      });
  });

  const footer = [
    loading ? (
      <Button className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid === "success" ? false : isValid === "error" ? true : false}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setopenModal(false);
        reset(defaultValues);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button style={{backgroundColor: "#ffbf00", color: "#fff"}} onClick={() => setopenModal(true)} disabled={isValid === "error" ? true : isValid === "success" ? false : false}>
        {t("entegrasyon")}
      </Button>
      <Modal
  title={t("entegrasyon")}
  open={openModal}
  onCancel={() => setopenModal(false)}
  maskClosable={false}
  footer={footer}
  width={1200}
>
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
      <div>
        <label style={{ fontWeight: 500 }}>{t("Tarih Aralığı Seçiniz")}:</label>
        <br />
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          format="YYYY-MM-DD"
          style={{ width: 250 }}
        />
      </div>

      <div>
        <label style={{ fontWeight: 500 }}>{t("Ürün Numarası")}:</label>
        <br />
        <input
          type="text"
          value={productNumber}
          onChange={(e) => setProductNumber(e.target.value)}
          placeholder="ProductNumber girin"
          style={{
            padding: 4,
            border: "1px solid #ccc",
            borderRadius: 4,
            width: 200,
          }}
        />
      </div>
    </div>
  </div>

  <Button
    type="primary"
    onClick={sendToVakifbank}
    loading={loading}
    disabled={!dateRange || dateRange.length !== 2 || !productNumber}
  >
    Sorgula
  </Button>
</Modal>
    </>
  );
};

HgsEntegrasyon.propTypes = {
  setStatus: PropTypes.func,
};

export default HgsEntegrasyon;

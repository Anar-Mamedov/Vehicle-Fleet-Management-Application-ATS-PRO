import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { t } from "i18next";
import dayjs from "dayjs";

const HgsEntegrasyon = ({ setStatus, onRefresh }) => {
  const [openModal, setopenModal] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

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
        aciklama: values.aciklama,
        ozelAlan1: values.ozelAlan1 || "",
        ozelAlan2: values.ozelAlan2 || "",
        ozelAlan3: values.ozelAlan3 || "",
        ozelAlan4: values.ozelAlan4 || "",
        ozelAlan5: values.ozelAlan5 || "",
        ozelAlan6: values.ozelAlan6 || "",
        ozelAlan7: values.ozelAlan7 || "",
        ozelAlan8: values.ozelAlan8 || "",
        ozelAlanKodId9: values.ozelAlanKodId9 || -1,
        ozelAlanKodId10: values.ozelAlanKodId10 || -1,
        ozelAlan11: values.ozelAlan11 || 0,
        ozelAlan12: values.ozelAlan12 || 0,
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
      <Modal title={t("entegrasyon")} open={openModal} onCancel={() => setopenModal(false)} maskClosable={false} footer={footer} width={1200}>
      </Modal>
    </>
  );
};

HgsEntegrasyon.propTypes = {
  setStatus: PropTypes.func,
};

export default HgsEntegrasyon;

import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../context/plakaSlice";
import AxiosInstance from "../../../../api/http";
import GeneralInfo from "./tabs/GeneralInfo";

const AddModal = ({ onRefresh }) => {
  const { data, plaka, setPlaka } = useContext(PlakaContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    krediKiralama: true, // Varsayılan olarak true, checkbox görünmüyor ama backend'e gönderiliyor
    krediUyar: false,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (isOpen && data?.aracId) {
      // Fetch existing vehicle details if needed
      AxiosInstance.get(`Vehicle/GetVehicleDetailInfo/${data.aracId}/4`)
        .then((res) => {
          if (res.data) {
            setValue("krediHesapNo", res.data.krediHesapNo);
            setValue("kiralamaFirmaId", res.data.kiralamaFirmaId);
            setValue("kiralamafirma", res.data.kiralamafirma);
            setValue("krediUyar", res.data.krediUyar);
            setValue("krediKiralama", res.data.krediKiralama);
            setValue("krediIlgili", res.data.krediIlgili);
            setValue("krediAciklama", res.data.krediAciklama);
            setValue("krediPeriyod", res.data.krediPeriyod);
            setValue("krediSure", res.data.krediSure);
            setValue("krediAylikOdeme", res.data.krediAylikOdeme);
            setValue("krediTutar", res.data.krediTutar);
            setValue("krediIlkOdTarih", res.data.krediIlkOdTarih ? dayjs(res.data.krediIlkOdTarih) : null);
            setValue("kiraBaslangic", res.data.kiraBaslangic ? dayjs(res.data.kiraBaslangic) : null);
          }
        })
        .catch((err) => {
          console.error("Error fetching vehicle details:", err);
        });
    }
  }, [isOpen, data?.aracId]);

  const onSubmit = handleSubmit((values) => {
    if (!data?.aracId) {
      message.error("Lütfen bir araç seçiniz!");
      return;
    }

    const body = {
      dtyAracId: data.aracId,
      kiraBaslangic: values.kiraBaslangic ? dayjs(values.kiraBaslangic).format("YYYY-MM-DD") : null,
      krediIlkOdTarih: values.krediIlkOdTarih ? dayjs(values.krediIlkOdTarih).format("YYYY-MM-DD") : null,
      krediTutar: values.krediTutar || 0,
      krediAylikOdeme: values.krediAylikOdeme || 0,
      krediSure: values.krediSure || 0,
      krediAciklama: values.krediAciklama || "",
      krediIlgili: values.krediIlgili || "",
      krediKiralama: true, // Varsayılan olarak her zaman true
      krediUyar: values.krediUyar || false,
      kiralamaFirmaId: values.kiralamaFirmaId || -1,
      krediHesapNo: values.krediHesapNo || "",
    };

    setLoading(true);
    AxiosInstance.post("VehicleDetail/UpdateVehicleDetailsInfo?type=4", body)
      .then((res) => {
        if (res?.data.statusCode === 202 || res?.data.statusCode === 200) {
          message.success("Kiralık araç bilgisi başarıyla eklendi!");
          onRefresh();
          setIsOpen(false);
          setLoading(false);
          setPlaka([]);
          reset();
        } else {
          message.error("Bir sorun oluştu! Tekrar deneyiniz.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error saving rental vehicle:", err);
        message.error("Kayıt sırasında bir hata oluştu!");
        setLoading(false);
      });
  });

  const resetForm = () => {
    reset();
  };

  const footer = [
    loading ? (
      <Button key="loading" className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsOpen(false);
        setPlaka([]);
        resetForm();
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button
        className="btn primary-btn"
        onClick={() => {
          reset();
          setPlaka([]);
          setIsOpen(true);
        }}
      >
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniKiralikAracGirisi")}
        open={isOpen}
        destroyOnClose={true}
        onCancel={() => {
          setIsOpen(false);
          setPlaka([]);
          resetForm();
        }}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  onRefresh: PropTypes.func,
};

export default AddModal;

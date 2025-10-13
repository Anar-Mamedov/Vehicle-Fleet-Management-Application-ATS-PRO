import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { message, Modal, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../api/http";
import GeneralInfo from "./tabs/UpdateGeneralInfo";

const UpdateModal = ({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    krediKiralama: true,
    krediUyar: false,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (drawerVisible && selectedRow?.dtyAracId) {
      // Fetch vehicle rental details
      AxiosInstance.get(`VehicleDetail/GetVehicleDetailsInfo?vehicleId=${selectedRow.dtyAracId}&type=4`)
        .then((res) => {
          if (res.data) {
            // Set form values from API response
            setValue("siraNo", res.data.siraNo);
            setValue("plaka", res.data.plaka);
            setValue("plakaID", res.data.dtyAracId);
            setValue("krediHesapNo", res.data.krediHesapNo);
            setValue("kiralamaFirmaId", res.data.kiralamaFirmaId);
            setValue("kiralamafirma", res.data.kiralamafirma);
            setValue("krediUyar", res.data.krediUyar);
            setValue("krediKiralama", res.data.krediKiralama);
            setValue("krediIlgili", res.data.krediIlgili);
            setValue("krediAciklama", res.data.krediAciklama);
            setValue("krediSure", res.data.krediSure);
            setValue("krediAylikOdeme", res.data.krediAylikOdeme);
            setValue("krediTutar", res.data.krediTutar);
            setValue("krediIlkOdTarih", res.data.krediIlkOdTarih ? dayjs(res.data.krediIlkOdTarih) : null);
            setValue("kiraBaslangic", res.data.kiraBaslangic ? dayjs(res.data.kiraBaslangic) : null);
          }
        })
        .catch((err) => {
          console.error("Error fetching vehicle details:", err);
          message.error("Veri yüklenirken bir hata oluştu!");
        });
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    if (!selectedRow?.dtyAracId) {
      message.error("Araç bilgisi bulunamadı!");
      return;
    }

    const body = {
      siraNo: values.siraNo,
      dtyAracId: selectedRow.dtyAracId,
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
          message.success("Kiralık araç bilgisi başarıyla güncellendi!");
          onRefresh();
          onDrawerClose();
          setLoading(false);
          reset();
        } else {
          message.error("Bir sorun oluştu! Tekrar deneyiniz.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error updating rental vehicle:", err);
        message.error("Güncelleme sırasında bir hata oluştu!");
        setLoading(false);
      });
  });

  const footer = [
    loading ? (
      <Button key="loading" className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
        {t("guncelle")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        onDrawerClose();
        reset();
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal
      title={t("kiralikAracBilgisiGuncelle")}
      open={drawerVisible}
      onCancel={() => {
        onDrawerClose();
        reset();
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
  );
};

UpdateModal.propTypes = {
  selectedRow: PropTypes.object,
  onDrawerClose: PropTypes.func,
  drawerVisible: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default UpdateModal;

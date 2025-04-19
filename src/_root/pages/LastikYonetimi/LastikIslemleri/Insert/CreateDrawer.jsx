import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import MainTabs from "./components/MainTabs/MainTabs.jsx";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";

export default function CreateModal({ selectedLokasyonId, onRefresh }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const onClose = () => {
    Modal.confirm({
      title: t("iptalEtmekIstedigindenEminMisin"),
      content: t("kaydedilmemisDegisikliklerKaybolacaktir"),
      okText: t("evet"),
      cancelText: t("hayir"),
      onOk: () => {
        setOpen(false);
        methods.reset();
      },
      onCancel: () => {
        // Do nothing, continue from where the user left off
      },
    });
  };

  // back-end'e gönderilecek veriler

  //* export
  const methods = useForm({
    defaultValues: {
      aksSayisi: 2,
      onAxle: 1,
      arkaAxle: 1,
      aksTanimi: null,
      tip: null,
      tipID: null,
      aciklama: null,
      onAxleIslevTipi: null,
      arkaAxleIslevTipi: null,
      ortaAksTekerlerListesi: [],
      ortaAksTipIdListesi: [],
    },
  });

  const formatDateWithDayjs = (dateString) => {
    const formattedDate = dayjs(dateString);
    return formattedDate.isValid() ? formattedDate.format("YYYY-MM-DD") : "";
  };

  const formatTimeWithDayjs = (timeObj) => {
    const formattedTime = dayjs(timeObj);
    return formattedTime.isValid() ? formattedTime.format("HH:mm:ss") : "";
  };

  const { setValue, reset, watch } = methods;

  //* export
  const onSubmit = (data) => {
    const Body = {
      aksTanimi: data.aksTanimi,
      aksTipId: Number(data.tipID),
      aksSayisi: data.aksSayisi,
      onAksTekerSayisi: data.onAxle,
      arkaAksTekerSayisi: data.arkaAxle,
      ortaAksTekerlerListesi: Array.from({ length: data.aksSayisi - 2 }, (_, index) => data[index + 1]),
      ortaAksTipIdListesi: Array.from({ length: data.aksSayisi - 2 }, (_, index) => data[`${index + 1}IslevTipi`]),
      onAksTipId: Number(data.onAxleIslevTipi),
      arkaAksTipId: Number(data.arkaAxleIslevTipi),
      aciklama: data.aciklama,
    };

    // AxiosInstance.post("/api/endpoint", { Body }).then((response) => {
    // handle response
    // });

    AxiosInstance.post("Axel/AddAxelItem", Body)
      .then((response) => {
        // Handle successful response here, e.g.:
        console.log(t("dataGonderildiBasarili"), response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success(t("eklemeBasarili"));
          setOpen(false);
          onRefresh();
          reset();
        } else if (response.data.statusCode === 401) {
          message.error(t("buIslemiYapmayaYetkinizBulunmamaktadir"));
        } else {
          message.error(t("eklemeBasarisiz"));
        }
      })
      .catch((error) => {
        // Handle errors here, e.g.:
        console.error(t("dataGondermeBasarisiz"), error);
        message.error(t("basarisizOlundu"));
      });
    console.log({ Body });
  };

  useEffect(() => {
    // Eğer selectedLokasyonId varsa ve geçerli bir değerse, formun default değerini güncelle
    if (selectedLokasyonId !== undefined && selectedLokasyonId !== null) {
      methods.reset({
        ...methods.getValues(),
        selectedLokasyonId: selectedLokasyonId,
      });
    }
  }, [selectedLokasyonId, methods]);

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Button
          type="primary"
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <PlusOutlined />
          {t("ekle")}
        </Button>
        <Modal
          width="880px"
          centered
          title={t("yeniAksYapilandirma")}
          destroyOnClose
          open={open}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>{t("iptal")}</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                {t("kaydet")}
              </Button>
            </Space>
          }
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div>
              <MainTabs modalOpen={open} />
              {/*<Footer />*/}
            </div>
          </form>
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}

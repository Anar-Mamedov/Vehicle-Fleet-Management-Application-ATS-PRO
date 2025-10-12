import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import MainTabs from "./components/MainTabs/MainTabs";
import SecondTabs from "./components/SecondTabs/SecondTabs";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../api/http.jsx";

export default function CreateModal({ selectedLokasyonId, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [periyodikBakim, setPeriyodikBakim] = useState("");
  const [hasarNoValidationStatus, setHasarNoValidationStatus] = useState(null);

  const getFisNo = async () => {
    try {
      const response = await AxiosInstance.get("Numbering/GetModuleCodeByCode", {
        params: {
          code: "HASAR_TAKIBI_NO",
        },
      });
      if (response.data) {
        setValue("hasarNo", response.data);
      }
    } catch (error) {
      console.error("Error fetching fisNo:", error);
      message.error("Fiş numarası alınamadı!");
    }
  };

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      getFisNo();
      setValue("tarih", dayjs());
      setValue("saat", dayjs());
      setHasarNoValidationStatus(null); // Reset validation status

      // Reset the fisIcerigi with a timeout to avoid focus errors
      setTimeout(() => {
        setValue("fisIcerigi", []);
      }, 0);
    }
  }, [open]);

  const onClose = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: () => {
        // First close the modal to avoid focus errors
        setOpen(false);

        // Then reset the form with a slight delay
        setTimeout(() => {
          methods.reset({
            hasarNo: null,
            hasarTipi: null,
            hasarTipiID: null,
            hasarliBolge: null,
            hasarliBolgeID: null,
            hasarBoyutu: null,
            hasarBoyutuID: null,
            olayYeri: null,
            olayYeriID: null,
            tarih: null,
            saat: null,
            plaka: null,
            plakaID: null,
            surucu: null,
            surucuID: null,
            marka: null,
            model: null,
            lokasyon: null,
            lokasyonID: null,
            policeNo: null,
            aracKullanilabilir: false,
            kazayaKarisanBaskaAracVar: false,
            polisRaporuVar: false,
            aciklama: null,
            ozelAlan1: null,
            ozelAlan2: null,
            ozelAlan3: null,
            ozelAlan4: null,
            ozelAlan5: null,
            ozelAlan6: null,
            ozelAlan7: null,
            ozelAlan8: null,
            ozelAlan9: null,
            ozelAlan9ID: null,
            ozelAlan10: null,
            ozelAlan10ID: null,
            ozelAlan11: null,
            ozelAlan12: null,
          });
        }, 100);
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
      hasarNo: null,
      hasarTipi: null,
      hasarTipiID: null,
      hasarliBolge: null,
      hasarliBolgeID: null,
      hasarBoyutu: null,
      hasarBoyutuID: null,
      olayYeri: null,
      olayYeriID: null,
      tarih: null,
      saat: null,
      plaka: null,
      plakaID: null,
      surucu: null,
      surucuID: null,
      marka: null,
      model: null,
      lokasyon: null,
      lokasyonID: null,
      policeNo: null,
      aracKullanilabilir: false,
      kazayaKarisanBaskaAracVar: false,
      polisRaporuVar: false,
      aciklama: null,
      ozelAlan1: null,
      ozelAlan2: null,
      ozelAlan3: null,
      ozelAlan4: null,
      ozelAlan5: null,
      ozelAlan6: null,
      ozelAlan7: null,
      ozelAlan8: null,
      ozelAlan9: null,
      ozelAlan9ID: null,
      ozelAlan10: null,
      ozelAlan10ID: null,
      ozelAlan11: null,
      ozelAlan12: null,
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
    // Hasar numarası validation kontrolü
    if (hasarNoValidationStatus === "invalid") {
      message.error("Hasar numarası geçerli değildir! Lütfen geçerli bir hasar numarası girin.");
      return;
    }

    const Body = {
      hasarNo: String(data.hasarNo),
      aracId: Number(data.plakaID),
      surucuId: Number(data.surucuID),
      tarih: String(formatDateWithDayjs(data.tarih)),
      saat: String(formatTimeWithDayjs(data.saat)),
      olayYeriKodId: Number(data.olayYeriID),
      olayAniAciklamasi: data.aciklama || "",
      hasarTipiKodId: Number(data.hasarTipiID),
      hasarBolgeKodId: Number(data.hasarliBolgeID),
      hasarBoyutuKodId: Number(data.hasarBoyutuID),
      lokasyonId: Number(data.lokasyonID),
      policeNo: data.policeNo || "",
      aracKullanilir: Boolean(data.aracKullanilabilir),
      kazaYapanBaskaArac: Boolean(data.kazayaKarisanBaskaAracVar),
      polisRaporuVar: Boolean(data.polisRaporuVar),
    };

    AxiosInstance.post("DamageTracking/AddDamageTrackItem", Body)
      .then((response) => {
        // Handle successful response here, e.g.:
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success("Ekleme Başarılı.");

          // First close the modal to avoid focus errors
          setOpen(false);
          onRefresh();

          // Then reset the form with a slight delay
          setTimeout(() => {
            methods.reset({
              hasarNo: null,
              hasarTipi: null,
              hasarTipiID: null,
              hasarliBolge: null,
              hasarliBolgeID: null,
              hasarBoyutu: null,
              hasarBoyutuID: null,
              olayYeri: null,
              olayYeriID: null,
              tarih: null,
              saat: null,
              plaka: null,
              plakaID: null,
              surucu: null,
              surucuID: null,
              marka: null,
              model: null,
              lokasyon: null,
              lokasyonID: null,
              policeNo: null,
              aracKullanilabilir: false,
              kazayaKarisanBaskaAracVar: false,
              polisRaporuVar: false,
              aciklama: null,
              ozelAlan1: null,
              ozelAlan2: null,
              ozelAlan3: null,
              ozelAlan4: null,
              ozelAlan5: null,
              ozelAlan6: null,
              ozelAlan7: null,
              ozelAlan8: null,
              ozelAlan9: null,
              ozelAlan9ID: null,
              ozelAlan10: null,
              ozelAlan10ID: null,
              ozelAlan11: null,
              ozelAlan12: null,
            });
          }, 100);
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("Ekleme Başarısız.");
        }
      })
      .catch((error) => {
        // Handle errors here, e.g.:
        console.error("Error sending data:", error);
        message.error("Başarısız Olundu.");
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

  const periyodikBilgisi = watch("periyodikBilgisi");

  useEffect(() => {
    if (periyodikBilgisi === true) {
      setPeriyodikBakim("[Periyodik Bakım]");
    } else {
      setPeriyodikBakim("");
    }
  }, [periyodikBilgisi]);

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
          width="1100px"
          centered
          title={t("yeniHasarGirisi")}
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
              <MainTabs modalOpen={open} onHasarNoValidationChange={setHasarNoValidationStatus} />
              <SecondTabs modalOpen={open} />
            </div>
          </form>
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}

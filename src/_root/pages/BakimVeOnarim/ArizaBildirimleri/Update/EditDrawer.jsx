import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { Button, Space, ConfigProvider, Modal, message, Spin } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import MainTabs from "./components/MainTabs/MainTabs";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";
import { GetPhotosByRefGroupService } from "../../../../../api/services/upload/services";
import { uploadPhoto } from "../../../../../utils/upload";

export default function EditModal({ selectedRow, onDrawerClose, drawerVisible, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [requestItem, setRequestItem] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState(null);

  const methods = useForm({
    defaultValues: {
      talepNo: "",
      tarih: null,
      talepOncelik: null,
      plaka: null,
      plakaID: null,
      lokasyon: null,
      lokasyonID: null,
      aciklama: "",
      files: [],
      talepDurum: "",
      talepEdenId: null,
    },
  });

  const { setValue, reset } = methods;

  const normalizePriority = useCallback((value) => {
    if (!value) return null;
    const normalized = String(value).trim().toLowerCase();
    switch (normalized) {
      case "dusuk":
      case "düşük":
        return "Düşük";
      case "orta":
        return "Orta";
      case "yuksek":
      case "yüksek":
        return "Yüksek";
      case "acil":
        return "Acil";
      default:
        return value || null;
    }
  }, []);

  const uploadImages = useCallback(
    async (recordId) => {
      if (!images) return;
      setLoadingImages(true);
      try {
        const data = await uploadPhoto(recordId, "TALEP_BILDIRIM", images, false);
        if (data?.imageUrl) {
          setImageUrls((prev) => [...prev, data.imageUrl]);
        }
      } catch (error) {
        console.error("Resim yükleme hatası:", error);
        message.error("Resim yüklenemedi. Yeniden deneyin.");
      } finally {
        setLoadingImages(false);
      }
    },
    [images]
  );

  useEffect(() => {
    const handleDataFetchAndUpdate = async () => {
      if (!drawerVisible || !selectedRow?.key) return;
      setLoading(true);
      setImages(null);
      setImageUrls([]);
      try {
        const response = await AxiosInstance.get(`RequestNotification/GetRequestById?id=${selectedRow.key}`);
        const item = response.data;

        setRequestItem(item);
        setValue("talepNo", item?.talepNo || "");
        setValue("tarih", item?.tarih && dayjs(item.tarih).isValid() ? dayjs(item.tarih) : null);
        setValue("talepOncelik", normalizePriority(item?.talepOncelik));
        setValue("plaka", item?.plaka || null);
        setValue("plakaID", item?.aracId || null);
        setValue("lokasyon", item?.lokasyon || null);
        setValue("lokasyonID", item?.lokasyonId || null);
        setValue("aciklama", item?.aciklama || "");
        setValue("files", []);
        setValue("talepDurum", item?.talepDurum || "");
        setValue("talepEdenId", item?.talepEdenId ?? item?.talepEdenID ?? null);

        setLoadingImages(true);
        const photoResponse = await GetPhotosByRefGroupService(selectedRow.key, "TALEP_BILDIRIM");
        setImageUrls(photoResponse?.data || []);
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
        message.error(t("hataOlustu"));
      } finally {
        setLoadingImages(false);
        setLoading(false);
      }
    };

    handleDataFetchAndUpdate();
  }, [drawerVisible, selectedRow, setValue, normalizePriority]);

  const onSubmit = async (data) => {
    setSaving(true);

    const requestId = requestItem?.siraNo ?? selectedRow?.key ?? 0;
    const payload = {
      siraNo: requestId,
      talepNo: data.talepNo || requestItem?.talepNo || "",
      aracId: Number(data.plakaID) || 0,
      lokasyonId: Number(data.lokasyonID) || 0,
      aciklama: data.aciklama || "",
      tarih: data.tarih ? dayjs(data.tarih).format("YYYY-MM-DD") : "",
      talepDurum: requestItem?.talepDurum || data.talepDurum || "beklemede",
      talepOncelik: data.talepOncelik || requestItem?.talepOncelik || "",
      talepTur: "ariza",
      talepEdenId: requestItem?.talepEdenId ?? requestItem?.talepEdenID ?? Number(localStorage.getItem("id")),
    };

    try {
      const response = await AxiosInstance.post("RequestNotification/UpdateRequestItem", payload);
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        uploadImages(requestId);
        message.success(t("guncellemeBasarili"));
        reset();
        onDrawerClose();
        if (onRefresh) onRefresh();
      } else if (response.data.statusCode === 401) {
        message.error(t("buIslemiYapmayaYetkinizBulunmamaktadir"));
      } else {
        message.error(t("basarisizOlundu"));
      }
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      message.error(t("hataOlustu"));
    } finally {
      setSaving(false);
    }
  };

  const onClose = () => {
    Modal.confirm({
      title: t("iptalEtmekIstediginizdenEminMisin"),
      content: t("kaydedilmemisDegisikliklerKaybolacaktir"),
      okText: t("evet"),
      cancelText: t("hayir"),
      onOk: () => {
        reset();
        onDrawerClose();
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <ConfigProvider locale={tr_TR}>
        <Modal
          width="1100px"
          centered
          title={`${t("arizaBildirimi")} ${t("guncelleme")}`}
          open={drawerVisible}
          onCancel={onClose}
          styles={{ body: { maxHeight: "70vh", overflowY: "auto" } }}
          footer={
            <Space>
              <Button onClick={onClose}>{t("iptal")}</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                loading={saving}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                {t("guncelle")}
              </Button>
            </Space>
          }
        >
          {loading ? (
            <div style={{ overflow: "auto", height: "calc(100vh - 150px)" }}>
              <Spin
                spinning={loading}
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* İçerik yüklenirken gösterilecek alan */}
              </Spin>
            </div>
          ) : (
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div>
                <MainTabs imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
              </div>
            </form>
          )}
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}

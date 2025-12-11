import tr_TR from "antd/es/locale/tr_TR";
import "@ant-design/v5-patch-for-react-19";
import { PlusOutlined, ReloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, ConfigProvider, Modal, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MainTabs from "./components/MainTabs/MainTabs";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import AxiosInstance from "../../../../../api/http.jsx";
import SecondTabs from "./components/SecondTabs/SecondTabs.jsx";
// import SecondTabs from "./components/secondTabs/secondTabs";
import { FcRefresh } from "react-icons/fc";

export default function CreateModal({ selectedLokasyonId, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [periyodikBakim, setPeriyodikBakim] = useState("");
  const [latestSimilarService, setLatestSimilarService] = useState(null);
  const [isFetchingLatestSimilarService, setIsFetchingLatestSimilarService] = useState(false);
  const fileInputRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const onClose = () => {
    Modal.confirm({
      title: "İptal etmek istediğinden emin misin?",
      content: "Kaydedilmemiş değişiklikler kaybolacaktır.",
      okText: "Evet",
      cancelText: "Hayır",
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
      PlakaID: "",
      Plaka: null,
      duzenlenmeTarihi: null,
      duzenlenmeSaati: null,
      servisKodu: "",
      servisKoduID: "",
      servisTanimi: "",
      servisTipi: "",
      Surucu: null,
      SurucuID: "",
      servisNedeni: null,
      servisNedeniID: "",
      faturaTarihi: null,
      faturaNo: "",
      hasarNo: "",
      hasarNoID: "",
      talepNo: "",
      onay: null,
      onayID: "",
      onayLabel: "",
      baslamaTarihi: null,
      baslamaSaati: null,
      bitisTarihi: null,
      bitisSaati: null,
      aracKM: "",
      islemiYapan: "1",
      islemiYapan1: "",
      islemiYapan1ID: "",
      iscilikUcreti: "",
      malzemeUcreti: "",
      digerUcreti: "",
      kdvUcreti: "",
      eksiUcreti: "",
      sigortaBilgileri: false,
      sigorta: "",
      sigortaID: "",
      policeNo: "",
      firma: "",
      lokasyonID: "",
      lokasyon: null,

      ozelAlan1: "",
      ozelAlan2: "",
      ozelAlan3: "",
      ozelAlan4: "",
      ozelAlan5: "",
      ozelAlan6: "",
      ozelAlan7: "",
      ozelAlan8: "",
      ozelAlan9: null,
      ozelAlan9ID: "",
      ozelAlan10: null,
      ozelAlan10ID: "",
      ozelAlan11: "",
      ozelAlan12: "",

      durumBilgisi: 1,
      garantiKapsami: false,

      surucuOder: false,

      aciklama: "",
      sikayetler: "",
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

  const { reset, watch } = methods;
  const watchedPlakaId = watch("PlakaID");
  const watchedServisKoduId = watch("servisKoduID");

  const formatLatestSimilarServiceDate = (dateString) => {
    const parsedDate = dayjs(dateString);
    return parsedDate.isValid() ? parsedDate.format("DD.MM.YYYY") : dateString || "";
  };

  // Fetch latest similar service details when both identifiers are present
  useEffect(() => {
    const vehicleId = Number(watchedPlakaId);
    const serviceId = Number(watchedServisKoduId);
    const isValidVehicleId = Number.isFinite(vehicleId) && vehicleId > 0;
    const isValidServiceId = Number.isFinite(serviceId) && serviceId > 0;

    if (!isValidVehicleId || !isValidServiceId) {
      setLatestSimilarService(null);
      setIsFetchingLatestSimilarService(false);
      return;
    }

    let isActive = true;

    const fetchLatestSimilarService = async () => {
      setIsFetchingLatestSimilarService(true);
      setLatestSimilarService(null);
      try {
        const { data } = await AxiosInstance.get("VehicleServices/GetLatestSimilarServiceRecordForVehicle", {
          params: { vId: vehicleId, serviceId },
        });

        if (!isActive) return;

        const hasCompleteData = data && typeof data === "object" && data.firma && data.islem && data.tarih;
        setLatestSimilarService(hasCompleteData ? data : null);
      } catch (error) {
        if (isActive) {
          console.error("Failed to fetch latest similar service record:", error);
          setLatestSimilarService(null);
        }
      } finally {
        if (isActive) {
          setIsFetchingLatestSimilarService(false);
        }
      }
    };

    fetchLatestSimilarService();

    return () => {
      isActive = false;
    };
  }, [watchedPlakaId, watchedServisKoduId]);

  //* export
  const onSubmit = (data) => {
    const Body = {
      aracId: Number(data.PlakaID),
      bakimId: Number(data.servisKoduID),
      kazaId: Number(data.hasarNoID),
      durumBilgisi: 1,
      islemiYapan: Number(data.islemiYapan),
      servisNedeniKodId: Number(data.servisNedeniID),

      islemiYapanId: Number(data.islemiYapan1ID),
      surucuId: Number(data.SurucuID),
      // lokasyonId: data.,
      km: Number(data.aracKM),
      indirim: Number(data.eksiUcreti),
      // toplam: data.,
      kdv: Number(data.kdvUcreti),
      diger: Number(data.digerUcreti),
      malzeme: Number(data.malzemeUcreti),
      iscilik: Number(data.iscilikUcreti),
      talepNo: data.talepNo,
      onayId: Number(data.onayID),
      tarih: formatDateWithDayjs(data.duzenlenmeTarihi) || null,
      baslamaTarih: formatDateWithDayjs(data.baslamaTarihi) || null,
      bitisTarih: formatDateWithDayjs(data.bitisTarihi) || null,
      faturaTarih: formatDateWithDayjs(data.faturaTarihi) || null,
      saat: formatTimeWithDayjs(data.duzenlenmeSaati) || null,
      baslamaSaat: formatTimeWithDayjs(data.baslamaSaati) || null,
      bitisSaat: formatTimeWithDayjs(data.bitisSaati) || null,
      faturaNo: data.faturaNo,
      aciklama: data.aciklama,
      sikayetler: data.sikayetler,
      sigortaVar: data.sigortaBilgileri,
      surucuOder: data.surucuOder,
      garantili: data.garantiKapsami,
      sigortaId: Number(data.sigortaID),
      ozelAlan1: data.ozelAlan1,
      ozelAlan2: data.ozelAlan2,
      ozelAlan3: data.ozelAlan3,
      ozelAlan4: data.ozelAlan4,
      ozelAlan5: data.ozelAlan5,
      ozelAlan6: data.ozelAlan6,
      ozelAlan7: data.ozelAlan7,
      ozelAlan8: data.ozelAlan8,
      ozelAlanKodId9: Number(data.ozelAlan9ID),
      ozelAlanKodId10: Number(data.ozelAlan10ID),
      ozelAlan11: Number(data.ozelAlan11),
      ozelAlan12: Number(data.ozelAlan12),
      isRecordSeen: true,
      lokasyonId: Number(data.lokasyonID),
    };

    // AxiosInstance.post("/api/endpoint", { Body }).then((response) => {
    // handle response
    // });

    AxiosInstance.post("VehicleServices/AddServiceItem", Body)
      .then((response) => {
        // Handle successful response here, e.g.:
        console.log("Data sent successfully:", response);

        if (response.data.statusCode === 200 || response.data.statusCode === 201) {
          message.success("Ekleme Başarılı.");
          setOpen(false);
          onRefresh();
          reset();
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

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Async API polling helpers for long-running AI jobs
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pollJobResult = async (jobId, { maxMs = 120000, intervalMs = 2000 } = {}) => {
    const start = Date.now();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const elapsed = Date.now() - start;
      if (elapsed > maxMs) throw new Error("AI job timeout");
      const { data: job } = await axios.get(`https://ai-chat-anar.vercel.app/ai/jobs/${jobId}`);
      if (job?.status === "done") return job.result;
      if (job?.status === "error") throw new Error(job?.error || "AI job failed");
      await sleep(intervalMs);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (!selectedFile) return;

    Modal.confirm({
      title: "Dosyayı gönder?",
      content: `"${selectedFile.name}" dosyasını AI servisine göndermek istiyor musunuz?`,
      okText: "Tamam",
      cancelText: "Vazgeç",
      onOk: async () => {
        const form = new FormData();
        form.append(
          "prompt",
          `Bu gönderdiğim dosyadaki verilere dayanarak şu json yapısında istenen ilgili yerleri doldur bana geri gönder
{
Plaka: "",
servisKodu: "",
servisTanimi: "",
Surucu: "",
servisNedeni: "",
yetkiliServis: "",
faturaNo: "",
faturaTarihi: "",
onay: "",
sikayetler: "",
aciklama: ""
}`
        );
        form.append("model", "gemini-2.5-flash");
        form.append("enableWebSearch", "false");
        form.append("file", selectedFile);

        try {
          const { data } = await axios.post("https://ai-chat-anar.vercel.app/ai/execute/async", form, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          message.success("Dosya yüklendi, işleniyor...");

          let resultText = null;
          if (typeof data?.result === "string") {
            resultText = data.result;
          } else if (data?.jobId) {
            resultText = await pollJobResult(data.jobId, {
              maxMs: 120000,
              intervalMs: 2000,
            });
          } else {
            throw new Error("Beklenmeyen API yanıtı");
          }

          // Gelen yanıttan JSON'u çıkar ve form alanlarına set et
          const extractJson = (resultStr) => {
            if (typeof resultStr !== "string") return null;
            const fenced = resultStr.match(/```json\n([\s\S]*?)\n```/i) || resultStr.match(/```([\s\S]*?)```/);
            const jsonLike = fenced ? fenced[1] : resultStr;
            try {
              return JSON.parse(jsonLike);
            } catch (e) {
              console.warn("AI JSON parse failed:", e);
              return null;
            }
          };

          const parsed = extractJson(resultText);
          if (parsed && typeof parsed === "object") {
            const parseToDayjs = (value) => {
              if (!value) return null;
              if (dayjs.isDayjs(value)) return value;
              const formats = [
                "DD-MM-YYYY HH:mm",
                "DD-MM-YYYY HH:mm:ss",
                "DD-MM-YYYY",
                "YYYY-MM-DD",
                "YYYY-MM-DD HH:mm",
                "YYYY-MM-DD HH:mm:ss",
                "YYYY-MM-DDTHH:mm:ss",
                "YYYY/MM/DD",
                "DD/MM/YYYY",
                "MM/DD/YYYY",
                "DD.MM.YYYY",
                "DD.MM.YYYY HH:mm",
                "DD.MM.YYYY HH:mm:ss",
              ];
              for (let i = 0; i < formats.length; i += 1) {
                const candidate = dayjs(value, formats[i], true);
                if (candidate.isValid()) return candidate;
              }
              const fallback = dayjs(value);
              return fallback.isValid() ? fallback : null;
            };

            const fieldMappings = [
              { key: "Plaka", field: "Plaka", normalize: (v) => v ?? null },
              {
                key: "servisKodu",
                field: "servisKodu",
                normalize: (v) => v ?? "",
              },
              {
                key: "servisTanimi",
                field: "servisTanimi",
                normalize: (v) => v ?? "",
              },
              { key: "Surucu", field: "Surucu", normalize: (v) => v ?? null },
              {
                key: "servisNedeni",
                field: "servisNedeni",
                normalize: (v) => v ?? null,
              },
              {
                key: "yetkiliServis",
                field: "islemiYapan1",
                normalize: (v) => v ?? "",
              },
              { key: "faturaNo", field: "faturaNo", normalize: (v) => v ?? "" },
              {
                key: "faturaTarihi",
                field: "faturaTarihi",
                normalize: parseToDayjs,
              },
              { key: "onay", field: "onay", normalize: (v) => v ?? null },
              {
                key: "sikayetler",
                field: "sikayetler",
                normalize: (v) => v ?? "",
              },
              { key: "aciklama", field: "aciklama", normalize: (v) => v ?? "" },
            ];

            fieldMappings.forEach(({ key, field, normalize }) => {
              if (Object.prototype.hasOwnProperty.call(parsed, key)) {
                methods.setValue(field, normalize(parsed[key]));
              }
            });
          }
        } catch (error) {
          console.error("AI upload error:", error);
          message.error("Dosya gönderilemedi.");
        } finally {
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      },
      onCancel: () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
      },
    });
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
          Ekle
        </Button>
        <Modal
          width="1300px"
          centered
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                width: "100%",
                paddingRight: 30,
              }}
            >
              <span>{`Yeni Servis Girişi ${periyodikBakim}`}</span>
              <div>
                <Button
                  size="small"
                  icon={<UploadOutlined />}
                  onClick={handleUploadButtonClick}
                  style={{
                    backgroundColor: "#722ed1",
                    borderColor: "#722ed1",
                    color: "#ffffff",
                  }}
                >
                  OCR
                </Button>
                <input ref={fileInputRef} type="file" accept="application/pdf,image/*" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
            </div>
          }
          destroyOnClose
          open={open}
          onCancel={onClose}
          footer={
            <Space>
              <Button onClick={onClose}>İptal</Button>
              <Button
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                style={{
                  backgroundColor: "#2bc770",
                  borderColor: "#2bc770",
                  color: "#ffffff",
                }}
              >
                Kaydet
              </Button>
            </Space>
          }
        >
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div>
              <MainTabs modalOpen={open} />
              <SecondTabs />
              {!isFetchingLatestSimilarService && latestSimilarService && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginTop: 16,
                    padding: "12px 16px",
                    borderRadius: 6,
                    border: "1px solid #91caff",
                    backgroundColor: "#f0f5ff",
                  }}
                >
                  <FcRefresh style={{ fontSize: 20, color: "#0958d9", marginTop: 2 }} />
                  <div>
                    <p style={{ margin: 0 }}>
                      Bu araca &quot;<strong>{latestSimilarService.islem}</strong>&quot; işlemi daha önce <strong>{formatLatestSimilarServiceDate(latestSimilarService.tarih)}</strong>{" "}
                      tarihinde uygulanmıştır.
                    </p>
                    <p style={{ margin: "4px 0 0" }}>
                      İşlem, <strong>{latestSimilarService.firma}</strong> servisinde gerçekleştirilmiş ve <strong>tamamlanmış</strong> olarak kaydedilmiştir.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </form>
        </Modal>
      </ConfigProvider>
    </FormProvider>
  );
}

CreateModal.propTypes = {
  selectedLokasyonId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onRefresh: PropTypes.func.isRequired,
};

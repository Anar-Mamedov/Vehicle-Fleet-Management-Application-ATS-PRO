import React, { useEffect, useState } from "react";
import { Switch, Typography, Spin, message, Button } from "antd";
import AxiosInstance from "../../../../../api/http";
import { t } from "i18next";

function SifreAyarlari() {
  const [loading, setLoading] = useState(true);
  const [isStrongPasswordRequired, setIsStrongPasswordRequired] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`CommonSettings/GetSettingByType?type=5`);
        const item = response?.data ?? response;
        if (isMounted) {
          setIsStrongPasswordRequired(Boolean(item));
        }
      } catch (error) {
        console.error("SifreAyarlari: Ayar verisi çekilirken hata oluştu:", error);
        message.error(t("hataOlustu"));
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdate = async () => {
    try {
      const body = {
        SifreGuclu: isStrongPasswordRequired,
        siraNo: 1,
      };
      const response = await AxiosInstance.post("CommonSettings/UpdateSettingByType?type=5", body);

      if (response?.data?.statusCode === 200 || response?.data?.statusCode === 201 || response?.data?.statusCode === 202) {
        message.success(t("guncellemeBasarili") || "Güncelleme Başarılı.");
        try {
          const refetch = await AxiosInstance.get(`CommonSettings/GetSettingByType?type=5`);
          const latestValue = refetch?.data ?? refetch;
          setIsStrongPasswordRequired(Boolean(latestValue));
        } catch (refetchError) {
          console.error("SifreAyarlari: Güncelleme sonrası veri çekme hatası:", refetchError);
        }
      } else if (response?.data?.statusCode === 401) {
        message.error(t("yetkiYok") || "Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error(t("guncellemeBasarisiz") || "Güncelleme Başarısız.");
      }
    } catch (error) {
      console.error("SifreAyarlari: Güncelleme sırasında hata oluştu:", error);
      if (navigator.onLine) {
        message.error((t("hataMesaji") || "Hata Mesajı") + ": " + (error?.message || ""));
      } else {
        message.error(t("internetYok") || "Internet Bağlantısı Mevcut Değil.");
      }
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingBottom: "10px", maxWidth: 720 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography.Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("guclendirilmiSifreKullanimiZorunlu")}</Typography.Text>
        <Switch checked={isStrongPasswordRequired} onChange={setIsStrongPasswordRequired} />
      </div>

      <Button type="submit" onClick={handleUpdate} style={{ backgroundColor: "#2bc770", borderColor: "#2bc770", color: "#ffffff" }}>
        {t("guncelle")}
      </Button>
    </div>
  );
}

export default SifreAyarlari;

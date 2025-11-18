import React, { useState } from "react";
import { Button, message } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { t } from "i18next";

export default function OnayaGonder({ selectedRows = [] }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (selectedRows.length === 0) {
      message.warning("Lütfen satır seçili olduğundan emin olun.");
      return;
    }

    setLoading(true);

    try {
      // selectedRows içindeki her obje için request body oluştur
      const requestBody = selectedRows.map((row) => ({
        aracId: row.aracId,
        sikayetler: row.aciklama || "",
        talepId: row.siraNo,
        talepNo: row.talepNo,
        lokasyonId: row.lokasyonId,
        surucuId: row.talepEdenId,
        tarih: row.tarih,
        talepEdilenNesne: `${row.plaka} -> servisKayidi`,
        talepDurum: row.talepDurum || "",
      }));

      // API'ye gönder
      const response = await AxiosInstance.post("RequestNotification/ToServiceItem", requestBody);

      if (response.data.statusCode === 200) {
        message.success(t("islemBasarili"));
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Servis işlemi oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="link" onClick={handleSubmit} loading={loading} style={{ padding: "unset", height: "unset" }}>
      {t("onayaGonder")}
    </Button>
  );
}

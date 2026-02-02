import React, { useState } from "react";
import { message } from "antd";
import AxiosInstance from "../../../../../../api/http";
import { t } from "i18next";

export default function OnayaGonder({ selectedRows, refreshTableData, hidePopover }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedRows || selectedRows.length === 0) {
      message.warning("Lütfen satır seçili olduğundan emin olun.");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
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

      const response = await AxiosInstance.post("RequestNotifHandler/ToApprovalItem", requestBody);

      if (response?.data?.statusCode === 206) {
        message.success(t("islemBasarili"));

        if (typeof hidePopover === "function") {
          hidePopover();
        }

        if (typeof refreshTableData === "function") {
          refreshTableData();
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "İşlem sırasında bir hata oluştu.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{
        padding: "5px 0px",
        cursor: loading ? "not-allowed" : "pointer",
        color: loading ? "#999" : "#1890ff",
        userSelect: "none",
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? "Yükleniyor..." : t("onayaGonder")}
    </div>
  );
}

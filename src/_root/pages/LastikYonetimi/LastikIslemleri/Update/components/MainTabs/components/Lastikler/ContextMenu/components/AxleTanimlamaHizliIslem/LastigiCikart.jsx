import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../../../../../../../../../../api/http";
import { Button, Modal, DatePicker, Input, Form, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { t } from "i18next";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function LastigiCikart({ titleLabel, selectedRows, refreshTableData, selectedAracDetay, durumId, islemTipId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAxleId, setSelectedAxleId] = useState(null);
  const [clearSelectData, setClearSelectData] = useState(false);
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  useEffect(() => {
    // Get language from localStorage
    const language = localStorage.getItem("i18nextLng") || "tr";

    // Set date format based on language
    switch (language) {
      case "en":
        setDateFormat("MM/DD/YYYY");
        break;
      case "ru":
        setDateFormat("DD.MM.YYYY");
        break;
      case "az":
        setDateFormat("DD.MM.YYYY");
        break;
      case "tr":
      default:
        setDateFormat("DD.MM.YYYY");
        break;
    }
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: null,
      notes: "",
    },
  });

  const showModal = () => {
    setClearSelectData(true);
    setIsModalOpen(true);
    reset({
      date: dayjs(),
      notes: "",
    });
  };

  const handleOk = async (data) => {
    try {
      // Calculate km by subtracting takildigiKm from guncelKm
      const calculatedKm = selectedAracDetay && selectedRows ? (selectedAracDetay.guncelKm || 0) - (selectedRows.takildigiKm || 0) : 0;

      // Ensure km is not negative
      const km = calculatedKm > 0 ? calculatedKm : 0;

      const response = await AxiosInstance.post(`TyreOperation/RemoveTyreItem`, {
        siraNo: selectedRows.siraNo,
        tarih: data.date ? data.date.format("YYYY-MM-DD") : null,
        aciklama: data.notes,
        islemTipId: islemTipId,
        durumId: durumId,
        km: km,
      });
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202) {
        message.success(t("islemBasarili"));
        refreshTableData();
        setIsModalOpen(false);
        setSelectedAxleId(null);
        setClearSelectData(true);
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch (error) {
      console.error("Error updating axle:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAxleId(null);
    setClearSelectData(true);
    reset();
  };

  return (
    <div>
      <div onClick={showModal} style={{ cursor: "pointer" }}>
        {titleLabel}
      </div>
      <Modal
        title={titleLabel}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {t("iptal")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit(handleOk)}>
            {t("kaydet")}
          </Button>,
        ]}
      >
        <div style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 8 }}>
            <label>{t("tarih")}:</label>
            <Controller
              name="date"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => (
                <div>
                  <DatePicker
                    style={{ width: "100%", marginTop: 4 }}
                    placeholder="Tarih seçiniz"
                    format={dateFormat}
                    {...field}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    status={errors.date ? "error" : ""}
                  />
                  {errors.date && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.date.message}</div>}
                </div>
              )}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <label>{t("aciklama")}:</label>
            <Controller
              name="notes"
              control={control}
              rules={{ required: t("alanBosBirakilamaz") }}
              render={({ field }) => (
                <div>
                  <TextArea {...field} rows={4} placeholder={t("aciklama")} style={{ marginTop: 4 }} status={errors.notes ? "error" : ""} />
                  {errors.notes && <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>{errors.notes.message}</div>}
                </div>
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

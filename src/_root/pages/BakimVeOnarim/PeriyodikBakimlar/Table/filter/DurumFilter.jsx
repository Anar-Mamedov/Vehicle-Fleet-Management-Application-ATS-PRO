import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select } from "antd";
import { t } from "i18next";

export default function DurumFilter() {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue("durumFilter", "all");
  }, [setValue]);

  return (
    <div>
      <Controller
        name="durumFilter"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            style={{ width: "130px" }}
            placeholder={t("durumSeciniz") || "Durum Seçiniz"}
            options={[
              { value: "all", label: t("tumu") || "Tümü" },
              { value: "normal", label: t("normal") || "Normal" },
              { value: "kritik", label: t("kritik") || "Kritik" },
              { value: "gecikmis", label: t("gecikmis") || "Gecikmiş" },
              { value: "yaklasiyor", label: t("yaklasiyor") || "Yaklaşıyor" },
            ]}
          />
        )}
      />
    </div>
  );
}

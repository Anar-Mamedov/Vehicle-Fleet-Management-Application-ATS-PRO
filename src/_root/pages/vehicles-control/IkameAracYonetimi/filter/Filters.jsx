import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Select, DatePicker, ConfigProvider } from "antd";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";

dayjs.locale("tr");

const { Option } = Select;

export default function Filters({ onChange }) {
  const [durum, setDurum] = useState(0);
  const [tarih, setTarih] = useState(null);

  const applyFilters = useCallback(
    (newDurum, newTarih) => {
      const customfilters = {
        durum: newDurum,
      };
      if (newTarih) {
        customfilters.tarih = dayjs(newTarih).format("YYYY-MM-DD");
      }
      onChange("filters", { customfilters });
    },
    [onChange]
  );

  const handleDurumChange = (value) => {
    setDurum(value);
    applyFilters(value, tarih);
  };

  const handleTarihChange = (date) => {
    setTarih(date);
    applyFilters(durum, date);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Select value={durum} onChange={handleDurumChange} style={{ width: 120 }} popupMatchSelectWidth={false}>
        <Option value={0}>{t("tumu")}</Option>
        <Option value={1}>{t("aktif")}</Option>
        <Option value={2}>{t("pasif")}</Option>
      </Select>
      <ConfigProvider locale={tr_TR}>
        <DatePicker value={tarih} onChange={handleTarihChange} placeholder={t("tarih")} style={{ width: 140 }} format="DD.MM.YYYY" locale={dayjs.locale("tr")} />
      </ConfigProvider>
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

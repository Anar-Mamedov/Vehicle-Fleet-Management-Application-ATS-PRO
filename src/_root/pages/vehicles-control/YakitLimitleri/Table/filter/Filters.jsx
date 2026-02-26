import React, { useCallback, useEffect, useState } from "react";
import { Select, DatePicker } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";
import LokasyonTablo from "../../../../../components/LokasyonTable";

export default function Filters({ onChange }) {
  const [customFilter, setCustomFilter] = useState({});

  useEffect(() => {
    onChange("filters", { customfilter: customFilter });
  }, [customFilter, onChange]);

  const handleLokasyonChange = useCallback((selectedData) => {
    setCustomFilter((prev) => {
      const updated = { ...prev };
      if (Array.isArray(selectedData) && selectedData.length > 0) {
        updated.lokasyonIds = selectedData.map((item) => item.locationId);
      } else {
        delete updated.lokasyonIds;
      }
      return updated;
    });
  }, []);

  const handleDurumChange = useCallback((value) => {
    setCustomFilter((prev) => {
      const updated = { ...prev };
      if (value !== undefined && value !== null) {
        updated.durum = value;
      } else {
        delete updated.durum;
      }
      return updated;
    });
  }, []);

  const handleDateChange = useCallback((date) => {
    setCustomFilter((prev) => {
      const updated = { ...prev };
      if (date) {
        updated.yil = date.year();
        updated.ay = date.month() + 1;
      } else {
        delete updated.yil;
        delete updated.ay;
      }
      return updated;
    });
  }, []);

  return (
    <>
      <LokasyonTablo onSubmit={handleLokasyonChange} multiSelect style={{ width: "200px" }} />
      <Select
        allowClear
        placeholder={t("durum")}
        style={{ width: 180 }}
        onChange={handleDurumChange}
        options={[
          { value: "normal", label: t("normal") },
          { value: "uyari", label: t("uyari") },
          { value: "asildi", label: t("asildi") },
        ]}
      />
      <DatePicker
        picker="month"
        placeholder={t("tarih")}
        style={{ width: 180 }}
        onChange={handleDateChange}
      />
    </>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

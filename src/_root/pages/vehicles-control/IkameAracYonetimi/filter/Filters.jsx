import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Select } from "antd";
import { t } from "i18next";
import LokasyonTable from "../../../../components/LokasyonTable";
import ZamanAraligi from "./ZamanAraligi";

const { Option } = Select;

export default function Filters({ onChange }) {
  const [durum, setDurum] = useState(0);
  const [lokasyonIds, setLokasyonIds] = useState([]);
  const [dateRange, setDateRange] = useState({ baslangicTarih: null, bitisTarih: null });
  const [isTimeRangeReady, setIsTimeRangeReady] = useState(false);
  const onChangeRef = useRef(onChange);

  const methods = useForm({
    defaultValues: {
      timeRange: "all",
      baslangicTarih: null,
      bitisTarih: null,
    },
  });

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleTimeRangeReady = useCallback(() => {
    setIsTimeRangeReady(true);
  }, []);

  useEffect(() => {
    if (!isTimeRangeReady) {
      return;
    }

    const customfilters = {
      durum,
    };

    if (Array.isArray(lokasyonIds) && lokasyonIds.length > 0) {
      customfilters.lokasyonIds = lokasyonIds;
    }

    if (dateRange.baslangicTarih || dateRange.bitisTarih) {
      customfilters.baslangicTarih = dateRange.baslangicTarih;
      customfilters.bitisTarih = dateRange.bitisTarih;
    }

    onChangeRef.current("filters", { customfilters });
  }, [dateRange, durum, isTimeRangeReady, lokasyonIds]);

  const handleLokasyonChange = (selectedData) => {
    const selectedLokasyonIds =
      Array.isArray(selectedData) && selectedData.length > 0
        ? selectedData.map((item) => item.locationId).filter((id) => id !== undefined && id !== null)
        : [];

    setLokasyonIds(selectedLokasyonIds);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <FormProvider {...methods}>
        <ZamanAraligi onDateChange={setDateRange} onReady={handleTimeRangeReady} />
      </FormProvider>
      <LokasyonTable fieldName="lokasyonIds" multiSelect={true} onSubmit={handleLokasyonChange} style={{ width: 200 }} />
      <Select value={durum} onChange={setDurum} style={{ width: 120 }} popupMatchSelectWidth={false}>
        <Option value={0}>{t("tumu")}</Option>
        <Option value={1}>{t("aktif")}</Option>
        <Option value={2}>{t("iadeEdildi")}</Option>
        <Option value={3}>{t("suresiDoldu")}</Option>
      </Select>
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

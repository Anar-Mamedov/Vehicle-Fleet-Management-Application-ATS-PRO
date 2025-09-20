import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import LokasyonTable from "../../../../components/LokasyonTable"; // veya LocationFilter
import ZamanAraligi from "./ZamanAraligi";

export default function Filters({ onChange }) {
  const [lokasyonIds, setLokasyonIds] = useState([]);
  const [dateRange, setDateRange] = useState({ baslangicTarih: null, bitisTarih: null });

  const methods = useForm({
    defaultValues: {
      timeRange: "all",
      baslangicTarih: null,
      bitisTarih: null,
    },
  });

  useEffect(() => {
    const hasLocation = Array.isArray(lokasyonIds) && lokasyonIds.length > 0;
    const hasDates = Boolean(dateRange.baslangicTarih || dateRange.bitisTarih);

    if (!hasLocation && !hasDates) {
      onChange("filters", {});
      return;
    }

    const customfilters = {};
    if (hasLocation) customfilters.lokasyonIds = lokasyonIds;
    if (hasDates) {
      customfilters.baslangicTarih = dateRange.baslangicTarih;
      customfilters.bitisTarih = dateRange.bitisTarih;
    }

    onChange("filters", { customfilters });
  }, [lokasyonIds, dateRange, onChange]);

  const handleLokasyonChange = (value) => {
    // multiSelect=true: value dizi olabilir, temizlemede null gelebilir
    if (!value) {
      setLokasyonIds([]);
      return;
    }

    // LokasyonTablo multiSelect modunda seçilen öğeleri array olarak gönderiyor
    if (Array.isArray(value)) {
      const ids = value.map((item) => item && (item.locationId ?? item.key)).filter((id) => id !== undefined && id !== null);
      setLokasyonIds(ids);
      return;
    }

    // Single-select güvenlik: object -> tek id
    if (value && (value.locationId || value.key)) {
      setLokasyonIds([value.locationId ?? value.key]);
      return;
    }

    setLokasyonIds([]);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <FormProvider {...methods}>
        <ZamanAraligi onDateChange={setDateRange} />
      </FormProvider>
      <LokasyonTable onSubmit={handleLokasyonChange} multiSelect={true} />
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

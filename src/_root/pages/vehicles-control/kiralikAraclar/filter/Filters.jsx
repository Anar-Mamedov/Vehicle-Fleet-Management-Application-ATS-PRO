import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import LokasyonTable from "../../../../components/LokasyonTable"; // veya LocationFilter
import ZamanAraligi from "./ZamanAraligi";

export default function Filters({ onChange }) {
  const [lokasyonId, setLokasyonId] = useState(null);
  const [dateRange, setDateRange] = useState({ baslangicTarih: null, bitisTarih: null });

  const methods = useForm({
    defaultValues: {
      timeRange: "all",
      baslangicTarih: null,
      bitisTarih: null,
    },
  });

  useEffect(() => {
    const hasLocation = Boolean(lokasyonId && lokasyonId.locationId);
    const hasDates = Boolean(dateRange.baslangicTarih || dateRange.bitisTarih);

    if (!hasLocation && !hasDates) {
      onChange("filters", {});
      return;
    }

    const customfilters = {};
    if (hasLocation) customfilters.lokasyonId = lokasyonId.locationId;
    if (hasDates) {
      customfilters.baslangicTarih = dateRange.baslangicTarih;
      customfilters.bitisTarih = dateRange.bitisTarih;
    }

    onChange("filters", { customfilters });
  }, [lokasyonId, dateRange, onChange]);

  const handleLokasyonChange = (value) => {
    // hem state'i güncelle, hem filtreyi tetikle
    setLokasyonId(value);
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

import React, { useState, useEffect } from "react";
import ConditionFilter from "./ConditionFilter";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import CustomFilter from "./custom-filter/CustomFilter";
import ZamanAraligi from "./ZamanAraligi";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import PlakaSelectbox from "../../../../components/PlakaSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import { t } from "i18next";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Filters({ onChange }) {
  const [filters, setFilters] = useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilters: {},
  });

  const [timeRangeFilters, setTimeRangeFilters] = useState({});
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [lokasyonId, setLokasyonId] = useState(null);
  const [plakaId, setPlakaId] = useState("");
  const [dateRangeCleared, setDateRangeCleared] = useState(false);

  useEffect(() => {
    if (hasUserInteracted) {
      const updatedFilters = {
        ...filters,
        customfilters: {
          ...filters.customfilters,
          ...timeRangeFilters,
        },
      };

      onChange("filters", updatedFilters);
    }
  }, [timeRangeFilters, filters, hasUserInteracted, onChange]);

  const handleTimeRangeChange = (dates) => {
    if (dates.baslangicTarih === null && dates.bitisTarih === null) {
      setDateRangeCleared(true);

      setTimeRangeFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.baslangicTarih;
        delete newFilters.bitisTarih;
        return newFilters;
      });

      setFilters((prev) => {
        const newCustomFilters = { ...prev.customfilters };
        delete newCustomFilters.baslangicTarih;
        delete newCustomFilters.bitisTarih;
        return {
          ...prev,
          customfilters: newCustomFilters,
        };
      });
    } else {
      setDateRangeCleared(false);
      setHasUserInteracted(true);
      setTimeRangeFilters(dates);
    }
  };

  const handlePlakaChange = (value) => {
    setPlakaId(value);
  };

  const handleLokasyonChange = (value) => {
    setLokasyonId(value);
  };

  const handleCustomFilterSubmit = (newFilters) => {
    setHasUserInteracted(true);

    // Start with preserving important current filters
    const currentCustomFilters = { ...filters.customfilters };
    const preservedFilters = {};

    // Preserve aracId and lokasyonId if they exist in current filters
    if ("aracId" in currentCustomFilters) {
      preservedFilters.aracId = currentCustomFilters.aracId;
    }

    if ("lokasyonId" in currentCustomFilters) {
      preservedFilters.lokasyonId = currentCustomFilters.lokasyonId;
    }

    // Merge the preserved filters with new custom filters
    const updatedCustomFilters = {
      ...preservedFilters,
      ...newFilters,
    };

    // Add date range filters if they exist and aren't cleared
    if (!dateRangeCleared) {
      if (timeRangeFilters.baslangicTarih) updatedCustomFilters.baslangicTarih = timeRangeFilters.baslangicTarih;
      if (timeRangeFilters.bitisTarih) updatedCustomFilters.bitisTarih = timeRangeFilters.bitisTarih;
    }

    const updatedFilters = {
      ...filters,
      customfilters: updatedCustomFilters,
    };

    setFilters(updatedFilters);
    onChange("filters", updatedFilters);
  };

  const handleSearch = () => {
    setHasUserInteracted(true);

    const mainFilterValues = {};

    if (plakaId && plakaId !== "") {
      mainFilterValues.aracId = plakaId;
    }

    if (lokasyonId && lokasyonId.locationId && lokasyonId.locationId !== 0) {
      mainFilterValues.lokasyonId = lokasyonId.locationId;
    }

    if (!dateRangeCleared) {
      if (timeRangeFilters.baslangicTarih) mainFilterValues.baslangicTarih = timeRangeFilters.baslangicTarih;
      if (timeRangeFilters.bitisTarih) mainFilterValues.bitisTarih = timeRangeFilters.bitisTarih;
    }

    const currentCustomFilters = { ...filters.customfilters };

    if ("aracId" in currentCustomFilters && (!plakaId || plakaId === "")) {
      delete currentCustomFilters.aracId;
    }

    if ("lokasyonId" in currentCustomFilters && (!lokasyonId || !lokasyonId.locationId)) {
      delete currentCustomFilters.lokasyonId;
    }

    if (dateRangeCleared) {
      delete currentCustomFilters.baslangicTarih;
      delete currentCustomFilters.bitisTarih;
    }

    const updatedFilters = {
      ...filters,
      customfilters: {
        ...currentCustomFilters,
        ...mainFilterValues,
      },
    };

    setFilters(updatedFilters);

    onChange("filters", updatedFilters);

    console.log("Arama yapılıyor:", updatedFilters);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <PlakaSelectbox
          name1={"plaka"}
          addHide={true}
          kodID={100}
          isRequired={false}
          onChange={handlePlakaChange}
          inputWidth="100px"
          dropdownWidth="300px"
          placeholder={t("plaka")}
        />
      </div>
      <div style={{ display: "flex", gap: "10px", width: "100px" }}>
        <LokasyonTable onSubmit={handleLokasyonChange} />
      </div>
      {/*<TypeFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, isemritipleri: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}
      {/*<ConditionFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, durumlar: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}
      {/*<LocationFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, lokasyonlar: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}
      <Button
        onClick={handleSearch}
        icon={<SearchOutlined />}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
        }}
      >
        {/* Ara */}
      </Button>
      <ZamanAraligi onDateChange={handleTimeRangeChange} />
      <CustomFilter onSubmit={handleCustomFilterSubmit} currentFilters={filters.customfilters} />
    </>
  );
}

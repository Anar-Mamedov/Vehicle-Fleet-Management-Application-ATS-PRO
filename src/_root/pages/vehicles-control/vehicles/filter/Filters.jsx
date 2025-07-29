import React from "react";
import ConditionFilter from "./ConditionFilter";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import CustomFilter from "./custom-filter/CustomFilter";
import PlakaSelectbox from "../../../../components/PlakaSelectbox";
import MarkaSelectbox from "../../../../components/MarkaSelectbox";
import ModelSelectbox from "../../../../components/ModelSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import { t } from "i18next";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function Filters({ onChange, durumValue, onClearDurum }) {
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
    aracId: "",
    markaIds: [],
    modelIds: [],
    lokasyonId: null,
  });

  const [aracTipIds, setAracTipIds] = React.useState([]);
  const [markaIds, setMarkaIds] = React.useState([]);
  const [modelIds, setModelIds] = React.useState([]);
  const [lokasyonId, setLokasyonId] = React.useState(null);
  const [customFilterValues, setCustomFilterValues] = React.useState({});

  const handleSearch = () => {
    // Create an object with only the currently selected values from the main filters
    const mainFilterValues = {};

    if (aracTipIds) mainFilterValues.aracTipIds = aracTipIds;
    if (markaIds) mainFilterValues.markaIds = markaIds;
    if (modelIds) mainFilterValues.modelIds = modelIds;
    if (lokasyonId) {
      // Multi-select modunda lokasyonId bir array olacak
      if (Array.isArray(lokasyonId)) {
        // Array'den locationId'leri al
        const locationIds = lokasyonId.map((item) => item.locationId).filter(Boolean);
        if (locationIds.length > 0) {
          mainFilterValues.lokasyonIds = locationIds;
        }
      } else {
        // Single-select modunda tek obje
        if (lokasyonId.locationId) {
          mainFilterValues.lokasyonId = lokasyonId.locationId;
        }
      }
    }

    // Check if there are any filter values
    const hasFilterValues = Object.keys(mainFilterValues).length > 0 || Object.keys(customFilterValues).length > 0;

    // If there are filter values, clear the DurumSelectbox
    if (hasFilterValues && onClearDurum) {
      onClearDurum();
      // Since we're clearing the durum, don't include durumValue in the filters
      // The onClearDurum function will handle updating the parent component's state
    }

    // Merge main filter values with custom filter values
    const updatedFilters = {
      ...filters,
      customfilters: {
        ...customFilterValues, // Keep the custom filter values
        ...mainFilterValues, // Add/update with main filter values
      },
      // Only include durumValue if we're not clearing it (i.e., no other filters are active)
      ...(hasFilterValues ? {} : durumValue !== undefined ? { durumValue } : {}),
    };

    // Update internal state
    setFilters(updatedFilters);

    // Only trigger onChange when the search button is clicked
    onChange("filters", updatedFilters);
  };

  // Handler for CustomFilter submissions
  const handleCustomFilterSubmit = (newFilters) => {
    // Update the customFilterValues state
    setCustomFilterValues(newFilters);

    // Create an object with only the currently selected values from the main filters
    const mainFilterValues = {};

    if (aracTipIds) mainFilterValues.aracTipIds = aracTipIds;
    if (markaIds) mainFilterValues.markaIds = markaIds;
    if (modelIds) mainFilterValues.modelIds = modelIds;
    if (lokasyonId) {
      // Multi-select modunda lokasyonId bir array olacak
      if (Array.isArray(lokasyonId)) {
        // Array'den locationId'leri al
        const locationIds = lokasyonId.map((item) => item.locationId).filter(Boolean);
        if (locationIds.length > 0) {
          mainFilterValues.lokasyonIds = locationIds;
        }
      } else {
        // Single-select modunda tek obje
        if (lokasyonId.locationId) {
          mainFilterValues.lokasyonId = lokasyonId.locationId;
        }
      }
    }

    // Check if there are any filter values
    const hasFilterValues = Object.keys(newFilters).length > 0 || Object.keys(mainFilterValues).length > 0;

    // If there are filter values, clear the DurumSelectbox
    if (hasFilterValues && onClearDurum) {
      onClearDurum();
    }

    // Create the updated filters object with the new custom filters
    const updatedFilters = {
      ...filters,
      customfilters: {
        ...newFilters,
        ...mainFilterValues,
      },
    };

    // Update the internal state
    setFilters(updatedFilters);

    // Trigger the API request by calling onChange
    onChange("filters", updatedFilters);
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1={"aracTipi"}
          addHide={true}
          kodID={100}
          isRequired={false}
          onChange={setAracTipIds}
          inputWidth="100px"
          dropdownWidth="300px"
          placeholder={t("aracTip")}
          multiSelect={true}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <MarkaSelectbox name1={"marka"} isRequired={false} onChange={setMarkaIds} dropdownWidth="300px" inputWidth="100px" multiSelect={true} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <ModelSelectbox name1={"model"} isRequired={false} onChange={setModelIds} dropdownWidth="300px" inputWidth="100px" markaId={markaIds} multiSelect={true} />
      </div>
      <div style={{ display: "flex", gap: "10px", width: "100px" }}>
        <LokasyonTable onSubmit={setLokasyonId} multiSelect={true} />
      </div>

      {/* <TypeFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, isemritipleri: newFilters }))} /> */}
      {/* <ConditionFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, durumlar: newFilters }))} /> */}
      {/* <LocationFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, lokasyonlar: newFilters }))} /> */}
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
      <CustomFilter onSubmit={handleCustomFilterSubmit} />
    </>
  );
}

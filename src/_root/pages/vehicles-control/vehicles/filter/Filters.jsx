import React from "react";
import ConditionFilter from "./ConditionFilter";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import CustomFilter from "./custom-filter/CustomFilter";
import PlakaSelectbox from "../../../../components/PlakaSelectbox";
import MarkaSelectbox from "../../../../components/MarkaSelectbox";
import ModelSelectbox from "../../../../components/ModelSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import { t } from "i18next";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function Filters({ onChange, durumValue }) {
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
    aracId: "",
    markaId: "",
    modelId: "",
    lokasyonId: null,
  });

  const [aracId, setAracId] = React.useState("");
  const [markaId, setMarkaId] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const [lokasyonId, setLokasyonId] = React.useState(null);
  const [customFilterValues, setCustomFilterValues] = React.useState({});

  const handleSearch = () => {
    // Create an object with only the currently selected values from the main filters
    const mainFilterValues = {};

    if (aracId) mainFilterValues.aracId = aracId;
    if (markaId) mainFilterValues.markaId = markaId;
    if (modelId) mainFilterValues.modelId = modelId;
    if (lokasyonId?.locationId) mainFilterValues.lokasyonId = lokasyonId.locationId;

    // Merge main filter values with custom filter values
    const updatedFilters = {
      ...filters,
      customfilters: {
        ...customFilterValues, // Keep the custom filter values
        ...mainFilterValues, // Add/update with main filter values
      },
      durumValue: durumValue, // Include the durumValue in the filters
    };

    // Update internal state
    setFilters(updatedFilters);

    // Only trigger onChange when the search button is clicked
    onChange("filters", updatedFilters);
  };

  // Handler for CustomFilter submissions
  const handleCustomFilterSubmit = (newFilters) => {
    setCustomFilterValues(newFilters);

    // Update the filters state but don't trigger onChange yet
    setFilters((state) => ({
      ...state,
      customfilters: {
        ...newFilters,
        ...(aracId ? { aracId } : {}),
        ...(markaId ? { markaId } : {}),
        ...(modelId ? { modelId } : {}),
        ...(lokasyonId?.locationId ? { lokasyonId: lokasyonId.locationId } : {}),
      },
    }));
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <PlakaSelectbox name1={"plaka"} isRequired={false} onChange={setAracId} inputWidth="100px" dropdownWidth="200px" />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <MarkaSelectbox name1={"marka"} isRequired={false} onChange={setMarkaId} dropdownWidth="300px" inputWidth="100px" />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <ModelSelectbox name1={"model"} isRequired={false} onChange={setModelId} dropdownWidth="300px" inputWidth="100px" markaId={markaId} />
      </div>
      <div style={{ display: "flex", gap: "10px", width: "100px" }}>
        <LokasyonTable onSubmit={setLokasyonId} />
      </div>

      {/* <TypeFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, isemritipleri: newFilters }))} /> */}
      {/* <ConditionFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, durumlar: newFilters }))} /> */}
      {/* <LocationFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, lokasyonlar: newFilters }))} /> */}
      <CustomFilter onSubmit={handleCustomFilterSubmit} />
      <Button onClick={handleSearch} icon={<SearchOutlined />}>
        Ara
      </Button>
    </>
  );
}

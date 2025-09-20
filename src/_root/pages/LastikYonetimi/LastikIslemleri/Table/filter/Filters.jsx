import React from "react";
import PropTypes from "prop-types";
import CustomFilter from "./custom-filter/CustomFilter";
import MarkaSelectbox from "../../../../../components/MarkaSelectbox";
import ModelSelectbox from "../../../../../components/ModelSelectbox";
import LokasyonTable from "../../../../../components/LokasyonTable";

export default function Filters({ onChange, onApply }) {
  const [markaIds, setMarkaIds] = React.useState([]);
  const [modelIds, setModelIds] = React.useState([]);
  const [lokasyonIds, setLokasyonIds] = React.useState([]);
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
  });

  // Marka ve model seçimleri değiştiğinde customfilter içine yansıt
  React.useEffect(() => {
    setFilters((state) => ({
      ...state,
      customfilter: {
        ...(state.customfilter || {}),
        lokasyonIds: Array.isArray(lokasyonIds) ? lokasyonIds.map((item) => (typeof item === "object" && item !== null ? item.locationId : item)) : [],
        markaIds: Array.isArray(markaIds) ? markaIds : [],
        modelIds: Array.isArray(modelIds) ? modelIds : [],
      },
    }));
  }, [markaIds, modelIds, lokasyonIds]);

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <LokasyonTable fieldName="lokasyonIds" multiSelect={true} onSubmit={setLokasyonIds} style={{ width: "200px" }} />
      <div style={{ width: "150px" }}>
        <MarkaSelectbox name1={"marka"} isRequired={false} onChange={setMarkaIds} dropdownWidth="300px" inputWidth="150px" multiSelect={true} />
      </div>
      <div style={{ width: "150px" }}>
        <ModelSelectbox name1={"model"} isRequired={false} onChange={setModelIds} dropdownWidth="300px" inputWidth="150px" markaId={markaIds} multiSelect={true} />
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
      {/* <ZamanAraligi /> */}
      <CustomFilter
        onSubmit={(newFilters) => {
          setFilters((state) => {
            const isEmpty = !newFilters || Object.keys(newFilters).length === 0;
            const nextCustomfilter = isEmpty
              ? {
                  lokasyonIds: Array.isArray(lokasyonIds) ? lokasyonIds.map((item) => (typeof item === "object" && item !== null ? item.locationId : item)) : [],
                  markaIds: Array.isArray(markaIds) ? markaIds : [],
                  modelIds: Array.isArray(modelIds) ? modelIds : [],
                }
              : { ...(state.customfilter || {}), ...newFilters };

            const updated = { ...state, customfilter: nextCustomfilter };
            onChange("filters", updated);
            if (onApply) onApply({ customfilterOverride: nextCustomfilter });
            return updated;
          });
        }}
      />
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func,
};

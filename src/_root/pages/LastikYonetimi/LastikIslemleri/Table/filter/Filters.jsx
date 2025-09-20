import React from "react";
import PropTypes from "prop-types";
import CustomFilter from "./custom-filter/CustomFilter";
import MarkaSelectbox from "../../../../../components/MarkaSelectbox";
import ModelSelectbox from "../../../../../components/ModelSelectbox";

export default function Filters({ onChange, onApply }) {
  const [markaIds, setMarkaIds] = React.useState([]);
  const [modelIds, setModelIds] = React.useState([]);
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
        markaIds: Array.isArray(markaIds) ? markaIds : [],
        modelIds: Array.isArray(modelIds) ? modelIds : [],
      },
    }));
  }, [markaIds, modelIds]);

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <MarkaSelectbox name1={"marka"} isRequired={false} onChange={setMarkaIds} dropdownWidth="300px" inputWidth="150px" multiSelect={true} />
        <ModelSelectbox name1={"model"} isRequired={false} onChange={setModelIds} dropdownWidth="300px" inputWidth="150px" markaId={markaIds} multiSelect={true} />

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
              const updated = { ...state, customfilter: { ...(state.customfilter || {}), ...newFilters } };
              // Parent body'yi hemen güncelle ve ardından fetch'i tetikle
              onChange("filters", updated);
              if (onApply) onApply();
              return updated;
            });
          }}
        />
      </div>
    </>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func,
};

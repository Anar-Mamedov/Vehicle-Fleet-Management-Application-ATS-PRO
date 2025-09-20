import React from "react";
import PropTypes from "prop-types";
// import ConditionFilter from "./ConditionFilter";
// import LocationFilter from "./LocationFilter";
// import TypeFilter from "./TypeFilter";
// import CustomFilter from "./custom-filter/CustomFilter";
// import ZamanAraligi from "./ZamanAraligi";
import KodIDSelectbox from "../../../../../components/KodIDSelectbox";
import LastikMarka from "../../../../../components/LastikMarka";
import LastikModel from "../../../../../components/LastikModel";
import { t } from "i18next";

export default function Filters({ onChange }) {
  const [markaIds, setMarkaIds] = React.useState([]);
  const [modelIds, setModelIds] = React.useState([]);
  const [tipIds, setTipIds] = React.useState([]);
  const [ebatIds, setEbatIds] = React.useState([]);
  const [filters, setFilters] = React.useState({
    /* lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {}, */
  });

  // Marka ve model seçimleri değiştiğinde filtrelere yansıt
  React.useEffect(() => {
    setFilters((state) => ({
      ...state,
      markaIds: Array.isArray(markaIds) ? markaIds : [],
      modelIds: Array.isArray(modelIds) ? modelIds : [],
      tipIds: Array.isArray(tipIds) ? tipIds : [],
      ebatIds: Array.isArray(ebatIds) ? ebatIds : [],
    }));
  }, [markaIds, modelIds, tipIds, ebatIds]);

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <LastikMarka name1={"marka"} isRequired={false} placeholder={t("marka")} onChange={setMarkaIds} dropdownWidth="300px" inputWidth="150px" multiSelect={true} />
        <LastikModel
          name1={"model"}
          isRequired={false}
          placeholder={t("model")}
          onChange={setModelIds}
          dropdownWidth="300px"
          inputWidth="150px"
          lastikMarkaId={markaIds}
          multiSelect={true}
        />
        <KodIDSelectbox name1={"tip"} isRequired={false} onChange={setTipIds} placeholder={t("tip")} dropdownWidth="300px" inputWidth="150px" multiSelect={true} kodID="705" />
        <KodIDSelectbox name1={"ebat"} isRequired={false} onChange={setEbatIds} placeholder={t("ebat")} dropdownWidth="300px" inputWidth="150px" multiSelect={true} kodID="702" />
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
        {/* <CustomFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, customfilter: newFilters }))} /> */}
      </div>
    </>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

import React from "react";
import { Select } from "antd";
import ConditionFilter from "./ConditionFilter";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import CustomFilter from "./custom-filter/CustomFilter";
import ZamanAraligi from "./ZamanAraligi";

export default function Filters({ onChange }) {
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
  });

  const [odeme, setOdeme] = React.useState("all");

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  React.useEffect(() => {
    setFilters((state) => {
      const nextCustom = { ...state.customfilter };
      if (odeme === true || odeme === false) {
        nextCustom.odeme = odeme;
        return { ...state, customfilter: nextCustom };
      }
      const { odeme: _omit, ...rest } = nextCustom;
      return { ...state, customfilter: rest };
    });
  }, [odeme]);

  return (
    <>
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
      <ZamanAraligi />
      <Select
        style={{ width: "130px" }}
        placeholder="Ödeme"
        value={odeme}
        onChange={setOdeme}
        options={[
          { label: "Tümü", value: "all" },
          { label: "Ödendi", value: true },
          { label: "Ödenmedi", value: false },
        ]}
      />
      <CustomFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, customfilter: newFilters }))} />
    </>
  );
}

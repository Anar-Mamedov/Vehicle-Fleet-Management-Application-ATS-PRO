import React from "react";
import CustomFilter from "./custom-filter/CustomFilter";

export default function Filters({ onChange }) {
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
  });

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  return (
    <>
      {/* <TypeFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, isemritipleri: newFilters }))} /> */}
      {/* <ConditionFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, durumlar: newFilters }))} /> */}
      {/* <LocationFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, lokasyonlar: newFilters }))} /> */}
      <CustomFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, customfilters: newFilters }))} />
    </>
  );
}

import React from "react";
import CustomFilter from "./custom-filter/CustomFilter";

export default function Filters({ onChange }) {
  const handleCustomFilterSubmit = (newFilters) => {
    // Keep status from previous filters but replace all other filters with new ones
    onChange("filters", (prevFilters) => ({
      status: prevFilters.status,
      ...newFilters,
    }));
  };

  return (
    <>
      <CustomFilter onSubmit={handleCustomFilterSubmit} />
    </>
  );
}

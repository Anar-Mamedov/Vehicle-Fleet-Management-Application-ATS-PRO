import React from "react";
import { Select } from "antd";
import CustomFilter from "./custom-filter/CustomFilter";
import ZamanAraligi from "./ZamanAraligi";
import { t } from "i18next";

export default function Filters({ onChange }) {
  const [filters, setFilters] = React.useState({
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
      <ZamanAraligi />
      <Select
        style={{ width: "130px" }}
        placeholder={t("odendi")}
        value={odeme}
        onChange={setOdeme}
        options={[
          { label: t("tumu"), value: "all" },
          { label: t("odendi"), value: true },
          { label: t("odenmedi"), value: false },
        ]}
      />
      <CustomFilter onSubmit={(newFilters) => setFilters((state) => ({ ...state, customfilter: newFilters }))} />
    </>
  );
}

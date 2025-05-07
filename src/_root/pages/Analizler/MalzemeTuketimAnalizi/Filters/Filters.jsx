import React from "react";
import TarihFilter from "./components/TarihFilter.jsx";
import { t } from "i18next";

function Filters(props) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <TarihFilter />
    </div>
  );
}

export default Filters;

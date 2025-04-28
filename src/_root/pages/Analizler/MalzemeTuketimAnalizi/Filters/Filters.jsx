import React from "react";
import LocationFilter from "./components/LocationFilter.jsx";
import PlakaFilter from "./components/PlakaFilter.jsx";
import TarihFilter from "./components/TarihFilter.jsx";
import AracTipiFilter from "./components/AracTipiFilter.jsx";
import { t } from "i18next";
import DepartmanFilter from "./components/DepartmanFilter.jsx";

function Filters(props) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <PlakaFilter />
      <AracTipiFilter />
      <LocationFilter />
      <DepartmanFilter />
      <TarihFilter />
    </div>
  );
}

export default Filters;

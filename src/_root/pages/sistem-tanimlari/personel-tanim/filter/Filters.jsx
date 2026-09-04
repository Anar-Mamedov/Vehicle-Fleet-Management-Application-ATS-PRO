import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import DurumSelect from "../components/DurumSelect";

// Personel tipi kod listesinin backend'deki kod numarası
const PERSONEL_TIP_KOD_ID = 501;

export const DEFAULT_PERSONEL_FILTERS = {
  personelTipKodIds: [],
  lokasyonIds: [],
  status: 0,
};

export default function Filters({ onChange }) {
  const [personelTipKodIds, setPersonelTipKodIds] = React.useState([]);
  const [lokasyonIds, setLokasyonIds] = React.useState([]);
  const [status, setStatus] = React.useState(DEFAULT_PERSONEL_FILTERS.status);

  const handleLokasyonChange = (selectedLocations) => {
    const ids = Array.isArray(selectedLocations) ? selectedLocations.map((item) => item.locationId).filter(Boolean) : [];
    setLokasyonIds(ids);
  };

  // Filtreler yalnızca arama butonuna basıldığında uygulanır
  const handleSearch = () => {
    onChange("filters", {
      personelTipKodIds: personelTipKodIds || [],
      lokasyonIds,
      status: status ?? 0,
    });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="personelTipiFiltre"
          kodID={PERSONEL_TIP_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={setPersonelTipKodIds}
          placeholder={t("tumPersonelTipleri")}
          inputWidth="180px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ width: "180px" }}>
        <LokasyonTable fieldName="personelLokasyonFiltre" onSubmit={handleLokasyonChange} multiSelect={true} placeholder={t("tumLokasyonlar")} />
      </div>
      <DurumSelect value={status} onChange={setStatus} inputWidth="120px" dropdownWidth="150px" />
      <Button
        onClick={handleSearch}
        icon={<SearchOutlined />}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "#fff",
        }}
      />
    </>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

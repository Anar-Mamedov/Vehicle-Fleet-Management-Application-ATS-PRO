import React from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import DurumSelect from "../components/DurumSelect";

export const DEFAULT_DRIVER_FILTERS = {
  lokasyonIds: [],
  surucuTipIds: [],
  status: 0,
};

export default function Filters({ onChange }) {
  const [surucuTipIds, setSurucuTipIds] = React.useState([]);
  const [lokasyonIds, setLokasyonIds] = React.useState([]);
  const [status, setStatus] = React.useState(DEFAULT_DRIVER_FILTERS.status);

  const handleLokasyonChange = (selectedLocations) => {
    const ids = Array.isArray(selectedLocations) ? selectedLocations.map((item) => item.locationId).filter(Boolean) : [];
    setLokasyonIds(ids);
  };

  const handleSearch = () => {
    onChange("filters", {
      lokasyonIds,
      surucuTipIds: surucuTipIds || [],
      status: status ?? 0,
    });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="surucuTipiFiltre"
          kodID={502}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={setSurucuTipIds}
          placeholder={t("tumSurucuTipleri")}
          inputWidth="180px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ width: "180px" }}>
        <LokasyonTable fieldName="surucuLokasyonFiltre" onSubmit={handleLokasyonChange} multiSelect={true} placeholder={t("tumLokasyonlar")} />
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

import React, { useState } from "react";
import { Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import TarihAraligiFiltre, { DEFAULT_TIME_RANGE, getDateRange } from "./TarihAraligiFiltre";

// Sefer tipi ve sefer durumu kod listelerinin backend'deki kod numaraları
const SEFER_TIP_KOD_ID = 120;
const SEFER_DURUM_KOD_ID = 121;

// Liste, KPI ve Excel istekleri aynı gövdeyi kullanır
export const buildOperasyonFilters = ({ timeRange = DEFAULT_TIME_RANGE, customRange = null, surucuIds = [], seferDurumKodIds = [], seferTipKodIds = [] } = {}) => ({
  aracIds: [],
  surucuIds,
  lokasyonIds: [],
  seferDurumKodIds,
  seferTipKodIds,
  guzergahIds: [],
  ...getDateRange(timeRange, customRange),
});

export const DEFAULT_OPERASYON_FILTERS = buildOperasyonFilters();

export default function OperasyonFilters({ onChange }) {
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE);
  const [customRange, setCustomRange] = useState(null);
  const [surucuIds, setSurucuIds] = useState([]);
  const [seferDurumKodIds, setSeferDurumKodIds] = useState([]);
  const [seferTipKodIds, setSeferTipKodIds] = useState([]);
  const [surucuOptions, setSurucuOptions] = useState([]);
  const [surucuLoading, setSurucuLoading] = useState(false);

  const fetchSurucuOptions = async () => {
    setSurucuLoading(true);
    try {
      const response = await AxiosInstance.get(`Driver/GetDriverListForSelectInput`);
      setSurucuOptions(response?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setSurucuLoading(false);
    }
  };

  // Filtreler yalnızca arama düğmesine basıldığında uygulanır
  const handleSearch = () => {
    onChange(buildOperasyonFilters({ timeRange, customRange, surucuIds, seferDurumKodIds, seferTipKodIds }));
  };

  const handleTarihAraligiChange = ({ timeRange: nextTimeRange, customRange: nextCustomRange }) => {
    setTimeRange(nextTimeRange);
    setCustomRange(nextCustomRange);
  };

  return (
    <>
      <TarihAraligiFiltre timeRange={timeRange} customRange={customRange} onChange={handleTarihAraligiChange} />
      <div style={{ display: "flex", gap: "10px" }}>
        <Select
          mode="multiple"
          allowClear
          showSearch
          maxTagCount="responsive"
          value={surucuIds}
          onChange={(value) => setSurucuIds(value || [])}
          onDropdownVisibleChange={(open) => open && fetchSurucuOptions()}
          loading={surucuLoading}
          placeholder={t("surucu")}
          optionFilterProp="label"
          options={surucuOptions.map((item) => ({ value: item.surucuId, label: item.isim }))}
          style={{ width: "100px" }}
          dropdownStyle={{ width: "300px" }}
          popupMatchSelectWidth={false}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="operasyonDurumFiltre"
          kodID={SEFER_DURUM_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setSeferDurumKodIds(value || [])}
          placeholder={t("durum")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="operasyonTipFiltre"
          kodID={SEFER_TIP_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setSeferTipKodIds(value || [])}
          placeholder={t("gorevTipi")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
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

OperasyonFilters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

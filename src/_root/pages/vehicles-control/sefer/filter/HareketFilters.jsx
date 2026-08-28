import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, ConfigProvider, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import FirmaSelectBox from "../../../../components/FirmaSelectBox";
import GuzergahSelectbox from "../../../../components/GuzergahSelectbox";
import { DEFAULT_TIME_RANGE, TIME_RANGE_OPTIONS, getDateRange } from "./OperasyonFilters";

// Kod listelerinin backend'deki kod numaraları
const SEFER_TIP_KOD_ID = 120;
const DURUM_KOD_ID = 121;
const HAREKET_TIP_KOD_ID = 916;
const VARDIYA_KOD_ID = 917;
const OPERASYON_YERI_KOD_ID = 918;
const FIRMA_DROPDOWN_WIDTH = 300;

// Liste ve Excel istekleri aynı gövdeyi kullanır
export const buildHareketFilters = ({
  timeRange = DEFAULT_TIME_RANGE,
  firmaIds = [],
  guzergahIds = [],
  seferTipKodIds = [],
  oprTipKodIds = [],
  oprYeriKodIds = [],
  vardiyaKodIds = [],
  durumKodIds = [],
} = {}) => ({
  firmaIds,
  guzergahIds,
  seferTipKodIds,
  oprTipKodIds,
  oprYeriKodIds,
  vardiyaKodIds,
  durumKodIds,
  ...getDateRange(timeRange),
});

export const DEFAULT_HAREKET_FILTERS = buildHareketFilters();

export default function HareketFilters({ onChange }) {
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE);
  const [firmaIds, setFirmaIds] = useState([]);
  const [guzergahIds, setGuzergahIds] = useState([]);
  const [seferTipKodIds, setSeferTipKodIds] = useState([]);
  const [oprTipKodIds, setOprTipKodIds] = useState([]);
  const [oprYeriKodIds, setOprYeriKodIds] = useState([]);
  const [vardiyaKodIds, setVardiyaKodIds] = useState([]);
  const [durumKodIds, setDurumKodIds] = useState([]);

  // Filtreler yalnızca arama düğmesine basıldığında uygulanır
  const handleSearch = () => {
    onChange(buildHareketFilters({ timeRange, firmaIds, guzergahIds, seferTipKodIds, oprTipKodIds, oprYeriKodIds, vardiyaKodIds, durumKodIds }));
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Select
          value={timeRange}
          onChange={setTimeRange}
          options={TIME_RANGE_OPTIONS.map(({ value, labelKey }) => ({ value, label: t(labelKey) }))}
          style={{ width: "120px" }}
          dropdownStyle={{ width: "150px" }}
          popupMatchSelectWidth={false}
        />
      </div>
      {/* Input kompakt kalırken yalnızca bu firma filtresinin açılır listesi bağımsız genişlik kullanır */}
      <div style={{ display: "flex", gap: "10px", width: "100px" }}>
        <ConfigProvider popupMatchSelectWidth={FIRMA_DROPDOWN_WIDTH}>
          <FirmaSelectBox name1="hareketFirmaFiltre" isRequired={false} multiSelect={true} onChange={(value) => setFirmaIds(value || [])} />
        </ConfigProvider>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <GuzergahSelectbox
          name1="hareketGuzergahFiltre"
          multiSelect={true}
          onChange={(value) => setGuzergahIds(value || [])}
          placeholder={t("guzergah")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="hareketSeferTipFiltre"
          kodID={SEFER_TIP_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setSeferTipKodIds(value || [])}
          placeholder={t("operasyonTipi")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="hareketTipFiltre"
          kodID={HAREKET_TIP_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setOprTipKodIds(value || [])}
          placeholder={t("hareketTipi")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="hareketOprYerFiltre"
          kodID={OPERASYON_YERI_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setOprYeriKodIds(value || [])}
          placeholder={t("operasyonYeri")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="hareketVardiyaFiltre"
          kodID={VARDIYA_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setVardiyaKodIds(value || [])}
          placeholder={t("vardiya")}
          inputWidth="100px"
          dropdownWidth="300px"
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <KodIDSelectbox
          name1="hareketDurumFiltre"
          kodID={DURUM_KOD_ID}
          addHide={true}
          isRequired={false}
          multiSelect={true}
          onChange={(value) => setDurumKodIds(value || [])}
          placeholder={t("durum")}
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

HareketFilters.propTypes = {
  onChange: PropTypes.func.isRequired,
};

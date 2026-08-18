import React, { useState } from "react";
import { Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";

// Sefer tipi ve sefer durumu kod listelerinin backend'deki kod numaraları
const SEFER_TIP_KOD_ID = 120;
const SEFER_DURUM_KOD_ID = 121;

const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss";

// Tarih aralığı seçenekleri; her seçenek başlangıç ve bitiş tarihini kendisi hesaplar
const TIME_RANGE_OPTIONS = [
  { value: "all", labelKey: "tumu", getRange: () => [null, null] },
  { value: "today", labelKey: "bugun", getRange: () => [dayjs().startOf("day"), dayjs().endOf("day")] },
  { value: "yesterday", labelKey: "dun", getRange: () => [dayjs().subtract(1, "day").startOf("day"), dayjs().subtract(1, "day").endOf("day")] },
  { value: "thisWeek", labelKey: "buHafta", getRange: () => [dayjs().startOf("week"), dayjs().endOf("week")] },
  { value: "lastWeek", labelKey: "gecenHafta", getRange: () => [dayjs().subtract(1, "week").startOf("week"), dayjs().subtract(1, "week").endOf("week")] },
  { value: "thisMonth", labelKey: "buAy", getRange: () => [dayjs().startOf("month"), dayjs().endOf("month")] },
  { value: "lastMonth", labelKey: "gecenAy", getRange: () => [dayjs().subtract(1, "month").startOf("month"), dayjs().subtract(1, "month").endOf("month")] },
  { value: "thisYear", labelKey: "buYil", getRange: () => [dayjs().startOf("year"), dayjs().endOf("year")] },
  { value: "lastYear", labelKey: "gecenYil", getRange: () => [dayjs().subtract(1, "year").startOf("year"), dayjs().subtract(1, "year").endOf("year")] },
  { value: "last1Month", labelKey: "son1Ay", getRange: () => [dayjs().subtract(1, "month"), dayjs()] },
  { value: "last3Months", labelKey: "son3Ay", getRange: () => [dayjs().subtract(3, "months"), dayjs()] },
  { value: "last6Months", labelKey: "son6Ay", getRange: () => [dayjs().subtract(6, "months"), dayjs()] },
];

export const DEFAULT_TIME_RANGE = "thisMonth";

const getDateRange = (timeRange) => {
  const option = TIME_RANGE_OPTIONS.find((item) => item.value === timeRange);
  const [start, end] = option ? option.getRange() : [null, null];

  return {
    baslangicTarih: start ? start.format(DATE_FORMAT) : null,
    bitisTarih: end ? end.format(DATE_FORMAT) : null,
  };
};

// Liste, KPI ve Excel istekleri aynı gövdeyi kullanır
export const buildOperasyonFilters = ({ timeRange = DEFAULT_TIME_RANGE, surucuIds = [], seferDurumKodIds = [], seferTipKodIds = [] } = {}) => ({
  aracIds: [],
  surucuIds,
  lokasyonIds: [],
  seferDurumKodIds,
  seferTipKodIds,
  guzergahIds: [],
  ...getDateRange(timeRange),
});

export const DEFAULT_OPERASYON_FILTERS = buildOperasyonFilters();

export default function OperasyonFilters({ onChange }) {
  const [timeRange, setTimeRange] = useState(DEFAULT_TIME_RANGE);
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
    onChange(buildOperasyonFilters({ timeRange, surucuIds, seferDurumKodIds, seferTipKodIds }));
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

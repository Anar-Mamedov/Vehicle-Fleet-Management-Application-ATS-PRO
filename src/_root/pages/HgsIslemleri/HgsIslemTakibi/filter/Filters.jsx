import React from "react";
import PropTypes from "prop-types";
import { Select, Switch, Typography } from "antd";
import { t } from "i18next";
import dayjs from "dayjs";
import { CodeControlService } from "../../../../../api/service";
import LokasyonTable from "../../../../components/LokasyonTable";

const { Text } = Typography;

const TIME_RANGE_OPTIONS = [
  { value: "all", label: "Tümü" },
  { value: "today", label: "Bugün" },
  { value: "yesterday", label: "Dün" },
  { value: "thisWeek", label: "Bu Hafta" },
  { value: "lastWeek", label: "Geçen Hafta" },
  { value: "thisMonth", label: "Bu Ay" },
  { value: "lastMonth", label: "Geçen Ay" },
  { value: "thisYear", label: "Bu Yıl" },
  { value: "lastYear", label: "Geçen Yıl" },
  { value: "last1Month", label: "Son 1 Ay" },
  { value: "last3Months", label: "Son 3 Ay" },
  { value: "last6Months", label: "Son 6 Ay" },
];

const getDateRange = (value) => {
  let startDate;
  let endDate;

  switch (value) {
    case "all":
      startDate = null;
      endDate = null;
      break;
    case "today":
      startDate = dayjs().startOf("day");
      endDate = dayjs().endOf("day");
      break;
    case "yesterday":
      startDate = dayjs().subtract(1, "day").startOf("day");
      endDate = dayjs().subtract(1, "day").endOf("day");
      break;
    case "thisWeek":
      startDate = dayjs().startOf("week");
      endDate = dayjs().endOf("week");
      break;
    case "lastWeek":
      startDate = dayjs().subtract(1, "week").startOf("week");
      endDate = dayjs().subtract(1, "week").endOf("week");
      break;
    case "thisMonth":
      startDate = dayjs().startOf("month");
      endDate = dayjs().endOf("month");
      break;
    case "lastMonth":
      startDate = dayjs().subtract(1, "month").startOf("month");
      endDate = dayjs().subtract(1, "month").endOf("month");
      break;
    case "thisYear":
      startDate = dayjs().startOf("year");
      endDate = dayjs().endOf("year");
      break;
    case "lastYear":
      startDate = dayjs().subtract(1, "year").startOf("year");
      endDate = dayjs().subtract(1, "year").endOf("year");
      break;
    case "last1Month":
      startDate = dayjs().subtract(1, "month");
      endDate = dayjs();
      break;
    case "last3Months":
      startDate = dayjs().subtract(3, "months");
      endDate = dayjs();
      break;
    case "last6Months":
      startDate = dayjs().subtract(6, "months");
      endDate = dayjs();
      break;
    default:
      startDate = null;
      endDate = null;
      break;
  }

  return {
    baslangicTarih: startDate ? startDate.toISOString() : null,
    bitisTarih: endDate ? endDate.toISOString() : null,
  };
};

export default function Filters({ onChange, onApply, onTimeRangeChange }) {
  const [timeRange, setTimeRange] = React.useState("all");
  const [supheli, setSupheli] = React.useState(false);
  const [haftaSonu, setHaftaSonu] = React.useState(false);
  const [lokasyonIds, setLokasyonIds] = React.useState([]);
  const [otoyolKodIds, setOtoyolKodIds] = React.useState([]);
  const [otoyolOptions, setOtoyolOptions] = React.useState([]);
  const [otoyolLoading, setOtoyolLoading] = React.useState(false);
  const shouldApplyRef = React.useRef(false);
  const onApplyRef = React.useRef(onApply);

  const [filters, setFilters] = React.useState({
    customfilter: {},
  });

  const fetchOtoyollar = () => {
    if (otoyolOptions.length > 0) return;
    setOtoyolLoading(true);
    CodeControlService(901)
      .then((res) => {
        setOtoyolOptions(res.data.map((item) => ({ value: item.siraNo, label: item.codeText })));
      })
      .finally(() => setOtoyolLoading(false));
  };

  const handleLokasyonChange = React.useCallback((selectedData) => {
    shouldApplyRef.current = true;

    if (!Array.isArray(selectedData) || selectedData.length === 0) {
      setLokasyonIds([]);
      return;
    }

    const selectedIds = selectedData.map((item) => (typeof item === "object" && item !== null ? item.locationId : item)).filter((id) => id !== undefined && id !== null);

    setLokasyonIds(selectedIds);
  }, []);

  const handleTimeRangeChange = React.useCallback(
    (value) => {
      shouldApplyRef.current = true;
      setTimeRange(value);
      const selectedOption = TIME_RANGE_OPTIONS.find((opt) => opt.value === value);
      if (onTimeRangeChange) onTimeRangeChange(selectedOption?.label || "");
    },
    [onTimeRangeChange]
  );

  const handleSupheliChange = React.useCallback((checked) => {
    shouldApplyRef.current = true;
    setSupheli(checked);
  }, []);

  const handleHaftaSonuChange = React.useCallback((checked) => {
    shouldApplyRef.current = true;
    setHaftaSonu(checked);
  }, []);

  const handleOtoyolChange = React.useCallback((values) => {
    shouldApplyRef.current = true;
    setOtoyolKodIds(Array.isArray(values) ? values : []);
  }, []);

  React.useEffect(() => {
    const dateRange = timeRange ? getDateRange(timeRange) : { baslangicTarih: null, bitisTarih: null };
    setFilters((state) => ({
      ...state,
      customfilter: {
        ...(state.customfilter || {}),
        ...dateRange,
        supheli,
        haftaSonu,
        lokasyonIds,
        otoyolKodIds,
      },
    }));
  }, [timeRange, supheli, haftaSonu, lokasyonIds, otoyolKodIds]);

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  React.useEffect(() => {
    onApplyRef.current = onApply;
  }, [onApply]);

  React.useEffect(() => {
    if (!shouldApplyRef.current) {
      return;
    }
    shouldApplyRef.current = false;

    if (typeof onApplyRef.current === "function") {
      onApplyRef.current(filters.customfilter || {});
    }
  }, [filters.customfilter]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
      <Select style={{ width: "130px" }} placeholder="Seçim Yap" options={TIME_RANGE_OPTIONS} value={timeRange} onChange={handleTimeRangeChange} />
      <LokasyonTable fieldName="lokasyonIds" multiSelect={true} onSubmit={handleLokasyonChange} style={{ width: "220px" }} />
      <Select
        style={{ width: "180px" }}
        mode="multiple"
        maxTagCount="responsive"
        placeholder={t("gecisNoktasi")}
        showSearch
        allowClear
        optionFilterProp="label"
        options={otoyolOptions}
        loading={otoyolLoading}
        onDropdownVisibleChange={(open) => open && fetchOtoyollar()}
        value={otoyolKodIds}
        onChange={handleOtoyolChange}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Switch size="small" checked={supheli} onChange={handleSupheliChange} />
        <Text style={{ fontSize: "13px", whiteSpace: "nowrap" }}>{t("supheli")}</Text>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Switch size="small" checked={haftaSonu} onChange={handleHaftaSonuChange} />
        <Text style={{ fontSize: "13px", whiteSpace: "nowrap" }}>{t("haftaSonlari")}</Text>
      </div>
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func,
  onTimeRangeChange: PropTypes.func,
};

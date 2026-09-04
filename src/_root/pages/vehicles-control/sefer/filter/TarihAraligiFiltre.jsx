import React from "react";
import PropTypes from "prop-types";
import { ConfigProvider, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import { formatDateForApi } from "../../../../../utils/dateUtils";

dayjs.locale("tr");

const { RangePicker } = DatePicker;

// Tarih aralığı seçenekleri; her seçenek başlangıç ve bitiş tarihini kendisi hesaplar
export const TIME_RANGE_OPTIONS = [
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

// Hazır dönem ile özel tarih aralığı aynı filtre alanlarını (baslangicTarih/bitisTarih) doldurur.
// Özel aralık seçiliyse hazır dönem yok sayılır; ikisi aynı anda uygulanmaz.
export const getDateRange = (timeRange, customRange) => {
  const [customStart, customEnd] = customRange || [];

  if (customStart && customEnd) {
    return {
      baslangicTarih: formatDateForApi(customStart),
      bitisTarih: formatDateForApi(customEnd),
    };
  }

  const option = TIME_RANGE_OPTIONS.find((item) => item.value === timeRange);
  const [start, end] = option ? option.getRange() : [null, null];

  return {
    baslangicTarih: formatDateForApi(start),
    bitisTarih: formatDateForApi(end),
  };
};

// Hazır dönem listesi ve özel tarih aralığı seçici; biri seçilince diğeri temizlenir
const TarihAraligiFiltre = ({ timeRange, customRange, onChange }) => {
  const handleTimeRangeChange = (value) => {
    onChange({ timeRange: value, customRange: null });
  };

  const handleCustomRangeChange = (dates) => {
    const hasRange = Boolean(dates?.[0] && dates?.[1]);

    // Aralık temizlenince tarih filtresiz kalmamak için varsayılan döneme dönülür
    onChange({
      timeRange: hasRange ? null : DEFAULT_TIME_RANGE,
      customRange: hasRange ? dates : null,
    });
  };

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Select
          value={timeRange}
          onChange={handleTimeRangeChange}
          options={TIME_RANGE_OPTIONS.map(({ value, labelKey }) => ({ value, label: t(labelKey) }))}
          placeholder={t("donem")}
          style={{ width: "120px" }}
          dropdownStyle={{ width: "150px" }}
          popupMatchSelectWidth={false}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <ConfigProvider locale={tr_TR}>
          <RangePicker value={customRange} onChange={handleCustomRangeChange} locale={dayjs.locale("tr")} format="DD.MM.YYYY" style={{ width: "230px" }} />
        </ConfigProvider>
      </div>
    </>
  );
};

TarihAraligiFiltre.propTypes = {
  timeRange: PropTypes.string,
  customRange: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default TarihAraligiFiltre;

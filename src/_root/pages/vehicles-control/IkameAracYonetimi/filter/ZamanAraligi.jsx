import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);
dayjs.locale("tr");

export default function ZamanAraligi({ onDateChange, onReady }) {
  const { control, watch, setValue } = useFormContext();
  const selectedTimeRange = watch("timeRange");
  const [isInitialMount, setIsInitialMount] = useState(true);
  const skipNextAllNotificationRef = useRef(false);

  const handleTimeRangeChange = useCallback(
    (value) => {
      let baslangicTarih;
      let bitisTarih;

      switch (value) {
        case "all":
          baslangicTarih = null;
          bitisTarih = null;
          break;
        case "today":
          baslangicTarih = dayjs().startOf("day");
          bitisTarih = dayjs().endOf("day");
          break;
        case "yesterday":
          baslangicTarih = dayjs().subtract(1, "day").startOf("day");
          bitisTarih = dayjs().subtract(1, "day").endOf("day");
          break;
        case "thisWeek":
          baslangicTarih = dayjs().startOf("week");
          bitisTarih = dayjs().endOf("week");
          break;
        case "lastWeek":
          baslangicTarih = dayjs().subtract(1, "week").startOf("week");
          bitisTarih = dayjs().subtract(1, "week").endOf("week");
          break;
        case "thisMonth":
          baslangicTarih = dayjs().startOf("month");
          bitisTarih = dayjs().endOf("month");
          break;
        case "lastMonth":
          baslangicTarih = dayjs().subtract(1, "month").startOf("month");
          bitisTarih = dayjs().subtract(1, "month").endOf("month");
          break;
        case "thisYear":
          baslangicTarih = dayjs().startOf("year");
          bitisTarih = dayjs().endOf("year");
          break;
        case "lastYear":
          baslangicTarih = dayjs().subtract(1, "year").startOf("year");
          bitisTarih = dayjs().subtract(1, "year").endOf("year");
          break;
        case "last1Month":
          baslangicTarih = dayjs().subtract(1, "month");
          bitisTarih = dayjs();
          break;
        case "last3Months":
          baslangicTarih = dayjs().subtract(3, "months");
          bitisTarih = dayjs();
          break;
        case "last6Months":
          baslangicTarih = dayjs().subtract(6, "months");
          bitisTarih = dayjs();
          break;
        default:
          baslangicTarih = null;
          bitisTarih = null;
      }

      setValue("baslangicTarih", baslangicTarih);
      setValue("bitisTarih", bitisTarih);

      if (value !== "all" && onDateChange) {
        onDateChange({
          baslangicTarih: baslangicTarih ? baslangicTarih.format("YYYY-MM-DD") : null,
          bitisTarih: bitisTarih ? bitisTarih.format("YYYY-MM-DD") : null,
        });
      }
    },
    [onDateChange, setValue]
  );

  useEffect(() => {
    if (isInitialMount) {
      setValue("timeRange", "all");
      setValue("baslangicTarih", null);
      setValue("bitisTarih", null);
      skipNextAllNotificationRef.current = true;
      if (onReady) {
        onReady();
      }
      setIsInitialMount(false);
      return;
    }

    if (selectedTimeRange && selectedTimeRange !== "all") {
      handleTimeRangeChange(selectedTimeRange);
    } else if (selectedTimeRange === "all") {
      setValue("baslangicTarih", null);
      setValue("bitisTarih", null);

      if (skipNextAllNotificationRef.current) {
        skipNextAllNotificationRef.current = false;
        return;
      }

      if (!isInitialMount && onDateChange) {
        onDateChange({
          baslangicTarih: null,
          bitisTarih: null,
        });
      }
    }
  }, [handleTimeRangeChange, isInitialMount, onDateChange, onReady, selectedTimeRange, setValue]);

  return (
    <Controller
      name="timeRange"
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          style={{ width: 130 }}
          placeholder={t("secimYap")}
          options={[
            { value: "all", label: t("tumu") },
            { value: "today", label: t("bugun") },
            { value: "yesterday", label: t("dun") },
            { value: "thisWeek", label: t("buHafta") },
            { value: "lastWeek", label: t("gecenHafta") },
            { value: "thisMonth", label: t("buAy") },
            { value: "lastMonth", label: t("gecenAy") },
            { value: "thisYear", label: t("buYil") },
            { value: "lastYear", label: t("gecenYil") },
            { value: "last1Month", label: t("son1Ay") },
            { value: "last3Months", label: t("son3Ay") },
            { value: "last6Months", label: t("son6Ay") },
          ]}
        />
      )}
    />
  );
}

ZamanAraligi.propTypes = {
  onDateChange: PropTypes.func,
  onReady: PropTypes.func,
};

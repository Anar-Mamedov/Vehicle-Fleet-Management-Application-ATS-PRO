import React, { useEffect, useState } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";
import { Typography, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/tr"; // For Turkish locale
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

dayjs.locale("tr"); // use Turkish locale

const { Text } = Typography;

export default function ZamanAraligi({ onDateChange }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const selectedTimeRange = watch("timeRange");
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setValue("timeRange", "last7Days");
      const baslangicTarih = dayjs().subtract(6, "day").startOf("day");
      const bitisTarih = dayjs().endOf("day");
      setValue("baslangicTarih", baslangicTarih);
      setValue("bitisTarih", bitisTarih);
      setIsInitialMount(false);

      if (onDateChange) {
        onDateChange({
          baslangicTarih: baslangicTarih.format("YYYY-MM-DD"),
          bitisTarih: bitisTarih.format("YYYY-MM-DD"),
        });
      }
      return;
    }

    // Sadece kullanıcı açıkça bir zaman aralığı seçtiğinde filtre uygula
    if (selectedTimeRange && selectedTimeRange !== "all") {
      handleTimeRangeChange(selectedTimeRange);
    } else if (selectedTimeRange === "all") {
      setValue("baslangicTarih", null);
      setValue("bitisTarih", null);

      // "Tümü" seçildiğinde filtreleri temizle (sadece kullanıcı açıkça "Tümü" seçtiğinde)
      if (!isInitialMount && onDateChange) {
        onDateChange({
          baslangicTarih: null,
          bitisTarih: null,
        });
      }
    }
  }, [selectedTimeRange, isInitialMount]);

  const handleTimeRangeChange = (value) => {
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
      case "last7Days":
        baslangicTarih = dayjs().subtract(6, "day").startOf("day");
        bitisTarih = dayjs().endOf("day");
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

    // Sadece kullanıcı açıkça bir seçim yaptığında tarihleri parent component'e ilet
    if (value !== "all" && onDateChange) {
      onDateChange({
        baslangicTarih: baslangicTarih ? baslangicTarih.format("YYYY-MM-DD") : null,
        bitisTarih: bitisTarih ? bitisTarih.format("YYYY-MM-DD") : null,
      });
    }
  };

  return (
    <div style={{}}>
      <Controller
        name="timeRange"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            style={{ width: "130px" }}
            placeholder="Seçim Yap"
            options={[
              { value: "all", label: "Tümü" },
              { value: "today", label: "Bugün" },
              { value: "yesterday", label: "Dün" },
              { value: "thisWeek", label: "Bu Hafta" },
              { value: "lastWeek", label: "Geçen Hafta" },
              { value: "thisMonth", label: "Bu Ay" },
              { value: "lastMonth", label: "Geçen Ay" },
              { value: "thisYear", label: "Bu Yıl" },
              { value: "lastYear", label: "Geçen Yıl" },
              { value: "last7Days", label: "Son 7 Gün" },
              { value: "last1Month", label: "Son 1 Ay" },
              { value: "last3Months", label: "Son 3 Ay" },
              { value: "last6Months", label: "Son 6 Ay" },
            ]}
          />
        )}
      />
    </div>
  );
}

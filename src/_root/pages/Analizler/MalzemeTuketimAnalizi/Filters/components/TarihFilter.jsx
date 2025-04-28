import React, { useState, useEffect } from "react";
import { Select, Button, Popover, Spin, DatePicker, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";

const { Option } = Select;
const { Text } = Typography;

const TarihFilter = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [startDate, setStartDate] = useState(null); // Normal React state
  const [endDate, setEndDate] = useState(null); // Normal React state
  const [timeRange, setTimeRange] = useState("all"); // Initial value is "all"

  const { control, setValue } = useFormContext();

  const handleSubmit = () => {
    setOpen(false);
  };

  useEffect(() => {
    // React state'lerinden alınan değerleri react-hook-form ile set et
    setValue("baslangicTarihi", startDate);
    setValue("bitisTarihi", endDate);
  }, [startDate, endDate]);

  const handleCancelClick = () => {
    setStartDate(null);
    setEndDate(null);
    setTimeRange("all"); // Reset to "all"
    setValue("baslangicTarihi", null);
    setValue("bitisTarihi", null);
    setOpen(false);
  };

  const handleTimeRangeChange = (value) => {
    let startDate = null;
    let endDate = null;

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
    }

    setStartDate(startDate);
    setEndDate(endDate);
    setTimeRange(value); // Set the selected time range
  };

  const content = (
    <div style={{ width: "300px" }}>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleCancelClick}>İptal</Button>
        <Button type="primary" onClick={handleSubmit}>
          Uygula
        </Button>
      </div>

      <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <DatePicker style={{ width: "100%" }} placeholder="Başlangıç Tarihi" value={startDate} onChange={(date) => setStartDate(date)} locale={dayjs.locale("tr")} />
          <Text style={{ fontSize: "14px" }}>-</Text>
          <DatePicker style={{ width: "100%" }} placeholder="Bitiş Tarihi" value={endDate} onChange={(date) => setEndDate(date)} locale={dayjs.locale("tr")} />
        </div>
        <Select
          style={{ width: "100%" }}
          value={timeRange} // Set the current value
          onChange={handleTimeRangeChange}
          notFoundContent={
            loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <Spin size="small" />
              </div>
            ) : null
          }
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
            { value: "last1Month", label: "Son 1 Ay" },
            { value: "last3Months", label: "Son 3 Ay" },
            { value: "last6Months", label: "Son 6 Ay" },
          ]}
        />
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={setOpen} placement="bottom">
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          Tarih
          {(startDate || endDate) && (
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#006cb8",
              }}
            />
          )}
        </div>
      </Button>
    </Popover>
  );
};

export default TarihFilter;

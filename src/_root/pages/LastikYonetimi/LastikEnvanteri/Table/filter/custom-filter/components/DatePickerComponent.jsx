import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/tr";

const DatePickerComponent = ({ value, onChange, placeholder = "Tarih Seçin" }) => {
  return <DatePicker style={{ width: "100%" }} placeholder={placeholder} onChange={onChange} value={value ? dayjs(value) : null} format="DD.MM.YYYY" locale={dayjs.locale("tr")} />;
};

export default DatePickerComponent;

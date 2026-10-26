import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { ConfigProvider, DatePicker } from "antd";

dayjs.locale("tr");

const { RangePicker } = DatePicker;

// Tarih aralığı seçimi için global bileşen. Form alanına [başlangıç, bitiş] dayjs dizisi, temizlenince null yazılır.
// API'ye gönderirken her iki uç da formatDateForApi ile çevrilir.
const DateRangeInput = ({ name, readonly, style }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ConfigProvider locale={tr_TR}>
          <RangePicker
            {...field}
            value={field.value ?? null}
            disabled={readonly}
            style={{
              ...style,
            }}
            locale={dayjs.locale("tr")}
            format="DD.MM.YYYY"
            onChange={(dates) => {
              field.onChange(dates?.[0] && dates?.[1] ? dates : null);
            }}
          />
        </ConfigProvider>
      )}
    />
  );
};

DateRangeInput.propTypes = {
  name: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
  style: PropTypes.object,
};

export default DateRangeInput;

import React, { useState, createRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select, Typography, Divider, Spin, Button, Input, message, Space } from "antd";
import AxiosInstance from "../../../../../../../../../../../../api/http";

const { Text, Link } = Typography;

export default function IsEmriTipi({ disabled }) {
  const { control, setValue } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("IsEmriTip");
      if (response && response) {
        setOptions(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "space-between",
        maxWidth: "300px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", width: "100%" }}>
        <Controller
          name="isEmriTipi"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled}
              style={{ width: "100%" }}
              showSearch
              allowClear
              placeholder="Seçim Yapınız"
              optionFilterProp="children"
              filterOption={(input, option) => (option.label ? option.label.toLocaleLowerCase("tr-TR").includes(input.toLocaleLowerCase("tr-TR")) : false)}
              onDropdownVisibleChange={(open) => {
                if (open) fetchData();
              }}
              dropdownRender={(menu) => <Spin spinning={loading}>{menu}</Spin>}
              options={options.map((item) => ({
                value: item.TB_ISEMRI_TIP_ID,
                label: item.IMT_TANIM,
              }))}
              onChange={(value) => {
                // Eğer değer `null` veya `undefined` ise, form değerlerini temizle
                setValue("isEmriTipi", value !== undefined ? value : null);
                setValue("isEmriTipiID", value !== undefined ? value : null);
                field.onChange(value);
              }}
              value={field.value ?? null} // `undefined` değeri için `null` kullanarak `allowClear` davranışını düzeltin
            />
          )}
        />

        <Controller
          name="isEmriTipiID"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text" // Set the type to "text" for name input
              style={{ display: "none" }}
            />
          )}
        />
      </div>
    </div>
  );
}

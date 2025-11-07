import React, { useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select, Spin } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Firma = ({ name, codeName, checked, required, yakit = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setValue, watch, control } = useFormContext();

  const fetchData = useCallback(() => {
    setLoading(true);
    if (yakit) {
      CodeControlByUrlService("Company/GetCompanyListForSelectInput?type=3")
        .then((res) => {
          setData(res?.data || []);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      CodeControlByUrlService("Company/GetCompanyListForSelectInput?type=2")
        .then((res) => {
          setData(res?.data || []);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [yakit]);

  return (
    <Controller
      name={codeName || "firmaId"}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            showSearch
            allowClear
            disabled={checked}
            optionFilterProp="children"
            className={fieldState.error ? "input-error" : ""}
            filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
            filterSort={(a, b) => (a?.label.toLowerCase() ?? "").localeCompare(b?.label.toLowerCase() ?? "")}
            options={data.map((item) => ({
              label: item.unvan,
              value: item.firmaId,
            }))}
            dropdownRender={(menu) =>
              loading ? (
                <div style={{ textAlign: "center", padding: 8 }}>
                  <Spin size="small" />
                </div>
              ) : (
                menu
              )
            }
            value={name ? watch(name) : watch("unvan")}
            onDropdownVisibleChange={(open) => {
              if (open) {
                fetchData();
              }
            }}
            onChange={(value) => {
              field.onChange(value);
              if (value === undefined) {
                setValue("tedarikciKod", "");
                setValue("unvan", "");
                name ? setValue(name, "") : setValue("unvan", "");
              } else {
                const selected = data.find((opt) => opt.firmaId === value);
                if (selected) {
                  setValue("tedarikciKod", selected.kod);
                  setValue("unvan", selected.unvan);
                  name ? setValue(name, selected.unvan) : setValue("unvan", selected.unvan);
                }
              }
            }}
          />
          {fieldState.error && <span style={{ color: "red" }}>{fieldState.error.message}</span>}
        </>
      )}
    />
  );
};

Firma.propTypes = {
  name: PropTypes.string,
  codeName: PropTypes.string,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  yakit: PropTypes.bool,
};

export default Firma;

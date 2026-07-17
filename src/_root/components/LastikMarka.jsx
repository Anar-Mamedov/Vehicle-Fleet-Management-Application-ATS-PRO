import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Button, Divider, Input, message, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { AddLastikMarkaService, GetLastikMarkaListService } from "../../api/services/lastiktanim_services";

import { t } from "i18next";

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 300px;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default function LastikMarka({ name1, isRequired, multiSelect = false, inputWidth, dropdownWidth, placeholder, onChange, allowAdd = false }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMarka, setNewMarka] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetLastikMarkaListService();
      if (response && response.data) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMarka = async () => {
    const marka = newMarka.trim();
    if (!marka) {
      return;
    }

    const markaExists = options.some((option) => option.marka?.trim().toLowerCase() === marka.toLowerCase());
    if (markaExists) {
      message.warning(t("lastikSecenegiZatenVar"));
      return;
    }

    setLoading(true);
    try {
      const response = await AddLastikMarkaService(marka);
      const statusCode = response?.data?.statusCode;
      if (statusCode && ![200, 201, 202].includes(statusCode)) {
        message.error(t("lastikSecenegiEklenemedi"));
        return;
      }

      setNewMarka("");
      await fetchData();
      message.success(t("lastikSecenegiEklendi"));
    } catch {
      message.error(t("lastikSecenegiEklenemedi"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDiv
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
        rowGap: "0px",
      }}
    >
      <Controller
        name={name1}
        control={control}
        rules={{ required: isRequired ? t("alanBosBirakilamaz") : false }}
        render={({ field }) => {
          let normalizedValue = field.value;
          if (multiSelect) {
            normalizedValue = Array.isArray(field.value) ? field.value : [];
          }

          const idToLabelMap = new Map(options.map((opt) => [opt.siraNo, opt.marka]));
          const getSelectedLabels = (vals) => {
            if (!Array.isArray(vals)) return [];
            const labels = [];
            for (const val of vals) {
              const label = idToLabelMap.get(val);
              if (label) labels.push(label);
            }
            return labels;
          };

          return (
            <StyledSelect
              {...field}
              status={errors[name1] ? "error" : ""}
              mode={multiSelect ? "multiple" : undefined}
              showSearch
              allowClear
              placeholder={placeholder || "Seçim Yapınız"}
              optionFilterProp="children"
              filterOption={(input, option) => {
                const label = option && option.label ? String(option.label) : "";
                if (!label) return false;
                return label.toLowerCase().includes(String(input).toLowerCase());
              }}
              onDropdownVisibleChange={(open) => {
                if (open) {
                  fetchData();
                }
              }}
              loading={loading}
              dropdownRender={(menu) => (
                <Spin spinning={loading}>
                  {menu}
                  {allowAdd && (
                    <>
                      <Divider style={{ margin: "8px 0" }} />
                      <div style={{ display: "flex", gap: "10px", padding: "0 8px 4px", width: "100%" }}>
                        <Input
                          value={newMarka}
                          onChange={(event) => setNewMarka(event.target.value)}
                          onKeyDown={(event) => {
                            event.stopPropagation();
                            if (event.key === "Enter") {
                              event.preventDefault();
                              addMarka();
                            }
                          }}
                        />
                        <Button type="text" icon={<PlusOutlined />} onClick={addMarka}>
                          {t("ekle")}
                        </Button>
                      </div>
                    </>
                  )}
                </Spin>
              )}
              options={options.map((item) => ({
                value: item.siraNo,
                label: item.marka,
              }))}
              value={normalizedValue}
              onChange={(value) => {
                if (multiSelect) {
                  const selectedLabels = getSelectedLabels(value);
                  setValue(`${name1}ID`, value);
                  setValue(`${name1}Label`, selectedLabels);
                  field.onChange(value);
                  if (typeof onChange === "function") {
                    onChange(Array.isArray(value) ? value : []);
                  }
                  return;
                }

                setValue(`${name1}ID`, value);
                const singleLabel = idToLabelMap.get(value) || null;
                setValue(`${name1}Label`, singleLabel);
                field.onChange(value);
                if (typeof onChange === "function") {
                  onChange(value != null ? [value] : []);
                }
              }}
              style={{ width: inputWidth }}
              dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "100px" }}
              popupMatchSelectWidth={false}
            />
          );
        }}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text" // Set the type to "text" for name input
            style={{ display: "none" }}
          />
        )}
      />
    </StyledDiv>
  );
}

LastikMarka.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  multiSelect: PropTypes.bool,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dropdownWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  allowAdd: PropTypes.bool,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

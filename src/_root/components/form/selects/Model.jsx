import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select, message } from "antd";
import { CodeControlByUrlService } from "../../../../api/services/code/services";

const Model = ({ required }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setValue, watch, control } = useFormContext();

  const markaId = watch("markaId");

  const handleClickSelect = async () => {
    // markaId null veya undefined ise API çağrısı yapma
    if (!markaId || markaId === "null" || markaId === null) {
      message.warning("Lütfen önce marka seçiniz!");
      return;
    }

    setLoading(true);
    try {
      const res = await CodeControlByUrlService(`Model/GetModelListByMarkId?markId=${markaId}`);

      // API response kontrolü
      if (res && res.data) {
        setData(res.data);
      } else {
        setData([]);
        message.info("Bu marka için model bulunamadı.");
      }
    } catch (error) {
      console.error("Model yükleme hatası:", error);
      setData([]);

      // Hata mesajını göster
      if (error.response && error.response.data && error.response.data.message) {
        message.error(`Model yükleme hatası: ${error.response.data.message}`);
      } else {
        message.error("Model yüklenirken bir hata oluştu!");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(watch("markaId"));

  return (
    <Controller
      name="modelId"
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Select
            {...field}
            showSearch
            allowClear
            loading={loading}
            optionFilterProp="children"
            className={fieldState.error ? "input-error" : ""}
            filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
            filterSort={(optionA, optionB) => (optionA?.label.toLowerCase() ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
            options={data.map((item) => ({
              label: item.modelDef,
              value: item.siraNo,
            }))}
            value={watch("model")}
            onClick={handleClickSelect}
            onChange={(e) => {
              field.onChange(e);
              if (e === undefined || e === null) {
                field.onChange("");
                setValue("model", "");
              } else {
                const selectedOption = data.find((option) => option.siraNo === e);
                if (selectedOption) {
                  setValue("model", selectedOption.modelDef);
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

Model.propTypes = {
  required: PropTypes.bool,
};

export default Model;

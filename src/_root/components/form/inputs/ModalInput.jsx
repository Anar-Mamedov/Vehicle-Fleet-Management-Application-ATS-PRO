import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Input } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";

const SurucuInput = ({ name, checked, readonly, onPlusClick, onMinusClick, required, disabled }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState: { error } }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Input
            {...field}
            status={error ? "error" : ""}
            readOnly={readonly}
            disabled={disabled}
            suffix={
              disabled ? (
                field.value ? (
                  <CloseCircleFilled style={{ color: "#d9d9d9" }} />
                ) : (
                  <PlusOutlined style={{ color: "#d9d9d9" }} />
                )
              ) : field.value ? (
                <CloseCircleFilled style={{ color: "#FF4D4F" }} onClick={onMinusClick} />
              ) : (
                <PlusOutlined style={{ color: "#1677ff" }} onClick={onPlusClick} />
              )
            }
          />
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </div>
      )}
    />
  );
};

SurucuInput.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  onPlusClick: PropTypes.func,
};

export default SurucuInput;

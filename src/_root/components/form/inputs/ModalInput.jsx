import React from "react";
import { Controller, useFormContext, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Input } from "antd";
import { PlusOutlined, CloseCircleFilled } from "@ant-design/icons";

const SurucuInput = ({ name, checked, readonly, onPlusClick, onMinusClick, required, disabled, placeholder }) => {
  const methods = useFormContext() || useForm();
  const { control } = methods;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState: { error } }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
          <Input
            {...field}
            status={error ? "error" : ""}
            placeholder={placeholder}
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
  onMinusClick: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SurucuInput;

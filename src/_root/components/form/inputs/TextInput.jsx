import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Input } from "antd";

const TextInput = ({ name, length, style, readonly, required }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? "Bu alan boş bırakılamaz!" : false }}
      render={({ field, fieldState }) => (
        <>
          <Input
            {...field}
            maxLength={length}
            style={{
              ...style,
            }}
            readOnly={readonly}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
          {fieldState.error && (
            <span style={{ color: "red" }}>{fieldState.error.message}</span>
          )}
        </>
      )}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string,
  length: PropTypes.number,
  style: PropTypes.object,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
};

export default TextInput;

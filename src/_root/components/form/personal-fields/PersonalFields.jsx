import React, { useEffect, useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { PersonalFieldsReadService, PersonalFieldsUpdateService } from "../../../../api/service";
import { Input, InputNumber, Select } from "antd";
import UpdateConfirmModal from "../../confirm/UpdateConfirmModal";
import { CodeControlByIdService } from "../../../../api/services/code/services";

const PersonalFields = ({ personalProps }) => {
  const [data, setData] = useState([]);
  const [originalFields, setOriginalFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState(null);
  const debounceTimers = useRef({});

  const { control, setValue, watch } = useFormContext();

  const { form, fields, setFields } = personalProps;

  const handleClickSelect = (code) => {
    CodeControlByIdService(code).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    PersonalFieldsReadService(form).then((res) => {
      const apiData = res.data;
      const updatedFields = fields.map((field) => {
        const apiFieldName = field.label;
        if (Object.prototype.hasOwnProperty.call(apiData, apiFieldName)) {
          return {
            ...field,
            value: apiData[apiFieldName],
            label: apiFieldName,
          };
        } else {
          return field;
        }
      });
      setFields(updatedFields);
      setOriginalFields(updatedFields);
    });
  }, [form, setFields]);

  const handleInputChange = (field, value) => {
    const updatedFields = fields.map((fld) => (fld.key === field.key ? { ...fld, value } : fld));
    setFields(updatedFields);
  };

  const handleInputBlur = (field, value) => {
    const originalField = originalFields.find((fld) => fld.key === field.key);
    if (originalField && originalField.value !== value) {
      setIsModalOpen(true);
      setValues({ key: field.key, value });
    }
  };

  const handleConfirmOk = () => {
    PersonalFieldsUpdateService(form, values.value, values.key).then((res) => {
      if (res?.data.statusCode === 202) {
        console.log(1);
      }
    });
    setIsModalOpen(false);
  };

  const handleConfirmCancel = () => {
    setFields(originalFields);
    setIsModalOpen(false);
  };

  const confirmModalProps = {
    handleConfirmOk,
    handleConfirmCancel,
    isModalOpen,
  };

  return (
    <div className="grid grid-cols-12 gap-1">
      {fields.map((item) => {
        if (item.type === "text") {
          return (
            <div key={item.label} className="col-span-3 mt-10">
              <div className="flex flex-col gap-1">
                <input
                  id={item.label}
                  onChange={(e) => handleInputChange(item, e.target.value)}
                  onBlur={(e) => handleInputBlur(item, e.target.value)}
                  value={item.value}
                  className="personal-input"
                />
                <Controller name={item.label} control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
          );
        } else if (item.type === "select") {
          return (
            <div key={item.label} className="col-span-3 mt-10 flex flex-col gap-1">
              <input
                id={item.label}
                onChange={(e) => handleInputChange(item, e.target.value)}
                onBlur={(e) => handleInputBlur(item, e.target.value)}
                value={item.value}
                className="personal-input"
              />
              <Controller
                name={item.name2}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) => (optionA?.label.toLowerCase() ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                    options={data.map((item) => ({
                      label: item.codeText,
                      value: item.siraNo,
                    }))}
                    value={watch(item.label)}
                    onClick={() => handleClickSelect(item.code)}
                    onChange={(e) => {
                      field.onChange(e);
                      const selectedOption = data.find((option) => option.siraNo === e);
                      if (e === undefined) {
                        setValue(item.label, "");
                        setValue(item.name2, null);
                      } else {
                        setValue(item.name2, e);
                        setValue(item.label, selectedOption.codeText);
                      }
                    }}
                  />
                )}
              />
              <Controller name={item.name2} control={control} render={({ field }) => <Input {...field} style={{ display: "none" }} />} />
            </div>
          );
        } else if (item.type === "number") {
          return (
            <div key={item.label} className="col-span-3 mt-10">
              <div className="flex flex-col gap-1">
                <input
                  id={item.label}
                  onChange={(e) => handleInputChange(item, e.target.value)}
                  onBlur={(e) => handleInputBlur(item, e.target.value)}
                  value={item.value}
                  className="personal-input"
                />
                <Controller name={item.label} control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
          );
        }
        return null;
      })}

      <UpdateConfirmModal confirmModalProps={confirmModalProps} />
    </div>
  );
};

PersonalFields.propTypes = {
  personalProps: PropTypes.shape({
    form: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.oneOf(["text", "select", "number"]),
        key: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string]),
        name2: PropTypes.string,
        code: PropTypes.number,
      })
    ),
    setFields: PropTypes.func,
  }),
};

export default PersonalFields;

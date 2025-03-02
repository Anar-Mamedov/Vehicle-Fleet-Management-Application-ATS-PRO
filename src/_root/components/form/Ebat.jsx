import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { CodeControlService } from "../../../api/service";

const Ebat = ({ field }) => {
  const [data, setData] = useState([]);
  const { setValue, watch } = useFormContext();

  const handleClick = () => {
    CodeControlService(702).then((res) => {
      setData(res.data);
    });
  };

  return (
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
      value={watch("ebat")}
      onClick={handleClick}
      onChange={(e) => {
        field.onChange(e);
        if (e === undefined) {
          const selectedOption = data.find((option) => option.siraNo === e);
          if (!selectedOption) {
            setValue("ebat", "");
          }
        } else {
          const selectedOption = data.find((option) => option.siraNo === e);
          if (selectedOption) {
            setValue("ebat", selectedOption.codeText);
          }
        }
      }}
    />
  );
};

Ebat.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func,
  }),
};

export default Ebat;

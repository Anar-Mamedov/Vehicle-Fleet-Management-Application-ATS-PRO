import { useState } from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { Select } from "antd";
import { MalzemeDepoListGetService } from "../../../api/service";

const Depo = ({ field }) => {
  const [data, setData] = useState([]);
  const { watch, setValue } = useFormContext();

  const handleClick = () => {
    MalzemeDepoListGetService().then((res) => {
      setData(res.data);
    });
  };

  return (
    <Select
      {...field}
      showSearch
      allowClear
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label.toLowerCase() ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={data.map((item) => ({
        label: item.tanim,
        value: item.siraNo,
      }))}
      value={watch("depo")}
      onClick={handleClick}
      onChange={(e) => {
        field.onChange(e);
        if (e === undefined) {
          const selectedOption = data.find((option) => option.siraNo === e);
          if (!selectedOption) {
            setValue("depo", "");
            setValue("depoLokasyonId", "");
          }
        } else {
          const selectedOption = data.find((option) => option.siraNo === e);
          if (selectedOption) {
            setValue("depo", selectedOption.tanim);
            setValue("depoLokasyonId", selectedOption.lokasyonId);
          }
        }
      }}
    />
  );
};

Depo.propTypes = {
  field: PropTypes.shape({
    onChange: PropTypes.func,
  }),
};

export default Depo;

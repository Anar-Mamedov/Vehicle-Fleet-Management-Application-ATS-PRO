import React from "react";
import { Select } from "antd";

const { Option } = Select;

function DurumFiltresi(props) {
  const options = [
    {
      value: "1",
      label: "Aktif",
    },
    {
      value: "2",
      label: "Pasif",
    },
    {
      value: "3",
      label: "Tümü",
    },
  ];

  return (
    <div>
      <Select
        // showSearch
        style={{
          width: 200,
        }}
        // allowClear
        placeholder="Durum"
        optionFilterProp="label"
        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
        options={options}
        defaultValue="1"
      />
    </div>
  );
}

export default DurumFiltresi;

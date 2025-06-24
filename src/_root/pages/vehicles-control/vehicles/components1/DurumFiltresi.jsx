import React from "react";
import { Select } from "antd";

const { Option } = Select;

function DurumFiltresi(props) {
  const options = [
    {
      value: "1",
      label: "Tüm Araçlar",
    },
    {
      value: "2",
      label: "Aktif Araçlar",
    },
    {
      value: "3",
      label: "Pasif Araçlar",
    },
    {
      value: "4",
      label: "Arşivdeki Araçlar",
    },
    {
      value: "5",
      label: "Yenilenme Süresi Geçenler",
    },
    {
      value: "6",
      label: "Periyodik Bakımı Geçenler",
    },
    {
      value: "7",
      label: "Serviste Olan Araçlar",
    },
    {
      value: "8",
      label: "Seferde Olan Araçlar",
    },
  ];

  return (
    <div>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        allowClear
        placeholder="Durum"
        optionFilterProp="label"
        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
        options={options}
      />
    </div>
  );
}

export default DurumFiltresi;

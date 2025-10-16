import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import useDebounce from "../../../../../hooks/useDebounce";
import React from "react";

export default function SearchField({ onChange }) {
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 1000);

  React.useEffect(() => {
    onChange("search", debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Ara..." prefix={<SearchOutlined style={{ color: "#1890ff" }} />} style={{ width: "200px" }} />
  );
}

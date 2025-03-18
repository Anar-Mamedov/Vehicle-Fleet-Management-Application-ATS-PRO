import React, { useState, useEffect } from "react";
import { Select, Button, Popover } from "antd";
import AxiosInstance from "../../../../../api/http";

const { Option } = Select;

const TypeFilter = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (selectedOptionValues) => {
    setSelectedValues(selectedOptionValues);
  };

  useEffect(() => {
    // Selectbox açık olduğunda API isteğini yap
    if (open) {
      AxiosInstance.get("IsEmriTip")
        .then((response) => {
          const options = response.map((option) => ({
            key: option.TB_ISEMRI_TIP_ID,
            value: option.TB_ISEMRI_TIP_ID,
            label: option.IMT_TANIM,
          }));
          setOptions(options);
        })
        .catch((error) => {
          console.log("API Error:", error);
        });
    }
  }, [open]); // open state'i değiştiğinde useEffect hook'unu tetikle

  const handleSubmit = () => {
    const selectedOptionsObj = selectedValues.reduce((acc, currentValue) => {
      const option = options.find((option) => option.value === currentValue);
      if (option) {
        acc[option.value] = option.label;
      }
      return acc;
    }, {});

    onSubmit(selectedOptionsObj);
    setOpen(false);
  };

  const handleCancelClick = () => {
    setSelectedValues([]);
    setOpen(false);
    onSubmit("");
  };

  const content = (
    <div style={{ width: "300px" }}>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleCancelClick}>İptal</Button>
        <Button type="primary" onClick={handleSubmit}>
          Uygula
        </Button>
      </div>
      <div style={{ padding: "10px" }}>
        <Select mode="multiple" style={{ width: "100%" }} placeholder="Ara..." value={selectedValues} onChange={handleChange} allowClear>
          {options.map((option) => (
            <Option key={option.key} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={setOpen} placement="bottom">
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        İş Emri Tipi
        <div
          style={{
            marginLeft: "5px",
            background: "#006cb8",
            borderRadius: "50%",
            width: "17px",
            height: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {selectedValues.length}
        </div>
      </Button>
    </Popover>
  );
};

export default TypeFilter;

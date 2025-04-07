import React, { useState, useEffect } from "react";
import { Select, Button, Popover } from "antd";
import AxiosInstance from "../../../../../../api/http";

const { Option } = Select;

const ConditionFilter = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  // selectedValues artık seçilen TB_KOD_ID değerlerini saklayacak
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (selectedOptionValues) => {
    setSelectedValues(selectedOptionValues);
  };

  useEffect(() => {
    if (open) {
      AxiosInstance.get("KodList?grup=32801")
        .then((response) => {
          const options = response.map((option) => ({
            key: option.TB_KOD_ID,
            value: option.TB_KOD_ID, // value olarak TB_KOD_ID kullanılıyor
            label: option.KOD_TANIM,
          }));
          setOptions(options);
        })
        .catch((error) => {
          console.log("API Error:", error);
        });
    }
  }, [open]);

  const handleSubmit = () => {
    // Seçilen TB_KOD_ID değerlerini kullanarak istenen objeyi oluştur
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
        Durum
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

export default ConditionFilter;

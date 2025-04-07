import React, { useState, useEffect } from "react";
import { Select, Button, Popover } from "antd";
import AxiosInstance from "../../../../../../api/http";

const { Option } = Select;

const LocationFilter = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  // filters state'ini bir obje olarak başlat
  const [filters, setFilters] = useState({});

  const handleChange = (selectedValues) => {
    // Seçilen değerlerin id'lerini kullanarak filters objesini güncelle
    const newFilters = selectedValues.reduce((acc, currentValue) => {
      const option = options.find((option) => option.value === currentValue);
      if (option) {
        acc[option.key] = option.value;
      }
      return acc;
    }, {});
    setFilters(newFilters);
  };

  useEffect(() => {
    if (open) {
      AxiosInstance.get("getLokasyonlar")
        .then((response) => {
          // API'den gelen veriye göre options dizisini oluştur
          const options = response.map((option, index) => ({
            key: index.toString(), // Benzersiz bir key olarak index kullan
            value: option, // Gösterilecek değer
          }));
          setOptions(options);
        })
        .catch((error) => {
          console.log("API Error:", error);
        });
    }
  }, [open]);

  const handleSubmit = () => {
    onSubmit(filters);
    setOpen(false);
  };

  const handleCancelClick = () => {
    setFilters({});
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
        <Select mode="multiple" style={{ width: "100%" }} placeholder="Ara..." value={Object.values(filters)} onChange={handleChange} allowClear>
          {options.map((option) => (
            <Option key={option.key} value={option.value}>
              {option.value}
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
        Lokasyon
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
          {Object.keys(filters).length}
        </div>
      </Button>
    </Popover>
  );
};

export default LocationFilter;

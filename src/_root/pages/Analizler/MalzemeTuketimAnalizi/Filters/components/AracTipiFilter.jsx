import React, { useState, useEffect } from "react";
import { Select, Button, Popover, Spin } from "antd";
import AxiosInstance from "../../../../../../api/http";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";

const { Option } = Select;

const AracTipiFilter = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleChange = (selectedValues) => {
    // Seçilen değerleri doğrudan state'e ata
    setSelectedValues(selectedValues);
  };

  useEffect(() => {
    if (open) {
      setLoading(true); // API isteği başladığında loading true yap
      AxiosInstance.get("Code/GetCodeTextById?codeNumber=100")
        .then((response) => {
          // API'den gelen veriye göre options dizisini oluştur
          const options = response.data.map((item) => ({
            key: item.siraNo.toString(), // ID değerini key olarak kullan
            value: item.codeText, // Gösterilecek değer
          }));
          setOptions(options);
          setLoading(false); // API isteği bittiğinde loading false yap
        })
        .catch((error) => {
          console.log("API Error:", error);
          setLoading(false); // Hata durumunda da loading false yap
        });
    }
  }, [open]);

  const handleSubmit = () => {
    setOpen(false);
    // onSubmit(selectedValues); // onSubmit ile değerleri gönder
  };

  useEffect(() => {
    // Seçilen id'leri setValue ile ayarla
    const selectedIdsString = selectedValues.join(",");
    setValue("aracTipiValues", selectedIdsString);
  }, [selectedValues]);

  const handleCancelClick = () => {
    setSelectedValues([]);
    setValue("aracTipiValues", "");
    setOpen(false);
    // onSubmit([]);
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
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Ara..."
          value={selectedValues}
          onChange={handleChange}
          allowClear
          notFoundContent={
            loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <Spin size="small" />
              </div>
            ) : null
          } // Spin burada gösterilecek
        >
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
        Araç Tipi
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

export default AracTipiFilter;

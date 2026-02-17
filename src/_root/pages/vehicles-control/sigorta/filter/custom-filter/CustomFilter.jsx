import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./style.css";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/tr"; // For Turkish locale
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import DatePickerComponent from "./components/DatePickerComponent";

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

dayjs.locale("tr"); // use Turkish locale

const { Text, Link } = Typography;

const StyledCloseOutlined = styled(CloseOutlined)`
  svg {
    width: 10px;
    height: 10px;
  }
`;

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #80808048;
  cursor: pointer;
`;

export default function CustomFilter({ onSubmit, currentFilters }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const [baslangicTarih, setBaslangicTarih] = useState(null);
  const [bitisTarih, setBitisTarih] = useState(null);

  const baslangicTarihSelected = watch("baslangicTarih");
  const bitisTarihSelected = watch("bitisTarih");

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    if (baslangicTarihSelected === null) {
      setBaslangicTarih(null);
    } else {
      setBaslangicTarih(dayjs(baslangicTarihSelected));
      setHasUserInteracted(true);
    }
    if (bitisTarihSelected === null) {
      setBitisTarih(null);
    } else {
      setBitisTarih(dayjs(bitisTarihSelected));
      setHasUserInteracted(true);
    }
  }, [baslangicTarihSelected, bitisTarihSelected, isInitialMount]);

  // Tarih seçimi yapıldığında veya filtreler eklenip kaldırıldığında düğmenin stilini değiştirmek için bir durum
  const isFilterApplied = newObjectsAdded || filtersExist || baslangicTarih || bitisTarih;

  const handleSelectChange = (value, rowId) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [rowId]: value,
    }));
    setHasUserInteracted(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Sadece kullanıcı etkileşimi olduğunda filtreleri gönder
    if (!hasUserInteracted && !rows.length && !baslangicTarih && !bitisTarih) {
      setOpen(false);
      return;
    }

    // Combine selected values, input values for each row, and date range
    const filterData = rows.reduce((acc, row) => {
      const selectedValue = selectedValues[row.id] || "";
      const inputValue = inputValues[`input-${row.id}`] || "";
      if (selectedValue && inputValue) {
        acc[selectedValue] = inputValue;
      }
      return acc;
    }, {});

    // Add date range to the filterData object if dates are selected
    if (baslangicTarih) {
      filterData.baslangicTarih = baslangicTarih.format("YYYY-MM-DD");
    }
    if (bitisTarih) {
      filterData.bitisTarih = bitisTarih.format("YYYY-MM-DD");
    }

    // Preserve existing lokasyonId and aracIds values if available
    const existingFilters = currentFilters || {};
    if (existingFilters.aracIds !== undefined) {
      filterData.aracIds = existingFilters.aracIds;
    }
    if (existingFilters.lokasyonId !== undefined) {
      filterData.lokasyonId = existingFilters.lokasyonId;
    }

    console.log("Submitting filter data:", filterData);
    // Pass the filter data to the parent component
    onSubmit(filterData);
    setOpen(false);
  };

  const handleCancelClick = (rowId) => {
    setHasUserInteracted(true);

    setSelectedValues((prev) => {
      const newSelectedValues = { ...prev };
      delete newSelectedValues[rowId];
      return newSelectedValues;
    });

    setInputValues((prev) => {
      const newInputValues = { ...prev };
      delete newInputValues[`input-${rowId}`];
      return newInputValues;
    });

    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

    const filtersRemaining = rows.length > 1;
    setFiltersExist(filtersRemaining);
    if (!filtersRemaining) {
      setNewObjectsAdded(false);
    }

    // Submit updated filters after removing one
    // setTimeout(handleSubmit, 0);
  };

  const handleInputChange = (e, rowId) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: e.target.value,
    }));
    setHasUserInteracted(true);
  };

  const handleDateChange = (date, rowId) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: date ? date.format("YYYY-MM-DD") : "",
    }));
    setHasUserInteracted(true);
  };

  const handleAddFilterClick = () => {
    const newRow = { id: Date.now() };
    setRows((prevRows) => [...prevRows, newRow]);
    setHasUserInteracted(true);
    setNewObjectsAdded(true);
    setFiltersExist(true);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Handle date picker changes
  const handleBaslangicTarihChange = (date) => {
    setBaslangicTarih(date);
    setHasUserInteracted(true);
  };

  const handleBitisTarihChange = (date) => {
    setBitisTarih(date);
    setHasUserInteracted(true);
  };

  return (
    <>
      <Button
        onClick={showDrawer}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isFilterApplied ? "#EBF6FE" : "#ffffffff",
        }}
        className={isFilterApplied ? "#ff0000-dot-button" : ""}
      >
        <FilterOutlined />
        <span style={{ marginRight: "5px" }}>Filtreler</span>
        {isFilterApplied && <span className="blue-dot"></span>}
      </Button>
      <Drawer
        extra={
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              Uygula
            </Button>
          </Space>
        }
        title={
          <span>
            <FilterOutlined style={{ marginRight: "8px" }} /> Filtreler
          </span>
        }
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div
          style={{
            marginBottom: "20px",
            border: "1px solid #80808048",
            padding: "15px 10px",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Tarih Aralığı</Text>
          </div>

          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <DatePicker style={{ width: "100%" }} placeholder="Başlangıç Tarihi" value={baslangicTarih} onChange={handleBaslangicTarihChange} locale={dayjs.locale("tr")} />
            <Text style={{ fontSize: "14px" }}>-</Text>
            <DatePicker style={{ width: "100%" }} placeholder="Bitiş Tarihi" value={bitisTarih} onChange={handleBitisTarihChange} locale={dayjs.locale("tr")} />
          </div>
        </div>
        {rows.map((row) => (
          <Row
            key={row.id}
            style={{
              marginBottom: "10px",
              border: "1px solid #80808048",
              padding: "15px 10px",
              borderRadius: "8px",
            }}
          >
            <Col span={24}>
              <Col
                span={24}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Yeni Filtre</Text>
                <CloseButton onClick={() => handleCancelClick(row.id)}>
                  <StyledCloseOutlined />
                </CloseButton>
              </Col>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <Select
                  style={{ width: "100%", marginBottom: "10px" }}
                  showSearch
                  placeholder={`Seçim Yap`}
                  optionFilterProp="children"
                  onChange={(value) => handleSelectChange(value, row.id)}
                  value={selectedValues[row.id] || undefined}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: "sigortaTuru",
                      label: "Sigorta Türü",
                    },
                  ]}
                />
                <Input
                  placeholder="Arama Yap"
                  name={`input-${row.id}`}
                  value={inputValues[`input-${row.id}`] || ""}
                  onChange={(e) => handleInputChange(e, row.id)}
                  style={{ display: selectedValues[row.id] === "tebligBaslangicTarih" || selectedValues[row.id] === "tebligBitisTarih" ? "none" : "block" }}
                />
                {(selectedValues[row.id] === "tebligBaslangicTarih" || selectedValues[row.id] === "tebligBitisTarih") && (
                  <DatePickerComponent value={inputValues[`input-${row.id}`]} onChange={(date) => handleDateChange(date, row.id)} />
                )}
              </Col>
            </Col>
          </Row>
        ))}
        <Button
          type="primary"
          onClick={handleAddFilterClick}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <PlusOutlined />
          Filtre ekle
        </Button>
      </Drawer>
    </>
  );
}

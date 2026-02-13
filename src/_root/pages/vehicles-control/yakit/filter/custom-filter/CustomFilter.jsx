import React from "react";
import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Drawer, Input, Row, Typography, Select, Space } from "antd";
import { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import { CodeControlService, CustomCodeControlService, MaterialListSelectService } from "../../../../../../api/service";
import AxiosInstance from "../../../../../../api/http";
import "./style.css";

const { Text } = Typography;

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

const FILTER_OPTIONS = [
  { value: "surucuIds", label: "Sürücü" },
  { value: "istasyon", label: "İstasyon" },
  { value: "yakitTipIds", label: "Yakıt Tipi" },
  { value: "firmaIds", label: "Firma" },
  { value: "guzergahIds", label: "Güzergah" },
  { value: "aracTipIds", label: "Araç Tipi" },
];

const TEXT_INPUT_FILTERS = ["istasyon"];

const fetchFilterData = async (filterKey) => {
  switch (filterKey) {
    case "surucuIds":
      return CustomCodeControlService("Driver/GetDriverListForSelectInput").then((res) =>
        res.data.map((item) => ({ value: item.surucuId, label: item.isim }))
      );
    case "yakitTipIds":
      return MaterialListSelectService("YAKIT").then((res) =>
        res.data.map((item) => ({ value: item.malzemeId, label: item.tanim }))
      );
    case "firmaIds":
      return AxiosInstance.get("Company/GetCompanyListForSelectInput").then((res) =>
        res.data.map((item) => ({ value: item.firmaId, label: item.unvan }))
      );
    case "guzergahIds":
      return CustomCodeControlService("FuelRoute/GetFuelRouteListForSelectInput").then((res) =>
        res.data.map((item) => ({ value: item.guzergahId, label: item.guzergah }))
      );
    case "aracTipIds":
      return CodeControlService(100).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    default:
      return [];
  }
};

export default function CustomFilter({ onSubmit, currentFilters, dateRange, onDateRangeChange }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [filterOptionsData, setFilterOptionsData] = useState({});

  // Derive dates from parent's dateRange prop
  const startDate = dateRange?.baslangicTarih ? dayjs(dateRange.baslangicTarih) : null;
  const endDate = dateRange?.bitisTarih ? dayjs(dateRange.bitisTarih) : null;

  const handleStartDateChange = (date) => {
    if (onDateRangeChange) {
      onDateRangeChange({
        baslangicTarih: date ? date.format("YYYY-MM-DD") : null,
        bitisTarih: dateRange?.bitisTarih || null,
      });
    }
  };

  const handleEndDateChange = (date) => {
    if (onDateRangeChange) {
      onDateRangeChange({
        baslangicTarih: dateRange?.baslangicTarih || null,
        bitisTarih: date ? date.format("YYYY-MM-DD") : null,
      });
    }
  };

  const handleFilterTypeChange = (value, rowId) => {
    setSelectedFilters((prev) => ({ ...prev, [rowId]: value }));
    setSelectedValues((prev) => ({ ...prev, [rowId]: TEXT_INPUT_FILTERS.includes(value) ? "" : [] }));
    setFilterOptionsData((prev) => ({ ...prev, [rowId]: [] }));

    if (value && !TEXT_INPUT_FILTERS.includes(value)) {
      fetchFilterData(value).then((options) => {
        setFilterOptionsData((prev) => ({ ...prev, [rowId]: options }));
      });
    }
  };

  const handleValueChange = (values, rowId) => {
    setSelectedValues((prev) => ({ ...prev, [rowId]: values }));
  };

  const handleTextInputChange = (e, rowId) => {
    setSelectedValues((prev) => ({ ...prev, [rowId]: e.target.value }));
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const json = {};

    rows.forEach((row) => {
      const filterKey = selectedFilters[row.id];
      const values = selectedValues[row.id];
      if (filterKey && values) {
        if (TEXT_INPUT_FILTERS.includes(filterKey)) {
          if (values.trim()) {
            json[filterKey] = values;
          }
        } else if (Array.isArray(values) && values.length > 0) {
          json[filterKey] = values;
        }
      }
    });

    // Preserve existing aracIds and lokasyonIds
    const existingFilters = currentFilters || {};
    if (existingFilters.aracIds !== undefined) {
      json.aracIds = existingFilters.aracIds;
    }
    if (existingFilters.lokasyonIds !== undefined) {
      json.lokasyonIds = existingFilters.lokasyonIds;
    }

    onSubmit(json);
    setOpen(false);
  };

  const handleCancelClick = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      delete updated[rowId];
      return updated;
    });
    setSelectedValues((prev) => {
      const updated = { ...prev };
      delete updated[rowId];
      return updated;
    });
    setFilterOptionsData((prev) => {
      const updated = { ...prev };
      delete updated[rowId];
      return updated;
    });

    const filtersRemaining = rows.length > 1;
    setFiltersExist(filtersRemaining);
    if (!filtersRemaining) {
      setNewObjectsAdded(false);
    }
    onSubmit({});
  };

  const handleAddFilterClick = () => {
    const newRow = { id: Date.now() };
    setRows((prevRows) => [...prevRows, newRow]);
    setNewObjectsAdded(true);
    setFiltersExist(true);
  };

  const getAvailableOptions = (currentRowId) => {
    const usedFilters = Object.entries(selectedFilters)
      .filter(([rowId]) => String(rowId) !== String(currentRowId))
      .map(([, value]) => value);

    return FILTER_OPTIONS.filter((opt) => !usedFilters.includes(opt.value));
  };

  const isFilterApplied = newObjectsAdded || filtersExist || startDate || endDate;

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
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Başlangıç Tarihi"
              value={startDate}
              onChange={handleStartDateChange}
              locale={dayjs.locale("tr")}
            />
            <Text style={{ fontSize: "14px" }}>-</Text>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Bitiş Tarihi"
              value={endDate}
              onChange={handleEndDateChange}
              locale={dayjs.locale("tr")}
            />
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
                  placeholder="Filtre Seçiniz"
                  optionFilterProp="label"
                  onChange={(value) => handleFilterTypeChange(value, row.id)}
                  value={selectedFilters[row.id] || undefined}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={getAvailableOptions(row.id)}
                />
                {selectedFilters[row.id] && TEXT_INPUT_FILTERS.includes(selectedFilters[row.id]) && (
                  <Input
                    placeholder="Arama Yap"
                    value={selectedValues[row.id] || ""}
                    onChange={(e) => handleTextInputChange(e, row.id)}
                  />
                )}
                {selectedFilters[row.id] && !TEXT_INPUT_FILTERS.includes(selectedFilters[row.id]) && (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    showSearch
                    allowClear
                    placeholder="Seçim Yapınız"
                    optionFilterProp="label"
                    onChange={(values) => handleValueChange(values, row.id)}
                    value={selectedValues[row.id] || []}
                    filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                    options={filterOptionsData[row.id] || []}
                  />
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

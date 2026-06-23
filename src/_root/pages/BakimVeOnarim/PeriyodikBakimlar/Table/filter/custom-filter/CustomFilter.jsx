import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./style.css";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/tr"; // For Turkish locale
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LokasyonTable from "../../../../../../components/LokasyonTable";
import MarkaSelectbox from "../../../../../../components/MarkaSelectbox";
import ModelSelectbox from "../../../../../../components/ModelSelectbox";
import KodIDSelectbox from "../../../../../../components/KodIDSelectbox";
import ServisKoduTablo from "../../../../../../components/ServisKoduTablo";

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

dayjs.locale("tr"); // use Turkish locale

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
  { value: "bakimIds", label: "Bakım Tanımı" },
  { value: "servisTipiKodIds", label: "Servis Tipi" },
  { value: "lokasyonIds", label: "Lokasyon" },
  { value: "markaIds", label: "Marka" },
  { value: "modelIds", label: "Model" },
];



export default function CustomFilter({ onSubmit }) {
  const { watch, unregister } = useFormContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [isInitialMount, setIsInitialMount] = useState(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startDateSelected = watch("startDate");
  const endDateSelected = watch("endDate");
  const durumSelected = watch("durumFilter");

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    if (startDateSelected === null) {
      setStartDate(null);
    } else {
      setStartDate(dayjs(startDateSelected));
    }
    if (endDateSelected === null) {
      setEndDate(null);
    } else {
      setEndDate(dayjs(endDateSelected));
    }
  }, [startDateSelected, endDateSelected, isInitialMount]);

  useEffect(() => {
    if (isInitialMount) return;
    handleSubmit();
  }, [startDate, endDate, durumSelected]);

  const handleFilterTypeChange = (value, rowId) => {
    setSelectedFilters((prev) => ({ ...prev, [rowId]: value }));
    setSelectedValues((prev) => ({ ...prev, [rowId]: [] }));

    // Clean up react-hook-form fields of the old filter type
    unregister(`marka-${rowId}`);
    unregister(`marka-${rowId}ID`);
    unregister(`model-${rowId}`);
    unregister(`model-${rowId}ID`);
    unregister(`servisTip-${rowId}`);
    unregister(`servisTip-${rowId}ID`);
    unregister(`bakim-${rowId}`);
    unregister(`lokasyon-${rowId}`);
  };

  const handleValueChange = (values, rowId) => {
    setSelectedValues((prev) => ({ ...prev, [rowId]: values }));
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const filterData = {};

    rows.forEach((row) => {
      const filterKey = selectedFilters[row.id];
      const values = selectedValues[row.id];
      if (filterKey && values && values.length > 0) {
        filterData[filterKey] = values;
      }
    });

    if (startDate) {
      filterData.baslangicTarih = startDate.format("YYYY-MM-DD");
    }
    if (endDate) {
      filterData.bitisTarih = endDate.format("YYYY-MM-DD");
    }

    if (durumSelected && durumSelected !== "all") {
      filterData.durum = durumSelected;
    }

    console.log(filterData);
    onSubmit(filterData);
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

    // Clean up react-hook-form fields
    unregister(`marka-${rowId}`);
    unregister(`marka-${rowId}ID`);
    unregister(`model-${rowId}`);
    unregister(`model-${rowId}ID`);
    unregister(`servisTip-${rowId}`);
    unregister(`servisTip-${rowId}ID`);
    unregister(`bakim-${rowId}`);
    unregister(`lokasyon-${rowId}`);

    const filtersRemaining = rows.length > 1;
    setFiltersExist(filtersRemaining);
    if (!filtersRemaining) {
      setNewObjectsAdded(false);
    }
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

  const getSelectedMarkaIds = () => {
    const markaRow = Object.entries(selectedFilters).find(([_, value]) => value === "markaIds");
    if (markaRow) {
      const rowId = markaRow[0];
      return selectedValues[rowId] || [];
    }
    return [];
  };

  const isFilterApplied = newObjectsAdded || filtersExist || startDate || endDate || (durumSelected && durumSelected !== "all");

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
            <DatePicker style={{ width: "100%" }} placeholder="Başlangıç Tarihi" value={startDate} onChange={setStartDate} locale={dayjs.locale("tr")} />
            <Text style={{ fontSize: "14px" }}>-</Text>
            <DatePicker style={{ width: "100%" }} placeholder="Bitiş Tarihi" value={endDate} onChange={setEndDate} locale={dayjs.locale("tr")} />
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
                  placeholder="Seçim Yap"
                  optionFilterProp="label"
                  onChange={(value) => handleFilterTypeChange(value, row.id)}
                  value={selectedFilters[row.id] || undefined}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={getAvailableOptions(row.id)}
                />
                {selectedFilters[row.id] && selectedFilters[row.id] === "lokasyonIds" && (
                  <LokasyonTable
                    fieldName={`lokasyon-${row.id}`}
                    multiSelect={true}
                    onSubmit={(selectedData) => {
                      const ids = (selectedData || []).map((item) => item.locationId);
                      handleValueChange(ids, row.id);
                    }}
                    workshopSelectedId={selectedValues[row.id] || []}
                  />
                )}
                {selectedFilters[row.id] && selectedFilters[row.id] === "markaIds" && (
                  <MarkaSelectbox
                    name1={`marka-${row.id}`}
                    multiSelect={true}
                    onChange={(values) => handleValueChange(values, row.id)}
                  />
                )}
                {selectedFilters[row.id] && selectedFilters[row.id] === "modelIds" && (
                  <ModelSelectbox
                    name1={`model-${row.id}`}
                    multiSelect={true}
                    markaId={getSelectedMarkaIds()}
                    onChange={(values) => handleValueChange(values, row.id)}
                  />
                )}
                {selectedFilters[row.id] && selectedFilters[row.id] === "servisTipiKodIds" && (
                  <KodIDSelectbox
                    name1={`servisTip-${row.id}`}
                    kodID={103}
                    placeholder="Servis Tipi Seçiniz"
                    multiSelect={true}
                    onChange={(values) => handleValueChange(values, row.id)}
                  />
                )}
                {selectedFilters[row.id] && selectedFilters[row.id] === "bakimIds" && (
                  <ServisKoduTablo
                    fieldName={`bakim-${row.id}`}
                    multiSelect={true}
                    onSubmit={(selectedData) => {
                      const ids = (selectedData || []).map((item) => item.key);
                      handleValueChange(ids, row.id);
                    }}
                    workshopSelectedId={selectedValues[row.id] || []}
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

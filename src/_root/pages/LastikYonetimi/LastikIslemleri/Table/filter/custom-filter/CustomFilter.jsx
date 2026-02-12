import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { CodeControlService, CustomCodeControlService } from "../../../../../../../api/service";
import { t } from "i18next";
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
  { value: "AracTipIds", label: t("aracTip") },
  { value: "GrupIds", label: t("grup") },
  { value: "PlakaIds", label: t("plaka") },
];

const fetchFilterData = async (filterKey) => {
  switch (filterKey) {
    case "AracTipIds":
      return CodeControlService(100).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "GrupIds":
      return CodeControlService(101).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "PlakaIds":
      return CustomCodeControlService("Vehicle/GetVehiclePlates").then((res) =>
        res.data.map((item) => ({ value: item.aracId, label: item.plaka }))
      );
    default:
      return [];
  }
};

export default function CustomFilter({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [filterOptionsData, setFilterOptionsData] = useState({});

  const isFilterApplied = newObjectsAdded || filtersExist;

  const handleFilterTypeChange = (value, rowId) => {
    setSelectedFilters((prev) => ({ ...prev, [rowId]: value }));
    setSelectedValues((prev) => ({ ...prev, [rowId]: [] }));
    setFilterOptionsData((prev) => ({ ...prev, [rowId]: [] }));

    if (value) {
      fetchFilterData(value).then((options) => {
        setFilterOptionsData((prev) => ({ ...prev, [rowId]: options }));
      });
    }
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
    const json = {};
    FILTER_OPTIONS.forEach((opt) => {
      json[opt.value] = [];
    });

    rows.forEach((row) => {
      const filterKey = selectedFilters[row.id];
      const values = selectedValues[row.id];
      if (filterKey && values && values.length > 0) {
        json[filterKey] = values;
      }
    });

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
        <span style={{ marginRight: "5px" }}>{t("filtreler")}</span>
        {isFilterApplied && <span className="blue-dot"></span>}
      </Button>
      <Drawer
        extra={
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              {t("uygula")}
            </Button>
          </Space>
        }
        title={
          <span>
            <FilterOutlined style={{ marginRight: "8px" }} /> {t("filtreler")}
          </span>
        }
        placement="right"
        onClose={onClose}
        open={open}
      >
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
                <Text>{t("yeniFiltre")}</Text>
                <CloseButton onClick={() => handleCancelClick(row.id)}>
                  <StyledCloseOutlined />
                </CloseButton>
              </Col>
              <Col span={24} style={{ marginBottom: "10px" }}>
                <Select
                  style={{ width: "100%", marginBottom: "10px" }}
                  showSearch
                  placeholder={t("secimYap")}
                  optionFilterProp="label"
                  onChange={(value) => handleFilterTypeChange(value, row.id)}
                  value={selectedFilters[row.id] || undefined}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={getAvailableOptions(row.id)}
                />
                {selectedFilters[row.id] && (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    showSearch
                    allowClear
                    placeholder={t("secimYap")}
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
          {t("filtreEkle")}
        </Button>
      </Drawer>
    </>
  );
}

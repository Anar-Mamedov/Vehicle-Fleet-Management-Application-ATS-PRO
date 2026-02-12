import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { CodeControlService, CustomCodeControlService, MaterialListSelectService } from "../../../../../../api/service";
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
  { value: "GrupIds", label: "Araç Grubu" },
  { value: "RenkIds", label: "Renk" },
  { value: "YakitTipIds", label: "Yakıt Tipi" },
  { value: "DepartmanIds", label: "Departman" },
  { value: "AracCinsiIds", label: "Araç Cinsi" },
  { value: "VitesTipiIds", label: "Vites Tipi" },
  { value: "AracMulkiyetIds", label: "Araç Mülkiyet" },
  { value: "KullanimAmacIds", label: "Kullanım Amacı" },
  { value: "YedekAnahtarIds", label: "Yedek Anahtar" },
  { value: "AracDurumIds", label: "Araç Durum" },
  { value: "SurucuIds", label: "Sürücü" },
];

const fetchFilterData = async (filterKey) => {
  switch (filterKey) {
    case "GrupIds":
      return CodeControlService(101).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "RenkIds":
      return CodeControlService(111).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "DepartmanIds":
      return CodeControlService(200).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "AracCinsiIds":
      return CodeControlService(107).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "VitesTipiIds":
      return CodeControlService(902).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "AracMulkiyetIds":
      return CodeControlService(891).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "KullanimAmacIds":
      return CodeControlService(887).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "YedekAnahtarIds":
      return CodeControlService(888).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "AracDurumIds":
      return CodeControlService(122).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    case "YakitTipIds":
      return MaterialListSelectService("YAKIT").then((res) =>
        res.data.map((item) => ({ value: item.malzemeId, label: item.tanim }))
      );
    case "SurucuIds":
      return CustomCodeControlService("Driver/GetDriverListForSelectInput").then((res) =>
        res.data.map((item) => ({ value: item.surucuId, label: item.isim }))
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
          backgroundColor: newObjectsAdded || filtersExist ? "#EBF6FE" : "#ffffffff",
        }}
        className={newObjectsAdded ? "#ff0000-dot-button" : ""}
      >
        <FilterOutlined />
        {newObjectsAdded && <span className="blue-dot"></span>}
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
                {selectedFilters[row.id] && (
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

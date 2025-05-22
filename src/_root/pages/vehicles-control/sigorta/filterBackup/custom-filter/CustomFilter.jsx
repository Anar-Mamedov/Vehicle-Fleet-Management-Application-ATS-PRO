import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input } from "antd";
import Status from "./components/Status";
import React, { useState } from "react";
import styled from "styled-components";
import "./style.css";

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

export default function CustomFilter({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [inputValues, setInputValues] = useState({}); // Input değerlerini saklamak için bir state kullanıyoruz
  const [filters, setFilters] = useState({});
  const [filterValues, setFilterValues] = useState({});

  // Create a state variable to store selected values for each row
  const [selectedValues, setSelectedValues] = useState({});

  const handleSelectChange = (value, rowId) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [rowId]: value,
    }));

    // Clear any existing input value when changing selection
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: "",
    }));
  };

  const handleInputChange = (e, rowId) => {
    const { value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: value,
    }));
  };

  // Add this function to determine which input to show
  const renderInput = (rowId) => {
    const selectedValue = selectedValues[rowId];

    if (selectedValue === "status") {
      return (
        <Status
          value={inputValues[`input-${rowId}`]}
          onChange={(value) => {
            setInputValues((prevInputValues) => ({
              ...prevInputValues,
              [`input-${rowId}`]: value,
            }));
          }}
        />
      );
    }

    return <Input placeholder="Arama Yap" name={`input-${rowId}`} value={inputValues[`input-${rowId}`] || ""} onChange={(e) => handleInputChange(e, rowId)} />;
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Combine selected values and input values for each row
    const filters = {};

    rows.forEach((row) => {
      const selectedValue = selectedValues[row.id];
      const inputValue = inputValues[`input-${row.id}`];

      // Only add to filters if both values exist
      if (selectedValue && inputValue) {
        filters[selectedValue] = inputValue;
      }
    });

    // Send the active filters to parent
    onSubmit(filters);

    setOpen(false);
  };

  const handleCancelClick = (rowId) => {
    // Remove the row
    setRows((prevRows) => {
      const newRows = prevRows.filter((row) => row.id !== rowId);
      // If no rows left, reset states
      if (newRows.length === 0) {
        setNewObjectsAdded(false);
        setFiltersExist(false);
      }
      return newRows;
    });

    // Get the selected value before removing it
    const selectedValue = selectedValues[rowId];

    // Clear the removed row's values
    setSelectedValues((prev) => {
      const newValues = { ...prev };
      delete newValues[rowId];
      return newValues;
    });

    setInputValues((prev) => {
      const newValues = { ...prev };
      delete newValues[`input-${rowId}`];
      return newValues;
    });

    // Create a new filters object without the cancelled filter
    const updatedFilters = {};
    rows.forEach((row) => {
      if (row.id !== rowId) {
        const value = selectedValues[row.id];
        const inputValue = inputValues[`input-${row.id}`];
        if (value && inputValue) {
          updatedFilters[value] = inputValue;
        }
      }
    });

    // Send the updated filters to parent
    onSubmit(updatedFilters);
  };

  const handleAddFilterClick = () => {
    const newRow = { id: Date.now() };
    setRows((prevRows) => [...prevRows, newRow]);

    setNewObjectsAdded(true);
    setFiltersExist(true);
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [newRow.id]: "", // Set an empty input value for the new row
    }));
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
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
        <span style={{ marginRight: "5px" }}>Filtreler</span>
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
                  placeholder={`Seçim Yap`}
                  optionFilterProp="children"
                  onChange={(value) => handleSelectChange(value, row.id)}
                  value={selectedValues[row.id] || undefined}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: "plaka",
                      label: "Plaka",
                    },
                    {
                      value: "sigortaTuru",
                      label: "Sigorta Türü",
                    },
                    {
                      value: "lokasyon",
                      label: "Lokasyon",
                    },
                    /*  {
                      value: "status",
                      label: "Durum",
                    }, */
                  ]}
                />
                {renderInput(row.id)}
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

import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import "./style.css";
import { useFormContext } from "react-hook-form";
import StatusSelect from "./components/StatusSelect";
import KodIDSelectbox from "../../../../../../_root/components/KodIDSelectbox";
import FirmaSelectBox from "../../../../../../_root/components/FirmaSelectBox";
import DepoSelectBox from "../../../../../../_root/components/DepoSelectBox";

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

export default function CustomFilter({ onSubmit }) {
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
  const [filters, setFilters] = useState({});
  const [filterValues, setFilterValues] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  // Define all available options
  const allFilterOptions = [
    {
      value: "malzemeTipKodId",
      label: "Malzeme Tipi",
    },
    {
      value: "firmaId",
      label: "Firma",
    },
    {
      value: "depoId",
      label: "Depo",
    },
  ];

  // Function to get available options (excluding already selected ones)
  const getAvailableOptions = () => {
    const selectedFilters = Object.values(selectedValues);
    return allFilterOptions.filter((option) => !selectedFilters.includes(option.value));
  };

  // Filtreler eklenip kaldırıldığında düğmenin stilini değiştirmek için bir durum
  const isFilterApplied = newObjectsAdded || filtersExist;

  const handleSelectChange = (value, rowId) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [rowId]: value.value, // Store only the value in state
    }));
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Combine selected values, input values for each row
    const filterData = rows.reduce((acc, row) => {
      const selectedValue = selectedValues[row.id] || "";
      const inputValue = inputValues[`input-${row.id}`] || "";
      const inputIdValue = inputValues[`input-${row.id}ID`] || ""; // Get the ID value from KodIDSelectbox

      if (selectedValue && (inputValue || inputIdValue)) {
        if (selectedValue === "durum") {
          acc[selectedValue] = Number(inputValue); // Convert status to number
        } else if (selectedValue === "malzemeTipKodId") {
          acc[selectedValue] = Number(inputIdValue); // Use the ID value for malzemeTipKodId
        } else if (selectedValue === "firmaId" || selectedValue === "depoId") {
          acc[selectedValue] = Number(inputValue); // Use the numeric value for firmaId and depoId
        } else {
          acc[selectedValue] = inputValue;
        }
      }
      return acc;
    }, {});

    console.log("Filter Data:", filterData);
    onSubmit(filterData);
    setOpen(false);
  };

  const handleCancelClick = (rowId) => {
    setFilters({});
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

    const filtersRemaining = rows.length > 1;
    setFiltersExist(filtersRemaining);
    if (!filtersRemaining) {
      setNewObjectsAdded(false);
    }
    onSubmit("");
  };

  const handleInputChange = (e, rowId) => {
    // If e is an event (from regular Input), use e.target.value
    // If e is a direct value (from KodIDSelectbox), use e directly
    const value = e?.target?.value ?? e;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: value,
    }));
  };

  const handleStatusChange = (value, rowId) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: value,
    }));

    // Update filters with the status value
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
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

  const handleKodIDSelectChange = (value, id, rowId) => {
    // Update both the display value and the ID value
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: value,
      [`input-${rowId}ID`]: id,
    }));
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
                  value={
                    selectedValues[row.id]
                      ? {
                          value: selectedValues[row.id],
                          label: allFilterOptions.find((opt) => opt.value === selectedValues[row.id])?.label,
                        }
                      : undefined
                  }
                  labelInValue
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={getAvailableOptions()}
                />
                {selectedValues[row.id] === "durum" && <StatusSelect value={inputValues[`input-${row.id}`]} onChange={(value) => handleStatusChange(value, row.id)} />}
                {selectedValues[row.id] === "malzemeTipKodId" && (
                  <KodIDSelectbox name1={`input-${row.id}`} kodID={301} isRequired={false} onChange={(value, id) => handleKodIDSelectChange(value, id, row.id)} />
                )}
                {selectedValues[row.id] === "firmaId" && (
                  <FirmaSelectBox name1={`input-${row.id}`} isRequired={false} onChange={(label, value) => handleKodIDSelectChange(label, value, row.id)} />
                )}
                {selectedValues[row.id] === "depoId" && (
                  <DepoSelectBox name1={`input-${row.id}`} isRequired={false} onChange={(value, label) => handleKodIDSelectChange(value, label, row.id)} />
                )}
                {selectedValues[row.id] !== "durum" &&
                  selectedValues[row.id] !== "malzemeTipKodId" &&
                  selectedValues[row.id] !== "firmaId" &&
                  selectedValues[row.id] !== "depoId" && (
                    <Input placeholder="Arama Yap" name={`input-${row.id}`} value={inputValues[`input-${row.id}`] || ""} onChange={(e) => handleInputChange(e, row.id)} />
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

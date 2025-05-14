import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input } from "antd";
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
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Combine selected values and input values for each row
    const rowData = rows.map((row) => ({
      selectedValue: selectedValues[row.id] || "",
      inputValue: inputValues[`input-${row.id}`] || "",
    }));

    // Filter out rows where both selectedValue and inputValue are empty
    const filteredData = rowData.filter(({ selectedValue, inputValue }) => {
      return selectedValue !== "" || inputValue !== "";
    });

    if (filteredData.length > 0) {
      // Convert the filteredData array to the desired JSON format
      const json = filteredData.reduce((acc, { selectedValue, inputValue }) => {
        return {
          ...acc,
          [selectedValue]: inputValue,
        };
      }, {});

      console.log(json);
      // You can now submit or process the json object as needed.
      onSubmit(json);
    } else {
      // Handle the case where there are no non-empty filters (optional)
      console.log("No filters to submit.");
    }
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
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: e.target.value,
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
                      value: "grup",
                      label: "Araç Grubu",
                    },
                    /* {
                      value: "aracTip",
                      label: "Araç Tipi",
                    },
                     {
                      value: "marka",
                      label: "Marka",
                    },
                    {
                      value: "model",
                      label: "Model",
                    }, 
                    {
                      value: "plaka",
                      label: "Plaka",
                    },
                     */
                    {
                      value: "renk",
                      label: "Renk",
                    },
                    {
                      value: "yakitTip",
                      label: "Yakıt Tipi",
                    },
                    {
                      value: "yil",
                      label: "Üretim Yılı",
                    },
                  ]}
                />
                <Input
                  placeholder="Arama Yap"
                  name={`input-${row.id}`} // Use a unique name for each input based on the row ID
                  value={inputValues[`input-${row.id}`] || ""} // Use the corresponding input value
                  onChange={(e) => handleInputChange(e, row.id)} // Pass the rowId to handleInputChange
                />
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

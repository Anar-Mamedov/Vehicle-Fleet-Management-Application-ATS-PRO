import { FilterOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Select, Input, Row, Col, Space, Typography, DatePicker, message } from 'antd';
import React, { useState } from "react";
import styled from "styled-components";
import "./style.css";

const { Text, Link } = Typography;
const { RangePicker } = DatePicker;

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
  const [inputValues, setInputValues] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [dateRangeValues, setDateRangeValues] = useState({});

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

  const handleSubmit = async () => {
    const filterData = rows.map((row) => ({
      selectedValue: selectedValues[row.id] || "",
      inputValue: inputValues[`input-${row.id}`] || "",
      dateRange: dateRangeValues[row.id] || {}
    }));

    const filteredData = filterData.filter(({ selectedValue, inputValue, dateRange }) => {
      return selectedValue !== "" || inputValue !== "" || (dateRange.startDate && dateRange.endDate);
    });

    if (filteredData.length > 0) {
      const json = filteredData.reduce((acc, { selectedValue, inputValue, dateRange }) => {
        return {
          ...acc,
          [selectedValue]: {
            inputValue,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        };
      }, {});

      // API'ye gönderilecek parametrelerin ayarlanması
      const diff = 0; // Buraya uygun diff parametresini almanız gerekebilir
      const targetPage = 1; // Sayfa numarası da parametre olarak gönderilebilir
      try {
        await fetchData(diff, targetPage, json);
      } catch (error) {
        message.error("Veri getirilirken bir hata oluştu.");
      }

      onSubmit(json);  // OnSubmit ile filtreler üst bileşene gönderilebilir
    } else {
      message.warning("Hiçbir filtre bulunamadı.");
    }

    setOpen(false);
  };

  const handleCancelClick = (rowId) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
    const filtersRemaining = rows.length > 1;
    setFiltersExist(filtersRemaining);
    if (!filtersRemaining) {
      setNewObjectsAdded(false);
    }
  };

  const handleInputChange = (e, rowId) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: e.target.value,
    }));
  };

  const handleDateRangeChange = (dates, dateStrings, rowId) => {
    setDateRangeValues((prevDateRangeValues) => ({
      ...prevDateRangeValues,
      [rowId]: { startDate: dateStrings[0], endDate: dateStrings[1] },
    }));
  };

  const handleAddFilterClick = () => {
    const newRow = { id: Date.now() };
    setRows((prevRows) => [...prevRows, newRow]);
    setNewObjectsAdded(true);
    setFiltersExist(true);
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
                  options={[
                    { value: "malzemeKod", label: "Malzeme Kodu" },
                    { value: "dateRange", label: "Tarih Aralığı" },
                  ]}
                />

                {selectedValues[row.id] === "malzemeKod" && (
                  <Input
                    placeholder="Arama Yap"
                    name={`input-${row.id}`}
                    value={inputValues[`input-${row.id}`] || ""}
                    onChange={(e) => handleInputChange(e, row.id)}
                  />
                )}

                {selectedValues[row.id] === "dateRange" && (
                  <RangePicker
                    style={{ width: "100%", marginBottom: "10px" }}
                    format="YYYY-MM-DD"
                    onChange={(dates, dateStrings) => handleDateRangeChange(dates, dateStrings, row.id)}
                    placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
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
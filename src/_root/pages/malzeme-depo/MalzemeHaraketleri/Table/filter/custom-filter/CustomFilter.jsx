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
import StatusSelect from "./components/StatusSelect";
import KodIDSelectbox from "../../../../../../../_root/components/KodIDSelectbox";
import LokasyonTablo from "../../../../../../../_root/components/form/LokasyonTable";
import ModalInput from "../../../../../../../_root/components/form/inputs/ModalInput";
import FirmaSelectBox from "../../../../../../../_root/components/FirmaSelectBox";
import DepoSelectBox from "../../../../../../../_root/components/DepoSelectBox";
import PlakaSelectbox from "../../../../../../../_root/components/PlakaSelectbox";

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
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startDateSelected = watch("startDate");
  const endDateSelected = watch("endDate");

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

    // Always submit after initial mount when dates change (including null)
    handleSubmit();
  }, [startDate, endDate]);

  // Create a state variable to store selected values for each row
  const [selectedValues, setSelectedValues] = useState({});

  // Tarih seçimi yapıldığında veya filtreler eklenip kaldırıldığında düğmenin stilini değiştirmek için bir durum
  const isFilterApplied = newObjectsAdded || filtersExist || startDate || endDate;

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
    // Combine selected values, input values for each row, and date range
    const filterData = rows.reduce((acc, row) => {
      const selectedValue = selectedValues[row.id] || "";
      const inputValue = inputValues[`input-${row.id}`] || "";
      const inputIDValue = inputValues[`input-${row.id}ID`] || "";

      if (selectedValue && inputValue) {
        if (selectedValue === "durum") {
          acc[selectedValue] = Number(inputValue); // Convert status to number
        } else if (selectedValue === "islemTipKodId" || selectedValue === "malzemeTip") {
          // Only for islemTipKodId use the ID value
          acc[selectedValue] = inputIDValue;
        } else if (selectedValue === "firmaId" || selectedValue === "girisDepoId" || selectedValue === "aracId") {
          // Keep original behavior for these fields
          acc[selectedValue] = inputValue;
        } else if (selectedValue === "lokasyonID") {
          acc[selectedValue] = inputIDValue;
        } else {
          acc[selectedValue] = inputValue;
        }
      }
      return acc;
    }, {});

    // Add date range to the filterData object if dates are selected
    if (startDate) {
      filterData.baslangicTarih = startDate.format("YYYY-MM-DD");
    }
    if (endDate) {
      filterData.bitisTarih = endDate.format("YYYY-MM-DD");
    }

    // Add lokasyon filter if it exists but wasn't captured in the rows processing
    const lokasyonID = watch("lokasyonID");
    if (lokasyonID && rows.some((row) => selectedValues[row.id] === "lokasyonID")) {
      filterData.lokasyonID = lokasyonID;
    }

    console.log(filterData);
    // You can now submit or process the filterData object as needed.
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
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: e.target.value,
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

  const handleKodIDSelectChange = (text, id, rowId) => {
    // Update both the display value and the ID value
    // text = display text (label), id = the actual numeric ID value
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: text,
      [`input-${rowId}ID`]: id,
    }));
  };

  const handleYeniLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };
  const handleYeniLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonID", null);
  };

  // Add a function to handle location selection
  const handleLokasyonSelection = (selectedData) => {
    setValue("lokasyon", selectedData.location);
    setValue("lokasyonID", selectedData.key);

    // Also update inputValues for the selected row that has lokasyonID
    rows.forEach((row) => {
      if (selectedValues[row.id] === "lokasyonID") {
        setInputValues((prev) => ({
          ...prev,
          [`input-${row.id}`]: selectedData.location,
          [`input-${row.id}ID`]: selectedData.key,
        }));
      }
    });
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
                  placeholder={`Seçim Yap`}
                  optionFilterProp="children"
                  onChange={(value) => handleSelectChange(value, row.id)}
                  value={selectedValues[row.id] || undefined}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={[
                    {
                      value: "malzemeKodu",
                      label: "Malzeme Kodu",
                    },
                    {
                      value: "malzemeTip",
                      label: "Malzeme Tipi",
                    },
                    {
                      value: "lokasyonID",
                      label: "Lokasyon",
                    },
                    /* {
                      value: "firmaId",
                      label: "Firma",
                    }, */
                    {
                      value: "islemTipKodId",
                      label: "İşlem Tipi",
                    },
                    {
                      value: "girisDepoId",
                      label: "Depo",
                    },
                    {
                      value: "aracId",
                      label: "Arac",
                    },
                  ]}
                />
                <Input
                  placeholder="Arama Yap"
                  name={`input-${row.id}`}
                  value={inputValues[`input-${row.id}`] || ""}
                  onChange={(e) => handleInputChange(e, row.id)}
                  style={{
                    display:
                      selectedValues[row.id] === "durum" ||
                      selectedValues[row.id] === "islemTipKodId" ||
                      selectedValues[row.id] === "malzemeTip" ||
                      selectedValues[row.id] === "girisDepoId" ||
                      selectedValues[row.id] === "aracId" ||
                      selectedValues[row.id] === "firmaId" ||
                      selectedValues[row.id] === "lokasyonID"
                        ? "none"
                        : "block",
                  }}
                />
                {selectedValues[row.id] === "durum" && <StatusSelect value={inputValues[`input-${row.id}`]} onChange={(value) => handleStatusChange(value, row.id)} />}
                {selectedValues[row.id] === "islemTipKodId" && (
                  <KodIDSelectbox name1={`input-${row.id}`} kodID={302} isRequired={false} onChange={(value, id) => handleKodIDSelectChange(value, id, row.id)} />
                )}
                {selectedValues[row.id] === "malzemeTip" && (
                  <KodIDSelectbox name1={`input-${row.id}`} kodID={301} isRequired={false} onChange={(value, id) => handleKodIDSelectChange(value, id, row.id)} />
                )}
                {selectedValues[row.id] === "firmaId" && (
                  <FirmaSelectBox name1={`input-${row.id}`} isRequired={false} onChange={(label, value) => handleKodIDSelectChange(label, value, row.id)} />
                )}
                {selectedValues[row.id] === "girisDepoId" && (
                  <DepoSelectBox name1={`input-${row.id}`} kodID={"MALZEME"} isRequired={false} onChange={(value, label) => handleKodIDSelectChange(value, label, row.id)} />
                )}
                {selectedValues[row.id] === "aracId" && (
                  <PlakaSelectbox name1={`input-${row.id}`} isRequired={false} onChange={(label, value) => handleKodIDSelectChange(label, value, row.id)} />
                )}
                {selectedValues[row.id] === "lokasyonID" && (
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      alignItems: "flex-start",
                      width: "100%",
                      // maxWidth: "220px", // Removed maxWidth to allow full width
                    }}
                  >
                    <ModalInput name="lokasyon" readonly={true} required={false} onPlusClick={handleYeniLokasyonPlusClick} onMinusClick={handleYeniLokasyonMinusClick} />
                    <LokasyonTablo
                      onSubmit={(selectedData) => {
                        handleLokasyonSelection(selectedData);
                      }}
                      isModalVisible={isLokasyonModalOpen}
                      setIsModalVisible={setIsLokasyonModalOpen}
                    />
                  </div>
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

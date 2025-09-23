import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input, DatePicker } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "./style.css";
import { useFormContext } from "react-hook-form";
import StatusSelect from "./components/StatusSelect";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PropTypes from "prop-types";
import DepoSelectBox from "../../../../../../_root/components/DepoSelectBox";
import PlakaSelectbox from "../../../../../../_root/components/PlakaSelectbox";
import KodIDSelectbox from "../../../../../../_root/components/KodIDSelectbox";

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
  const { watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [isInitialMount, setIsInitialMount] = useState(true);

  // Dayjs setup
  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);
  dayjs.locale("tr");

  // Date range state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const startDateSelected = watch("startDate");
  const endDateSelected = watch("endDate");

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    if (startDateSelected == null) {
      setStartDate(null);
    } else {
      setStartDate(dayjs(startDateSelected));
    }
    if (endDateSelected == null) {
      setEndDate(null);
    } else {
      setEndDate(dayjs(endDateSelected));
    }
  }, [startDateSelected, endDateSelected, isInitialMount]);

  // Create a state variable to store selected values for each row
  const [selectedValues, setSelectedValues] = useState({});

  // Filtreler eklenip kaldırıldığında ve/veya tarih seçildiğinde düğmenin stilini değiştirmek için bir durum
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

  const handleSubmit = useCallback(() => {
    // Combine selected values, input values for each row and date range
    const filterData = rows.reduce((acc, row) => {
      const selectedValue = selectedValues[row.id] || "";
      const inputValue = inputValues[`input-${row.id}`] || "";
      const inputIDValue = inputValues[`input-${row.id}ID`] || "";
      if (selectedValue && inputValue) {
        if (selectedValue === "durum") {
          acc[selectedValue] = Number(inputValue); // Convert status to number
        } else if (selectedValue === "islemTipiKodId" || selectedValue === "malzemeTipKodId") {
          // Only for islemTipiKodId use the ID value
          acc[selectedValue] = inputIDValue;
        } else if (selectedValue === "firmaId" || selectedValue === "depoId" || selectedValue === "aracId") {
          // Keep original behavior for these fields
          acc[selectedValue] = inputValue;
        } else if (selectedValue === "lokasyonId") {
          acc[selectedValue] = inputIDValue;
        } else {
          acc[selectedValue] = inputValue;
        }
      }
      return acc;
    }, {});

    if (startDate) {
      filterData.baslangicTarih = startDate.format("YYYY-MM-DD");
    }
    if (endDate) {
      filterData.bitisTarih = endDate.format("YYYY-MM-DD");
    }

    onSubmit(filterData);
    setOpen(false);
  }, [rows, selectedValues, inputValues, startDate, endDate, onSubmit]);

  // Tarih değişiminde otomatik uygulamayı kaldırdık; sadece Uygula butonu ile tetiklenecek

  const handleCancelClick = (rowId) => {
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
        {/*  <div
          style={{
            marginBottom: "20px",
            border: "1px solid #80808048",
            padding: "15px 10px",
            borderRadius: "8px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>{t("tarihAraligi")}</Text>
          </div>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <DatePicker style={{ width: "100%" }} placeholder={t("baslangicTarihi")} value={startDate} onChange={setStartDate} locale={dayjs.locale("tr")} />
            <Text style={{ fontSize: "14px" }}>-</Text>
            <DatePicker style={{ width: "100%" }} placeholder={t("bitisTarihi")} value={endDate} onChange={setEndDate} locale={dayjs.locale("tr")} />
          </div>
        </div> */}
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
                  placeholder={`${t("secimYap")}`}
                  optionFilterProp="children"
                  onChange={(value) => handleSelectChange(value, row.id)}
                  value={selectedValues[row.id] || undefined}
                  onSearch={onSearch}
                  filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                  options={[
                    /* {
                      value: "malzemeKodu",
                      label: "Malzeme Kodu",
                    }, */
                    {
                      value: "depoId",
                      label: "Depo",
                    },
                    /* {
                      value: "aracId",
                      label: "Arac",
                    }, */
                  ]}
                />
                <Input
                  placeholder={t("aramaYap")}
                  name={`input-${row.id}`}
                  value={inputValues[`input-${row.id}`] || ""}
                  onChange={(e) => handleInputChange(e, row.id)}
                  style={{
                    display: selectedValues[row.id] === "durum" || selectedValues[row.id] === "depoId" || selectedValues[row.id] === "aracId" ? "none" : "block",
                  }}
                />
                {selectedValues[row.id] === "durum" && <StatusSelect value={inputValues[`input-${row.id}`]} onChange={(value) => handleStatusChange(value, row.id)} />}
                {selectedValues[row.id] === "depoId" && (
                  <DepoSelectBox name1={`input-${row.id}`} kodID={"MALZEME"} isRequired={false} onChange={(value, label) => handleKodIDSelectChange(value, label, row.id)} />
                )}
                {selectedValues[row.id] === "aracId" && (
                  <PlakaSelectbox name1={`input-${row.id}`} isRequired={false} onChange={(label, value) => handleKodIDSelectChange(label, value, row.id)} />
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

CustomFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

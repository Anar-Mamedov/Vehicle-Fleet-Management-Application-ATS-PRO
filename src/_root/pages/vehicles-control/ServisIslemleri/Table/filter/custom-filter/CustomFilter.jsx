import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space, Input, DatePicker } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import "./style.css";
import { useFormContext } from "react-hook-form";
import KodIDSelectbox from "../../../../../../components/KodIDSelectbox";
import FirmaSelectBox from "../../../../../../components/FirmaSelectBox";
import MultiSelectInput from "../../../../../../components/form/selects/MultiSelectInput";
import { getDurumOptions } from "../../../../../KademeYonetimi/KademeIsEmirleri/constants";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import weekOfYear from "dayjs/plugin/weekOfYear";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PropTypes from "prop-types";

const { Text } = Typography;

// Mülkiyet kod listesinin backend'deki kod numarası
const MULKIYET_KOD_ID = 891;
const MULKIYET_FILTER_KEY = "mulkiyetKodIds";
// Servis tipi kod listesinin backend'deki kod numarası (Servis Tanımları ekranıyla aynı liste)
const SERVIS_TIPI_KOD_ID = 103;
const SERVIS_TIPI_FILTER_KEY = "servisTipIds";
// Araç tipi kod listesinin backend'deki kod numarası (Araçlar listesiyle aynı liste)
const ARAC_TIPI_KOD_ID = 100;
const ARAC_TIPI_FILTER_KEY = "aracTipIds";
// Firma listesi Company/GetCompanyListForSelectInput servisinden type=1 ile çekilir
const FIRMA_TYPE = 1;
const FIRMA_FILTER_KEY = "firmaIds";
// Durum seçenekleri Kademe İş Emirleri ekranıyla aynıdır
const DURUM_FILTER_KEY = "durumIds";

// Listeden seçim yapılan filtrelerde serbest metin kutusu gösterilmez
const SELECT_FILTER_KEYS = [DURUM_FILTER_KEY, MULKIYET_FILTER_KEY, SERVIS_TIPI_FILTER_KEY, ARAC_TIPI_FILTER_KEY, FIRMA_FILTER_KEY];
const isSelectFilter = (filterKey) => SELECT_FILTER_KEYS.includes(filterKey);

// Satırdaki seçim kutuları form alanlarında tutulur (KodIDSelectbox ayrıca `${ad}ID` alanı yazar).
// Filtre tipi değişince veya satır silinince bu alanlar temizlenir; yoksa aynı tipe geri dönüldüğünde eski id'ler görünür.
const ROW_SELECT_FIELD_PREFIXES = ["durumFiltre", "mulkiyetFiltre", "servisTipiFiltre", "aracTipiFiltre", "firmaFiltre"];
const getRowSelectFieldNames = (rowId) => ROW_SELECT_FIELD_PREFIXES.flatMap((prefix) => [`${prefix}${rowId}`, `${prefix}${rowId}ID`]);

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
  const { watch, unregister } = useFormContext();
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

    // Filtre tipi değişince önceki değer taşınmasın (metin filtresine id dizisi gitmesin)
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [`input-${rowId}`]: "",
    }));
    unregister(getRowSelectFieldNames(rowId));
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
      const inputValue = inputValues[`input-${row.id}`];

      if (!selectedValue) {
        return acc;
      }

      // Çoklu seçim filtrelerinin değeri id dizisi olarak gider; boş dizi filtre sayılmaz
      if (Array.isArray(inputValue)) {
        if (inputValue.length > 0) {
          acc[selectedValue] = inputValue;
        }
        return acc;
      }

      if (inputValue) {
        acc[selectedValue] = inputValue;
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
    unregister(getRowSelectFieldNames(rowId));

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
        <div
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
                    {
                      value: SERVIS_TIPI_FILTER_KEY,
                      label: t("servisTipi"),
                    },
                    {
                      value: FIRMA_FILTER_KEY,
                      label: t("firma"),
                    },
                    {
                      value: ARAC_TIPI_FILTER_KEY,
                      label: t("aracTip"),
                    },
                    {
                      value: DURUM_FILTER_KEY,
                      label: t("durum"),
                    },
                    {
                      value: MULKIYET_FILTER_KEY,
                      label: t("mulkiyet"),
                    },
                  ]}
                />
                <Input
                  placeholder={t("aramaYap")}
                  name={`input-${row.id}`}
                  value={isSelectFilter(selectedValues[row.id]) ? "" : inputValues[`input-${row.id}`] || ""}
                  onChange={(e) => handleInputChange(e, row.id)}
                  style={{ display: isSelectFilter(selectedValues[row.id]) ? "none" : "block" }}
                />
                {selectedValues[row.id] === DURUM_FILTER_KEY && (
                  <MultiSelectInput name={`durumFiltre${row.id}`} options={getDurumOptions()} onChange={(value) => handleStatusChange(value, row.id)} placeholder={t("durumSeciniz")} />
                )}
                {selectedValues[row.id] === MULKIYET_FILTER_KEY && (
                  <KodIDSelectbox
                    name1={`mulkiyetFiltre${row.id}`}
                    kodID={MULKIYET_KOD_ID}
                    addHide={true}
                    isRequired={false}
                    multiSelect={true}
                    onChange={(value) => handleStatusChange(value || [], row.id)}
                    placeholder={t("mulkiyet")}
                    inputWidth="100%"
                  />
                )}
                {selectedValues[row.id] === SERVIS_TIPI_FILTER_KEY && (
                  <KodIDSelectbox
                    name1={`servisTipiFiltre${row.id}`}
                    kodID={SERVIS_TIPI_KOD_ID}
                    addHide={true}
                    isRequired={false}
                    multiSelect={true}
                    onChange={(value) => handleStatusChange(value || [], row.id)}
                    placeholder={t("servisTipi")}
                    inputWidth="100%"
                  />
                )}
                {selectedValues[row.id] === FIRMA_FILTER_KEY && (
                  <FirmaSelectBox name1={`firmaFiltre${row.id}`} type={FIRMA_TYPE} isRequired={false} multiSelect={true} onChange={(value) => handleStatusChange(value || [], row.id)} />
                )}
                {selectedValues[row.id] === ARAC_TIPI_FILTER_KEY && (
                  <KodIDSelectbox
                    name1={`aracTipiFiltre${row.id}`}
                    kodID={ARAC_TIPI_KOD_ID}
                    addHide={true}
                    isRequired={false}
                    multiSelect={true}
                    onChange={(value) => handleStatusChange(value || [], row.id)}
                    placeholder={t("aracTip")}
                    inputWidth="100%"
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

CustomFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

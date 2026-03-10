import { CloseOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Typography, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CodeControlService, CustomCodeControlService } from "../../../../../../api/service";
import AxiosInstance from "../../../../../../api/http";
import LokasyonTable from "../../../../../components/LokasyonTable";
import "./style.css";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import DateInput from "../../../../../components/form/date/DateInput";
import { t } from "i18next";

dayjs.locale("tr");

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
  { value: "Cez_arac_id", label: "Plaka", type: "api" },
  { value: "surucuIds", label: "Sürücü", type: "api" },
  { value: "lokasyonIds", label: "Lokasyon", type: "lokasyon" },
  { value: "cezaTuruKodIds", label: "Ceza Türü", type: "api" },
  { value: "tebligBaslangicTarih", label: "Tebliğ Başlangıç Tarihi", type: "date" },
  { value: "tebligBitisTarih", label: "Tebliğ Bitiş Tarihi", type: "date" },
];

const fetchFilterData = async (filterKey) => {
  switch (filterKey) {
    case "Cez_arac_id":
      return AxiosInstance.get("Vehicle/GetVehiclePlates").then((res) =>
        res.data.map((item) => ({ value: item.aracId, label: item.plaka }))
      );
    case "surucuIds":
      return CustomCodeControlService("Driver/GetDriverListForSelectInput").then((res) =>
        res.data.map((item) => ({ value: item.surucuId, label: item.isim }))
      );
    case "cezaTuruKodIds":
      return CodeControlService(400).then((res) =>
        res.data.map((item) => ({ value: item.siraNo, label: item.codeText }))
      );
    default:
      return [];
  }
};

export default function CustomFilter({ onSubmit }) {
  const { watch, getValues } = useFormContext();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newObjectsAdded, setNewObjectsAdded] = useState(false);
  const [filtersExist, setFiltersExist] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [filterOptionsData, setFilterOptionsData] = useState({});
  const [isInitialMount, setIsInitialMount] = useState(true);

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
    handleSubmit();
  }, [startDate, endDate]);

  const isFilterApplied = newObjectsAdded || filtersExist || startDate || endDate;

  const handleFilterTypeChange = (value, rowId) => {
    setSelectedFilters((prev) => ({ ...prev, [rowId]: value }));
    const filterOption = FILTER_OPTIONS.find((opt) => opt.value === value);
    setSelectedValues((prev) => ({ ...prev, [rowId]: filterOption?.type === "date" ? null : [] }));
    setFilterOptionsData((prev) => ({ ...prev, [rowId]: [] }));

    if (value && filterOption?.type === "api") {
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
      if (!filterKey) return;

      const opt = FILTER_OPTIONS.find((o) => o.value === filterKey);
      if (opt?.type === "date") {
        const dateVal = getValues(`dateFilter_${row.id}`);
        if (dateVal) {
          json[filterKey] = dayjs(dateVal).format("YYYY-MM-DD");
        }
      } else {
        const values = selectedValues[row.id];
        if (values && values.length > 0) {
          json[filterKey] = values;
        }
      }
    });

    if (startDate) {
      json.baslangicTarih = startDate.format("YYYY-MM-DD");
    }
    if (endDate) {
      json.bitisTarih = endDate.format("YYYY-MM-DD");
    }

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
            <DateInput name="startDate" placeholder={t("baslangicTarihi")} style={{ width: "100%" }} />
            <Text style={{ fontSize: "14px" }}>-</Text>
            <DateInput name="endDate" placeholder={t("bitisTarihi")} style={{ width: "100%" }} />
          </div>
        </div>

        {rows.map((row) => {
          const filterKey = selectedFilters[row.id];
          const filterOption = FILTER_OPTIONS.find((opt) => opt.value === filterKey);
          const isDateFilter = filterOption?.type === "date";
          const isLokasyonFilter = filterOption?.type === "lokasyon";

          return (
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
                    placeholder={t("filtreSeciniz")}
                    optionFilterProp="label"
                    onChange={(value) => handleFilterTypeChange(value, row.id)}
                    value={selectedFilters[row.id] || undefined}
                    filterOption={(input, option) => (option?.label || "").toLowerCase().includes(input.toLowerCase())}
                    options={getAvailableOptions(row.id)}
                  />
                  {filterKey && isDateFilter && (
                    <DateInput name={`dateFilter_${row.id}`} placeholder={t("tarihSeciniz")} style={{ width: "100%" }} />
                  )}
                  {filterKey && isLokasyonFilter && (
                    <LokasyonTable
                      multiSelect={true}
                      onSubmit={(val) => {
                        const ids = [];
                        if (val) {
                          if (Array.isArray(val)) {
                            val.forEach((item) => {
                              if (item.locationId) ids.push(item.locationId);
                            });
                          } else if (val.locationId) {
                            ids.push(val.locationId);
                          }
                        }
                        handleValueChange(ids, row.id);
                      }}
                    />
                  )}
                  {filterKey && !isDateFilter && !isLokasyonFilter && (
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      showSearch
                      allowClear
                      placeholder={t("secimYapiniz")}
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
          );
        })}
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

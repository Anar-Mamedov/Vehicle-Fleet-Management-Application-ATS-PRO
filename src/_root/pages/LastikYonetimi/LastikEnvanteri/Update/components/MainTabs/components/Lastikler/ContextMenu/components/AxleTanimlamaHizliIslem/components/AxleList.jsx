import React, { useState, useEffect } from "react";
import { Select } from "antd";
import AxiosInstance from "../../../../../../../../../../../../../api/http";
import { t } from "i18next";

const AxleList = ({ onSelect, clearData }) => {
  const [axles, setAxles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAxle, setSelectedAxle] = useState(null);

  useEffect(() => {
    if (clearData) {
      setAxles([]);
      setSelectedAxle(null);
    }
  }, [clearData]);

  const fetchAxles = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("Axel/GetAxelItems");
      setAxles(response.data);
    } catch (error) {
      console.error("Error fetching axles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownVisibleChange = (open) => {
    if (open) {
      fetchAxles();
    }
  };

  const handleChange = (value) => {
    setSelectedAxle(value);
    onSelect(value);
  };

  return (
    <Select
      style={{ width: "100%" }}
      placeholder={t("aksSeciniz")}
      onChange={handleChange}
      loading={loading}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      options={axles.map((axle) => ({
        value: axle.siraNo,
        label: axle.aksTanimi,
      }))}
      value={selectedAxle}
    />
  );
};

export default AxleList;

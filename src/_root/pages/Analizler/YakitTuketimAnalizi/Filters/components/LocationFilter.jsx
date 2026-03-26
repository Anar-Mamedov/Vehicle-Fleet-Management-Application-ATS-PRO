import React, { useCallback, useRef, useState } from "react";
import { Button, Popover } from "antd";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import LokasyonTable from "../../../../../components/LokasyonTable";

const LocationFilter = () => {
  const [open, setOpen] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const selectedIdsRef = useRef([]);
  const { setValue } = useFormContext();

  const handleLokasyonChange = useCallback((selectedData) => {
    if (!Array.isArray(selectedData) || selectedData.length === 0) {
      selectedIdsRef.current = [];
      setSelectedCount(0);
      return;
    }

    const ids = selectedData
      .map((item) => (typeof item === "object" && item !== null ? item.locationId : item))
      .filter((id) => id !== undefined && id !== null);

    selectedIdsRef.current = ids;
    setSelectedCount(ids.length);
  }, []);

  const handleApply = () => {
    setValue("locationValues", selectedIdsRef.current.join(","));
    setOpen(false);
  };

  const handleCancel = () => {
    selectedIdsRef.current = [];
    setSelectedCount(0);
    setValue("locationValues", "");
    setOpen(false);
  };

  const content = (
    <div style={{ width: "300px" }}>
      <div
        style={{
          borderBottom: "1px solid #ccc",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={handleCancel}>{t("iptal")}</Button>
        <Button type="primary" onClick={handleApply}>
          {t("uygula")}
        </Button>
      </div>
      <div style={{ padding: "10px" }}>
        <LokasyonTable fieldName="lokasyonFilter" multiSelect={true} onSubmit={handleLokasyonChange} style={{ width: "100%" }} />
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={setOpen} placement="bottom">
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t("lokasyon")}
        <div
          style={{
            marginLeft: "5px",
            background: "#006cb8",
            borderRadius: "50%",
            width: "17px",
            height: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          {selectedCount}
        </div>
      </Button>
    </Popover>
  );
};

export default LocationFilter;

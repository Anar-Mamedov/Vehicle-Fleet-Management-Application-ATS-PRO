import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Popover, Tag } from "antd";
import PropTypes from "prop-types";
import LokasyonTable from "../../../../components/LokasyonTable";
import { cardBorder, flexDisplay, spaceBetween } from "../utils/constants";
import { normalizeArray } from "../utils/dataMappers";

export default function LocationFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selectedIdsRef = useRef(value);

  useEffect(() => {
    selectedIdsRef.current = value;
  }, [value]);

  const handleLokasyonChange = useCallback((selectedData) => {
    selectedIdsRef.current = normalizeArray(selectedData)
      .map((item) => (typeof item === "object" && item !== null ? item.locationId : item))
      .filter((id) => id !== undefined && id !== null);
  }, []);

  const content = (
    <div style={{ width: 320 }}>
      <div style={{ display: flexDisplay, justifyContent: spaceBetween, gap: 8, borderBottom: cardBorder, padding: 10 }}>
        <Button
          onClick={() => {
            selectedIdsRef.current = [];
            onChange([]);
            setOpen(false);
          }}
        >
          Temizle
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onChange(selectedIdsRef.current);
            setOpen(false);
          }}
        >
          Uygula
        </Button>
      </div>
      <div style={{ padding: 10 }}>
        <LokasyonTable fieldName="extremesLokasyonFilter" multiSelect={true} onSubmit={handleLokasyonChange} style={{ width: "100%" }} />
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={setOpen} placement="bottomLeft">
      <Button style={{ width: "100%", justifyContent: spaceBetween }}>
        <span>Lokasyon</span>
        <Tag color={value.length ? "blue" : "default"} style={{ marginInlineEnd: 0 }}>
          {value.length}
        </Tag>
      </Button>
    </Popover>
  );
}

LocationFilter.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

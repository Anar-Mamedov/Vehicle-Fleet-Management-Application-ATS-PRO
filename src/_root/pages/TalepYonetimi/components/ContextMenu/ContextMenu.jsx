import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import RequestToService from "../../../../../_root/components/RequestToService";
import OnayaGonder from "./components/OnayaGonder";

const { Text, Link } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData, approvalStatus }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  // Check if all selected rows have status "beklemede" or "inceleniyor"
  const allRowsAreBeklemede = selectedRows.every((row) => {
    const status = row.talepDurum?.trim().toLowerCase();
    return status === "beklemede" || status === "incelemede";
  });

  // Check if all selected rows have status "beklemede", "inceleniyor", or "onaylandi"
  const allRowsAreValidForService = selectedRows.every((row) => {
    const status = row.talepDurum?.trim().toLowerCase();
    return status === "beklemede" || status === "incelemede" || status === "onaylandi";
  });

  // Check if all selected rows are of type "Bakim" or "Lastik"
  const allRowsAreBakim = selectedRows.every((row) => {
    const type = row.talepTur?.trim().toLowerCase();
    return type === "bakım" || type === "bakim" || type === "lastik";
  });

  const content = (
    <div>
      {selectedRows.length >= 1 && <Sil selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />}
      {selectedRows.length >= 1 && allRowsAreBakim && allRowsAreValidForService && (
        <RequestToService selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      {selectedRows.length >= 1 && approvalStatus && allRowsAreBakim && allRowsAreBeklemede && (
        <OnayaGonder selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
    </div>
  );
  return (
    <Popover placement="bottom" content={content} trigger="click" open={visible} onOpenChange={handleVisibleChange}>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 5px",
          backgroundColor: "#2BC770",
          borderColor: "#2BC770",
          height: "32px",
        }}
      >
        {selectedRows.length >= 1 && <Text style={{ color: "white", marginLeft: "3px" }}>{selectedRows.length}</Text>}
        <MoreOutlined style={{ color: "white", fontSize: "20px", margin: "0" }} />
      </Button>
    </Popover>
  );
}

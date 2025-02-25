import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import AxleTanimlamaHizliIslem from "./components/AxleTanimlamaHizliIslem/AxleTanimlamaHizliIslem";

const { Text, Link } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const hasAssignedAxle = selectedRows.some((row) => row.aksId > 0);

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {selectedRows.length >= 1 && (
        <>
          <Sil selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
          {!hasAssignedAxle && <AxleTanimlamaHizliIslem selectedRows={selectedRows} refreshTableData={refreshTableData} />}
        </>
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

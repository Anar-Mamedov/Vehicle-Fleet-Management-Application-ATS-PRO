import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import AxleTanimlamaHizliIslem from "./components/AxleTanimlamaHizliIslem/AxleTanimlamaHizliIslem";

const { Text } = Typography;

export default function ContextMenu({ tire, refreshList }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const hasAssignedAxle = tire.aksId > 0;

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* <Sil selectedRows={[tire]} refreshTableData={refreshList} hidePopover={hidePopover} /> */}
      {!hasAssignedAxle && <AxleTanimlamaHizliIslem selectedRows={[tire]} refreshTableData={refreshList} hidePopover={hidePopover} />}
    </div>
  );

  return (
    <Popover placement="bottom" content={content} trigger="click" open={visible} onOpenChange={handleVisibleChange}>
      <Button
        type="text"
        style={{
          padding: "0px 5px",
          marginLeft: "8px",
          height: "24px",
          minWidth: "24px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <MoreOutlined style={{ fontSize: "16px" }} />
      </Button>
    </Popover>
  );
}

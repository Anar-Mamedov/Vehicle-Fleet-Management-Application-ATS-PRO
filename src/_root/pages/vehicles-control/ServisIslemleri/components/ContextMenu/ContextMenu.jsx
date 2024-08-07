import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";

const { Text, Link } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const content = <div>{selectedRows.length >= 1 && <Sil selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />}</div>;
  return (
    <Popover placement="bottom" content={content} trigger="click" open={visible} onOpenChange={handleVisibleChange}>
      <Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 10px",
          backgroundColor: "#17a2b8",
          borderColor: "#17a2b8",
          height: "32px",
        }}
      >
        <Text style={{ color: "white", marginRight: "5px" }}>İşlemler</Text>
        <DownOutlined style={{ color: "white", fontSize: "20px", margin: "0" }} />
        {selectedRows.length >= 1 && <Text style={{ color: "white", marginLeft: "3px" }}>{selectedRows.length}</Text>}
      </Button>
    </Popover>
  );
}
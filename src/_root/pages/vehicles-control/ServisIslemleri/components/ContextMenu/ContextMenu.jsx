import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import { t } from "i18next";
import ReportResultButton from "../../../../../components/ReportResultButton";

const { Text, Link } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const content = (
    <div>
      {selectedRows.length >= 1 && <Sil selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />}
      {selectedRows.length >= 1 && (
        <ReportResultButton reportName="Servis_Formu_" selectedRows={selectedRows} onAfterOpen={hidePopover} buttonProps={{ block: true }} buttonText={t("servisFormu")} />
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

import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { t } from "i18next";
import Sil from "./components/Sil";
import ReportResultButton from "../../../../../components/ReportResultButton";

const { Text } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const hasSelection = Array.isArray(selectedRows) && selectedRows.length >= 1;

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {hasSelection && (
        <>
          <Sil selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
          <ReportResultButton reportName="Ceza_Formu_" selectedRows={selectedRows} onAfterOpen={hidePopover} buttonProps={{ block: true }} buttonText={t("cezaFormu")} />
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

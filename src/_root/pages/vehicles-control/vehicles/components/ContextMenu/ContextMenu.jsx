import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined, DownOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import YapayZekayaSor from "./components/YapayZekayaSor/YapayZekayaSor";
import Arsivle from "./components/Arsivle";
import ArsivdenCikar from "./components/ArsivdenCikar";
import AktifYap from "./components/AktifYap";
import PasifeAl from "./components/PasifeAl";
import AracTipiniDegistir from "./components/AracTipiniDegistir";
import AracGrubunuDegistir from "./components/AracGrubunuDegistir";
import Parametreler from "./components/Parametreler";

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
      {selectedRows.length === 1 && <YapayZekayaSor selectedRows={selectedRows[0]} refreshTableData={refreshTableData} hidePopover={hidePopover} />}
      {selectedRows.length >= 1 && selectedRows.every((row) => row.arsiv === false) && (
        <Arsivle selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      {selectedRows.length >= 1 && selectedRows.every((row) => row.arsiv === true) && (
        <ArsivdenCikar selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}

      {selectedRows.length >= 1 && selectedRows.every((row) => row.aktif === false) && selectedRows.every((row) => row.arsiv === false) && (
        <AktifYap selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      {selectedRows.length >= 1 && selectedRows.every((row) => row.aktif === true) && selectedRows.every((row) => row.arsiv === false) && (
        <PasifeAl selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      {selectedRows.length >= 1 && selectedRows.every((row) => row.arsiv === false) && (
        <AracTipiniDegistir selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      {selectedRows.length >= 1 && selectedRows.every((row) => row.arsiv === false) && (
        <AracGrubunuDegistir selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
      )}
      <Parametreler selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />
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

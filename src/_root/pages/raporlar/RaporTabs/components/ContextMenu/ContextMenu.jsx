import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import Guncelle from "./components/Guncelle/Guncelle";
import Iptal from "./components/Iptal/Iptal";
import Kapat from "./components/Kapat/Kapat";
import Parametreler from "./components/Parametreler/Parametreler";
import TarihceTablo from "./components/TarihceTablo";
import Form from "./components/Form/Form";
import OnayaGonder from "./components/OnayaGonder";

const { Text, Link } = Typography;

export default function ContextMenu({ selectedRows, refreshTableData, onayCheck, setSelectedCards }) {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };
  // Silme işlemi için disable durumunu kontrol et
  /*  const isDisabled = selectedRows.some((row) => row.IST_DURUM_ID === 3 || row.IST_DURUM_ID === 4 || row.IST_DURUM_ID === 6); */

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {selectedRows.length >= 1 && <Sil selectedRows={selectedRows} setSelectedCards={setSelectedCards} refreshTableData={refreshTableData} hidePopover={hidePopover} />}
      {selectedRows.length == 1 && <Guncelle selectedRows={selectedRows} refreshTableData={refreshTableData} hidePopover={hidePopover} />}

      {/* {selectedRows.length >= 1 && <Iptal selectedRows={selectedRows} refreshTableData={refreshTableData} iptalDisabled={iptalDisabled} />} */}
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

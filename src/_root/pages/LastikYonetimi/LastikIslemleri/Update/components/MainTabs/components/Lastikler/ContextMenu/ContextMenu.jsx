import React, { useState } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import LastiginTarihcesi from "./components/LastiginTarihcesi";
import LastigiCikart from "./components/AxleTanimlamaHizliIslem/LastigiCikart";
import { t } from "i18next";

const { Text } = Typography;

export default function ContextMenu({ tire, refreshList, selectedAracDetay }) {
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
      <LastigiCikart titleLabel={t("lastikHurdayaGonder")} durumId={2} islemTipId={4} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
      <LastigiCikart titleLabel={t("lastikDepoyaGonder")} durumId={3} islemTipId={5} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
      <LastiginTarihcesi vehicleId={tire.siraNo} />
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

import React, { useState } from "react";
import { Button, Popover, Typography, Divider } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import LastiginTarihcesi from "./components/LastiginTarihcesi";
import LastigiCikart from "./components/AxleTanimlamaHizliIslem/LastigiCikart";
import LastikTakUpdate from "../../LastikTakUpdate";
import styled from "styled-components";
import { t } from "i18next";

const { Text } = Typography;

const MenuButton = styled.div`
  text-align: left;
  width: 100%;
  cursor: pointer;
`;

export default function ContextMenu({ tire, refreshList, selectedAracDetay, axleList, positionList }) {
  const [visible, setVisible] = useState(false);
  const [showLastikTakUpdate, setShowLastikTakUpdate] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const hidePopover = () => {
    setVisible(false);
  };

  const handleLastikTakUpdateOpen = () => {
    setShowLastikTakUpdate(true);
    setVisible(false); // Close the popover when opening the modal
  };

  const handleLastikTakUpdateClose = () => {
    setShowLastikTakUpdate(false);
  };

  const hasAssignedAxle = tire.aksId > 0;

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* <Sil selectedRows={[tire]} refreshTableData={refreshList} hidePopover={hidePopover} /> */}
      <LastigiCikart titleLabel={t("cikart(StogaGonder)")} durumId={3} islemTipId={5} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
      <LastigiCikart titleLabel={t("hurdayaAyir")} durumId={2} islemTipId={4} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
      <Divider />
      <MenuButton onClick={handleLastikTakUpdateOpen}>{t("lastikStokKarti")}</MenuButton>
      <LastiginTarihcesi vehicleId={tire.siraNo} />
    </div>
  );

  return (
    <>
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
      {showLastikTakUpdate && (
        <LastikTakUpdate
          aracId={selectedAracDetay?.aracId}
          axleList={axleList}
          positionList={positionList}
          shouldOpenModal={showLastikTakUpdate}
          onModalClose={handleLastikTakUpdateClose}
          showAddButton={false}
          refreshList={refreshList}
          tireData={tire}
        />
      )}
    </>
  );
}

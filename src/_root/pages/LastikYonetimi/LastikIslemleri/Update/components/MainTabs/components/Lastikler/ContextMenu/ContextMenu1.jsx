import React, { useState, useEffect, useCallback, memo } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import LastigiCikart from "./components/AxleTanimlamaHizliIslem/LastigiCikart";
import LastiginTarihcesi from "./components/LastiginTarihcesi";
import LastikTakUpdate from "../../LastikTakUpdate";
import styled from "styled-components";
import { t } from "i18next";

const { Text } = Typography;

const StyledPopover = styled(Popover)`
  .ant-popover-inner {
    padding: 8px 0;
    min-width: 150px;
  }

  .ant-popover-arrow {
    display: none !important;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuButton = styled.div`
  text-align: left;
  width: 100%;
  cursor: pointer;
`;

function ContextMenu1({ tire, refreshList, onClose, anchorEl, selectedAracDetay, axleList, positionList }) {
  const [visible, setVisible] = useState(false);
  const [showLastikTakUpdate, setShowLastikTakUpdate] = useState(false);

  /*  useEffect(() => {
    if (visible) {
      console.log("Tıklanan Lastik Verisi (ContextMenu):", tire);
    }
  }, [visible, tire]); */

  const handleLastikTakUpdateOpen = () => {
    setShowLastikTakUpdate(true);
    setVisible(false); // Close the popover when opening the modal
  };

  const handleLastikTakUpdateClose = () => {
    setShowLastikTakUpdate(false);
  };

  const renderContent = useCallback(
    () => (
      <ContentContainer>
        <MenuButton onClick={handleLastikTakUpdateOpen}>{t("lastikGuncelle")}</MenuButton>
        <LastigiCikart titleLabel={t("lastikHurdayaGonder")} durumId={2} islemTipId={4} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
        <LastigiCikart titleLabel={t("lastikDepoyaGonder")} durumId={3} islemTipId={5} selectedRows={tire} refreshTableData={refreshList} selectedAracDetay={selectedAracDetay} />
        <LastiginTarihcesi vehicleId={tire.siraNo} />
        {/* Diğer menü öğeleri buraya eklenebilir */}
      </ContentContainer>
    ),
    [tire, refreshList]
  );

  return (
    <>
      <Popover content={renderContent} trigger="click" open={visible} onOpenChange={setVisible} placement="bottom" classNames={{ root: "tire-context-menu" }} forceRender={false}>
        {anchorEl}
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

export default memo(ContextMenu1);

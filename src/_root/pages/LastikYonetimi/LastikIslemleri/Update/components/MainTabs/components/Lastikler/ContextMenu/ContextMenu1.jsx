import React, { useState, useEffect, useCallback, memo } from "react";
import { Button, Popover, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import Sil from "./components/Sil";
import AxleTanimlamaHizliIslem from "./components/AxleTanimlamaHizliIslem/AxleTanimlamaHizliIslem";
import styled from "styled-components";

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

function ContextMenu1({ tire, refreshList, onClose, anchorEl }) {
  const [visible, setVisible] = useState(false);

  /*  useEffect(() => {
    if (visible) {
      console.log("Tıklanan Lastik Verisi (ContextMenu):", tire);
    }
  }, [visible, tire]); */

  const renderContent = useCallback(
    () => (
      <ContentContainer>
        {!tire?.aksId && <AxleTanimlamaHizliIslem selectedRows={[tire]} refreshTableData={refreshList} />}
        {/* Diğer menü öğeleri buraya eklenebilir */}
      </ContentContainer>
    ),
    [tire, refreshList]
  );

  return (
    <Popover content={renderContent} trigger="click" open={visible} onOpenChange={setVisible} placement="bottom" classNames={{ root: "tire-context-menu" }} forceRender={false}>
      {anchorEl}
    </Popover>
  );
}

export default memo(ContextMenu1);

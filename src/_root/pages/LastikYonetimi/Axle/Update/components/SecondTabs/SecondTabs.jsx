import React, { useCallback, useEffect, useState } from "react";
import { Input, Tabs, Typography } from "antd";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import Sigorta from "./components/Sigorta/Sigorta.jsx";
import OzelAlanlar from "./components/OzelAlanlar/OzelAlanlar.jsx";
import IscilikTablo from "./components/Iscilik/IscilikTablo.jsx";
import Malzemeler from "./components/Malzemeler/Malzemeler.jsx";
import Maliyetler from "../MainTabs/components/Maliyetler.jsx";

const { Text, Link } = Typography;
const { TextArea } = Input;

//styled components
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0 !important;
    width: fit-content;
    padding: 10px 15px;
    justify-content: center;
    background-color: rgba(230, 230, 230, 0.3);
  }

  .ant-tabs-tab-active {
    background-color: #2bc77135;
  }

  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:not(:first-child) {
    border-left: 1px solid #80808024;
  }

  .ant-tabs-ink-bar {
    background: #2bc770;
  }
`;

//styled components end

export default function SecondTabs({ refreshKey, fieldRequirements }) {
  const { watch } = useFormContext();
  const [activeTabKey, setActiveTabKey] = useState("1"); // Default to the first tab

  // Modify the onChange handler to update the active tab state
  const onChange = (key) => {
    setActiveTabKey(key);
  };

  const secilenIsEmriID = watch("secilenIsEmriID");

  const items = [
    {
      key: "1",
      label: "İşçilik",
      children: <IscilikTablo isActive={activeTabKey === "1"} fieldRequirements={fieldRequirements} />,
    },
    {
      key: "2",
      label: "Malzemeler",
      children: <Malzemeler isActive={activeTabKey === "2"} fieldRequirements={fieldRequirements} />,
    },
    {
      key: "3",
      label: "Sigorta",
      children: <Sigorta fieldRequirements={fieldRequirements} />,
    },
    {
      key: "4",
      label: "Şikayetler",
      children: (
        <div>
          <Controller name="sikayetler" render={({ field }) => <TextArea {...field} rows={4} placeholder="Şikayetler" style={{ width: "100%", resize: "none" }} />} />
        </div>
      ),
    },
    {
      key: "5",
      label: "Açıklama",
      children: (
        <div>
          <Controller name="aciklama" render={({ field }) => <TextArea {...field} rows={4} placeholder="Açıklama" style={{ width: "100%", resize: "none" }} />} />
        </div>
      ),
    },
    {
      key: "6",
      label: "Özel Alanlar",
      // children: <SureBilgileri fieldRequirements={fieldRequirements} />,
      children: <OzelAlanlar />,
    },
  ];

  return (
    <div style={{ display: "flex", width: "100%", gap: "30px", alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <StyledTabs defaultActiveKey={activeTabKey} items={items} onChange={onChange} />
      </div>
      <div style={{ width: "205px", flexShrink: 0, marginTop: "50px" }}>
        <Maliyetler />
      </div>
    </div>
  );
}

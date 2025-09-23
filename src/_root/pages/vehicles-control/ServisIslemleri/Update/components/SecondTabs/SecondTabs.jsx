import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Tabs } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Controller, useFormContext } from "react-hook-form";
import Sigorta from "./components/Sigorta/Sigorta";
import OzelAlanlar from "./components/OzelAlanlar/OzelAlanlar.jsx";
import IscilikTablo from "./components/Iscilik/IscilikTablo";
import Malzemeler from "./components/Malzemeler/Malzemeler";
import Maliyetler from "../MainTabs/components/Maliyetler.jsx";
import AxiosInstance from "../../../../../../../api/http.jsx";

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
  const [tabCounts, setTabCounts] = useState({ iscilik: 0, malzeme: 0 });
  const isMountedRef = useRef(true);

  // Modify the onChange handler to update the active tab state
  const onChange = (key) => {
    setActiveTabKey(key);
  };

  const secilenIsEmriID = watch("secilenKayitID");
  const sigortaVar = watch("sigortaBilgileri");
  const aciklamaVar = (watch("aciklama") || "").toString().trim() !== "";
  const sikayetVar = (watch("sikayetler") || "").toString().trim() !== "";

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchTabCounts = useCallback(async () => {
    if (!secilenIsEmriID) {
      if (isMountedRef.current) {
        setTabCounts({ iscilik: 0, malzeme: 0 });
      }
      return;
    }

    try {
      const { data } = await AxiosInstance.get(`VehicleServices/GetUsedMaterialsWorkOrdersCount?serviceId=${secilenIsEmriID}`);

      if (isMountedRef.current) {
        const parsedIscilik = Number(data?.iscilikSayisi ?? 0);
        const parsedMalzeme = Number(data?.malzemeSayisi ?? 0);

        setTabCounts({
          iscilik: Number.isNaN(parsedIscilik) ? 0 : parsedIscilik,
          malzeme: Number.isNaN(parsedMalzeme) ? 0 : parsedMalzeme,
        });
      }
    } catch (error) {
      console.error("VehicleServices/GetUsedMaterialsWorkOrdersCount isteği başarısız oldu:", error);
      if (isMountedRef.current) {
        setTabCounts({ iscilik: 0, malzeme: 0 });
      }
    }
  }, [secilenIsEmriID]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchTabCounts();
  }, [fetchTabCounts, refreshKey]);

  const items = [
    {
      key: "1",
      label: `İşçilik (${tabCounts.iscilik})`,
      children: <IscilikTablo isActive={activeTabKey === "1"} fieldRequirements={fieldRequirements} onCountsRefresh={fetchTabCounts} />,
    },
    {
      key: "2",
      label: `Malzemeler (${tabCounts.malzeme})`,
      children: <Malzemeler baslangicTarihi={watch("baslangicTarihi")} isActive={activeTabKey === "2"} fieldRequirements={fieldRequirements} onCountsRefresh={fetchTabCounts} />,
    },
    {
      key: "3",
      label: sigortaVar ? "Sigorta *" : "Sigorta",
      children: <Sigorta fieldRequirements={fieldRequirements} />,
    },
    {
      key: "4",
      label: sikayetVar ? "Şikayetler *" : "Şikayetler",
      children: (
        <div>
          <Controller name="sikayetler" render={({ field }) => <TextArea {...field} rows={4} placeholder="Şikayetler" style={{ width: "100%", resize: "none" }} />} />
        </div>
      ),
    },
    {
      key: "5",
      label: aciklamaVar ? "Açıklama *" : "Açıklama",
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
    <div style={{ display: "flex", width: "100%", gap: "30px", alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap" }}>
      <div style={{ width: "100%", maxWidth: "1110px" }}>
        <StyledTabs defaultActiveKey={activeTabKey} items={items} onChange={onChange} />
      </div>
      <div style={{ width: "205px", flexShrink: 0, marginTop: "50px" }}>
        <Maliyetler />
      </div>
    </div>
  );
}

SecondTabs.propTypes = {
  refreshKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fieldRequirements: PropTypes.object,
};

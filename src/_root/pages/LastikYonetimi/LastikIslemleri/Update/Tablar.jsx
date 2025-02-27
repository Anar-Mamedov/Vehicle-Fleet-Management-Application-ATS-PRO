import React, { useState } from "react";
import { Radio, Divider } from "antd";
import MainTabs from "./components/MainTabs/MainTabs";
import LastikTarihcesi from "./components/SecondTabs/LastikTarihcesi";
import { t } from "i18next";

function Tablar({ selectedRow, onRefresh1, selectedAracDetay }) {
  const [tabKey, setTabKey] = useState("1");

  const handleTabChange = (e) => {
    setTabKey(e.target.value);
  };

  return (
    <>
      <Radio.Group value={tabKey} onChange={handleTabChange} style={{ display: "flex", justifyContent: "center" }}>
        <Radio.Button value="1">{t("lastikYonetimi")}</Radio.Button>
        <Radio.Button value="2">{t("lastikTarihcesi")}</Radio.Button>
      </Radio.Group>
      <Divider style={{ marginBottom: 10 }} />
      {tabKey === "1" && <MainTabs selectedRow={selectedRow} onRefresh1={onRefresh1} selectedAracDetay={selectedAracDetay} />}
      {tabKey === "2" && <LastikTarihcesi vehicleId={selectedRow?.aracId} />}
    </>
  );
}

export default Tablar;

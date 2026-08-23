import React, { useCallback, useState } from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";
import OperasyonStatisticsCards from "./components/OperasyonStatisticsCards";
import { DEFAULT_OPERASYON_FILTERS } from "./filter/OperasyonFilters";
import OperasyonListesi from "./OperasyonListesi";
import OperasyonHareketleriListesi from "./OperasyonHareketleriListesi";

// Sekme çubuğu sayfadaki diğer kutularla aynı beyaz kart görünümünde durur
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background-color: white;
    border-radius: 8px;
    padding: 0 15px;
    margin-bottom: 15px;
  }
`;

const badgeStyle = {
  marginLeft: "8px",
  padding: "1px 8px",
  borderRadius: "10px",
  backgroundColor: "#f0f1f5",
  fontSize: "12px",
  fontWeight: 600,
  color: "#5d6786",
};

// Sekme başlığında listenin kayıt sayısı rozet olarak gösterilir; sayı yüklenene kadar rozet çizilmez
const renderTabLabel = (label, count) => (
  <span>
    {label}
    {count === null ? null : <span style={badgeStyle}>{formatNumberWithLocale(count)}</span>}
  </span>
);

const Sefer = () => {
  // KPI kutuları sekmelerin üstünde durduğu için istek bilgisi sayfa seviyesinde tutulur
  const [statisticsRequest, setStatisticsRequest] = useState({
    searchTerm: "",
    filters: DEFAULT_OPERASYON_FILTERS,
    requestId: 0,
  });
  const [listeCount, setListeCount] = useState(null);
  const [hareketCount, setHareketCount] = useState(null);

  const handleListeCountChange = useCallback((count) => setListeCount(count), []);
  const handleHareketCountChange = useCallback((count) => setHareketCount(count), []);

  const items = [
    {
      key: "1",
      label: renderTabLabel(t("operasyonListesi"), listeCount),
      children: <OperasyonListesi onStatisticsRefresh={setStatisticsRequest} onTotalCountChange={handleListeCountChange} />,
    },
    {
      key: "2",
      label: renderTabLabel(t("operasyonHareketleri"), hareketCount),
      children: <OperasyonHareketleriListesi onTotalCountChange={handleHareketCountChange} />,
    },
  ];

  return (
    <>
      {/* KPI kutuları */}
      <OperasyonStatisticsCards request={statisticsRequest} />

      <StyledTabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Sefer;

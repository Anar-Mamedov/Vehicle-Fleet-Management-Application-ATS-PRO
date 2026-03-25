import React, { useState } from "react";
import { Button, Badge, Popover, Typography, Spin, Divider, Modal } from "antd";
import { FaRegCalendarAlt } from "react-icons/fa";
import styled from "styled-components";
import Sigorta from "./components/Sigorta";
import TasitKarti from "./components/TasitKarti";
import CezaOdeme from "./components/CezaOdeme";
import YakitTuketimi from "./components/YakitTuketimi";
import Kiralama from "./components/Kiralama";
import Surucu from "./components/Surucu";
import Stok from "./components/Stok";
import Vergi from "./components/Vergi";
import Muayene from "./components/Muayene";
import Sozlesme from "./components/Sozlesme";
import Egzoz from "./components/Egzoz";
import PeriyodikBakim from "./components/PeriyodikBakim";
import Takograf from "./components/Takograf";
import OnayIslemleri from "../../pages/SistemAyarlari/OnaylamaIslemleri/OnaylamaIslemleri";
import IkameArac from "./components/IkameArac";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";

const { Text } = Typography;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important;
  }
`;

const ContentWrapper = styled.div`
  width: 220px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Hatirlatici = ({ data, data1, loading, getHatirlatici, getHatirlatici1, hatirlaticiOpen, setHatirlaticiOpen, pinnable }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [requested, setRequested] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const methods = useForm();

  const handleToggle = () => {
    if (pinnable) {
      const newOpen = !hatirlaticiOpen;
      setHatirlaticiOpen(newOpen);
      if (newOpen) {
        getHatirlatici();
        getHatirlatici1();
      }
    }
  };

  const handlePopoverChange = (newOpen) => {
    if (!pinnable) {
      if (newOpen && !requested) {
        getHatirlatici();
        getHatirlatici1();
        setRequested(true);
      }
      if (!newOpen) {
        setRequested(false);
      }
      setPopoverOpen(newOpen);
    }
  };

  const handleRowClick = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
    setPopoverOpen(false);
  };

  const totalReminders = (() => {
    const sumDataValues = (dataObj) => {
      if (dataObj && typeof dataObj === "object") {
        return Object.values(dataObj)
          .map((value) => Number(value))
          .filter((value) => !isNaN(value))
          .reduce((acc, currentValue) => acc + currentValue, 0);
      }
      return 0;
    };
    return sumDataValues(data);
  })();

  const reminderItems = [
    { key: "sigorta", label: "Sigorta", color: "red", bgColor: "#ff000066", dataKey: "sigortaHatirlaticiSayisi", component: <Sigorta /> },
    { key: "tasitKarti", label: "Taşıt Kartı", color: "#009b84", bgColor: "rgb(0 155 132 / 35%)", dataKey: "aracKartiHatirlaticiSayisi", component: <TasitKarti /> },
    { key: "ceza", label: "Ceza Ödeme", color: "rgb(106,14,168)", bgColor: "rgb(106 14 168 / 35%)", dataKey: "cezaHatirlaticiSayisi", component: <CezaOdeme /> },
    { key: "yakit", label: "Yakıt Tüketimi", color: "rgb(202,108,0)", bgColor: "rgb(202,108,0,0.35)", dataKey: "yakitTuketimiHatirlaticiSayisi", component: <YakitTuketimi /> },
    { key: "kiralama", label: "Kiralama", color: "rgba(0,196,255,0.88)", bgColor: "rgb(0,196,255,0.35)", dataKey: "kiralamaHatirlaticiSayisi", component: <Kiralama /> },
    { key: "stok", label: "Stok", color: "rgba(0,59,209,0.88)", bgColor: "rgb(0,59,209,0.20)", dataKey: "stokHatirlaticiSayisi", component: <Stok /> },
    { key: "ikame", label: "İkame Araçlar", color: "rgba(0,128,128,0.88)", bgColor: "rgba(0,128,128,0.20)", dataKey: "ikameAracHatirlaticiSayisi", component: <IkameArac /> },
    { key: "surucu", label: "Sürücü", color: "rgba(255,117,31,0.88)", bgColor: "rgb(255,117,31,0.20)", dataKey: "surucuHatirlaticiSayisi", component: <Surucu /> },
    { key: "vergi", label: "Vergi", color: "#921A40", bgColor: "rgba(146,26,64,0.48)", dataKey: "aracVergiHatirlaticiSayisi", component: <Vergi /> },
    { key: "muayene", label: "Muayene", color: "#987D9A", bgColor: "rgba(152,125,154,0.43)", dataKey: "aracMuayeneHatirlaticiSayisi", component: <Muayene /> },
    { key: "sozlesme", label: "Sözleşme", color: "#EF5A6F", bgColor: "rgba(239,90,111,0.44)", dataKey: "aracSozlesmeHatirlaticiSayisi", component: <Sozlesme /> },
    { key: "egzoz", label: "Egzoz", color: "#134B70", bgColor: "rgba(19,75,112,0.47)", dataKey: "aracEgzozHatiraticiSayisi", component: <Egzoz /> },
    { key: "bakim", label: "Periyodik Bakım", color: "#00cfaa", bgColor: "rgba(0,207,170,0.31)", dataKey: "periyodikBakimHatirlaticiSayisi", component: <PeriyodikBakim /> },
    { key: "takograf", label: "Takograf", color: "#6a0ea8", bgColor: "rgba(106, 14, 168, 0.35)", dataKey: "aracTakografHatirlaticiSayisi", component: <Takograf /> },
    { key: "onay", label: t("bekleyenOnaylar"), color: "#0e8ca8", bgColor: "rgba(14, 119, 168, 0.35)", dataKey: "onayBekleyenler", component: <OnayIslemleri /> },
  ];

  const statusItems = [
    { label: "Süresi Yaklaşan", color: "#008000", bgColor: "rgba(0,128,0,0.37)", dataKey: "yaklasanSure" },
    { label: "Kritik Süre", color: "#e68901", bgColor: "rgba(255,173,0,0.24)", indicatorColor: "#ffad00", dataKey: "kritikSure" },
    { label: "Süresi Geçen", color: "#ff0000", bgColor: "rgba(255,0,0,0.38)", dataKey: "gecenSure" },
  ];

  const popoverContent = (
    <ContentWrapper>
      <Text strong style={{ fontSize: "16px" }}>
        Hatırlatıcılar
      </Text>
      <CustomSpin spinning={loading}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {statusItems.map((item) => (
            <Row key={item.label} style={{ cursor: "default" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Indicator style={{ backgroundColor: item.indicatorColor || item.color }} />
                <Text>{item.label}</Text>
              </div>
              <Text
                style={{
                  borderRadius: "8px",
                  padding: "1px 7px",
                  backgroundColor: item.bgColor,
                  color: item.color,
                }}
              >
                {data1?.[item.dataKey]}
              </Text>
            </Row>
          ))}
          <Divider style={{ margin: "4px 0" }} />
          {reminderItems.map((item) => (
            <Row key={item.key} onClick={() => handleRowClick(item.label, item.component)}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Indicator style={{ backgroundColor: item.color }} />
                <Text>{item.label}</Text>
              </div>
              <Text
                style={{
                  borderRadius: "8px",
                  padding: "1px 7px",
                  backgroundColor: item.bgColor,
                  color: item.color,
                }}
              >
                {data?.[item.dataKey]}
              </Text>
            </Row>
          ))}
        </div>
      </CustomSpin>
    </ContentWrapper>
  );

  const button = (
    <Badge count={totalReminders} offset={[-3, 3]}>
      <Button
        type={pinnable && hatirlaticiOpen ? "primary" : "default"}
        shape="circle"
        icon={<FaRegCalendarAlt style={{ fontSize: "20px" }} />}
        onClick={pinnable ? handleToggle : undefined}
      />
    </Badge>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FormProvider {...methods}>
        {pinnable ? (
          button
        ) : (
          <Popover content={popoverContent} trigger="click" open={popoverOpen} onOpenChange={handlePopoverChange}>
            {button}
          </Popover>
        )}
        <Modal title={modalTitle} destroyOnClose centered open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width="90%">
          {modalContent}
        </Modal>
      </FormProvider>
    </div>
  );
};

export default Hatirlatici;

import React, { useEffect, useState } from "react";
import { Button, Popover, Typography, Spin, Badge, Modal, Divider } from "antd";
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
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";

const { Text } = Typography;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important; /* Blue color */
  }
`;

const ContentWrapper = styled.div`
  width: 200px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
`;

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const Hatirlatici = ({ data, getHatirlatici, loading, data1, getHatirlatici1 }) => {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState(false); // Bayrak
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const methods = useForm(); // Initialize form methods

  useEffect(() => {
    if (open && !requested) {
      getHatirlatici();
      getHatirlatici1();
      setRequested(true); // Bayrağı ayarla
    }
  }, [open, requested, getHatirlatici, getHatirlatici1]);

  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      setRequested(false); // Popover kapandığında bayrağı sıfırla
    }
    setOpen(newOpen);
  };

  const handleRowClick = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
    setOpen(false); // Modal açıldığında popover'ı kapat
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

    return sumDataValues(data) + sumDataValues(data1);
  })();

  const content = (
    <ContentWrapper>
      <Text strong style={{ fontSize: "16px" }}>
        Hatırlatıcılar
      </Text>
      <CustomSpin spinning={loading}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Row onClick={() => handleRowClick("Süresi Yaklaşan", <div>Süresi Yaklaşan İçeriği</div>)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#008000" }} />
              <Text>Süresi Yaklaşan</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(0,128,0,0.37)",
                color: "#008000",
              }}
            >
              {data1?.yaklasanSure}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Kritik Süre", <div>Kritik Süre İçeriği</div>)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#ffad00" }} />
              <Text>Kritik Süre</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(255,173,0,0.24)",
                color: "#e68901",
              }}
            >
              {data1?.kritikSure}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Süresi Geçen", <div>Süresi Geçen İçeriği</div>)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#ff0000" }} />
              <Text>Süresi Geçen</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(255,0,0,0.38)",
                color: "#ff0000",
              }}
            >
              {data1?.gecenSure}
            </Text>
          </Row>
          <Divider />
          <Row onClick={() => handleRowClick("Sigorta", <Sigorta />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "red" }} />
              <Text>Sigorta</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "#ff000066",
                color: "red",
              }}
            >
              {data?.sigortaHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Taşıt Kartı", <TasitKarti />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#009b84" }} />
              <Text>Taşıt Kartı</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(0 155 132 / 35%)",
                color: "#009b84",
              }}
            >
              {data?.aracKartiHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Ceza Ödeme", <CezaOdeme />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "rgb(106,14,168)" }} />
              <Text>Ceza Ödeme</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(106 14 168 / 35%)",
                color: "rgb(106,14,168)",
              }}
            >
              {data?.cezaHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Yakit Tüketimi", <YakitTuketimi />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "rgb(202,108,0)" }} />
              <Text>Yakıt Tüketimi</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(202,108,0,0.35)",
                color: "rgb(202,108,0)",
              }}
            >
              {data?.yakitTuketimiHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Kiralama", <Kiralama />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "rgba(0,196,255,0.88)" }} />
              <Text>Kiralama</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(0,196,255,0.35)",
                color: "rgb(0,161,207)",
              }}
            >
              {data?.kiralamaHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Stok", <Stok />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "rgba(0,59,209,0.88)" }} />
              <Text>Stok</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(0,59,209,0.20)",
                color: "rgb(0,59,209,0.88)",
              }}
            >
              {data?.stokHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Sürücü", <Surucu />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "rgba(255,117,31,0.88)" }} />
              <Text>Sürücü</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgb(255,117,31,0.20)",
                color: "rgb(255,117,31,0.88)",
              }}
            >
              {data?.surucuHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Vergi", <Vergi />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#921A40" }} />
              <Text>Vergi</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(146,26,64,0.48)",
                color: "#921A40",
              }}
            >
              {data?.aracVergiHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Muayene", <Muayene />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#987D9A" }} />
              <Text>Muayene</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(152,125,154,0.43)",
                color: "#987D9A",
              }}
            >
              {data?.aracMuayeneHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Sözleşme", <Sozlesme />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#EF5A6F" }} />
              <Text>Sözleşme</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(239,90,111,0.44)",
                color: "#EF5A6F",
              }}
            >
              {data?.aracSozlesmeHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Egzoz", <Egzoz />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#134B70" }} />
              <Text>Egzoz</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(19,75,112,0.47)",
                color: "#134B70",
              }}
            >
              {data?.aracEgzozHatiraticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Periyodik Bakım", <PeriyodikBakim />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#00cfaa" }} />
              <Text>Periyodik Bakım</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(0,207,170,0.31)",
                color: "#00cfaa",
              }}
            >
              {data?.periyodikBakimHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick("Takograf", <Takograf />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#6a0ea8" }} />
              <Text>Takograf</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(106, 14, 168, 0.35)",
                color: "#6a0ea8",
              }}
            >
              {data?.aracTakografHatirlaticiSayisi}
            </Text>
          </Row>
          <Row onClick={() => handleRowClick(t("bekleyenOnay"), <OnayIslemleri />)}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px" }}>
              <Indicator style={{ backgroundColor: "#0e8ca8" }} />
              <Text>{t("bekleyenOnay")}</Text>
            </div>
            <Text
              style={{
                borderRadius: "8px 8px 8px 8px",
                padding: "1px 7px",
                backgroundColor: "rgba(14, 119, 168, 0.35)",
                color: "#0e8ca8",
              }}
            >
              {data?.onayBekleyenler}
            </Text>
          </Row>
        </div>
      </CustomSpin>
    </ContentWrapper>
  );

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <FormProvider {...methods}>
        <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
          <Badge count={totalReminders} offset={[-3, 3]}>
            <Button type="succes" shape="circle" icon={<FaRegCalendarAlt style={{ fontSize: "20px" }} />}></Button>
          </Badge>
        </Popover>
        <Modal title={modalTitle} destroyOnClose centered open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width="90%">
          {modalContent}
        </Modal>
      </FormProvider>
    </div>
  );
};

export default Hatirlatici;

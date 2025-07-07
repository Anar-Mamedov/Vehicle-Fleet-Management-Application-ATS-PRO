import React, { useEffect, useState } from "react";
import { Tabs, Typography, Button, Modal, Input, message } from "antd";
import {
  ToolOutlined,
  FundProjectionScreenOutlined,
  SolutionOutlined,
  ProductOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  WalletOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../api/http.jsx";
import RaporsTables from "./components/RaporsTables.jsx";
import GrupSil from "./components/ContextMenu/components/GrupSil.jsx";
import { t } from "i18next";

const { Text } = Typography;

const onChange = (key) => {
  // console.log(key);
};

//styled components
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0 !important;
    width: 100% !important;
    padding: 10px 15px;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: flex-start;
    border-left: 1px solid #ffffff !important;
  }

  .ant-tabs-tab-active {
    background-color: #4096ff0f;
    border-bottom: 1px solid #4096ff !important;
    border-top: 1px solid #4096ff !important;

    .ant-typography {
      background-color: #4096ff !important;
      color: #ffffff;
    }
  }

  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-nav .ant-tabs-tab-active:hover .ant-tabs-tab-btn {
    color: #4096ff !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:not(:first-child) {
    border-left: 1px solid #80808024;
  }

  .ant-tabs-ink-bar {
    background: rgba(43, 199, 112, 0);
  }

  .ant-tabs-tab-btn {
    width: 100%;
  }
`;

//styled components end

export default function RaporTabs({ refreshKey, disabled, fieldRequirements }) {
  const { watch } = useFormContext();
  const [items, setItems] = useState([]); // state to hold the items
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state ekledim
  const lan = localStorage.getItem("i18nextLng") || "tr";
  const [activeTabKey, setActiveTabKey] = useState("1");

  const onChange = (key) => {
    // "Rapor Grubu Ekle" tab'ı seçilirse modal aç ama tab'ı değiştirme
    if (key === "add-group") {
      setIsModalOpen(true);
      return;
    }
    setActiveTabKey(key);
  };

  const handleAddGroup = async () => {
    if (loading) return; // Eğer loading durumundaysa işlemi durdur

    setLoading(true); // Loading'i başlat
    try {
      await AxiosInstance.post("ReportGroup/AddReportGroup", {
        rpgAciklama: newGroupName,
        rpgProgram: "G",
      });
      message.success("Yeni grup başarıyla eklendi");
      setIsModalOpen(false);
      setNewGroupName("");
      // Grupları yeniden yükle
      fetchData();
    } catch (error) {
      message.error("Grup eklenirken bir hata oluştu");
    } finally {
      setLoading(false); // Loading'i bitir
    }
  };

  const handleDeleteSuccess = async (groupId) => {
    try {
      // Önce güncel veriyi al
      const updatedResponse = await AxiosInstance.get(`ReportGroup/GetReportGroup?lan=${lan}`);

      // Eğer silinen grup aktif tab ise
      if (activeTabKey === groupId.toString()) {
        if (updatedResponse.data.length > 0) {
          // İlk mevcut grup'un ID'sini al ve aktif tab olarak ayarla
          setActiveTabKey(updatedResponse.data[0].tbRaporGroupId.toString());
        } else {
          // Hiç grup kalmadıysa "Rapor Grubu Ekle" tab'ını aktif yap
          setActiveTabKey("add-group");
        }
      }

      // Grupları yeniden yükle
      fetchData();
    } catch (error) {
      console.error("Error handling delete success:", error);
      // Hata durumunda da grupları yeniden yükle
      fetchData();
    }
  };

  const fetchData = async () => {
    AxiosInstance.get(`ReportGroup/GetReportGroup?lan=${lan}`).then((response) => {
      // İlk yüklemede activeTabKey'i ilk grup'un ID'si ile ayarla
      if (response.data.length > 0 && activeTabKey === "1") {
        setActiveTabKey(response.data[0].tbRaporGroupId.toString());
      }

      // map over the data to create items
      const newItems = response.data.map((item) => ({
        key: item.tbRaporGroupId.toString(),
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
            }}
          >
            <span>{item.rpgAciklama}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#e4e4e4",
                  minWidth: "20px",
                  height: "20px",
                }}
              >
                {item.raporSayisi}
              </Text>
            </div>
          </div>
        ),
        children: <RaporsTables key={item.tbRaporGroupId} tabKey={item.tbRaporGroupId.toString()} tabName={item.rpgAciklama} onDeleteSuccess={handleDeleteSuccess} />,
      }));

      // "Yeni Rapor Grubu Ekle" butonunu en son tab olarak ekle
      newItems.push({
        key: "add-group",
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1890ff",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            + Rapor Grubu Ekle
          </div>
        ),
        children: <div style={{ padding: "20px", textAlign: "center" }}>Yeni rapor grubu eklemek için yukarıdaki butona tıklayın.</div>,
      });

      // Eğer hiç grup yoksa "Rapor Grubu Ekle" tab'ını aktif yap
      if (response.data.length === 0) {
        setActiveTabKey("add-group");
      }

      // set the items
      setItems(newItems);
    });
  };

  useEffect(() => {
    // fetch data from API
    fetchData();
  }, []);

  return (
    <div>
      <StyledTabs tabPosition="left" activeKey={activeTabKey} destroyInactiveTabPane items={items} onChange={onChange} />

      <Modal
        title="Yeni Rapor Grubu Ekle"
        open={isModalOpen}
        onOk={handleAddGroup}
        confirmLoading={loading} // Modal'a loading state ekledim
        onCancel={() => {
          if (!loading) {
            // Loading durumunda cancel'a basmayı engelle
            setIsModalOpen(false);
            setNewGroupName("");
          }
        }}
      >
        <Input
          placeholder="Rapor Grubu Adı"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          disabled={loading} // Loading durumunda input'u devre dışı bırak
        />
      </Modal>
    </div>
  );
}

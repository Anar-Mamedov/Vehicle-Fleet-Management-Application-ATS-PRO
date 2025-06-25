import React, { useEffect, useState } from "react";
import { Tabs, Typography, Button, Modal, Input, message, Popconfirm } from "antd";
import {
  ToolOutlined,
  FundProjectionScreenOutlined,
  SolutionOutlined,
  ProductOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  WalletOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../api/http.jsx";
import RaporsTables from "./components/RaporsTables.jsx";
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

  const handleDeleteGroup = async () => {
    try {
      const response = await AxiosInstance.get(`ReportGroup/DeleteReportGroupById?id=${Number(activeTabKey)}`);
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 204) {
        message.success("Rapor grubu başarıyla silindi");
        // Grupları yeniden yükle
        fetchData();
      } else if (response.data.statusCode === 500) {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Rapor grubu silinirken bir hata oluştu");
    }
  };

  const fetchData = async () => {
    AxiosInstance.get(`ReportGroup/GetReportGroup?lan=${lan}`).then((response) => {
      // map over the data to create items
      const newItems = response.data.map((item) => ({
        key: item.tbRaporGroupId.toString(),
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginRight: "10px" }}>{item.rpgAciklama}</div>
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
        ),
        children: <RaporsTables key={item.tbRaporGroupId} tabKey={item.tbRaporGroupId.toString()} tabName={item.rpgAciklama} />,
      }));

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
      <div style={{ width: "316px", display: "flex", justifyContent: "flex-start", gap: "10px", alignItems: "center" }}>
        <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: "10px" }}>
          Rapor Grubu Ekle
        </Button>
        <Popconfirm
          title="Rapor Grubu Silme"
          description="Bu rapor grubunu silmek istediğinize emin misiniz?"
          onConfirm={handleDeleteGroup}
          okText="Evet"
          cancelText="Hayır"
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          <Button danger style={{ marginBottom: "10px" }}>
            Rapor Grubu Sil
          </Button>
        </Popconfirm>
      </div>
      <StyledTabs tabPosition="left" defaultActiveKey="1" destroyInactiveTabPane items={items} onChange={onChange} />

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

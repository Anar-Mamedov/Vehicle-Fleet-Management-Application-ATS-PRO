import React, { useEffect, useState } from "react";
import { Typography, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import http from "../../../../api/http.jsx";
import StatusReminderModal from "../../../../_root/components/Hatirlatici/components/StatusReminderModal";

const { Text } = Typography;

function Component5() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [statusModalTitle, setStatusModalTitle] = useState("");
  const [statusModalDurum, setStatusModalDurum] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      startYear: 2021,
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=12", body);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      } else {
        setData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusClick = (durum, title) => {
    setStatusModalTitle(title);
    setStatusModalDurum(durum);
    setStatusModalVisible(true);
  };

  const statusItems = [
    {
      key: "yaklasanSure",
      label: t("suresiYaklasan"),
      color: "green",
      durum: "yaklasan",
    },
    {
      key: "kritikSure",
      label: t("kritikSure"),
      color: "#ffad00",
      durum: "kritik",
    },
    {
      key: "gecenSure",
      label: t("suresiGecen"),
      color: "red",
      durum: "suresiGecti",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid #f0f0f0",
      }}
    >
      <div style={{ padding: "10px" }}>
        <Text style={{ fontWeight: "500", fontSize: "17px" }}> {t("hatirlatici")} </Text>
      </div>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div
          style={{
            display: "flex",
            flexFlow: "wrap",
            justifyContent: "space-evenly",
            gap: "10px",
            overflow: "auto",
            height: "100vh",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          {statusItems.map((item) => (
            <div
              key={item.key}
              role="button"
              tabIndex={0}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleStatusClick(item.durum, item.label)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleStatusClick(item.durum, item.label);
              }}
            >
              <Text
                style={{
                  color: item.color,
                  fontSize: "50px",
                }}
              >
                {data?.[item.key] !== undefined ? data[item.key] : ""}
              </Text>
              <Text> {item.label} </Text>
            </div>
          ))}
        </div>
      )}
      <StatusReminderModal
        open={statusModalVisible}
        title={statusModalTitle}
        durum={statusModalDurum}
        onClose={() => setStatusModalVisible(false)}
      />
    </div>
  );
}

export default Component5;

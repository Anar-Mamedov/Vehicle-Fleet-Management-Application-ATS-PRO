import React, { useEffect, useState } from "react";
import { Modal, Typography, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import http from "../../../../api/http.jsx";
import FormattedDate from "../../../../_root/components/FormattedDate";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";

const { Text } = Typography;

function Component5() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

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

  const fetchRemindersByStatus = async (durum, title) => {
    setModalTitle(title);
    setIsModalVisible(true);
    setModalLoading(true);
    try {
      const response = await http.get(`Reminder/GetRemindersByStatus?durum=${durum}`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      }
      const list = Array.isArray(response.data) ? response.data : response.data?.list || [];
      setModalData(list.map((item, i) => ({ ...item, _uid: i })));
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      setModalData([]);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalData([]);
  };

  const strSort = (field) => (a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;
    return String(valA).localeCompare(String(valB));
  };

  const numSort = (field) => (a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;
    return Number(valA) - Number(valB);
  };

  const dateSort = (field) => (a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (!valA && !valB) return 0;
    if (!valA) return 1;
    if (!valB) return -1;
    return dayjs(valA).unix() - dayjs(valB).unix();
  };

  const columns = [
    { title: t("nesne"), dataIndex: "nesne", key: "nesne", width: 150, ellipsis: true, sorter: strSort("nesne") },
    { title: t("grup"), dataIndex: "grup", key: "grup", width: 150, ellipsis: true, sorter: strSort("grup") },
    { title: t("durum"), dataIndex: "durum", key: "durum", width: 120, ellipsis: true, sorter: strSort("durum") },
    { title: t("aracGrubu"), dataIndex: "aracGrubu", key: "aracGrubu", width: 180, ellipsis: true, sorter: strSort("aracGrubu") },
    { title: t("tarih"), dataIndex: "tarih", key: "tarih", width: 120, sorter: dateSort("tarih"), render: (value) => <FormattedDate date={value} /> },
    { title: t("kalan"), dataIndex: "kalan", key: "kalan", width: 100, sorter: numSort("kalan"), render: (text) => formatNumberWithLocale(text) },
    { title: t("birim"), dataIndex: "birim", key: "birim", width: 80, sorter: strSort("birim") },
    { title: t("guncel"), dataIndex: "guncel", key: "guncel", width: 100, sorter: strSort("guncel") },
    { title: t("modelYili"), dataIndex: "modelYili", key: "modelYili", width: 100, sorter: numSort("modelYili") },
    { title: t("lokasyon"), dataIndex: "lokasyon", key: "lokasyon", width: 150, ellipsis: true, sorter: strSort("lokasyon") },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 200, ellipsis: true, sorter: strSort("aciklama") },
  ];

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
              onClick={() => fetchRemindersByStatus(item.durum, item.label)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fetchRemindersByStatus(item.durum, item.label);
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
      <Modal
        width="90%"
        centered
        title={modalTitle}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Table
          columns={columns}
          dataSource={modalData}
          loading={modalLoading}
          rowKey="_uid"
          scroll={{ y: "calc(100vh - 400px)" }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showQuickJumper: true,
          }}
          size="small"
        />
      </Modal>
    </div>
  );
}

export default Component5;

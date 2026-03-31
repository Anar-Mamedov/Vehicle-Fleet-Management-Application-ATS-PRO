import React, { useEffect, useState } from "react";
import { Modal, Typography, Spin, Table, Input } from "antd";
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
  const [modalSearchText, setModalSearchText] = useState("");

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
    setModalSearchText("");
    try {
      const response = await http.get(`Reminder/GetRemindersByStatus?durum=${durum}`);
      if (response.data.statusCode === 401) {
        navigate("/unauthorized");
        return;
      }
      const list = Array.isArray(response.data) ? response.data : response.data?.list || [];
      setModalData(
        list.map((item, i) => ({
          ...item,
          ilgiliKayit: item.ilgiliKayit ?? item.nesne ?? "",
          sonTarih: item.sonTarih ?? item.tarih ?? null,
          _uid: i,
        }))
      );
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
    setModalSearchText("");
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

  const reminderGroupKeyMap = {
    onayislemleri: "onayIslemleri",
    periyodiktarih: "periyodikTarih",
    periyodikkm: "periyodikkm",
    ikamearac: "ikameArac",
    muayenetarihi: "muayeneTarihi",
    egzostarihi: "egzosTarihi",
    egzoztarihi: "egzozTarihi",
    takograftarihi: "takografTarihi",
    sozlesmetarihi: "sozlesmeTarihi",
    vergitarihi: "vergiTarihi",
    kiralikarac: "kiralikArac",
    tasitkarti: "tasitKarti",
    ceza: "ceza",
    sigorta: "sigorta",
    surucu: "surucu",
    stok: "stok",
  };

  const reminderUnitKeyMap = {
    gun: "gun",
    adet: "adet",
    km: "km",
  };

  const reminderStatusKeyMap = {
    suresigecti: "suresiGecti",
    suresigecen: "suresiGecen",
    yaklasan: "yaklasan",
    kritik: "kritik",
  };

  const translateReminderValue = (value, keyMap) => {
    if (value === null || value === undefined || value === "") return "-";
    if (value === "-") return "-";

    const rawValue = String(value);
    const normalizedValue = rawValue.trim().toLowerCase();
    const i18nKey = keyMap[normalizedValue];

    if (!i18nKey) return rawValue;

    return t(i18nKey, { defaultValue: rawValue });
  };

  const filteredModalData = modalData.filter((item) => {
    if (!modalSearchText?.trim()) return true;

    const keyword = modalSearchText.trim().toLocaleLowerCase("tr");
    const searchableFields = [item.ilgiliKayit, item.grup, item.durum, item.sonTarih, item.kalan, item.birim, item.lokasyon, item.ekBilgi, item.aciklama];

    return searchableFields.some((field) => String(field ?? "").toLocaleLowerCase("tr").includes(keyword));
  });

  const columns = [
    { title: t("ilgiliKayit"), dataIndex: "ilgiliKayit", key: "ilgiliKayit", width: 150, ellipsis: true, sorter: strSort("ilgiliKayit") },
    {
      title: t("grup"),
      dataIndex: "grup",
      key: "grup",
      width: 150,
      ellipsis: true,
      sorter: strSort("grup"),
      render: (value) => translateReminderValue(value, reminderGroupKeyMap),
    },
    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 120,
      ellipsis: true,
      sorter: strSort("durum"),
      render: (value) => translateReminderValue(value, reminderStatusKeyMap),
    },
    { title: t("sonTarih"), dataIndex: "sonTarih", key: "sonTarih", width: 120, sorter: dateSort("sonTarih"), render: (value) => <FormattedDate date={value} /> },
    { title: t("kalan"), dataIndex: "kalan", key: "kalan", width: 100, sorter: numSort("kalan"), render: (text) => formatNumberWithLocale(text) },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: "birim",
      width: 80,
      sorter: strSort("birim"),
      render: (value) => translateReminderValue(value, reminderUnitKeyMap),
    },
    { title: t("lokasyon"), dataIndex: "lokasyon", key: "lokasyon", width: 150, ellipsis: true, sorter: strSort("lokasyon") },
    { title: t("ekBilgi"), dataIndex: "ekBilgi", key: "ekBilgi", width: 150, ellipsis: true, sorter: strSort("ekBilgi") },
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
        <Input
          allowClear
          value={modalSearchText}
          onChange={(e) => setModalSearchText(e.target.value)}
          placeholder={`${t("arama")}...`}
          style={{ width: 320, marginBottom: 12 }}
        />
        <Table
          columns={columns}
          dataSource={filteredModalData}
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

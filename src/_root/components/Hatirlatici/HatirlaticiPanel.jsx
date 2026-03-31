import React, { useCallback, useEffect, useRef, useState } from "react";
import { Typography, Spin, Divider, Modal, Button, Switch, Popover, Table, Input } from "antd";
import { CloseOutlined, ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { formatNumberWithLocale } from "../../../hooks/FormattedNumber";
import FormattedDate from "../FormattedDate";
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
import AxiosInstance from "../../../api/http";

const { Text } = Typography;

const AUTO_REFRESH_INTERVAL = 5 * 60; // 5 dakika (saniye cinsinden)

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important;
  }
`;

const PanelWrapper = styled.div`
  width: ${(props) => (props.$open ? "280px" : "0px")};
  min-width: ${(props) => (props.$open ? "280px" : "0px")};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  border-left: ${(props) => (props.$open ? "1px solid #f0f0f0" : "none")};
  transition: all 0.3s ease;
  box-shadow: ${(props) => (props.$open ? "-2px 0 8px rgba(0, 0, 0, 0.06)" : "none")};
`;

const PanelContent = styled.div`
  padding: 16px;
  display: ${(props) => (props.$open ? "block" : "none")};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const BadgeCount = styled(Text)`
  border-radius: 8px;
  padding: 1px 7px;
  font-size: 12px;
  flex-shrink: 0;
`;

const formatCountdown = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const HatirlaticiPanel = ({ open, onClose }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [organize, setOrganize] = useState(() => localStorage.getItem("hatirlatici_organize") === "true");
  const [autoRefresh, setAutoRefresh] = useState(() => localStorage.getItem("hatirlatici_auto_refresh") === "true");
  const [countdown, setCountdown] = useState(AUTO_REFRESH_INTERVAL);
  const [updatedKeys, setUpdatedKeys] = useState(() => {
    try {
      const saved = localStorage.getItem("hatirlatici_updated_keys");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const prevDataRef = useRef(
    (() => {
      try {
        const saved = localStorage.getItem("hatirlatici_prev_data");
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    })()
  );
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const handleOrganizeChange = (checked) => {
    setOrganize(checked);
    localStorage.setItem("hatirlatici_organize", checked.toString());
  };

  const handleAutoRefreshChange = (checked) => {
    setAutoRefresh(checked);
    localStorage.setItem("hatirlatici_auto_refresh", checked.toString());
    if (!checked) {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
      setCountdown(AUTO_REFRESH_INTERVAL);
    }
  };

  const methods = useForm();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [reminderRes, graphRes] = await Promise.all([AxiosInstance.get("/Reminder"), AxiosInstance.post("/Graphs/GetGraphInfoByType?type=12")]);

      if (reminderRes.data) {
        if (prevDataRef.current) {
          setUpdatedKeys((prev) => {
            const newUpdated = new Set(prev);
            Object.keys(reminderRes.data).forEach((key) => {
              const prevVal = Number(prevDataRef.current[key]) || 0;
              const currVal = Number(reminderRes.data[key]) || 0;
              if (currVal > prevVal) {
                newUpdated.add(key);
              }
            });
            localStorage.setItem("hatirlatici_updated_keys", JSON.stringify([...newUpdated]));
            return newUpdated;
          });
        }
        prevDataRef.current = { ...reminderRes.data };
        localStorage.setItem("hatirlatici_prev_data", JSON.stringify(reminderRes.data));
        setData(reminderRes.data);
      }
      if (graphRes.data) setData1(graphRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // İlk açılışta veri çek
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  // Otomatik yenileme zamanlayıcısı
  useEffect(() => {
    if (autoRefresh && open) {
      setCountdown(AUTO_REFRESH_INTERVAL);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return AUTO_REFRESH_INTERVAL;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = setInterval(() => {
        fetchData();
      }, AUTO_REFRESH_INTERVAL * 1000);

      return () => {
        clearInterval(timerRef.current);
        clearInterval(countdownRef.current);
      };
    } else {
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
      setCountdown(AUTO_REFRESH_INTERVAL);
    }
  }, [autoRefresh, open]);

  const handleManualRefresh = () => {
    fetchData();
    // Otomatik yenileme açıksa sayacı sıfırla
    if (autoRefresh) {
      setCountdown(AUTO_REFRESH_INTERVAL);
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);

      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return AUTO_REFRESH_INTERVAL;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = setInterval(() => {
        fetchData();
      }, AUTO_REFRESH_INTERVAL * 1000);
    }
  };

  const handleRowClick = (title, content, dataKey) => {
    if (updatedKeys.has(dataKey)) {
      setUpdatedKeys((prev) => {
        const next = new Set(prev);
        next.delete(dataKey);
        localStorage.setItem("hatirlatici_updated_keys", JSON.stringify([...next]));
        return next;
      });
    }
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
  };

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

  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [statusModalTitle, setStatusModalTitle] = useState("");
  const [statusModalData, setStatusModalData] = useState([]);
  const [statusModalLoading, setStatusModalLoading] = useState(false);
  const [statusSearchText, setStatusSearchText] = useState("");

  const handleStatusClick = async (durum, title) => {
    setStatusModalTitle(title);
    setStatusModalVisible(true);
    setStatusModalLoading(true);
    setStatusSearchText("");
    try {
      const response = await AxiosInstance.get(`Reminder/GetRemindersByStatus?durum=${durum}`);
      const list = Array.isArray(response.data) ? response.data : response.data?.list || [];
      setStatusModalData(
        list.map((item, i) => ({
          ...item,
          ilgiliKayit: item.ilgiliKayit ?? item.nesne ?? "",
          sonTarih: item.sonTarih ?? item.tarih ?? null,
          _uid: i,
        }))
      );
    } catch (error) {
      console.error(error);
      setStatusModalData([]);
    } finally {
      setStatusModalLoading(false);
    }
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

  const filteredStatusModalData = statusModalData.filter((item) => {
    if (!statusSearchText?.trim()) return true;

    const keyword = statusSearchText.trim().toLocaleLowerCase("tr");
    const searchableFields = [item.ilgiliKayit, item.grup, item.durum, item.sonTarih, item.kalan, item.birim, item.lokasyon, item.ekBilgi, item.aciklama];

    return searchableFields.some((field) =>
      String(field ?? "")
        .toLocaleLowerCase("tr")
        .includes(keyword)
    );
  });

  const statusTableColumns = [
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
    { label: t("suresiYaklasan"), color: "#008000", bgColor: "rgba(0,128,0,0.37)", dataKey: "yaklasanSure", durum: "yaklasan" },
    { label: t("kritikSure"), color: "#e68901", bgColor: "rgba(255,173,0,0.24)", indicatorColor: "#ffad00", dataKey: "kritikSure", durum: "kritik" },
    { label: t("suresiGecen"), color: "#ff0000", bgColor: "rgba(255,0,0,0.38)", dataKey: "gecenSure", durum: "suresiGecti" },
  ];

  const filterContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 180 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13 }}>Organize et</Text>
        <Switch size="small" checked={organize} onChange={handleOrganizeChange} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 13 }}>Otomatik yenile</Text>
        <Switch size="small" checked={autoRefresh} onChange={handleAutoRefreshChange} />
      </div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <PanelWrapper $open={open}>
        <PanelContent $open={open}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Text strong style={{ fontSize: "16px" }}>
                Hatırlatıcılar
              </Text>
              <Popover content={filterContent} trigger="click" placement="bottomLeft" open={filterOpen} onOpenChange={setFilterOpen}>
                <Button type="text" size="small" icon={<FilterOutlined />} />
              </Popover>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {autoRefresh && <Text style={{ fontSize: 11, color: "#999", marginRight: 2 }}>{formatCountdown(countdown)}</Text>}
              <Button type="text" size="small" icon={<ReloadOutlined />} onClick={handleManualRefresh} loading={loading} />
              <Button type="text" size="small" icon={<CloseOutlined />} onClick={onClose} />
            </div>
          </div>

          <CustomSpin spinning={loading}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {statusItems.map((item) => (
                <Row key={item.label} onClick={() => handleStatusClick(item.durum, item.label)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Indicator style={{ backgroundColor: item.indicatorColor || item.color }} />
                    <Text style={{ fontSize: 13 }}>{item.label}</Text>
                  </div>
                  <BadgeCount style={{ backgroundColor: item.bgColor, color: item.color }}>{data1?.[item.dataKey]}</BadgeCount>
                </Row>
              ))}

              <Divider style={{ margin: "8px 0" }} />

              {reminderItems
                .filter((item) => !organize || Number(data?.[item.dataKey]) > 0)
                .sort((a, b) => {
                  const aUpdated = updatedKeys.has(a.dataKey) ? 1 : 0;
                  const bUpdated = updatedKeys.has(b.dataKey) ? 1 : 0;
                  return bUpdated - aUpdated;
                })
                .map((item) => (
                  <Row key={item.key} onClick={() => handleRowClick(item.label, item.component, item.dataKey)}>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", position: "relative" }}>
                      <Indicator style={{ backgroundColor: item.color }} />
                      <Text style={{ fontSize: 13 }}>{item.label}</Text>
                      {updatedKeys.has(item.dataKey) && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "#ff4d4f",
                            position: "absolute",
                            top: 2,
                            right: -10,
                          }}
                        />
                      )}
                    </div>
                    <BadgeCount style={{ backgroundColor: item.bgColor, color: item.color }}>{data?.[item.dataKey]}</BadgeCount>
                  </Row>
                ))}
            </div>
          </CustomSpin>
        </PanelContent>
      </PanelWrapper>

      <Modal title={modalTitle} destroyOnClose centered open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width="90%">
        {modalContent}
      </Modal>

      <Modal
        title={statusModalTitle}
        destroyOnClose
        centered
        open={statusModalVisible}
        onCancel={() => {
          setStatusModalVisible(false);
          setStatusModalData([]);
          setStatusSearchText("");
        }}
        footer={null}
        width="90%"
      >
        <Input
          allowClear
          value={statusSearchText}
          onChange={(e) => setStatusSearchText(e.target.value)}
          placeholder={`${t("arama")}...`}
          style={{ width: 320, marginBottom: 12 }}
        />
        <Table
          columns={statusTableColumns}
          dataSource={filteredStatusModalData}
          loading={statusModalLoading}
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
    </FormProvider>
  );
};

export default HatirlaticiPanel;

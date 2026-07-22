import React, { useEffect, useState } from "react";
import { Modal, Table, Input, Button, message } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { t } from "i18next";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import AxiosInstance from "../../../../api/http";
import FormattedDate from "../../FormattedDate";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";

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
  dosya: "dosya",
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

const StatusReminderModal = ({ open, title, durum, onClose }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!open || !durum) return;

    let cancelled = false;
    setLoading(true);
    setSearchText("");
    setData([]);

    AxiosInstance.get(`Reminder/GetRemindersByStatus?durum=${durum}`)
      .then((response) => {
        if (cancelled) return;
        const list = Array.isArray(response.data) ? response.data : response.data?.list || [];
        setData(
          list.map((item, i) => ({
            ...item,
            ilgiliKayit: item.ilgiliKayit ?? item.nesne ?? "",
            sonTarih: item.sonTarih ?? item.tarih ?? null,
            _uid: i,
          }))
        );
      })
      .catch((error) => {
        if (cancelled) return;
        console.error(error);
        setData([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, durum]);

  const filteredData = data.filter((item) => {
    if (!searchText?.trim()) return true;
    const keyword = searchText.trim().toLocaleLowerCase("tr");
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

  const handleDownloadXLSX = () => {
    try {
      if (!filteredData?.length) {
        message.warning(t("kayitBulunamadi", { defaultValue: "İndirilecek kayıt bulunamadı" }));
        return;
      }

      const xlsxData = filteredData.map((item) => ({
        [t("ilgiliKayit")]: item.ilgiliKayit ?? "",
        [t("grup")]: translateReminderValue(item.grup, reminderGroupKeyMap),
        [t("durum")]: translateReminderValue(item.durum, reminderStatusKeyMap),
        [t("sonTarih")]: item.sonTarih ? dayjs(item.sonTarih).format("DD.MM.YYYY") : "",
        [t("kalan")]: item.kalan ?? "",
        [t("birim")]: translateReminderValue(item.birim, reminderUnitKeyMap),
        [t("lokasyon")]: item.lokasyon ?? "",
        [t("ekBilgi")]: item.ekBilgi ?? "",
        [t("aciklama")]: item.aciklama ?? "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(xlsxData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, title || "Liste");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title || "Liste"}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("XLSX indirme hatası:", error);
      message.error("Excel indirme hatası: " + (error.message || "Bilinmeyen hata"));
    }
  };

  return (
    <Modal
      title={title}
      destroyOnClose
      centered
      open={open}
      onCancel={() => {
        setData([]);
        setSearchText("");
        onClose?.();
      }}
      footer={null}
      width="90%"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12 }}>
        <Input
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`${t("arama")}...`}
          style={{ width: 320 }}
        />
        <Button
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleDownloadXLSX}
          icon={<FileExcelOutlined />}
          disabled={!filteredData?.length}
        >
          {t("indir", { defaultValue: "İndir" })}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
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
  );
};

export default StatusReminderModal;

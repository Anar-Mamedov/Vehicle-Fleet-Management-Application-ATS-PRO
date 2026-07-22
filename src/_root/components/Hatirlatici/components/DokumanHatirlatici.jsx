import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Table, Tag, Tooltip, Typography, message } from "antd";
import {
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { GetDocumentReminderListService } from "../../../../api/services/upload/services";
import FormattedDate from "../../FormattedDate";
import { formatNumberWithLocale } from "../../../../hooks/FormattedNumber";

const { Text } = Typography;

const PAGE_SIZE = 10;

const DOCUMENT_VISUALS = [
  { extensions: [".pdf"], icon: FilePdfOutlined, color: "#ff4d4f" },
  { extensions: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"], icon: FileImageOutlined, color: "#52c41a" },
  { extensions: [".doc", ".docx"], icon: FileWordOutlined, color: "#1677ff" },
  { extensions: [".xls", ".xlsx", ".csv"], icon: FileExcelOutlined, color: "#389e0d" },
  { extensions: [".ppt", ".pptx"], icon: FilePptOutlined, color: "#fa8c16" },
  { extensions: [".zip", ".rar", ".7z"], icon: FileZipOutlined, color: "#8c8c8c" },
  { extensions: [".txt", ".rtf"], icon: FileTextOutlined, color: "#597ef7" },
];

const FileCell = styled.div`
  display: flex;
  min-width: 0;
  gap: 10px;
  align-items: center;
`;

const FileIcon = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  color: ${({ $color }) => $color};
  font-size: 24px;
`;

const FileInfo = styled.div`
  min-width: 0;
`;

const FileName = styled.div`
  overflow: hidden;
  color: #262626;
  font-weight: 500;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SecondaryText = styled.div`
  overflow: hidden;
  margin-top: 2px;
  color: #8c8c8c;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ValidityCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .ant-tag {
    margin-inline-end: 0;
  }
`;

const getDocumentVisual = (record) => {
  const extension = String(record?.dosyaUzanti || "").toLowerCase();
  return DOCUMENT_VISUALS.find((item) => item.extensions.includes(extension)) || { icon: FileOutlined, color: "#597ef7" };
};

const getDocumentStatus = (record, t) => {
  const hasExpiryDate = Boolean(record?.dosyaBitisTarih) && !String(record.dosyaBitisTarih).startsWith("0001-01-01");

  if (!hasExpiryDate) {
    return record?.dosyaTip
      ? { label: t("dosyaKartGecerli"), meta: t("dosyaKartSuresizBelge"), color: "success", hasExpiryDate: false }
      : { label: t("normal"), meta: t("dosyaKartSureTakibiYok"), color: undefined, hasExpiryDate: false };
  }

  const remainingDays = Number(record.kalanSure);
  const reminderDays = Number(record.dosyaHatirlatmaSuresi);

  if (Number.isFinite(remainingDays) && remainingDays < 0) {
    return { label: t("dosyaKartSuresiDoldu"), color: "error", hasExpiryDate: true };
  }

  if (record.dosyaHatirlat && Number.isFinite(remainingDays) && Number.isFinite(reminderDays) && reminderDays > 0 && remainingDays <= reminderDays) {
    return { label: t("yaklasiyor"), color: "warning", hasExpiryDate: true };
  }

  return { label: t("dosyaKartGecerli"), color: "success", hasExpiryDate: true };
};

const getDocumentId = (item) => item?.tbDosyaId ?? 0;

const getResponseItems = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return Array.isArray(response?.data?.list) ? response.data.list : [];
};

const normalizeReminder = (item) => ({
  ...item,
  key: item.tbDosyaId,
});

const DokumanHatirlatici = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const dataRef = useRef([]);
  const activeParameterRef = useRef("");
  const requestIdRef = useRef(0);

  const fetchData = useCallback(
    async (diff, targetPage, parameter) => {
      const currentData = dataRef.current;
      const setPointId = diff > 0 ? getDocumentId(currentData.at(-1)) : diff < 0 ? getDocumentId(currentData[0]) : 0;
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setLoading(true);

      try {
        const response = await GetDocumentReminderListService(setPointId, diff, parameter);

        if (requestId !== requestIdRef.current) {
          return;
        }

        const items = getResponseItems(response);
        const normalizedItems = items.map(normalizeReminder);
        dataRef.current = normalizedItems;
        setData(normalizedItems);
        setTotalCount(Number(response?.data?.recordCount) || 0);
        setCurrentPage(targetPage);
      } catch {
        if (requestId === requestIdRef.current) {
          dataRef.current = [];
          setData([]);
          setTotalCount(0);
          message.error(t("dokumanHatirlaticiListesiAlinamadi"));
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [t]
  );

  useEffect(() => {
    fetchData(0, 1, "");
  }, [fetchData]);

  const handleSearch = () => {
    const parameter = searchTerm.trim();
    activeParameterRef.current = parameter;
    fetchData(0, 1, parameter);
  };

  const columns = useMemo(
    () => [
      {
        title: t("dokumanKolonDosya"),
        dataIndex: "dosyaAd",
        key: "dosyaAd",
        width: 300,
        render: (fileName, record) => {
          const visual = getDocumentVisual(record);
          const DocumentIcon = visual.icon;
          const extension = String(record.dosyaUzanti || "")
            .replace(".", "")
            .toUpperCase();
          const documentMeta = record.dosyaBelgeNo ? `${t("belgeNo")}: ${record.dosyaBelgeNo}` : extension || "-";

          return (
            <FileCell>
              <FileIcon $color={visual.color}>
                <DocumentIcon />
              </FileIcon>
              <FileInfo>
                <Tooltip title={fileName} placement="topLeft">
                  <FileName>{fileName || "-"}</FileName>
                </Tooltip>
                <SecondaryText>{documentMeta}</SecondaryText>
              </FileInfo>
            </FileCell>
          );
        },
      },
      {
        title: t("dokumanKolonModul"),
        dataIndex: "dosyaRefGroup",
        key: "dosyaRefGroup",
        width: 140,
        render: (value) => value || "-",
      },
      {
        title: t("dokumanKolonBagliKayit"),
        dataIndex: "dosyaRefId",
        key: "dosyaRefId",
        width: 140,
        render: (value) => (Number(value) > 0 ? formatNumberWithLocale(value) : "-"),
      },
      {
        title: t("dokumanKolonBelgeTipi"),
        dataIndex: "dosyaTip",
        key: "dosyaTip",
        width: 180,
        render: (value) => value || "-",
      },
      {
        title: t("dokumanKolonGecerlilik"),
        key: "validity",
        width: 190,
        render: (_, record) => {
          const status = getDocumentStatus(record, t);
          const hasRemainingDays = status.hasExpiryDate && Number.isFinite(Number(record.kalanSure));

          return (
            <ValidityCell>
              <Tag color={status.color}>{status.label}</Tag>
              {status.hasExpiryDate ? (
                <SecondaryText>
                  {t("dosyaKartBitis")}: <FormattedDate date={record.dosyaBitisTarih} />
                </SecondaryText>
              ) : (
                <SecondaryText>{status.meta}</SecondaryText>
              )}
              {hasRemainingDays && (
                <SecondaryText>
                  {t("dosyaKartKalan")}: {formatNumberWithLocale(record.kalanSure)} {t("gun").toLocaleLowerCase()}
                </SecondaryText>
              )}
            </ValidityCell>
          );
        },
      },
      {
        title: t("dokumanKolonAciklama"),
        dataIndex: "dosyaAciklama",
        key: "dosyaAciklama",
        width: 240,
        ellipsis: true,
        render: (value) => (
          <Tooltip title={value} placement="topLeft">
            <Text type={value ? undefined : "secondary"}>{value || "-"}</Text>
          </Tooltip>
        ),
      },
      {
        title: t("dokumanKolonYukleyen"),
        dataIndex: "dosyaOlusturan",
        key: "dosyaOlusturan",
        width: 150,
        render: (value) => value || "-",
      },
    ],
    [t]
  );

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <Input
          allowClear
          value={searchTerm}
          prefix={<SearchOutlined />}
          placeholder={`${t("arama")}...`}
          onChange={(event) => setSearchTerm(event.target.value)}
          onPressEnter={handleSearch}
          style={{ maxWidth: 320 }}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} loading={loading}>
          {t("dokumanAra")}
        </Button>
      </div>

      <Table
        rowKey="key"
        columns={columns}
        dataSource={data}
        loading={loading}
        size="small"
        scroll={{ x: 1340, y: "calc(100vh - 430px)" }}
        locale={{ emptyText: t("dokumanKayitYok") }}
        pagination={{
          current: currentPage,
          pageSize: PAGE_SIZE,
          total: totalCount,
          showSizeChanger: false,
          onChange: (page) => fetchData(page - currentPage, page, activeParameterRef.current),
        }}
      />
    </>
  );
};

export default DokumanHatirlatici;

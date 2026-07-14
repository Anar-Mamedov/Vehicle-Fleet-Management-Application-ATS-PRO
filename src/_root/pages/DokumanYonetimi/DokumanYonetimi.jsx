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
  HomeOutlined,
  LeftOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import FormattedDate from "../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../hooks/FormattedNumber";
import { GetDocumentsListService } from "../../../api/services/upload/services";

const { Text } = Typography;

const DOCUMENT_VISUALS = [
  { extensions: [".pdf"], icon: FilePdfOutlined, color: "#ff4d4f" },
  { extensions: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"], icon: FileImageOutlined, color: "#52c41a" },
  { extensions: [".doc", ".docx"], icon: FileWordOutlined, color: "#1677ff" },
  { extensions: [".xls", ".xlsx", ".csv"], icon: FileExcelOutlined, color: "#389e0d" },
  { extensions: [".ppt", ".pptx"], icon: FilePptOutlined, color: "#fa8c16" },
  { extensions: [".zip", ".rar", ".7z"], icon: FileZipOutlined, color: "#8c8c8c" },
  { extensions: [".txt", ".rtf"], icon: FileTextOutlined, color: "#597ef7" },
];

const Page = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: 14px;
`;

const PageHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const TitleGroup = styled.div`
  min-width: 0;
`;

const PageTitle = styled.h1`
  margin: 0;
  color: #262626;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

const PageDescription = styled.p`
  margin: 4px 0 0;
  color: #8c8c8c;
  font-size: 13px;
  line-height: 20px;
`;

const ContentCard = styled.section`
  min-height: 0;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const Toolbar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media (max-width: 700px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const SearchGroup = styled.div`
  display: flex;
  width: min(100%, 620px);
  gap: 8px;

  .ant-input-affix-wrapper {
    flex: 1;
  }
`;

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

const PaginationBar = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
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

const getResponseItems = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  return Array.isArray(response?.data?.list) ? response.data.list : [];
};

const DokumanYonetimi = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const documentsRef = useRef([]);
  const activeParameterRef = useRef("");
  const requestIdRef = useRef(0);

  const loadDocuments = useCallback(
    async (diff, parameter) => {
      const currentItems = documentsRef.current;
      const setPointId = diff > 0 ? currentItems.at(-1)?.tbDosyaId || 0 : diff < 0 ? currentItems[0]?.tbDosyaId || 0 : 0;
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      setLoading(true);

      try {
        const response = await GetDocumentsListService(setPointId, diff, parameter);

        if (requestId !== requestIdRef.current) {
          return;
        }

        const items = getResponseItems(response);

        if (diff > 0 && items.length === 0) {
          setHasNextPage(false);
          return;
        }

        if (diff < 0 && items.length === 0) {
          return;
        }

        const firstCurrentId = currentItems[0]?.tbDosyaId;
        const firstNewId = items[0]?.tbDosyaId;
        if (diff !== 0 && firstCurrentId && firstCurrentId === firstNewId) {
          if (diff > 0) {
            setHasNextPage(false);
          }
          return;
        }

        const normalizedItems = items.map((item) => ({ ...item, key: item.tbDosyaId }));
        documentsRef.current = normalizedItems;
        setDocuments(normalizedItems);
        setCurrentPage((page) => (diff > 0 ? page + 1 : diff < 0 ? Math.max(1, page - 1) : 1));
        setHasNextPage(items.length > 0);
      } catch {
        if (requestId === requestIdRef.current) {
          message.error(t("dokumanListesiAlinamadi"));
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
    loadDocuments(0, "");
  }, [loadDocuments]);

  const handleSearch = () => {
    const parameter = searchTerm.trim();
    activeParameterRef.current = parameter;
    loadDocuments(0, parameter);
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

  const breadcrumbItems = useMemo(() => [{ href: "/", title: <HomeOutlined /> }, { title: t("yonetim") }, { title: t("dokumanYonetimi") }], [t]);

  return (
    <Page>
      <BreadcrumbComp items={breadcrumbItems} />

      <PageHeader>
        <TitleGroup>
          <PageTitle>{t("dokumanYonetimi")}</PageTitle>
          <PageDescription>{t("dokumanYonetimiAciklama")}</PageDescription>
        </TitleGroup>
      </PageHeader>

      <ContentCard>
        <Toolbar>
          <SearchGroup>
            <Input
              allowClear
              value={searchTerm}
              prefix={<SearchOutlined />}
              placeholder={t("dokumanAramaPlaceholder")}
              onChange={(event) => setSearchTerm(event.target.value)}
              onPressEnter={handleSearch}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} loading={loading}>
              {t("dokumanAra")}
            </Button>
          </SearchGroup>
          <Button icon={<ReloadOutlined />} onClick={() => loadDocuments(0, activeParameterRef.current)} disabled={loading}>
            {t("dokumanYenile")}
          </Button>
        </Toolbar>

        <Table
          rowKey="tbDosyaId"
          columns={columns}
          dataSource={documents}
          loading={loading}
          pagination={false}
          size="middle"
          scroll={{ x: 1340 }}
          locale={{ emptyText: t("dokumanKayitYok") }}
        />

        <PaginationBar>
          <Button icon={<LeftOutlined />} disabled={loading || currentPage === 1} onClick={() => loadDocuments(-1, activeParameterRef.current)}>
            {t("dokumanOnceki")}
          </Button>
          <Text>{t("dokumanSayfa", { page: formatNumberWithLocale(currentPage) })}</Text>
          <Button disabled={loading || !hasNextPage || documents.length === 0} onClick={() => loadDocuments(1, activeParameterRef.current)}>
            {t("dokumanSonraki")} <RightOutlined />
          </Button>
        </PaginationBar>
      </ContentCard>
    </Page>
  );
};

export default DokumanYonetimi;

import React, { useEffect, useRef, useState } from "react";
import { Upload, Spin, message, Button, Image, Dropdown, Modal } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AxiosInstance from "../../../api/http";
import { formatDateByLocale } from "../FormattedDate";
import DocumentDetailModal from "./DocumentDetailModal";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"];
const IMAGE_PREVIEW_Z_INDEX = 2000;
const DOCUMENT_VISUALS = [
  { extensions: [".pdf"], icon: FilePdfOutlined, color: "#ff4d4f" },
  { extensions: IMAGE_EXTENSIONS, icon: FileImageOutlined, color: "#52c41a" },
  { extensions: [".doc", ".docx"], icon: FileWordOutlined, color: "#1677ff" },
  { extensions: [".xls", ".xlsx", ".csv"], icon: FileExcelOutlined, color: "#389e0d" },
  { extensions: [".ppt", ".pptx"], icon: FilePptOutlined, color: "#fa8c16" },
  { extensions: [".zip", ".rar", ".7z"], icon: FileZipOutlined, color: "#8c8c8c" },
  { extensions: [".txt", ".rtf"], icon: FileTextOutlined, color: "#597ef7" },
];

const STATUS_COLORS = {
  expired: { color: "#ff4d4f", background: "#fff1f0" },
  approaching: { color: "#fa8c16", background: "#fff7e6" },
  valid: { color: "#52c41a", background: "#f6ffed" },
  normal: { color: "#8c8c8c", background: "#f5f5f5" },
};

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 460px), 1fr));
  gap: 14px;
  margin-bottom: 24px;
`;

const FileCard = styled.div`
  position: relative;
  min-width: 0;
  min-height: 124px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: #b7dfe8;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  }
`;

const FileOpenButton = styled.button`
  display: flex;
  width: 100%;
  min-height: 122px;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 48px 18px 18px;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;

  &:focus-visible {
    outline: 2px solid #13a8c0;
    outline-offset: -2px;
  }
`;

const FileIcon = styled.span`
  flex: 0 0 auto;
  margin-top: 2px;
  color: ${({ $color }) => $color};
  font-size: 36px;
  line-height: 1;
`;

const FileInfo = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  align-self: stretch;
`;

const FileName = styled.span`
  overflow: hidden;
  color: #262626;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileType = styled.span`
  margin-top: 4px;
  overflow: hidden;
  color: #595959;
  font-size: 13px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileFooter = styled.span`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 14px;
`;

const FileMeta = styled.span`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 8px 28px;
  color: #595959;
  font-size: 12px;
  line-height: 18px;
`;

const RemainingTime = styled.span`
  color: ${({ $status }) => STATUS_COLORS[$status].color};
  font-weight: 600;
`;

const StatusBadge = styled.span`
  flex: 0 0 auto;
  padding: 5px 10px;
  color: ${({ $status }) => STATUS_COLORS[$status].color};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  background: ${({ $status }) => STATUS_COLORS[$status].background};
  border-radius: 4px;
`;

const FileAction = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
`;

const DosyaUpload = ({ selectedRowID, setDosyaUploaded, setFileCount, refGroup }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const [dosyalar, setDosyalar] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewCurrent, setPreviewCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [detailFile, setDetailFile] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const imagePreviewUrlsRef = useRef([]);

  // Form'dan "kapali" değerini izliyoruz
  const kapali = watch("kapali");

  const normalizeExtension = (extension) => {
    if (!extension) return "";
    const trimmed = String(extension).trim().toLowerCase();
    if (!trimmed) return "";
    return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
  };

  const extractExtensionFromName = (fileName) => {
    if (!fileName) return "";
    const lowerName = String(fileName).toLowerCase();
    const extensionIndex = lowerName.lastIndexOf(".");
    if (extensionIndex < 0) return "";
    return lowerName.slice(extensionIndex);
  };

  const getFileExtension = (file) => {
    const extensionFromField = normalizeExtension(file?.dosyaUzanti);
    if (extensionFromField) return extensionFromField;
    return extractExtensionFromName(file?.dosyaAd);
  };

  const getDocumentVisual = (file) => {
    const extension = getFileExtension(file);
    return DOCUMENT_VISUALS.find((visual) => visual.extensions.includes(extension)) || { icon: FileOutlined, color: "#6269b0" };
  };

  const getDocumentStatus = (file) => {
    const hasExpiryDate = Boolean(file?.dosyaBitisTarih) && !String(file.dosyaBitisTarih).startsWith("0001-01-01");

    if (!hasExpiryDate) {
      if (file?.dosyaTip) {
        return {
          hasExpiryDate: false,
          meta: t("dosyaKartSuresizBelge"),
          label: t("dosyaKartGecerli"),
          status: "valid",
        };
      }

      return {
        hasExpiryDate: false,
        meta: t("dosyaKartSureTakibiYok"),
        label: t("normal"),
        status: "normal",
      };
    }

    const remainingDays = Number(file.kalanSure);
    const hasRemainingDays = Number.isFinite(remainingDays);
    const reminderDays = Number(file.dosyaHatirlatmaSuresi);

    if (hasRemainingDays && remainingDays < 0) {
      return {
        hasExpiryDate: true,
        hasRemainingDays,
        label: t("dosyaKartSuresiDoldu"),
        remainingDays,
        status: "expired",
      };
    }

    if (file.dosyaHatirlat && hasRemainingDays && Number.isFinite(reminderDays) && reminderDays > 0 && remainingDays <= reminderDays) {
      return {
        hasExpiryDate: true,
        hasRemainingDays,
        label: t("yaklasiyor"),
        remainingDays,
        status: "approaching",
      };
    }

    return {
      hasExpiryDate: true,
      hasRemainingDays,
      label: t("dosyaKartGecerli"),
      remainingDays,
      status: "valid",
    };
  };

  const isPdfFile = (file) => getFileExtension(file) === ".pdf";

  const isImageFile = (file) => {
    const extension = getFileExtension(file);
    return IMAGE_EXTENSIONS.includes(extension);
  };

  const updateImagePreviews = (previews) => {
    imagePreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    imagePreviewUrlsRef.current = previews.map((item) => item.url);
    setImagePreviews(previews);
  };

  const fetchImagePreviews = async (files) => {
    const imageFiles = files.filter(isImageFile);
    if (!imageFiles.length) {
      updateImagePreviews([]);
      return;
    }

    try {
      const previews = await Promise.all(
        imageFiles.map(async (file) => {
          const body = {
            fileId: file.tbDosyaId,
            extension: file.dosyaUzanti,
            fileName: file.dosyaAd,
          };

          const response = await AxiosInstance.post("Document/DownloadDocumentById", body, {
            responseType: "blob",
          });

          return {
            tbDosyaId: file.tbDosyaId,
            dosyaAd: file.dosyaAd,
            url: URL.createObjectURL(response.data),
          };
        })
      );

      updateImagePreviews(previews);
    } catch (error) {
      console.error("Resim önizleme hazırlanırken bir hata oluştu:", error);
      updateImagePreviews([]);
    }
  };

  // 1) API'den gelen dosya listesini çekme
  const fetchDosyaIds = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`Document/GetDocumentsByRefGroup?refId=${selectedRowID}&refGroup=${refGroup}`);
      const files = Array.isArray(response.data) ? response.data : [];
      setDosyalar(files);
      if (setFileCount) {
        setFileCount(files.length);
      }
      await fetchImagePreviews(files);
    } catch (error) {
      console.error("Dosya listesi alınırken bir hata oluştu:", error);
      message.error("Dosyalar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // 2) Bileşen yüklendiğinde veya selectedRowID değiştiğinde dosya listesini getir
  useEffect(() => {
    if (selectedRowID) {
      fetchDosyaIds();
    }
  }, [selectedRowID]);

  useEffect(() => {
    return () => {
      imagePreviewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const downloadDocumentBlob = async (file) => {
    const extension = getFileExtension(file);
    const requestBodies = [{ fileId: file.tbDosyaId, extension, fileName: file.dosyaAd }, { fileId: file.tbDosyaId, extension }, { fileId: file.tbDosyaId }];
    let lastError = null;

    for (const body of requestBodies) {
      try {
        const response = await AxiosInstance.post("Document/DownloadDocumentById", body, {
          responseType: "blob",
        });
        return response.data;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };

  // 3) Dosyayı indirme/açma fonksiyonu
  const handleDownloadFile = async (file, pdfWindow = null, forceDownload = false) => {
    try {
      const fileBlob = await downloadDocumentBlob(file);
      if (isPdfFile(file) && !forceDownload) {
        const blobUrl = URL.createObjectURL(new Blob([fileBlob], { type: "application/pdf" }));
        if (pdfWindow && !pdfWindow.closed) {
          pdfWindow.location.href = blobUrl;
        } else {
          window.open(blobUrl, "_blank");
        }
      } else {
        const downloadURL = URL.createObjectURL(fileBlob);
        const link = document.createElement("a");
        link.href = downloadURL;
        link.setAttribute("download", file.dosyaAd);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadURL);
      }
    } catch (error) {
      if (pdfWindow && !pdfWindow.closed) {
        pdfWindow.close();
      }
      console.error("Dosya indirme hatası:", error);
      message.error("Dosya indirilirken bir hata oluştu.");
    }
  };

  const handleFileClick = (file) => {
    if (isImageFile(file) && imagePreviews.length > 0) {
      const selectedImageIndex = imagePreviews.findIndex((image) => image.tbDosyaId === file.tbDosyaId);
      if (selectedImageIndex > -1) {
        setPreviewCurrent(selectedImageIndex);
        setPreviewVisible(true);
        return;
      }
    }

    if (isPdfFile(file)) {
      const pdfWindow = window.open("about:blank", "_blank");
      handleDownloadFile(file, pdfWindow);
      return;
    }

    handleDownloadFile(file);
  };

  // 4) Dosya silme fonksiyonu
  const handleDeleteFile = async (file) => {
    try {
      setDeleting(true);
      await AxiosInstance.get(`Document/DeleteDocumentById?id=${file.tbDosyaId}`);
      message.success(`${file.dosyaAd} başarıyla silindi.`);
      fetchDosyaIds(); // Silme işlemi tamamlanınca listeyi güncelle
      // setFileCount((prev) => prev - 1);
    } catch (error) {
      console.error("Dosya silme hatası:", error);
      message.error("Dosya silinirken bir hata oluştu.");
    } finally {
      setDeleting(false);
    }
  };

  const confirmDeleteFile = (file) => {
    Modal.confirm({
      title: t("dosyaKartSil"),
      content: t("dosyaKartSilmeOnayi"),
      okText: t("dosyaKartEvet"),
      cancelText: t("dosyaKartHayir"),
      okButtonProps: { danger: true },
      onOk: () => handleDeleteFile(file),
    });
  };

  const openDetailModal = (file) => {
    setDetailFile(file);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setDetailFile(null);
  };

  const handleFileMenuClick = (key, file) => {
    if (key === "preview") {
      handleFileClick(file);
      return;
    }

    if (key === "download") {
      handleDownloadFile(file, null, true);
      return;
    }

    if (key === "delete") {
      confirmDeleteFile(file);
      return;
    }

    if (key === "details") {
      openDetailModal(file);
    }
  };

  const getFileMenuItems = () => [
    {
      key: "preview",
      icon: <EyeOutlined />,
      label: t("dosyaMenuGoruntule"),
    },
    {
      key: "download",
      icon: <DownloadOutlined />,
      label: t("indir"),
    },
    ...(!kapali
      ? [
          {
            key: "delete",
            danger: true,
            icon: <DeleteOutlined />,
            label: t("dosyaMenuSil"),
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      key: "details",
      icon: <InfoCircleOutlined />,
      label: t("dosyaMenuDetayBilgiler"),
    },
  ];

  // 5) Dosya yükleme fonksiyonu
  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("documents", file);
    /* formData.append("name", file.name); */

    AxiosInstance.post(`Document/UploadDocument?refId=${selectedRowID}&refGroup=${refGroup}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        message.success(`${file.name} başarıyla yüklendi.`);
        fetchDosyaIds(); // Yükleme tamamlanınca listeyi güncelle
        // setFileCount((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Dosya yükleme sırasında bir hata oluştu:", error);
        message.error(`${file.name} yükleme sırasında bir hata oluştu.`);
      });

    return false; // Ant Design Upload'ın kendi otomatik yükleme davranışını engelliyoruz
  };

  // 6) Dragger props
  const draggerProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
  };

  return (
    <div style={{ marginBottom: "35px" }}>
      {imagePreviews.length > 0 && (
        <div style={{ display: "none" }}>
          <Image.PreviewGroup
            preview={{
              visible: previewVisible,
              current: previewCurrent,
              zIndex: IMAGE_PREVIEW_Z_INDEX,
              onVisibleChange: (visible) => setPreviewVisible(visible),
              onChange: (current) => setPreviewCurrent(current),
            }}
          >
            {imagePreviews.map((image) => (
              <Image key={image.tbDosyaId} src={image.url} alt={image.dosyaAd} />
            ))}
          </Image.PreviewGroup>
        </div>
      )}

      {loading || deleting ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Spin />
        </div>
      ) : (
        <FileGrid>
          {dosyalar && dosyalar.length > 0 ? (
            dosyalar.map((file) => {
              const visual = getDocumentVisual(file);
              const status = getDocumentStatus(file);
              const DocumentIcon = visual.icon;

              return (
                <FileCard key={file.tbDosyaId}>
                  <FileOpenButton type="button" onClick={() => openDetailModal(file)} title={file.dosyaAd}>
                    <FileIcon $color={visual.color}>
                      <DocumentIcon />
                    </FileIcon>
                    <FileInfo>
                      <FileName>{file.dosyaAd}</FileName>
                      <FileType>{file.dosyaTip || t("dosyaKartNormalBelge")}</FileType>
                      <FileFooter>
                        {status.hasExpiryDate ? (
                          <FileMeta>
                            <span>
                              {t("dosyaKartBitis")}: {formatDateByLocale(file.dosyaBitisTarih)}
                            </span>
                            {status.hasRemainingDays && (
                              <span>
                                {t("dosyaKartKalan")}:{" "}
                                <RemainingTime $status={status.status}>
                                  {status.remainingDays} {t("gun").toLocaleLowerCase()}
                                </RemainingTime>
                              </span>
                            )}
                          </FileMeta>
                        ) : (
                          <FileMeta>{status.meta}</FileMeta>
                        )}
                        <StatusBadge $status={status.status}>{status.label}</StatusBadge>
                      </FileFooter>
                    </FileInfo>
                  </FileOpenButton>
                  <FileAction>
                    <Dropdown
                      trigger={["click"]}
                      placement="bottomRight"
                      menu={{
                        items: getFileMenuItems(),
                        onClick: ({ key }) => handleFileMenuClick(key, file),
                      }}
                    >
                      <Button type="text" icon={<MoreOutlined />} size="small" onClick={(event) => event.stopPropagation()} />
                    </Dropdown>
                  </FileAction>
                </FileCard>
              );
            })
          ) : (
            <div>{t("dosyaKartBos")}</div>
          )}
        </FileGrid>
      )}

      {/* 8) Dosya Yükleme Alanı */}
      <Upload.Dragger disabled={kapali} {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Tıklayın veya bu alana dosya sürükleyin</p>
        <p className="ant-upload-hint">Tek seferde bir veya birden fazla dosya yüklemeyi destekler.</p>
      </Upload.Dragger>

      <DocumentDetailModal
        open={detailModalOpen}
        file={detailFile}
        visual={detailFile ? getDocumentVisual(detailFile) : null}
        onClose={closeDetailModal}
        onPreview={handleFileClick}
        onDownload={(file) => handleDownloadFile(file, null, true)}
        onUpdated={fetchDosyaIds}
      />
    </div>
  );
};

export default DosyaUpload;

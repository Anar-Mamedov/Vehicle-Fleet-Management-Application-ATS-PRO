import React, { useEffect, useRef, useState } from "react";
import { Upload, Spin, message, Button, Popconfirm, Image } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../api/http";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

const DosyaUpload = ({ selectedRowID, setDosyaUploaded, setFileCount }) => {
  const { watch } = useFormContext();
  const [dosyalar, setDosyalar] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewCurrent, setPreviewCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
      const response = await AxiosInstance.get(`Document/GetDocumentsByRefGroup?refId=${selectedRowID}&refGroup=Arac`);
      const files = Array.isArray(response.data) ? response.data : [];
      setDosyalar(files);
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
    const requestBodies = [
      { fileId: file.tbDosyaId, extension, fileName: file.dosyaAd },
      { fileId: file.tbDosyaId, extension },
      { fileId: file.tbDosyaId },
    ];
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
  const handleDownloadFile = async (file, pdfWindow = null) => {
    try {
      const fileBlob = await downloadDocumentBlob(file);
      if (isPdfFile(file)) {
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
  const handleDeleteFile = async (file, event) => {
    // Tıklama olayının yayılmasını engelle (indirme fonksiyonunun tetiklenmemesi için)
    event.stopPropagation();

    try {
      setDeleting(true);
      await AxiosInstance.get(`Document/DeleteDocumentById?id=${file.tbDosyaId}`);
      message.success(`${file.dosyaAd} başarıyla silindi.`);
      fetchDosyaIds(); // Silme işlemi tamamlanınca listeyi güncelle
      setFileCount((prev) => prev - 1);
    } catch (error) {
      console.error("Dosya silme hatası:", error);
      message.error("Dosya silinirken bir hata oluştu.");
    } finally {
      setDeleting(false);
    }
  };

  // 5) Dosya yükleme fonksiyonu
  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("documents", file);
    /* formData.append("name", file.name); */

    AxiosInstance.post(`Document/UploadDocument?refId=${selectedRowID}&refGroup=Arac`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        message.success(`${file.name} başarıyla yüklendi.`);
        fetchDosyaIds(); // Yükleme tamamlanınca listeyi güncelle
        setFileCount((prev) => prev + 1);
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
        // 7) Her dosya için bir div oluşturuyoruz
        <div style={{ marginBottom: 20, display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {dosyalar && dosyalar.length > 0 ? (
            dosyalar.map((file) => (
              <div
                key={file.tbDosyaId}
                onClick={() => handleFileClick(file)}
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "fit-content",
                  backgroundColor: "#f5f5f5",
                  margin: "8px 0",
                  padding: "12px",
                  borderRadius: "4px",
                }}
              >
                <span style={{ marginRight: "10px" }}>{file.dosyaAd}</span>
                {!kapali && (
                  <Popconfirm
                    title="Dosyayı sil"
                    description="Bu dosyayı silmek istediğinizden emin misiniz?"
                    onConfirm={(e) => handleDeleteFile(file, e)}
                    okText="Evet"
                    cancelText="Hayır"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button type="text" danger icon={<DeleteOutlined />} size="small" onClick={(e) => e.stopPropagation()} />
                  </Popconfirm>
                )}
              </div>
            ))
          ) : (
            <div>Henüz bir dosya yüklenmemiş.</div>
          )}
        </div>
      )}

      {/* 8) Dosya Yükleme Alanı */}
      <Upload.Dragger disabled={kapali} {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Tıklayın veya bu alana dosya sürükleyin</p>
        <p className="ant-upload-hint">Tek seferde bir veya birden fazla dosya yüklemeyi destekler.</p>
      </Upload.Dragger>
    </div>
  );
};

export default DosyaUpload;

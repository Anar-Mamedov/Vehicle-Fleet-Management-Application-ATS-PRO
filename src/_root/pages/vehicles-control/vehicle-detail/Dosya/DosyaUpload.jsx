import React, { useEffect, useState } from "react";
import { Upload, Spin, message, Button, Popconfirm } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../api/http";

const DosyaUpload = ({ selectedRowID, setDosyaUploaded, setFileCount }) => {
  const { watch } = useFormContext();
  const [dosyalar, setDosyalar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form'dan "kapali" değerini izliyoruz
  const kapali = watch("kapali");

  // 1) API'den gelen dosya listesini çekme
  const fetchDosyaIds = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`Document/GetDocumentsByRefGroup?refId=${selectedRowID}&refGroup=Arac`);
      setDosyalar(response.data);
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

  // 3) Dosyayı indirme fonksiyonu
  const handleDownloadFile = async (file) => {
    try {
      const body = {
        fileId: file.tbDosyaId,
        extension: file.dosyaUzanti,
        fileName: file.dosyaAd,
      };

      const response = await AxiosInstance.post("Document/DownloadDocumentById", body, {
        responseType: "blob", // blob olarak çekiyoruz
      });

      const downloadURL = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = downloadURL;
      link.setAttribute("download", file.dosyaAd);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(downloadURL);
    } catch (error) {
      console.error("Dosya indirme hatası:", error);
      message.error("Dosya indirilirken bir hata oluştu.");
    }
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
                onClick={() => handleDownloadFile(file)}
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

import React, { useEffect, useState } from "react";
import { Image, Spin, Upload, message, Button, Popconfirm } from "antd";
import { InboxOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../api/http";

const ResimUpload = ({ selectedRowID, setPhotoUploaded, setPhotoCount }) => {
  const { watch } = useFormContext();
  const [imageUrls, setImageUrls] = useState([]);
  const [resimData, setResimData] = useState([]); // Store the full image data including IDs
  const [loadingImages, setLoadingImages] = useState(false);
  const [deletingImageIndex, setDeletingImageIndex] = useState(null); // Track which image is being deleted
  const [refreshImages, setRefreshImages] = useState(false); // Resim listesini yenilemek için kullanılacak
  const secilenIsEmriID = watch("secilenIsEmriID");

  // Watch the 'kapali' field from the form
  const kapali = watch("kapali"); // Assuming 'kapali' is the name of the field in your form

  const fetchResimIds = async () => {
    try {
      setLoadingImages(true);

      const response = await AxiosInstance.get(`Photo/GetPhotosByRefGroup?refId=${selectedRowID}&refGroup=Arac`);
      const resimIDler = response.data; // API'den gelen verileri alıyoruz
      setResimData(resimIDler); // Store the full image data

      const urls = await Promise.all(
        resimIDler.map(async (resim) => {
          const resimResponse = await AxiosInstance.post(
            `Photo/DownloadPhotoById`,
            {
              photoId: resim.tbResimId,
              extension: resim.rsmUzanti,
              fileName: resim.rsmAd,
            },
            {
              responseType: "blob",
            }
          );
          return URL.createObjectURL(resimResponse.data); // Axios response objesinden blob data alınır
        })
      );
      setImageUrls(urls);
    } catch (error) {
      console.error("Resim ID'leri alınırken bir hata oluştu:", error);
      message.error("Resimler yüklenirken bir hata oluştu.");
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    if (selectedRowID) {
      fetchResimIds();
    }
  }, [selectedRowID, refreshImages]); // refreshImages değişikliklerini de takip eder

  const handleDeletePhoto = async (index) => {
    try {
      setDeletingImageIndex(index); // Set the deleting state for this image

      if (!resimData[index] || !resimData[index].tbResimId) {
        throw new Error("Fotoğraf ID'si bulunamadı");
      }

      const photoId = resimData[index].tbResimId;
      const response = await AxiosInstance.get(`Photo/DeletePhotoById?id=${photoId}`);

      // Check if the response indicates success
      if (response && response.data && response.data.success === false) {
        throw new Error(response.data.message || "Silme işlemi başarısız oldu");
      }

      message.success("Fotoğraf başarıyla silindi.");
      setRefreshImages((prev) => !prev); // Refresh the image list after deletion
      setPhotoUploaded((prev) => prev + 1); // Decrement the photo count
      setPhotoCount((prev) => prev - 1);
    } catch (error) {
      console.error("Fotoğraf silinirken bir hata oluştu:", error);
      message.error(error.message || "Fotoğraf silinirken bir hata oluştu.");
    } finally {
      setDeletingImageIndex(null); // Clear the deleting state
    }
  };

  const draggerProps = {
    name: "images",
    multiple: true,
    showUploadList: false,
    beforeUpload: (file) => {
      const formData = new FormData();
      formData.append("images", file);
      AxiosInstance.post(`Photo/UploadPhoto?refId=${selectedRowID}&refGroup=ARAC`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          message.success(`${file.name} başarıyla yüklendi.`);
          setRefreshImages((prev) => !prev); // Başarılı yüklemeden sonra resim listesini yenile
          setPhotoUploaded((prev) => prev + 1);
          setPhotoCount((prev) => prev + 1);
        })
        .catch(() => {
          message.error(`${file.name} yükleme sırasında bir hata oluştu.`);
        });

      return false; // Yükleme işleminin varsayılan davranışını engeller
    },
    onDrop: (e) => {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      {loadingImages ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Spin />
        </div>
      ) : (
        imageUrls.map((url, index) => (
          <div key={index} style={{ position: "relative", display: "inline-block", margin: "10px" }}>
            <Image
              style={{
                height: "150px",
                width: "150px",
                objectFit: "cover",
              }}
              src={url}
              fallback={<UserOutlined />}
              preview={{ mask: deletingImageIndex === index ? <Spin /> : undefined }}
            />
            {!kapali && deletingImageIndex !== index && (
              <Popconfirm title="Bu fotoğrafı silmek istediğinizden emin misiniz?" onConfirm={() => handleDeletePhoto(index)} okText="Evet" cancelText="Hayır">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "rgba(255, 255, 255, 0.7)",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}
                />
              </Popconfirm>
            )}
            {deletingImageIndex === index && (
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "rgba(0,0,0,0.5)",
                }}
              >
                <Spin />
              </div>
            )}
          </div>
        ))
      )}
      <Upload.Dragger
        disabled={kapali} // Disable the upload component based on the value of 'kapali'
        {...draggerProps}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Tıklayın veya bu alana dosya sürükleyin</p>
        <p className="ant-upload-hint">
          Tek seferde bir veya birden fazla dosya yüklemeyi destekler. Şirket verileri veya diğer yasaklı dosyaların yüklenmesi kesinlikle yasaktır.
        </p>
      </Upload.Dragger>
    </div>
  );
};

export default ResimUpload;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DownloadPhotoByIdService } from "../../../api/services/upload/services";
import { InboxOutlined, UserOutlined, LoadingOutlined } from "@ant-design/icons";
import { Image, message, Spin, Upload, ConfigProvider } from "antd";
import trTR from "antd/es/locale/tr_TR";
import enUS from "antd/es/locale/en_US";
import ruRU from "antd/es/locale/ru_RU";
import azAZ from "antd/es/locale/az_AZ";

const PhotoUpload = ({ imageUrls, loadingImages, setImages }) => {
  const [imagesArr, setImagesArr] = useState([]);
  const [locale, setLocale] = useState(trTR); // Default locale

  useEffect(() => {
    // Retrieve the language code from localStorage
    const language = localStorage.getItem("i18nextLng");

    // Map the language code to the corresponding antd locale object
    const localeMap = {
      tr: trTR,
      en: enUS,
      ru: ruRU,
      az: azAZ,
      // Add other mappings as needed
    };

    // Set the locale based on the retrieved language code
    if (language && localeMap[language]) {
      setLocale(localeMap[language]);
    }

    const fetchImages = async () => {
      try {
        const requests = imageUrls.map((img) => {
          const data = {
            photoId: img.tbResimId,
            extension: img.rsmUzanti,
            fileName: img.rsmAd,
          };
          return DownloadPhotoByIdService(data);
        });

        const responses = await Promise.all(requests);
        const objectUrls = responses.map((response) => URL.createObjectURL(response.data));

        setImagesArr(objectUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    return () => {
      imagesArr.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("images", file);
    setImages(formData);
  };

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  return (
    <ConfigProvider locale={locale}>
      {loadingImages ? (
        <div className="flex gap-1">
          {imagesArr.map((url, i) => {
            return (
              <div key={i} className="border p-10 mb-10">
                <div style={{ margin: "10px", height: "150px", width: "150px", objectFit: "cover", position: "relative" }}>
                  <Spin spinning={true} indicator={customIcon}></Spin>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-1">
          {imagesArr.map((url, i) => {
            return (
              <div key={i} className="border p-10 mb-10">
                <Image style={{ margin: "10px", height: "150px", width: "150px", objectFit: "cover" }} src={typeof url === "string" ? url : ""} fallback={<UserOutlined />} />
              </div>
            );
          })}
        </div>
      )}

      <Upload.Dragger
        accept=".png,.jpg,.jpeg"
        listType="picture"
        className="upload-list-inline"
        beforeUpload={(file) => {
          const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
          const isLt2M = file.size / 1024 / 1024 < 2; // Limiting file size to 2MB

          if (!isImage) {
            message.error("You can only upload PNG, JPG, or JPEG files!");
          }

          if (!isLt2M) {
            message.error("Image must be smaller than 2MB!");
          }

          if (isImage && isLt2M) {
            handleUpload(file);
          }

          handleUpload(file);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Tıklayın veya bu alana resim sürükleyin</p>
        <p className="ant-upload-hint">
          Tek seferde bir veya birden fazla resim yüklemeyi destekler. Şirket verileri veya diğer yasaklı resimlerin yüklenmesi kesinlikle yasaktır.
        </p>
      </Upload.Dragger>
    </ConfigProvider>
  );
};

PhotoUpload.propTypes = {
  imageUrls: PropTypes.array,
  setImages: PropTypes.func,
  loadingImages: PropTypes.bool,
};

export default PhotoUpload;

import { useState, useEffect } from "react";
import { Upload, ConfigProvider, message } from "antd";
import ImgCrop from "antd-img-crop";
import { FaDownload } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";
import enUS from "antd/lib/locale/en_US";
import { t } from "i18next";

const customLocale = {
  ...enUS,
  Modal: {
    ...enUS.Modal,
    okText: t("yukle"),
    cancelText: t("kapat"),
  },
};

const ProfilePhoto = ({ urls, setImages }) => {
  const [fileList, setFileList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        if (urls[0]) {
          const requests = urls.map((img) => {
            const data = {
              photoId: img.tbResimId,
              extension: img.rsmUzanti,
              fileName: img.rsmAd,
            };
            return DownloadPhotoByIdService(data);
          });
          const responses = await Promise.all(requests);
          const objectUrls = responses.map((response) => ({
            uid: response.data.photoId,
            url: URL.createObjectURL(response.data),
            name: response.data.fileName,
          }));
          setFileList(objectUrls);
          setProfileImage(objectUrls[0]?.url);
        } else {
          setFileList([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [urls]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const formData = new FormData();
    formData.append("images", file);
    setImages(formData);
    return isJpgOrPng;
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(newFileList[newFileList.length - 1].originFileObj);
    }
  };

  return (
    <ConfigProvider locale={customLocale}>
      <div
        className="profile border"
        style={{ height: "90%", position: "relative" }}
      >
        {fileList[fileList.length - 1]?.name || urls[0]?.tbResimId ? (
          <img
            src={profileImage}
            alt="Profile"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaRegFileImage style={{ fontSize: "40px" }} />
          </div>
        )}
        <ImgCrop modalTitle="Resmi Düzenle" aspect={16 / 9}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={beforeUpload}
            showUploadList={false}
          >
            <FaDownload />
          </Upload>
        </ImgCrop>
      </div>
    </ConfigProvider>
  );
};

export default ProfilePhoto;

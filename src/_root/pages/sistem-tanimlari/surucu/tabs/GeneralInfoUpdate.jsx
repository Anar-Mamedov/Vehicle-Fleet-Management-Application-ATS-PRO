import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";
import Location from "../../../../components/form/tree/Location";
import ValidationInput from "../../../../components/form/inputs/ValidationInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";

const GeneralInfoUpdate = ({ isValid, setImages, urls }) => {
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

  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  return (
    <>
      <div className="grid gap-2 border p-20">
        <div className="col-span-8">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("surucuKod")}</label>
                <ValidationInput name="surucuKod" style={validateStyle} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aktif")}</label>
                <CheckboxInput name="aktif" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("surucuIsmi")}</label>
                <TextInput name="isim" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("lokasyon")}</label>
                <Location />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("departman")}</label>
                <CodeControl name="departman" codeName="departmanKodId" id={200} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("surucuTip")}</label>
                <CodeControl name="surucuTip" codeName="surucuTipKodId" id={502} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("gorev")}</label>
                <CodeControl name="gorev" codeName="gorevKodId" id={503} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("unvan")}</label>
                <TextInput name="adres" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("sehir")}</label>
                <TextInput name="il" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("ilce")}</label>
                <TextInput name="ilce" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("telefon")} 1</label>
                <TextInput name="telefon1" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("fax")}</label>
                <TextInput name="fax" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("telefon")} 2</label>
                <TextInput name="telefon2" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("gsm")}</label>
                <TextInput name="gsm" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("cezaPuani")}</label>
                <NumberInput name="cezaPuani" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("mobilSifre")}</label>
                <TextInput name="sifre" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-2 align-center justify-evenly h-full">
            <img src={profileImage || "/default-profile-image.png"} alt="Profile" style={{ width: "60%", height: "60%" }} />
            <ImgCrop>
              <Upload listType="picture-card" fileList={fileList} onChange={onChange} beforeUpload={beforeUpload} showUploadList={false}>
                Resim yukle
              </Upload>
            </ImgCrop>
          </div>
        </div>
        <div className="col-span-12">
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="aciklama" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

GeneralInfoUpdate.propTypes = {
  isValid: PropTypes.string,
  setImages: PropTypes.func,
  images: PropTypes.array,
};

export default GeneralInfoUpdate;

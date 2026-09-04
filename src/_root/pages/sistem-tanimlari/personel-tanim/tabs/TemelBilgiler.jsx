import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Avatar, Button, Divider, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";
import LokasyonTablo from "../../../../components/form/LokasyonTable";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import ModalInput from "../../../../components/form/inputs/ModalInput";
import ValidationInput from "../../../../components/form/inputs/ValidationInput";
import SelectInput from "../../../../components/form/selects/SelectInput";
import SwitchInput from "../../../../components/form/checkbox/SwitchInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import DateInput from "../../../../components/form/date/DateInput";
import FormField from "../components/FormField";
import { cardStyle, hintStyle, labelStyle } from "../components/uiStyles";

// Personel kod listelerinin backend'deki kod numaraları
const DEPARTMAN_KOD_ID = 200;
const UNVAN_KOD_ID = 500;
const PERSONEL_TIP_KOD_ID = 501;
const GOREV_KOD_ID = 503;
const UZMANLIK_ALANI_KOD_ID = 921;

// Ekleme ekranında henüz kayıtlı fotoğraf olmadığı için sabit bir boş dizi kullanılır (her render'da yeni referans oluşmasın)
const NO_PHOTOS = [];

const TemelBilgiler = ({ isValid, setImages, urls = NO_PHOTOS }) => {
  const [fileList, setFileList] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const { setValue } = useFormContext();

  const durumOptions = [
    { value: true, label: t("aktif") },
    { value: false, label: t("pasif") },
  ];

  const handleLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };

  const handleLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonId", null);
  };

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
          // Fotoğrafı olmayan bir personele geçildiğinde önceki kaydın fotoğrafı ekranda kalmamalı
          setFileList([]);
          setProfileImage(null);
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
      message.error(t("sadeceJpgPngYuklenebilir"));
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
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : undefined,
  };

  return (
    <div style={cardStyle}>
      <div className="grid gap-2">
        <div className="col-span-8">
          <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
            <FormField span={6} label={t("personelKod")} required>
              <ValidationInput name="personelKod" style={validateStyle} />
            </FormField>

            <FormField span={6} label={t("personelIsmi")} required>
              <TextInput name="isim" required />
            </FormField>

            <FormField span={6} label={t("durum")}>
              <SelectInput name="aktif" options={durumOptions} allowClear={false} />
            </FormField>

            <FormField span={6} label={t("lokasyon")}>
              <ModalInput name="lokasyon" readonly={true} onPlusClick={handleLokasyonPlusClick} onMinusClick={handleLokasyonMinusClick} />
              <LokasyonTablo
                isModalVisible={isLokasyonModalOpen}
                setIsModalVisible={setIsLokasyonModalOpen}
                onSubmit={(selectedData) => {
                  setValue("lokasyon", selectedData.location);
                  setValue("lokasyonId", selectedData.key);
                }}
              />
            </FormField>

            <FormField span={6} label={t("departman")}>
              <KodIDSelectbox name1="departman" kodID={DEPARTMAN_KOD_ID} inputWidth="100%" />
            </FormField>

            <FormField span={6} label={t("personelTipi")}>
              <KodIDSelectbox name1="personelTipi" kodID={PERSONEL_TIP_KOD_ID} inputWidth="100%" />
            </FormField>

            <FormField span={6} label={t("unvan")}>
              <KodIDSelectbox name1="unvan" kodID={UNVAN_KOD_ID} inputWidth="100%" />
            </FormField>

            <FormField span={6} label={t("gorev")}>
              <KodIDSelectbox name1="gorev" kodID={GOREV_KOD_ID} inputWidth="100%" />
            </FormField>

            <FormField span={6} label={t("sicilNo")}>
              <TextInput name="sicilNo" />
            </FormField>

            <FormField span={6} label={t("uzmanlikAlani")}>
              <KodIDSelectbox name1="uzmanlikAlani" kodID={UZMANLIK_ALANI_KOD_ID} inputWidth="100%" />
            </FormField>

            <FormField span={6} label={t("iseBaslamaTarihi")}>
              <DateInput name="iseBaslamaTarihi" style={{ width: "100%" }} />
            </FormField>

            <FormField span={12} label={t("aciklama")}>
              <Textarea name="aciklama" placeholder={t("personelAciklamaPlaceholder")} />
            </FormField>
          </div>
        </div>

        <div className="col-span-4">
          <div style={{ ...cardStyle, padding: "16px" }}>
            <div className="flex flex-col align-center gap-1">
              <Avatar size={100} src={profileImage || undefined} icon={<UserOutlined />} style={{ backgroundColor: "#f0f2f5", color: "#5d6786" }} />
              <span style={hintStyle}>{t("profilFotografi")}</span>
              {/* Fotoğraf ancak kayıtlı bir personele yüklenebildiği için yükleme alanı yalnızca güncelleme ekranında gösterilir.
                  Ant Design Upload sarmalayıcısı tam genişlik kapladığından kapsayıcı buton genişliğine daraltılıp ortalanır. */}
              {setImages && (
                <div style={{ width: "fit-content", margin: "0 auto" }}>
                  <ImgCrop>
                    <Upload fileList={fileList} onChange={onChange} beforeUpload={beforeUpload} showUploadList={false}>
                      <Button>{t("resimYukle")}</Button>
                    </Upload>
                  </ImgCrop>
                </div>
              )}
            </div>

            <Divider style={{ margin: "16px 0" }} />

            <div className="flex flex-col gap-1">
              <label style={labelStyle}>{t("mobilErisim")}</label>
              <SwitchInput name="mobilErisim" checkedLabel={t("acik")} uncheckedLabel={t("kapali")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TemelBilgiler.propTypes = {
  isValid: PropTypes.string,
  setImages: PropTypes.func,
  urls: PropTypes.array,
};

export default TemelBilgiler;

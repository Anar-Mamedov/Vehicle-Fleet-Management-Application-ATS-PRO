import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Avatar, Button, Divider, message, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";
import Location from "../../../../components/form/tree/Location";
import ValidationInput from "../../../../components/form/inputs/ValidationInput";
import SwitchInput from "../../../../components/form/checkbox/SwitchInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import PasswordInput from "../../../../components/form/inputs/PasswordInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import DateInput from "../../../../components/form/date/DateInput";
import MobilErisimSelect from "../components/MobilErisimSelect";
import FormField from "../components/FormField";
import { cardStyle, hintStyle, labelStyle } from "../components/uiStyles";

// Ekleme ekranında henüz kayıtlı fotoğraf olmadığı için sabit bir boş dizi kullanılır (her render'da yeni referans oluşmasın)
const NO_PHOTOS = [];

const TemelBilgiler = ({ isValid, setImages, urls = NO_PHOTOS, sonGirisZamani }) => {
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
          // Fotoğrafı olmayan bir sürücüye geçildiğinde önceki kaydın fotoğrafı ekranda kalmamalı
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
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : undefined,
  };

  return (
    <div style={cardStyle}>
      <div className="grid gap-2">
        <div className="col-span-8">
          <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
            <FormField span={3} label={t("surucuKod")} required>
              <ValidationInput name="surucuKod" style={validateStyle} />
            </FormField>

            <FormField span={5} label={t("surucuAdi")} required>
              <TextInput name="isim" required />
            </FormField>

            <FormField span={4} label={t("durum")}>
              <SwitchInput name="aktif" checkedLabel={t("aktif")} uncheckedLabel={t("pasif")} />
            </FormField>

            <FormField span={8} label={t("lokasyon")} required>
              <Location required />
            </FormField>

            <FormField span={4} label={t("departman")}>
              <CodeControl name="departman" codeName="departmanKodId" id={200} />
            </FormField>

            <FormField span={4} label={t("surucuTip")}>
              <CodeControl name="surucuTip" codeName="surucuTipKodId" id={502} />
            </FormField>

            <FormField span={4} label={t("unvan")}>
              <TextInput name="unvan" />
            </FormField>

            <FormField span={4} label={t("gorev")}>
              <CodeControl name="gorev" codeName="gorevKodId" id={503} />
            </FormField>

            <FormField span={4} label={t("gsm")}>
              <TextInput name="gsm" />
            </FormField>

            <FormField span={4} label={t("ePosta")}>
              <TextInput name="email" />
            </FormField>

            <FormField span={4} label={t("iseBaslamaTarih")}>
              <DateInput name="iseBaslamaTarih" style={{ width: "100%" }} />
            </FormField>

            <FormField span={4} label={t("cezaPuani")}>
              <NumberInput name="cezaPuani" />
            </FormField>

            <FormField span={12} label={t("aciklama")}>
              <Textarea name="aciklama" />
            </FormField>
          </div>
        </div>

        <div className="col-span-4">
          <div style={{ ...cardStyle, padding: "16px" }}>
            <div className="flex flex-col align-center gap-1">
              <Avatar size={100} src={profileImage || undefined} icon={<UserOutlined />} style={{ backgroundColor: "#f0f2f5", color: "#5d6786" }} />
              <span style={hintStyle}>{t("profilFotografi")}</span>
              {/* Fotoğraf ancak kayıtlı bir sürücüye yüklenebildiği için yükleme alanı yalnızca güncelleme ekranında gösterilir.
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
              <MobilErisimSelect name="mobilErisim" />
            </div>

            <div className="flex flex-col gap-1 mt-10">
              <label style={labelStyle}>{t("mobilKullanimSifresi")}</label>
              <PasswordInput name="sifre" />
            </div>

            {sonGirisZamani && <span style={{ ...hintStyle, marginTop: "8px", display: "block" }}>{`${t("sonGirisZamani")}: ${dayjs(sonGirisZamani).format("DD.MM.YYYY HH:mm")}`}</span>}
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
  sonGirisZamani: PropTypes.string,
};

export default TemelBilgiler;

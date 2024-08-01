import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Checkbox, Input, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import Location from "../../../../components/form/Location";
import Departman from "../../../../components/form/Departman";
import PersonelTip from "../../../../components/form/PersonelTip";
import PersonelGorev from "../../../../components/form/PersonelGorev";
import PersonelUnvan from "../../../../components/form/PersonelUnvan";
import TextInput from "../../../../components/form/inputs/TextInput";
import { useEffect, useState } from "react";
import { DownloadPhotoByIdService } from "../../../../../api/services/upload/services";

const GeneralInfo = ({ isValid, setImages, urls }) => {
  const { control } = useFormContext();
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
    formData.append('images', file);
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
    <>
      <div className="grid gap-1 border">
        <div className="col-span-8 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelKod")}</label>
                <Controller
                  name="personelKod"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={
                        isValid === "error"
                          ? { borderColor: "#dc3545" }
                          : isValid === "success"
                            ? { borderColor: "#23b545" }
                            : { color: "#000" }
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aktif")}</label>
                <Controller
                  name="aktif"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelIsmi")}</label>
                <TextInput name="isim" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("lokasyon")}</label>
                <Controller
                  name="lokasyonId"
                  control={control}
                  render={({ field }) => <Location field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("departman")}</label>
                <Controller
                  name="departmanId"
                  control={control}
                  render={({ field }) => <Departman field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelTipi")}</label>
                <Controller
                  name="personelTipiKodId"
                  control={control}
                  render={({ field }) => <PersonelTip field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("gorev")}</label>
                <Controller
                  name="gorevKodId"
                  control={control}
                  render={({ field }) => <PersonelGorev field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("unvan")}</label>
                <Controller
                  name="unvanKodId"
                  control={control}
                  render={({ field }) => <PersonelUnvan field={field} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 p-10">
          <div className="flex flex-col gap-2 align-center justify-evenly h-full">
            <img
              src={profileImage || "/default-profile-image.png"}
              alt="Profile"
              style={{ width: "60%", height: "60%" }}
            />
            <ImgCrop>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
              >
                Resim yukle
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

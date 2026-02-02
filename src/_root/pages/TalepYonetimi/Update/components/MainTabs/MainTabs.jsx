import React, { useEffect, useState } from "react";
import { Input, Select, DatePicker, Typography, Row, Col } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import PlakaSelectBox from "../../../../../components/PlakaSelectbox";
import LokasyonTablo from "../../../../../components/form/LokasyonTable";
import ModalInput from "../../../../../components/form/inputs/ModalInput";
import PhotoUpload from "../../../../../components/upload/PhotoUpload";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function MainTabs({ imageUrls, loadingImages, setImages }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY");
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);

  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));
  }, []);

  const handleYeniLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };
  const handleYeniLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonID", null);
  };

  return (
    <div style={{ padding: "0px 10px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("talepNo")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller name="talepNo" control={control} render={({ field }) => <Input {...field} readOnly disabled style={{ backgroundColor: "#f5f5f5", color: "#333" }} />} />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("tarih")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller
            name="tarih"
            control={control}
            rules={{ required: t("alanBosBirakilamaz") }}
            render={({ field }) => <DatePicker {...field} style={{ width: "100%" }} format={localeDateFormat} placeholder={t("tarihSeciniz")} />}
          />
          {errors.tarih && <div style={{ color: "red", marginTop: "5px" }}>{errors.tarih.message}</div>}
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("talepTur")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller
            name="talepTur"
            control={control}
            rules={{ required: t("alanBosBirakilamaz") }}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }} placeholder={t("secimYapiniz")} allowClear>
                <Option value="lastik">{t("lastik")}</Option>
                <Option value="aksesuar">{t("aksesuar")}</Option>
                <Option value="yakit">{t("yakit")}</Option>
                <Option value="bakim">{t("bakim")}</Option>
                <Option value="arac">{t("arac")}</Option>
              </Select>
            )}
          />
          {errors.talepTur && <div style={{ color: "red", marginTop: "5px" }}>{errors.talepTur.message}</div>}
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("oncelik")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller
            name="talepOncelik"
            control={control}
            rules={{ required: t("alanBosBirakilamaz") }}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }} placeholder={t("secimYapiniz")}>
                <Option value="dusuk">{t("dusuk")}</Option>
                <Option value="orta">{t("orta")}</Option>
                <Option value="yuksek">{t("yuksek")}</Option>
                <Option value="acil">{t("acil")}</Option>
              </Select>
            )}
          />
          {errors.talepOncelik && <div style={{ color: "red", marginTop: "5px" }}>{errors.talepOncelik.message}</div>}
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>{t("lokasyon")}</Text>
          </div>
          <ModalInput name="lokasyon" readonly={true} required={false} onPlusClick={handleYeniLokasyonPlusClick} onMinusClick={handleYeniLokasyonMinusClick} />
          <LokasyonTablo
            onSubmit={(selectedData) => {
              setValue("lokasyon", selectedData.location);
              setValue("lokasyonID", selectedData.key);
            }}
            isModalVisible={isLokasyonModalOpen}
            setIsModalVisible={setIsLokasyonModalOpen}
          />
        </Col>

        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>{t("aracPlaka")}</Text>
          </div>
          <PlakaSelectBox name1="plaka" isRequired={false} style={{ width: "100%" }} inputWidth="100%" />
        </Col>

        <Col span={24}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>{t("aciklama")}</Text>
          </div>
          <Controller name="aciklama" control={control} render={({ field }) => <TextArea {...field} rows={4} placeholder={t("aciklamaGiriniz")} />} />
        </Col>

        <Col span={24}>
          <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
        </Col>
      </Row>
    </div>
  );
}

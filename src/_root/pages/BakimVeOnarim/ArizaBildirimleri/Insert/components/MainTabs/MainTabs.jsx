import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Select, DatePicker, Typography, Row, Col } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import PlakaSelectBox from "../../../../../../../_root/components/PlakaSelectbox";
import LokasyonTablo from "../../../../../../components/form/LokasyonTable";
import ModalInput from "../../../../../../components/form/inputs/ModalInput";
import PhotoUploadInsert from "../../../../../../../_root/components/upload/PhotoUploadInsert";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function MainTabs({ modalOpen }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [localeDateFormat, setLocaleDateFormat] = useState("DD/MM/YYYY");
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);

  // Date format setup
  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat(navigator.language);
    const sampleDate = new Date(2021, 10, 21);
    const formattedSampleDate = dateFormatter.format(sampleDate);
    setLocaleDateFormat(formattedSampleDate.replace("2021", "YYYY").replace("21", "DD").replace("11", "MM"));
  }, []);

  useEffect(() => {
    if (modalOpen) {
      const currentDate = dayjs();
      setTimeout(() => {
        setValue("tarih", currentDate);
      }, 50);
    }
  }, [modalOpen, setValue]);

  const handleYeniLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };
  const handleYeniLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonID", null);
  };

  return (
    <div style={{ padding: "10px" }}>
      <Row gutter={[16, 16]}>
        {/* Arıza No */}
        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("arizaNo")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller
            name="talepNo"
            control={control}
            rules={{ required: t("alanBosBirakilamaz") }}
            render={({ field }) => (
              <Input {...field} status={errors.talepNo ? "error" : ""} placeholder={t("otomatik")} disabled style={{ width: "100%", backgroundColor: "#f5f5f5", color: "#000" }} />
            )}
          />
          {errors.talepNo && <div style={{ color: "red", marginTop: "5px" }}>{errors.talepNo.message}</div>}
        </Col>

        {/* Tarih */}
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
            render={({ field }) => <DatePicker {...field} format={localeDateFormat} style={{ width: "100%" }} status={errors.tarih ? "error" : ""} />}
          />
          {errors.tarih && <div style={{ color: "red", marginTop: "5px" }}>{errors.tarih.message}</div>}
        </Col>

        {/* Öncelik */}
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
              <Select {...field} placeholder={t("seciniz")} allowClear style={{ width: "100%" }}>
                <Option value="Düşük">{t("dusuk")}</Option>
                <Option value="Orta">{t("orta")}</Option>
                <Option value="Yüksek">{t("yuksek")}</Option>
                <Option value="Acil">{t("acil")}</Option>
              </Select>
            )}
          />
          {errors.talepOncelik && <div style={{ color: "red", marginTop: "5px" }}>{errors.talepOncelik.message}</div>}
        </Col>

        {/* Lokasyon */}
        <Col xs={24} md={12}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("lokasyon")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <ModalInput name="lokasyon" readonly={true} required={true} onPlusClick={handleYeniLokasyonPlusClick} onMinusClick={handleYeniLokasyonMinusClick} />
          <LokasyonTablo
            onSubmit={(selectedData) => {
              setValue("lokasyon", selectedData.location);
              setValue("lokasyonID", selectedData.key);
            }}
            isModalVisible={isLokasyonModalOpen}
            setIsModalVisible={setIsLokasyonModalOpen}
          />
          {errors.lokasyon && <div style={{ color: "red", marginTop: "5px" }}>{t("alanBosBirakilamaz")}</div>}
        </Col>

        {/* Plaka */}
        <Col xs={24}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("plaka")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <PlakaSelectBox name1="plaka" isRequired={true} style={{ width: "100%" }} inputWidth="100%" />
        </Col>

        {/* Açıklama */}
        <Col xs={24}>
          <div style={{ marginBottom: "5px" }}>
            <Text style={{ fontWeight: 600 }}>
              {t("aciklama")} <span style={{ color: "red" }}>*</span>
            </Text>
          </div>
          <Controller
            name="aciklama"
            control={control}
            rules={{ required: t("alanBosBirakilamaz") }}
            render={({ field }) => <TextArea {...field} rows={4} placeholder={t("arizayiTanimlayin")} style={{ resize: "none", width: "100%" }} />}
          />
          {errors.aciklama && <div style={{ color: "red", marginTop: "5px" }}>{errors.aciklama.message}</div>}
        </Col>

        {/* Fotoğraflar */}
        <Col xs={24}>
          <Controller name="files" control={control} defaultValue={[]} render={({ field: { value, onChange } }) => <PhotoUploadInsert value={value} onChange={onChange} />} />
        </Col>
      </Row>
    </div>
  );
}

MainTabs.propTypes = {
  modalOpen: PropTypes.bool,
};

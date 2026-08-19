import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal } from "antd";
import { ArrowRightOutlined, CarOutlined, EnvironmentOutlined, FileTextOutlined, MessageOutlined, ProfileOutlined, SearchOutlined } from "@ant-design/icons";
import Plaka from "../../../../components/form/selects/Plaka";
import Driver from "../../../../components/form/selects/Driver";
import Firma from "../../../../components/form/selects/Firma";
import TextInput from "../../../../components/form/inputs/TextInput";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import Guzergah from "../../../../components/form/selects/Guzergah";
import SectionCard from "../components/SectionCard";
import FormField from "../components/FormField";
import SeferSorumlusu from "../components/SeferSorumlusu";
import { labelStyle } from "../components/uiStyles";
import VehicleList from "./VehiclesList";

// Kod listelerinin backend'deki numaraları
const SEFER_TIP_KOD_ID = 120;
const SEFER_DURUM_KOD_ID = 121;
const SEFER_YERI_KOD_ID = 918;
const PROJE_KOD_ID = 920;
const DEPARTMAN_KOD_ID = 200;

const ACIKLAMA_MAX_LENGTH = 500;

const FULL_WIDTH = { width: "100%" };

// Ek bilgiler bölümü beş eşit sütuna bölünür
const EK_BILGILER_GRID = { gridTemplateColumns: "repeat(5, minmax(0, 1fr))" };

// Çıkış/varış km alanları, kendinden önceki saat alanına ok işaretiyle bağlanır
const KmField = ({ label, name }) => (
  <div className="col-span-4" style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
    <ArrowRightOutlined style={{ color: "#bfbfbf", marginBottom: "9px" }} />
    <div className="flex flex-col gap-1" style={{ flex: 1, minWidth: 0 }}>
      <label style={labelStyle}>{label}</label>
      <NumberInput name={name} style={FULL_WIDTH} />
    </div>
  </div>
);

KmField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
};

const GeneralInfo = ({ isValid, isUpdate = false }) => {
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [dorse, setDorse] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : undefined,
  };

  const handleOpen = () => {
    setModalKey((prevKey) => prevKey + 1);
    setOpen(true);
  };

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={() => {
        setValue("dorsePlaka", dorse[0].plaka);
        setValue("dorseId", dorse[0].aracId);
        setOpen(false);
      }}
    >
      {t("ekle")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setOpen(false)}>
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <div className="grid gap-2">
        <div className="col-span-3">
          <SectionCard icon={<ProfileOutlined />} title={t("operasyonBilgileri")}>
            {/* Operasyon numarası kayıt oluşturulurken üretildiği için güncelleme ekranında değiştirilemez */}
            <FormField span={12} label={t("operasyonNo")} disabled={isUpdate}>
              <TextInput name="seferNo" style={validateStyle} checked={isUpdate} />
            </FormField>

            <FormField span={12} label={t("operasyonTipi")} required>
              <KodIDSelectbox name1="seferTip" kodID={SEFER_TIP_KOD_ID} isRequired />
            </FormField>

            <FormField span={12} label={t("durum")}>
              <KodIDSelectbox name1="seferDurum" kodID={SEFER_DURUM_KOD_ID} />
            </FormField>

            <FormField span={12} label={t("firma")} required>
              <Firma name="firma" codeName="firmaId" required placeholder={t("firmaSecin")} />
            </FormField>
          </SectionCard>
        </div>

        <div className="col-span-3">
          <SectionCard icon={<CarOutlined />} title={t("aracVeSurucuBilgileri")}>
            <FormField span={12} label={t("plaka")} required>
              <Plaka name="plaka" codeName="aracId" required placeholder={t("plakaSecin")} />
            </FormField>

            <FormField span={12} label={`${t("surucu")} 1`} required>
              <Driver name="surucu1" codeName="surucuId1" required placeholder={t("surucuSecin")} />
            </FormField>

            <FormField span={12} label={`${t("surucu")} 2`}>
              <Driver name="surucu2" codeName="surucuId2" placeholder={t("surucuSecin")} />
            </FormField>

            <FormField span={12} label={t("operasyonSorumlusu")}>
              <SeferSorumlusu />
            </FormField>
          </SectionCard>
        </div>

        <div className="col-span-6">
          <SectionCard icon={<EnvironmentOutlined />} title={t("tarihSaatVeRotaBilgileri")}>
            <FormField span={4} label={t("cikisTarih")} required>
              <DateInput name="cikisTarih" required style={FULL_WIDTH} />
            </FormField>
            <FormField span={4} label={t("cikisSaat")}>
              <TimeInput name="cikisSaat" style={FULL_WIDTH} />
            </FormField>
            <KmField label={t("cikisKm")} name="cikisKm" />

            <FormField span={4} label={t("varisTarih")}>
              <DateInput name="varisTarih" style={FULL_WIDTH} />
            </FormField>
            <FormField span={4} label={t("varisSaat")}>
              <TimeInput name="varisSaat" style={FULL_WIDTH} />
            </FormField>
            <KmField label={t("varisKm")} name="varisKm" />

            <FormField span={8} label={t("guzergah")}>
              <Guzergah placeholder={t("guzergahSecin")} />
            </FormField>
            <FormField span={4} label={t("mesafeKm")}>
              <NumberInput name="farkKm" style={FULL_WIDTH} />
            </FormField>

            <FormField span={8} label={t("operasyonYeri")}>
              <KodIDSelectbox name1="seferYeri" kodID={SEFER_YERI_KOD_ID} />
            </FormField>
          </SectionCard>
        </div>

        <div className="col-span-12">
          <SectionCard icon={<FileTextOutlined />} title={t("ekBilgiler")} gridStyle={EK_BILGILER_GRID}>
            <FormField span={1} label={t("proje")}>
              <KodIDSelectbox name1="proje" kodID={PROJE_KOD_ID} />
            </FormField>

            <FormField span={1} label={t("departman")}>
              <KodIDSelectbox name1="departman" kodID={DEPARTMAN_KOD_ID} />
            </FormField>

            <FormField span={1} label={t("isEmriNo")}>
              <TextInput name="isEmriNo" />
            </FormField>

            <FormField span={1} label={t("seferSayisi")}>
              <NumberInput name="seferAdedi" placeholder={t("seferSayisi")} style={FULL_WIDTH} />
            </FormField>

            <div className="col-span-1">
              <div className="flex flex-col gap-1">
                <label style={labelStyle}>{t("dorse")}</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput name="dorsePlaka" readonly placeholder={t("dorseSec")} />
                  </div>
                  <Button icon={<SearchOutlined />} onClick={handleOpen} />
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="col-span-12">
          <SectionCard icon={<MessageOutlined />} title={t("aciklama")}>
            <div className="col-span-12">
              <Textarea name="aciklama" length={ACIKLAMA_MAX_LENGTH} showCount rows={3} />
            </div>
          </SectionCard>
        </div>
      </div>

      <Modal title={t("araclar")} open={open} onCancel={() => setOpen(false)} maskClosable={false} footer={footer} width={1200}>
        <VehicleList setDorse={setDorse} open={open} key={modalKey} />
      </Modal>
    </>
  );
};

GeneralInfo.propTypes = {
  isValid: PropTypes.string,
  isUpdate: PropTypes.bool,
};

export default GeneralInfo;

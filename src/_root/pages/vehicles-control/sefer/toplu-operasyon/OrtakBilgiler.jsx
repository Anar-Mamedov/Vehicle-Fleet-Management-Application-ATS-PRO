import React from "react";
import { Typography } from "antd";
import { FileTextOutlined, ProfileOutlined } from "@ant-design/icons";
import { t } from "i18next";
import Firma from "../../../../components/form/selects/Firma";
import Guzergah from "../../../../components/form/selects/Guzergah";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import TextInput from "../../../../components/form/inputs/TextInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import DateInput from "../../../../components/form/date/DateInput";
import SectionCard from "../components/SectionCard";
import FormField from "../components/FormField";

const { Text } = Typography;

// Kod listelerinin backend'deki numaraları (operasyon ekleme ekranıyla aynı)
const SEFER_TIP_KOD_ID = 120;
const SEFER_DURUM_KOD_ID = 121;
const SEFER_YERI_KOD_ID = 918;
const PROJE_KOD_ID = 920;
const DEPARTMAN_KOD_ID = 200;

const ACIKLAMA_MAX_LENGTH = 500;

const FULL_WIDTH = { width: "100%" };

// 2. adım: seçilen tüm araçlar için aynı olacak operasyon bilgileri
const OrtakBilgiler = () => (
  <div className="grid gap-2">
    <div className="col-span-12">
      <div style={{ fontSize: "18px", fontWeight: 600, color: "#141414", lineHeight: "26px" }}>{t("adimOrtakOperasyonBilgileri")}</div>
      <Text type="secondary">{t("ortakOperasyonBilgileriAciklama")}</Text>
    </div>

    <div className="col-span-12">
      <SectionCard icon={<ProfileOutlined />} title={t("temelBilgiler")}>
        <FormField span={4} label={t("operasyonTarihi")} required>
          <DateInput name="cikisTarih" required style={FULL_WIDTH} />
        </FormField>
        <FormField span={4} label={t("operasyonTipi")} required>
          <KodIDSelectbox name1="seferTip" kodID={SEFER_TIP_KOD_ID} isRequired />
        </FormField>
        <FormField span={4} label={t("firma")} required>
          <Firma name="firma" codeName="firmaId" required placeholder={t("firmaSecin")} />
        </FormField>

        <FormField span={4} label={t("guzergah")} required>
          <Guzergah placeholder={t("guzergahSecin")} />
        </FormField>
        <FormField span={4} label={t("operasyonYeri")} required>
          <KodIDSelectbox name1="seferYeri" kodID={SEFER_YERI_KOD_ID} isRequired />
        </FormField>
        <FormField span={4} label={t("durum")} required>
          <KodIDSelectbox name1="seferDurum" kodID={SEFER_DURUM_KOD_ID} isRequired />
        </FormField>

        <FormField span={4} label={t("operasyonSorumlusu")}>
          <TextInput name="seferSorumlusu" placeholder={t("operasyonSorumlusu")} />
        </FormField>

        <div className="col-span-12">
          <FormField span={12} label={t("aciklama")}>
            <Textarea name="aciklama" length={ACIKLAMA_MAX_LENGTH} showCount rows={3} />
          </FormField>
        </div>
      </SectionCard>
    </div>

    <div className="col-span-12">
      <SectionCard icon={<FileTextOutlined />} title={t("ekBilgiler")}>
        <FormField span={4} label={t("proje")}>
          <KodIDSelectbox name1="proje" kodID={PROJE_KOD_ID} />
        </FormField>
        <FormField span={4} label={t("departman")}>
          <KodIDSelectbox name1="departman" kodID={DEPARTMAN_KOD_ID} />
        </FormField>
        <FormField span={4} label={t("isEmriNo")}>
          <TextInput name="isEmriNo" />
        </FormField>
      </SectionCard>
    </div>
  </div>
);

export default OrtakBilgiler;

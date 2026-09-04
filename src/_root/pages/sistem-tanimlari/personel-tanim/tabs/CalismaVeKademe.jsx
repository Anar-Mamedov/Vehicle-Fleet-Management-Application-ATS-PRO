import React from "react";
import { t } from "i18next";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import DateInput from "../../../../components/form/date/DateInput";
import FormField from "../components/FormField";
import { cardStyle } from "../components/uiStyles";

// Çalışma bilgisi kod listelerinin backend'deki kod numaraları
const VARDIYA_KOD_ID = 917;
const ISCILIK_TIP_KOD_ID = 922;
const CALISMA_TIP_KOD_ID = 923;

// İşe başlama tarihi ve uzmanlık alanı bilerek burada değil, Temel Bilgiler sekmesinde tutulur
const CalismaVeKademe = () => (
  <div style={cardStyle}>
    <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
      <FormField span={6} label={t("istenAyrilmaTarihi")}>
        <DateInput name="isetenAyrilmaTarihi" style={{ width: "100%" }} />
      </FormField>

      <FormField span={6} label={t("calismaTipi")}>
        <KodIDSelectbox name1="calismaTipi" kodID={CALISMA_TIP_KOD_ID} inputWidth="100%" />
      </FormField>

      <FormField span={6} label={t("vardiyaCalismaGrubu")}>
        <KodIDSelectbox name1="vardiya" kodID={VARDIYA_KOD_ID} inputWidth="100%" />
      </FormField>

      <FormField span={6} label={t("iscilikTipi")}>
        <KodIDSelectbox name1="iscilikTipi" kodID={ISCILIK_TIP_KOD_ID} inputWidth="100%" />
      </FormField>

      <FormField span={6} label={t("saatlikIscilikMaliyeti")}>
        <NumberInput name="saatlikIscilikMaliyeti" min={0} />
      </FormField>

      <FormField span={12} label={t("calismaNotu")}>
        <Textarea name="calismaNotu" rows={3} />
      </FormField>
    </div>
  </div>
);

export default CalismaVeKademe;

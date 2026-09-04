import React from "react";
import { t } from "i18next";
import TextInput from "../../../../components/form/inputs/TextInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import FormField from "../components/FormField";
import { cardStyle } from "../components/uiStyles";

// Telefon alanlarının servis karşılıkları: GSM -> gsm, Alternatif Telefon -> tel1, Dahili No -> tel2
const Iletisim = () => (
  <div style={cardStyle}>
    <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
      <FormField span={6} label={t("gsm")}>
        <TextInput name="gsm" />
      </FormField>

      <FormField span={6} label={t("alternatifTelefon")}>
        <TextInput name="tel1" />
      </FormField>

      <FormField span={6} label={t("ePosta")}>
        <TextInput name="email" />
      </FormField>

      <FormField span={6} label={t("dahiliNo")}>
        <TextInput name="tel2" />
      </FormField>

      <FormField span={12} label={t("adres")}>
        <Textarea name="adres" rows={3} />
      </FormField>

      <FormField span={6} label={t("il")}>
        <TextInput name="il" />
      </FormField>

      <FormField span={6} label={t("ilce")}>
        <TextInput name="ilce" />
      </FormField>

      <FormField span={6} label={t("postaKodu")}>
        <TextInput name="postaKodu" />
      </FormField>

      <FormField span={6} label={t("acilDurumKisi")}>
        <TextInput name="acilKisi" />
      </FormField>

      <FormField span={6} label={t("yakinlik")}>
        <TextInput name="yakinlik" />
      </FormField>

      <FormField span={6} label={t("acilDurumTelefonu")}>
        <TextInput name="acilDurumTel" />
      </FormField>

      <FormField span={12} label={t("iletisimNotu")}>
        <Textarea name="iletisimNotu" rows={3} />
      </FormField>
    </div>
  </div>
);

export default Iletisim;

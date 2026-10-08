import React from "react";
import { t } from "i18next";
import Textarea from "../../../../components/form/inputs/Textarea";
import FormField from "../components/FormField";
import { cardStyle } from "../components/uiStyles";

const ACIKLAMA_MAKSIMUM_UZUNLUK = 2000;

// Ekleme ve güncelleme ekranlarının ortak "Açıklama" sekmesi
const Aciklama = () => (
  <div style={cardStyle}>
    <div className="grid">
      <FormField span={12} label={t("aciklama")}>
        <Textarea name="aciklama" rows={8} length={ACIKLAMA_MAKSIMUM_UZUNLUK} showCount placeholder={t("kademeAciklamaPlaceholder")} />
      </FormField>
    </div>
  </div>
);

export default Aciklama;

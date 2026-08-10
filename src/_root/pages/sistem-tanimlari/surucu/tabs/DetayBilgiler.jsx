import React from "react";
import { t } from "i18next";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import DateInput from "../../../../components/form/date/DateInput";
import FormField from "../components/FormField";
import KanGrubuSelect from "../components/KanGrubuSelect";
import { cardStyle, labelStyle } from "../components/uiStyles";

const fullWidth = { width: "100%" };

const DetayBilgiler = () => {
  return (
    <div className="flex flex-col gap-2">
      <div style={cardStyle}>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={3} label={t("dogumTarihi")}>
            <DateInput name="dogumTarihi" style={fullWidth} />
          </FormField>

          <FormField span={3} label={t("tcKimlikNo")}>
            <TextInput name="tcKimlikNo" length={11} />
          </FormField>

          <FormField span={3} label={t("egitimDurumu")}>
            <TextInput name="egitimDurumu" />
          </FormField>

          <FormField span={3} label={t("mezunOlduguOkul")}>
            <TextInput name="mezunOlduguOkul" />
          </FormField>

          <FormField span={3} label={t("mezunOlduguBolum")}>
            <TextInput name="mezunOlduguBolum" />
          </FormField>

          <FormField span={3} label={t("mezuniyetTarih")}>
            <DateInput name="mezuniyetTarih" style={fullWidth} />
          </FormField>

          <FormField span={3} label={t("isSicilNo")}>
            <TextInput name="isSicilNo" />
          </FormField>

          <FormField span={3} label={t("kanGrubu")}>
            <KanGrubuSelect name="kanGrubu" />
          </FormField>
        </div>
      </div>

      <div style={cardStyle}>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={3} label={t("kiyafetBedeni")}>
            <TextInput name="kiyafetBedeni" />
          </FormField>

          <FormField span={3} label={t("acilDurumKisi")}>
            <TextInput name="acilDurumKisi" />
          </FormField>

          <FormField span={3} label={t("acilDurumTelefonu")}>
            <TextInput name="acilDurumTelefonu" />
          </FormField>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="col-span-6">
          <div style={{ ...cardStyle, padding: "16px" }}>
            <div className="flex align-center gap-1">
              <CheckboxInput name="ileriSurusEgitimi" />
              <span style={{ ...labelStyle, color: "#141414" }}>{t("ileriSurusEgitimi")}</span>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div style={{ ...cardStyle, padding: "16px" }}>
            <div className="flex align-center gap-1">
              <CheckboxInput name="yukEmniyetEgitimi" />
              <span style={{ ...labelStyle, color: "#141414" }}>{t("yukEmniyetEgitimi")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetayBilgiler;

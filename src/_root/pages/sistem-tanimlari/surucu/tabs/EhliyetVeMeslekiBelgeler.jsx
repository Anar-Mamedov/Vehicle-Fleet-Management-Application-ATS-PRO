import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import DateInput from "../../../../components/form/date/DateInput";
import FormField from "../components/FormField";
import EhliyetSinifiSelect from "../components/EhliyetSinifiSelect";
import { BORDER_COLOR, cardStyle, labelStyle, sectionTitleStyle } from "../components/uiStyles";

const fullWidth = { width: "100%" };

// Belge kartları, ilgili onay kutusu işaretli değilken soluk görünür
const documentCardStyle = (enabled) => ({
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: "8px",
  padding: "16px",
  backgroundColor: enabled ? "white" : "#fafafa",
  height: "100%",
});

const DocumentCard = ({ name, title, enabled, children }) => (
  <div className="col-span-4">
    <div style={documentCardStyle(enabled)}>
      <div className="flex align-center gap-1" style={{ marginBottom: "16px" }}>
        <CheckboxInput name={name} />
        <span style={{ ...labelStyle, color: enabled ? "#141414" : "#8c8c8c", fontWeight: 600 }}>{title}</span>
      </div>
      <div className="grid" style={{ rowGap: "16px", columnGap: "12px" }}>
        {children}
      </div>
    </div>
  </div>
);

DocumentCard.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  enabled: PropTypes.bool,
  children: PropTypes.node,
};

const EhliyetVeMeslekiBelgeler = () => {
  const { watch } = useFormContext();

  const srcEnabled = !!watch("src");
  const piskoteknikEnabled = !!watch("srcPiskoteknik");
  const takografEnabled = !!watch("takografKarti");

  return (
    <div className="flex flex-col gap-2">
      <div style={cardStyle}>
        <span style={sectionTitleStyle}>{t("ehliyetBilgiler")}</span>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={3} label={t("ehliyetSinifi")}>
            <EhliyetSinifiSelect name="sinif" />
          </FormField>

          <FormField span={3} label={t("ehliyetNo")}>
            <TextInput name="ehliyetNo" />
          </FormField>

          <FormField span={3} label={t("ehliyetSeriNo")}>
            <TextInput name="ehliyetSeriNo" />
          </FormField>

          <FormField span={3} label={t("verildigiIlIlce")}>
            <TextInput name="ehliyetVerildigiIlIlce" />
          </FormField>

          <FormField span={3} label={t("verilisTarih")}>
            <DateInput name="ehliyetVerilisTarih" style={fullWidth} />
          </FormField>

          <FormField span={3} label={t("gecerlilikYenilemeTarihi")}>
            <DateInput name="ehliyetYenilemeTarih" style={fullWidth} />
          </FormField>
        </div>
      </div>

      <div style={cardStyle}>
        <span style={sectionTitleStyle}>{t("meslekiBelgeler")}</span>
        <div className="grid gap-2">
          <DocumentCard name="src" title={t("srcBelgesi")} enabled={srcEnabled}>
            <FormField span={6} label={t("srcTuru")} disabled={!srcEnabled}>
              <TextInput name="srcTuru" checked={!srcEnabled} />
            </FormField>

            <FormField span={6} label={t("belgeNo")} disabled={!srcEnabled}>
              <TextInput name="srcBelgeNo" checked={!srcEnabled} />
            </FormField>

            <FormField span={6} label={t("verilisTarih")} disabled={!srcEnabled}>
              <DateInput name="srcVerilisTarih" checked={!srcEnabled} style={fullWidth} />
            </FormField>

            <FormField span={6} label={t("bitisYenilemeTarihi")} disabled={!srcEnabled}>
              <DateInput name="srcBitisTarih" checked={!srcEnabled} style={fullWidth} />
            </FormField>
          </DocumentCard>

          <DocumentCard name="srcPiskoteknik" title={t("srcPiskoteknik")} enabled={piskoteknikEnabled}>
            <FormField span={12} label={t("belgeNo")} disabled={!piskoteknikEnabled}>
              <TextInput name="srcPiskoteknikBelgeNo" checked={!piskoteknikEnabled} />
            </FormField>

            <FormField span={6} label={t("verilisTarih")} disabled={!piskoteknikEnabled}>
              <DateInput name="srcPiskoteknikVerilisTarihi" checked={!piskoteknikEnabled} style={fullWidth} />
            </FormField>

            <FormField span={6} label={t("bitisTarih")} disabled={!piskoteknikEnabled}>
              <DateInput name="srcPiskoteknikBitisTarihi" checked={!piskoteknikEnabled} style={fullWidth} />
            </FormField>
          </DocumentCard>

          <DocumentCard name="takografKarti" title={t("takografKarti")} enabled={takografEnabled}>
            <FormField span={12} label={t("kartNo")} disabled={!takografEnabled}>
              <TextInput name="takografKartNo" checked={!takografEnabled} />
            </FormField>

            <FormField span={6} label={t("verilisTarih")} disabled={!takografEnabled}>
              <DateInput name="takografVerilisTarih" checked={!takografEnabled} style={fullWidth} />
            </FormField>

            <FormField span={6} label={t("bitisTarih")} disabled={!takografEnabled}>
              <DateInput name="takografBitisTarih" checked={!takografEnabled} style={fullWidth} />
            </FormField>
          </DocumentCard>
        </div>
      </div>
    </div>
  );
};

export default EhliyetVeMeslekiBelgeler;

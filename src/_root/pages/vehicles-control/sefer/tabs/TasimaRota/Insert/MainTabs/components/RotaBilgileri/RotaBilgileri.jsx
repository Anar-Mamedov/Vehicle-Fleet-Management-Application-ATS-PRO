import React from "react";
import { Typography } from "antd";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import KodIDSelectbox from "../../../../../../../../../components/KodIDSelectbox";
import NumberInput from "../../../../../../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../../../../../../components/form/inputs/TextInput";
import { SehirSelectBox } from "../../../../../../../../../components/SehirSelectBox";
import { YerlerSehirSelectBox } from "../../../../../../../../../components/YerlerSehirSelectBox";
import { YuklemeKodlariTablo } from "../../../../../../../../../components/YuklemeKodlariTablo";
import DateInput from "../../../../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../../../../components/form/date/TimeInput";

const { Text } = Typography;

export function RotaBilgileri() {
  const { watch } = useFormContext();
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("cikisYeri") + " / " + t("km")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div>
              <YerlerSehirSelectBox name1="cikisYeri" isRequired={false} towerID={watch("cikisSehriID")} inputWidth="121px" dropdownWidth="250px" />
            </div>
            <NumberInput name="cikisKm" placeholder={t("km")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("varisYeri") + " / " + t("km")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div>
              <YerlerSehirSelectBox name1="varisYeri" isRequired={false} towerID={watch("varisSehriID")} inputWidth="121px" dropdownWidth="250px" />
            </div>
            <NumberInput name="varisKm" placeholder={t("km")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("mesafe")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <NumberInput name="mesafe" placeholder={t("mesafe")} style={{ width: "250px" }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("cikis") + " " + t("tarih") + " / " + t("saat")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <DateInput name="cikisTarih" placeholder={t("tarih")} style={{ width: "121px" }} />
            <TimeInput name="cikisSaat" placeholder={t("saat")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("varis") + " " + t("tarih") + " / " + t("saat")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <DateInput name="varisTarih" placeholder={t("tarih")} style={{ width: "121px" }} />
            <TimeInput name="varisSaat" placeholder={t("saat")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("sure") + " " + t("saat") + " / " + t("dk")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <NumberInput name="sureSaat" min={0} max={23} placeholder={t("saat")} style={{ width: "121px" }} />
            <NumberInput name="sureDk" min={0} max={59} placeholder={t("dk")} style={{ width: "121px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

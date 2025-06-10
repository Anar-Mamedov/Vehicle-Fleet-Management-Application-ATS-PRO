import React from "react";
import { Typography } from "antd";
import { t } from "i18next";
import KodIDSelectbox from "../../../../../../../../../components/KodIDSelectbox";
import NumberInput from "../../../../../../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../../../../../../components/form/inputs/TextInput";
import { SehirSelectBox } from "../../../../../../../../../components/SehirSelectBox";
import { YuklemeKodlariTablo } from "../../../../../../../../../components/YuklemeKodlariTablo";

const { Text } = Typography;

export function TasimaBilgileri() {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("tasimaCinsi")}</Text>
          <div>
            <KodIDSelectbox name1="tasimaCinsi" kodID="600" isRequired={false} placeholder={t("tasimaCinsi")} inputWidth="250px" dropdownWidth="250px" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("tasimaMiktari")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <NumberInput name="tasimaMiktari" placeholder={t("miktar")} style={{ width: "121px" }} />
            <div>
              <KodIDSelectbox name1="tasimaBirimi" kodID="300" isRequired={false} placeholder={t("birim")} inputWidth="121px" dropdownWidth="250px" />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("cikisSehri")}</Text>
          <div>
            <SehirSelectBox name1="cikisSehri" isRequired={false} inputWidth="250px" dropdownWidth="250px" />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("tasimaTuru")}</Text>
          <div>
            <KodIDSelectbox name1="tasimaTuru" kodID="905" isRequired={false} placeholder={t("tasimaTuru")} inputWidth="250px" dropdownWidth="250px" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("yuklemeKodu")}</Text>
          <YuklemeKodlariTablo />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("varisSehri")}</Text>
          <div>
            <SehirSelectBox name1="varisSehri" isRequired={false} inputWidth="250px" dropdownWidth="250px" />
          </div>
        </div>
      </div>
    </div>
  );
}

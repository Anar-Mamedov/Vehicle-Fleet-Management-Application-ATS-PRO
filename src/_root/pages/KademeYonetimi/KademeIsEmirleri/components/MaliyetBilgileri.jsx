import React from "react";
import PropTypes from "prop-types";
import { useFormContext, useWatch } from "react-hook-form";
import { t } from "i18next";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import { hesaplaToplamMaliyet } from "../formHelpers";
import HesapKutusu from "./HesapKutusu";

// İşçilik ve malzeme tutarları iş emrine bağlı kartlardan (GetServiceCardCost) gelir; yalnızca diğer giderler elle girilir.
// Toplam, servis ekranıyla aynı formülle hesaplanıp kayıtta gönderilir. readOnly kapalı/iptal kartta diğer giderleri kilitler.
const MaliyetBilgileri = ({ readOnly = false }) => {
  const { control } = useFormContext();
  const [iscilik, malzeme, diger, kdv, indirim] = useWatch({ control, name: ["iscilik", "malzeme", "diger", "kdv", "indirim"] });
  const toplam = hesaplaToplamMaliyet({ iscilik, malzeme, diger, kdv, indirim });

  return (
    <div style={{ ...cardStyle, flex: "0 1 320px" }}>
      <span style={sectionTitleStyle}>{t("maliyetBilgileri")}</span>
      <div className="grid" style={{ rowGap: "14px" }}>
        <FormField span={12} label={t("iscilikTutari")}>
          <NumberInput name="iscilik" checked />
        </FormField>
        <FormField span={12} label={t("malzemeTutari")}>
          <NumberInput name="malzeme" checked />
        </FormField>
        <FormField span={12} label={t("digerGiderler")}>
          <NumberInput name="diger" min={0} checked={readOnly} />
        </FormField>
        <HesapKutusu label={t("toplamMaliyet")} value={formatNumberWithLocale(toplam, 2, 2)} />
      </div>
    </div>
  );
};

MaliyetBilgileri.propTypes = {
  readOnly: PropTypes.bool,
};

export default MaliyetBilgileri;

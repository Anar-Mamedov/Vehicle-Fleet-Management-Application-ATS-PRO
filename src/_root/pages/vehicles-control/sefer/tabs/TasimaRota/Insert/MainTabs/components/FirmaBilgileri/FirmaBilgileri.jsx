import React from "react";
import { FirmaTablo } from "../../../../../../../../../components/FirmaTablo";
import { Checkbox, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import TextInput from "../../../../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../../../../components/form/date/TimeInput";
import { t } from "i18next";

const { Text } = Typography;

export function FirmaBilgileri() {
  const { control } = useFormContext();
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("firmaKodu")}</Text>
          <FirmaTablo type={4} statusValue={1} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("firmaTanimi")}</Text>
          <TextInput name="firmaTanim" placeholder={t("firmaTanimi")} style={{ width: "250px" }} readonly />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "370px", justifyContent: "space-between" }}>
          <Text>{t("telefon") + " / " + t("ilgili")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <NumberInput name="telefon" placeholder={t("telefon")} style={{ width: "121px" }} />
            <TextInput name="ilgili" placeholder={t("ilgili")} style={{ width: "121px" }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("fatura") + " / " + t("irsaliye") + " " + t("no")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <TextInput name="faturaNo" placeholder={t("faturaNo")} style={{ width: "121px" }} />
            <NumberInput name="irsaliyeNo" placeholder={t("irsaliyeNo")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("fatura") + " " + t("tarih") + " / " + t("saat")}</Text>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <DateInput name="faturaTarih" placeholder={t("tarih")} style={{ width: "121px" }} />
            <TimeInput name="faturaSaat" placeholder={t("saat")} style={{ width: "121px" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "400px", justifyContent: "space-between" }}>
          <Text>{t("ucret")}</Text>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "250px" }}>
            <NumberInput name="ucret" placeholder={t("ucret")} style={{ width: "121px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Controller name="odemeYapildi" control={control} render={({ field }) => <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />} />
              <Text>{t("odeme")}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

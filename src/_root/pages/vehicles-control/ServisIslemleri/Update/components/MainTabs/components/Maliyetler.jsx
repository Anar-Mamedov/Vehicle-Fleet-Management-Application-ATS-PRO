import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InputNumber, Typography, Divider } from "antd";

const { Text } = Typography;

function Maliyetler() {
  const { control, watch, setValue } = useFormContext();

  const [decimalSeparator, setDecimalSeparator] = useState(".");

  useEffect(() => {
    const userLang = localStorage.getItem("i18nextLng");
    if (userLang === "tr" || userLang === "az") {
      setDecimalSeparator(",");
    } else {
      setDecimalSeparator(".");
    }
  }, []);

  // Add formatter and parser functions
  const formatter = (value) => {
    if (!value) return "";
    return `${value}`.replace(".", decimalSeparator);
  };

  const parser = (value) => {
    if (!value) return "";
    return value.replace(decimalSeparator, ".");
  };

  const iscilikUcreti = watch("iscilikUcreti") || 0;
  const malzemeUcreti = watch("malzemeUcreti") || 0;
  const digerUcreti = watch("digerUcreti") || 0;
  const kdvUcreti = watch("kdvUcreti") || 0;
  const eksiUcreti = watch("eksiUcreti") || 0;

  useEffect(() => {
    // Guard against floating point precision issues (e.g., 0.1 + 0.2)
    const rawToplamUcret = Number(iscilikUcreti || 0) + Number(malzemeUcreti || 0) + Number(digerUcreti || 0) + Number(kdvUcreti || 0) - Number(eksiUcreti || 0);

    const factor = 100; // 2 decimal places
    const roundedToplamUcret = Math.round((rawToplamUcret + Number.EPSILON) * factor) / factor;

    setValue("toplamUcret", roundedToplamUcret);
  }, [iscilikUcreti, malzemeUcreti, digerUcreti, kdvUcreti, eksiUcreti, setValue]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>İşçilik Ücreti:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="iscilikUcreti"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} style={{ flex: 1 }} />}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>Mlz. Ücreti:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="malzemeUcreti"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} style={{ flex: 1 }} />}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>KDV:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="kdvUcreti"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} style={{ flex: 1 }} />}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>İndirim:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="eksiUcreti"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} style={{ flex: 1 }} />}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>Diğer:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="digerUcreti"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} style={{ flex: 1 }} />}
          />
        </div>
      </div>

      <Divider style={{ margin: "8px 0" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "200px", maxWidth: "200px" }}>
        <Text>Toplam:</Text>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "100px", minWidth: "100px", gap: "10px", width: "100%" }}>
          <Controller
            name="toplamUcret"
            control={control}
            render={({ field }) => <InputNumber {...field} decimalSeparator={decimalSeparator} formatter={formatter} parser={parser} precision={2} disabled style={{ flex: 1 }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default Maliyetler;

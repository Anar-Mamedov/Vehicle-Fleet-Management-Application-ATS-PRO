import React, { useEffect } from "react";
import { Drawer, Typography, Button, Input, Select, DatePicker, TimePicker, Row, Col, Checkbox, InputNumber, Radio, Divider, Image, Switch } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { t, use } from "i18next";
import Selectbox from "./Selectbox";
import Selectbox1 from "./Selectbox1";

const { Text, Link } = Typography;
const { TextArea } = Input;

function Forms() {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const gidilenMesafeIslemDisabled = watch("gidilenMesafeKontrolu") === false;
  const yakitMiktarIslemDisabled = watch("yakitMiktarKontrol") === false;
  const yakitTutarIslemDisabled = watch("yakitTutarKontrol") === false;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      {/*
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("kilometreKontrolZorunlu")}</Text>
        <Controller name="kilometreKontrolZorunlu" control={control} render={({ field }) => <Switch {...field} />} />
      </div>
      */}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("gidilenMesafeKontrolu")}</Text>
        <Controller name="gidilenMesafeKontrolu" control={control} render={({ field }) => <Switch {...field} />} />
      </div>

      <div style={{ display: "flex", gap: "15px", width: "100%", border: "1px solid #00000018", padding: "10px", borderRadius: "6px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("min")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="gidilenMesafeMin"
              control={control}
              render={({ field }) => <InputNumber {...field} disabled={gidilenMesafeIslemDisabled} min={0} style={{ flex: 1 }} />}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("max")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="gidilenMesafeMax"
              control={control}
              render={({ field }) => <InputNumber {...field} disabled={gidilenMesafeIslemDisabled} min={0} style={{ flex: 1 }} />}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("islem")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Selectbox name="gidilenMesafeIslem" disabled={gidilenMesafeIslemDisabled} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", marginTop: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("yakitMiktarKontrol")}</Text>
        <Controller name="yakitMiktarKontrol" control={control} render={({ field }) => <Switch {...field} />} />
      </div>

      <div style={{ display: "flex", gap: "15px", width: "100%", border: "1px solid #00000018", padding: "10px", borderRadius: "6px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("min")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="yakitMiktarMin"
              control={control}
              render={({ field }) => <InputNumber {...field} disabled={yakitMiktarIslemDisabled} min={0} style={{ flex: 1 }} />}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("max")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller
              name="yakitMiktarMax"
              control={control}
              render={({ field }) => <InputNumber {...field} disabled={yakitMiktarIslemDisabled} min={0} style={{ flex: 1 }} />}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("islem")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Selectbox name="yakitMiktarIslem" disabled={yakitMiktarIslemDisabled} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", marginTop: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("yakitTutarKontrol")}</Text>
        <Controller name="yakitTutarKontrol" control={control} render={({ field }) => <Switch {...field} />} />
      </div>

      <div style={{ display: "flex", gap: "15px", width: "100%", border: "1px solid #00000018", padding: "10px", borderRadius: "6px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("min")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="yakitTutarMin" control={control} render={({ field }) => <InputNumber {...field} disabled={yakitTutarIslemDisabled} min={0} style={{ flex: 1 }} />} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("max")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="yakitTutarMax" control={control} render={({ field }) => <InputNumber {...field} disabled={yakitTutarIslemDisabled} min={0} style={{ flex: 1 }} />} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("islem")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Selectbox name="yakitTutarIslem" disabled={yakitTutarIslemDisabled} />
          </div>
        </div>
      </div>

      <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("ortalamaYakitTuketimiOngorulenMinDegerdenDusuk")}</Text>
      <Selectbox1 name="yakitMinTuketimDusukIslem" />
      <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("ortalamaYakitTuketimiOngorulenMaxDegerdenFazla")}</Text>
      <Selectbox1 name="yakitMaxTuketimFazlaIslem" />
      <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("aracYakitDeposuKapasiteAsiminda")}</Text>
      <Selectbox1 name="yakitTankKapasiteAsimIslem" />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px", marginTop: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("yakitTankiKapasiteAsimindaUyariVer")}</Text>
        <Controller name="yakitTankKapasiteUyar" control={control} render={({ field }) => <Switch {...field} />} />
      </div>

      <Divider style={{ margin: "0" }} />

      <div style={{ display: "flex", gap: "5px", alignItems: "center", flexDirection: "row", marginBottom: "10px" }}>
        <Text style={{ fontSize: "14px", color: "#000000ff", fontWeight: "600" }}>{t("yakitFormatlari")}</Text>
        <Text style={{ fontSize: "13px", color: "#000000a4" }}>({t("ondalikHassasiyet")})</Text>
      </div>

      <div style={{ display: "flex", gap: "15px", width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("miktar")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="yakitMiktarFormat" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("ortalama")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="yakitOrtalamaFormat" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", width: "100%", flexDirection: "column", justifyContent: "space-between", gap: "8px" }}>
          <Text style={{ fontSize: "14px", color: "#000000a4" }}>{t("tutar")}</Text>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <Controller name="yakitTutarFormat" control={control} render={({ field }) => <InputNumber {...field} min={0} style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forms;

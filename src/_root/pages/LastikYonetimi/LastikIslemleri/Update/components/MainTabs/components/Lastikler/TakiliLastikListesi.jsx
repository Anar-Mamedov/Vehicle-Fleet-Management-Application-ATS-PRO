import React from "react";
import { Typography } from "antd";
import LastikTak from "../../components/LastikTak";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";

const { Text } = Typography;

export default function TakiliLastikListesi({ axleList, positionList }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
        <Text style={{ fontSize: "14px" }}>{t("installedTires")}</Text>
        <LastikTak axleList={axleList} positionList={positionList} />
      </div>
      <div style={{ padding: "20px" }}></div>
    </div>
  );
}

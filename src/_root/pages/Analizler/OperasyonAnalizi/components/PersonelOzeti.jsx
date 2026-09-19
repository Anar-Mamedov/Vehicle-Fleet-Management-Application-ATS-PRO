import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import KolonBasligi from "./KolonBasligi";
import TabloBolumu from "./TabloBolumu";
import { formatNumber, safeText } from "../utils/formatters";
import { personelKatilimRows } from "../utils/exportMappers";

export default function PersonelOzeti({ rows, onRefresh = undefined }) {
  // ellipsis: baslik ve hucreler tek satirda kalir, sigmayan kisim "..." ile kisaltilir
  const columns = [
    { title: t("personelTekil"), dataIndex: "isim", key: "isim", ellipsis: true, render: (value) => safeText(value) },
    { title: <KolonBasligi label={t("aktifGun")} aciklama={t("aktifGunAciklama")} />, dataIndex: "aktifGunSayisi", key: "aktifGunSayisi", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("operasyon"), dataIndex: "seferSayisi", key: "seferSayisi", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareket"), dataIndex: "hareketSayisi", key: "hareketSayisi", width: 95, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("hareketGun"), dataIndex: "hareketGunOrani", key: "hareketGunOrani", width: 110, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("farkliArac"), dataIndex: "farkliAracSayisi", key: "farkliAracSayisi", width: 105, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
    { title: t("guzergah"), dataIndex: "guzergahSayisi", key: "guzergahSayisi", width: 100, align: "right", ellipsis: true, render: (value) => formatNumber(value) },
  ];

  return (
    <TabloBolumu
      title={t("personelOperasyonKatilimi")}
      subtitle={t("personelOperasyonKatilimiAciklama")}
      columns={columns}
      rows={rows}
      rowKey={(record, index) => `${record.isim}-${index}`}
      exportRows={personelKatilimRows}
      scrollX={780}
      onRefresh={onRefresh}
    />
  );
}

PersonelOzeti.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRefresh: PropTypes.func,
};

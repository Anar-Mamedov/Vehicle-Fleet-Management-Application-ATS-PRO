import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { Table, Typography } from "antd";
import { CarOutlined, NodeIndexOutlined, ProfileOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatDateByLocale } from "../../../../components/FormattedDate";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import SectionCard from "../components/SectionCard";
import { BORDER_COLOR, labelStyle } from "../components/uiStyles";

const { Text } = Typography;

const PREVIEW_PAGE_SIZE = 5;

const valueStyle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#141414",
  lineHeight: "20px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const renderText = (value) => value || "-";

// Ortak bilgiler önizlemede salt okunur etiket/değer ikilisi olarak gösterilir
const OzetSatiri = ({ label, value }) => (
  <div className="col-span-3" style={{ borderBottom: `1px solid ${BORDER_COLOR}`, paddingBottom: "8px" }}>
    <div style={labelStyle}>{label}</div>
    <div style={valueStyle}>{renderText(value)}</div>
  </div>
);

OzetSatiri.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
};

// 4. adım: oluşturulacak kayıtların salt okunur özeti
const OnizlemeAdimi = ({ araclar, hareketler }) => {
  const { getValues } = useFormContext();
  const values = getValues();

  const aracColumns = [
    { title: t("aracPlaka"), dataIndex: "plaka", key: "plaka", ellipsis: true, render: (text) => <span style={{ fontWeight: 600 }}>{renderText(text)}</span> },
    { title: t("aracTip"), dataIndex: "aracTip", key: "aracTip", ellipsis: true, render: renderText },
    { title: t("marka"), dataIndex: "marka", key: "marka", ellipsis: true, render: renderText },
    { title: t("model"), dataIndex: "model", key: "model", ellipsis: true, render: renderText },
  ];

  const hareketColumns = [
    { title: t("hareketTipi"), dataIndex: ["values", "oprTip"], key: "oprTip", ellipsis: true, render: renderText },
    { title: t("firma"), dataIndex: ["values", "firmaUnvan"], key: "firma", ellipsis: true, render: renderText },
    { title: t("guzergah"), dataIndex: ["values", "guzergah"], key: "guzergah", ellipsis: true, render: renderText },
    { title: t("vardiya"), dataIndex: ["values", "vardiya"], key: "vardiya", ellipsis: true, render: renderText },
    { title: t("miktar"), dataIndex: ["body", "gerceklesenMiktar"], key: "miktar", align: "right", render: (value) => formatNumberWithLocale(value ?? 0) },
    { title: t("birim"), dataIndex: ["values", "yuklemeBirim"], key: "birim", ellipsis: true, render: renderText },
    { title: t("hakedisTutari"), dataIndex: ["body", "hakedisTutar"], key: "hakedisTutar", align: "right", render: (value) => `₺${formatNumberWithLocale(value ?? 0, 2, 2)}` },
  ];

  return (
    <div className="grid gap-2">
      <div className="col-span-12">
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#141414", lineHeight: "26px" }}>{t("adimOnizleme")}</div>
        <Text type="secondary">{t("onizlemeAdimiAciklama")}</Text>
      </div>

      <div className="col-span-12">
        <SectionCard icon={<ProfileOutlined />} title={t("adimOrtakOperasyonBilgileri")}>
          <OzetSatiri label={t("operasyonTarihi")} value={formatDateByLocale(values.cikisTarih)} />
          <OzetSatiri label={t("operasyonTipi")} value={values.seferTip} />
          <OzetSatiri label={t("firma")} value={values.firma} />
          <OzetSatiri label={t("guzergah")} value={values.guzergah} />
          <OzetSatiri label={t("operasyonYeri")} value={values.seferYeri} />
          <OzetSatiri label={t("durum")} value={values.seferDurum} />
          <OzetSatiri label={t("operasyonSorumlusu")} value={values.seferSorumlusu} />
          <OzetSatiri label={t("proje")} value={values.proje} />
          <OzetSatiri label={t("departman")} value={values.departman} />
          <OzetSatiri label={t("isEmriNo")} value={values.isEmriNo} />
          <div className="col-span-12">
            <div style={labelStyle}>{t("aciklama")}</div>
            <div style={{ ...valueStyle, whiteSpace: "pre-wrap" }}>{renderText(values.aciklama)}</div>
          </div>
        </SectionCard>
      </div>

      <div className="col-span-12">
        <SectionCard icon={<CarOutlined />} title={`${t("secilenAraclar")} (${formatNumberWithLocale(araclar.length)})`}>
          <div className="col-span-12">
            <Table columns={aracColumns} dataSource={araclar} rowKey="aracId" size="small" pagination={{ pageSize: PREVIEW_PAGE_SIZE, size: "small", showSizeChanger: false }} />
          </div>
        </SectionCard>
      </div>

      <div className="col-span-12">
        <SectionCard icon={<NodeIndexOutlined />} title={`${t("operasyonHareketleri")} (${formatNumberWithLocale(hareketler.length)})`}>
          <div className="col-span-12">
            <Table columns={hareketColumns} dataSource={hareketler} size="small" pagination={{ pageSize: PREVIEW_PAGE_SIZE, size: "small", showSizeChanger: false }} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

OnizlemeAdimi.propTypes = {
  araclar: PropTypes.array.isRequired,
  hareketler: PropTypes.array.isRequired,
};

export default OnizlemeAdimi;

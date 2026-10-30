import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { t } from "i18next";
import { cardStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import DurumTag from "../components/DurumTag";
import { formatTarihSaatDegeri } from "../constants";

// İş emrinin durum tarihçesi (kapatma, iptal, yeniden açma); liste modal seviyesinde okunur ve buraya verilir
const Tarihce = ({ kayitlar, loading }) => {
  const columns = [
    { title: t("tarihSaat"), dataIndex: "islemTarih", key: "islemTarih", width: 160, render: (tarih) => (tarih ? formatTarihSaatDegeri(tarih) : "-") },
    { title: t("durum"), dataIndex: "durumId", key: "durumId", width: 150, render: (durum) => <DurumTag durum={durum} /> },
    { title: t("islemYapan"), dataIndex: "islemYapanIsim", key: "islemYapanIsim", width: 180, ellipsis: true, render: (text) => text || "-" },
    { title: t("iptalNedeni"), dataIndex: "neden", key: "neden", width: 180, ellipsis: true, render: (text) => text || "-" },
    { title: t("aciklama"), dataIndex: "aciklama", key: "aciklama", width: 300, ellipsis: true, render: (text) => text || "-" },
  ];

  return (
    <div style={cardStyle}>
      <span style={sectionTitleStyle}>{t("durumTarihcesi")}</span>
      <Table
        size="middle"
        columns={columns}
        dataSource={kayitlar}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
        scroll={{ x: columns.reduce((toplam, kolon) => toplam + kolon.width, 0) }}
      />
    </div>
  );
};

Tarihce.propTypes = {
  kayitlar: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
};

export default Tarihce;

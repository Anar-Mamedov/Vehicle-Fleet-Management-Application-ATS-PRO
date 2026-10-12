import React from "react";
import PropTypes from "prop-types";
import { Tag } from "antd";
import { t } from "i18next";
import { getDurumTanimi } from "../constants";

// Servis ekranındaki durum etiketi görünümü: durum renginin açık tonu zemin, koyu tonu çerçeve olur.
// Varsayılan olarak iş emri durumlarını gösterir; atanan işler için getTanim ile iş durumu tanımı verilir.
const DurumTag = ({ durum, getTanim = getDurumTanimi }) => {
  const tanim = getTanim(durum);
  if (!tanim) return "-";

  return (
    <Tag style={{ borderRadius: "12px", margin: 0, color: tanim.color, backgroundColor: `${tanim.color}1a`, border: `1px solid ${tanim.color}b3` }}>{t(tanim.labelKey)}</Tag>
  );
};

DurumTag.propTypes = {
  durum: PropTypes.number,
  getTanim: PropTypes.func,
};

export default DurumTag;

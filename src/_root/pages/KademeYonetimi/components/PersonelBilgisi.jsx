import React from "react";
import PropTypes from "prop-types";
import PersonelAvatar from "../../sistem-tanimlari/personel-tanim/components/PersonelAvatar";
import { hintStyle } from "../KademeTanimlari/components/uiStyles";

const isimStyle = { fontWeight: 500, color: "#141414", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

// Takip panellerindeki personel hücresi: fotoğraf (yoksa baş harfler) + isim + ünvan.
// Fotoğraf bilgisi servisteki personelVarsayilanResim alanıdır.
const PersonelBilgisi = ({ isim, unvan, resim }) => (
  <div className="flex" style={{ alignItems: "center", gap: "8px", minWidth: 0 }}>
    <PersonelAvatar isim={isim} defPhotoInfo={resim} />
    <div className="flex flex-col" style={{ minWidth: 0 }}>
      <span style={isimStyle}>{isim || "—"}</span>
      {unvan && <span style={{ ...hintStyle, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{unvan}</span>}
    </div>
  </div>
);

PersonelBilgisi.propTypes = {
  isim: PropTypes.string,
  unvan: PropTypes.string,
  resim: PropTypes.object,
};

export default PersonelBilgisi;

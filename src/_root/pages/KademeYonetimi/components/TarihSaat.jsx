import React from "react";
import PropTypes from "prop-types";
import { toDayjsOrNull, formatTimeForDisplay } from "../../../../utils/dateUtils";
import { formatDateByLocale } from "../../../components/FormattedDate";
import { hintStyle } from "../KademeTanimlari/components/uiStyles";

// Servisten ayrı gelen tarih ve saat alanlarını alt alta gösterir; tarih yoksa "—"
const TarihSaat = ({ tarih, saat }) => {
  if (!toDayjsOrNull(tarih)) return "—";

  const saatMetni = formatTimeForDisplay(saat, "");

  return (
    <div className="flex flex-col">
      <span>{formatDateByLocale(tarih)}</span>
      {saatMetni && <span style={hintStyle}>{saatMetni}</span>}
    </div>
  );
};

TarihSaat.propTypes = {
  tarih: PropTypes.string,
  saat: PropTypes.string,
};

export default TarihSaat;

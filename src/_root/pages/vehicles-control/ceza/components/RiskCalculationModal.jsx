import React from "react";
import { Modal } from "antd";
import { t } from "i18next";

const cellStyle = { border: "1px solid #f0f0f0", padding: "8px" };
const cellCenterStyle = { ...cellStyle, textAlign: "center" };
const headerStyle = { ...cellStyle, textAlign: "left", backgroundColor: "#fafafa" };

const RiskCalculationModal = ({ visible, onCancel }) => {
  return (
    <Modal
      title={t("riskModalTitle")}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <p>{t("riskModalFormul")}</p>
      <p>
        <strong>{t("riskModalFormulAciklama")}</strong>
      </p>

      <p>
        <strong>{t("riskModalCezaTuruAgirligi")}</strong>
      </p>
      <p dangerouslySetInnerHTML={{ __html: t("riskModalCezaTuruAciklama") }} />

      <div className="joplin-table-wrapper" style={{ overflowX: "auto", marginBottom: "16px", marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f0f0f0" }}>
          <thead>
            <tr>
              <th style={headerStyle}>
                <strong>{t("riskModalTabloBaslik")}</strong>
              </th>
              <th style={{ ...headerStyle, textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>{t("riskModalTutarAgirligi")}</li>
                </ul>
              </td>
              <td style={cellCenterStyle}>45</td>
            </tr>
            <tr>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>{t("riskModalCezaPuaniAgirligi")}</li>
                </ul>
              </td>
              <td style={cellCenterStyle}>25</td>
            </tr>
            <tr>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>{t("riskModalBelgeIslemi")}</li>
                </ul>
              </td>
              <td style={cellCenterStyle}>10</td>
            </tr>
            <tr>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>{t("riskModalMenBonusu")}</li>
                </ul>
              </td>
              <td style={cellCenterStyle}>10</td>
            </tr>
            <tr>
              <td style={cellStyle}>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  <li>{t("riskModalYargisalBonusu")}</li>
                </ul>
              </td>
              <td style={cellCenterStyle}>10</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>{t("riskModalTekrarKatsayisi")}</strong>
      </p>
      <p>{t("riskModalTekrarAciklama")}</p>
      <p>{t("riskModalTekrarDegerlendirme")}</p>
      <ul>
        <li>
          {t("riskModalIlkIhlal")} → <strong>1.00</strong>
        </li>
        <li>
          {t("riskModalIkinciTekrar")} → <strong>1.25</strong>
        </li>
        <li>
          {t("riskModalUcuncuTekrar")} → <strong>1.50</strong>
        </li>
        <li>
          {t("riskModalDortVeUzeri")} → <strong>1.75</strong>
        </li>
      </ul>
      <p>{t("riskModalTekrarNot")}</p>

      <p style={{ marginTop: "16px" }}>
        <strong>{t("riskModalZamanKatsayisi")}</strong>
      </p>
      <p>{t("riskModalZamanAciklama")}</p>
      <p>{t("riskModalZamanOrnekler")}</p>
      <ul>
        <li>
          {t("riskModalSon30Gun")} → <strong>1.50</strong>
        </li>
        <li>
          {t("riskModal31_90Gun")} → <strong>1.25</strong>
        </li>
        <li>
          {t("riskModal91_180Gun")} → <strong>1.00</strong>
        </li>
        <li>
          {t("riskModal181_365Gun")} → <strong>0.75</strong>
        </li>
        <li>
          {t("riskModal1YildanEski")} → <strong>0.50</strong>
        </li>
      </ul>
    </Modal>
  );
};

export default RiskCalculationModal;

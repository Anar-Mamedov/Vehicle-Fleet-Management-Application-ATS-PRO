import React from "react";
import { Modal, Tag } from "antd";
import { t } from "i18next";

const thStyle = {
  border: "1px solid #f0f0f0",
  padding: "8px 10px",
  textAlign: "left",
  backgroundColor: "#fafafa",
  fontSize: "13px",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const tdStyle = {
  border: "1px solid #f0f0f0",
  padding: "8px 10px",
  fontSize: "13px",
};

const severityColors = {
  critical: "red",
  medium: "orange",
  info: "blue",
};

const rules = [
  { id: 1, nameKey: "anomaliKural1", logicKey: "anomaliMantik1", paramKey: "anomaliParam1", fieldsKey: "anomaliAlan1", severity: "critical" },
  { id: 2, nameKey: "anomaliKural2", logicKey: "anomaliMantik2", paramKey: "anomaliParam2", fieldsKey: "anomaliAlan2", severity: "medium" },
  { id: 3, nameKey: "anomaliKural3", logicKey: "anomaliMantik3", paramKey: "anomaliParam3", fieldsKey: "anomaliAlan3", severity: "critical" },
  { id: 4, nameKey: "anomaliKural4", logicKey: "anomaliMantik4", paramKey: "anomaliParam4", fieldsKey: "anomaliAlan4", severity: "medium" },
  { id: 5, nameKey: "anomaliKural5", logicKey: "anomaliMantik5", paramKey: "anomaliParam5", fieldsKey: "anomaliAlan5", severity: "critical" },
  { id: 6, nameKey: "anomaliKural6", logicKey: "anomaliMantik6", paramKey: "anomaliParam6", fieldsKey: "anomaliAlan6", severity: "info" },
  { id: 7, nameKey: "anomaliKural7", logicKey: "anomaliMantik7", paramKey: "anomaliParam7", fieldsKey: "anomaliAlan7", severity: "critical" },
  { id: 8, nameKey: "anomaliKural8", logicKey: "anomaliMantik8", paramKey: "anomaliParam8", fieldsKey: "anomaliAlan8", severity: "critical" },
  { id: 9, nameKey: "anomaliKural9", logicKey: "anomaliMantik9", paramKey: "anomaliParam9", fieldsKey: "anomaliAlan9", severity: "medium" },
  { id: 10, nameKey: "anomaliKural10", logicKey: "anomaliMantik10", paramKey: "anomaliParam10", fieldsKey: "anomaliAlan10", severity: "critical" },
  { id: 11, nameKey: "anomaliKural11", logicKey: "anomaliMantik11", paramKey: "anomaliParam11", fieldsKey: "anomaliAlan11", severity: "info" },
  { id: 12, nameKey: "anomaliKural12", logicKey: "anomaliMantik12", paramKey: "anomaliParam12", fieldsKey: "anomaliAlan12", severity: "critical" },
  { id: 13, nameKey: "anomaliKural13", logicKey: "anomaliMantik13", paramKey: "anomaliParam13", fieldsKey: "anomaliAlan13", severity: "medium" },
  { id: 14, nameKey: "anomaliKural14", logicKey: "anomaliMantik14", paramKey: "anomaliParam14", fieldsKey: "anomaliAlan14", severity: "info" },
  { id: 15, nameKey: "anomaliKural15", logicKey: "anomaliMantik15", paramKey: "anomaliParam15", fieldsKey: "anomaliAlan15", severity: "medium" },
  { id: 16, nameKey: "anomaliKural16", logicKey: "anomaliMantik16", paramKey: "anomaliParam16", fieldsKey: "anomaliAlan16", severity: "critical" },
  { id: 17, nameKey: "anomaliKural17", logicKey: "anomaliMantik17", paramKey: "anomaliParam17", fieldsKey: "anomaliAlan17", severity: "critical" },
];

const AnomalyRulesModal = ({ visible, onCancel }) => {
  return (
    <Modal
      title={t("anomaliKurallariBaslik")}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={950}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #f0f0f0" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>{t("anomaliAdi")}</th>
              <th style={thStyle}>{t("anomaliKontrolMantigi")}</th>
              <th style={thStyle}>{t("anomaliVarsayilanParam")}</th>
              <th style={thStyle}>{t("anomaliGerekliAlanlar")}</th>
              <th style={thStyle}>{t("anomaliUyariSeviyesi")}</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td style={tdStyle}>{rule.id}</td>
                <td style={{ ...tdStyle, fontWeight: 500 }}>{t(rule.nameKey)}</td>
                <td style={tdStyle}>{t(rule.logicKey)}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{t(rule.paramKey)}</td>
                <td style={tdStyle}>{t(rule.fieldsKey)}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <Tag color={severityColors[rule.severity]}>{t(`anomaliSeviye_${rule.severity}`)}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default AnomalyRulesModal;

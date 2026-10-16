import React from "react";
import PropTypes from "prop-types";
import { Button, message, Popconfirm } from "antd";
import { CopyOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { DuplicateExpeditionOperationsService } from "../../../../../../../api/services/vehicles/operations_services";

export default function Kopyala({ selectedRows, refreshTableData, hidePopover }) {
  const handleCopy = async () => {
    try {
      const response = await DuplicateExpeditionOperationsService(selectedRows.map((row) => row.key));
      const statusCode = response?.data?.statusCode;

      if ([200, 201, 202, 204].includes(statusCode)) {
        message.success(t("islemBasarili"));
        refreshTableData();
        hidePopover();
      } else if (statusCode === 401) {
        message.error(t("buIslemiYapmayaYetkinizYok"));
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    }
  };

  return (
    <div>
      <Popconfirm
        title={t("hareketleriKopyala")}
        description={t("hareketKopyalamaOnay", { adet: selectedRows.length })}
        onConfirm={handleCopy}
        okText={t("evet")}
        cancelText={t("hayir")}
        icon={<QuestionCircleOutlined />}
      >
        <Button style={{ paddingLeft: "0px" }} type="link" icon={<CopyOutlined />}>
          {t("kopyala")}
        </Button>
      </Popconfirm>
    </div>
  );
}

Kopyala.propTypes = {
  selectedRows: PropTypes.array.isRequired,
  refreshTableData: PropTypes.func.isRequired,
  hidePopover: PropTypes.func.isRequired,
};

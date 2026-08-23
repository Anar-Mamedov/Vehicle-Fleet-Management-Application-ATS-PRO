import React from "react";
import PropTypes from "prop-types";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { DeleteExpeditionOperationItemsService } from "../../../../../../../api/services/vehicles/operations_services";

export default function Sil({ selectedRows, refreshTableData, hidePopover }) {
  const handleDelete = async () => {
    try {
      const response = await DeleteExpeditionOperationItemsService(selectedRows.map((row) => row.key));
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
    } catch (error) {
      console.error("Error deleting items:", error);
      message.error(t("islemBasarisiz"));
    }
  };

  return (
    <div>
      <Popconfirm
        title={t("silmeIslemi")}
        description={t("kaydiSilmekIstediginizdenEminMisiniz")}
        onConfirm={handleDelete}
        okText={t("evet")}
        cancelText={t("hayir")}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <Button style={{ paddingLeft: "0px" }} type="link" danger icon={<DeleteOutlined />}>
          {t("sil")}
        </Button>
      </Popconfirm>
    </div>
  );
}

Sil.propTypes = {
  selectedRows: PropTypes.array.isRequired,
  refreshTableData: PropTypes.func.isRequired,
  hidePopover: PropTypes.func.isRequired,
};

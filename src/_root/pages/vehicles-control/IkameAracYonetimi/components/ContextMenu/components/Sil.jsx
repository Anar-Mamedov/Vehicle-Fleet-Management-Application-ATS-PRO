import React from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { t } from "i18next";

export default function Sil({ selectedRows, refreshTableData, disabled, hidePopover }) {
  const buttonStyle = disabled ? { display: "none" } : {};

  const handleDelete = async () => {
    let isError = false;

    try {
      const body = selectedRows.map((row) => ({
        siraNo: row.siraNo || 0,
        aracId: row.aracId || 0,
      }));

      const response = await AxiosInstance.post("ReplacementVehicle/DeleteVehicleReplacementItem", body);

      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202 || response.data.statusCode === 204) {
        // Başarılı
        message.success(`${selectedRows.length} ${t("kayitSilindi") || "kayıt başarıyla silindi."}`);
      } else if (response.data.statusCode === 401) {
        message.error(t("yetkinizYok"));
        isError = true;
      } else {
        message.error(t("islemBasarisiz"));
        isError = true;
      }
    } catch (error) {
      message.error(t("islemBasarisiz"));
      isError = true;
    }

    if (!isError) {
      refreshTableData();
      if (hidePopover) hidePopover();
    }
  };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title={t("silmeIslemi")}
        description={`${selectedRows.length} ${t("kayitSilinecekEminMisiniz") || "kayıt silinecek. Emin misiniz?"}`}
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
  disabled: PropTypes.bool,
  hidePopover: PropTypes.func,
};

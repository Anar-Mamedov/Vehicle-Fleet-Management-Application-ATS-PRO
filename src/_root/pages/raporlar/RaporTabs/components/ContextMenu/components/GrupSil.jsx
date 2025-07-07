import React from "react";
import { Popconfirm, message, Typography } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../../api/http.jsx";
import { t } from "i18next";

const { Text } = Typography;

export default function GrupSil({ raporGrupID, onDeleteSuccess }) {
  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await AxiosInstance.get(`ReportGroup/DeleteReportGroupById?id=${Number(groupId)}`);
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 204) {
        message.success("Rapor grubu başarıyla silindi");

        // Parent bileşene silme işleminin başarılı olduğunu bildir
        if (onDeleteSuccess) {
          onDeleteSuccess(groupId);
        }
      } else if (response.data.statusCode === 409) {
        message.error(t("grupIcerigiVar"));
      } else if (response.data.statusCode === 500) {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Rapor grubu silinirken bir hata oluştu");
    }
  };

  return (
    <Popconfirm
      title="Rapor Grubu Silme"
      description="Bu rapor grubunu silmek istediğinize emin misiniz?"
      onConfirm={(e) => {
        e.stopPropagation();
        handleDeleteGroup(raporGrupID);
      }}
      okText="Evet"
      cancelText="Hayır"
      icon={
        <QuestionCircleOutlined
          style={{
            color: "red",
          }}
        />
      }
    >
      <DeleteOutlined
        style={{
          color: "#ff4d4f",
          cursor: "pointer",
          fontSize: "14px",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <Text style={{ color: "#ff4d4f", cursor: "pointer", fontSize: "14px", padding: "4px" }}>Grubu Sil</Text>
    </Popconfirm>
  );
}

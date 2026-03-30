import React from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Sil({ selectedRows, refreshTableData, disabled, hidePopover }) {
  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = disabled ? { display: "none" } : {};

  // Silme işlemini tetikleyecek fonksiyon
  const handleDelete = async () => {
    let isError = false;
    try {
      for (const row of selectedRows) {
        const response = await AxiosInstance.get(`HgsOperations/DeleteHgsOperationItemById?id=${row.key}`);
        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202 || response.data.statusCode === 204) {
          message.success("İşlem Başarılı.");
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
          isError = true;
        } else {
          message.error("İşlem Başarısız.");
          isError = true;
        }
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      isError = true;
    }
    if (!isError) {
      refreshTableData();
      hidePopover();
    }
  };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title="Silme İşlemi"
        description="Bu öğeyi silmek istediğinize emin misiniz?"
        onConfirm={handleDelete}
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
        <Button style={{ paddingLeft: "0px" }} type="link" danger icon={<DeleteOutlined />}>
          Sil
        </Button>
      </Popconfirm>
    </div>
  );
}

import React, { useEffect } from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default function Iptal({ selectedRows, refreshTableData, disabled, hidePopover }) {
  // İptal düğmesini gizlemek için koşullu stil
  const buttonStyle = disabled ? { display: "none" } : {};

  // İptal işlemini tetikleyecek fonksiyon
  const handleDelete = async () => {
    let isError = false;
    // Map over selectedRows to create an array of keys
    const keysToDelete = selectedRows.map((row) => row.key);

    try {
      // İptal API isteğini gönder, body olarak anahtar dizisini gönder
      const response = await AxiosInstance.get(`RequestNotifHandler/RevokeItemById?id=${keysToDelete[0]}`);
      console.log("İptal işlemi başarılı:", response);
      if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202 || response.data.statusCode === 204) {
        message.success("İşlem Başarılı.");
      } else if (response.data.statusCode === 401) {
        message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
      } else {
        message.error("İşlem Başarısız.");
      }
      // Burada başarılı iptal işlemi sonrası yapılacak işlemler bulunabilir.
    } catch (error) {
      console.error("İptal işlemi sırasında hata oluştu:", error);
      message.error("İptal işlemi sırasında bir hata oluştu."); // Kullanıcıya hata mesajı göster
      isError = true; // Hata durumunu işaretle
    }
    // Tüm iptal işlemleri tamamlandıktan sonra ve hata oluşmamışsa refreshTableData'i çağır
    if (!isError) {
      refreshTableData();
      hidePopover(); // İptal işlemi başarılı olursa Popover'ı kapat
    }
  };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title="İptal İşlemi"
        description="Bu öğeyi iptal etmek istediğinize emin misiniz?"
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
        <Button style={{ paddingLeft: "0px" }} type="link" danger>
          Iptal
        </Button>
      </Popconfirm>
    </div>
  );
}

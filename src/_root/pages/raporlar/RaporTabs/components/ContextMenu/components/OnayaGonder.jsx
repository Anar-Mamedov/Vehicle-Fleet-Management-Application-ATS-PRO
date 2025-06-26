import React, { useEffect } from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { BsSendCheck } from "react-icons/bs";

export default function Sil({ selectedRows, refreshTableData, disabled, hidePopover }) {
  // selectedRows.forEach((row, index) => {
  //   console.log(`Satır ${index + 1} ID: ${row.key}`);
  //   // Eğer id değerleri farklı bir özellikte tutuluyorsa, row.key yerine o özelliği kullanın. Örneğin: row.id
  // });

  // Sil düğmesini gizlemek için koşullu stil
  const buttonStyle = disabled ? { display: "none" } : {};

  // Silme işlemini tetikleyecek fonksiyon
  const handleDelete = async () => {
    let isError = false;
    // Seçili satırlar üzerinde döngü yaparak her birini sil
    for (const row of selectedRows) {
      try {
        // Silme API isteğini gönder
        const response = await AxiosInstance.post(`OnayaGonder`, {
          ONAY_TABLO_ID: Number(row.key),
          ONAY_TABLO_KOD: row.IST_KOD,
          ONAY_ONYTANIM_ID: 2,
        });
        console.log("Silme işlemi başarılı:", response);
        if (response.status_code === 200 || response.status_code === 201) {
          message.success("İşlem Başarılı.");
        } else if (response.status_code === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
        } else {
          message.error("İşlem Başarısız.");
        }
        // Burada başarılı silme işlemi sonrası yapılacak işlemler bulunabilir.
      } catch (error) {
        console.error("Silme işlemi sırasında hata oluştu:", error);
      }
    }
    // Tüm silme işlemleri tamamlandıktan sonra ve hata oluşmamışsa refreshTableData'i çağır
    if (!isError) {
      refreshTableData();
      hidePopover(); // Silme işlemi başarılı olursa Popover'ı kapat
    }
  };

  // const handleDelete = async () => {
  //   let isError = false;
  //   // Local storage'dan userId değerini al
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   // Seçili satırlar üzerinde döngü yaparak her birini sil
  //   for (const row of selectedRows) {
  //     try {
  //       // Silme API isteğini gönder
  //       const response = await AxiosInstance.post(`IsEmriDelete`, {
  //         ID: row.key,
  //         // KulID: user.userId,
  //       });
  //       console.log("Silme işlemi başarılı:", response);
  //       // Burada başarılı silme işlemi sonrası yapılacak işlemler bulunabilir.
  //     } catch (error) {
  //       console.error("Silme işlemi sırasında hata oluştu:", error);
  //     }
  //   }
  //   // Tüm silme işlemleri tamamlandıktan sonra ve hata oluşmamışsa refreshTableData'i çağır
  //   if (!isError) {
  //     refreshTableData();
  //     hidePopover(); // Silme işlemi başarılı olursa Popover'ı kapat
  //   }
  // };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title="Onaya Gönderme İşlemi"
        description="Bu öğeyi onaya göndermek istediğinize emin misiniz?"
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
        <Button style={{ paddingLeft: "0px", display: "flex", alignItems: "center" }} type="link" icon={<BsSendCheck />}>
          Onaya Gönder
        </Button>
      </Popconfirm>
    </div>
  );
}

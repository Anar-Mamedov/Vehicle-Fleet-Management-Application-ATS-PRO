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
      // Her seçili satır için silme işlemi yap
      for (const row of selectedRows) {
        // Tüm değerleri sıfırlanmış body oluştur
        const body = {
          siraNo: row.siraNo || 0,
          dtyAracId: row.dtyAracId,
          kiraBaslangic: null,
          krediIlkOdTarih: null,
          krediTutar: 0,
          krediAylikOdeme: 0,
          krediSure: 0,
          krediAciklama: "",
          krediIlgili: "",
          krediKiralama: false,
          krediUyar: false,
          kiralamaFirmaId: -1,
          krediHesapNo: "",
        };

        // Silme API isteğini gönder (aslında update ile sıfırlama)
        const response = await AxiosInstance.post("VehicleDetail/UpdateVehicleDetailsInfo?type=4", body);

        if (response.data.statusCode === 200 || response.data.statusCode === 201 || response.data.statusCode === 202 || response.data.statusCode === 204) {
          console.log(`Silme işlemi başarılı: ${row.plaka}`);
        } else if (response.data.statusCode === 401) {
          message.error("Bu işlemi yapmaya yetkiniz bulunmamaktadır.");
          isError = true;
          break;
        } else {
          message.error(`${row.plaka} için işlem başarısız.`);
          isError = true;
          break;
        }
      }

      if (!isError) {
        message.success(`${selectedRows.length} kayıt başarıyla silindi.`);
      }
    } catch (error) {
      console.error("Silme işlemi sırasında hata oluştu:", error);
      message.error("Silme işlemi sırasında bir hata oluştu!");
      isError = true;
    }

    // Tüm silme işlemleri tamamlandıktan sonra ve hata oluşmamışsa refreshTableData'i çağır
    if (!isError) {
      refreshTableData();
      hidePopover(); // Silme işlemi başarılı olursa Popover'ı kapat
    }
  };

  return (
    <div style={buttonStyle}>
      <Popconfirm
        title="Silme İşlemi"
        description={`${selectedRows.length} kayıt silinecek. Emin misiniz?`}
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

import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import ServisTanim from "../pages/sistem-tanimlari/servis-tanim/ServisTanim";
import EditDrawer from "../pages/vehicles-control/ServisIslemleri/Update/EditDrawer";
import AxiosInstance from "../../api/http";
import { t } from "i18next";

export default function RequestToService({ selectedRows = [], refreshTableData, hidePopover }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDrawer, setEditDrawer] = useState({
    visible: false,
    data: null,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleCloseEditDrawer = () => {
    setEditDrawer({
      visible: false,
      data: null,
    });
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleOk = async () => {
    if (!selectedService || selectedRows.length === 0) {
      message.warning("Lütfen servis seçin ve satır seçili olduğundan emin olun.");
      return;
    }

    setLoading(true);

    try {
      // selectedRows içindeki her obje için request body oluştur
      const requestBody = selectedRows.map((row) => ({
        bakimId: selectedService.bakimId,
        aracId: row.aracId,
        sikayetler: row.aciklama || "",
        talepId: row.siraNo,
        talepNo: row.talepNo,
        lokasyonId: row.lokasyonId,
        surucuId: row.talepEdenId,
        tarih: row.tarih,
        talepEdilenNesne: `${row.plaka} -> servisKayidi`,
        talepDurum: row.talepDurum || "",
        isDriver: row.isDriver,
      }));

      // API'ye gönder
      const response = await AxiosInstance.post("RequestNotifHandler/ToServiceItem", requestBody);

      if (response?.data?.statusCode === 200 || response?.data?.statusCode === 206) {
        message.success("Servis işlemi başarıyla oluşturuldu!");
        handleCloseModal();
        if (hidePopover) hidePopover();
        if (refreshTableData) refreshTableData();

        // Eğer tek bir kayıt seçiliyse EditDrawer'ı aç
        if (selectedRows.length === 1 && response.data.data) {
          setEditDrawer({
            visible: true,
            data: { key: response.data.data },
          });
        }
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Servis işlemi oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="link" onClick={handleOpenModal} style={{ padding: "unset", height: "unset" }}>
        {t("serviseAktar")}
      </Button>

      <Modal
        title="Servis Seçimi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCloseModal}
        width={1200}
        okText="Tamam"
        cancelText="İptal"
        confirmLoading={loading}
        okButtonProps={{ disabled: !selectedService }}
      >
        <ServisTanim isModalMode={true} onSelect={handleSelectService} />
      </Modal>

      <EditDrawer selectedRow={editDrawer.data} onDrawerClose={handleCloseEditDrawer} drawerVisible={editDrawer.visible} onRefresh={refreshTableData} />
    </div>
  );
}

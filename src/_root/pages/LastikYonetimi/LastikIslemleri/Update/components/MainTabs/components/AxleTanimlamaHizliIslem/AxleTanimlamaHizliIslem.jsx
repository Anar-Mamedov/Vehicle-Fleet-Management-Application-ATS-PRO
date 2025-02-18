import React, { useState } from "react";
import AxiosInstance from "../../../../../../../../../api/http";
import { Button, Modal } from "antd";
import AxleList from "./components/AxleList";

export default function AxleTanimlamaHizliIslem({ onRefresh1, selectedRows, refreshTableData, buttonStyle, buttonText = "Aks Tanımla" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAxleId, setSelectedAxleId] = useState(null);
  const [clearSelectData, setClearSelectData] = useState(false);

  const showModal = () => {
    setClearSelectData(true);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      if (!selectedAxleId) return;

      const vehicleIds = [selectedRows.key];

      await AxiosInstance.post(`TyreOperation/AssignAxelToVehicle?axelId=${selectedAxleId}`, vehicleIds);

      onRefresh1(selectedAxleId);
      setIsModalOpen(false);
      setSelectedAxleId(null);
      setClearSelectData(true);
    } catch (error) {
      console.error("Error updating axle:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAxleId(null);
    setClearSelectData(true);
  };

  const handleAxleSelect = (value) => {
    setClearSelectData(false);
    setSelectedAxleId(value);
  };

  return (
    <div>
      <div onClick={showModal} style={{ ...buttonStyle, cursor: "pointer", color: buttonStyle?.color || "inherit" }}>
        {buttonText}
      </div>
      <Modal
        title="Aks Tanımlama"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={!selectedAxleId}>
            Kaydet
          </Button>,
        ]}
      >
        <AxleList onSelect={handleAxleSelect} clearData={clearSelectData} />
      </Modal>
    </div>
  );
}

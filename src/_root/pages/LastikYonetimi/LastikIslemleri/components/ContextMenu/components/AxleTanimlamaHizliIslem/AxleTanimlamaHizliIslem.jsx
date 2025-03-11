import React, { useState } from "react";
import AxiosInstance from "../../../../../../../../api/http";
import { Button, Modal } from "antd";
import AxleList from "./components/AxleList";
import { t } from "i18next";

export default function AxleTanimlamaHizliIslem({ selectedRows, refreshTableData }) {
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

      const vehicleIds = selectedRows.map((row) => row.key);

      await AxiosInstance.post(`TyreOperation/AssignAxelToVehicle?axelId=${selectedAxleId}`, vehicleIds);

      refreshTableData();
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
      <div onClick={showModal} style={{ cursor: "pointer" }}>
        {t("aksTanimlama")}
      </div>
      <Modal
        title={t("aksTanimlama")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            {t("iptal")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={!selectedAxleId}>
            {t("kaydet")}
          </Button>,
        ]}
      >
        <AxleList onSelect={handleAxleSelect} clearData={clearSelectData} />
      </Modal>
    </div>
  );
}

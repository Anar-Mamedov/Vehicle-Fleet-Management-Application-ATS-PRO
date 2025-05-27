import React, { useEffect, useState } from "react";
import { t } from "i18next";
import KmLog from "../../../../../components/table/KmLog.jsx";
import { Button, Modal } from "antd";
import { GetVehicleByIdService } from "../../../../../../api/services/vehicles/vehicles/services.jsx";
import dayjs from "dayjs";
import { GetDocumentsByRefGroupService, GetPhotosByRefGroupService } from "../../../../../../api/services/upload/services.jsx";

function KmTakibi({ visible, onClose, ids, selectedRowsData }) {
  const [dataSource, setDataSource] = useState([]);
  const [kmHistryModal, setKmHistryModal] = useState(false);
  const [dataStatus, setDataStatus] = useState(false);

  /*  useEffect(() => {
    GetVehicleByIdService(ids).then((res) => {
      setDataSource(res.data);
    });
  }, [ids, status, dataStatus]); */

  const footer = [
    <Button key="back" className="btn cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  // Create a truncated title with ellipsis if needed
  const getTruncatedTitle = () => {
    const plakalar = selectedRowsData?.map((row) => row.plaka).join(", ");
    const maxLength = 50; // Adjust this value based on your UI requirements

    if (plakalar.length > maxLength) {
      return `${t("kilometreTakibi")}: ${plakalar.substring(0, maxLength)}...`;
    }

    return `${t("kilometreTakibi")}: ${plakalar}`;
  };

  return (
    <div>
      <Modal title={getTruncatedTitle()} open={visible} onCancel={onClose} maskClosable={false} footer={footer} width={1200}>
        <KmLog data={dataSource} selectedRowsData={selectedRowsData} setDataStatus={setDataStatus} />
      </Modal>
    </div>
  );
}

export default KmTakibi;

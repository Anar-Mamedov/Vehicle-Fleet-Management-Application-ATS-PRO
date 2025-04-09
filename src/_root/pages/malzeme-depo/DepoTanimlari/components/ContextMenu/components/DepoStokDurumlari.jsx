import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Table, Modal, Spin } from "antd";
import { t } from "i18next";

function DepoStokDurumlari({ selectedRows, refreshTableData, hidePopover }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: t("depoTanimi"),
      dataIndex: "depoTanimi",
      key: "depoTanimi",
    },
    {
      title: t("girenMiktar"),
      dataIndex: "girenMiktar",
      key: "girenMiktar",
    },
    {
      title: t("cikanMiktar"),
      dataIndex: "cikanMiktar",
      key: "cikanMiktar",
    },
    {
      title: t("stokMiktar"),
      dataIndex: "stokMiktar",
      key: "stokMiktar",
    },
    {
      title: t("birim"),
      dataIndex: "malzemeBirim",
      key: "malzemeBirim",
    },
  ];

  const fetchDepoData = async (diff = 0, targetPage = 1) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0 && tableData.length > 0) {
        // Moving forward
        currentSetPointId = tableData[tableData.length - 1]?.siraNo || 0;
      } else if (diff < 0 && tableData.length > 0) {
        // Moving backward
        currentSetPointId = tableData[0]?.siraNo || 0;
      }

      const response = await AxiosInstance.get(
        `WareHouseManagement/GetWareHouseStockStatusByMaterialId?setPointId=${currentSetPointId}&diff=${diff}&materialId=${selectedRows[0].key}`
      );

      if (response.data && response.data.list) {
        // Map the response data to match the table structure
        const formattedData = response.data.list.map((item, index) => ({
          ...item,
          key: item.siraNo,
        }));

        setTableData(formattedData);
        setTotalCount(response.data.totalCount || formattedData.length);
        setCurrentPage(targetPage);
      } else {
        setTableData([]);
        message.warning("Depo dağılım verisi bulunamadı.");
      }
    } catch (error) {
      console.error("Depo verileri alınamadı:", error);
      message.error("Depo verilerini alma sırasında bir hata oluştu.");
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchDepoData(diff, page);
  };

  const showModal = () => {
    setIsModalOpen(true);
    fetchDepoData(0, 1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={showModal}>
        {t("depoStokDurumlari")}
      </div>
      <Modal
        title={t("depoStokDurumlari")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t("kapat")}
          </Button>,
        ]}
        width={700}
      >
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{
              current: currentPage,
              total: totalCount,
              pageSize: pageSize,
              showTotal: (total, range) => `Toplam ${total}`,
              showSizeChanger: false,
              showQuickJumper: true,
              onChange: handleTableChange,
            }}
            bordered
          />
        </Spin>
      </Modal>
    </div>
  );
}

export default DepoStokDurumlari;

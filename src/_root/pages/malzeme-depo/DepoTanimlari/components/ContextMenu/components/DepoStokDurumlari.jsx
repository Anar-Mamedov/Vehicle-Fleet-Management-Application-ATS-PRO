import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../../../../api/http";
import { Button, message, Table, Modal, Spin, Input } from "antd";
import { t } from "i18next";

const { Search } = Input;

function DepoStokDurumlari({ selectedRows, refreshTableData, hidePopover }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKodu",
      key: "malzemeKodu",
      ellipsis: true,
      width: 130,
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "malzemeTanimi",
      key: "malzemeTanimi",
      ellipsis: true,
      width: 190,
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTip",
      key: "malzemeTip",
      ellipsis: true,
      width: 130,
    },
    /*  {
      title: t("malzemeMarka"),
      dataIndex: "malzemeMarkasi",
      key: "malzemeMarkasi",
      ellipsis: true,
      width: 130,
    },
    {
      title: t("malzemeModel"),
      dataIndex: "malzemeModeli",
      key: "malzemeModeli",
      ellipsis: true,
      width: 130,
    }, */
    {
      title: t("fiyat"),
      dataIndex: "birimFiyat",
      key: "birimFiyat",
      ellipsis: true,
      width: 130,
    },
    {
      title: t("girenMiktar"),
      dataIndex: "girenMiktar",
      key: "girenMiktar",
      ellipsis: true,
      width: 130,
    },
    {
      title: t("cikanMiktar"),
      dataIndex: "cikanMiktar",
      key: "cikanMiktar",
      ellipsis: true,
      width: 130,
    },
    {
      title: t("stokMiktar"),
      dataIndex: "stokMiktar",
      key: "stokMiktar",
      ellipsis: true,
      width: 130,
    },
  ];

  const fetchDepoData = async (diff = 0, targetPage = 1, searchParam = searchTerm) => {
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
        `WareHouseManagement/GetWareHouseStockStatusByWareHouseId?setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchParam}&wareHouseId=${selectedRows[0].key}`
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
    setSearchTerm("");
    fetchDepoData(0, 1, "");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchDepoData(0, 1, value);
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
        width={1000}
      >
        <div style={{ marginBottom: 10, width: "250px" }}>
          <Search placeholder={t("aramaYap")} onSearch={handleSearch} enterButton value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
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
            scroll={{ y: "calc(100vh - 335px)" }}
            bordered
          />
        </Spin>
      </Modal>
    </div>
  );
}

export default DepoStokDurumlari;

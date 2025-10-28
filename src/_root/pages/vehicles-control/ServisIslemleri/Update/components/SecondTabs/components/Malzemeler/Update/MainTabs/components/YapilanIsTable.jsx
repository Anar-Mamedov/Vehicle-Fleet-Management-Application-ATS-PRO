import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input, message } from "antd";
import AxiosInstance from "../../../../../../../../../../../../api/http";
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import AddModal from "../../../../../../../../../../malzeme-depo/malzeme/AddModal.jsx";

const { Search } = Input;

// Türkçe karakterleri İngilizce karşılıkları ile değiştiren fonksiyon
const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
};

export default function YapilanIsTable({ workshopSelectedId, onSubmit, wareHouseId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      title: "Malzeme Kodu",
      dataIndex: "malzemeKod",
      key: "malzemeKod",
      width: 150,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.malzemeKod === null) return -1;
        if (b.malzemeKod === null) return 1;
        return a.malzemeKod.localeCompare(b.malzemeKod);
      },
    },
    {
      title: "Malzeme Tanımı",
      dataIndex: "tanim",
      key: "tanim",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Giren Miktar",
      dataIndex: "girenMiktar",
      key: "girenMiktar",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Çıkan Miktar",
      dataIndex: "cikanMiktar",
      key: "cikanMiktar",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Stok Miktarı",
      dataIndex: "stokMiktar",
      key: "stokMiktar",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Birim",
      dataIndex: "birim",
      key: "birim",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Maliyet ??",
      dataIndex: "ucret",
      key: "ucret",
      width: 100,
      ellipsis: true,
    },
  ];

  // Single, clean API Data Fetching function
  const fetchData = useCallback(
    async (diff, targetPage, parameterOverride = null) => {
      setLoading(true);
      try {
        let currentSetPointId = 0;

        if (diff !== 0) {
          // Moving forward or backward
          if (diff > 0) {
            currentSetPointId = data[data.length - 1]?.malzemeId || 0;
          } else if (diff < 0) {
            currentSetPointId = data[0]?.malzemeId || 0;
          }
        }

        // Use parameterOverride if provided, otherwise use searchTerm from state
        const parameterValue = parameterOverride !== null ? parameterOverride : searchTerm;

        const response = await AxiosInstance.post(
          `Material/GetMaterialList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${parameterValue}&wareHouseId=${wareHouseId || 0}`
        );

        const total = response.data.total_count;
        setTotalCount(total);
        setCurrentPage(targetPage);

        const newData = response.data.materialList.map((item) => ({
          ...item,
          key: item.malzemeId,
        }));

        if (newData.length > 0) {
          setData(newData);
        } else {
          message.warning("Veri bulunamadı.");
          setData([]);
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        message.error("Veri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, wareHouseId, data]
  );

  const handleModalToggle = () => {
    setIsModalVisible((prev) => {
      if (!prev) {
        // Clear search term
        setSearchTerm("");
        setData([]);
        // Pass empty string directly to fetchData
        fetchData(0, 1, "");
        setSelectedRowKeys([]);
      }
      return !prev;
    });
  };

  const handleModalOk = () => {
    const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
    if (selectedData) {
      onSubmit && onSubmit(selectedData);
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
  }, [workshopSelectedId]);

  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };

  // Handle page change correctly, exactly like in Malzemeler.jsx
  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  const handleSearch = () => {
    fetchData(0, 1);
    setCurrentPage(1);
  };

  const handleAddModalRefresh = useCallback(() => {
    fetchData(0, 1);
  }, [fetchData]);

  return (
    <div>
      <Button onClick={handleModalToggle}> + </Button>
      <Modal width={1200} centered title="Malzeme Listesi" destroyOnClose open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", gap: "12px" }}>
          <Search
            style={{ width: "250px" }}
            placeholder={t("aramaYap")}
            onSearch={handleSearch}
            enterButton
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddModal onRefresh={handleAddModalRefresh} />
        </div>
        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: onRowSelectChange,
          }}
          bordered
          scroll={{ y: "calc(100vh - 380px)" }}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: currentPage,
            total: totalCount,
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: handleTableChange,
            showTotal: (total) => `Toplam ${total}`,
          }}
        />
      </Modal>
    </div>
  );
}

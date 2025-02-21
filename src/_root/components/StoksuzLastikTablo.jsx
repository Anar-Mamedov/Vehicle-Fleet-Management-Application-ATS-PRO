import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input, Spin } from "antd";
import AxiosInstance from "../../api/http";
import { SearchOutlined } from "@ant-design/icons";

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

export default function StoksuzLastikTablo({ workshopSelectedId, onSubmit, selectedRowID, onClear }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: "Tanım",
      dataIndex: "tanim",
      key: "tanim",
      width: 120,
      ellipsis: true,
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => {
        if (a.tanim === null) return -1;
        if (b.tanim === null) return 1;
        return a.tanim.localeCompare(b.tanim);
      },
    },
    {
      title: "Marka",
      dataIndex: "marka",
      key: "marka",
      width: 130,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.marka === null) return -1;
        if (b.marka === null) return 1;
        return a.marka.localeCompare(b.marka);
      },
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      width: 130,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.model === null) return -1;
        if (b.model === null) return 1;
        return a.model.localeCompare(b.model);
      },
    },
    {
      title: "Tip",
      dataIndex: "tip",
      key: "tip",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.tip === null) return -1;
        if (b.tip === null) return 1;
        return a.tip - b.tip;
      },
    },
    {
      title: "Ebat",
      dataIndex: "ebat",
      key: "ebat",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.ebat === null) return -1;
        if (b.ebat === null) return 1;
        return a.ebat - b.ebat;
      },
    },
    {
      title: "Firma",
      dataIndex: "firma",
      key: "firma",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.firma === null) return -1;
        if (b.firma === null) return 1;
        return a.firma - b.firma;
      },
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.aciklama === null) return -1;
        if (b.aciklama === null) return 1;
        return a.aciklama - b.aciklama;
      },
    },
    {
      title: "Lastik Ömrü",
      dataIndex: "lastikOmru",
      key: "lastikOmru",
      width: 120,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.lastikOmru === null) return -1;
        if (b.lastikOmru === null) return 1;
        return a.lastikOmru - b.lastikOmru;
      },
    },
    {
      title: "Basınç",
      dataIndex: "basinc",
      key: "basinc",
      width: 130,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.basinc === null) return -1;
        if (b.basinc === null) return 1;
        return a.basinc.localeCompare(b.basinc);
      },
    },
    {
      title: "Diş Derinlik",
      dataIndex: "disDerinlik",
      key: "disDerinlik",
      width: 130,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.disDerinlik === null) return -1;
        if (b.disDerinlik === null) return 1;
        return a.disDerinlik.localeCompare(b.disDerinlik);
      },
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      width: 130,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.fiyat === null) return -1;
        if (b.fiyat === null) return 1;
        return a.fiyat.localeCompare(b.fiyat);
      },
    },
  ];

  // API Data Fetching with pagination
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        currentSetPointId = data[0]?.siraNo || 0;
      }

      const response = await AxiosInstance.get(`Tyre/GetTyreList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`);

      const total = response.data?.recordCount || 0;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData =
        response.data?.list?.map((item) => ({
          ...item,
          key: item.siraNo,
        })) || [];

      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
    if (!isModalVisible) {
      fetchData(0, 1);
      setSelectedRowKeys([]);
    }
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

  // Search handling
  const handleSearch = () => {
    fetchData(0, 1);
  };

  // Table pagination handling
  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button onClick={handleModalToggle}> + </Button>
      <Button onClick={onClear} danger>
        -
      </Button>
      <Modal width={1200} centered title="Malzeme Talep Listesi" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <Input
          style={{ width: "300px", marginBottom: "15px" }}
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearch}
          suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
        />
        <Spin spinning={loading}>
          <Table
            rowSelection={{
              type: "radio",
              selectedRowKeys,
              onChange: onRowSelectChange,
            }}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
              current: currentPage,
              total: totalCount,
              pageSize: pageSize,
              showSizeChanger: false,
              showQuickJumper: true,
              onChange: handleTableChange,
            }}
            scroll={{ y: "calc(100vh - 330px)" }}
          />
        </Spin>
      </Modal>
    </div>
  );
}

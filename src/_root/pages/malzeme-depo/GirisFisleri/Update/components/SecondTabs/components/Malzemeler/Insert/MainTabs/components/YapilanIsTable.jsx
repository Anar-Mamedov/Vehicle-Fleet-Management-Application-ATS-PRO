import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import AxiosInstance from "../../../../../../../../../../../../api/http";
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";

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

export default function YapilanIsTable({ workshopSelectedId, onSubmit }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

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

  const fetch = useCallback((page = pagination.current, term = searchTerm) => {
    setLoading(true);
    AxiosInstance.post(`Material/GetMaterialList?page=${page}&parameter=${term}`)
      .then((response) => {
        const { materialList, total_count } = response.data;
        const fetchedData = materialList.map((item) => ({
          ...item,
          key: item.malzemeId,
        }));
        setData(fetchedData);
        setPagination((prev) => ({
          ...prev,
          current: page,
          total: total_count,
        }));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleModalToggle = () => {
    setIsModalVisible((prev) => {
      if (!prev) {
        // Eğer modal açılıyorsa
        fetch(1, searchTerm); // İlk sayfayı ve mevcut arama terimini kullanarak veriyi getir
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

  const handleTableChange = (newPagination) => {
    fetch(newPagination.current, searchTerm);
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timeout = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetch(1, searchTerm); // Arama yaparken her zaman ilk sayfadan başla
        setSearchCount(searchCount + 1);
      } else if (searchTerm.trim() === "" && searchCount > 0) {
        fetch(1, ""); // Arama terimi boşsa, ilk sayfadan başla
      }
    }, 2000);

    setDebounceTimer(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetch]);

  return (
    <div>
      <Button onClick={handleModalToggle}> + </Button>
      <Modal width={1200} centered title="Malzeme Listesi" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <Input
          style={{ width: "250px", marginBottom: "10px" }}
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        />
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
            ...pagination,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kayıt`,
          }}
          onChange={handleTableChange}
        />
      </Modal>
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import AxiosInstance from "../../../../../../../../../api/http";
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
  });

  const columns = [
    {
      title: "Tanım",
      dataIndex: "tanim",
      key: "tanim",
      width: 150,
      ellipsis: true,
      sorter: (a, b) => {
        if (a.tanim === null) return -1;
        if (b.tanim === null) return 1;
        return a.tanim.localeCompare(b.tanim);
      },
    },
    {
      title: "İş Tipi",
      dataIndex: "isTip",
      key: "isTip",
      width: 150,
      ellipsis: true,
    },
    {
      title: "İş Grubu",
      dataIndex: "bakimDepartman",
      key: "bakimDepartman",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Süre (Saat)",
      dataIndex: "saat",
      key: "saat",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Süre (Dakika)",
      dataIndex: "dakika",
      key: "dakika",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Ücret",
      dataIndex: "ucret",
      key: "ucret",
      width: 100,
      ellipsis: true,
    },
  ];

  const fetch = useCallback(() => {
    setLoading(true);

    AxiosInstance.get(`WorkCard/GetWorkCardsList?page=${pagination.current}&parameter=${searchTerm}`)
      .then((response) => {
        const { list, recordCount } = response.data; // Destructure the list and recordCount from the response
        const fetchedData = list.map((item) => ({
          ...item,
          key: item.isTanimId,
        }));
        setData(fetchedData);
        setPagination({
          ...pagination,
          total: recordCount, // Update the total number of records for pagination
        });
      })
      .finally(() => setLoading(false));
  }, [pagination.current, searchTerm]);

  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
    if (!isModalVisible) {
      fetch();
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

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timeout = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetch(); // Trigger the API request based on your search logic
        setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 when search term changes
        setSearchCount(searchCount + 1);
      } else if (searchTerm.trim() === "" && searchCount > 0) {
        fetch(); // Fetch data without search term
        setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 when search term changes
      }
    }, 2000);

    setDebounceTimer(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetch]);

  return (
    <div>
      <Button onClick={handleModalToggle}> + </Button>
      <Modal width={1200} centered title="Servis Kodları" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
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
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Modal>
    </div>
  );
}

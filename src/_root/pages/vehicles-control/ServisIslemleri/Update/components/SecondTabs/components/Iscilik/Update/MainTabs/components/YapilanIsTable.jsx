import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import AxiosInstance from "../../../../../../../../../../../../api/http";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

// normalizeText was unused; removed to satisfy lint rules

export default function YapilanIsTable({ workshopSelectedId, onSubmit }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const hasSearchedRef = useRef(false);

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

  const fetch = useCallback(
    (page = pagination.current) => {
      setLoading(true);

      AxiosInstance.get(`WorkCard/GetWorkCardsList?page=${page}&parameter=${searchTerm}`)
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
    },
    [pagination, searchTerm]
  );

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
    fetch(newPagination.current);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetch(1);
        hasSearchedRef.current = true;
      } else if (searchTerm.trim() === "" && hasSearchedRef.current) {
        setPagination((prev) => ({ ...prev, current: 1 }));
        fetch(1);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetch]);

  return (
    <div>
      <Button onClick={handleModalToggle}> + </Button>
      <Modal width={1200} centered title="Yapılan İş" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
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

YapilanIsTable.propTypes = {
  workshopSelectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSubmit: PropTypes.func,
};

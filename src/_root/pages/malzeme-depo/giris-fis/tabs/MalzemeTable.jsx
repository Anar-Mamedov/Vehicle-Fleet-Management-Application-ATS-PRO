import { useEffect, useState } from "react";
import { Input, Table, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { GetMaterialListService } from "../../../../../api/services/malzeme/services";

const MalzemeTable = ({
  setSelectedRows,
  selectedRowKeys,
  setSelectedRowKeys,
  keys,
  rows,
  setKeys,
  setRows,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const columns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: "malzemeKod",
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "tanim",
      key: "tanim",
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTipKodText",
      key: "malzemeTipKodText",
    },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: "birim",
    },
    {
      title: t("marka"),
      dataIndex: "marka",
      key: "marka",
    },
    {
      title: t("model"),
      dataIndex: "model",
      key: "model",
    },
    {
      title: t("malzemeSinif"),
      dataIndex: "malzemeSinif",
      key: "malzemeSinif",
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsInitialLoading(true);
      const res = await GetMaterialListService(
        search,
        tableParams.pagination.current
      );
      setLoading(false);
      setIsInitialLoading(false);
      setDataSource(res?.data.materialList);
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.total_count,
        },
      }));
    };

    fetchData();
  }, [search, tableParams.pagination.current]);

  const handleRowSelectionChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleHandleRowSelection = (row, selected) => {
    console.log(row)
    if (selected) {
      if (!keys.includes(row.malzemeId)) {
        setKeys([...keys, row.malzemeId]);
        setRows([...rows, row]);
      }
    } else {
      const filteredKeys = keys.filter((key) => key !== row.malzemeId);
      const filteredRows = rows.filter(
        (item) => item.malzemeId !== row.malzemeId
      );
      setKeys(filteredKeys);
      setRows(filteredRows);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedRowKeys", JSON.stringify(keys));
  }, [keys]);

  useEffect(() => {
    setSelectedRows(rows);
  }, [rows]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataSource([]);
    }
  };

  useEffect(() => {
    const storedSelectedKeys =
      JSON.parse(localStorage.getItem("selectedRowKeys")) || [];
    setSelectedRowKeys(storedSelectedKeys);
  }, [tableParams.pagination.current, localStorage.getItem("selectedRowKeys")]);

  // Custom loading icon
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
  );

  return (
    <>
      <Input
        placeholder={t("arama")}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "30%" }}
      />
      <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
        <Table
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelectionChange,
            onSelect: handleHandleRowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          pagination={{
            ...tableParams.pagination,
            showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
            locale: {
              items_per_page: `/ ${t("sayfa")}`,
            },
          }}
          onChange={handleTableChange}
          loading={loading}
          rowKey="malzemeId"
          locale={{
            emptyText: "Veri Bulunamadı",
          }}
        />
      </Spin>
    </>
  );
};

export default MalzemeTable;

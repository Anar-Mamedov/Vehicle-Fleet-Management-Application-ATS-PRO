import React, { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Table, Popover, Button, Input, Spin } from "antd";
import { MenuOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { GetFuelMaterialListService } from "../../../../api/services/yakit-yonetimi/services";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const breadcrumb = [{ href: "/", title: <HomeOutlined /> }, { title: t("yakitTanimlari") }];

const YakitTanimlar = () => {
  const [dataSource, setDataSource] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [openRowHeader, setOpenRowHeader] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState([]);

  const baseColumns = [
    {
      title: t("yakitKod"),
      dataIndex: "malzemeKod",
      key: 1,
      render: (text, record) => (
        <Button
          onClick={() => {
            setUpdateModal(true);
            setId(record.malzemeId);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("yakitTanimi"),
      dataIndex: "tanim",
      key: 2,
    },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: 3,
    },
    {
      title: t("yakitTip"),
      dataIndex: "yakitTipKodText",
      key: 4,
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: 5,
    },
    {
      title: t("girenMiktar"),
      dataIndex: "girenMiktar",
      key: 6,
    },
    {
      title: t("cikanMiktar"),
      dataIndex: "cikanMiktar",
      key: 7,
    },
    {
      title: t("stokMiktar"),
      dataIndex: "stokMiktar",
      key: 8,
    },
    {
      title: t("sonAlisTarihi"),
      dataIndex: "sonAlisTarih",
      key: 9,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: 10,
    },
  ];

  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: `${i}`,
      onHeaderCell: () => ({
        id: `${i}`,
      }),
    }))
  );

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const fetchData = async (diff, targetPage, currentSize = tableParams.pagination.pageSize) => {
    setLoading(true);
    setIsInitialLoading(true);

    let currentSetPointId = 0;

    if (diff > 0 && dataSource.length > 0) {
      currentSetPointId = dataSource[dataSource.length - 1]?.malzemeId || 0;
    } else if (diff < 0 && dataSource.length > 0) {
      currentSetPointId = dataSource[0]?.malzemeId || 0;
    } else {
      currentSetPointId = 0;
    }

    try {
      const res = await GetFuelMaterialListService(search, diff, currentSetPointId, currentSize, filterData);
      setDataSource(res?.data.materialList || []);
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          current: targetPage ?? prevTableParams.pagination.current,
          pageSize: currentSize,
          total: res?.data.total_count,
        },
      }));
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    const currentSize = tableParams.pagination?.pageSize || 10;

    setTableParams((prevTableParams) => ({
      ...prevTableParams,
      pagination: {
        ...prevTableParams.pagination,
        current: 1,
      },
    }));

    fetchData(0, 1, currentSize);
  }, [search, status, filterData]);

  const handleTableChange = (pagination, filters, sorter) => {
    const nextPageSize = pagination.pageSize || tableParams.pagination?.pageSize || 10;
    const nextPage = pagination.current || 1;
    const prevPage = tableParams.pagination?.current || 1;
    const prevPageSize = tableParams.pagination?.pageSize || 10;

    if (nextPageSize !== prevPageSize) {
      setTableParams({
        pagination: {
          ...pagination,
          current: 1,
          pageSize: nextPageSize,
        },
        filters,
        ...sorter,
      });

      setDataSource([]);
      fetchData(0, 1, nextPageSize);
      return;
    }

    const diff = nextPage - prevPage;

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    fetchData(diff, nextPage, nextPageSize);
  };

  const filter = (data) => {
    setLoading(true);
    setStatus(true);
    setFilterData(data);
  };

  const clear = () => {
    setLoading(true);
    setFilterData({});
  };

  const newColumns = columns.map((col) => ({
    ...col,
    hidden: !checkedList.includes(col.key),
  }));

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const moveCheckbox = (fromIndex, toIndex) => {
    const updatedColumns = [...columns];
    const [removed] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, removed);

    setColumns(updatedColumns);
    setCheckedList(updatedColumns.map((col) => col.key));
  };

  const content = <Content options={options} checkedList={checkedList} setCheckedList={setCheckedList} moveCheckbox={moveCheckbox} />;

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  // get selected rows data
  if (!localStorage.getItem("selectedRowKeys")) localStorage.setItem("selectedRowKeys", JSON.stringify([]));

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setRows(selectedRows);
    // console.log("Selected Rows: ", selectedRows);
  };

  useEffect(() => localStorage.setItem("selectedRowKeys", JSON.stringify(selectedRowKeys)), [selectedRowKeys]);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem("selectedRowKeys"));
    if (storedSelectedKeys.length) {
      setSelectedRowKeys(storedSelectedKeys);
    }
  }, []);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem("selectedRowKeys"));
    if (storedSelectedKeys.length) {
      setSelectedRowKeys(storedSelectedKeys);
    }
  }, [tableParams.pagination.current]);

  return (
    <>
      {/* <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div> */}

      <div className="content">
        <div className="flex justify-between align-center">
          <div className="flex align-center gap-1">
            <Popover content={content} placement="bottom" trigger="click" open={openRowHeader} onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}>
              <Button className="btn primary-btn">
                <MenuOutlined />
              </Button>
            </Popover>
            <Input placeholder={t("arama")} onChange={(e) => setSearch(e.target.value)} />
            <AddModal setStatus={setStatus} />
            {/* <Filter filter={filter} clearFilters={clear} /> */}
          </div>
        </div>
      </div>

      <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} setStatus={setStatus} id={id} />

      <div className="content">
        <DragAndDropContext items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              rowKey={(record) => record.malzemeId}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total) => (
                  <p className="text-info">
                    [{total} {t("kayit")}]
                  </p>
                ),
                locale: {
                  items_per_page: `/ ${t("sayfa")}`,
                },
              }}
              loading={loading}
              size="small"
              onChange={handleTableChange}
              rowSelection={{
                selectedRowKeys: selectedRowKeys,
                onChange: handleRowSelection,
              }}
              components={{
                header: {
                  cell: SortableHeaderCell,
                },
              }}
              locale={{
                emptyText: "Veri Bulunamadı",
              }}
            />
          </Spin>
        </DragAndDropContext>
      </div>
    </>
  );
};

export default YakitTanimlar;

import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input, Popconfirm, Spin } from "antd";
import { MenuOutlined, HomeOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { GetDriverListService } from "../../../../api/services/sistem-tanimlari/services";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const breadcrumb = [
  { href: "/", title: <HomeOutlined /> },
  { title: t("surucuTanimlari") },
];

const Suruculer = () => {
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
  const [id, setId] = useState(0);

  const baseColumns = [
    {
      title: t("surucuKodu"),
      dataIndex: "surucuKod",
      key: 1,
      render: (text, record) => (
        <Button
          onClick={() => {
            setUpdateModal(true);
            setId(record.surucuId);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("isim"),
      dataIndex: "isim",
      key: 2,
    },
    {
      title: t("departman"),
      dataIndex: "departman",
      key: 3,
    },
    {
      title: t("gorev"),
      dataIndex: "gorev",
      key: 4,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: 5,
    },
    {
      title: t("sskNo"),
      dataIndex: "sskNo",
      key: 6,
    },
    {
      title: t("ehliyet"),
      dataIndex: "ehliyet",
      key: 7,
      render: (text) => <Checkbox checked={text === "VAR" ? true : false} />,
    },
    {
      title: t("sinif"),
      dataIndex: "sinif",
      key: 8,
    },
    {
      title: t("ehliyetNo"),
      dataIndex: "ehliyetNo",
      key: 9,
    },
    {
      title: t("kanGrubu"),
      dataIndex: "kanGrubu",
      key: 10,
    },
    {
      title: t("dogumTarihi"),
      dataIndex: "dogumTarihi",
      key: 11,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("iseBaslamaTarihi"),
      dataIndex: "iseBaslamaTarihi",
      key: 12,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: `${t("telefon")} 1`,
      dataIndex: "telefon1",
      key: 13,
    },
    {
      title: `${t("telefon")} 2`,
      dataIndex: "telefon2",
      key: 14,
    },
    {
      title: t("cezaPuan"),
      dataIndex: "cezaPuani",
      key: 15,
    },
    {
      title: t("unvan"),
      dataIndex: "adres",
      key: 16,
    },
    {
      title: t("surucuTip"),
      dataIndex: "surucuTip",
      key: 17,
    },
    {
      title: "",
      dataIndex: "delete",
      key: 15,
      render: (_, record) => (
        <Popconfirm
          title={t("confirmQuiz")}
          cancelText={t("cancel")}
          okText={t("ok")}
          onConfirm={() => {
            handleDelete(record.personelId);
          }}
        >
          <DeleteOutlined style={{ color: "#dc3545" }} />
        </Popconfirm>
      ),
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsInitialLoading(true);
      const res = await GetDriverListService(
        search,
        tableParams.pagination.current,
        filterData
      );
      setLoading(false);
      setIsInitialLoading(false);
      setDataSource(res?.data.list);
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.recordCount,
        },
      }));
    };

    fetchData();
  }, [search, tableParams.pagination.current, status, filterData]);

  const handleTableChange = (pagination, filters, sorter) => {
    setLoading(true);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataSource([]);
    }
  };

  const handleDelete = (data) => {
    // DeleteFuelCardService(data.siraNo).then((res) => {
    //     if (res?.data.statusCode === 202) {
    //         setStatus(true);
    //     }
    // });
    // setStatus(false);
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

  const content = (
    <Content
      options={options}
      checkedList={checkedList}
      setCheckedList={setCheckedList}
      moveCheckbox={moveCheckbox}
    />
  );

  // Custom loading icon
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
  );

  // get selected rows data
  if (!localStorage.getItem("selectedRowKeys"))
    localStorage.setItem("selectedRowKeys", JSON.stringify([]));

  const handleRowSelection = (row, selected) => {
    if (selected) {
      if (!keys.includes(row.siraNo)) {
        setKeys((prevKeys) => [...prevKeys, row.siraNo]);
        setRows((prevRows) => [...prevRows, row]);
      }
    } else {
      setKeys((prevKeys) => prevKeys.filter((key) => key !== row.siraNo));
      setRows((prevRows) =>
        prevRows.filter((item) => item.siraNo !== row.siraNo)
      );
    }
  };

  useEffect(
    () => localStorage.setItem("selectedRowKeys", JSON.stringify(keys)),
    [keys]
  );

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(
      localStorage.getItem("selectedRowKeys")
    );
    if (storedSelectedKeys.length) {
      setKeys(storedSelectedKeys);
    }
  }, []);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(
      localStorage.getItem("selectedRowKeys")
    );
    if (storedSelectedKeys.length) {
      setSelectedRowKeys(storedSelectedKeys);
    }
  }, [tableParams.pagination.current]);

  return (
    <>
      <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <div className="content">
        <div className="flex justify-between align-center">
          <div className="flex align-center gap-1">
            <Popover
              content={content}
              placement="bottom"
              trigger="click"
              open={openRowHeader}
              onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}
            >
              <Button className="btn primary-btn">
                <MenuOutlined />
              </Button>
            </Popover>
            <Input
              placeholder={t("arama")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <AddModal setStatus={setStatus} />
            {/* <Filter filter={filter} clearFilters={clear} /> */}
          </div>
        </div>
      </div>

      <UpdateModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        setStatus={setStatus}
        id={id}
      />

      <div className="content">
        <DragAndDropContext items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              rowKey={(record) => record.surucuId}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total) => (
                  <p className="text-info">[{total} {t("kayit")}]</p>
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
                onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                onSelect: handleRowSelection,
              }}
              components={{
                header: {
                  cell: SortableHeaderCell,
                },
              }}
              scroll={{
                x: 2400,
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

export default Suruculer;

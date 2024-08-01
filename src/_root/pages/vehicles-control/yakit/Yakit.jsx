import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input, Popconfirm, Spin } from "antd";
import {
  MenuOutlined,
  HomeOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { DeleteFuelCardService, GetFuelListService } from "../../../../api/services/vehicles/operations_services";
import DragAndDropContext from '../../../components/drag-drop-table/DragAndDropContext';
import SortableHeaderCell from '../../../components/drag-drop-table/SortableHeaderCell';
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import BreadcrumbComp from '../../../components/breadcrumb/Breadcrumb';
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const breadcrumb = [
  { href: "/", title: <HomeOutlined />, },
  { title: t("yakitIslemleri"), },
];

const Yakit = () => {
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
  const [id, setId] = useState(0);
  const [filterData, setFilterData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);

  const baseColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: 1,
      render: (text, record) => (
        <Button
          className="plaka-button"
          onClick={() => {
            setUpdateModal(true);
            setId(record.siraNo);
          }}
        >
          <span>{text}</span>
        </Button>
      ),
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: 2,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("yakitTip"),
      dataIndex: "yakitTip",
      key: 3,
    },
    {
      title: t("alinanKm"),
      dataIndex: "sonAlinanKm",
      key: 4,
    },
    {
      title: t("kullanim"),
      dataIndex: "ozelKullanim",
      key: 5,
      render: (text, record) => (
        <Checkbox checked={record.ozelKullanim} readOnly />
      ),
    },
    {
      title: t("miktar"),
      dataIndex: "miktar",
      key: 6,
      render: (text, record) => (
        <div className="">
          <span>{text} </span>
          <span style={{ fontSize: "14px", color: "rgb(147 147 147)" }}>
            {record.birim === "LITRE" && "lt"}
          </span>
        </div>
      ),
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: 7,
    },
    {
      title: "Ortalama Tüketim",
      dataIndex: "tuketim",
      key: 8,
      render: (text) => (
        <p>
          {text} <ArrowUpOutlined style={{ color: "red" }} />
        </p>
      ),
    },
    {
      title: `${t("kmBasinaMaliyet")} --?`,
      dataIndex: "",
      key: 9,
    },
    {
      title: "Full Depo",
      dataIndex: "fullDepo",
      key: 10,
      render: (text, record) => <Checkbox checked={record.fullDepo} readOnly />,
    },
    {
      title: "Stoktan Kullanım",
      dataIndex: "stokKullanimi",
      key: 11,
      render: (text, record) => (
        <Checkbox checked={record.stokKullanimi} readOnly />
      ),
    },
    {
      title: t("surucu"),
      dataIndex: "surucuAdi",
      key: 12,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: 13,
    },
    {
      title: "İstasyon",
      dataIndex: "istasyon",
      key: 14,
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: 15,
    },
    {
      title: "",
      dataIndex: "delete",
      key: 16,
      render: (_, record) => (
        <Popconfirm
          title={t("confirmQuiz")}
          cancelText={t("cancel")}
          okText={t("ok")}
          onConfirm={() => handleDelete(record)}
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
      setIsInitialLoading(true)
      const res = await GetFuelListService(search, tableParams.pagination.current, filterData);
      setLoading(false);
      setIsInitialLoading(false)
      setDataSource(res?.data.fuel_list);
      setTableParams(prevTableParams => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.total_count,
        },
      }));
    };

    fetchData();
  }, [search, tableParams.pagination.current, status, filterData]);

  const handleDelete = (data) => {
    DeleteFuelCardService(data.siraNo).then((res) => {
      if (res?.data.statusCode === 202) {
        setStatus(true);
      }
    });
    setStatus(false);
  };

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

  const filter = (data) => {
    setLoading(true);
    setStatus(true);
    setFilterData(data);
  };

  const clear = () => {
    setLoading(true);
    setFilterData({});
  };

  const newColumns = columns.map(col => ({
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

  // get selected rows data
  if (!localStorage.getItem('selectedRowKeys')) localStorage.setItem('selectedRowKeys', JSON.stringify([]));

  const handleRowSelection = (row, selected) => {
    if (selected) {
      if (!keys.includes(row.siraNo)) {
        setKeys(prevKeys => [...prevKeys, row.siraNo]);
        setRows(prevRows => [...prevRows, row]);
      }
    } else {
      setKeys(prevKeys => prevKeys.filter(key => key !== row.siraNo));
      setRows(prevRows => prevRows.filter(item => item.siraNo !== row.siraNo));
    }
  };

  useEffect(() => localStorage.setItem('selectedRowKeys', JSON.stringify(keys)), [keys]);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem('selectedRowKeys'));
    if (storedSelectedKeys.length) {
      setKeys(storedSelectedKeys);
    }
  }, []);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem('selectedRowKeys'));
    if (storedSelectedKeys.length) {
      setSelectedRowKeys(storedSelectedKeys);
    }
  }, [tableParams.pagination.current]);

  // Custom loading icon
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
  );

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
              placeholder="Arama"
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
              rowKey={(record) => record.siraNo}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
                locale: {
                  items_per_page: `/ ${t('sayfa')}`,
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

export default Yakit;

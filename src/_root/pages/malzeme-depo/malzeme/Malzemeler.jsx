import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Table, Popover, Button, Input, Spin, Checkbox } from "antd";
import { MenuOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { GetMaterialListService } from "../../../../api/services/malzeme/services";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const breadcrumb = [
  { href: "/", title: <HomeOutlined /> },
  { title: t("malzemeTanimlari") },
];

const Malzemeler = () => {
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
  const [id, setId] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);

  const baseColumns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: 1,
      render: (text, record) => (
        <Button
          onClick={() => {
            setId(record.malzemeId);
            setUpdateModal(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "tanim",
      key: 2,
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTipKodText",
      key: 3,
    },
    {
      title: t("stokMiktar"),
      dataIndex: "stokMiktar",
      key: 4,
    },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: 5,
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: 6,
    },
    {
      title: t("tedarikci"),
      dataIndex: "tedarikci",
      key: 7,
    },
    {
      title: t("seriNo"),
      dataIndex: "seriNo",
      key: 8,
    },
    {
      title: t("barkodNo"),
      dataIndex: "barkodNo",
      key: 9,
    },
    {
      title: t("depo"),
      dataIndex: "depo",
      key: 10,
    },
    {
      title: t("bolum"),
      dataIndex: "bolum",
      key: 11,
    },
    {
      title: t("raf"),
      dataIndex: "raf",
      key: 12,
    },
    {
      title: t("kritikMik"),
      dataIndex: "kritikMiktar",
      key: 13,
    },
    {
      title: t("sonAlisTarihi"),
      dataIndex: "sonAlisTarih",
      key: 14,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("sonAlinanFirma"),
      dataIndex: "sonAlinanFirma",
      key: 15,
    },
    {
      title: t("sonAlinanFiyat"),
      dataIndex: "sonFiyat",
      key: 16,
    },
    {
      title: t("aktif"),
      dataIndex: "aktif",
      key: 17,
      render: (text, record) => (
        <Checkbox checked={record.ozelKullanim} readOnly />
      ),
    },
    {
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
      key: 18,
    },
    {
      title: t("girenMiktar"),
      dataIndex: "girenMiktar",
      key: 19,
    },
    {
      title: t("cikanMiktar"),
      dataIndex: "cikanMiktar",
      key: 20,
    },
    {
      title: t("yedekParca"),
      dataIndex: "yedekParca",
      key: 21,
      render: (text, record) => (
        <Checkbox checked={record.yedekParca} readOnly />
      ),
    },
    {
      title: t("sarfMalz"),
      dataIndex: "sarfMlz",
      key: 22,
      render: (text, record) => <Checkbox checked={record.sarfMlz} readOnly />,
    },
    {
      title: t("demirbas"),
      dataIndex: "demirBas",
      key: 23,
      render: (text, record) => <Checkbox checked={record.demirBas} readOnly />,
    },
    {
      title: t("degistirme"),
      dataIndex: "degistirme",
      key: 24,
      render: (text) => <p className="text-secondary">{text}</p>,
    },
    {
      title: t("olusturma"),
      dataIndex: "olusturma",
      key: 25,
      render: (text) => <p className="text-success">{text}</p>,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: 26,
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
      const res = await GetMaterialListService(
        search,
        tableParams.pagination.current,
        filterData
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
              rowKey={(record) => record.malzemeId}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total) => (
                  <p className="text-info">[{total} kayıt]</p>
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
                x: 2800,
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

export default Malzemeler;

import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import {
  Modal,
  Button,
  Table,
  Checkbox,
  Popconfirm,
  Input,
  Popover,
  Spin
} from "antd";
import {
  DeleteOutlined,
  MenuOutlined,
  ArrowUpOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import {
  DeleteFuelCardService,
  GetFuelListByVehicleIdService,
} from "../../../../../../api/services/vehicles/operations_services";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const Yakit = ({ visible, onClose, ids }) => {
  const { plaka } = useContext(PlakaContext);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [aracId, setAracId] = useState(0);
  const [search, setSearch] = useState("");
  const [openRowHeader, setOpenRowHeader] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await GetFuelListByVehicleIdService(
        search,
        tableParams.pagination.current,
        ids
      );
      setLoading(false);
      setIsInitialLoading(false);
      setDataSource(res?.data.fuel_list || []);
      setTotal({
        avg_consumption: res?.data.avg_consumption,
        avg_cost: res?.data.avg_cost,
        total_cost: res?.data.total_cost,
        total_quantity: res?.data.total_quantity,
      });
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count || 0,
        },
      });
    };

    fetchData();
  }, [search, tableParams.pagination.current, status, ids]);

  const handleDelete = (data) => {
    DeleteFuelCardService(data.siraNo).then((res) => {
      if (res?.data.statusCode === 202) {
        setStatus(true);
      }
    });
    setStatus(false);
  };

  const baseColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: 1,
      render: (text, record) => (
        <Button
          className="plaka-button"
          onClick={() => {
            setUpdateModalOpen(true);
            setId(record.siraNo);
            setAracId(record.aracId)
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

  const footer = [
    <Button key="back" className="btn cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  const plakaData = plaka.map((item) => item.plaka).join(", ");

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

  const newColumns = columns.map((col) => ({
    ...col,
    hidden: !checkedList.includes(col.key),
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
  if (!localStorage.getItem("selectedRowKeys"))
    localStorage.setItem("selectedRowKeys", JSON.stringify([]));

  const handleRowSelection = (row, selected) => {
    if (selected) {
      if (!keys.includes(row.aracId)) {
        setKeys((prevKeys) => [...prevKeys, row.aracId]);
        setRows((prevRows) => [...prevRows, row]);
      }
    } else {
      setKeys((prevKeys) => prevKeys.filter((key) => key !== row.aracId));
      setRows((prevRows) =>
        prevRows.filter((item) => item.aracId !== row.aracId)
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

  // Custom loading icon
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
  );

  return (
    <Modal
      title={`${t("yakitBilgileri")} - ${t("plaka")}: [${plakaData}]`}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1300}
    >
      <div className="flex align-center gap-1 mb-20">
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
          style={{ width: "20%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddModal setStatus={setStatus} />
      </div>

      <UpdateModal
        updateModal={updateModalOpen}
        setUpdateModal={setUpdateModalOpen}
        id={id}
        aracId={aracId}
        setStatus={setStatus}
        status={status}
      />

      <DragAndDropContext items={columns} setItems={setColumns}>
        <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
          <Table
            rowKey={(record) => record.siraNo}
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
            scroll={{
              x: 1500,
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

      <div className="grid gap-1 mt-10 text-center">
        <div className="col-span-3 p-10 border">
          <h3 className="text-secondary">{t("toplamMaliyet")}</h3>
          <p>
            {total?.total_cost} {t("tl")}
          </p>
        </div>
        <div className="col-span-3 p-10 border">
          <h3 className="text-secondary">{t("toplamMiktar")}</h3>
          <p>{total?.total_quantity} Lt</p>
        </div>
        <div className="col-span-3 p-10 border">
          <h3 className="text-secondary">
            {t("ortalamaTuketim")} <ArrowUpOutlined style={{ color: "red" }} />
          </h3>
          <p>{(total?.avg_consumption % 100).toFixed(2)} lt/100 km</p>
        </div>
        <div className="col-span-3 p-10 border">
          <h3 className="text-secondary">{t("ortalamaMaliyet")}</h3>
          <p>{total?.avg_cost} TL</p>
        </div>
      </div>
    </Modal>
  );
};

Yakit.propTypes = {
  ids: PropTypes.array,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default Yakit;

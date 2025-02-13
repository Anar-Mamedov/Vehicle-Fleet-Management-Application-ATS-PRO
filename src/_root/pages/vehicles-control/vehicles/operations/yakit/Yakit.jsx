import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Modal, Button, Table, Checkbox, Popconfirm, Input, Popover, Spin, Tooltip } from "antd";
import { DeleteOutlined, MenuOutlined, ArrowUpOutlined, LoadingOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import { DeleteFuelCardService, GetFuelListByVehicleIdService } from "../../../../../../api/services/vehicles/operations_services";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const Yakit = ({ visible, onClose, ids, selectedRowsData }) => {
  const { plaka } = useContext(PlakaContext);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [aracId, setAracId] = useState(0);
  const [openRowHeader, setOpenRowHeader] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (diff, targetPage) => {
    if (!ids || ids.length === 0) {
      setError("No vehicles selected");
      setLoading(false);
      setIsInitialLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        currentSetPointId = dataSource[dataSource.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        currentSetPointId = dataSource[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const response = await GetFuelListByVehicleIdService(diff, currentSetPointId, search, ids);

      if (response?.data) {
        setDataSource(response.data.fuel_list || []);
        setTotalDataCount(response.data.total_count || 0);
        setCurrentPage(targetPage);
        setTotal({
          avg_consumption: response.data.avg_consumption,
          avg_cost: response.data.avg_cost,
          total_cost: response.data.total_cost,
          total_quantity: response.data.total_quantity,
        });
      } else {
        setError("No data received from server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    if (visible && ids && ids.length > 0) {
      fetchData(0, 1);
    }
  }, [visible, ids, status]);

  // Handle search with debounce
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      fetchData(0, 1);
    }, 1000);

    setSearchTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [search]);

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
      ellipsis: true,
      width: 140,
      render: (text, record) => (
        <Button
          onClick={() => {
            setUpdateModalOpen(true);
            setId(record.siraNo);
            setAracId(record.aracId);
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
      ellipsis: true,
      width: 100,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("yakitTip"),
      dataIndex: "yakitTip",
      key: 3,
      ellipsis: true,
      width: 100,
    },
    {
      title: t("alinanKm"),
      dataIndex: "sonAlinanKm",
      key: 4,
      ellipsis: true,
      width: 100,
    },

    {
      title: t("miktar"),
      dataIndex: "miktar",
      key: 6,
      ellipsis: true,
      width: 100,
      render: (text, record) => (
        <div className="">
          <span>{text} </span>
          <span style={{ fontSize: "14px", color: "rgb(147 147 147)" }}>{record.birim === "LITRE" && "lt"}</span>
        </div>
      ),
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: 7,
      ellipsis: true,
      width: 100,
    },
    {
      title: t("ortalamaTuketim"),
      dataIndex: "ortalamaTuketim",
      key: "ortalamaTuketim",
      ellipsis: true,
      width: 100,
      render: (text, record) => {
        const { aracOnGorulenYakit, aracOnGorulenMinYakit, tuketim } = record;

        // Eğer tuketim değeri 0 veya undefined ise hiçbir şey gösterme
        if (tuketim === 0 || tuketim === undefined) {
          return null;
        }

        // Ondalıklı sayıyı 2 basamağa yuvarla ve 2 basamaklı hale getir
        const formattedGerceklesen = tuketim.toFixed(2);

        let icon = null;
        if (aracOnGorulenMinYakit !== null && aracOnGorulenMinYakit !== 0) {
          if (tuketim < aracOnGorulenMinYakit) {
            icon = <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
          } else if (tuketim > aracOnGorulenYakit) {
            icon = <ArrowUpOutlined style={{ color: "red", marginLeft: 4 }} />;
          } else if (tuketim >= aracOnGorulenMinYakit && tuketim <= aracOnGorulenYakit) {
            icon = <span style={{ marginLeft: 4 }}>~</span>;
          }
        } else if (aracOnGorulenYakit !== null && aracOnGorulenYakit !== 0) {
          if (tuketim < aracOnGorulenYakit) {
            icon = <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
          }
        }

        return (
          <Tooltip title={`Gerçekleşen: ${formattedGerceklesen}`}>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              {formattedGerceklesen}
              {icon}
            </span>
          </Tooltip>
        );
      },
    },

    {
      title: t("kmBasinaMaliyet"),
      dataIndex: "kmBasinaMaliyet",
      key: "kmBasinaMaliyet",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.tutarFormat),
              maximumFractionDigits: Number(record?.tutarFormat),
            })}
          </span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.kmBasinaMaliyet === null) return -1;
        if (b.kmBasinaMaliyet === null) return 1;
        return a.kmBasinaMaliyet - b.kmBasinaMaliyet;
      },
    },

    {
      title: t("farkKm"),
      dataIndex: "farkKm",
      key: "farkKm",
      width: 120,
      ellipsis: true,
      visible: true, // Varsayılan olarak açık
      render: (text, record) => (
        <div className="">
          <span>
            {Number(text).toLocaleString(localStorage.getItem("i18nextLng"), {
              minimumFractionDigits: Number(record?.tutarFormat),
              maximumFractionDigits: Number(record?.tutarFormat),
            })}
          </span>
        </div>
      ),
      sorter: (a, b) => {
        if (a.farkKm === null) return -1;
        if (b.farkKm === null) return 1;
        return a.farkKm - b.farkKm;
      },
    },

    {
      title: "Full Depo",
      dataIndex: "fullDepo",
      key: 10,
      ellipsis: true,
      width: 100,
      render: (text, record) => <Checkbox checked={record.fullDepo} readOnly />,
    },
    {
      title: "Stoktan Kullanım",
      dataIndex: "stokKullanimi",
      key: 11,
      ellipsis: true,
      width: 100,
      render: (text, record) => <Checkbox checked={record.stokKullanimi} readOnly />,
    },
    {
      title: t("surucu"),
      dataIndex: "surucuAdi",
      key: 12,
      ellipsis: true,
      width: 100,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: 13,
      ellipsis: true,
      width: 100,
    },
    {
      title: "İstasyon",
      dataIndex: "istasyon",
      key: 14,
      ellipsis: true,
      width: 100,
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: 15,
      ellipsis: true,
      width: 100,
    },
    {
      title: "",
      dataIndex: "delete",
      key: 16,
      render: (_, record) => (
        <Popconfirm title={t("confirmQuiz")} cancelText={t("cancel")} okText={t("ok")} onConfirm={() => handleDelete(record)}>
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
    if (pagination?.current && typeof pagination.current === "number") {
      const diff = pagination.current - currentPage;
      fetchData(diff, pagination.current);
    }
  };

  const footer = [
    <Button key="back" className="btn cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  // Add null check for plaka
  const plakaData = Array.isArray(plaka)
    ? plaka
        .map((item) => item?.plaka)
        .filter(Boolean)
        .join(", ")
    : "";

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

  const content = <Content options={options} checkedList={checkedList} setCheckedList={setCheckedList} moveCheckbox={moveCheckbox} />;

  // get selected rows data
  if (!localStorage.getItem("selectedRowKeys")) localStorage.setItem("selectedRowKeys", JSON.stringify([]));

  const handleRowSelection = (row, selected) => {
    if (selected) {
      if (!keys.includes(row.aracId)) {
        setKeys((prevKeys) => [...prevKeys, row.aracId]);
        setRows((prevRows) => [...prevRows, row]);
      }
    } else {
      setKeys((prevKeys) => prevKeys.filter((key) => key !== row.aracId));
      setRows((prevRows) => prevRows.filter((item) => item.aracId !== row.aracId));
    }
  };

  useEffect(() => localStorage.setItem("selectedRowKeys", JSON.stringify(keys)), [keys]);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem("selectedRowKeys"));
    if (storedSelectedKeys.length) {
      setKeys(storedSelectedKeys);
    }
  }, []);

  useEffect(() => {
    const storedSelectedKeys = JSON.parse(localStorage.getItem("selectedRowKeys"));
    if (storedSelectedKeys.length) {
      setSelectedRowKeys(storedSelectedKeys);
    }
  }, [tableParams.pagination.current]);

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  if (!visible) return null;

  return (
    <Modal
      title={`${t("yakitBilgileri")} - ${t("plaka")}: [${(selectedRowsData || []).map((item) => item.plaka).join(", ")}]`}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1300}
    >
      <div className="flex align-center gap-1 mb-20">
        <Popover content={content} placement="bottom" trigger="click" open={openRowHeader} onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}>
          <Button className="btn primary-btn">
            <MenuOutlined />
          </Button>
        </Popover>
        <Input placeholder={t("arama")} style={{ width: "20%" }} onChange={(e) => setSearch(e.target.value)} />
        <AddModal setStatus={setStatus} />
      </div>

      <UpdateModal updateModal={updateModalOpen} setUpdateModal={setUpdateModalOpen} id={id} aracId={aracId} setStatus={setStatus} status={status} />

      <DragAndDropContext items={columns} setItems={setColumns}>
        {isInitialLoading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>{error}</div>
        ) : (
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              rowKey={(record) => record.siraNo}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                current: currentPage,
                total: totalDataCount,
                pageSize: 10,
                showSizeChanger: false,
                showTotal: (total, range) => `Toplam ${total}`,
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
        )}
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

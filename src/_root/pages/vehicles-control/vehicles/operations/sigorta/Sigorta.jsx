import { useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Modal, Button, Table, Checkbox, Popconfirm, Input, Popover, Spin, message } from "antd";
import { DeleteOutlined, MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetInsuranceListByVehicleIdService } from "../../../../../../api/services/vehicles/operations_services";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../components/drag-drop-table/DraggableCheckbox";

const Sigorta = ({ visible, onClose, ids, selectedRowsData }) => {
  const { plaka } = useContext(PlakaContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [aracId, setAracId] = useState(0);
  const [search, setSearch] = useState("");
  const [openRowHeader, setOpenRowHeader] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [body, setBody] = useState({});
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsInitialLoading(true);
      try {
        let currentSetPointId = 0;
        const diff = 0; // Initial load with diff 0
        const res = await GetInsuranceListByVehicleIdService(diff, currentSetPointId, search, ids);
        setLoading(false);
        setIsInitialLoading(false);
        setDataSource(res?.data.list);
        setTotalDataCount(res?.data.recordCount);
        setData(res?.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setIsInitialLoading(false);
      }
    };
    fetchData();
  }, [search, status, ids]);

  const baseColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: 1,
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
      title: t("sigorta"),
      dataIndex: "sigorta",
      key: 2,
    },
    {
      title: t("aktif"),
      dataIndex: "aktif",
      key: 3,
      render: (text) => <Checkbox checked={text} />,
    },
    {
      title: t("baslangicTarih"),
      dataIndex: "baslangicTarih",
      key: 4,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("bitisTarih"),
      dataIndex: "bitisTarih",
      key: 5,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: `${t("kalanSure")} (${t("gun")})`,
      dataIndex: "kalanSure",
      key: 6,
      render: (text) => <p>{text}</p>,
    },
    {
      title: t("policeNo"),
      dataIndex: "policeNo",
      key: 7,
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: 8,
    },
    {
      title: t("firma"),
      dataIndex: "firma",
      key: 9,
    },
    {
      title: t("acenta"),
      dataIndex: "acenta",
      key: 10,
    },
    {
      title: t("yetkili"),
      dataIndex: "yetkili",
      key: 11,
    },
    {
      title: t("ruhsatBelgeSeriNo"),
      dataIndex: "ruhsatBelgeSeriNo",
      key: 12,
    },
    {
      title: t("aracBedeli"),
      dataIndex: "aracBedeli",
      key: 13,
    },
    {
      title: t("hasarsizlikIndirim"),
      dataIndex: "hasarIndirimi",
      key: 14,
    },
    {
      title: t("varsayilan"),
      dataIndex: "varsayilan",
      key: 15,
      render: (text) => <Checkbox checked={text} />,
    },
    // {
    //   title: "",
    //   dataIndex: "delete",
    //   key: 7,
    //   render: (_, record) => (
    //     <Popconfirm
    //       title={t("confirmQuiz")}
    //       cancelText={t("cancel")}
    //       okText={t("ok")}
    //       onConfirm={() => handleDelete(record)}
    //     >
    //       <DeleteOutlined style={{ color: "#dc3545" }} />
    //     </Popconfirm>
    //   ),
    // },
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

  const handleTableChange = async (pagination, filters, sorter) => {
    if (pagination?.current && typeof pagination.current === "number") {
      setLoading(true);
      try {
        const diff = pagination.current - currentPage;
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = dataSource[dataSource.length - 1]?.siraNo || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = dataSource[0]?.siraNo || 0;
        }

        const res = await GetInsuranceListByVehicleIdService(diff, currentSetPointId, search, ids);

        if (res?.data.list.length > 0) {
          setDataSource(res.data.list);
          setTotalDataCount(res.data.recordCount);
          setCurrentPage(pagination.current);
        } else {
          message.warning(t("kayitBulunamadi"));
          setDataSource([]);
        }
      } catch (error) {
        console.error("Error in pagination:", error);
        message.error(t("hataOlustu"));
      } finally {
        setLoading(false);
      }
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
  }, [currentPage]);

  const handleBodyChange = useCallback((type, newBody) => {
    setBody((state) => ({
      ...state,
      [type]: newBody,
    }));
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length > 0) {
      setValue("selectedLokasyonId", newSelectedRowKeys[0]);
    } else {
      setValue("selectedLokasyonId", null);
    }
    // Seçilen satırların verisini bul
    const newSelectedRows = dataSource.filter((row) => newSelectedRowKeys.includes(row.siraNo));
    setSelectedRows(newSelectedRows); // Seçilen satırların verilerini state'e ata
  };

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  return (
    <Modal
      title={`${t("sigortaBilgileri")} - ${t("plaka")}: [${selectedRowsData?.map((item) => item.plaka).join(", ")}]`}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <div className="flex align-center gap-1 mb-10">
        <Popover content={content} placement="bottom" trigger="click" open={openRowHeader} onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}>
          <Button className="btn primary-btn">
            <MenuOutlined />
          </Button>
        </Popover>
        <Input placeholder={t("arama")} style={{ width: "20%" }} onChange={(e) => setSearch(e.target.value)} />
        <AddModal setStatus={setStatus} />
      </div>

      <UpdateModal updateModal={updateModalOpen} setUpdateModal={setUpdateModalOpen} id={id} aracId={aracId} setStatus={setStatus} />

      <DragAndDropContext items={columns} setItems={setColumns}>
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
              onChange: onSelectChange,
              onSelect: handleRowSelection,
            }}
            components={{
              header: {
                cell: SortableHeaderCell,
              },
            }}
            rowClassName={(record) => (record.aktif ? "active-row" : "")}
            locale={{
              emptyText: "Veri Bulunamadı",
            }}
          />
        </Spin>
      </DragAndDropContext>
    </Modal>
  );
};

Sigorta.propTypes = {
  ids: PropTypes.array,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default Sigorta;

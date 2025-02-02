import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Modal, Button, Table, Popconfirm, Input, Popover, Spin, message } from "antd";
import { DeleteOutlined, MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetExpensesListByVehicleIdService } from "../../../../../../api/services/vehicles/operations_services";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../components/drag-drop-table/DraggableCheckbox";

const Harcama = ({ visible, onClose, ids, selectedRowsData }) => {
  const { plaka } = useContext(PlakaContext);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [id, setId] = useState(0);
  const [aracId, setAracId] = useState(0);
  const [search, setSearch] = useState("");
  const [openRowHeader, setOpenRowHeader] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);

  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = dataSource[dataSource.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = dataSource[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const response = await GetExpensesListByVehicleIdService(diff, currentSetPointId, search, ids);

      setTotalDataCount(response.data.recordCount);
      setCurrentPage(targetPage);

      const formattedData = response.data.list.map((item) => ({
        ...item,
        key: item.siraNo,
      }));

      if (formattedData.length > 0) {
        setDataSource(formattedData);
      } else {
        message.warning(t("kayitBulunamadi"));
        setDataSource([]);
      }
    } catch (error) {
      console.error("Error in API request:", error);
      message.error(t("hataOlustu"));
    } finally {
      setLoading(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0, 1);
  }, [search, status, ids]);

  const handleTableChange = (pagination, filters, sorter) => {
    if (pagination?.current && typeof pagination.current === "number") {
      const diff = pagination.current - currentPage;
      fetchData(diff, pagination.current);
    }
  };

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
      title: t("tarih"),
      dataIndex: "tarih",
      key: 2,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("harcama"),
      dataIndex: "harcama",
      key: 3,
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: 4,
    },
    {
      title: t("surucu"),
      dataIndex: "surucuIsim",
      key: 5,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: 6,
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

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  return (
    <Modal
      title={`${t("harcamaBilgileri")} - ${t("plaka")}: [${selectedRowsData?.map((item) => item.plaka).join(", ")}]`}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
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

      <UpdateModal updateModal={updateModalOpen} setUpdateModal={setUpdateModalOpen} id={id} aracId={aracId} setStatus={setStatus} />

      <DragAndDropContext items={columns} setItems={setColumns}>
        <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
          <Table
            rowKey="siraNo"
            columns={newColumns}
            dataSource={dataSource}
            pagination={{
              current: currentPage,
              total: totalDataCount,
              pageSize: pageSize,
              defaultPageSize: 10,
              pageSizeOptions: ["10", "20", "50", "100"],
              position: ["bottomRight"],
              onChange: handleTableChange,
              showTotal: (total) => `${t("toplam")} ${total}`,
              showQuickJumper: true,
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
              emptyText: t("veriBulunamadi"),
            }}
          />
        </Spin>
      </DragAndDropContext>
    </Modal>
  );
};

Harcama.propTypes = {
  ids: PropTypes.array,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default Harcama;

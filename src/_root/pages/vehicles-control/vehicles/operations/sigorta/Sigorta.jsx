import React, { useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Modal, Button, Table, Checkbox, Popconfirm, Input, Popover, Spin, message, Select } from "antd";
import { DeleteOutlined, MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import AxiosInstance from "../../../../../../api/http";
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
  const [durumFilter, setDurumFilter] = useState(1);

  const pageSize = 10;

  const fetchData = useCallback(
    async (diff, targetPage = 1, currentSetPointId = 0) => {
      const selectedAracIds = Array.isArray(ids) ? ids.map(Number).filter((item) => !Number.isNaN(item)) : [];

      if (selectedAracIds.length === 0) {
        setDataSource([]);
        setTotalDataCount(0);
        setCurrentPage(1);
        setLoading(false);
        setIsInitialLoading(false);
        return;
      }

      setLoading(true);
      try {
        const filters = {
          aracIds: selectedAracIds,
          status: durumFilter,
        };

        const res = await AxiosInstance.post(`Insurance/GetInsuranceList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${search}&pageSize=${pageSize}`, filters);

        const list = res?.data?.list || [];
        setDataSource(list);
        setData(list);
        setTotalDataCount(res?.data?.recordCount || 0);
        setCurrentPage(targetPage);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(t("hataOlustu"));
        setDataSource([]);
      } finally {
        setLoading(false);
        setIsInitialLoading(false);
      }
    },
    [durumFilter, ids, pageSize, search]
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    setIsInitialLoading(true);
    fetchData(0, 1, 0);
  }, [visible, status, fetchData]);

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

  const handleTableChange = (pagination) => {
    if (pagination?.current && typeof pagination.current === "number") {
      const diff = pagination.current - currentPage;
      const currentSetPointId = diff > 0 ? dataSource[dataSource.length - 1]?.siraNo || 0 : diff < 0 ? dataSource[0]?.siraNo || 0 : 0;
      fetchData(diff, pagination.current, currentSetPointId);
    }
  };

  const footer = [
    <Button key="back" className="btn cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  const plakaData = Array.isArray(plaka) ? plaka.map((item) => item.plaka).join(", ") : "";

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
        <Select
          value={durumFilter}
          onChange={(value) => setDurumFilter(value)}
          style={{ width: 140 }}
          options={[
            { value: 1, label: t("aktif") },
            { value: 2, label: t("pasif") },
            { value: 0, label: t("tumu") },
          ]}
        />
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

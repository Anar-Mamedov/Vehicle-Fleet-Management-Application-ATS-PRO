import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popover, Spin, Table, Tag } from "antd";
import DragAndDropContext from "../../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetVehicleLocationService } from "../../../../../../../api/services/vehicles/vehicles/services";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../../components/drag-drop-table/DraggableCheckbox";

const Surucu = ({ visible, onClose, id, selectedRowsData, refreshVehicleData }) => {
  const { printData } = useContext(PlakaContext);
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
  const [accId, setAccId] = useState(0);
  const [plaka, setPlaka] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    if (selectedRowsData && selectedRowsData.length > 0) {
      setPlaka(selectedRowsData.map((row) => row.plaka));
    } else {
      setPlaka([]);
    }
  }, [selectedRowsData]);

  /*  useEffect(() => {
    console.log("Current guncelKm from context:", printData?.guncelKm);
    console.log("Current dataSource:", dataSource);
  }, [printData, dataSource]); */

  const baseColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka_column",
      render: (text, record) => (
        <Button
          onClick={() => {
            setAccId(record.aracBolgeLogId);
            setSelectedRecord(record);
            setUpdateModal(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih_column",
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("saat"),
      dataIndex: "saat",
      key: "saat_column",
    },
    {
      title: t("eskiLokasyon"),
      dataIndex: "bulunduguLokasyon",
      key: "eskiLokasyon_column",
    },
    {
      title: t("yeniLokasyon"),
      dataIndex: "transferEdilenLokasyon",
      key: "yeniLokasyon_column",
    },
    {
      title: t("aracKm"),
      dataIndex: "aracKm",
      key: "aracKm_column",
    },
    {
      title: t("durum"),
      dataIndex: "onayDurumu",
      key: "onayDurumu",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => {
        const getStatusColor = (status) => {
          switch (status) {
            case "bekliyor":
              return "orange";
            case "onaylandi":
              return "green";
            case "onaylanmadi":
              return "red";
            default:
              return "default";
          }
        };
        return <Tag color={getStatusColor(text)}>{t(text)}</Tag>;
      },
      sorter: (a, b) => {
        if (a.onayDurumu === null) return -1;
        if (b.onayDurumu === null) return 1;
        return a.onayDurumu.localeCompare(b.onayDurumu);
      },
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama_column",
    },
  ];

  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: column.key || `column_${i}`,
      onHeaderCell: () => ({
        id: column.key || `column_${i}`,
      }),
    }))
  );

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setIsInitialLoading(true);
      const body = [id];
      const res = await GetVehicleLocationService(search, tableParams.pagination.current, body);
      setLoading(false);
      setIsInitialLoading(false);

      // Add a unique key to each item in the dataSource
      const dataWithKeys = res?.data.list.map((item, index) => ({
        ...item,
        key: item.aracBolgeLogId || `item-${index}`, // Use aracBolgeLogId as key or fallback to index-based key
      }));

      setDataSource(dataWithKeys);

      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.recordCount,
        },
      }));

      // Reset status after data is fetched to prepare for next update
      if (status) {
        setTimeout(() => {
          setStatus(false);
        }, 100); // Small delay to ensure the state update is processed
      }
    };

    fetchData();
  }, [search, tableParams.pagination.current, status, id]);

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

  const newColumns = columns.map((col) => ({
    ...col,
    key: col.key,
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

  const content = <Content key="draggable-content" options={options} checkedList={checkedList} setCheckedList={setCheckedList} moveCheckbox={moveCheckbox} />;

  const footer = [
    <Button key="close-button" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  // Function to explicitly refresh the data
  const refreshData = () => {
    setStatus(true);
  };

  return (
    <Modal
      title={
        <div style={{ fontSize: "24px" }}>
          {t("lokasyonBilgileri")}
          {plaka.length > 0 && ` [${plaka.join(", ")}]`}
        </div>
      }
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <div className="flex justify-between align-center">
        <div className="flex align-center gap-1">
          <Popover content={content} placement="bottom" trigger="click" open={openRowHeader} onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}>
            <Button className="btn primary-btn">
              <MenuOutlined />
            </Button>
          </Popover>
          <Input placeholder={t("arama")} onChange={(e) => setSearch(e.target.value)} />
          <AddModal
            setStatus={setStatus}
            guncelKm={printData?.guncelKm}
            lokasyon={dataSource[0]?.transferEdilenLokasyon}
            lokasyonId={dataSource[0]?.transferEdilenLokasyonId}
            refreshVehicleData={refreshVehicleData}
          />
        </div>
      </div>
      <UpdateModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        setStatus={setStatus}
        status={status}
        id={accId}
        aracID={id}
        record={selectedRecord}
        refreshVehicleData={refreshVehicleData}
        refreshData={refreshData}
      />
      <div className="mt-20">
        <DragAndDropContext key="drag-drop-context" items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              columns={newColumns}
              dataSource={dataSource}
              rowKey={(record) => record.key || record.aracBolgeLogId || Math.random().toString(36).substr(2, 9)}
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
    </Modal>
  );
};

Surucu.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  selectedRowsData: PropTypes.array,
  refreshVehicleData: PropTypes.func,
};

export default Surucu;

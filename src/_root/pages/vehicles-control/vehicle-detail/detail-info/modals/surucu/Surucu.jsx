import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popover, Spin, Table } from "antd";
import DragAndDropContext from "../../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetDriverSubstitutionListByVehicleIdService } from "../../../../../../../api/services/vehicles/vehicles/services";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../../components/drag-drop-table/DraggableCheckbox";

const Surucu = ({ visible, onClose, id, selectedRowsData, refreshVehicleData }) => {
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

  useEffect(() => {
    if (selectedRowsData && selectedRowsData.length > 0) {
      setPlaka(selectedRowsData.map((row) => row.plaka));
    } else {
      setPlaka([]);
    }
  }, [selectedRowsData]);

  const baseColumns = [
    {
      title: t("tutanakNo"),
      dataIndex: "tutanakNo",
      key: 1,
      render: (text, record) => (
        <Button
          onClick={() => {
            setAccId(record.siraNo);
            setUpdateModal(true);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("teslimTarih"),
      dataIndex: "teslimTarih",
      key: 2,
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("teslimSaat"),
      dataIndex: "teslimSaat",
      key: 3,
    },
    {
      title: t("teslimEden"),
      dataIndex: "surucuIsimTeslimEden",
      key: 4,
    },
    {
      title: t("teslimAlan"),
      dataIndex: "surucuIsimTeslimAlan",
      key: 5,
    },
    {
      title: t("aracKm"),
      dataIndex: "km",
      key: 6,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: 7,
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
      const res = await GetDriverSubstitutionListByVehicleIdService(id, search, tableParams.pagination.current);
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

      // Reset status after data is fetched to prepare for next update
      if (status) {
        // Call refreshVehicleData to update parent component with latest vehicle data
        if (refreshVehicleData) {
          refreshVehicleData();
        }
        setStatus(false);
      }
    };

    fetchData();
  }, [search, tableParams.pagination.current, status, refreshVehicleData, id]);

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

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  return (
    <Modal
      title={
        <div style={{ fontSize: "24px" }}>
          {t("surucuBilgiler")}
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
          <AddModal setStatus={setStatus} selectedRowsData={selectedRowsData} />
        </div>
      </div>
      <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} setStatus={setStatus} status={status} id={accId} aracID={id} />
      <div className="mt-20">
        <DragAndDropContext items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              columns={newColumns}
              dataSource={dataSource}
              rowKey={(record) => record.siraNo || record.tutanakNo || Math.random().toString(36).substr(2, 9)}
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
  refreshVehicleData: PropTypes.func,
};

export default Surucu;

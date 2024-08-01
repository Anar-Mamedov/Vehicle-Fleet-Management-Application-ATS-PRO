import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popover, Table, Spin } from "antd";
import DragAndDropContext from "../../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetAccListByVehicleIdService } from "../../../../../../../api/services/vehicles/vehicles/services";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../../components/drag-drop-table/DraggableCheckbox";

const Aksesuar = ({ visible, onClose, id }) => {
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

  const baseColumns = [
    {
      title: t("tanim"),
      dataIndex: "aksesuar",
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
      title: t("miktar"),
      dataIndex: "miktar",
      key: 2,
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: 3,
    },
    {
      title: t("ureticiKod"),
      dataIndex: "ureticiKod",
      key: 4,
    },
    {
      title: t("degistirmeTarih"),
      dataIndex: "degistirmeTarih",
      key: 5,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
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
      const res = await GetAccListByVehicleIdService(
        id,
        search,
        tableParams.pagination.current
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
  }, [search, tableParams.pagination.current, status]);

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

  const content = (
    <Content
      options={options}
      checkedList={checkedList}
      setCheckedList={setCheckedList}
      moveCheckbox={moveCheckbox}
    />
  );

  const footer = [
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  // Custom loading icon
  const customIcon = (
    <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
  );

  return (
    <Modal
      title={t("aksesuarBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
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
        </div>
      </div>
      <UpdateModal
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
        setStatus={setStatus}
        status={status}
        id={accId}
      />
      <div className="mt-20">
        <DragAndDropContext items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
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

Aksesuar.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Aksesuar;

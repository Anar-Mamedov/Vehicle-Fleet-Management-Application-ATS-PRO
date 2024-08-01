import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { t } from "i18next";
import axios from "axios";
import { Table, Popover, Button, Input, Spin } from "antd";
import { MenuOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../context/plakaSlice";
import { GetVehiclesListService } from "../../../../api/services/vehicles/vehicles/services";
import { DemoService } from "../../../../api/service";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./add/AddModal";
import Filter from "./filter/Filter";
import OperationsInfo from "./operations/OperationsInfo";

const breadcrumb = [
  { href: "/", title: <HomeOutlined /> },
  { title: t("araclar") },
];

const Vehicles = () => {
  const { setPlaka } = useContext(PlakaContext);
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [country, setCountry] = useState({
    name: "",
    code: ""
  });

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const res = await axios.get("http://ip-api.com/json");
    if (res.status === 200)
      setCountry({ name: res.data.country, code: res.data.countryCode });
  } 

  const getBaseColumns = (country) => [
    {
      title: t("aracPlaka"),
      dataIndex: "plaka",
      key: 1,
      render: (text, record) => (
        <Link to={`/detay/${record.aracId}`} className="plaka-button"><span>{country.code}</span> <span>{text}</span></Link>
      ),
      width: 160
    },
    {
      title: t("aracTip"),
      dataIndex: "aracTip",
      key: 2,
    },
    {
      title: t("marka"),
      dataIndex: "marka",
      key: 3,
    },
    {
      title: t("model"),
      dataIndex: "model",
      key: 4,
    },
    {
      title: t("aracGrup"),
      dataIndex: "grup",
      key: 5,
    },
    {
      title: t("guncelKm"),
      dataIndex: "guncelKm",
      key: 6,
    },
    {
      title: t("renk"),
      dataIndex: "renk",
      key: 7,
    },
    {
      title: t("yil"),
      dataIndex: "yil",
      key: 8,
    },
    {
      title: t("yakitTip"),
      dataIndex: "yakitTip",
      key: 9,
    },
  ];

  const [columns, setColumns] = useState(() =>
    getBaseColumns(country).map((column, i) => ({
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
      DemoService().then((res) => res.data);

      setLoading(true);
      const res = await GetVehiclesListService(
        search,
        tableParams.pagination.current,
        filterData
      );
      setLoading(false);
      setIsInitialLoading(false);

      // Set dataSource and tableParams
      setDataSource(res?.data.vehicleList || []);
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.vehicleCount || 0,
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
    const newPlakaEntries = rows.map((vehicle) => ({
      id: vehicle.aracId,
      plaka: vehicle.plaka,
      lokasyonId: vehicle.lokasyonId,
      lokasyon: vehicle.lokasyon,
    }));
    setPlaka(newPlakaEntries);
  }, [rows]);

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
  }, [tableParams.pagination.current, search]);

  useEffect(() => {
    setColumns(getBaseColumns(country).map((column, i) => ({
      ...column,
      key: `${i}`,
      onHeaderCell: () => ({
        id: `${i}`,
      }),
    })));
  }, [country]);

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

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
            <Filter filter={filter} clearFilters={clear} />
          </div>
          <div>
            <OperationsInfo ids={keys} />
          </div>
        </div>
      </div>

      <div className="content">
        <DragAndDropContext items={columns} setItems={setColumns}>
          <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
            <Table
              rowKey={(record) => record.aracId}
              columns={newColumns}
              dataSource={dataSource}
              pagination={{
                ...tableParams.pagination,
                showTotal: (total) => (
                  <p className="text-info">[{total} {t("kayit")}]</p>
                ),
                locale: {
                  items_per_page: `/ ${t("sayfa")}`,
                },
              }}
              loading={false}
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
                x: 1200
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

export default Vehicles;

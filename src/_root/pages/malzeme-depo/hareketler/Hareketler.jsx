import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Table, Popover, Button, Input, Spin } from "antd";
import { MenuOutlined, HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import { GetMaterialMovementsListService } from "../../../../api/services/malzeme/services";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import Filter from "./filter/Filter";

const breadcrumb = [
    { href: "/", title: <HomeOutlined /> },
    { title: t("hareketler") },
];

const Hareketler = () => {
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
            title: t("tarih"),
            dataIndex: "tarih",
            key: 1,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("malzemeKodu"),
            dataIndex: "malezemeKod",
            key: 2,
        },
        {
            title: t("malzemeTanimi"),
            dataIndex: "malezemeTanim",
            key: 3,
        },
        {
            title: t("miktar"),
            dataIndex: "miktar",
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
            title: t("araToplam"),
            dataIndex: "araToplam",
            key: 7,
        },
        {
            title: t("kdvToplam"),
            dataIndex: "kdvToplam",
            key: 8,
        },
        {
            title: t("toplam"),
            dataIndex: "toplam",
            key: 9,
        },
        {
            title: t("plaka"),
            dataIndex: "plaka",
            key: 10,
        },
        {
            title: t("islemTipi"),
            dataIndex: "islemTipi",
            key: 11,
        },
        {
            title: t("lokasyon"),
            dataIndex: "lokasyon",
            key: 12,
        },
        {
            title: t("firma"),
            dataIndex: "firma",
            key: 13,
        },
        {
            title: t("girisDeposu"),
            dataIndex: "girisDepo",
            key: 14,
        },
        {
            title: t("cikisDeposu"),
            dataIndex: "cikisDepo",
            key: 15,
        },
        {
            title: t("aciklama"),
            dataIndex: "aciklama",
            key: 16,
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
            const res = await GetMaterialMovementsListService(
                search,
                tableParams.pagination.current,
                filterData
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
                            placeholder={t("arama")}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Filter filter={filter} clearFilters={clear} />
                    </div>
                </div>
            </div>
            <div className="content">
                <DragAndDropContext items={columns} setItems={setColumns}>
                    <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
                        <Table
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
                                x: 1500,
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

export default Hareketler;

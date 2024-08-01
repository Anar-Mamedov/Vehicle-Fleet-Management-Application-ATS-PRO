import { useEffect, useState } from "react";
import { t } from "i18next";
import { Table, Popover, Button, Input, Spin, Popconfirm } from "antd";
import {
    MenuOutlined,
    HomeOutlined,
    DeleteOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import { DeleteCompanyItemService, GetCompaniesListService } from "../../../../api/services/sistem-tanimlari/services";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import Content from "../../../components/drag-drop-table/DraggableCheckbox";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const breadcrumb = [
    { href: "/", title: <HomeOutlined />, },
    { title: t("firmaTanimlari"), },
];

const FirmaTanim = () => {
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [deletedFirma, setDeletedFirma] = useState(0);
    const [servis, setServis] = useState(0);
    const [id, setId] = useState(0);
    const [filterData, setFilterData] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setIsInitialLoading(true);
            const res = await GetCompaniesListService(
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

    const handleDelete = (count) => {
        if (count > 0) {
            setIsDeleteModalOpen(true);
        } else {
            setIsConfirmDeleteModalOpen(true);
        }
    };

    const confirmDelete = () => {
        DeleteCompanyItemService(deletedFirma).then(() => {
            setStatus(!status);
            setIsConfirmDeleteModalOpen(false);
        });
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const closeConfirmModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setIsConfirmDeleteModalOpen(false);
    };

    const baseColumns = [
        {
            title: t("firmaKodu"),
            dataIndex: "kod",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModal(true);
                        setId(record.firmaId);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("unvan"),
            dataIndex: "unvan",
            key: 2,
        },
        {
            title: t("firmaTipi"),
            dataIndex: "firmaTipi",
            key: 3,
        },
        {
            title: `${t("telefon")} 1`,
            dataIndex: "tel_1",
            key: 4,
        },
        {
            title: `${t("telefon")} 2`,
            dataIndex: "tel_2",
            key: 5,
        },
        {
            title: t("borc"),
            dataIndex: "borc",
            key: 6,
        },
        {
            title: t("alacak"),
            dataIndex: "alacak",
            key: 7,
        },
        {
            title: t("bakiye"),
            dataIndex: "bakiye",
            key: 8,
        },
        {
            title: t("adres"),
            dataIndex: "adres_1",
            key: 9,
        },
        {
            title: t("il"),
            dataIndex: "il",
            key: 10,
        },
        {
            title: t("ilce"),
            dataIndex: "ilce",
            key: 11,
        },
        {
            title: t("sektor"),
            dataIndex: "sektor",
            key: 12,
        },
        {
            title: t("email"),
            dataIndex: "email",
            key: 13,
        },
        {
            title: t("web"),
            dataIndex: "web",
            key: 14,
        },
        {
            title: `${t("ilgili")} 1`,
            dataIndex: "ilgili_1",
            key: 15,
        },
        {
            title: `${t("ilgili")} 2`,
            dataIndex: "ilgili_2",
            key: 16,
        },
        {
            title: t("fax"),
            dataIndex: "fax",
            key: 17,
        },
        {
            title: t("gsm"),
            dataIndex: "gsm",
            key: 18,
        },
        {
            title: "",
            dataIndex: "delete",
            key: 19,
            render: (_, record) => (
                <Popconfirm
                    title={t("confirmQuiz")}
                    cancelText={t("cancel")}
                    okText={t("ok")}
                    onConfirm={() => {
                        handleDelete(record.bagliFisSayisi)
                        setDeletedFirma(record.firmaId)
                        setServis(record.unvan)
                    }}
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
                        <AddModal setStatus={setStatus} />
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                </div>
            </div>

            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                setStatus={setStatus}
                id={id}
            />

            <div className="content">
                <DragAndDropContext items={columns} setItems={setColumns}>
                    <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
                        <Table
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
                                x: 2800,
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

export default FirmaTanim;

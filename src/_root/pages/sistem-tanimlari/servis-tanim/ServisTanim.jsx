import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";
import { Checkbox, Table, Popover, Button, Input, Popconfirm, Modal } from "antd";
import {
    MenuOutlined,
    HomeOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import { DeleteServisService, GetServisListService, SearchServisListService } from "../../../../api/services/servistanim_services";
import AddModal from "./add/AddModal";
import UpdateModal from "./update/UpdateModal";

const breadcrumb = [
    {
        href: "/",
        title: <HomeOutlined />,
    },
    {
        title: t("servisTanim"),
    },
];

const DragIndexContext = createContext({
    active: -1,
    over: -1,
});

const dragActiveStyle = (dragState, id) => {
    const { active, over, direction } = dragState;
    let style = {};
    if (active && active === id) {
        style = {
            backgroundColor: "gray",
            opacity: 0.5,
        };
    } else if (over && id === over && active !== over) {
        style =
            direction === "right"
                ? {
                    borderRight: "1px dashed gray",
                }
                : {
                    borderLeft: "1px dashed gray",
                };
    }
    return style;
};

const TableBodyCell = (props) => {
    const dragState = useContext(DragIndexContext);
    return (
        <td
            {...props}
            style={{
                ...props.style,
                ...dragActiveStyle(dragState, props.id),
            }}
        />
    );
};

TableBodyCell.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
};

const TableHeaderCell = (props) => {
    const dragState = useContext(DragIndexContext);
    const { attributes, listeners, setNodeRef, isDragging } = useSortable({
        id: props.id,
    });
    const style = {
        ...props.style,
        cursor: "move",
        ...(isDragging
            ? {
                position: "relative",
                zIndex: 9999,
                userSelect: "none",
            }
            : {}),
        ...dragActiveStyle(dragState, props.id),
    };
    return (
        <th
            {...props}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        />
    );
};

TableHeaderCell.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
};

const ServisTanim = () => {
    const [dataSource, setDataSource] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [loading, setLoading] = useState(false);
    const [dragIndex, setDragIndex] = useState({
        active: -1,
        over: -1,
    });
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(false);
    const [openRowHeader, setOpenRowHeader] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [deletedServis, setDeletedServis] = useState(0);
    const [servis, setServis] = useState(0);
    const [id, setId] = useState(0);

    useEffect(() => {
        setLoading(true);
        GetServisListService(tableParams.pagination.current).then((res) => {
            setDataSource(res?.data.list);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.recordCount,
                },
            });
            setLoading(false);
        });
    }, [status]);

    const handleDelete = (count) => {
        if (count > 0) {
            setIsDeleteModalOpen(true);
        } else {
            setIsConfirmDeleteModalOpen(true);
        }
    };

    const confirmDelete = () => {
        DeleteServisService(deletedServis).then(res => {
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

    useEffect(() => {
        if (search.length >= 3) {
            SearchServisListService(tableParams?.pagination.current, search).then(
                (res) => {
                    setDataSource(res?.data.list);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: res?.data.recordCount,
                        },
                    });
                    setLoading(false);
                }
            );
        } else {
            GetServisListService(tableParams?.pagination.current).then((res) => {
                setDataSource(res?.data.list);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.recordCount,
                    },
                });
                setLoading(false);
            });
        }
    }, [search, tableParams?.pagination.current]);

    const baseColumns = [
        {
            title: t("bakimKodu"),
            dataIndex: "bakimKodu",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModal(true);
                        setId(record.bakimId);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("tanim"),
            dataIndex: "tanim",
            key: 2,
        },
        {
            title: t("km"),
            dataIndex: "km",
            key: 3,
        },
        {
            title: t("gun"),
            dataIndex: "gun",
            key: 4,
        },
        {
            title: t("servisTipi"),
            dataIndex: "servisTipi",
            key: 5,
        },
        {
            title: t("periyodik"),
            dataIndex: "periyodik",
            key: 6,
            render: text => <Checkbox checked={text} />
        },
        {
            title: t("aciklama"),
            dataIndex: "aciklama",
            key: 7,
        },
        {
            title: "",
            dataIndex: "delete",
            key: 8,
            render: (_, record) => (
                <Popconfirm
                    title={t("confirmQuiz")}
                    cancelText={t("cancel")}
                    okText={t("ok")}
                    onConfirm={() => {
                        handleDelete(record.bagliServisler)
                        setDeletedServis(record.bakimId)
                        setServis(record.tanim)
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
            onCell: () => ({
                id: `${i}`,
            }),
        }))
    );

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1);
        }
    };

    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = columns
        .map(({ key, title }) => ({
            label: title,
            value: key,
        }));

    const content = (
        <>
            <Checkbox.Group
                value={checkedList}
                options={options}
                onChange={(value) => {
                    if (value.length > 0) {
                        setCheckedList(value);
                    }
                }}
            />
        </>
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        })
    );

    const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
            setColumns((prevState) => {
                const activeIndex = prevState.findIndex((i) => i.key === active?.id);
                const overIndex = prevState.findIndex((i) => i.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
        setDragIndex({
            active: -1,
            over: -1,
        });
    };

    const onDragOver = ({ active, over }) => {
        const activeIndex = columns.findIndex((i) => i.key === active.id);
        const overIndex = columns.findIndex((i) => i.key === over?.id);
        setDragIndex({
            active: active.id,
            over: over?.id,
            direction: overIndex > activeIndex ? "right" : "left",
        });
    };

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
                <DndContext
                    sensors={sensors}
                    modifiers={[restrictToHorizontalAxis]}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    collisionDetection={closestCenter}
                >
                    <SortableContext
                        items={columns.map((i) => i.key)}
                        strategy={horizontalListSortingStrategy}
                    >
                        <DragIndexContext.Provider value={dragIndex}>
                            <Table
                                columns={columns}
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
                                scroll={{
                                    x: 600,
                                }}
                                components={{
                                    header: {
                                        cell: TableHeaderCell,
                                    },
                                    body: {
                                        cell: TableBodyCell,
                                    },
                                }}
                            />
                        </DragIndexContext.Provider>
                    </SortableContext>
                    <DragOverlay>
                        <th
                            style={{
                                backgroundColor: "gray",
                                padding: 16,
                            }}
                        >
                            {
                                columns[columns.findIndex((i) => i.key === dragIndex.active)]
                                    ?.title
                            }
                        </th>
                    </DragOverlay>
                </DndContext>

                <Modal
                    open={isDeleteModalOpen}
                    onOk={closeModal}
                    onCancel={closeModal}
                    footer={[
                        <Button key="ok" onClick={closeModal}>
                            Tamam
                        </Button>,
                    ]}
                >
                    <p>[ {servis} ] bakımına ait servis kayıtları bulunmaktadır. Kayıt silinemez.</p>
                </Modal>
                <Modal
                    open={isConfirmDeleteModalOpen}
                    onOk={confirmDelete}
                    onCancel={closeConfirmModal}
                    footer={[
                        <Button key="cancel" onClick={closeConfirmModal}>
                            Hayır
                        </Button>,
                        <Button key="confirm" type="primary" onClick={confirmDelete}>
                            Evet
                        </Button>,
                    ]}
                >
                    <p>[ {servis} ] bakımı silinecektir. Devam etmek istediğinizden emin misiniz?</p>
                </Modal>
            </div>
        </>
    );
};

export default ServisTanim;

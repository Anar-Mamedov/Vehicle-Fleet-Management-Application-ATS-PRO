import { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { t } from "i18next";
import { GetVehiclesListService } from "../../../../../api/services/vehicles/vehicles/services";

const VehicleList = ({ setVehicle, open }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: t("aracId"),
            dataIndex: "aracId",
            key: 1,

        },
        {
            title: t("aracPlaka"),
            dataIndex: "plaka",
            key: 2,
        },
        {
            title: t("aracTip"),
            dataIndex: "aracTip",
            key: 3,
        },
        {
            title: t("marka"),
            dataIndex: "marka",
            key: 4,
        },
        {
            title: t("model"),
            dataIndex: "model",
            key: 5,
        },
        {
            title: t("grup"),
            dataIndex: "grup",
            key: 6,
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

    useEffect(() => {
        if (!open) {
            setSelectedRowKeys([]);
            setVehicle([]);
        }
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetVehiclesListService(
                search,
                tableParams.pagination.current
            );
            setLoading(false);
            setData(res?.data.vehicleList);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.vehicleCount,
                },
            });
        };
        fetchData();
    }, [search, tableParams.pagination.current]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setVehicle(selectedRows);
        },
    };

    return (
        <>
            <Input
                placeholder={t("arama")}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "30%" }}
            />
            <div className="mt-10">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
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
                    onChange={handleTableChange}
                    loading={loading}
                    rowKey="aracId"
                />
            </div>
        </>
    );
};

export default VehicleList;

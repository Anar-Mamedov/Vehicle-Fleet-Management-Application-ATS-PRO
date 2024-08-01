import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Input, Table } from "antd";
import { t } from "i18next";
import { GetVehiclesListService } from "../../../../../../../api/services/vehicles/vehicles/services";

const VehicleList = ({ setDorse, open, key }) => {
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
            render: (text) => (
                <Button className="plaka-button"><span>{country.code}</span> <span>{text}</span></Button>
            ),
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
            title: t("grup"),
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

    const columns = getBaseColumns(country)

    useEffect(() => {
        if (!open) {
            setSelectedRowKeys([]);
            setDorse([]);
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
    }, [search, tableParams.pagination.current, key]);

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
            setDorse(selectedRows);
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
                    size="small"
                    scroll={
                        {
                            x: 1500
                        }
                    }
                    locale={{
                        emptyText: "Veri Bulunamadı",
                    }}
                />
            </div>
        </>
    );
};

VehicleList.propTypes = {
    setDorse: PropTypes.func,
    open: PropTypes.bool,
    key: PropTypes.number,
};

export default VehicleList;

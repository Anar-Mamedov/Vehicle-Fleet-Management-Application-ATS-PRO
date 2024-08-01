import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Input, Table } from "antd";
import { GetActiveInsuranceListService } from "../../../../../api/services/vehicles/operations_services";
import { PlakaContext } from "../../../../../context/plakaSlice";

const SigortaList = ({ setSigorta, open, key }) => {
    const { plaka } = useContext(PlakaContext)
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
            title: t("sigorta"),
            dataIndex: "sigorta",
            key: "sigorta",
        },
        {
            title: t("baslamaTarih"),
            dataIndex: "baslangicTarih",
            key: "baslangicTarih",
            render: text => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: t("policeNo"),
            dataIndex: "policeNo",
            key: "policeNo",
        },
        {
            title: t("firma"),
            dataIndex: "firma",
            key: "firma",
        },
    ];

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await GetActiveInsuranceListService(
                        plaka[0].id,
                        search,
                        tableParams.pagination.current
                    );
                    setData(res?.data.list || []);
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: res?.data.recordCount || 0,
                        },
                    });
                } catch (error) {
                    console.error("Failed to fetch insurance data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [open, plaka, search, tableParams.pagination.current, key]);

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
        onChange: (newSelectedRowKeys, selectedRows) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setSigorta(selectedRows);
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
                    rowKey="siraNo"
                    locale={{
                        emptyText: "Veri Bulunamadı",
                    }}
                />
            </div>
        </>
    );
};

SigortaList.propTypes = {
    setSigorta: PropTypes.func,
    open: PropTypes.bool,
    key: PropTypes.number,
};

export default SigortaList;

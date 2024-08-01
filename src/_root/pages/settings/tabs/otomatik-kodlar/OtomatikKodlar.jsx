import { useEffect, useState } from "react";
import { t } from "i18next";
import { Button, Checkbox, Spin, Table } from "antd";
import {
    LoadingOutlined
} from "@ant-design/icons";
import { FaUnlockAlt, FaCheck } from "react-icons/fa";
import { GetModulesCodesService } from "../../../../../api/services/settings/services";
import UpdateModal from "./UpdateModal";

const OtomatikKodlar = () => {
    const [dataSource, setDataSource] = useState([]);
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [updateModal, setUpdateModal] = useState(false);
    const [record, setRecord] = useState([]);

    const columns = [
        {
            title: t("tanim"),
            dataIndex: "tanim",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModal(true);
                        setRecord(record);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: <FaUnlockAlt className="text-secondary" />,
            dataIndex: "alaniKilitle",
            key: 2,
            render: text => <Checkbox checked={text} />
        },
        {
            title: <FaCheck className="text-success" />,
            dataIndex: "aktif",
            key: 3,
            render: text => <Checkbox checked={text} />
        },
        {
            title: t("onEk"),
            dataIndex: "onEk",
            key: 4,
        },
        {
            title: t("no"),
            dataIndex: "numara",
            key: 5,
        },
        {
            title: t("haneSayisi"),
            dataIndex: "haneSayisi",
            key: 6,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setIsInitialLoading(true)
            const res = await GetModulesCodesService();
            setLoading(false);
            setIsInitialLoading(false)
            setDataSource(res?.data);
        };

        fetchData();
    }, [status]);

    // Custom loading icon
    const customIcon = (
        <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />
    );

    return (
        <>
            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                setStatus={setStatus}
                data={record}
            />

            <Spin spinning={loading || isInitialLoading} indicator={customIcon}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    size="small"
                    locale={{
                        emptyText: "Veri Bulunamadı",
                    }}
                />
            </Spin>

        </>
    )
}

export default OtomatikKodlar

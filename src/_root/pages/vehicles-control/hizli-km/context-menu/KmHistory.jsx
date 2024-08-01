import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, InputNumber, Modal, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DeleteKmLogService, GetKmLogListByVehicleIdService, UpdateKmLogService, ValidateKmLogForUpdateService } from '../../../../../api/services/vehicles/vehicles/services'

const KmUpdate = ({ data, setTable }) => {
    const [dataSource, setDataSource] = useState([]);
    const [status, setStatus] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateData, setUpdateData] = useState(null)
    const [kmStatus, setKmStatus] = useState('black')
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        GetKmLogListByVehicleIdService(data.aracId, tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.km_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
        })
    }, [tableParams?.pagination.current, status])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    const handleDelete = (data) => {
        const body = { ...data }

        DeleteKmLogService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
                setTable(true)
            }
        })

        setStatus(false)
        setTable(false)
    };

    const validateKm = async () => {
        const body = { ...updateData };

        try {
            const res = await ValidateKmLogForUpdateService(body);
            if (res?.data.statusCode === 400) {
                setKmStatus('red');
                return false;
            } else if (res?.data.statusCode === 202) {
                setKmStatus('green');
                return true;
            }
        } catch (error) {
            console.error('Validation failed', error);
            setKmStatus('red');
            return false;
        }
    }

    const handleEdit = async () => {
        const body = {
            ...updateData, "tarih": updateData?.tarih.split("T")[0],
        }

        const response = await validateKm()

        if (response) {
            UpdateKmLogService(body).then(res => {
                if (res.data.statusCode === 202) {
                    setStatus(true);
                    onClose();

                }
            })
            setStatus(false)
        }
    }

    const openUpdateModal = (data) => {
        setUpdateModal(true)
        setUpdateData(data)
    }

    const onClose = () => {
        setUpdateModal(false)
        setUpdateData(null)
        setKmStatus("black")
    }

    const handleSearch = e => {
        if (e.target.value >= 3) {
            GetKmLogListByVehicleIdService(data.aracId, tableParams?.pagination.current, e.target.value).then(res => {
                setDataSource(res?.data.km_list)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.total_count,
                    },
                });
            })
        }

    }

    const defaultColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
        },
        {
            title: 'Kaynak',
            dataIndex: 'kaynak',
        },
        {
            title: 'Eski km',
            dataIndex: 'eskiKm',
        },
        {
            title: 'Yeni km',
            dataIndex: 'yeniKm',
        },
        {
            title: 'Fark km',
            dataIndex: 'fark',
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            render: text => text.split("T")[0].split("-").reverse().join(".")
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
        },
        {
            title: '',
            dataIndex: 'delete',
            render: (_, record) => {
                return record.kaynak === "DÜZELTME" || record.kaynak === "SIFIRLAMA" ? dataSource.length >= 1 ? (
                    <Button disabled style={{ border: "none", background: "transparent", padding: 0 }}><DeleteOutlined style={{ color: "#dc3545" }} /></Button>
                ) : null : dataSource.length >= 1 ? (
                    <Popconfirm title="Silmeye eminmisiniz?" onConfirm={() => handleDelete(record)}>
                        <DeleteOutlined style={{ color: "#dc3545" }} />
                    </Popconfirm>
                ) : null
            },
        },
        {
            title: '',
            dataIndex: 'edit',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Button onClick={() => openUpdateModal(record)} style={{ border: "none", color: "#5B548B" }}>
                        <EditOutlined />
                    </Button>
                ) : null,
        },
    ];

    const columns = defaultColumns.map((col) => {
        return {
            ...col,
        };
    });

    const footer = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={handleEdit}>
                Güncelle
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    return (
        <div className="history">
            <div className="grid mb-10">
                <div className="col-span-3">
                    <Input placeholder="Arama" onChange={handleSearch} />
                </div>
            </div>

            <Table
                rowClassName={() => 'editable-row'}
                pagination={{
                    ...tableParams.pagination,
                    showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
                }}
                dataSource={dataSource}
                columns={columns}
                size="small"
                onChange={handleTableChange}
            />
            <Modal
                title={'Kilometre Güncelleme Geçmişi Düzelt'}
                open={updateModal}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={500}
            >
                <div className="grid gap-1">
                    <div className="col-span-6">
                        <label className='text-info'>Tarih</label>
                        <Input className="w-full" disabled value={updateData?.tarih.split("T")[0].split("-").reverse().join(".")} />
                    </div>
                    <div className="col-span-6">
                        <label className='text-info'>Saat</label>
                        <Input className="w-full" disabled value={updateData?.saat} />
                    </div>
                    <div className="col-span-6">
                        <label className='text-info'>Yeni Km</label>
                        <InputNumber
                            allowClear
                            style={{ borderColor: kmStatus }}
                            className="w-full"
                            value={updateData?.yeniKm}
                            onChange={e => {
                                if (e !== null) {
                                    setUpdateData({ ...updateData, yeniKm: e })
                                } else {
                                    setKmStatus('black')
                                }
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

KmUpdate.propTypes = {
    data: PropTypes.array,
    setTable: PropTypes.func
}

export default KmUpdate

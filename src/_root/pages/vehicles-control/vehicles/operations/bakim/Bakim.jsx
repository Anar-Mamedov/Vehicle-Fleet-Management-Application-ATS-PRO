import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { Modal, Button, Table, Tabs, message, Checkbox } from 'antd'
import { uploadPhoto, uploadFile } from '../../../../../../utils/upload' 
import AddModal from './add/AddModal'
import GeneralInfo from './update/GeneralInfo'
import PersonalFields from '../../../../../components/form/personal-fields/PersonalFields'
import PhotoUpload from '../../../../../components/upload/PhotoUpload'
import FileUpload from '../../../../../components/upload/FileUpload'

const Bakim = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([
        {
            plaka: "38 ABB 789"
        }
    ])
    const [loading, setLoading] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const [vehicleIds, setVehicleIds] = useState(0)
    const [updateModal, setUpdateModal] = useState(false)
    // file
    const [filesUrl, setFilesUrl] = useState([])
    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(false)
    // photo
    const [imageUrls, setImageUrls] = useState([])
    const [loadingImages, setLoadingImages] = useState(false)
    const [images, setImages] = useState([])

    const defaultValues = {
        aracId: 0
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    useEffect(() => setVehicleIds(ids), [ids])
    useEffect(() => {
        // ids.map(id => {
        //     return YakitGetByIdService(id, tableParams?.pagination.current).then(res => {
        //         setDataSource(res?.data.fuel_list)
        //         setTableParams({
        //             ...tableParams,
        //             pagination: {
        //                 ...tableParams.pagination,
        //                 total: res?.data.total_count,
        //             },
        //         });
        //     })
        // })

    }, [vehicleIds, tableParams.pagination.current])

    const columns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            key: 1,
            render: (text, record) => <Button onClick={() => setUpdateModal(true)}>{text}</Button>
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            key: 2,
            render: (text, record) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
            key: 3,
        },
        {
            title: 'Servis Tanımı',
            dataIndex: '',
            key: 4,
        },
        {
            title: 'Servis Nedeni',
            dataIndex: '',
            key: 5,
        },
        {
            title: 'Firma',
            dataIndex: '',
            key: 6,
        },
        {
            title: 'Sürücü',
            dataIndex: 'surucuAdi',
            key: 7,
        },
        {
            title: 'Başlama Tarihi',
            dataIndex: '',
            key: 8,
            render: (text, record) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: 'Bitiş Tarihi',
            dataIndex: '',
            key: 9,
            render: (text, record) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: 'Servis Km.',
            dataIndex: '',
            key: 10,
        },
        {
            title: 'İşçilik Ücreti',
            dataIndex: '',
            key: 11,
        },
        {
            title: 'Malzeme Maliyeti',
            dataIndex: '',
            key: 12,
        },
        {
            title: 'Diğer Giderler',
            dataIndex: '',
            key: 13,
        },
        {
            title: 'KDV',
            dataIndex: '',
            key: 14,
        },
        {
            title: 'İndirim',
            dataIndex: '',
            key: 15,
        },
        {
            title: 'Toplam Maliyet',
            dataIndex: '',
            key: 16,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 17,
        }
    ]

    const handleCheckboxChange = (e, record) => {
        if (e.target.checked) {
            setSelectedRow(record)
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1)
        }
    }

    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: 'select',
            code: 867,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 868,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: 'number'
        },
    ])

    const personalProps = {
        form: "",
        fields,
        setFields
    }

    const uploadImages = () => {
        try {
            setLoadingImages(true);
            // const data = upload(id, "Arac", images)
            // setImageUrls([...imageUrls, data.imageUrl]);
        } catch (error) {
            message.error("Resim yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingImages(false);
        }
    }

    const uploadFiles = () => {
        try {
            setLoadingFiles(true);
            // upload(id, "Arac", files)
        } catch (error) {
            message.error("Dosya yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingFiles(false);
        }
    }

    const itemsUpdate = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo />,
        },
        {
            key: '2',
            label: 'Malzemeler',
        },
        {
            key: '3',
            label: 'Sigorta',
        },
        {
            key: '4',
            label: 'Şikayetler',
        },
        {
            key: '5',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        },
        {
            key: '6',
            label: `[${imageUrls.length}] Resimler`,
            children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
        },
        {
            key: '7',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />
        },
    ]

    const updateModalFooter = (
        [
            <Button key="submit" className="btn btn-min primary-btn">
                Güncelle
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => setUpdateModal(false)}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title={`Bakım Bilgileri Plaka: []`}
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <AddModal data={selectedRow} />
            <Modal
                title="Bakım Bilgisi Güncelle"
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
                maskClosable={false}
                footer={updateModalFooter}
                width={1200}
            >
                <FormProvider {...methods}>
                    <Tabs defaultActiveKey="1" items={itemsUpdate} />
                </FormProvider>
            </Modal>
            <p className="count">[ {tableParams?.pagination.total} kayıt ]</p>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                size="small"
                onChange={handleTableChange}
                scroll={{
                    x: 1500,
                }}
            />
        </Modal>
    )
}

export default Bakim

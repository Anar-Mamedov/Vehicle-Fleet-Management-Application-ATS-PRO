import { useEffect, useState } from 'react';
import { Layout, Menu, List, Button, Modal, Input } from 'antd';
import { DeleteMarkaService, DeleteModelService, GetMarkaListService, GetModelListByMarkaService } from '../../../../api/services/markamodel_services';
import AddModal from './marka-modals/AddModal';
import UpdateModalModal from './marka-modals/UpdateModal';
import AddModelModal from './model-modals/AddModelModal';
import UpdateModelModal from './model-modals/UpdateModelModal';
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import {
    HomeOutlined,
} from "@ant-design/icons";
import { t } from "i18next";

const { Sider, Content } = Layout;

const breadcrumb = [
    {
        href: "/",
        title: <HomeOutlined />,
    },
    {
        title: t("markaModelTanim"),
    },
];

const markaTitle = {
    background: '#fff',
    textAlign: 'center',
    padding: '10px',
    fontWeight: "600",
    fontSize: "24px",
    color: "#f6970e"
}

const MarkaList = () => {
    const [selectedMarka, setSelectedMarka] = useState(null);
    const [markaList, setMarkaList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [marka, setMarka] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isModelAddOpen, setIsModelAddOpen] = useState(false);
    const [isModelUpdateOpen, setIsUpdateModelOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [statusModel, setStatusModel] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [bagliAracSayisi, setBagliAracSayisi] = useState(null);
    const [modelBagliAracSayisi, setModelBagliAracSayisi] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [isDeleteModelModalOpen, setIsDeleteModelModalOpen] = useState(false);
    const [isConfirmDeleteModelModalOpen, setIsConfirmDeleteModelModalOpen] = useState(false);
    const [searchMarka, setSearchMarka] = useState("");
    const [searchModel, setSearchModel] = useState("");

    useEffect(() => {
        GetMarkaListService().then(res => setMarkaList(res.data));
    }, [status]);

    useEffect(() => {
        if (selectedMarka) {
            GetModelListByMarkaService(selectedMarka).then(res => setModelList(res.data));
        }
    }, [selectedMarka, statusModel]);

    const handleMarkaClick = (id) => {
        setSelectedMarka(id);
        const item = markaList.find(item => item.siraNo === +id);
        setMarka(item.marka);
        setBagliAracSayisi(item.bagliAracSayisi);
        setSelectedModel(null);
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
        setModelBagliAracSayisi(model.bagliAracSayisi);
    };

    const filteredMarkaList = markaList.filter(item =>
        item.marka.toLowerCase().includes(searchMarka.toLowerCase())
    );


    const filteredModelList = modelList.filter(model => 
        model.modelDef.toLowerCase().includes(searchModel.toLowerCase())
    );

    const updatedList = filteredMarkaList.map(item => {
        return {
            key: item.siraNo,
            label: item.marka,
        };
    });

    const handleDelete = () => {
        if (bagliAracSayisi > 0) {
            setIsDeleteModalOpen(true);
        } else {
            setIsConfirmDeleteModalOpen(true);
        }
    };

    const handleModelDelete = () => {
        if (modelBagliAracSayisi > 0) {
            setIsDeleteModelModalOpen(true);
        } else {
            setIsConfirmDeleteModelModalOpen(true);
        }
    };

    const confirmDelete = () => {
        DeleteMarkaService(selectedMarka).then(res => {
            setStatus(!status);
            setIsConfirmDeleteModalOpen(false);
        });
    };

    const confirmModelDelete = () => {
        DeleteModelService(selectedModel.siraNo).then(res => {
            setStatusModel(!status);
            setIsConfirmDeleteModelModalOpen(false);
        });
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsDeleteModelModalOpen(false);
    };

    const closeConfirmModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setIsConfirmDeleteModelModalOpen(false);
    };

    return (
        <>
            <div className="content">
                <BreadcrumbComp items={breadcrumb} />
            </div>
            <div className="sistem">
                <Layout style={{ height: '90vh' }}>
                    <Sider width={200} style={{ padding: "10px" }}>
                        <div style={markaTitle}>Marka</div>
                        <Input
                            value={searchMarka}
                            onChange={e => setSearchMarka(e.target.value)}
                            placeholder={t("arama")}
                        />
                        <Menu
                            mode="inline"
                            style={{ height: '78%', borderRight: 0, overflow: "auto" }}
                            onClick={({ key }) => handleMarkaClick(key)}
                            items={updatedList}
                        />
                        <div className='mt-20 flex gap-1 justify-center'>
                            <Button className='btn primary-btn' onClick={() => setIsOpen(true)}>{t("ekle")}</Button>
                            <Button className='btn primary-btn' onClick={() => setIsUpdateOpen(true)}>{t("duzenle")}</Button>
                            <Button className='btn primary-btn' onClick={handleDelete}>{t("sil")}</Button>
                        </div>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ padding: 24, margin: 0, minHeight: 280, overflow: 'auto' }}>
                            {selectedMarka && (
                                <>
                                    <div className='title'>{marka}</div>
                                    <div className="m-20">
                                        <Input
                                            value={searchModel}
                                            onChange={e => setSearchModel(e.target.value)}
                                            placeholder={t("arama")}
                                        />
                                    </div>
                                    <List
                                        dataSource={filteredModelList}
                                        renderItem={(model) => (
                                            <List.Item
                                                onClick={() => handleModelClick(model)}
                                                style={{ backgroundColor: selectedModel && selectedModel.siraNo === model.siraNo ? '#e6f7ff' : '#fff' }}
                                            >
                                                {model.modelDef}
                                            </List.Item>
                                        )}
                                        style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}
                                    />
                                </>
                            )}
                            <div className='model-buttons'>
                                <Button className='btn primary-btn' onClick={() => setIsModelAddOpen(true)} style={{ marginRight: '8px' }}>{t("ekle")}</Button>
                                <Button className='btn primary-btn' onClick={() => setIsUpdateModelOpen(true)} style={{ marginRight: '8px' }}>{t("duzenle")}</Button>
                                <Button className='btn primary-btn' onClick={handleModelDelete}>{t("sil")}</Button>
                            </div>
                        </Content>
                    </Layout>
                </Layout>

                <AddModal isOpen={isOpen} setIsOpen={setIsOpen} setStatus={setStatus} />
                <UpdateModalModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} setStatus={setStatus} markaItem={{ siraNo: selectedMarka, marka: marka }} />

                <AddModelModal isOpen={isModelAddOpen} setIsOpen={setIsModelAddOpen} setStatus={setStatusModel} markaId={selectedMarka} />
                <UpdateModelModal isOpen={isModelUpdateOpen} setIsOpen={setIsUpdateModelOpen} setStatus={setStatusModel} modelItem={selectedModel} />

                {/* marka */}
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
                    <p>[ {marka} ] markasına ait araç kayıtları bulunmaktadır. Kayıt silinemez.</p>
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
                    <p>[ {marka} ] tanımlı marka ve bu markaya tanımlanmış tüm modeller silinecektir. Devam etmek istediğinizden emin misiniz?</p>
                </Modal>

                {/* model */}
                <Modal
                    open={isDeleteModelModalOpen}
                    onOk={closeModal}
                    onCancel={closeModal}
                    footer={[
                        <Button key="ok" onClick={closeModal}>
                            Tamam
                        </Button>,
                    ]}
                >
                    <p>[ {marka} ] markasına ait araç kayıtları bulunmaktadır. Kayıt silinemez.</p>
                </Modal>
                <Modal
                    open={isConfirmDeleteModelModalOpen}
                    onOk={confirmModelDelete}
                    onCancel={closeConfirmModal}
                    footer={[
                        <Button key="cancel" onClick={closeConfirmModal}>
                            Hayır
                        </Button>,
                        <Button key="confirm" type="primary" onClick={confirmModelDelete}>
                            Evet
                        </Button>,
                    ]}
                >
                    <p>[ {marka} ] tanımlı marka ve bu markaya tanımlanmış tüm modeller silinecektir. Devam etmek istediğinizden emin misiniz?</p>
                </Modal>
            </div>
        </>

    );
};

export default MarkaList;

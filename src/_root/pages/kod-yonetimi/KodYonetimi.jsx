import React, { useEffect, useState } from "react";
import { Layout, Menu, List, Button, Modal, Input, Popconfirm } from "antd";
import { HomeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { t } from "i18next";
// import AddModal from './marka-modals/AddModal';
// import UpdateModalModal from './marka-modals/UpdateModal';
// import AddModelModal from './model-modals/AddModelModal';
// import UpdateModelModal from './model-modals/UpdateModelModal';
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb";
import { AddCodeService, GetCodeGroupsService, GetCodeTextByIdService, UpdateCodeService, DeleteCodeService } from "../../../api/services/settings/services";

const { Sider, Content } = Layout;

const breadcrumb = [{ href: "/", title: <HomeOutlined /> }, { title: t("kodYonetimi") }];

const codeTitle = {
  background: "#fff",
  textAlign: "center",
  padding: "10px",
  fontWeight: "600",
  fontSize: "24px",
  color: "#f6970e",
};

const KodYonetimi = () => {
  // code
  const [selectedCode, setSelectedCode] = useState(null);
  const [codeList, setCodeList] = useState([]);
  const [searchCode, setSearchCode] = useState("");
  const [code, setCode] = useState([]);

  // codetext
  const [codeTextList, setCodeTextList] = useState([]);
  const [searchCodeText, setSearchCodeText] = useState("");
  const [selectedCodeText, setSelectedCodeText] = useState(null);
  const [status, setStatus] = useState(false);
  const [codeTextValue, setCodeTextValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    GetCodeGroupsService().then((res) => setCodeList(res.data));
  }, [status]);

  useEffect(() => {
    if (selectedCode) {
      GetCodeTextByIdService(selectedCode).then((res) => setCodeTextList(res.data));
    }
  }, [selectedCode, status]);

  const handleCodeClick = (id) => {
    setSelectedCode(id);
    const item = codeList.find((item) => item.siraNo === +id);
    setCode(item.codeType);
    setSelectedCodeText(null);
  };

  const filteredCodeList = codeList.filter((item) => item.codeType.toLowerCase().includes(searchCode.toLowerCase()));

  const filteredCodeTextList = codeTextList.filter((item) => item.codeText.toLowerCase().includes(searchCodeText.toLowerCase()));

  const updatedList = filteredCodeList.map((item) => {
    return {
      key: item.codeId,
      label: item.codeType,
    };
  });

  const onSubmit = () => {
    const body = {
      codeId: selectedCode,
      codeText: codeTextValue,
    };

    AddCodeService(body).then((res) => {
      if (res.data.statusCode === 201) {
        setCode("");
        setStatus(true);
        setIsOpen(false);
      }
    });
    setStatus(false);
  };

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setIsOpen(false)}>
      {t("kapat")}
    </Button>,
  ];

  const update = () => {
    const body = {
      siraNo: selectedCodeText.siraNo,
      codeText: codeTextValue,
    };

    UpdateCodeService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setCodeTextValue("");
        setIsUpdateOpen(false);
        setStatus(true);
      }
    });
    setStatus(false);
  };

  const updateFooter = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={update}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setIsUpdateOpen(false)}>
      {t("kapat")}
    </Button>,
  ];

  const resetModalValues = () => {
    setCodeTextValue("");
    setSelectedCodeText(null);
  };

  const onCloseAddModal = () => {
    setIsOpen(false);
    resetModalValues();
  };

  const onCloseUpdateModal = () => {
    setIsUpdateOpen(false);
    resetModalValues();
  };

  const openAddModal = () => {
    resetModalValues();
    setIsOpen(true);
  };

  const deleteCodeItem = () => {
    if (selectedCodeText) {
      DeleteCodeService(selectedCodeText.siraNo).then((res) => {
        if (res.data.statusCode === 202) {
          setStatus(true);
          setSelectedCodeText(null);
        }
      });
      setStatus(false);
    }
  };

  return (
    <>
      {/* <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div> */}
      <div className="sistem">
        <Layout style={{ height: "90vh" }}>
          <Sider width={200} style={{ padding: "10px" }}>
            <div style={codeTitle}>{t("kodGruplari")}</div>
            <Input value={searchCode} onChange={(e) => setSearchCode(e.target.value)} placeholder={t("arama")} />
            <Menu mode="inline" style={{ height: "90%", borderRight: 0, overflow: "auto", marginTop: 10 }} onClick={({ key }) => handleCodeClick(key)} items={updatedList} />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280, overflow: "auto" }}>
              {selectedCode && (
                <>
                  {/* <div className='title'>{code}</div> */}
                  <div className="m-20">
                    <Input value={searchCodeText} onChange={(e) => setSearchCodeText(e.target.value)} placeholder={t("arama")} />
                  </div>
                  <List
                    dataSource={filteredCodeTextList}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => {
                          setSelectedCodeText(item);
                          setCodeTextValue(item.codeText);
                        }}
                        style={{ backgroundColor: selectedCodeText && selectedCodeText.siraNo === item.siraNo ? "#e6f7ff" : "#fff" }}
                      >
                        {item.codeText}
                      </List.Item>
                    )}
                    style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px" }}
                  />
                </>
              )}
              <div className="model-buttons">
                <Button className="btn primary-btn" onClick={openAddModal} style={{ marginRight: "8px" }}>
                  {t("ekle")}
                </Button>
                <Button className="btn primary-btn" onClick={() => setIsUpdateOpen(true)} style={{ marginRight: "8px" }} disabled={!selectedCodeText}>
                  {t("duzenle")}
                </Button>
                <Popconfirm
                  title={t("silmeIslemi")}
                  description={<div style={{ maxWidth: "250px" }}>{t("kodSilmeUyarisi")}</div>}
                  onConfirm={deleteCodeItem}
                  onCancel={() => {}}
                  okText={t("evet")}
                  cancelText={t("hayır")}
                  disabled={!selectedCodeText}
                  icon={
                    <QuestionCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                >
                  <Button className="btn primary-btn" style={{ marginRight: "8px" }} disabled={!selectedCodeText}>
                    {t("sil")}
                  </Button>
                </Popconfirm>
                {/* <Button className='btn primary-btn' onClick={handleModelDelete}>{t("sil")}</Button> */}
              </div>
            </Content>
          </Layout>
        </Layout>

        <Modal title={t("yeniAracTipiGirisi")} open={isOpen} onCancel={onCloseAddModal} maskClosable={false} footer={footer} width={500}>
          <label>Araç tipi tanımını giriniz</label>
          <Input value={codeTextValue} onChange={(e) => setCodeTextValue(e.target.value)} />
        </Modal>

        <Modal title={t("KodGirisi")} open={isUpdateOpen} onCancel={onCloseUpdateModal} maskClosable={false} footer={updateFooter} width={500}>
          <label>[{codeTextValue}] kodu için değiştirilecek değeri giriniz</label>
          <Input value={codeTextValue} onChange={(e) => setCodeTextValue(e.target.value)} />
        </Modal>
      </div>
    </>
  );
};

export default KodYonetimi;

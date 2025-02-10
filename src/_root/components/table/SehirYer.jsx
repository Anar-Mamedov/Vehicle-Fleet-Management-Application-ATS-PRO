import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Layout, Menu, List, Button, Modal } from "antd";
import { t } from "i18next";
import { DeleteRegionService, GetGuzergahYerByTownIdService, GetSehirListService } from "../../../api/services/guzergah_services";
import AddModal from "./components/sehir-yer/AddModal";
import UpdateModal from "./components/sehir-yer/UpdateModal";

const { Sider, Content } = Layout;

const SehirYer = () => {
  const [selectedSehir, setSelectedSehir] = useState(null);
  const [sehirList, setSehirList] = useState([]);
  const [sehirYerList, setSehirYerList] = useState([]);
  const [sehir, setSehir] = useState([]);
  const [yer, setYer] = useState(null);
  const [status, setStatus] = useState(false);
  const [selectedYer, setSelectedYer] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddOpen, setAddOpen] = useState(false);

  useEffect(() => {
    GetSehirListService().then((res) => setSehirList(res.data));
  }, [status]);

  const handleSehirClick = (id) => {
    setSelectedSehir(id);
    const item = sehirList.find((item) => item.sehirId === +id);
    setSehir(item.tanim);
    setSelectedYer(null);
  };

  useEffect(() => {
    if (selectedSehir) {
      GetGuzergahYerByTownIdService(selectedSehir).then((res) => setSehirYerList(res.data));
    }
  }, [selectedSehir, status]);

  const handleYerClick = (yer) => {
    setSelectedYer(yer);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: t("confirmDeleteTitle"),
      content: t("confirmDeleteMessage"),
      okText: t("evet"),
      okType: "danger",
      cancelText: t("hayir"),
      onOk() {
        DeleteRegionService(selectedYer.sehirYerId).then((res) => {
          if (res.data.statusCode === 202) {
            setStatus(true);
          }
        });
        setStatus(false);
      },
    });
  };

  const updatedList = sehirList.map((item) => {
    return {
      key: item.sehirId,
      label: item.tanim,
    };
  });

  return (
    <div className="sistem region">
      <Layout style={{ height: "90vh" }}>
        <Sider width={200}>
          <div>{t("tanim")}</div>
          <Menu mode="inline" style={{ height: "80vh", borderRight: 0, overflow: "auto" }} onClick={({ key }) => handleSehirClick(key)} items={updatedList} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280, overflow: "auto" }}>
            {selectedSehir && (
              <>
                <div className="title">{sehir}</div>
                <List
                  dataSource={sehirYerList}
                  renderItem={(yer) => (
                    <List.Item onClick={() => handleYerClick(yer)} style={{ backgroundColor: selectedYer && selectedYer.sehirYerId === yer.sehirYerId ? "#e6f7ff" : "#fff" }}>
                      {yer.tanim}
                    </List.Item>
                  )}
                  style={{ backgroundColor: "#fff", padding: "10px", borderRadius: "5px" }}
                />
              </>
            )}
          </Content>
          <div className="model-buttons">
            <Button className="btn primary-btn" onClick={() => setAddOpen(true)} style={{ marginRight: "8px" }}>
              {t("ekle")}
            </Button>
            <Button className="btn primary-btn" onClick={() => setIsUpdateOpen(true)} style={{ marginRight: "8px" }}>
              {t("duzenle")}
            </Button>
            <Button className="btn primary-btn" onClick={handleDelete}>
              {t("sil")}
            </Button>
          </div>
        </Layout>
      </Layout>

      <AddModal isOpen={isAddOpen} setIsOpen={setAddOpen} setStatus={setStatus} id={selectedSehir} />
      <UpdateModal isOpen={isUpdateOpen} setIsOpen={setIsUpdateOpen} setStatus={setStatus} yer={selectedYer} />
    </div>
  );
};

export default SehirYer;

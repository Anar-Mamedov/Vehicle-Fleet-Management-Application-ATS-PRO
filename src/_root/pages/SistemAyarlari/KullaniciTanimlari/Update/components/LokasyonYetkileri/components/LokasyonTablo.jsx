import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../../../api/http.jsx";
import { t } from "i18next";

export default function LokasyonTablo({ workshopSelectedId, onSubmit, currentUserId, setRefreshKey }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: "",
      key: "locationInfo",
      align: "left",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
          <div>{record.location}</div>
          {record.fullLocationPath && <div style={{ color: "gray", fontSize: "12px" }}>{record.fullLocationPath}</div>}
        </div>
      ),
    },
    // Diğer sütunlar...
  ];

  // API'den gelen veriyi tabloya uygun formata dönüştürme fonksiyonu
  const formatDataForTable = (data) => {
    return data.map((item) => ({
      ...item,
      key: item.locationId,
      title: item.location,
      children: item.hasChild ? [] : undefined, // hasChild true ise children boş dizi
      fullLocationPath: item.fullLocationPath,
    }));
  };

  // Arama terimini gecikmeli olarak ayarlama
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // debouncedSearchTerm değiştiğinde verileri yeniden çek
  useEffect(() => {
    if (isModalVisible) {
      fetchData();
    }
  }, [debouncedSearchTerm, isModalVisible]);

  // Tablodaki satırı genişletme ve çocuklarını yükleme fonksiyonu
  const onTableRowExpand = (expanded, record) => {
    // expandedRowKeys'i hemen güncelle
    setExpandedRowKeys((prevKeys) => {
      if (expanded) {
        return [...prevKeys, record.key];
      } else {
        return prevKeys.filter((key) => key !== record.key);
      }
    });

    if (expanded && record.hasChild && record.children.length === 0 && record.locationId) {
      setLoading(true);

      AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=${record.locationId}&parameter=${debouncedSearchTerm}`)
        .then((response) => {
          const childrenData = formatDataForTable(response.data);
          const newData = [...treeData];

          const updateTreeData = (data) => {
            return data.map((item) => {
              if (item.key === record.key) {
                return {
                  ...item,
                  children: childrenData,
                };
              } else if (item.children) {
                return {
                  ...item,
                  children: updateTreeData(item.children),
                };
              } else {
                return item;
              }
            });
          };

          const updatedTreeData = updateTreeData(newData);
          setTreeData(updatedTreeData);

          setLoading(false);
        })
        .catch((error) => {
          console.error("API Hatası:", error);
          setLoading(false);
        });
    }
  };

  // İlk veri çekme fonksiyonu
  const fetchData = () => {
    setLoading(true);
    AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=0&parameter=${debouncedSearchTerm}`)
      .then((response) => {
        const tree = formatDataForTable(response.data);
        setTreeData(tree);
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Hatası:", error);
        setLoading(false);
      });
  };

  // Ağaç yapısında belirli bir öğeyi bulma fonksiyonu
  const findItemInTree = (key, tree) => {
    for (const item of tree) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findItemInTree(key, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  // Modal açma/kapatma fonksiyonu
  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
    if (!isModalVisible) {
      fetchData(); // Modal açıldığında verileri çek
      setSelectedRowKeys([]);
      setSearchTerm("");
      setDebouncedSearchTerm("");
      setExpandedRowKeys([]);
    }
  };

  // Modal onaylama fonksiyonu
  const handleModalOk = () => {
    const selectedData = findItemInTree(selectedRowKeys[0], treeData);
    if (selectedData) {
      const body = {
        lokasyonId: selectedData.locationId,
        kullaniciId: currentUserId,
      };

      AxiosInstance.post("UserLocation/AddUserLocationItem", body)
        .then((response) => {
          if (response.data.statusCode == 201 || response.data.statusCode == 200 || response.data.statusCode == 202) {
            message.success(t("islemBasarili"));
            setRefreshKey((prev) => prev + 1); // Verileri yenile
          }
        })
        .catch((error) => {
          console.error("API Hatası:", error);
        });

      onSubmit && onSubmit(selectedData);
    }
    setIsModalVisible(false);
  };

  // Seçili satır anahtarlarını ayarlama
  useEffect(() => {
    setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
  }, [workshopSelectedId]);

  // Satır seçimi değiştiğinde çağrılan fonksiyon
  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };

  // Satır seçimi ayarları
  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: onRowSelectChange,
  };

  return (
    <div>
      <Button type="primary" onClick={handleModalToggle}>
        {t("lokasyonEkle")}
      </Button>
      <Modal width="1200px" title={t("lokasyon")} open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <Input
          style={{ width: "250px", marginBottom: "10px" }}
          type="text"
          placeholder={t("aramaYap")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={treeData}
          loading={loading}
          scroll={{
            y: "calc(100vh - 400px)",
          }}
          expandedRowKeys={expandedRowKeys}
          onExpand={onTableRowExpand}
        />
      </Modal>
    </div>
  );
}

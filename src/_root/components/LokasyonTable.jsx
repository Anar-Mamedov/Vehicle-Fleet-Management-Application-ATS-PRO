import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import { SearchOutlined, PlusOutlined, CloseCircleFilled } from "@ant-design/icons";
import AxiosInstance from "../../api/http.jsx";
import { t } from "i18next";
import { Controller, useForm, FormProvider } from "react-hook-form";

const { Search } = Input;

export default function LokasyonTablo({ workshopSelectedId, onSubmit, currentUserId, setRefreshKey }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const methods = useForm();
  const { control } = methods;

  const columns = [
    {
      title: "",
      key: "locationInfo",
      render: (text, record) => (
        <div>
          <div>{record.location}</div>
          <div style={{ color: "gray", fontSize: "12px" }}>{record.fullLocationPath}</div>
        </div>
      ),
      sorter: (a, b) => a.location.localeCompare(b.location),
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

  // Search function called when button is clicked or Enter key is pressed
  const handleSearch = (value) => {
    fetchData(value);
  };

  // Modal durumu değiştiğinde yapılacak işlemler
  useEffect(() => {
    if (isModalVisible) {
      // Reset state when modal opens
      setSelectedRowKeys([]);
      setSearchTerm("");
      setExpandedRowKeys([]);

      // Initial data fetch with empty search
      fetchData("");
    }
  }, [isModalVisible]);

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

      AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=${record.locationId}&parameter=${searchTerm}`)
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
  const fetchData = (parameter = "") => {
    setLoading(true);
    AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=0&parameter=${parameter}`)
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

  // Modal açma fonksiyonu
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  // Modal kapatma fonksiyonu
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Modal onaylama fonksiyonu
  const handleModalOk = () => {
    const selectedData = findItemInTree(selectedRowKeys[0], treeData);
    if (selectedData) {
      onSubmit && onSubmit(selectedData); // This should handle both parents and children
      methods.setValue("lokasyon", selectedData.location);
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

  // Input temizleme fonksiyonu
  const handleClearInput = () => {
    methods.setValue("lokasyon", "");
    onSubmit && onSubmit(null);
  };

  return (
    <FormProvider {...methods}>
      <div>
        <Controller
          name="lokasyon"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
              <Input
                {...field}
                status={error ? "error" : ""}
                placeholder={t("lokasyonSec")}
                readOnly={true}
                suffix={
                  field.value ? (
                    <CloseCircleFilled style={{ color: "#FF4D4F" }} onClick={handleClearInput} />
                  ) : (
                    <PlusOutlined style={{ color: "#1677ff" }} onClick={handleModalOpen} />
                  )
                }
              />
              {error && <span style={{ color: "red" }}>{error.message}</span>}
            </div>
          )}
        />

        <Modal width="1200px" title={t("lokasyon")} open={isModalVisible} onOk={handleModalOk} onCancel={handleModalClose}>
          <Search
            style={{ width: "250px", marginBottom: "10px" }}
            placeholder={t("aramaYap")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            enterButton
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={treeData}
            loading={loading}
            pagination={false}
            scroll={{
              y: "calc(100vh - 400px)",
            }}
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
          />
        </Modal>
      </div>
    </FormProvider>
  );
}

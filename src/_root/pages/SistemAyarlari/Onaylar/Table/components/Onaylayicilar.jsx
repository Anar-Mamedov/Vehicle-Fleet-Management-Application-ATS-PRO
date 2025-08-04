import React, { useState, useEffect } from "react";
import { Table, Button, Input, Space, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import AxiosInstance from "../../../../../../api/http.jsx";

function Onaylayicilar({ data, siraNo, tanim }) {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userTableData, setUserTableData] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedUserKeys, setSelectedUserKeys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApproverKeys, setSelectedApproverKeys] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);

  // Kullanıcı seçimi için sütun tanımları
  const userColumns = [
    {
      title: t("kullaniciKod"),
      dataIndex: "kullaniciKod",
      key: "kullaniciKod",
      width: 120,
    },
    {
      title: t("isim"),
      dataIndex: "isim",
      key: "isim",
      width: 150,
    },
    {
      title: t("soyAd"),
      dataIndex: "soyAd",
      key: "soyAd",
      width: 150,
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: t("telefon"),
      dataIndex: "telefon",
      key: "telefon",
      width: 120,
    },
    {
      title: t("durum"),
      dataIndex: "aktif",
      key: "aktif",
      width: 100,
      render: (aktif) => <span style={{ color: aktif ? "#52c41a" : "#ff4d4f" }}>{aktif ? "Aktif" : "Pasif"}</span>,
    },
  ];

  // Kullanıcı listesini getir
  const fetchUsers = async (page = 1, parameter = "") => {
    try {
      setUserLoading(true);
      const response = await AxiosInstance.get(`User/GetUsers?page=${page}&parameter=${parameter}`);
      if (response.data) {
        const formattedData = response.data.users.map((item) => ({
          ...item,
          key: item.siraNo,
        }));
        setUserTableData(formattedData);
      }
    } catch (error) {
      console.error("Kullanıcı listesi yüklenirken hata:", error);
      message.error("Kullanıcı listesi yüklenirken hata oluştu");
    } finally {
      setUserLoading(false);
    }
  };

  // Ana tablo verilerini getir
  const fetchApprovers = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`Approver/GetApprovers?approvalTypeId=${data.onayTipId}`);
      if (response.data) {
        const formattedData = response.data.map((item) => ({
          ...item,
          id: item.siraNo, // API'den gelen siraNo'yu id olarak kullan
        }));
        setTableData(formattedData);
      }
    } catch (error) {
      console.error("Onaylayıcı listesi yüklenirken hata:", error);
      message.error("Onaylayıcı listesi yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Component mount olduğunda verileri getir
  useEffect(() => {
    if (data && data.onayTipId) {
      fetchApprovers();
    }
  }, [data]);

  // tableData değiştiğinde filteredTableData'yı güncelle
  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  // Onaylayıcı arama fonksiyonu
  const [filteredTableData, setFilteredTableData] = useState([]);

  const handleApproverSearch = (value) => {
    if (!value || value.trim() === "") {
      setFilteredTableData(tableData);
      return;
    }

    const filteredData = tableData.filter((item) => item.isim?.toLowerCase().includes(value.toLowerCase()) || item.siraNo?.toString().includes(value));
    setFilteredTableData(filteredData);
  };

  // Modal açma
  const showModal = () => {
    setIsModalVisible(true);
    fetchUsers(1, searchTerm);
  };

  // Modal kapatma
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUserKeys([]);
    setSelectedUsers([]);
    setSearchTerm("");
  };

  // Kullanıcı seçimi
  const onUserSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedUserKeys(newSelectedRowKeys);
    setSelectedUsers(newSelectedRows);
  };

  // Kullanıcı arama
  const handleUserSearch = (value) => {
    setSearchTerm(value);
    fetchUsers(1, value);
  };

  // Seçili kullanıcıları onaylayıcı olarak ekle
  const handleAddApprovers = async () => {
    if (selectedUsers.length === 0) {
      message.warning("Lütfen en az bir kullanıcı seçin");
      return;
    }

    // Mevcut kullanıcı ID'lerini kontrol et (duplicate önleme)
    const existingUserIds = tableData.flatMap((item) => item.kullaniciIds || []);
    const newUsers = selectedUsers.filter((user) => !existingUserIds.includes(user.siraNo));

    if (newUsers.length === 0) {
      message.warning("Seçili kullanıcılar zaten onaylayıcı listesinde bulunuyor");
      return;
    }

    try {
      // API'ye yeni onaylayıcıları gönder - yeni format
      const kullaniciIds = newUsers.map((user) => user.siraNo);
      const requestData = {
        kullaniciIds: kullaniciIds,
        onayTipId: data.onayTipId,
      };

      await AxiosInstance.post("Approver/AddApprover", requestData);

      message.success(`${newUsers.length} kullanıcı onaylayıcı olarak eklendi`);
      handleModalCancel();

      // Tabloyu yenile
      fetchApprovers();
    } catch (error) {
      console.error("Onaylayıcı eklenirken hata:", error);
      message.error("Onaylayıcı eklenirken hata oluştu");
    }
  };

  // Kullanıcı tablosu için row selection
  const userRowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedUserKeys,
    onChange: onUserSelectChange,
  };

  // Onaylayıcı silme işlemi
  const handleDeleteApprovers = async () => {
    if (selectedApprovers.length === 0) {
      message.warning("Lütfen silinecek onaylayıcıları seçin");
      return;
    }

    try {
      const approverIds = selectedApprovers.map((approver) => approver.siraNo);
      await AxiosInstance.delete("Approver/DeleteApprovers", {
        data: { approverIds, approvalTypeId: data.onayTipId },
      });

      message.success(`${selectedApprovers.length} onaylayıcı başarıyla silindi`);
      setSelectedApproverKeys([]);
      setSelectedApprovers([]);

      // Tabloyu yenile
      fetchApprovers();
    } catch (error) {
      console.error("Onaylayıcı silinirken hata:", error);
      message.error("Onaylayıcı silinirken hata oluştu");
    }
  };

  // Ana tablo için row selection
  const approverRowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedApproverKeys,
    onChange: (newSelectedRowKeys, newSelectedRows) => {
      setSelectedApproverKeys(newSelectedRowKeys);
      setSelectedApprovers(newSelectedRows);
    },
  };

  // Ana tablo sütun tanımları
  const columns = [
    {
      title: t("siraNo"),
      dataIndex: "siraNo",
      key: "siraNo",
      width: 100,
    },
    {
      title: t("isim"),
      dataIndex: "isim",
      key: "isim",
      width: 200,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search placeholder="Onaylayıcı ara..." style={{ width: 300 }} onSearch={handleApproverSearch} allowClear />
          <Space>
            {selectedApprovers.length > 0 && (
              <Button danger onClick={handleDeleteApprovers} disabled={selectedApprovers.length === 0}>
                Seçili Olanları Sil ({selectedApprovers.length})
              </Button>
            )}
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              {t("yeniOnaylayiciEkle")}
            </Button>
          </Space>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={filteredTableData}
        loading={loading}
        rowKey="id"
        rowSelection={approverRowSelection}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kayıt`,
        }}
        scroll={{ y: 400 }}
      />

      {/* Kullanıcı Seçimi Modal */}
      <Modal
        title="Kullanıcı Seçimi"
        open={isModalVisible}
        onCancel={handleModalCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddApprovers} disabled={selectedUsers.length === 0}>
            Seçili Kullanıcıları Ekle ({selectedUsers.length})
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Input.Search placeholder="Kullanıcı ara..." style={{ width: 300 }} onSearch={handleUserSearch} allowClear />
        </div>

        <Table
          columns={userColumns}
          dataSource={userTableData}
          loading={userLoading}
          rowSelection={userRowSelection}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} kullanıcı`,
          }}
          scroll={{ y: 400 }}
        />
      </Modal>
    </div>
  );
}

export default Onaylayicilar;

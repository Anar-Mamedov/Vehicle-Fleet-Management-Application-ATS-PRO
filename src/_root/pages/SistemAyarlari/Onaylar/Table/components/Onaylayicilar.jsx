import React, { useState } from "react";
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
  const handleAddApprovers = () => {
    if (selectedUsers.length === 0) {
      message.warning("Lütfen en az bir kullanıcı seçin");
      return;
    }

    // Mevcut kullanıcı ID'lerini kontrol et (duplicate önleme)
    const existingUserIds = tableData.map((item) => item.kullaniciId);
    const newUsers = selectedUsers.filter((user) => !existingUserIds.includes(user.siraNo));

    if (newUsers.length === 0) {
      message.warning("Seçili kullanıcılar zaten onaylayıcı listesinde bulunuyor");
      return;
    }

    // Seçili kullanıcıları onaylayıcı listesine ekle
    const newApprovers = newUsers.map((user, index) => ({
      id: `approver_${Date.now()}_${index}`, // Unique ID for rowKey
      siraNo: tableData.length + index + 1,
      onaylayiciAdi: `${user.isim} ${user.soyAd}`.trim(),
      pozisyon: user.kullaniciKod,
      departman: user.email || "-",
      durum: "Aktif",
      kullaniciId: user.siraNo,
    }));

    setTableData([...tableData, ...newApprovers]);
    message.success(`${newUsers.length} kullanıcı onaylayıcı olarak eklendi`);
    handleModalCancel();
  };

  // Kullanıcı tablosu için row selection
  const userRowSelection = {
    type: "checkbox",
    selectedRowKeys: selectedUserKeys,
    onChange: onUserSelectChange,
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

  // Örnek sütun tanımları
  const columns = [
    {
      title: t("onaylayiciAdi"),
      dataIndex: "onaylayiciAdi",
      key: "onaylayiciAdi",
      width: 200,
    },
    {
      title: t("pozisyon"),
      dataIndex: "pozisyon",
      key: "pozisyon",
      width: 150,
    },
    {
      title: t("departman"),
      dataIndex: "departman",
      key: "departman",
      width: 150,
    },
    {
      title: t("durum"),
      dataIndex: "durum",
      key: "durum",
      width: 100,
      render: (text) => <span style={{ color: text === "Aktif" ? "#52c41a" : "#ff4d4f" }}>{text}</span>,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Input.Search placeholder="Onaylayıcı ara..." style={{ width: 300 }} />
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            {t("yeniOnaylayiciEkle")}
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
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

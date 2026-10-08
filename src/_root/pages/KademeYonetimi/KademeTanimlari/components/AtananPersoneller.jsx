import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Popconfirm, Table, message } from "antd";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { t } from "i18next";
import PersonelSecimTablo from "../../../../components/PersonelSecimTablo";
import { AssignStaffToWorkShopService, GetStaffsByWorkShopIdService, RemoveStaffFromWorkShopService } from "../../../../../api/services/kademe/services";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { isSuccessResponse } from "../constants";
import { cardStyle, hintStyle, sectionTitleStyle } from "./uiStyles";

// Kademeye atanan personellerin listesi; personel atama ve kademeden çıkarma bu bölümden yapılır
const AtananPersoneller = ({ kademeId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSecimModalOpen, setIsSecimModalOpen] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!kademeId) return;

    setLoading(true);
    try {
      const response = await GetStaffsByWorkShopIdService(kademeId);
      const list = Array.isArray(response.data) ? response.data : [];
      setData(list.map((item) => ({ ...item, key: item.siraNo })));
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setLoading(false);
    }
  }, [kademeId]);

  useEffect(() => {
    setSelectedRowKeys([]);
    fetchData();
  }, [fetchData]);

  const handleAssign = async (selectedPersoneller) => {
    setAssigning(true);
    try {
      const response = await AssignStaffToWorkShopService({
        kademeId,
        personelIds: selectedPersoneller.map((personel) => personel.personelId),
      });

      if (isSuccessResponse(response)) {
        message.success(t("islemBasarili"));
        setIsSecimModalOpen(false);
        fetchData();
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setAssigning(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const response = await RemoveStaffFromWorkShopService(selectedRowKeys);

      if (isSuccessResponse(response)) {
        message.success(t("islemBasarili"));
        setSelectedRowKeys([]);
        fetchData();
      } else {
        message.error(t("islemBasarisiz"));
      }
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setRemoving(false);
    }
  };

  const columns = [
    {
      title: t("personelKod"),
      dataIndex: "personelKod",
      key: "personelKod",
      width: 160,
      ellipsis: true,
    },
    {
      title: t("personelIsmi"),
      dataIndex: "isim",
      key: "isim",
      width: 220,
      ellipsis: true,
    },
    {
      title: t("unvan"),
      dataIndex: "unvan",
      key: "unvan",
      width: 200,
      ellipsis: true,
      render: (text) => text || "-",
    },
  ];

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ ...sectionTitleStyle, marginBottom: 0 }}>{t("atananPersoneller")}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title={t("seciliPersonelleriCikarOnay")}
            okText={t("evet")}
            cancelText={t("hayir")}
            onConfirm={handleRemove}
            disabled={selectedRowKeys.length === 0}
          >
            <Button danger icon={<DeleteOutlined />} disabled={selectedRowKeys.length === 0} loading={removing}>
              {t("kademedenCikar")}
            </Button>
          </Popconfirm>
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsSecimModalOpen(true)}>
            {t("personelAta")}
          </Button>
        </div>
      </div>

      <Table
        size="small"
        rowSelection={{ type: "checkbox", selectedRowKeys, onChange: setSelectedRowKeys }}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        scroll={{ y: 260 }}
        locale={{ emptyText: t("kademeyeAtanmisPersonelYok") }}
      />
      <span style={{ ...hintStyle, display: "block", marginTop: "8px" }}>{`${t("toplam")}: ${formatNumberWithLocale(data.length)}`}</span>

      <PersonelSecimTablo
        open={isSecimModalOpen}
        onCancel={() => setIsSecimModalOpen(false)}
        onSubmit={handleAssign}
        confirmLoading={assigning}
        disabledPersonelKods={data.map((item) => item.personelKod)}
      />
    </div>
  );
};

AtananPersoneller.propTypes = {
  kademeId: PropTypes.number,
};

export default AtananPersoneller;

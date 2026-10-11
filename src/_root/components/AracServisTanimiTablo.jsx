import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, Table, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import ModalInput from "./form/inputs/ModalInput";
import { formatNumberWithLocale } from "../../hooks/FormattedNumber";
import { GetServiceDefListRelatedToVehicleService } from "../../api/services/servistanim_services";

// Servis tanımı listesi backend'de sabit 10 kayıtlık sayfalarla döner
const SAYFA_BOYUTU = 10;

// Seçilen araca tanımlı servis/bakım tanımlarından birini seçtirir.
// Liste araca bağlı olduğu için periyodik bakımlar da yalnızca o aracın bakım planından gelir.
export default function AracServisTanimiTablo({ name, vehicleId, required, disabled, placeholder, onSelect, onClear }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, total: 0 });

  const fetchData = async (page, search) => {
    setLoading(true);
    try {
      const response = await GetServiceDefListRelatedToVehicleService(vehicleId, page, search);
      const list = response?.data?.list || [];
      setData(list.map((item) => ({ ...item, key: item.bakimId })));
      setPagination({ current: page, total: response?.data?.recordCount || 0 });
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    if (!vehicleId) {
      message.warning(t("onceAracSeciniz"));
      return;
    }

    setSelectedRowKeys([]);
    setOpen(true);
    fetchData(1, searchTerm);
  };

  const handleOk = () => {
    const selected = data.find((item) => item.key === selectedRowKeys[0]);
    if (selected) onSelect(selected);
    setOpen(false);
  };

  const columns = [
    { title: t("servisKodu"), dataIndex: "bakimKodu", key: "bakimKodu", width: 150 },
    { title: t("servisTanimi"), dataIndex: "tanim", key: "tanim", width: 320 },
    { title: t("km"), dataIndex: "km", key: "km", width: 110, render: (value) => formatNumberWithLocale(value) },
    { title: t("gun"), dataIndex: "gun", key: "gun", width: 90 },
    { title: t("servisTipi"), dataIndex: "servisTipi", key: "servisTipi", width: 140 },
    {
      title: t("periyodik"),
      dataIndex: "periyodik",
      key: "periyodik",
      width: 100,
      align: "center",
      render: (periyodik) => (periyodik ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />),
    },
  ];

  return (
    <>
      <ModalInput name={name} readonly required={required} disabled={disabled} placeholder={placeholder} onPlusClick={openModal} onMinusClick={onClear} />
      <Modal width={1100} centered title={t("servisTanimlari")} open={open} onOk={handleOk} onCancel={() => setOpen(false)} okButtonProps={{ disabled: selectedRowKeys.length === 0 }} destroyOnClose>
        <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
          <Input
            style={{ width: "300px" }}
            placeholder={t("arama")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={() => fetchData(1, searchTerm)}
          />
          <Button icon={<SearchOutlined />} onClick={() => fetchData(1, searchTerm)} />
        </div>
        <Table
          bordered
          rowSelection={{ type: "radio", selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys) }}
          onRow={(record) => ({ onClick: () => setSelectedRowKeys([record.key]) })}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ current: pagination.current, total: pagination.total, pageSize: SAYFA_BOYUTU, showSizeChanger: false }}
          onChange={(newPagination) => fetchData(newPagination.current, searchTerm)}
          scroll={{ y: "calc(100vh - 380px)" }}
        />
      </Modal>
    </>
  );
}

AracServisTanimiTablo.propTypes = {
  name: PropTypes.string.isRequired,
  vehicleId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

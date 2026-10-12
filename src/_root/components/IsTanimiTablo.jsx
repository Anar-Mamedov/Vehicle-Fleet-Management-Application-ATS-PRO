import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import ModalInput from "./form/inputs/ModalInput";
import { formatNumberWithLocale } from "../../hooks/FormattedNumber";
import { GetWorkCardsListService } from "../../api/services/isKartlari_services";

// İş tanımı listesi backend'de sabit 10 kayıtlık sayfalarla döner
const SAYFA_BOYUTU = 10;

// İş Kartları'nda tanımlı işlerden (iş tanımları) birini seçtirir; seçilen kayıt onSelect ile verilir
export default function IsTanimiTablo({ name, required, disabled, placeholder, onSelect, onClear }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  // İmleç bir önceki sayfanın ilk/son kaydından hesaplandığı için güncel liste ref'te tutulur
  const dataRef = useRef([]);

  const fetchData = async (diff, targetPage, search) => {
    let setPointId = 0;
    if (diff > 0) setPointId = dataRef.current[dataRef.current.length - 1]?.isTanimId || 0;
    if (diff < 0) setPointId = dataRef.current[0]?.isTanimId || 0;

    setLoading(true);
    try {
      const response = await GetWorkCardsListService(diff, setPointId, search);
      const list = (response?.data?.list || []).map((item) => ({ ...item, key: item.isTanimId }));
      dataRef.current = list;
      setData(list);
      setTotalCount(response?.data?.recordCount || 0);
      setCurrentPage(targetPage);
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setSelectedRowKeys([]);
    setOpen(true);
    fetchData(0, 1, searchTerm);
  };

  const handleOk = () => {
    const selected = data.find((item) => item.key === selectedRowKeys[0]);
    if (selected) onSelect(selected);
    setOpen(false);
  };

  const columns = [
    { title: t("isTanimi"), dataIndex: "tanim", key: "tanim", width: 260, ellipsis: true },
    { title: t("isTuru"), dataIndex: "isTip", key: "isTip", width: 140, ellipsis: true },
    { title: t("isGrubu"), dataIndex: "bakimDepartman", key: "bakimDepartman", width: 180, ellipsis: true },
    { title: t("saat"), dataIndex: "saat", key: "saat", width: 90 },
    { title: t("dakika"), dataIndex: "dakika", key: "dakika", width: 90 },
    { title: t("ucret"), dataIndex: "ucret", key: "ucret", width: 120, render: (value) => formatNumberWithLocale(value) },
  ];

  return (
    <>
      <ModalInput name={name} readonly required={required} disabled={disabled} placeholder={placeholder} onPlusClick={openModal} onMinusClick={onClear} />
      <Modal width={1000} centered title={t("isTanimlari")} open={open} onOk={handleOk} onCancel={() => setOpen(false)} okButtonProps={{ disabled: selectedRowKeys.length === 0 }} destroyOnClose>
        <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
          <Input style={{ width: "300px" }} placeholder={t("arama")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onPressEnter={() => fetchData(0, 1, searchTerm)} />
          <Button icon={<SearchOutlined />} onClick={() => fetchData(0, 1, searchTerm)} />
        </div>
        <Table
          bordered
          rowSelection={{ type: "radio", selectedRowKeys, onChange: (keys) => setSelectedRowKeys(keys) }}
          onRow={(record) => ({ onClick: () => setSelectedRowKeys([record.key]) })}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ current: currentPage, total: totalCount, pageSize: SAYFA_BOYUTU, showSizeChanger: false }}
          onChange={(pagination) => fetchData(pagination.current - currentPage, pagination.current, searchTerm)}
          scroll={{ y: "calc(100vh - 380px)" }}
        />
      </Modal>
    </>
  );
}

IsTanimiTablo.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

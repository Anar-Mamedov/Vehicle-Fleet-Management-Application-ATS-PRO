import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Modal, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import ModalInput from "./form/inputs/ModalInput";
import { formatNumberWithLocale } from "../../hooks/FormattedNumber";
import { GetMaterialListByWareHouseIdService } from "../../api/services/malzeme/services";

// Depodaki malzeme listesi backend'de sabit 10 kayıtlık sayfalarla döner
const SAYFA_BOYUTU = 10;

// Stoklu malzeme kullanımında yalnızca verilen depodaki malzemelerden birini seçtirir.
// Seçilen kayıt (malzemeId, malzemeKod, tanim, birim, birimKodId, fiyat ...) onSelect ile verilir.
export default function DepoMalzemeTablo({ name, wareHouseId, required, disabled, placeholder, onSelect, onClear }) {
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
    if (diff > 0) setPointId = dataRef.current[dataRef.current.length - 1]?.siraNo || 0;
    if (diff < 0) setPointId = dataRef.current[0]?.siraNo || 0;

    setLoading(true);
    try {
      const response = await GetMaterialListByWareHouseIdService(diff, setPointId, search, wareHouseId);
      const list = (response?.data?.materialList || []).map((item) => ({ ...item, key: item.siraNo }));
      dataRef.current = list;
      setData(list);
      setTotalCount(response?.data?.total_count || 0);
      setCurrentPage(targetPage);
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    if (!wareHouseId) {
      message.warning(t("onceCikisDeposuSeciniz"));
      return;
    }

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
    { title: t("malzemeKodu"), dataIndex: "malzemeKod", key: "malzemeKod", width: 160, ellipsis: true },
    { title: t("malzemeTanimi"), dataIndex: "tanim", key: "tanim", width: 260, ellipsis: true },
    { title: t("birim"), dataIndex: "birim", key: "birim", width: 100, ellipsis: true },
    { title: t("stokMiktari"), dataIndex: "stokMiktar", key: "stokMiktar", width: 120, render: (value) => formatNumberWithLocale(value) },
  ];

  return (
    <>
      <ModalInput name={name} readonly required={required} disabled={disabled} placeholder={placeholder} onPlusClick={openModal} onMinusClick={onClear} />
      <Modal width={900} centered title={t("malzemeSec")} open={open} onOk={handleOk} onCancel={() => setOpen(false)} okButtonProps={{ disabled: selectedRowKeys.length === 0 }} destroyOnClose>
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

DepoMalzemeTablo.propTypes = {
  name: PropTypes.string.isRequired,
  wareHouseId: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

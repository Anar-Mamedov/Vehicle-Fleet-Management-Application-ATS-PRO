import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Pagination, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import PageSizeSelect, { getStoredPageSize } from "./table/PageSizeSelect";
import { GetEmployeeListService } from "../../api/services/personel_services";
import { formatNumberWithLocale } from "../../hooks/FormattedNumber";

const PAGE_SIZE_STORAGE_KEY = "personelSecimTabloPageSize";

// Yalnızca aktif personel seçilebilsin diye listede status=1 (Aktif) gönderilir
const PERSONEL_FILTERS = {
  personelTipKodIds: [],
  lokasyonIds: [],
  status: 1,
};

const NO_DISABLED_CODES = [];

// Personel listesinden çoklu seçim yapılan global modal. Seçilen satırlar onSubmit ile döner.
// disabledPersonelKods içindeki personeller (ör. zaten atanmış olanlar) seçilemez.
export default function PersonelSecimTablo({ open, onCancel, onSubmit, confirmLoading, disabledPersonelKods = NO_DISABLED_CODES }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(() => getStoredPageSize(PAGE_SIZE_STORAGE_KEY));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const searchTermRef = useRef("");
  const dataRef = useRef([]);
  const pageSizeRef = useRef(pageSize);
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async (diff, targetPage, setPointIdOverride, pageSizeOverride = pageSizeRef.current) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const currentList = dataRef.current;
      let setPointId = setPointIdOverride ?? 0;

      if (setPointIdOverride === undefined && diff > 0) {
        setPointId = currentList[currentList.length - 1]?.personelId || 0;
      } else if (setPointIdOverride === undefined && diff < 0) {
        setPointId = currentList[0]?.personelId || 0;
      }

      const response = await GetEmployeeListService(diff, setPointId, searchTermRef.current, PERSONEL_FILTERS, pageSizeOverride);

      if (requestId !== requestIdRef.current) return;

      const newData = (response.data.list || []).map((item) => ({
        ...item,
        key: item.personelId,
      }));

      dataRef.current = newData;
      setData(newData);
      setTotalCount(response.data.recordCount);
      setCurrentPage(targetPage);
    } catch {
      if (requestId !== requestIdRef.current) return;
      message.error(t("islemBasarisiz"));
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  // Modal her açıldığında seçim ve arama sıfırlanıp ilk sayfa okunur
  useEffect(() => {
    if (open) {
      searchTermRef.current = "";
      setSearchTerm("");
      setSelectedRowKeys([]);
      setSelectedRows([]);
      fetchData(0, 1, 0);
    }
  }, [open, fetchData]);

  const handleSearch = () => {
    searchTermRef.current = searchTerm;
    fetchData(0, 1, 0);
  };

  const handlePageChange = (page) => {
    fetchData(page - currentPage, page);
  };

  const handlePageSizeChange = (value) => {
    localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(value));
    pageSizeRef.current = value;
    setPageSize(value);
    fetchData(0, 1, 0, value);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    // Sayfa değişse de önceki sayfalarda yapılan seçimler korunur
    preserveSelectedRowKeys: true,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      setSelectedRows(rows.filter(Boolean));
    },
    getCheckboxProps: (record) => ({
      disabled: disabledPersonelKods.includes(record.personelKod),
    }),
  };

  const columns = [
    {
      title: t("personelKod"),
      dataIndex: "personelKod",
      key: "personelKod",
      width: 140,
      ellipsis: true,
    },
    {
      title: t("personelIsmi"),
      dataIndex: "isim",
      key: "isim",
      width: 200,
      ellipsis: true,
    },
    {
      title: t("unvan"),
      dataIndex: "unvan",
      key: "unvan",
      width: 160,
      ellipsis: true,
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 160,
      ellipsis: true,
    },
  ];

  const tableFooter = () => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>{`${t("toplam")}: ${formatNumberWithLocale(totalCount)} | ${t("secilen")}: ${formatNumberWithLocale(selectedRowKeys.length)}`}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Pagination simple={{ readOnly: true }} current={currentPage} total={totalCount} pageSize={pageSize} onChange={handlePageChange} showSizeChanger={false} size="small" />
        <PageSizeSelect value={pageSize} onChange={handlePageSizeChange} />
      </div>
    </div>
  );

  return (
    <Modal
      title={t("personelSecimi")}
      open={open}
      width={900}
      centered
      maskClosable={false}
      onCancel={onCancel}
      onOk={() => onSubmit(selectedRows)}
      okText={t("sec")}
      cancelText={t("vazgec")}
      okButtonProps={{ disabled: selectedRowKeys.length === 0 }}
      confirmLoading={confirmLoading}
    >
      <Input
        style={{ width: "300px", marginBottom: "10px" }}
        placeholder={t("personelAramaPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
        suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
      />
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        footer={tableFooter}
        scroll={{ y: "calc(100vh - 420px)" }}
      />
    </Modal>
  );
}

PersonelSecimTablo.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  confirmLoading: PropTypes.bool,
  disabledPersonelKods: PropTypes.arrayOf(PropTypes.string),
};

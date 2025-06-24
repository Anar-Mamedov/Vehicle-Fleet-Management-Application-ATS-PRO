import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Table } from "antd";
import { t } from "i18next";
import { GetPenaltyDefListService } from "../../../../../../../api/services/vehicles/operations_services";

const CezaMaddesiTable = ({ setMadde, open, key }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const columns = [
    {
      title: t("madde"),
      dataIndex: "madde",
      key: 1,
    },
    {
      title: t("kime"),
      dataIndex: "kime",
      key: 2,
    },
    {
      title: `${t("aciklama")} 1`,
      dataIndex: "aciklama1",
      key: 6,
    },
    {
      title: `${t("aciklama")} 2`,
      dataIndex: "aciklama2",
      key: 7,
    },
    {
      title: t("puan"),
      dataIndex: "puan",
      key: 3,
    },
    {
      title: t("tutar"),
      dataIndex: "tutar",
      key: 4,
    },
    {
      title: t("belgeNo"),
      dataIndex: "belgeNo",
      key: 5,
    },
  ];

  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        // Moving forward
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        // Moving backward
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const res = await GetPenaltyDefListService(diff, currentSetPointId, search);
      const total = res?.data.recordCount;
      setCurrentPage(targetPage);

      if (res?.data.list?.length > 0) {
        setData(res.data.list);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
            current: targetPage,
          },
        });
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedRowKeys([]);
      setMadde([]);
    }
  }, [open]);

  useEffect(() => {
    fetchData(0, 1);
  }, [search, key]);

  const handleTableChange = (pagination) => {
    const diff = pagination.current - currentPage;
    fetchData(diff, pagination.current);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setMadde(selectedRows);
    },
  };

  return (
    <>
      <Input placeholder={t("arama")} onChange={(e) => setSearch(e.target.value)} style={{ width: "30%" }} />
      <div className="mt-10">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={{
            ...tableParams.pagination,
            showTotal: (total) => (
              <p className="text-info">
                [{total} {t("kayit")}]
              </p>
            ),
            locale: {
              items_per_page: `/ ${t("sayfa")}`,
            },
          }}
          onChange={handleTableChange}
          loading={loading}
          rowKey="siraNo"
          scroll={{ x: 1500, y: 500 }}
          size="small"
          locale={{
            emptyText: "Veri Bulunamadı",
          }}
        />
      </div>
    </>
  );
};

CezaMaddesiTable.propTypes = {
  open: PropTypes.bool,
  setMadde: PropTypes.func,
  key: PropTypes.number,
};

export default CezaMaddesiTable;

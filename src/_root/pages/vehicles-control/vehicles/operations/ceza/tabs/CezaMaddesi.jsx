import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Table } from "antd";
import { t } from "i18next";
import { GetPenaltyDefListService } from "../../../../../../../api/services/vehicles/operations_services";

const CezaMaddesiTable = ({ setMadde, open, key }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [loading, setLoading] = useState(false);

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
    }
  ];

  useEffect(() => {
    if (!open) {
      setSelectedRowKeys([]);
      setMadde([]);
    }
  }, [open]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await GetPenaltyDefListService(
        search,
        tableParams.pagination.current
      );
      setLoading(false);
      setData(res?.data.list);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.recordCount,
        },
      });
    };
    fetchData();
  }, [search, tableParams.pagination.current, key]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
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
      <Input
        placeholder={t("arama")}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "30%" }}
      />
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

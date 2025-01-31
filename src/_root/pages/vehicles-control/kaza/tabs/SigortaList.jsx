import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Input, Table, message } from "antd";
import { GetActiveInsuranceListService } from "../../../../../api/services/vehicles/operations_services";
import { PlakaContext } from "../../../../../context/plakaSlice";
import { Controller, useFormContext } from "react-hook-form";

const SigortaList = ({ setSigorta, open, key }) => {
  const { plaka } = useContext(PlakaContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const aracId = watch("aracId");

  const columns = [
    {
      title: t("sigorta"),
      dataIndex: "sigorta",
      key: "sigorta",
    },
    {
      title: t("baslamaTarih"),
      dataIndex: "baslangicTarih",
      key: "baslangicTarih",
      render: (text) => {
        if (text === null || text === undefined) {
          return null;
        }
        return dayjs(text).format("DD.MM.YYYY");
      },
    },
    {
      title: t("policeNo"),
      dataIndex: "policeNo",
      key: "policeNo",
    },
    {
      title: t("firma"),
      dataIndex: "firma",
      key: "firma",
    },
  ];

  const fetchData = async (diff, targetPage) => {
    if (!aracId) {
      message.warning("Lütfen önce plaka seçiniz");
      setData([]);
      return;
    }

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

      const response = await GetActiveInsuranceListService(aracId, search, diff, currentSetPointId);
      const total = response?.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);

      if (response?.data.list?.length > 0) {
        setData(response.data.list);
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
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 0,
            current: 1,
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch insurance data:", error);
      message.error("Veri getirme sırasında bir hata oluştu.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (!aracId) {
        message.warning("Lütfen önce plaka seçiniz");
        setData([]);
        return;
      }
      fetchData(0, 1);
    } else {
      setSelectedRowKeys([]);
      setSigorta([]);
      setData([]);
    }
  }, [open, aracId, search, key]);

  const handleTableChange = (pagination) => {
    const diff = pagination.current - currentPage;
    fetchData(diff, pagination.current);
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSigorta(selectedRows);
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
            showTotal: (total, range) => `Toplam ${total}`,
            showSizeChanger: false,
            showQuickJumper: true,
            locale: {
              items_per_page: `/ ${t("sayfa")}`,
            },
          }}
          onChange={handleTableChange}
          loading={loading}
          rowKey="siraNo"
          locale={{
            emptyText: "Veri Bulunamadı",
          }}
        />
      </div>
    </>
  );
};

SigortaList.propTypes = {
  setSigorta: PropTypes.func,
  open: PropTypes.bool,
  key: PropTypes.number,
};

export default SigortaList;

import React, { useEffect, useState, useCallback } from "react";
import { Table, message, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../api/http.jsx";
import { t } from "i18next";
import dayjs from "dayjs";

function DurumTarihcesi({ selectedId, durumTarihceModal }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // API call - memoized with useCallback to prevent recreation on every render
  const fetchData = useCallback(
    async (diff, targetPage) => {
      setLoading(true);
      try {
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.siraNo || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.siraNo || 0;
        }

        const response = await AxiosInstance.get(
          `VehicleStatusHistory/GetVehicleStatusHistoryByVId?vId=${selectedId}&setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchTerm}`
        );

        const total = response.data.recordCount;
        setTotalCount(total);
        setCurrentPage(targetPage);

        const newData = response.data.list.map((item) => ({
          ...item,
          key: item.siraNo,
        }));

        if (newData.length > 0) {
          setData(newData);
        } else {
          message.warning(t("kayitBulunamadi"));
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(t("hataOlustu"));
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, data]
  ); // Added data to dependencies

  // Initial data fetch - only run once on mount
  useEffect(() => {
    fetchData(0, 1);
  }, [selectedId, durumTarihceModal]); // Use empty dependency array for initial load only

  const handleSearch = useCallback(() => {
    fetchData(0, 1);
  }, [fetchData]);

  const columns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
    },
    {
      title: t("durum"),
      dataIndex: "durumNo",
      key: "durumNo",
      render: (text, record) => {
        let durumIcon;

        if (record.durumNo === 3) {
          durumIcon = <Tag color="error">{t("arsiv")}</Tag>; // 1) record.arsiv true => gri arşiv
        } else if (record.durumNo === 1) {
          durumIcon = <Tag color="success">{t("aktif")}</Tag>; // 2) record.arsiv false, record.aktif true => yeşil aktif
        } else if (record.durumNo === 2) {
          durumIcon = <Tag color="warning">{t("pasif")}</Tag>; // 3) record.arsiv false, record.aktif false => sarı passif
        }
        return <div>{durumIcon}</div>;
      },
    },
    {
      title: t("neden"),
      dataIndex: "neden",
      key: "neden",
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      render: (text) => {
        if (text && dayjs(text).isValid()) {
          // Get user's language preference
          const currentLang = localStorage.getItem("i18nextLng") || "en";

          // Define date format based on language
          const dateFormat =
            {
              tr: "DD.MM.YYYY",
              en: "MM/DD/YYYY",
              ru: "DD.MM.YYYY",
              az: "DD.MM.YYYY",
            }[currentLang] || "MM/DD/YYYY";

          return dayjs(text).format(dateFormat);
        }
        return text;
      },
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
    },
  ];

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  return (
    <div>
      <Input
        style={{ width: "250px", marginBottom: "10px" }}
        type="text"
        placeholder="Arama yap..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onPressEnter={handleSearch}
        // prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
      />
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{
          current: currentPage,
          total: totalCount,
          pageSize: 10,
          showTotal: (total, range) => `Toplam ${total}`,
          showSizeChanger: false,
          showQuickJumper: false,
          onChange: handleTableChange,
        }}
      />
    </div>
  );
}

export default DurumTarihcesi;

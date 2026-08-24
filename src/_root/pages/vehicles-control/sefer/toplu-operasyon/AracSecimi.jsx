import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, Pagination, Select, Spin, Table, Tag, Typography, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";
import { GetVehiclesForSelectionService } from "../../../../../api/services/vehicles/vehicles/services";
import { BORDER_COLOR, cardStyle } from "../components/uiStyles";

const { Text } = Typography;

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const renderText = (value) => value || "-";

const AracSecimi = ({ selectedRowKeys, onSelectionChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [totalCount, setTotalCount] = useState(0);

  // İstekler her zaman güncel arama değeriyle çalışsın diye ref üzerinde tutulur
  const searchTermRef = useRef("");
  const dataRef = useRef([]);
  // Filtre/arama hızlı değiştiğinde geç dönen isteğin listeyi ezmemesi için istek sırası tutulur
  const requestIdRef = useRef(0);

  // Araç listesi imleçli sayfalama kullanır (Araçlar ekranıyla aynı): ileri gidilirken son kaydın,
  // geri gidilirken ilk kaydın `aracId` değeri imleç olur.
  const fetchData = useCallback(async (diff, targetPage, size) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLoading(true);

    try {
      const rows = dataRef.current;
      let setPointId = 0;

      if (diff > 0 && rows.length > 0) {
        setPointId = rows[rows.length - 1]?.aracId || 0;
      } else if (diff < 0 && rows.length > 0) {
        setPointId = rows[0]?.aracId || 0;
      }

      const response = await GetVehiclesForSelectionService(diff, setPointId, searchTermRef.current, size);

      if (requestId !== requestIdRef.current) return;

      const newData = (response.data.vehicleList || []).map((item) => ({ ...item, key: item.aracId }));

      dataRef.current = newData;
      setData(newData);
      setTotalCount(response.data.vehicleCount || 0);
      setCurrentPage(targetPage);
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      console.error("Error fetching vehicles:", error);
      message.error(t("islemBasarisiz"));
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  // `fetchData` sabit olduğu için liste yalnızca ilk açılışta okunur
  useEffect(() => {
    fetchData(0, 1, PAGE_SIZE_OPTIONS[0]);
  }, [fetchData]);

  const handleSearch = () => {
    searchTermRef.current = searchInput;
    fetchData(0, 1, pageSize);
  };

  const handlePageChange = (page) => {
    fetchData(page - currentPage, page, pageSize);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    fetchData(0, 1, size);
  };

  const columns = [
    {
      title: t("aracPlaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 140,
      ellipsis: true,
      render: (text) => <span style={{ fontWeight: 600 }}>{renderText(text)}</span>,
    },
    { title: t("aracTip"), dataIndex: "aracTip", key: "aracTip", width: 140, ellipsis: true, render: renderText },
    { title: t("marka"), dataIndex: "marka", key: "marka", width: 150, ellipsis: true, render: renderText },
    { title: t("model"), dataIndex: "model", key: "model", width: 150, ellipsis: true, render: renderText },
    { title: t("grup"), dataIndex: "grup", key: "grup", width: 140, ellipsis: true, render: renderText },
    { title: t("yakitTip"), dataIndex: "yakitTip", key: "yakitTip", width: 130, ellipsis: true, render: renderText },
  ];

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    // Sayfa değişince seçim kaybolmasın diye seçilen anahtarlar korunur
    preserveSelectedRowKeys: true,
    onChange: (keys, rows) => onSelectionChange(keys, rows),
  };

  return (
    <div style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 600, color: "#141414", lineHeight: "26px" }}>{t("adimAracSecimi")}</div>
          <Text type="secondary">{t("aracSecimiAciklama")}</Text>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Input
            style={{ width: "220px" }}
            placeholder={t("aramaYap")}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onPressEnter={handleSearch}
            suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
          />
          <Tag color="processing" style={{ borderRadius: "12px", margin: 0 }}>
            {`${t("secilen")}: ${formatNumberWithLocale(selectedRowKeys.length)}`}
          </Tag>
        </div>
      </div>

      <Spin spinning={loading}>
        {/* Sihirbaz penceresi ekranı doldurmadığı için tablo yüksekliği pencere yüksekliğinden hesaplanır */}
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} scroll={{ y: "calc(100vh - 470px)" }} />
      </Spin>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", borderTop: `1px solid ${BORDER_COLOR}`, paddingTop: "12px" }}>
        <Text type="secondary">{`${t("toplam")} ${formatNumberWithLocale(totalCount)} ${t("kayit")}`}</Text>
        <Pagination current={currentPage} total={totalCount} pageSize={pageSize} onChange={handlePageChange} showSizeChanger={false} size="small" />
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{ width: "120px" }}
          options={PAGE_SIZE_OPTIONS.map((size) => ({ value: size, label: `${size} / ${t("sayfa")}` }))}
        />
      </div>
    </div>
  );
};

AracSecimi.propTypes = {
  selectedRowKeys: PropTypes.array.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default AracSecimi;

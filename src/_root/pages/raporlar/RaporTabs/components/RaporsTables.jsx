import React, { useCallback, useEffect, useState } from "react";
import { Input, Spin, Typography, Card, Pagination, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../api/http.jsx";
import RaporModal from "./RaporModal/RaporModal.jsx";
import ContextMenu from "./ContextMenu/ContextMenu";

const { Text } = Typography;

function RaporsTables({ tabKey, tabName, onRefreshParent }) {
  const { setValue } = useFormContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  console.log(selectedCards);

  // Drawer state for detail view
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  // Memoize the drawer setter to avoid unnecessary re-renders
  const openDrawer = useCallback((record) => {
    setDrawer({ visible: true, data: record });
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawer({ visible: false, data: null });
  }, []);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const [pageSize, setPageSize] = useState(10); // Number of cards per page

  useEffect(() => {
    fetchEquipmentData();
  }, [tabKey]);

  const fetchEquipmentData = async () => {
    try {
      setLoading(true);
      const lan = localStorage.getItem("i18nextLng") || "tr";
      const response = await AxiosInstance.get(`Report/GetReportListByGroupId?id=${tabKey}&lan=${lan}`);
      if (response && response) {
        const formattedData = response.data.map((item) => ({
          ...item,
          key: item.tbRaporId,
        }));
        setData(formattedData);
        setLoading(false);
      } else {
        console.error("API response is not in expected format");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in API request:", error);
      setLoading(false);
    }
  };

  const normalizeString = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  useEffect(() => {
    const filtered = data.filter((item) => normalizeString(item.rprTanim).includes(normalizeString(searchTerm)));
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, data]);

  // Checkbox değişim fonksiyonu (66. satırdan sonra)
  const handleCheckboxChange = (e, record) => {
    const isChecked = e.target.checked;
    setSelectedCards((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, record];
      } else {
        return prevSelected.filter((item) => item.key !== record.key);
      }
    });
  };

  const refreshTableData = useCallback(() => {
    fetchEquipmentData();
  }, [tabKey]);

  // Rapor kaydedildikten sonra hem local tabloyu hem de parent'ı yenile
  const handleRefreshAfterSave = useCallback(() => {
    refreshTableData(); // Local tabloyu yenile
    if (onRefreshParent) {
      onRefreshParent(); // Parent bileşendeki fetchData'yı çağır
    }
  }, [refreshTableData, onRefreshParent]);

  // Determine which data to display based on search
  const displayData = searchTerm ? filteredData : data;

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = displayData.slice(startIndex, endIndex);

  // Handler for page change
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
    // Optionally, you can fetch new data here if you're implementing server-side pagination
  };

  return (
    <div>
      {/* Search input and header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
          padding: "0 5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Text style={{ fontSize: "16px", fontWeight: 500 }}>{tabName}</Text>
          <Input
            style={{ width: "250px" }}
            type="text"
            placeholder="Arama yap..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
            allowClear
          />
        </div>

        <ContextMenu selectedRows={selectedCards} refreshTableData={refreshTableData} setSelectedCards={setSelectedCards} />
      </div>

      <Spin spinning={loading}>
        {/* Card Grid Container */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            maxHeight: "calc(100vh - 250px)", // Adjust as needed
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          {currentPageData.length > 0 ? (
            currentPageData.map((record) => (
              <Card
                key={record.key}
                hoverable
                style={{ width: 340, height: 150 }}
                onClick={() => openDrawer(record)}
                styles={{ body: { padding: "16px", display: "flex", flexDirection: "column" } }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Text strong ellipsis>
                    {record.rprTanim}
                  </Text>
                  <Checkbox
                    checked={selectedCards.some((item) => item.key === record.key)}
                    onChange={(e) => handleCheckboxChange(e, record)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div style={{ height: "100px", overflowX: "auto" }}>
                  <Text type="secondary" style={{ fontSize: "13px" }}>
                    {record.rprAciklama}
                  </Text>
                </div>
              </Card>
            ))
          ) : (
            <Text type="secondary">No data found.</Text>
          )}
        </div>
      </Spin>

      {/* Pagination Component */}
      <div style={{ display: "flex", marginTop: "20px", textAlign: "right", justifyContent: "flex-end" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={displayData.length}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "50"]}
          showTotal={(total, range) => `Toplam ${total} kayıt`}
        />
      </div>

      {/* Detail Modal */}
      {drawer.visible && drawer.data && (
        <RaporModal selectedRow={drawer.data} onDrawerClose={closeDrawer} drawerVisible={drawer.visible} onRefresh={refreshTableData} onRefreshParent={handleRefreshAfterSave} />
      )}
    </div>
  );
}

export default RaporsTables;

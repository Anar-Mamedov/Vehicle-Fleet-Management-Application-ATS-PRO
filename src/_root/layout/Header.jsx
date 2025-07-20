import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Input, Avatar, Button, Layout, Spin, Popover, notification } from "antd";
import { HomeOutlined, AntDesignOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import LanguageSelector from "../components/lang/LanguageSelector";
import Bildirim from "../components/Notification/Bildirim";
import Hatirlatici from "../components/Hatirlatici/Hatirlatici";
import { t } from "i18next";
import AxiosInstance from "../../api/http";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LanguageSelectbox from "../components/lang/LanguageSelectbox";
import KullaniciProfil from "../pages/KullaniciProfil/KullaniciProfil";
import { CompanyLogo } from "./components/CompanyLogo";
import { useAppContext } from "../../AppContext.jsx";
import RaporModal1 from "../pages/raporlar/RaporTabs/components/RaporModal/RaporModal1";
const { Header } = Layout;

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important; /* Blue color */
  }
`;

const HeaderComp = ({ collapsed, colorBgContainer, setCollapsed }) => {
  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [reportResponse, setReportResponse] = useState([]);
  const [raporModalVisible, setRaporModalVisible] = useState(false);

  // Add a ref to track API call status
  const apiCallInProgressRef = useRef(false);
  // Context'ten rapor verileri için gerekli state ve fonksiyonları al
  const { reportData, updateReportData, setReportLoading } = useAppContext();

  // Sidebar durumunu localStorage'dan oku ve başlangıçta ayarla
  useEffect(() => {
    const savedCollapsedState = localStorage.getItem("sidebar_collapsed");
    if (savedCollapsedState !== null) {
      const isCollapsed = savedCollapsedState === "true";
      setCollapsed(isCollapsed);
    }
  }, [setCollapsed]);

  // Sidebar durumunu değiştiren fonksiyon
  const handleSidebarToggle = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    // localStorage'a kaydet
    localStorage.setItem("sidebar_collapsed", newCollapsedState.toString());
  };

  const getHatirlatici = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/Reminder");
      if (response.data) {
        setData(response.data);
        setLoading(false);
      } else {
        console.error("API response is not in expected format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getHatirlatici1 = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.post("/Graphs/GetGraphInfoByType?type=12");
      if (response.data) {
        setData1(response.data);
        setLoading(false);
      } else {
        console.error("API response is not in expected format");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHatirlatici();
    getHatirlatici1();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("token_expire");
  //   navigate("/login");
  // };

  // const popoverContent = (
  //   <Button type="primary" onClick={handleLogout}>
  //     {t("logout")}
  //   </Button>
  // );

  /**
   * RaporModal fonksiyonunu buraya taşıdık
   * Context'teki rapor verilerini güncelleyen fonksiyon
   */
  const fetchReportLists = async () => {
    const { selectedRow, kullaniciRaporu, filters } = reportData;

    // Eğer gerekli veriler yoksa, işleme devam etme
    if (!selectedRow || !filters || filters.length === 0) {
      return;
    }

    // API isteği parametrelerini kaydedelim, bu sayede modal kapansa bile
    // kullanabiliriz
    const requestParams = {
      reportRow: { ...selectedRow },
      isUserReport: kullaniciRaporu === true,
      reportFilters: { ...filters[0] },
    };

    setReportLoading(true);
    const lan = localStorage.getItem("i18nextLng") || "tr";

    try {
      // İşlem başlangıcında bildirim göster - sadece kullanıcı raporu ise
      if (kullaniciRaporu === true) {
        notification.info({
          message: "Rapor Hazırlanıyor",
          description: (
            <div>
              Rapor hazırlanıyor, lütfen bekleyin... <Spin size="small" />
            </div>
          ),
          duration: 0,
          placement: "bottomLeft",
          key: "reportNotification",
        });
      }

      const response = await AxiosInstance.post(`Report/GetReportDetail?kullaniciRaporu=${kullaniciRaporu}`, {
        raporId: selectedRow.key,
        lan: lan,
        // ...filters[0],
        lokasyonIds: filters[0].LokasyonID || null,
        aracIds: filters[0].plakaID || null,
        BaslamaTarih: filters[0].BaslamaTarih || null,
        BitisTarih: filters[0].BitisTarih || null,
      });

      const { headers, list } = response.data;
      if (headers && headers.length > 0) {
        // Map headers to columns
        const cols = headers.map((header) => {
          // Calculate width based on header length
          const headerLength = header.title.length;
          const width = Math.max(headerLength * 10, 150);

          return {
            title: header.title,
            dataIndex: header.dataIndex,
            key: header.dataIndex,
            visible: header.visible,
            width,
            isDate: header.isDate,
            isYear: header.isYear,
            isHour: header.isHour,
            isNumber: header.isNumber,
            // varsa default filter değerleri:
            isFilter: header.isFilter,
            isFilter1: header.isFilter1,
          };
        });

        // Default filters oluştur
        const defaultFilters = {};
        cols.forEach((col) => {
          const val1 = col.isFilter?.trim() || "";
          const val2 = col.isFilter1?.trim() || "";
          if (val1 !== "" || val2 !== "") {
            defaultFilters[col.dataIndex] = [val1, val2];
          }
        });

        // Default filtreleri uygula
        const applyDefaultFilters = (filtersObj, cols, data) => {
          let filteredData = [...data];

          Object.keys(filtersObj).forEach((colKey) => {
            const [val1, val2] = filtersObj[colKey] || ["", ""];
            const column = cols.find((c) => c.dataIndex === colKey);
            if (!column) return;

            if (val1 !== "" || val2 !== "") {
              filteredData = filteredData.filter((row) => {
                const cellValue = row[colKey] ? row[colKey].toString().toLowerCase() : "";
                if (val1 && !cellValue.includes(val1.toLowerCase())) return false;
                if (val2 && !cellValue.includes(val2.toLowerCase())) return false;
                return true;
              });
            }
          });

          return filteredData;
        };

        // Default filtreleri uygula
        const filteredList = Object.keys(defaultFilters).length > 0 ? applyDefaultFilters(defaultFilters, cols, list) : list;

        // Benzersiz ID'ler ve key'ler ekle
        const dataWithUniqueKeys = filteredList.map((item, index) => {
          // Unique ID oluştur - timestamp + index kombinasyonu
          const uniqueId = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
          return {
            ...item,
            ID: uniqueId, // Orijinal ID'yi unique ID ile değiştir
            originalID: item.ID, // Orijinal ID'yi sakla
            uniqueRowKey: uniqueId,
          };
        });

        const originalDataWithKeys = list.map((item, index) => {
          // Unique ID oluştur - timestamp + index kombinasyonu
          const uniqueId = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
          return {
            ...item,
            ID: uniqueId, // Orijinal ID'yi unique ID ile değiştir
            originalID: item.ID, // Orijinal ID'yi sakla
            uniqueRowKey: uniqueId,
          };
        });

        // Context'teki verileri güncelle
        updateReportData({
          initialColumns: cols,
          columns: cols,
          tableData: dataWithUniqueKeys, // Benzersiz key'li filtrelenmiş veri
          originalData: originalDataWithKeys, // Benzersiz key'li orijinal veri
          columnFilters: defaultFilters,
          filters: requestParams.reportFilters,
          reportName: requestParams.reportRow.rprTanim || requestParams.reportRow.key,
          totalRecords: dataWithUniqueKeys.length,
        });

        // requestParams nesnesindeki değerleri kullanarak, modal kapansa bile
        // sessionStorage yerine state'e kaydedelim
        if (requestParams.isUserReport) {
          try {
            const reportData = {
              headers: cols,
              list: dataWithUniqueKeys, // Zaten benzersiz key'li veri
              timestamp: new Date().toISOString(),
              filters: requestParams.reportFilters,
              totalRecords: dataWithUniqueKeys.length,
              reportName: requestParams.reportRow.rprTanim || requestParams.reportRow.key,
              columnFilters: defaultFilters,
              originalData: originalDataWithKeys, // Benzersiz key'li orijinal veri
            };

            // State'e kaydet
            setReportResponse((prevResponses) => [...prevResponses, reportData]);
            console.log("apiden gelen rapor verileri:", response);

            // İşlem tamamlandığında bildirim göster ve raporu açmak için link ver
            notification.success({
              message: "Rapor Hazır",
              description: (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  Rapor başarıyla hazırlandı.{" "}
                  <a
                    onClick={() => {
                      // Rapor verisini context'e zaten yüklediğimizden,
                      // sadece modal'ı açmamız yeterli
                      setRaporModalVisible(true);
                    }}
                  >
                    {reportData.reportName} - {reportData.totalRecords} kayıt
                  </a>
                </div>
              ),
              duration: 4, // saniye sonra kapanır
              key: "reportNotification", // Aynı bildirim için benzersiz bir anahtar
              placement: "bottomLeft",
            });

            console.log(`Rapor verileri state'e kaydedildi: ${reportData.reportName}`);
          } catch (error) {
            console.warn("Rapor verileri işlenirken bir hata oluştu:", error.message);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching report detail:", error);
      notification.error({
        message: "Hata",
        description: "Rapor verileri yüklenirken bir hata oluştu.",
        duration: 5,
      });
    } finally {
      setReportLoading(false);
    }
  };

  // Rapor verilerindeki filters veya selectedRow değiştiğinde fetch işlemini çalıştır
  useEffect(() => {
    // Criteria for running the API call
    const shouldFetchData = reportData.filters.length > 0 && reportData.selectedRow && !reportData.requestInProgress && !apiCallInProgressRef.current;

    if (shouldFetchData) {
      // Set both flags to prevent duplicate calls
      apiCallInProgressRef.current = true;
      updateReportData({ requestInProgress: true });

      fetchReportLists()
        .catch((error) => {
          console.error("Error fetching report data:", error);
        })
        .finally(() => {
          // Clear both flags when done
          apiCallInProgressRef.current = false;
          updateReportData({ requestInProgress: false });
        });
    }
  }, [reportData.filters, reportData.selectedRow]);

  return (
    <Header
      style={{
        background: colorBgContainer,
      }}
    >
      <div className="flex justify-between align-center gap-1 header">
        <div className="flex gap-1 justify-between align-baseline" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleSidebarToggle}
            style={{
              fontSize: "16px",
              width: 32,
              height: 32,
            }}
          />
          {/* <HomeOutlined /> */}
          {/* <LanguageSelector /> */}
          <LanguageSelectbox />
          <CompanyLogo />
        </div>
        <div style={{ gap: "10px" }} className="flex gap-1 justify-between align-center">
          <CustomSpin spinning={loading}>
            <Hatirlatici data={data} getHatirlatici={getHatirlatici} data1={data1} getHatirlatici1={getHatirlatici1} loading={loading} />
          </CustomSpin>
          <Bildirim reportResponse={reportResponse} setRaporModalVisible={setRaporModalVisible} updateReportData={updateReportData} />
          <Input className="search-input" placeholder={t("arama")} allowClear />
          {/* <Popover content={popoverContent} trigger="click">
            <Avatar className="header-avatar" icon={<AntDesignOutlined />} />
          </Popover> */}
          <KullaniciProfil />
        </div>
      </div>
      {/* Rapor Modal bileşeni */}
      {raporModalVisible && (
        <RaporModal1
          selectedRow={reportData.selectedRow}
          drawerVisible={raporModalVisible}
          onDrawerClose={() => setRaporModalVisible(false)}
          // Modal'a özel prop ekleyelim - yeni API isteği yapılmaması için
          dataAlreadyLoaded={true}
          // Header'da rapor kaydetme işlemi için refresh fonksiyonu - boş bırakıyoruz
          onRefreshParent={() => {}}
        />
      )}
    </Header>
  );
};

HeaderComp.propTypes = {
  collapsed: PropTypes.bool,
  colorBgContainer: PropTypes.string,
  setCollapsed: PropTypes.func,
};

export default HeaderComp;

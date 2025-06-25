import React, { createContext, useContext, useState } from "react";

// Context'i oluştur
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Yeni durum
  const [userData1, setUserData1] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Rapor için eklenmiş state'ler
  const [reportLoading, setReportLoading] = useState(false);
  const [reportData, setReportData] = useState({
    initialColumns: [],
    columns: [],
    tableData: [],
    originalData: [],
    columnFilters: {},
    selectedRow: null,
    kullaniciRaporu: {},
    filters: [],
    requestInProgress: false, // API isteği takibi için yeni flag
  });

  // Report verilerini güncellemek için fonksiyon
  const updateReportData = (newData) => {
    setReportData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // Paylaşılacak değerler
  const value = {
    isModalVisible,
    setIsModalVisible,
    isLoading,
    setIsLoading,
    selectedOption, // Eklenen yeni durum
    setSelectedOption, // Yeni durumu güncelleyecek fonksiyon
    userData1,
    setUserData1,
    isButtonClicked,
    setIsButtonClicked,

    // Rapor için eklenen state ve fonksiyonlar
    reportLoading,
    setReportLoading,
    reportData,
    updateReportData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

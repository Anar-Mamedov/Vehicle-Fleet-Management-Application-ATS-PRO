import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { CheckOutlined, CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import AxiosInstance from "../../../../../../api/http";
import CreateModal from "./Insert/CreateModal";
import EditModal from "./Update/EditModal";
import ContextMenu from "./components/ContextMenu/ContextMenu";

export default function TasimaRotaBilgileri({ isActive, selectedRow1 }) {
  const [loading, setLoading] = useState(false);
  const { control, watch, setValue } = useFormContext();
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    prevPage: 1, // Önceki sayfa numarası için
  });

  console.log(selectedRow1);

  // Define a global function to clear table selections
  useEffect(() => {
    // Make the clearTableSelections function available globally
    window.clearTableSelections = () => {
      setSelectedRowKeys([]);
      setSelectedRowsData([]);
    };

    // Clean up the global function when component unmounts
    return () => {
      delete window.clearTableSelections;
    };
  }, []);

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = (date) => {
    if (!date) return "";

    // Örnek bir tarih formatla ve ay formatını belirle
    const sampleDate = new Date(2021, 0, 21); // Ocak ayı için örnek bir tarih
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long"; // Tam ad ("January")
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short"; // Üç harfli kısaltma ("Jan")
    } else {
      monthFormat = "2-digit"; // Sayısal gösterim ("01")
    }

    // Kullanıcı için tarihi formatla
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  const columns = [
    {
      title: "Firma Ünvan",
      dataIndex: "firmaUnvan",
      key: "firmaUnvan",
      width: 150,
      ellipsis: true,
      render: (text, record) => (
        <span
          style={{ cursor: "pointer", color: "#1890ff" }}
          onClick={() => {
            setSelectedRow(record);
            setIsModalVisible(true);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Firma İlgili",
      dataIndex: "firmaIlgili",
      key: "firmaIlgili",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Firma Tel",
      dataIndex: "firmaTel",
      key: "firmaTel",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Çıkış Şehir",
      dataIndex: "cikisSehir",
      key: "cikisSehir",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Çıkış Yeri",
      dataIndex: "cikisSehirYer",
      key: "cikisSehirYer",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Varış Şehir",
      dataIndex: "varisSehir",
      key: "varisSehir",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Varış Yeri",
      dataIndex: "varisSehirYer",
      key: "varisSehirYer",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Çıkış Tarihi",
      dataIndex: "cikisTarih",
      key: "cikisTarih",
      width: 120,
      ellipsis: true,
      render: (text) => text && formatDate(text),
    },
    {
      title: "Çıkış Saati",
      dataIndex: "cikisSaat",
      key: "cikisSaat",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Varış Tarihi",
      dataIndex: "varisTarih",
      key: "varisTarih",
      width: 120,
      ellipsis: true,
      render: (text) => text && formatDate(text),
    },
    {
      title: "Varış Saati",
      dataIndex: "varisSaat",
      key: "varisSaat",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Taşıma Türü",
      dataIndex: "tasimaTuru",
      key: "tasimaTuru",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Taşıma Cinsi",
      dataIndex: "tasimaCinsi",
      key: "tasimaCinsi",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Mesafe",
      dataIndex: "mesafe",
      key: "mesafe",
      width: 80,
      ellipsis: true,
    },
    {
      title: "Ücret",
      dataIndex: "ucret",
      key: "ucret",
      width: 100,
      ellipsis: true,
      render: (text) => (text ? text.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ""),
    },
    {
      title: "Ödeme Durumu",
      dataIndex: "odemeYapildi",
      key: "odemeYapildi",
      width: 100,
      align: "center",
      render: (text, record) => (record.odemeYapildi ? <CheckOutlined style={{ color: "green" }} /> : <CloseOutlined style={{ color: "red" }} />),
    },
    {
      title: "Fatura No",
      dataIndex: "faturaNo",
      key: "faturaNo",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Fatura Tarihi",
      dataIndex: "faturaTarih",
      key: "faturaTarih",
      width: 120,
      ellipsis: true,
      render: (text) => text && formatDate(text),
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
      width: 150,
      ellipsis: true,
    },
  ];

  const plaka = watch("Plaka");
  const aracID = watch("PlakaID");
  const secilenKayitID = watch("secilenKayitID");

  // const fetch = useCallback(() => {
  //   if (isActive) {
  //     setLoading(true);
  //     AxiosInstance.get(`FetchIsEmriKontrolList?isemriID=${secilenKayitID}`)
  //       .then((response) => {
  //         const fetchedData = response.map((item) => ({
  //           ...item,
  //           key: item.TB_ISEMRI_KONTROLLIST_ID,
  //         }));
  //         setData(fetchedData);
  //       })
  //       .catch((error) => {
  //         // Hata işleme
  //         console.error("API isteği sırasında hata oluştu:", error);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [secilenKayitID, isActive]); // secilenKayitID değiştiğinde fetch fonksiyonunu güncelle

  const fetch = useCallback(() => {
    if (isActive) {
      setLoading(true);

      // diff değerini hesapla: sayfa değişim miktarı
      // Önceki değer yoksa veya ilk sayfa ise diff 0 olur
      const prevPage = pagination.prevPage || 1;
      const diff = pagination.current - prevPage;

      // setPointId hesapla: diff pozitifse son kaydın ID'si, negatifse ilk kaydın ID'si
      let setPointId = 0;
      if (data.length > 0) {
        if (diff > 0) {
          // İleri sayfaya gidildiğinde son kaydın ID'si
          setPointId = data[data.length - 1].id || 0;
        } else if (diff < 0) {
          // Geri sayfaya gidildiğinde ilk kaydın ID'si
          setPointId = data[0].id || 0;
        }
      }

      AxiosInstance.get(`ExpeditionOpr/GetExpeditionOperationsList?setPointId=${setPointId}&diff=${diff}&parameter=${searchTerm}&expId=${selectedRow1?.key || 0}`)
        .then((response) => {
          const { list, recordCount } = response.data;
          const fetchedData = list.map((item) => ({
            ...item,
            key: item.seferOprId,
          }));
          setData(fetchedData);
          setPagination((prev) => ({
            ...prev,
            total: recordCount,
            prevPage: prev.current, // Mevcut sayfayı sonraki fetch için saklayalım
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [pagination.current, searchTerm, isActive, data, selectedRow1?.key]); // pagination.current, searchTerm, selectedRow1.key değiştiğinde fetch fonksiyonunu güncelle

  useEffect(() => {
    if (selectedRow1 && isActive) {
      // secilenKayitID'nin varlığını ve geçerliliğini kontrol edin
      fetch(); // fetch fonksiyonunu çağırın
    }
  }, [selectedRow1, isActive]); // secilenKayitID, isActive veya fetch fonksiyonu değiştiğinde useEffect'i tetikle

  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };

  const onRowClick = (record) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const refreshTable = useCallback(() => {
    fetch(); // fetch fonksiyonu tabloyu yeniler
    setValue("refreshTable", true);
  }, [fetch]);

  const handleTableChange = (newPagination) => {
    // Sayfa değişikliğini takip etmek için mevcut sayfayı prevPage olarak saklayalım
    setPagination((prev) => ({
      ...newPagination,
      prevPage: prev.current,
    }));
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timeout = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        // Arama yapıldığında sayfa bilgilerini sıfırla
        setPagination((prev) => ({
          ...prev,
          current: 1,
          prevPage: 1,
        }));
        fetch(); // Trigger the API request based on your search logic
        setSearchCount(searchCount + 1);
      } else if (searchTerm.trim() === "" && searchCount > 0) {
        // Arama temizlendiğinde sayfa bilgilerini sıfırla
        setPagination((prev) => ({
          ...prev,
          current: 1,
          prevPage: 1,
        }));
        fetch(); // Fetch data without search term
      }
    }, 2000);

    setDebounceTimer(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm, fetch]);

  return (
    <div style={{ marginBottom: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          style={{ width: "250px", marginBottom: "10px" }}
          type="text"
          placeholder="Firma veya şehir ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <ContextMenu
            selectedRows={selectedRowsData}
            refreshTableData={refreshTable}
            clearSelections={() => {
              setSelectedRowKeys([]);
              setSelectedRowsData([]);
            }}
          />
          <CreateModal kdvOran={watch("kdvOran")} selectedRow1={selectedRow1} onRefresh={refreshTable} secilenKayitID={secilenKayitID} plaka={plaka} aracID={aracID} />
        </div>
      </div>

      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (selectedKeys, selectedRows) => {
            setSelectedRowKeys(selectedKeys);
            setSelectedRowsData(selectedRows);
          },
        }}
        size={"small"}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        loading={loading}
        scroll={{ y: "calc(100vh - 335px)" }}
      />
      {isModalVisible && (
        <EditModal
          selectedRow1={selectedRow1}
          selectedRow={selectedRow}
          isModalVisible={isModalVisible}
          onModalClose={() => {
            setIsModalVisible(false);
            setSelectedRow(null);
          }}
          onRefresh={refreshTable}
          secilenUstKayitID={secilenKayitID}
        />
      )}
    </div>
  );
}

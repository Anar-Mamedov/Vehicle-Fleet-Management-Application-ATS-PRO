import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input, message } from "antd";
import AxiosInstance from "../../api/http";
import { Resizable } from "react-resizable";
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useFormContext, Controller } from "react-hook-form";
import { t } from "i18next";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "20%",
    height: "100%",
    zIndex: 2,
    cursor: "col-resize",
    padding: "0px",
    backgroundSize: "0px",
  };

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={handleStyle}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export function FirmaTablo({ workshopSelectedId, onSubmit, type = 0 }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Form context'i güvenli bir şekilde kullan
  let watch, setValue, control;
  try {
    const formContext = useFormContext();
    watch = formContext.watch;
    setValue = formContext.setValue;
    control = formContext.control;
  } catch (error) {
    console.warn("FirmaTablo: Form context not found, using default values");
    watch = () => null;
    setValue = () => null;
    control = null;
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const islemiYapan = watch("islemiYapan") || "1"; // Default değer ekle
  const plakaID = watch("PlakaID");

  console.log("FirmaTablo Debug:", { islemiYapan, plakaID, isModalVisible });

  const [columns, setColumns] = useState(() => {
    const savedWidths = localStorage.getItem("islemYapanTableColumnWidths");
    const defaultColumns = [
      {
        title: t("firmaUnvani"),
        dataIndex: "unvan",
        key: "unvan",
        ellipsis: true,
        width: 250,
      },
      {
        title: t("kod"),
        dataIndex: "kod",
        key: "kod",
        ellipsis: true,
        width: 120,
      },
      {
        title: t("il"),
        dataIndex: "il",
        key: "il",
        ellipsis: true,
        width: 100,
      },
      {
        title: t("firmaTipi"),
        dataIndex: "firmaTipi",
        key: "firmaTipi",
        ellipsis: true,
        width: 100,
      },
      /*  {
        title: t("durum"),
        dataIndex: "aktif",
        key: "aktif",
        width: 80,
        render: (aktif) => (
          <span style={{ color: aktif ? "#52c41a" : "#ff4d4f" }}>
            {aktif ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            {aktif ? ` ${t("aktif")}` : ` ${t("pasif")}`}
          </span>
        ),
      }, */
    ];

    if (!savedWidths) {
      return defaultColumns;
    }

    try {
      const parsedWidths = JSON.parse(savedWidths);
      return defaultColumns.map((col, index) => ({
        ...col,
        width: parsedWidths[index] || col.width,
      }));
    } catch (error) {
      console.error("Error parsing saved column widths:", error);
      return defaultColumns;
    }
  });

  const handleResize =
    (index) =>
    (_, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
      localStorage.setItem("islemYapanTableColumnWidths", JSON.stringify(newColumns.map((col) => col.width)));
    };

  const mergedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

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

  const formatTime = (time) => {
    if (!time || time.trim() === "") return ""; // `trim` metodu ile baştaki ve sondaki boşlukları temizle

    try {
      // Saati ve dakikayı parçalara ayır, boşlukları temizle
      const [hours, minutes] = time
        .trim()
        .split(":")
        .map((part) => part.trim());

      // Saat ve dakika değerlerinin geçerliliğini kontrol et
      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
        // throw new Error("Invalid time format"); // hata fırlatır ve uygulamanın çalışmasını durdurur
        console.error("Invalid time format:", time);
        // return time; // Hatalı formatı olduğu gibi döndür
        return ""; // Hata durumunda boş bir string döndür
      }

      // Geçerli tarih ile birlikte bir Date nesnesi oluştur ve sadece saat ve dakika bilgilerini ayarla
      const date = new Date();
      date.setHours(hoursInt, minutesInt, 0);

      // Kullanıcının lokal ayarlarına uygun olarak saat ve dakikayı formatla
      // `hour12` seçeneğini belirtmeyerek Intl.DateTimeFormat'ın kullanıcının yerel ayarlarına göre otomatik seçim yapmasına izin ver
      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "2-digit",
        // hour12 seçeneği burada belirtilmiyor; böylece otomatik olarak kullanıcının sistem ayarlarına göre belirleniyor
      });

      // Formatlanmış saati döndür
      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return ""; // Hata durumunda boş bir string döndür
      // return time; // Hatalı formatı olduğu gibi döndür
    }
  };

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  const fetch = useCallback(
    async (diff = 0, targetPage = 1) => {
      console.log("Fetch called with:", { diff, targetPage, searchTerm, islemiYapan });
      setLoading(true);
      try {
        let currentSetPointId = 0;

        if (diff > 0) {
          // Moving forward
          currentSetPointId = data[data.length - 1]?.firmaId || 0;
        } else if (diff < 0) {
          // Moving backward
          currentSetPointId = data[0]?.firmaId || 0;
        } else {
          currentSetPointId = 0;
        }

        const url = `Company/GetCompaniesList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}&type=${type}`;
        console.log("API URL:", url);

        const response = await AxiosInstance.get(url);
        console.log("API Response:", response.data);

        const total = response.data.recordCount || 0;
        setTotalCount(total);
        setCurrentPage(targetPage);

        const newData = (response.data.list || []).map((item) => ({
          ...item,
          key: item.firmaId,
        }));

        console.log("Processed data:", newData);

        if (newData.length > 0) {
          setData(newData);
          setPagination((prev) => ({
            ...prev,
            current: targetPage,
            total: total,
          }));
        } else {
          message.warning("Veri bulunamadı.");
          setData([]);
          setPagination((prev) => ({
            ...prev,
            current: 1,
            total: 0,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Veri çekilirken hata oluştu: " + (error.message || "Bilinmeyen hata"));
        setData([]);
        setPagination((prev) => ({
          ...prev,
          current: 1,
          total: 0,
        }));
      } finally {
        setLoading(false);
      }
    },
    [data, searchTerm, islemiYapan]
  );

  const fetch1 = useCallback(() => {
    console.log("Fetch1 called with:", { plakaID, searchTerm });
    setLoading(true);

    AxiosInstance.get(`Code/GetCodeTextById?codeNumber=114`)
      .then((response) => {
        console.log("Code API Response:", response.data);

        const fetchedData = (response.data || []).map((item) => ({
          key: item.siraNo,
          ...item,
        }));

        console.log("Processed code data:", fetchedData);
        setData(fetchedData);

        if (fetchedData.length > 0) {
          setPagination((prev) => ({
            ...prev,
            total: fetchedData.length,
          }));
        } else {
          message.warning("Veri bulunamadı.");
          setPagination((prev) => ({
            ...prev,
            current: 1,
            total: 0,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching code data:", error);
        message.error("Kod verileri çekilirken hata oluştu: " + (error.message || "Bilinmeyen hata"));
        setData([]);
        setPagination((prev) => ({
          ...prev,
          current: 1,
          total: 0,
        }));
      })
      .finally(() => setLoading(false));
  }, [plakaID, searchTerm]);

  const resetModalState = () => {
    setSearchTerm(""); // Clear the search input value
    setSelectedRowKeys([]); // Reset the selected row keys
    setData([]); // Clear the data
    setPagination({ current: 1, pageSize: 10, total: 0 }); // Reset the pagination to the first page with total 0
    setTotalCount(0); // Reset the total count
  };

  const handleModalToggle = () => {
    setIsModalVisible((prev) => {
      const newVisibility = !prev;
      if (!newVisibility) {
        resetModalState();
      }
      return newVisibility;
    });

    if (!isModalVisible) {
      console.log("Modal opening, islemiYapan:", islemiYapan);
      if (parseInt(islemiYapan) === 1) {
        fetch(0, 1);
      } else if (parseInt(islemiYapan) === 2) {
        fetch1();
      } else {
        console.warn("Unknown islemiYapan value:", islemiYapan);
        message.warning("Geçersiz işlem yapan değeri: " + islemiYapan);
      }
    }
  };

  const handleModalOk = () => {
    const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
    if (selectedData) {
      setValue("firmaKodu", selectedData.kod || "");
      setValue("firmaID", selectedData.key);
      setValue("firmaTanim", selectedData.unvan || "");
      setValue("telefon", selectedData.tel_1 || "");
      setValue("ilgili", selectedData.ilgili_1 || "");

      onSubmit && onSubmit(selectedData);
    }
    resetModalState(); // Reset the state after the modal is confirmed
    setIsModalVisible(false);
  };

  useEffect(() => {
    setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
  }, [workshopSelectedId]);

  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };

  const handleTableChange = (newPagination) => {
    const diff = newPagination.current - pagination.current;
    if (parseInt(islemiYapan) === 1) {
      fetch(diff, newPagination.current);
      setPagination(newPagination);
    } else {
      setPagination(newPagination);
    }
  };

  const handleSearch = () => {
    console.log("Search triggered:", { islemiYapan, searchTerm });
    if (parseInt(islemiYapan) === 1) {
      fetch(0, 1);
    } else if (parseInt(islemiYapan) === 2) {
      fetch1();
    }
  };

  const handleClearForms = () => {
    setValue("firmaKodu", "");
    setValue("firmaID", "");
    setValue("firmaTanim", "");
    setValue("telefon", "");
    setValue("ilgili", "");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      {control && <Controller name="firmaKodu" control={control} render={({ field }) => <Input {...field} placeholder={t("firmaKodu")} style={{ width: "160px" }} readOnly />} />}
      <Button onClick={handleModalToggle}>+</Button>
      <Button onClick={handleClearForms}>-</Button>
      <Modal width={1400} centered title={t("firma")} open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <Input
            style={{ width: "250px" }}
            type="text"
            placeholder="Arama yap..."
            value={searchTerm}
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
          />
          <Button type="primary" onClick={handleSearch}>
            <SearchOutlined />
          </Button>
        </div>

        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: onRowSelectChange,
          }}
          bordered
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          scroll={{ y: "calc(100vh - 380px)" }}
          columns={mergedColumns}
          dataSource={data}
          loading={loading}
          pagination={{
            ...pagination,
            showTotal: (total, range) => `${total} ${t("Kayit")}`,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
        />
      </Modal>
    </div>
  );
}

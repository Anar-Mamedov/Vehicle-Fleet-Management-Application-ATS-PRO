import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Table, Input } from "antd";
import AxiosInstance from "../../../../../../../../api/http";
import { Resizable } from "react-resizable";
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";

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

export default function HasarNoTablo({ workshopSelectedId, onSubmit }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const { watch } = useFormContext();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [columns, setColumns] = useState(() => {
    const savedWidths = localStorage.getItem("servisTableColumnWidths");
    const defaultColumns = [
      {
        title: "Tarih",
        dataIndex: "kazaTarih",
        key: "kazaTarih",
        ellipsis: true,
        width: 150,
        sorter: (a, b) => {
          if (a.kazaTarih === null) return -1;
          if (b.kazaTarih === null) return 1;
          return a.kazaTarih.localeCompare(b.kazaTarih);
        },
        render: (text) => formatDate(text),
      },
      {
        title: "Sürücü Adı",
        dataIndex: "surucuIsim",
        key: "surucuIsim",
        ellipsis: true,
        width: 350,
      },
      {
        title: "Kaza Türü",
        dataIndex: "kazaTuru",
        key: "kazaTuru",
        width: 250,
        ellipsis: true,
      },
      {
        title: "Kaza Şekli",
        dataIndex: "kazaSekli",
        key: "kazaSekli",
        ellipsis: true,
        width: 200,
      },
      {
        title: "Karşı Plaka",
        dataIndex: "karsiPlaka",
        key: "karsiPlaka",
        ellipsis: true,
        width: 100,
      },
      {
        title: "Fatura Tarihi",
        dataIndex: "faturaTarih",
        key: "faturaTarih",
        ellipsis: true,
        width: 150,
        render: (text) => formatDate(text),
      },
      {
        title: "Fatura Tutarı",
        dataIndex: "faturaTutar",
        key: "faturaTutar",
        ellipsis: true,
        width: 100,
      },
      {
        title: "Açıklama",
        dataIndex: "aciklama",
        key: "aciklama",
        ellipsis: true,
        width: 100,
      },
    ];

    if (!savedWidths) {
      return defaultColumns;
    }

    const parsedWidths = JSON.parse(savedWidths);
    return defaultColumns.map((col, index) => ({
      ...col,
      width: parsedWidths[index] || col.width,
    }));
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
      localStorage.setItem("servisTableColumnWidths", JSON.stringify(newColumns.map((col) => col.width)));
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

  const plakaID = watch("PlakaID");

  const fetch = useCallback(() => {
    setLoading(true);
    const body = [plakaID];

    AxiosInstance.post(`Accident/GetAccidentsListByVehicleId?page=${pagination.current}&parameter=${searchTerm}`, body)
      .then((response) => {
        const { list, recordCount } = response.data;
        const fetchedData = list.map((item) => ({
          ...item,
          key: item.siraNo,
        }));
        setData(fetchedData);
        setPagination((prev) => ({
          ...prev,
          total: recordCount,
        }));
      })
      .finally(() => setLoading(false));
  }, [pagination.current, searchTerm, plakaID]);

  const resetModalState = () => {
    setSearchTerm(""); // Clear the search input value
    setSelectedRowKeys([]); // Reset the selected row keys
    setPagination({ current: 1, pageSize: 10 }); // Reset the pagination to the first page
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
      fetch();
    }
  };

  const handleModalOk = () => {
    const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
    if (selectedData) {
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
    setPagination(newPagination);
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timeout = setTimeout(() => {
      if (searchTerm !== "") {
        fetch(); // Trigger the API request based on your search logic
        setPagination((prev) => ({ ...prev, current: 1 })); // Reset to page 1 when search term changes
      }
    }, 2000);

    setDebounceTimer(timeout);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div>
      <Button onClick={handleModalToggle} disabled={!plakaID}>
        +
      </Button>
      <Modal width={1200} centered title="Kaza Kayıtları" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle}>
        <Input
          style={{ width: "250px", marginBottom: "10px" }}
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        />
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
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Modal>
    </div>
  );
}

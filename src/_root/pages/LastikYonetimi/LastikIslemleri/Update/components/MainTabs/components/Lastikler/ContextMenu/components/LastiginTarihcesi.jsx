import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, CheckOutlined, CloseOutlined, HistoryOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import AxiosInstance from "../../../../../../../../../../../api/http.jsx";
import styled from "styled-components";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
import "../../../../../../../Table/ResizeStyle.css";

const localeMap = {
  tr: trTR,
  en: enUS,
  ru: ruRU,
  az: azAZ,
};

// Define date format mapping based on language
const dateFormatMap = {
  tr: "DD.MM.YYYY",
  en: "MM/DD/YYYY",
  ru: "DD.MM.YYYY",
  az: "DD.MM.YYYY",
};

// Define time format mapping based on language
const timeFormatMap = {
  tr: "HH:mm",
  en: "hh:mm A",
  ru: "HH:mm",
  az: "HH:mm",
};

const { Text } = Typography;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

const StyledTable = styled(Table)``;

// Resizable column component
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

// Draggable row component for column reordering
const DraggableRow = ({ id, text, index, moveRow, className, style, visible, onVisibilityChange, ...restProps }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const styleWithTransform = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#f0f0f0" : "",
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  return (
    <div ref={setNodeRef} style={styleWithTransform} {...restProps} {...attributes}>
      <div
        {...listeners}
        style={{
          cursor: "grab",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <HolderOutlined style={{ marginRight: 8 }} />
        {text}
      </div>
    </div>
  );
};

function LastiginTarihcesi({ vehicleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [localeDateFormat, setLocaleDateFormat] = useState("MM/DD/YYYY");
  const [localeTimeFormat, setLocaleTimeFormat] = useState("HH:mm");

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  // Format date based on locale
  const formatDate = (date) => {
    if (!date) return "";

    const sampleDate = new Date(2021, 0, 21);
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long";
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short";
    } else {
      monthFormat = "2-digit";
    }

    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  // Format time based on locale
  const formatTime = (time) => {
    if (!time || time.trim() === "") return "";

    try {
      const [hours, minutes] = time
        .trim()
        .split(":")
        .map((part) => part.trim());

      const hoursInt = parseInt(hours, 10);
      const minutesInt = parseInt(minutes, 10);
      if (isNaN(hoursInt) || isNaN(minutesInt) || hoursInt < 0 || hoursInt > 23 || minutesInt < 0 || minutesInt > 59) {
        console.error("Invalid time format:", time);
        return "";
      }

      const date = new Date();
      date.setHours(hoursInt, minutesInt, 0);

      const formatter = new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "2-digit",
      });

      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  // Initial columns definition based on the provided API response
  const initialColumns = [
    {
      title: t("seriNo"),
      dataIndex: "seriNo",
      key: "seriNo",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (!a.seriNo) return -1;
        if (!b.seriNo) return 1;
        return a.seriNo.localeCompare(b.seriNo);
      },
    },

    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (!a.plaka) return -1;
        if (!b.plaka) return 1;
        return a.plaka.localeCompare(b.plaka);
      },
    },
    {
      title: t("islem"),
      dataIndex: "islemTipId",
      key: "islemTipId",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (islemTipId) => {
        switch (islemTipId) {
          case 0:
            return "-";
          case 1:
            return t("lastikTakildi");
          case 2:
            return t("konumDegistirildi");
          case 3:
            return t("basincDisDerinligiGuncellendi");
          default:
            return islemTipId;
        }
      },
      sorter: (a, b) => {
        if (!a.islemTipId) return -1;
        if (!b.islemTipId) return 1;
        return a.islemTipId - b.islemTipId;
      },
    },

    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: "tarih",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (text) => formatDate(text),
      sorter: (a, b) => {
        if (!a.tarih) return -1;
        if (!b.tarih) return 1;
        return new Date(a.tarih) - new Date(b.tarih);
      },
    },
    {
      title: t("saat"),
      dataIndex: "saat",
      key: "saat",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text) => formatTime(text),
      sorter: (a, b) => {
        if (!a.saat) return -1;
        if (!b.saat) return 1;
        return a.saat.localeCompare(b.saat);
      },
    },

    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (!a.aciklama) return -1;
        if (!b.aciklama) return 1;
        return a.aciklama.localeCompare(b.aciklama);
      },
    },
  ];

  // Fetch data from API
  const fetchData = async (diff, targetPage) => {
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

      const response = await AxiosInstance.get(
        `TyreMovements/GetTyreMovementsByRefId?tyreId=${vehicleId || ""}&setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchTerm}`
      );

      // Update based on the new API response structure
      const total = response.data.recordCount || 0;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData =
        response.data.list?.map((item) => ({
          ...item,
          key: item.siraNo, // Using siraNo as the key
        })) || [];

      if (newData.length > 0) {
        setData(newData);
      } else {
        message.warning(t("kayitBulunamadi"));
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching tire movement data:", error);
      message.error(t("hataOlustu"));
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    fetchData(0, 1);
  };

  // Handle table pagination
  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  // Row selection
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderLastiginTarihcesi");
    const savedVisibility = localStorage.getItem("columnVisibilityLastiginTarihcesi");
    const savedWidths = localStorage.getItem("columnWidthsLastiginTarihcesi");

    let order = savedOrder ? JSON.parse(savedOrder) : [];
    let visibility = savedVisibility ? JSON.parse(savedVisibility) : {};
    let widths = savedWidths ? JSON.parse(savedWidths) : {};

    initialColumns.forEach((col) => {
      if (!order.includes(col.key)) {
        order.push(col.key);
      }
      if (visibility[col.key] === undefined) {
        visibility[col.key] = col.visible;
      }
      if (widths[col.key] === undefined) {
        widths[col.key] = col.width;
      }
    });

    localStorage.setItem("columnOrderLastiginTarihcesi", JSON.stringify(order));
    localStorage.setItem("columnVisibilityLastiginTarihcesi", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsLastiginTarihcesi", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderLastiginTarihcesi", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityLastiginTarihcesi",
      JSON.stringify(
        columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.key]: col.visible,
          }),
          {}
        )
      )
    );
    localStorage.setItem(
      "columnWidthsLastiginTarihcesi",
      JSON.stringify(
        columns.reduce(
          (acc, col) => ({
            ...acc,
            [col.key]: col.width,
          }),
          {}
        )
      )
    );
  }, [columns]);

  // Handle column resize
  const handleResize =
    (key) =>
    (_, { size }) => {
      setColumns((prev) => prev.map((col) => (col.key === key ? { ...col, width: size.width } : col)));
    };

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const mergedColumns = columns.map((col) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(column.key),
    }),
  }));

  // Filtered columns
  const filteredColumns = mergedColumns.filter((col) => col.visible);

  // Handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.key === active.id);
      const newIndex = columns.findIndex((column) => column.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((columns) => arrayMove(columns, oldIndex, newIndex));
      } else {
        console.error(`Column with key ${active.id} or ${over.id} does not exist.`);
      }
    }
  };

  // Toggle column visibility
  const toggleVisibility = (key, checked) => {
    const index = columns.findIndex((col) => col.key === key);
    if (index !== -1) {
      const newColumns = [...columns];
      newColumns[index].visible = checked;
      setColumns(newColumns);
    } else {
      console.error(`Column with key ${key} does not exist.`);
    }
  };

  // Reset columns
  const resetColumns = () => {
    localStorage.removeItem("columnOrderLastiginTarihcesi");
    localStorage.removeItem("columnVisibilityLastiginTarihcesi");
    localStorage.removeItem("columnWidthsLastiginTarihcesi");
    window.location.reload();
  };

  // Get current locale
  const currentLang = localStorage.getItem("i18nextLng") || "en";
  const currentLocale = localeMap[currentLang] || enUS;

  useEffect(() => {
    // Set date and time format based on language
    setLocaleDateFormat(dateFormatMap[currentLang] || "MM/DD/YYYY");
    setLocaleTimeFormat(timeFormatMap[currentLang] || "HH:mm");
  }, [currentLang]);

  // Handler for opening the modal and fetching data
  const handleOpenModal = () => {
    setIsTableModalVisible(true);
    setSearchTerm(""); // Reset search term when opening modal
    setCurrentPage(1); // Reset to first page
    if (vehicleId) {
      fetchData(0, 1);
    }
  };

  // Handler for closing the modal and resetting search
  const handleCloseModal = () => {
    setIsTableModalVisible(false);
    setSearchTerm("");
  };

  return (
    <>
      <ConfigProvider locale={currentLocale}>
        {/* Modal for managing columns */}
        <Modal title={t("sutunlariYonet")} centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
          <Text style={{ marginBottom: "15px" }}>{t("sutunAyarlamaAciklama")}</Text>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
              {t("sutunlariSifirla")}
            </Button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                width: "46%",
                border: "1px solid #8080806e",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #80808051",
                  padding: "8px 8px 12px 8px",
                }}
              >
                <Text style={{ fontWeight: 600 }}>{t("sutunlariGosterGizle")}</Text>
              </div>
              <div style={{ height: "400px", overflow: "auto" }}>
                {initialColumns.map((col) => (
                  <div style={{ display: "flex", gap: "10px" }} key={col.key}>
                    <Checkbox checked={columns.find((column) => column.key === col.key)?.visible || false} onChange={(e) => toggleVisibility(col.key, e.target.checked)} />
                    {col.title}
                  </div>
                ))}
              </div>
            </div>

            <DndContext
              onDragEnd={handleDragEnd}
              sensors={useSensors(
                useSensor(PointerSensor),
                useSensor(KeyboardSensor, {
                  coordinateGetter: sortableKeyboardCoordinates,
                })
              )}
            >
              <div
                style={{
                  width: "46%",
                  border: "1px solid #8080806e",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #80808051",
                    padding: "8px 8px 12px 8px",
                  }}
                >
                  <Text style={{ fontWeight: 600 }}>{t("sutunlarinSiralamasiniAyarla")}</Text>
                </div>
                <div style={{ height: "400px", overflow: "auto" }}>
                  <SortableContext items={columns.filter((col) => col.visible).map((col) => col.key)} strategy={verticalListSortingStrategy}>
                    {columns
                      .filter((col) => col.visible)
                      .map((col, index) => (
                        <DraggableRow key={col.key} id={col.key} index={index} text={col.title} />
                      ))}
                  </SortableContext>
                </div>
              </div>
            </DndContext>
          </div>
        </Modal>

        {/* New Modal for displaying the table */}
        <Modal title={t("lastikTarihcesi")} centered width={1000} open={isTableModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal} footer={null}>
          {/* Toolbar */}
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: "15px",
              gap: "10px",
              padding: "15px",
              borderRadius: "8px",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                maxWidth: "935px",
                flexWrap: "wrap",
              }}
            >
              <StyledButton onClick={() => setIsModalVisible(true)}>
                <MenuOutlined />
              </StyledButton>
              <Input
                style={{ width: "250px" }}
                type="text"
                placeholder={t("aramaYap")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
              />
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "8px",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <Spin spinning={loading}>
              <StyledTable
                components={components}
                rowSelection={rowSelection}
                columns={filteredColumns}
                dataSource={data}
                pagination={{
                  current: currentPage,
                  total: totalCount,
                  pageSize: pageSize,
                  showTotal: (total, range) => `${t("toplam")} ${total}`,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: handleTableChange,
                }}
                scroll={{ y: 400 }}
              />
            </Spin>
          </div>
        </Modal>

        {/* Main Button to open the table modal */}
        <div
          onClick={handleOpenModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <HistoryOutlined />
          {t("lastikTarihcesi")}
        </div>
      </ConfigProvider>
    </>
  );
}

export default LastiginTarihcesi;

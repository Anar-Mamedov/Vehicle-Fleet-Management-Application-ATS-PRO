import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react";
import { useFormContext } from "react-hook-form";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider, Switch } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http";

import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";

const localeMap = {
  tr: trTR,
  en: enUS,
  ru: ruRU,
  az: azAZ,
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

// Sütunların boyutlarını ayarlamak için kullanılan component

const ResizableTitle = memo((props) => {
  const { onResize, width, ...restProps } = props;

  // tabloyu genişletmek için kullanılan alanın stil özellikleri
  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "20%",
    height: "100%", // this is the area that is draggable, you can adjust it
    zIndex: 2, // ensure it's above other elements
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
});
ResizableTitle.displayName = "ResizableTitle";
// Sütunların boyutlarını ayarlamak için kullanılan component sonu

// Sütunların sürüklenebilir olmasını sağlayan component

const DraggableRow = memo(({ id, text, index, style, ...restProps }) => {
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
});
DraggableRow.displayName = "DraggableRow";

// Sütunların sürüklenebilir olmasını sağlayan component sonu

const OnaylamaIslemleri = () => {
  const formMethods = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Total data count
  const [pageSize, setPageSize] = useState(10); // Page size
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  const [body, setBody] = useState({
    keyword: "",
    filters: {},
  });

  const prevBodyRef = useRef(body);

  // API call - memoized with useCallback to prevent recreation on every render
  const fetchData = useCallback(
    async (diff, targetPage) => {
      setLoading(true);
      try {
        const response = await AxiosInstance.get(`ApprovalSettings/GetApprovalSettingsList`);

        const newData = response.data.map((item) => ({
          ...item,
          key: item.siraNo,
        }));

        const total = newData.length;
        setTotalCount(total);
        setCurrentPage(targetPage);

        if (newData.length > 0) {
          setData(newData);
          setFilteredData(newData);
        } else {
          message.warning(t("kayitBulunamadi"));
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error(t("hataOlustu"));
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, body.filters, data]
  ); // Added data to dependencies

  // Initial data fetch - only run once on mount
  useEffect(() => {
    fetchData(0, 1);
  }, []); // Use empty dependency array for initial load only

  // Watch for body state changes
  useEffect(() => {
    if (JSON.stringify(body) !== JSON.stringify(prevBodyRef.current)) {
      fetchData(0, 1);
      prevBodyRef.current = { ...body };
    }
  }, [body, fetchData]);

  // Search term değiştiğinde otomatik arama
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
      setTotalCount(data.length);
      return;
    }

    const filtered = data.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (item.tanim && item.tanim.toLowerCase().includes(searchLower)) || (item.siraNo && item.siraNo.toString().includes(searchLower));
    });

    setFilteredData(filtered);
    setTotalCount(filtered.length);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleTableChange = (page) => {
    setCurrentPage(page);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Find selected rows data
    const newSelectedRows = data.filter((row) => newSelectedRowKeys.includes(row.key));
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    setDrawer({ visible: true, data: record });
  };

  const refreshTableData = useCallback(() => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    fetchData(0, 1);
  }, [fetchData]);

  // Switch değişikliği için fonksiyon
  const handleSwitchChange = useCallback(
    async (checked, record) => {
      try {
        const body = {
          siraNo: record.siraNo,
          tanim: record.tanim,
          onayAktif: checked,
        };

        await AxiosInstance.post("ApprovalSettings/UpdateApprovalSettingsStatus", body);

        message.success(t("guncellemeBasarili"));

        // Tabloyu yenile
        refreshTableData();
      } catch (error) {
        console.error("Error updating approval status:", error);
        message.error(t("hataOlustu"));
      }
    },
    [refreshTableData]
  );

  // Columns definition (adjust as needed)
  const initialColumns = useMemo(
    () => [
      {
        title: t("tanim"),
        dataIndex: "tanim",
        key: "tanim",
        width: 200,
        ellipsis: true,
        visible: true,
        render: (text) => {
          // Dil dosyasından çeviriyi al, yoksa orijinal metni göster
          const translation = t(text);
          return translation !== text ? translation : text;
        },
        sorter: (a, b) => {
          if (a.tanim === null) return -1;
          if (b.tanim === null) return 1;
          return a.tanim.localeCompare(b.tanim);
        },
      },
      {
        title: t("onayDurumu"),
        dataIndex: "onayAktif",
        key: "onayAktif",
        width: 120,
        ellipsis: true,
        visible: true,
        render: (text, record) => (
          <div style={{ textAlign: "center" }}>
            <Switch checked={text} onChange={(checked) => handleSwitchChange(checked, record)} size="small" />
          </div>
        ),
        sorter: (a, b) => {
          if (a.onayAktif === null) return -1;
          if (b.onayAktif === null) return 1;
          return a.onayAktif - b.onayAktif;
        },
      },
    ],
    []
  );

  // Manage columns from localStorage or default
  const [columns, setColumns] = useState(() => {
    const savedOrder = localStorage.getItem("columnOrderOnaylamaIslemleri");
    const savedVisibility = localStorage.getItem("columnVisibilityOnaylamaIslemleri");
    const savedWidths = localStorage.getItem("columnWidthsOnaylamaIslemleri");

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

    localStorage.setItem("columnOrderOnaylamaIslemleri", JSON.stringify(order));
    localStorage.setItem("columnVisibilityOnaylamaIslemleri", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsOnaylamaIslemleri", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  // Save columns to localStorage
  useEffect(() => {
    localStorage.setItem("columnOrderOnaylamaIslemleri", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityOnaylamaIslemleri",
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
      "columnWidthsOnaylamaIslemleri",
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
    localStorage.removeItem("columnOrderOnaylamaIslemleri");
    localStorage.removeItem("columnVisibilityOnaylamaIslemleri");
    localStorage.removeItem("columnWidthsOnaylamaIslemleri");
    window.location.reload();
  };

  // Kullanıcının dilini localStorage'den alın
  const currentLang = localStorage.getItem("i18nextLng") || "en";
  const currentLocale = localeMap[currentLang] || enUS;

  // filtreleme işlemi için kullanılan useEffect
  const handleBodyChange = useCallback((type, newBody) => {
    setBody((prevBody) => {
      if (type === "filters") {
        // If newBody is a function, call it with previous filters
        const updatedFilters =
          typeof newBody === "function"
            ? newBody(prevBody.filters)
            : {
                ...prevBody.filters,
                ...newBody,
              };

        return {
          ...prevBody,
          filters: updatedFilters,
        };
      }
      return {
        ...prevBody,
        [type]: newBody,
      };
    });
    setCurrentPage(1);
  }, []);
  // filtreleme işlemi için kullanılan useEffect son

  return (
    <div>
      <ConfigProvider locale={currentLocale}>
        <FormProvider {...formMethods}>
          {/* Modal for managing columns */}
          <Modal title="Sütunları Yönet" centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
            <Text style={{ marginBottom: "15px" }}>Aşağıdaki Ekranlardan Sütunları Göster / Gizle ve Sıralamalarını Ayarlayabilirsiniz.</Text>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
                Sütunları Sıfırla
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
                  <Text style={{ fontWeight: 600 }}>Sütunları Göster / Gizle</Text>
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
                    <Text style={{ fontWeight: 600 }}>Sütunların Sıralamasını Ayarla</Text>
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
              borderRadius: "8px 8px 8px 8px",
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
                placeholder="Arama yap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suffix={<SearchOutlined style={{ color: "#0091ff" }} />}
              />

              {/*  <Filters onChange={handleBodyChange} /> */}
              {/* <StyledButton onClick={handleSearch} icon={<SearchOutlined />} /> */}
              {/* Other toolbar components */}
            </div>
            {/* <div style={{ display: "flex", gap: "10px" }}>
              <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
              <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
            </div> */}
          </div>
          {/* Table */}
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              height: "calc(100vh - 200px)",
              borderRadius: "8px 8px 8px 8px",
              filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
            }}
          >
            <Spin spinning={loading}>
              <StyledTable
                components={components}
                rowSelection={rowSelection}
                columns={filteredColumns}
                dataSource={filteredData}
                pagination={{
                  current: currentPage,
                  total: totalCount,
                  pageSize: 10,
                  showTotal: (total, range) => `Toplam ${total}`,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  onChange: handleTableChange,
                }}
                scroll={{ y: "calc(100vh - 335px)" }}
              />
            </Spin>
          </div>
        </FormProvider>
      </ConfigProvider>
    </div>
  );
};

export default memo(OnaylamaIslemleri);

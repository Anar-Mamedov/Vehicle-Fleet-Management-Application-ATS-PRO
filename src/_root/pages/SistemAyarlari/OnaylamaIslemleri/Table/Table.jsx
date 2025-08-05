import React, { useCallback, useEffect, useState, useRef, useMemo, memo } from "react";
import { useFormContext } from "react-hook-form";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Tooltip, Progress, ConfigProvider, Switch, Select } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined, HomeOutlined, ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../../api/http";
import DetailUpdate from "../../../vehicles-control/vehicle-detail/DetailUpdate";

import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { t } from "i18next";
import trTR from "antd/lib/locale/tr_TR";
import enUS from "antd/lib/locale/en_US";
import ruRU from "antd/lib/locale/ru_RU";
import azAZ from "antd/lib/locale/az_AZ";
import FormattedDate from "../../../../components/FormattedDate";

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

  // DetailUpdate modal state'leri
  const [isDetailUpdateModalOpen, setIsDetailUpdateModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);

  // Durum filtresi state'i
  const [statusFilter, setStatusFilter] = useState("bekliyor");

  const [body, setBody] = useState({
    keyword: "",
    filters: {
      ApprovalStatus: "bekliyor",
    },
  });

  const prevBodyRef = useRef(body);

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
        } else {
          currentSetPointId = 0;
        }

        const response = await AxiosInstance.post(`Approval/GetApprovalRecords?setPointId=${currentSetPointId}&diff=${diff}&parameter=${searchTerm}`, body.filters);

        const newData = response.data.list.map((item) => ({
          ...item,
          key: item.siraNo,
        }));

        const total = response.data.recordCount;
        setTotalCount(total);
        setCurrentPage(response.data.page);

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
    [searchTerm, body.filters]
  ); // Removed data from dependencies to prevent infinite loop

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

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  // Manuel arama fonksiyonu
  const handleSearch = () => {
    fetchData(0, 1);
  };

  // Durum filtresi değiştiğinde çağrılan fonksiyon
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setBody((prev) => ({
      ...prev,
      filters: {
        ApprovalStatus: value,
      },
    }));
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

  // Onaylama fonksiyonu
  const handleApprove = useCallback(
    async (record) => {
      try {
        await AxiosInstance.get(`Approval/GrantApproval?id=${record.siraNo}`);
        message.success(t("onaylamaBasarili"));
        refreshTableData();
      } catch (error) {
        console.error("Error approving record:", error);
        message.error(t("hataOlustu"));
      }
    },
    [refreshTableData]
  );

  // Reddetme fonksiyonu
  const handleReject = useCallback(
    async (record) => {
      try {
        await AxiosInstance.get(`Approval/RejectApproval?id=${record.siraNo}`);
        message.success(t("reddetmeBasarili"));
        refreshTableData();
      } catch (error) {
        console.error("Error rejecting record:", error);
        message.error(t("hataOlustu"));
      }
    },
    [refreshTableData]
  );

  // Columns definition (adjust as needed)
  const initialColumns = useMemo(
    () => [
      {
        title: t("modul"),
        dataIndex: "modul",
        key: "modul",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text) => {
          const translation = t(text);
          return translation !== text ? translation : text;
        },
        sorter: (a, b) => {
          if (a.modul === null) return -1;
          if (b.modul === null) return 1;
          return a.modul.localeCompare(b.modul);
        },
      },
      {
        title: t("islemTipi"),
        dataIndex: "islemTipi",
        key: "islemTipi",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text, record) => {
          const translation = t(text);
          const displayText = translation !== text ? translation : text;

          // Eğer islemTipi "lokasyonTransferi" ise tıklanabilir yap
          if (text === "lokasyonTransferi") {
            return (
              <span
                style={{
                  color: "#1890ff",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (record.kayitId) {
                    setSelectedVehicleId(record.kayitId);
                    setIsDetailUpdateModalOpen(true);
                  }
                }}
              >
                {displayText}
              </span>
            );
          }

          return displayText;
        },
        sorter: (a, b) => {
          if (a.islemTipi === null) return -1;
          if (b.islemTipi === null) return 1;
          return a.islemTipi.localeCompare(b.islemTipi);
        },
      },
      {
        title: t("talepEdilenOnay"),
        dataIndex: "talepEdilenNesne",
        key: "talepEdilenNesne",
        width: 200,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.talepEdilenNesne === null) return -1;
          if (b.talepEdilenNesne === null) return 1;
          return a.talepEdilenNesne.localeCompare(b.talepEdilenNesne);
        },
      },
      {
        title: t("talepEden"),
        dataIndex: "talepEden",
        key: "talepEden",
        width: 150,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.talepEden === null) return -1;
          if (b.talepEden === null) return 1;
          return a.talepEden.localeCompare(b.talepEden);
        },
      },
      {
        title: t("durum"),
        dataIndex: "durum",
        key: "durum",
        width: 120,
        ellipsis: true,
        visible: true,
        render: (text) => {
          const getStatusColor = (status) => {
            switch (status) {
              case "bekliyor":
                return "orange";
              case "onaylandi":
                return "green";
              case "onaylanmadi":
                return "red";
              default:
                return "default";
            }
          };
          return <Tag color={getStatusColor(text)}>{t(text)}</Tag>;
        },
        sorter: (a, b) => {
          if (a.durum === null) return -1;
          if (b.durum === null) return 1;
          return a.durum.localeCompare(b.durum);
        },
      },
      {
        title: t("talepTarihi"),
        dataIndex: "talepTarih",
        key: "talepTarih",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text) => {
          return <FormattedDate date={text} />;
        },
        sorter: (a, b) => {
          if (a.talepTarih === null) return -1;
          if (b.talepTarih === null) return 1;
          return new Date(a.talepTarih) - new Date(b.talepTarih);
        },
      },
      {
        title: t("onaylayan"),
        dataIndex: "onaylayan",
        key: "onaylayan",
        width: 150,
        ellipsis: true,
        visible: true,
        sorter: (a, b) => {
          if (a.onaylayan === null) return -1;
          if (b.onaylayan === null) return 1;
          return a.onaylayan.localeCompare(b.onaylayan);
        },
      },
      {
        title: t("onaylamaTarihi"),
        dataIndex: "onaylamaTarih",
        key: "onaylamaTarih",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (text) => {
          return <FormattedDate date={text} />;
        },
        sorter: (a, b) => {
          if (a.onaylamaTarih === null) return -1;
          if (b.onaylamaTarih === null) return 1;
          return new Date(a.onaylamaTarih) - new Date(b.onaylamaTarih);
        },
      },
      {
        title: t("islemler"),
        key: "islemler",
        width: 150,
        ellipsis: true,
        visible: true,
        render: (_, record) => {
          // Sadece "bekliyor" durumundaki kayıtlar için butonları göster
          if (record.durum === "bekliyor") {
            return (
              <div style={{ display: "flex", gap: "8px" }}>
                <Button type="primary" size="small" onClick={() => handleApprove(record)}>
                  {t("onayla")}
                </Button>
                <Button danger size="small" onClick={() => handleReject(record)}>
                  {t("reddet")}
                </Button>
              </div>
            );
          }
          return "-";
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

              <Input.Search
                style={{ width: "250px" }}
                placeholder="Arama yap..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                enterButton
              />

              <Select
                style={{ width: "150px" }}
                placeholder={t("durum")}
                value={statusFilter}
                onChange={handleStatusFilterChange}
                options={[
                  { value: "bekliyor", label: t("bekliyor") },
                  { value: "onaylandi", label: t("onaylandi") },
                  { value: "onaylanmadi", label: t("onaylanmadi") },
                ]}
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
                dataSource={data}
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

      {/* DetailUpdate Modal */}
      <DetailUpdate
        isOpen={isDetailUpdateModalOpen}
        onClose={() => {
          setIsDetailUpdateModalOpen(false);
          setSelectedVehicleId(null);
        }}
        selectedId={selectedVehicleId}
        onSuccess={() => {
          refreshTableData();
        }}
        selectedRows1={selectedRows}
      />
    </div>
  );
};

export default memo(OnaylamaIslemleri);

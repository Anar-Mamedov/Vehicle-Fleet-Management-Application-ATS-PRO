import React, { useCallback, useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, Tag, message, Select, Pagination } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "../kiralikAraclar/ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import FormattedDate from "../../../../_root/components/FormattedDate";
import { t } from "i18next";
import Filters from "./filter/Filters";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const { Text } = Typography;
const { Option } = Select;

const tabloPageSize = "tabloPageSizeIkameArac";
const infiniteScrollKey = "tabloInfiniteScroll";
const legacyInfiniteScrollKey = "tabloInfiniteScrollIkameArac";
const columnOrderKey = "columnOrderIkameArac";
const columnVisibilityKey = "columnVisibilityIkameArac";
const columnWidthsKey = "columnWidthsIkameArac";

const safeLocalStorage = {
  getItem: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  },
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

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

const IkameAracYonetimi = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [infiniteScrollEnabled] = useState(() => {
    const savedScrollMode = localStorage.getItem(infiniteScrollKey);
    if (savedScrollMode !== null) {
      return JSON.parse(savedScrollMode);
    }

    const legacyScrollMode = localStorage.getItem(legacyInfiniteScrollKey);
    return legacyScrollMode !== null ? JSON.parse(legacyScrollMode) : false;
  });

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const lastFetchIdRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const [pageSize, setPageSize] = useState(() => {
    const savedPageSize = localStorage.getItem(tabloPageSize);
    const initialSize = parseInt(savedPageSize, 10);
    return !isNaN(initialSize) && initialSize > 0 ? initialSize : 20;
  });

  const methods = useForm({
    defaultValues: {
      durum: null,
    },
  });

  const [body, setBody] = useState({
    keyword: "",
    filters: {
      customfilters: {
        durum: 0,
      },
    },
  });

  const fetchData = async (diff, targetPage, customfilterOverride, currentSize = pageSize) => {
    const currentFetchId = lastFetchIdRef.current + 1;
    lastFetchIdRef.current = currentFetchId;

    if (isLoadingPage && diff > 0) {
      return;
    }

    diff === 0 ? setLoading(true) : setIsLoadingMore(true);
    setIsLoadingPage(true);

    try {
      let currentSetPointId = 0;

      if (diff > 0 && data.length > 0) {
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0 && data.length > 0) {
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const customFilters =
        customfilterOverride || (body.filters && body.filters.customfilters && Object.keys(body.filters.customfilters).length > 0 ? body.filters.customfilters : { durum: 0 });

      const response = await AxiosInstance.post(
        `ReplacementVehicle/GetReplacementVehicleList?setPointId=${currentSetPointId}&diff=${diff}&pageSize=${currentSize}&parameter=${searchTerm}`,
        customFilters
      );

      if (currentFetchId !== lastFetchIdRef.current) {
        return;
      }

      const total = response.data.recordCount;
      setTotalCount(total);

      if (targetPage !== undefined) {
        setCurrentPage(targetPage);
      }

      const items = response.data.list || [];
      const newItems = items.map((item) => ({
        ...item,
        key: item.siraNo,
        // API'den gelen farklı alan adlarını tablo kolonlarıyla eşleştir.
        durum: typeof item.durum === "boolean" ? (item.durum ? 1 : 2) : item.durum,
      }));

      if (infiniteScrollEnabled) {
        if (diff > 0 && newItems.length > 0) {
          const existingIds = new Set(data.map((item) => item.siraNo));
          const uniqueNewItems = newItems.filter((item) => !existingIds.has(item.siraNo));
          if (uniqueNewItems.length > 0) {
            setData((prevData) => [...prevData, ...uniqueNewItems]);
          }
        } else if (diff === 0 || targetPage === 1) {
          setData(newItems);
        }
      } else {
        if (newItems.length > 0) {
          setData(newItems);
        } else {
          // message.warning(t("veriYok"));
          if (targetPage === 1) {
            setData([]);
          }
        }
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
      message.error(t("veriCekmeHatasi"));
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    const savedPageSize = localStorage.getItem(tabloPageSize);
    const parsedValue = parseInt(savedPageSize, 10);
    if (isNaN(parsedValue) || ![20, 50, 100].includes(parsedValue)) {
      localStorage.setItem(tabloPageSize, "20");
      setPageSize(20);
    }
  }, []);

  const handleSearch = (customfilterOverride) => {
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }
    setCurrentPage(1);
    fetchData(0, 1, customfilterOverride).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  };

  const handleTableChange = (page, size) => {
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }
    if (size !== pageSize) {
      localStorage.setItem(tabloPageSize, size.toString());
      setPageSize(size);
      fetchData(0, 1, undefined, size).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    } else {
      const diff = page - currentPage;
      setCurrentPage(page);
      fetchData(diff, page, undefined, pageSize).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const newSelectedRows = data.filter((row) => newSelectedRowKeys.includes(row.key));
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    setUpdateId(Number(record.siraNo));
    setUpdateModalOpen(true);
  };

  const handleBodyChange = (type, newBody) => {
    let nextFilters;

    setBody((prevBody) => {
      if (type === "filters") {
        const updatedFilters =
          typeof newBody === "function"
            ? newBody(prevBody.filters)
            : {
                ...prevBody.filters,
                ...newBody,
              };

        nextFilters = updatedFilters;

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

    if (type === "filters") {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(true);
      }

      fetchData(0, 1, nextFilters?.customfilters).finally(() => {
        if (!infiniteScrollEnabled) {
          setPaginationLoading(false);
        }
      });
    }
  };

  const refreshTableData = useCallback(() => {
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }
    setSelectedRowKeys([]);
    setSelectedRows([]);
    fetchData(0, 1).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  }, [infiniteScrollEnabled, body, pageSize]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const resetColumns = () => {
    safeLocalStorage.removeItem(columnOrderKey);
    safeLocalStorage.removeItem(columnVisibilityKey);
    safeLocalStorage.removeItem(columnWidthsKey);
    window.location.reload();
  };

  const initialColumns = [
    {
      title: t("asilArac"),
      dataIndex: "asilPlaka",
      key: "asilAracPlaka",
      width: 150,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <a onClick={() => onRowClick(record)}>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.asilMarka}</div>
        </a>
      ),
      sorter: (a, b) => {
        if (a.asilPlaka === null) return -1;
        if (b.asilPlaka === null) return 1;
        return a.asilPlaka.localeCompare(b.asilPlaka);
      },
    },
    {
      title: t("ikameArac"),
      dataIndex: "ikamePlaka",
      key: "ikameAracPlaka",
      width: 150,
      ellipsis: true,
      visible: true,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{record.ikameMarka}</div>
        </div>
      ),
      sorter: (a, b) => {
        if (a.ikamePlaka === null) return -1;
        if (b.ikamePlaka === null) return 1;
        return a.ikamePlaka.localeCompare(b.ikamePlaka);
      },
    },
    {
      title: t("durum"),
      dataIndex: "durumText",
      key: "durum",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (text) => {
        if (text === "aktif") return <Tag color="green">{t("aktif")}</Tag>;
        if (text === "suresiDoldu") return <Tag color="red">{t("suresiDoldu")}</Tag>;
        if (text === "iadeEdildi") return <Tag color="gold">{t("iadeEdildi")}</Tag>;
        return <Tag>{text ? t(text) : t("belirsiz")}</Tag>;
      },
      sorter: (a, b) => {
        const textA = a.durumText || "";
        const textB = b.durumText || "";
        return textA.localeCompare(textB);
      },
    },
    {
      title: t("baslangic"),
      dataIndex: "baslangicTarih",
      key: "baslangicTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (value) => <FormattedDate date={value} />,
      sorter: (a, b) => {
        const dateA = a.baslangicTarih ? new Date(a.baslangicTarih) : null;
        const dateB = b.baslangicTarih ? new Date(b.baslangicTarih) : null;
        if (!dateA) return -1;
        if (!dateB) return 1;
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      title: t("bpitisTarihi"),
      dataIndex: "bitisTarih",
      key: "bitisTarih",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (value) => <FormattedDate date={value} />,
      sorter: (a, b) => {
        const dateA = a.bitisTarih ? new Date(a.bitisTarih) : null;
        const dateB = b.bitisTarih ? new Date(b.bitisTarih) : null;
        if (!dateA) return -1;
        if (!dateB) return 1;
        return dateA.getTime() - dateB.getTime();
      },
    },

    {
      title: t("kalanGun"),
      dataIndex: "sure",
      key: "kalanGun",
      width: 100,
      ellipsis: true,
      visible: true,
      render: (value) => {
        const num = Number(value);
        let color = "#000";
        if (num > 0) color = "green";
        else if (num < 0) color = "red";
        else if (num === 0) color = "orange";
        return <span style={{ color, fontWeight: 600 }}>{value}</span>;
      },
      sorter: (a, b) => {
        if (a.sure === null) return -1;
        if (b.sure === null) return 1;
        return Number(a.sure) - Number(b.sure);
      },
    },
    {
      title: t("kmLimiti"),
      dataIndex: "kmLimit",
      key: "kmLimiti",
      width: 120,
      ellipsis: true,
      visible: true,
      render: (value) => {
        if (value === null || value === undefined) return "-";
        const parts = String(value).split(".");
        const decimalDigits = parts.length > 1 ? parts[1].length : 0;
        return (
          Number(value).toLocaleString(localStorage.getItem("i18nextLng"), {
            minimumFractionDigits: decimalDigits,
            maximumFractionDigits: decimalDigits,
          }) + " km"
        );
      },
      sorter: (a, b) => {
        if (a.kmLimit === null) return -1;
        if (b.kmLimit === null) return 1;
        return Number(a.kmLimit) - Number(b.kmLimit);
      },
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 130,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.lokasyon === null) return -1;
        if (b.lokasyon === null) return 1;
        return a.lokasyon.localeCompare(b.lokasyon);
      },
    },
    {
      title: t("yakitPolitikasi"),
      dataIndex: "yakitPolitikasi",
      key: "yakitPolitikasi",
      width: 140,
      ellipsis: true,
      visible: true,
      render: (value) => (value ? t(value) : "-"),
      sorter: (a, b) => {
        if (a.yakitPolitikasi === null) return -1;
        if (b.yakitPolitikasi === null) return 1;
        return a.yakitPolitikasi.localeCompare(b.yakitPolitikasi);
      },
    },

    {
      title: t("verilisNedeni"),
      dataIndex: "neden",
      key: "neden",
      width: 120,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.neden === null) return -1;
        if (b.neden === null) return 1;
        return a.neden.localeCompare(b.neden);
      },
    },
    {
      title: t("tedarikci"),
      dataIndex: "tedarikci",
      key: "tedarikci",
      width: 130,
      ellipsis: true,
      visible: true,
      sorter: (a, b) => {
        if (a.tedarikci === null) return -1;
        if (b.tedarikci === null) return 1;
        return a.tedarikci.localeCompare(b.tedarikci);
      },
    },
  ];

  const [columns, setColumns] = useState(() => {
    const savedOrder = safeLocalStorage.getItem(columnOrderKey, []);
    const savedVisibility = safeLocalStorage.getItem(columnVisibilityKey, {});
    const savedWidths = safeLocalStorage.getItem(columnWidthsKey, {});

    let order = savedOrder;
    let visibility = savedVisibility;
    let widths = savedWidths;

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

    safeLocalStorage.setItem(columnOrderKey, order);
    safeLocalStorage.setItem(columnVisibilityKey, visibility);
    safeLocalStorage.setItem(columnWidthsKey, widths);

    return order
      .map((key) => {
        const column = initialColumns.find((col) => col.key === key);
        return column ? { ...column, visible: visibility[key], width: widths[key] } : null;
      })
      .filter(Boolean);
  });

  const toggleVisibility = (key, checked) => {
    const index = columns.findIndex((col) => col.key === key);
    if (index !== -1) {
      const newColumns = [...columns];
      newColumns[index].visible = checked;
      setColumns(newColumns);
      const visibility = {};
      newColumns.forEach((col) => {
        visibility[col.key] = col.visible;
      });
      safeLocalStorage.setItem(columnVisibilityKey, visibility);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.key === active.id);
      const newIndex = columns.findIndex((column) => column.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((columns) => {
          const newColumns = arrayMove(columns, oldIndex, newIndex);
          const order = newColumns.map((col) => col.key);
          safeLocalStorage.setItem(columnOrderKey, order);
          const visibility = {};
          const widths = {};
          newColumns.forEach((col) => {
            visibility[col.key] = col.visible;
            widths[col.key] = col.width;
          });
          safeLocalStorage.setItem(columnVisibilityKey, visibility);
          safeLocalStorage.setItem(columnWidthsKey, widths);
          return newColumns;
        });
      }
    }
  };

  const handleResize =
    (key) =>
    (_, { size }) => {
      setColumns((prev) => {
        const newColumns = prev.map((col) => (col.key === key ? { ...col, width: size.width } : col));
        const widths = {};
        newColumns.forEach((col) => {
          widths[col.key] = col.width;
        });
        safeLocalStorage.setItem(columnWidthsKey, widths);
        return newColumns;
      });
    };

  const handleTableScroll = (e) => {
    if (!infiniteScrollEnabled) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (scrollBottom <= clientHeight * 0.2 && !loading && !isLoadingMore && !isLoadingPage && data.length < totalCount) {
      scrollTimeoutRef.current = setTimeout(() => {
        fetchData(1, undefined, undefined, pageSize);
      }, 200);
    }
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

  const filteredColumns = mergedColumns.filter((col) => col.visible);

  const handlePageSizeChange = (value) => {
    const validValue = [20, 50, 100].includes(value) ? value : 20;
    if (!infiniteScrollEnabled) {
      setPaginationLoading(true);
    }
    localStorage.setItem(tabloPageSize, validValue.toString());
    setPageSize(validValue);
    fetchData(0, 1, undefined, validValue).finally(() => {
      if (!infiniteScrollEnabled) {
        setPaginationLoading(false);
      }
    });
  };

  const tableFooter = () => {
    if (isLoadingMore) {
      return <div style={{ textAlign: "center" }}>{t("dahaFazlaYukleniyor")}</div>;
    }

    const displayCount = infiniteScrollEnabled ? Math.min(data.length, totalCount) : data.length;

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", alignItems: "center" }}>
          <div>
            {t("toplamKayit")}: {totalCount} | {t("goruntulenen")}: {displayCount}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {!infiniteScrollEnabled && (
              <Pagination
                simple={{ readOnly: true }}
                current={currentPage}
                total={totalCount}
                pageSize={pageSize}
                onChange={handleTableChange}
                showSizeChanger={false}
                size="small"
              />
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "8px" }}>{t("kayit")}:</span>
              <Select value={[20, 50, 100].includes(pageSize) ? pageSize : 20} onChange={handlePageSizeChange} style={{ width: 70 }} popupMatchSelectWidth={false}>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal title={t("sutunlariYonet")} centered width={800} open={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
        <Text style={{ marginBottom: "15px" }}>{t("sutunAyarlamaAciklama")}</Text>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "10px" }}>
          <Button onClick={resetColumns} style={{ marginBottom: "15px" }}>
            {t("sutunlariSifirla")}
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "46%", border: "1px solid #8080806e", borderRadius: "8px", padding: "10px" }}>
            <div style={{ marginBottom: "20px", borderBottom: "1px solid #80808051", padding: "8px 8px 12px 8px" }}>
              <Text style={{ fontWeight: 600 }}>{t("sutunGosterGizle")}</Text>
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
            <div style={{ width: "46%", border: "1px solid #8080806e", borderRadius: "8px", padding: "10px" }}>
              <div style={{ marginBottom: "20px", borderBottom: "1px solid #80808051", padding: "8px 8px 12px 8px" }}>
                <Text style={{ fontWeight: 600 }}>{t("sutunSiralamaAyarla")}</Text>
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
      <FormProvider {...methods}>
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
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <StyledButton onClick={() => setIsModalVisible(true)}>
              <MenuOutlined />
            </StyledButton>
            <Input
              style={{ width: "130px" }}
              type="text"
              placeholder={t("aramaYap")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={() => handleSearch()}
              suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={() => handleSearch()} />}
            />
            <Filters onChange={handleBodyChange} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
            <AddModal onRefresh={refreshTableData} />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            height: "calc(100vh - 200px)",
            borderRadius: "8px 8px 8px 8px",
          }}
        >
          <Spin spinning={loading || (!infiniteScrollEnabled && paginationLoading)}>
            <Table
              components={components}
              rowSelection={rowSelection}
              columns={filteredColumns}
              dataSource={data}
              pagination={false}
              scroll={{ y: "calc(100vh - 335px)" }}
              onScroll={handleTableScroll}
              footer={tableFooter}
            />
          </Spin>
        </div>
      </FormProvider>
      <UpdateModal id={updateId} isOpen={updateModalOpen} setIsOpen={setUpdateModalOpen} onRefresh={refreshTableData} />
    </>
  );
};

export default IkameAracYonetimi;

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Table, Button, Checkbox, Typography, Input, Space, DatePicker, InputNumber, TimePicker, Form, message } from "antd";
import { MenuOutlined, SearchOutlined, SaveOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../api/http.jsx";
import { DndContext, PointerSensor, useSensor, useSensors, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import * as XLSX from "xlsx";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DraggableRow from "./DraggableRow.jsx";
import Filters from "./components/Filters.jsx";
import { useForm } from "antd/lib/form/Form";
import RaporGrupSelectbox from "./RaporGrupSelectbox.jsx";
import { t } from "i18next";
import { useAppContext } from "../../../../../../AppContext.jsx";

dayjs.extend(customParseFormat);
const { Text } = Typography;

// =============================================
// Yardımcı Fonksiyonlar
// =============================================
const arrayMove = (array, from, to) => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
};

const pxToWch = (px) => Math.ceil(px / 7); // 1 wch ≈ 7px

function RecordModal({ selectedRow, onDrawerClose, drawerVisible }) {
  // Context'ten rapor verilerini al
  const { reportData, updateReportData, reportLoading, setReportLoading } = useAppContext();

  // ------------------ STATE ------------------
  const [manageColumnsVisible, setManageColumnsVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [filtersLabel, setFiltersLabel] = useState({});
  const [filterDropdownOpen, setFilterDropdownOpen] = useState({});

  // Context'ten gelen state değerlerini kullan
  const { initialColumns, columns, tableData, originalData, columnFilters, filters, kullaniciRaporu } = reportData;

  // Add a ref to track if we've already initialized
  const hasInitialized = useRef(false);

  const searchInput = useRef(null);
  const [form] = useForm();
  const lan = localStorage.getItem("i18nextLng") || "tr";

  // ------------------ EFFECTS ------------------
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      // fetchLists işlemi artık Headers.jsx üzerinden Context aracılığıyla tetikleniyor
      // Bu nedenle burada bir işlem yapmaya gerek yok
    }
  }, [filters]);

  useEffect(() => {
    if (!drawerVisible) {
      // Reset when modal is closed - don't reset if already done
      if (columns.length > 0 || tableData.length > 0) {
        updateReportData({
          tableData: [],
          originalData: [],
          kullaniciRaporu: {},
          initialColumns: [],
          columns: [],
          columnFilters: {},
          filters: [],
        });
        setFilterDropdownOpen({});
      }
      // Reset the initialization flag when modal is closed
      hasInitialized.current = false;
      return;
    }

    // If modal is visible but no selectedRow, exit early
    if (!selectedRow) return;

    // Skip if already initialized for this row
    if (hasInitialized.current && reportData.selectedRow?.key === selectedRow.key) {
      return;
    }

    // Mark as initialized
    hasInitialized.current = true;
    setReportLoading(true);

    // Fetch filters
    fetchFilters().finally(() => {
      setReportLoading(false);
    });
  }, [drawerVisible, selectedRow?.key]); // Only depend on drawerVisible and selectedRow.key, not reportData

  // Sorgula Düğmesine tıklandığında Modalı'ı kapat

  /*   useEffect(() => {
    if (kullaniciRaporu === true) {
      onDrawerClose();
    }
  }, [kullaniciRaporu, onDrawerClose]); */

  // ------------------ DATA FETCH ------------------
  const handleFilterSubmit = (values) => {
    console.log("RaporModal.jsx - handleFilterSubmit called with values:", values);

    // Gelen değerleri filtersLabel state'ine de kaydet
    setFiltersLabel(values);

    updateReportData({
      filters: [values],
      kullaniciRaporu: true,
    });
  };

  const fetchFilters = async () => {
    try {
      const response = await AxiosInstance.get(`ReportFilter/GetReportFilterByReportId?reportId=${selectedRow.key}`);
      const responseData = response.data;
      const filteredResponse = {
        LokasyonID: responseData[0].lokasyonIds,
        plakaID: responseData[0].aracIds,
        BaslamaTarih: responseData[0].baslamaTarih,
        BitisTarih: responseData[0].bitisTarih,
        // context namleride set etme
        LokasyonName: responseData[0].lokasyonlar,
        plakaName: responseData[0].plakalar,
      };
      const filtersLabel = {
        LokasyonName: responseData[0].lokasyonlar,
        plakaName: responseData[0].plakalar,
        LokasyonID: responseData[0].lokasyonIds,
        plakaID: responseData[0].aracIds,
        BaslamaTarih: responseData[0].baslamaTarih,
        BitisTarih: responseData[0].bitisTarih,
      };
      updateReportData({
        filters: [filteredResponse],
        kullaniciRaporu: responseData[0].kullaniciRaporu,
        selectedRow,
      });
      setFiltersLabel(filtersLabel);
    } catch (error) {
      console.error("Filtreler yüklenirken bir hata oluştu:", error);
    }
  };

  // ------------------ FILTERS: MAIN LOGIC ------------------
  const applyAllFilters = (filtersObj = {}, cols = columns, data = originalData) => {
    let filteredData = [...data];

    Object.keys(filtersObj).forEach((colKey) => {
      const [val1, val2] = filtersObj[colKey] || ["", ""];
      const column = cols.find((c) => c.dataIndex === colKey);
      if (!column) return;

      // Handle numeric/date/year/hour columns or skip if you only want to do text
      if (column.isYear || column.isDate || column.isNumber || column.isHour) {
        // Numeric/date/hour vs. text bazlı filtre gibi durumlarınızı burada ayrıca ele alabilirsiniz
        return;
      }

      // ELSE: String-based filtering
      if (val1 !== "" || val2 !== "") {
        filteredData = filteredData.filter((row) => {
          const cellValue = row[colKey] ? row[colKey].toString().toLowerCase() : "";
          // AND logic
          if (val1 && !cellValue.includes(val1.toLowerCase())) return false;
          if (val2 && !cellValue.includes(val2.toLowerCase())) return false;
          return true;
        });
      }
    });

    return filteredData;
  };

  // ------------------ SEARCH & RESET ------------------
  const handleSearch = (selectedKeys, dataIndex, closeDropdown, setSelectedKeys) => {
    // 1) Update columnFilters
    const newFilters = {
      ...columnFilters,
      [dataIndex]: [selectedKeys[0] || "", selectedKeys[1] || ""],
    };

    const filtered = applyAllFilters(newFilters, columns, originalData);

    updateReportData({
      columnFilters: newFilters,
      tableData: filtered,
    });

    // 2) Sütunların isFilter / isFilter1 alanlarını da güncelle
    const updatedColumns = columns.map((col) => {
      if (col.dataIndex === dataIndex) {
        const updated = { ...col };
        if (typeof updated.isFilter !== "undefined") {
          updated.isFilter = selectedKeys[0] || "";
        }
        if (typeof updated.isFilter1 !== "undefined") {
          updated.isFilter1 = selectedKeys[1] || "";
        }
        return updated;
      }
      return col;
    });

    updateReportData({ columns: updatedColumns });
  };

  const handleReset = (dataIndex, closeDropdown, setSelectedKeys) => {
    setSelectedKeys([]);
    // 1) Remove from columnFilters
    const newFilters = { ...columnFilters };
    delete newFilters[dataIndex];

    const filtered = applyAllFilters(newFilters, columns, originalData);

    updateReportData({
      columnFilters: newFilters,
      tableData: filtered,
    });

    // 2) Reset isFilter/isFilter1 in columns
    const updatedColumns = columns.map((col) => {
      if (col.dataIndex === dataIndex) {
        const updated = { ...col };
        if (typeof updated.isFilter !== "undefined") {
          updated.isFilter = "";
        }
        if (typeof updated.isFilter1 !== "undefined") {
          updated.isFilter1 = "";
        }
        return updated;
      }
      return col;
    });

    updateReportData({ columns: updatedColumns });
  };

  // ------------------ GET FILTER DROPDOWN PROPS ------------------
  const getColumnSearchProps = (dataIndex) => ({
    // Ant Design 5 için "filterDropdownOpen" ve "onFilterDropdownOpenChange"
    // ile durumu manuel kontrol ediyoruz.
    filterDropdownProps: {
      open: filterDropdownOpen[dataIndex] || false,
      onOpenChange: (open) => {
        // Sadece "true" olduğunda (dropdown açılırken) state'i güncelleyelim;
        // dışarı tıklandığında kapanmasını engellemek için "false" durumunu yoksayacağız.
        if (open) {
          setFilterDropdownOpen((prev) => ({ ...prev, [dataIndex]: true }));
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },

    // filterDropdown içeriğini tamamen özelleştiriyoruz.
    filterDropdown: ({ setSelectedKeys, selectedKeys, closeDropdown, close }) => {
      const column = columns.find((col) => col.dataIndex === dataIndex);
      if (!column) return null;

      // Yıl filtresi
      if (column.isYear) {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <DatePicker
                picker="year"
                placeholder="Min Yıl"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "YYYY") : null}
                onChange={(date) => {
                  const val = date ? date.year().toString() : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <DatePicker
                picker="year"
                placeholder="Max Yıl"
                value={selectedKeys[1] ? dayjs(selectedKeys[1], "YYYY") : null}
                onChange={(date) => {
                  const val = date ? date.year().toString() : "";
                  setSelectedKeys([selectedKeys[0] || "", val]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                >
                  Ara
                </Button>
                <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    // Sadece kapat butonuna basıldığında
                    // dropdown'u kapatalım.
                    setFilterDropdownOpen((prev) => ({
                      ...prev,
                      [dataIndex]: false,
                    }));
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      }

      // Tarih filtresi
      if (column.isDate) {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <DatePicker
                format="DD.MM.YYYY"
                placeholder="Başlangıç Tarihi"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "DD.MM.YYYY", true) : null}
                onChange={(date) => {
                  const val = date ? date.format("DD.MM.YYYY") : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <DatePicker
                format="DD.MM.YYYY"
                placeholder="Bitiş Tarihi"
                value={selectedKeys[1] ? dayjs(selectedKeys[1], "DD.MM.YYYY", true) : null}
                onChange={(date) => {
                  const val = date ? date.format("DD.MM.YYYY") : "";
                  setSelectedKeys([selectedKeys[0] || "", val]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                >
                  Ara
                </Button>
                <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setFilterDropdownOpen((prev) => ({
                      ...prev,
                      [dataIndex]: false,
                    }));
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      }

      // Saat filtresi
      if (column.isHour) {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <TimePicker
                format="HH:mm"
                placeholder="Min Saat"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "HH:mm") : null}
                onChange={(time) => {
                  const val = time ? time.format("HH:mm") : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <TimePicker
                format="HH:mm"
                placeholder="Max Saat"
                value={selectedKeys[1] ? dayjs(selectedKeys[1], "HH:mm") : null}
                onChange={(time) => {
                  const val = time ? time.format("HH:mm") : "";
                  setSelectedKeys([selectedKeys[0] || "", val]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                >
                  Ara
                </Button>
                <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setFilterDropdownOpen((prev) => ({
                      ...prev,
                      [dataIndex]: false,
                    }));
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      }

      // Sayısal filtre
      if (column.isNumber) {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <InputNumber
                placeholder="Min Değer"
                value={selectedKeys[0]}
                onChange={(value) => setSelectedKeys([value !== null ? value : "", selectedKeys[1] || ""])}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <InputNumber
                placeholder="Max Değer"
                value={selectedKeys[1]}
                onChange={(value) => setSelectedKeys([selectedKeys[0] || "", value !== null ? value : ""])}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                >
                  Ara
                </Button>
                <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setFilterDropdownOpen((prev) => ({
                      ...prev,
                      [dataIndex]: false,
                    }));
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      }

      // Metinsel filtre (string-based)
      const currentValues = columnFilters[dataIndex] || ["", ""];

      return (
        <div style={{ padding: 8, width: 300 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              ref={searchInput}
              placeholder="Filter #1"
              value={selectedKeys[0] ?? currentValues[0]}
              onChange={(e) => {
                const newVal1 = e.target.value;
                const newVal2 = selectedKeys[1] ?? currentValues[1];
                setSelectedKeys([newVal1, newVal2]);
              }}
              onPressEnter={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
              style={{ width: "100%" }}
            />
            {/* İkinci bir input isterseniz burayı açabilirsiniz:
            
            <Input
              placeholder="Filter #2"
              value={selectedKeys[1] ?? currentValues[1]}
              onChange={(e) => {
                const newVal2 = e.target.value;
                const newVal1 = selectedKeys[0] ?? currentValues[0];
                setSelectedKeys([newVal1, newVal2]);
              }}
              onPressEnter={() =>
                handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)
              }
              style={{ width: "100%" }}
            />
            
            */}
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
                onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
              >
                Ara
              </Button>
              <Button size="small" style={{ width: 90 }} onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)}>
                Sıfırla
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  // Artık sadece bu butona basıldığında dropdown kapanacak
                  setFilterDropdownOpen((prev) => ({
                    ...prev,
                    [dataIndex]: false,
                  }));
                }}
              >
                Kapat
              </Button>
            </Space>
          </Space>
        </div>
      );
    },

    filterIcon: () => {
      const vals = columnFilters[dataIndex] || [];
      const isFiltered = vals.some((v) => v && v.toString().trim() !== "");
      return <SearchOutlined style={{ color: isFiltered ? "#1890ff" : undefined }} />;
    },
  });

  // ------------------ VISIBILITY & DRAGGING ------------------
  const visibleColumns = useMemo(() => columns.filter((col) => col.visible), [columns]);

  const toggleVisibility = (key, checked) => {
    const updatedColumns = columns.map((col) => (col.key === key ? { ...col, visible: checked } : col));
    updateReportData({ columns: updatedColumns });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const visibleCols = columns.filter((col) => col.visible);
      const oldIndex = visibleCols.findIndex((col) => col.key === active.id);
      const newIndex = visibleCols.findIndex((col) => col.key === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }
      const newVisibleCols = arrayMove(visibleCols, oldIndex, newIndex);

      const newColumns = [];
      let vi = 0;
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].visible) {
          newColumns.push(newVisibleCols[vi]);
          vi++;
        } else {
          newColumns.push(columns[i]);
        }
      }
      updateReportData({ columns: newColumns });
    }
  };

  // ------------------ XLSX EXPORT ------------------
  const handleExportXLSX = () => {
    const headers = visibleColumns.map((col) => col.title);
    const dataRows = tableData.map((row) => visibleColumns.map((col) => (row[col.dataIndex] !== null && row[col.dataIndex] !== undefined ? row[col.dataIndex] : "")));

    const sheetData = [headers, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    const columnWidths = visibleColumns.map((col) => {
      const headerLength = col.title.length;
      const maxDataLength = tableData.reduce((max, row) => {
        const cell = row[col.dataIndex];
        if (!cell) return max;
        const cellStr = cell.toString();
        return Math.max(max, cellStr.length);
      }, 0);
      const maxLength = Math.max(headerLength, maxDataLength);
      return { wch: pxToWch(maxLength * 10) };
    });
    ws["!cols"] = columnWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tablo_export.xlsx");
  };

  // ------------------ SORTING ------------------
  const getSorter = (column) => {
    // Sayısal değerler için
    if (column.isNumber) {
      return (a, b) => {
        const aVal = a[column.dataIndex];
        const bVal = b[column.dataIndex];
        return (aVal || 0) - (bVal || 0);
      };
    }

    // Tarih değerleri için
    if (column.isDate) {
      return (a, b) => {
        const aVal = a[column.dataIndex] ? dayjs(a[column.dataIndex], "DD.MM.YYYY").valueOf() : 0;
        const bVal = b[column.dataIndex] ? dayjs(b[column.dataIndex], "DD.MM.YYYY").valueOf() : 0;
        return aVal - bVal;
      };
    }

    // Saat değerleri için
    if (column.isHour) {
      return (a, b) => {
        const aVal = a[column.dataIndex] ? dayjs(a[column.dataIndex], "HH:mm").valueOf() : 0;
        const bVal = b[column.dataIndex] ? dayjs(b[column.dataIndex], "HH:mm").valueOf() : 0;
        return aVal - bVal;
      };
    }

    // Yıl değerleri için
    if (column.isYear) {
      return (a, b) => {
        const aVal = a[column.dataIndex] || 0;
        const bVal = b[column.dataIndex] || 0;
        return aVal - bVal;
      };
    }

    // Metin değerleri için (varsayılan)
    return (a, b) => {
      const aVal = a[column.dataIndex] ? a[column.dataIndex].toString().toLowerCase() : "";
      const bVal = b[column.dataIndex] ? b[column.dataIndex].toString().toLowerCase() : "";
      return aVal.localeCompare(bVal);
    };
  };

  // ------------------ RENDER ------------------
  const styledColumns = useMemo(() => {
    return visibleColumns.map((col) => {
      const searchProps = getColumnSearchProps(col.dataIndex);
      return {
        ...col,
        ...searchProps,
        sorter: getSorter(col),
        sortDirections: ["ascend", "descend"],
        showSorterTooltip: false,
        onHeaderCell: () => ({
          style: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }),
        onCell: () => ({
          style: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }),
        render: (text) => <span style={{ whiteSpace: "nowrap" }}>{text !== null && text !== undefined ? text : "\u00A0"}</span>,
      };
    });
  }, [visibleColumns, columnFilters, filterDropdownOpen]);

  const handleRecordModalClose = () => {
    onDrawerClose();
  };

  const handleSaveColumns = () => {
    setSaveModalVisible(true);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
    console.log("ReportData state:", reportData);
    console.log("Filters:", filters);
    console.log("FiltersLabel:", filtersLabel);
    console.log("SelectedRow:", selectedRow);
    saveReport(values);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const saveReport = async (values) => {
    console.log("Save Report - Current state:", {
      reportData,
      filters,
      filtersLabel,
      selectedRow,
      values,
    });

    // Önce güncel filtre değerlerini doğru şekilde alalım
    let currentFilters = {};

    // Eğer filters context'te varsa ve güncel ise onu kullan
    if (filters && filters.length > 0) {
      currentFilters = filters[0];
      console.log("Using filters from context:", currentFilters);
    }
    // Değilse filtersLabel'dan al (fallback)
    else if (filtersLabel && Object.keys(filtersLabel).length > 0) {
      currentFilters = {
        LokasyonID: filtersLabel.LokasyonID,
        plakaID: filtersLabel.plakaID,
        BaslamaTarih: filtersLabel.BaslamaTarih,
        BitisTarih: filtersLabel.BitisTarih,
        LokasyonName: filtersLabel.LokasyonName,
        plakaName: filtersLabel.plakaName,
      };
      console.log("Using filtersLabel as fallback:", currentFilters);
    }

    console.log("Final currentFilters to be used:", currentFilters);

    // Backend'in beklediği format için değerleri hazırlayalım
    const lokasyonIds = currentFilters.LokasyonID || null;
    const aracIds = currentFilters.plakaID || null;
    const baslamaTarih = currentFilters.BaslamaTarih || null;
    const bitisTarih = currentFilters.BitisTarih || null;

    // Sütun başlıklarını hazırlayalım
    const basliklar = columns.map((col) => ({
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key,
      visible: col.visible,
      width: col.width || 150,
      isDate: col.isDate || false,
      isYear: col.isYear || false,
      isHour: col.isHour || false,
      isNumber: col.isNumber || false,
      isFilter: col.isFilter || "",
      isFilter1: col.isFilter1 || "",
    }));

    // Backend'in beklediği format
    const payload = {
      EskiRaporID: selectedRow?.key || null,
      YeniRaporGrupID: values.reportGroupID || null,
      YeniRaporAdi: values.nameOfReport,
      lokasyonIds: lokasyonIds,
      aracIds: aracIds,
      BaslamaTarih: baslamaTarih,
      BitisTarih: bitisTarih,
      YeniRaporAciklama: values.raporAciklama,
      Basliklar: basliklar,
    };

    console.log("Request body:", payload);

    try {
      const response = await AxiosInstance.post(`Report/SaveReport`, payload);
      console.log("Rapor kaydedildi:", response.data);
      message.success("Rapor başarıyla kaydedildi!");
      setSaveModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Rapor kaydedilirken bir hata oluştu:", error);
      message.error("Rapor kaydedilirken bir hata oluştu!");
    }
  };

  return (
    <>
      <Modal destroyOnClose centered title={selectedRow?.rprTanim} open={drawerVisible} onCancel={handleRecordModalClose} footer={null} width="90%" zIndex={1000}>
        Modal
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Button style={{ padding: "0px", width: "32px", height: "32px" }} onClick={() => setManageColumnsVisible(true)}>
              <MenuOutlined />
            </Button>
            <Filters filtersLabel={filtersLabel} onSubmit={handleFilterSubmit} />
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Button onClick={handleSaveColumns} type="primary" style={{ display: "flex", alignItems: "center" }}>
              <SaveOutlined />
              Kaydet
            </Button>

            <Button style={{ display: "flex", alignItems: "center" }} onClick={handleExportXLSX} icon={<PiMicrosoftExcelLogoFill />}>
              İndir
            </Button>
          </div>
        </div>
        <Table
          columns={styledColumns}
          dataSource={tableData}
          loading={reportLoading}
          rowKey={(record) => (record.ID ? record.ID : JSON.stringify(record))}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            defaultPageSize: 10,
            showTotal: (total) => `Toplam ${total} kayıt`,
          }}
          scroll={{ y: "calc(100vh - 340px)", x: "max-content" }}
          locale={{
            emptyText: reportLoading ? "Yükleniyor..." : "Eşleşen veri bulunamadı.",
          }}
          style={{ tableLayout: "auto" }}
        />
      </Modal>

      <Modal title="Raporu Kaydet" centered width={500} open={saveModalVisible} onOk={() => form.submit()} onCancel={() => setSaveModalVisible(false)} zIndex={1001}>
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ display: "flex", flexWrap: "wrap", columnGap: "10px" }}
        >
          <Form.Item
            label="Rapor Adı"
            name="nameOfReport"
            style={{ width: "430px", marginBottom: "10px" }}
            rules={[
              {
                required: true,
                message: t("alanBosBirakilamaz"),
              },
            ]}
          >
            <Input placeholder={t("raporAdi")} />
          </Form.Item>

          <RaporGrupSelectbox form={form} />

          <Form.Item
            label="Açıklama"
            name="raporAciklama"
            style={{ width: "430px", marginBottom: "10px" }}
            rules={[
              {
                required: true,
                message: t("alanBosBirakilamaz"),
              },
            ]}
          >
            <Input.TextArea placeholder={t("aciklamaGir")} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Manage Columns Modal */}
      <Modal
        title="Sütunları Yönet"
        centered
        width={800}
        open={manageColumnsVisible}
        onOk={() => setManageColumnsVisible(false)}
        onCancel={() => setManageColumnsVisible(false)}
        zIndex={1001}
      >
        <Text style={{ marginBottom: "15px", display: "block" }}>Aşağıdaki Ekranlardan Sütunları Göster / Gizle, Sıralamalarını ve Genişliklerini Ayarlayabilirsiniz.</Text>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={() => {
              updateReportData({
                columns: initialColumns,
                columnFilters: {},
                tableData: originalData,
                filterDropdownOpen: {},
              });
            }}
            style={{ marginBottom: "15px" }}
          >
            Sütunları Sıfırla
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Show/Hide Columns Section */}
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
                <div
                  key={col.key}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <Checkbox checked={columns.find((column) => column.key === col.key)?.visible || false} onChange={(e) => toggleVisibility(col.key, e.target.checked)} />
                  {col.title}
                </div>
              ))}
            </div>
          </div>

          {/* Sort Columns Section */}
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
                <SortableContext items={visibleColumns.map((col) => col.key)} strategy={verticalListSortingStrategy}>
                  {visibleColumns.map((col) => (
                    <DraggableRow key={col.key} id={col.key} text={col.title} />
                  ))}
                </SortableContext>
              </div>
            </div>
          </DndContext>
        </div>
      </Modal>
    </>
  );
}

export default RecordModal;

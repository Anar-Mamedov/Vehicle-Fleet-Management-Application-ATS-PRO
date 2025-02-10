import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Table, Button, Checkbox, Typography, Input, Space, DatePicker, InputNumber, TimePicker } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../api/http.jsx";
import { DndContext, PointerSensor, useSensor, useSensors, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DraggableRow from "./DraggableRow";
import * as XLSX from "xlsx";
import { FaFileExcel } from "react-icons/fa";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // Enable custom date formats

const { Text } = Typography;

// Utility function to move elements in an array
const arrayMove = (array, from, to) => {
  const newArray = [...array];
  const [movedItem] = newArray.splice(from, 1);
  newArray.splice(to, 0, movedItem);
  return newArray;
};

// Utility function to convert pixels to wch (approximate)
const pxToWch = (px) => Math.ceil(px / 7); // 1 wch ≈ 7px

function RecordModal({ selectedRow, onDrawerClose, drawerVisible }) {
  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [initialColumns, setInitialColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [manageColumnsVisible, setManageColumnsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState({});

  const searchInput = useRef(null);

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      setLoading(true);
      const lan = localStorage.getItem("i18nextLng") || "tr";
      AxiosInstance.get("/Report/GetReportDetail", {
        params: { id: selectedRow.key, lan: lan },
      })
        .then((response) => {
          const { headers, list } = response.data;
          if (headers && headers.length > 0) {
            const cols = headers.map((header) => {
              // Calculate width based on header length
              const headerLength = header.title.length;
              const width = Math.max(headerLength * 10, 150); // Adjust multiplier and default as needed

              return {
                title: header.title,
                dataIndex: header.dataIndex,
                key: header.dataIndex,
                visible: header.visible,
                width: width, // Set width based on header length
                isDate: header.isDate,
                isYear: header.isYear,
                isHour: header.isHour,
                isNumber: header.isNumber,
              };
            });

            setInitialColumns(cols);
            setColumns(cols);
            setTableData(list);
            setOriginalData(list);
          }
        })
        .catch((error) => {
          console.error("Error fetching detail:", error);
        })
        .finally(() => {
          setLoading(false); // Stop spinner after data is loaded or error occurs
        });
    } else {
      // Reset when modal is closed
      setTableData([]);
      setOriginalData([]);
      setInitialColumns([]);
      setColumns([]);
      setColumnFilters({});
    }
  }, [drawerVisible, selectedRow]);

  const visibleColumns = useMemo(() => columns.filter((col) => col.visible), [columns]);

  const toggleVisibility = (key, checked) => {
    setColumns((prev) => prev.map((col) => (col.key === key ? { ...col, visible: checked } : col)));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumns((prevColumns) => {
        // Extract visible columns
        const visibleCols = prevColumns.filter((col) => col.visible);
        const oldIndex = visibleCols.findIndex((col) => col.key === active.id);
        const newIndex = visibleCols.findIndex((col) => col.key === over.id);

        if (oldIndex === -1 || newIndex === -1) {
          // If either index is not found, do nothing
          return prevColumns;
        }

        // Reorder the visible columns
        const newVisibleCols = arrayMove(visibleCols, oldIndex, newIndex);

        // Merge the reordered visible columns back into the full columns array
        // Hidden columns remain in their original positions
        const newColumns = prevColumns.map((col) => {
          if (col.visible) {
            return newVisibleCols.shift();
          }
          return col; // Keep hidden columns unchanged
        });

        return newColumns;
      });
    }
  };

  const handleRecordModalClose = () => {
    onDrawerClose();
  };

  // Apply all filters
  const applyAllFilters = (filters) => {
    let filteredData = [...originalData];

    Object.keys(filters).forEach((colKey) => {
      const filterVal = filters[colKey];
      const column = columns.find((col) => col.key === colKey);

      if (!column) return;

      if (typeof filterVal === "string") {
        const searchTerm = filterVal.toLowerCase();
        filteredData = filteredData.filter((item) => {
          const cellValue = item[colKey] != null ? item[colKey].toString().toLowerCase() : "";
          return cellValue.includes(searchTerm);
        });
      } else if (typeof filterVal === "object" && filterVal !== null) {
        const { start, end } = filterVal;

        if (column.isYear) {
          const startYear = start ? parseInt(start, 10) : null;
          const endYear = end ? parseInt(end, 10) : null;
          filteredData = filteredData.filter((item) => {
            const cellValue = item[colKey] ? parseInt(item[colKey], 10) : null;
            if (cellValue == null) return false;
            if (startYear && cellValue < startYear) return false;
            if (endYear && cellValue > endYear) return false;
            return true;
          });
        } else if (column.isDate) {
          const startDate = start ? dayjs(start, "DD.MM.YYYY", true) : null;
          const endDate = end ? dayjs(end, "DD.MM.YYYY", true) : null;

          filteredData = filteredData.filter((item) => {
            const dateStr = item[colKey];
            if (!dateStr) return false; // Exclude if date is null

            const cellValue = dayjs(dateStr, "DD.MM.YYYY", true);
            if (!cellValue.isValid()) return false; // Exclude if date is invalid

            if (startDate && cellValue.isBefore(startDate, "day")) return false;
            if (endDate && cellValue.isAfter(endDate, "day")) return false;
            return true;
          });
        } else if (column.isNumber) {
          const minValue = start !== undefined && start !== "" ? parseFloat(start) : null;
          const maxValue = end !== undefined && end !== "" ? parseFloat(end) : null;
          filteredData = filteredData.filter((item) => {
            const cellValue = item[colKey] !== null && item[colKey] !== undefined ? parseFloat(item[colKey]) : null;
            if (cellValue == null) return false;
            if (minValue !== null && cellValue < minValue) return false;
            if (maxValue !== null && cellValue > maxValue) return false;
            return true;
          });
        } else if (column.isHour) {
          const format = "HH:mm";
          const startTime = start ? dayjs(start, format) : null;
          const endTime = end ? dayjs(end, format) : null;

          filteredData = filteredData.filter((item) => {
            const timeStr = item[colKey];
            if (!timeStr) return false; // Exclude if time is null

            const cellValue = dayjs(timeStr, format, true);
            if (!cellValue.isValid()) return false; // Exclude if time is invalid

            if (startTime && cellValue.isBefore(startTime)) return false;
            if (endTime && cellValue.isAfter(endTime)) return false;
            return true;
          });
        }
        // Additional filter types (e.g., isHour) can be handled here if needed
      }
    });

    return filteredData;
  };

  // Handle Search
  const handleSearch = (selectedKeys, dataIndex, closeDropdown, setSelectedKeys) => {
    const column = columns.find((col) => col.key === dataIndex);
    if (!column) return;

    if (column.isYear) {
      const startYear = selectedKeys[0] ? parseInt(selectedKeys[0], 10) : null;
      const endYear = selectedKeys[1] ? parseInt(selectedKeys[1], 10) : null;
      setColumnFilters((prev) => {
        const newFilters = {
          ...prev,
          [dataIndex]: { start: startYear, end: endYear },
        };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    } else if (column.isDate) {
      const startDate = selectedKeys[0] || "";
      const endDate = selectedKeys[1] || "";
      setColumnFilters((prev) => {
        const newFilters = {
          ...prev,
          [dataIndex]: { start: startDate, end: endDate },
        };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    } else if (column.isNumber) {
      const minValue = selectedKeys[0] || "";
      const maxValue = selectedKeys[1] || "";
      setColumnFilters((prev) => {
        const newFilters = {
          ...prev,
          [dataIndex]: { start: minValue, end: maxValue },
        };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    } else if (column.isHour) {
      const startTime = selectedKeys[0] || "";
      const endTime = selectedKeys[1] || "";
      setColumnFilters((prev) => {
        const newFilters = {
          ...prev,
          [dataIndex]: { start: startTime, end: endTime },
        };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    } else {
      const searchTerm = selectedKeys[0] || "";
      setColumnFilters((prev) => {
        const newFilters = { ...prev, [dataIndex]: searchTerm };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    }

    closeDropdown && closeDropdown();
  };

  // Handle Reset
  const handleReset = (dataIndex, closeDropdown, setSelectedKeys) => {
    setSelectedKeys([]); // Clear input
    setColumnFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[dataIndex];
      const filtered = applyAllFilters(newFilters);
      setTableData(filtered);
      return newFilters;
    });
    closeDropdown && closeDropdown();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, closeDropdown, close }) => {
      const column = columns.find((col) => col.key === dataIndex);

      if (!column) return null;

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
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Ara
                </Button>
                <Button onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)} size="small" style={{ width: 90 }}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    close();
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      } else if (column.isDate) {
        // Handle all date columns
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <DatePicker
                placeholder="Başlangıç Tarihi"
                format="DD.MM.YYYY"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "DD.MM.YYYY", true) : null}
                onChange={(date) => {
                  const val = date ? date.format("DD.MM.YYYY") : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <DatePicker
                placeholder="Bitiş Tarihi"
                format="DD.MM.YYYY"
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
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Ara
                </Button>
                <Button onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)} size="small" style={{ width: 90 }}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    close();
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      } else if (column.isNumber) {
        // Replace Input with InputNumber for isNumber columns
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
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Ara
                </Button>
                <Button onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)} size="small" style={{ width: 90 }}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    close();
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      } else if (column.isHour) {
        // Handle isHour columns with TimePicker
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <TimePicker
                placeholder="Min Saat"
                format="HH:mm"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "HH:mm") : null}
                onChange={(time) => {
                  const val = time ? time.format("HH:mm") : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <TimePicker
                placeholder="Max Saat"
                format="HH:mm"
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
                  onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Ara
                </Button>
                <Button onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)} size="small" style={{ width: 90 }}>
                  Sıfırla
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    close();
                  }}
                >
                  Kapat
                </Button>
              </Space>
            </Space>
          </div>
        );
      } else {
        // Default filter for other columns
        return (
          <div style={{ padding: 8, width: 300 }}>
            <Input
              ref={searchInput}
              placeholder="Ara"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Ara
              </Button>
              <Button onClick={() => handleReset(dataIndex, closeDropdown, setSelectedKeys)} size="small" style={{ width: 90 }}>
                Sıfırla
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                Kapat
              </Button>
            </Space>
          </div>
        );
      }
    },
    filterIcon: () => {
      const val = columnFilters[dataIndex];
      const isFiltered = (typeof val === "string" && val !== "") || (typeof val === "object" && val !== null && (val.start !== "" || val.end !== ""));
      return <SearchOutlined style={{ color: isFiltered ? "#1890ff" : undefined }} />;
    },
    onFilterDropdownOpenChange: (visible) => {
      const column = columns.find((col) => col.key === dataIndex);
      if (visible && !column?.isDate && !column?.isYear && !column?.isNumber) {
        // Exclude date, year, and number columns from auto-select
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const styledColumns = useMemo(() => {
    return visibleColumns.map((col) => {
      const searchProps = getColumnSearchProps(col.dataIndex);
      return {
        ...col,
        ...searchProps,
        // Apply styles to prevent text wrapping in headers and cells
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
        // Custom render to handle null values
        render: (text) => <span style={{ whiteSpace: "nowrap" }}>{text !== null && text !== undefined ? text : "\u00A0"}</span>,
      };
    });
  }, [visibleColumns, columnFilters]);

  // XLSX Download Function
  const handleExportXLSX = () => {
    // Get visible column headers
    const headers = visibleColumns.map((col) => col.title);
    // Create data rows (only use dataIndex of visible columns)
    const dataRows = tableData.map((row) => visibleColumns.map((col) => (row[col.dataIndex] !== null && row[col.dataIndex] !== undefined ? row[col.dataIndex] : "")));

    const sheetData = [headers, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Calculate maximum text length for each column based on header and data
    const columnWidths = visibleColumns.map((col) => {
      const headerLength = col.title.length;
      const maxDataLength = tableData.reduce((max, row) => {
        const cell = row[col.dataIndex];
        if (cell === null || cell === undefined) return max;
        const cellStr = cell.toString();
        return Math.max(max, cellStr.length);
      }, 0);
      const maxLength = Math.max(headerLength, maxDataLength);
      return { wch: pxToWch(maxLength * 10) }; // Multiply by 10 to add padding
    });

    ws["!cols"] = columnWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tablo_export.xlsx");
  };

  return (
    <>
      <Modal title={selectedRow?.rprTanim} open={drawerVisible} onCancel={handleRecordModalClose} footer={null} width="90%">
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button style={{ padding: "0px", width: "32px", height: "32px" }} onClick={() => setManageColumnsVisible(true)}>
            <MenuOutlined />
          </Button>
          <Button style={{ display: "flex", alignItems: "center" }} onClick={handleExportXLSX} icon={<FaFileExcel />}>
            İndir
          </Button>
        </div>
        <Table
          columns={styledColumns}
          dataSource={tableData}
          loading={loading}
          rowKey={(record) => (record.ID ? record.ID : JSON.stringify(record))}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            defaultPageSize: 10,
          }}
          scroll={{ y: "calc(100vh - 340px)", x: "max-content" }} // Adjusted y to account for additional content
          locale={{
            emptyText: loading ? "Yükleniyor..." : "Eşleşen veri bulunamadı.",
          }}
          style={{ tableLayout: "auto" }} // Allow table to adjust based on content
        />
      </Modal>

      <Modal title="Sütunları Yönet" centered width={800} open={manageColumnsVisible} onOk={() => setManageColumnsVisible(false)} onCancel={() => setManageColumnsVisible(false)}>
        <Text style={{ marginBottom: "15px" }}>Aşağıdaki Ekranlardan Sütunları Göster / Gizle, Sıralamalarını ve Genişliklerini Ayarlayabilirsiniz.</Text>
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
              setColumns(initialColumns);
              setColumnFilters({});
              setTableData(originalData);
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
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                  key={col.key}
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
                  {visibleColumns.map((col, index) => (
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

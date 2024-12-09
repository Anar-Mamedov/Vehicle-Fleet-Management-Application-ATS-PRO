import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Table, Button, Checkbox, Typography, Input, Space, DatePicker } from "antd";
import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import AxiosInstance from "../../../../../../api/http.jsx";
import { DndContext, PointerSensor, useSensor, useSensors, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Resizable } from "react-resizable";
import DraggableRow from "./DraggableRow";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";
import dayjs from "dayjs";

const { Text } = Typography;

// ResizableTitle bileşeni
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;
  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "10px",
    height: "100%",
    zIndex: 2,
    cursor: "col-resize",
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
      draggableOpts={{ enableUserSelectHack: false }}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

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
            const headerObj = headers[0];
            const cols = Object.keys(headerObj).map((key) => ({
              title: headerObj[key],
              dataIndex: key,
              key: key,
              visible: key === "ID" ? false : true, // "ID" kolonunu gizliyoruz
              width: 150,
            }));

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
          setLoading(false); // Veri yüklendi veya hata alındı, spin durdur
        });
    } else {
      // Modal kapanınca resetle
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
      setColumns((prev) => {
        const oldIndex = prev.findIndex((col) => col.key === active.id);
        const newIndex = prev.findIndex((col) => col.key === over.id);

        const visibleCols = prev.filter((col) => col.visible);
        const hiddenCols = prev.filter((col) => !col.visible);

        const moved = [...visibleCols];
        const [removed] = moved.splice(oldIndex, 1);
        moved.splice(newIndex, 0, removed);

        const reordered = moved.concat(hiddenCols);
        return reordered;
      });
    }
  };

  const handleRecordModalClose = () => {
    onDrawerClose();
  };

  // handleResize fonksiyonunu index yerine key bazlı yapıyoruz
  const handleResize =
    (key) =>
    (e, { size }) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const colIndex = newColumns.findIndex((c) => c.key === key);
        if (colIndex > -1) {
          newColumns[colIndex] = { ...newColumns[colIndex], width: size.width };
        }
        return newColumns;
      });
    };

  // Tüm filtreleri uygula
  const applyAllFilters = (filters) => {
    let filteredData = [...originalData];

    Object.keys(filters).forEach((colKey) => {
      const filterVal = filters[colKey];
      if (typeof filterVal === "string") {
        const searchTerm = filterVal.toLowerCase();
        filteredData = filteredData.filter((item) => {
          const cellValue = item[colKey] != null ? item[colKey].toString().toLowerCase() : "";
          return cellValue.includes(searchTerm);
        });
      } else if (typeof filterVal === "object" && filterVal !== null) {
        const { start, end } = filterVal;
        if (colKey === "YIL") {
          const startYear = start ? parseInt(start, 10) : null;
          const endYear = end ? parseInt(end, 10) : null;
          filteredData = filteredData.filter((item) => {
            const cellValue = item[colKey] ? parseInt(item[colKey], 10) : null;
            if (cellValue == null) return false;
            if (startYear && cellValue < startYear) return false;
            if (endYear && cellValue > endYear) return false;
            return true;
          });
        } else if (colKey === "TARIH") {
          const startDate = start ? new Date(start) : null;
          const endDate = end ? new Date(end) : null;
          filteredData = filteredData.filter((item) => {
            const cellValue = item[colKey] ? new Date(item[colKey]) : null;
            if (!cellValue) return false;
            if (startDate && cellValue < startDate) return false;
            if (endDate && cellValue > endDate) return false;
            return true;
          });
        }
      }
    });

    return filteredData;
  };

  // Arama
  const handleSearch = (selectedKeys, dataIndex, closeDropdown, setSelectedKeys) => {
    if (dataIndex === "YIL") {
      const startYear = selectedKeys[0] || "";
      const endYear = selectedKeys[1] || "";
      setColumnFilters((prev) => {
        const newFilters = { ...prev, [dataIndex]: { start: startYear, end: endYear } };
        const filtered = applyAllFilters(newFilters);
        setTableData(filtered);
        return newFilters;
      });
    } else if (dataIndex === "TARIH") {
      const startDate = selectedKeys[0] || "";
      const endDate = selectedKeys[1] || "";
      setColumnFilters((prev) => {
        const newFilters = { ...prev, [dataIndex]: { start: startDate, end: endDate } };
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

  // Sıfırlama
  const handleReset = (dataIndex, closeDropdown, setSelectedKeys) => {
    setSelectedKeys([]); // inputu temizle
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
      if (dataIndex === "YIL") {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <DatePicker
                picker="year"
                placeholder="Başlangıç Yılı"
                value={selectedKeys[0] ? dayjs(selectedKeys[0], "YYYY") : null}
                onChange={(date) => {
                  const val = date ? date.year().toString() : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%" }}
              />
              <DatePicker
                picker="year"
                placeholder="Bitiş Yılı"
                value={selectedKeys[1] ? dayjs(selectedKeys[1], "YYYY") : null}
                onChange={(date) => {
                  const val = date ? date.year().toString() : "";
                  setSelectedKeys([selectedKeys[0] || "", val]);
                }}
                style={{ width: "100%" }}
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
      } else if (dataIndex === "TARIH") {
        return (
          <div style={{ padding: 8 }}>
            <Space direction="vertical">
              <DatePicker
                placeholder="Başlangıç Tarihi"
                value={selectedKeys[0] ? dayjs(selectedKeys[0]) : null}
                onChange={(date) => {
                  const val = date ? date.toISOString() : "";
                  setSelectedKeys([val, selectedKeys[1] || ""]);
                }}
                style={{ width: "100%" }}
              />
              <DatePicker
                placeholder="Bitiş Tarihi"
                value={selectedKeys[1] ? dayjs(selectedKeys[1]) : null}
                onChange={(date) => {
                  const val = date ? date.toISOString() : "";
                  setSelectedKeys([selectedKeys[0] || "", val]);
                }}
                style={{ width: "100%" }}
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
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder="Ara"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, dataIndex, closeDropdown, setSelectedKeys)}
              style={{ marginBottom: 8, display: "block" }}
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
      const isFiltered = (typeof val === "string" && val !== "") || (typeof val === "object" && val !== null);
      return <SearchOutlined style={{ color: isFiltered ? "#1890ff" : undefined }} />;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible && dataIndex !== "YIL" && dataIndex !== "TARIH") {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const resizableColumns = visibleColumns.map((col) => {
    const searchProps = getColumnSearchProps(col.dataIndex);
    return {
      ...col,
      ...searchProps,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(column.key),
      }),
    };
  });

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  // XLSX İndirme Fonksiyonu
  const handleExportXLSX = () => {
    // Visible kolon başlıklarını al
    const headers = visibleColumns.map((col) => col.title);
    // Veri satırlarını oluştur (sadece visible kolonların dataIndex'lerini kullan)
    const dataRows = tableData.map((row) => visibleColumns.map((col) => row[col.dataIndex]));

    const sheetData = [headers, ...dataRows];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Sütun genişliklerini ayarla
    // Her visibleColumn için wpx: col.width değeri belirliyoruz
    ws["!cols"] = visibleColumns.map((col) => ({ wpx: col.width || 100 })); // width tanımlı değilse varsayılan 100 px verelim

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "tablo_export.xlsx");
  };

  return (
    <>
      <Modal title={selectedRow?.rprTanim} open={drawerVisible} onCancel={handleRecordModalClose} footer={null} width={1200}>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
          <Button style={{ padding: "0px", width: "32px", height: "32px" }} onClick={() => setManageColumnsVisible(true)}>
            <MenuOutlined />
          </Button>
          <Button style={{ display: "flex", alignItems: "center" }} onClick={handleExportXLSX} icon={<SiMicrosoftexcel />}>
            İndir
          </Button>
        </div>
        <Table
          components={components}
          columns={resizableColumns}
          dataSource={tableData}
          loading={loading}
          rowKey={(record) => (record.id ? record.id : JSON.stringify(record))}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            defaultPageSize: 10,
          }}
          scroll={{ y: "calc(100vh - 335px)" }}
        />
      </Modal>

      <Modal title="Sütunları Yönet" centered width={800} open={manageColumnsVisible} onOk={() => setManageColumnsVisible(false)} onCancel={() => setManageColumnsVisible(false)}>
        <Text style={{ marginBottom: "15px" }}>Aşağıdaki Ekranlardan Sütunları Göster / Gizle, Sıralamalarını ve Genişliklerini Ayarlayabilirsiniz.</Text>
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "10px" }}>
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

          <DndContext onDragEnd={handleDragEnd} sensors={useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }))}>
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
    </>
  );
}

export default RecordModal;

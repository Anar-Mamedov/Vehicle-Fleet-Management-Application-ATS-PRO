import React, { useCallback, useEffect, useState } from "react";
import { Table, Button, Modal, Checkbox, Input, Spin, Typography, message, Tag } from "antd";
import { HolderOutlined, SearchOutlined, MenuOutlined } from "@ant-design/icons";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove, useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Resizable } from "react-resizable";
import "./ResizeStyle.css";
import AxiosInstance from "../../../../api/http";
import styled from "styled-components";
import { t } from "i18next";
import UpdateModal from "../../../pages/vehicles-control/IkameAracYonetimi/UpdateModal";
import FormattedDate from "../../../../_root/components/FormattedDate";

const { Text } = Typography;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  height: 32px !important;
`;

// Sütunların boyutlarını ayarlamak için kullanılan component
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

// Sütunların sürüklenebilir olmasını sağlayan component
const DraggableRow = ({ id, text, style, ...restProps }) => {
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

const IkameArac = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // API Data Fetching
  const fetchData = async (diff, targetPage) => {
    setLoading(true);
    try {
      let currentSetPointId = 0;

      if (diff > 0) {
        currentSetPointId = data[data.length - 1]?.siraNo || 0;
      } else if (diff < 0) {
        currentSetPointId = data[0]?.siraNo || 0;
      } else {
        currentSetPointId = 0;
      }

      const response = await AxiosInstance.get(`ReplacementVehicleReminder/GetReplacementVehicleReminderList?diff=${diff}&setPointId=${currentSetPointId}&parameter=${searchTerm}`);

      const total = response.data.recordCount;
      setTotalCount(total);
      setCurrentPage(targetPage);

      const newData = response.data.list.map((item) => ({
        ...item,
        key: item.siraNo,
      }));

      if (newData.length > 0) {
        setData(newData);
      } else {
        // message.warning("Veri bulunamadı.");
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchData(0, 1);
  };

  const handleTableChange = (page) => {
    const diff = page - currentPage;
    fetchData(diff, page);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    type: "checkbox",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    setUpdateId(record.siraNo || record.key);
    setUpdateModalVisible(true);
  };

  const refreshTableData = useCallback(() => {
    setSelectedRowKeys([]);
    fetchData(0, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const savedOrder = localStorage.getItem("columnOrderIkameAracHatirlatici");
    const savedVisibility = localStorage.getItem("columnVisibilityIkameAracHatirlatici");
    const savedWidths = localStorage.getItem("columnWidthsIkameAracHatirlatici");

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

    localStorage.setItem("columnOrderIkameAracHatirlatici", JSON.stringify(order));
    localStorage.setItem("columnVisibilityIkameAracHatirlatici", JSON.stringify(visibility));
    localStorage.setItem("columnWidthsIkameAracHatirlatici", JSON.stringify(widths));

    return order.map((key) => {
      const column = initialColumns.find((col) => col.key === key);
      return { ...column, visible: visibility[key], width: widths[key] };
    });
  });

  useEffect(() => {
    localStorage.setItem("columnOrderIkameAracHatirlatici", JSON.stringify(columns.map((col) => col.key)));
    localStorage.setItem(
      "columnVisibilityIkameAracHatirlatici",
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
      "columnWidthsIkameAracHatirlatici",
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

  const filteredColumns = mergedColumns.filter((col) => col.visible);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.key === active.id);
      const newIndex = columns.findIndex((column) => column.key === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setColumns((columns) => arrayMove(columns, oldIndex, newIndex));
      }
    }
  };

  const toggleVisibility = (key, checked) => {
    const index = columns.findIndex((col) => col.key === key);
    if (index !== -1) {
      const newColumns = [...columns];
      newColumns[index].visible = checked;
      setColumns(newColumns);
    }
  };

  const resetColumns = () => {
    localStorage.removeItem("columnOrderIkameAracHatirlatici");
    localStorage.removeItem("columnVisibilityIkameAracHatirlatici");
    localStorage.removeItem("columnWidthsIkameAracHatirlatici");
    window.location.reload();
  };

  return (
    <>
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

      {updateId && <UpdateModal isOpen={updateModalVisible} setIsOpen={setUpdateModalVisible} id={updateId} onRefresh={refreshTableData} />}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "10px",
          gap: "10px",
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
            onPressEnter={handleSearch}
            suffix={<SearchOutlined style={{ color: "#0091ff" }} onClick={handleSearch} />}
          />
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          components={components}
          rowSelection={rowSelection}
          columns={filteredColumns}
          dataSource={data}
          pagination={{
            current: currentPage,
            total: totalCount,
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: true,
            onChange: handleTableChange,
          }}
          scroll={{ y: "calc(100vh - 335px)" }}
        />
      </Spin>
    </>
  );
};

export default IkameArac;

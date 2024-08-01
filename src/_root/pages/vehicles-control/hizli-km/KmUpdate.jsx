import { createContext, useContext, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { t } from "i18next";
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  message,
  Space,
  Spin,
  Table,
  TimePicker,
} from "antd";
import {
  AddKmLogService,
  GetKmUpdateListService,
  ValidateKmLogForAddService,
} from "../../../../api/services/vehicles/vehicles/services";
import BreadcrumbComp from "../..//../components/breadcrumb/Breadcrumb";
import Filter from "./filter/Filter";
import ContextMenu from "./context-menu/ContextMenu";

const breadcrumb = [
  {
    href: "/",
    title: <HomeOutlined />,
  },
  {
    title: t("hizliKmGuncelleme"),
  },
];

const EditableContext = createContext(null);
const EditableRow = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  errorRows,
  validatedRows,
  handleRemoveValidatedRow,
  handleKeyDown,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    if (dataIndex === "tarih") {
      setOpenDatePicker(true);
    } else if (dataIndex === "saat") {
      setOpenTimePicker(true);
    }
    form.setFieldsValue({
      [dataIndex]:
        dataIndex === "tarih" && record[dataIndex]
          ? dayjs(record[dataIndex], "DD.MM.YYYY")
          : dataIndex === "saat" && record[dataIndex]
          ? dayjs(record[dataIndex], "HH:mm:ss")
          : record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
        [dataIndex]:
          dataIndex === "tarih" && values[dataIndex]
            ? dayjs(values[dataIndex]).isValid()
              ? dayjs(values[dataIndex]).format("DD.MM.YYYY")
              : ""
            : dataIndex === "saat" && values[dataIndex]
            ? dayjs(values[dataIndex]).isValid()
              ? dayjs(values[dataIndex]).format("HH:mm:ss")
              : ""
            : values[dataIndex],
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  const handleDatePickerChange = async (date) => {
    try {
      form.setFieldsValue({ [dataIndex]: date ? date : "" });
      setOpenDatePicker(false);
      save();
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  };

  const handleTimePickerChange = async (time) => {
    try {
      if (time) {
        form.setFieldsValue({ [dataIndex]: time });
        setOpenTimePicker(false);
        save();
      }
    } catch (error) {
      console.error("Error parsing time:", error);
    }
  };

  const clearInput = () => {
    form.setFieldsValue({ [dataIndex]: "" });
    handleRemoveValidatedRow(record.aracId);
  };

  let childNode = children;

  if (editable) {
    switch (dataIndex) {
      case "yeniKm":
        childNode = editing ? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            className={`editable-cell-${dataIndex}-${record?.aracId}`}
          >
            <Input
              ref={inputRef}
              allowClear
              onPressEnter={save}
              onBlur={save}
              onChange={(e) => {
                if (e.target.value < 0 || /^[A-Za-z]*$/.test(e.target.value)) {
                  clearInput();
                }

                if (e.target.value === "") {
                  clearInput();
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, dataIndex, record.aracId)}
            />
          </Form.Item>
        ) : (
          <div
            className={`editable-cell-value-wrap`}
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
        break;

      case "tarih":
        function formatDate(row) {
          const dateString = row.tarih;

          const ddMMyyyyRegex = /^\d{2}\.\d{2}\.\d{4}$/;

          let formattedDate;

          if (ddMMyyyyRegex.test(dateString)) {
            formattedDate = dateString;
          } else {
            formattedDate = dayjs(dateString).format("DD.MM.YYYY");
          }

          return formattedDate;
        }

        childNode = editing ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <DatePicker
              allowClear={false}
              format="DD.MM.YYYY"
              open={openDatePicker}
              onOpenChange={(status) => setOpenDatePicker(status)}
              onChange={handleDatePickerChange}
            />
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {formatDate(record)}
          </div>
        );
        break;

      case "saat":
        childNode = editing ? (
          <Form.Item style={{ margin: 0 }} name={dataIndex}>
            <TimePicker
              open={openTimePicker}
              format="HH:mm:ss"
              onOpenChange={(status) => setOpenTimePicker(status)}
              onChange={handleTimePickerChange}
            />
          </Form.Item>
        ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}
          >
            {children}
          </div>
        );
        break;

      default:
        childNode = children;
    }
  }

  let error;
  let valid;
  if (errorRows?.length > 0) {
    error = errorRows.some((row) => row.kmAracId === record.aracId && row.error)
      ? "error-text"
      : "";
  }

  if (validatedRows?.length > 0) {
    valid = validatedRows.some((row) => row.kmAracId === record.aracId)
      ? "success-text"
      : "";
  }

  return (
    <td
      {...restProps}
      data-index={record?.aracId}
      className={`${error} ${valid}`}
    >
      {childNode}
    </td>
  );
};

const defaultColumns = [
  {
    title: t("plaka"),
    dataIndex: "plaka",
  },
  {
    title: t("aracTip"),
    dataIndex: "aracTip",
  },
  {
    title: t("marka"),
    dataIndex: "marka",
  },
  {
    title: t("lokasyon"),
    dataIndex: "lokasyon",
  },
  {
    title: t("departman"),
    dataIndex: "departman",
  },
  {
    title: t("guncelKm"),
    dataIndex: "guncelKm",
  },
  {
    title: t("yeniKm"),
    dataIndex: "yeniKm",
    editable: true,
    width: "140px",
  },
  {
    title: t("tarih"),
    dataIndex: "tarih",
    editable: true,
    width: "140px",
  },
  {
    title: t("saat"),
    dataIndex: "saat",
    editable: true,
    width: "140px",
  },
];

const KmUpdate = () => {
  const [dataSource, setDataSource] = useState([]);
  const [showContext, setShowContext] = useState(false);
  const [status, setStatus] = useState(false);
  const [errorRows, setErrorRows] = useState([]);
  const [validatedRows, setValidatedRows] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    tarih: dayjs(new Date()).format("DD.MM.YYYY"),
    saat: dayjs(new Date()).format("HH:mm:ss"),
  });
  const [filter, setFilter] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: `${t("hizliKmGuncellendi")}!`,
    });
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  useEffect(() => {
    setLoading(true);
    GetKmUpdateListService(tableParams.pagination.current, filter).then((res) => {
      const modifiedData = res?.data.km_list.map((item) => {
        const rows = [...validatedRows, ...errorRows];
        const validatedRow = rows.find((row) => row.kmAracId === item.aracId);
        return {
          aracId: item.aracId,
          aracTip: item.aracTip,
          marka: item.marka,
          model: item.model,
          lokasyon: item.lokasyon,
          lokasyonId: item.lokasyonId,
          departman: item.departman,
          guncelKm: item.guncelKm,
          plaka: item.plaka,
          tarih: date.tarih || validatedRow?.tarih,
          saat: date.saat || validatedRow?.saat,
          yeniKm: validatedRow?.yeniKm,
          eskiKm: item.eskiKm,
        };
      });

      setDataSource(modifiedData);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count,
        },
      });

      setStatus(false);
      setLoading(false);
    });
  }, [status, tableParams.pagination.current, date]);

  const handleSave = async (row) => {
    try {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => item.aracId === row.aracId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
        function formatDate(row) {
          const dateString = row.tarih;

          const ddMMyyyyRegex = /^\d{2}\.\d{2}\.\d{4}$/;

          let formattedDate;

          if (ddMMyyyyRegex.test(dateString)) {
            formattedDate = dayjs(dateString, "DD.MM.YYYY").format(
              "YYYY-MM-DD"
            );
          } else {
            formattedDate = dayjs(dateString).format("YYYY-MM-DD");
          }

          return formattedDate;
        }

        const body = {
          siraNo: 0,
          kmAracId: row.aracId,
          seferSiraNo: 0,
          yakitSiraNo: 0,
          plaka: row.plaka,
          tarih: formatDate(row),
          saat: row.saat,
          eskiKm: row.guncelKm,
          yeniKm: row.yeniKm,
          fark: 0,
          kaynak: "GÜNCELLEME",
          dorse: true,
          aciklama: "",
          lokasyonId: row.lokasyonId,
        };

        if (body.tarih && body.saat && body.yeniKm) {
          ValidateKmLogForAddService(body).then((res) => {
            if (res?.data.statusCode === 400) {
              if (!errorRows.some((item) => item.kmAracId === body.kmAracId)) {
                setErrorRows((prevErrorRows) => [
                  ...prevErrorRows,
                  { ...body, error: true },
                ]);
              }

              const filteredValidatedRows = validatedRows.filter(
                (item) => item.kmAracId !== row.aracId
              );
              setValidatedRows(filteredValidatedRows);
            } else if (res?.data.statusCode === 200) {
              const filteredErrorRows = errorRows.filter(
                (item) => item.kmAracId !== row.aracId
              );
              setErrorRows(filteredErrorRows);

              const existingIndex = validatedRows.findIndex(
                (item) => item.kmAracId === body.kmAracId
              );
              if (existingIndex > -1) {
                setValidatedRows((prevValidatedRows) => {
                  const updatedRows = [...prevValidatedRows];
                  updatedRows[existingIndex] = {
                    ...updatedRows[existingIndex],
                    yeniKm: body.yeniKm,
                    tarih: body.tarih,
                    saat: body.saat,
                  };
                  return updatedRows;
                });
              } else {
                setValidatedRows((prevValidatedRows) => [
                  ...prevValidatedRows,
                  body,
                ]);
              }
            }
          });
        } else {
          const filteredErrorRows = errorRows.filter(
            (item) => item.kmAracId !== row.aracId
          );
          setErrorRows(filteredErrorRows);
        }
      }
    } catch (error) {
      console.error("Error saving row:", error);
    }
  };
  const handleKeyDown = (e, dataIndex, key) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const currentRowIndex = dataSource.findIndex(
        (item) => item.aracId === key
      );
      let nextRowIndex = e.shiftKey ? currentRowIndex - 1 : currentRowIndex + 1;

      if (nextRowIndex >= 0 && nextRowIndex < dataSource.length) {
        const nextCell = document.querySelector(
          `td[data-index="${key - 1}"] .editable-cell-value-wrap`
        );

        if (nextCell) {
          nextCell.click();
        }
      }
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    GetKmUpdateListService(pagination.current, filter).then((res) => {
      const modifiedData = res?.data.km_list.map((item) => {
        const rows = [...validatedRows, ...errorRows];
        const validatedRow = rows.find((row) => row.kmAracId === item.aracId);
        return {
          aracId: item.aracId,
          aracTip: item.aracTip,
          marka: item.marka,
          model: item.model,
          lokasyon: item.lokasyon,
          departman: item.departman,
          guncelKm: item.guncelKm,
          plaka: item.plaka,
          tarih: validatedRow?.tarih || date.tarih,
          saat: validatedRow?.saat || date.saat,
          yeniKm: validatedRow?.yeniKm,
        };
      });

      setDataSource(modifiedData);
    });

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataSource([]);
    }
  };

  const handleRemoveValidatedRow = (kmAracId) => {
    const filteredRows = validatedRows.filter(
      (row) => row.kmAracId !== kmAracId
    );
    setValidatedRows(filteredRows);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
        errorRows,
        validatedRows,
        handleRemoveValidatedRow,
        handleKeyDown,
      }),
    };
  });

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".context-menu")) {
      setShowContext(false);
    }
  };

  const handleContextMenu = (event, record) => {
    event.preventDefault();
    setContextMenuPosition({ x: event.pageX, y: event.pageY });
    setSelectedRowData(record);
    setShowContext(true);
  };

  useEffect(() => {
    if (showContext) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showContext]);

  const addKm = () => {
    AddKmLogService(validatedRows).then((res) => {
      if (res?.data.statusCode === 200) {
        success();
        setStatus(true);
        setValidatedRows([]);
        setErrorRows([]);
        window.location.reload();
      }
    });
  };

  const getData = () => {
    GetKmUpdateListService(tableParams.pagination.current, filter).then((res) => {
      const modifiedData = res?.data.km_list.map((item) => {
        const rows = [...validatedRows, ...errorRows];
        const validatedRow = rows.find((row) => row.kmAracId === item.aracId);
        return {
          aracId: item.aracId,
          aracTip: item.aracTip,
          marka: item.marka,
          model: item.model,
          lokasyon: item.lokasyon,
          departman: item.departman,
          guncelKm: item.guncelKm,
          plaka: item.plaka,
          tarih: validatedRow?.tarih || date.tarih,
          saat: validatedRow?.saat || date.saat,
          yeniKm: validatedRow?.yeniKm,
        };
      });

      setDataSource(modifiedData);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count,
        },
      });

      setStatus(false);
    });
  };
  const clear = () => {
    GetKmUpdateListService(tableParams.pagination.current, null).then((res) => {
      const modifiedData = res?.data.km_list.map((item) => {
        const rows = [...validatedRows, ...errorRows];
        const validatedRow = rows.find((row) => row.kmAracId === item.aracId);
        return {
          aracId: item.aracId,
          aracTip: item.aracTip,
          marka: item.marka,
          model: item.model,
          lokasyon: item.lokasyon,
          departman: item.departman,
          guncelKm: item.guncelKm,
          plaka: item.plaka,
          tarih: validatedRow?.tarih || date.tarih,
          saat: validatedRow?.saat || date.saat,
          yeniKm: validatedRow?.yeniKm,
        };
      });

      setDataSource(modifiedData);

      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count,
        },
      });

      setStatus(false);
    });
    setFilter({ plaka: "", aracTip: "", lokasyon: "", departman: "" });
  };

  const content = (
    <Space direction="vertical">
      <DatePicker
        placeholder={t("tarih")}
        onChange={(d) => {
          if (d) {
            setDate({ ...date, tarih: dayjs(d).format("DD.MM.YYYY") });
          }
        }}
        className="w-full"
      />
      <DatePicker
        picker="time"
        placeholder={t("saat")}
        onChange={(t) => {
          if (t) {
            setDate({ ...date, saat: dayjs(t).format("HH:mm:ss") });
          }
        }}
        className="w-full"
      />
    </Space>
  );

  return (
    <div className="km">
      {loading && (
        <div className="loading-spin">
          <div className="loader">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 100,
                  }}
                  spin
                />
              }
            />
          </div>
        </div>
      )}

      <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <div className="content">
        <Filter
          setDataSource={setDataSource}
          setTableParams={setTableParams}
          tableParams={tableParams}
          content={content}
          addKm={addKm}
          errorRows={errorRows}
          validatedRows={validatedRows}
          setFilter={setFilter}
          filter={filter}
          getData={getData}
          clear={clear}
        />
      </div>

      <div className="content settings">
        <p className="count">[ {tableParams?.pagination.total} kayıt ]</p>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          pagination={{
            ...tableParams.pagination,
            showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
          }}
          dataSource={dataSource}
          columns={columns}
          size="small"
          onChange={handleTableChange}
          onRow={(record, rowIndex) => {
            return {
              onContextMenu: (e) => {
                return handleContextMenu(e, record, rowIndex);
              },
            };
          }}
          locale={{
            emptyText: "Veri Bulunamadı",
          }}
        />

        {contextHolder}
      </div>

      {showContext && (
        <ContextMenu
          position={contextMenuPosition}
          rowData={selectedRowData}
          setStatus={setStatus}
        />
      )}
    </div>
  );
};

export default KmUpdate;

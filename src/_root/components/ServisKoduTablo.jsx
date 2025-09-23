import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Table, Input, Button } from "antd";
import { PlusOutlined, CloseCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import AxiosInstance from "../../api/http.jsx";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

export default function ServisKoduTablo({ workshopSelectedId, onSubmit, fieldName = "servisKodu", multiSelect = false, style = {} }) {
  const { control, setValue } = useFormContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const columns = useMemo(
    () => [
      {
        title: "Servis Kodu",
        dataIndex: "code",
        key: "code",
        width: 150,
        sorter: (a, b) => {
          if (a.code === null) return -1;
          if (b.code === null) return 1;
          return a.code.localeCompare(b.code);
        },
      },
      {
        title: "Servis Tanımı",
        dataIndex: "subject",
        key: "subject",
        width: 350,
      },
      {
        title: "Km",
        dataIndex: "km",
        key: "km",
        width: 100,
        render: (text) => <span>{Number(text).toLocaleString()}</span>,
      },
      {
        title: "Gün",
        dataIndex: "gun",
        key: "gun",
        width: 100,
      },
      {
        title: "Servis Tipi",
        dataIndex: "servisTipi",
        key: "servisTipi",
        width: 100,
      },
      {
        title: "Periyodik",
        dataIndex: "periyodik",
        key: "periyodik",
        width: 100,
        render: (text) => (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {text ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />}
          </div>
        ),
      },
    ],
    []
  );

  const fetchData = useCallback(
    async (diff, targetPage, term) => {
      setLoading(true);
      try {
        let setPointId;
        if (diff > 0) {
          setPointId = data[data.length - 1]?.bakimId || 0;
        } else if (diff < 0) {
          setPointId = data[0]?.bakimId || 0;
        } else {
          setPointId = 0;
        }

        const response = await AxiosInstance.get(`ServiceDef/GetServiceDefList?diff=${diff}&setPointId=${setPointId}&parameter=${encodeURIComponent(term || "")}`);

        const { list, recordCount } = response.data;
        const fetchedData = (list || []).map((item) => ({
          ...item,
          key: item.bakimId,
          code: item.bakimKodu,
          subject: item.tanim,
        }));
        setData(fetchedData);
        setPagination((prev) => ({ ...prev, total: recordCount, current: targetPage }));
      } finally {
        setLoading(false);
      }
    },
    [data]
  );

  const handleModalOpen = () => {
    setIsModalVisible(true);
    setSelectedRowKeys([]);
    fetchData(0, 1, searchTerm);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    if (multiSelect) {
      const selectedItems = data.filter((item) => selectedRowKeys.includes(item.key));
      if (selectedItems.length > 0) {
        onSubmit && onSubmit(selectedItems);
        const label = selectedItems.map((i) => `${i.code}`).join(", ");
        setValue(fieldName, label);
      }
    } else {
      const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
      if (selectedData) {
        onSubmit && onSubmit(selectedData);
        setValue(fieldName, `${selectedData.code}`);
      }
    }
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (multiSelect) {
      setSelectedRowKeys(Array.isArray(workshopSelectedId) ? workshopSelectedId : []);
    } else {
      setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
    }
  }, [workshopSelectedId, multiSelect]);

  const onRowSelectChange = (selectedKeys) => {
    if (multiSelect) {
      setSelectedRowKeys(selectedKeys);
    } else {
      setSelectedRowKeys(selectedKeys.length ? [selectedKeys[selectedKeys.length - 1]] : []);
    }
  };

  const handleTableChange = (newPagination) => {
    const targetPage = newPagination.current;
    const diff = targetPage - pagination.current;
    fetchData(diff, targetPage, searchTerm);
  };

  const handleSearchClick = () => {
    if (isModalVisible) {
      fetchData(0, 1, searchTerm);
    }
  };
  // no extra effect for pagination; handled in onChange

  const handleClearInput = () => {
    setValue(fieldName, "");
    onSubmit && onSubmit(null);
  };

  return (
    <div>
      <Controller
        name={fieldName}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%", ...style }}>
            <Input
              {...field}
              status={error ? "error" : ""}
              placeholder="Servis kodu seç"
              readOnly={true}
              suffix={
                field.value ? (
                  <CloseCircleFilled style={{ color: "#FF4D4F" }} onClick={handleClearInput} />
                ) : (
                  <PlusOutlined style={{ color: "#1677ff" }} onClick={handleModalOpen} />
                )
              }
            />
            {error && <span style={{ color: "red" }}>{error.message}</span>}
          </div>
        )}
      />

      <Modal width={1200} centered title={"Servis Kodları"} destroyOnClose open={isModalVisible} onOk={handleModalOk} onCancel={handleModalClose}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
          <Input placeholder="Arama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: "300px" }} />
          <Button type="primary" onClick={handleSearchClick}>
            Ara
          </Button>
        </div>
        <Table
          rowSelection={{ type: multiSelect ? "checkbox" : "radio", selectedRowKeys, onChange: onRowSelectChange }}
          bordered
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ y: "calc(100vh - 380px)" }}
        />
      </Modal>
    </div>
  );
}

ServisKoduTablo.propTypes = {
  workshopSelectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSubmit: PropTypes.func,
  fieldName: PropTypes.string,
  multiSelect: PropTypes.bool,
  style: PropTypes.object,
};

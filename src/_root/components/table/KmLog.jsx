import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { KMLogListDeleteService, KMLogListGetByIdService, KMLogListUpdateService, KMLogListValidateService } from "../../../api/service";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import { t } from "i18next";

const KmLog = ({ data, setDataStatus }) => {
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [kmStatus, setKmStatus] = useState("black");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    // If data is an array, use it directly
    if (Array.isArray(data)) {
      setDataSource(data);
      return;
    }

    // If data has aracId, fetch data from API
    if (data && data.aracId) {
      KMLogListGetByIdService(data?.aracId, tableParams?.pagination.current).then((res) => {
        setDataSource(res?.data.km_list);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data.total_count,
          },
        });
      });
    }
  }, [data, tableParams?.pagination.current, status]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDataSource([]);
    }
  };

  const handleDelete = (data) => {
    const body = { ...data };

    KMLogListDeleteService(body).then((res) => {
      if (res?.data.statusCode === 202) {
        setStatus(true);
      }
    });

    setStatus(false);
  };

  const validateKm = async () => {
    const body = { ...updateData };

    try {
      const res = await KMLogListValidateService(body);
      if (res?.data.statusCode === 400) {
        setKmStatus("red");
        return false;
      } else if (res?.data.statusCode === 202) {
        setKmStatus("green");
        return true;
      }
    } catch (error) {
      setKmStatus("red");
      return false;
    }
  };

  const handleEdit = async () => {
    const body = {
      ...updateData,
      tarih: dayjs(updateData?.tarih).format("YYYY-MM-DD"),
    };

    const response = await validateKm();

    if (response) {
      KMLogListUpdateService(body).then((res) => {
        if (res.data.statusCode === 202) {
          setStatus(true);
          onClose();
          setDataStatus(true);
        }
      });
      setStatus(false);
    }
  };

  const openUpdateModal = (data) => {
    setUpdateModal(true);
    setUpdateData(data);
  };

  const onClose = () => {
    setUpdateModal(false);
    setUpdateData(null);
    setKmStatus("black");
  };

  const defaultColumns = [
    {
      title: "Plaka",
      dataIndex: "plaka",
    },
    {
      title: "Lokasyon",
      dataIndex: "lokasyon",
    },
    {
      title: "Kaynak",
      dataIndex: "kaynak",
    },
    {
      title: "Eski km",
      dataIndex: "eskiKm",
    },
    {
      title: "Yeni km",
      dataIndex: "yeniKm",
    },
    {
      title: "Fark km",
      dataIndex: "fark",
    },
    {
      title: "Tarih",
      dataIndex: "tarih",
      render: (text) => text.split("T")[0].split("-").reverse().join("."),
    },
    {
      title: "Saat",
      dataIndex: "saat",
    },
    {
      title: "",
      dataIndex: "delete",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Silmeye eminmisiniz?" onConfirm={() => handleDelete(record)}>
            <DeleteOutlined style={{ color: "#dc3545" }} />
          </Popconfirm>
        ) : null,
    },
    {
      title: "",
      dataIndex: "edit",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Button onClick={() => openUpdateModal(record)} style={{ border: "none", color: "#5B548B" }}>
            <EditOutlined />
          </Button>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    return {
      ...col,
    };
  });

  const footer = [
    <Button key="submit" className="btn primary-btn km-update" onClick={handleEdit}>
      Güncelle
    </Button>,
    <Button key="back" className="btn cancel-btn" onClick={onClose}>
      Kapat
    </Button>,
  ];

  return (
    <>
      <Table rowClassName={() => "editable-row"} pagination={tableParams.pagination} dataSource={dataSource} columns={columns} size="small" onChange={handleTableChange} />
      <Modal title={"Kilometre Güncelleme Geçmişi Düzelt"} open={updateModal} onCancel={onClose} maskClosable={false} footer={footer} width={500}>
        <div className="grid gap-1">
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("tarih")}</label>
              <Input className="w-full" placeholder="Tarih" disabled value={dayjs(updateData?.tarih).format("DD.MM.YYYY")} />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("saat")}</label>
              <Input className="w-full" placeholder="Saat" disabled value={updateData?.saat} />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("eskiKm")}</label>
              <Input placeholder="Eski Km" disabled value={updateData?.eskiKm} />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("yeniKm")}</label>
              <InputNumber
                allowClear
                style={{ borderColor: kmStatus }}
                placeholder="Yeni Km"
                className="w-full"
                value={updateData?.yeniKm}
                onChange={(e) => {
                  if (e !== null) {
                    setUpdateData({ ...updateData, yeniKm: e });
                  } else {
                    setKmStatus("black");
                  }
                }}
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("farkKm")}</label>
              <Input placeholder="Fark Km" disabled value={updateData?.fark} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

KmLog.propTypes = {
  data: PropTypes.array,
  setDataStatus: PropTypes.func,
};

export default KmLog;

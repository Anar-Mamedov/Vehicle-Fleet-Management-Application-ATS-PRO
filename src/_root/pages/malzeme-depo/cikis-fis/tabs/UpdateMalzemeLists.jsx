import { useEffect, useState } from "react";
import { Button, InputNumber, message, Modal, Popconfirm, Select, Table } from "antd";
import { t } from "i18next";
import { Controller, useFormContext } from "react-hook-form";
import { DeleteOutlined } from "@ant-design/icons";
import TextInput from "../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Plaka from "../../../../components/form/selects/Plaka";
import Location from "../../../../components/form/tree/Location";
import Textarea from "../../../../components/form/inputs/Textarea";
import MalzemeTable from "./MalzemeTable";
import { DeleteUpdatedMaterialReceiptService } from "../../../../../api/services/malzeme/services";

const UpdateMalzemeLists = ({
  setTableData,
  tableData,
  isSuccess,
  setIsSuccess,
}) => {
  const { control, setValue, watch, handleSubmit } = useFormContext();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [editModal, setEditModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [record, setRecord] = useState(null);

  const defaultColumns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malezemeKod",
      render: (text, record) => (
        <Button
          onClick={() => {
            setEditModal(true);
            setDataSource(record);
            setRecord(record);
            setValue(
              "edit_plakaId", record.aracId
            );
            setValue(
              "malzeme_plaka",
              record.plaka
            );
            setValue("edit_indirimOrani", record.indirimOran)
            setValue("edit_indirimTutari", record.indirimTutar)
            setValue("edit_malzemeTanimi", record.malezemeTanim);
            setValue(
              "edit_miktar",
              watch("edit_miktar") ? watch("edit_miktar") : 1
            );
            setValue("birim", record.birim);
            setValue("edit_birim", record.birimKodId);
            setValue("edit_fiyat", record.fiyat);
            setValue(
              "edit_araToplam",
              watch("edit_miktar")
                ? watch("edit_miktar") * watch("edit_fiyat")
                : 1 * watch("edit_fiyat")
            );
            setValue("edit_kdvOrani", record.kdvOran);
            setValue("edit_toplam", record.toplam);
            setValue("edit_malzemeKod", record.malezemeKod);
            setValue("edit_malzemeTip", record.malzemeTip);
            setValue("edit_aciklama", record.aciklama);
            setValue(
              "edit_lokasyonId", record.lokasyonId
            );
            setValue(
              "edit_lokasyon", record.lokasyon
            );
            setValue("edit_kdv", record.kdvDahilHaric ? "Dahil" : "Hariç");
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "malezemeTanim",
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTip",
    },
    {
      title: t("miktar"),
      dataIndex: "miktar",
    },
    {
      title: t("birim"),
      dataIndex: "birim",
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
    },
    {
      title: t("araToplam"),
      dataIndex: "araToplam",
    },
    {
      title: `${t("indirimOrani")} %`,
      dataIndex: "indirimOran",
      render: text => `${text} %`
    },
    {
      title: t("indirimTutari"),
      dataIndex: "indirim",
    },
    {
      title: `${t("kdvOrani")} %`,
      dataIndex: "kdvOran",
      render: text => `${text} %`
    },
    {
      title: `${t("kdv")} D/H`,
      dataIndex: "kdvDahilHaric",
      render: (text) => (text ? "Dahil" : "Hariç"),
    },
    {
      title: t("kdvTutar"),
      dataIndex: "kdvTutar",
    },
    {
      title: t("toplam"),
      dataIndex: "toplam",
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
    },
    {
      title: "",
      dataIndex: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Silmeye eminmisiniz?"
          okText={t("ok")}
          cancelText={t("cancel")}
          onConfirm={() => handleDelete(record)}
        >
          <DeleteOutlined style={{ color: "#dc3545" }} />
        </Popconfirm>
      ),
    },
  ];

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key.key);
    const newRows = selectedRows.filter((item) => item.malzemeId !== key.key);
    setDataSource(newData);
    setTableData(newData);
    setSelectedRows([...newRows]);
    const deletedRow = dataSource.find((item) => item.key === key.key);
    DeleteUpdatedMaterialReceiptService(deletedRow.siraNo).then((res) =>
      console.log(res.data)
    );
  };

  useEffect(() => {
    setValue("edit_miktar", 1);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setDataSource([]);
      setTableData([]);
      setSelectedRowKeys([]);
      localStorage.setItem("selectedRowKeys", JSON.stringify([]));
      setKeys([]);
      setRows([]);
      setIsSuccess(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    const indirimOrani = +watch("edit_indirimOrani");
    const araToplam = +watch("edit_araToplam");
    const kdvDH = watch("edit_kdv");
    const kdvOrani = +watch("edit_kdvOrani");
    let toplam;
    let result;
    let kdvTutar;
    let indirimTutar;

    if (kdvDH === "haric" || kdvDH === "Hariç") {
      if (indirimOrani) {
        indirimTutar = (araToplam * indirimOrani) / 100;
        result = araToplam - indirimTutar;
        kdvTutar = ((result * kdvOrani) / 100).toFixed(2);
        toplam = (+result + +kdvTutar).toFixed(2);
      } else {
        kdvTutar = (araToplam * (kdvOrani / 100)).toFixed(2);
        toplam = (+araToplam + +kdvTutar).toFixed(2);
      }
    } else if (kdvDH === "dahil" || kdvDH == "Dahil") {
      if (indirimOrani) {
        kdvTutar = (araToplam - araToplam / (1 + kdvOrani / 100)).toFixed(2);
        indirimTutar = (((araToplam - kdvTutar) * indirimOrani) / 100).toFixed(
          2
        );
        result = araToplam - kdvTutar - indirimTutar;
        toplam = +result.toFixed(2) + +kdvTutar;
      } else {
        kdvTutar = (araToplam - araToplam / (1 + kdvOrani / 100)).toFixed(2);
        toplam = +araToplam.toFixed(2);
      }
    }

    setValue("edit_indirimTutari", indirimTutar);
    setValue("edit_kdvTutar", kdvTutar);
    setValue("edit_toplam", toplam);
  }, [
    watch("edit_indirimOrani"),
    watch("edit_araToplam"),
    watch("edit_kdvOrani"),
    watch("edit_kdv"),
    watch("edit_indirimTutari"),
    watch("edit_toplam"),
  ]);

  useEffect(() => {
    if (watch("edit_miktar")) {
      let araToplam = watch("edit_miktar") * watch("edit_fiyat");
      setValue("edit_araToplam", araToplam);
    }
  }, [watch("edit_miktar"), watch("edit_fiyat")]);

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
      }),
    };
  });

  const handleAdd = () => {
    const newRows = selectedRows.map((item) => ({
      key: item.malzemeId,
      malzemeKod: item.malzemeKod,
      malzemeTanim: item.tanim,
      malzemeTipKodText: item.malzemeTipKodText,
      miktar: 1,
      birim: item.birim,
      birimKodId: item.birimKodId,
      fiyat: item.fiyat,
      araToplam: 1 * item.fiyat,
      kdvOran: item.kdvOran,
      toplam: null,
      aciklama: item.aciklama,
      kdvDH: item.kdvDahilHaric ? "Dahil" : "Hariç",
      plaka: item.plaka,
      mlzAracId: item.mlzAracId,
      lokasyonId: watch("lokasyonId"),
      lokasyon: watch("lokasyon"),
      kdvTutar: item.kdvDahilHaric
        ? ((1 * item.fiyat) / (1 + item.kdvOran)).toFixed(2)
        : (1 * item.fiyat * (item.kdvOran / 100)).toFixed(2),
      isPriceChanged: false,
    }));

    const existingKeys = dataSource.map((item) => item.key);

    const hasDublicate = selectedRowKeys.some((key) =>
      existingKeys.includes(key)
    );
    const filteredNewRows = newRows.filter(
      (item) => !existingKeys.includes(item.key)
    );

    if (hasDublicate) {
      message.warning(`Seçilen malzeme listede mevcutdur`);
      return;
    }

    const updatedDataSource = [...dataSource, ...filteredNewRows];
    setDataSource(updatedDataSource);
    setTableData(updatedDataSource);
    setIsModalOpen(false);
    setSelectedRowKeys([]);
    localStorage.setItem("selectedRowKeys", JSON.stringify([]));
    setKeys([]);
    setRows([]);
  };
console.log(tableData)
  const handleEdit = handleSubmit((values) => {
    const key = record.key;
    const index = tableData.findIndex((item) => item.key === key);
    if (index !== -1) {
      const currentFiyat = values.edit_fiyat;
      const originalFiyat = tableData[index].fiyat;

      const newData = [...tableData];
      newData[index] = {
        ...newData[index],
        malzemeTanim: values.edit_malzemeTanimi,
        miktar: values.edit_miktar,
        birim: values.birim,
        birimKodId: values.edit_birim,
        fiyat: values.edit_fiyat,
        araToplam: values.edit_araToplam,
        kdvOran: values.edit_kdvOrani,
        toplam: values.edit_toplam,
        aciklama: values.edit_aciklama,
        indirimOran: values.edit_indirimOrani,
        indirimTutar: values.edit_indirimTutari,
        kdvDH: values.edit_kdv,
        kdvTutar: values.edit_kdvTutar,
        plaka: values.malzeme_plaka,
        mlzAracId: values.edit_plakaId,
        lokasyonId: values.edit_lokasyonId,
        lokasyon: values.edit_lokasyon,
        isPriceChanged: currentFiyat !== originalFiyat,
      };

      setDataSource(newData);
      setTableData(newData);
    }

    setEditModal(false);
  });

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={handleAdd}
    >
      {t("ekle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsModalOpen(false);
        setSelectedRowKeys([]);
        localStorage.setItem("selectedRowKeys", JSON.stringify([]));
        setKeys([]);
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  const editModalFooter = [
    <Button
      key="submit"
      className="btn primary-btn km-update"
      onClick={handleEdit}
    >
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn cancel-btn"
      onClick={() => {
        setEditModal(false);
        setValue("edit_indirimOrani", null);
        setValue("edit_indirimOrani", null);
        setValue("edit_indirimTutari", null);
        setValue("edit_miktar", 1);
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <div className="border p-20 mt-20 relative">
      <Button
        onClick={() => setIsModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          position: "absolute",
          bottom: 10,
          zIndex: 9999,
        }}
      >
        {t("ekle")}
      </Button>
      <Table
        bordered
        dataSource={tableData}
        columns={columns}
        scroll={{ x: 1800 }}
        pagination={{
          ...tableParams.pagination,
          showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
          locale: {
            items_per_page: `/ ${t("sayfa")}`,
          },
        }}
        locale={{
          emptyText: "Veri Bulunamadı",
        }}
        size="small"
      />

      <Modal
        title="Fiş Giriş Detayı"
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1000}
      >
        <MalzemeTable
          setSelectedRows={setSelectedRows}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          keys={keys}
          rows={rows}
          setKeys={setKeys}
          setRows={setRows}
        />
      </Modal>

      <Modal
        title={"Düzenleme"}
        open={editModal}
        onCancel={() => setEditModal(false)}
        maskClosable={false}
        footer={editModalFooter}
        width={1000}
      >
        <div className="grid gap-1">
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("malzemeTanimi")}</label>
              <TextInput name="edit_malzemeTanimi" readonly={true} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("malzemeKodu")}</label>
              <TextInput name="edit_malzemeKod" readonly={true} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("malzemeTipi")}</label>
              <TextInput name="edit_malzemeTip" readonly={true} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("birim")}</label>
              <CodeControl name="birim" codeName="edit_birim" id={300} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("miktar")}</label>
              <Controller
                name="edit_miktar"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    value={watch("edit_miktar")}
                    onPressEnter={(e) => {
                      const result = watch("edit_fiyat") * e.target.value;
                      setValue("edit_araToplam", result);
                    }}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("fiyat")}</label>
              <Controller
                name="edit_fiyat"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onPressEnter={(e) => {
                      const result = watch("edit_miktar") * e.target.value;
                      setValue("edit_araToplam", result);
                    }}
                    onChange={(e) => {
                      field.onChange(e);
                      const result = watch("edit_miktar") * e;
                      setValue("edit_araToplam", result);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("araToplam")}</label>
              <TextInput name="edit_araToplam" readonly={true} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("indirimOrani")} %</label>
              <Controller
                name="edit_indirimOrani"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e);
                      const araToplam = +watch("edit_araToplam");
                      const kdvDH = watch("edit_kdv");
                      const kdvOrani = +watch("edit_kdvOrani");
                      let toplam;
                      let result;
                      let kdvTutar;
                      let indirimTutar;

                      if (kdvDH === "haric" || kdvDH === "Hariç") {
                        if (e) {
                          indirimTutar = (araToplam * e) / 100;
                          result = araToplam - indirimTutar;
                          kdvTutar = (result * kdvOrani) / 100;
                          toplam = +result + +kdvTutar;
                        } else {
                          kdvTutar = araToplam * (kdvOrani / 100);
                          toplam = +araToplam + +kdvTutar;
                        }
                      } else if (kdvDH === "dahil" || kdvDH == "Dahil") {
                        if (e) {
                          kdvTutar = (
                            araToplam -
                            araToplam / (1 + kdvOrani / 100)
                          ).toFixed(2);
                          indirimTutar = (
                            ((araToplam - kdvTutar) * e) /
                            100
                          ).toFixed(2);
                          result = araToplam - kdvTutar - indirimTutar;
                          toplam = +result.toFixed(2);
                        } else {
                          kdvTutar = (
                            araToplam -
                            araToplam / (1 + kdvOrani / 100)
                          ).toFixed(2);
                          toplam = +araToplam.toFixed(2);
                        }
                      }

                      setValue("edit_indirimTutari", indirimTutar);
                      setValue("edit_kdvTutar", kdvTutar);
                      setValue("edit_toplam", toplam);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("indirimTutari")}</label>
              <Controller
                name="edit_indirimTutari"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e);
                      const araToplam = +watch("edit_araToplam");
                      const kdvDH = watch("edit_kdv");
                      const kdvOrani = +watch("edit_kdvOrani");
                      let toplam;
                      let result;
                      let kdvTutar;
                      let indirimOran;

                      if (e) {
                        if (kdvDH === "haric" || kdvDH === "Hariç") {
                          indirimOran = ((e * 100) / araToplam).toFixed(2);
                          result = araToplam - e;
                          kdvTutar = (result * kdvOrani) / 100;
                          toplam = +result + +kdvTutar;
                        } else if (kdvDH === "dahil" || kdvDH == "Dahil") {
                          kdvTutar = (
                            araToplam -
                            araToplam / (1 + kdvOrani / 100)
                          ).toFixed(2);
                          indirimOran = (
                            (100 * e) /
                            (araToplam - kdvTutar)
                          ).toFixed(2);
                          result = araToplam - kdvTutar - e;
                          toplam = +result.toFixed(2);
                        }

                        setValue("edit_indirimOrani", indirimOran);
                      } else {
                        setValue("edit_indirimOrani", null);
                      }
                      setValue("edit_kdvTutar", kdvTutar);
                      setValue("edit_toplam", toplam);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdvOrani")} %</label>
              <NumberInput name="edit_kdvOrani" />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdv")} D/H</label>
              <Controller
                name="edit_kdv"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue="dahil"
                    options={[
                      { value: "dahil", label: <span>Dahil</span> },
                      { value: "haric", label: <span>Hariç</span> },
                    ]}
                    onChange={(e) => field.onChange(e)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdvTutar")}</label>
              <Controller
                name="edit_kdvTutar"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e);
                      const araToplam = +watch("edit_araToplam");
                      const kdvDH = watch("edit_kdv");
                      const toplam = watch("edit_toplam");
                      let kdvOran;

                      if (e) {
                        if (kdvDH === "haric" || kdvDH === "Hariç") {
                          kdvOran = (e * 100) / araToplam;
                        } else if (kdvDH === "dahil" || kdvDH == "Dahil") {
                          kdvOran = ((e * 100) / (toplam - e)).toFixed(2);
                        }
                        setValue("edit_kdvOrani", kdvOran);
                      }
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("toplam")}</label>
              <TextInput name="edit_toplam" readonly={true} />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("plaka")}</label>
              <Plaka name="malzeme_plaka" codeName="edit_plakaId" />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("lokasyon")}</label>
              <Location name="edit_lokasyon" codeName="edit_lokasyonId" />
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="edit_aciklama" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateMalzemeLists;

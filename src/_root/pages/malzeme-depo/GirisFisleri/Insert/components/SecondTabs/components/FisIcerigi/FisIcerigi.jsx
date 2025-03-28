import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Button, Form as AntForm, Input, InputNumber, Popconfirm, Modal, Typography } from "antd";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import Malzemeler from "../../../../../../malzeme/Malzemeler";
import PlakaSelectBox from "../../../../../../../../components/PlakaSelectBox";
import ModalInput from "../../../../../../../../components/form/inputs/ModalInput";
import LokasyonTablo from "../../../../../../../../components/form/LokasyonTable";
import KodIDSelectbox from "../../../../../../../../components/KodIDSelectbox";

const { Text, Link } = Typography;
const { TextArea } = Input;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = AntForm.useForm();
  return (
    <AntForm form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </AntForm>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, inputType, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const formInstance = useContext(EditableContext);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    formInstance.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await formInstance.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <AntForm.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} zorunludur.`,
          },
        ]}
      >
        {inputType === "number" ? <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} /> : <Input ref={inputRef} onPressEnter={save} onBlur={save} />}
      </AntForm.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const MalzemeSecModal = ({ visible, onCancel, onOk }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleMalzemeSelect = (rows) => {
    setSelectedRows(rows);
  };

  return (
    <Modal title="Malzeme Seç" open={visible} onCancel={onCancel} onOk={() => onOk(selectedRows)} width={1200} style={{ top: 20 }}>
      <Malzemeler onRowSelect={handleMalzemeSelect} isSelectionMode={true} />
    </Modal>
  );
};

function FisIcerigi({ modalOpen }) {
  const { control, setValue, watch, getValues } = useFormContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const [currentEditingRow, setCurrentEditingRow] = useState(null);
  const [previousModalState, setPreviousModalState] = useState(false);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fisIcerigi",
    shouldUnregister: true,
  });

  const [dataSource, setDataSource] = useState([]);

  // Safely update dataSource when fields change
  useEffect(() => {
    try {
      setDataSource(fields || []);
    } catch (error) {
      console.error("Error updating dataSource:", error);
      setDataSource([]);
    }
  }, [fields]);

  // Safely handle modal state changes
  useEffect(() => {
    if (modalOpen !== previousModalState) {
      setPreviousModalState(modalOpen);

      if (modalOpen) {
        // Modal just opened, safely reset the table
        try {
          setDataSource([]);
          replace([]);
        } catch (error) {
          console.error("Error resetting dataSource:", error);
        }
      }
    }
  }, [modalOpen, previousModalState, replace]);

  const lokasyon = watch("lokasyon");
  const lokasyonID = watch("lokasyonID");
  const plaka = watch("plaka");
  const plakaID = watch("plakaID");

  // Safely update fields with watched values
  useEffect(() => {
    try {
      if (dataSource.length > 0) {
        const updatedData = dataSource.map((item) => ({
          ...item,
          malzemeLokasyon: item.malzemeLokasyon || lokasyon || "",
          malzemeLokasyonID: item.malzemeLokasyonID || lokasyonID || null,
          malzemePlaka: item.malzemePlaka || plaka || "",
          malzemePlakaId: item.malzemePlakaId || plakaID || null,
        }));

        setDataSource(updatedData);

        // Update form values with try/catch to avoid errors
        updatedData.forEach((item, index) => {
          try {
            setValue(`fisIcerigi.${index}.malzemeLokasyon`, item.malzemeLokasyon);
            setValue(`fisIcerigi.${index}.malzemeLokasyonID`, item.malzemeLokasyonID);
            setValue(`fisIcerigi.${index}.malzemePlaka`, item.malzemePlaka);
            setValue(`fisIcerigi.${index}.malzemePlakaId`, item.malzemePlakaId);
          } catch (error) {
            console.error(`Error updating form values for index ${index}:`, error);
          }
        });
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [lokasyon, lokasyonID, plaka, plakaID, setValue]);

  // Safe handleSave with error handling
  const handleSave = (row) => {
    try {
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.id === item.id);
      if (index < 0) return;

      const item = newData[index];

      // Check if price has changed
      const isPriceChanged = item.fiyat !== row.fiyat;

      // Calculate totals
      const miktar = Number(row.miktar) || 0;
      const fiyat = Number(row.fiyat) || 0;
      const araToplam = miktar * fiyat;
      const indirimOrani = Number(row.indirimOrani) || 0;
      const indirimTutari = (araToplam * indirimOrani) / 100;
      const kdvOrani = Number(row.kdvOrani) || 0;
      const kdvTutar = ((araToplam - indirimTutari) * kdvOrani) / 100;
      const toplam = araToplam - indirimTutari + kdvTutar;

      const updatedRow = {
        ...item,
        ...row,
        birim: item.birim,
        birimKodId: item.birimKodId,
        malzemePlaka: item.malzemePlaka,
        malzemePlakaId: item.malzemePlakaId,
        araToplam,
        indirimTutari,
        kdvTutar,
        toplam,
        isPriceChanged: isPriceChanged || item.isPriceChanged, // Preserve existing isPriceChanged or set to true if price changed
      };

      newData.splice(index, 1, updatedRow);
      setDataSource(newData);

      // Update form value safely
      setTimeout(() => {
        try {
          setValue(`fisIcerigi.${index}`, updatedRow);
        } catch (error) {
          console.error(`Error updating form value for index ${index}:`, error);
        }
      }, 0);
    } catch (error) {
      console.error("Error in handleSave:", error);
    }
  };

  // Safe handleMalzemeSelect with error handling
  const handleMalzemeSelect = (selectedRows) => {
    try {
      selectedRows.forEach((row) => {
        const miktar = 0;
        const fiyat = row.fiyat || 0;
        const araToplam = miktar * fiyat;
        const indirimOrani = 0;
        const indirimTutari = 0;
        const kdvOrani = row.kdvOran || 0;
        const kdvTutar = 0;
        const toplam = 0;

        const newRow = {
          malzemeId: row.malzemeId,
          birimKodId: row.birimKodId,
          malzemeKodu: row.malzemeKod,
          malzemeTanimi: row.tanim,
          malzemeTipi: row.malzemeTipKodText,
          miktar,
          birim: row.birim,
          fiyat,
          araToplam,
          indirimOrani,
          indirimTutari,
          kdvOrani,
          kdvDH: Boolean(row.kdvDahilHaric),
          kdvTutar,
          toplam,
          malzemePlaka: row.malzemePlaka || plaka || "",
          malzemePlakaId: row.malzemePlakaId || plakaID || null,
          malzemeLokasyon: row.lokasyon || lokasyon || "",
          malzemeLokasyonID: row.lokasyonId || lokasyonID || null,
          aciklama: "",
        };

        append(newRow);
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error in handleMalzemeSelect:", error);
      setIsModalVisible(false);
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns = [
    {
      title: "Malzeme Kodu",
      dataIndex: "malzemeKodu",
      key: "malzemeKodu",
      width: 150,
      editable: false,
      inputType: "text",
    },
    {
      title: "Malzeme Tanimi",
      dataIndex: "malzemeTanimi",
      key: "malzemeTanimi",
      width: 200,
      editable: false,
      inputType: "text",
    },
    {
      title: "Malzeme Tipi",
      dataIndex: "malzemeTipi",
      key: "malzemeTipi",
      width: 150,
      editable: false,
      inputType: "text",
    },
    {
      title: "Miktar",
      dataIndex: "miktar",
      key: "miktar",
      width: 100,
      editable: true,
      inputType: "number",
    },
    {
      title: "Birim",
      dataIndex: "birim",
      key: "birim",
      width: 150,
      editable: false,
      render: (_, record, index) => (
        <Controller
          name={`fisIcerigi.${index}.birim`}
          control={control}
          render={({ field }) => (
            <KodIDSelectbox
              {...field}
              name1={`fisIcerigi.${index}.birim`}
              kodID={300}
              isRequired={false}
              onChange={(label, value) => {
                const newData = [...dataSource];
                const item = newData[index];
                newData.splice(index, 1, {
                  ...item,
                  birim: label,
                  birimKodId: value,
                });
                setDataSource(newData);
                setValue(`fisIcerigi.${index}.birim`, label);
                setValue(`fisIcerigi.${index}.birimKodId`, value);
              }}
            />
          )}
        />
      ),
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      key: "fiyat",
      width: 120,
      editable: true,
      inputType: "number",
    },
    {
      title: "Ara Toplam",
      dataIndex: "araToplam",
      key: "araToplam",
      width: 120,
      editable: false,
      inputType: "number",
    },
    {
      title: "İndirim Oranı %",
      dataIndex: "indirimOrani",
      key: "indirimOrani",
      width: 140,
      editable: true,
      inputType: "number",
    },
    {
      title: "İndirim Tutarı",
      dataIndex: "indirimTutari",
      key: "indirimTutari",
      width: 120,
      editable: true,
      inputType: "number",
    },
    {
      title: "KDV Oranı %",
      dataIndex: "kdvOrani",
      key: "kdvOrani",
      width: 120,
      editable: false,
      inputType: "number",
    },
    {
      title: "KDV D/H",
      dataIndex: "kdvDH",
      key: "kdvDH",
      width: 100,
      editable: false,
      ellipsis: true,
      inputType: "text",
      render: (text) => (String(text) === "true" ? "Dahil" : "Haric"),
    },
    {
      title: "KDV Tutarı",
      dataIndex: "kdvTutar",
      key: "kdvTutar",
      width: 120,
      editable: false,
      inputType: "number",
    },
    {
      title: "Toplam",
      dataIndex: "toplam",
      key: "toplam",
      width: 120,
      editable: false,
      inputType: "number",
    },
    {
      title: "Plaka",
      dataIndex: "malzemePlaka",
      key: "malzemePlaka",
      width: 200,
      editable: false,
      render: (_, record, index) => (
        <Controller
          name={`fisIcerigi.${index}.malzemePlaka`}
          control={control}
          render={({ field }) => (
            <PlakaSelectBox
              {...field}
              name1={`fisIcerigi.${index}.malzemePlaka`}
              isRequired={false}
              onChange={(value, option) => {
                const newData = [...dataSource];
                const item = newData[index];
                newData.splice(index, 1, {
                  ...item,
                  malzemePlaka: option?.label || "",
                  malzemePlakaId: value,
                });
                setDataSource(newData);
                setValue(`fisIcerigi.${index}.malzemePlaka`, option?.label || "");
                setValue(`fisIcerigi.${index}.malzemePlakaId`, value);
              }}
            />
          )}
        />
      ),
    },
    {
      title: "Lokasyon",
      dataIndex: "malzemeLokasyon",
      key: "malzemeLokasyon",
      width: 200,
      ellipsis: true,
      visible: true,
      render: (_, record, index) => (
        <Controller
          name={`fisIcerigi.${index}.malzemeLokasyon`}
          control={control}
          render={({ field }) => (
            <ModalInput
              {...field}
              readonly={true}
              required={false}
              onPlusClick={() => {
                setCurrentEditingRow(index);
                setIsLokasyonModalOpen(true);
              }}
              onMinusClick={() => {
                const newData = [...dataSource];
                const item = newData[index];
                newData.splice(index, 1, {
                  ...item,
                  malzemeLokasyon: "",
                  malzemeLokasyonID: null,
                });
                setDataSource(newData);
                field.onChange("");
                setValue(`fisIcerigi.${index}.malzemeLokasyonID`, null);
              }}
            />
          )}
        />
      ),
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      key: "aciklama",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
      width: 100,
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Silmek istediğinize emin misiniz?" onConfirm={() => remove(dataSource.findIndex((item) => item.id === record.id))}>
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

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
        inputType: col.inputType,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Ekle
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id || Math.random().toString(36).substr(2, 9)} // Ensure stable keys
        scroll={{ y: "calc(100vh - 600px)" }}
      />
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",

            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("araToplam")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Controller name="totalAraToplam" control={control} render={({ field }) => <Input {...field} readOnly style={{ flex: 1 }} />} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",

            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("indirim")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Controller name="totalIndirim" control={control} render={({ field }) => <Input {...field} readOnly style={{ flex: 1 }} />} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",

            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("kdvToplam")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Controller name="totalKdvToplam" control={control} render={({ field }) => <Input {...field} readOnly style={{ flex: 1 }} />} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "100%",

            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row" }}>{t("genelToplam")}</Text>
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Controller name="totalGenelToplam" control={control} render={({ field }) => <Input {...field} readOnly style={{ flex: 1 }} />} />
          </div>
        </div>
      </div>

      <MalzemeSecModal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleMalzemeSelect} />
      <LokasyonTablo
        onSubmit={(selectedData) => {
          if (currentEditingRow !== null) {
            try {
              const newData = [...dataSource];
              const item = newData[currentEditingRow];
              newData.splice(currentEditingRow, 1, {
                ...item,
                malzemeLokasyon: selectedData.location,
                malzemeLokasyonID: selectedData.key,
              });
              setDataSource(newData);
              setValue(`fisIcerigi.${currentEditingRow}.malzemeLokasyon`, selectedData.location);
              setValue(`fisIcerigi.${currentEditingRow}.malzemeLokasyonID`, selectedData.key);
              setCurrentEditingRow(null);
            } catch (error) {
              console.error("Error updating lokasyon:", error);
              setCurrentEditingRow(null);
            }
          }
        }}
        isModalVisible={isLokasyonModalOpen}
        setIsModalVisible={setIsLokasyonModalOpen}
      />
    </div>
  );
}

export default FisIcerigi;

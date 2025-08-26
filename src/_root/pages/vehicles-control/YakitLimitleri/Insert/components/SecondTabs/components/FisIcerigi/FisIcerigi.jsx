import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Button, Form as AntForm, Input, InputNumber, Popconfirm, Modal, Typography, message } from "antd";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import Malzemeler from "../../../../../../../malzeme-depo/malzeme/Malzemeler";
import PlakaSelectBox from "../../../../../../../../components/PlakaSelectbox";
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
  const [decimalSeparator, setDecimalSeparator] = useState(".");

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [editing]);

  useEffect(() => {
    const language = localStorage.getItem("i18nextLng") || "en";
    // Set decimal separator based on language
    if (["tr", "az"].includes(language)) {
      setDecimalSeparator(",");
    } else {
      setDecimalSeparator(".");
    }
  }, []);

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
            required: dataIndex !== "aciklama", // Only make fields other than "aciklama" required
            message: `${title} zorunludur.`,
          },
        ]}
      >
        {inputType === "number" ? (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} style={{ width: "100%", textAlign: "center" }} decimalSeparator={decimalSeparator} />
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{ textAlign: "center" }} />
        )}
      </AntForm.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
          textAlign: "center",
          cursor: "pointer",
          minHeight: "22px",
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return (
    <td {...restProps} style={{ ...restProps.style /* textAlign: "center"  */ }}>
      {childNode}
    </td>
  );
};

const MalzemeSecModal = ({ visible, onCancel, onOk }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { watch } = useFormContext();
  const [modalKey, setModalKey] = useState(Date.now());

  const handleMalzemeSelect = (rows) => {
    setSelectedRows(rows);
  };
  useEffect(() => {
    if (visible) {
      setModalKey(Date.now());
    }
  }, [visible]);

  return (
    <Modal title="Malzeme Seç" open={visible} onCancel={onCancel} onOk={() => onOk(selectedRows)} width={1200} style={{ top: 20 }} destroyOnClose>
      <Malzemeler key={modalKey} onRowSelect={handleMalzemeSelect} isSelectionMode={true} />
    </Modal>
  );
};

function FisIcerigi({ modalOpen }) {
  const { control, setValue, watch, getValues } = useFormContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const [currentEditingRow, setCurrentEditingRow] = useState(null);
  const [previousModalState, setPreviousModalState] = useState(false);
  const [isIndirimManuallyEdited, setIsIndirimManuallyEdited] = useState(false);

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fisIcerigi",
    shouldUnregister: true,
  });

  const [dataSource, setDataSource] = useState([]);

  // Add useEffect for calculating totals
  useEffect(() => {
    try {
      const totals = dataSource.reduce(
        (acc, item) => {
          acc.araToplam += Number(item.araToplam) || 0;
          acc.indirim += Number(item.indirimTutari) || 0;
          acc.kdvToplam += Number(item.kdvTutar) || 0;
          acc.genelToplam += Number(item.toplam) || 0;
          return acc;
        },
        {
          araToplam: 0,
          indirim: 0,
          kdvToplam: 0,
          genelToplam: 0,
        }
      );

      // Update form values with calculated totals
      setValue("totalAraToplam", totals.araToplam.toFixed(2));

      // Only update indirim if not manually edited
      if (!isIndirimManuallyEdited) {
        setValue("totalIndirim", totals.indirim.toFixed(2));
      }

      setValue("totalKdvToplam", totals.kdvToplam.toFixed(2));

      // If discount was manually edited, recalculate general total
      if (isIndirimManuallyEdited) {
        const manualIndirim = parseFloat(getValues("totalIndirim")) || 0;
        const newGenelToplam = totals.araToplam - manualIndirim + totals.kdvToplam;
        setValue("totalGenelToplam", newGenelToplam.toFixed(2));
      } else {
        setValue("totalGenelToplam", totals.genelToplam.toFixed(2));
      }
    } catch (error) {
      console.error("Error calculating totals:", error);
    }
  }, [dataSource, setValue, isIndirimManuallyEdited, getValues]);

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
          setIsIndirimManuallyEdited(false); // Reset manual edit state
        } catch (error) {
          console.error("Error resetting dataSource:", error);
        }
      } else {
        // Modal just closed, reset manual edit state
        setIsIndirimManuallyEdited(false);
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

      // Helper function to round to 2 decimal places
      const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

      // Check if price has changed
      const isPriceChanged = item.fiyat !== row.fiyat;

      // Check if discount has changed (either discount rate or amount)
      const isDiscountChanged = item.indirimOrani !== row.indirimOrani || item.indirimTutari !== row.indirimTutari;

      // If discount was edited in table, reset manual edit flag so table calculations take precedence
      if (isDiscountChanged) {
        setIsIndirimManuallyEdited(false);
      }

      // Calculate totals
      const miktar = Number(row.miktar) || 0;
      const fiyat = Number(row.fiyat) || 0;
      const kdvOrani = Number(row.kdvOrani) || 0;
      const kdvDH = Boolean(row.kdvDahilHaric);

      // Exception: Always calculate araToplam as miktar * fiyat regardless of kdvDH
      const araToplam = round(miktar * fiyat);

      let indirimOrani = Number(row.indirimOrani) || 0;
      let indirimTutari = Number(row.indirimTutari) || 0;

      // If indirimOrani was changed
      if (item.indirimOrani !== row.indirimOrani) {
        indirimTutari = round((araToplam * indirimOrani) / 100);
      }
      // If indirimTutari was changed
      else if (item.indirimTutari !== row.indirimTutari) {
        indirimOrani = round((indirimTutari / araToplam) * 100);
      }

      // Calculate KDV amount based on kdvDH
      const kdvMatrah = round(araToplam - indirimTutari);
      let kdvTutar;

      if (kdvDH) {
        // If KDV is inclusive, calculate KDV portion from the price
        const baseAmount = round(kdvMatrah / (1 + kdvOrani / 100));
        kdvTutar = round(kdvMatrah - baseAmount);
      } else {
        // If KDV is exclusive, calculate KDV as additional
        kdvTutar = round(kdvMatrah * (kdvOrani / 100));
      }

      // Calculate total
      const toplam = kdvDH ? round(kdvMatrah) : round(kdvMatrah + kdvTutar);

      const updatedRow = {
        ...item,
        ...row,
        birim: item.birim,
        birimKodId: item.birimKodId,
        malzemePlaka: item.malzemePlaka,
        malzemePlakaId: item.malzemePlakaId,
        araToplam,
        indirimOrani: round(indirimOrani),
        indirimTutari: round(indirimTutari),
        kdvTutar: round(kdvTutar),
        toplam: round(toplam),
        isPriceChanged: isPriceChanged || item.isPriceChanged,
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
      // Get existing malzemeIds from the current dataSource
      const existingMalzemeIds = new Set(dataSource.map((item) => item.malzemeId));

      // Filter out already existing materials
      const newRows = selectedRows.filter((row) => !existingMalzemeIds.has(row.malzemeId));

      // If all selected materials already exist, show a warning
      if (newRows.length === 0) {
        message.warning("Seçilen malzemeler zaten tabloda mevcut.");
        setIsModalVisible(false);
        return;
      }

      // If some materials were filtered out, show an info message
      if (newRows.length < selectedRows.length) {
        message.info(`${selectedRows.length - newRows.length} malzeme zaten tabloda mevcut olduğu için eklenmedi.`);
      }

      // Helper function to round to 2 decimal places
      const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

      newRows.forEach((row) => {
        const miktar = 1;
        const fiyat = row.fiyat || 0;
        const kdvOrani = row.kdvOran || 0;
        const kdvDH = Boolean(row.kdvDahilHaric);

        // Exception: Always calculate araToplam as miktar * fiyat regardless of kdvDH
        const araToplam = round(miktar * fiyat);
        const indirimOrani = 0;
        const indirimTutari = 0;
        const kdvMatrah = round(araToplam - indirimTutari);

        let kdvTutar;
        if (kdvDH) {
          // If KDV is inclusive, calculate KDV portion from the price
          const baseAmount = round(kdvMatrah / (1 + kdvOrani / 100));
          kdvTutar = round(kdvMatrah - baseAmount);
        } else {
          // If KDV is exclusive, calculate KDV as additional
          kdvTutar = round(kdvMatrah * (kdvOrani / 100));
        }

        // Calculate total based on kdvDH
        const toplam = kdvDH ? round(kdvMatrah) : round(kdvMatrah + kdvTutar);

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
          kdvDahilHaric: kdvDH,
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
      message.error("Malzeme eklenirken bir hata oluştu.");
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
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"))}</span>
        </div>
      ),
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
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      ),
    },
    {
      title: "Ara Toplam",
      dataIndex: "araToplam",
      key: "araToplam",
      width: 120,
      editable: false,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      ),
    },
    {
      title: "İndirim %",
      dataIndex: "indirimOrani",
      key: "indirimOrani",
      width: 80,
      editable: true,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"))}</span>
        </div>
      ),
    },
    {
      title: "İndirim Tutarı",
      dataIndex: "indirimTutari",
      key: "indirimTutari",
      width: 120,
      editable: true,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      ),
    },
    {
      title: "KDV %",
      dataIndex: "kdvOrani",
      key: "kdvOrani",
      width: 80,
      editable: false,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"))}</span>
        </div>
      ),
    },
    {
      title: "KDV D/H",
      dataIndex: "kdvDahilHaric",
      key: "kdvDahilHaric",
      width: 100,
      editable: false,
      ellipsis: true,
      inputType: "text",
      render: (value) => (value ? "Dahil" : "Haric"),
    },
    {
      title: "KDV Tutarı",
      dataIndex: "kdvTutar",
      key: "kdvTutar",
      width: 120,
      editable: false,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      ),
    },
    {
      title: "Toplam",
      dataIndex: "toplam",
      key: "toplam",
      width: 120,
      editable: false,
      inputType: "number",
      render: (text, record) => (
        <div className="">
          <span>{Number(text).toLocaleString(localStorage.getItem("i18nextLng"), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      ),
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
      ellipsis: true,
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
    <div style={{ marginTop: "-55px", zIndex: 10 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Button style={{ zIndex: 21 }} type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          Ekle
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        size="small"
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey={(record) => record.id || Math.random().toString(36).substr(2, 9)} // Ensure stable keys
        scroll={{ y: "calc(100vh - 540px)" }}
      />
      <div style={{ display: "flex", flexFlow: "column wrap", gap: "10px", marginTop: "20px", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ width: "100%", maxWidth: "830px" }}>
          <Controller name="aciklama" render={({ field }) => <TextArea {...field} rows={4} placeholder="Açıklama" style={{ width: "100%", minHeight: "160px" }} />} />
        </div>
        <div style={{ width: "100%", maxWidth: "400px", display: "flex", flexFlow: "wrap", gap: "10px", flexDirection: "column", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "400px",
              gap: "10px",
            }}
          >
            <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row", fontWeight: 600 }}>{t("araToplam")}</Text>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: "250px",
              }}
            >
              <Controller
                name="totalAraToplam"
                control={control}
                render={({ field }) => {
                  // Determine decimal separator based on language
                  const language = localStorage.getItem("i18nextLng") || "en";
                  const decimalSeparator = ["tr", "az"].includes(language) ? "," : ".";

                  return <InputNumber {...field} readOnly style={{ width: "100%" }} decimalSeparator={decimalSeparator} precision={2} />;
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "400px",
              gap: "10px",
              flexDirection: "row",
            }}
          >
            <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row", fontWeight: 600 }}>{t("indirim")}</Text>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: "250px",
              }}
            >
              <Controller
                name="totalIndirim"
                control={control}
                render={({ field }) => {
                  // Determine decimal separator based on language
                  const language = localStorage.getItem("i18nextLng") || "en";
                  const decimalSeparator = ["tr", "az"].includes(language) ? "," : ".";

                  return (
                    <InputNumber
                      {...field}
                      style={{ width: "100%" }}
                      decimalSeparator={decimalSeparator}
                      precision={2}
                      onChange={(value) => {
                        try {
                          // With InputNumber, value is already a number (or null)
                          const numValue = value || 0;

                          // Mark as manually edited
                          setIsIndirimManuallyEdited(true);

                          // Update the totalIndirim field - store with decimals but display as rounded
                          field.onChange(numValue.toFixed(2));
                          setValue("totalIndirim", numValue.toFixed(2));

                          // Get current values
                          const araToplam = parseFloat(getValues("totalAraToplam")) || 0;
                          const kdvToplam = parseFloat(getValues("totalKdvToplam")) || 0;

                          // Recalculate general total (araToplam - indirim + kdvToplam)
                          const newGenelToplam = araToplam - numValue + kdvToplam;

                          // Update the general total
                          setValue("totalGenelToplam", newGenelToplam.toFixed(2));
                        } catch (error) {
                          console.error("Error updating discount:", error);
                        }
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "400px",
              gap: "10px",
              flexDirection: "row",
            }}
          >
            <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row", fontWeight: 600 }}>{t("kdvToplam")}</Text>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: "250px",
              }}
            >
              <Controller
                name="totalKdvToplam"
                control={control}
                render={({ field }) => {
                  // Determine decimal separator based on language
                  const language = localStorage.getItem("i18nextLng") || "en";
                  const decimalSeparator = ["tr", "az"].includes(language) ? "," : ".";

                  return <InputNumber {...field} readOnly style={{ width: "100%" }} decimalSeparator={decimalSeparator} precision={2} />;
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "400px",
              gap: "10px",
              flexDirection: "row",
            }}
          >
            <Text style={{ display: "flex", fontSize: "14px", flexDirection: "row", fontWeight: 600 }}>{t("genelToplam")}</Text>
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                alignItems: "flex-start",
                width: "100%",
                maxWidth: "250px",
              }}
            >
              <Controller
                name="totalGenelToplam"
                control={control}
                render={({ field }) => {
                  // Determine decimal separator based on language
                  const language = localStorage.getItem("i18nextLng") || "en";
                  const decimalSeparator = ["tr", "az"].includes(language) ? "," : ".";

                  return <InputNumber {...field} readOnly style={{ width: "100%" }} decimalSeparator={decimalSeparator} precision={2} />;
                }}
              />
            </div>
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

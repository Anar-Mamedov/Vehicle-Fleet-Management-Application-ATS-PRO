import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Button, Form as AntForm, Input, InputNumber, Popconfirm } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";

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
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
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

function FisIcerigi() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fisIcerigi",
  });

  const [dataSource, setDataSource] = useState(fields);

  useEffect(() => {
    setDataSource(fields);
  }, [fields]);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
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
      editable: true,
      inputType: "text",
    },
    {
      title: "Malzeme Tanimi",
      dataIndex: "malzemeTanimi",
      key: "malzemeTanimi",
      width: 200,
      editable: true,
      inputType: "text",
    },
    {
      title: "Malzeme Tipi",
      dataIndex: "malzemeTipi",
      key: "malzemeTipi",
      width: 150,
      editable: true,
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
      width: 100,
      editable: true,
      inputType: "text",
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
      editable: true,
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
      editable: true,
      inputType: "number",
    },
    {
      title: "KDV D/H",
      dataIndex: "kdvDH",
      key: "kdvDH",
      width: 100,
      editable: true,
      inputType: "text",
    },
    {
      title: "KDV Tutarı",
      dataIndex: "kdvTutar",
      key: "kdvTutar",
      width: 120,
      editable: true,
      inputType: "number",
    },
    {
      title: "Toplam",
      dataIndex: "toplam",
      key: "toplam",
      width: 120,
      editable: true,
      inputType: "number",
    },
    {
      title: "Plaka",
      dataIndex: "plaka",
      key: "plaka",
      width: 120,
      editable: true,
      inputType: "text",
    },
    {
      title: "Lokasyon",
      dataIndex: "lokasyon",
      key: "lokasyon",
      width: 150,
      editable: true,
      inputType: "text",
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
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
      <Button
        type="dashed"
        onClick={() =>
          append({
            malzemeKodu: "",
            malzemeTanimi: "",
            malzemeTipi: "",
            miktar: 0,
            birim: "",
            fiyat: 0,
            araToplam: 0,
            indirimOrani: 0,
            indirimTutari: 0,
            kdvOrani: 0,
            kdvDH: "",
            kdvTutar: 0,
            toplam: 0,
            plaka: "",
            lokasyon: "",
            aciklama: "",
          })
        }
        style={{ marginTop: 16 }}
        block
      >
        Yeni Satır Ekle
      </Button>
    </div>
  );
}

export default FisIcerigi;

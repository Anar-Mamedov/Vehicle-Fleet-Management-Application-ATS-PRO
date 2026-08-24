import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import NumberInput from "../../../../components/form/inputs/NumberInput";

// Kod listelerinin backend'deki numaraları (hareket formundaki değerlerle aynı)
const VARDIYA_KOD_ID = 917;
const YUKLEME_BIRIM_KOD_ID = 300;

// Tablodan doğrudan güncellenebilen sütunlar.
// `requestKey`, satır güncelleme servisinin (UpdateExpeditionOperationRow) beklediği anahtardır.
export const EDITABLE_COLUMNS = {
  vardiya: { dataIndex: "vardiya", requestKey: "vardiya", type: "code", kodID: VARDIYA_KOD_ID },
  planlananMiktar: { dataIndex: "planlananMiktar", requestKey: "planlanan", type: "number" },
  gerceklesenMiktar: { dataIndex: "gerceklesenMiktar", requestKey: "gerceklesen", type: "number" },
  yuklemeBirim: { dataIndex: "yuklemeBirim", requestKey: "birim", type: "code", kodID: YUKLEME_BIRIM_KOD_ID },
  hakedisTutar: { dataIndex: "hakedisTutar", requestKey: "hakedisTutar", type: "number" },
  birimFiyat: { dataIndex: "birimFiyat", requestKey: "birimFiyat", type: "number" },
};

// Düzenleyici kendi form bağlamında çalışır; sayfadaki filtre formuyla alan adları çakışmaz
const FIELD_NAME = "hucreDegeri";

// Hücrenin tıklanabilir olduğu, üzerine gelindiğinde beliren çerçeveyle gösterilir.
// Yatay negatif margin, çerçevenin metni diğer sütunlara göre kaydırmasını engeller.
const EditableValue = styled.div`
  line-height: 22px;
  padding: 4px 7px;
  margin: 0 -7px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    border-color: #d9d9d9;
    background-color: #fafafa;
  }
`;

// Dar sütunlarda giriş alanına yer açmak için hücrenin yatay boşluğu kullanılır
const EditorWrapper = styled.div`
  margin: 0 -7px;
`;

const CellEditor = ({ record, column, onSave, onCancel }) => {
  const methods = useForm({
    defaultValues: {
      [FIELD_NAME]: record[column.dataIndex] ?? null,
      [`${FIELD_NAME}ID`]: null,
    },
  });
  const wrapperRef = useRef(null);
  // Kaydetme ve vazgeçme yalnızca bir kez çalışır; Enter sonrası gelen blur ikinci istek açmaz
  const finishedRef = useRef(false);

  // Global form bileşenleri odak prop'u almadığı için hücre açılınca içindeki alan doğrudan odaklanır
  useEffect(() => {
    const input = wrapperRef.current?.querySelector("input");
    input?.focus();
    input?.select?.();
  }, []);

  const finish = (value) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onSave(record, column, value);
  };

  const cancel = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onCancel();
  };

  // Sayı hücresi odak kaybında kaydedilir; değer değişmemişse servise istek gitmez
  const handleNumberBlur = () => {
    const value = Number(methods.getValues(FIELD_NAME)) || 0;

    if (value === (Number(record[column.dataIndex]) || 0)) {
      cancel();
      return;
    }

    finish(value);
  };

  const handleNumberKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
      return;
    }

    if (event.key === "Escape") {
      cancel();
    }
  };

  // Kod hücresinde seçim yapılır yapılmaz kaydedilir; seçim temizlenirse alan boşaltılır
  const handleCodeChange = (value) => finish(value || 0);

  // Seçim yapılmadan düzenleyicinin dışına çıkıldığında hücre kapanır.
  // Kod ekleme kutusu açılır listenin içinde (portal) durduğu için oraya geçen odakta hücre açık kalır.
  const handleCodeBlur = (event) => {
    const nextTarget = event.relatedTarget;

    if (event.currentTarget.contains(nextTarget) || nextTarget?.closest?.(".ant-select-dropdown")) return;

    cancel();
  };

  if (column.type === "code") {
    return (
      <FormProvider {...methods}>
        <EditorWrapper ref={wrapperRef} onBlur={handleCodeBlur}>
          <KodIDSelectbox name1={FIELD_NAME} kodID={column.kodID} isRequired={false} onChange={handleCodeChange} inputWidth="100%" dropdownWidth="220px" />
        </EditorWrapper>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <EditorWrapper ref={wrapperRef} onKeyDown={handleNumberKeyDown}>
        <NumberInput name={FIELD_NAME} onBlur={handleNumberBlur} />
      </EditorWrapper>
    </FormProvider>
  );
};

CellEditor.propTypes = {
  record: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

// Tablonun gövde hücresi: düzenlenebilir sütunlarda tıklanınca giriş alanına dönüşür,
// diğer sütunlarda Ant Design'ın varsayılan hücresi gibi davranır.
const EditableCell = ({ record, editableColumn, editing, onStartEdit, onSave, onCancel, children, ...restProps }) => {
  if (!editableColumn) {
    return <td {...restProps}>{children}</td>;
  }

  const startEdit = () => onStartEdit(record, editableColumn);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startEdit();
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <CellEditor record={record} column={editableColumn} onSave={onSave} onCancel={onCancel} />
      ) : (
        <EditableValue role="button" tabIndex={0} onClick={startEdit} onKeyDown={handleKeyDown}>
          {children}
        </EditableValue>
      )}
    </td>
  );
};

EditableCell.propTypes = {
  record: PropTypes.object,
  editableColumn: PropTypes.object,
  editing: PropTypes.bool,
  onStartEdit: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
};

export default EditableCell;

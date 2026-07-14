import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Spin, message } from "antd";
import { useTranslation } from "react-i18next";
import { GetLegacyDocumentTypesService } from "../../../api/services/upload/services";

const normalizeOptions = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item) => ({
      label: item?.DST_TANIM ?? item?.dosyaTip,
      value: item?.TB_DOSYA_TIP_ID ?? item?.dosyaTipKodId,
    }))
    .filter((item) => item.label && item.value !== undefined && item.value !== null);

const mergeOptions = (options, currentOption) => {
  const mergedOptions = currentOption?.label && currentOption?.value ? [currentOption, ...options] : options;
  return mergedOptions.filter((item, index, allItems) => allItems.findIndex((candidate) => candidate.value === item.value) === index);
};

const DocumentTypeSelect = () => {
  const { t } = useTranslation();
  const { control, setValue, watch } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const documentTypeId = watch("dosyaTipKodId");
  const documentTypeLabel = watch("dosyaTip");

  useEffect(() => {
    if (documentTypeId && documentTypeLabel) {
      setOptions((currentOptions) => mergeOptions(currentOptions, { label: documentTypeLabel, value: documentTypeId }));
    }
  }, [documentTypeId, documentTypeLabel]);

  const fetchOptions = async () => {
    setLoading(true);

    try {
      const response = await GetLegacyDocumentTypesService();
      const fetchedOptions = normalizeOptions(response?.data?.data ?? response?.data);

      const currentOption = documentTypeId && documentTypeLabel ? { label: documentTypeLabel, value: documentTypeId } : null;
      setOptions(mergeOptions(fetchedOptions, currentOption));
    } catch {
      message.error(t("dosyaDetayBelgeTipleriAlinamadi"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Controller
        name="dosyaTip"
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            value={documentTypeId || undefined}
            onBlur={field.onBlur}
            showSearch
            allowClear
            placeholder={t("seciniz")}
            optionFilterProp="label"
            filterOption={(input, option) =>
              String(option?.label || "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onDropdownVisibleChange={(open) => {
              if (open) {
                fetchOptions();
              }
            }}
            notFoundContent={loading ? <Spin size="small" /> : null}
            options={options}
            onChange={(value, option) => {
              field.onChange(option?.label || null);
              setValue("dosyaTipKodId", value || 0, { shouldDirty: true });
            }}
          />
        )}
      />
      <Controller name="dosyaTipKodId" control={control} render={({ field }) => <input {...field} type="hidden" />} />
    </>
  );
};

export default DocumentTypeSelect;

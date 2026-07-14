import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Input, InputNumber, Modal, Spin, Switch, message } from "antd";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import dayjs from "dayjs";
import DateInput from "../form/date/DateInput";
import { GetDocumentInfoByIdService, UpdateDocumentService } from "../../../api/services/upload/services";
import DocumentTypeSelect from "./DocumentTypeSelect";

const { TextArea } = Input;

const DEFAULT_VALUES = {
  dosyaTip: null,
  dosyaTipKodId: 0,
  dosyaBelgeNo: "",
  dosyaBaslangicTarih: null,
  dosyaBitisTarih: null,
  dosyaHatirlatmaSuresi: 0,
  dosyaHatirlat: false,
  dosyaAciklama: "",
};

const Description = styled.p`
  margin: -4px 0 18px;
  color: #595959;
  font-size: 13px;
  line-height: 20px;
`;

const SummaryCard = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 16px;
  margin-bottom: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
`;

const SummaryIcon = styled.span`
  flex: 0 0 auto;
  color: ${({ $color }) => $color};
  font-size: 34px;
  line-height: 1;
`;

const SummaryInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

const SummaryName = styled.div`
  overflow: hidden;
  color: #262626;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SummaryMeta = styled.div`
  margin-top: 3px;
  color: #8c8c8c;
  font-size: 12px;
  line-height: 18px;
`;

const SummaryActions = styled.div`
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;

  & > .ant-select,
  & > .ant-input-number,
  & > .ant-picker {
    width: 100%;
  }
`;

const FullWidthField = styled(FormField)`
  grid-column: 1 / -1;
`;

const FieldLabel = styled.label`
  color: #262626;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
`;

const RequiredMark = styled.span`
  margin-left: 3px;
  color: #ff4d4f;
`;

const ReminderSwitch = styled.div`
  display: flex;
  min-height: 32px;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 4px 11px;
  color: #595959;
  font-size: 14px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const ValidationText = styled.span`
  color: #ff4d4f;
  font-size: 12px;
  line-height: 18px;
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 18px;
`;

const toDayjsOrNull = (value) => {
  if (!value) {
    return null;
  }

  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate : null;
};

const toIsoOrNull = (value) => {
  if (!value) {
    return null;
  }

  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.toISOString() : null;
};

const DocumentDetailModal = ({ open, file, visual, onClose, onPreview, onDownload, onUpdated }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [documentInfo, setDocumentInfo] = useState(null);
  const methods = useForm({ defaultValues: DEFAULT_VALUES });
  const { clearErrors, control, handleSubmit, reset, watch } = methods;
  const reminderEnabled = watch("dosyaHatirlat");
  const DocumentIcon = visual?.icon;

  useEffect(() => {
    if (!open || !file?.tbDosyaId) {
      return undefined;
    }

    let active = true;

    const fetchDocumentInfo = async () => {
      setLoading(true);
      setDocumentInfo(null);
      reset(DEFAULT_VALUES);

      try {
        const response = await GetDocumentInfoByIdService(file.tbDosyaId);
        const info = response?.data;

        if (!active || !info) {
          return;
        }

        setDocumentInfo(info);
        reset({
          dosyaTip: info.dosyaTip || null,
          dosyaTipKodId: info.dosyaTipKodId || 0,
          dosyaBelgeNo: info.dosyaBelgeNo || "",
          dosyaBaslangicTarih: toDayjsOrNull(info.dosyaBaslangicTarih),
          dosyaBitisTarih: toDayjsOrNull(info.dosyaBitisTarih),
          dosyaHatirlatmaSuresi: info.dosyaHatirlatmaSuresi || 0,
          dosyaHatirlat: Boolean(info.dosyaHatirlat),
          dosyaAciklama: info.dosyaAciklama || "",
        });
      } catch {
        if (active) {
          message.error(t("dosyaDetayBilgileriAlinamadi"));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchDocumentInfo();

    return () => {
      active = false;
    };
  }, [file?.tbDosyaId, open, reset, t]);

  const handleClose = () => {
    if (!saving) {
      setDocumentInfo(null);
      reset(DEFAULT_VALUES);
      onClose();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!documentInfo?.tbDosyaId) {
      return;
    }

    const body = {
      tbDosyaId: documentInfo.tbDosyaId,
      dosyaTipKodId: Number(values.dosyaTipKodId) || 0,
      dosyaBelgeNo: values.dosyaBelgeNo?.trim() || "",
      dosyaBaslangicTarih: toIsoOrNull(values.dosyaBaslangicTarih),
      dosyaBitisTarih: toIsoOrNull(values.dosyaBitisTarih),
      dosyaHatirlatmaSuresi: values.dosyaHatirlat ? Number(values.dosyaHatirlatmaSuresi) || 0 : 0,
      dosyaHatirlat: Boolean(values.dosyaHatirlat),
      dosyaAciklama: values.dosyaAciklama?.trim() || "",
    };

    setSaving(true);

    try {
      await UpdateDocumentService(body);
      message.success(t("dosyaDetayGuncellemeBasarili"));
      await onUpdated?.();
      setDocumentInfo(null);
      reset(DEFAULT_VALUES);
      onClose();
    } catch {
      message.error(t("dosyaDetayGuncellemeBasarisiz"));
    } finally {
      setSaving(false);
    }
  });

  const currentFile = documentInfo || file;
  const extensionLabel = currentFile?.dosyaUzanti ? currentFile.dosyaUzanti.replace(".", "").toUpperCase() : "-";

  return (
    <Modal open={open} title={t("dosyaDetayBaslik")} width={760} centered footer={null} destroyOnClose maskClosable={!saving} onCancel={handleClose}>
      <FormProvider {...methods}>
        <Spin spinning={loading}>
          <Description>{t("dosyaDetayAciklama")}</Description>

          <SummaryCard>
            {DocumentIcon && (
              <SummaryIcon $color={visual.color}>
                <DocumentIcon />
              </SummaryIcon>
            )}
            <SummaryInfo>
              <SummaryName>{currentFile?.dosyaAd || "-"}</SummaryName>
              <SummaryMeta>{extensionLabel}</SummaryMeta>
            </SummaryInfo>
            <SummaryActions>
              <Button type="link" icon={<EyeOutlined />} onClick={() => onPreview(currentFile)} disabled={!currentFile}>
                {t("dosyaMenuGoruntule")}
              </Button>
              <Button type="link" icon={<DownloadOutlined />} onClick={() => onDownload(currentFile)} disabled={!currentFile}>
                {t("indir")}
              </Button>
            </SummaryActions>
          </SummaryCard>

          <form onSubmit={onSubmit}>
            <FormGrid>
              <FormField>
                <FieldLabel>{t("dosyaDetayBelgeTipi")}</FieldLabel>
                <DocumentTypeSelect />
              </FormField>

              <FormField>
                <FieldLabel htmlFor="dosyaBelgeNo">{t("belgeNo")}</FieldLabel>
                <Controller
                  name="dosyaBelgeNo"
                  control={control}
                  render={({ field }) => <Input {...field} id="dosyaBelgeNo" maxLength={100} placeholder={t("dosyaDetayBelgeNoPlaceholder")} />}
                />
              </FormField>

              <FormField>
                <FieldLabel>{t("dosyaDetayBaslangicTarihi")}</FieldLabel>
                <DateInput name="dosyaBaslangicTarih" placeholder={t("dosyaDetayTarihSeciniz")} style={{ width: "100%" }} />
              </FormField>

              <FormField>
                <FieldLabel>
                  {t("dosyaDetayBitisTarihi")}
                  {reminderEnabled && <RequiredMark aria-hidden="true">*</RequiredMark>}
                </FieldLabel>
                <DateInput
                  name="dosyaBitisTarih"
                  placeholder={t("dosyaDetayTarihSeciniz")}
                  required={reminderEnabled}
                  requiredMessage={t("dosyaDetayBitisTarihiZorunlu")}
                  style={{ width: "100%" }}
                />
              </FormField>

              <FormField>
                <FieldLabel htmlFor="dosyaHatirlatmaSuresi">
                  {t("dosyaDetayHatirlatmaSuresi")}
                  {reminderEnabled && <RequiredMark aria-hidden="true">*</RequiredMark>}
                </FieldLabel>
                <Controller
                  name="dosyaHatirlatmaSuresi"
                  control={control}
                  rules={{
                    validate: (value) => !reminderEnabled || Number(value) > 0 || t("dosyaDetayHatirlatmaSuresiZorunlu"),
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <InputNumber
                        {...field}
                        id="dosyaHatirlatmaSuresi"
                        min={reminderEnabled ? 1 : 0}
                        precision={0}
                        disabled={!reminderEnabled}
                        status={fieldState.error ? "error" : undefined}
                        addonAfter={t("gun").toLocaleLowerCase()}
                        onChange={(value) => field.onChange(value || 0)}
                      />
                      {fieldState.error && <ValidationText>{fieldState.error.message}</ValidationText>}
                    </>
                  )}
                />
              </FormField>

              <FormField>
                <FieldLabel>{t("dosyaDetayHatirlatici")}</FieldLabel>
                <ReminderSwitch>
                  <span>{t("dosyaDetayHatirlat")}</span>
                  <Controller
                    name="dosyaHatirlat"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onChange={(checked) => {
                          field.onChange(checked);
                          if (!checked) {
                            clearErrors(["dosyaBitisTarih", "dosyaHatirlatmaSuresi"]);
                          }
                        }}
                      />
                    )}
                  />
                </ReminderSwitch>
              </FormField>

              <FullWidthField>
                <FieldLabel htmlFor="dosyaAciklama">{t("aciklama")}</FieldLabel>
                <Controller
                  name="dosyaAciklama"
                  control={control}
                  render={({ field }) => <TextArea {...field} id="dosyaAciklama" rows={4} maxLength={500} showCount placeholder={t("dosyaDetayAciklamaPlaceholder")} />}
                />
              </FullWidthField>

              <FullWidthField>
                <Alert showIcon type="info" message={t("dosyaDetayBilgilendirme")} />
              </FullWidthField>
            </FormGrid>

            <Footer>
              <Button onClick={handleClose} disabled={saving}>
                {t("dosyaDetayVazgec")}
              </Button>
              <Button type="primary" htmlType="submit" loading={saving} disabled={loading || !documentInfo}>
                {t("kaydet")}
              </Button>
            </Footer>
          </form>
        </Spin>
      </FormProvider>
    </Modal>
  );
};

DocumentDetailModal.propTypes = {
  open: PropTypes.bool,
  file: PropTypes.shape({
    tbDosyaId: PropTypes.number,
    dosyaAd: PropTypes.string,
    dosyaUzanti: PropTypes.string,
  }),
  visual: PropTypes.shape({
    icon: PropTypes.elementType,
    color: PropTypes.string,
  }),
  onClose: PropTypes.func,
  onPreview: PropTypes.func,
  onDownload: PropTypes.func,
  onUpdated: PropTypes.func,
};

export default DocumentDetailModal;

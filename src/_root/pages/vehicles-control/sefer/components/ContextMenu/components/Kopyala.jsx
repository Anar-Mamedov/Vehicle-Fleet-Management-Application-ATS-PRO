import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Typography, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { t } from "i18next";
import DateInput from "../../../../../../components/form/date/DateInput";
import { formatDateAndTimeForApi } from "../../../../../../../utils/dateUtils";
import { DuplicateExpeditionsWithDateService } from "../../../../../../../api/services/vehicles/operations_services";
import FormField from "../../FormField";

const { Text } = Typography;

const DEFAULT_VALUES = { kopyalamaTarihi: null };

const FULL_WIDTH = { width: "100%" };

export default function Kopyala({ selectedRows, refreshTableData, hidePopover }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const methods = useForm({ defaultValues: DEFAULT_VALUES });
  const { handleSubmit, reset } = methods;

  const closeModal = () => {
    setIsModalOpen(false);
    reset(DEFAULT_VALUES);
  };

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      const body = {
        siraNos: selectedRows.map((row) => row.siraNo),
        // Saat seçilmediği için günün başlangıcı gönderilir: "YYYY-MM-DDT00:00:00"
        tarih: formatDateAndTimeForApi(values.kopyalamaTarihi),
      };

      const response = await DuplicateExpeditionsWithDateService(body);
      const statusCode = response?.data?.statusCode;

      if ([200, 201, 202, 204].includes(statusCode)) {
        message.success(t("islemBasarili"));
        closeModal();
        hidePopover();
        refreshTableData();
        return;
      }

      message.error(statusCode === 401 ? t("buIslemiYapmayaYetkinizYok") : t("islemBasarisiz"));
    } catch {
      message.error(t("islemBasarisiz"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button style={{ paddingLeft: "0px" }} type="link" icon={<CopyOutlined />} onClick={() => setIsModalOpen(true)}>
        {t("kopyala")}
      </Button>

      <Modal
        title={t("operasyonlariKopyala")}
        open={isModalOpen}
        onOk={handleSubmit(onSubmit)}
        onCancel={closeModal}
        okText={t("kopyala")}
        cancelText={t("iptal")}
        confirmLoading={saving}
        maskClosable={false}
      >
        <FormProvider {...methods}>
          <div className="grid gap-2">
            <div className="col-span-12">
              <Text>{t("operasyonKopyalamaAciklama", { adet: selectedRows.length })}</Text>
            </div>
            <FormField span={12} label={t("kopyalamaTarihi")} required>
              <DateInput name="kopyalamaTarihi" required requiredMessage={t("alanBosBirakilamaz")} style={FULL_WIDTH} />
            </FormField>
          </div>
        </FormProvider>
      </Modal>
    </>
  );
}

Kopyala.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  refreshTableData: PropTypes.func.isRequired,
  hidePopover: PropTypes.func.isRequired,
};

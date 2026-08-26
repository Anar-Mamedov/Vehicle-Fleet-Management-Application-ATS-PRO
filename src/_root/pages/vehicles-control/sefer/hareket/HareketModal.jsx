import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Spin, message } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { formatDateForApi, formatTimeForApi, toDayjsOrNull, toTimeDayjsOrNull } from "../../../../../utils/dateUtils";
import {
  AddExpeditionOperationItemService,
  GetExpeditionOperationItemByIdService,
  UpdateExpeditionOperationItemService,
} from "../../../../../api/services/vehicles/operations_services";
import HareketForm from "./HareketForm";

const DEFAULT_WIDTH = 1400;

// Servis boş değerleri "" / 0 döndürüyor; select'e boş string veya 0 yazılırsa placeholder görünmez
const toNullable = (value) => (value === "" || value === undefined ? null : value);
const toNullableId = (value) => (value === 0 || value === "" || value === undefined ? null : value);

const HareketModal = ({ open, seferOprId, expId, initialValues, defaultValues, onSave, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const methods = useForm();
  const { handleSubmit, reset, setValue } = methods;

  const isUpdate = Boolean(seferOprId);
  // Toplu operasyon sihirbazında kayıt henüz oluşmadığı için hareket servise gönderilmez,
  // form değerleri `onSave` ile üst bileşene verilir.
  const isLocal = typeof onSave === "function";

  useEffect(() => {
    if (!open) return;

    reset();
    setExpanded(false);

    if (isLocal) {
      if (initialValues) reset(initialValues);
      return;
    }

    if (!isUpdate) {
      if (defaultValues) reset(defaultValues);
      return;
    }

    setLoading(true);
    GetExpeditionOperationItemByIdService(seferOprId)
      .then((res) => {
        const item = res?.data;
        if (!item) return;

        setValue("oprTip", toNullable(item.oprTip));
        setValue("oprTipID", toNullableId(item.oprTipKodId));
        setValue("durum", toNullable(item.durum));
        setValue("durumID", toNullableId(item.durumKodId));
        setValue("firmaUnvan", toNullable(item.firmaUnvan));
        setValue("firmaId", toNullableId(item.firmaId));
        setValue("guzergah", toNullable(item.guzergah));
        setValue("guzergahId", toNullableId(item.guzergahId));

        setValue("planlananTarih", toDayjsOrNull(item.planlananTarih));
        setValue("planlananSaat", toTimeDayjsOrNull(item.planlananSaat));
        setValue("gerceklesenTarih", toDayjsOrNull(item.gerceklesenTarih));
        setValue("gerceklesenSaat", toTimeDayjsOrNull(item.gerceklesenSaat));

        setValue("vardiya", toNullable(item.vardiya));
        setValue("vardiyaID", toNullableId(item.vardiyaKodId));

        setValue("cikisSehirYer", toNullableId(item.cikisSehirYerId));
        setValue("cikisSehirYerID", toNullableId(item.cikisSehirYerId));
        setValue("varisSehirYer", toNullableId(item.varisSehirYerId));
        setValue("varisSehirYerID", toNullableId(item.varisSehirYerId));

        setValue("oprYer", toNullable(item.oprYer));
        setValue("oprYerID", toNullableId(item.oprYerKodId));
        setValue("tasimaCinsi", toNullable(item.tasimaCinsi));
        setValue("tasimaCinsiID", toNullableId(item.tasimaCinsiKodId));
        setValue("tasimaTuru", toNullable(item.tasimaTuru));
        setValue("tasimaTuruID", toNullableId(item.tasimaTuruKodId));
        setValue("yuklemeKodId", toNullableId(item.yuklemeId));
        setValue("yuklemeKodAciklama", toNullable(item.yuklemeAciklama));
        setValue("personelId", toNullableId(item.personelId));
        setValue("personelIsim", toNullable(item.personelIsim));
        setValue("personelIsimID", toNullableId(item.personelId));
        setValue("aciklama", toNullable(item.aciklama));

        setValue("planlananMiktar", item.planlananMiktar);
        setValue("gerceklesenMiktar", item.gerceklesenMiktar);
        setValue("yuklemeBirim", toNullable(item.yuklemeBirim));
        setValue("yuklemeBirimID", toNullableId(item.yukelemeBirimKodId));
        setValue("kapasite", item.kapasite);

        setValue("hakedisTip", toNullable(item.hakedisTip));
        setValue("hakedisTipID", toNullableId(item.hakedisTipKodId));
        setValue("birimFiyat", item.birimFiyat);
        setValue("hakedisTutar", item.hakedisTutar);
        setValue("faturaNo", toNullable(item.faturaNo));
        setValue("faturaTarih", toDayjsOrNull(item.faturaTarih));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error(t("islemBasarisiz"));
      })
      .finally(() => setLoading(false));
  }, [open, seferOprId, isUpdate, isLocal, initialValues, defaultValues, reset, setValue]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      oprTipKodId: values.oprTipID || 0,
      durumKodId: values.durumID || 0,
      firmaId: values.firmaId || 0,
      guzergahId: values.guzergahId || 0,
      planlananMiktar: values.planlananMiktar || 0,
      gerceklesenMiktar: values.gerceklesenMiktar || 0,
      vardiyaKodId: values.vardiyaID || 0,
      cikisSehirYerId: values.cikisSehirYerID || 0,
      varisSehirYerId: values.varisSehirYerID || 0,
      oprYerKodId: values.oprYerID || 0,
      tasimaCinsiKodId: values.tasimaCinsiID || 0,
      tasimaTuruKodId: values.tasimaTuruID || 0,
      yuklemeId: values.yuklemeKodId || 0,
      personelId: values.personelId || 0,
      aciklama: values.aciklama || "",
      planlananTarih: formatDateForApi(values.planlananTarih),
      planlananSaat: formatTimeForApi(values.planlananSaat),
      gerceklesenTarih: formatDateForApi(values.gerceklesenTarih),
      gerceklesenSaat: formatTimeForApi(values.gerceklesenSaat),
      yukelemeBirimKodId: values.yuklemeBirimID || 0,
      kapasite: values.kapasite || 0,
      hakedisTipKodId: values.hakedisTipID || 0,
      birimFiyat: values.birimFiyat || 0,
      hakedisTutar: values.hakedisTutar || 0,
      faturaNo: values.faturaNo || "",
      faturaTarih: formatDateForApi(values.faturaTarih),
      ...(isUpdate ? { seferOprId } : { seferSiraNo: Number(expId) || 0 }),
    };

    if (isLocal) {
      onSave(body, values);
      onClose();
      return;
    }

    setSaving(true);
    const request = isUpdate ? UpdateExpeditionOperationItemService(body) : AddExpeditionOperationItemService(body);

    request
      .then((res) => {
        const statusCode = res?.data?.statusCode;

        if ([200, 201, 202, 204].includes(statusCode)) {
          message.success(t("islemBasarili"));
          onRefresh();
          onClose();
        } else if (statusCode === 401) {
          message.error(t("buIslemiYapmayaYetkinizYok"));
        } else {
          message.error(t("islemBasarisiz"));
        }
      })
      .catch((error) => {
        console.error("Error saving item:", error);
        message.error(t("islemBasarisiz"));
      })
      .finally(() => setSaving(false));
  });

  const title = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ fontSize: "16px", fontWeight: 600, color: "#141414" }}>{isUpdate || initialValues ? t("operasyonHareketiGuncelle") : t("operasyonHareketiEkle")}</span>
      <Button type="text" size="small" icon={expanded ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={() => setExpanded((prev) => !prev)} />
    </div>
  );

  const footer = [
    <Button key="back" onClick={onClose}>
      {t("iptal")}
    </Button>,
    <Button key="submit" className="btn btn-min primary-btn" loading={saving} onClick={onSubmit}>
      {t("kaydet")}
    </Button>,
  ];

  return (
    <Modal title={title} open={open} onCancel={onClose} maskClosable={false} footer={footer} width={expanded ? "98%" : DEFAULT_WIDTH} centered>
      <Spin spinning={loading}>
        <FormProvider {...methods}>
          <form>
            <HareketForm />
          </form>
        </FormProvider>
      </Spin>
    </Modal>
  );
};

HareketModal.propTypes = {
  open: PropTypes.bool,
  seferOprId: PropTypes.number,
  expId: PropTypes.number,
  // Servise bağlanmadan çalışan (toplu oluşturma) mod için form değerleri ve kaydetme geri çağrısı
  initialValues: PropTypes.object,
  // Operasyon güncelleme ekranından yeni hareket açılırken forma yazılacak değiştirilebilir başlangıç değerleri
  defaultValues: PropTypes.object,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
  onRefresh: PropTypes.func,
};

export default HareketModal;

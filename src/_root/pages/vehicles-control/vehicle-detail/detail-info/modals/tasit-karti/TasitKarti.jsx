import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from "../../../../../../../api/services/vehicles/vehicles/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import DateInput from "../../../../../../components/form/date/DateInput";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";

const TasitKarti = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, watch } = methods;

  const normalizeDateValue = (value) => {
    if (!value) {
      return null;
    }

    const parsedDate = dayjs(value);
    return parsedDate.isValid() ? parsedDate : null;
  };

  const formatDateValue = (value) => {
    if (!value) {
      return null;
    }

    const parsedDate = dayjs(value);
    return parsedDate.isValid() ? parsedDate.format("YYYY-MM-DD") : null;
  };

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 6).then((res) => {
      setValue("dtyTasitKarti", res.data.dtyTasitKarti);
      setValue("tkIptal", res.data.tkIptal);
      setValue("dtyYetkiBelgesi", res.data.dtyYetkiBelgesi);
      setValue("ybIptal", res.data.ybIptal);
      setValue("tkIptalNeden", res.data.tkIptalNeden);
      setValue("tkIptalYaziSayiNo", res.data.tkIptalYaziSayiNo);
      setValue("ybIptalNeden", res.data.ybIptalNeden);
      setValue("ybIptalYaziSayiNo", res.data.ybIptalYaziSayiNo);
      setValue("tkAciklama", res.data.tkAciklama);
      setValue("tkYbNo", res.data.tkYbNo);
      setValue("tkNo", res.data.tkNo);
      setValue("ykTuruKodId", res.data.ykTuruKodId);
      setValue("tkYkturu", res.data.tkYkturu);
      setValue("tkVerilisTarih", normalizeDateValue(res.data.tkVerilisTarih));
      setValue("tkBitisTarih", normalizeDateValue(res.data.tkBitisTarih));
      setValue("tkIptalTarih", normalizeDateValue(res.data.tkIptalTarih));
      setValue("tkYbVerilisTarih", normalizeDateValue(res.data.tkYbVerilisTarih));
      setValue("tkYbBitisTarih", normalizeDateValue(res.data.tkYbBitisTarih));
      setValue("ybIptalTarih", normalizeDateValue(res.data.ybIptalTarih));
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {
      dtyAracId: +id,
      tkIptalNeden: values.tkIptalNeden,
      tkIptalYaziSayiNo: values.tkIptalYaziSayiNo,
      ybIptalNeden: values.ybIptalNeden,
      ybIptalYaziSayiNo: values.ybIptalYaziSayiNo,
      tkAciklama: values.tkAciklama,
      tkYbNo: values.tkYbNo,
      tkNo: values.tkNo,
      tkVerilisTarih: formatDateValue(values.tkVerilisTarih),
      tkBitisTarih: formatDateValue(values.tkBitisTarih),
      tkIptalTarih: formatDateValue(values.tkIptalTarih),
      tkYbVerilisTarih: formatDateValue(values.tkYbVerilisTarih),
      tkYbBitisTarih: formatDateValue(values.tkYbBitisTarih),
      ybIptalTarih: formatDateValue(values.ybIptalTarih),
      ykTuruKodId: values.ykTuruKodId || -1,
      tkIptal: values.tkIptal,
      dtyTasitKarti: values.dtyTasitKarti,
      dtyYetkiBelgesi: values.dtyYetkiBelgesi,
      ybIptal: values.ybIptal,
    };

    UpdateVehicleDetailsInfoService(6, body).then((res) => {
      if (res.data.statusCode === 202) {
        setStatus(true);
        onClose();
      }
    });
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal title={t("tasitKartiBilgileri")} open={visible} onCancel={onClose} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <div className="grid gap-1">
          <div className="col-span-6">
            <h2>
              <CheckboxInput name="dtyTasitKarti" /> {t("tasitKarti")}
            </h2>
            <div className="grid gap-1 border p-20 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("verilisTarih")}</label>
                  <DateInput name="tkVerilisTarih" checked={!watch("dtyTasitKarti")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("bitisTarih")}</label>
                  <DateInput name="tkBitisTarih" checked={!watch("dtyTasitKarti")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("belgeNo")}</label>
                  <TextInput name="tkNo" checked={!watch("dtyTasitKarti")} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <h2>
              <CheckboxInput name="dtyYetkiBelgesi" /> {t("yetkiBelgesi")}
            </h2>
            <div className="grid gap-1 border p-20 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("verilisTarih")}</label>
                  <DateInput name="tkYbVerilisTarih" checked={!watch("dtyYetkiBelgesi")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("belgeTuru")}</label>
                  <CodeControl name="tkYkturu" codeName="ykTuruKodId" id={108} checked={!watch("dtyYetkiBelgesi")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("belgeNo")}</label>
                  <TextInput name="tkYbNo" checked={!watch("dtyYetkiBelgesi")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("bitisTarih")}</label>
                  <DateInput name="tkYbBitisTarih" checked={!watch("dtyYetkiBelgesi")} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <h2>
              <CheckboxInput name="tkIptal" /> {t("tasitKartiIptal")}
            </h2>
            <div className="grid gap-1 border p-20 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("iptalTarih")}</label>
                  <DateInput name="tkIptalTarih" checked={!watch("tkIptal")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("iptalNeden")}</label>
                  <TextInput name="tkIptalNeden" checked={!watch("tkIptal")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("evrakNo")}</label>
                  <TextInput name="tkIptalYaziSayiNo" checked={!watch("tkIptal")} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <h2>
              <CheckboxInput name="ybIptal" /> {t("yetkiBelgesiIptal")}
            </h2>
            <div className="grid gap-1 border p-20 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("iptalTarih")}</label>
                  <DateInput name="ybIptalTarih" checked={!watch("ybIptal")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("iptalNeden")}</label>
                  <TextInput name="ybIptalNeden" checked={!watch("ybIptal")} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("evrakNo")}</label>
                  <TextInput name="ybIptalYaziSayiNo" checked={!watch("ybIptal")} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="tkAciklama" />
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

TasitKarti.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TasitKarti;

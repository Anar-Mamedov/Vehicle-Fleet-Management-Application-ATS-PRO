import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import {
  Button,
  Modal,
} from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import Firma from "../../../../../../components/form/selects/Firma";

const Satis = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {}
  const methods = useForm({
    defaultValues: defaultValues
  })
  const { handleSubmit, setValue, watch } = methods

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 5).then((res) => {
      setValue("stSatildi", res.data.stSatildi)
      setValue("stNoterSozlesmeNo", res.data.stNoterSozlesmeNo)
      setValue("stAciklama", res.data.stAciklama)
      setValue("stAdres", res.data.stAdres)
      setValue("stSehirIlce", res.data.stSehirIlce)
      setValue("stFiyat", res.data.stFiyat)
      setValue("stSatisKm", res.data.stSatisKm)
      setValue("stFaturaTutar", res.data.stFaturaTutar)
      setValue("stFirmaId", res.data.stFirmaId)
      setValue("stFirma", res.data.stFirma)
      setValue("stNoterSatisTarih", res.data.stNoterSatisTarih !== "0001-01-01T00:00:00" && dayjs(res.data.stNoterSatisTarih))
      setValue("stTarih", res.data.stTarih !== "0001-01-01T00:00:00" && dayjs(res.data.stTarih))
      setValue("stFaturaTarih", res.data.stFaturaTarih !== "0001-01-01T00:00:00" && dayjs(res.data.stFaturaTarih))
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = values.stSatildi ? {
      dtyAracId: +id,
      stSatildi: values.stSatildi,
      "stNoterSozlesmeNo": values.stNoterSozlesmeNo,
      "stAciklama": values.stAciklama,
      "stAdres": values.stAdres,
      "stSehirIlce": values.stSehirIlce,
      "stNoterSatisTarih": dayjs(values.stNoterSatisTarih).format("YYYY-MM-DD") || null,
      "stTarih": dayjs(values.stTarih).format("YYYY-MM-DD") || null,
      "stFaturaTarih": dayjs(values.stFaturaTarih).format("YYYY-MM-DD") || null,
      "stFiyat": values.stFiyat || 0,
      "stFaturaTutar": values.stFaturaTutar || 0,
      "stSatisKm": values.stSatisKm || 0,
      "stFirmaId": values.stFirmaId || -1
    } : {
      dtyAracId: id,
      stSatildi: values.stSatildi
    }

    UpdateVehicleDetailsInfoService(5, body).then(res => {
      if (res.data.statusCode === 202) {
        setStatus(true)
        onClose()
      }
    })
  })

  const footer = (
    [
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
        {t("kaydet")}
      </Button>,
      <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
        {t("iptal")}
      </Button>
    ]
  )

  return (
    <Modal
      title={t("satisBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <FormProvider {...methods}>
        <h2><CheckboxInput name="stSatildi" /> {t("satildi")}</h2>

        <div className="grid gap-1 border p-20 mt-10">
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("noterSatisTarih")}</label>
              <DateInput name="stNoterSatisTarih" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("noterSozlesmeNo")}</label>
              <TextInput name="stNoterSozlesmeNo" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("faturaTarih")}</label>
              <DateInput name="stFaturaTarih" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("faturaTutar")}</label>
              <NumberInput name="stFaturaTutar" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("satisTarih")}</label>
              <DateInput name="stTarih" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("fiyat")}</label>
              <NumberInput name="stFiyat" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("aracKM")}</label>
              <NumberInput name="stSatisKm" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("satisYeri")}</label>
              <Firma name="stFirma" codeName="stFirmaId" checked={!watch("stSatildi")} />
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("adres")}</label>
              <TextInput name="stAdres" />
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("sehirIlcePK")}</label>
              <TextInput name="stSehirIlce" />
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="stAciklama" />
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal>
  )
};

Satis.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Satis;

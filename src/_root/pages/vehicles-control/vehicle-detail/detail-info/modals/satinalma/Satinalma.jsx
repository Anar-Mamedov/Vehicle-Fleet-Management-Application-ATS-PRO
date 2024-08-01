import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import {
  Button,
  Divider,
  Modal,
} from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'
import TextInput from "../../../../../../components/form/inputs/TextInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import ReadonlyInput from "../../../../../../components/form/inputs/ReadonlyInput";
import Firma from "../../../../../../components/form/selects/Firma";

const Satinalma = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {
    kiralik: false
  }
  const methods = useForm({
    defaultValues: defaultValues
  })
  const { handleSubmit, watch, setValue } = methods

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 4).then((res) => {
      setValue("krediHesapNo", res.data.krediHesapNo)
      setValue("kiralamaFirmaId", res.data.kiralamaFirmaId)
      setValue("kiralamafirma", res.data.kiralamafirma)
      setValue("krediUyar", res.data.krediUyar)
      setValue("krediKiralama", res.data.krediKiralama)
      setValue("krediIlgili", res.data.krediIlgili)
      setValue("krediAciklama", res.data.krediAciklama)
      setValue("krediPeriyod", res.data.krediPeriyod)
      setValue("saAciklama", res.data.saAciklama)
      setValue("saSehirIl", res.data.saSehirIl)
      setValue("saAdres", res.data.saAdres)
      setValue("krediSure", res.data.krediSure)
      setValue("saFirmaId", res.data.saFirmaId)
      setValue("saFirma", res.data.saFirma)
      setValue("krediAylikOdeme", res.data.krediAylikOdeme)
      setValue("krediTutar", res.data.krediTutar)
      setValue("amortismanOmur", res.data.amortismanOmur)
      setValue("amortismanDefterDeger", res.data.amortismanDefterDeger)
      setValue("saFiyat", res.data.saFiyat)
      setValue("saFaturaTutar", res.data.saFaturaTutar)
      setValue("saFaturaNo", res.data.saFaturaNo)
      setValue("saAracKm", res.data.saAracKm)
      setValue("saNoterSozlesmeNo", res.data.saNoterSozlesmeNo)
      setValue("amortisManTarih", res.data.amortisManTarih !== "0001-01-01T00:00:00" && dayjs(res.data.amortisManTarih))
      setValue("krediIlkOdTarih", res.data.krediIlkOdTarih !== "0001-01-01T00:00:00" && dayjs(res.data.krediIlkOdTarih))
      setValue("kiraBitis", res.data.kiraBitis !== "0001-01-01T00:00:00" && dayjs(res.data.kiraBitis))
      setValue("kiraBaslangic", res.data.kiraBaslangic !== "0001-01-01T00:00:00" && dayjs(res.data.kiraBaslangic))
      setValue("saFaturaTarih", res.data.saFaturaTarih !== "0001-01-01T00:00:00" && dayjs(res.data.saFaturaTarih))
      setValue("saTarih", res.data.saTarih !== "0001-01-01T00:00:00" && dayjs(res.data.saTarih))
      setValue("saNoterSatisTarih", res.data.saNoterSatisTarih !== "0001-01-01T00:00:00" && dayjs(res.data.saNoterSatisTarih))
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {
      "dtyAracId": +id,
      "saNoterSatisTarih": dayjs(values.saNoterSatisTarih).format("YYYY-MM-DD") || null,
      "saTarih": dayjs(values.saTarih).format("YYYY-MM-DD") || null,
      "saFaturaTarih": dayjs(values.saFaturaTarih).format("YYYY-MM-DD") || null,
      "kiraBaslangic": values.krediKiralama ? (dayjs(values.kiraBaslangic).format("YYYY-MM-DD") || null) : null,
      "kiraBitis": dayjs(values.kiraBitis).format("YYYY-MM-DD") || null,
      "krediIlkOdTarih": values.krediKiralama ? (dayjs(values.krediIlkOdTarih).format("YYYY-MM-DD") || null): null,
      "amortisManTarih": dayjs(values.amortisManTarih).format("YYYY-MM-DD") || null,
      "saNoterSozlesmeNo": values.saNoterSozlesmeNo,
      "saAracKm": values.saAracKm,
      "saFaturaNo": values.saFaturaNo,
      "saFaturaTutar": values.saFaturaTutar,
      "saFiyat": values.saFiyat,
      "amortismanDefterDeger": values.amortismanDefterDeger,
      "amortismanOmur": values.amortismanOmur,
      "krediTutar": values.krediKiralama ? (values.krediTutar || 0) : 0,
      "krediAylikOdeme": values.krediKiralama ? (values.krediAylikOdeme || 0) : 0,
      "saFirmaId": values.saFirmaId || -1,
      "krediSure": values.krediKiralama ? (values.krediSure || 0) : 0,
      "saAdres": values.saAdres,
      "saSehirIl": values.saSehirIl,
      "saAciklama": values.saAciklama,
      "krediAciklama": values.krediKiralama ? values.krediAciklama : "",
      "krediIlgili": values.krediKiralama ? values.krediIlgili : "",
      "krediKiralama": values.krediKiralama ? values.krediKiralama : false,
      "krediUyar": values.krediKiralama ? values.krediUyar : false,
      "kiralamaFirmaId": values.krediKiralama ? values.kiralamaFirmaId || -1 : -1,
      "krediHesapNo": values.krediKiralama ? values.krediHesapNo : ""
    }

    UpdateVehicleDetailsInfoService(4, body).then(res => {
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
        {t("kapat")}
      </Button>
    ]
  )

  return (
    <Modal
      title={t("satinalmaBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <FormProvider {...methods}>
        <div className="mt-14">
          <div className="grid gap-2">
            <div className="col-span-8">
              <h2>{t("satinalmaBilgiler")}</h2>
              <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("noterSatisTarih")}</label>
                    <DateInput name="saNoterSatisTarih" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("faturaTarih")}</label>
                    <DateInput name="saFaturaTarih" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("noterSozlesmeNo")}</label>
                    <TextInput name="saNoterSozlesmeNo" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("faturaNo")}</label>
                    <TextInput name="saFaturaNo" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("satinalmaTarih")}</label>
                    <DateInput name="saTarih" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("faturaTutar")}</label>
                    <NumberInput name="saFaturaTutar" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("aracKm")}</label>
                    <NumberInput name="saAracKm" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("fiyat")}</label>
                    <NumberInput name="saFiyat" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("satinalmaYeri")}</label>
                    <Firma name="saFirma" codeName="saFirmaId" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("adres")}</label>
                    <TextInput name="saAdres" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("sehirIlcePK")}</label>
                    <TextInput name="saSehirIl" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("aciklama")}</label>
                    <Textarea name="saAciklama" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <h2>{t("ammorTismanBilgiler")}</h2>
              <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("hesapTarih")}</label>
                    <DateInput name="amortisManTarih" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("defterDeger")}</label>
                    <NumberInput name="amortismanDefterDeger" />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("faydaliOmru")}</label>
                    <TextInput name="amortismanOmur" />
                  </div>
                </div>
                <div className="col-span-12">
                  <Divider />
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("amorTismanTutar")} -- ?</label>
                    <ReadonlyInput name="" checked={true} />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("netAktifDeger")} -- ?</label>
                    <ReadonlyInput name="" checked={true}/>
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("kalanSure")} -- ?</label>
                    <ReadonlyInput name="" checked={true}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <h2><CheckboxInput name="krediKiralama" /> {t("kiralamaBilgiler")}</h2>
              <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("kiralamaYeri")}</label>
                    <Firma name="kiralamafirma" codeName="kiralamaFirmaId" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="grid gap-1">
                    <div className="col-span-12">
                      <label>{t("aylikOdemeTutar")}</label>
                    </div>
                    <div className="col-span-8">
                      <div className="flex flex-col gap-1 self-end">
                        <NumberInput name="krediAylikOdeme" checked={!watch("krediKiralama")} />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <div className="flex gap-1">
                        <CheckboxInput name="krediUyar" checked={!watch("krediKiralama")} />
                        <label>{t("uyari")}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("kiralamaTutar")}</label>
                    <NumberInput name="krediTutar" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("hesapNo")}</label>
                    <ReadonlyInput name="krediHesapNo" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("kiraBaslangicTarih")}</label>
                    <DateInput name="kiraBaslangic" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("ilgili")}</label>
                    <ReadonlyInput name="krediIlgili" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("kiralamaSuresi")}</label>
                    <NumberInput name="krediSure" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("ilkOdemeTarih")}</label>
                    <DateInput name="krediIlkOdTarih" checked={!watch("krediKiralama")} />
                  </div>
                </div>
                <div className="col-span-12">
                  <div className="flex flex-col gap-1">
                    <label>{t("aciklama")}</label>
                    <Textarea name="krediAciklama" checked={!watch("krediKiralama")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>

    </Modal>
  );
};

Satinalma.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Satinalma;

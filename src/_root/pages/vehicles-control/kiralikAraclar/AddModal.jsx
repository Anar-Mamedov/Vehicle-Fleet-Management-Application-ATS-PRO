import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, Divider, Modal } from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from "../../../../api/services/vehicles/vehicles/services";
import DateInput from "../../../components/form/date/DateInput";
import Textarea from "../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../components/form/checkbox/CheckboxInput";
import NumberInput from "../../../components/form/inputs/NumberInput";
import ReadonlyInput from "../../../components/form/inputs/ReadonlyInput";
import Firma from "../../../components/form/selects/Firma";

const AddModal = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {
    kiralik: false,
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, watch, setValue } = methods;

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 4).then((res) => {
      setValue("krediHesapNo", res.data.krediHesapNo);
      setValue("kiralamaFirmaId", res.data.kiralamaFirmaId);
      setValue("kiralamafirma", res.data.kiralamafirma);
      setValue("krediUyar", res.data.krediUyar);
      setValue("krediKiralama", res.data.krediKiralama);
      setValue("krediIlgili", res.data.krediIlgili);
      setValue("krediAciklama", res.data.krediAciklama);
      setValue("krediPeriyod", res.data.krediPeriyod);
      setValue("saAciklama", res.data.saAciklama);
      setValue("saSehirIl", res.data.saSehirIl);
      setValue("saAdres", res.data.saAdres);
      setValue("krediSure", res.data.krediSure);
      setValue("saFirmaId", res.data.saFirmaId);
      setValue("saFirma", res.data.saFirma);
      setValue("krediAylikOdeme", res.data.krediAylikOdeme);
      setValue("krediTutar", res.data.krediTutar);
      setValue("amortismanOmur", res.data.amortismanOmur);
      setValue("amortismanDefterDeger", res.data.amortismanDefterDeger);
      setValue("saFiyat", res.data.saFiyat);
      setValue("saFaturaTutar", res.data.saFaturaTutar);
      setValue("saFaturaNo", res.data.saFaturaNo);
      setValue("saAracKm", res.data.saAracKm);
      setValue("saNoterSozlesmeNo", res.data.saNoterSozlesmeNo);
      setValue("amortisManTarih", res.data.amortisManTarih ? dayjs(res.data.amortisManTarih) : null);
      setValue("krediIlkOdTarih", res.data.krediIlkOdTarih ? dayjs(res.data.krediIlkOdTarih) : null);
      setValue("kiraBitis", res.data.kiraBitis ? dayjs(res.data.kiraBitis) : null);
      setValue("kiraBaslangic", res.data.kiraBaslangic ? dayjs(res.data.kiraBaslangic) : null);
      setValue("saFaturaTarih", res.data.saFaturaTarih ? dayjs(res.data.saFaturaTarih) : null);
      setValue("saTarih", res.data.saTarih ? dayjs(res.data.saTarih) : null);
      setValue("saNoterSatisTarih", res.data.saNoterSatisTarih ? dayjs(res.data.saNoterSatisTarih) : null);
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {
      dtyAracId: +id,
      saNoterSatisTarih: values.saNoterSatisTarih ? dayjs(values.saNoterSatisTarih).format("YYYY-MM-DD") : null,
      saTarih: values.saTarih ? dayjs(values.saTarih).format("YYYY-MM-DD") : null,
      saFaturaTarih: values.saFaturaTarih ? dayjs(values.saFaturaTarih).format("YYYY-MM-DD") : null,
      kiraBaslangic: values.krediKiralama && values.kiraBaslangic ? dayjs(values.kiraBaslangic).format("YYYY-MM-DD") : null,
      kiraBitis: values.kiraBitis ? dayjs(values.kiraBitis).format("YYYY-MM-DD") : null,
      krediIlkOdTarih: values.krediKiralama && values.krediIlkOdTarih ? dayjs(values.krediIlkOdTarih).format("YYYY-MM-DD") : null,
      amortisManTarih: values.amortisManTarih ? dayjs(values.amortisManTarih).format("YYYY-MM-DD") : null,
      saNoterSozlesmeNo: values.saNoterSozlesmeNo,
      saAracKm: values.saAracKm,
      saFaturaNo: values.saFaturaNo,
      saFaturaTutar: values.saFaturaTutar,
      saFiyat: values.saFiyat,
      amortismanDefterDeger: values.amortismanDefterDeger,
      amortismanOmur: values.amortismanOmur,
      krediTutar: values.krediKiralama ? values.krediTutar || 0 : 0,
      krediAylikOdeme: values.krediKiralama ? values.krediAylikOdeme || 0 : 0,
      saFirmaId: values.saFirmaId || -1,
      krediSure: values.krediKiralama ? values.krediSure || 0 : 0,
      saAdres: values.saAdres,
      saSehirIl: values.saSehirIl,
      saAciklama: values.saAciklama,
      krediAciklama: values.krediKiralama ? values.krediAciklama : "",
      krediIlgili: values.krediKiralama ? values.krediIlgili : "",
      krediKiralama: values.krediKiralama ? values.krediKiralama : false,
      krediUyar: values.krediKiralama ? values.krediUyar : false,
      kiralamaFirmaId: values.krediKiralama ? values.kiralamaFirmaId || -1 : -1,
      krediHesapNo: values.krediKiralama ? values.krediHesapNo : "",
    };

    UpdateVehicleDetailsInfoService(4, body).then((res) => {
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
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("satinalmaBilgiler")} open={visible} onCancel={onClose} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <div className="mt-14">
          <div className="grid gap-2">
            <div className="col-span-8">
              <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("kiralamaYeri")}</label>
                  </div>
                </div>
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

AddModal.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddModal;
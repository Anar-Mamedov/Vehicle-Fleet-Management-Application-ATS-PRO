import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import { Button, Divider, Select } from "antd";
import {
  GetSettingByTypeService,
  UpdateSettingByTypeService,
} from "../../../../../api/services/settings/services";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";

const VehiclesSettings = () => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, control } = methods;

  useEffect(() => {
    GetSettingByTypeService(2).then((res) => {
      setValue("siraNo", res?.data.siraNo);
      setValue("dorseYonetimi", res?.data.dorseYonetimi);
      setValue("plakaAyrac", res?.data.plakaAyrac);
      setValue("formatliPlaka", res?.data.formatliPlaka);
      setValue("aracHarcamaMalietEkle", res?.data.aracHarcamaMaliyetEkle);
      setValue("aracGelirleriEkle", res?.data.aracGelirleriEkle);
      setValue("aracOzelAlanElleGirsin", res?.data.aracOzelAlanElleGirsin);
      setValue("servisKayitlariMlzTakip", res?.data.servisKayitlariMlzTakip);
      setValue("konumTakibi", res?.data.konumTakibi);
      setValue("kilometreGuncelleme", res?.data.kilometreGuncelleme);
      setValue("lastikHavaBasinci", res?.data.lastikHavaBasinci);
      setValue("lastikDisDerinligi", res?.data.lastikDisDerinligi);
      setValue("seferKilometreGirisiZorunlu", res?.data.seferKilometreGirisiZorunlu);
    });
  }, []);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: values.siraNo,
      dorseYonetimi: values.dorseYonetimi,
      plakaAyrac: values.plakaAyrac,
      formatliPlaka: values.formatliPlaka,
      aracHarcamaMalietEkle: values.aracHarcamaMalietEkle,
      aracGelirleriEkle: values.aracGelirleriEkle,
      aracOzelAlanElleGirsin: values.aracOzelAlanElleGirsin,
      servisKayitlariMlzTakip: values.servisKayitlariMlzTakip,
      konumTakibi: values.konumTakibi,
      kilometreGuncelleme: values.kilometreGuncelleme,
      lastikHavaBasinci: values.lastikHavaBasinci,
      lastikDisDerinligi: values.lastikDisDerinligi,
      seferKilometreGirisiZorunlu: values.seferKilometreGirisiZorunlu,
    };

    UpdateSettingByTypeService(2, body).then((res) => {
      if (res.data.statusCode === 202) {
        console.log(1);
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <h2>{t("aracAyarlari")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("kilometreGuncellemesi")}</label>
            <Controller
              name="kilometreGuncelleme"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "YAKIT", label: <span>YAKIT</span> },
                    { value: "SEFER", label: <span>SEFER</span> },
                    { value: "YOK", label: <span>YOK</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-12 border p-10">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("formatliPlakaGirisi")}</label>
                <CheckboxInput name="formatliPlaka" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("ayrac")}</label>
                <TextInput name="plakaAyrac" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="konumTakibi" />
            <label>{t("konumTakibiYapilacak")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="aracOzelAlanElleGirsin" />
            <label>{t("aracKartiOzelAlanlaraElleGiriseIzinVer")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="aracHarcamaMalietEkle" />
            <label>{t("HarcamalariAracMaliyetlerineEkle")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="aracGelirleriEkle" />
            <label>{t("GelirleriAracgelirlerineEkle")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="dorseYonetimi" />
            <label>{t("dorseYonetimi")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="servisKayitlariMlzTakip" />
            <label>{t("servisKayitlariMalzemeStokTakibi")}</label>
          </div>
        </div>
      </div>
      <h2>{t("seferHareketleri")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="seferKilometreGirisiZorunlu" />
            <label>{t("kilometreGirisiZorunlu")}</label>
          </div>
        </div>
      </div>
      <h2>{t("lastikBilgileri")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("varsayilanHavaBasinci")}</label>
            <NumberInput name="lastikHavaBasinci" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("varsayilanDisDerinligi")}</label>
            <NumberInput name="lastikDisDerinligi" />
          </div>
        </div>
      </div>
      <div className="justify-end flex gap-1 col-span-12 mt-20">
        <Button className="btn btn-min primary-btn" onClick={onSubmit}>
          {t("kaydet")}
        </Button>
        <Button className="btn btn-min cancel-btn">{t("kapat")}</Button>
      </div>
    </FormProvider>
  );
};

export default VehiclesSettings;

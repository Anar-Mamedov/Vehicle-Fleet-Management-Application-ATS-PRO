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

const YakitSettings = () => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, control, watch } = methods;

  useEffect(() => {
    GetSettingByTypeService(4).then((res) => {
      setValue("siraNo", res?.data.siraNo);
      setValue(
        "yakitTankKapasiteAsimIslem",
        res?.data.yakitTankKapasiteAsimIslem
      );
      setValue(
        "yakitMinTuketimDusukIslem",
        res?.data.yakitMinTuketimDusukIslem
      );
      setValue(
        "yakitMaxTuketimFazlaIslem",
        res?.data.yakitMaxTuketimFazlaIslem
      );
      setValue("yakitOrtalamaFormat", res?.data.yakitOrtalamaFormat);
      setValue("yakitTutarFormat", res?.data.yakitTutarFormat);
      setValue("yakitMiktarFormat", res?.data.yakitMiktarFormat);
      setValue("yakitTankKapasiteUyar", res?.data.yakitTankKapasiteUyar);
      setValue("yakitTutarIslem", res?.data.yakitTutarIslem);
      setValue("yakitTutarMax", res?.data.yakitTutarMax);
      setValue("yakitTutarMin", res?.data.yakitTutarMin);
      setValue("yakitTutarKontrol", res?.data.yakitTutarKontrol);
      setValue("yakitMiktarIslem", res?.data.yakitMiktarIslem);
      setValue("yakitMiktarMax", res?.data.yakitMiktarMax);
      setValue("yakitMiktarMin", res?.data.yakitMiktarMin);
      setValue("yakitMiktarKontrol", res?.data.yakitMiktarKontrol);
      setValue("yakitGidilenMesafeIslem", res?.data.yakitGidilenMesafeIslem);
      setValue("yakitGidilenMesafeMax", res?.data.yakitGidilenMesafeMax);
      setValue("yakitGidilenMesafeMin", res?.data.yakitGidilenMesafeMin);
      setValue(
        "yakitGidilenMesafeKontrol",
        res?.data.yakitGidilenMesafeKontrol
      );
      setValue("yakitKilometreKontrol", res?.data.yakitKilometreKontrol);
    });
  }, []);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: values.siraNo,
      yakitKilometreKontrol: values.yakitKilometreKontrol,
      yakitGidilenMesafeKontrol: values.yakitGidilenMesafeKontrol,
      yakitGidilenMesafeMin: values.yakitGidilenMesafeMin,
      yakitGidilenMesafeMax: values.yakitGidilenMesafeMax,
      yakitGidilenMesafeIslem: values.yakitGidilenMesafeIslem,
      yakitMiktarKontrol: values.yakitMiktarKontrol,
      yakitMiktarMin: values.yakitMiktarMin,
      yakitMiktarMax: values.yakitMiktarMax,
      yakitMiktarIslem: values.yakitMiktarIslem,
      yakitTutarKontrol: values.yakitTutarKontrol,
      yakitTutarMin: values.yakitTutarMin,
      yakitTutarMax: values.yakitTutarMax,
      yakitTutarIslem: values.yakitTutarIslem,
      yakitTankKapasiteUyar: values.yakitTankKapasiteUyar,
      yakitMiktarFormat: values.yakitMiktarFormat,
      yakitTutarFormat: values.yakitTutarFormat,
      yakitOrtalamaFormat: values.yakitOrtalamaFormat,
      yakitMaxTuketimFazlaIslem: values.yakitMaxTuketimFazlaIslem,
      yakitMinTuketimDusukIslem: values.yakitMinTuketimDusukIslem,
      yakitTankKapasiteAsimIslem: values.yakitTankKapasiteAsimIslem,
    };

    UpdateSettingByTypeService(4, body).then((res) => {
      if (res.data.statusCode === 202) {
        console.log(1);
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <h2>{t("aracYakitGirisi")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="yakitKilometreKontrol" />
            <label>{t("kilometreKontroluZorunlu")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="yakitGidilenMesafeKontrol" />
            <label>{t("gidilenMesafeKontrolu")}</label>
          </div>
        </div>
        <div className="col-span-12 border p-10">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("min")}</label>
                <NumberInput
                  name="yakitGidilenMesafeMin"
                  checked={!watch("yakitGidilenMesafeKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("max")}</label>
                <NumberInput
                  name="yakitGidilenMesafeMax"
                  checked={!watch("yakitGidilenMesafeKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3 self-end">
              <div className="flex flex-col gap-1">
                <Controller
                  name="yakitGidilenMesafeIslem"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      disabled={!watch("yakitGidilenMesafeKontrol")}
                      {...field}
                      options={[
                        { value: "UYAR", label: <span>UYAR</span> },
                        { value: "IZINVERME", label: <span>İZİN VERME</span> },
                      ]}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="yakitMiktarKontrol" />
            <label>{t("yakitMiktarKontrolu")}</label>
          </div>
        </div>
        <div className="col-span-12 border p-10">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("min")}</label>
                <NumberInput
                  name="yakitMiktarMin"
                  checked={!watch("yakitMiktarKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("max")}</label>
                <NumberInput
                  name="yakitMiktarMax"
                  checked={!watch("yakitMiktarKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3 self-end">
              <div className="flex flex-col gap-1">
                <Controller
                  name="yakitMiktarIslem"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      disabled={!watch("yakitMiktarKontrol")}
                      {...field}
                      options={[
                        { value: "UYAR", label: <span>UYAR</span> },
                        { value: "IZINVERME", label: <span>İZİN VERME</span> },
                      ]}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="yakitTutarKontrol" />
            <label>{t("yakitTutarKontrol")}</label>
          </div>
        </div>
        <div className="col-span-12 border p-10">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("min")}</label>
                <NumberInput
                  name="yakitTutarMin"
                  checked={!watch("yakitTutarKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("max")}</label>
                <NumberInput
                  name="yakitTutarMax"
                  checked={!watch("yakitTutarKontrol")}
                />
              </div>
            </div>
            <div className="col-span-3 self-end">
              <div className="flex flex-col gap-1">
                <Controller
                  name="yakitTutarIslem"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      disabled={!watch("yakitTutarKontrol")}
                      {...field}
                      options={[
                        { value: "UYAR", label: <span>UYAR</span> },
                        { value: "IZINVERME", label: <span>İZİN VERME</span> },
                      ]}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-1">
            <label>{t("ortalamaYakitTuketimiOngorulenMinDegerdenDusuk")}</label>
            <Controller
              name="yakitMinTuketimDusukIslem"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "UYAR", label: <span>UYAR</span> },
                    { value: "IZINVERME", label: <span>İZİN VERME</span> },
                    { value: "ISLEMYAPMA", label: <span>İŞLEM YAPMA</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-1">
            <label>{t("ortalamaYakitTuketimiOngorulenMaxDegerdenFazla")}</label>
            <Controller
              name="yakitMaxTuketimFazlaIslem"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "UYAR", label: <span>UYAR</span> },
                    { value: "IZINVERME", label: <span>İZİN VERME</span> },
                    { value: "ISLEMYAPMA", label: <span>İŞLEM YAPMA</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-1">
            <label>{t("aracYakitDeposuKapasiteAsiminda")}</label>
            <Controller
              name="yakitTankKapasiteAsimIslem"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "UYAR", label: <span>UYAR</span> },
                    { value: "IZINVERME", label: <span>İZİN VERME</span> },
                    { value: "ISLEMYAPMA", label: <span>İŞLEM YAPMA</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
      </div>
      <h2>{t("yakitTanklari")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-3">
          <div className="flex gap-2">
            <CheckboxInput name="yakitTankKapasiteUyar" />
            <label>{t("yakitTankiKapasiteAsimindaUyariVer")}</label>
          </div>
        </div>
      </div>
      <h2>{t("yakitFormatlari")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("miktar")}</label>
            <TextInput name="yakitMiktarFormat" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("ortalama")}</label>
            <TextInput name="yakitOrtalamaFormat" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("tutar")}</label>
            <TextInput name="yakitTutarFormat" />
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

export default YakitSettings;

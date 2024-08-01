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

const StokSettings = () => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, setValue, control } = methods;

  useEffect(() => {
    GetSettingByTypeService(3).then((res) => {
      setValue("siraNo", res?.data.siraNo);
      setValue("stokNegatifeDussun", res?.data.stokNegatifeDussun);
      setValue(
        "malzemeFiyatiGuncellensin",
        res?.data.malzemeFiyatiGuncellensin
      );
      setValue(
        "malzemeFiyatGuncellemeTip",
        res?.data.malzemeFiyatGuncellemeTip
      );
      setValue("kdv", res?.data.kdv);
      setValue("stokMiktarFormat", res?.data.stokMiktarFormat);
      setValue("stokTutarFormat", res?.data.stokTutarFormat);
      setValue("stokOrtalamaFormat", res?.data.stokOrtalamaFormat);
    });
  }, []);

  const onSubmit = handleSubmit((values) => {
    const body = {
      siraNo: values.siraNo,
      stokNegatifeDussun: values.stokNegatifeDussun,
      malzemeFiyatiGuncellensin: values.malzemeFiyatiGuncellensin,
      malzemeFiyatGuncellemeTip: values.malzemeFiyatGuncellemeTip,
      kdv: values.kdv,
      stokMiktarFormat: values.stokMiktarFormat,
      stokTutarFormat: values.stokTutarFormat,
      stokOrtalamaFormat: values.stokOrtalamaFormat,
    };

    UpdateSettingByTypeService(3, body).then((res) => {
      if (res.data.statusCode === 202) {
        console.log(1);
      }
    });
  });

  return (
    <FormProvider {...methods}>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="stokNegatifeDussun" />
            <label>{t("stokMiktarlariNegatifeDusebilir")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-2">
            <CheckboxInput name="malzemeFiyatiGuncellensin" />
            <label>{t("malzemeFiyatlariGuncellensin")}</label>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-1">
            <label>{t("guncellemeTipi")}</label>
            <Controller
              name="malzemeFiyatGuncellemeTip"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "ILKALIS", label: <span>İLK ALIŞ</span> },
                    { value: "ORTALAMA", label: <span>ORTALAMA</span> },
                    { value: "SONALIS", label: <span>SON ALIŞ</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex flex-col gap-1">
            <label>{t("varsayilanKDVOranı")}</label>
            <NumberInput name="kdv" />
          </div>
        </div>
      </div>
      <h2>{t("formatlar")}</h2>
      <div className="grid gap-1 border p-20 mt-10 mb-10">
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("miktar")}</label>
            <TextInput name="stokMiktarFormat" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("ortalama")}</label>
            <TextInput name="stokOrtalamaFormat" />
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-1">
            <label>{t("tutar")}</label>
            <TextInput name="stokTutarFormat" />
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

export default StokSettings;

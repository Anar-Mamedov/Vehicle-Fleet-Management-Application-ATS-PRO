import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Input, Select } from "antd";
import DateInput from "../../../../components/form/date/DateInput";

const KisiselBilgiler = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid gap-1 border p-20">
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("ehliyet")}</label>
            <Controller
              name="ehliyet"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  {...field}
                  options={[
                    { value: "VAR", label: <span>VAR</span> },
                    { value: "YOK", label: <span>YOK</span> },
                  ]}
                  onChange={(e) => field.onChange(e)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("sskNo")}</label>
            <Controller
              name="sskNo"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("tcKimlikNo")}</label>
            <Controller
              name="tcKimlikNo"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ""} />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("ehliyetSinifi")}</label>
            <Controller
              name="ehliyetSinifi"
              control={control}
              render={({ field }) => (
                <Input
                  maxLength={3}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="dogumTarihi" className="text-info">
              {t("dogumTarihi")}
            </label>
            <DateInput name="dogumTarihi" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("anneAdi")}</label>
            <Controller
              name="anneAdi"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("ehliyetNo")}</label>
            <Controller
              name="ehliyetNo"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="iseBaslamaTarihi" className="text-info">
              {t("iseBaslamaTarihi")}
            </label>
            <DateInput name="iseBaslamaTarihi" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("babaAdi")}</label>
            <Controller
              name="babaAdi"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("kanGrubu")}</label>
            <Controller
              name="kanGrubu"
              control={control}
              render={({ field }) => (
                <Input
                  maxLength={5}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="isetenAyrilmaTarihi" className="text-info">
              {t("istenAyrilmaTarih")}
            </label>
            <DateInput name="isetenAyrilmaTarihi" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("beden")}</label>
            <Controller
              name="beden"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("ayakKabiNo")}</label>
            <Controller
              name="ayakKabiNo"
              control={control}
              render={({ field }) => (
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KisiselBilgiler;

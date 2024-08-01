import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Select } from "antd";
import DateInput from "../../../../components/form/date/DateInput";
import TextInput from "../../../../components/form/inputs/TextInput";

const KimlikBilgiler = () => {
  const { control } = useFormContext();

  return (
    <div className="grid gap-1 border p-20">
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("tcKimlikNo")}</label>
          <TextInput name="tcKimlikNo" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("surucuIsmi")}</label>
          <TextInput name="isim" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("seriNo")}</label>
          <TextInput name="kimlikSeriNo" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kayitliOlduguIl")}</label>
          <TextInput name="kayitliOlduguIl" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kayitliOlduguIlce")}</label>
          <TextInput name="kayitliOlduguIlce" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("mahalleKoy")}</label>
          <TextInput name="mahalleKoy" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikCiltNo")}</label>
          <TextInput name="kimlikCiltNo" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikAileSiraNo")}</label>
          <TextInput name="kimlikAileSiraNo" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikSiraNo")}</label>
          <TextInput name="kimlikSiraNo" />
        </div>
      </div>

      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikVerildigiYer")}</label>
          <TextInput name="kimlikVerildigiYer" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikVerilisNedeni")}</label>
          <TextInput name="kimlikVerilisNedeni" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikVerilisTarihi")}</label>
          <DateInput name="kimlikVerilisTarihi" />
        </div>
      </div>
      <div className="col-span-3"></div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("babaAdi")}</label>
          <TextInput name="babaAdi" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("anaAdi")}</label>
          <TextInput name="anaAdi" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("dogumYeri")}</label>
          <TextInput name="dogumYeri" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("dini")}</label>
          <TextInput name="dini" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("kimlikKayitNo")}</label>
          <TextInput name="kimlikKayitNo" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("dogumTarihi")}</label>
          <DateInput name="dogumTarihi" />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-1">
          <label>{t("medeniHali")}</label>
          <Controller
            name="medeniHali"
            control={control}
            render={({ field }) => (
              <Select
                className="w-full"
                {...field}
                options={[
                  { value: "EVLİ", label: <span>EVLİ</span> },
                  { value: "BEKAR", label: <span>BEKAR</span> },
                ]}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default KimlikBilgiler;

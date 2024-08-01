import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Checkbox, Input, Select } from "antd";
import CodeControl from "../../../../components/form/selects/CodeControl";
import Depo from "../../../../components/form/selects/Depo";
import TextInput from "../../../../components/form/inputs/TextInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";

const GeneralInfo = ({ isValid }) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue("kdvDahilHaric", "Dahil");
    setValue("aktif", true);
  }, []);

  const validateStyle = {
    borderColor:
      isValid === "error"
        ? "#dc3545"
        : isValid === "success"
          ? "#23b545"
          : "#000",
  };

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeKodu")} <span className="text-danger">*</span></label>
                <TextInput name="malzemeKod" style={validateStyle} required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aktifDegil")}</label>
                <CheckboxInput name="aktif" />
              </div>
            </div>
            <div className="col-span-8">
              <div className="flex flex-col gap-1">
                <label>{t("tanimi")} <span className="text-danger">*</span></label>
                <TextInput name="tanim" required={true} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("birim")} <span className="text-danger">*</span></label>
                <CodeControl name="birim" codeName="birimKodId" id={300} required={true} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeTipi")}</label>
                <CodeControl
                  name="malzemeTipKodText"
                  codeName="malzemeTipKodId"
                  id={301}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("marka")} -- ?</label>
                <TextInput
                  name=""
                  readonly={true}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("model")} -- ?</label>
                <TextInput
                  name=""
                  readonly={true}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <NumberInput name="fiyat" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="grid gap-1">
                <div className="col-span-6">
                  <div className="flex flex-col gap-1">
                    <label>{t("kdvOrani")} %</label>
                    <NumberInput name="kdvOran" />
                  </div>
                </div>
                <div className="col-span-6 self-end">
                  <Controller
                    name="kdvDahilHaric"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="w-full"
                        {...field}
                        defaultValue="Dahil"
                        options={[
                          { value: "Dahil", label: <span>Dahil</span> },
                          { value: "Hariç", label: <span>Hariç</span> },
                        ]}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("kritikStokMiktari")}</label>
                <NumberInput name="kritikMiktar" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("seriNo")}</label>
                <TextInput name="seriNo" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("barkodNo")}</label>
                <TextInput name="barKodNo" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("depo")}</label>
                <Depo type="MALZEME" />
                {/* <Controller
                  name="depoId"
                  control={control}
                  render={({ field }) => <Depo field={field} />}
                /> */}
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("bolum")}</label>
                <Controller
                  name="bolum"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("raf")}</label>
                <Controller
                  name="raf"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("olcu")}</label>
                <Controller
                  name="olcu"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("yedekParca")}</label>
                <Controller
                  name="yedekParca"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("sarfMalz")}</label>
                <Controller
                  name="sarfMlz"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("demirbas")}</label>
                <Controller
                  name="demirBas"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

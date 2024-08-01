import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Checkbox, Input } from "antd";
import Location from "../../../../components/form/Location";
import TextInput from "../../../../components/form/inputs/TextInput";
import Departman from "../../../../components/form/Departman";
import PersonelTip from "../../../../components/form/PersonelTip";
import PersonelGorev from "../../../../components/form/PersonelGorev";
import PersonelUnvan from "../../../../components/form/PersonelUnvan";

const GeneralInfo = ({ isValid }) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid gap-1 border">
        <div className="col-span-8 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelKod")}</label>
                <Controller
                  name="personelKod"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={
                        isValid === "error"
                          ? { borderColor: "#dc3545" }
                          : isValid === "success"
                          ? { borderColor: "#23b545" }
                          : { color: "#000" }
                      }
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aktif")}</label>
                <Controller
                  name="aktif"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelIsmi")}</label>
                <TextInput name="isim" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("lokasyon")}</label>
                <Controller
                  name="lokasyonId"
                  control={control}
                  render={({ field }) => <Location field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("departman")}</label>
                <Controller
                  name="departmanId"
                  control={control}
                  render={({ field }) => <Departman field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("personelTipi")}</label>
                <Controller
                  name="personelTipiKodId"
                  control={control}
                  render={({ field }) => <PersonelTip field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("gorev")}</label>
                <Controller
                  name="gorevKodId"
                  control={control}
                  render={({ field }) => <PersonelGorev field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("unvan")}</label>
                <Controller
                  name="unvanKodId"
                  control={control}
                  render={({ field }) => <PersonelUnvan field={field} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 p-10">
          <div className="border h-full">
            <img src="" className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

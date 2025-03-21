import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Checkbox, Divider, Input, InputNumber, Select } from "antd";
import Firma from "../../../../components/form/Firma";
import Birim from "../../../../components/form/Birim";
import MalzemeTipi from "../../../../components/form/MalzemeTipi";
import Depo from "../../../../components/form/selects/Depo";
import FirmaUnvani from "../../../../components/form/FirmaUnvani";

const GeneralInfo = ({ isValid }) => {
  const { control } = useFormContext();

  return (
    <div>
      <div className="grid gap-1">
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeKodu")}</label>
                <Controller
                  name="malzemeKod"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={isValid === "error" ? { borderColor: "#dc3545" } : isValid === "success" ? { borderColor: "#23b545" } : { color: "#000" }}
                      onChange={(e) => field.onChange(e.target.value)}
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
                  render={({ field }) => <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                />
              </div>
            </div>
            <div className="col-span-8">
              <div className="flex flex-col gap-1">
                <label>{t("tanimi")}</label>
                <Controller name="tanim" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("birim")}</label>
                <Controller name="birimKodId" control={control} render={({ field }) => <Birim field={field} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeTipi")}</label>
                <Controller name="malzemeTipKodId" control={control} render={({ field }) => <MalzemeTipi field={field} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("marka")}</label>
                <Controller name="" control={control} render={({ field }) => <Input field={field} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("model")}</label>
                <Controller name="" control={control} render={({ field }) => <Input field={field} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <Controller name="fiyat" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="grid gap-1">
                <div className="col-span-6">
                  <div className="flex flex-col gap-1">
                    <label>{t("kdvOrani")}</label>
                    <Controller name="kdvOran" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
                  </div>
                </div>
                <div className="col-span-6 self-end">
                  <div className="flex flex-col gap-1">
                    <label>{t("")}</label>
                    <Controller
                      name="kdvDH"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultValue="dahil"
                          options={[
                            { value: "dahil", label: <span>Dahil</span> },
                            { value: "haric", label: <span>Hariç</span> },
                          ]}
                          onChange={(e) => field.onChange(e)}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("kritikStokMiktari")}</label>
                <Controller name="kritikMiktar" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("seriNo")}</label>
                <Controller name="seriNo" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("barkodNo")}</label>
                <Controller name="barKodNo" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("depo")}</label>
                <Controller name="depoId" control={control} render={({ field }) => <Depo type="MALZEME" field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("bolum")}</label>
                <Controller name="bolum" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("raf")}</label>
                <Controller name="raf" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("olcu")}</label>
                <Controller name="olcu" control={control} render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("yedekParca")}</label>
                <Controller
                  name="yedekParca"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("sarfMalz")}</label>
                <Controller
                  name="sarfMlz"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("demirbas")}</label>
                <Controller
                  name="demirBas"
                  control={control}
                  render={({ field }) => <Checkbox {...field} checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6">
          <Divider />
        </div>
        <div className="col-span-6 p-10">
          <h3 className="sub-title">{t("tedarikciBilgileri")}</h3>
          <div className="grid gap-1">
            {/* <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("firmaKodu")}</label>
                <Controller name="firmaId" control={control} render={({ field }) => <Firma field={field} />} />
              </div>
            </div> */}
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("firmaUnvani")}</label>
                <Controller name="unvan" control={control} render={({ field }) => <FirmaUnvani field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <Controller name="tedarikciFiyat" control={control} render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("iskontoOrani")}</label>
                <Controller
                  name="tedarikciIskontoOran"
                  control={control}
                  render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-10">
          <h3 className="sub-title">{t("durumBilgileri")}</h3>
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("girenMiktar")}</label>
                <Controller
                  name="girenMiktar"
                  control={control}
                  render={({ field }) => <InputNumber {...field} className="w-full" disabled onChange={(e) => field.onChange(e)} />}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("cikanMiktar")}</label>
                <Controller
                  name="cikanMiktar"
                  control={control}
                  render={({ field }) => <InputNumber {...field} className="w-full" disabled onChange={(e) => field.onChange(e)} />}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("stokMiktar")}</label>
                <Controller
                  name="stokMiktar"
                  control={control}
                  render={({ field }) => <InputNumber {...field} className="w-full" disabled onChange={(e) => field.onChange(e)} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("sonAlinanFirma")}</label>
                <Controller name="sonAlinanFirma" control={control} render={({ field }) => <Input {...field} disabled onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("sonAlisTarihi")}</label>
                <Controller name="sonAlisTarih" control={control} render={({ field }) => <Input {...field} disabled onChange={(e) => field.onChange(e.target.value)} />} />
              </div>
              <div className="flex flex-col gap-1">
                <label>{t("sonAlisFiyati")}</label>
                <Controller name="sonFiyat" control={control} render={({ field }) => <InputNumber {...field} className="w-full" disabled onChange={(e) => field.onChange(e)} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, Popover, Radio, TimePicker } from "antd";
import ServisType from "../../../../../../components/form/ServisType";
import Driver from "../../../../../../components/form/Driver";
import Location from "../../../../../../components/form/Location";

dayjs.locale("tr");

const GeneralInfo = () => {
  const [value, setValue] = useState("servis");
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();

  const content = (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        <Controller name="" control={control} render={({ field }) => <Checkbox {...field} />} />
        <label>Tamamlandı</label>
      </div>
      <div className="flex gap-2">
        <Controller name="" control={control} render={({ field }) => <Checkbox {...field} />} />
        <label>Yapılamadı</label>
      </div>
      <div className="flex gap-2">
        <Controller name="" control={control} render={({ field }) => <Checkbox {...field} />} />
        <label>Tekrarlanacak</label>
      </div>
      <div className="flex gap-2">
        <Controller name="" control={control} render={({ field }) => <Checkbox {...field} />} />
        <label>Garanti kapsamında</label>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="plaka">Plaka</label>
                <Controller
                  name="plaka"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
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
                <label htmlFor="guncelKm">Güncel Km.</label>
                <Controller name="guncelKm" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Tarih</label>
                <Controller
                  name="tarih"
                  control={control}
                  render={({ field }) => (
                    <ConfigProvider locale={tr_TR}>
                      <DatePicker
                        {...field}
                        placeholder=""
                        locale={dayjs.locale("tr")}
                        format="DD.MM.YYYY"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </ConfigProvider>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Saat</label>
                <Controller
                  name="saat"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      placeholder=""
                      format="HH:mm"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Servis Kodu</label>
                <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Servis Tanımı</label>
                <Controller name="" control={control} render={({ field }) => <Input field={field} readOnly />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Servis Tipi</label>
                <Controller name="" control={control} render={({ field }) => <Input field={field} readOnly />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="surucuId">Sürücü</label>
                <Controller name="surucuId" control={control} render={({ field }) => <Driver field={field} />} />
              </div>
            </div>
            <div className="col-span-12">
              <Divider />
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Başlama Tarihi</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <ConfigProvider locale={tr_TR}>
                      <DatePicker
                        {...field}
                        placeholder=""
                        locale={dayjs.locale("tr")}
                        format="DD.MM.YYYY"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </ConfigProvider>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Saat</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      placeholder=""
                      format="HH:mm"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Bitiş Tarihi</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <ConfigProvider locale={tr_TR}>
                      <DatePicker
                        {...field}
                        placeholder=""
                        locale={dayjs.locale("tr")}
                        format="DD.MM.YYYY"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </ConfigProvider>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Saat</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      placeholder=""
                      format="HH:mm"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Araç Km.</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber field={field} className="w-full" />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>İş Emri No</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-20">
          <div className="grid gap-1">
            <div className="col-span-12" style={{ marginTop: "26px" }}>
              <div className="grid gap-1">
                <div className="col-span-3">
                  <Button className="w-full bg-success text-white">Aktif</Button>
                  <Controller name="" control={control} render={({ field }) => <Checkbox {...field} style={{ display: "none" }} />} />
                </div>
                <div className="col-span-3">
                  <Button className="w-full bg-secondary text-white">Devam Ediyor</Button>
                  <Controller name="" control={control} render={({ field }) => <Checkbox {...field} style={{ display: "none" }} />} />
                </div>
                <div className="col-span-3">
                  <Button className="w-full bg-error text-white">Durduruldu</Button>
                  <Controller name="" control={control} render={({ field }) => <Checkbox {...field} style={{ display: "none" }} />} />
                </div>
                <div className="col-span-3">
                  <Popover content={content} trigger="click" placement="bottom" open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
                    <Button className="w-full bg-info text-white">Tamamlandı</Button>
                  </Popover>

                  <Controller name="" control={control} render={({ field }) => <Checkbox {...field} style={{ display: "none" }} />} />
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>Servis Nedeni</label>
                <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Fatura No</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
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
                <label>Fatura Tarihi</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <ConfigProvider locale={tr_TR}>
                      <DatePicker
                        {...field}
                        placeholder=""
                        locale={dayjs.locale("tr")}
                        format="DD.MM.YYYY"
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </ConfigProvider>
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Talep No</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
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
                <label>Onay No</label>
                <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
              </div>
            </div>
            <div className="col-span-12">
              <Divider />
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label htmlFor="lokasyonId">Lokasyon</label>
                <Controller name="lokasyonId" control={control} render={({ field }) => <Location field={field} />} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>Masraf Merkezi</label>
                <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
              </div>
            </div>
            <div className="col-span-12">
              <Divider />
            </div>
            <div className="col-span-12">
              <Radio.Group onChange={(e) => setValue(e.target.value)} value={value}>
                <Radio value="servis">Yetkili Servis</Radio>
                <Radio value="departman">Bakım Departmanı</Radio>
              </Radio.Group>
            </div>
            {value === "servis" && (
              <div className="col-span-12" style={{ marginTop: "13px" }}>
                <div className="flex flex-col gap-1">
                  <label>Yetkili Servis</label>
                  <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
                </div>
              </div>
            )}

            {value === "departman" && (
              <div className="col-span-12" style={{ marginTop: "13px" }}>
                <div className="flex flex-col gap-1">
                  <label>Bakım Departmanı</label>
                  <Controller name="" control={control} render={({ field }) => <ServisType field={field} />} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12">
          <Divider />
        </div>
        <div className="col-span-12">
          <h3 className="sub-title">Maliyetler</h3>
          <div className="grid gap-1 mt-10">
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>İşçilik Ücreti</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>Mlz. Ücreti</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>Diğer</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>KDV</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
            <div className="col-span-2"></div>
            <div className="col-span-2">
              <div className="flex flex-col gap-1">
                <label>Toplam</label>
                <Controller name="" control={control} render={({ field }) => <InputNumber {...field} className="w-full" readOnly />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

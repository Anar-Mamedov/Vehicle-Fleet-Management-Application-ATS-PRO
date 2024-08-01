import { Controller, useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import { ConfigProvider, DatePicker, Input, Select } from 'antd'
import dayjs from 'dayjs';
import 'dayjs/locale/tr'
import tr_TR from 'antd/lib/locale/tr_TR'

dayjs.locale('tr')


const KisiselBilgiler = () => {
    const { control } = useFormContext()

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
                                        field.onChange(e.target.value)
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
                                <Input
                                    onChange={(e) => {
                                        field.onChange(e.target.value)
                                    }}
                                />
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
                                        field.onChange(e.target.value)
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dogumTarihi" className='text-info'>{t("dogumTarihi")}</label>
                        <Controller
                            name="dogumTarihi"
                            control={control}
                            render={({ field }) => (
                                <ConfigProvider locale={tr_TR}>
                                    <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                        field.onChange(e)
                                    }} />
                                </ConfigProvider>
                            )}
                        />
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
                                        field.onChange(e.target.value)
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
                                        field.onChange(e.target.value)
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="iseBaslamaTarihi" className='text-info'>{t("iseBaslamaTarihi")}</label>
                        <Controller
                            name="iseBaslamaTarihi"
                            control={control}
                            render={({ field }) => (
                                <ConfigProvider locale={tr_TR}>
                                    <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                        field.onChange(e)
                                    }} />
                                </ConfigProvider>
                            )}
                        />
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
                                        field.onChange(e.target.value)
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
                                        field.onChange(e.target.value)
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="isetenAyrilmaTarihi" className='text-info'>{t("isetenAyrilmaTarihi")}</label>
                        <Controller
                            name="isetenAyrilmaTarihi"
                            control={control}
                            render={({ field }) => (
                                <ConfigProvider locale={tr_TR}>
                                    <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                        field.onChange(e)
                                    }} />
                                </ConfigProvider>
                            )}
                        />
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
                                        field.onChange(e.target.value)
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
                                        field.onChange(e.target.value)
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

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { t } from 'i18next'
import { Button, Divider } from 'antd'
import { GetSettingByTypeService, UpdateSettingByTypeService } from '../../../../../api/services/settings/services'
import TextInput from "../../../../components/form/inputs/TextInput"
import Textarea from "../../../../components/form/inputs/Textarea"

const FirmaSettings = () => {
    const defaultValues = {}
    const methods = useForm({
        defaultValues: defaultValues
    })
    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        GetSettingByTypeService(1).then((res) => {
            setValue("siraNo", res?.data.siraNo);
            setValue("firmaUnvan", res?.data.firmaUnvan);
            setValue("adres1", res?.data.adres1);
            setValue("adres2", res?.data.adres2);
            setValue("sehir", res?.data.sehir);
            setValue("ilce", res?.data.ilce);
            setValue("pk", res?.data.pk);
            setValue("ulke", res?.data.ulke);
            setValue("telefon", res?.data.telefon);
            setValue("fax", res?.data.fax);
            setValue("web", res?.data.web);
            setValue("email", res?.data.email);
            setValue("vergiDaire", res?.data.vergiDaire);
            setValue("vergiNo", res?.data.vergiNo);
            setValue("aciklama", res?.data.aciklama);
        });
    }, []);

    const onSubmit = handleSubmit(values => {
        const body = {
            "siraNo": values.siraNo,
            "firmaUnvan": values.firmaUnvan,
            "adres1": values.adres1,
            "adres2": values.adres2,
            "sehir": values.sehir,
            "ilce": values.ilce,
            "pk": values.pk,
            "ulke": values.ulke,
            "telefon": values.telefon,
            "fax": values.fax,
            "web": values.web,
            "email": values.email,
            "vergiDaire": values.vergiDaire,
            "vergiNo": values.vergiNo,
            "aciklama": values.aciklama
        }

        UpdateSettingByTypeService(1, body).then((res) => {
            if (res.data.statusCode === 202) {
                console.log(1)
            }
        });
    })


    return (
        <FormProvider {...methods}>
            <div className='grid gap-1'>
                <div className="col-span-2 text-center">
                    <img src="/images/ats_login_image.jpg" alt="ats" className='w-full' />
                </div>
                <div className="col-span-10">
                    <div className="grid gap-1 p-10">
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("firmaUnvani")}</label>
                                <TextInput name="firmaUnvan" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 1</label>
                                <TextInput name="adres1" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 2</label>
                                <TextInput name="adres2" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("sehir")}</label>
                                <TextInput name="sehir" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("ilce")}</label>
                                <TextInput name="ilce" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("pk")}</label>
                                <TextInput name="pk" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("ulke")}</label>
                                <TextInput name="ulke" />
                            </div>
                        </div>
                        <div className="col-span-12 mt-10 mb-10">
                            <Divider />
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("telefon")}</label>
                                <TextInput name="telefon" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("fax")}</label>
                                <TextInput name="fax" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("web")}</label>
                                <TextInput name="web" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("email")}</label>
                                <TextInput name="email" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiDairesi")}</label>
                                <TextInput name="vergiDaire" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiNumarasi")}</label>
                                <TextInput name="vergiNo" />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>{t("aciklama")}</label>
                                <Textarea name="aciklama" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-end flex gap-1 col-span-12 mt-10">
                <Button className="btn btn-min primary-btn" onClick={onSubmit}>{t("kaydet")}</Button>
                <Button className="btn btn-min cancel-btn">{t("kapat")}</Button>
            </div>
        </FormProvider>
    )
}

export default FirmaSettings

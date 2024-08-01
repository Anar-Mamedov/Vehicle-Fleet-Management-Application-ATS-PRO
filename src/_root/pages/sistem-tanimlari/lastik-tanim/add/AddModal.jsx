import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Divider, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { AddIsLastikService } from "../../../../../api/services/lastiktanim_services";
import LastikMarka from "../../../../components/form/LastikMarka";
import LastikModel from "../../../../components/form/LastikModel";
import Ebat from "../../../../components/form/Ebat";
import LastikTipi from "../../../../components/form/LastikTipi";
import FirmaUnvani from "../../../../components/form/FirmaUnvani";
import TextArea from "antd/es/input/TextArea";

const AddModal = ({ setStatus }) => {
    const [openModal, setopenModal] = useState(false);

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control } = methods;

    const onSubmit = handleSubmit((values) => {
        const body = {
            "tanim": values.tanim,
            "aciklama": values.aciklama,
            "markaKodId": values.markaKodId || -1,
            "modelKodId": values.modelKodId || -1,
            "tipKodId": values.tipKodId || -1,
            "ebatKodId": values.ebatKodId || -1,
            "lastikOmru": values.lastikOmru || 0,
            "basinc": values.basinc || 0,
            "disDerinlik": values.disDerinlik || 0,
            "fiyat": values.fiyat || 0,
            "firmaId": values.firmaId || -1,
        }

        AddIsLastikService(body).then(res => {
            if (res.data.statusCode === 200) {
                setStatus(true)
                reset(defaultValues)
                setopenModal(false)
            }
        })
        setStatus(false)
    })

    const footer = [
        <Button
            key="submit"
            className="btn btn-min primary-btn"
            onClick={onSubmit}
        >
            {t("kaydet")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => {
                setopenModal(false);
                reset(defaultValues)
            }}
        >
            {t("iptal")}
        </Button>,
    ];

    return (
        <>
            <Button className="btn primary-btn" onClick={() => setopenModal(true)}>
                <PlusOutlined /> {t("ekle")}
            </Button>
            <Modal
                title={t("yeniLastikGirisi")}
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <FormProvider {...methods}>
                    <form>
                        <div className="grid gap-1">
                            <div className="col-span-12">
                                <h2 className="">Genel Bilgiler</h2>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("lastikTanimi")}</label>
                                    <Controller
                                        name="tanim"
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
                                    <label>{t("marka")}</label>
                                    <Controller
                                        name="markaKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <LastikMarka field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("model")}</label>
                                    <Controller
                                        name="modelKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <LastikModel
                                                field={field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("ebat")}</label>
                                    <Controller
                                        name="ebatKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <Ebat field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("tip")}</label>
                                    <Controller
                                        name="tipKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <LastikTipi field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("disDerinligi")}</label>
                                    <Controller
                                        name="disDerinlik"
                                        control={control}
                                        render={({ field }) => (
                                            <InputNumber
                                                {...field}
                                                className="w-full"
                                                onChange={(e) => field.onChange(e)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("basinc")}</label>
                                    <Controller
                                        name="basinc"
                                        control={control}
                                        render={({ field }) => (
                                            <InputNumber
                                                {...field}
                                                className="w-full"
                                                onChange={(e) => field.onChange(e)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("lastikOmru")}</label>
                                    <Controller
                                        name="lastikOmru"
                                        control={control}
                                        render={({ field }) => (
                                            <InputNumber
                                                {...field}
                                                className="w-full"
                                                onChange={(e) => field.onChange(e)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="m-20">
                            <Divider />
                        </div>
                        <div className="grid gap-1">
                            <div className="col-span-12">
                                <h2 className="">Satınalma Bilgiler</h2>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("firma")}</label>
                                    <Controller
                                        name="firmaId"
                                        control={control}
                                        render={({ field }) => (
                                            <FirmaUnvani field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("fiyat")}</label>
                                    <Controller
                                        name="fiyat"
                                        control={control}
                                        render={({ field }) => (
                                            <InputNumber
                                                {...field}
                                                className="w-full"
                                                onChange={(e) => field.onChange(e)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="m-20">
                            <Divider />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>{t("aciklama")}</label>
                            <Controller
                                name="aciklama"
                                control={control}
                                render={({ field }) => (
                                    <TextArea {...field} />
                                )}
                            />
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

export default AddModal

import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import IsTipi from "../../../../components/form/IsTipi";
import BakimDepartman from "../../../../components/form/BakimDepartmani";
import { AddIsKartiService } from "../../../../../api/services/isKartlari_services";

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
            "isTipKodId": values.isTipKodId || -1,
            "bakimDepartmanKodId": values.bakimDepartmanKodId || -1,
            "dakika": values.dakika || 0,
            "saat": values.saat || 0,
            "ucret": values.ucret || 0
        }

        AddIsKartiService(body).then(res => {
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
                title={t("yeniIsKartiGirisi")}
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={600}
            >
                <FormProvider {...methods}>
                    <form>
                        <div className="grid gap-1">
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("isTanimi")}</label>
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
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("isTipi")}</label>
                                    <Controller
                                        name="isTipKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <IsTipi field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("bakimDepartman")}</label>
                                    <Controller
                                        name="bakimDepartmanKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <BakimDepartman
                                                field={field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>{t("saat")}</label>
                                    <Controller
                                        name="saat"
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>{t("dakika")}</label>
                                    <Controller
                                        name="dakika"
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
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("ucret")}</label>
                                    <Controller
                                        name="ucret"
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
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

export default AddModal

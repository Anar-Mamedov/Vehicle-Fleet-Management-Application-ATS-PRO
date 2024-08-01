import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import TextArea from "antd/es/input/TextArea";
import { AddCezaService } from "../../../../../api/services/ceza_services";

const AddModal = ({ setStatus }) => {
    const [openModal, setopenModal] = useState(false);

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control } = methods;

    const onSubmit = handleSubmit((values) => {
        const body = {
            "aciklama1": values.aciklama1,
            "aciklama2": values.aciklama2,
            "madde": values.madde,
            "kime": values.kime,
            "puan": values.puan || 0,
            "belgeNo": values.belgeNo,
            "tutar": values.tutar || 0
        }

        AddCezaService(body).then(res => {
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
                            <div className="col-span-4">
                                <div className="flex flex-col gap-1">
                                    <label>{t("cezaMaddesi")}</label>
                                    <Controller
                                        name="madde"
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
                                    <label>{t("kime")}</label>
                                    <Controller
                                        name="kime"
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
                                    <label>{t("belgeNo")}</label>
                                    <Controller
                                        name="belgeNo"
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
                                    <label>{t("tutar")}</label>
                                    <Controller
                                        name="tutar"
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
                                    <label>{t("puan")}</label>
                                    <Controller
                                        name="puan"
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
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1">
                                    <label>{t("aciklama")} 1</label>
                                    <Controller
                                        name="aciklama1"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-col gap-1">
                                    <label>{t("aciklama")} 2</label>
                                    <Controller
                                        name="aciklama2"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea {...field} />
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

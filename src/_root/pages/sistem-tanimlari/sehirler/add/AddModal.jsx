import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { AddTownService } from "../../../../../api/services/sehirtanimleri_services";

const AddModal = ({setStatus}) => {
    const [openModal, setopenModal] = useState(false);

    const defaultValues = {
        kod: "",
        tanim: "",
        ulkeKod: "",
    };
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control } = methods;

    const onSubmit = handleSubmit((values) => {
        const body = {
            "kod": values.kod,
            "tanim": values.tanim,
            "ulkeKod": values.ulkeKod
        }

        AddTownService(body).then(res => {
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
                title={t("yeniSehirGirisi")}
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={600}
            >
                <form>
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="tanim">{t("tanim")}</label>
                                <Controller
                                    name="tanim"
                                    control={control}
                                    render={({ field }) => <Input {...field} onChange={e => field.onChange(e)} />}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("il")}</label>
                                <Controller
                                    name="kod"
                                    control={control}
                                    render={({ field }) => <Input {...field} onChange={e => field.onChange(e)} />}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("ulkeKodu")}</label>
                                <Controller
                                    name="ulkeKod"
                                    control={control}
                                    render={({ field }) => <Input {...field} onChange={e => field.onChange(e)} />}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddModal

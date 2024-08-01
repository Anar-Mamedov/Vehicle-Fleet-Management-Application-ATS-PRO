import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Input, InputNumber, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import GuzergahCikisYeri from "../../../../components/form/GuzergahCikisYer";
import GuzergahVarisYeri from "../../../../components/form/GuzergahVarisYeri";
import Town from "../../../../components/form/Town";
import TextArea from "antd/es/input/TextArea";
import { AddGuzergahService, GuzergahCodeGetService } from "../../../../../api/services/guzergah_services";
import { CodeItemValidateService } from "../../../../../api/service";
import TownVaris from "../../../../components/form/TownVaris";
import SehirYer from "../../../../components/table/SehirYer";

const AddModal = ({ setStatus }) => {
    const [openModal, setopenModal] = useState(false);
    const [openSehirYerModal, setopenSehirYerModal] = useState(false);
    const [isValid, setIsValid] = useState("normal");
    const isFirstRender = useRef(true);

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control, setValue, watch } = methods;

    useEffect(() => {
        if (openModal && isFirstRender.current) {
            GuzergahCodeGetService().then((res) => setValue("guzergahKodu", res.data));
        }
    }, [openModal, setValue]);

    useEffect(() => {
        if (watch("guzergahKodu")) {
            const body = {
                tableName: "Guzergah",
                code: watch("guzergahKodu"),
            };
            CodeItemValidateService(body).then((res) => {
                !res.data.status ? setIsValid("success") : setIsValid("error");
            });
        }
    }, [watch("guzergahKodu")]);


    const onSubmit = handleSubmit((values) => {
        const body = {
            "guzergah": values.tanim,
            "guzergahKodu": values.guzergahKodu,
            "aciklama": values.aciklama,
            "mesafe": values.mesafe || 0,
            "tuketimOran": values.tuketim || 0,
            "dakika": values.dakika || 0,
            "saat": values.saat || 0,
            "cikisYeriId": values.cikisYeriId || -1,
            "varisYeriId": values.varisYeriId || -1,
            "cikisSehriId": values.cikisSehriId || -1,
            "varisSehriId": values.varisSehriId || -1
        }

        AddGuzergahService(body).then(res => {
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
            <Button className="btn primary-btn" onClick={() => setopenModal(true)}
                disabled={isValid === "error"
                    ? true
                    : isValid === "success"
                        ? false
                        : false}
            >
                <PlusOutlined /> {t("ekle")}
            </Button>
            <Modal
                title={t("yeniGuzergahGirisi")}
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
                                    <label>{t("guzergahKodu")}</label>
                                    <Controller
                                        name="guzergahKodu"
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
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("tanimi")}</label>
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
                                    <label>{t("cikisSehri")}</label>
                                    <Controller
                                        name="cikisSehriId"
                                        control={control}
                                        render={({ field }) => (
                                            <Town
                                                field={field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>{t("varisSehri")}</label>
                                    <Controller
                                        name="varisSehriId"
                                        control={control}
                                        render={({ field }) => (
                                            <TownVaris
                                                field={field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="grid gap-1">
                                    <div className="col-span-10">
                                        <div className="flex flex-col gap-1">
                                            <label>{t("cikisYeri")}</label>
                                            <Controller
                                                name="cikisYeriId"
                                                control={control}
                                                render={({ field }) => (
                                                    <GuzergahCikisYeri
                                                        field={field}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 self-end">
                                        <Button onClick={() => setopenSehirYerModal(true)}>...</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="grid gap-1">
                                    <div className="col-span-10">
                                        <div className="flex flex-col gap-1">
                                            <label>{t("varisYeri")}</label>
                                            <Controller
                                                name="varisYeriId"
                                                control={control}
                                                render={({ field }) => (
                                                    <GuzergahVarisYeri
                                                        field={field}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 self-end">
                                        <Button onClick={() => setopenSehirYerModal(true)}>...</Button>
                                    </div>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>{t("mesafe")}</label>
                                    <Controller
                                        name="mesafe"
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
                                    <label>{t("tuketim")}</label>
                                    <Controller
                                        name="tuketim"
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
                                    <label>{t("aciklama")}</label>
                                    <Controller
                                        name="aciklama"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Modal>

            <Modal
                // title={`${t("kilometreGuncellemeGecmisi")}: ${vehiclesData?.plaka}`}
                open={openSehirYerModal}
                onCancel={() => setopenSehirYerModal(false)}
                maskClosable={false}
                footer={[]}
                width={1200}
            >
                {/* <KmLog data={vehiclesData} setDataStatus={setDataStatus} /> */}
                <SehirYer />
            </Modal>
        </>
    )
}

export default AddModal

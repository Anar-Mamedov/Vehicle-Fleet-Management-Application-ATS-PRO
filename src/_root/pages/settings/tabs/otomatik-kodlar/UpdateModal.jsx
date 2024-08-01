import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next"
import { Button, Modal } from "antd"
import { UpdateModuleInfoService } from "../../../../../api/services/settings/services";
import TextInput from "../../../../components/form/inputs/TextInput"
import NumberInput from "../../../../components/form/inputs/NumberInput"
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput"

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, data }) => {

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, setValue } = methods;

    useEffect(() => {
        if (updateModal) {
            setValue("tbNumaratorId", data.tbNumaratorId);
            setValue("tanim", data.tanim);
            setValue("onEk", data.onEk);
            setValue("alaniKilitle", data.alaniKilitle);
            setValue("aktif", data.aktif);
            setValue("numara", data.numara);
            setValue("haneSayisi", data.haneSayisi);
        }
    }, [ updateModal]);

    const onSubmit = handleSubmit((values) => {
        const body = {
            "tbNumaratorId": data.tbNumaratorId,
            "tanim": values.tanim,
            "onEk": values.onEk,
            "alaniKilitle": values.alaniKilitle,
            "aktif": values.aktif,
            "numara": values.numara,
            "haneSayisi": values.haneSayisi
        }

        UpdateModuleInfoService(body).then((res) => {
            if (res.data.statusCode === 202) {
                setUpdateModal(false);
                setStatus(true);
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
            {t("guncelle")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => {
                setUpdateModal(false);
                setStatus(true);
            }}
        >
            {t("kapat")}
        </Button>,
    ];

    console.log(data)

    return (
        <Modal
            title={t("")}
            open={updateModal}
            onCancel={() => setUpdateModal(false)}
            maskClosable={false}
            footer={footer}
            width={500}
        >
            <FormProvider {...methods}>
                <form>
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>{t("tanim")}</label>
                                <TextInput name="tanim" />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>{t("onEk")}</label>
                                <TextInput name="onEk" />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>{t("no")}</label>
                                <NumberInput name="numara" />
                            </div>
                        </div>
                        <div className="col-span-12 mb-10">
                            <div className="flex flex-col gap-1">
                                <label>{t("haneSayisi")}</label>
                                <NumberInput name="haneSayisi" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex gap-2">
                                <CheckboxInput name="alaniKilitle" />
                                <label>{t("alaniKilitle")}</label>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex  gap-2">
                                <CheckboxInput name="aktif" />
                                <label>{t("aktif")}</label>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}

UpdateModal.propTypes = {
    updateModal: PropTypes.bool,
    setUpdateModal: PropTypes.func,
    setStatus: PropTypes.func,
    data: PropTypes.array,
};

export default UpdateModal

import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Button, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { GetCezaByIdService, UpdateCezaService } from '../../../../../api/services/ceza_services'

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
    const [cezaId, setCezaId] = useState(0);

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control, setValue } = methods;

    useEffect(() => {
        GetCezaByIdService(id).then(res => {
            setValue("aciklama1", res.data.aciklama1)
            setValue("aciklama2", res.data.aciklama2)
            setValue("madde", res.data.madde)
            setValue("kime", res.data.kime)
            setValue("puan", res.data.puan)
            setValue("belgeNo", res.data.belgeNo)
            setValue("tutar", res.data.tutar)
            setCezaId(res.data.siraNo)
        })
    }, [id, updateModal])

    const onSubmit = handleSubmit((values) => {
        const body = {
            "siraNo": cezaId,
            "aciklama1": values.aciklama1,
            "aciklama2": values.aciklama2,
            "madde": values.madde,
            "kime": values.kime,
            "puan": values.puan || 0,
            "belgeNo": values.belgeNo,
            "tutar": values.tutar || 0
        }

        UpdateCezaService(body).then(res => {
            if (res.data.statusCode === 202) {
                setUpdateModal(false)
                setStatus(true)
                reset(defaultValues)
            }
        })
        setStatus(false)
    })

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
                {t("guncelle")}
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setUpdateModal(false)
                reset(defaultValues)
            }}>
                {t("iptal")}
            </Button>
        ]
    )

    return (
        <Modal
            title={t("lastikTanimGuncelle")}
            open={updateModal}
            onCancel={() => setUpdateModal(false)}
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
    )
}

UpdateModal.propTypes = {
    updateModal: PropTypes.bool,
    setUpdateModal: PropTypes.func,
    setStatus: PropTypes.func,
    id: PropTypes.number,
    status: PropTypes.bool
}

export default UpdateModal

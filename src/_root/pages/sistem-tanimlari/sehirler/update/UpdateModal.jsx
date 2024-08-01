import { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Button, Input, Modal } from 'antd'
import { UpdateTownService } from '../../../../../api/services/sehirtanimleri_services'

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, status, record }) => {
    const defaultValues = {
        kod: record.kod,
        tanim: record.tanim,
        ulkeKod: record.ulkeKod,
    };
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, control, setValue } = methods;

    useEffect(() => {
        console.log(record)
        setValue("kod", record.kod)
        setValue("ulkeKod", record.ulkeKod)
        setValue("tanim", record.tanim)
    }, [record])

    const onSubmit = handleSubmit((values) => {
        const body = {
            "sehirId": record.sehirId,
            "kod": values.kod,
            "tanim": values.tanim,
            "ulkeKod": values.ulkeKod
        }

        UpdateTownService(body).then(res => {
            if(res.data.statusCode === 202) {
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
            title={t("yeniSehirGirisi")}
            open={updateModal}
            onCancel={() => setUpdateModal(false)}
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
    )
}

UpdateModal.propTypes = {
    updateModal: PropTypes.bool,
    setUpdateModal: PropTypes.func,
    setStatus: PropTypes.func,
    record: PropTypes.object,
    status: PropTypes.bool
}

export default UpdateModal

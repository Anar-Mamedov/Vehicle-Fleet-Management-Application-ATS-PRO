import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Button, Drawer } from 'antd'
import { FunnelPlotOutlined } from '@ant-design/icons'
import TextInput from '../../../../components/form/inputs/TextInput'
import Marka from '../../../../components/form/selects/Marka'
import Model from '../../../../components/form/selects/Model'
import CodeControl from '../../../../components/form/selects/CodeControl'
import NumberInput from '../../../../components/form/inputs/NumberInput'
import MaterialType from '../../../../components/form/selects/MaterialType'

const Filter = ({ filter, clearFilters }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const defaultValues = {
        plaka: "",
        model: "",
        marka: "",
        aracTip: "",
        grup: "",
        renk: "",
        yil: "",
        yakitTip: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })
    const { handleSubmit, reset } = methods

    const handleSearchFilters = handleSubmit((values) => {
        if (!values.aracId && !values.aracTip && !values.model && !values.marka && !values.plaka && !values.yakitTip && !values.grup && !values.renk && !values.yil) {
            setHasValue(false)
        } else {
            setHasValue(true)
        }

        const body = {
            plaka: values.plaka || '',
            model: values.model || '',
            marka: values.marka || '',
            aracTip: values.aracTip || '',
            grup: values.grup || '',
            renk: values.renk || '',
            yil: values.yil || 0,
            yakitTip: values.yakitTip || '',
        }

        filter(body)
    })

    const clear = () => {
        reset()
        setHasValue(false)
        clearFilters()
    }

    const title = (
        <div className='flex justify-between align-center'>
            <p><FunnelPlotOutlined /> {t('filtre')}</p>
            <div className='flex gap-1'>
                <Button className='btn btn-min cancel-btn' onClick={() => {
                    clear()
                    setOpenDrawer(false)
                }}>{t('temizle')}</Button>
                <Button className='btn btn-min primary-btn' onClick={() => {
                    handleSearchFilters()
                    setOpenDrawer(false)
                }}>{t('uygula')}</Button>
            </div>
        </div>
    )

    return (
        <>
            <Button className="btn primary-btn" onClick={() => setOpenDrawer(true)}>
                {hasValue && <div className='filter-icon' />}
                <FunnelPlotOutlined /> {t('filtre')}
            </Button>
            <Drawer title={title} onClose={() => setOpenDrawer(false)} open={openDrawer}>
                <FormProvider {...methods}>
                    <div className="grid gap-1">
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t("plaka")}</label>
                                <TextInput name="plaka" />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('aracTip')}</label>
                                <CodeControl name="aracTip" codeName="aracTipId" id={100} />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('marka')}</label>
                                <Marka />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('model')}</label>
                                <Model />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('aracGrup')}</label>
                                <CodeControl name="grup" codeName="aracGrubuId" id={101} />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('renk')}</label>
                                <CodeControl name="renk" codeName="aracRenkId" id={111} />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('yil')}</label>
                                <NumberInput name="yil" />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('yakitTip')}</label>
                                <MaterialType name="yakitTip" codeName="yakitTipId" type="YAKIT" />
                            </div>
                        </div>
                    </div>
                </FormProvider>
            </Drawer>
        </>
    )
}

Filter.propTypes = {
    filter: PropTypes.func,
    clearFilters: PropTypes.func,
}

export default Filter

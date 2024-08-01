import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import dayjs from 'dayjs'
import { Button, Drawer, Input, Select } from 'antd'
import { FunnelPlotOutlined } from '@ant-design/icons'
import Location from '../../../../components/form/tree/Location'
import Depo from '../../../../components/form/selects/Depo'
import TextInput from '../../../../components/form/inputs/TextInput'

const Filter = ({ filter, clearFilters }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const defaultValues = {
        depo: "",
        lokasyon: "",
        malzemeKod: "",
    }
    const methods = useForm({
        defaultValues: defaultValues
    })
    const { control, handleSubmit, reset } = methods

    const handleSearchFilters = handleSubmit((values) => {
        let hasValue = false;

        if (values.malzemeKod || values.depoId || values.lokasyonId || values.marka || values.plaka || values.yakitTip || values.grup || values.renk || values.yil) {
            hasValue = true;
        }

        setHasValue(hasValue);

        let startDate = '';
        let endDate = '';

        switch (values.date) {
            case 'day':
                startDate = dayjs().subtract(1, 'day').format("YYYY-MM-DD");
                endDate = dayjs().format("YYYY-MM-DD");
                break;
            case 'week':
                startDate = dayjs().subtract(7, 'day').format("YYYY-MM-DD");
                endDate = dayjs().format("YYYY-MM-DD");
                break;
            case 'month':
                startDate = dayjs().subtract(1, 'month').format("YYYY-MM-DD");
                endDate = dayjs().format("YYYY-MM-DD");
                break;
            case '3':
                startDate = dayjs().subtract(3, 'month').format("YYYY-MM-DD");
                endDate = dayjs().format("YYYY-MM-DD");
                break;
            case '6':
                startDate = dayjs().subtract(6, 'month').format("YYYY-MM-DD");
                endDate = dayjs().format("YYYY-MM-DD");
                break;
            default:
                startDate = null;
                endDate = null;
        }

        let data;

        if (!values.depo && !values.lokasyonId && !values.malzemeKod && !values.date) {
            data = null
        } else {
            data = {
                malzemeKodu: values.malzemeKod || '',
                lokasyon: values.lokasyon || '',
                depo: values.depo || '',
                startDate: startDate,
                endDate: endDate,
            };
        }

        filter(data);
    });

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
                                <label>{t('malzemeKodu')}</label>
                                <TextInput name="malzemeKod" />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('lokasyon')}</label>
                                <Location />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('depo')}</label>
                                <Depo name="depoId" type="MALZEME" />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label>{t('sure')}</label>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            onChange={e => field.onChange(e)}
                                            allowClear
                                            options={[
                                                {
                                                    value: 'all',
                                                    label: 'Tümü',
                                                },
                                                {
                                                    value: 'day',
                                                    label: 'Bugün',
                                                },
                                                {
                                                    value: 'week',
                                                    label: 'Bu hafta',
                                                },
                                                {
                                                    value: 'month',
                                                    label: 'Bu ay',
                                                },
                                                {
                                                    value: '3',
                                                    label: 'Son 3 ay',
                                                },
                                                {
                                                    value: '6',
                                                    label: 'Son 6 ay',
                                                },
                                            ]}
                                        />
                                    )}
                                />
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

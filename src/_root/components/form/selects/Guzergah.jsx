import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from 'antd'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const Guzergah = () => {
    const [data, setData] = useState([])
    const { setValue, watch, control } = useFormContext()

    const handleClick = () => {
        CodeControlByUrlService('FuelRoute/GetFuelRouteListForSelectInput').then(res => {
            setData(res.data)
        })
    }

    return (
        <Controller
            name="guzergahId"
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={data.map((item) => ({
                        label: item.guzergah,
                        value: item.guzergahId,
                    }))}
                    value={watch('guzergah')}
                    onClick={handleClick}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            const selectedOption = data.find(option => option.guzergahId === e);
                            if (!selectedOption) {
                                setValue('guzergah', "")
                            }
                        } else {
                            const selectedOption = data.find(option => option.guzergahId === e);
                            if (selectedOption) {
                                setValue('guzergah', selectedOption.guzergah)
                            }
                        }
                    }}
                />
            )}
        />

    )
}

export default Guzergah

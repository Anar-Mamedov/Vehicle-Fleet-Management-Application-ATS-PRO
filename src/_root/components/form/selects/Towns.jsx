import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const Towns = () => {
    const [data, setData] = useState([])
    const { setValue, watch, control } = useFormContext()

    const handleClickSelect = () => {
        CodeControlByUrlService("Town/GetTownListForSelectInput").then(res => {
            setData(res.data)
        })
    }

    return (
        <Controller
            name="ilSehirId"
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
                        label: item.tanim,
                        value: item.sehirId,
                    }))}
                    value={watch("il")}
                    onClick={handleClickSelect}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            field.onChange("")
                            const selectedOption = data.find(option => option.sehirId === e);
                            if (!selectedOption) {
                                setValue("il", "")
                            }
                        } else {
                            const selectedOption = data.find(option => option.sehirId === e);
                            if (selectedOption) {
                                setValue("il", selectedOption.tanim)
                            }
                        }
                    }}
                />
            )}
        />

    )
}

Towns.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Towns

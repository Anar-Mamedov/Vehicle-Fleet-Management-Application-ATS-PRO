import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CustomCodeControlService } from '../../../api/service'
import { Select } from 'antd'

const Driver = ({ field }) => {
    const [data, setData] = useState([])
    const { watch, setValue } = useFormContext()

    const handleClickSelect = () => {
        CustomCodeControlService("Driver/GetDriverListForSelectInput").then(res => {
            setData(res.data)
        })
    }

    return (
        <>
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
                    label: item.isim,
                    value: item.surucuId,
                }))}
                value={watch('surucu')}
                onClick={handleClickSelect}
                onChange={e => {
                    field.onChange(e)
                    if (e === undefined) {
                        const selectedOption = data.find(option => option.surucuId === e);
                        if (!selectedOption) {
                            setValue('surucu', "")
                        }
                    } else {
                        const selectedOption = data.find(option => option.surucuId === e);
                        if (selectedOption) {
                            setValue('surucu', selectedOption.isim)
                        }
                    }
                }}
            />
        </>
    )
}

Driver.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Driver

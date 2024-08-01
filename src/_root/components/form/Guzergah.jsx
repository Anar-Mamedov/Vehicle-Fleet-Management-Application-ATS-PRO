import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { CustomCodeControlService } from '../../../api/service'

const Guzergah = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()

    const handleClick = () => {
        CustomCodeControlService('FuelRoute/GetFuelRouteListForSelectInput').then(res => {
            setData(res.data)
        })
    }

    return (
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
    )
}

Guzergah.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Guzergah

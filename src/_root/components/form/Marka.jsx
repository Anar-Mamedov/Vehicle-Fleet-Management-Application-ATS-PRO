import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CustomCodeControlService } from '../../../api/service'
import { Select } from 'antd'

const Marka = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()

    const handleClickSelect = () => {
        CustomCodeControlService("Mark/GetMarkList").then(res => {
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
                label: item.marka,
                value: item.siraNo,
            }))}
            value={watch('marka')}
            onClick={handleClickSelect}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    field.onChange("")
                    const selectedOption = data.find(option => option.siraNo === e);
                    if (!selectedOption) {
                        setValue("marka", "")
                    }
                } else {
                    const selectedOption = data.find(option => option.siraNo === e)
                    if (selectedOption) {
                        setValue("marka", selectedOption.marka)
                    }
                }
            }}
        />
    )
}

Marka.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Marka

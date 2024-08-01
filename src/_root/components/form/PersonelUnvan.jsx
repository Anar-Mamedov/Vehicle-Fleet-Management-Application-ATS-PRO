import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { CodeControlService } from '../../../api/service'

const PersonelUnvan = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()

    const handleClick = () => {
        CodeControlService(500).then(res => {
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
                label: item.codeText,
                value: item.siraNo,
            }))}
            value={watch('unvan')}
            onClick={handleClick}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    const selectedOption = data.find(option => option.siraNo === e);
                    if (!selectedOption) {
                        setValue('unvan', "")
                    }
                } else {
                    const selectedOption = data.find(option => option.siraNo === e);
                    if (selectedOption) {
                        setValue('unvan', selectedOption.codeText)
                    }
                }
            }}
        />
    )
}

PersonelUnvan.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default PersonelUnvan

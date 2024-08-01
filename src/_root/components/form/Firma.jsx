import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { CustomCodeControlService } from '../../../api/service'

const Firma = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()

    const handleClick = () => {
        CustomCodeControlService('Company/GetCompanyListForSelectInput').then(res => {
            setData(res.data)
        })
    }

    return (
        <Select
            {...field}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label.toLowerCase() ?? '').localeCompare((optionB?.label.toLowerCase() ?? ''))
            }
            options={data.map((item) => ({
                label: item.kod,
                value: item.firmaId,
            }))}
            value={watch('firma')}
            onClick={handleClick}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    setValue('tedarikciKod', "")
                    setValue('unvan', "")
                } else {
                    const selectedOption = data.find(option => option.firmaId === e)
                    if (selectedOption) {
                        setValue('tedarikciKod', selectedOption.kod)
                        setValue('unvan', selectedOption.unvan)
                    }
                }
            }}
        />
    )
}

Firma.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func.isRequired,
    }).isRequired,
}

export default Firma

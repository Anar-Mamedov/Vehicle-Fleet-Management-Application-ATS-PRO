import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CustomCodeControlService } from '../../../api/service'
import { Select } from 'antd'
import { SelectContext } from '../../../context/selectSlice'

const Town = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()
    const { setTownId } = useContext(SelectContext)

    const handleClickSelect = () => {
        CustomCodeControlService("Town/GetTownListForSelectInput").then(res => {
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
                label: item.tanim,
                value: item.sehirId,
            }))}
            value={watch('sehir')}
            onClick={handleClickSelect}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    field.onChange("")
                    const selectedOption = data.find(option => option.sehirId === e);
                    if (!selectedOption) {
                        setValue("sehir", "")
                        setTownId(0)
                    }
                } else {
                    const selectedOption = data.find(option => option.sehirId === e)
                    if (selectedOption) {
                        setValue("sehir", selectedOption.tanim)
                        setTownId(e)
                    }
                }
            }}
        />
    )
}

Town.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Town

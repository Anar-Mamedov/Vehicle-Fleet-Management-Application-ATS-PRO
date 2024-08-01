import { useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { MaterialListSelectService } from '../../../api/service'
import { Select } from 'antd'
import { FuelTankContext } from '../../../context/fuelTankSlice'

const FuelType = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()
    const { setId } = useContext(FuelTankContext)

    const handleClickSelect = () => {
        MaterialListSelectService('YAKIT').then(res => setData(res.data))
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
                value: item.malzemeId,
            }))}
            value={watch('yakitTip')}
            onClick={handleClickSelect}
            onChange={e => {
                field.onChange(e)
                setId(e)
                if (e === undefined) {
                    field.onChange("")
                    const selectedOption = data.find(option => option.siraNo === e);
                    if (!selectedOption) {
                        setValue("yakitTip", "")
                    }
                } else {
                    const selectedOption = data.find(option => option.malzemeId === e);
                    if (selectedOption) {
                        setValue("yakitTip", selectedOption.tanim)
                    }
                }
            }}
        />
    )
}

FuelType.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    }),
}

export default FuelType

import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FuelTankContext } from '../../../context/fuelTankSlice'
import { YakitTankGetService } from '../../../api/service'
import { Select } from 'antd'
import { useFormContext } from 'react-hook-form'

const FuelTank = ({ field }) => {
    const [tank, setTank] = useState([])
    const { watch } = useFormContext()
    const { id } = useContext(FuelTankContext)

    const handleClickSelect = () => {
        YakitTankGetService(id, "YAKIT").then(res => {
            setTank(res.data)
        })
    }


    return (
        <Select
            {...field}
            disabled={!watch("stokKullanimi")}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
                (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={tank.map((item) => ({
                label: item.tanim,
                value: item.siraNo,
            }))}
            onClick={handleClickSelect}
            onChange={e => {
                field.onChange(e)
            }}
        />
    )
}

FuelTank.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default FuelTank

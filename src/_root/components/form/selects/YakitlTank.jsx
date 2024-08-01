import { useContext, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from 'antd'
import { SelectContext } from '../../../../context/selectSlice'
import { GetWareHouseListService } from '../../../../api/services/vehicles/yakit/services'

const YakitTank = () => {
    const [tank, setTank] = useState([])
    const { watch, control } = useFormContext()
    const { fuelTankId } = useContext(SelectContext)

    const handleClickSelect = () => {
        GetWareHouseListService(fuelTankId, "YAKIT").then(res => {
            setTank(res.data)
        })
    }


    return (
        <Controller
            name="yakitTanki"
            control={control}
            render={({ field }) => (
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
            )}
        />

    )
}

export default YakitTank

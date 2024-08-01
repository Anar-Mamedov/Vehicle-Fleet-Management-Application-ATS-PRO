import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PlakaContext } from '../../../context/plakaSlice'
import { YakitDataGetByIdService } from '../../../api/service'
import { Select } from 'antd'
import { useFormContext } from 'react-hook-form'

const Plaka = ({ field }) => {
    const { plaka, setData } = useContext(PlakaContext)
    const { setValue } = useFormContext()

    useEffect(() => {
        if (plaka.length === 1) {
            YakitDataGetByIdService(plaka[0].id).then(res => {
                setData(res.data)
            })
        }
    }, [plaka])


    const handleChange = (e) => {
        YakitDataGetByIdService(e).then(res => setData(res.data))
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
            options={plaka.map((item) => ({
                label: item.plaka,
                value: item.id,
            }))}
            onChange={e => {
                field.onChange(e)
                handleChange(e)
                if (e === undefined) {
                    const selectedOption = plaka.find(option => option.id === e);
                    if (!selectedOption) {
                        setValue('plaka', "")
                    }
                } else {
                    const selectedOption = plaka.find(option => option.id === e);
                    if (selectedOption) {
                        setValue('plaka', selectedOption.plaka)
                    }
                }
            }}
            disabled={plaka.length === 1}
        />
    )
}

Plaka.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Plaka

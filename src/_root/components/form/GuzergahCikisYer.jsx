import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { GetGuzergahYerByTownIdService, GetGuzergahYerService } from '../../../api/services/guzergah_services'
import { SelectContext } from '../../../context/selectSlice'

const GuzergahCikisYeri = ({ field }) => {
    const [data, setData] = useState([])
    const { setValue, watch } = useFormContext()
    const { townId } = useContext(SelectContext)

    const handleClick = () => {
        if (!townId) {
            GetGuzergahYerService().then(res => {
                setData(res.data)
            })
        } else {
            GetGuzergahYerByTownIdService(townId).then(res => {
                setData(res.data)
            })
        }
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
                value: item.sehirYerId,
            }))}
            value={watch('cikisYeri')}
            onClick={handleClick}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    const selectedOption = data.find(option => option.sehirYerId === e);
                    if (!selectedOption) {
                        setValue('cikisYeri', "")
                    }
                } else {
                    const selectedOption = data.find(option => option.sehirYerId === e);
                    if (selectedOption) {
                        setValue('cikisYeri', selectedOption.tanim)
                    }
                }
            }}
        />
    )
}

GuzergahCikisYeri.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default GuzergahCikisYeri

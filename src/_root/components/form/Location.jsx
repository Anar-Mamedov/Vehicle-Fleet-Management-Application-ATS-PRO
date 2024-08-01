import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import { CustomCodeControlService } from '../../../api/service'

const convertToLocationFormat = (data, parentId = 0) => {
    const result = []

    data.forEach(item => {
        if (item.anaLokasyonId === parentId) {
            const newItem = {
                value: item.lokasyonId,
                id: item.lokasyonId,
                title: item.lokasyonTanim,
                icon: <CarryOutOutlined />,
                children: convertToLocationFormat(data, item.lokasyonId),
            };
            result.push(newItem)
        }
    });

    return result
}

const Location = ({ field }) => {
    const [data, setData] = useState([])
    const { watch, setValue } = useFormContext()

    const handleClickTree = () => {
        CustomCodeControlService("Location/GetLocationList").then(res => setData(res.data))
    }

    return (
        <TreeSelect
            {...field}
            showSearch
            allowClear
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            className='w-full'
            treeLine={true}
            treeData={convertToLocationFormat(data)}
            value={watch('lokasyon')}
            onClick={handleClickTree}
            onChange={e => {
                field.onChange(e)
                if (e === undefined) {
                    const selectedOption = data.find(option => option.lokasyonId === e);
                    if (!selectedOption) {
                        setValue('lokasyon', "")
                    }
                } else {
                    const selectedOption = data.find(option => option.lokasyonId === e);

                    if (selectedOption) {
                        setValue('lokasyon', selectedOption.lokasyonTanim)
                    }
                }
            }}
        />
    )
}

Location.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Location

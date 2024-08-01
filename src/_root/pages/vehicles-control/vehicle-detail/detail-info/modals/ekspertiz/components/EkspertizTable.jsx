import PropTypes from 'prop-types'
import { Table, Select } from "antd"

const { Option } = Select;

const EkspertizTable = ({ onSelectChange, selectedOptions }) => {
    const data = [
        {
            key: '1',
            title: '1 - Sol Ön Çamurluk',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '2',
            title: '2 - Sol Ön Kapı',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '3',
            title: '3 - Sol Arka Kapı',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '4',
            title: '4 - Sol Arka Çamurluk',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '5',
            title: '5 - Arka Tampon',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '6',
            title: '6 - Arka Bagaj Kapağı',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '7',
            title: '7 - Sağ Arka Çamurluk',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '8',
            title: '8 - Sağ Arka Kapı',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '9',
            title: '9 - Sağ Ön Kapı',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '10',
            title: '10 - Sağ Ön Çamurluk',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '11',
            title: '11 - Ön Tampon',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '12',
            title: '12 - Ön Motor Kaputu',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
        {
            key: '13',
            title: '13 - Tavan',
            options: ['Boyalı', 'Çizik', 'Değişen', 'Orjinal'],
        },
    ];

    const columns = [
        {
            title: 'Aksam',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <span>{text}</span>
        },
        {
            title: 'Durum',
            dataIndex: 'options',
            key: 'options',
            render: (options, record) => (
                <Select
                    style={{ width: 120 }}
                    value={selectedOptions[record.title]}
                    onChange={(value) => onSelectChange(record.title, value)}
                >
                    {options.map((option, index) => (
                        <Option key={index} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            )
        }
    ];

    return <Table dataSource={data} columns={columns} pagination={false} size="small" />;
}

EkspertizTable.propTypes = {
    onSelectChange: PropTypes.func,
    selectedOptions: PropTypes.array,
}

export default EkspertizTable

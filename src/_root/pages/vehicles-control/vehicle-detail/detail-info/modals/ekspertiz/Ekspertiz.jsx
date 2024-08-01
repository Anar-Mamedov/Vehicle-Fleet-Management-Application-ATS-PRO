import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Button, Modal } from 'antd'
import { GetVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'
import Car from './svg/Car'
import EkspertizTable from './components/EkspertizTable'
import Textarea from '../../../../../../components/form/inputs/Textarea'

dayjs.locale('tr')

const colorStyles = {
    'Boyalı': 'orangered',
    'Çizik': '#17a2b8',
    'Değişen': '#5b548b',
    'Orjinal': '#6c757d'
};

const Ekspertiz = ({ visible, onClose, id }) => {
    const [status, setStatus] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState({});

    const defaultValues = {}

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, setValue } = methods

    useEffect(() => {
        GetVehicleDetailsInfoService(id).then(res => {

        })
    }, [id, status])

    const onSumbit = handleSubmit((values) => {
        const body = {}

        // DetailInfoUpdateService(body).then(res => {
        //     if (res.data.statusCode === 202) {
        //         setStatus(true)
        //         onClose()
        //     }
        // })
    })

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    const handleSelectChange = (part, value) => {
        setSelectedOptions(prevState => ({ ...prevState, [part]: value }));
    };
    
    return (
        <Modal
            title="Ekspertiz Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1400}
        >
            <div className="grid gap-1">
                <div className="col-span-7">
                    <Car selectedOptions={selectedOptions} colorStyles={colorStyles} />
                    <div className="grid mt-10">
                        {Object.keys(colorStyles).map(key => (
                            <div className="col-span-3 flex gap-1" key={key}>
                                <div style={{ width: "20px", height: "20px", background: colorStyles[key], borderRadius: "4px" }}></div>
                                <p>{key}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-5">
                    <EkspertizTable onSelectChange={handleSelectChange} selectedOptions={selectedOptions} />
                </div>
                <div className="col-span-6 mt-20">
                    <label>Ekspertiz Açıklama</label>
                    <Textarea name="" />
                </div>
                <div className="col-span-6 mt-20">
                    <label>Ekspertiz Ek Açıklama</label>
                    <Textarea name="" />
                </div>
            </div>
        </Modal>
    )
}

Ekspertiz.propTypes = {
    id: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default Ekspertiz

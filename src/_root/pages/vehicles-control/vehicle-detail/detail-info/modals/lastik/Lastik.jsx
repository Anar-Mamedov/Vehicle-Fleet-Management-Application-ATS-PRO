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

const Lastik = ({ visible, onClose, id }) => {
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
            title="Lastik Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1400}
        >
            <div className="grid gap-1">
               <div className="col-span-4"></div>
               <div className="col-span-8"></div>
            </div>
        </Modal>
    )
}

Lastik.propTypes = {
    id: PropTypes.number,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default Lastik

import { Button, Input, Modal } from 'antd';
import { t } from 'i18next';
import { useEffect, useState } from 'react'
import { UpdateRegionService } from '../../../../../api/services/guzergah_services';

const UpdateModal = ({ isOpen, setIsOpen, setStatus, yer }) => {
    const [item, setItem] = useState('')

    useEffect(() => {setItem(yer?.tanim)}, [yer])

    const onSubmit = () => {
        const body = {
            "sehirYerId": yer.sehirYerId,
            "tanim": item
        }

        UpdateRegionService(body).then(res => {
            if (res.data.statusCode === 202) {
                setIsOpen(false)
                setStatus(true)
            }
        })
        setStatus(false)
    }

    const footer = [
        <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
            {t("kaydet")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => setIsOpen(false)}
        >
            {t("iptal")}
        </Button >,
    ];

    return (
        <Modal
            // title={t("MarkaGirisi")}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            maskClosable={false}
            footer={footer}
            width={500}
        >
            <label>[{item}] tanımı için değiştirilecek değeri giriniz</label>
            <Input value={item} onChange={e => setItem(e.target.value)} />
        </Modal>
    )
}

export default UpdateModal

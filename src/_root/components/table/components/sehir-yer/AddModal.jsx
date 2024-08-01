import { Button, Input, Modal } from 'antd';
import { t } from 'i18next';
import { useState } from 'react'
import { AddRegionService } from '../../../../../api/services/guzergah_services';

const AddModal = ({ isOpen, setIsOpen, setStatus, id }) => {
    const [yer, setYer] = useState('')

    const onSubmit = () => {
        const body = {
            "sehirId": +id,
            "tanim": yer
        }

        AddRegionService(body).then(res => {
            if (res.data.statusCode === 200) {
                setYer('')
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
            title={t("yeniMarkaGirisi")}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            maskClosable={false}
            footer={footer}
            width={500}
        >
            <label>Yer tanımını giriniz</label>
            <Input value={yer} onChange={e => setYer(e.target.value)} />
        </Modal>
    )
}

export default AddModal

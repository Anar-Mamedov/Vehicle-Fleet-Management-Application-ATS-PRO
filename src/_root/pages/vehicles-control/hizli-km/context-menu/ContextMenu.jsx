
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, Input, Modal } from "antd";
import { EditKmLogService, ResetKmLogService } from "../../../../../api/services/vehicles/vehicles/services";
import KmHistory from "./KmHistory"

const ContextMenu = ({ position, rowData, setStatus }) => {
    const [visible, setVisible] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [yeniKm, setYeniKm] = useState(false)
    const modalRef = useRef()

    const style = {
        position: 'absolute',
        left: position.x - 200,
        top: position.y - 50,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        zIndex: 200,
        padding: 20,
        boxShadow: "0px 0px 10px 1px rgba(0,0,0,.2)"
    };

    const onClose = () => {
        setVisible(false);
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const resetKm = () => {
        const body = {
            kmAracId: rowData.aracId,
            plaka: rowData.plaka,
            tarih: dayjs(rowData.tarih, "DD.MM.YYYY").format("YYYY-MM-DD"),
            saat: rowData.saat,
            kaynak: "SIFIRLAMA",
            seferSiraNo: 0,
            yakitSiraNo: 0,
            aciklama: ""
        }
        ResetKmLogService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setIsModalOpen(false);
        setStatus(false)

    }


    useEffect(() => {
        if (visible) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [visible]);

    const handleReset = () => {
        setIsModalOpen(true)
    }


    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                {t("kapat")}
            </Button>
        ]
    )

    const resetFooter = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={resetKm}>
                {t("sifirla")}
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                {t("kapat")}
            </Button>
        ]
    )

    const updateKm = () => {
        const body = {
            kmAracId: rowData.aracId,
            plaka: rowData.plaka,
            tarih: dayjs(rowData.tarih, "DD.MM.YYYY").format("YYYY-MM-DD"),
            saat: rowData.saat,
            kaynak: "DÜZELTME",
            seferSiraNo: 0,
            yakitSiraNo: 0,
            aciklama: "",
            eskiKm: rowData.guncelKm,
            yeniKm: yeniKm
        }

        EditKmLogService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setIsUpdateModalOpen(false)
        setStatus(false)
    }

    const updateFooter = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={updateKm}>
                {t("Düzenle")}
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                {t("kapat")}
            </Button>
        ]
    )
    return (
        <div style={style} className="context-menu" ref={modalRef}>
            <Button onClick={() => setVisible(true)}>{t("kmGuncellemeGecmis")}: {rowData?.plaka}</Button>
            <Button onClick={() => setIsUpdateModalOpen(true)}>{t("guncelKmDzeltme")}</Button>
            <Button onClick={handleReset}>{t("kmSifirlama")}</Button>
            <Modal
                title={`${t("kmGuncellemeGecmis")}: ${rowData?.plaka}`}
                open={visible}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <KmHistory data={rowData} setTable={setStatus} />
                </div>
            </Modal>

            <Modal title={t("guncelKmSifirlamaSoru")} footer={resetFooter} open={isModalOpen} onCancel={handleCancel}>
            </Modal>

            <Modal title="Güncel Km Düzenle" footer={updateFooter} open={isUpdateModalOpen} onCancel={() => setIsUpdateModalOpen(false)} maskClosable={false} onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label>{t("guncelKm")}</label>
                        <Input value={rowData.guncelKm} disabled />
                    </div>
                    <div>
                        <label>{t("yeniKm")}</label>
                        <Input onChange={(e) => setYeniKm(e.target.value)} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

ContextMenu.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired,
    rowData: PropTypes.shape({
        aracId: PropTypes.number.isRequired,
        plaka: PropTypes.string.isRequired,
        tarih: PropTypes.string.isRequired,
        saat: PropTypes.string.isRequired,
        guncelKm: PropTypes.number.isRequired
    }).isRequired,
    setStatus: PropTypes.func.isRequired
};

export default ContextMenu;

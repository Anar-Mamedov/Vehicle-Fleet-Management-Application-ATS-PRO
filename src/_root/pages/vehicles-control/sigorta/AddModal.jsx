import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs"; 
import utc from "dayjs/plugin/utc";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../context/plakaSlice";
import { AddInsuranceItemService } from "../../../../api/services/vehicles/operations_services";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields"
import GeneralInfo from "./tabs/GeneralInfo";

dayjs.extend(utc);

const AddModal = ({ setStatus }) => {
    const { data, plaka } = useContext(PlakaContext);
    const [isOpen, setIsOpen] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    const [loading, setLoading] = useState(false);

    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: "text",
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: "text",
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: "text",
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: "text",
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: "text",
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: "text",
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: "text",
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: "text",
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: "select",
            code: 885,
            name2: "ozelAlanKodId9",
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: "select",
            code: 886,
            name2: "ozelAlanKodId10",
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: "number",
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: "number",
        },
    ]);

    const defaultValues = {
        aktif: true
    };
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, setValue, watch } = methods;

    useEffect(() => {
        if (watch("baslangicTarih")) {
            const dateObj = dayjs.utc(watch("baslangicTarih"));
            const newDateObj = dateObj.add(1, "year");
            setValue("bitisTarih", newDateObj);
        }
    }, [watch("baslangicTarih")]);

    const onSubmit = handleSubmit((values) => {
        const body = {
            aracId: data.aracId,
            aciklama: values.aciklama,
            tutar: values.tutar || 0,
            policeNo: values.policeNo,
            aktif: !values.aktif,
            varsayilan: values.varsayilan,
            yetkili: values.yetkili,
            ruhsatBelgeSeriNo: values.ruhsatBelgeSeriNo,
            adres: values.adres,
            il: values.il,
            ilce: values.ilce,
            telefon: values.telefon,
            baslangicTarih: dayjs(values.baslangicTarih).format("YYYY-MM-DD"),
            bitisTarih: values.bitisTarih,
            aracBedeli: values.aracBedeli || 0,
            hasarIndirimi: values.hasarIndirimi || 0,
            firmaId: values.firmaId || 0,
            acentaKodId: values.acentaKodId || 0,
            sigortaKodId: values.sigortaKodId || 0,
            ozelAlan1: values.ozelAlan1 || "",
            ozelAlan2: values.ozelAlan2 || "",
            ozelAlan3: values.ozelAlan3 || "",
            ozelAlan4: values.ozelAlan4 || "",
            ozelAlan5: values.ozelAlan5 || "",
            ozelAlan6: values.ozelAlan6 || "",
            ozelAlan7: values.ozelAlan7 || "",
            ozelAlan8: values.ozelAlan8 || "",
            ozelAlanKodId9: values.ozelAlanKodId9 || 0,
            ozelAlanKodId10: values.ozelAlanKodId10 || 0,
            ozelAlan11: values.ozelAlan11 || 0,
            ozelAlan12: values.ozelAlan12 || 0,
        };
        setLoading(true);
        AddInsuranceItemService(body).then((res) => {
            if (res?.data.statusCode === 200) {
                setStatus(true);
                setIsOpen(false);
                setLoading(false);
                setActiveKey("1");
                if (plaka.length === 1) {
                    reset();
                } else {
                    reset();
                }
            } else {
                message.error("Bir sorun oluşdu! Tekrar deneyiniz.");
            }
        });
        setStatus(false);
    });

    const personalProps = {
        form: "SIGORTA",
        fields,
        setFields,
    };

    const items = [
        {
            key: "1",
            label: t("genelBilgiler"),
            children: (
                <GeneralInfo />
            ),
        },
        {
            key: "2",
            label: t("ozelAlanlar"),
            children: <PersonalFields personalProps={personalProps} />,
        },
    ];

    const resetForm = (plaka, data, reset) => {
        if (plaka.length === 1) {
            reset();
        } else {
            reset();
        }
    };

    const footer = [
        loading ? (
            <Button className="btn btn-min primary-btn">
                <LoadingOutlined />
            </Button>
        ) : (
            <Button
                key="submit"
                className="btn btn-min primary-btn"
                onClick={onSubmit}
            >
                {t("kaydet")}
            </Button>
        ),
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => {
                setIsOpen(false);
                resetForm(plaka, data, reset);
                setActiveKey("1");
            }}
        >
            {t("kapat")}
        </Button>,
    ];

    return (
        <>
            <Button className="btn primary-btn" onClick={() => setIsOpen(true)}>
                <PlusOutlined /> {t("ekle")}
            </Button>
            <Modal
                title={t("yeniSigortaGirisi")}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <FormProvider {...methods}>
                    <form>
                        <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
                    </form>
                </FormProvider>
            </Modal>
        </>
    );
};

AddModal.propTypes = {
    setStatus: PropTypes.func,
};

export default AddModal;

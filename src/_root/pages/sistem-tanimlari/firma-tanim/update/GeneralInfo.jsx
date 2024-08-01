import { t } from 'i18next'
import PropTypes from "prop-types";
import Location from '../../../../components/form/tree/Location'
import Textarea from '../../../../components/form/inputs/Textarea'
import TextInput from '../../../../components/form/inputs/TextInput'
import CheckboxInput from '../../../../components/form/checkbox/CheckboxInput'
import CodeControl from '../../../../components/form/selects/CodeControl'
import NumberInput from '../../../../components/form/inputs/NumberInput'

const GeneralInfo = ({ isValid }) => {
    const validateStyle = {
        borderColor:
            isValid === "error"
                ? "#dc3545"
                : isValid === "success"
                    ? "#23b545"
                    : "#000",
    };

    return (
        <>
            <div className="grid gap-1 border">
                <div className="col-span-8 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("firmaKodu")}</label>
                                <TextInput name="kod" style={validateStyle} required={true} />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("aktif")}</label>
                                <CheckboxInput name="aktif" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("unvan")}</label>
                                <TextInput name="unvan" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("firmaTipi")}</label>
                                <CodeControl codeName="firmaTipiKodId" name="firmaTipi" id={202}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiDairesi")}</label>
                                <TextInput name="vd" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiNo")}</label>
                                <TextInput name="vno" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("sektor")}</label>
                                <TextInput name="sektor" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("terminSuresi")}</label>
                                <TextInput name="terminSure" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("indirimOrani")} %</label>
                                <NumberInput name="indirimOran" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("lokasyon")}</label>
                                <Location />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("servisFirmasi")}</label>
                                <CheckboxInput name="tipServis" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("sigortaAcentesi")}</label>
                                <CheckboxInput name="tipSigorta" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("tedarikci")}</label>
                                <CheckboxInput name="tipTedarikci" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("akaryakitIstasyonu")}</label>
                                <CheckboxInput name="tipAkaryakitIst" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("musteri")}</label>
                                <CheckboxInput name="tipMusteri" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("aracKiralama")}</label>
                                <CheckboxInput name="tipKiralama" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("diger")}</label>
                                <CheckboxInput name="tipDiger" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 p-10">
                    <div className="flex flex-col gap-1">
                        <label>{t("aciklama")}</label>
                        <Textarea name="aciklama" />
                    </div>
                </div>
            </div>
        </>
    );
};

GeneralInfo.propTypes = {
    isValid: PropTypes.string,
};

export default GeneralInfo;

import { t } from 'i18next'
import TextInput from "../../../../components/form/inputs/TextInput"

const Iletisim = () => {
    return (
        <>
            <div className="grid gap-1 border">
                <div className="col-span-6 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 1</label>
                                <TextInput name="adres_1" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 2</label>
                                <TextInput name="adres_2" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("sehir")}</label>
                                <TextInput name="il" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("ilce")}</label>
                                <TextInput name="ilce" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("ilgili")} 1</label>
                                <TextInput name="ilgili_1" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("ilgili")} 2</label>
                                <TextInput name="ilgili_2" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("telefon")} 1</label>
                                <TextInput name="tel_1" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("telefon")} 2</label>
                                <TextInput name="tel_2" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("fax")}</label>
                                <TextInput name="fax" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("gsm")}</label>
                                <TextInput name="gsm" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("email")}</label>
                                <TextInput name="email" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("web")}</label>
                                <TextInput name="web" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Iletisim;

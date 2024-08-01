import { t } from 'i18next'
import DateInput from "../../../../components/form/date/DateInput"
import TextInput from '../../../../components/form/inputs/TextInput';
import Textarea from '../../../../components/form/inputs/Textarea';

const EhliyetBilgiler = () => {
    return (
        <div className="grid gap-1 border p-20">
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("sinif")}</label>
                    <TextInput name="sinif" length={5} />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("ehliyetVerildigiIlIlce")}</label>
                    <TextInput name="ehliyetVerildigiIlIlce" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("ehliyetNo")}</label>
                    <TextInput name="ehliyetNo" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("ehliyetBelgeTarihi")}</label>
                    <DateInput name="ehliyetBelgeTarihi" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("ehliyetSeriNo")}</label>
                    <TextInput name="ehliyetSeriNo" />
                </div>
            </div>
            <div className="col-span-12">
                <div className="col-span-6">
                    <div className="flex flex-col gap-1">
                        <label>{t("ehliyetKullandigiChiazProtez")}</label>
                        <Textarea name="ehliyetKullandigiChiazProtez" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EhliyetBilgiler

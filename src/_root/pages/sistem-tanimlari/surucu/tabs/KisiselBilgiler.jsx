import { t } from 'i18next'
import DateInput from "../../../../components/form/date/DateInput"
import TextInput from '../../../../components/form/inputs/TextInput';

const KisiselBilgiler = () => {

    return (
        <div className="grid gap-1 border p-20">
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("kanGrubu")}</label>
                    <TextInput name="kanGrubu" length={5} />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("sskNo")}</label>
                    <TextInput name="sskNo" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("vergiNo")}</label>
                    <TextInput name="vergiNo" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("egitimDurumu")}</label>
                    <TextInput name="egitimDurumu" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("mezunOlduguOkul")}</label>
                    <TextInput name="mezunOlduguOkul" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label>{t("mezunOlduguBolum")}</label>
                    <TextInput name="mezunOlduguBolum" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="iseBaslamaTarih" className='text-info'>{t("iseBaslamaTarih")}</label>
                    <DateInput name="iseBaslamaTarih" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="istenAyrilmaTarih" className='text-info'>{t("istenAyrilmaTarih")}</label>
                    <DateInput name="istenAyrilmaTarih" />
                </div>
            </div>
            <div className="col-span-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="mezuniyetTarih" className='text-info'>{t("mezuniyetTarih")}</label>
                    <DateInput name="mezuniyetTarih" />
                </div>
            </div>
        </div>
    );
};

export default KisiselBilgiler;

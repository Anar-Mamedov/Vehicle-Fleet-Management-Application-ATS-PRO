import { useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import CheckboxInput from '../../../../../../components/form/checkbox/CheckboxInput'
import DateInput from '../../../../../../components/form/date/DateInput'
import NumberInput from '../../../../../../components/form/inputs/NumberInput'
import TextInput from '../../../../../../components/form/inputs/TextInput'
import CodeControl from '../../../../../../components/form/selects/CodeControl'
import Textarea from '../../../../../../components/form/inputs/Textarea'

const GeriOdeme = () => {
    const { watch } = useFormContext()

    return (
        <>
            <h2><CheckboxInput name="geriOdeme" /> {t("geriOdeme")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("geriOdemeTarih")}</label>
                        <DateInput name="geriOdemeTarih" checked={!watch("geriOdeme")} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("geriOdemeTutar")}</label>
                        <NumberInput name="geriOdemeTutar" checked={!watch("geriOdeme")} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("banka")}</label>
                        <CodeControl name="banka" codeName="bankaKodId" id={116} checked={!watch("geriOdeme")} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("bankaHesap")}</label>
                        <TextInput name="bankaHesap" readonly={!watch("geriOdeme")} />
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="flex flex-col gap-1">
                        <label>{t("aciklama")}</label>
                        <Textarea name="geriOdemeAciklama" checked={!watch("geriOdeme")} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeriOdeme

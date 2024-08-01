import { useFormContext } from "react-hook-form"
import { t } from "i18next"
import ReadonlyDateForCheck from "../../../../components/form/date/ReadonlyDateForCheck"
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput"
import ReadonlyInput from "../../../../components/form/inputs/ReadonlyInput"

const MeslekiYeterlilik = () => {
    const { watch } = useFormContext()

    return (
        <div className="grid gap-2">
            <div className="col-span-6 p-20">
                <div className="flex gap-2">
                    <CheckboxInput name="myb" />
                    <label>{t("myb")}</label>
                </div>
            </div>
            <div className="col-span-6 p-20">
                <div className="flex gap-2">
                    <CheckboxInput name="srcPiskoteknik" />
                    <label>{t("srcPiskoteknik")}</label>
                </div>
            </div>
            <div className="col-span-6 border p-20">
                <div className="grid gap-1">
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("mybVerilisTarih")}</label>
                            <ReadonlyDateForCheck name="mybVerilisTarih" checked={!watch("myb")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("mybBelgeNo")}</label>
                            <ReadonlyInput name="mybBelgeNo" checked={!watch("myb")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("mybKapsadigiDigerMyb")}</label>
                            <ReadonlyInput name="mybKapsadigiDigerMyb" checked={!watch("myb")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("mybTuru")}</label>
                            <ReadonlyInput name="mybTuru" checked={!watch("myb")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("mybBitisTarih")}</label>
                            <ReadonlyDateForCheck name="mybBitisTarih" checked={!watch("myb")} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-6 border p-20">
                <div className="grid gap-1">
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("srcPiskoteknikVerilisTarihi")}</label>
                            <ReadonlyDateForCheck name="srcPiskoteknikVerilisTarihi" checked={!watch("srcPiskoteknik")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("srcPiskoteknikBelgeNo")}</label>
                            <ReadonlyInput name="srcPiskoteknikBelgeNo" checked={!watch("srcPiskoteknik")} />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col gap-1">
                            <label>{t("srcPiskoteknikBitisTarihi")}</label>
                            <ReadonlyDateForCheck name="srcPiskoteknikBitisTarihi" checked={!watch("srcPiskoteknik")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeslekiYeterlilik

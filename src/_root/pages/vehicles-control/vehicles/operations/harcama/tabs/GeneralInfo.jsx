import { t } from "i18next";
import Plaka from "../../../../../../components/form/selects/Plaka";
import Driver from "../../../../../../components/form/selects/Driver";
import Location from "../../../../../../components/form/tree/Location";
import DateInput from "../../../../../../components/form/date/DateInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";

const GeneralInfo = () => {
  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("plaka")} <span className="text-danger">*</span></label>
                <Plaka required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("harcama")} <span className="text-danger">*</span></label>
                <CodeControl
                  name="harcama"
                  codeName="harcamaKodId"
                  id={204}
                  required={true}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")}</label>
                <Driver />
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
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tarih")} <span className="text-danger">*</span></label>
                <DateInput name="tarih" required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tutar")} <span className="text-danger">*</span></label>
                <NumberInput name="tutar" required={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aciklama")}</label>
                <Textarea name="aciklama" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex gap-2">
                <CheckboxInput name="maliyet" />
                <label>{t("aracMaliyetlerineEkle")}</label>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex gap-2">
                <CheckboxInput name="ozel" />
                <label>{t("ozelHarcama")}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

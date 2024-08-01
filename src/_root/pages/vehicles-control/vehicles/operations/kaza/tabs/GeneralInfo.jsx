import { t } from "i18next";
import Plaka from "../../../../../../components/form/selects/Plaka";
import Driver from "../../../../../../components/form/selects/Driver";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import { Divider } from "antd";
import Location from "../../../../../../components/form/tree/Location";

const GeneralInfo = () => { 
  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-4 border p-20">
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("plaka")} <span className="text-danger">*</span></label>
                <Plaka required={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")} <span className="text-danger">*</span></label>
                <Driver required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("kazaTarih")} <span className="text-danger">*</span></label>
                <DateInput name="kazaTarih" required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("saat")}</label>
                <TimeInput name="kazaSaat" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("hasarNo")}</label>
                <TextInput name="hasarNo" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 border p-20">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("kazaTuru")}</label>
                <CodeControl name="kazaTuru" codeName="kazaTuruKodId" id={401} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("kazaSekli")}</label>
                <CodeControl name="kazaSekli" codeName="kazaSekliKodId" id={402} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("belgeNo")}</label>
                <TextInput name="belgeNo" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("lokasyon")}</label>
                <Location />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("aracKm")}</label>
                <NumberInput name="aracKm" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("surucuOder")}</label>
                <CheckboxInput name="surucuOder" />
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
        <div className="col-span-12 mt-10 mb-10">
          <Divider />
        </div>
        <div className="col-span-12">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("karsiPlaka")}</label>
                <TextInput name="karsiPlaka" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("karsiSurucu")}</label>
                <TextInput name="karsiSurucu" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("karsiSigorta")}</label>
                <TextInput name="karsiSigorta" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("asliKusur")}</label>
                <CodeControl name="asliKusur" codeName="asliKusurKodId" id={403} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("bankaHesap")}</label>
                <CodeControl name="bankaHesap" codeName="taliKusurKodId" id={404} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("faturaTarih")}</label>
                <DateInput name="faturaTarih" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("faturaTutar")}</label>
                <NumberInput name="faturaTutar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

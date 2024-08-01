import { t } from "i18next";
import Textarea from "../../../../components/form/inputs/Textarea";
import TextInput from "../../../../components/form/inputs/TextInput";

const EkBilgiler = () => {
  return (
    <>
      <div className="grid gap-1 mt-20">
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("araToplam")}</label>
                <TextInput name="toplam_araToplam" readonly="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("indirim")}</label>
                <TextInput name="toplam_indirim" readonly="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("kdvToplam")}</label>
                <TextInput name="toplam_kdvToplam" readonly="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("genelToplam")}</label>
                <TextInput name="toplam_genelToplam" readonly="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 border p-20">
          <div className="flex flex-col gap-1 h-full">
            <label>{t("aciklama")}</label>
            <Textarea name="aciklama" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EkBilgiler;

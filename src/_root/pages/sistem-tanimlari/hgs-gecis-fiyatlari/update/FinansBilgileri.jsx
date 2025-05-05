import { t } from "i18next";
import TextInput from "../../../../components/form/inputs/TextInput";

const FinansBilgileri = () => {
  return (
    <div className="grid gap-1">
      <div className="col-span-4">
        <div className="flex flex-col gap-1">
          <label>{t("borc")}</label>
          <TextInput name="borc" readonly={true} />
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col gap-1">
          <label>{t("alacak")}</label>
          <TextInput name="alacak" readonly={true} />
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex flex-col gap-1">
          <label>{t("bakiye")}</label>
          <TextInput name="bakiye" readonly={true} />
        </div>
      </div>
    </div>
  );
};

export default FinansBilgileri;

import PropTypes from "prop-types";
import { t } from "i18next";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";

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
      <div className="grid gap-2 border p-20">
        <div className="col-span-12">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("yakitKod")}</label>
                <TextInput name="malzemeKod" style={validateStyle} />
              </div>
            </div>
            <div className="col-span-8">
              <div className="flex flex-col gap-1">
                <label>{t("aktifDegil")}</label>
                <CheckboxInput name="aktif" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("tanim")}</label>
                <TextInput name="tanim" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("birim")}</label>
                <CodeControl
                  name="birim"
                  codeName="birimKodId"
                  id={300}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("yakitTip")}</label>
                <CodeControl
                  name="malzemeTipKodText"
                  codeName="malzemeTipKodId"
                  id={102}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <NumberInput name="fiyat" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("kdvOrani")}</label>
                <NumberInput name="kdvOran" />
              </div>
            </div>
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

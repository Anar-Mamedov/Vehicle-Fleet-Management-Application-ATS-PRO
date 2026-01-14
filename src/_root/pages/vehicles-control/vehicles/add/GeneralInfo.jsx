import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import TextInput from "../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Location from "../../../../components/form/tree/Location";
import Marka from "../../../../components/form/selects/Marka";
import Model from "../../../../components/form/selects/Model";
import Driver from "../../../../components/form/selects/Driver";
import MaterialType from "../../../../components/form/selects/MaterialType";
import DateInput from "../../../../components/form/date/DateInput";
import KodIDSelectbox from "../../../../components/form/selects/KodIDSelectbox";
import DatePickerSelectYear from "../../../../components/form/inputs/DatePickerSelectYear";

const ALWAYS_REQUIRED_FIELDS = ["plaka", "aracTip", "lokasyon", "marka", "model", "yakitTip"];

const GeneralInfo = ({ isValid, mandatoryFields }) => {
  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  const isRequired = (key) => {
    return ALWAYS_REQUIRED_FIELDS.includes(key) || (mandatoryFields ? mandatoryFields[key] === true : false);
  };

  return (
    <>
      <div className="grid gap-1 border">
        <div className="col-span-8 p-10">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("plaka")} {isRequired("plaka") && <span className="text-danger">*</span>}
                </label>
                <TextInput name="plaka" style={validateStyle} required={isRequired("plaka")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("aracTip")} {isRequired("aracTip") && <span className="text-danger">*</span>}
                </label>
                {/* <CodeControl name="aracTip" codeName="aracTipId" id={100} required={isRequired("aracTip")} /> */}
                <KodIDSelectbox name1="aracTip" kodID={100} isRequired={isRequired("aracTip")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("guncelKm")} {isRequired("guncelKm") && <span className="text-danger">*</span>}
                </label>
                <NumberInput name="guncelKm" required={isRequired("guncelKm")} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 p-10">
          <div className="flex flex-col gap-1">
            <label>
              {t("lokasyon")} {isRequired("lokasyon") && <span className="text-danger">*</span>}
            </label>
            <Location required={isRequired("lokasyon")} />
          </div>
        </div>
      </div>

      <div className="grid gap-1 mt-10">
        <div className="col-span-8 border p-10">
          <h3 className="sub-title">{t("aracBilgileri")}</h3>
          <div className="grid gap-1 mt-10">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("marka")} {isRequired("marka") && <span className="text-danger">*</span>}
                </label>
                <Marka required={isRequired("marka")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("model")} {isRequired("model") && <span className="text-danger">*</span>}
                </label>
                <Model required={isRequired("model")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="yil">
                  {t("modelYili")} {isRequired("yil") && <span className="text-danger">*</span>}
                </label>
                <DatePickerSelectYear name="yil" required={isRequired("yil")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("aracGrup")} {isRequired("aracGrubu") && <span className="text-danger">*</span>}
                </label>
                <KodIDSelectbox name1="aracGrubu" kodID={101} isRequired={isRequired("aracGrubu")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("aracCinsi")} {isRequired("aracCinsi") && <span className="text-danger">*</span>}
                </label>
                <KodIDSelectbox name1="aracCinsi" kodID={107} isRequired={isRequired("aracCinsi")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("renk")} {isRequired("aracRenk") && <span className="text-danger">*</span>}
                </label>
                <KodIDSelectbox name1="renk" kodID={111} isRequired={isRequired("aracRenk")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("departman")} {isRequired("departman") && <span className="text-danger">*</span>}
                </label>
                <KodIDSelectbox name1="departman" kodID={200} isRequired={isRequired("departman")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("surucu")} {isRequired("surucu") && <span className="text-danger">*</span>}
                </label>
                <Driver required={isRequired("surucu")} />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>
                  {t("yakitTip")} {isRequired("yakitTip") && <span className="text-danger">*</span>}
                </label>
                <MaterialType name="yakitTip" codeName="yakitTipId" type="YAKIT" required={isRequired("yakitTip")} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 border p-10">
          <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
          <div className="grid gap-1 mt-10">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("muayeneTarihi")} {isRequired("muayeneTarih") && <span className="text-danger">*</span>}
                </label>
                <DateInput name="muayeneTarih" required={isRequired("muayeneTarih")} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("sozlesmeTarihi")} {isRequired("sozlesmeTarih") && <span className="text-danger">*</span>}
                </label>
                <DateInput name="sozlesmeTarih" required={isRequired("sozlesmeTarih")} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("egzozTarihi")} {isRequired("egzosTarih") && <span className="text-danger">*</span>}
                </label>
                <DateInput name="egzosTarih" required={isRequired("egzosTarih")} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("vergiTarihi")} {isRequired("vergiTarih") && <span className="text-danger">*</span>}
                </label>
                <DateInput name="vergiTarih" required={isRequired("vergiTarih")} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label className="text-info">
                  {t("takograf")} {isRequired("takografTarih") && <span className="text-danger">*</span>}
                </label>
                <DateInput name="takografTarih" required={isRequired("takografTarih")} />
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
  mandatoryFields: PropTypes.object,
};

export default GeneralInfo;

import React from "react";
import { t } from "i18next";
import PropTypes from "prop-types";
import Location from "../../../../components/form/tree/Location";
import { PlakaContext } from "../../../../../context/plakaSlice";
import Textarea from "../../../../components/form/inputs/Textarea";
import TextInput from "../../../../components/form/inputs/TextInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Firma from "../../../../components/form/selects/Firma";

const GeneralInfo = ({ isValid }) => {
  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  return (
    <>
      <div className="grid gap-2 border p-20">
        <div className="col-span-12">
          <div className="grid gap-1">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>
                  {t("firmaAdi")}<span className="text-danger">*</span>
                </label>
                  <Firma name="firmaAdi" required={true} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("girisYeri")}</label>
                  <TextInput name="girisYeri" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("cikisYeri")}</label>
                  <TextInput name="cikisYeri" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                  <NumberInput name="fiyat" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="aciklama" />
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

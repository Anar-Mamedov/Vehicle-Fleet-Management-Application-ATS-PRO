import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import Location from "../../../../components/form/tree/Location";
import ValidationInput from "../../../../components/form/inputs/ValidationInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";

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
                <label>{t("surucuKod")}</label>
                <ValidationInput name="surucuKod" style={validateStyle} />
              </div>
            </div>
            <div className="col-span-9">
              <div className="flex flex-col gap-1">
                <label>{t("aktif")}</label>
                <CheckboxInput name="aktif" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("surucuIsmi")}</label>
                <TextInput name="isim" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("lokasyon")}</label>
                <Location />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("departman")}</label>
                <CodeControl name="departman" codeName="departmanKodId" id={200} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("surucuTip")}</label>
                <CodeControl name="surucuTip" codeName="surucuTipKodId" id={502} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("gorev")}</label>
                <CodeControl name="gorev" codeName="gorevKodId" id={503} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("unvan")}</label>
                <TextInput name="adres" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("sehir")}</label>
                <TextInput name="il" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("ilce")}</label>
                <TextInput name="ilce" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("telefon")} 1</label>
                <TextInput name="telefon1" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("fax")}</label>
                <TextInput name="fax" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("telefon")} 2</label>
                <TextInput name="telefon2" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("gsm")}</label>
                <TextInput name="gsm" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("cezaPuani")}</label>
                <NumberInput name="cezaPuani" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("mobilSifre")}</label>
                <TextInput name="sifre" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>E-posta</label>
                <TextInput name="email" />
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
  setImages: PropTypes.func,
};

export default GeneralInfo;

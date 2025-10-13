import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import { useFormContext } from "react-hook-form";
import DateInput from "../../../../components/form/date/DateInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../components/form/inputs/TextInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import Firma from "../../../../components/form/selects/Firma";
import ReadonlyInput from "../../../../components/form/inputs/ReadonlyInput";

const UpdateGeneralInfo = () => {
  const { watch } = useFormContext();
  const krediKiralama = watch("krediKiralama");

  return (
    <>
      <div className="grid gap-1 mt-14">
        <div className="col-span-12">
          <div className="grid gap-1 p-20 border">
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>
                  {t("plaka")}
                </label>
                <ReadonlyInput name="plaka" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("kiralamaYeri")}</label>
                <Firma name="kiralamafirma" codeName="kiralamaFirmaId" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="grid gap-1">
                <div className="col-span-12">
                  <label>{t("aylikOdemeTutar")}</label>
                </div>
                <div className="col-span-9">
                  <NumberInput name="krediAylikOdeme" />
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="flex gap-1 items-center">
                    <CheckboxInput name="krediUyar" />
                    <label>{t("uyari")}</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("kiralamaTutar")}</label>
                <NumberInput name="krediTutar" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("hesapNo")}</label>
                <TextInput name="krediHesapNo" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("kiraBaslangicTarih")}</label>
                <DateInput name="kiraBaslangic" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("ilgili")}</label>
                <TextInput name="krediIlgili" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("kiralamaSuresi")}</label>
                <NumberInput name="krediSure" />
              </div>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("ilkOdemeTarih")}</label>
                <DateInput name="krediIlkOdTarih" />
              </div>
            </div>

            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aciklama")}</label>
                <Textarea name="krediAciklama" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateGeneralInfo.propTypes = {
  setIsValid: PropTypes.func,
  response: PropTypes.string,
  setResponse: PropTypes.func,
};

export default UpdateGeneralInfo;

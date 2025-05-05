import React from "react";
import { t } from "i18next";
import PropTypes from "prop-types";
import Location from "../../../../components/form/tree/Location";
import Plaka from "../components/ContextMenu/components/Plaka";
import { PlakaContext } from "../../../../../context/plakaSlice";
import Driver from "../../../../components/form/selects/Driver";
import Textarea from "../../../../components/form/inputs/Textarea";
import TextInput from "../../../../components/form/inputs/TextInput";
import RecordDateInput from "../components/ContextMenu/components/RecordDateInput";
import DateInput from "../components/ContextMenu/components/DateInput";
import ClockInput from "../components/ContextMenu/components/ClockInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Guzergah from "../../../../components/form/selects/Guzergah";
import GirisYeri from "../components/ContextMenu/components/GirisYeri";
import CikisYeri from "../components/ContextMenu/components/CikisYeri";
import OdemeTuru from "../components/ContextMenu/components/OdemeTuru";
import OdemeDurumu from "../components/ContextMenu/components/OdemeDurumu";
import GecisKategorisi from "../components/ContextMenu/components/GecisKategorisi";
import Otoyol from "../components/ContextMenu/components/Otoyol";

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
                  {t("tarih")}<span className="text-danger">*</span>
                </label>
                  <RecordDateInput name="tarih" required={true} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="plaka">
                  {t("plaka")} <span className="text-danger">*</span>
                </label>
                  <Plaka required={true} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("surucuAdi")}</label>
                  <Driver name="surucuAdi" codeName="surucuAdi" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("otoyol")}</label>
                  <Otoyol name="otoYolKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("girisTarih-Saat")}</label>
                <div className="flex gap-2">
                  <DateInput name="girisTarih" />
                  <ClockInput name="girisSaat" />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("girisYeri")}</label>
                  <GirisYeri name="girisYeriKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("cikisTarih-Saat")}</label>
                <div className="flex gap-2">
                  <DateInput name="cikisTarih"  />
                  <ClockInput name="cikisSaat" />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("cikisYeri")}</label>
                  <CikisYeri name="cikisYeriKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("odemeTuru")}</label>
                  <OdemeTuru name="odemeTuruKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("gecisUcreti")}</label>
                  <NumberInput name="gecisUcreti" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("odemeDurumu")}</label>
                  <OdemeDurumu name="odemeDurumuKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("fisNo")}</label>
                  <TextInput name="fisNo" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("gecisKategorisi")}</label>
                  <GecisKategorisi name="gecisKategorisiKodId" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
              <label>{t("guzergah")}</label>
                <Guzergah name="guzergahId" />
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

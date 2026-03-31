import React from "react";
import { t } from "i18next";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import Location from "../../../../components/form/tree/Location";
import Plaka from "../components/ContextMenu/components/Plaka";
import { PlakaContext } from "../../../../../context/plakaSlice";
import Driver from "../../../../components/form/selects/Driver";
import Textarea from "../../../../components/form/inputs/Textarea";
import TextInput from "../../../../components/form/inputs/TextInput";
import RecordDateInput from "../components/ContextMenu/components/RecordDateInput";
import DateInput from "../components/ContextMenu/components/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Guzergah from "../../../../components/form/selects/Guzergah";
import OdemeTuru from "../components/ContextMenu/components/OdemeTuru";
import OdemeDurumu from "../components/ContextMenu/components/OdemeDurumu";
import GecisKategorisi from "../components/ContextMenu/components/GecisKategorisi";
import Otoyol from "../components/ContextMenu/components/Otoyol";

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const MINUTES = Array.from({ length: 60 }, (_, minute) => minute);

const getTimeParts = (value) => {
  if (!value) return null;

  if (dayjs.isDayjs(value)) {
    return { hour: value.hour(), minute: value.minute() };
  }

  if (typeof value === "string") {
    const normalizedTime = value.trim();
    const matchedTime = normalizedTime.match(TIME_REGEX);
    if (!matchedTime) return null;

    return {
      hour: Number(matchedTime[1]),
      minute: Number(matchedTime[2]),
    };
  }

  return null;
};

const GeneralInfo = ({ isValid }) => {
  const { watch } = useFormContext();
  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };
  const girisTarih = watch("girisTarih");
  const cikisTarih = watch("cikisTarih");
  const girisSaat = watch("girisSaat");
  const cikisSaat = watch("cikisSaat");

  const hasSameDate = girisTarih && cikisTarih && dayjs(girisTarih).isSame(dayjs(cikisTarih), "day");
  const girisSaatParts = getTimeParts(girisSaat);
  const cikisSaatParts = getTimeParts(cikisSaat);

  const disableGirisDate = (currentDate) => {
    if (!cikisTarih || !currentDate) return false;
    return currentDate.startOf("day").isAfter(dayjs(cikisTarih).startOf("day"));
  };

  const disableCikisDate = (currentDate) => {
    if (!girisTarih || !currentDate) return false;
    return currentDate.startOf("day").isBefore(dayjs(girisTarih).startOf("day"));
  };

  const disableGirisTime = () => {
    if (!hasSameDate || !cikisSaatParts) return {};

    return {
      disabledHours: () => HOURS.filter((hour) => hour > cikisSaatParts.hour),
      disabledMinutes: (selectedHour) => (selectedHour === cikisSaatParts.hour ? MINUTES.filter((minute) => minute > cikisSaatParts.minute) : []),
    };
  };

  const disableCikisTime = () => {
    if (!hasSameDate || !girisSaatParts) return {};

    return {
      disabledHours: () => HOURS.filter((hour) => hour < girisSaatParts.hour),
      disabledMinutes: (selectedHour) => (selectedHour === girisSaatParts.hour ? MINUTES.filter((minute) => minute < girisSaatParts.minute) : []),
    };
  };

  return (
    <>
      <div className="grid gap-2 border p-20">
        <div className="col-span-12">
          <div className="grid gap-1">
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
                <label>
                  {t("tarih")}
                  <span className="text-danger">*</span>
                </label>
                <RecordDateInput name="tarih" required={true} />
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
                <label>{t("girisYeri")}</label>
                <TextInput name="girisYeri" />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col gap-1">
                <label>{t("girisTarih-Saat")}</label>
                <div className="flex gap-2">
                  <DateInput name="girisTarih" disabledDate={disableGirisDate} />
                  <TimeInput name="girisSaat" disabledTime={disableGirisTime} />
                </div>
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
                <label>{t("cikisTarih-Saat")}</label>
                <div className="flex gap-2">
                  <DateInput name="cikisTarih" disabledDate={disableCikisDate} />
                  <TimeInput name="cikisSaat" disabledTime={disableCikisTime} />
                </div>
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
            <div className="col-span-6">
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

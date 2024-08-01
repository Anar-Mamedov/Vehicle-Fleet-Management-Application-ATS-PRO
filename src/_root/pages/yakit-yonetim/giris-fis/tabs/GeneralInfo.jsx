import { useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { t } from "i18next";
import { PlakaContext } from "../../../../../context/plakaSlice";
import {
  CodeControlByUrlService,
  GetLocationByDepoIdService,
} from "../../../../../api/services/code/services";
import TextInput from "../../../../components/form/inputs/TextInput";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import Depo from "../../../../components/form/selects/Depo";
import Firma from "../../../../components/form/selects/Firma";
import CodeControl from "../../../../components/form/selects/CodeControl";
import Location from "../../../../components/form/tree/Location";
import Plaka from "../../../../components/form/selects/Plaka";

const GeneralInfo = ({ isValid }) => {
  const { setValue, watch } = useFormContext();
  const { setPlaka } = useContext(PlakaContext);

  useEffect(() => {
    CodeControlByUrlService("Vehicle/GetVehiclePlates").then((res) => {
      const updatedData = res.data.map((item) => {
        if ("aracId" in item && "plaka" in item) {
          return {
            ...item,
            id: item.aracId,
          };
        }
        return item;
      });
      setPlaka(updatedData);
    });
  }, []);

  useEffect(() => {
    if (watch("girisDepoSiraNo")) {
      const id = watch("depoLokasyonId");
      GetLocationByDepoIdService(id).then((res) => {
        setValue("lokasyonId", res?.data.lokasyonId);
        setValue("lokasyon", res?.data.lokasyonTanim);
      });
    }
  }, [watch("girisDepoSiraNo")]);

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
      <div className="grid gap-1 border p-20">
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("fisNo")}</label>
            <TextInput name="fisNo" style={validateStyle} />
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tarih")}</label>
                <DateInput name="tarih" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("saat")}</label>
                <TimeInput name="saat" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("girisTank")}</label>
            <Depo type="YAKIT" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("firma")}</label>
            <Firma name="unvan" codeName="firmaId" />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("islemTipi")}</label>
            <CodeControl name="islemTipi" codeName="islemTipiKodId" id={302} />
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
            <label>{t("plaka")}</label>
            <Plaka codeName="aracId" name="plaka" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

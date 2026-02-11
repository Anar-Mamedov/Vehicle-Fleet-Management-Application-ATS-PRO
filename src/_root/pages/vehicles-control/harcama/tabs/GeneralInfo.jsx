import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import PlakaSelectBox from "../../../../components/PlakaSelectbox";
import SurucuSelectbox from "../../../../components/SurucuSelectbox";
import LokasyonTablo from "../../../../components/form/LokasyonTable";
import ModalInput from "../../../../components/form/inputs/ModalInput";
import DateInput from "../../../../components/form/date/DateInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../components/form/selects/CodeControl";

const GeneralInfo = () => {
  const { setValue } = useFormContext();
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);

  const handleLokasyonPlusClick = () => {
    setIsLokasyonModalOpen(true);
  };

  const handleLokasyonMinusClick = () => {
    setValue("lokasyon", null);
    setValue("lokasyonId", null);
  };

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("plaka")} <span className="text-danger">*</span>
                </label>
                <PlakaSelectBox
                  name1="plaka"
                  isRequired={true}
                  onChange={(value, option) => {
                    if (option && option.data) {
                      setValue("lokasyonId", option.data.lokasyonId);
                      setValue("lokasyon", option.data.lokasyon);
                      setValue("surucu", option.data.surucu);
                      setValue("surucuID", option.data.surucuId);
                    } else {
                      setValue("lokasyonId", null);
                      setValue("lokasyon", null);
                      setValue("surucu", null);
                      setValue("surucuID", null);
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("harcama")} <span className="text-danger">*</span>
                </label>
                <CodeControl name="harcama" codeName="harcamaKodId" id={204} required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")}</label>
                <SurucuSelectbox name1="surucu" isRequired={false} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("lokasyon")} <span className="text-danger">*</span>
                </label>
                <ModalInput name="lokasyon" readonly={true} required={true} onPlusClick={handleLokasyonPlusClick} onMinusClick={handleLokasyonMinusClick} />
                <LokasyonTablo
                  isModalVisible={isLokasyonModalOpen}
                  setIsModalVisible={setIsLokasyonModalOpen}
                  onSubmit={(selectedData) => {
                    setValue("lokasyon", selectedData.location);
                    setValue("lokasyonId", selectedData.key);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("tarih")} <span className="text-danger">*</span>
                </label>
                <DateInput name="tarih" required={true} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>
                  {t("tutar")} <span className="text-danger">*</span>
                </label>
                <NumberInput name="tutar" required={true} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aciklama")}</label>
                <Textarea name="aciklama" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex gap-2">
                <CheckboxInput name="maliyet" />
                <label>{t("aracMaliyetlerineEkle")}</label>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex gap-2">
                <CheckboxInput name="ozel" />
                <label>{t("ozelHarcama")}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;

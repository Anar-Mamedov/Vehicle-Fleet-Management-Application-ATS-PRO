import React, { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { IoIosWarning } from "react-icons/io";
import { Button, Radio, Modal, Select, Tooltip } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import DateInput from "../../../../components/form/date/DateInput";
import VehicleList from "./VehiclesList";
import { useFormContext, Controller } from "react-hook-form";
import Textarea from "../../../../components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../components/form/selects/KodIDSelectbox";
import DatePickerSelectYear from "../../../../components/form/inputs/DatePickerSelectYear";

const GeneralInfo = () => {
  const { setValue, watch, control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [warning, setWarning] = useState({
    muayene: false,
    sozlesme: false,
    vergi: false,
    egzos: false,
  });

  useEffect(() => {
    const current = dayjs().endOf("day"); // Ensure comparison starts from the start of the day
    const muayeneDate = dayjs(watch("muayeneTarih")).endOf("day");
    const sozlesmeDate = dayjs(watch("sozlesmeTarih")).endOf("day");
    const egzosDate = dayjs(watch("egzosTarih")).endOf("day");
    const vergiDate = dayjs(watch("vergiTarih")).endOf("day");

    setWarning({
      muayene: muayeneDate.isValid() && muayeneDate.diff(current, "day") < 0,
      sozlesme: sozlesmeDate.isValid() && sozlesmeDate.diff(current, "day") < 0,
      egzos: egzosDate.isValid() && egzosDate.diff(current, "day") < 0,
      vergi: vergiDate.isValid() && vergiDate.diff(current, "day") < 0,
    });
  }, [watch("muayeneTarih"), watch("sozlesmeTarih"), watch("egzosTarih"), watch("vergiTarih")]);

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={() => {
        setValue("bagliArac", vehicle[0].plaka);
        setValue("bagliAracId", vehicle[0].aracId);
        setOpen(false);
      }}
    >
      {t("ekle")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={() => setOpen(false)}>
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <div className="grid gap-1 gap-1 mt-10">
        <div className="col-span-8">
          <div className="border p-10 mb-10">
            <h3 className="sub-title">{t("aracBilgileri")}</h3>
            <div className="grid gap-1 mt-10">
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="departmanId">{t("departman")}</label>
                  {/* <CodeControl name="departman" codeName="departmanId" id={200} /> */}
                  <KodIDSelectbox name1="departman" kodID={200} isRequired={false} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="aracGrubuId">{t("aracGrup")}</label>
                  {/* <CodeControl name="grup" codeName="aracGrubuId" id={101} /> */}
                  <KodIDSelectbox name1="aracGrubu" kodID={101} isRequired={false} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("vitesTip")}</label>
                  <KodIDSelectbox name1="vitesTipi" kodID={902} isRequired={false} />
                  {/* <Controller
                    name="tvitesTipi"
                    control={control}
                    render={({ field }) => (
                      <Select
                        className="w-full"
                        {...field}
                        options={[
                          { value: "DUZ", label: <span>DÜZ</span> },
                          { value: "OTOMATIK", label: <span>OTOMATİK</span> },
                        ]}
                        onChange={(e) => field.onChange(e)}
                      />
                    )}
                  /> */}
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">{t("mulkiyet")}</label>
                  <KodIDSelectbox name1="mulkiyet" kodID={891} isRequired={false} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="yil">{t("yil")}</label>
                  <DatePickerSelectYear name="yil" />
                </div>
              </div>

              {/* <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("proje")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("masrafMerkezi")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("havuz")} -- ?</label>
                  <TextInput name="havuzGrup" readonly={true} />
                </div>
              </div> */}
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("kullanimAmaci")}</label>
                  {/* <CodeControl name="kullanimAmaci" codeName="kullanimAmaciKodId" id={887} /> */}
                  <KodIDSelectbox name1="kullanimAmaci" kodID={887} isRequired={false} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("utts")}</label>
                  <TextInput name="utts" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("hgs")}</label>
                  <TextInput name="hgsNo" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("tts")}</label>
                  <TextInput name="tts" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="grid gap-1">
                  <div className="col-span-10">
                    <div className="flex flex-col gap-1">
                      <label>{t("bagliArac")}</label>
                      <TextInput name="bagliArac" readonly={true} />
                    </div>
                  </div>
                  <div className="col-span-2 self-end">
                    <Button className="w-full" onClick={() => setOpen(true)}>
                      ...
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("DepoBataryaKapasitesi")}</label>
                  <NumberInput name="DepoBataryaKapasitesi" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("tamDepoSarjIleMenzil")}</label>
                  <NumberInput name="tamDepoSarjIleMenzil" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("anahtarKodu")}</label>
                  <TextInput name="anahtarKodu" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("yedekAnahtar")}</label>
                  {/* <CodeControl name="yedekAnahtar" codeName="yedekAnahtarKodId" id={888} /> */}
                  <KodIDSelectbox name1="yedekAnahtar" kodID={888} isRequired={false} />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("durum")}</label>
                  {/* <CodeControl name="durum" codeName="durumKodId" id={122} /> */}
                  <KodIDSelectbox name1="durum" kodID={122} isRequired={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="border p-10">
            <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
            <div className="grid gap-1 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex gap-2" style={{ color: warning.muayene ? "red" : "#17a2b8" }}>
                    <span>{t("muayeneTarihi")} </span>
                    <span className={`warning-icon ${warning.muayene ? "show" : "hide"}`}>
                      <IoIosWarning style={{ color: "red", fontSize: 18 }} />
                    </span>
                  </label>
                  <DateInput name="muayeneTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex gap-2" style={{ color: warning.sozlesme ? "red" : "#17a2b8" }}>
                    <span>{t("sozlesmeTarihi")} </span>
                    <span className={`warning-icon ${warning.sozlesme ? "show" : "hide"}`}>
                      <IoIosWarning style={{ color: "red", fontSize: 18 }} />
                    </span>
                  </label>
                  <DateInput name="sozlesmeTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex gap-2" style={{ color: warning.egzos ? "red" : "#17a2b8" }}>
                    <span>{t("egzozEmisyon")} </span>
                    <span className={`warning-icon ${warning.egzos ? "show" : "hide"}`}>
                      <IoIosWarning style={{ color: "red", fontSize: 18 }} />
                    </span>
                  </label>
                  <DateInput name="egzosTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex gap-2" style={{ color: warning.vergi ? "red" : "#17a2b8" }}>
                    <span>{t("vergi")} </span>
                    <span className={`warning-icon ${warning.vergi ? "show" : "hide"}`}>
                      <IoIosWarning style={{ color: "red", fontSize: 18 }} />
                    </span>
                  </label>
                  <DateInput name="vergiTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex gap-2" style={{ color: warning.takograf ? "red" : "#17a2b8" }}>
                    <span>{t("takograf")} </span>
                    <span className={`warning-icon ${warning.takograf ? "show" : "hide"}`}>
                      <IoIosWarning style={{ color: "red", fontSize: 18 }} />
                    </span>
                  </label>
                  <DateInput name="takografTarih" />
                </div>
              </div>
            </div>
          </div>
          <div className="border mt-10" style={{ padding: "5px 10px" }}>
            <div className="sub-title flex gap-1" style={{ alignItems: "center", justifyContent: "space-between" }}>
              <h3>{t("yakitTuketimKontrol")} (100 km)</h3>
              <label style={{ color: "#000000", display: "flex", alignItems: "center", gap: 4 }}>
                {t("gerceklesen")} -
                <Tooltip title={`Gerçekleşen: ${watch("gerceklesen")}`}>
                  <span style={{ color: "#17a2b8", display: "inline-flex", alignItems: "center" }}>
                    {watch("gerceklesen")}
                    {(() => {
                      const gerceklesen = watch("gerceklesen");
                      const onGorulen = watch("onGorulen");
                      const onGorulenMin = watch("onGorulenMin");

                      if (!gerceklesen) return null;

                      if (onGorulenMin !== null && onGorulenMin !== 0) {
                        if (gerceklesen < onGorulenMin) {
                          return <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
                        } else if (gerceklesen > onGorulen) {
                          return <ArrowUpOutlined style={{ color: "red", marginLeft: 4 }} />;
                        } else if (gerceklesen >= onGorulenMin && gerceklesen <= onGorulen) {
                          return <span style={{ marginLeft: 4 }}>~</span>;
                        }
                      } else if (onGorulen !== null && onGorulen !== 0) {
                        if (gerceklesen < onGorulen) {
                          return <ArrowDownOutlined style={{ color: "green", marginLeft: 4 }} />;
                        }
                      }

                      return null;
                    })()}
                  </span>
                </Tooltip>
              </label>
            </div>
            <div className="grid gap-1">
              <div className="col-span-6 mt-10">
                <div className="flex flex-col gap-1">
                  <label>{t("minYakitTuketimi")}</label>
                  <NumberInput name="onGorulenMin" />
                </div>
              </div>
              <div className="col-span-6 mt-10">
                <div className="flex flex-col gap-1">
                  <label>{t("maxYakitTuketimi")}</label>
                  <NumberInput name="onGorulen" />
                </div>
              </div>

              {/*  <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("gercekYakitTuketimi")}</label>
                  <NumberInput name="gerceklesen" />
                </div>
              </div>*/}
              <div className="col-span-6">
                <div className="flex flex-row gap-1 justify-between">
                  <label>{t("uyari")}</label>
                  <CheckboxInput name="uyari" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal title={t("araclar")} open={open} onCancel={() => setOpen(false)} maskClosable={false} footer={footer} width={1200}>
          <VehicleList setVehicle={setVehicle} open={open} />
        </Modal>
      </div>
    </>
  );
};

export default GeneralInfo;

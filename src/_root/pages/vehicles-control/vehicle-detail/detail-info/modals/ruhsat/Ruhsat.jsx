import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, Modal, Select } from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from "../../../../../../../api/services/vehicles/vehicles/services";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Towns from "../../../../../../components/form/selects/Towns";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";

dayjs.locale("tr");

const Ruhsat = ({ visible, onClose, id }) => {
  const [hakMahrumiyetChecked, setHakMahrumiyetChecked] = useState(false);
  const [status, setStatus] = useState(false);

  const defaultValues = {
    aciklama: "",
    /*  aracCinsi: "",
    aracCinsiKodId: null, */
    aracSinifi: "",
    azamiYukluAgirligi: "",
    ayaktaYolcuSayisi: "",
    belgeSeriNo: "",
    dtyAracId: 0,
    hakMahrumiyet: false,
    hakMahrumiyetAciklama: "",
    hakMahrumiyetDurum: "",
    hakMahrumiyettarih: "",
    hususi: false,
    il: "",
    ilKodId: 0,
    ilce: "",
    istiapHaddi: "",
    istiapHaddiBirim: "",
    istiapHaddiBirimKodId: 0,
    tvitesTipi: null,
    koltukSayisi: "",
    kullanimAmaci: "",
    onayNo: "",
    resmi: false,
    romok: false,
    ruhsatSahibi: "",
    // ruhsatSahibiKodId: 0,
    taksiMetre: false,
    tescilNo: "",
    tescilTarih: "",
    ticari: false,
    ticariAdi: "",
    tokograf: false,
    trafikciktarih: "",
    vergiDaire: "",
    vergiNo: "",
    yolcuNakli: false,
    yukNakli: false,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { control, handleSubmit, setValue } = methods;

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 2).then((res) => {
      setValue("aciklama", res?.data.aciklama);
      /*  setValue("aracCinsi", res?.data.aracCinsi);
      setValue("aracCinsiKodId", res?.data.aracCinsiKodId); */
      setValue("aracSinifi", res?.data.aracSinifi);
      setValue("ayaktaYolcuSayisi", res?.data.ayaktaYolcuSayisi);
      setValue("azamiYukluAgirligi", res?.data.azamiYukluAgirligi);
      setValue("belgeSeriNo", res?.data.belgeSeriNo);
      setValue("dtyAracId", res?.data.dtyAracId);
      setValue("hakMahrumiyet", res?.data.hakMahrumiyet);
      setHakMahrumiyetChecked(res?.data.hakMahrumiyet);
      setValue("hakMahrumiyetAciklama", res?.data.hakMahrumiyetAciklama);
      setValue("hakMahrumiyetDurum", res?.data.hakMahrumiyetDurum);
      setValue("hakMahrumiyettarih", res?.data.hakMahrumiyettarih && res?.data.hakMahrumiyettarih !== "1970-01-01T00:00:00" ? dayjs(res?.data.hakMahrumiyettarih) : null);
      setValue("hususi", res?.data.hususi);
      setValue("il", res?.data.il);
      setValue("ilSehirId", res?.data.ilSehirId);
      setValue("ilce", res?.data.ilce);
      setValue("istiapHaddi", res?.data.istiapHaddi);
      setValue("istiapHaddiBirim", res?.data.istiapHaddiBirim);
      setValue("istiapHaddiBirimKodId", res?.data.istiapHaddiBirimKodId);
      setValue("koltukSayisi", res?.data.koltukSayisi);
      setValue("kullanimAmaci", res?.data.rKullanimAmaci);
      setValue("kullanimAmaciKodId", res?.data.rKullanimAmaciKodId);
      setValue("rAzamiIstiapHaddiBirim", res?.data.rAzamiIstiapHaddiBirim);
      setValue("rAzamiIstiapHaddiBirimKodId", res?.data.rAzamiIstiapHaddiBirimKodId);
      setValue("rAzamiYuklu", res?.data.rAzamiYuklu);
      setValue("azamiYukluAgirligi", res?.data.azamiYukluAgirligi);
      setValue("onayNo", res?.data.onayNo);
      setValue("resmi", res?.data.resmi);
      setValue("romok", res?.data.romok);
      setValue("ruhsatSahibi", res?.data.ruhsatSahibi);
      setValue("tvitesTipi", res.data.tvitesTipi);
      // setValue("ruhsatSahibiKodId", res?.data.ruhsatSahibiKodId);
      setValue("taksiMetre", res?.data.taksiMetre);
      setValue("tescilNo", res?.data.tescilNo);
      setValue("tescilTarih", res?.data.tescilTarih && res?.data.tescilTarih !== "1970-01-01T00:00:00" ? dayjs(res?.data.tescilTarih) : null);
      setValue("ticari", res?.data.ticari);
      setValue("ticariAdi", res?.data.ticariAdi);
      setValue("tokograf", res?.data.tokograf);
      setValue("trafikciktarih", res?.data.trafikciktarih && res?.data.trafikciktarih !== "1970-01-01T00:00:00" ? dayjs(res?.data.trafikciktarih) : null);
      setValue("vergiDaire", res?.data.vergiDaire);
      setValue("vergiNo", res?.data.vergiNo);
      setValue("yolcuNakli", res?.data.yolcuNakli);
      setValue("yukNakli", res?.data.yukNakli);
    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {
      dtyAracId: +id,
      ilSehirId: values.ilSehirId || 0,
      ruhsatSahibi: values.ruhsatSahibi,
      ilce: values.ilce,
      tescilNo: values.tescilNo,
      tescilTarih: values?.tescilTarih,
      trafikciktarih: values?.trafikciktarih,
      istiapHaddi: values.istiapHaddi,
      romok: values.romok,
      taksiMetre: values.taksiMetre,
      tokograf: values.tokograf,
      aciklama: values.aciklama,
      istiapHaddiBirimKodId: values.istiapHaddiBirimKodId || 0,
      belgeSeriNo: values.belgeSeriNo,
      ticariAdi: values.ticariAdi,
      tvitesTipi: values.tvitesTipi,
      aracSinifi: values.aracSinifi,
      koltukSayisi: values.koltukSayisi,
      ayaktaYolcuSayisi: values.ayaktaYolcuSayisi,
      rKullanimAmaciKodId: values.kullanimAmaciKodId || 0,
      hakMahrumiyet: values.hakMahrumiyet,
      hakMahrumiyetAciklama: values.hakMahrumiyetAciklama,
      hakMahrumiyetDurum: values.hakMahrumiyetDurum,
      hakMahrumiyettarih: values?.hakMahrumiyettarih || null,
      rAzamiIstiapHaddiBirimKodId: values.rAzamiIstiapHaddiBirimKodId || 0,
      azamiYukluAgirligi: values.azamiYukluAgirligi,
      rAzamiYuklu: values.rAzamiYuklu,
      onayNo: values.onayNo,
      yolcuNakli: values.yolcuNakli,
      yukNakli: values.yukNakli,
      ticari: values.ticari,
      resmi: values.resmi,
      hususi: values.hususi,
      vergiNo: values.vergiNo,
      vergiDaire: values.vergiDaire,
    };

    UpdateVehicleDetailsInfoService(2, body).then((res) => {
      if (res.data.statusCode === 202) {
        setStatus(true);
        onClose();
      }
    });
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("ruhsatBilgileri")} open={visible} onCancel={onClose} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <div className="grid gap-1 mt-14">
          <div className="col-span-9 border p-10">
            <div className="grid gap-1">
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ruhsatSahibi")}</label>
                  <TextInput name="ruhsatSahibi" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="aracTipId">{t("verdigiIl")}</label>
                  <Towns />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("verdigiIlce")}</label>
                  <TextInput name="ilce" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("tescilSiraNo")}</label>
                  <TextInput name="tescilNo" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ilkTescilTarih")}</label>
                  <DateInput name="trafikciktarih" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("tescilTarihi")}</label>
                  <DateInput name="tescilTarih" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("belgeSiraNo")}</label>
                  <TextInput name="belgeSeriNo" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("aracSinifi")}</label>
                  <TextInput name="aracSinifi" />
                </div>
              </div>
              {/* <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("aracCinsi")}</label>
                  <CodeControl name="aracCinsi" codeName="aracCinsiKodId" id={107} />
                </div>
              </div> */}

              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("vitesTip")}</label>
                  <Controller
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
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ticariAdi")}</label>
                  <TextInput name="ticariAdi" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("azamiYukluAgirligi")}</label>
                  <TextInput name="azamiYukluAgirligi" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("koltukSayisi")}</label>
                  <TextInput name="koltukSayisi" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ayaktaYolcuSayisi")}</label>
                  <TextInput name="ayaktaYolcuSayisi" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("onayNo")}</label>
                  <TextInput name="onayNo" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("vergiNoTcNo")}</label>
                  <TextInput name="vergiNo" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("vergiDairesi")}</label>
                  <TextInput name="vergiDaire" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kullanimAmaci")}</label>
                  <CodeControl name="kullanimAmaci" codeName="kullanimAmaciKodId" id={887} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid gap-1">
                  <div className="col-span-6">
                    <div className="flex flex-col gap-1">
                      <label>{t("istiapHaddi")}</label>
                      <TextInput name="istiapHaddi" />
                    </div>
                  </div>
                  <div className="col-span-6 self-end">
                    <div className="flex flex-col gap-1">
                      <CodeControl name="istiapHaddiBirim" codeName="istiapHaddiBirimKodId" id={109} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid gap-1">
                  <div className="col-span-12">
                    <label>{t("rAzamiYukluAgirligi")}</label>
                  </div>
                  <div className="col-span-6 self-end">
                    <div className="flex flex-col gap-1">
                      <TextInput name="rAzamiYuklu" />
                    </div>
                  </div>
                  <div className="col-span-6 self-end">
                    <div className="flex flex-col gap-1">
                      <CodeControl name="rAzamiIstiapHaddiBirim" codeName="rAzamiIstiapHaddiBirimKodId" id={109} />
                    </div>
                  </div>
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
          <div className="col-span-3 border p-10">
            <div className="grid">
              <div className="col-span-6 flex flex-col">
                <label htmlFor="taksiMetre">{t("taksimetre")}</label>
                <CheckboxInput name="taksiMetre" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="yukNakli">{t("yukluNakli")}</label>
                <CheckboxInput name="yukNakli" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="tokograf">{t("takograf")}</label>
                <CheckboxInput name="tokograf" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="ticari">{t("ticari")}</label>
                <CheckboxInput name="ticari" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="romok">{t("romorkTakar")}</label>
                <CheckboxInput name="romok" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="resmi">{t("resmi")}</label>
                <CheckboxInput name="resmi" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="yolcuNakli">{t("yolcuNakli")}</label>
                <CheckboxInput name="yolcuNakli" />
              </div>
              <div className="col-span-6 flex flex-col">
                <label htmlFor="hususi">{t("hususi")}</label>
                <CheckboxInput name="hususi" />
              </div>
              <div className="col-span-12">
                <Divider />
              </div>
              <div className="col-span-12 flex gap-1 mb-10">
                <Controller
                  control={control}
                  name="hakMahrumiyet"
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      className="mr-10"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setHakMahrumiyetChecked(e.target.checked);
                      }}
                    />
                  )}
                />
                <label htmlFor="">{t("hakMahrumiyeti")}</label>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aciklama")}</label>
                  <Controller
                    name="hakMahrumiyetAciklama"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={!hakMahrumiyetChecked}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("makamKurum")}</label>
                  <Controller
                    name="hakMahrumiyetDurum"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        disabled={!hakMahrumiyetChecked}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("tarih")}</label>
                  <Controller
                    name="hakMahrumiyettarih"
                    control={control}
                    render={({ field }) => (
                      <ConfigProvider locale={tr_TR}>
                        <DatePicker
                          {...field}
                          placeholder=""
                          disabled={!hakMahrumiyetChecked}
                          locale={dayjs.locale("tr")}
                          format="DD.MM.YYYY"
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </ConfigProvider>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

Ruhsat.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Ruhsat;

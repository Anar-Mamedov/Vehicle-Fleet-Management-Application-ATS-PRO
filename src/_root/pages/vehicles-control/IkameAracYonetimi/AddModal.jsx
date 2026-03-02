import React, { useContext, useEffect, useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, message, Modal, Select } from "antd";
import { PlusOutlined, LoadingOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../context/plakaSlice";
import AxiosInstance from "../../../../api/http";
import Plaka from "../../../../_root/components/form/selects/Plaka";
import DateInput from "../../../../_root/components/form/date/DateInput";
import NumberInput from "../../../../_root/components/form/inputs/NumberInput";
import TextInput from "../../../../_root/components/form/inputs/TextInput";
import Textarea from "../../../../_root/components/form/inputs/Textarea";
import KodIDSelectbox from "../../../../_root/components/KodIDSelectbox";

const AddModal = ({ onRefresh }) => {
  const { setPlaka } = useContext(PlakaContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insuranceOptions, setInsuranceOptions] = useState([]);

  const defaultValues = {
    aracId: null,
    ikamePlaka: "",
    markaId: null,
    markaLabel: "",
    baslangicTarih: null,
    bitisTarih: null,
    gun: 0,
    tedarikci: "",
    aracTipKodId: null,
    aracTipKodIdID: null,
    km: 0,
    nedenKodId: null,
    nedenKodIdID: null,
    kmLimit: 0,
    hgs: null,
    sigortaId: null,
    yakitTipId: null,
    yakitPolitikasi: null,
    aciklama: "",
  };

  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, watch, setValue, control } = methods;

  const baslangicTarih = watch("baslangicTarih");
  const bitisTarih = watch("bitisTarih");

  // Auto-calculate "Süre (Gün)" when dates change
  useEffect(() => {
    if (baslangicTarih && bitisTarih) {
      const start = dayjs(baslangicTarih);
      const end = dayjs(bitisTarih);
      const diff = end.diff(start, "day");
      setValue("gun", diff >= 0 ? diff : 0);
    } else {
      setValue("gun", 0);
    }
  }, [baslangicTarih, bitisTarih, setValue]);

  // Fetch insurance list when vehicle changes
  const aracId = watch("aracId");
  useEffect(() => {
    if (aracId) {
      AxiosInstance.get(`Insurance/GetActiveInsuranceList?vehicleId=${aracId}&diff=0&setPointId=0&parameter=`)
        .then((res) => {
          if (res.data?.list) {
            setInsuranceOptions(res.data.list);
          } else if (Array.isArray(res.data)) {
            setInsuranceOptions(res.data);
          }
        })
        .catch(() => {
          setInsuranceOptions([]);
        });
    } else {
      setInsuranceOptions([]);
    }
  }, [aracId]);

  // Fetch brand list for marka select
  const [brandOptions, setBrandOptions] = useState([]);
  const handleBrandDropdown = (open) => {
    if (open && brandOptions.length === 0) {
      AxiosInstance.get("Mark/GetMarkList")
        .then((res) => {
          setBrandOptions(res.data || []);
        })
        .catch(() => setBrandOptions([]));
    }
  };

  // Fetch fuel type list
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);
  const handleFuelTypeDropdown = (open) => {
    if (open && fuelTypeOptions.length === 0) {
      AxiosInstance.get("Material/GetMaterialListByType?type=YAKIT")
        .then((res) => {
          setFuelTypeOptions(res.data || []);
        })
        .catch(() => setFuelTypeOptions([]));
    }
  };

  const onSubmit = handleSubmit((values) => {
    const body = {
      aracId: values.aracId || 0,
      gun: values.gun || 0,
      ikamePlaka: values.ikamePlaka || "",
      markaId: values.markaId || 0,
      baslangicTarih: values.baslangicTarih ? dayjs(values.baslangicTarih).toISOString() : null,
      bitisTarih: values.bitisTarih ? dayjs(values.bitisTarih).toISOString() : null,
      tedarikci: values.tedarikci || "",
      aracTipKodId: values.aracTipKodIdID || 0,
      km: values.km || 0,
      nedenKodId: values.nedenKodIdID || 0,
      sigortaId: values.sigortaId || 0,
      kmLimit: values.kmLimit || 0,
      hgs: values.hgs || "",
      yakitTipId: values.yakitTipId || 0,
      yakitPolitikasi: values.yakitPolitikasi || "",
      aciklama: values.aciklama || "",
    };

    setLoading(true);
    AxiosInstance.post("ReplacementVehicle/AddReplacementVehicle", body)
      .then((res) => {
        if (res?.data?.statusCode === 200 || res?.data?.statusCode === 201 || res?.data?.statusCode === 202) {
          message.success(t("islemBasarili"));
          onRefresh();
          setIsOpen(false);
          setPlaka([]);
          reset();
        } else {
          message.error(t("islemBasarisiz"));
        }
      })
      .catch((err) => {
        console.error("Error adding replacement vehicle:", err);
        message.error(t("islemBasarisiz"));
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const footer = [
    loading ? (
      <Button key="loading" className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
        {t("kaydet")}
      </Button>
    ),
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsOpen(false);
        setPlaka([]);
        reset();
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <>
      <Button
        className="btn primary-btn"
        onClick={() => {
          reset();
          setPlaka([]);
          setIsOpen(true);
        }}
      >
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("ikameAracEkleme")}
        open={isOpen}
        destroyOnClose
        onCancel={() => {
          setIsOpen(false);
          setPlaka([]);
          reset();
        }}
        maskClosable={false}
        footer={footer}
        width={900}
      >
        <FormProvider {...methods}>
          <form>
            {/* Araç İlişkisi */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("aracIliskisi")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("asilArac")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <Plaka codeName="aracId" required />
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: 20 }}>
                  <ArrowRightOutlined style={{ fontSize: 18, color: "#999" }} />
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("ikameArac")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextInput name="ikamePlaka" required />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("marka")}</label>
                    <Controller
                      name="markaId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          showSearch
                          allowClear
                          optionFilterProp="label"
                          placeholder={t("seciniz")}
                          onDropdownVisibleChange={handleBrandDropdown}
                          options={brandOptions.map((item) => ({
                            label: item.marka,
                            value: item.siraNo,
                          }))}
                          filterOption={(input, option) => (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* İkame Süresi */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("ikameSuresi")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("baslangic")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <DateInput name="baslangicTarih" required />
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center" style={{ paddingTop: 20 }}>
                  <ArrowRightOutlined style={{ fontSize: 18, color: "#999" }} />
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>
                      {t("bpitisTarihi")} <span style={{ color: "red" }}>*</span>
                    </label>
                    <DateInput name="bitisTarih" required />
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex flex-col gap-1">
                    <label>{t("sureGun")}</label>
                    <NumberInput name="gun" checked />
                  </div>
                </div>
              </div>
            </div>

            {/* Operasyon */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("operasyon")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <div className="grid gap-1">
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("tedarikci")}</label>
                    <TextInput name="tedarikci" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("aracTip")}</label>
                    <KodIDSelectbox name1="aracTipKodId" kodID={202} addHide />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("aracKm")}</label>
                    <NumberInput name="km" />
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("verilisNedeni")}</label>
                    <KodIDSelectbox name1="nedenKodId" kodID={203} addHide />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("kmLimiti")}</label>
                    <NumberInput name="kmLimit" />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("hgsEtiketi")}</label>
                    <Controller
                      name="hgs"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          allowClear
                          placeholder={t("seciniz")}
                          options={[
                            { label: t("var"), value: "Var" },
                            { label: t("yok"), value: "Yok" },
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("policeNo")}</label>
                    <Controller
                      name="sigortaId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          showSearch
                          allowClear
                          optionFilterProp="label"
                          placeholder={t("seciniz")}
                          options={insuranceOptions.map((item) => ({
                            label: item.policeNo || item.sigortaFirma || `#${item.siraNo}`,
                            value: item.siraNo,
                          }))}
                          filterOption={(input, option) => (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("yakitTip")}</label>
                    <Controller
                      name="yakitTipId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          showSearch
                          allowClear
                          optionFilterProp="label"
                          placeholder={t("seciniz")}
                          onDropdownVisibleChange={handleFuelTypeDropdown}
                          options={fuelTypeOptions.map((item) => ({
                            label: item.tanim,
                            value: item.malzemeId,
                          }))}
                          filterOption={(input, option) => (option?.label?.toLowerCase() ?? "").includes(input.toLowerCase())}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="flex flex-col gap-1">
                    <label>{t("yakitPolitikasi")}</label>
                    <Controller
                      name="yakitPolitikasi"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          allowClear
                          placeholder={t("seciniz")}
                          options={[
                            { label: t("ayniSeviye"), value: "Aynı seviye" },
                            { label: "Full → Full", value: "Full → Full" },
                            { label: t("serbest"), value: "Serbest" },
                            { label: t("bosaBos"), value: "Boş → Boş" },
                          ]}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div style={{ marginBottom: 8 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{t("aciklama")}</h3>
              <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", marginBottom: 16 }} />
              <Textarea name="aciklama" />
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  onRefresh: PropTypes.func,
};

export default AddModal;

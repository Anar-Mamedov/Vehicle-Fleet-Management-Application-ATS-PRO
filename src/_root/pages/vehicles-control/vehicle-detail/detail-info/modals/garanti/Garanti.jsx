import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal, Select } from "antd";
import {
  GetVehicleDetailsInfoService,
  UpdateVehicleDetailsInfoService,
} from "../../../../../../../api/services/vehicles/vehicles/services";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../../../components/form/date/DateInput";

const Garanti = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);
  const methods = useForm({ defaultValues: {} });
  const { handleSubmit, setValue, control, watch } = methods;
  const garantiPeriyod = watch("garantiPeriyod");
  const garantiBaslamaTarih = watch("garantiBaslamaTarih");
  const garantiSuresi = watch("garantiSure");
  const garantiKm = watch("garantiKm");
  const garantiBaslamaKm = watch("garantiBaslamaKm");

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 3).then((res) => {
      setValue("garantiSure", res.data.garantiSure);
      setValue("garantiKm", res.data.garantiKm);
      setValue("garantiBaslamaKm", res.data.garantiBaslamaKm);
      setValue("garantiBitisKm", res.data.garantiBitisKm);
      setValue("garantiPeriyod", res.data.garantiPeriyod);
      setValue(
        "garantiBaslamaTarih",
        res.data.garantiBaslamaTarih !== "0001-01-01T00:00:00" &&
          dayjs(res.data.garantiBaslamaTarih)
      );
      setValue(
        "garantiBitisTarih",
        res.data.garantiBitisTarih !== "0001-01-01T00:00:00" &&
          dayjs(res.data.garantiBitisTarih)
      );
    });
  }, [id, status, setValue]);

  useEffect(() => {
    if (garantiBaslamaTarih && garantiPeriyod) {
      let newDate;
      switch (garantiPeriyod) {
        case "gun":
          newDate = dayjs(garantiBaslamaTarih).add(
            methods.getValues("garantiSure"),
            "day"
          );
          break;
        case "ay":
          newDate = dayjs(garantiBaslamaTarih).add(
            methods.getValues("garantiSure"),
            "month"
          );
          break;
        case "yil":
          newDate = dayjs(garantiBaslamaTarih).add(
            methods.getValues("garantiSure"),
            "year"
          );
          break;
        default:
          newDate = garantiBaslamaTarih;
      }
      setValue("garantiBitisTarih", newDate);
    }
  }, [garantiPeriyod, garantiBaslamaTarih, garantiSuresi, methods, setValue]);

  useEffect(() => {
    if (garantiBaslamaKm && garantiKm) {
      const bitisKm = garantiKm + garantiBaslamaKm;
      setValue("garantiBitisKm", bitisKm);
    }
  }, [garantiKm, garantiBaslamaKm]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      dtyAracId: +id,
      garantiPeriyod: values.garantiPeriyod,
      garantiBaslamaTarih:
        dayjs(values.garantiBaslamaTarih).format("YYYY-MM-DD") || null,
      garantiBitisTarih:
        dayjs(values.garantiBitisTarih).format("YYYY-MM-DD") || null,
      garantiSure: values.garantiSure || 0,
      garantiKm: values.garantiKm || 0,
      garantiBaslamaKm: values.garantiBaslamaKm || 0,
      garantiBitisKm: values.garantiBitisKm || 0,
    };

    UpdateVehicleDetailsInfoService(3, body).then((res) => {
      if (res.data.statusCode === 202) {
        setStatus(true);
        onClose();
      }
    });
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("kaydet")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal
      title={t("garantiBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={600}
    >
      <FormProvider {...methods}>
        <div className="grid gap-1 mt-10">
          <div className="col-span-6">
            <div className="grid gap-1">
              <div className="col-span-8">
                <div className="flex flex-col gap-1">
                  <label>{t("garantiSure")}</label>
                  <NumberInput name="garantiSure" />
                </div>
              </div>
              <div className="col-span-4 self-end">
                <Controller
                  name="garantiPeriyod"
                  control={control}
                  render={({ field }) => (
                    <Select
                      className="w-full"
                      {...field}
                      defaultValue=""
                      options={[
                        { value: "gun", label: <span>Gün</span> },
                        { value: "ay", label: <span>Ay</span> },
                        { value: "yil", label: <span>Yıl</span> },
                      ]}
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("garantiKm")}</label>
              <NumberInput name="garantiKm" />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("garantiBaslamaTarih")}</label>
              <DateInput name="garantiBaslamaTarih" />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("garantiBaslamaKm")}</label>
              <NumberInput name="garantiBaslamaKm" />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("garantiBitisTarih")}</label>
              <DateInput name="garantiBitisTarih" />
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col gap-1">
              <label>{t("garantiBitisKm")}</label>
              <NumberInput name="garantiBitisKm" />
            </div>
          </div>
        </div>
      </FormProvider>
    </Modal>
  );
};

Garanti.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Garanti;

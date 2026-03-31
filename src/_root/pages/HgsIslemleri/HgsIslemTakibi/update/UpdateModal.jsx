import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, message, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../../api/services/code/services";
import { UpdateHgsItemService, GetHgsOperationItemByIdService } from "../../../../../api/services/hgs-islem-takibi/services";
import GeneralInfo from "./GeneralInfo";
import Iletisim from "./Iletisim";
import PersonalFields from "../../../../components/form/PersonalFields";
import FinansBilgileri from "./FinansBilgileri";
import ResimUpload from "../../../../components/Resim/ResimUpload";
import DosyaUpload from "../../../../components/Dosya/DosyaUpload";
import dayjs from "dayjs";

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

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

const toDateTime = (dateValue, timeValue) => {
  if (!dateValue) return null;

  const date = dayjs(dateValue);
  if (!date.isValid()) return null;

  const timeParts = getTimeParts(timeValue);
  if (!timeParts) return date.startOf("day");

  return date.hour(timeParts.hour).minute(timeParts.minute).second(0).millisecond(0);
};

const toTimeDayjs = (value) => {
  const timeParts = getTimeParts(value);
  if (!timeParts) return null;

  return dayjs().hour(timeParts.hour).minute(timeParts.minute).second(0).millisecond(0);
};

const formatTimeValue = (value) => {
  if (!value) return null;

  if (dayjs.isDayjs(value)) {
    return value.format("HH:mm");
  }

  if (typeof value === "string") {
    const normalizedTime = value.trim();
    return TIME_REGEX.test(normalizedTime) ? normalizedTime : null;
  }

  return null;
};

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id, selectedRow, onDrawerClose, drawerVisible, onRefresh }) => {
  const [isValid, setIsValid] = useState("normal");
  const [code, setCode] = useState("normal");
  const [activeKey, setActiveKey] = useState("1");
  const [firmaId, setFirmaId] = useState(0);
  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "ozelAlan1",
      value: `${t("ozelAlan")} 1`,
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "ozelAlan2",
      value: `${t("ozelAlan")} 2`,
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "ozelAlan3",
      value: `${t("ozelAlan")} 3`,
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "ozelAlan4",
      value: `${t("ozelAlan")} 4`,
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "ozelAlan5",
      value: `${t("ozelAlan")} 5`,
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "ozelAlan6",
      value: `${t("ozelAlan")} 6`,
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "ozelAlan7",
      value: `${t("ozelAlan")} 7`,
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "ozelAlan8",
      value: `${t("ozelAlan")} 8`,
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "ozelAlan9",
      value: `${t("ozelAlan")} 9`,
      type: "select",
      code: 865,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "ozelAlan10",
      value: `${t("ozelAlan")} 10`,
      type: "select",
      code: 866,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "ozelAlan11",
      value: `${t("ozelAlan")} 11`,
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "ozelAlan12",
      value: `${t("ozelAlan")} 12`,
      type: "number",
    },
  ]);

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (drawerVisible && selectedRow) {
      GetHgsOperationItemByIdService(selectedRow?.key).then((res) => {
        const data = res?.data;
        setValue("siraNo", data.siraNo);
        setValue("tarih", data.tarih ? dayjs(data.tarih) : null);
        setValue("aracId", data.aracId);
        setValue("plaka", data.plaka);
        setValue("surucuId", data.surucuId);
        setValue("isim", data.isim);
        setValue("otoYol", data.otoYol);
        setValue("girisTarih", data.girisTarih ? dayjs(data.girisTarih) : null);
        setValue("girisSaat", toTimeDayjs(data.girisSaat));
        setValue("cikisTarih", data.cikisTarih ? dayjs(data.cikisTarih) : null);
        setValue("cikisSaat", toTimeDayjs(data.cikisSaat));
        setValue("girisYeri", data.girisYeri);
        setValue("cikisYeri", data.cikisYeri);
        setValue("odemeTuruKodId", data.odemeTuruKodId);
        setValue("odemeTuru", data.odemeTuru);
        setValue("gecisUcreti", data.gecisUcreti ? parseFloat(data.gecisUcreti.toString().replace(",", ".")).toFixed(2) : "");
        setValue("odemeDurumuKodId", data.odemeDurumuKodId);
        setValue("odemeDurumu", data.odemeDurumu);
        setValue("fisNo", data.fisNo);
        setValue("gecisKategorisiKodId", data.gecisKategorisiKodId);
        setValue("gecisKategorisi", data.gecisKategorisi);
        setValue("guzergahId", data.guzergahId);
        setValue("guzergah", data.guzergah);
        setValue("aciklama", data.aciklama);
        setValue("ozelAlan1", data.ozelAlan1);
        setValue("ozelAlan2", data.ozelAlan2);
        setValue("ozelAlan3", data.ozelAlan3);
        setValue("ozelAlan4", data.ozelAlan4);
        setValue("ozelAlan5", data.ozelAlan5);
        setValue("ozelAlan6", data.ozelAlan6);
        setValue("ozelAlan7", data.ozelAlan7);
        setValue("ozelAlan8", data.ozelAlan8);
        setValue("ozelAlan9", data.ozelAlan9);
        setValue("ozelAlanKodId9", data.ozelAlanKodId9);
        setValue("ozelAlan10", data.ozelAlan10);
        setValue("ozelAlanKodId10", data.ozelAlanKodId10);
        setValue("ozelAlan11", data.ozelAlan11);
        setValue("ozelAlan12", data.ozelAlan12);
      });
    }
  }, [selectedRow, drawerVisible]);

  const onSubmit = handleSubmit((values) => {
    const girisDateTime = toDateTime(values.girisTarih, values.girisSaat);
    const cikisDateTime = toDateTime(values.cikisTarih, values.cikisSaat);

    if (girisDateTime && cikisDateTime && girisDateTime.isAfter(cikisDateTime)) {
      message.error(t("girisTarihSaatCikisTarihSaattenBuyukOlamaz"));
      return;
    }

    const body = {
      siraNo: values.siraNo || 1,
      tarih: values.tarih ? dayjs(values.tarih).format("YYYY-MM-DD") : null,
      saat: values.saat || "",
      aracId: values.aracId,
      surucuId: values.surucuId,
      otoYolKodId: values.otoYolKodId,
      girisTarih: values.girisTarih ? dayjs(values.girisTarih).format("YYYY-MM-DD") : null,
      girisSaat: formatTimeValue(values.girisSaat) || "",
      cikisTarih: values.cikisTarih ? dayjs(values.cikisTarih).format("YYYY-MM-DD") : null,
      cikisSaat: formatTimeValue(values.cikisSaat) || "",
      girisYeri: values.girisYeri || "",
      cikisYeri: values.cikisYeri || "",
      odemeTuruKodId: values.odemeTuruKodId,
      gecisUcreti: values.gecisUcreti ? parseFloat(values.gecisUcreti) : 0,
      odemeDurumuKodId: values.odemeDurumuKodId,
      fisNo: values.fisNo,
      gecisKategorisiKodId: values.gecisKategorisiKodId,
      guzergahId: values.guzergahId,
      aciklama: values.aciklama,
      ozelAlan1: values.ozelAlan1 || "",
      ozelAlan2: values.ozelAlan2 || "",
      ozelAlan3: values.ozelAlan3 || "",
      ozelAlan4: values.ozelAlan4 || "",
      ozelAlan5: values.ozelAlan5 || "",
      ozelAlan6: values.ozelAlan6 || "",
      ozelAlan7: values.ozelAlan7 || "",
      ozelAlan8: values.ozelAlan8 || "",
      ozelAlanKodId9: values.ozelAlanKodId9 ?? -1,
      ozelAlanKodId10: values.ozelAlanKodId10 ?? -1,
      ozelAlan11: values.ozelAlan11 ?? 0,
      ozelAlan12: values.ozelAlan12 ?? 0,
    };

    UpdateHgsItemService(body).then((res) => {
      if (res.data.statusCode === 202) {
        onDrawerClose();
        onRefresh();
        reset(defaultValues);
        setActiveKey("1");
      }
    });
  });

  const personalProps = {
    form: "HgsIslem",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isValid={isValid} />,
    },
    {
      key: "4",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "5",
      label: t("resimler"),
      children: <ResimUpload selectedRowID={selectedRow?.key} refGroup="HGSISLEMTAKIP" />,
    },
    {
      key: "6",
      label: t("ekliBelgeler"),
      children: <DosyaUpload selectedRowID={selectedRow?.key} refGroup="HGSISLEMTAKIP" />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid === "success" ? false : isValid === "error" ? true : false}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        onDrawerClose();
        reset(defaultValues);
        setActiveKey("1");
      }}
    >
      {t("kapat")}
    </Button>,
  ];

  return (
    <Modal title={t("hgsIslemKaydiGüncelle")} open={drawerVisible} onCancel={() => onDrawerClose()} maskClosable={false} footer={footer} width={1200}>
      <FormProvider {...methods}>
        <form>
          <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
        </form>
      </FormProvider>
    </Modal>
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
};

export default UpdateModal;

import { useEffect, useState, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Modal, Popconfirm } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { t } from "i18next";
import {
  AddMaterialReceiptService,
  GetMaterialCardByIdService,
} from "../../../../api/services/yakit-yonetimi/services";
import {
  CodeItemValidateService,
  GetModuleCodeByCode,
} from "../../../../api/services/code/services";
import GeneralInfo from "./tabs/GeneralInfo";
import MalzemeLists from "./tabs/MalzemeLists";
import EkBilgiler from "./tabs/EkBilgiler";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState("normal");
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    fisNo: "",
    tarih: dayjs(new Date()),
    saat: dayjs(new Date()),
    girisDepoSiraNo: null,
    girisDepo: "",
    firmaId: null,
    lokasyonId: null,
    lokasyon: "",
    aracId: null,
    plaka: "",
    islemTipiKodId: null,
    islemTipi: "",
    aciklama: "",
  };
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, setValue, watch } = methods;

  const onSubmit = handleSubmit((values) => {
    let materialMovements = [];
    tableData.map((item) => {
      materialMovements.push({
        mlzAracId: item.aracId || 0,
        tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
        firmaId: values.firmaId || 0,
        malzemeId: item.malzemeId,
        birimKodId: item.birimId || 0,
        lokasyonId: item.lokasyonId || 0,
        miktar: item.miktar || 0,
        fiyat: item.fiyat || 0,
        toplam: +item.toplam || 0,
        aciklama: values.aciklama,
        kdvOran: item.kdvOran || 0,
        indirim: item.indirimTutar || 0,
        araToplam: item.araToplam || 0,
        kdvToplam: +values.toplam_kdvToplam || 0,
        kdvTutar: +item.kdvTutar || 0,
        girisDepoSiraNo: values.girisDepoSiraNo || 0,
        indirimOran: item.indirimOran || 0,
        isPriceChanged: item.isPriceChanged,
        kdvDahilHaric:
          item.kdvDH === "Dahil" || item.kdvDH === "dahil" ? true : false,
        gc: 1,
        fisTip: "YAKIT",
      });
    });

    const body = {
      fisNo: values.fisNo,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      saat: dayjs(values.saat).format("HH:mm:ss"),
      girisDepoSiraNo: values.girisDepoSiraNo || 0,
      firmaId: values.firmaId || 0,
      lokasyonId: values.lokasyonId || 0,
      aracId: values.aracId || 0,
      islemTipiKodId: values.islemTipiKodId || 0,
      aciklama: values.aciklama,
      araToplam: values.toplam_araToplam,
      indirimliToplam: values.toplam_indirim,
      kdvToplam: values.toplam_kdvToplam,
      genelToplam: values.toplam_genelToplam,
      materialMovements,
      gc: 1,
      fisTip: "YAKIT",
    };

    AddMaterialReceiptService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setStatus(true);
        setIsModalOpen(false);
        reset(defaultValues);
        setTableData([]);
        setIsSuccess(true);
        setLoading(false);
        setIsValid("normal");
      }
    });
    setStatus(false);
  });

  useEffect(() => {
    if (isOpen && isFirstRender.current) {
      GetModuleCodeByCode("YAKIT_FIS_ALIS ").then((res) =>
        setValue("fisNo", res.data)
      );
    }
  }, [isOpen, setValue]);

  useEffect(() => {
    if (isOpen && watch("fisNo")) {
      const body = {
        tableName: "Fis",
        code: watch("fisNo"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("fisNo")]);

  useEffect(() => {
    if (tableData.length > 0) {
      const initialTotals = {
        araToplam: 0,
        genelToplam: 0,
        indirimToplam: 0,
        kdvToplam: 0,
      };

      const totals = tableData.reduce((acc, item) => {
        acc.araToplam += +item.araToplam || 0;
        acc.genelToplam += +item.toplam || 0;
        acc.indirimToplam += +item.indirimTutar || 0;
        acc.kdvToplam += +item.kdvTutar || 0;
        return acc;
      }, initialTotals);

      setValue("toplam_araToplam", totals.araToplam.toFixed(2));
      setValue("toplam_genelToplam", totals.genelToplam.toFixed(2));
      setValue("toplam_indirim", totals.indirimToplam.toFixed(2));
      setValue("toplam_kdvToplam", totals.kdvToplam.toFixed(2));
    }
  }, [tableData, setValue]);

  useEffect(() => {
    if (watch("girisDepoSiraNo")) {
      const fetchData = async () => {
        const res = await GetMaterialCardByIdService(watch("malzemeId"));
        setTableData([res?.data]);
        setValue("edit_plakaId", watch("aracId"));
        setValue("malzeme_plaka", watch("plaka"));
        setValue("edit_miktar", 1);
        setValue("edit_lokasyonId", watch("lokasyonId"));
        setValue("edit_lokasyon", watch("lokasyon"));
        setValue("edit_malzemeTanimi", res?.data.tanim);
        setValue("birim", res?.data.birim);
        setValue("edit_birim", res?.data.birimKodId);
        setValue("edit_fiyat", res?.data.fiyat);
        setValue("edit_kdvOrani", res?.data.kdvOran);
        setValue("edit_toplam", res?.data.toplam);
        setValue("edit_malzemeKod", res?.data.malzemeKod);
        setValue("edit_malzemeTip", res?.data.malzemeTipKodText);
        setValue("edit_aciklama", res?.data.aciklama);
        setValue("edit_indirimOrani", null);
        setValue("edit_indirimTutari", null);
      };
      fetchData();
    }
  }, [watch("girisDepoSiraNo")]);

  const footer = [
    loading ? (
      <Button className="btn btn-min primary-btn">
        <LoadingOutlined />
      </Button>
    ) : (
      <Button
        key="submit"
        className="btn btn-min primary-btn"
        onClick={onSubmit}
        disabled={
          isValid === "success" ? false : isValid === "error" ? true : false
        }
      >
        {t("kaydet")}
      </Button>
    ),
    <Popconfirm
      key="back"
      title="Bilgileri Kaydetmeden Çıkılsın mı?"
      okText={t("ok")}
      cancelText={t("cancel")}
      onConfirm={() => {
        setIsModalOpen(false);
        reset(defaultValues);
        setTableData([]);
        setIsSuccess(true);
      }}
    >
      <Button className="btn btn-min cancel-btn">{t("kapat")}</Button>
    </Popconfirm>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> Ekle
      </Button>
      <Modal
        title={t("fisGirisBilgisiEkle")}
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1300}
        closeIcon={null}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo isValid={isValid} />
            <MalzemeLists
              setTableData={setTableData}
              tableData={tableData}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
            <EkBilgiler />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;

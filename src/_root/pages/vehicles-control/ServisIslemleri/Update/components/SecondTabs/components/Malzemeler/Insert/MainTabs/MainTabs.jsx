import React, { useEffect, useMemo, useState } from "react";
import AxiosInstance from "../../../../../../../../../../../api/http";
import PropTypes from "prop-types";
import { Button, Input, Typography, Tabs, InputNumber, Checkbox, Alert, Modal, Table } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import dayjs from "dayjs";
import YapilanIsTable from "./components/YapilanIsTable.jsx";
// import { SearchOutlined } from "@ant-design/icons";
import CikisDeposu from "./components/CikisDeposu.jsx";
import Birim from "./components/Birim.jsx";
import MalzemeTipi from "./components/MalzemeTipi.jsx";

const { Text, Link } = Typography;
const { TextArea } = Input;

const StyledDivBottomLine = styled.div`
  @media (min-width: 600px) {
    align-items: center !important;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const onChange = () => {
  // console.log(key);
};

//styled components
const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0 !important;
    width: fit-content;
    padding: 10px 15px;
    justify-content: center;
    background-color: rgba(230, 230, 230, 0.3);
  }

  .ant-tabs-tab-active {
    background-color: #2bc77135;
  }

  .ant-tabs-nav .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:hover .ant-tabs-tab-btn {
    color: rgba(0, 0, 0, 0.88) !important;
  }

  .ant-tabs-tab:not(:first-child) {
    border-left: 1px solid #80808024;
  }

  .ant-tabs-ink-bar {
    background: #2bc770;
  }
`;

//styled components end
export default function MainTabs({ aracID }) {
  const [latestUsageInfo, setLatestUsageInfo] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleYapilanIsMinusClick = () => {
    setValue("malzemeKodu", "");
    setValue("malzemeKoduID", "");
    setValue("iscilikUcreti", 0);

    setValue("malzemeTanimi", "");
    setValue("birim", null);
    setValue("birimID", "");

    setValue("isTipi", null);
    setValue("isTipiID", "");
    setValue("toplam", 0);

    // KDV, indirim ve toplam değerlerini sıfırla veya yeniden hesapla
    setValue("iscilikUcreti", 0);
    setValue("indirimOrani", 0);

    recalculateIndirimOrani();
    recalculateToplam();
  };

  const items = [
    {
      key: "1",
      label: "Açıklama",
      children: <Controller name="aciklama" control={control} render={({ field }) => <TextArea {...field} rows={4} />} />,
    },
  ];

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için

  // Intl.DateTimeFormat kullanarak tarih formatlama
  const formatDate = (date) => {
    if (!date) return "";

    // Örnek bir tarih formatla ve ay formatını belirle
    const sampleDate = new Date(2021, 0, 21); // Ocak ayı için örnek bir tarih
    const sampleFormatted = new Intl.DateTimeFormat(navigator.language).format(sampleDate);

    let monthFormat;
    if (sampleFormatted.includes("January")) {
      monthFormat = "long"; // Tam ad ("January")
    } else if (sampleFormatted.includes("Jan")) {
      monthFormat = "short"; // Üç harfli kısaltma ("Jan")
    } else {
      monthFormat = "2-digit"; // Sayısal gösterim ("01")
    }

    // Kullanıcı için tarihi formatla
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      year: "numeric",
      month: monthFormat,
      day: "2-digit",
    });
    return formatter.format(new Date(date));
  };

  // formatTime helper kullanılmıyor

  // tarihleri kullanıcının local ayarlarına bakarak formatlayıp ekrana o şekilde yazdırmak için sonu

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın

  // Kullanıcının yerel tarih/saat formatı için effect kullanılmıyor

  // tarih formatlamasını kullanıcının yerel tarih formatına göre ayarlayın sonu

  // iki tarih ve saat arasında geçen süreyi hesaplamak için

  const watchFields = watch(["baslangicTarihi", "baslangicSaati", "bitisTarihi", "bitisSaati"]);

  useEffect(() => {
    const [baslangicTarihi, baslangicSaati, bitisTarihi, bitisSaati] = watchFields;
    if (baslangicTarihi && baslangicSaati && bitisTarihi && bitisSaati) {
      const baslangicZamani = dayjs(baslangicTarihi).hour(baslangicSaati.hour()).minute(baslangicSaati.minute());
      const bitisZamani = dayjs(bitisTarihi).hour(bitisSaati.hour()).minute(bitisSaati.minute());

      const sure = bitisZamani.diff(baslangicZamani, "minute");
      setValue("sure", sure > 0 ? sure : 0);
    }
  }, [watchFields, setValue]);

  // iki tarih ve saat arasında geçen süreyi hesaplamak için sonu

  // Malzemenin son kullanım tarihini çekmek için API çağrısı
  const watchedAracId = watch("aracID");
  const watchedMalzemeKoduId = watch("malzemeKoduID");

  useEffect(() => {
    const vehicleId = Number(aracID ?? watchedAracId);
    const materialId = Number(watchedMalzemeKoduId);

    if (!vehicleId || !materialId) {
      setLatestUsageInfo(null);
      return;
    }

    let isActive = true;

    AxiosInstance.get("MaterialMovements/GetLatestUsedMaterialUsageDate", {
      params: { vId: vehicleId, materialId },
    })
      .then((response) => {
        if (!isActive) return;
        setLatestUsageInfo(response?.data ?? null);
      })
      .catch(() => {
        if (!isActive) return;
        setLatestUsageInfo(null);
      });

    return () => {
      isActive = false;
    };
  }, [aracID, watchedAracId, watchedMalzemeKoduId]);

  // Malzemenin son kullanım tarihini çekmek için API çağrısı sonu

  // Modal açıldığında malzeme kullanım detaylarını çek
  useEffect(() => {
    if (!isHistoryModalOpen) return;
    const vehicleId = Number(aracID ?? watchedAracId);
    const materialId = Number(watchedMalzemeKoduId);
    if (!vehicleId || !materialId) return;

    let isActive = true;
    setHistoryLoading(true);
    AxiosInstance.get("MaterialMovements/GetTopUsedMaterialDetails", {
      params: { vId: vehicleId, materialId },
    })
      .then((res) => {
        if (!isActive) return;
        const rows = Array.isArray(res?.data) ? res.data : [];
        setHistoryData(rows);
      })
      .catch(() => {
        if (!isActive) return;
        setHistoryData([]);
      })
      .finally(() => {
        if (!isActive) return;
        setHistoryLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [isHistoryModalOpen, aracID, watchedAracId, watchedMalzemeKoduId]);

  const historyColumns = useMemo(
    () => [
      /* {
        title: "Sıra No",
        dataIndex: "siraNo",
        key: "siraNo",
        width: 100,
        sorter: (a, b) => (a.siraNo ?? 0) - (b.siraNo ?? 0),
      }, */
      {
        title: "Malzeme Kod",
        dataIndex: "malezemeKod",
        key: "malezemeKod",
        width: 140,
        sorter: (a, b) => (a.malezemeKod || "").localeCompare(b.malezemeKod || ""),
      },
      {
        title: "Malzeme Tanım",
        dataIndex: "malezemeTanim",
        key: "malezemeTanim",
        ellipsis: true,
        sorter: (a, b) => (a.malezemeTanim || "").localeCompare(b.malezemeTanim || ""),
      },
      {
        title: "Tarih",
        dataIndex: "tarih",
        key: "tarih",
        render: (val) => (val ? formatDate(val) : "-"),
        width: 140,
        sorter: (a, b) => {
          const at = a.tarih ? new Date(a.tarih).getTime() : 0;
          const bt = b.tarih ? new Date(b.tarih).getTime() : 0;
          return at - bt;
        },
      },
      {
        title: "Garanti Bitiş",
        dataIndex: "garantiBitisTarih",
        key: "garantiBitisTarih",
        render: (val) => (val ? formatDate(val) : "-"),
        width: 160,
        sorter: (a, b) => {
          const at = a.garantiBitisTarih ? new Date(a.garantiBitisTarih).getTime() : 0;
          const bt = b.garantiBitisTarih ? new Date(b.garantiBitisTarih).getTime() : 0;
          return at - bt;
        },
      },
      {
        title: "Plaka",
        dataIndex: "plaka",
        key: "plaka",
        width: 140,
        sorter: (a, b) => (a.plaka || "").localeCompare(b.plaka || ""),
      },

      { title: "Miktar", dataIndex: "miktar", key: "miktar", width: 100, sorter: (a, b) => (a.miktar ?? 0) - (b.miktar ?? 0) },
      { title: "Fiyat", dataIndex: "fiyat", key: "fiyat", width: 110, sorter: (a, b) => (a.fiyat ?? 0) - (b.fiyat ?? 0) },
      { title: "Toplam", dataIndex: "toplam", key: "toplam", width: 120, sorter: (a, b) => (a.toplam ?? 0) - (b.toplam ?? 0) },
    ],
    []
  );

  const alertDescription = useMemo(() => {
    if (!latestUsageInfo || !latestUsageInfo.latestUsageDate) return null;
    const latest = dayjs(latestUsageInfo.latestUsageDate);
    if (!latest.isValid()) return null;

    const latestStr = formatDate(latestUsageInfo.latestUsageDate);

    if (latestUsageInfo.guaranteeExpDate) {
      const guarantee = dayjs(latestUsageInfo.guaranteeExpDate);
      if (guarantee.isValid()) {
        const now = dayjs();
        const stillValid = guarantee.isAfter(now, "day") || guarantee.isSame(now, "day");
        const guaranteeStr = formatDate(latestUsageInfo.guaranteeExpDate);
        if (stillValid) {
          return (
            <span>
              {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmış ve garanti süresi ${guaranteeStr} kadar devam etmektedir. Lütfen tekrar kullanım gerektiğini kontrol ediniz. Malzeme tarihçesini görmek için `}
              <Link onClick={() => setIsHistoryModalOpen(true)}>tıklayın</Link>
            </span>
          );
        }
        return (
          <span>
            {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmış ve garanti süresi ${guaranteeStr} tarihinde bitmiştir. Malzeme tarihçesini görmek için `}
            <Link onClick={() => setIsHistoryModalOpen(true)}>tıklayın</Link>
          </span>
        );
      }
    }

    return (
      <span>
        {`Bu malzeme daha önce ${latestStr} tarihinde bu araçta kullanılmıştır. Malzeme tarihçesini görmek için `}
        <Link onClick={() => setIsHistoryModalOpen(true)}>tıklayın</Link>
      </span>
    );
  }, [latestUsageInfo]);

  const handleIscilikUcretiChange = (value) => {
    setValue("iscilikUcreti", value);

    recalculateIndirimOrani();
    recalculateToplam();
  };

  const handleMiktarChange = (value) => {
    setValue("miktar", value);

    recalculateIndirimOrani();
    recalculateIndirimYuzde();
    recalculateToplam();
  };

  const handleIndirimYuzdeChange = (value) => {
    setValue("indirimYuzde", value);

    recalculateIndirimOrani();
    recalculateToplam();
  };

  const handleIndirimOraniChange = (value) => {
    setValue("indirimOrani", value);

    recalculateIndirimYuzde();
    recalculateToplam();
  };

  const handleKdvOraniChange = (value) => {
    setValue("kdvOrani", value);

    recalculateToplam();
  };

  const handleKdvDegeriChange = (value) => {
    setValue("kdvDegeri", value);

    // Recalculate KDV oranı based on the new KDV değeri
    const values = getValues();
    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;
    const remainingAmount = iscilikUcreti - (indirimOrani || 0);

    if (remainingAmount > 0 && value > 0) {
      const newKdvOrani = (value / remainingAmount) * 100;
      setValue("kdvOrani", newKdvOrani);
    }

    // Update final total
    const kdvDegeri = value || 0;
    const finalAmount = remainingAmount + kdvDegeri;
    setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
  };

  const recalculateIndirimOrani = () => {
    const values = getValues();

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimYuzde = values.indirimYuzde || 0;

    const calculatedIndirimOrani = (iscilikUcreti * indirimYuzde) / 100;
    setValue("indirimOrani", isNaN(calculatedIndirimOrani) ? 0 : calculatedIndirimOrani);
  };

  const recalculateIndirimYuzde = () => {
    const values = getValues();

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;

    const calculatedIndirimYuzde = (indirimOrani / iscilikUcreti) * 100;
    setValue("indirimYuzde", isNaN(calculatedIndirimYuzde) ? 0 : calculatedIndirimYuzde);
  };

  const recalculateToplam = () => {
    const values = getValues();

    const miktar = values.miktar || 1;
    const iscilikUcreti = (values.iscilikUcreti || 0) * miktar;
    const indirimOrani = values.indirimOrani || 0;
    const kdvOrani = values.kdvOrani || 0;

    if (!iscilikUcreti || iscilikUcreti <= 0) {
      setValue("kdvDegeri", 0);
      setValue("toplam", 0);
    } else {
      const remainingAmount = iscilikUcreti - (indirimOrani || 0);
      const kdv = remainingAmount * (kdvOrani / 100);
      const finalAmount = remainingAmount + kdv;

      setValue("kdvDegeri", isNaN(kdv) ? 0 : kdv);
      setValue("toplam", isNaN(finalAmount) ? 0 : finalAmount);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", columnGap: "10px", flexWrap: "wrap" }}>
        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ width: "100%", maxWidth: "450px", marginBottom: "10px", display: "flex" }}>
            <div style={{ width: "150px" }}></div>
            <Controller
              name="stokluMalzeme"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Stoklu Malzeme
                </Checkbox>
              )}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <StyledDivBottomLine style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <Text style={{ fontSize: "14px", fontWeight: "600" }}>Çıkış Deposu:</Text>
              <CikisDeposu />
              <Controller
                name="aracID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />
            </StyledDivBottomLine>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Malzeme Kodu:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="malzemeKodu"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ width: "215px" }}
                    disabled
                  />
                )}
              />
              <Controller
                name="malzemeKoduID"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text" // Set the type to "text" for name input
                    style={{ display: "none" }}
                  />
                )}
              />

              <YapilanIsTable
                wareHouseId={watch("depoID")}
                onSubmit={(selectedData) => {
                  setValue("malzemeKodu", selectedData.malzemeKod);
                  setValue("malzemeKoduID", selectedData.key);
                  setValue("malzemeTanimi", selectedData.tanim);
                  setValue("iscilikUcreti", selectedData.fiyat);
                  setValue("isTipi", selectedData.malzemeTipKodText || null);
                  setValue("isTipiID", selectedData.malzemeTipKodId);
                  setValue("birim", selectedData.birim || null);
                  setValue("birimID", selectedData.birimKodId);

                  // Yeni değerleri güncelledikten sonra hesaplamaları tetikleyin

                  recalculateIndirimOrani();
                  recalculateToplam();
                }}
              />

              <Button onClick={handleYapilanIsMinusClick}> - </Button>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px", fontWeight: 600 }}>Malzeme Tanımı:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "300px" }}>
              <Controller
                name="malzemeTanimi"
                control={control}
                rules={{ required: "Alan Boş Bırakılamaz!" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    status={errors.malzemeTanimi ? "error" : ""}
                    type="text" // Set the type to "text" for name input
                    style={{ width: "300px" }}
                  />
                )}
              />
              {errors.malzemeTanimi && <div style={{ color: "red", marginTop: "5px" }}>{errors.malzemeTanimi.message}</div>}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Tipi:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <MalzemeTipi />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Birim:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Birim />
            </div>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: "450px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Miktar:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller
                name="miktar"
                control={control}
                defaultValue={1} // Set default value to 1
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    min={1}
                    style={{ flex: 1 }}
                    onChange={(value) => {
                      if (value === null || value < 1) {
                        field.onChange(1); // Reset to 1 if value is null or less than 1
                      } else {
                        field.onChange(value);
                      }

                      handleMiktarChange(value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Birim Fiyatı:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller
                name="iscilikUcreti"
                control={control}
                render={({ field }) => <InputNumber {...field} style={{ flex: 1 }} onChange={(value) => handleIscilikUcretiChange(value)} />}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>KDV Oranı %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller
                name="kdvOrani"
                control={control}
                render={({ field }) => (
                  <InputNumber {...field} style={{ flex: 1 }} prefix={<Text style={{ color: "#0091ff" }}>%</Text>} onChange={(value) => handleKdvOraniChange(value)} />
                )}
              />
              <Controller
                name="kdvDegeri"
                control={control}
                render={({ field }) => <InputNumber {...field} style={{ flex: 1 }} onChange={(value) => handleKdvDegeriChange(value)} />}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>İndirim %:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller
                name="indirimYuzde"
                control={control}
                render={({ field }) => (
                  <InputNumber {...field} style={{ flex: 1 }} prefix={<Text style={{ color: "#0091ff" }}>%</Text>} onChange={(value) => handleIndirimYuzdeChange(value)} />
                )}
              />
              <Controller
                name="indirimOrani"
                control={control}
                render={({ field }) => <InputNumber {...field} style={{ flex: 1 }} onChange={(value) => handleIndirimOraniChange(value)} />}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "450px", marginBottom: "10px" }}>
            <Text style={{ fontSize: "14px" }}>Toplam:</Text>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", maxWidth: "300px", minWidth: "300px", gap: "10px", width: "100%" }}>
              <Controller name="toplam" control={control} render={({ field }) => <InputNumber {...field} disabled style={{ flex: 1 }} />} />
            </div>
          </div>
        </div>
        {alertDescription && <Alert style={{ width: "100%", marginBottom: "10px" }} type="warning" message="Uyarı" description={alertDescription} showIcon />}
      </div>
      <StyledTabs defaultActiveKey="1" items={items} onChange={onChange} />

      <Modal title="Malzeme Tarihçesi" open={isHistoryModalOpen} onCancel={() => setIsHistoryModalOpen(false)} onOk={() => setIsHistoryModalOpen(false)} width={900}>
        <Table
          rowKey={(row) => row.siraNo}
          loading={historyLoading}
          columns={historyColumns}
          dataSource={historyData}
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ y: "calc(100vh - 380px)" }}
        />
      </Modal>
    </div>
  );
}

MainTabs.propTypes = {
  aracID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

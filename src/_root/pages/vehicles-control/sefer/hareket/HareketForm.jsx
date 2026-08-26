import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ClockCircleOutlined, ContainerOutlined, DollarOutlined, EnvironmentOutlined, ProfileOutlined } from "@ant-design/icons";
import { t } from "i18next";
import dayjs from "dayjs";
import Firma from "../../../../components/form/selects/Firma";
import Guzergah from "../../../../components/form/selects/Guzergah";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import { YerlerSehirSelectBox } from "../../../../components/YerlerSehirSelectBox";
import { YuklemeKodlariTablo } from "../../../../components/YuklemeKodlariTablo";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import SectionCard from "../components/SectionCard";
import FormField from "../components/FormField";
import { labelStyle } from "../components/uiStyles";
import { formatNumberWithLocale } from "../../../../../hooks/FormattedNumber";

// Kod listelerinin backend'deki numaraları
const HAREKET_TIP_KOD_ID = 916;
const VARDIYA_KOD_ID = 917;
const OPERASYON_YERI_KOD_ID = 918;
const HAKEDIS_TIP_KOD_ID = 919;
const DURUM_KOD_ID = 121;
const TASIMA_CINSI_KOD_ID = 600;
const TASIMA_TURU_KOD_ID = 905;
const YUKLEME_BIRIM_KOD_ID = 300;

const FULL_WIDTH = { width: "100%" };

const readonlyBoxStyle = {
  backgroundColor: "#f6ffed",
  border: "1px solid #b7eb8f",
  borderRadius: "6px",
  color: "#389e0d",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  padding: "6px 11px",
  minHeight: "32px",
  display: "flex",
  alignItems: "center",
};

// Planlanan ve gerçekleşen zaman arasındaki fark; pozitif değer gecikme, negatif değer erken demektir
const getGecikmeText = (planlananTarih, planlananSaat, gerceklesenTarih, gerceklesenSaat) => {
  const tumZamanAlanlariDolu = [planlananTarih, planlananSaat, gerceklesenTarih, gerceklesenSaat].every((value) => value && dayjs(value).isValid());

  if (!tumZamanAlanlariDolu) return "-";

  const planlanan = combineDateTime(planlananTarih, planlananSaat);
  const gerceklesen = combineDateTime(gerceklesenTarih, gerceklesenSaat);

  if (!planlanan || !gerceklesen) return "-";

  const fark = gerceklesen.diff(planlanan, "minute");
  return `${fark > 0 ? "+" : ""}${formatNumberWithLocale(fark)} ${t("dk")}`;
};

// Tarih ve saat alanları ekranda ayrı tutulur, hesaplama ve kayıt için birleştirilir
export const combineDateTime = (date, time) => {
  const parsedDate = date && dayjs(date).isValid() ? dayjs(date) : null;
  if (!parsedDate) return null;

  const parsedTime = time && dayjs(time).isValid() ? dayjs(time) : null;
  if (!parsedTime) return parsedDate.startOf("day");

  return parsedDate.hour(parsedTime.hour()).minute(parsedTime.minute()).second(0);
};

export const calculateHakedisTutar = (gerceklesenMiktar, birimFiyat) => {
  const alanlardanBiriBos = [gerceklesenMiktar, birimFiyat].some((value) => value === null || value === undefined || value === "");
  if (alanlardanBiriBos) return null;

  const miktar = Number(gerceklesenMiktar);
  const fiyat = Number(birimFiyat);

  return Number.isFinite(miktar) && Number.isFinite(fiyat) ? miktar * fiyat : null;
};

const HareketForm = () => {
  const { watch, setValue } = useFormContext();

  const planlananMiktar = Number(watch("planlananMiktar")) || 0;
  const gerceklesenMiktarDegeri = watch("gerceklesenMiktar");
  const birimFiyatDegeri = watch("birimFiyat");
  const gerceklesenMiktar = Number(gerceklesenMiktarDegeri) || 0;
  const gerceklesmeOrani = planlananMiktar > 0 ? Math.round((gerceklesenMiktar / planlananMiktar) * 100) : 0;

  const gecikmeText = getGecikmeText(watch("planlananTarih"), watch("planlananSaat"), watch("gerceklesenTarih"), watch("gerceklesenSaat"));

  useEffect(() => {
    setValue("hakedisTutar", calculateHakedisTutar(gerceklesenMiktarDegeri, birimFiyatDegeri), { shouldValidate: false });
  }, [gerceklesenMiktarDegeri, birimFiyatDegeri, setValue]);

  return (
    <div className="grid gap-2">
      <div className="col-span-3">
        <SectionCard icon={<ProfileOutlined />} title={t("temelBilgiler")}>
          <FormField span={12} label={t("hareketTipi")} required>
            <KodIDSelectbox name1="oprTip" kodID={HAREKET_TIP_KOD_ID} isRequired />
          </FormField>
          <FormField span={12} label={t("durum")} required>
            <KodIDSelectbox name1="durum" kodID={DURUM_KOD_ID} isRequired />
          </FormField>
          <FormField span={12} label={t("firma")} required>
            <Firma name="firmaUnvan" codeName="firmaId" required placeholder={t("firmaSecin")} />
          </FormField>
          <FormField span={12} label={t("guzergah")}>
            <Guzergah placeholder={t("guzergahSecin")} />
          </FormField>
        </SectionCard>
      </div>

      <div className="col-span-3">
        <SectionCard icon={<ClockCircleOutlined />} title={t("zamanBilgileri")}>
          <FormField span={6} label={t("planlanan")}>
            <DateInput name="planlananTarih" style={FULL_WIDTH} />
          </FormField>
          <div className="col-span-6" style={{ display: "flex", alignItems: "flex-end" }}>
            <TimeInput name="planlananSaat" style={FULL_WIDTH} />
          </div>

          <FormField span={6} label={t("gerceklesen")}>
            <DateInput name="gerceklesenTarih" style={FULL_WIDTH} />
          </FormField>
          <div className="col-span-6" style={{ display: "flex", alignItems: "flex-end" }}>
            <TimeInput name="gerceklesenSaat" style={FULL_WIDTH} />
          </div>

          {/* Hesaplanan alan, forma yazılmaz */}
          <FormField span={12} label={t("gecikmeErken")}>
            <div style={readonlyBoxStyle}>{gecikmeText}</div>
          </FormField>

          <FormField span={12} label={t("vardiya")}>
            <KodIDSelectbox name1="vardiya" kodID={VARDIYA_KOD_ID} />
          </FormField>
        </SectionCard>
      </div>

      <div className="col-span-6">
        <SectionCard icon={<EnvironmentOutlined />} title={t("operasyonBilgileri")}>
          <FormField span={6} label={t("baslangicNoktasi")}>
            <YerlerSehirSelectBox name1="cikisSehirYer" isRequired={false} inputWidth="100%" dropdownWidth="300px" />
          </FormField>
          <FormField span={6} label={t("varisNoktasi")}>
            <YerlerSehirSelectBox name1="varisSehirYer" isRequired={false} inputWidth="100%" dropdownWidth="300px" />
          </FormField>

          <FormField span={6} label={t("operasyonYeri")}>
            <KodIDSelectbox name1="oprYer" kodID={OPERASYON_YERI_KOD_ID} />
          </FormField>

          <FormField span={4} label={t("tasimaCinsi")}>
            <KodIDSelectbox name1="tasimaCinsi" kodID={TASIMA_CINSI_KOD_ID} />
          </FormField>
          <FormField span={4} label={t("tasimaTuru")}>
            <KodIDSelectbox name1="tasimaTuru" kodID={TASIMA_TURU_KOD_ID} />
          </FormField>
          <FormField span={4} label={t("yuklemeKodu")}>
            <YuklemeKodlariTablo />
          </FormField>

          <FormField span={12} label={t("aciklama")}>
            <TextInput name="aciklama" />
          </FormField>
        </SectionCard>
      </div>

      <div className="col-span-5">
        <SectionCard icon={<ContainerOutlined />} title={t("miktarBilgileri")}>
          <FormField span={4} label={t("planlananMiktar")}>
            <NumberInput name="planlananMiktar" style={FULL_WIDTH} />
          </FormField>
          <FormField span={4} label={t("gerceklesenMiktar")} required>
            <NumberInput name="gerceklesenMiktar" required style={FULL_WIDTH} />
          </FormField>
          <FormField span={4} label={t("birim")} required>
            <KodIDSelectbox name1="yuklemeBirim" kodID={YUKLEME_BIRIM_KOD_ID} isRequired />
          </FormField>

          <FormField span={4} label={t("kapasite")}>
            <NumberInput name="kapasite" style={FULL_WIDTH} />
          </FormField>

          {/* Hesaplanan alan, forma yazılmaz */}
          <div className="col-span-8">
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>{t("gerceklesmeOrani")}</label>
              <div style={{ ...readonlyBoxStyle, flexDirection: "column", alignItems: "stretch", justifyContent: "center", padding: "6px 11px 0", gap: "6px" }}>
                <span>{`%${formatNumberWithLocale(gerceklesmeOrani)}`}</span>
                <div style={{ height: "3px", backgroundColor: "#d9f7be", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(gerceklesmeOrani, 100)}%`, height: "100%", backgroundColor: "#52c41a" }} />
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="col-span-7">
        <SectionCard icon={<DollarOutlined />} title={t("tutarBilgileri")}>
          <FormField span={4} label={t("hakedisTipi")}>
            <KodIDSelectbox name1="hakedisTip" kodID={HAKEDIS_TIP_KOD_ID} />
          </FormField>
          <FormField span={4} label={t("birimFiyat")}>
            <NumberInput name="birimFiyat" style={FULL_WIDTH} />
          </FormField>
          <FormField span={4} label={t("hakedisTutari")}>
            <NumberInput name="hakedisTutar" style={FULL_WIDTH} />
          </FormField>

          <FormField span={6} label={t("faturaNo")}>
            <TextInput name="faturaNo" />
          </FormField>
          <FormField span={6} label={t("faturaTarih")}>
            <DateInput name="faturaTarih" style={FULL_WIDTH} />
          </FormField>
        </SectionCard>
      </div>
    </div>
  );
};

export default HareketForm;

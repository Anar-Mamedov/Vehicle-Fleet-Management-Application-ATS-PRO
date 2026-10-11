import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext, useWatch } from "react-hook-form";
import { t } from "i18next";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import ModalInput from "../../../../components/form/inputs/ModalInput";
import DateInput from "../../../../components/form/date/DateInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import SelectInput from "../../../../components/form/selects/SelectInput";
import PlakaSelectbox from "../../../../components/PlakaSelectbox";
import SurucuSelectbox from "../../../../components/SurucuSelectbox";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import KademeSelectbox from "../../../../components/KademeSelectbox";
import AracServisTanimiTablo from "../../../../components/AracServisTanimiTablo";
import LokasyonTablo from "../../../../components/form/LokasyonTable";
import FormField from "../../KademeTanimlari/components/FormField";
import { cardStyle, sectionTitleStyle } from "../../KademeTanimlari/components/uiStyles";
import MaliyetBilgileri from "../components/MaliyetBilgileri";
import { BOLUM_KOD_ID, DURUM, IS_EMRI_NEDENI_KOD_ID, ONCELIK_KOD_ID, getDurumOptions } from "../constants";

const KOD_DURUM_RENKLERI = {
  error: "#dc3545",
  success: "#23b545",
};

// Ekleme ve güncelleme ekranlarının ortak "Genel Bilgiler" sekmesi.
// isUpdate yalnızca güncelleme ekranında verilir; kayıtlı iş emrinin numarası değiştirilemez.
const GenelBilgiler = ({ kodDurumu = "normal", isUpdate = false }) => {
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const [plakaID, durumBilgisi] = useWatch({ control, name: ["plakaID", "durumBilgisi"] });

  // Servis ekranındaki kural: tamamlanan iş emrinde başlama ve bitiş tarihi zorunludur
  const tarihlerZorunlu = durumBilgisi === DURUM.TAMAMLANDI;
  const kodHint = isUpdate ? t("isEmriNoDegistirilemez") : kodDurumu === "error" ? t("isEmriNoKullaniliyor") : undefined;

  // Plaka seçilince sürücü ve lokasyon araçtan dolar; servis tanımları araca bağlı olduğu için önceki seçim temizlenir
  const handlePlakaChange = (aracId, option) => {
    const arac = option?.data;
    setValue("surucu", arac?.surucu || null);
    setValue("surucuID", arac?.surucuId || null);
    setValue("lokasyon", arac?.lokasyon || null);
    setValue("lokasyonId", arac?.lokasyonId || null);
    setValue("servisTanimi", null);
    setValue("bakimId", null);
  };

  return (
    <div className="flex" style={{ gap: "16px", alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ ...cardStyle, flex: "1 1 600px" }}>
        <span style={sectionTitleStyle}>{t("genelBilgiler")}</span>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={6} label={t("isEmriNo")} required hint={kodHint}>
            <TextInput name="servisNo" required readonly={isUpdate} style={{ borderColor: KOD_DURUM_RENKLERI[kodDurumu] }} />
          </FormField>

          <FormField span={6} label={t("kademe")}>
            <KademeSelectbox name1="kademe" />
          </FormField>

          <FormField span={6} label={t("isEmriBasligi")} required>
            <AracServisTanimiTablo
              name="servisTanimi"
              vehicleId={plakaID}
              required
              placeholder={t("servisTanimiSeciniz")}
              onSelect={(servisTanimi) => {
                setValue("servisTanimi", servisTanimi.tanim, { shouldValidate: true });
                setValue("bakimId", servisTanimi.bakimId);
              }}
              onClear={() => {
                setValue("servisTanimi", null);
                setValue("bakimId", null);
              }}
            />
          </FormField>

          <FormField span={6} label={t("bolum")}>
            <KodIDSelectbox name1="bolum" kodID={BOLUM_KOD_ID} placeholder={t("seciniz")} inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("plaka")} required>
            <PlakaSelectbox name1="plaka" isRequired onChange={handlePlakaChange} inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("lokasyon")}>
            <ModalInput
              name="lokasyon"
              readonly
              onPlusClick={() => setIsLokasyonModalOpen(true)}
              onMinusClick={() => {
                setValue("lokasyon", null);
                setValue("lokasyonId", null);
              }}
            />
            <LokasyonTablo
              isModalVisible={isLokasyonModalOpen}
              setIsModalVisible={setIsLokasyonModalOpen}
              onSubmit={(selectedData) => {
                setValue("lokasyon", selectedData.location);
                setValue("lokasyonId", selectedData.key);
              }}
            />
          </FormField>

          <FormField span={6} label={t("surucu")}>
            <SurucuSelectbox name1="surucu" inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("oncelik")}>
            <KodIDSelectbox name1="oncelik" kodID={ONCELIK_KOD_ID} placeholder={t("seciniz")} inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("aracKm")}>
            <NumberInput name="km" min={0} />
          </FormField>

          <FormField span={6} label={t("baslamaZamani")} required={tarihlerZorunlu}>
            <div className="flex" style={{ gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <DateInput name="baslamaTarih" required={tarihlerZorunlu} requiredMessage={t("tamamlananIsEmrindeZorunlu")} style={{ width: "100%" }} />
              </div>
              <TimeInput name="baslamaSaat" style={{ width: "110px" }} />
            </div>
          </FormField>

          <FormField span={6} label={t("isEmriNedeni")}>
            <KodIDSelectbox name1="servisNedeni" kodID={IS_EMRI_NEDENI_KOD_ID} placeholder={t("seciniz")} inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("bitisZamani")} required={tarihlerZorunlu}>
            <div className="flex" style={{ gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <DateInput name="bitisTarih" required={tarihlerZorunlu} requiredMessage={t("tamamlananIsEmrindeZorunlu")} style={{ width: "100%" }} />
              </div>
              <TimeInput name="bitisSaat" style={{ width: "110px" }} />
            </div>
          </FormField>

          <FormField span={6} label={t("durum")} required>
            <SelectInput name="durumBilgisi" options={getDurumOptions()} allowClear={false} required />
          </FormField>
        </div>
      </div>

      <MaliyetBilgileri />
    </div>
  );
};

GenelBilgiler.propTypes = {
  kodDurumu: PropTypes.oneOf(["normal", "success", "error"]),
  isUpdate: PropTypes.bool,
};

export default GenelBilgiler;

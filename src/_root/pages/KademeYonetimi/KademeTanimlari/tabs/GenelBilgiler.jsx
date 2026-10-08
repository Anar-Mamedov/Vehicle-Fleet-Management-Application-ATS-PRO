import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext, useWatch } from "react-hook-form";
import { t } from "i18next";
import TextInput from "../../../../components/form/inputs/TextInput";
import ModalInput from "../../../../components/form/inputs/ModalInput";
import TimeInput from "../../../../components/form/date/TimeInput";
import SwitchInput from "../../../../components/form/checkbox/SwitchInput";
import CheckableTagGroupInput from "../../../../components/form/checkbox/CheckableTagGroupInput";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import PersonelSelectBox from "../../../../components/PersonelSelectBox";
import LokasyonTablo from "../../../../components/form/LokasyonTable";
import FormField from "../components/FormField";
import AtananPersoneller from "../components/AtananPersoneller";
import { cardStyle, hintStyle, sectionTitleStyle } from "../components/uiStyles";
import { KADEME_TIP_KOD_ID, getCalismaGunuOptions } from "../constants";

const KOD_DURUM_RENKLERI = {
  error: "#dc3545",
  success: "#23b545",
};

// Ekleme ve güncelleme ekranlarının ortak "Genel Bilgiler" sekmesi.
// kademeId yalnızca güncelleme ekranında verilir; personel ataması kayıtlı bir kademeye yapılabildiği için
// ekleme ekranında atanan personeller yerine bilgi notu gösterilir.
const GenelBilgiler = ({ kodDurumu = "normal", kademeId }) => {
  const [isLokasyonModalOpen, setIsLokasyonModalOpen] = useState(false);
  const { control, setValue } = useFormContext();
  const yediYirmiDort = useWatch({ control, name: "yediYirmiDort" });

  const isUpdate = Boolean(kademeId);
  const kodHint = isUpdate ? t("kademeKoduDegistirilemez") : kodDurumu === "error" ? t("kademeKoduKullaniliyor") : undefined;

  return (
    <div className="flex flex-col" style={{ gap: "16px" }}>
      <div style={cardStyle}>
        <span style={sectionTitleStyle}>{t("temelBilgiler")}</span>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={6} label={t("kademeKodu")} required hint={kodHint}>
            <TextInput name="kademeKod" required readonly={isUpdate} style={{ borderColor: KOD_DURUM_RENKLERI[kodDurumu] }} />
          </FormField>

          <FormField span={6} label={t("kademeAdi")} required>
            <TextInput name="kademeAdi" required />
          </FormField>

          <FormField span={6} label={t("kademeTipi")} required>
            <KodIDSelectbox name1="kademeTip" kodID={KADEME_TIP_KOD_ID} isRequired placeholder={t("seciniz")} inputWidth="100%" />
          </FormField>

          <FormField span={6} label={t("lokasyon")} required>
            <ModalInput
              name="lokasyon"
              readonly
              required
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

          <FormField span={6} label={t("kademeSorumlusu")}>
            {/* Servis sorumluyu metin olarak tuttuğu için seçilen personelin adı kademeSorumlusu alanına yazılır */}
            <PersonelSelectBox name1="kademeSorumluPersonel" onChange={(personelId, isim) => setValue("kademeSorumlusu", isim || null)} />
          </FormField>

          <FormField span={6} label={t("durum")}>
            <SwitchInput name="durum" checkedLabel={t("aktif")} uncheckedLabel={t("pasif")} />
          </FormField>
        </div>
      </div>

      <div style={cardStyle}>
        <span style={sectionTitleStyle}>{t("calismaDuzeni")}</span>
        <div className="grid" style={{ rowGap: "18px", columnGap: "16px" }}>
          <FormField span={4} label={t("baslangicSaati")}>
            <TimeInput name="baslamaSaat" readonly={yediYirmiDort} style={{ width: "100%" }} />
          </FormField>

          <FormField span={4} label={t("bitisSaati")}>
            <TimeInput name="bitisSaat" readonly={yediYirmiDort} style={{ width: "100%" }} />
          </FormField>

          <FormField span={4} label={t("yediYirmiDortCalisir")}>
            <SwitchInput name="yediYirmiDort" checkedLabel={t("evet")} uncheckedLabel={t("hayir")} />
          </FormField>

          <FormField span={12} label={t("calismaGunleri")} hint={yediYirmiDort ? t("yediYirmiDortCalismaGunleriAciklama") : undefined}>
            <CheckableTagGroupInput name="calismaGunleri" options={getCalismaGunuOptions()} readonly={yediYirmiDort} />
          </FormField>
        </div>
      </div>

      {isUpdate ? (
        <AtananPersoneller kademeId={kademeId} />
      ) : (
        <div style={cardStyle}>
          <span style={sectionTitleStyle}>{t("atananPersoneller")}</span>
          <span style={hintStyle}>{t("personelAtamakIcinKademeyiKaydedin")}</span>
        </div>
      )}
    </div>
  );
};

GenelBilgiler.propTypes = {
  kodDurumu: PropTypes.oneOf(["normal", "success", "error"]),
  kademeId: PropTypes.number,
};

export default GenelBilgiler;

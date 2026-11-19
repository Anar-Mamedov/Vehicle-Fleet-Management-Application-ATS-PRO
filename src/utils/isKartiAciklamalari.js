import { t } from "i18next";

// İş kartı (işçilik) eklenirken log açıklaması işin açıklamasından gelir. Backend notu gereği açıklama boşsa
// atama log metni gönderilir: "Atama yapıldı. Personel Adı: (X)". Kademe İş Ata ve Servis İşlemleri İşçilik ortak kullanır.
export const getIsAtamaAciklamasi = (aciklama, personelIsim) => aciklama?.trim() || t("atamaYapildiAciklama", { personel: personelIsim || "" });

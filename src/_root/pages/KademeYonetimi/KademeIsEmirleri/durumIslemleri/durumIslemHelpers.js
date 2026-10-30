import { message } from "antd";
import { t } from "i18next";
import { UpdateVehicleServiceOrderStatusService } from "../../../../../api/services/isEmri/services";
import { isDurumGuncellemeBasarili, isIsEmriSaltOkunur } from "../constants";

// Liste satırında durum sayı veya metin gelebilir
export const isKayitSaltOkunur = (kayit) => isIsEmriSaltOkunur(Number(kayit?.durumBilgisi));

// Backend toplu durum servisi sunmadığı için her iş emri için servis ayrı çağrılır.
// Sonuç mesajı burada gösterilir; en az bir kayıt güncellendiyse true döner.
export const uygulaDurumIslemi = async (kayitlar, buildBody) => {
  const sonuclar = await Promise.allSettled(kayitlar.map((kayit) => UpdateVehicleServiceOrderStatusService(buildBody(kayit.siraNo))));
  const basarisizlar = sonuclar.filter((sonuc) => sonuc.status === "rejected" || !isDurumGuncellemeBasarili(sonuc.value));

  // Başarı gövdedeki status ile bildirilir; başarısızsa servisin döndürdüğü mesaj gösterilir
  if (basarisizlar.length === sonuclar.length) {
    message.error(basarisizlar[0]?.value?.data?.message || t("islemBasarisiz"));
    return false;
  }

  if (basarisizlar.length === 0) {
    message.success(t("islemBasarili"));
  } else {
    message.warning(t("isEmriTopluIslemKismenBasarisiz", { basarisiz: basarisizlar.length, toplam: sonuclar.length }));
  }
  return true;
};

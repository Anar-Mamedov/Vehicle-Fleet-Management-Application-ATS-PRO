import http from "../../http";

// Onay Ayarları listesi; her kayıtta tanim (ör. "isTamamlamaOnayi") ve onayAktif alanı bulunur
export const GetApprovalSettingsListService = async () => {
  return await http.get(`/ApprovalSettings/GetApprovalSettingsList`);
};

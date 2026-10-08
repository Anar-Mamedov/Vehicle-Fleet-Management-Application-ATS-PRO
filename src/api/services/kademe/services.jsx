import http from "../../http";

// Kademe kodu numaratörü (Otomatik Kodlar ekranındaki KADEME_KOD modülü)
export const GetKademeCodeService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=KADEME_KOD`);
};

// Kademe listesi; filtreler POST gövdesinde, sayfalama ve pageSize query'de gider
export const GetWorkShopDefListService = async (diff, setPointId, search, filters, pageSize) => {
  return await http.post(`/WorkShopDefinition/GetWorkShopDefList?setPointId=${setPointId}&diff=${diff}&parameter=${encodeURIComponent(search)}&pageSize=${pageSize}`, filters);
};

export const GetWorkShopDefItemByIdService = async (id) => {
  return await http.get(`/WorkShopDefinition/GetWorkShopDefItemById?id=${id}`);
};

export const AddWorkShopDefItemService = async (data) => {
  return await http.post(`/WorkShopDefinition/AddWorkShopDefItem`, data);
};

export const UpdateWorkShopDefItemService = async (data) => {
  return await http.post(`/WorkShopDefinition/UpdateWorkShopDefItem`, data);
};

// Kademeye atanmış personeller
export const GetStaffsByWorkShopIdService = async (workShopId) => {
  return await http.get(`/WorkShopStaff/GetStaffsByWorkShopId?workShopId=${workShopId}`);
};

export const AssignStaffToWorkShopService = async (data) => {
  return await http.post(`/WorkShopStaff/AssignStaffToWorkShop`, data);
};

// Gövde, çıkarılacak atama kayıtlarının siraNo dizisidir
export const RemoveStaffFromWorkShopService = async (siraNos) => {
  return await http.post(`/WorkShopStaff/RemoveStaffFromWorkShop`, siraNos);
};

import http from "../../http";

// İş emri numaratörü (Otomatik Kodlar ekranındaki ISEMRI_KOD modülü)
export const GetIsEmriCodeService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=ISEMRI_KOD`);
};

// Kademe iş emri listesi; filtreler POST gövdesinde, sayfalama ve pageSize query'de gider
export const GetVehicleServiceOrdersService = async (diff, setPointId, search, filters, pageSize) => {
  return await http.post(`/VehicleServices/GetVehicleServiceOrders?setPointId=${setPointId}&diff=${diff}&parameter=${encodeURIComponent(search)}&pageSize=${pageSize}`, filters);
};

// Liste KPI kutuları; her kutu ayrı bir type ile, liste ile aynı filtre gövdesiyle çağrılır
export const GetServiceOrderStatisticsByTypeService = async (type, search, filters) => {
  return await http.post(`/ServiceOrdersStatistics/GetInfoByType?type=${type}&parameter=${encodeURIComponent(search)}`, filters);
};

// İş emirleri servis işlemleri kayıtlarıdır; ekleme/güncelleme/detay servis ekranıyla aynı endpointleri kullanır
export const GetVehicleServiceByIdService = async (id) => {
  return await http.get(`/VehicleServices/GetVehicleServiceById?id=${id}`);
};

export const AddServiceItemService = async (data) => {
  return await http.post(`/VehicleServices/AddServiceItem`, data);
};

export const UpdateServiceItemService = async (data) => {
  return await http.post(`/VehicleServices/UpdateServiceItem`, data);
};

// İş emrine bağlı işçilik ve malzeme kartlarının toplam maliyeti
export const GetServiceCardCostService = async (serviceId) => {
  return await http.get(`/VehicleServices/GetServiceCardCost?serviceId=${serviceId}`);
};

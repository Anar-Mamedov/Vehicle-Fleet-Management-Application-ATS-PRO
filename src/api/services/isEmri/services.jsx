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

// Atanan işler: iş emrine bağlı iş kartları (sayfalanmadan dizi olarak döner)
export const GetServiceWorkCardsByServiceIdService = async (serviceId) => {
  return await http.get(`/ServiceWorkCard/GetServiceWorkCardByServiceId?serviceId=${serviceId}`);
};

export const GetServiceWorkCardByIdService = async (id) => {
  return await http.get(`/ServiceWorkCard/GetServiceWorkCardById?id=${id}`);
};

// İş emrinden yapılan atamada gövdede isFromIsEmri: true olmalıdır
export const AddServiceWorkCardService = async (data) => {
  return await http.post(`/ServiceWorkCard/AddServiceWorkCard`, data);
};

export const UpdateServiceWorkCardService = async (data) => {
  return await http.post(`/ServiceWorkCard/UpdateServiceWorkCard`, data);
};

// Atanan işin durumu: 2 Devam Ediyor, 3 Durdu, 4 Yeniden Başladı, 5 Tamamlandı
export const UpdateServiceWorkCardStatusService = async (id, status) => {
  return await http.get(`/ServiceWorkCard/UpdateServiceWorkCardStatus?id=${id}&status=${status}`);
};

// Kademe İş Takip Paneli: tüm iş kartları; filtreler POST gövdesinde, sayfalama ve pageSize query'de gider
export const GetServiceWorkCardListService = async (diff, setPointId, search, filters, pageSize) => {
  return await http.post(`/ServiceWorkCard/GetServiceWorkCardList?setPointId=${setPointId}&diff=${diff}&parameter=${encodeURIComponent(search)}&pageSize=${pageSize}`, filters);
};

// Kademe İş Takip Paneli KPI kutuları; her kutu ayrı bir type ile, liste ile aynı filtre gövdesiyle çağrılır
export const GetServiceWorkCardStatisticsByTypeService = async (type, search, filters) => {
  return await http.post(`/ServiceWorkCardStatistics/GetInfoByType?type=${type}&parameter=${encodeURIComponent(search)}`, filters);
};

// İş kartının durum tarihçesi (sayfalanmadan dizi olarak döner)
export const GetWorkCardLogsByWorkIdService = async (workId) => {
  return await http.get(`/ServiceWorkCardLogs/GetWorkCardLogsByWorkId?workId=${workId}`);
};

// Malzeme talepleri: iş emrine bağlı talepler (sayfalanmadan dizi olarak döner)
export const GetMaterialRequestListByServiceIdService = async (serviceId) => {
  return await http.get(`/MaterialRequest/GetMaterialRequestListByServiceId?serviceId=${serviceId}`);
};

// Malzeme Talepleri Takip Paneli: tüm malzeme talepleri; filtreler POST gövdesinde, sayfalama ve pageSize query'de gider
export const GetMaterialRequestListService = async (diff, setPointId, search, filters, pageSize) => {
  return await http.post(`/MaterialRequest/GetMaterialRequestList?setPointId=${setPointId}&diff=${diff}&parameter=${encodeURIComponent(search)}&pageSize=${pageSize}`, filters);
};

// Malzeme Talepleri Takip Paneli KPI kutuları; her kutu ayrı bir type ile, liste ile aynı filtre gövdesiyle çağrılır
export const GetMaterialRequestStatisticsByTypeService = async (type, search, filters) => {
  return await http.post(`/MaterialRequestStatistics/GetInfoByType?type=${type}&parameter=${encodeURIComponent(search)}`, filters);
};

export const GetMaterialRequestItemByIdService = async (id) => {
  return await http.get(`/MaterialRequest/GetMaterialRequestItemById?id=${id}`);
};

// isId: talebin bağlandığı atanan işin siraNo'su; iş seçilmezse 0 gider
export const AddMaterialRequestService = async (data) => {
  return await http.post(`/MaterialRequest/AddMaterialRequest`, data);
};

// API notunda güncelleme URL'i verilmedi; ekleme endpoint'inin adlandırmasına göre varsayıldı, backend ile doğrulanmalı
export const UpdateMaterialRequestService = async (data) => {
  return await http.post(`/MaterialRequest/UpdateMaterialRequest`, data);
};

// Malzeme talep numaratörü (Otomatik Kodlar ekranındaki MALZEME_TALEP_NO modülü)
export const GetMalzemeTalepNoService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=MALZEME_TALEP_NO`);
};

// Talebe bu işlemde kullanılan miktarı ekler (yeni toplam değil), talep durumunu günceller ve malzeme hareketini oluşturur.
// Stoklu malzemede seçilen çıkış deposundan stok çıkışı da yapılır.
export const UpdateMaterialRequestQuantityUsedService = async (data) => {
  return await http.post(`/MaterialRequest/UpdateMaterialRequestQuantityUsed`, data);
};

// Kullanılan malzemeler: iş emrine bağlı malzeme hareketleri (sayfalanmadan dizi olarak döner)
export const GetServiceMaterialMovementsService = async (serviceId) => {
  return await http.get(`/MaterialMovements/GetMaterialMovementsServiceList?serviceId=${serviceId}`);
};

export const GetMaterialMovementByIdService = async (id) => {
  return await http.get(`/MaterialMovements/GetMaterialMovementsById?id=${id}`);
};

// Ekleme ve güncelleme fiyat hesabı yapmaz; ara toplam, indirim, KDV ve toplam gövdede hesaplanmış gönderilir
export const AddServiceMaterialMovementService = async (data) => {
  return await http.post(`/MaterialMovements/AddMaterialMovementService`, data);
};

// Kısmi güncelleme değildir; gövdede olmayan alanlar varsayılan değerle yazılabilir
export const UpdateServiceMaterialMovementService = async (data) => {
  return await http.post(`/MaterialMovements/UpdateMaterialMovementService`, data);
};

// Servis ekranındaki gibi silinecek kayıtların id dizisi gövdede gönderilir
export const DeleteMaterialMovementsService = async (ids) => {
  return await http.post(`/MaterialMovements/DeleteMaterialMovementItemById`, ids);
};

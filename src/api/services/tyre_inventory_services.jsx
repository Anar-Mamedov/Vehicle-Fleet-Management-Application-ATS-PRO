import http from "../http";

export const GetTyreInventoryReportService = async (search, data) => {
  return await http.post(`/TyreInventory/GetTyreInventoryReport?parameter=${encodeURIComponent(search)}`, data);
};

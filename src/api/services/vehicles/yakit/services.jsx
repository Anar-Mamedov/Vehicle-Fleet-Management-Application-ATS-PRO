import http from "../../../http";

export const GetYakitListByIdService = async (search, page, data) => {
  return await http.post(`/Fuel/GetFuelListByVehicleId?page=${page}&parameter=${search}`, data);
};

export const DeleteYakitService = async (id) => {
  return await http.get(`/Fuel/DeleteFuelCard?fuelId=${id}`);
};

export const AddYakitService = async (data) => {
  return await http.post(`/Fuel/AddFuel`, data);
};

export const GetFuelCardContentByIdService = async (id) => {
  return await http.get(`/Fuel/GetFuelCardContentById?vehicleId=${id}`);
};

export const GetMaterialPriceService = async (id) => {
  return await http.get(`/Material/GetMaterialPrice?materialId=${id}`);
};

export const ValidateFuelInfoInsertionService = async (data) => {
  return await http.post(`/Fuel/ValidateFuelInfoInsertion`, data);
};

export const GetKmRangeBeforeDateService = async (data) => {
  return await http.post(`/Fuel/GetKmRangeBeforeDate`, data);
};

export const GetLastThreeFuelRecordService = async (id, date, time) => {
  return await http.get(`/Fuel/GetLastThreeFuelRecord?vehicleId=${id}&date=${date}&time=${time}`);
};

export const GetWareHouseListService = async (id, type) => {
  return await http.get(`/WareHouse/GetWareHouseByTipId?type=${type}&id=${id}`);
};

export const GetFuelCardInfoByFuelIdService = async (id) => {
  return await http.get(`/Fuel/GetFuelCardInfoByFuelId?id=${id}`);
};

export const UpdateFuelService = async (data) => {
  return await http.post(`/Fuel/UpdateFuel`, data);
};

export const GetFuelListService = async (search, page, data) => {
  return await http.get(`/Fuel/GetFuelList?page=${page}&parameter=${search}`, data);
};

export const DeleteFuelCardService = async (id) => {
  return await http.get(`/Fuel/DeleteFuelCard?fuelId=${id}`);
};

export const AddFuelService = async (data) => {
  return await http.post(`/Fuel/AddFuel`, data);
};

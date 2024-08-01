import http from "../../../http";

export const GetVehiclesListService = async (search, page, data) => {
  return await http.post(
    `/Vehicle/GetVehicles?parameter=${search}&page=${page}`,
    data
  );
};

export const VehiclesReadForFilterService = async (search, data) => {
  return await http.post(`/Vehicle/GetVehicles?parameter=${search}`, data);
};

export const AddVehicleService = async (data) => {
  return await http.post(`Vehicle/AddVehicle`, data);
};

export const GetVehicleByIdService = async (id) => {
  return await http.get(`/Vehicle/GetVehicleById?id=${id}`);
};

export const UpdateVehicleService = async (data) => {
  return await http.post(`/Vehicle/UpdateVehicle`, data);
};

export const GetVehicleDetailsInfoService = async (id, type) => {
  return await http.get(
    `/VehicleDetail/GetVehicleDetailsInfo?vehicleId=${id}&type=${type}`
  );
};

export const UpdateVehicleDetailsInfoService = async (type, data) => {
  return await http.post(
    `/VehicleDetail/UpdateVehicleDetailsInfo?type=${type}`,
    data
  );
};

// kapasite
export const GetCapacityListByVehicleIdService = async (id, search, page) => {
  return await http.get(
    `/Capacity/GetCapacityListByVehicleId?vehicleId=${id}&parameter=${search}&page=${page}`
  );
};

export const AddCapacityByVehicleIdService = async (data) => {
  return await http.post(`Capacity/AddCapacityByVehicleId`, data);
};

export const GetCapacityByIdService = async (id) => {
  return await http.get(`/Capacity/GetCapacityById?id=${id}`);
};

export const UpdateCapacityByIdService = async (data) => {
  return await http.post(`Capacity/UpdateCapacityById`, data);
};

// aksesuar
export const GetAccListByVehicleIdService = async (id, search, page) => {
  return await http.get(
    `/Accessories/GetAccListByVehicleId?vehicleId=${id}&parameter=${search}&page=${page}`
  );
};

export const AddAccItemService = async (data) => {
  return await http.post(`Accessories/AddAccItem`, data);
};

export const GetAccItemByIdService = async (id) => {
  return await http.get(`/Accessories/GetAccItemById?id=${id}`);
};

export const UpdateAccItemService = async (data) => {
  return await http.post(`Accessories/UpdateAccItem`, data);
};

// surucu
export const GetDriverSubstitutionListByVehicleIdService = async (id, search, page) => {
  return await http.get(
    `/DriverSubstitution/GetDriverSubstitutionListByVehicleId?vehicleId=${id}&parameter=${search}&page=${page}`
  );
};

export const AddDriverSubstitutionItemService = async (data) => {
  return await http.post(`DriverSubstitution/AddDriverSubstitutionItem`, data);
};

export const GetDriverSubstitutionByIdService = async (id) => {
  return await http.get(`/DriverSubstitution/GetDriverSubstitutionById?id=${id}`);
};

export const UpdateDriverSubstitutionItemService = async (data) => {
  return await http.post(`DriverSubstitution/UpdateDriverSubstitutionItem`, data);
};


// km
export const GetKmUpdateListService = async (page, data) => {
  return await http.post(`/QuickKmUpdate/GetKmUpdateList?page=${page}`, data);
};

export const ValidateKmLogForAddService = async (data) => {
  return await http.post(`/KmLog/ValidateKmLogForAdd`, data);
};

export const AddKmLogService = async (data) => {
  return await http.post(`/KmLog/AddKmLog`, data);
};

export const ResetKmLogService = async (data) => {
  return await http.post(`/KmLog/ResetKmLog`, data);
};

export const EditKmLogService = async (data) => {
  return await http.post(`/KmLog/EditKmLog`, data);
};

// km history
export const GetKmLogListGetService = async (page) => {
  return await http.get(`/KmLog/GetKmLogList?page=${page}`);
};

export const GetKmLogListByVehicleIdService = async (id, page) => {
  return await http.get(
    `/KmLog/GetKmLogListByVehicleId?vehicleId=${id}&page=${page}`
  );
};

export const DeleteKmLogService = async (data) => {
  return await http.post(`/KmLog/DeleteKmLog`, data);
};

export const ValidateKmLogForUpdateService = async (data) => {
  return await http.post(`/KmLog/ValidateKmLogForUpdate`, data);
};

export const UpdateKmLogService = async (data) => {
  return await http.post(`/KmLog/UpdateKmLog`, data);
};
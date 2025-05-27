import http from "../http";

const KMGetService = async (page, data) => {
  return await http.post(`/QuickKmUpdate/GetKmUpdateList?page=${page}`, data);
};

const KMValidateService = async (data) => {
  return await http.post(`/KmLog/ValidateKmLogForAdd`, data);
};

const KMAddService = async (data) => {
  return await http.post(`/KmLog/AddKmLog`, data);
};

const KMResetService = async (data) => {
  return await http.post(`/KmLog/ResetKmLog`, data);
};

const KMEditService = async (data) => {
  return await http.post(`/KmLog/EditKmLog`, data);
};

// km history
const KMLogListGetService = async (page) => {
  return await http.get(`/KmLog/GetKmLogList?page=${page}`);
};

const KMLogListGetByIdService = async (id, page) => {
  return await http.post(`/KmLog/GetKmLogListByVehicleId?page=${page}`, id);
};

const KMLogListDeleteService = async (data) => {
  return await http.post(`/KmLog/DeleteKmLog`, data);
};

const KMLogListValidateService = async (data) => {
  return await http.post(`/KmLog/ValidateKmLogForUpdate`, data);
};

const KMLogListUpdateService = async (data) => {
  return await http.post(`/KmLog/UpdateKmLog`, data);
};

export {
  KMGetService,
  KMValidateService,
  KMAddService,
  KMResetService,
  KMEditService,
  KMLogListGetService,
  KMLogListGetByIdService,
  KMLogListDeleteService,
  KMLogListValidateService,
  KMLogListUpdateService,
};

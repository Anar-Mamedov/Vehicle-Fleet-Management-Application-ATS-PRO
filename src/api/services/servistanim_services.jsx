import http from "../http";

export const GetServisCodeService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=SERVIS_KOD`);
};

export const GetServisListService = async (page) => {
  return await http.get(`/ServiceDef/GetServiceDefList?page=${page}`);
};

export const SearchServisListService = async (page, parameter) => {
  return await http.get(`/ServiceDef/GetServiceDefList?page=${page}&parameter=${parameter}`);
};

export const DeleteServisService = async (id) => {
  return await http.get(`/ServiceDef/DeleteServiceDefItem?id=${id}`);
};

export const AddServisService = async (data) => {
  return await http.post(`/ServiceDef/AddServiceDefItem`, data);
};

export const GetServisByIdService = async (id) => {
  return await http.get(`/ServiceDef/GetServiceDefById?id=${id}`);
};

export const UpdateServisService = async (data) => {
  return await http.post(`/ServiceDef/UpdateServiceDefItem`, data);
};

// Araca tanımlı servis/bakım tanımları (periyodik bakımlar dahil); sayfa numarasıyla sayfalanır
export const GetServiceDefListRelatedToVehicleService = async (vehicleId, page, search) => {
  return await http.get(`/ServiceDef/GetServiceDefListRelatedToVehicle?vId=${vehicleId}&page=${page}&parameter=${encodeURIComponent(search)}`);
};

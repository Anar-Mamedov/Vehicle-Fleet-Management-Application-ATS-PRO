import http from "../http";

export const GetLastikListService = async (page) => {
  return await http.get(`/Tyre/GetTyreList?page=${page}`);
};

export const SearchLastikListService = async (page, parameter) => {
  return await http.get(`/Tyre/GetTyreList?page=${page}&parameter=${parameter}`);
};

export const DeleteLastikService = async (id) => {
  return await http.get(`/Tyre/DeleteTyreItem?id=${id}`);
};

export const AddIsLastikService = async (data) => {
  return await http.post(`/Tyre/AddTyreItem`, data);
};

export const UpdateLastikService = async (data) => {
  return await http.post(`/Tyre/UpdateTyreItem`, data);
};

export const GetLastikByIdService = async (id) => {
  return await http.get(`/Tyre/GetTyreById?id=${id}`);
};

export const GetLastikMarkaListService = async () => {
  return await http.get(`/TyreMark/GetTyreMarkList`);
};

export const AddLastikMarkaService = async (marka) => {
  return await http.post(`/TyreMark/AddMark`, { marka });
};

export const GetLastikModelListService = async (markaId) => {
  return await http.get(`/TyreModel/GetTyreModelList?id=${markaId}`);
};

export const AddLastikModelService = async (model, markaId) => {
  return await http.post(`/TyreModel/AddModel`, { model, markaId });
};

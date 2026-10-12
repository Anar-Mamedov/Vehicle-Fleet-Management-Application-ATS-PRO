import http from "../http";

export const GetIsKartiListService = async (page) => {
  return await http.get(`/WorkCard/GetWorkCardsList?page=${page}`);
};

export const SearchIsKartiListService = async (page, parameter) => {
  return await http.get(`/WorkCard/GetWorkCardsList?page=${page}&parameter=${parameter}`);
};

// İş tanımları listesi imleçli (diff + setPointId) sayfalanır
export const GetWorkCardsListService = async (diff, setPointId, search) => {
  return await http.get(`/WorkCard/GetWorkCardsList?diff=${diff}&setPointId=${setPointId}&parameter=${encodeURIComponent(search)}`);
};

export const DeleteIsKartiService = async (id) => {
  return await http.get(`/WorkCard/DeleteWorkCardById?id=${id}`);
};

export const AddIsKartiService = async (data) => {
  return await http.post(`/WorkCard/AddWorkCard`, data);
};

export const UpdateIsKartiService = async (data) => {
  return await http.post(`/WorkCard/UpdateWorkCard`, data);
};

export const GetIsKartiByIdService = async (id) => {
  return await http.get(`/WorkCard/GetWorkCardById?id=${id}`);
};

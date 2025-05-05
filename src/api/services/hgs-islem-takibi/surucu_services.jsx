import http from "../../http";

export const GetDriverListService = async (search, page, data) => {
  return await http.get(`/Driver/GetDriverList?page=${page}&parameter=${search}`, data);
};

export const AddDriverService = async (data) => {
  return await http.post(`/Driver/AddDriver`, data);
};

export const UpdateDriverService = async (data) => {
  return await http.post(`/Driver/UpdateDriver`, data);
};

export const GetDriverByIdService = async (id) => {
  return await http.get(`/Driver/GetDriverById?id=${id}`);
};

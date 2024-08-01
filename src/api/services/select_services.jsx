import http from "../http";

export const CodeControlService = async (id) => {
  return await http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
};

export const CustomCodeControlService = async (url) => {
  return await http.get(`/${url}`);
};

export const MaterialListSelectService = async (type) => {
  return await http.get(`/Material/GetMaterialListByType?type=${type}`);
};

export const GetLocationByDepoIdService = async (id) => {
  return await http.get(`/Location/GetLocationById?locationId=${id}`);
};

export const CodeItemValidateService = async (data) => {
  return await http.post(`/TableCodeItem/IsCodeItemExist`, data);
};

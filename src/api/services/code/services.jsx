import http from "../../http";

export const CodeControlByIdService = async (id) => {
  return await http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
};

export const CodeControlByUrlService = async (url) => {
  return await http.get(`/${url}`);
};

export const GetMaterialListByType = async (type) => {
  return await http.get(`/Material/GetMaterialListByType?type=${type}`);
};

export const CodeItemValidateService = async (data) => {
  return await http.post(`/TableCodeItem/IsCodeItemExist`, data);
};

export const GetModuleCodeByCode = async (code) => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=${code} `);
};

export const GetLocationByDepoIdService = async (id) => {
  return await http.get(`/Location/GetLocationById?locationId=${id}`);
};

import http from "../../http";

// firma
export const GetCompaniesListService = async (search, page, data) => {
  return await http.get(`/Company/GetCompaniesList?page=${page}&parameter=${search}`, data);
};

export const DeleteCompanyItemService = async (id) => {
  return await http.get(`/Company/DeleteCompanyItem?id=${id}`);
};

export const AddHgsItemService = async (data) => {
  return await http.post(`/HgsOperations/AddHgsItem`, data);
};

export const UpdateHgsItemService = async (data) => {
  return await http.post(`/HgsOperations/UpdateHgsItem`, data);
};

export const GetHgsOperationItemByIdService = async (id) => {
  return await http.get(`/HgsOperations/GetHgsOperationItemById?id=${id}`);
};

// hgs fiyat
export const GetDriverListService = async (search, page, data) => {
  return await http.get(`/Driver/GetDriverList?page=${page}&parameter=${search}`, data);
};

export const AddHgsGecisFiyat = async (data) => {
  return await http.post(`/HgsTransitionPrice/AddHgsTransitionPriceItem`, data);
};

export const UpdateHgsGecisFiyat = async (data) => {
  return await http.post(`/HgsTransitionPrice/UpdateHgsTransitionPriceItem`, data);
};

export const GetHgsGecisFiyatByIdService = async (id) => {
  return await http.get(`/HgsTransitionPrice/GetHgsTransitionPriceItemById?id=${id}`);
};

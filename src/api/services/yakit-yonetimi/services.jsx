import http from "../../http";

export const GetFuelMaterialListService = async (search, page, data) => {
  return await http.post(
    `/Material/GetFuelMaterialList?page=${page}&parameter=${search}`,
    data
  );
};

export const AddMaterialService = async (data) => {
  return await http.post(`/Material/AddMaterial`, data);
};

export const GetMaterialCardByIdService = async (id) => {
  return await http.get(`/Material/GetFuelMaterialCardById?id=${id}`);
};

export const UpdateMaterialCardService = async (data) => {
  return await http.post(`/Material/UpdateMaterialCard`, data);
};

// giris fis
export const GetFuelEntryReceiptListService = async (search, page, data) => {
  return await http.post(
    `/MaterialReceipt/GetFuelEntryReceiptList?page=${page}&parameter=${search}`,
    data
  );
};

export const AddMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/AddMaterialReceipt`, data);
};

export const GetMaterialReceiptByIdService = async (id) => {
  return await http.get(
    `/MaterialReceipt/GetMaterialReceiptById?receiptId=${id}`
  );
};

export const UpdateMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/UpdateMaterialReceipt`, data);
};

// cikis fis
export const GetFuelReleaseReceiptListService = async (search, page, data) => {
  return await http.post(
    `/MaterialReceipt/GetFuelReleaseReceiptList?page=${page}&parameter=${search}`,
    data
  );
};

// transfer
export const GetFuelTransferReceiptListService = async (search, page, data) => {
  return await http.post(
    `/MaterialReceipt/GetFuelTransferReceiptList?page=${page}&parameter=${search}`, data
  );
};

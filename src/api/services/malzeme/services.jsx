import http from "../../http";

export const GetMaterialListService = async (search, page, data) => {
  return await http.post(
    `/Material/GetMaterialList?page=${page}&parameter=${search}`,
    data
  );
};

export const GetWareHouseListByTipService = async (type) => {
  return await http.get(`/WareHouse/GetWareHouseListByTip?tip=${type}`);
};

export const AddMaterialService = async (data) => {
  return await http.post(`/Material/AddMaterial`, data);
};

export const GetMaterialCardByIdService = async (id) => {
  return await http.get(`/Material/GetMaterialCardById?id=${id}`);
};

export const UpdateMaterialCardService = async (data) => {
  return await http.post(`/Material/UpdateMaterialCard`, data);
};

// giris fis
export const GetMaterialEntryReceiptListService = async (
  search,
  page,
  data
) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialEntryReceiptList?page=${page}&parameter=${search}`,
    data
  );
};

export const AddMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/AddMaterialReceipt`, data);
};

export const UpdateMaterialReceiptService = async (data) => {
  return await http.post(`/MaterialReceipt/UpdateMaterialReceipt`, data);
};

export const GetMaterialReceiptByIdService = async (id) => {
  return await http.get(
    `/MaterialReceipt/GetMaterialReceiptById?receiptId=${id}`
  );
};

export const DeleteUpdatedMaterialReceiptService = async (id) => {
  return await http.get(`/MaterialMovements/DeleteMaterialMovementItemById?id=${id}`);
};

// cikis
export const GetMaterialReleaseReceiptListService = async (
  search,
  page,
  data
) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialReleaseReceiptList?page=${page}&parameter=${search}`,
    data
  );
};

// transfer
export const GetMaterialTransferReceiptListService = async (search, page, data) => {
  return await http.post(
    `/MaterialReceipt/GetMaterialTransferReceiptList?page=${page}&parameter=${search}`,
    data
  );
};

// hareket
export const GetMaterialMovementsListService = async (search, page, data) => {
  return await http.post(`/MaterialMovements/GetMaterialMovementsList?page=${page}&parameter=${search}`, data);
};
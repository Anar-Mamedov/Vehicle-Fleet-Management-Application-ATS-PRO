import http from "../../http";

// photos
export const GetPhotosByRefGroupService = async (id, group) => {
  return await http.get(`/Photo/GetPhotosByRefGroup?refId=${id}&refGroup=${group}`);
};

export const DownloadPhotoByIdService = async (data) => {
  return await http.post(`/Photo/DownloadPhotoById`, data, { responseType: "blob" });
};

// documents
export const GetDocumentsByRefGroupService = async (id, group) => {
  return await http.get(`/Document/GetDocumentsByRefGroup?refId=${id}&refGroup=${group}`);
};

export const GetDocumentsListService = async (setPointId, diff, parameter) => {
  return await http.post(`/Document/GetDocumentsList`, undefined, {
    params: { setPointId, diff, parameter },
  });
};

export const DownloadDocumentByIdService = async (data) => {
  return await http.post(`/Document/DownloadDocumentById`, data, { responseType: "blob" });
};

export const GetDocumentInfoByIdService = async (id) => {
  return await http.get(`/Document/GetDocumentInfoById?id=${id}`);
};

export const UpdateDocumentService = async (data) => {
  return await http.post(`/Document/UpdateDocument`, data);
};

export const GetLegacyDocumentTypesService = async () => {
  return await http.get(`/GetDosyaTipleri`);
};

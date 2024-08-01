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

export const DownloadDocumentByIdService = async (data) => {
    return await http.post(`/Document/DownloadDocumentById`, data, { responseType: "blob" });
};
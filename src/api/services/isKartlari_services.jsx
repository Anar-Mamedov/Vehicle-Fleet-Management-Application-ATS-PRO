import http from "../http";

export const GetIsKartiListService = async (page) => {
    return await http.get(`/WorkCard/GetWorkCardsList?page=${page}`);
};

export const SearchIsKartiListService = async (page, parameter) => {
    return await http.get(`/WorkCard/GetWorkCardsList?page=${page}&parameter=${parameter}`);
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
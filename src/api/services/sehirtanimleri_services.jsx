import http from "../http";


export const GetTownListService = async (page) => {
    return await http.get(`/Town/GetTownList?page=${page}`);
};

export const SearchTownListService = async (page, parameter) => {
    return await http.get(`/Town/GetTownList?page=${page}&parameter=${parameter}`);
};

export const AddTownService = async (data) => {
    return await http.post(`/Town/AddTownItem`, data);
};

export const UpdateTownService = async (data) => {
    return await http.post(`/Town/UpdateTownItem`, data);
};

export const DeleteTownService = async (id) => {
    return await http.get(`/Town/DeleteTownItem?id=${id}`);
};
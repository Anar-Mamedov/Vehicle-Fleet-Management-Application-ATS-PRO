import http from "../http";

export const GetCezaListService = async (page) => {
    return await http.get(`/PenaltyDef/GetPenaltyDefList?page=${page}`);
};

export const SearchCezaListService = async (page, parameter) => {
    return await http.get(`/PenaltyDef/GetPenaltyDefList?page=${page}&parameter=${parameter}`);
};

export const DeleteCezaService = async (id) => {
    return await http.get(`/PenaltyDef/DeletePenaltyDefItem?id=${id}`);
};

export const AddCezaService = async (data) => {
    return await http.post(`/PenaltyDef/AddPenaltyDefItem`, data);
};

export const UpdateCezaService = async (data) => {
    return await http.post(`/PenaltyDef/UpdatePenaltyDefItem`, data);
};

export const GetCezaByIdService = async (id) => {
    return await http.get(`/PenaltyDef/GetPenaltyDefById?id=${id}`);
};
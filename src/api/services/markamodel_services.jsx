import http from "../http";


export const GetModelListByMarkaService = async (id) => {
    return await http.get(`/Model/GetModelListByMarkId?markId=${id}`);
};

export const AddModelService = async (data) => {
    return await http.post(`/Model/AddModelItem`, data);
};

export const UpdateModelService = async (data) => { 
    return await http.post(`/Model/UpdateModelItem`, data);
};

export const DeleteModelService = async (id) => {
    return await http.get(`/Model/DeleteModelItemById?id=${id}`);
};

export const GetMarkaListService = async () => {
    return await http.get(`/Mark/GetMarkList`);
};

export const AddMarkaService = async (marka) => {
    return await http.post(`/Mark/AddMarkItem?markItem=${marka}`);
};

export const UpdateMarkaService = async (data) => {
    return await http.post(`/Mark/UpdateMarkItem`, data);
};

export const DeleteMarkaService = async (id) => {
    return await http.get(`/Mark/DeleteMarkItemById?id=${id}`);
};
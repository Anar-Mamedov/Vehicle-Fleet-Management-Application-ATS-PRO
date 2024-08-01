import http from "../http";

export const GetPersonelCodeService = async () => {
    return await http.get(`/Numbering/GetModuleCodeByCode?code=PERSONEL_KOD `);
};

export const GetEmployeeListService = async (page) => {
    return await http.get(`/Employee/GetEmployeeList?page=${page}`);
};

export const SearchEmployeeListService = async (page, parameter) => {
    return await http.get(`/Employee/GetEmployeeList?page=${page}&parameter=${parameter}`);
};

export const DeleteFirmaService = async (id) => {
    return await http.get(`/Employee/DeleteCompanyItem?id=${id}`);
};

export const AddEmployeeService = async (data) => {
    return await http.post(`/Employee/AddEmployee`, data);
};

export const UpdateEmployeeService = async (data) => {
    return await http.post(`/Employee/UpdateEmployee`, data);
};

export const GetEmployeeByIdService = async (id) => {
    return await http.get(`/Employee/GetEmployeeById?id=${id}`);
};
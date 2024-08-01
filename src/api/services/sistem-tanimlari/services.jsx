import http from "../../http";

// firma
export const GetCompaniesListService = async (
    search,
    page,
    data
) => {
    return await http.get(
        `/Company/GetCompaniesList?page=${page}&parameter=${search}`,
        data
    );
};

export const DeleteCompanyItemService = async (id) => {
    return await http.get(`/Company/DeleteCompanyItem?id=${id}`);
};

export const AddCompanyItemService = async (data) => {
    return await http.post(`/Company/AddCompanyItem`, data);
};

export const UpdateCompanyItemService = async (data) => {
    return await http.post(`/Company/UpdateCompanyItem`, data);
};

export const GetCompanyByIdService = async (id) => {
    return await http.get(`/Company/GetCompanyById?id=${id}`);
};

// surucu
export const GetDriverListService = async (search, page, data) => {
    return await http.get(`/Driver/GetDriverList?page=${page}&parameter=${search}`, data);
};

export const AddDriverService = async (data) => {
    return await http.post(`/Driver/AddDriver`, data);
};

export const UpdateDriverService = async (data) => {
    return await http.post(`/Driver/UpdateDriver`, data);
};

export const GetDriverByIdService = async (id) => {
    return await http.get(`/Driver/GetDriverById?id=${id}`);
};
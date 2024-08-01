import http from "../http";

export const GuzergahCodeGetService = async () => {
    return await http.get(`/Numbering/GetModuleCodeByCode?code=GUZERGAH_KOD`);
};

export const GetGuzergahListService = async (page) => {
    return await http.get(`/FuelRoute/GetFuelRoutesList?page=${page}`);
};

export const SearchGuzergahListService = async (page, parameter) => {
    return await http.get(`/FuelRoute/GetFuelRoutesList?page=${page}&parameter=${parameter}`);
};

export const DeleteGuzergahService = async (id) => {
    return await http.get(`/FuelRoute/DeleteFuelRouteItem?id=${id}`);
};

export const GetGuzergahYerService = async () => {
    return await http.get(`/TownRegion/GetTownRegionList`);
};

export const GetGuzergahYerByTownIdService = async (id) => {
    return await http.get(`/TownRegion/GetTownRegionListByTownId?id=${id}`);
};

export const AddGuzergahService = async (data) => {
    return await http.post(`/FuelRoute/AddFuelRouteItem`, data);
};

export const GetGuzergahByIdService = async (id) => {
    return await http.get(`/FuelRoute/GetFuelRouteById?id=${id}`);
};

export const UpdateGuzergahService = async (data) => {
    return await http.post(`/FuelRoute/UpdateFuelRouteItem`, data);
};

export const GetSehirListService = async () => {
    return await http.get(`/Town/GetTownList`);
};


export const AddRegionService = async (data) => {
    return await http.post(`/TownRegion/AddRegion`, data);
};

export const UpdateRegionService = async (data) => {
    return await http.post(`/TownRegion/UpdateRegion`, data);
};

export const DeleteRegionService = async (id) => {
    return await http.get(`/TownRegion/DeleteRegion?id=${id}`);
};
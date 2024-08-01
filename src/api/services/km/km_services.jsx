import http from "../../http";

export const GetKmLogListByVehicleIdService = async (id, page) => {
    return await http.get(`/KmLog/GetKmLogListByVehicleId?vehicleId=${id}&page=${page}`);
};

export const DeleteKmLogService = async (data) => {
    return await http.post(`/KmLog/DeleteKmLog`, data);
};

export const ValidateKmLogForUpdateService = async (data) => {
    return await http.post(`/KmLog/ValidateKmLogForUpdate`, data);
};
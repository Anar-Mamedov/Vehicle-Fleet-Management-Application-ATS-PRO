import http from "../../http";

// yakit
export const GetFuelListByVehicleIdService = async (search, page, data) => {
    return await http.post(`/Fuel/GetFuelListByVehicleId?page=${page}&parameter=${search}`, data);
};

export const DeleteFuelCardService = async (id) => {
    return await http.get(`/Fuel/DeleteFuelCard?fuelId=${id}`);
};

export const AddFuelService = async (data) => {
    return await http.post(`/Fuel/AddFuel`, data);
};

export const GetFuelCardContentByIdService = async (id) => {
    return await http.get(`/Fuel/GetFuelCardContentById?vehicleId=${id}`);
};

export const GetMaterialPriceService = async (id) => {
    return await http.get(`/Material/GetMaterialPrice?materialId=${id}`);
};

export const ValidateFuelInfoInsertionService = async (data) => {
    return await http.post(`/Fuel/ValidateFuelInfoInsertion`, data);
};

export const GetKmRangeBeforeDateService = async (data) => {
    return await http.post(`/Fuel/GetKmRangeBeforeDate`, data);
};

export const GetLastThreeFuelRecordService = async (id, date, time) => {
    return await http.get(`/Fuel/GetLastThreeFuelRecord?vehicleId=${id}&date=${date}&time=${time}`);
};

export const GetWareHouseListService = async (id, type) => {
    return await http.get(`/WareHouse/GetWareHouseList?tip=${type}&id=${id}`);
};

export const GetFuelCardInfoByFuelIdService = async (id) => {
    return await http.get(`/Fuel/GetFuelCardInfoByFuelId?id=${id}`);
};

export const UpdateFuelService = async (data) => {
    return await http.post(`/Fuel/UpdateFuel`, data);
};

export const GetFuelListService = async (search, page, data) => {
    return await http.get(`/Fuel/GetFuelList?page=${page}&parameter=${search}`, data);
};

// harcama
export const GetExpensesListByVehicleIdService = async (
    search,
    page,
    data
) => {
    return await http.post(
        `/Expenses/GetExpensesListByVehicleId?page=${page}&parameter=${search}`,
        data
    );
};

export const AddExpenseItemService = async (data) => {
    return await http.post(`/Expenses/AddExpenseItem`, data);
};

export const GetExpenseByIdService = async (id) => {
    return await http.get(`/Expenses/GetExpenseById?id=${id}`);
};

export const UpdateExpenseItemService = async (data) => {
    return await http.post(`/Expenses/UpdateExpenseItem`, data);
};

export const GetExpensesListService = async (search, page, data) => {
    return await http.get(`/Expenses/GetExpensesList?page=${page}&parameter=${search}`, data);
};

// sefer
export const GetExpeditionsListByVehicleIdService = async (
    search,
    page,
    data
) => {
    return await http.post(
        `/Expeditions/GetExpeditionsListByVehicleIds?page=${page}&parameter=${search}`,
        data
    );
};

export const AddExpeditionItemService = async (data) => {
    return await http.post(`/Expeditions/AddExpeditionItem`, data);
};

export const GetExpeditionItemByIdService = async (id) => {
    return await http.get(`/Expeditions/GetExpeditionItemById?id=${id}`);
};

export const UpdateExpeditionItemService = async (data) => {
    return await http.post(`/Expeditions/UpdateExpeditionItem`, data);
};

export const GetExpeditionsListService = async (search, page, data) => {
    return await http.get(`/Expeditions/GetExpeditionsList?page=${page}&parameter=${search}`, data);
};


// kazalar
export const GetAccidentsListByVehicleIdService = async (
    search,
    page,
    data
) => {
    return await http.post(
        `/Accident/GetAccidentsListByVehicleId?page=${page}&parameter=${search}`,
        data
    );
};

export const AddAccidentItemService = async (data) => {
    return await http.post(`/Accident/AddAccidentItem`, data);
};

export const GetAccidentItemByIdService = async (id) => {
    return await http.get(`/Accident/GetAccidentItemById?id=${id}`);
};

export const UpdateAccidentItemService = async (data) => {
    return await http.post(`/Accident/UpdateAccidentItem`, data);
};

export const GetAccidentsListService = async (search, page, data) => {
    return await http.get(`/Accident/GetAccidentsList?page=${page}&parameter=${search}`, data);
};

export const GetActiveInsuranceListService = async (id, search, page) => {
    return await http.get(`/Insurance/GetActiveInsuranceList?vehicleId=${id}&page=${page}&parameter=${search}`);
};

// sigorta

export const GetInsuranceListByVehicleIdService = async (
    search,
    page,
    data
) => {
    return await http.post(
        `/Insurance/GetInsuranceListByVehicleId?page=${page}&parameter=${search}`,
        data
    );
};

export const AddInsuranceItemService = async (data) => {
    return await http.post(`/Insurance/AddInsuranceItem`, data);
};

export const GetInsuranceItemByIdService = async (id) => {
    return await http.get(`/Insurance/GetInsuranceItemById?id=${id}`);
};

export const UpdateInsuranceItemService = async (data) => {
    return await http.post(`/Insurance/UpdateInsuranceItem`, data);
};

export const GetInsuranceListService = async (search, page, data) => {
    return await http.get(`/Insurance/GetInsuranceList?page=${page}&parameter=${search}`, data);
};

// ceza
export const GetVehicleFinesListByVehicleIdService = async (
    search,
    page,
    data
) => {
    return await http.post(
        `/VehicleFines/GetVehicleFinesListByVehicleId?page=${page}&parameter=${search}`,
        data
    );
};

export const AddVehicleFineItemService = async (data) => {
    return await http.post(`/VehicleFines/AddVehicleFineItem`, data);
};

export const GetPenaltyDefListService = async (search, page) => {
    return await http.get(
        `/PenaltyDef/GetPenaltyDefList?page=${page}&parameter=${search}`
    );
};

export const GetVehicleFineItemService = async (id) => {
    return await http.get(`/VehicleFines/GetVehicleFineItem?id=${id}`);
};

export const UpdateVehicleFineItemService = async (data) => {
    return await http.post(`/VehicleFines/UpdateVehicleFineItem`, data);
};

export const GetVehicleFinesListService = async (search, page, data) => {
    return await http.get(`/VehicleFines/GetVehicleFinesList?page=${page}&parameter=${search}`, data);
};
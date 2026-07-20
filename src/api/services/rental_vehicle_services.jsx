import http from "../http";

export const GetRentalVehiclesReportService = async (search, data) => {
  return await http.post(`/RentalVehicle/GetRentalVehiclesReport?parameter=${encodeURIComponent(search)}`, data);
};

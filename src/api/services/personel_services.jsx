import http from "../http";

export const GetPersonelCodeService = async () => {
  return await http.get(`/Numbering/GetModuleCodeByCode?code=PERSONEL_KOD `);
};

// Personel listesi; filtreler POST gövdesinde, sayfalama query'de gider
export const GetEmployeeListService = async (diff, setPointId, search, filters, pageSize) => {
  return await http.post(`/Employee/GetEmployeeList?setPointId=${setPointId}&diff=${diff}&parameter=${encodeURIComponent(search)}&pageSize=${pageSize}`, filters);
};

export const SearchEmployeeListService = async (page, parameter) => {
  return await http.get(`/Employee/GetEmployeeList?page=${page}&parameter=${parameter}`);
};

// Excel raporu; liste ile aynı arama ve filtre gövdesini kullanır
export const GetEmployeesReportService = async (search, filters) => {
  return await http.post(`/Employee/GetEmployeesReport?parameter=${encodeURIComponent(search)}`, filters);
};

// Personel listesi KPI kutuları; her kutu ayrı bir type ile çağrılır
export const GetEmployeeStatisticsByTypeService = async (type, search, filters) => {
  return await http.post(`/EmployeesStatistics/GetInfoByType?type=${type}&parameter=${encodeURIComponent(search)}`, filters);
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

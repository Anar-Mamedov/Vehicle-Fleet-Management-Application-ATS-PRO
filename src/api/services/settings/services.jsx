import http from "../../http";

export const GetSettingByTypeService = async (type) => {
  return await http.get(`/CommonSettings/GetSettingByType?type=${type}`);
};

export const UpdateSettingByTypeService = async (type, data) => {
  return await http.post(
    `/CommonSettings/UpdateSettingByType?type=${type}`,
    data
  );
};

export const GetModulesCodesService = async () => {
  return await http.get(`/Numbering/GetModulesCodes`);
};

export const UpdateModuleInfoService = async (data) => {
  return await http.post(
    `/Numbering/UpdateModuleInfo`,
    data
  );
};

export const GetCodeGroupsService = async () => {
  return await http.get(`/CodeGroups/GetCodeGroups`);
};

export const GetCodeTextByIdService = async (id) => {
  return await http.get(`/Code/GetCodeTextById?codeNumber=${id}`);
};

export const AddCodeService = async (data) => {
  return await http.post(
    `/Code/AddCode`,
    data
  );
};

export const UpdateCodeService = async (data) => {
  return await http.post(
    `/Code/UpdateCode`,
    data
  );
};
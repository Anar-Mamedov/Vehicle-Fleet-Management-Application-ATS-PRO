import http from "../../http";

export const GetClientModulesService = async () => {
  return await http.get("/ClientInfo/GetClientModules");
};

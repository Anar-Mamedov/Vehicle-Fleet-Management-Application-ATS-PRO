import http from "../../http";

export const GetRolesService = async () => {
  return await http.get("/Role/GetRoles");
};

export const GetRoleAuthItemsService = async (roleId) => {
  return await http.get("/RoleAuth/GetAuthItems", { params: { roleId } });
};

export const GetUsersByRoleIdService = async (roleId) => {
  return await http.get("/User/GetUsersByRoleId", { params: { roleId } });
};

export const UpsertRoleService = async (body) => {
  return await http.post("/Role/UpsertRole", body);
};

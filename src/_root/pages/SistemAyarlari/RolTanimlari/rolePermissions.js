const PERMISSION_FIELDS = ["goruntule", "ekle", "degistir", "sil"];
const EXCLUDED_PARENT_MENU_NAMES = new Set(["yonetim"]);

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLocaleLowerCase("tr-TR");

const normalizePermissionName = (value) =>
  normalizeText(value)
    .replaceAll("ı", "i")
    .replaceAll("ş", "s")
    .replaceAll("ğ", "g")
    .replaceAll("ç", "c")
    .replaceAll("ö", "o")
    .replaceAll("ü", "u")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const isExcludedParentMenuName = (value) => EXCLUDED_PARENT_MENU_NAMES.has(normalizePermissionName(value));

const matchesRoleAuth = (roleAuth, module) => {
  const usesExpectedFieldOrder =
    normalizeText(roleAuth.yetkiKod) === normalizeText(module.sayfaKod) && normalizePermissionName(roleAuth.yetkiTanim) === normalizePermissionName(module.menuAdi);
  const usesLegacyReversedFieldOrder =
    normalizePermissionName(roleAuth.yetkiKod) === normalizePermissionName(module.menuAdi) && normalizeText(roleAuth.yetkiTanim) === normalizeText(module.sayfaKod);

  return usesExpectedFieldOrder || usesLegacyReversedFieldOrder;
};

const toPermission = (module, roleAuth) => ({
  key: `${module.siraNo}-${module.sayfaKod}-${module.menuAdi}`,
  moduleOrder: Number(module.siraNo) || 0,
  menuAdi: String(module.menuAdi ?? ""),
  yetkiKod: String(module.sayfaKod ?? ""),
  yetkiTanim: String(module.menuAdi ?? ""),
  goruntule: Boolean(roleAuth?.goruntule),
  ekle: Boolean(roleAuth?.ekle),
  degistir: Boolean(roleAuth?.degistir),
  sil: Boolean(roleAuth?.sil),
});

export const createRolePermissionState = (clientModules, roleAuths = []) => {
  const modules = Array.isArray(clientModules) ? [...clientModules] : [];
  const existingAuths = Array.isArray(roleAuths) ? roleAuths : [];
  const parentsById = new Map(modules.filter((module) => module.sayfaKod === "-").map((module) => [Number(module.siraNo), module]));
  const permissionModules = modules
    .filter((module) => module.sayfaKod && module.sayfaKod !== "-" && module.menuAdi)
    .sort((firstModule, secondModule) => Number(firstModule.siraNo ?? 0) - Number(secondModule.siraNo ?? 0));
  const moduleCodeCounts = permissionModules.reduce((counts, module) => {
    const code = normalizeText(module.sayfaKod);
    counts.set(code, (counts.get(code) ?? 0) + 1);
    return counts;
  }, new Map());
  const consumedAuthIndexes = new Set();
  const groupsByKey = new Map();

  permissionModules.forEach((module) => {
    let authIndex = existingAuths.findIndex((roleAuth, index) => !consumedAuthIndexes.has(index) && matchesRoleAuth(roleAuth, module));

    if (authIndex < 0 && moduleCodeCounts.get(normalizeText(module.sayfaKod)) === 1) {
      authIndex = existingAuths.findIndex(
        (roleAuth, index) =>
          !consumedAuthIndexes.has(index) &&
          (normalizeText(roleAuth.yetkiKod) === normalizeText(module.sayfaKod) || normalizeText(roleAuth.yetkiTanim) === normalizeText(module.sayfaKod))
      );
    }

    if (authIndex >= 0) {
      consumedAuthIndexes.add(authIndex);
    }

    const parent = parentsById.get(Number(module.anaMenuId));
    const groupKey = parent ? `parent-${parent.siraNo}` : `other-${module.anaMenuId ?? 0}`;

    if (!groupsByKey.has(groupKey)) {
      groupsByKey.set(groupKey, {
        key: groupKey,
        anaMenuId: Number(module.anaMenuId) || 0,
        menuAdi: parent?.menuAdi ?? "rolDigerModuller",
        order: Number(parent?.siraNo ?? module.siraNo ?? 0),
        permissions: [],
      });
    }

    groupsByKey.get(groupKey).permissions.push(toPermission(module, authIndex >= 0 ? existingAuths[authIndex] : null));
  });

  const groups = [...groupsByKey.values()].sort((firstGroup, secondGroup) => firstGroup.order - secondGroup.order);
  const preservedAuths = existingAuths.filter((_, index) => !consumedAuthIndexes.has(index));

  return { groups, preservedAuths };
};

export const getVisibleRolePermissionGroups = (groups) => {
  const permissionGroups = Array.isArray(groups) ? groups : [];
  const hiddenParentIds = new Set(
    permissionGroups.filter((group) => isExcludedParentMenuName(group.menuAdi)).map((group) => Number(group.anaMenuId))
  );

  return permissionGroups.filter((group) => !hiddenParentIds.has(Number(group.anaMenuId)));
};

export const updatePermission = (groups, permissionKey, field, checked) => {
  if (!PERMISSION_FIELDS.includes(field)) {
    return groups;
  }

  return groups.map((group) => ({
    ...group,
    permissions: group.permissions.map((permission) => (permission.key === permissionKey ? { ...permission, [field]: Boolean(checked) } : permission)),
  }));
};

export const updatePermissionGroup = (groups, groupKey, mode) => {
  return groups.map((group) => {
    if (group.key !== groupKey) {
      return group;
    }

    return {
      ...group,
      permissions: group.permissions.map((permission) => ({
        ...permission,
        goruntule: mode === "all" || mode === "view",
        ekle: mode === "all",
        degistir: mode === "all",
        sil: mode === "all",
      })),
    };
  });
};

const normalizeRoleAuth = (roleAuth, roleId) => ({
  rolSiraNo: roleId,
  yetkiKod: String(roleAuth.yetkiKod ?? ""),
  yetkiTanim: String(roleAuth.yetkiTanim ?? ""),
  ekle: Boolean(roleAuth.ekle),
  sil: Boolean(roleAuth.sil),
  degistir: Boolean(roleAuth.degistir),
  goruntule: Boolean(roleAuth.goruntule),
});

export const buildRolePayload = (values, roleId, groups, preservedAuths = []) => {
  const normalizedRoleId = Number(roleId) || 0;
  const currentPermissions = getVisibleRolePermissionGroups(groups)
    .flatMap((group) => group.permissions)
    .map((permission) => normalizeRoleAuth(permission, normalizedRoleId));
  const preservedPermissions = preservedAuths
    .filter((roleAuth) => !isExcludedParentMenuName(roleAuth.yetkiKod) && !isExcludedParentMenuName(roleAuth.yetkiTanim))
    .map((roleAuth) => normalizeRoleAuth(roleAuth, normalizedRoleId));

  return {
    siraNo: normalizedRoleId,
    roleAdi: String(values.roleAdi ?? "").trim(),
    roleKodu: String(values.roleKodu ?? "").trim(),
    yonetici: Boolean(values.yonetici),
    varsayilan: Boolean(values.varsayilan),
    durum: Boolean(values.durum),
    aciklama: String(values.aciklama ?? "").trim(),
    roleAuths: [...currentPermissions, ...preservedPermissions],
  };
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input, Select, Spin } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { GetRolesService } from "../../api/services/roles/services";

const StyledSelect = styled(Select)`
  width: 100%;

  @media (max-width: 600px) {
    max-width: 300px;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const ErrorText = styled.div`
  margin-top: 5px;
  color: #ff4d4f;
  font-size: 12px;
`;

const getRoleList = (response) => {
  const responseData = response?.data;

  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  if (Array.isArray(responseData?.list)) {
    return responseData.list;
  }

  return [];
};

const isEnabledFlag = (value) => value === true || value === 1 || value === "1" || String(value).toLocaleLowerCase() === "true";

const isDefaultRole = (role) => {
  const hasDefaultFlag = [role?.varsayilan, role?.varsayilanRol, role?.varsayilanMi, role?.isDefault, role?.defaultRole, role?.default].some(isEnabledFlag);
  const normalizedRoleName = String(role?.roleAdi ?? "").trim().toLocaleLowerCase("tr-TR");

  return hasDefaultFlag || normalizedRoleName === "varsayılan rol" || normalizedRoleName === "varsayilan rol";
};

const normalizeArrayValue = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  return value !== null && value !== undefined && value !== "" ? [value] : [];
};

export default function RoleSelectbox({ name1, isRequired = false, autoSelectDefault = false, onChange, inputWidth = "100%", dropdownWidth }) {
  const { t } = useTranslation();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const idFieldName = `${name1}ID`;
  const selectedRoleIds = normalizeArrayValue(useWatch({ control, name: idFieldName }));
  const selectedRoleNames = normalizeArrayValue(useWatch({ control, name: name1 }));
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const requestSequence = useRef(0);

  useEffect(
    () => () => {
      requestSequence.current += 1;
    },
    [],
  );

  const loadRoles = useCallback(async () => {
    const requestId = requestSequence.current + 1;
    requestSequence.current = requestId;
    setLoading(true);
    setLoadError(false);

    try {
      const response = await GetRolesService();
      const roleOptions = getRoleList(response)
        .filter((role) => role?.siraNo !== null && role?.siraNo !== undefined && role?.roleAdi)
        .map((role) => ({
          value: role.siraNo,
          label: role.roleAdi,
          isDefault: isDefaultRole(role),
        }));

      if (requestSequence.current !== requestId) {
        return;
      }

      setOptions(roleOptions);

      const currentRoleIds = normalizeArrayValue(getValues(idFieldName));
      const currentRoleNames = normalizeArrayValue(getValues(name1));

      if (currentRoleIds.length > 0 && currentRoleNames.length !== currentRoleIds.length) {
        const resolvedRoleNames = currentRoleIds.map((roleId, index) => {
          const selectedRole = roleOptions.find((role) => String(role.value) === String(roleId));
          return selectedRole?.label ?? currentRoleNames[index] ?? String(roleId);
        });
        setValue(name1, resolvedRoleNames, { shouldValidate: true });
      } else if (currentRoleIds.length === 0 && autoSelectDefault) {
        const defaultRole = roleOptions.find((role) => role.isDefault);
        if (defaultRole) {
          setValue(idFieldName, [defaultRole.value], { shouldValidate: true });
          setValue(name1, [defaultRole.label], { shouldValidate: true });
        }
      }
    } catch {
      if (requestSequence.current === requestId) {
        setOptions([]);
        setLoadError(true);
      }
    } finally {
      if (requestSequence.current === requestId) {
        setLoading(false);
      }
    }
  }, [autoSelectDefault, getValues, idFieldName, name1, setValue]);

  useEffect(() => {
    const hasSelectedRoles = selectedRoleIds.length > 0;
    const hasUnresolvedRoleNames = hasSelectedRoles && selectedRoleNames.length !== selectedRoleIds.length;
    if ((autoSelectDefault && !hasSelectedRoles) || hasUnresolvedRoleNames) {
      loadRoles();
    }
  }, [autoSelectDefault, loadRoles, selectedRoleIds.length, selectedRoleNames.length]);

  const selectedValue = selectedRoleIds.map((roleId, index) => {
    const selectedRole = options.find((role) => String(role.value) === String(roleId));
    return {
      value: roleId,
      label: selectedRole?.label ?? selectedRoleNames[index] ?? String(roleId),
    };
  });

  return (
    <SelectWrapper>
      <Controller
        name={name1}
        control={control}
        rules={{
          validate: () => {
            const roleIds = normalizeArrayValue(getValues(idFieldName));
            return !isRequired || roleIds.length > 0 || t("alanBosBirakilamaz");
          },
        }}
        render={({ field }) => (
          <StyledSelect
            ref={field.ref}
            name={field.name}
            value={selectedValue}
            mode="multiple"
            labelInValue
            showSearch
            allowClear
            loading={loading}
            status={errors[name1] ? "error" : ""}
            placeholder={t("secimYapin")}
            optionFilterProp="label"
            filterOption={(input, option) => String(option?.label ?? "").toLocaleLowerCase().includes(input.toLocaleLowerCase())}
            options={options}
            onBlur={field.onBlur}
            onDropdownVisibleChange={(open) => {
              if (open) {
                loadRoles();
              }
            }}
            onChange={(selectedOption, option) => {
              const selectedOptions = normalizeArrayValue(selectedOption);
              const roleIds = selectedOptions.map((role) => role.value);
              const roleNames = selectedOptions.map((role) => role.label);

              setValue(idFieldName, roleIds, { shouldDirty: true, shouldValidate: true });
              field.onChange(roleNames);

              if (onChange) {
                onChange(roleIds, option);
              }
            }}
            notFoundContent={loading ? <Spin size="small" /> : undefined}
            style={{ width: inputWidth }}
            dropdownStyle={{ width: dropdownWidth || "auto", minWidth: "180px" }}
            popupMatchSelectWidth={false}
          />
        )}
      />
      {errors[name1] && <ErrorText role="alert">{errors[name1].message}</ErrorText>}
      {!errors[name1] && loadError && <ErrorText role="alert">{t("rolListesiYuklenemedi")}</ErrorText>}
      <Controller
        name={idFieldName}
        control={control}
        render={({ field }) => <Input {...field} value={JSON.stringify(normalizeArrayValue(field.value))} type="hidden" />}
      />
    </SelectWrapper>
  );
}

RoleSelectbox.propTypes = {
  name1: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  autoSelectDefault: PropTypes.bool,
  onChange: PropTypes.func,
  inputWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dropdownWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

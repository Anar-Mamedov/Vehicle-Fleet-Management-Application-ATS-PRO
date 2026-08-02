import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CodeItemValidateService } from "../../../../api/services/code/services";

const ROLE_CODE_TABLE_NAME = "rol";
const ROLE_CODE_VALIDATION_DEBOUNCE_MS = 600;
const ROLE_CODE_UNIQUENESS_ERROR_TYPE = "roleCodeUniqueness";
const ROLE_CODE_VALIDATION_BORDER_COLORS = {
  duplicate: "#ff4d4f",
  unique: "#52c41a",
};

const normalizeRoleCode = (value) => String(value ?? "").trim();

export default function RoleCodeInput({ initialValue, open }) {
  const { t } = useTranslation();
  const {
    clearErrors,
    control,
    formState: { errors },
    getFieldState,
    trigger,
  } = useFormContext();
  const currentRoleCode = useWatch({ control, name: "roleKodu" });
  const initialRoleCode = normalizeRoleCode(initialValue);
  const validationRequestIdRef = useRef(0);
  const pendingValidationRef = useRef(null);
  const validationResultRef = useRef({ status: "idle", value: "" });
  const [validationStatus, setValidationStatus] = useState("idle");

  const clearUniquenessError = useCallback(() => {
    if (getFieldState("roleKodu").error?.type === ROLE_CODE_UNIQUENESS_ERROR_TYPE) {
      clearErrors("roleKodu");
    }
  }, [clearErrors, getFieldState]);

  const updateValidationStatus = useCallback(
    (status, roleCode) => {
      validationResultRef.current = { status, value: roleCode };
      setValidationStatus(status);

      if (status === "unique" || status === "idle") {
        clearUniquenessError();
      }
    },
    [clearUniquenessError]
  );

  const validateRoleCode = useCallback(
    (value) => {
      const roleCode = normalizeRoleCode(value);

      if (!roleCode || roleCode === initialRoleCode) {
        updateValidationStatus("idle", roleCode);
        return true;
      }

      const cachedResult = validationResultRef.current;
      if (cachedResult.value === roleCode && cachedResult.status === "unique") {
        return true;
      }

      if (cachedResult.value === roleCode && cachedResult.status === "duplicate") {
        return t("rolKoduZatenKullaniliyor");
      }

      if (pendingValidationRef.current?.value === roleCode) {
        return pendingValidationRef.current.promise;
      }

      const requestId = ++validationRequestIdRef.current;
      updateValidationStatus("checking", roleCode);

      const validationPromise = CodeItemValidateService({
        tableName: ROLE_CODE_TABLE_NAME,
        code: roleCode,
      })
        .then((response) => {
          if (requestId !== validationRequestIdRef.current) {
            return true;
          }

          if (response?.data?.status === false) {
            updateValidationStatus("unique", roleCode);
            return true;
          }

          if (response?.data?.status === true) {
            updateValidationStatus("duplicate", roleCode);
            return t("rolKoduZatenKullaniliyor");
          }

          throw new Error("UNEXPECTED_ROLE_CODE_VALIDATION_RESPONSE");
        })
        .catch(() => {
          if (requestId !== validationRequestIdRef.current) {
            return true;
          }

          updateValidationStatus("error", roleCode);
          return t("rolKoduBenzersizligiKontrolEdilemedi");
        })
        .finally(() => {
          if (pendingValidationRef.current?.promise === validationPromise) {
            pendingValidationRef.current = null;
          }
        });

      pendingValidationRef.current = { value: roleCode, promise: validationPromise };
      return validationPromise;
    },
    [initialRoleCode, t, updateValidationStatus]
  );

  useEffect(() => {
    if (!open) {
      validationRequestIdRef.current += 1;
      pendingValidationRef.current = null;
      return undefined;
    }

    const roleCode = normalizeRoleCode(currentRoleCode);
    validationRequestIdRef.current += 1;
    pendingValidationRef.current = null;
    clearUniquenessError();

    if (!roleCode || roleCode === initialRoleCode) {
      updateValidationStatus("idle", roleCode);
      return undefined;
    }

    updateValidationStatus("checking", roleCode);
    const validationTimer = window.setTimeout(() => {
      trigger("roleKodu");
    }, ROLE_CODE_VALIDATION_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(validationTimer);
    };
  }, [clearUniquenessError, currentRoleCode, initialRoleCode, open, trigger, updateValidationStatus]);

  useEffect(
    () => () => {
      validationRequestIdRef.current += 1;
      pendingValidationRef.current = null;
    },
    []
  );

  const validationMessage =
    errors.roleKodu?.message ??
    (validationStatus === "checking"
      ? t("rolKoduKontrolEdiliyor")
      : validationStatus === "unique"
        ? t("rolKoduBenzersiz")
        : validationStatus === "error"
          ? t("rolKoduBenzersizligiKontrolEdilemedi")
          : undefined);
  const validateStatus = errors.roleKodu ? "error" : validationStatus === "checking" ? "validating" : validationStatus === "unique" ? "success" : "";
  const validationBorderColor = ROLE_CODE_VALIDATION_BORDER_COLORS[validationStatus];
  const inputStyle = validationBorderColor ? { borderColor: validationBorderColor } : undefined;

  return (
    <Form.Item colon={false} help={validationMessage} label={t("rolKodu")} validateStatus={validateStatus}>
      <Controller
        name="roleKodu"
        control={control}
        rules={{
          required: t("rolKoduZorunlu"),
          validate: { [ROLE_CODE_UNIQUENESS_ERROR_TYPE]: validateRoleCode },
        }}
        render={({ field }) => (
          <Input
            {...field}
            aria-invalid={Boolean(errors.roleKodu) || validationStatus === "duplicate" || validationStatus === "error"}
            placeholder={t("rolKoduPlaceholder")}
            status={errors.roleKodu ? "error" : undefined}
            style={inputStyle}
          />
        )}
      />
    </Form.Item>
  );
}

RoleCodeInput.propTypes = {
  initialValue: PropTypes.string,
  open: PropTypes.bool.isRequired,
};

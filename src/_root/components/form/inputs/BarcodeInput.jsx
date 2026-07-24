import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BarcodeOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { t } from "i18next";
import JsBarcode from "jsbarcode";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { CodeItemValidateService } from "../../../../api/services/code/services";

const BARCODE_VALIDATION_DEBOUNCE_MS = 600;
const BARCODE_VALIDATION_ERROR_TYPE = "barcodeUniqueness";
const BARCODE_VALIDATION_MESSAGE_KEYS = {
  checking: "barkodBenzersizligiKontrolEdiliyor",
  duplicate: "barkodZatenKullaniliyor",
  error: "barkodBenzersizligiKontrolEdilemedi",
  unique: "barkodBenzersiz",
};
const BARCODE_VALIDATION_COLORS = {
  checking: "#faad14",
  duplicate: "#ff4d4f",
  error: "#faad14",
  unique: "#52c41a",
};
const BARCODE_INPUT_STATUSES = {
  checking: "warning",
  duplicate: "error",
  error: "warning",
};

const printPageStyle = `
  @page {
    size: 60mm 30mm;
    margin: 0;
  }

  html,
  body {
    width: 60mm !important;
    height: 30mm !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .barcode-print-area {
    position: static !important;
    inset: auto !important;
    display: flex !important;
    width: 60mm !important;
    height: 30mm !important;
    box-sizing: border-box;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background: #fff;
  }

  .barcode-print-area svg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
  }
`;

const createTimestampBarcodeValue = () => {
  const now = new Date();
  const dateParts = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];

  return dateParts.map((part, index) => String(part).padStart(index === 0 ? 4 : 2, "0")).join("");
};

const waitForNextSecond = () => {
  const delay = 1000 - (Date.now() % 1000) + 10;
  return new Promise((resolve) => window.setTimeout(resolve, delay));
};

const createUniqueBarcodeValue = async () => {
  while (true) {
    const barcodeValue = createTimestampBarcodeValue();
    const response = await CodeItemValidateService({
      tableName: "Barkod",
      code: barcodeValue,
    });

    if (response?.data?.status === false) {
      return barcodeValue;
    }

    if (response?.data?.status !== true) {
      throw new Error("Unexpected barcode uniqueness response");
    }

    await waitForNextSecond();
  }
};

const isMatchingExistingBarcode = (barcodeValue, existingBarcodeValue) => {
  return Boolean(existingBarcodeValue.trim()) && barcodeValue === existingBarcodeValue;
};

const getBarcodeFormValidationMessageKey = (value, initialBarcodeValue, validationResult) => {
  const barcodeValue = String(value ?? "");

  if (!barcodeValue.trim() || isMatchingExistingBarcode(barcodeValue, initialBarcodeValue)) {
    return null;
  }

  if (validationResult.value !== barcodeValue) {
    return BARCODE_VALIDATION_MESSAGE_KEYS.checking;
  }

  return validationResult.status === "unique" ? null : (BARCODE_VALIDATION_MESSAGE_KEYS[validationResult.status] ?? BARCODE_VALIDATION_MESSAGE_KEYS.checking);
};

const BarcodeInput = ({ name, onSave }) => {
  const { clearErrors, control, getFieldState, setError, setValue } = useFormContext();
  const currentBarcodeValue = useWatch({ control, name });
  const printAreaRef = useRef(null);
  const barcodeRef = useRef(null);
  const generationInProgressRef = useRef(false);
  const validationTimerRef = useRef(null);
  const validationRequestIdRef = useRef(0);
  const pendingValidationRef = useRef(null);
  const validationResultRef = useRef({ status: "idle", value: "" });
  const initialBarcodeValueRef = useRef("");
  const hasUserEditedRef = useRef(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [barcodeValidationStatus, setBarcodeValidationStatus] = useState("idle");

  useEffect(() => {
    if (!hasUserEditedRef.current) {
      initialBarcodeValueRef.current = String(currentBarcodeValue ?? "");
    }
  }, [currentBarcodeValue]);

  useEffect(
    () => () => {
      if (validationTimerRef.current) {
        window.clearTimeout(validationTimerRef.current);
      }
      validationRequestIdRef.current += 1;
      pendingValidationRef.current = null;

      if (getFieldState(name).error?.type === BARCODE_VALIDATION_ERROR_TYPE) {
        clearErrors(name);
      }
    },
    [clearErrors, getFieldState, name]
  );

  const printBarcode = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: t("barkodNo"),
    pageStyle: printPageStyle,
    onPrintError: () => message.error(t("barkodOlusturulamadi")),
  });

  const generateAndPrintBarcode = (barcodeValue) => {
    JsBarcode(barcodeRef.current, barcodeValue, {
      format: "CODE128",
      width: 2,
      height: 72,
      displayValue: true,
      fontSize: 18,
      margin: 12,
    });
    printBarcode();
  };

  const clearValidationTimer = () => {
    if (validationTimerRef.current) {
      window.clearTimeout(validationTimerRef.current);
      validationTimerRef.current = null;
    }
  };

  const clearBarcodeValidationError = () => {
    if (getFieldState(name).error?.type === BARCODE_VALIDATION_ERROR_TYPE) {
      clearErrors(name);
    }
  };

  const updateBarcodeValidationStatus = (status, barcodeValue) => {
    validationResultRef.current = { status, value: barcodeValue };
    setBarcodeValidationStatus(status);

    if (status === "unique" || status === "idle") {
      clearBarcodeValidationError();
      return;
    }

    const messageKey = BARCODE_VALIDATION_MESSAGE_KEYS[status] ?? BARCODE_VALIDATION_MESSAGE_KEYS.error;

    setError(name, {
      type: BARCODE_VALIDATION_ERROR_TYPE,
      message: t(messageKey),
    });
  };

  const validateManualBarcode = (barcodeValue) => {
    const cachedResult = validationResultRef.current;
    if (cachedResult.value === barcodeValue && (cachedResult.status === "unique" || cachedResult.status === "duplicate")) {
      return Promise.resolve(cachedResult.status);
    }

    if (pendingValidationRef.current?.value === barcodeValue) {
      return pendingValidationRef.current.promise;
    }

    const requestId = ++validationRequestIdRef.current;
    updateBarcodeValidationStatus("checking", barcodeValue);

    const validationPromise = (async () => {
      try {
        const response = await CodeItemValidateService({
          tableName: "Barkod",
          code: barcodeValue,
        });

        if (requestId !== validationRequestIdRef.current) {
          return "stale";
        }

        if (response?.data?.status === false) {
          updateBarcodeValidationStatus("unique", barcodeValue);
          return "unique";
        }

        if (response?.data?.status === true) {
          updateBarcodeValidationStatus("duplicate", barcodeValue);
          return "duplicate";
        }

        throw new Error("Unexpected barcode uniqueness response");
      } catch {
        if (requestId !== validationRequestIdRef.current) {
          return "stale";
        }

        updateBarcodeValidationStatus("error", barcodeValue);
        return "error";
      }
    })();

    pendingValidationRef.current = { value: barcodeValue, promise: validationPromise };

    return validationPromise.finally(() => {
      if (pendingValidationRef.current?.promise === validationPromise) {
        pendingValidationRef.current = null;
      }
    });
  };

  const handleBarcodeChange = (event, field) => {
    const barcodeValue = event.target.value;
    hasUserEditedRef.current = true;
    field.onChange(barcodeValue);

    clearValidationTimer();
    validationRequestIdRef.current += 1;
    pendingValidationRef.current = null;

    if (!barcodeValue.trim()) {
      updateBarcodeValidationStatus("idle", "");
      return;
    }

    if (isMatchingExistingBarcode(barcodeValue, initialBarcodeValueRef.current)) {
      updateBarcodeValidationStatus("unique", barcodeValue);
      return;
    }

    updateBarcodeValidationStatus("checking", barcodeValue);
    validationTimerRef.current = window.setTimeout(() => {
      validationTimerRef.current = null;
      void validateManualBarcode(barcodeValue);
    }, BARCODE_VALIDATION_DEBOUNCE_MS);
  };

  const ensureManualBarcodeIsUnique = async (barcodeValue) => {
    clearValidationTimer();

    if (isMatchingExistingBarcode(barcodeValue, initialBarcodeValueRef.current)) {
      updateBarcodeValidationStatus("unique", barcodeValue);
      return "unique";
    }

    return await validateManualBarcode(barcodeValue);
  };

  const validateBarcodeForForm = (value) => {
    const messageKey = getBarcodeFormValidationMessageKey(value, initialBarcodeValueRef.current, validationResultRef.current);
    return messageKey ? t(messageKey) : true;
  };

  const handleBarcodeSaveFailure = (isAutomaticallyGenerated) => {
    if (isAutomaticallyGenerated) {
      setValue(name, "", { shouldDirty: true, shouldValidate: true });
      updateBarcodeValidationStatus("idle", "");
    }

    message.error(t("barkodKaydedilemedi"));
  };

  const handleGenerateAndPrint = async (value) => {
    const enteredBarcodeValue = String(value ?? "");

    if (generationInProgressRef.current) {
      return;
    }

    generationInProgressRef.current = true;
    setIsGenerating(true);

    try {
      const isAutomaticallyGenerated = !enteredBarcodeValue.trim();
      const barcodeValue = isAutomaticallyGenerated ? await createUniqueBarcodeValue() : enteredBarcodeValue;

      if (isAutomaticallyGenerated) {
        setValue(name, barcodeValue, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        updateBarcodeValidationStatus("unique", barcodeValue);
      } else {
        const validationResult = await ensureManualBarcodeIsUnique(barcodeValue);
        if (validationResult !== "unique") {
          const messageKey = BARCODE_VALIDATION_MESSAGE_KEYS[validationResult] ?? BARCODE_VALIDATION_MESSAGE_KEYS.error;
          message.error(t(messageKey));
          return;
        }
      }

      if (onSave) {
        const isSaved = await onSave(barcodeValue);
        if (!isSaved) {
          handleBarcodeSaveFailure(isAutomaticallyGenerated);
          return;
        }
      }

      initialBarcodeValueRef.current = barcodeValue;
      hasUserEditedRef.current = false;
      generateAndPrintBarcode(barcodeValue);
    } catch {
      message.error(t("barkodOlusturulamadi"));
    } finally {
      generationInProgressRef.current = false;
      setIsGenerating(false);
    }
  };

  const validationMessageKey = BARCODE_VALIDATION_MESSAGE_KEYS[barcodeValidationStatus] ?? null;
  const validationColor = BARCODE_VALIDATION_COLORS[barcodeValidationStatus] ?? BARCODE_VALIDATION_COLORS.checking;
  const inputStatus = BARCODE_INPUT_STATUSES[barcodeValidationStatus];
  const inputStyle =
    barcodeValidationStatus === "unique" || barcodeValidationStatus === "duplicate"
      ? {
          borderColor: validationColor,
        }
      : undefined;

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ validate: validateBarcodeForForm }}
        render={({ field }) => (
          <Input
            {...field}
            status={inputStatus}
            style={inputStyle}
            aria-invalid={barcodeValidationStatus === "duplicate" || barcodeValidationStatus === "error"}
            onChange={(event) => handleBarcodeChange(event, field)}
            suffix={
              <Button
                type="text"
                htmlType="button"
                size="small"
                icon={<BarcodeOutlined />}
                loading={isGenerating}
                title={t("barkodOlusturVeYazdir")}
                aria-label={t("barkodOlusturVeYazdir")}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleGenerateAndPrint(field.value)}
                style={{ width: 24, height: 24, padding: 0 }}
              />
            }
          />
        )}
      />
      {validationMessageKey && (
        <div role={barcodeValidationStatus === "duplicate" ? "alert" : "status"} style={{ color: validationColor, marginTop: 5 }}>
          {t(validationMessageKey)}
        </div>
      )}
      <div ref={printAreaRef} className="barcode-print-area" aria-hidden="true" style={{ position: "fixed", top: 0, left: "-10000px", pointerEvents: "none", background: "#fff" }}>
        <svg ref={barcodeRef} />
      </div>
    </>
  );
};

BarcodeInput.propTypes = {
  name: PropTypes.string.isRequired,
  onSave: PropTypes.func,
};

export default BarcodeInput;

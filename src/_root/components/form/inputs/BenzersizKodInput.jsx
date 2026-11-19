import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "antd";
import { t } from "i18next";
import { CodeItemValidateService } from "../../../../api/services/code/services";

// Numaratörden gelen veya elle girilen numaranın verilen benzersizlik grubunda (tableName, ör. "isEmriServisNo")
// kullanılmadığını TableCodeItem/IsCodeItemExist ile denetler.
// Kontrol alandan çıkılınca ve kayıtta (react-hook-form validate) yapılır; kullanılan numarayla form kaydedilemez.
// Güncellemede kaydın mevcut numarası initialValue ile verilir; numara değişmediyse servis çağrılmaz.
const BenzersizKodInput = ({ name, tableName, initialValue = null, required = false, disabled = false, placeholder = "", maxLength, style }) => {
  const { control, trigger } = useFormContext();
  // validate her zaman güncel kayıtlı numarayı görsün diye ref üzerinden okunur
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  const validateBenzersizlik = async (value) => {
    const kod = String(value ?? "").trim();
    if (!kod || kod === String(initialValueRef.current ?? "").trim()) return true;

    try {
      const response = await CodeItemValidateService({ tableName, code: kod });
      return response?.data?.status ? t("buNumaraKullaniliyor") : true;
    } catch {
      return t("numaraBenzersizligiKontrolEdilemedi");
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? t("alanBosBirakilamaz") : false, validate: validateBenzersizlik }}
      render={({ field, fieldState }) => (
        <div className="flex flex-col" style={{ gap: "4px", width: "100%" }}>
          <Input
            {...field}
            value={field.value ?? ""}
            maxLength={maxLength}
            placeholder={placeholder}
            disabled={disabled}
            status={fieldState.error ? "error" : ""}
            style={style}
            onChange={(e) => field.onChange(e.target.value || null)}
            onBlur={() => {
              field.onBlur();
              trigger(name);
            }}
          />
          {fieldState.error && <span style={{ color: "#ff4d4f", fontSize: "12px" }}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};

BenzersizKodInput.propTypes = {
  name: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  style: PropTypes.object,
};

export default BenzersizKodInput;

import React, { useState, useEffect, useCallback, memo } from "react";
import { DatePicker, Button } from "antd";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Lokasyon from "./Lokasyon";
import PlakaSelect from "./PlakaSelect";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import locale from "antd/es/date-picker/locale/tr_TR";

dayjs.locale("tr");

// Wrap the main function in React.memo to prevent unnecessary re-renders
const Filters = memo(function Filters({ filtersLabel, onSubmit }) {
  const [lokasyonID1, setLokasyonID1] = useState("");
  const [filterValues, setFilterValues] = useState({
    LokasyonID: "",
    plakaID: "",
    BaslamaTarih: null,
    BitisTarih: null,
  });

  const methods = useForm({
    defaultValues: {
      Lokasyon: "",
      LokasyonID: "",
      plaka: "",
      plakaID: "",
      BaslamaTarih: null,
      BitisTarih: null,
      // ... Tüm default değerleriniz
    },
  });

  const { setValue, reset, watch, control } = methods;

  useEffect(() => {
    // Don't update values if filtersLabel is empty
    if (!filtersLabel || Object.keys(filtersLabel).length === 0) return;

    console.log("Filters.jsx - Setting form values from filtersLabel:", filtersLabel);

    setValue("lokasyon", filtersLabel.LokasyonName);
    setValue("lokasyonID", filtersLabel.LokasyonID);
    setValue("plaka", filtersLabel.plakaName);
    setValue("plakaID", filtersLabel.plakaID);
    setValue("startDate", filtersLabel.BaslamaTarih ? dayjs(filtersLabel.BaslamaTarih) : null);
    setValue("endDate", filtersLabel.BitisTarih ? dayjs(filtersLabel.BitisTarih) : null);
  }, [filtersLabel, setValue]);

  const lokasyonID = watch("lokasyonID");
  const plakaID = watch("plakaID");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Memoize the filter values update to prevent unnecessary rerenders
  useEffect(() => {
    const newFilterValues = { ...filterValues };
    let hasChanges = false;

    if (lokasyonID) {
      const newLokasyonID = Array.isArray(lokasyonID) ? lokasyonID.join(",") : lokasyonID;
      if (newFilterValues.LokasyonID !== newLokasyonID) {
        newFilterValues.LokasyonID = newLokasyonID;
        hasChanges = true;
      }
    }

    if (plakaID) {
      const newPlakaID = Array.isArray(plakaID) ? plakaID.join(",") : plakaID;
      if (newFilterValues.plakaID !== newPlakaID) {
        newFilterValues.plakaID = newPlakaID;
        hasChanges = true;
      }
    }

    if (startDate) {
      const newStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DD") : null;
      if (newFilterValues.BaslamaTarih !== newStartDate) {
        newFilterValues.BaslamaTarih = newStartDate;
        hasChanges = true;
      }
    }

    if (endDate) {
      const newEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : null;
      if (newFilterValues.BitisTarih !== newEndDate) {
        newFilterValues.BitisTarih = newEndDate;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      setFilterValues(newFilterValues);
    }
  }, [lokasyonID, plakaID, startDate, endDate]);

  // Memoize the handleSubmit function
  const handleSubmit = useCallback(() => {
    // Form'dan güncel değerleri al
    const currentFormValues = methods.getValues();

    // Güncel filtre değerlerini oluştur
    const formValues = {
      LokasyonID: Array.isArray(currentFormValues.lokasyonID) ? currentFormValues.lokasyonID.join(",") : currentFormValues.lokasyonID || "",
      plakaID: Array.isArray(currentFormValues.plakaID) ? currentFormValues.plakaID.join(",") : currentFormValues.plakaID || "",
      BaslamaTarih: currentFormValues.startDate ? dayjs(currentFormValues.startDate).format("YYYY-MM-DD") : null,
      BitisTarih: currentFormValues.endDate ? dayjs(currentFormValues.endDate).format("YYYY-MM-DD") : null,
      // Form'dan seçilen metin değerlerini de ekliyoruz
      LokasyonName: currentFormValues.lokasyon || "",
      plakaName: currentFormValues.plaka || "",
    };

    console.log("Filters.jsx - Submitting form values:", formValues);
    console.log("Filters.jsx - Current form values:", currentFormValues);
    console.log("Filters.jsx - Previous filterValues state:", filterValues);

    // FilterValues state'ini de güncelle
    setFilterValues(formValues);

    onSubmit?.(formValues);
  }, [methods, onSubmit, filterValues]);

  return (
    <FormProvider {...methods}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Lokasyon filtersLabel={filtersLabel} />
        <PlakaSelect filtersLabel={filtersLabel} />
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              filtersLabel={filtersLabel}
              placeholder="Başlangıç Tarihi"
              onChange={(date) => {
                field.onChange(date);
                setFilterValues((prev) => ({
                  ...prev,
                  BaslamaTarih: date ? dayjs(date).format("YYYY-MM-DD") : null,
                }));
              }}
              format="DD.MM.YYYY"
              locale={locale}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              filtersLabel={filtersLabel}
              placeholder="Bitiş Tarihi"
              onChange={(date) => {
                field.onChange(date);
                setFilterValues((prev) => ({
                  ...prev,
                  BitisTarih: date ? dayjs(date).format("YYYY-MM-DD") : null,
                }));
              }}
              format="DD.MM.YYYY"
              locale={locale}
            />
          )}
        />
        <Button type="primary" onClick={handleSubmit}>
          Sorgula
        </Button>
      </div>
    </FormProvider>
  );
});

export default Filters;

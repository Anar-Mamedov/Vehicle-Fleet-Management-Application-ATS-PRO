import React from "react";
import PropTypes from "prop-types";
import CustomFilter from "./custom-filter/CustomFilter";
import LokasyonTable from "../../../../../components/LokasyonTable";
import ZamanAraligi from "./ZamanAraligi";
import { useFormContext } from "react-hook-form";
import KodIDSelectbox from "../../../../../components/KodIDSelectbox";
import ServisKoduTablo from "../../../../../components/ServisKoduTablo";
import dayjs from "dayjs";
import { t } from "i18next";

export default function Filters({ onChange, onApply }) {
  const { watch } = useFormContext();
  const [lokasyonIds, setLokasyonIds] = React.useState([]);
  const [servisNedeniIds, setServisNedeniIds] = React.useState([]);
  const [servisTanimIds, setServisTanimIds] = React.useState([]);
  const [filters, setFilters] = React.useState({
    lokasyonlar: {},
    isemritipleri: {},
    durumlar: {},
    customfilter: {},
  });

  // Watch form dates from ZamanAraligi and mirror into customfilter so Search button includes them
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Marka ve model seçimleri değiştiğinde customfilter içine yansıt
  React.useEffect(() => {
    setFilters((state) => ({
      ...state,
      customfilter: {
        ...(state.customfilter || {}),
        lokasyonIds: Array.isArray(lokasyonIds) ? lokasyonIds.map((item) => (typeof item === "object" && item !== null ? item.locationId : item)) : [],
        servisNedeniIds: Array.isArray(servisNedeniIds) ? servisNedeniIds : [],
        servisTanimIds: Array.isArray(servisTanimIds)
          ? servisTanimIds.map((item) => {
              if (typeof item === "object" && item !== null) {
                if (item.bakimId != null) return item.bakimId;
                if (item.key != null) return item.key;
              }
              return item;
            })
          : [],
      },
    }));
  }, [lokasyonIds, servisNedeniIds, servisTanimIds]);

  // Mirror date range into customfilter without triggering API (API is triggered only by Search button)
  React.useEffect(() => {
    setFilters((state) => {
      const next = { ...state };
      const cf = { ...(next.customfilter || {}) };
      if (startDate) {
        cf.baslangicTarih = dayjs(startDate).format("YYYY-MM-DD");
      } else {
        delete cf.baslangicTarih;
      }
      if (endDate) {
        cf.bitisTarih = dayjs(endDate).format("YYYY-MM-DD");
      } else {
        delete cf.bitisTarih;
      }
      next.customfilter = cf;
      return next;
    });
  }, [startDate, endDate]);

  React.useEffect(() => {
    onChange("filters", filters);
  }, [filters, onChange]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <ZamanAraligi />
      <LokasyonTable fieldName="lokasyonIds" multiSelect={true} onSubmit={setLokasyonIds} style={{ width: "150px" }} />
      <ServisKoduTablo fieldName="servisTanimIds" multiSelect={true} onSubmit={setServisTanimIds} style={{ width: "150px" }} />
      <div style={{ width: "150px" }}>
        <KodIDSelectbox
          name1={"servisNedeniIds"}
          isRequired={false}
          onChange={setServisNedeniIds}
          placeholder={t("servisNedeni")}
          dropdownWidth="300px"
          inputWidth="150px"
          multiSelect={true}
          kodID="104"
        />
      </div>
      {/*<TypeFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, isemritipleri: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}
      {/*<ConditionFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, durumlar: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}
      {/*<LocationFilter*/}
      {/*  onSubmit={(newFilters) =>*/}
      {/*    setFilters((state) => ({ ...state, lokasyonlar: newFilters }))*/}
      {/*  }*/}
      {/*/>*/}

      <CustomFilter
        onSubmit={(newFilters) => {
          setFilters((state) => {
            const isEmpty = !newFilters || Object.keys(newFilters).length === 0;
            const nextCustomfilter = isEmpty
              ? {
                  lokasyonIds: Array.isArray(lokasyonIds) ? lokasyonIds.map((item) => (typeof item === "object" && item !== null ? item.locationId : item)) : [],
                  servisNedeniIds: Array.isArray(servisNedeniIds) ? servisNedeniIds : [],
                  servisTanimIds: Array.isArray(servisTanimIds)
                    ? servisTanimIds.map((item) => {
                        if (typeof item === "object" && item !== null) {
                          if (item.bakimId != null) return item.bakimId;
                          if (item.key != null) return item.key;
                        }
                        return item;
                      })
                    : [],
                }
              : { ...(state.customfilter || {}), ...newFilters };

            const updated = { ...state, customfilter: nextCustomfilter };
            onChange("filters", updated);
            if (onApply) onApply(nextCustomfilter);
            return updated;
          });
        }}
      />
    </div>
  );
}

Filters.propTypes = {
  onChange: PropTypes.func.isRequired,
  onApply: PropTypes.func,
};

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
  const [malzemeTipKodIds, setMalzemeTipKodIds] = React.useState([]);
  const [islemTipiKodIds, setIslemTipiKodIds] = React.useState([]);
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
        malzemeTipKodIds: Array.isArray(malzemeTipKodIds) ? malzemeTipKodIds : [],
        islemTipiKodIds: Array.isArray(islemTipiKodIds) ? islemTipiKodIds : [],
      },
    }));
  }, [lokasyonIds, malzemeTipKodIds, islemTipiKodIds]);

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
      <div style={{ width: "150px" }}>
        <KodIDSelectbox
          name1={"malzemeTipKodIds"}
          isRequired={false}
          onChange={setMalzemeTipKodIds}
          placeholder={t("malzemeTipiSeciniz")}
          dropdownWidth="300px"
          inputWidth="150px"
          multiSelect={true}
          kodID="301"
        />
      </div>
      <div style={{ width: "150px" }}>
        <KodIDSelectbox
          name1={"islemTipiKodIds"}
          isRequired={false}
          onChange={setIslemTipiKodIds}
          placeholder={t("islemTipiSeciniz")}
          dropdownWidth="300px"
          inputWidth="150px"
          multiSelect={true}
          kodID="302"
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
                  malzemeTipKodIds: Array.isArray(malzemeTipKodIds) ? malzemeTipKodIds : [],
                  islemTipiKodIds: Array.isArray(islemTipiKodIds) ? islemTipiKodIds : [],
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

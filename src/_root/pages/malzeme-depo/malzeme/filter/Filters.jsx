import React from "react";
import PropTypes from "prop-types";
import CustomFilter from "./custom-filter/CustomFilter";
import ZamanAraligi from "./ZamanAraligi";
import { useFormContext } from "react-hook-form";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import ServisKoduTablo from "../../../../components/ServisKoduTablo";
import FirmaSelectBox from "../../../../components/FirmaSelectBox";
import dayjs from "dayjs";
import { t } from "i18next";

export default function Filters({ onChange, onApply }) {
  const { watch } = useFormContext();
  const [malzemeTipKodIds, setMalzemeTipKodIds] = React.useState([]);
  const [firmaIds, setFirmaIds] = React.useState([]);
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
        malzemeTipKodIds: Array.isArray(malzemeTipKodIds) ? malzemeTipKodIds : [],
        firmaIds: Array.isArray(firmaIds) ? firmaIds : [],
      },
    }));
  }, [malzemeTipKodIds, firmaIds]);

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
      {/* <ZamanAraligi /> */}
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
        <FirmaSelectBox name1={"firmaId"} isRequired={false} onChange={setFirmaIds} multiSelect={true} />
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
                  malzemeTipKodIds: Array.isArray(malzemeTipKodIds) ? malzemeTipKodIds : [],
                  firmaIds: Array.isArray(firmaIds) ? firmaIds : [],
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

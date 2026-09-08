import React, { useState } from "react";
import { Button, Card, ConfigProvider, DatePicker, Select, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import PropTypes from "prop-types";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import { formatDateForApi } from "../../../../../utils/dateUtils";
import { HAREKET_TIP_KOD_ID, OPERASYON_TIP_KOD_ID, OPERASYON_YERI_KOD_ID, VARDIYA_KOD_ID, colors, emptyFilters } from "../utils/constants";

dayjs.locale("tr");

const { RangePicker } = DatePicker;
const { Text } = Typography;

// Kod listesi olmayan çoklu seçimlerin servis ve alan eşleşmeleri
const SELECT_SOURCES = {
  firmaIds: { url: "Company/GetCompanyListForSelectInput", valueKey: "firmaId", labelKey: "unvan" },
  guzergahIds: { url: "FuelRoute/GetFuelRouteListForSelectInput", valueKey: "guzergahId", labelKey: "guzergah" },
  surucuIds: { url: "Driver/GetDriverListForSelectInput", valueKey: "surucuId", labelKey: "isim" },
  personelIds: { url: "Employee/GetEmployeeListForSelectBox", valueKey: "personelId", labelKey: "isim" },
};

const FIELD_WIDTH = 150;

export const getDefaultDateRange = () => [dayjs().startOf("month"), dayjs().endOf("month")];

// Tarih aralığı ve tüm çoklu seçimler tek bir istek gövdesine dönüştürülür
export const buildAnalysisBody = (filters, dateRange) => {
  const [start, end] = dateRange || [];

  return {
    ...filters,
    baslangicTarih: formatDateForApi(start),
    bitisTarih: formatDateForApi(end),
  };
};

function FiltreAlani({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        {label}
      </Text>
      {children}
    </div>
  );
}

FiltreAlani.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function CokluSecim({ field, value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url, valueKey, labelKey } = SELECT_SOURCES[field];

  const fetchOptions = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(url);
      const list = Array.isArray(response?.data) ? response.data : [];
      setOptions(list.map((item) => ({ value: item[valueKey], label: item[labelKey] })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      mode="multiple"
      allowClear
      showSearch
      maxTagCount="responsive"
      loading={loading}
      value={value}
      options={options}
      optionFilterProp="label"
      placeholder={t("tumu")}
      onChange={(nextValue) => onChange(nextValue || [])}
      onDropdownVisibleChange={(open) => {
        if (open && !options.length) {
          fetchOptions();
        }
      }}
      style={{ width: FIELD_WIDTH }}
      dropdownStyle={{ width: 280 }}
      popupMatchSelectWidth={false}
    />
  );
}

CokluSecim.propTypes = {
  field: PropTypes.oneOf(Object.keys(SELECT_SOURCES)).isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function OperasyonAnaliziFiltreleri({ loading, onApply }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [dateRange, setDateRange] = useState(getDefaultDateRange);

  const updateFilter = (field, value) => setFilters((state) => ({ ...state, [field]: value }));

  // Filtreler yalnızca Uygula düğmesine basıldığında istek olarak gönderilir
  const handleApply = () => onApply(filters, dateRange);

  const kodFiltreleri = [
    { field: "operasyonTipIds", label: t("operasyonTipi"), name1: "operasyonAnaliziOperasyonTip", kodID: OPERASYON_TIP_KOD_ID },
    { field: "hareketTipIds", label: t("hareketTipi"), name1: "operasyonAnaliziHareketTip", kodID: HAREKET_TIP_KOD_ID },
    { field: "operasyonYeriIds", label: t("operasyonYeri"), name1: "operasyonAnaliziOperasyonYeri", kodID: OPERASYON_YERI_KOD_ID },
    { field: "vardiyaIds", label: t("vardiya"), name1: "operasyonAnaliziVardiya", kodID: VARDIYA_KOD_ID },
  ];

  return (
    <Card bordered={false} style={{ borderRadius: 12, border: `1px solid ${colors.cardBorder}` }} styles={{ body: { padding: 16 } }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 12 }}>
        <FiltreAlani label={t("tarih")}>
          <ConfigProvider locale={tr_TR}>
            <RangePicker value={dateRange} onChange={(dates) => setDateRange(dates)} locale={dayjs.locale("tr")} format="DD.MM.YYYY" allowClear style={{ width: 230 }} />
          </ConfigProvider>
        </FiltreAlani>

        <FiltreAlani label={t("firma")}>
          <CokluSecim field="firmaIds" value={filters.firmaIds} onChange={(value) => updateFilter("firmaIds", value)} />
        </FiltreAlani>

        {kodFiltreleri.slice(0, 2).map((item) => (
          <FiltreAlani key={item.field} label={item.label}>
            <KodIDSelectbox name1={item.name1} kodID={item.kodID} addHide multiSelect isRequired={false} placeholder={t("tumu")} onChange={(value) => updateFilter(item.field, value || [])} inputWidth={`${FIELD_WIDTH}px`} dropdownWidth="280px" />
          </FiltreAlani>
        ))}

        <FiltreAlani label={t("guzergah")}>
          <CokluSecim field="guzergahIds" value={filters.guzergahIds} onChange={(value) => updateFilter("guzergahIds", value)} />
        </FiltreAlani>

        {kodFiltreleri.slice(2).map((item) => (
          <FiltreAlani key={item.field} label={item.label}>
            <KodIDSelectbox name1={item.name1} kodID={item.kodID} addHide multiSelect isRequired={false} placeholder={t("tumu")} onChange={(value) => updateFilter(item.field, value || [])} inputWidth={`${FIELD_WIDTH}px`} dropdownWidth="280px" />
          </FiltreAlani>
        ))}

        <FiltreAlani label={t("surucu")}>
          <CokluSecim field="surucuIds" value={filters.surucuIds} onChange={(value) => updateFilter("surucuIds", value)} />
        </FiltreAlani>

        <FiltreAlani label={t("personelTekil")}>
          <CokluSecim field="personelIds" value={filters.personelIds} onChange={(value) => updateFilter("personelIds", value)} />
        </FiltreAlani>

        <Button type="primary" loading={loading} onClick={handleApply} style={{ background: colors.navy, borderColor: colors.navy }}>
          {t("uygula")}
        </Button>
      </div>
    </Card>
  );
}

OperasyonAnaliziFiltreleri.propTypes = {
  loading: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
};

import React, { useState } from "react";
import { Badge, Button, Card, ConfigProvider, DatePicker, Drawer, Select, Typography, message } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import PropTypes from "prop-types";
import { t } from "i18next";
import AxiosInstance from "../../../../../api/http";
import KodIDSelectbox from "../../../../components/KodIDSelectbox";
import LokasyonTable from "../../../../components/LokasyonTable";
import PlakaSelectbox from "../../../../components/PlakaSelectbox";
import { formatDateForApi } from "../../../../../utils/dateUtils";
import { HAREKET_TIP_KOD_ID, MAX_DATE_RANGE_YEARS, OPERASYON_TIP_KOD_ID, OPERASYON_YERI_KOD_ID, VARDIYA_KOD_ID, colors, emptyFilters } from "../utils/constants";

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

// Filtre çubuğunda görünmeyip "Filtreler" panelinde toplanan alanlar
const DRAWER_FILTER_FIELDS = ["lokasyonIds", "hareketTipIds", "operasyonYeriIds", "vardiyaIds", "surucuIds", "personelIds"];

const FIELD_WIDTH = 150;
const DRAWER_FIELD_WIDTH = "100%";

export const CUSTOM_PERIOD = "ozelAralik";

// Hazır süre seçenekleri; hepsi 1 yıllık servis sınırının içinde kalır
export const PERIOD_OPTIONS = ["buHafta", "buAy", "son3Ay", "son6Ay", "buYil", CUSTOM_PERIOD];

export const DEFAULT_PERIOD = "buYil";

export const getRangeByPeriod = (period) => {
  const today = dayjs();

  switch (period) {
    case "buHafta":
      return [today.startOf("week"), today];
    case "buAy":
      return [today.startOf("month"), today];
    case "son3Ay":
      return [today.subtract(3, "month"), today];
    case "son6Ay":
      return [today.subtract(6, "month"), today];
    // "Bu Yıl" diğer modüllerdeki gibi takvim yılının tamamıdır; bitiş bugünle sınırlanmaz, aylık trend 12 ayı gösterir
    default:
      return [today.startOf("year"), today.endOf("year")];
  }
};

export const getDefaultDateRange = () => getRangeByPeriod(DEFAULT_PERIOD);

// Servis 1 yıldan uzun aralığı 403 ile reddettiği için istek gönderilmeden önce kontrol edilir
export const isDateRangeValid = (dateRange) => {
  const [start, end] = dateRange || [];

  if (!start || !end) {
    return false;
  }

  return !end.isAfter(start.add(MAX_DATE_RANGE_YEARS, "year"));
};

// Tarih aralığı ve tüm çoklu seçimler tek bir istek gövdesine dönüştürülür
export const buildAnalysisBody = (filters, dateRange) => {
  const [start, end] = dateRange || [];

  return {
    ...filters,
    baslangicTarih: formatDateForApi(start),
    bitisTarih: formatDateForApi(end),
  };
};

// Aylık trend widget'ı kendi yılını seçtiğinde o yılın ilk ve son günü gönderilir
export const buildYearBody = (body, yil) => {
  const yilBasi = dayjs().year(yil).startOf("year");

  return {
    ...body,
    baslangicTarih: formatDateForApi(yilBasi),
    bitisTarih: formatDateForApi(yilBasi.endOf("year")),
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

function CokluSecim({ field, value, onChange, width }) {
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
      style={{ width }}
      dropdownStyle={{ width: 280 }}
      popupMatchSelectWidth={false}
    />
  );
}

CokluSecim.propTypes = {
  field: PropTypes.oneOf(Object.keys(SELECT_SOURCES)).isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default function OperasyonAnaliziFiltreleri({ loading, onApply }) {
  const [filters, setFilters] = useState(emptyFilters);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [dateRange, setDateRange] = useState(getDefaultDateRange);
  const [calendarDates, setCalendarDates] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const updateFilter = (field, value) => setFilters((state) => ({ ...state, [field]: value }));

  // LokasyonTable seçili lokasyon nesnelerini gönderir, temizlendiğinde null döner
  const handleLokasyonChange = (secilenler) => updateFilter("lokasyonIds", Array.isArray(secilenler) ? secilenler.map((item) => item.locationId).filter(Boolean) : []);

  const handlePeriodChange = (nextPeriod) => {
    setPeriod(nextPeriod);
    if (nextPeriod !== CUSTOM_PERIOD) {
      setDateRange(getRangeByPeriod(nextPeriod));
    }
  };

  // Özel aralıkta takvim, seçilen ilk tarihten itibaren 1 yıllık pencereyi aşan günleri kapatır
  const disabledDate = (current) => {
    if (!current || !calendarDates) {
      return false;
    }

    const [start, end] = calendarDates;
    const tooLate = start && current.isAfter(start.add(MAX_DATE_RANGE_YEARS, "year"));
    const tooEarly = end && current.isBefore(end.subtract(MAX_DATE_RANGE_YEARS, "year"));

    return Boolean(tooLate || tooEarly);
  };

  // Filtreler yalnızca Uygula düğmesine basıldığında istek olarak gönderilir
  const handleApply = () => {
    if (!isDateRangeValid(dateRange)) {
      message.warning(t("tarihAraligiEnFazlaBirYil"));
      return;
    }

    onApply(filters, dateRange);
  };

  const drawerFilterCount = DRAWER_FILTER_FIELDS.reduce((total, field) => total + filters[field].length, 0);

  const kodFiltreleri = [
    { field: "hareketTipIds", label: t("hareketTipi"), name1: "operasyonAnaliziHareketTip", kodID: HAREKET_TIP_KOD_ID },
    { field: "operasyonYeriIds", label: t("operasyonYeri"), name1: "operasyonAnaliziOperasyonYeri", kodID: OPERASYON_YERI_KOD_ID },
    { field: "vardiyaIds", label: t("vardiya"), name1: "operasyonAnaliziVardiya", kodID: VARDIYA_KOD_ID },
  ];

  return (
    <Card bordered={false} style={{ borderRadius: 12, border: `1px solid ${colors.cardBorder}` }} styles={{ body: { padding: 16 } }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 12 }}>
        <FiltreAlani label={t("sure")}>
          <Select value={period} onChange={handlePeriodChange} options={PERIOD_OPTIONS.map((option) => ({ value: option, label: t(option) }))} style={{ width: FIELD_WIDTH }} popupMatchSelectWidth={false} />
        </FiltreAlani>

        {period === CUSTOM_PERIOD ? (
          <FiltreAlani label={t("tarih")}>
            <ConfigProvider locale={tr_TR}>
              <RangePicker
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
                onCalendarChange={(dates) => setCalendarDates(dates)}
                onOpenChange={(open) => setCalendarDates(open ? [null, null] : null)}
                disabledDate={disabledDate}
                locale={dayjs.locale("tr")}
                format="DD.MM.YYYY"
                allowClear={false}
                style={{ width: 230 }}
              />
            </ConfigProvider>
          </FiltreAlani>
        ) : null}

        <FiltreAlani label={t("firma")}>
          <CokluSecim field="firmaIds" value={filters.firmaIds} onChange={(value) => updateFilter("firmaIds", value)} width={FIELD_WIDTH} />
        </FiltreAlani>

        <FiltreAlani label={t("operasyonTipi")}>
          <KodIDSelectbox
            name1="operasyonAnaliziOperasyonTip"
            kodID={OPERASYON_TIP_KOD_ID}
            addHide
            multiSelect
            isRequired={false}
            placeholder={t("tumu")}
            onChange={(value) => updateFilter("operasyonTipIds", value || [])}
            inputWidth={`${FIELD_WIDTH}px`}
            dropdownWidth="280px"
          />
        </FiltreAlani>

        <FiltreAlani label={t("guzergah")}>
          <CokluSecim field="guzergahIds" value={filters.guzergahIds} onChange={(value) => updateFilter("guzergahIds", value)} width={FIELD_WIDTH} />
        </FiltreAlani>

        <FiltreAlani label={t("aracPlaka")}>
          <PlakaSelectbox name1="operasyonAnaliziArac" mode="multiple" isRequired={false} onChange={(value) => updateFilter("aracIds", value || [])} inputWidth={`${FIELD_WIDTH}px`} dropdownWidth="280px" />
        </FiltreAlani>

        <Badge count={drawerFilterCount} size="small" offset={[-4, 4]}>
          <Button icon={<FilterOutlined />} onClick={() => setDrawerOpen(true)}>
            {t("filtreler")}
          </Button>
        </Badge>

        <Button type="primary" loading={loading} onClick={handleApply} style={{ background: colors.navy, borderColor: colors.navy }}>
          {t("uygula")}
        </Button>
      </div>

      {/* forceRender: panel kapalıyken de seçimler bağlı kalsın, açılışta etiketler kaybolmasın */}
      <Drawer title={t("filtreler")} open={drawerOpen} onClose={() => setDrawerOpen(false)} width={360} forceRender>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FiltreAlani label={t("lokasyon")}>
            <LokasyonTable fieldName="lokasyonIds" multiSelect onSubmit={handleLokasyonChange} style={{ width: DRAWER_FIELD_WIDTH }} />
          </FiltreAlani>

          {kodFiltreleri.map((item) => (
            <FiltreAlani key={item.field} label={item.label}>
              <KodIDSelectbox
                name1={item.name1}
                kodID={item.kodID}
                addHide
                multiSelect
                isRequired={false}
                placeholder={t("tumu")}
                onChange={(value) => updateFilter(item.field, value || [])}
                inputWidth={DRAWER_FIELD_WIDTH}
                dropdownWidth="300px"
              />
            </FiltreAlani>
          ))}

          <FiltreAlani label={t("surucu")}>
            <CokluSecim field="surucuIds" value={filters.surucuIds} onChange={(value) => updateFilter("surucuIds", value)} width={DRAWER_FIELD_WIDTH} />
          </FiltreAlani>

          <FiltreAlani label={t("personelTekil")}>
            <CokluSecim field="personelIds" value={filters.personelIds} onChange={(value) => updateFilter("personelIds", value)} width={DRAWER_FIELD_WIDTH} />
          </FiltreAlani>
        </div>
      </Drawer>
    </Card>
  );
}

OperasyonAnaliziFiltreleri.propTypes = {
  loading: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
};

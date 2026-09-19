import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Row, Space, Spin, Typography } from "antd";
import { CalendarOutlined, DownloadOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import AxiosInstance from "../../../../api/http";
import { formatDateByLocale } from "../../../components/FormattedDate";
import AylikTrendler from "./components/AylikTrendler";
import FirmaDagilimi from "./components/FirmaDagilimi";
import GunlukOperasyonOzeti from "./components/GunlukOperasyonOzeti";
import GuzergahToplamlari from "./components/GuzergahToplamlari";
import KpiKartlari from "./components/KpiKartlari";
import OperasyonAnaliziFiltreleri, { buildAnalysisBody, buildYearBody, getDefaultDateRange } from "./components/OperasyonAnaliziFiltreleri";
import PersonelOzeti from "./components/PersonelOzeti";
import SurucuPerformansi from "./components/SurucuPerformansi";
import { ALL_TYPES, AYLIK_TREND_TYPE, BASE_TYPES, FIRMA_DAGILIM_INFO, FIRMA_DAGILIM_INFO_LABEL_KEYS, FIRMA_DAGILIM_TYPE, KPI_TYPES, colors, emptyFilters } from "./utils/constants";
import { buildAllSheets } from "./utils/exportMappers";
import { downloadSheetsAsXlsx } from "./utils/exporters";

const { Text } = Typography;

const ENDPOINT = "ExpeditionAnalysis/GetInfoByType";

// KPI tipleri tek nesne, liste tipleri dizi döner; hata durumunda da aynı şekil korunur
const getEmptyValueByType = (type) => (KPI_TYPES.includes(type) ? {} : []);

const buildEmptyData = () => Object.fromEntries(ALL_TYPES.map((type) => [type, getEmptyValueByType(type)]));

// Servis hata durumunda 200 ile hata gövdesi dönebildiği için yanıt şekli doğrulanır
const isValidResponse = (type, data) => (KPI_TYPES.includes(type) ? Boolean(data) && typeof data === "object" && !Array.isArray(data) : Array.isArray(data));

function OperasyonAnaliziIcerik() {
  const [requestBody, setRequestBody] = useState(() => buildAnalysisBody(emptyFilters, getDefaultDateRange()));
  const [appliedRange, setAppliedRange] = useState(getDefaultDateRange);
  const [firmaInfo, setFirmaInfo] = useState(FIRMA_DAGILIM_INFO.OPERASYON);
  const [trendYili, setTrendYili] = useState(null);
  const [analysisData, setAnalysisData] = useState(buildEmptyData);
  const [loading, setLoading] = useState(false);
  const [firmaLoading, setFirmaLoading] = useState(false);
  const [trendLoading, setTrendLoading] = useState(false);
  const [failedTypes, setFailedTypes] = useState([]);

  // Her istek yalnızca kendi tiplerinin hata bilgisini günceller
  const updateFailedTypes = useCallback((handledTypes, nextFailedTypes) => {
    setFailedTypes((state) => [...state.filter((type) => !handledTypes.includes(type)), ...nextFailedTypes].sort((first, second) => first - second));
  }, []);

  const fetchSingleType = useCallback(
    async (type, body, setTypeLoading = null) => {
      setTypeLoading?.(true);

      let data = null;
      try {
        const response = await AxiosInstance.post(`${ENDPOINT}?type=${type}`, body);
        if (isValidResponse(type, response?.data)) {
          data = response.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setAnalysisData((state) => ({ ...state, [type]: data ?? getEmptyValueByType(type) }));
      updateFailedTypes([type], data ? [] : [type]);
      setTypeLoading?.(false);
    },
    [updateFailedTypes]
  );

  const fetchBaseData = useCallback(async () => {
    setLoading(true);

    const responses = await Promise.allSettled(BASE_TYPES.map((type) => AxiosInstance.post(`${ENDPOINT}?type=${type}`, requestBody)));

    const nextData = {};
    const nextFailedTypes = [];

    responses.forEach((result, index) => {
      const type = BASE_TYPES[index];
      if (result.status === "fulfilled" && isValidResponse(type, result.value?.data)) {
        nextData[type] = result.value.data;
      } else {
        nextFailedTypes.push(type);
        nextData[type] = getEmptyValueByType(type);
      }
    });

    setAnalysisData((state) => ({ ...state, ...nextData }));
    updateFailedTypes(BASE_TYPES, nextFailedTypes);
    setLoading(false);
  }, [requestBody, updateFailedTypes]);

  // type=7 "info" parametresine bağlı olduğu için gösterge değiştiğinde tek başına yenilenir
  const fetchFirmaData = useCallback(() => fetchSingleType(FIRMA_DAGILIM_TYPE, { ...requestBody, info: firmaInfo }, setFirmaLoading), [fetchSingleType, requestBody, firmaInfo]);

  // type=11 widget'ın kendi yıl seçimini kullanır; seçim yoksa genel filtrenin tarih aralığı geçerlidir
  const fetchTrendData = useCallback(
    () => fetchSingleType(AYLIK_TREND_TYPE, trendYili ? buildYearBody(requestBody, trendYili) : requestBody, setTrendLoading),
    [fetchSingleType, requestBody, trendYili]
  );

  useEffect(() => {
    fetchBaseData();
  }, [fetchBaseData]);

  useEffect(() => {
    fetchFirmaData();
  }, [fetchFirmaData]);

  useEffect(() => {
    fetchTrendData();
  }, [fetchTrendData]);

  // Kart menüsündeki "Yenile" yalnızca ilgili bölümü tekrar çeker
  const refreshType = useCallback(
    (type) => {
      if (type === FIRMA_DAGILIM_TYPE) {
        return fetchFirmaData();
      }
      if (type === AYLIK_TREND_TYPE) {
        return fetchTrendData();
      }
      return fetchSingleType(type, requestBody);
    },
    [fetchFirmaData, fetchTrendData, fetchSingleType, requestBody]
  );

  // Genel filtreler uygulandığında widget'ın kendi yıl seçimi geçersiz olur
  const handleApply = useCallback((filters, dateRange) => {
    setRequestBody(buildAnalysisBody(filters, dateRange));
    setAppliedRange(dateRange);
    setTrendYili(null);
  }, []);

  const handleExcelDownload = useCallback(
    () => downloadSheetsAsXlsx(buildAllSheets(analysisData, t(FIRMA_DAGILIM_INFO_LABEL_KEYS[firmaInfo])), t("operasyonAnalizleri")),
    [analysisData, firmaInfo]
  );

  return (
    <div style={{ background: colors.pageBackground, minHeight: "calc(100vh - 100px)" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.navy }}>{t("operasyonAnalizleri")}</div>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {t("operasyonAnalizleriAciklama")}
            </Text>
          </div>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExcelDownload} style={{ background: colors.navy, borderColor: colors.navy }}>
            {t("excelIndir")}
          </Button>
        </div>

        <OperasyonAnaliziFiltreleri loading={loading} onApply={handleApply} />

        {/* Başlık ve tarih farklı puntoda olduğu için kutu ortası yerine taban çizgisi hizalaması kullanılır */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.title }}>{t("operasyonOzeti")}</span>
          <Text type="secondary" style={{ fontSize: 12 }}>
            <CalendarOutlined style={{ marginInlineEnd: 6 }} />
            {`${formatDateByLocale(appliedRange?.[0])} – ${formatDateByLocale(appliedRange?.[1])}`}
          </Text>
        </div>

        <KpiKartlari toplamOperasyon={analysisData[1]} toplamHareket={analysisData[2]} miktar={analysisData[3]} toplamTutar={analysisData[4]} enYogunGuzergah={analysisData[5]} />

        {failedTypes.length ? <Alert type="warning" showIcon message={`${t("baziAnalizlerAlinamadi")} (${failedTypes.join(", ")})`} /> : null}

        <Spin spinning={loading || firmaLoading || trendLoading}>
          <Row gutter={[16, 16]}>
            <Col xs={24} xl={12}>
              <GunlukOperasyonOzeti rows={analysisData[6]} onRefresh={() => refreshType(6)} />
            </Col>
            <Col xs={24} xl={12}>
              <FirmaDagilimi rows={analysisData[7]} info={firmaInfo} onInfoChange={setFirmaInfo} onRefresh={() => refreshType(7)} />
            </Col>
            <Col xs={24} xl={12}>
              <SurucuPerformansi rows={analysisData[8]} onRefresh={() => refreshType(8)} />
            </Col>
            <Col xs={24} xl={12}>
              <PersonelOzeti rows={analysisData[9]} onRefresh={() => refreshType(9)} />
            </Col>
            <Col xs={24} xl={12}>
              <GuzergahToplamlari rows={analysisData[10]} onRefresh={() => refreshType(10)} />
            </Col>
            <Col xs={24} xl={12}>
              <AylikTrendler rows={analysisData[11]} yil={trendYili} onYilChange={setTrendYili} onRefresh={() => refreshType(11)} />
            </Col>
          </Row>
        </Spin>
      </Space>
    </div>
  );
}

export default function OperasyonAnalizi() {
  // KodIDSelectbox react-hook-form bağlamı beklediği için filtreler FormProvider içinde çalışır
  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <OperasyonAnaliziIcerik />
    </FormProvider>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Row, Space, Spin, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import AxiosInstance from "../../../../api/http";
import AylikTrendler from "./components/AylikTrendler";
import FirmaTutarOzeti from "./components/FirmaTutarOzeti";
import GunlukOperasyonOzeti from "./components/GunlukOperasyonOzeti";
import GuzergahToplamlari from "./components/GuzergahToplamlari";
import KpiKartlari from "./components/KpiKartlari";
import OperasyonAnaliziFiltreleri, { buildAnalysisBody, getDefaultDateRange } from "./components/OperasyonAnaliziFiltreleri";
import PersonelOzeti from "./components/PersonelOzeti";
import SurucuPerformansi from "./components/SurucuPerformansi";
import { ALL_TYPES, KPI_TYPES, colors, emptyFilters } from "./utils/constants";
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
  const [analysisData, setAnalysisData] = useState(buildEmptyData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAnalysisData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    const responses = await Promise.allSettled(ALL_TYPES.map((type) => AxiosInstance.post(`${ENDPOINT}?type=${type}`, requestBody)));

    const nextData = {};
    const failedTypes = [];

    responses.forEach((result, index) => {
      const type = ALL_TYPES[index];
      if (result.status === "fulfilled" && isValidResponse(type, result.value?.data)) {
        nextData[type] = result.value.data;
      } else {
        failedTypes.push(type);
        nextData[type] = getEmptyValueByType(type);
      }
    });

    setAnalysisData(nextData);
    if (failedTypes.length) {
      setErrorMessage(`${t("baziAnalizlerAlinamadi")} (${failedTypes.join(", ")})`);
    }
    setLoading(false);
  }, [requestBody]);

  useEffect(() => {
    fetchAnalysisData();
  }, [fetchAnalysisData]);

  // Kart menüsündeki "Verileri Yenile" yalnızca ilgili bölümü tekrar çeker
  const refreshType = useCallback(
    async (type) => {
      try {
        const response = await AxiosInstance.post(`${ENDPOINT}?type=${type}`, requestBody);
        if (isValidResponse(type, response?.data)) {
          setAnalysisData((state) => ({ ...state, [type]: response.data }));
          return;
        }
      } catch {
        setErrorMessage(`${t("baziAnalizlerAlinamadi")} (${type})`);
        return;
      }

      setAnalysisData((state) => ({ ...state, [type]: getEmptyValueByType(type) }));
      setErrorMessage(`${t("baziAnalizlerAlinamadi")} (${type})`);
    },
    [requestBody]
  );

  const handleApply = useCallback((filters, dateRange) => setRequestBody(buildAnalysisBody(filters, dateRange)), []);

  const handleExcelDownload = useCallback(() => downloadSheetsAsXlsx(buildAllSheets(analysisData), t("operasyonAnalizleri")), [analysisData]);

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

        <KpiKartlari toplamOperasyon={analysisData[1]} toplamHareket={analysisData[2]} planlananMiktar={analysisData[3]} gerceklesenMiktar={analysisData[4]} toplamTutar={analysisData[5]} />

        <OperasyonAnaliziFiltreleri loading={loading} onApply={handleApply} />

        {errorMessage ? <Alert type="warning" showIcon message={errorMessage} /> : null}

        <Spin spinning={loading}>
          <Row gutter={[16, 16]}>
            <Col xs={24} xl={12}>
              <GunlukOperasyonOzeti rows={analysisData[6]} onRefresh={() => refreshType(6)} />
            </Col>
            <Col xs={24} xl={12}>
              <FirmaTutarOzeti rows={analysisData[7]} onRefresh={() => refreshType(7)} />
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
              <AylikTrendler rows={analysisData[11]} onRefresh={() => refreshType(11)} />
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

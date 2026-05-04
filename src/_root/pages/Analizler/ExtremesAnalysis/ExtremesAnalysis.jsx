import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Space, Spin } from "antd";
import AxiosInstance from "../../../../api/http";
import AnalysisFiltersCard from "./components/AnalysisFiltersCard";
import DetailTablesSection from "./components/DetailTablesSection";
import ExpenseDetailModal from "./components/ExpenseDetailModal";
import FailureDetailModal from "./components/FailureDetailModal";
import KpiCardsGrid from "./components/KpiCardsGrid";
import RankingChartsGrid from "./components/RankingChartsGrid";
import { emptyFilters } from "./utils/constants";
import { hasErrorShape, toChartData } from "./utils/dataMappers";

export default function ExtremesAnalysis() {
  const [filters, setFilters] = useState(emptyFilters);
  const [typeOptions, setTypeOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [typeLoading, setTypeLoading] = useState(false);
  const [brandLoading, setBrandLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [failureModalOpen, setFailureModalOpen] = useState(false);

  const requestBody = useMemo(
    () => ({
      lokasyonIds: filters.lokasyonIds,
      aracTipIds: filters.aracTipIds,
      aracMarkaIds: filters.aracMarkaIds,
    }),
    [filters]
  );

  const getEmptyValueByType = useCallback((type) => (type <= 5 ? null : []), []);

  const fetchSelectOptions = useCallback(async () => {
    setTypeLoading(true);
    setBrandLoading(true);
    try {
      const [typeResponse, brandResponse] = await Promise.all([AxiosInstance.get("Code/GetCodeTextById?codeNumber=100"), AxiosInstance.get("Mark/GetMarkList")]);
      setTypeOptions((Array.isArray(typeResponse.data) ? typeResponse.data : []).map((item) => ({ value: item.siraNo, label: item.codeText })));
      setBrandOptions((Array.isArray(brandResponse.data) ? brandResponse.data : []).map((item) => ({ value: item.siraNo, label: item.marka })));
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Filtre seçenekleri alınırken hata oluştu.");
    } finally {
      setTypeLoading(false);
      setBrandLoading(false);
    }
  }, []);

  const fetchAnalysisData = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const responses = await Promise.allSettled(
        Array.from({ length: 14 }, (_, index) => index + 1).map((type) => AxiosInstance.post(`ModuleAnalysis/ExtremesAnalysis/GetInfoByType?type=${type}`, requestBody))
      );

      const nextData = {};
      const failedTypes = [];
      responses.forEach((result, index) => {
        const type = index + 1;
        if (result.status === "fulfilled" && !hasErrorShape(result.value.data)) {
          nextData[type] = result.value.data;
        } else {
          failedTypes.push(type);
          nextData[type] = getEmptyValueByType(type);
        }
      });

      setAnalysisData(nextData);
      if (failedTypes.length) {
        setErrorMessage(`Bazı analizler alınamadı: Type ${failedTypes.join(", ")}`);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Enler analizi verileri alınırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [getEmptyValueByType, requestBody]);

  const refreshAnalysisType = useCallback(
    async (type) => {
      try {
        const response = await AxiosInstance.post(`ModuleAnalysis/ExtremesAnalysis/GetInfoByType?type=${type}`, requestBody);
        if (!hasErrorShape(response.data)) {
          setAnalysisData((prev) => ({ ...prev, [type]: response.data }));
          setErrorMessage("");
          return;
        }
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || `Analiz yenilenemedi: Type ${type}`);
        return;
      }

      setAnalysisData((prev) => ({ ...prev, [type]: getEmptyValueByType(type) }));
      setErrorMessage(`Analiz yenilenemedi: Type ${type}`);
    },
    [getEmptyValueByType, requestBody]
  );

  useEffect(() => {
    fetchSelectOptions();
  }, [fetchSelectOptions]);

  useEffect(() => {
    fetchAnalysisData();
  }, [fetchAnalysisData]);

  const chartData = useMemo(
    () => ({
      type6Data: toChartData(analysisData[6], 6),
      type7Data: toChartData(analysisData[7], 7),
      type8Data: toChartData(analysisData[8], 8),
      type9Data: toChartData(analysisData[9], 9),
      type10Data: toChartData(analysisData[10], 10),
      type11Data: toChartData(analysisData[11], 11),
      type12Data: toChartData(analysisData[12], 12),
    }),
    [analysisData]
  );

  const type1 = analysisData[1] || {};
  const type2 = analysisData[2] || {};
  const type3 = analysisData[3] || {};
  const type4 = analysisData[4] || {};
  const type5 = analysisData[5] || {};

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <AnalysisFiltersCard
          filters={filters}
          setFilters={setFilters}
          typeOptions={typeOptions}
          brandOptions={brandOptions}
          typeLoading={typeLoading}
          brandLoading={brandLoading}
          loading={loading}
          fetchSelectOptions={fetchSelectOptions}
          fetchAnalysisData={fetchAnalysisData}
        />

        {errorMessage ? <Alert type="warning" showIcon message={errorMessage} /> : null}

        <Spin spinning={loading}>
          <KpiCardsGrid type1={type1} type2={type2} type3={type3} type4={type4} type5={type5} onExpenseClick={() => setExpenseModalOpen(true)} onFailureClick={() => setFailureModalOpen(true)} />
          <RankingChartsGrid {...chartData} onRefreshType={refreshAnalysisType} />
          <DetailTablesSection failureData={analysisData[13]} expenseData={analysisData[14]} onRefreshType={refreshAnalysisType} />
        </Spin>
      </Space>

      <ExpenseDetailModal open={expenseModalOpen} onCancel={() => setExpenseModalOpen(false)} item={type2} />
      <FailureDetailModal open={failureModalOpen} onCancel={() => setFailureModalOpen(false)} item={type3} />
    </div>
  );
}

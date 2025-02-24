import React, { useEffect, useState, useCallback } from "react";
import { Typography, Spin, Collapse, Button, Input, message, InputNumber } from "antd";
import LastikTak from "../../components/LastikTak";
import { useFormContext, Controller } from "react-hook-form";
import { t } from "i18next";
import AxiosInstance from "../../../../../../../../../api/http";
import styled from "styled-components";
import { RightOutlined, LockOutlined } from "@ant-design/icons";
import LastikTakUpdate from "../../components/LastikTakUpdate";
import ContextMenu from "./ContextMenu/ContextMenu";
import LastikYeriDegistir from "../../components/LastikYeriDegistir";

const getDecimalSeparator = () => {
  const lang = localStorage.getItem("i18nextLng") || "en";
  return ["tr", "az", "ru"].includes(lang) ? "," : ".";
};

const { Text, Title } = Typography;
const { Panel } = Collapse;

const TireGroup = styled.div`
  margin-bottom: 24px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TireGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
`;

const TirePositionTitle = styled(Text)`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

const TireCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: white;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
`;

const TireHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
`;

const TireImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const TireTitle = styled.div`
  flex: 1;
`;

const TireName = styled(Text)`
  display: block;
  font-size: 14px;
  color: #1890ff !important;
  font-weight: 400;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const TireSerial = styled(Text)`
  display: block;
  color: #999;
  font-size: 12px;
  font-weight: 400;
`;

const MeasurementSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const MeasurementGroup = styled.div``;

const MeasurementTitle = styled(Text)`
  display: block;
  color: #999;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 4px;
`;

const MeasurementValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Value = styled(Text)`
  font-size: 20px;
  font-weight: 400;
  color: #333;
`;

const Unit = styled(Text)`
  font-size: 12px;
  color: #999;
  margin-left: 2px;
  font-weight: 400;
`;

const SubText = styled(Text)`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  font-weight: 400;
`;

const StyledCollapse = styled(Collapse)`
  background: transparent;
  border: none;

  .ant-collapse-item {
    margin-bottom: 8px;
    border: none !important;
    background: transparent;
    border-radius: 0 !important;
  }

  .ant-collapse-header {
    padding: 8px 0 !important;
    align-items: center !important;
    background: transparent !important;

    .ant-collapse-header-text {
      color: #000000;
      font-size: 14px;
      font-weight: 700;
      opacity: 1;
    }

    .ant-collapse-expand-icon {
      color: #000000;
      opacity: 1;
    }
  }

  .ant-collapse-content {
    background: transparent !important;
    border-top: none !important;
  }

  .ant-collapse-content-box {
    padding: 8px 0 !important;
  }
`;

const StyledInput = styled(InputNumber)`
  width: 120px;
  .ant-input {
    text-align: right;
  }
`;

export default function TakiliLastikListesi({ aracId, axleList, positionList, onInit, setTirePositionMapping }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [loading, setLoading] = useState(false);
  const [installedTires, setInstalledTires] = useState([]);
  const [groupedTires, setGroupedTires] = useState({});
  const [activeKeys, setActiveKeys] = useState([]);
  const [selectedTire, setSelectedTire] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchInstalledTires = useCallback(async () => {
    if (!aracId) return;

    setLoading(true);
    try {
      const response = await AxiosInstance.get(`TyreOperation/GetInstalledTyresByVid?vId=${aracId}`);
      if (response?.data) {
        const tiresArray = Array.isArray(response.data) ? response.data : [response.data];
        setInstalledTires(tiresArray);

        // Set form values for each tire
        tiresArray.forEach((tire) => {
          setValue(`disDerinligi_${tire.siraNo}`, tire.disDerinligi);
          setValue(`basinc_${tire.siraNo}`, tire.basinc);
        });

        // Create grouped tires
        const grouped = tiresArray.reduce((acc, tire) => {
          const group = tire.aksPozisyon || "Diğer";
          if (!acc[group]) {
            acc[group] = [];
          }
          acc[group].push(tire);
          return acc;
        }, {});

        setGroupedTires(grouped);

        // Create position mapping
        const positionMap = tiresArray.reduce((acc, tire) => {
          if (tire.aksPozisyon && tire.pozisyonNo) {
            if (!acc[tire.aksPozisyon]) {
              acc[tire.aksPozisyon] = [];
            }
            if (!acc[tire.aksPozisyon].includes(tire.pozisyonNo)) {
              acc[tire.aksPozisyon].push(tire.pozisyonNo);
            }
          }
          return acc;
        }, {});

        setTirePositionMapping(positionMap);
        setActiveKeys(Object.keys(grouped));
      }
    } catch (error) {
      console.error("Error fetching installed tires:", error);
    } finally {
      setLoading(false);
    }
  }, [aracId]);

  useEffect(() => {
    fetchInstalledTires();
  }, [fetchInstalledTires]);

  useEffect(() => {
    if (typeof onInit === "function") {
      onInit(fetchInstalledTires);
    }
  }, [onInit, fetchInstalledTires]);

  const getAxlePositionName = (position) => {
    return position ? t(position) : "";
  };

  const getPositionName = (position) => {
    return position ? t(position) : "";
  };

  const handleTireClick = (tire) => {
    setSelectedTire(tire);
    setIsUpdateModalOpen(true);
  };

  const handleMeasurementUpdate = async (tire, updatedField, value) => {
    try {
      const payload = {
        id: tire.siraNo,
        disDerinligi: watch(`disDerinligi_${tire.siraNo}`),
        basinc: watch(`basinc_${tire.siraNo}`),
      };

      await AxiosInstance.put(`TyreOperation/UpdateTyreMeasurement`, payload);
      message.success(t("measurementUpdateSuccess"));
      fetchInstalledTires();
    } catch (error) {
      console.error(`Error updating measurements:`, error);
      message.error(t("measurementUpdateError"));
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "10px" }}>
        <Text style={{ fontSize: "14px" }}>{t("installedTires")}</Text>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          {Object.values(groupedTires).flat().length > 0 && (
            <>
              <LastikYeriDegistir
                aracId={aracId}
                axleList={axleList}
                positionList={positionList}
                refreshList={fetchInstalledTires}
                installedTires={installedTires}
                groupedTires={groupedTires}
              />
              <Text style={{ fontSize: "14px" }}>|</Text>
            </>
          )}
          {Object.values(groupedTires).flat().length >= positionList.reduce((sum, positions) => sum + positions.length, 0) ? (
            <Button type="text" icon={<LockOutlined />} style={{ color: "#b2afaf", paddingLeft: "5px" }} disabled>
              {t("ekle")}
            </Button>
          ) : (
            <LastikTak aracId={aracId} axleList={axleList} positionList={positionList} refreshList={fetchInstalledTires} />
          )}
        </div>
      </div>
      <div
        style={{
          padding: "0 10px",
          height: "calc(100vh - 350px)",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Spin spinning={loading}>
          <StyledCollapse
            activeKey={activeKeys}
            onChange={setActiveKeys}
            expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} style={{ fontSize: "12px" }} />}
            items={Object.entries(groupedTires).map(([axlePosition, tires]) => ({
              key: axlePosition,
              label: `${getAxlePositionName(axlePosition)} (${tires.length})`,
              children: tires.map((tire) => (
                <TireCard key={tire.siraNo}>
                  <TireHeader>
                    <TireImage src="/images/lastik.png" alt="Tire" />
                    <TireTitle>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <TireName onClick={() => handleTireClick(tire)}>{tire.lastikTanim || ""}</TireName>
                        <ContextMenu tire={tire} refreshList={fetchInstalledTires} />
                      </div>

                      <TireSerial>
                        {tire.seriNo || ""}
                        {tire.pozisyonNo && <span style={{ marginLeft: "5px" }}>({getPositionName(tire.pozisyonNo)})</span>}
                      </TireSerial>
                    </TireTitle>
                  </TireHeader>
                  <MeasurementSection>
                    <MeasurementGroup>
                      <MeasurementTitle>{t("disDerinligi")}</MeasurementTitle>
                      <MeasurementValue>
                        <Controller
                          name={`disDerinligi_${tire.siraNo}`}
                          control={control}
                          render={({ field }) => (
                            <StyledInput
                              {...field}
                              min={0}
                              suffix="mm"
                              precision={2}
                              step={0.01}
                              decimalSeparator={getDecimalSeparator()}
                              onBlur={() => {
                                field.onBlur();
                                handleMeasurementUpdate(tire, "disDerinligi");
                              }}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          )}
                        />
                      </MeasurementValue>
                    </MeasurementGroup>
                    <MeasurementGroup>
                      <MeasurementTitle>{t("basinc")}</MeasurementTitle>
                      <MeasurementValue>
                        <Controller
                          name={`basinc_${tire.siraNo}`}
                          control={control}
                          render={({ field }) => (
                            <StyledInput
                              {...field}
                              min={0}
                              suffix="psi"
                              onBlur={() => {
                                field.onBlur();
                                handleMeasurementUpdate(tire, "basinc");
                              }}
                              onChange={(value) => {
                                field.onChange(value);
                              }}
                            />
                          )}
                        />
                      </MeasurementValue>
                    </MeasurementGroup>
                  </MeasurementSection>
                </TireCard>
              )),
            }))}
          />
        </Spin>
      </div>
      {selectedTire && (
        <LastikTakUpdate
          aracId={aracId}
          axleList={axleList}
          positionList={positionList}
          shouldOpenModal={isUpdateModalOpen}
          onModalClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedTire(null);
          }}
          showAddButton={false}
          refreshList={fetchInstalledTires}
          tireData={selectedTire}
        />
      )}
    </div>
  );
}

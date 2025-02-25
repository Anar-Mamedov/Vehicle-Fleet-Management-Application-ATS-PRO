import React, { useEffect, useState } from "react";
import { Typography, Space, message, Button, Modal, Collapse } from "antd";
import AxiosInstance from "../../../../../../../../api/http";
import { t } from "i18next";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import AxleListSelect from "./Lastikler/LastikYerDegistir/AxleListSelect";
import PositionListSelect from "./Lastikler/LastikYerDegistir/PositionListSelect";
import { RightOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Panel } = Collapse;

const TireCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  margin-bottom: 10px;
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
`;

const TireSerial = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
  font-weight: 400;
`;

const OriginalPosition = styled(Text)`
  color: #666;
  font-size: 12px;
  font-weight: 400;
  margin-left: 8px;
`;

const SelectorsSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const SelectorGroup = styled.div`
  flex: 1;
`;

const SelectorTitle = styled(Text)`
  display: block;
  color: #999;
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 4px;
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

export default function LastikYeriDegistir({ aracId, axleList, positionList, shouldOpenModal, onModalClose, showAddButton = true, refreshList, groupedTires = {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tirePositions, setTirePositions] = useState({});
  const [changedTires, setChangedTires] = useState(new Set());
  const [activeKeys, setActiveKeys] = useState([]);

  const methods = useForm({
    mode: "onChange",
  });

  const { watch, setValue, getValues } = methods;

  useEffect(() => {
    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, [shouldOpenModal]);

  useEffect(() => {
    // Initialize tire positions with current values
    const initialPositions = {};
    Object.values(groupedTires)
      .flat()
      .forEach((tire) => {
        initialPositions[tire.siraNo] = {
          axle: tire.aksPozisyon,
          position: tire.pozisyonNo,
        };
        // Set initial form values for each tire
        setValue(`selectedAxle_${tire.siraNo}`, tire.aksPozisyon);
        setValue(`selectedPosition_${tire.siraNo}`, tire.pozisyonNo);
      });
    setTirePositions(initialPositions);
    setChangedTires(new Set()); // Reset changed tires when modal opens
    setActiveKeys(Object.keys(groupedTires)); // Open all panels by default
  }, [groupedTires, setValue]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    methods.reset();
    setChangedTires(new Set());
    if (onModalClose) {
      onModalClose();
    }
  };

  const handlePositionChange = (changedTireId, field, newValue) => {
    const allTires = Object.values(groupedTires).flat();
    const changedTire = allTires.find((tire) => tire.siraNo === changedTireId);

    if (!changedTire) return;

    // If axle is being changed, just update the axle and reset position
    if (field === "selectedAxle") {
      setValue(`selectedAxle_${changedTireId}`, newValue);
      setValue(`selectedPosition_${changedTireId}`, null);
      const updatedPositions = { ...tirePositions };
      updatedPositions[changedTireId] = {
        axle: newValue,
        position: null,
      };
      setTirePositions(updatedPositions);
      return;
    }

    const currentAxle = getValues(`selectedAxle_${changedTireId}`);
    const currentPosition = field === "selectedPosition" ? newValue : getValues(`selectedPosition_${changedTireId}`);

    // Only proceed if both axle and position are selected
    if (!currentAxle || !currentPosition) return;

    // Find tire in target position
    const existingTire = allTires.find((tire) => {
      const tireAxle = getValues(`selectedAxle_${tire.siraNo}`);
      const tirePosition = getValues(`selectedPosition_${tire.siraNo}`);
      return tireAxle === currentAxle && tirePosition === currentPosition && tire.siraNo !== changedTireId;
    });

    if (existingTire) {
      // Get the original position of the changed tire
      const changedTireOriginalAxle = changedTire.aksPozisyon;
      const changedTireOriginalPosition = changedTire.pozisyonNo;

      // Swap positions
      setValue(`selectedAxle_${existingTire.siraNo}`, changedTireOriginalAxle);
      setValue(`selectedPosition_${existingTire.siraNo}`, changedTireOriginalPosition);

      // Update tire positions state for both tires
      const updatedPositions = { ...tirePositions };
      updatedPositions[existingTire.siraNo] = {
        axle: changedTireOriginalAxle,
        position: changedTireOriginalPosition,
      };
      updatedPositions[changedTireId] = {
        axle: currentAxle,
        position: currentPosition,
      };

      setTirePositions(updatedPositions);
      setChangedTires(new Set([...changedTires, changedTireId, existingTire.siraNo]));
    } else {
      // If no existing tire in target position, just update the changed tire
      setValue(`selectedAxle_${changedTireId}`, currentAxle);
      setValue(`selectedPosition_${changedTireId}`, currentPosition);

      const updatedPositions = { ...tirePositions };
      updatedPositions[changedTireId] = {
        axle: currentAxle,
        position: currentPosition,
      };
      setTirePositions(updatedPositions);
      setChangedTires(new Set([...changedTires, changedTireId]));
    }
  };

  const handleSwapPositions = async () => {
    try {
      const allTires = Object.values(groupedTires).flat();
      const changedTires = allTires
        .filter((tire) => {
          const currentAxle = getValues(`selectedAxle_${tire.siraNo}`);
          const currentPosition = getValues(`selectedPosition_${tire.siraNo}`);
          return tire.aksPozisyon !== currentAxle || tire.pozisyonNo !== currentPosition;
        })
        .map((tire) => ({
          lastikId: tire.siraNo,
          yeniAksPozisyon: getValues(`selectedAxle_${tire.siraNo}`),
          yeniPozisyonNo: getValues(`selectedPosition_${tire.siraNo}`),
        }));

      if (changedTires.length === 0) {
        message.info(t("degisiklikYok"));
        return;
      }

      const response = await AxiosInstance.post("TyreOperation/SwapTyrePositions", changedTires);

      if (response.data.statusCode === 200) {
        message.success(t("lastikYeriDegistirmeBasarili"));
        if (refreshList) {
          await refreshList();
        }
        handleCloseModal();
      } else {
        message.error(t("lastikYeriDegistirmeHatasi"));
      }
    } catch (error) {
      console.error("Error swapping tire positions:", error);
      message.error(t("birHataOlustu"));
    }
  };

  return (
    <>
      {showAddButton && (
        <Button style={{ paddingRight: "5px" }} type="link" onClick={handleOpenModal}>
          {t("lastikDegistir")}
        </Button>
      )}

      <Modal
        title={t("lastikDegistir")}
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            {t("iptal")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleSwapPositions}>
            {t("kaydet")}
          </Button>,
        ]}
      >
        <FormProvider {...methods}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <StyledCollapse
                activeKey={activeKeys}
                onChange={setActiveKeys}
                expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} style={{ fontSize: "12px" }} />}
                items={Object.entries(groupedTires).map(([axlePosition, tires]) => ({
                  key: axlePosition,
                  label: t(axlePosition) + " (" + tires.length + ")",
                  children: (
                    <div>
                      {tires.map((tire) => (
                        <TireCard
                          key={tire.siraNo}
                          style={{
                            border: changedTires.has(tire.siraNo) ? "1px solid #52c41a" : "1px solid #e8e8e8",
                            transition: "border-color 0.3s ease",
                          }}
                        >
                          <TireHeader>
                            <TireImage src="/images/lastik.png" alt="Tire" />
                            <TireTitle>
                              <TireName>{tire.lastikTanim || ""}</TireName>
                              <TireSerial>
                                <span>{tire.seriNo}</span>
                                <OriginalPosition>
                                  {t("eskiKonum")}: {t(tire.aksPozisyon)} - {t(tire.pozisyonNo)}
                                </OriginalPosition>
                              </TireSerial>
                            </TireTitle>
                          </TireHeader>
                          <SelectorsSection>
                            <SelectorGroup>
                              <SelectorTitle>{t("axle")}</SelectorTitle>
                              <AxleListSelect
                                axleList={axleList}
                                name={`selectedAxle_${tire.siraNo}`}
                                onPositionChange={(value) => handlePositionChange(tire.siraNo, "selectedAxle", value)}
                              />
                            </SelectorGroup>
                            <SelectorGroup>
                              <SelectorTitle>{t("position")}</SelectorTitle>
                              <PositionListSelect
                                positionList={positionList}
                                name={`selectedPosition_${tire.siraNo}`}
                                onPositionChange={(value) => handlePositionChange(tire.siraNo, "selectedPosition", value)}
                              />
                            </SelectorGroup>
                          </SelectorsSection>
                        </TireCard>
                      ))}
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </FormProvider>
      </Modal>
    </>
  );
}

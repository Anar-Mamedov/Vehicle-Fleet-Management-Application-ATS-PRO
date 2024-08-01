import React, { useState, useEffect } from "react";
import { Button, DatePicker, Modal, Popover, Spin, Typography } from "antd";
import { ClockCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import http from "../../../../api/http.jsx";
import dayjs from "dayjs";

const { Text } = Typography;

const StyledClockCircleOutlined = styled(ClockCircleOutlined)`
  font-size: 60px !important;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 20px;
  svg {
    width: 60px;
    height: 60px;
  }
`;

function Component1(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startYear, setStartYear] = useState("");
  const [modalContent, setModalContent] = useState("");
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();
  const updateApi = watch("updateApi");

  const yilSecimiAktifAracSayisi = watch("yilSecimiAktifAracSayisi");

  useEffect(() => {
    const yilSecimiValue = watch("yilSecimiAktifAracSayisi");
    if (!yilSecimiValue) {
      // Eğer baslamaTarihi değeri undefined ise, sistem saatinden o senenin yıl hanesini alıp setBaslamaTarihi'ye atar
      const currentYear = parseInt(dayjs().format("YYYY"), 10);
      setStartYear(currentYear);
    } else if (yilSecimiValue) {
      // Ant Design DatePicker returns a moment object when a date is picked.
      // To extract only the year and set it as the state, use the format method of the moment object.
      const yearOnly = parseInt(yilSecimiValue.format("YYYY"), 10);
      setStartYear(yearOnly);
    }
  }, [yilSecimiAktifAracSayisi]);

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      endYear: startYear + 1,
      startYear: startYear,
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=1", body);
      let responseData = response.data;
      if (typeof responseData === "number") {
        responseData = responseData % 1 === 0 ? responseData : responseData.toFixed(2);
      }
      setData(responseData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startYear) {
      fetchData();
    }
  }, [startYear]);

  const showModal = () => {
    setModalVisible(true);
  };

  const showModal1 = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // reset();
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue("yilSecimiAktifAracSayisi", null);
      // reset({
      //   yilSecimi1: undefined,
      // });
    }
  }, [isModalVisible]);

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => showModal1("Yıl Seç")}>
        Yıl Seç
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `url(/images/bg-card.png), linear-gradient(rgb(27 17 92), #7A6FBE)`,
        backgroundPosition: "inherit",
        backgroundSize: "cover",
        borderRadius: "5px",
        padding: "10px",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <Popover placement="bottom" content={content} trigger="click">
          <Button
            type="text"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 5px",
              height: "32px",
              zIndex: 3,
            }}
          >
            <MoreOutlined style={{ cursor: "pointer", fontWeight: "500", fontSize: "16px", color: "white" }} />
          </Button>
        </Popover>
      </div>
      <div style={{}}>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Spin size="large" style={{ color: "#fff" }} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={showModal}
          >
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: "28px",
                  color: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data}
              </Text>
              <Text style={{ color: "white", fontSize: "15px", fontWeight: "400" }}>Aktif Araç Sayısı</Text>
            </div>
            <StyledClockCircleOutlined />
          </div>
        )}
        <Modal title="Makineler" width="90%" open={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)} centered footer={null}>
          <div></div>
        </Modal>

        <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
          {modalContent === "Yıl Seç" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div>Yıl Seç:</div>
              <Controller
                name="yilSecimiAktifAracSayisi"
                control={control}
                render={({ field }) => <DatePicker {...field} picker="year" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
              />
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Component1;

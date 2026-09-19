import React, { useState, useEffect } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { Button, Input, message, Spin, Form, Typography, Checkbox, Divider } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { LoginUserService } from "../api/service";
import { setItemWithExpiration } from "../utils/expireToken";
import SuccessAlert from "../components/alerts/SuccessAlert";
import ErrorAlert from "../components/alerts/ErrorAlert";
import LanguageSelectbox from "../_root/components/lang/LanguageSelectbox.jsx";
import { useForm } from "antd/lib/form/Form";
import AxiosInstance from "../api/http.jsx";
import styled from "styled-components";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const TITLE_COLOR = "#1F2937";
const MUTED_TEXT_COLOR = "#6B7280";
const FOOTER_TEXT_COLOR = "#9CA3AF";
const BRAND_COLOR = "#1677FF";
const inputStyle = { height: "48px", borderRadius: "8px" };
const prefixIconStyle = { color: FOOTER_TEXT_COLOR, fontSize: "16px", marginRight: "8px" };
const rowStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" };

const ImageContainer = styled.div`
  background: ${(props) =>
    props.isLoading
      ? "none"
      : props.backgroundImage
        ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url(${props.backgroundImage})`
        : `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5)), url("/images/ats_login_image.webp")`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

const FormContainer = styled.div`
  position: relative;
  z-index: 1;
  background-color: white;
  width: 100%;
  max-width: 520px;
  max-height: 100vh;
  margin: auto 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  overflow-y: auto;
  display: flex;
  padding: 40px 48px;
  align-items: center;
  flex-direction: column;

  @media (max-width: 600px) {
    max-width: 100%;
    max-height: none;
    min-height: 100vh;
    margin: 0;
    padding: 32px 24px;
    border-radius: 0;
    box-shadow: none;
    justify-content: center;
  }
`;

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [clientLogo, setClientLogo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [form] = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientAssets = async () => {
      setIsImageLoading(true);
      try {
        const companyKey = localStorage.getItem("companyKey");

        if (companyKey) {
          // Fetch company info from API
          const companyInfoResponse = await AxiosInstance.get(`ClientInfo/GetClientInfo?clientIdentifier=${companyKey}`);
          const companyInfo = companyInfoResponse.data;

          if (companyInfo) {
            // Fetch logo
            if (companyInfo.logoId) {
              const logoBody = {
                photoId: companyInfo.logoId,
                fileName: "logo",
                extension: ".png",
              };

              const logoResponse = await AxiosInstance.post("ClientInfo/GetClientAssets", logoBody, { responseType: "blob" });
              if (logoResponse.data) {
                const logoUrl = URL.createObjectURL(logoResponse.data);
                setClientLogo(logoUrl);
              }
            }

            // Fetch background image
            if (companyInfo.resimId) {
              const backgroundBody = {
                photoId: companyInfo.resimId,
                fileName: "background",
                extension: ".png",
              };

              const backgroundResponse = await AxiosInstance.post("ClientInfo/GetClientAssets", backgroundBody, { responseType: "blob" });
              if (backgroundResponse.data) {
                const backgroundUrl = URL.createObjectURL(backgroundResponse.data);
                setBackgroundImage(backgroundUrl);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching client assets:", error);
      } finally {
        setIsImageLoading(false);
      }
    };

    fetchClientAssets();
  }, []);

  const onFinish = (values) => {
    onSubmit(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeCompanyKey = () => {
    localStorage.removeItem("companyKey");
    navigate("/CompanyKeyPage");
  };

  const handleForgotPassword = () => {
    message.info(t("sifreSifirlamaIcinSistemYoneticinizeBasvurun"));
  };

  const companyKey = localStorage.getItem("companyKey");

  const onSubmit = async (data) => {
    setIsLoading(true);
    const body = {
      KULLANICIKOD: data.username,
      SIFRE: data.password,
      firmaSifre: companyKey,
    };

    try {
      const response = await LoginUserService(body);
      if (response?.data?.siraNo === 0) {
        message.error("Kullanıcı adı veya şifre hatalıdır.");
        return;
      }

      if (response?.status >= 200 && response?.status < 300) {
        setIsSuccess(true);
        setItemWithExpiration("token", true, 24, response?.data?.siraNo, data.remember);
        navigate("/");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <ImageContainer backgroundImage={backgroundImage} isLoading={isImageLoading}>
        {isImageLoading && <Spin size="large" />}
      </ImageContainer>
      <FormContainer>
        <div style={{ ...rowStyle, marginBottom: "32px" }}>
          <img src="/images/ats_pro_logo.png" alt="ats logo" className="login-logo-img" />
          <LanguageSelectbox />
        </div>

        <div style={{ width: "100%", marginBottom: "28px" }}>
          <Title level={3} style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: TITLE_COLOR }}>
            {t("hesabinizaGirisYapin")}
          </Title>
          <Text style={{ display: "block", marginTop: "10px", fontSize: "15px", lineHeight: 1.5, color: MUTED_TEXT_COLOR }}>
            {t("kurumsalFiloVeOperasyonYonetiminizeGuvenleDevamEdebilirsiniz")}
          </Text>
        </div>

        <Form
          form={form}
          name="basic"
          layout="vertical"
          requiredMark={false}
          style={{ width: "100%" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={t("kullaniciAdi")}
            name="username"
            rules={[
              {
                required: true,
                message: t("lutfenKullaniciKodunuzuGiriniz"),
              },
            ]}
          >
            <Input placeholder={t("kullaniciAdi")} prefix={<UserOutlined style={prefixIconStyle} />} style={inputStyle} />
          </Form.Item>

          <Form.Item
            label={t("sifre")}
            name="password"
            rules={[
              {
                required: true,
                message: t("lutfenSifreniziGiriniz"),
              },
            ]}
          >
            <Input.Password placeholder={t("sifre")} prefix={<LockOutlined style={prefixIconStyle} />} style={inputStyle} />
          </Form.Item>

          <div style={{ ...rowStyle, marginBottom: "24px" }}>
            <Form.Item name="remember" valuePropName="checked" label={null} style={{ marginBottom: "0px" }}>
              <Checkbox>{t("beniHatirla")}</Checkbox>
            </Form.Item>
            <Button type="link" style={{ padding: "0px", height: "auto", fontSize: "13px" }} onClick={handleForgotPassword}>
              {t("forgotPassword")}
            </Button>
          </div>

          <Form.Item label={null} style={{ marginBottom: "0px" }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              style={{ width: "100%", height: "52px", borderRadius: "10px", fontSize: "16px", fontWeight: 500 }}
            >
              {t("girisYap")}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
          <Text style={{ fontSize: "13px", color: MUTED_TEXT_COLOR }}>{t("lisansAnahtarinizMiDegisti")}</Text>
          <Button type="link" style={{ padding: "0px", height: "auto", fontSize: "13px" }} onClick={handleChangeCompanyKey}>
            {t("anahtariDegistir")}
          </Button>
        </div>

        {clientLogo ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
            <img src={clientLogo} alt="client logo" style={{ width: "150px" }} />
          </div>
        ) : null}

        <Divider style={{ margin: "24px 0 14px 0" }} />

        <div style={rowStyle}>
          <Text style={{ fontSize: "12px", color: FOOTER_TEXT_COLOR }}>&copy; {dayjs().format("YYYY")} ATS PRO</Text>
          <Text style={{ fontSize: "12px", color: FOOTER_TEXT_COLOR }}>
            <span style={{ color: BRAND_COLOR }}>{t("orjinYazilim")}</span> {t("teknolojisidir")}
          </Text>
        </div>
      </FormContainer>
    </div>
  );
};

export default AuthLayout;

// password pattern --> pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// username pattern --> pattern: /^[a-zA-Z0-9_]+$/

import React, { useState } from "react";
import { Space, Typography, Input, Button, Form } from "antd";
import { t } from "i18next";
import AxiosInstance from "../api/http";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function CompanyKeyPage() {
  const [companyKey, setCompanyKey] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disableSave, setDisableSave] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    AxiosInstance.get(`ClientInfo/GetClientInfo?clientIdentifier=${companyKey}`)
      .then((response) => {
        localStorage.setItem("companyInfo", JSON.stringify(response.data));
        if (response.data.siraNo !== 0) {
          localStorage.setItem("companyKey", companyKey);
          navigate("/login");
        } else if (response.data.siraNo === 0) {
          setInputStatus("error");
          setErrorMessage("Lütfen geçerli firma anahtarı girin");
          setDisableSave(true);
        }
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const handleInputChange = (e) => {
    setCompanyKey(e.target.value);
    setInputStatus("");
    setErrorMessage("");
    setDisableSave(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disableSave) {
      handleSave();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('/images/ats_login_image.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #00000027",
          borderRadius: "8px",
          width: "300px",
          filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.2))",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <Space direction="vertical" style={{ width: "100%", display: "flex", gap: "10px" }}>
          <Text>{t("lutfenFirmaAnahtariniziGirin")}</Text>
          <Input style={{ width: "100%" }} status={inputStatus} value={companyKey} onChange={handleInputChange} onKeyPress={handleKeyPress} autoComplete="on" name="companyKey" />
          {errorMessage && <Text type="danger">{errorMessage}</Text>}
          <Button style={{ width: "100%" }} type="primary" onClick={handleSave} disabled={disableSave}>
            {t("kaydet")}
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default CompanyKeyPage;

import React, { useState, useEffect } from "react";
import {
  Button,
  Popover,
  Typography,
  Modal,
  Input,
  Popconfirm,
  Checkbox,
} from "antd";
import { CaretDownOutlined, DeleteOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";

const { Text } = Typography;

function CustomDashboards(props) {
  const [header, setHeader] = useState("Dashboard"); // Header of the table
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [defaultDashboard, setDefaultDashboard] = useState("Dashboard");
  const {
    control,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useFormContext();

  // Set the default value for selectedDashboard when the component mounts
  useEffect(() => {
    const loadedDashboards =
      JSON.parse(localStorage.getItem("customDashboard")) || [];
    const savedDefaultDashboard =
      localStorage.getItem("defaultDashboard") || "Dashboard";
    setDashboards(loadedDashboards);
    setDefaultDashboard(savedDefaultDashboard);

    const currentSelectedDashboard = getValues("selectedDashboard");
    if (!currentSelectedDashboard) {
      setValue("selectedDashboard", savedDefaultDashboard, {
        shouldValidate: true,
      });
      setHeader(savedDefaultDashboard);
    }
  }, [setValue, getValues]);

  const handleDashboardClick = (dashboardName) => {
    // Update the header with the clicked dashboard name
    setHeader(dashboardName);
    // Set the value of the 'selectedDashboard' field in the form
    setValue("selectedDashboard", dashboardName);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const updatedDashboards = [...dashboards, newDashboardName];
    localStorage.setItem("customDashboard", JSON.stringify(updatedDashboards));
    setDashboards(updatedDashboards); // Update state with new list
    setIsModalVisible(false);
    setNewDashboardName(""); // Reset input field after saving
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteDashboard = (dashboardName) => {
    const currentSelectedDashboard = getValues("selectedDashboard");
    if (currentSelectedDashboard === dashboardName) {
      setValue("selectedDashboard", "Dashboard", { shouldValidate: true });
      setHeader("Dashboard");
    }
    const updatedDashboards = dashboards.filter(
      (dashboard) => dashboard !== dashboardName
    );
    localStorage.setItem("customDashboard", JSON.stringify(updatedDashboards));
    setDashboards(updatedDashboards);

    if (defaultDashboard === dashboardName) {
      localStorage.setItem("defaultDashboard", "Dashboard");
      setDefaultDashboard("Dashboard");
      setHeader("Dashboard");
      setValue("selectedDashboard", "Dashboard");
    }
  };

  const handleCheckboxChange = (e, dashboardName) => {
    if (e.target.checked) {
      localStorage.setItem("defaultDashboard", dashboardName);
      setDefaultDashboard(dashboardName);
      setHeader(dashboardName);
      setValue("selectedDashboard", dashboardName);
    }
  };

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <div
        key="defaultDashboard"
        style={{
          padding: "5px 10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "5px",
          backgroundColor:
            getValues("selectedDashboard") === "Dashboard"
              ? "#0086ff5c"
              : "white",
          border:
            getValues("selectedDashboard") === "Dashboard"
              ? "1px solid #0097ff"
              : "none",
        }}
        onClick={() => handleDashboardClick("Dashboard")}
      >
        <span>Dashboard</span>{" "}
        <Checkbox
          style={{ marginRight: "5px" }}
          checked={defaultDashboard === "Dashboard"}
          onChange={(e) => handleCheckboxChange(e, "Dashboard")}
        />
      </div>
      {dashboards.map((dashboard) => (
        <div
          key={dashboard}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 10px",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor:
              getValues("selectedDashboard") === dashboard
                ? "#0086ff5c"
                : "white",
            border:
              getValues("selectedDashboard") === dashboard
                ? "1px solid #0097ff"
                : "none",
          }}
        >
          <div
            onClick={() => handleDashboardClick(dashboard)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>{dashboard}</span>
          </div>
          <div>
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              onConfirm={() => handleDeleteDashboard(dashboard)}
              onCancel={() => ""}
              okText="Evet"
              cancelText="Hayır"
            >
              <Button type="text" icon={<DeleteOutlined />} danger></Button>{" "}
            </Popconfirm>{" "}
            <Checkbox
              style={{ marginRight: "5px" }}
              checked={defaultDashboard === dashboard}
              onChange={(e) => handleCheckboxChange(e, dashboard)}
            />
          </div>
        </div>
      ))}
      <Button type="dashed" onClick={showModal}>
        Yeni Dashboard Ekle
      </Button>
    </div>
  );

  return (
    <div style={{ cursor: "pointer" }}>
      <Popover
        content={content}
        title="Özel Dashboardlar"
        trigger="click"
        placement="bottomLeft"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Text style={{ fontWeight: "600", fontSize: "24px" }}>{header}</Text>
          <CaretDownOutlined />
        </div>
      </Popover>
      <Modal
        title="Yeni Özel Dashboard Ekle"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Input
          value={newDashboardName}
          onChange={(e) => setNewDashboardName(e.target.value)}
          placeholder="Dashboard İsmi"
        />
      </Modal>
    </div>
  );
}

export default CustomDashboards;

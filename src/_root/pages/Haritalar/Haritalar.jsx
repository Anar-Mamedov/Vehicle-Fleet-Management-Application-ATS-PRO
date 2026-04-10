import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Space, Spin, Typography } from "antd";
import { AimOutlined, CarOutlined, PauseCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { GetVehicleStatusService } from "../../../api/services/maps/vehicleStatusService";
import { formatNumberWithLocale } from "../../../hooks/FormattedNumber";

const { Title, Text } = Typography;

const pageContentStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const mapContainerStyle = {
  width: "100%",
  flex: 1,
  minHeight: 260,
  borderRadius: 8,
  overflow: "hidden",
};

const defaultCenter = { lat: 39.0, lng: 35.0 };

const mapStatsRowStyle = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const mapStatsCardStyle = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "10px 14px",
  flex: "1 1 260px",
  minHeight: 100,
};

const mapStatsIconWrapperStyle = {
  width: 34,
  height: 34,
  borderRadius: 10,
  border: "1px solid #e5e7eb",
  display: "grid",
  placeItems: "center",
  color: "#6b7280",
  fontSize: 16,
  background: "#f9fafb",
};

const Haritalar = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isMapKeyMissing = !mapApiKey;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "haritalar-google-map-script",
    googleMapsApiKey: mapApiKey || "",
  });

  const markerIcon = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;

    return {
      url: "/images/Araba.svg",
      scaledSize: new window.google.maps.Size(34, 34),
      anchor: new window.google.maps.Point(17, 34),
    };
  }, [isLoaded]);

  const mapCenter = useMemo(() => {
    if (!vehicles.length) return defaultCenter;
    return {
      lat: vehicles[0].latitude,
      lng: vehicles[0].longitude,
    };
  }, [vehicles]);

  const vehicleStats = useMemo(() => {
    const moving = vehicles.reduce((count, vehicle) => count + (Number(vehicle.speed) > 0 ? 1 : 0), 0);
    const total = vehicles.length;

    return {
      total,
      moving,
      parked: Math.max(total - moving, 0),
    };
  }, [vehicles]);

  const mapStatCards = useMemo(
    () => [
      {
        key: "total",
        title: t("mapTotalTrackedVehiclesTitle"),
        subtitle: t("mapTotalTrackedVehiclesSubtitle"),
        value: vehicleStats.total,
        icon: <CarOutlined />,
      },
      {
        key: "moving",
        title: t("mapMovingVehiclesTitle"),
        subtitle: t("mapMovingVehiclesSubtitle"),
        value: vehicleStats.moving,
        icon: <AimOutlined />,
      },
      {
        key: "parked",
        title: t("mapParkedVehiclesTitle"),
        subtitle: t("mapParkedVehiclesSubtitle"),
        value: vehicleStats.parked,
        icon: <PauseCircleOutlined />,
      },
    ],
    [t, vehicleStats]
  );

  const fetchVehicleData = useCallback(async () => {
    if (isMapKeyMissing) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await GetVehicleStatusService();
      setVehicles(response);
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      setErrorMessage(serverMessage || error?.message || t("mapApiError"));
    } finally {
      setLoading(false);
    }
  }, [isMapKeyMissing, t]);

  useEffect(() => {
    fetchVehicleData();
  }, [fetchVehicleData]);

  return (
    <Card style={{ height: "calc(100vh - 120px)" }} styles={{ body: { height: "100%", padding: 16 } }}>
      <div style={pageContentStyle}>
        <Space style={{ width: "100%", justifyContent: "space-between" }} align="center">
          <div>
            <Title level={4} style={{ marginBottom: 4 }}>
              {t("haritalar")}
            </Title>
            <Text type="secondary">{t("mapVehiclePositions")}</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={fetchVehicleData} loading={loading} disabled={isMapKeyMissing}>
            {t("mapRefresh")}
          </Button>
        </Space>

        {errorMessage && <Alert type="error" showIcon message={t("mapApiError")} description={errorMessage} />}

        {loadError && <Alert type="error" showIcon message={t("mapGoogleLoadError")} description={loadError.message} />}

        <div style={mapStatsRowStyle}>
          {mapStatCards.map((card) => (
            <div key={card.key} style={mapStatsCardStyle}>
              <Space direction="vertical" size={5} style={{ width: "100%" }}>
                <Space align="start" style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 13, color: "#5d6786", fontWeight: 500 }}>{card.title}</Text>
                  <div style={mapStatsIconWrapperStyle}>{card.icon}</div>
                </Space>

                <Text strong style={{ fontSize: 30, lineHeight: 1.05, color: "#141414" }}>
                  {formatNumberWithLocale(card.value)}
                </Text>

                <Text type="secondary" style={{ fontSize: 11, lineHeight: "16px" }}>
                  {card.subtitle}
                </Text>
              </Space>
            </div>
          ))}
        </div>

        <div style={mapContainerStyle}>
          {isMapKeyMissing ? (
            <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
              <Alert type="warning" showIcon message={t("mapMissingEnvTitle")} description={t("mapMissingEnvDescription")} />
            </div>
          ) : !isLoaded ? (
            <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
              <Space direction="vertical" align="center">
                <Spin />
                <Text type="secondary">{t("mapLoading")}</Text>
              </Space>
            </div>
          ) : (
            <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={mapCenter} zoom={6} options={{ fullscreenControl: false }}>
              {vehicles.map((vehicle) => (
                <MarkerF
                  key={vehicle.id}
                  position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
                  icon={markerIcon}
                  onMouseOver={() => setActiveMarkerId(vehicle.id)}
                  onMouseOut={() => setActiveMarkerId((prev) => (prev === vehicle.id ? null : prev))}
                >
                  {activeMarkerId === vehicle.id && (
                    <InfoWindowF onCloseClick={() => setActiveMarkerId(null)}>
                      <Space direction="vertical" size={2}>
                        <Text strong>{`${t("plaka")}: ${vehicle.plate}`}</Text>
                        <Text>{`${t("maxHiz")}: ${vehicle.speed}`}</Text>
                        <Text>{`${t("adres")}: ${vehicle.address}`}</Text>
                        {vehicle.utcDateTime && <Text>{`${t("tarih")}: ${vehicle.utcDateTime}`}</Text>}
                      </Space>
                    </InfoWindowF>
                  )}
                </MarkerF>
              ))}
            </GoogleMap>
          )}
        </div>

        {!loading && !errorMessage && !vehicles.length && !isMapKeyMissing && <Alert type="info" showIcon message={t("mapNoVehicleData")} />}
      </div>
    </Card>
  );
};

export default Haritalar;

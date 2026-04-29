import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Space, Spin, Typography } from "antd";
import { AimOutlined, CarOutlined, PauseCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { GetVehicleStatusService } from "../../../api/services/maps/vehicleStatusService";
import { formatNumberWithLocale } from "../../../hooks/FormattedNumber";
import FormattedDate from "../../components/FormattedDate";

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
const movingMarkerGradient = ["#3B82F6", "#1D4ED8"];
const parkedMarkerGradient = ["#FF6B57", "#D93A2D"];

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

const getMapDateTimeFormatByLanguage = () => {
  const currentLang = localStorage.getItem("i18nextLng") || "tr";
  const defaultDateTimeFormat = "DD.MM.YYYY HH:mm:ss";
  const formatByLanguage = {
    tr: defaultDateTimeFormat,
    en: "MM/DD/YYYY HH:mm:ss",
    ru: defaultDateTimeFormat,
    az: defaultDateTimeFormat,
  };

  return formatByLanguage[currentLang] || defaultDateTimeFormat;
};

const getVehicleMarkerSvg = ([gradientStart, gradientEnd]) => `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
  <defs>
    <linearGradient id="pinGradient" x1="32" y1="2" x2="32" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${gradientStart}"/>
      <stop offset="1" stop-color="${gradientEnd}"/>
    </linearGradient>
    <filter id="pinShadow" x="8" y="0" width="48" height="62" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.28"/>
    </filter>
  </defs>
  <g filter="url(#pinShadow)">
    <path d="M32 4C21.5 4 13 12.5 13 23C13 36.6 27.9 52.6 31 56.1C31.5 56.7 32.5 56.7 33 56.1C36.1 52.6 51 36.6 51 23C51 12.5 42.5 4 32 4Z" fill="url(#pinGradient)"/>
  </g>
  <circle cx="32" cy="23" r="14" fill="#FFFFFF" fill-opacity="0.95"/>
  <g transform="translate(20 16)">
    <path d="M5 14.5C5 11.9 7.1 9.8 9.7 9.8H14.3C16.9 9.8 19 11.9 19 14.5V17.2H5V14.5Z" fill="#1F2937"/>
    <path d="M8.6 11.2L9.9 8.2C10.1 7.7 10.6 7.4 11.2 7.4H12.8C13.4 7.4 13.9 7.7 14.1 8.2L15.4 11.2H8.6Z" fill="#374151"/>
    <rect x="6.4" y="12.1" width="3.9" height="1.7" rx="0.8" fill="#93C5FD"/>
    <rect x="13.7" y="12.1" width="3.9" height="1.7" rx="0.8" fill="#93C5FD"/>
    <circle cx="8.1" cy="17.7" r="2.1" fill="#111827"/>
    <circle cx="15.9" cy="17.7" r="2.1" fill="#111827"/>
    <circle cx="8.1" cy="17.7" r="0.9" fill="#9CA3AF"/>
    <circle cx="15.9" cy="17.7" r="0.9" fill="#9CA3AF"/>
  </g>
</svg>`;

const getVehicleMarkerUrl = (gradientColors) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(getVehicleMarkerSvg(gradientColors))}`;

const Haritalar = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const mapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const isMapKeyMissing = !mapApiKey;
  const mapDateTimeFormat = getMapDateTimeFormatByLanguage();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "haritalar-google-map-script",
    googleMapsApiKey: mapApiKey || "",
  });

  const markerIcons = useMemo(() => {
    if (!isLoaded || !window.google) return undefined;

    const scaledSize = new window.google.maps.Size(34, 34);
    const anchor = new window.google.maps.Point(17, 34);

    return {
      moving: {
        url: getVehicleMarkerUrl(movingMarkerGradient),
        scaledSize,
        anchor,
      },
      parked: {
        url: getVehicleMarkerUrl(parkedMarkerGradient),
        scaledSize,
        anchor,
      },
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
                  icon={Number(vehicle.speed) > 0 ? markerIcons?.moving : markerIcons?.parked}
                  onMouseOver={() => setActiveMarkerId(vehicle.id)}
                  onMouseOut={() => setActiveMarkerId((prev) => (prev === vehicle.id ? null : prev))}
                >
                    {activeMarkerId === vehicle.id && (
                      <InfoWindowF onCloseClick={() => setActiveMarkerId(null)}>
                        <Space direction="vertical" size={2}>
                          <Text strong>{`${t("cihazNo")}: ${vehicle.deviceNo || "-"}`}</Text>
                          <Text>{`${t("maxHiz")}: ${vehicle.speed}`}</Text>
                          <Text>{`${t("adres")}: ${vehicle.address}`}</Text>
                          {vehicle.utcDateTime && (
                            <Text>
                              {t("tarih")}: <FormattedDate date={vehicle.utcDateTime} format={mapDateTimeFormat} />
                            </Text>
                          )}
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

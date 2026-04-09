import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Space, Spin, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import { GetVehicleStatusService } from "../../../api/services/maps/vehicleStatusService";

const { Title, Text } = Typography;

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 280px)",
  borderRadius: 8,
  overflow: "hidden",
};

const defaultCenter = { lat: 39.0, lng: 35.0 };

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
      scaledSize: new window.google.maps.Size(36, 36),
    };
  }, [isLoaded]);

  const mapCenter = useMemo(() => {
    if (!vehicles.length) return defaultCenter;
    return {
      lat: vehicles[0].latitude,
      lng: vehicles[0].longitude,
    };
  }, [vehicles]);

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
    <Card>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
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

        <div style={containerStyle}>
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
      </Space>
    </Card>
  );
};

export default Haritalar;

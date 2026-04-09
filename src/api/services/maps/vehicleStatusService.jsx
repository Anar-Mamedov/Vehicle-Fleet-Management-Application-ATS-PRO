import axios from "axios";

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const buildSoapEnvelope = ({ username, pin1, pin2, language, xmlNamespace }) => `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetVehicleStatus xmlns="${escapeXml(xmlNamespace)}">
      <Username>${escapeXml(username)}</Username>
      <PIN1>${escapeXml(pin1)}</PIN1>
      <PIN2>${escapeXml(pin2)}</PIN2>
      <Language>${escapeXml(language)}</Language>
    </GetVehicleStatus>
  </soap:Body>
</soap:Envelope>`;

const extractFieldMap = (node) => {
  const result = {};
  Array.from(node.children || []).forEach((child) => {
    result[child.localName] = (child.textContent || "").trim();
  });
  return result;
};

const normalizeVehicle = (fields, index) => {
  const latitude = parseNumber(fields.Latitude);
  const longitude = parseNumber(fields.Longitude);

  if (latitude === null || longitude === null) {
    return null;
  }

  const deviceNo =
    fields.Device_x0020_No || fields.DeviceNo || fields.Device || fields.Vehicle_x0020_No || fields.VehicleNo || `vehicle-${index + 1}`;

  return {
    id: `${deviceNo}-${index}`,
    plate: fields.Plate || fields.Vehicle_x0020_Plate || fields.VehiclePlate || deviceNo,
    address: fields.Address || "-",
    speed: parseNumber(fields.Speed) || 0,
    city: fields.City || "",
    town: fields.Town || "",
    utcDateTime: fields.UTC_x0020_Date_x0020_Time || "",
    latitude,
    longitude,
  };
};

const parseVehicleStatusResponse = (xmlText) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const parseErrors = xmlDoc.getElementsByTagName("parsererror");
  if (parseErrors.length > 0) {
    throw new Error("Vehicle status XML parse error.");
  }

  const faultNode = Array.from(xmlDoc.getElementsByTagName("*")).find((node) => node.localName === "faultstring");
  if (faultNode?.textContent) {
    throw new Error(faultNode.textContent.trim());
  }

  const vehicleNodes = Array.from(xmlDoc.getElementsByTagName("*")).filter((node) => node.localName === "VehicleStatus");

  return vehicleNodes
    .map((node, index) => normalizeVehicle(extractFieldMap(node), index))
    .filter(Boolean);
};

export const getMissingVehicleStatusEnvVars = () => {
  const envGroups = [
    { label: "VITE_ARVENTO_VEHICLE_STATUS_URL", keys: ["VITE_ARVENTO_VEHICLE_STATUS_URL", "VITE_AVRENTO_VEHICLE_STATUS_URL"] },
    { label: "VITE_ARVENTO_SOAP_ACTION", keys: ["VITE_ARVENTO_SOAP_ACTION", "VITE_AVRENTO_SOAP_ACTION"] },
    { label: "VITE_ARVENTO_USERNAME", keys: ["VITE_ARVENTO_USERNAME", "VITE_AVRENTO_USERNAME"] },
    { label: "VITE_ARVENTO_PIN1", keys: ["VITE_ARVENTO_PIN1", "VITE_AVRENTO_PIN1", "VITE_AVRENTO_PASSWORD"] },
    { label: "VITE_ARVENTO_PIN2", keys: ["VITE_ARVENTO_PIN2", "VITE_AVRENTO_PIN2", "VITE_AVRENTO_CLIENT_ID"] },
  ];

  return envGroups
    .filter(({ keys }) => !keys.some((key) => import.meta.env[key]))
    .map(({ label }) => label);
};

export const GetVehicleStatusService = async () => {
  const endpoint = import.meta.env.VITE_ARVENTO_VEHICLE_STATUS_URL || import.meta.env.VITE_AVRENTO_VEHICLE_STATUS_URL;
  const soapAction = import.meta.env.VITE_ARVENTO_SOAP_ACTION || import.meta.env.VITE_AVRENTO_SOAP_ACTION;
  const username = import.meta.env.VITE_ARVENTO_USERNAME || import.meta.env.VITE_AVRENTO_USERNAME;
  const pin1 = import.meta.env.VITE_ARVENTO_PIN1 || import.meta.env.VITE_AVRENTO_PIN1 || import.meta.env.VITE_AVRENTO_PASSWORD;
  const pin2 = import.meta.env.VITE_ARVENTO_PIN2 || import.meta.env.VITE_AVRENTO_PIN2 || import.meta.env.VITE_AVRENTO_CLIENT_ID;
  const language = import.meta.env.VITE_ARVENTO_LANGUAGE || "tr";
  const xmlNamespace = import.meta.env.VITE_ARVENTO_XMLNS || "http://www.arvento.com/";
  const authorization = import.meta.env.VITE_ARVENTO_AUTHORIZATION || import.meta.env.VITE_AVRENTO_AUTHORIZATION;

  const missingKeys = getMissingVehicleStatusEnvVars();
  if (missingKeys.length > 0) {
    throw new Error(`Missing env vars: ${missingKeys.join(", ")}`);
  }

  const headers = {
    "Content-Type": "text/xml; charset=utf-8",
    SOAPAction: soapAction,
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  const payload = buildSoapEnvelope({
    username,
    pin1,
    pin2,
    language,
    xmlNamespace,
  });

  const response = await axios.post(endpoint, payload, {
    headers,
    responseType: "text",
    timeout: 30000,
  });

  return parseVehicleStatusResponse(response.data);
};

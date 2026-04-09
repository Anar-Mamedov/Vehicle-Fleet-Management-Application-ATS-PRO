import http from "../../http";

const parseNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

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
    deviceNo,
    plate: fields.Plate || fields.Vehicle_x0020_Plate || fields.VehiclePlate || deviceNo,
    address: fields.Address || "-",
    speed: parseNumber(fields.Speed) || 0,
    city: fields.City || "",
    town: fields.Town || "",
    utcDateTime: fields.GMT_x0020_Date_x002F_Time || fields.UTC_x0020_Date_x0020_Time || "",
    latitude,
    longitude,
  };
};

const getResponseText = (responseData) => {
  if (typeof responseData === "string") return responseData;
  if (responseData && typeof responseData === "object") {
    if (typeof responseData.xml === "string") return responseData.xml;
    if (typeof responseData.data === "string") return responseData.data;
  }
  return "";
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

  const allNodes = Array.from(xmlDoc.getElementsByTagName("*"));
  const vehicleNodes = allNodes.filter((node) => node.localName === "dtVehicleStatus" || node.localName === "VehicleStatus");

  if (vehicleNodes.length === 0) {
    const errorNode = allNodes.find((node) => node.localName === "Error" && (node.textContent || "").trim());
    if (errorNode) {
      throw new Error((errorNode.textContent || "").trim());
    }
  }

  return vehicleNodes
    .map((node, index) => normalizeVehicle(extractFieldMap(node), index))
    .filter(Boolean);
};

export const getMissingVehicleStatusEnvVars = () => [];

export const GetVehicleStatusService = async () => {
  let response;
  try {
    response = await http.get("/ArventoAracKonumBilgisi", { responseType: "text" });
  } catch (error) {
    if (error?.response?.status === 405) {
      response = await http.post("/ArventoAracKonumBilgisi", null, { responseType: "text" });
    } else {
      throw error;
    }
  }

  const xmlText = getResponseText(response?.data);
  if (!xmlText) throw new Error("Vehicle status response is empty.");

  return parseVehicleStatusResponse(xmlText);
};

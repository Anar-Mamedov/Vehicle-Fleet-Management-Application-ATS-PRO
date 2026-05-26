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

const parseVehicleStatusJsonResponse = (json) => {
  if (json && json.resultStatus !== undefined && json.resultStatus !== 0) {
    throw new Error(json.message || "Vehicle status JSON response error.");
  }

  let list = [];
  if (Array.isArray(json)) {
    list = json;
  } else if (json && Array.isArray(json.data)) {
    list = json.data;
  } else {
    return [];
  }

  return list
    .map((item, index) => {
      const latitude = parseNumber(item.latitude ?? item.Latitude);
      const longitude = parseNumber(item.longitude ?? item.Longitude);

      if (latitude === null || longitude === null) {
        return null;
      }

      const deviceNo =
        item.imei ||
        item.Imei ||
        item.deviceNo ||
        item.DeviceNo ||
        (item.vehicleID ? String(item.vehicleID) : null) ||
        (item.VehicleID ? String(item.VehicleID) : null) ||
        `vehicle-${index + 1}`;

      return {
        id: `${deviceNo}-${index}`,
        deviceNo,
        plate: item.plate || item.Plate || deviceNo,
        address: item.address || item.Address || item.tag || item.Tag || "-",
        speed: parseNumber(item.speed ?? item.Speed) || 0,
        city: item.city || item.City || "",
        town: item.town || item.Town || "",
        utcDateTime:
          item.locationDateTime ||
          item.LocationDateTime ||
          item.statusDateTime ||
          item.StatusDateTime ||
          item.deviceDateTime ||
          item.DeviceDateTime ||
          "",
        latitude,
        longitude,
      };
    })
    .filter(Boolean);
};

const tryParseJson = (rawData) => {
  if (typeof rawData === "object" && rawData) {
    if ("resultStatus" in rawData || "data" in rawData) {
      return rawData;
    }
  }
  if (typeof rawData === "string") {
    const trimmed = rawData.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const getMissingVehicleStatusEnvVars = () => [];

export const GetVehicleStatusService = async () => {
  const endpoint = "/Map/GetMapServiceResponseByName?serviceName=arvento";
  let response;
  try {
    response = await http.get(endpoint, { responseType: "text" });
  } catch (error) {
    if (error?.response?.status === 405) {
      response = await http.post(endpoint, null, { responseType: "text" });
    } else {
      throw error;
    }
  }

  const rawData = response?.data;
  if (!rawData) throw new Error("Vehicle status response is empty.");

  const parsedJson = tryParseJson(rawData);
  if (parsedJson) {
    return parseVehicleStatusJsonResponse(parsedJson);
  }

  const xmlText = getResponseText(rawData);
  if (!xmlText) throw new Error("Vehicle status response is empty.");

  return parseVehicleStatusResponse(xmlText);
};

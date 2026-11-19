import { t } from "i18next";
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

// SEYRMobil alanları camelCase gelir; değiştirilmeden aktarılan yanıtta PascalCase gelme ihtimaline karşı ikisi de okunur
const getAlan = (json, alan) => json?.[alan] ?? json?.[alan.charAt(0).toUpperCase() + alan.slice(1)];

// SEYRMobil hatası: resultStatus 0 dışındaysa (veya backend sarmalayıcısı status: false döndüyse) mesaj, yoksa exception metni gösterilir
const getSeyrMobilHataMesaji = (json) => {
  const exception = getAlan(json, "exception");
  const exceptionMesaji = typeof exception === "string" ? exception : getAlan(exception, "message");
  return getAlan(json, "message") || exceptionMesaji || t("mapSeyrMobilHatasi");
};

const isSeyrMobilHatasi = (json) => {
  const resultStatus = getAlan(json, "resultStatus");
  return (resultStatus !== undefined && resultStatus !== null && Number(resultStatus) !== 0) || getAlan(json, "status") === false;
};

// SEYRMobil yanıtı: { resultStatus, message, exception, data: [{ imei, plate, tag, speed, latitude, longitude, locationDateTime, ... }] }.
// Başarılı yanıtta data boş/null gelebilir; bu durumda gösterilecek araç yoktur.
const parseVehicleStatusJsonResponse = (json) => {
  if (!Array.isArray(json) && isSeyrMobilHatasi(json)) {
    throw new Error(getSeyrMobilHataMesaji(json));
  }

  const data = Array.isArray(json) ? json : getAlan(json, "data");
  if (!Array.isArray(data)) return [];

  return data
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

const parseJsonOrNull = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

// Backend sağlayıcı yanıtını değiştirmeden string olarak döndürür. String JSON olarak serileştirildiyse gövde
// tırnaklı bir JSON metni olur ("{\"resultStatus\":0,...}" veya "<?xml ...>"); önce bu kabuk açılır.
const unwrapJsonString = (rawData) => {
  if (typeof rawData !== "string") return rawData;

  const trimmed = rawData.trim();
  if (!trimmed.startsWith('"')) return rawData;

  const icMetin = parseJsonOrNull(trimmed);
  return typeof icMetin === "string" ? icMetin : rawData;
};

// SEYRMobil yanıtı JSON'dur; Arvento yanıtı XML olduğu için burada null döner ve XML akışına geçilir
const tryParseJson = (rawData) => {
  if (typeof rawData === "object" && rawData) {
    if (Array.isArray(rawData) || "resultStatus" in rawData || "data" in rawData) {
      return rawData;
    }
  }
  if (typeof rawData !== "string") return null;

  const trimmed = rawData.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return parseJsonOrNull(trimmed);
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

  const rawData = unwrapJsonString(response?.data);
  if (!rawData) throw new Error("Vehicle status response is empty.");

  const parsedJson = tryParseJson(rawData);
  if (parsedJson) {
    return parseVehicleStatusJsonResponse(parsedJson);
  }

  const xmlText = getResponseText(rawData);
  if (!xmlText) throw new Error("Vehicle status response is empty.");

  // JSON veya XML olmayan düz metin backend'in hata mesajıdır (ör. "Bilinmeyen servis adı."); olduğu gibi gösterilir
  if (!xmlText.trim().startsWith("<")) throw new Error(xmlText.trim());

  return parseVehicleStatusResponse(xmlText);
};

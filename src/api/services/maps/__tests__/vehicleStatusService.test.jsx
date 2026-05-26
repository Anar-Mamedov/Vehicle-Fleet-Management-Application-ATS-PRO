import { describe, it, expect, vi, beforeEach } from "vitest";
import { GetVehicleStatusService } from "../vehicleStatusService";
import http from "../../../http";

vi.mock("../../../http", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe("vehicleStatusService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully parse XML vehicle status data", async () => {
    const mockXml = `
      <ArrayOfDtVehicleStatus xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <dtVehicleStatus>
          <Latitude>41,0308</Latitude>
          <Longitude>29,1123</Longitude>
          <DeviceNo>123456</DeviceNo>
          <Plate>34 ABC 123</Plate>
          <Address>Kadıköy, İstanbul</Address>
          <Speed>60</Speed>
          <City>İstanbul</City>
          <Town>Kadıköy</Town>
          <UTC_x0020_Date_x0020_Time>2026-05-26T12:00:00</UTC_x0020_Date_x0020_Time>
        </dtVehicleStatus>
      </ArrayOfDtVehicleStatus>
    `;

    vi.mocked(http.get).mockResolvedValue({ data: mockXml });

    const result = await GetVehicleStatusService();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: "123456-0",
      deviceNo: "123456",
      plate: "34 ABC 123",
      address: "Kadıköy, İstanbul",
      speed: 60,
      city: "İstanbul",
      town: "Kadıköy",
      utcDateTime: "2026-05-26T12:00:00",
      latitude: 41.0308,
      longitude: 29.1123,
    });
  });

  it("should successfully parse JSON vehicle status data", async () => {
    const mockImei = "358899050376345";
    const mockDateTime = "2026-05-26T11:17:29.953";
    const mockJson = {
      resultStatus: 0,
      message: "",
      exception: null,
      data: [
        {
          imei: mockImei,
          statusDateTime: "2026-05-26T12:01:25.87",
          statusCreateDateTime: "2025-02-01T06:03:27.337",
          locationDateTime: mockDateTime,
          deviceDateTime: mockDateTime,
          locationCreateDateTime: "2026-05-26T11:18:05.85",
          speed: 1,
          latitude: 40.19190833333334,
          longitude: 29.087991666666664,
          angle: 326,
          plate: "34 HPV 550",
          tag: "34 HPV 550 Marmara Bölge Müdürlüğü",
          groupName: "Pazarlama Araçları",
          vehicleID: 8354,
        },
      ],
    };

    vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify(mockJson) });

    const result = await GetVehicleStatusService();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: `${mockImei}-0`,
      deviceNo: mockImei,
      plate: "34 HPV 550",
      address: "34 HPV 550 Marmara Bölge Müdürlüğü",
      speed: 1,
      city: "",
      town: "",
      utcDateTime: mockDateTime,
      latitude: 40.19190833333334,
      longitude: 29.087991666666664,
    });
  });

  it("should handle error response in JSON", async () => {
    const errorJson = {
      resultStatus: 1,
      message: "API error message",
      exception: null,
      data: null,
    };

    vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify(errorJson) });

    await expect(GetVehicleStatusService()).rejects.toThrow("API error message");
  });
});

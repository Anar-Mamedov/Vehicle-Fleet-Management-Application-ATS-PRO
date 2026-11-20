import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import i18next from "i18next";
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
  beforeAll(async () => {
    // cimode'da t() anahtarın kendisini döndürür
    await i18next.init({ lng: "cimode" });
  });

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

  describe("SEYRMobil yanıtı", () => {
    const SEYR_ARAC = {
      imei: "358899050376345",
      locationDateTime: "2026-11-19T09:15:00",
      speed: 42,
      latitude: 41.01,
      longitude: 28.97,
      plate: "34 SEY 001",
      tag: "34 SEY 001 Merkez",
      vehicleID: 12,
    };

    const SEYR_BEKLENEN = {
      id: "358899050376345-0",
      deviceNo: "358899050376345",
      plate: "34 SEY 001",
      address: "34 SEY 001 Merkez",
      speed: 42,
      city: "",
      town: "",
      utcDateTime: "2026-11-19T09:15:00",
      latitude: 41.01,
      longitude: 28.97,
    };

    it("backend string'i JSON olarak serileştirdiyse (tırnaklı metin) içindeki yanıtı okur", async () => {
      const yanit = JSON.stringify({ resultStatus: 0, message: "", exception: null, data: [SEYR_ARAC] });
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify(yanit) });

      await expect(GetVehicleStatusService()).resolves.toEqual([SEYR_BEKLENEN]);
    });

    it("başarılı yanıtta data boşsa araç listesi boş döner", async () => {
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify({ resultStatus: 0, message: "", exception: null, data: null }) });

      await expect(GetVehicleStatusService()).resolves.toEqual([]);
    });

    it("mesajsız hatada exception metnini gösterir", async () => {
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify({ resultStatus: 2, message: "", exception: { message: "Yetkisiz kullanıcı" }, data: null }) });

      await expect(GetVehicleStatusService()).rejects.toThrow("Yetkisiz kullanıcı");
    });

    it("mesaj ve exception yoksa genel SEYRMobil hata metnini gösterir", async () => {
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify({ resultStatus: 3, message: null, exception: null, data: null }) });

      await expect(GetVehicleStatusService()).rejects.toThrow("mapSeyrMobilHatasi");
    });

    it("PascalCase alanları da okur", async () => {
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify({ ResultStatus: 1, Message: "Geçersiz token", Data: null }) });

      await expect(GetVehicleStatusService()).rejects.toThrow("Geçersiz token");
    });

    it("status: false dönen yanıtı boş liste yerine hata olarak gösterir", async () => {
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify({ status: false, message: "Servis yanıt vermedi" }) });

      await expect(GetVehicleStatusService()).rejects.toThrow("Servis yanıt vermedi");
    });
  });

  it("JSON veya XML olmayan düz metin yanıtı backend mesajıyla hata olarak gösterir", async () => {
    vi.mocked(http.get).mockResolvedValue({ data: "Bilinmeyen servis adı." });

    await expect(GetVehicleStatusService()).rejects.toThrow("Bilinmeyen servis adı.");
  });

  it("tırnaklı metin olarak gelen Arvento XML yanıtını da okur", async () => {
    const xml = "<ArrayOfDtVehicleStatus><dtVehicleStatus><Latitude>41,0308</Latitude><Longitude>29,1123</Longitude><DeviceNo>1</DeviceNo><Plate>34 X 1</Plate></dtVehicleStatus></ArrayOfDtVehicleStatus>";
    vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify(xml) });

    const result = await GetVehicleStatusService();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ deviceNo: "1", plate: "34 X 1", latitude: 41.0308, longitude: 29.1123 });
  });

  describe("GetActualLocations yanıtı (DataSet)", () => {
    const tableSatiri = ({ sira, deviceId, plaka, enlem, boylam, hiz = 0, adres = "", il = "", ilce = "", tarih = "2026-11-20T12:06:49+03:00" }) => `
      <Table diffgr:id="Table${sira}" msdata:rowOrder="${sira - 1}">
        <owner>ORNEK FIRMA</owner>
        <device_id>${deviceId}</device_id>
        <data_time>${tarih}</data_time>
        <is_gps_active>1</is_gps_active>
        <is_vehicle_running>${hiz > 0 ? 1 : 0}</is_vehicle_running>
        <vehicle>${plaka}</vehicle>
        <address>${adres}</address>
        <latitude>${enlem}</latitude>
        <longitude>${boylam}</longitude>
        <speed>${hiz}</speed>
        ${il ? `<province>${il}</province>` : ""}
        ${ilce ? `<district>${ilce}</district>` : ""}
      </Table>`;

    const getActualLocationsYaniti = (satirlar) => `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <soap:Body>
          <GetActualLocationsResponse xmlns="http://tempuri.org/">
            <GetActualLocationsResult>
              <xs:schema id="NewDataSet" xmlns="" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
                <xs:element name="NewDataSet" msdata:IsDataSet="true"><xs:complexType><xs:choice minOccurs="0" maxOccurs="unbounded">
                  <xs:element name="Table"><xs:complexType><xs:sequence>
                    <xs:element name="device_id" type="xs:int" minOccurs="0" />
                    <xs:element name="latitude" type="xs:double" minOccurs="0" />
                  </xs:sequence></xs:complexType></xs:element>
                </xs:choice></xs:complexType></xs:element>
              </xs:schema>
              <diffgr:diffgram xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" xmlns:diffgr="urn:schemas-microsoft-com:xml-diffgram-v1">
                <NewDataSet xmlns="">${satirlar.join("")}</NewDataSet>
              </diffgr:diffgram>
            </GetActualLocationsResult>
          </GetActualLocationsResponse>
        </soap:Body>
      </soap:Envelope>`;

    it("Table satırlarını haritada gösterilecek araçlara çevirir", async () => {
      const xml = getActualLocationsYaniti([
        tableSatiri({ sira: 1, deviceId: "10000001", plaka: "34ABC123", enlem: "40.702498333333338", boylam: "29.99858", hiz: 42, adres: "Örnek Mah., Başiskele/Kocaeli", il: "Kocaeli", ilce: "Başiskele" }),
      ]);
      vi.mocked(http.get).mockResolvedValue({ data: xml });

      const result = await GetVehicleStatusService();

      expect(result).toEqual([
        {
          id: "10000001-0",
          deviceNo: "10000001",
          plate: "34ABC123",
          address: "Örnek Mah., Başiskele/Kocaeli",
          speed: 42,
          city: "Kocaeli",
          town: "Başiskele",
          utcDateTime: "2026-11-20T12:06:49+03:00",
          latitude: 40.702498333333338,
          longitude: 29.99858,
        },
      ]);
    });

    it("konumu 0/0 ya da boş gelen cihazları haritaya koymaz", async () => {
      const xml = getActualLocationsYaniti([
        tableSatiri({ sira: 1, deviceId: "10000001", plaka: "", enlem: "0", boylam: "0" }),
        tableSatiri({ sira: 2, deviceId: "10000002", plaka: "06XYZ06", enlem: "", boylam: "" }),
        tableSatiri({ sira: 3, deviceId: "10000003", plaka: "35DEF35", enlem: "38.4237", boylam: "27.1428" }),
      ]);
      vi.mocked(http.get).mockResolvedValue({ data: xml });

      const result = await GetVehicleStatusService();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ deviceNo: "10000003", plate: "35DEF35", latitude: 38.4237, longitude: 27.1428 });
    });

    it("adres boşsa ilçe/il, onlar da yoksa '-' gösterir; plaka boşsa cihaz numarasını plaka gibi göstermez", async () => {
      const xml = getActualLocationsYaniti([
        tableSatiri({ sira: 1, deviceId: "10000001", plaka: "34ABC123", enlem: "41.0", boylam: "29.0", il: "İstanbul", ilce: "Kadıköy" }),
        tableSatiri({ sira: 2, deviceId: "10000002", plaka: "", enlem: "39.9", boylam: "32.8" }),
      ]);
      vi.mocked(http.get).mockResolvedValue({ data: xml });

      const result = await GetVehicleStatusService();

      expect(result[0]).toMatchObject({ address: "Kadıköy/İstanbul", city: "İstanbul", town: "Kadıköy" });
      expect(result[1]).toMatchObject({ address: "-", plate: "", deviceNo: "10000002", city: "", town: "" });
    });

    it("tırnaklı metin olarak gelen yanıtı da okur", async () => {
      const xml = getActualLocationsYaniti([tableSatiri({ sira: 1, deviceId: "10000001", plaka: "34ABC123", enlem: "41.0", boylam: "29.0" })]);
      vi.mocked(http.get).mockResolvedValue({ data: JSON.stringify(xml) });

      const result = await GetVehicleStatusService();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ deviceNo: "10000001", plate: "34ABC123" });
    });

    it("SOAP hata yanıtındaki mesajı gösterir", async () => {
      const xml = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Body><soap:Fault><faultstring>Oturum süresi doldu</faultstring></soap:Fault></soap:Body></soap:Envelope>`;
      vi.mocked(http.get).mockResolvedValue({ data: xml });

      await expect(GetVehicleStatusService()).rejects.toThrow("Oturum süresi doldu");
    });
  });
});

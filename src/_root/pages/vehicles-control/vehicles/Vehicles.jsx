import React, { useCallback, useEffect, useState } from "react";
import AxiosInstance from "../../../../api/http";
import { message, Spin } from "antd";
import AraclarTablo from "./AraclarTablo";

function Vehicles() {
  const [ayarlarData, setAyarlarData] = useState(null);
  const [customFields, setCustomFields] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch custom fields
  useEffect(() => {
    const fetchCustomFields = async () => {
      try {
        const response = await AxiosInstance.get("CustomField/GetCustomFields?form=ARAC");
        if (response.data) {
          setCustomFields(response.data);
        }
      } catch (error) {
        console.error("Custom fields fetch error:", error);
        message.error("Özel alan isimleri yüklenirken bir hata oluştu");
      }
    };

    const fetchAyarlardata = async () => {
      try {
        const response = await AxiosInstance.get("ReminderSettings/GetReminderSettingsItems");
        if (response.data) {
          setAyarlarData(response.data);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        message.error("Ayarlar verileri yüklenirken bir hata oluştu");
      }
    };

    // Load both data sources in parallel
    Promise.all([fetchCustomFields(), fetchAyarlardata()]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <AraclarTablo ayarlarData={ayarlarData} customFields={customFields || {}} />
      )}
    </div>
  );
}

export default Vehicles;

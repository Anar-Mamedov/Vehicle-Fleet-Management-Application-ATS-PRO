import React, { useCallback, useEffect, useState } from "react";
import AxiosInstance from "../../../../api/http";
import { message, Spin } from "antd";
import AraclarTablo from "./YakitTablo";

function Vehicles() {
  const [customFields, setCustomFields] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch custom fields
  useEffect(() => {
    const fetchCustomFields = async () => {
      try {
        const response = await AxiosInstance.get("CustomField/GetCustomFields?form=YAKIT");
        if (response.data) {
          setCustomFields(response.data);
        }
      } catch (error) {
        console.error("Custom fields fetch error:", error);
        message.error("Özel alan isimleri yüklenirken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomFields();
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <AraclarTablo customFields={customFields || {}} />
      )}
    </div>
  );
}

export default Vehicles;

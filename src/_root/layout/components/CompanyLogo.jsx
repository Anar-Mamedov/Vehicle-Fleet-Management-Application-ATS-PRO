import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/http";

export function CompanyLogo() {
  const [clientLogo, setClientLogo] = useState(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const fetchClientLogo = async () => {
      try {
        const companyInfo = JSON.parse(localStorage.getItem("companyInfo"));
        if (companyInfo && companyInfo.logoId) {
          const body = {
            photoId: companyInfo.logoId,
            fileName: "logo",
            extension: ".png",
          };

          const response = await AxiosInstance.post("ClientInfo/GetClientAssets", body, { responseType: "blob" });
          if (response.data) {
            const imageUrl = URL.createObjectURL(response.data);
            setClientLogo(imageUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching client logo:", error);
        setLogoError(true);
      }
    };

    fetchClientLogo();
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {clientLogo && !logoError ? <img src={clientLogo} alt="client logo" style={{ height: "24px" }} /> : null}
    </div>
  );
}

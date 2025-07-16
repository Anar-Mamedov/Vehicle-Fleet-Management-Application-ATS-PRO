import React, { useState, useEffect } from "react";
import LokasyonTable from "../../../../components/LokasyonTable"; // veya LocationFilter
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Filters({ onChange }) {
  const [lokasyonId, setLokasyonId] = useState(null);

  useEffect(() => {
    // lokasyonId null veya boşsa filtreyi temizle
    if (!lokasyonId || !lokasyonId.locationId) {
      onChange("filters", {}); // tüm kayıtları getir
    } else {
      const filters = {
        customfilters: {
          lokasyonId: lokasyonId.locationId,
        },
      };
      onChange("filters", filters);
    }
  }, [lokasyonId]);

  const handleLokasyonChange = (value) => {
    // hem state'i güncelle, hem filtreyi tetikle
    setLokasyonId(value);
  };

  const handleSearch = () => {
    if (lokasyonId && lokasyonId.locationId) {
      const filters = {
        customfilters: {
          lokasyonId: lokasyonId.locationId,
        },
      };
      onChange("filters", filters);
      console.log("Sadece lokasyon filtresi ile arama:", filters);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <LokasyonTable onSubmit={handleLokasyonChange} />
    </div>
  );
}
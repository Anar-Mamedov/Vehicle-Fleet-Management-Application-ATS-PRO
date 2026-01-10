import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, Switch, Row, Col, Spin, message } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { t } from "i18next";

const { Text } = Typography;

export default function Parametreler({ hidePopover }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [customFieldsLabels, setCustomFieldsLabels] = useState({});

  // Define disabled fields first so we can use them in initial state if needed,
  // but better to enforce in useEffect to handle API responses too.
  const disabledFields = ["plaka", "aracTip", "lokasyon", "marka", "model", "yakitTip"];

  const [fields, setFields] = useState({
    plaka: true, // Disabled fields default to true
    yil: false,
    marka: true,
    model: true,
    aracGrubu: false,
    aracCinsi: false,
    aracRenk: false,
    lokasyon: true,
    departman: false,
    surucu: false,
    aracTip: true,
    guncelKm: false,
    muayeneTarih: false,
    egzosTarih: false,
    vergiTarih: false,
    takografTarih: false,
    sozlesmeTarih: false,
    yakitTip: true,
    kmLog: false,
    ozelAlan1: false,
    ozelAlan2: false,
    ozelAlan3: false,
    ozelAlan4: false,
    ozelAlan5: false,
    ozelAlan6: false,
    ozelAlan7: false,
    ozelAlan8: false,
    ozelAlan9: false,
    ozelAlan10: false,
    ozelAlan11: false,
    ozelAlan12: false,
  });

  // Effect to ensure disabled fields are always true
  useEffect(() => {
    setFields((prev) => {
      const updates = {};
      let hasUpdates = false;
      disabledFields.forEach((key) => {
        if (!prev[key]) {
          updates[key] = true;
          hasUpdates = true;
        }
      });
      return hasUpdates ? { ...prev, ...updates } : prev;
    });
  }, [JSON.stringify(fields)]);
  // careful with dependency loop. If we update fields in effect, it triggers effect again.
  // We check `!prev[key]` to only update if needed.
  // Using JSON.stringify(fields) or specific checks helps avoid infinite loops if referential equality changes but values don't.
  // However, simpler approach: Apply enforcement when setting state from API.

  const fetchFields = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/MandatoryFields/GetMandatoryFieldsByModule?module=arac");
      if (response.data) {
        let newFields = {};
        if (response.data.fields) {
          newFields = { ...response.data.fields };
        } else if (typeof response.data === "object") {
          newFields = { ...response.data };
        }

        // Enforce disabled fields to be true regardless of API response
        disabledFields.forEach((key) => {
          newFields[key] = true;
        });

        setFields((prev) => ({ ...prev, ...newFields }));
      }
    } catch (error) {
      console.error("Error fetching fields:", error);
      message.error(t("Alanlar yüklenirken bir hata oluştu."));
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomFields = async () => {
    try {
      const response = await AxiosInstance.get("CustomField/GetCustomFields?form=Arac");
      if (response.data) {
        setCustomFieldsLabels(response.data);
      }
    } catch (error) {
      console.error("Error fetching custom fields:", error);
      // Don't show error message to user, just fallback to default keys
    }
  };

  const handleOpen = () => {
    setIsModalVisible(true);
    fetchFields();
    fetchCustomFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    setProcessing(true);
    // Enforce one last time before sending, though UI prevents change
    const payloadFields = { ...fields };
    disabledFields.forEach((key) => {
      payloadFields[key] = true;
    });

    const payload = {
      module: "arac",
      fields: payloadFields,
    };

    try {
      await AxiosInstance.post("/MandatoryFields/ToggleFields", payload);
      message.success(t("Parametreler başarıyla güncellendi."));
      setIsModalVisible(false);
      if (hidePopover) hidePopover();
    } catch (error) {
      console.error("Error updating fields:", error);
      message.error(t("Güncelleme sırasında bir hata oluştu."));
    } finally {
      setProcessing(false);
    }
  };

  const handleSwitchChange = (key, checked) => {
    if (disabledFields.includes(key)) return; // Prevent change
    setFields((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const fieldKeys = [
    "plaka",
    "yil",
    "marka",
    "model",
    "aracGrubu",
    "aracCinsi",
    "aracRenk",
    "lokasyon",
    "departman",
    "surucu",
    "aracTip",
    "guncelKm",
    "muayeneTarih",
    "egzosTarih",
    "vergiTarih",
    "takografTarih",
    "sozlesmeTarih",
    "yakitTip",
    "kmLog",
    "ozelAlan1",
    "ozelAlan2",
    "ozelAlan3",
    "ozelAlan4",
    "ozelAlan5",
    "ozelAlan6",
    "ozelAlan7",
    "ozelAlan8",
    "ozelAlan9",
    "ozelAlan10",
    "ozelAlan11",
    "ozelAlan12",
  ];

  const getFieldLabel = (key) => {
    if (key.startsWith("ozelAlan") && customFieldsLabels[key]) {
      return customFieldsLabels[key];
    }
    return t(key);
  };

  return (
    <div>
      <div style={{ marginTop: "8px", cursor: "pointer", padding: "5px 0" }} onClick={handleOpen}>
        <Text>{t("Parametreler")}</Text>
      </div>

      <Modal
        title={t("Zorunlu Alan Parametreleri")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        confirmLoading={processing}
        okText={t("Kaydet")}
        cancelText={t("İptal")}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin />
          </div>
        ) : (
          <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "hidden" }}>
            <Row gutter={[16, 16]}>
              {fieldKeys.map((key) => (
                <Col span={8} key={key}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #f0f0f0", padding: "10px", borderRadius: "5px" }}>
                    <Text>{getFieldLabel(key)}</Text>
                    <Switch checked={fields[key]} onChange={(checked) => handleSwitchChange(key, checked)} disabled={disabledFields.includes(key)} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}

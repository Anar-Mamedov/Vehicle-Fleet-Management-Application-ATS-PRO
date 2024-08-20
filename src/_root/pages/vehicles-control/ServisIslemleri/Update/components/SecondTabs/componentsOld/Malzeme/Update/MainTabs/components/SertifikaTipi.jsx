import React, { useState, createRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select, Typography, Divider, Spin, Button, Input, message, Space } from "antd";
import AxiosInstance from "../../../../../../../../../../../api/http";
import { PlusOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const { Option } = Select;

export default function SertifikaTipi() {
  const { control, setValue } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = createRef();
  const [name, setName] = useState("");
  const [selectKey, setSelectKey] = useState(0);

  // message
  const [messageApi, contextHolder] = message.useMessage();

  // message end

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("KodList?grup=32772");
      if (response && response) {
        setOptions(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  // add new status to selectbox

  const addItem = () => {
    if (name.trim() !== "") {
      if (options.some((option) => option.KOD_TANIM === name)) {
        messageApi.open({
          type: "warning",
          content: "Bu durum zaten var!",
        });
        return;
      }

      setLoading(true);
      AxiosInstance.post(`AddKodList?entity=${name}&grup=32772`)
        .then((response) => {
          if (response.status_code === 201) {
            // Assuming 'id' is directly in the response
            const newId = response.id; // Adjust this line based on your actual response structure

            messageApi.open({
              type: "success",
              content: "Ekleme Başarılı",
            });
            setOptions((prevOptions) => [...prevOptions, { TB_KOD_ID: newId, KOD_TANIM: name }]);
            setSelectKey((prevKey) => prevKey + 1);
            setName("");
          } else {
            // Error handling
            messageApi.open({
              type: "error",
              content: "An error occurred", // Adjust the error message as needed
            });
          }
        })
        .catch((error) => {
          // Handle Axios errors
          console.error("Error adding item to API:", error);
          messageApi.open({
            type: "error",
            content: "An error occurred while adding the item.",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // add new status to selectbox end
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "space-between",
        maxWidth: "300px",
        width: "100%",
      }}>
      {contextHolder}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", width: "100%" }}>
        <Controller
          name="sertifikaTipi"
          control={control}
          rules={{ required: "Alan Boş Bırakılamaz!" }}
          render={({ field, fieldState: { error } }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
              <Select
                {...field}
                status={error ? "error" : ""}
                key={selectKey}
                style={{ width: "100%" }}
                showSearch
                allowClear
                placeholder="Seçim Yapınız"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false
                }
                onDropdownVisibleChange={(open) => {
                  if (open) {
                    fetchData(); // Fetch data when the dropdown is opened
                  }
                }}
                dropdownRender={(menu) => (
                  <Spin spinning={loading}>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        padding: "0 8px 4px",
                      }}>
                      <Input placeholder="" ref={inputRef} value={name} onChange={onNameChange} />
                      <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Ekle
                      </Button>
                    </Space>
                  </Spin>
                )}
                options={options.map((item) => ({
                  value: item.TB_KOD_ID, // Use the ID as the value
                  label: item.KOD_TANIM, // Display the name in the dropdown
                }))}
                onChange={(value) => {
                  // Seçilen değerin ID'sini NedeniID alanına set et
                  setValue("sertifikaTipiID", value);
                  field.onChange(value);
                }}
              />
              {error && <div style={{ color: "red" }}>{error.message}</div>}
            </div>
          )}
        />
        <Controller
          name="sertifikaTipiID"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text" // Set the type to "text" for name input
              style={{ display: "none" }}
            />
          )}
        />
      </div>
    </div>
  );
}

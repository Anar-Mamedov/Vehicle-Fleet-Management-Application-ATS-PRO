import React, { useState, createRef, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select, Typography, Divider, Spin, Button, Input, message, Space } from "antd";
import AxiosInstance from "../../../../../../../api/http";
import { PlusOutlined } from "@ant-design/icons";

const { Text, Link } = Typography;
const { Option } = Select;

export default function ServisNedeni({ disabled, fieldRequirements }) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
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
      const response = await AxiosInstance.get(`Code/GetCodeTextById?codeNumber=898`);
      if (response && response.data) {
        setOptions(response.data);
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
      if (options.some((option) => option.surucu === name)) {
        messageApi.open({
          type: "warning",
          content: "Bu ödeme türü zaten var!",
        });
        return;
      }
      const body = {
        codeId: 898,
        codeText: name,
      };
      setLoading(true);
      AxiosInstance.post(`Code/AddCode`, body)
        .then((response) => {
          if (response.data.statusCode === 201) {
            // Assuming 'id' is directly in the response
            const newId = response.data.id; // Adjust this line based on your actual response structure

            messageApi.open({
              type: "success",
              content: "Ekleme Başarılı",
            });
            setOptions((prevOptions) => [...prevOptions, { codeId: newId, isim: name }]);
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
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "space-between" }}>
      {contextHolder}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", flexDirection: "column" }}>
        <Controller
          name="odemeTuru"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              disabled={disabled}
              key={selectKey}
              style={{ width: "280px" }}
              showSearch
              allowClear
              placeholder="Seçim Yapınız"
              optionFilterProp="children"
              filterOption={(input, option) => (option.label ? option.label.toLowerCase().includes(input.toLowerCase()) : false)}
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
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input placeholder="" ref={inputRef} value={name} onChange={onNameChange} />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Ekle
                    </Button>
                  </Space>
                </Spin>
              )}
              options={options.map((item) => ({
                value: item.siraNo, // Use the ID as the value
                label: item.codeText, // Display the name in the dropdown
              }))}
              onChange={(value) => {
                // Seçilen değerin ID'sini NedeniID alanına set et
                // `null` veya `undefined` değerlerini ele al
                setValue("odemeTuru", value ?? null);
                setValue("odemeTuruKodId", value ?? null);
                field.onChange(value ?? null);
              }}
              value={field.value ?? null} // Eğer `field.value` `undefined` ise, `null` kullanarak `Select` bileşenine geçir
            />
          )}
        />
        <Controller
          name="odemeTuruKodId"
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

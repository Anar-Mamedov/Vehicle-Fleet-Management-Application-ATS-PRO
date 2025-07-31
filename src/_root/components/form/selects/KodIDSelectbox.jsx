import React, { useState, createRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, Typography, Divider, Spin, Button, Input, message, Space } from "antd";
import AxiosInstance from "../../../../api/http";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { t } from "i18next";

const { Text, Link } = Typography;
const { Option } = Select;

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledDiv = styled.div`
  @media (min-width: 600px) {
    align-items: center;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default function KodIDSelectbox({ name1, kodID, isRequired }) {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = createRef();
  const [name, setName] = useState("");
  const [selectKey, setSelectKey] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`Code/GetCodeTextById?codeNumber=${kodID}`);
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
      if (options.some((option) => option.codeText === name)) {
        message.warning("Bu durum zaten var!");
        return;
      }

      const body = {
        codeId: kodID,
        codeText: name,
      };

      setLoading(true);
      AxiosInstance.post(`Code/AddCode`, body)
        /* AxiosInstance.post(`AddKodList?entity=${name}&grup=${kodID}`) */
        .then((response) => {
          if (response.data.statusCode === 201) {
            // Assuming 'id' is directly in the response
            const newId = response.data.id; // Adjust this line based on your actual response structure
            message.success("İşlem Başarılı.");
            setOptions((prevOptions) => [...prevOptions, { siraNo: newId, codeText: name }]);
            setSelectKey((prevKey) => prevKey + 1);
            setName("");
          } else {
            // Error handling
            message.error("İşlem Başarısız.");
          }
        })
        .catch((error) => {
          // Handle Axios errors
          console.error("Error adding item to API:", error);
          message.error("İşlem Başarısız.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // add new status to selectbox end
  return (
    <StyledDiv
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
        rowGap: "0px",
      }}
    >
      <Controller
        name={name1}
        control={control}
        rules={{ required: isRequired ? t("alanBosBirakilamaz") : false }}
        render={({ field }) => (
          <StyledSelect
            {...field}
            status={errors[name1] ? "error" : ""}
            key={selectKey}
            // style={{ maxWidth: "300px", width: "100%" }}
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
                <div
                  style={{
                    padding: "0 8px 4px",
                    width: "100%",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Input style={{ flex: 1 }} placeholder="" ref={inputRef} value={name} onChange={onNameChange} />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Ekle
                  </Button>
                </div>
              </Spin>
            )}
            options={options.map((item) => ({
              value: item.siraNo, // Use the ID as the value
              label: item.codeText, // Display the name in the dropdown
            }))}
            onChange={(value) => {
              // Seçilen değerin ID'sini NedeniID alanına set et
              setValue(`${name1}ID`, value);
              field.onChange(value);
            }}
          />
        )}
      />
      {errors[name1] && <div style={{ color: "red", marginTop: "5px" }}>{errors[name1].message}</div>}
      <Controller
        name={`${name1}ID`}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text" // Set the type to "text" for name input
            style={{ display: "none" }}
          />
        )}
      />
    </StyledDiv>
  );
}

import React, { useState, useRef } from "react";
import { Form, Select, Divider, Spin, Button, Input, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import AxiosInstance from "../../../../../../../../../api/http";
import { t } from "i18next";

const { Option } = Select;

const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
  }
  @media (max-width: 600px) {
  }
`;

export default function RaporGrupSelectbox({ form, ...rest }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState("");
  const inputRef = useRef(null);
  const lan = localStorage.getItem("i18nextLng") || "tr";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`ReportGroup/GetReportGroup?lan=${lan}`);
      if (response.data && response.data.length > 0) {
        setOptions(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (e) => {
    setNewItem(e.target.value);
  };

  const addItem = () => {
    const trimmedItem = newItem.trim();
    if (!trimmedItem) return;

    // Check if the item already exists
    if (options.some((option) => option.rpgAciklama === trimmedItem)) {
      message.warning("Bu durum zaten var!");
      return;
    }

    setLoading(true);
    AxiosInstance.post(`ReportGroup/AddReportGroup`, { rpgAciklama: trimmedItem, rpgProgram: "G" })
      .then((response) => {
        // Adjust the condition below based on your actual API response
        if (response.data.statusCode == 200) {
          // Suppose the API returns the newly created ID in response.data.id
          message.success("İşlem Başarılı.");
          fetchData();
          setNewItem("");
        } else {
          message.error("İşlem Başarısız.");
        }
      })
      .catch((error) => {
        console.error("Error adding item to API:", error);
        message.error("İşlem Başarısız.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Form.Item
        label="Rapor Grup"
        name="reportGroup"
        style={{ width: "430px", marginBottom: "10px" }}
        rules={[
          {
            required: true,
            message: t("alanBosBirakilamaz"),
          },
        ]}
      >
        <StyledSelect
          showSearch
          allowClear
          placeholder="Seçim Yapınız"
          optionFilterProp="children"
          filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
          onDropdownVisibleChange={(open) => {
            if (open) {
              fetchData();
            }
          }}
          dropdownRender={(menu) => (
            <Spin spinning={loading}>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input ref={inputRef} value={newItem} onChange={onNameChange} placeholder="Yeni Durum Ekle" />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Ekle
                </Button>
              </Space>
            </Spin>
          )}
          options={options.map((item) => ({
            value: item.tbRaporGroupId,
            label: item.rpgAciklama,
          }))}
          onChange={(value, option) => {
            form.setFieldsValue({
              reportGroup: option.label,
              reportGroupID: value,
            });
          }}
          {...rest}
        />
      </Form.Item>
      <Form.Item label="Rapor ID" name="reportGroupID" hidden>
        <Input />
      </Form.Item>
    </>
  );
}

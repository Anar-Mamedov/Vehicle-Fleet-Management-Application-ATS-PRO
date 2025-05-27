import React, { useState } from "react";
import { Select, Button, Dropdown, Menu } from "antd";
import AxiosInstance from "../../../../../api/http";

const { Option } = Select;

const LocationFilter = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);

  // useeffect ile api den veri data cekip options a atayacagiz
  const [options, setOptions] = React.useState([]);
  const [filters, setFilters] = useState({});

  const handleChange = (value) => {
    // Create a copy of the current selected items
    const selectedItemsCopy = { ...filters };

    // Loop through all options
    options.forEach((option) => {
      const isSelected = selectedItemsCopy[option.key] !== undefined;

      // If the option is already selected, and it's not in the new value, remove it
      if (isSelected && !value.includes(option.value)) {
        delete selectedItemsCopy[option.key];
      }
      // If the option is not selected and it's in the new value, add it
      else if (!isSelected && value.includes(option.value)) {
        selectedItemsCopy[option.key] = option.value;
      }
    });

    // Update the filters state with the updated selection
    setFilters(selectedItemsCopy);
  };

  React.useEffect(() => {
    AxiosInstance.get("getLokasyonlar")
      .then((response) => {
        setOptions(response.map((option, index) => ({ key: index, value: option })));
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  }, []);

  const handleSubmit = () => {
    // Seçilen öğeleri başka bir bileşene iletmek için prop olarak gelen işlevi çağırın
    onSubmit(filters);

    // Seçilen öğeleri sıfırlayabiliriz
    // setFilters({});
    // Dropdown'ı gizle
    setVisible(false);
  };

  const handleCancelClick = () => {
    // Seçimleri iptal etmek için seçilen öğeleri sıfırlayın
    setFilters({});
    // Dropdown'ı gizle
    setVisible(false);
    onSubmit("");
  };

  const menu = (
    <Menu style={{ width: "300px" }}>
      <div
        style={{ borderBottom: "1px solid #ccc", padding: "10px", display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleCancelClick}>İptal</Button>
        <Button type="primary" onClick={handleSubmit}>
          Uygula
        </Button>
      </div>
      <div style={{ padding: "10px" }}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Ara..."
          value={Object.values(filters)}
          onChange={handleChange}
          allowClear
          showArrow={false}>
          {/* Seçenekleri elle ekleyin */}
          {options.map((option) => (
            <Option key={option.key} value={option.value}>
              {option.value}
            </Option>
          ))}
        </Select>
      </div>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement="bottomLeft"
      trigger={["click"]}
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}>
      <Button style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        Lokasyon
        <span
          style={{
            marginLeft: "5px",
            background: "#006cb8",
            borderRadius: "50%",
            width: "17px",
            height: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}>
          {Object.keys(filters).length}{" "}
        </span>
      </Button>
    </Dropdown>
  );
};

export default LocationFilter;

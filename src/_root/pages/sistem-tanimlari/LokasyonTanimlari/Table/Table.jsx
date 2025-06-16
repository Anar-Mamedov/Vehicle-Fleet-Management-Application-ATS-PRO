import React, { useCallback, useEffect, useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Input, Table, Spin } from "antd";
import AxiosInstance from "../../../../../api/http.jsx";
import CreateDrawer from "../Insert/CreateDrawer";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import EditDrawer from "../Update/EditDrawer";
import BreadcrumbComp from "../../../../components/breadcrumb/Breadcrumb.jsx";
import ContextMenu from "../components/ContextMenu/ContextMenu.jsx";
import { t } from "i18next";
import styled from "styled-components";

const { Search } = Input;

const breadcrumb = [{ href: "/", title: <HomeOutlined /> }, { title: t("lokasyonTanimlari") }];

const CustomSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #0091ff !important; /* Blue color */
  }
`;

export default function MainTable() {
  const { watch, control, setValue } = useFormContext();
  const { fields, append, replace } = useFieldArray({
    control,
    name: "lokasyon",
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // edit drawer için
  const [drawer, setDrawer] = useState({
    visible: false,
    data: null,
  });

  useEffect(() => {
    // Initial data fetch with empty search
    fetchRootData("");
  }, []);

  const fetchRootData = async (parameter = "") => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=0&parameter=${parameter}`);
      if (response.data) {
        const formattedData = formatDataForTable(response.data);
        setTreeData(formattedData);
        replace(formattedData);
      } else {
        console.error("API response is not in expected format");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error in API request:", error);
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    // Clear existing data and reset expanded rows to avoid confusion
    setTreeData([]);
    setExpandedRowKeys([]);
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setValue("selectedLokasyonId", null);

    // Set loading state to show the user something is happening
    setLoading(true);

    // Update search term
    const searchValue = value !== undefined ? value : searchTerm;
    setSearchTerm(searchValue);

    // Fetch new data
    fetchRootData(searchValue);
  };

  const formatDataForTable = (data) => {
    return data.map((item) => ({
      ...item,
      key: item.locationId,
      children: item.hasChild ? [] : undefined,
    }));
  };

  const onTableRowExpand = (expanded, record) => {
    // Update expanded row keys
    setExpandedRowKeys((prevKeys) => {
      if (expanded) {
        return [...prevKeys, record.key];
      } else {
        return prevKeys.filter((key) => key !== record.key);
      }
    });

    // Load children data when expanding
    if (expanded && record.hasChild && record.children.length === 0 && record.locationId) {
      setLoading(true);

      AxiosInstance.get(`Location/GetChildLocationListByParentId?parentID=${record.locationId}&parameter=${searchTerm}`)
        .then((response) => {
          const childrenData = formatDataForTable(response.data);

          // Update tree data with new children
          const updateTreeData = (data) => {
            return data.map((item) => {
              if (item.key === record.key) {
                return { ...item, children: childrenData };
              } else if (item.children) {
                return { ...item, children: updateTreeData(item.children) };
              } else {
                return item;
              }
            });
          };

          const updatedTreeData = updateTreeData([...treeData]);
          setTreeData(updatedTreeData);
          replace(updatedTreeData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setLoading(false);
        });
    }
  };

  const columns = [
    {
      title: "Lokasyon Tanımı",
      key: "lokasyonBilgisi",
      width: "60%",
      ellipsis: true,
      render: (text, record) => (
        <div>
          <div>{record.location}</div>
          {record.fullLocationPath && <div style={{ color: "gray", fontSize: "12px" }}>{record.fullLocationPath}</div>}
        </div>
      ),
    },
    {
      title: "Lokasyon Tüm Yol",
      dataIndex: "fullLocationPath",
      key: "fullLocationPath",
      width: "40%",
      ellipsis: true,
    },
  ];

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
    if (newSelectedRowKeys.length > 0) {
      setValue("selectedLokasyonId", newSelectedRowKeys[0]);
    } else {
      setValue("selectedLokasyonId", null);
    }
  };

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onRowClick = (record) => {
    return {
      onClick: () => {
        setDrawer({ visible: true, data: record });
      },
    };
  };

  const refreshTableData = useCallback(() => {
    // Reset all states when refreshing data
    setExpandedRowKeys([]);
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setValue("selectedLokasyonId", null);
    fetchRootData(searchTerm);
  }, [searchTerm]);

  return (
    <div>
      {/* <div
        style={{
          backgroundColor: "white",
          marginBottom: "15px",
          padding: "15px",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <BreadcrumbComp items={breadcrumb} />
      </div> */}
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginBottom: "15px",
          gap: "10px",
          padding: "15px",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: "10px" }}>
          <Search style={{ width: "250px" }} placeholder="Arama yap..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onSearch={handleSearch} enterButton />
          <CreateDrawer selectedLokasyonId={selectedRowKeys[0]} onRefresh={refreshTableData} />
        </div>

        <ContextMenu selectedRows={selectedRows} refreshTableData={refreshTableData} />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "calc(100vh - 200px)",
          borderRadius: "8px 8px 8px 8px",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <CustomSpin spinning={loading}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={treeData}
            pagination={false}
            onRow={onRowClick}
            scroll={{ y: "calc(100vh - 300px)" }}
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
          />
        </CustomSpin>
        <EditDrawer selectedRow={drawer.data} onDrawerClose={() => setDrawer({ ...drawer, visible: false })} drawerVisible={drawer.visible} onRefresh={refreshTableData} />
      </div>
    </div>
  );
}

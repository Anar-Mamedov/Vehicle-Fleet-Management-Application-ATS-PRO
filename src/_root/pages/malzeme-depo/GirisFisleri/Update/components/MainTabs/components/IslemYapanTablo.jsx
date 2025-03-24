import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Button, Modal, Table, Input, message } from "antd";
import AxiosInstance from "../../../../../../../../api/http";
import { Resizable } from "react-resizable";
import { SearchOutlined } from "@ant-design/icons";
import { useFormContext } from "react-hook-form";
import useDebounce from "../../../../../../../../hooks/useDebounceNew"; // Doğru yolu ayarlayın

/**
 * Resizable table header component.
 */
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  const handleStyle = {
    position: "absolute",
    bottom: 0,
    right: "-5px",
    width: "20%",
    height: "100%",
    zIndex: 2,
    cursor: "col-resize",
    padding: "0px",
    backgroundSize: "0px",
  };

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={handleStyle}
        />
      }
      onResize={onResize}
      draggableOpts={{
        enableUserSelectHack: false,
      }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

/**
 * Main component for displaying and managing the table within a modal.
 */
/**
 * Main component for displaying and managing the table within a modal.
 */
export default function IslemYapanTablo({ workshopSelectedId, onSubmit }) {
  // Modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Selected row keys for the table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Data source for the table
  const [data, setData] = useState([]);

  // Loading state for API requests
  const [loading, setLoading] = useState(false);

  // Search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search term to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 2000); // 500ms debounce

  // Form context to watch form fields
  const { watch } = useFormContext();

  // Initialize query state with useReducer
  const queryReducer = (state, action) => {
    switch (action.type) {
      case "SET_SEARCH_TERM":
        return { ...state, searchTerm: action.payload, currentPage: 1 };
      case "SET_PAGINATION":
        return { ...state, currentPage: action.payload.currentPage, pageSize: action.payload.pageSize };
      case "SET_TOTAL":
        return { ...state, total: action.payload };
      default:
        return state;
    }
  };

  const [query, dispatch] = useReducer(queryReducer, {
    searchTerm: "",
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  // Watch form fields
  const islemiYapan = watch("islemiYapan");
  const plakaID = watch("PlakaID"); // Assuming 'PlakaID' is used elsewhere

  // Determine modal title based on 'islemiYapan' value
  const modalTitle = parseInt(islemiYapan, 10) === 1 ? "Yetkili Servis" : parseInt(islemiYapan, 10) === 2 ? "Bakım Departmanı" : "Kaza Kayıtları";

  // Table columns state
  const [columns, setColumns] = useState(() => {
    const savedWidths = localStorage.getItem("islemYapanTableColumnWidths");
    const defaultColumns = [
      {
        title: modalTitle,
        dataIndex: "column1",
        key: "column1",
        ellipsis: true,
        width: 350,
      },
      // Add more columns if needed
    ];

    if (!savedWidths) {
      return defaultColumns;
    }

    const parsedWidths = JSON.parse(savedWidths);
    return defaultColumns.map((col, index) => ({
      ...col,
      width: parsedWidths[index] || col.width,
    }));
  });

  /**
   * Update table columns when 'islemiYapan' or 'modalTitle' changes.
   */
  useEffect(() => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        title: modalTitle,
      }))
    );
  }, [islemiYapan, modalTitle]);

  /**
   * Handle column resizing.
   *
   * @param {number} index The index of the column being resized.
   */
  const handleResize =
    (index) =>
    (e, { size }) => {
      const newColumns = [...columns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setColumns(newColumns);
      // Save the new widths to localStorage
      localStorage.setItem("islemYapanTableColumnWidths", JSON.stringify(newColumns.map((col) => col.width)));
    };

  // Merge columns with resize handlers
  const mergedColumns = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  /**
   * Fetch data based on 'islemiYapan' value, search term, and pagination.
   */
  const fetchData = useCallback(() => {
    setLoading(true);
    let endpoint = "";
    let params = {};

    if (parseInt(islemiYapan, 10) === 1) {
      // Yetkili Servis
      endpoint = `Company/GetCompaniesList`;
      params = {
        page: query.currentPage,
        pageSize: query.pageSize,
        parameter: query.searchTerm,
        isService: true,
      };
    } else if (parseInt(islemiYapan, 10) === 2) {
      // Bakım Departmanı
      endpoint = `Code/GetCodeTextById`;
      params = {
        codeNumber: 114,
        page: query.currentPage,
        pageSize: query.pageSize,
      };
    } else {
      // Kaza Kayıtları
      endpoint = `Accident/GetAccidentRecords`; // Adjust endpoint as needed
      params = {
        page: query.currentPage,
        pageSize: query.pageSize,
        parameter: query.searchTerm, // Assuming similar structure
      };
    }

    AxiosInstance.get(endpoint, { params })
      .then((response) => {
        let fetchedData = [];
        let recordCount = 0;

        if (parseInt(islemiYapan, 10) === 1) {
          const { list, recordCount: count } = response.data;
          fetchedData = list.map((item) => ({
            ...item,
            key: item.firmaId,
            column1: item.unvan,
          }));
          recordCount = count;
        } else if (parseInt(islemiYapan, 10) === 2) {
          const { list, recordCount: count } = response.data;
          fetchedData = list.map((item) => ({
            ...item,
            key: item.siraNo,
            column1: item.codeText,
          }));
          recordCount = count;
        } else {
          // Handle Kaza Kayıtları similarly
          const { list, recordCount: count } = response.data;
          fetchedData = list.map((item) => ({
            ...item,
            key: item.recordId, // Adjust key as per data
            column1: item.recordName, // Adjust column data as per data
          }));
          recordCount = count;
        }

        setData(fetchedData);
        dispatch({ type: "SET_TOTAL", payload: recordCount });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        message.error("Veriler çekilirken bir hata oluştu.");
      })
      .finally(() => setLoading(false));
  }, [islemiYapan, query.currentPage, query.pageSize, query.searchTerm]);

  /**
   * Handle debounced search term changes.
   * Resets the current page to 1 and updates the search term in query state.
   */
  useEffect(() => {
    dispatch({ type: "SET_SEARCH_TERM", payload: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  /**
   * Fetch data whenever 'query.searchTerm', 'query.currentPage', 'query.pageSize', or 'isModalVisible' changes.
   */
  useEffect(() => {
    if (isModalVisible) {
      fetchData();
    }
  }, [fetchData, isModalVisible]);

  /**
   * Reset the modal state to its initial values.
   */
  const resetModalState = () => {
    setSearchTerm(""); // Clear the search input
    setSelectedRowKeys([]); // Reset selected rows
    setData([]); // Clear table data
    dispatch({
      type: "SET_PAGINATION",
      payload: { currentPage: 1, pageSize: 10 },
    }); // Reset pagination
  };

  /**
   * Toggle the modal visibility.
   */
  const handleModalToggle = () => {
    setIsModalVisible((prev) => {
      const newVisibility = !prev;
      if (!newVisibility) {
        resetModalState();
      }
      return newVisibility;
    });

    if (!isModalVisible) {
      // Fetch data when the modal is opened
      fetchData();
    }
  };

  /**
   * Handle the OK action in the modal.
   */
  const handleModalOk = () => {
    const selectedData = data.find((item) => item.key === selectedRowKeys[0]);
    if (selectedData) {
      onSubmit && onSubmit(selectedData);
    }
    resetModalState(); // Reset state after confirmation
    setIsModalVisible(false);
  };

  /**
   * Update selected row keys when `workshopSelectedId` changes.
   */
  useEffect(() => {
    setSelectedRowKeys(workshopSelectedId ? [workshopSelectedId] : []);
  }, [workshopSelectedId]);

  /**
   * Handle row selection changes.
   *
   * @param {Array} selectedKeys The selected row keys.
   */
  const onRowSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys.length ? [selectedKeys[0]] : []);
  };

  /**
   * Handle table pagination changes.
   *
   * @param {Object} paginationObj The new pagination object.
   */
  const handleTableChange = (paginationObj) => {
    dispatch({
      type: "SET_PAGINATION",
      payload: { currentPage: paginationObj.current, pageSize: paginationObj.pageSize },
    });
  };

  /**
   * Fetch data when the modal is opened and dependencies change.
   */
  // Already handled in useEffect above

  /**
   * Optional: Handle empty data gracefully.
   * If there's no data after search, inform the user.
   */
  useEffect(() => {
    if (isModalVisible && data.length === 0 && !loading) {
      message.info("Aramanıza uygun veri bulunamadı.");
    }
  }, [data, isModalVisible, loading]);

  return (
    <div>
      <Button onClick={handleModalToggle}>+</Button>
      <Modal width={1200} centered title={modalTitle} open={isModalVisible} onOk={handleModalOk} onCancel={handleModalToggle} destroyOnClose>
        <Input
          style={{ width: "250px", marginBottom: "10px" }}
          type="text"
          placeholder="Arama yap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#0091ff" }} />}
        />
        <Table
          rowSelection={{
            type: "radio",
            selectedRowKeys,
            onChange: onRowSelectChange,
          }}
          bordered
          components={{
            header: {
              cell: ResizableTitle,
            },
          }}
          scroll={{ y: "calc(100vh - 380px)" }}
          columns={mergedColumns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: query.currentPage,
            pageSize: query.pageSize,
            total: query.total,
            showTotal: (total) => `Toplam ${total} kayıt`,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </Modal>
    </div>
  );
}

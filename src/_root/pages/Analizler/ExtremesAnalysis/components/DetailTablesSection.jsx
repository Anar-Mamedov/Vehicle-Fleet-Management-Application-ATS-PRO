import React from "react";
import { Divider, Space } from "antd";
import PropTypes from "prop-types";
import AdvancedFailureTable from "./AdvancedFailureTable";
import OperatingExpenseTable from "./OperatingExpenseTable";

export default function DetailTablesSection({ failureData, expenseData }) {
  return (
    <>
      <Divider orientation="left" style={{ marginTop: 28 }}>
        Kritik Detay Listeleri
      </Divider>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <AdvancedFailureTable data={failureData} />
        <OperatingExpenseTable data={expenseData} />
      </Space>
    </>
  );
}

DetailTablesSection.propTypes = {
  failureData: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
  expenseData: PropTypes.arrayOf(PropTypes.shape({ plaka: PropTypes.string })),
};

DetailTablesSection.defaultProps = {
  failureData: [],
  expenseData: [],
};

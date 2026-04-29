import React from "react";
import { Button, Card, Col, Row, Select, Space, Typography } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import LocationFilter from "./LocationFilter";
import { emptyFilters } from "../utils/constants";

const { Text } = Typography;

export default function AnalysisFiltersCard({ filters, setFilters, typeOptions, brandOptions, typeLoading, brandLoading, loading, fetchSelectOptions, fetchAnalysisData }) {
  return (
    <Card bordered={false} style={{ borderRadius: 8 }}>
      <Row gutter={[12, 12]} align="middle" wrap>
        <Col flex="none">
          <Text strong>Filtreler</Text>
        </Col>
        <Col flex="0 1 320px">
          <LocationFilter value={filters.lokasyonIds} onChange={(lokasyonIds) => setFilters((state) => ({ ...state, lokasyonIds }))} />
        </Col>
        <Col flex="0 1 320px">
          <Select
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            loading={typeLoading}
            placeholder="Tüm Araç Tipleri"
            value={filters.aracTipIds}
            options={typeOptions}
            optionFilterProp="label"
            onChange={(aracTipIds) => setFilters((state) => ({ ...state, aracTipIds }))}
            onDropdownVisibleChange={(open) => {
              if (open && !typeOptions.length) fetchSelectOptions();
            }}
            style={{ width: "100%" }}
          />
        </Col>
        <Col flex="0 1 320px">
          <Select
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            loading={brandLoading}
            placeholder="Tüm Markalar"
            value={filters.aracMarkaIds}
            options={brandOptions}
            optionFilterProp="label"
            onChange={(aracMarkaIds) => setFilters((state) => ({ ...state, aracMarkaIds }))}
            onDropdownVisibleChange={(open) => {
              if (open && !brandOptions.length) fetchSelectOptions();
            }}
            style={{ width: "100%" }}
          />
        </Col>
        <Col flex="auto">
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setFilters(emptyFilters);
              }}
            >
              Temizle
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} loading={loading} onClick={fetchAnalysisData}>
              Uygula
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

AnalysisFiltersCard.propTypes = {
  filters: PropTypes.shape({
    lokasyonIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    aracTipIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    aracMarkaIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  typeOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })).isRequired,
  brandOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })).isRequired,
  typeLoading: PropTypes.bool.isRequired,
  brandLoading: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchSelectOptions: PropTypes.func.isRequired,
  fetchAnalysisData: PropTypes.func.isRequired,
};

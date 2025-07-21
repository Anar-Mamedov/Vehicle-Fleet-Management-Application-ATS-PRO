import React, { useState } from "react";
import { Button, Popover, List, Empty } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import styled from "styled-components";

const IconContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid white; /* Rozetin etrafında beyaz bir sınır */
`;

const ReportList = styled(List)`
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
`;

const ReportItem = styled(List.Item)`
  cursor: pointer;
  padding: 8px 12px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Bildirim({ reportResponse, setRaporModalVisible, updateReportData }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleReportClick = (report) => {
    // Benzersiz ID'ler ve key'ler ekle
    const dataWithUniqueKeys = report.list.map((item, index) => {
      // Unique ID oluştur - timestamp + index kombinasyonu
      const uniqueId = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...item,
        ID: uniqueId, // Orijinal ID'yi unique ID ile değiştir
        originalID: item.ID, // Orijinal ID'yi sakla
        uniqueRowKey: uniqueId,
      };
    });

    const originalDataWithKeys = (report.originalData || report.list).map((item, index) => {
      // Unique ID oluştur - timestamp + index kombinasyonu
      const uniqueId = `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...item,
        ID: uniqueId, // Orijinal ID'yi unique ID ile değiştir
        originalID: item.ID, // Orijinal ID'yi sakla
        uniqueRowKey: uniqueId,
      };
    });

    // Update context with the selected report data
    updateReportData({
      initialColumns: report.headers,
      columns: report.headers,
      tableData: dataWithUniqueKeys, // Benzersiz key'li veri
      originalData: originalDataWithKeys, // Benzersiz key'li orijinal veri
      columnFilters: report.columnFilters || {},
      filters: report.filters,
      reportName: report.reportName,
      totalRecords: report.totalRecords,
    });

    // Open the modal
    setRaporModalVisible(true);

    // Close the notification popover
    setOpen(false);
  };

  const content = (
    <div>
      {reportResponse && reportResponse.length > 0 ? (
        <ReportList
          dataSource={reportResponse}
          rowKey={(item, index) => `report-${index}-${item.timestamp}`}
          renderItem={(item, index) => (
            <ReportItem style={{ padding: "10px" }} onClick={() => handleReportClick(item)}>
              <List.Item.Meta title={item.reportName} description={`${item.totalRecords} kayıt - ${new Date(item.timestamp).toLocaleString()}`} />
            </ReportItem>
          )}
        />
      ) : (
        <Empty description="Bildirim bulunamadı" />
      )}
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
      <IconContainer>
        <Button type="success" shape="circle" icon={<IoNotificationsOutline style={{ fontSize: "24px" }} />}></Button>
        {reportResponse && reportResponse.length > 0 && <Badge />}
      </IconContainer>
    </Popover>
  );
}

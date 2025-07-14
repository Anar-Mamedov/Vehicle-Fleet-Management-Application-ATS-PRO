import React from "react";
import { Button } from "antd";
// import { PdfAxiosInstance } from "../../../../../../../../api/http";

const Form = ({ selectedRows }) => {
  const downloadPdf = async () => {
    try {
      const baseURL = localStorage.getItem("baseURL");
      selectedRows.forEach(async (row) => {
        window.open(`${baseURL}/FormRapor/GetFormByType?id=${row.key}&tipId=2`, "_blank");
      });
    } catch (error) {
      console.error("PDF indirme hatası:", error);
    }
  };

  return (
    <div>
      <Button style={{ display: "flex", padding: "0px 0px", alignItems: "center", justifyContent: "flex-start" }} type="submit" onClick={downloadPdf}>
        Formu İndir
      </Button>
    </div>
  );
};

export default Form;

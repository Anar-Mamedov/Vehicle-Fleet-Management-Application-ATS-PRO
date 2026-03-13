import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DownloadDocumentByIdService } from "../../../api/services/upload/services";
import { InboxOutlined, FileOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, message, Spin, Upload } from "antd";

const FileUpload = ({ filesUrl, loadingFiles, setFiles, uploadFinished, setUploadFinished }) => {
  const [filesArr, setFilesArr] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    setFilesArr(filesUrl);
  }, [filesUrl]);

  useEffect(() => {
    if (uploadFinished === 2) {
      setFiles(new FormData()); // file içeriğini temizler
      setUploadFinished(1);
      setFileList([]); // fileList'i sıfırlar
    }
  }, [uploadFinished, setFiles, setUploadFinished]);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("documents", file);
    setFiles(formData);
    setFileList([file]); // fileList'i günceller
  };

  const downloadFile = (file) => {
    const data = {
      fileId: file.tbDosyaId,
      extension: file.dosyaUzanti,
      fileName: file.dosyaAd,
    };

    DownloadDocumentByIdService(data)
      .then((res) => {
        const isPdf = file.dosyaUzanti?.toLowerCase() === ".pdf" || file.dosyaAd?.toLowerCase().endsWith(".pdf");
        if (isPdf) {
          const blobUrl = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
          window.open(blobUrl, "_blank");
        } else {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(res.data);
          link.download = file.dosyaAd;
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
      })
      .catch((err) => {
        console.error("Error downloading file:", err);
      });
  };

  // Custom loading icon
  const customIcon = <LoadingOutlined style={{ fontSize: 36 }} className="text-primary" spin />;

  return (
    <>
      {loadingFiles ? (
        <div className="flex gap-1">
          {filesArr.map((url, i) => {
            return (
              <div key={i} className="border p-10 mb-10">
                <div style={{ margin: "10px", height: "150px", width: "150px", objectFit: "cover", position: "relative" }}>
                  <Spin spinning={true} indicator={customIcon}></Spin>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-1">
          {filesArr.map((file, i) => {
            return (
              <div key={i} className="mb-10">
                <Button className="btn btn-min file-btn" onClick={() => downloadFile(file)}>
                  {" "}
                  <FileOutlined /> {file.dosyaAd}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <Upload.Dragger
        // accept=".txt,.doc,.docs, .pdf, .xlsx"
        fileList={fileList}
        listType="picture"
        className="upload-list-inline"
        beforeUpload={(file) => {
          // const isFile =
          //   file.type === "application/doc" ||
          //   file.type === "application/pdf" ||
          //   file.type === "application/txt" ||
          //   file.type === "application/docs" ||
          //   file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isFile) {
          //   message.error("You can only upload DOC, DOCS, TXT, PDF or XLSX files!");
          // }

          if (!isLt2M) {
            message.error("File must be smaller than 2MB!");
          }

          if (isLt2M) {
            handleUpload(file);
          }
          // handleUpload(file);
          return false;
        }}
        onChange={({ fileList }) => setFileList(fileList)}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Tıklayın veya bu alana dosya sürükleyin</p>
        <p className="ant-upload-hint">
          Tek seferde bir veya birden fazla dosya yüklemeyi destekler. Şirket verileri veya diğer yasaklı dosyaların yüklenmesi kesinlikle yasaktır.
        </p>
      </Upload.Dragger>
    </>
  );
};

FileUpload.propTypes = {
  filesUrl: PropTypes.array,
  loadingFiles: PropTypes.bool,
  setFiles: PropTypes.func,
  uploadFinished: PropTypes.number,
  setUploadFinished: PropTypes.func,
};

export default FileUpload;

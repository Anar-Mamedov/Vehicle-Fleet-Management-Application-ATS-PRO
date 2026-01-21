import React from "react";
import { Upload, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { t } from "i18next";
import PropTypes from "prop-types";

const { Dragger } = Upload;
const { Text } = Typography;

const PhotoUploadInsert = ({ value = [], onChange }) => {
  const draggerProps = {
    name: "file",
    multiple: true,
    fileList: value,
    beforeUpload: (file) => {
      // Add the new file to the existing list
      onChange([...value, file]);
      return false; // Prevent automatic upload
    },
    onRemove: (file) => {
      // Remove the file from the list
      onChange(value.filter((f) => f.uid !== file.uid));
    },
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <div style={{ marginBottom: "5px" }}>
        <Text style={{ fontWeight: 600 }}>{t("fotograflar")}</Text>
      </div>
      <Dragger
        {...draggerProps}
        style={{
          padding: "20px",
          background: "#fafafa",
          borderRadius: "8px",
          border: "1px dashed #d9d9d9",
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: "#1890ff", fontSize: "48px" }} />
        </p>
        <p className="ant-upload-text" style={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.85)" }}>
          {t("tiklayinVeyaSurukleyin")}
        </p>
        <p className="ant-upload-hint" style={{ color: "rgba(0, 0, 0, 0.45)" }}>
          {t("resimYuklemeAciklama")}
        </p>
      </Dragger>
    </div>
  );
};

PhotoUploadInsert.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default PhotoUploadInsert;

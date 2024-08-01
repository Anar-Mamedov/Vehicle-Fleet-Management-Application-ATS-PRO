import { Button, Input, Modal } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { UpdateModelService } from "../../../../../api/services/markamodel_services";
import { CodeItemValidateService } from "../../../../../api/services/code/services";

const UpdateModelModal = ({ isOpen, setIsOpen, setStatus, modelItem }) => {
  const [model, setModel] = useState("");
  const [isValid, setIsValid] = useState("normal");

  const validateStyle = {
    borderColor:
      isValid === "error"
        ? "#dc3545"
        : isValid === "success"
        ? "#23b545"
        : "#000",
  };

  useEffect(() => {
    if (model) {
      const body = {
        tableName: "Model",
        code: model,
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [model]);

  useEffect(() => {
    setModel(modelItem?.modelDef);
  }, [modelItem]);

  const onSubmit = () => {
    const body = {
      siraNo: modelItem.siraNo,
      modelDef: model,
    };

    UpdateModelService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setIsOpen(false);
        setStatus(true);
      }
    });
    setStatus(false);
  };

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={onSubmit}
      disabled={
        isValid === "success" ? false : isValid === "error" ? true : false
      }
    >
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => setIsOpen(false)}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal
      title={t("MarkaGirisi")}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      maskClosable={false}
      footer={footer}
      width={500}
    >
      <label>[{model}] markası için değiştirilecek değeri giriniz</label>
      <Input
        value={model}
        style={validateStyle}
        onChange={(e) => setModel(e.target.value)}
      />
    </Modal>
  );
};

export default UpdateModelModal;

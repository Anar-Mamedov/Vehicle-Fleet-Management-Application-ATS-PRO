import { Button, Input, Modal } from "antd";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { AddMarkaService } from "../../../../../api/services/markamodel_services";
import { CodeItemValidateService } from "../../../../../api/services/code/services";

const AddModal = ({ isOpen, setIsOpen, setStatus }) => {
  const [marka, setMarka] = useState("");
  const [isValid, setIsValid] = useState("normal");

  const validateStyle = {
    borderColor:
      isValid === "error"
        ? "#dc3545"
        : isValid === "success"
        ? "#23b545"
        : "#000",
  };

  const onSubmit = () => {
    AddMarkaService(marka).then((res) => {
      if (res.data.statusCode === 200) {
        setMarka("");
        setIsOpen(false);
        setStatus(true);
      }
    });
    setStatus(false);
  };

  useEffect(() => {
    if (marka) {
      const body = {
        tableName: "Marka",
        code: marka,
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [marka]);

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
      title={t("yeniMarkaGirisi")}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      maskClosable={false}
      footer={footer}
      width={500}
    >
      <label>Marka tanımını giriniz</label>
      <Input
        value={marka}
        style={validateStyle}
        onChange={(e) => setMarka(e.target.value)}
      />
    </Modal>
  );
};

export default AddModal;

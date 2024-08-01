import { Button, Input, Modal } from "antd";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { UpdateMarkaService } from "../../../../../api/services/markamodel_services";
import { CodeItemValidateService } from "../../../../../api/services/code/services";

const UpdateModalModal = ({ isOpen, setIsOpen, setStatus, markaItem }) => {
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

  useEffect(() => {
    setMarka(markaItem.marka);
  }, [markaItem]);

  const onSubmit = () => {
    const body = {
      siraNo: markaItem.siraNo,
      marka: marka,
    };

    UpdateMarkaService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setMarka("");
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
      title={t("guncelle")}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      maskClosable={false}
      footer={footer}
      width={500}
    >
      <label>[{marka}] markası için değiştirilecek değeri giriniz</label>
      <Input
        value={marka}
        onChange={(e) => setMarka(e.target.value)}
        style={validateStyle}
      />
    </Modal>
  );
};

export default UpdateModalModal;

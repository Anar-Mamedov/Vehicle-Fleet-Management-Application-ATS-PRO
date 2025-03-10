import React from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import { useFormContext } from "react-hook-form";
import { Col, Input, Row, InputNumber, Checkbox } from "antd";

const GeneralInfo = ({ isValid }) => {
  const { control } = useFormContext();

  const validateStyle = {
    borderColor: isValid === "error" ? "#dc3545" : isValid === "success" ? "#23b545" : "#000",
  };

  return (
    <Row gutter={24}>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("yakitKod")}</label>
          <TextInput name="malzemeKod" style={validateStyle} />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("aktifDegil")}</label>
          <CheckboxInput name="aktif" />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("tanim")}</label>
          <TextInput name="tanim" />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("birim")}</label>
          <CodeControl name="birim" codeName="birimKodId" id={300} />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("yakitTip")}</label>
          <CodeControl name="malzemeTipKodText" codeName="malzemeTipKodId" id={102} />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("fiyat")}</label>
          <NumberInput name="fiyat" />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("kdvOrani")}</label>
          <NumberInput name="kdvOran" />
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div className="flex flex-col gap-1">
          <label>{t("kdvDahil")}</label>
          <CheckboxInput name="kdvDahilHaric" />
        </div>
      </Col>
    </Row>
  );
};

GeneralInfo.propTypes = {
  isValid: PropTypes.string,
};

export default GeneralInfo;

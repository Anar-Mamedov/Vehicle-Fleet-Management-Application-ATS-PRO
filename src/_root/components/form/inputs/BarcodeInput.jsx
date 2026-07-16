import React, { useRef } from "react";
import PropTypes from "prop-types";
import { BarcodeOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { t } from "i18next";
import JsBarcode from "jsbarcode";
import { Controller, useFormContext } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

const printPageStyle = `
  @page {
    margin: 12mm;
  }

  .barcode-print-area {
    position: static !important;
    inset: auto !important;
    display: flex !important;
    width: 100% !important;
    align-items: center;
    justify-content: center;
    background: #fff;
  }

  .barcode-print-area svg {
    max-width: 100%;
    height: auto;
  }
`;

const BarcodeInput = ({ name }) => {
  const { control } = useFormContext();
  const printAreaRef = useRef(null);
  const barcodeRef = useRef(null);

  const printBarcode = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: t("barkodNo"),
    pageStyle: printPageStyle,
    onPrintError: () => message.error(t("barkodOlusturulamadi")),
  });

  const handleGenerateAndPrint = (value) => {
    const barcodeValue = String(value ?? "");

    if (!barcodeValue.trim()) {
      message.warning(t("barkodDegeriGerekli"));
      return;
    }

    try {
      JsBarcode(barcodeRef.current, barcodeValue, {
        format: "CODE128",
        width: 2,
        height: 72,
        displayValue: true,
        fontSize: 18,
        margin: 12,
      });
      printBarcode();
    } catch {
      message.error(t("barkodOlusturulamadi"));
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(event) => field.onChange(event.target.value)}
            suffix={
              <Button
                type="text"
                htmlType="button"
                size="small"
                icon={<BarcodeOutlined />}
                title={t("barkodOlusturVeYazdir")}
                aria-label={t("barkodOlusturVeYazdir")}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleGenerateAndPrint(field.value)}
                style={{ width: 24, height: 24, padding: 0 }}
              />
            }
          />
        )}
      />
      <div ref={printAreaRef} className="barcode-print-area" aria-hidden="true" style={{ position: "fixed", top: 0, left: "-10000px", pointerEvents: "none", background: "#fff" }}>
        <svg ref={barcodeRef} />
      </div>
    </>
  );
};

BarcodeInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BarcodeInput;

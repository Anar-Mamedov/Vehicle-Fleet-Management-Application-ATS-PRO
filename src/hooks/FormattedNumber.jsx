// FormattedNumber.jsx

import React from "react";

const FormattedNumber = ({ num, minimumFractionDigits, maximumFractionDigits }) => {
  if (num === null || num === undefined || num === "") {
    return "-";
  }

  const language = localStorage.getItem("i18nextLng") || "tr";
  let locale = "tr-TR";

  switch (language) {
    case "tr":
      locale = "tr-TR";
      break;
    case "ru":
      locale = "ru-RU";
      break;
    case "az":
      locale = "az-AZ";
      break;
    case "en":
      locale = "en-US";
      break;
    default:
      locale = "tr-TR";
  }

  const options = {};
  if (minimumFractionDigits !== undefined) {
    options.minimumFractionDigits = minimumFractionDigits;
  }
  if (maximumFractionDigits !== undefined) {
    options.maximumFractionDigits = maximumFractionDigits;
  }

  try {
    return Number(num).toLocaleString(locale, options);
  } catch (error) {
    console.error("Error formatting number:", error);
    return num.toString();
  }
};

// Utility function to format numbers with locale
export const formatNumberWithLocale = (num, minimumFractionDigits, maximumFractionDigits) => {
  if (num === null || num === undefined || num === "") {
    return "-";
  }

  const language = localStorage.getItem("i18nextLng") || "tr";
  let locale = "tr-TR";

  switch (language) {
    case "tr":
      locale = "tr-TR";
      break;
    case "ru":
      locale = "ru-RU";
      break;
    case "az":
      locale = "az-AZ";
      break;
    case "en":
      locale = "en-US";
      break;
    default:
      locale = "tr-TR";
  }

  const options = {};
  if (minimumFractionDigits !== undefined) {
    options.minimumFractionDigits = minimumFractionDigits;
  }
  if (maximumFractionDigits !== undefined) {
    options.maximumFractionDigits = maximumFractionDigits;
  }

  try {
    return Number(num).toLocaleString(locale, options);
  } catch (error) {
    console.error("Error formatting number:", error);
    return num.toString();
  }
};

export default FormattedNumber;

import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { Button, message } from "antd";
import { unset } from "lodash";

const REPORT_BASE_URL = "http://report.atspro.net/result";

export default function ReportResultButton({ moduleFormName, selectedRows = [], buttonText = "Raporu Aç", buttonProps = {}, onAfterOpen }) {
  const isOpeningRef = useRef(false);
  const timeoutsRef = useRef([]);
  const visibilityListenerRef = useRef(null);
  const sanitizedModuleFormName = moduleFormName ? moduleFormName.trim() : "";
  const canShowButton = Boolean(sanitizedModuleFormName) && selectedRows.length > 0;

  const clearScheduledTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    timeoutsRef.current = [];
  };

  const removeVisibilityListener = () => {
    if (visibilityListenerRef.current && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", visibilityListenerRef.current);
      visibilityListenerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearScheduledTimeouts();
      removeVisibilityListener();
    };
  }, []);

  const validSiraNumbers = useMemo(() => {
    if (!canShowButton) return [];

    const seen = new Set();
    return selectedRows.reduce((acc, row) => {
      const rawSiraNo = row?.siraNo;
      if (rawSiraNo === null || typeof rawSiraNo === "undefined") {
        return acc;
      }

      const normalized = `${rawSiraNo}`.trim();
      if (!normalized || seen.has(normalized)) {
        return acc;
      }

      seen.add(normalized);
      acc.push(normalized);
      return acc;
    }, []);
  }, [canShowButton, selectedRows]);

  const reportUrls = useMemo(() => {
    if (!canShowButton || validSiraNumbers.length === 0) {
      return [];
    }

    const encodedReportName = encodeURIComponent(sanitizedModuleFormName);
    return validSiraNumbers.map((siraNo) => {
      const encodedSiraNo = encodeURIComponent(siraNo);
      return `${REPORT_BASE_URL}?report=${encodedReportName}&NO=${encodedSiraNo}&format=pdf&inline=false`;
    });
  }, [canShowButton, sanitizedModuleFormName, validSiraNumbers]);

  if (!canShowButton || reportUrls.length === 0) {
    return null;
  }

  const handleClick = () => {
    if (typeof window === "undefined" || isOpeningRef.current || reportUrls.length === 0) {
      return;
    }

    const registerTimeout = (callback, delay) => {
      const timeoutId = window.setTimeout(() => {
        callback();
        timeoutsRef.current = timeoutsRef.current.filter((storedId) => storedId !== timeoutId);
      }, delay);
      timeoutsRef.current.push(timeoutId);
      return timeoutId;
    };

    let focusAttempts = 0;
    const maxFocusAttempts = 8;

    const attemptRefocus = () => {
      focusAttempts += 1;

      if (typeof window.focus === "function") {
        window.focus();
      }

      if (typeof document !== "undefined") {
        const { activeElement, body } = document;

        if (activeElement && typeof activeElement.blur === "function") {
          activeElement.blur();
        }

        if (body && typeof body.focus === "function") {
          body.focus({ preventScroll: true });
        }
      }

      if (document?.visibilityState === "visible" || focusAttempts >= maxFocusAttempts) {
        removeVisibilityListener();
        return;
      }

      registerTimeout(attemptRefocus, Math.min(focusAttempts * 60, 250));
    };

    const visibilityChangeHandler = () => {
      if (typeof document === "undefined") {
        return;
      }

      if (document.visibilityState === "visible") {
        removeVisibilityListener();
        return;
      }

      attemptRefocus();
    };

    const focusCurrentTab = () => {
      attemptRefocus();

      if (!visibilityListenerRef.current && typeof document !== "undefined") {
        visibilityListenerRef.current = visibilityChangeHandler;
        document.addEventListener("visibilitychange", visibilityChangeHandler);
      }
    };

    let openedCount = 0;
    let blockedCount = 0;

    const openReport = (url) => {
      // window.open kullanarak popup'ı aç
      const popup = window.open(url, "_blank");

      // Popup blocker kontrolü - sadece null kontrolü yeterli
      if (!popup) {
        // Popup kesinlikle engellendi
        blockedCount += 1;
        return false;
      }

      // Popup başarıyla açıldı
      openedCount += 1;

      // Popup ile bağlantıyı kes
      popup.opener = null;

      // Mevcut sekmeye focus dön
      window.focus();
      document.body.focus();
      window.focus();

      for (let i = 0; i < 5; i++) {
        window.focus();
      }

      registerTimeout(() => window.focus(), 10);
      registerTimeout(() => window.focus(), 50);
      registerTimeout(() => window.focus(), 100);
      registerTimeout(focusCurrentTab, 150);

      return true;
    };

    isOpeningRef.current = true;
    clearScheduledTimeouts();
    removeVisibilityListener();

    // Tüm URL'leri aynı anda aç
    reportUrls.forEach((url) => {
      openReport(url);
    });

    // Açma işlemi tamamlandıktan sonra kontrol et
    registerTimeout(() => {
      if (blockedCount > 0) {
        message.warning({
          content: (
            <div>
              <div>
                <strong>{blockedCount} rapor tarayıcı tarafından engellendi!</strong>
              </div>
              <div style={{ marginTop: "8px" }}>
                Çözüm: Chrome adres çubuğundaki ayarlar ikonuna tıklayıp
                <strong> "Pop-up'lar ve yönlendirmeler"</strong> için <strong>"İzin ver"</strong> seçeneğini seçin.
              </div>
            </div>
          ),
          duration: 8,
        });
      }

      if (openedCount > 0) {
        message.success(`${openedCount} rapor başarıyla açıldı`, 3);
      }

      isOpeningRef.current = false;
    }, 300);

    if (typeof onAfterOpen === "function") {
      onAfterOpen();
    }
  };

  return (
    <Button type="link" onClick={handleClick} {...buttonProps} style={{ padding: "0px", height: "unset" }}>
      {buttonText}
    </Button>
  );
}

ReportResultButton.propTypes = {
  moduleFormName: PropTypes.string,
  selectedRows: PropTypes.arrayOf(
    PropTypes.shape({
      siraNo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  buttonText: PropTypes.string,
  buttonProps: PropTypes.object,
  onAfterOpen: PropTypes.func,
};

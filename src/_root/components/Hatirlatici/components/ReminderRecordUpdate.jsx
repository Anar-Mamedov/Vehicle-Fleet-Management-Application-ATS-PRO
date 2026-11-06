import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { message } from "antd";
import { t } from "i18next";
import { downloadDocument, openDocument } from "../../../../utils/documentFile";
import DocumentDetailModal from "../../Dosya/DocumentDetailModal";
import SigortaUpdateModal from "../../../pages/vehicles-control/sigorta/UpdateModal";
import CezaUpdateModal from "../../../pages/vehicles-control/ceza/UpdateModal";
import SurucuUpdateModal from "../../../pages/sistem-tanimlari/surucu/UpdateModal";
import MalzemeUpdateModal from "../../../pages/malzeme-depo/malzeme/UpdateModal";
import KiralikAracUpdateModal from "../../../pages/vehicles-control/kiralikAraclar/UpdateModal";
import IkameAracUpdateModal from "../../../pages/vehicles-control/IkameAracYonetimi/UpdateModal";
import PeriyodikBakimEditDrawer from "../../../pages/BakimVeOnarim/PeriyodikBakimlar/Update/EditDrawer";
import TasitKartiModal from "../../../pages/vehicles-control/vehicle-detail/detail-info/modals/tasit-karti/TasitKarti";
import DetailUpdate from "../../../pages/vehicles-control/vehicle-detail/DetailUpdate";
import { getReminderUpdateScreen, REMINDER_UPDATE_SCREENS } from "./reminderRecordScreens";

// Hatırlatıcı satırının ait olduğu kaydın mevcut güncelleme ekranını açar. Ekranlar kaydı kendi GetById
// servisiyle yükler; burada yalnızca gruba göre ekran seçilir ve `ilgiliKayitId` verilir.
const ReminderRecordUpdate = ({ record, onClose, onUpdated }) => {
  const id = record.ilgiliKayitId;
  const screen = getReminderUpdateScreen(record.grup);

  // Ekranlar seçili satırı useEffect bağımlılığı olarak izler; her render'da yeni nesne verilirse kayıt
  // tekrar tekrar yüklenir.
  const selectedRow = useMemo(() => ({ key: id }), [id]);
  const rentalSelectedRow = useMemo(() => ({ dtyAracId: id }), [id]);
  // Dosya adı, doküman bilgisi yüklenene kadar pencere başlığında görünsün diye satırdan verilir.
  const documentFile = useMemo(() => ({ tbDosyaId: id, dosyaAd: record.ilgiliKayit }), [id, record.ilgiliKayit]);

  const showDownloadError = () => message.error(t("dosyaIndirilemedi"));
  const handlePreviewDocument = (file) => openDocument(file).catch(showDownloadError);
  const handleDownloadDocument = (file) => downloadDocument(file).catch(showDownloadError);

  // İkame araç ekranı setIsOpen'ı da useEffect bağımlılığı olarak izler; sabit referans gerekir.
  const handleIkameOpenChange = useCallback(
    (isOpen) => {
      if (!isOpen) onClose();
    },
    [onClose]
  );

  // Taşıt kartı ekranı kaydedince de yalnızca onClose çağırıyor; kaydedilmiş olabileceği için liste yenilenir.
  const handleTasitKartiClose = () => {
    onClose();
    onUpdated();
  };

  switch (screen) {
    case REMINDER_UPDATE_SCREENS.SIGORTA:
      return <SigortaUpdateModal drawerVisible selectedRow={selectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.CEZA:
      return <CezaUpdateModal drawerVisible selectedRow={selectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.SURUCU:
      return <SurucuUpdateModal drawerVisible selectedRow={selectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.STOK:
      return <MalzemeUpdateModal drawerVisible selectedRow={selectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.KIRALIK_ARAC:
      return <KiralikAracUpdateModal drawerVisible selectedRow={rentalSelectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.IKAME_ARAC:
      return <IkameAracUpdateModal isOpen id={id} setIsOpen={handleIkameOpenChange} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.PERIYODIK_BAKIM:
      return <PeriyodikBakimEditDrawer drawerVisible selectedRow={selectedRow} onDrawerClose={onClose} onRefresh={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.TASIT_KARTI:
      return <TasitKartiModal visible id={id} onClose={handleTasitKartiClose} />;
    case REMINDER_UPDATE_SCREENS.ARAC:
      return <DetailUpdate isOpen selectedId={id} onClose={onClose} onSuccess={onUpdated} />;
    case REMINDER_UPDATE_SCREENS.DOSYA:
      return <DocumentDetailModal open file={documentFile} onClose={onClose} onPreview={handlePreviewDocument} onDownload={handleDownloadDocument} onUpdated={onUpdated} />;
    default:
      return null;
  }
};

ReminderRecordUpdate.propTypes = {
  record: PropTypes.shape({
    ilgiliKayitId: PropTypes.number.isRequired,
    ilgiliKayit: PropTypes.string,
    grup: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdated: PropTypes.func.isRequired,
};

export default ReminderRecordUpdate;

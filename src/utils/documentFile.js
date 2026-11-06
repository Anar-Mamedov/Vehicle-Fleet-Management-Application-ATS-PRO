import { DownloadDocumentByIdService } from "../api/services/upload/services";

// Doküman kayıtlarını ({ tbDosyaId, dosyaAd, dosyaUzanti }) indirme ve açma işlemleri. Hatalar çağırana
// fırlatılır; kullanıcı mesajını ekran gösterir.

const normalizeExtension = (extension) => {
  if (!extension) return "";
  const trimmed = String(extension).trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed.startsWith(".") ? trimmed : `.${trimmed}`;
};

const extractExtensionFromName = (fileName) => {
  if (!fileName) return "";
  const lowerName = String(fileName).toLowerCase();
  const extensionIndex = lowerName.lastIndexOf(".");
  if (extensionIndex < 0) return "";
  return lowerName.slice(extensionIndex);
};

export const getDocumentExtension = (file) => {
  const extensionFromField = normalizeExtension(file?.dosyaUzanti);
  if (extensionFromField) return extensionFromField;
  return extractExtensionFromName(file?.dosyaAd);
};

export const isPdfDocument = (file) => getDocumentExtension(file) === ".pdf";

// İstek önce dosya adı ve uzantıyla gönderilir; başarısız olursa daha az alanla tekrarlanır.
export const downloadDocumentBlob = async (file) => {
  const extension = getDocumentExtension(file);
  const requestBodies = [{ fileId: file.tbDosyaId, extension, fileName: file.dosyaAd }, { fileId: file.tbDosyaId, extension }, { fileId: file.tbDosyaId }];
  let lastError = null;

  for (const body of requestBodies) {
    try {
      const response = await DownloadDocumentByIdService(body);
      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};

const saveBlob = (blob, fileName) => {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};

// Dosyayı bilgisayara indirir.
export const downloadDocument = async (file) => {
  const blob = await downloadDocumentBlob(file);
  saveBlob(blob, file.dosyaAd);
};

// PDF'i yeni sekmede açar, diğer dosyaları indirir. PDF sekmesi tıklama anında, ilk await'ten önce açılır;
// istek bittikten sonra açılan sekme tarayıcının açılır pencere engelleyicisine takılabilir.
export const openDocument = async (file) => {
  const isPdf = isPdfDocument(file);
  const pdfWindow = isPdf ? window.open("about:blank", "_blank") : null;

  try {
    const blob = await downloadDocumentBlob(file);

    if (!isPdf) {
      saveBlob(blob, file.dosyaAd);
      return;
    }

    const pdfUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    if (pdfWindow && !pdfWindow.closed) {
      pdfWindow.location.href = pdfUrl;
    } else {
      window.open(pdfUrl, "_blank");
    }
  } catch (error) {
    if (pdfWindow && !pdfWindow.closed) {
      pdfWindow.close();
    }
    throw error;
  }
};

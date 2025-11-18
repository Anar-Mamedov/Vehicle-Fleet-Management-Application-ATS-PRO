// DevTools Protection Utility
// Sadece izin verilen domainlerde DevTools kullanılabilir

const ALLOWED_DOMAINS = [
  'atspro.netlify.app',
  'localhost:5174'
];

let isDevToolsOpen = false;
let redirectTimer = null;

// Mevcut domain'in izin verilen listede olup olmadığını kontrol et
const isAllowedDomain = () => {
  const currentHost = window.location.host;
  return ALLOWED_DOMAINS.includes(currentHost);
};

// Boş sayfaya yönlendir
const redirectToBlankPage = () => {
  if (redirectTimer) return; // Tekrarlı yönlendirmeleri engelle

  redirectTimer = setTimeout(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    window.location.href = 'about:blank';
  }, 100);
};

// DevTools açık mı kontrol et - Window Size Detection
const checkDevToolsWindowSize = () => {
  const widthThreshold = window.outerWidth - window.innerWidth > 160;
  const heightThreshold = window.outerHeight - window.innerHeight > 160;

  return widthThreshold || heightThreshold;
};

// Ana kontrol fonksiyonu
const detectDevTools = () => {
  // İzin verilen domain'de ise kontrol yapma
  if (isAllowedDomain()) {
    return;
  }

  // Window size ile DevTools tespiti
  const windowSizeDetected = checkDevToolsWindowSize();

  if (windowSizeDetected) {
    if (!isDevToolsOpen) {
      isDevToolsOpen = true;
      redirectToBlankPage();
    }
  }
};

// Klavye kısayollarını engelle
const disableDevToolsShortcuts = (e) => {
  // İzin verilen domain'de ise engelleme
  if (isAllowedDomain()) {
    return;
  }

  // F12
  if (e.keyCode === 123) {
    e.preventDefault();
    redirectToBlankPage();
    return false;
  }

  // Ctrl+Shift+I veya Cmd+Option+I
  if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
      (e.metaKey && e.altKey && e.keyCode === 73)) {
    e.preventDefault();
    redirectToBlankPage();
    return false;
  }

  // Ctrl+Shift+J veya Cmd+Option+J
  if ((e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
      (e.metaKey && e.altKey && e.keyCode === 74)) {
    e.preventDefault();
    redirectToBlankPage();
    return false;
  }

  // Ctrl+Shift+C veya Cmd+Option+C
  if ((e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
      (e.metaKey && e.altKey && e.keyCode === 67)) {
    e.preventDefault();
    redirectToBlankPage();
    return false;
  }

  // Ctrl+U veya Cmd+U (view source)
  if ((e.ctrlKey && e.keyCode === 85) || (e.metaKey && e.keyCode === 85)) {
    e.preventDefault();
    redirectToBlankPage();
    return false;
  }
};

// Sağ tık menüsünü engelle
const disableContextMenu = (e) => {
  // İzin verilen domain'de ise engelleme
  if (isAllowedDomain()) {
    return;
  }

  e.preventDefault();
  return false;
};

// DevTools korumasını başlat
export const initDevToolsProtection = () => {
  // İzin verilen domain'de ise korumayı aktif etme
  if (isAllowedDomain()) {
    return;
  }

  // Klavye kısayollarını engelle
  document.addEventListener('keydown', disableDevToolsShortcuts);

  // Sağ tık menüsünü engelle
  document.addEventListener('contextmenu', disableContextMenu);

  // DevTools detection - her 1 saniyede bir kontrol et
  setInterval(detectDevTools, 1000);

  // İlk kontrolü hemen yap
  detectDevTools();
};

// Temizleme fonksiyonu (gerekirse)
export const cleanupDevToolsProtection = () => {
  document.removeEventListener('keydown', disableDevToolsShortcuts);
  document.removeEventListener('contextmenu', disableContextMenu);

  if (redirectTimer) {
    clearTimeout(redirectTimer);
    redirectTimer = null;
  }
};

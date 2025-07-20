#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Versiyon dosyasının yolu
const versionFilePath = path.join(__dirname, "../version.json");
const sidebarFilePath = path.join(__dirname, "../src/_root/layout/Sidebar.jsx");

// Mevcut versiyon bilgisini oku
function readVersion() {
  try {
    const versionData = fs.readFileSync(versionFilePath, "utf8");
    return JSON.parse(versionData);
  } catch (error) {
    console.error("Versiyon dosyası okunamadı:", error);
    // Varsayılan versiyon
    return { major: 1, minor: 7, patch: 32 };
  }
}

// Versiyon numarasını artır
function incrementVersion(version) {
  const newVersion = { ...version };

  // Patch numarasını artır (çift basamaklı, 99'a kadar)
  newVersion.patch += 1;

  // Patch 99'u geçerse sıfırla ve minor'ı artır
  if (newVersion.patch > 99) {
    newVersion.patch = 0;
    newVersion.minor += 1;

    // Minor 9'u geçerse sıfırla ve major'ı artır
    if (newVersion.minor > 9) {
      newVersion.minor = 0;
      newVersion.major += 1;
    }
  }

  return newVersion;
}

// Versiyon bilgisini dosyaya yaz
function writeVersion(version) {
  try {
    fs.writeFileSync(versionFilePath, JSON.stringify(version, null, 2));
    console.log(`Versiyon güncellendi: ${version.major}.${version.minor}.${version.patch}`);
  } catch (error) {
    console.error("Versiyon dosyası yazılamadı:", error);
  }
}

// Sidebar.jsx artık dinamik versiyon kullandığı için güncelleme gereksiz
function updateSidebarVersion(version) {
  console.log(`Sidebar.jsx dinamik versiyon kullanıyor, güncelleme gereksiz: v. ${version.major}.${version.minor}.${version.patch}`);
}

// Ana fonksiyon
function main() {
  console.log("Versiyon artırma işlemi başlatılıyor...");

  // Mevcut versiyonu oku
  const currentVersion = readVersion();
  console.log(`Mevcut versiyon: ${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`);

  // Versiyonu artır
  const newVersion = incrementVersion(currentVersion);

  // Yeni versiyonu kaydet
  writeVersion(newVersion);

  // Sidebar'ı güncelle
  updateSidebarVersion(newVersion);

  console.log("Versiyon artırma işlemi tamamlandı!");
}

// Script'i çalıştır
main();

export { readVersion, incrementVersion, writeVersion, updateSidebarVersion };

#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dosya yolları
const versionConfigPath = path.join(__dirname, "../version-config.json");
const buildInfoPath = path.join(__dirname, "../src/buildInfo.js");

// Git bilgilerini al
function getGitInfo() {
  try {
    // GitHub Actions ortamında commit sayısını al
    const runNumber = process.env.GITHUB_RUN_NUMBER || "1";
    const commitSha = process.env.GITHUB_SHA || "local";

    return {
      runNumber: parseInt(runNumber),
      commitSha: commitSha.substring(0, 7),
    };
  } catch (error) {
    console.log("Git bilgisi alınamadı, varsayılan değerler kullanılıyor");
    return {
      runNumber: 1,
      commitSha: "local",
    };
  }
}

// Versiyon konfigürasyonunu oku
function readVersionConfig() {
  try {
    const configData = fs.readFileSync(versionConfigPath, "utf8");
    return JSON.parse(configData);
  } catch (error) {
    console.log("Versiyon config okunamadı, varsayılan kullanılıyor");
    return {
      baseVersion: { major: 1, minor: 7, patch: 34 },
      startFromRunNumber: null,
      lastKnownRunNumber: 0,
    };
  }
}

// Versiyon konfigürasyonunu yaz
function writeVersionConfig(config) {
  try {
    fs.writeFileSync(versionConfigPath, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error("Versiyon config yazılamadı:", error);
  }
}

// Versiyon hesapla
function calculateVersion(runNumber) {
  const config = readVersionConfig();

  // İlk çalıştırmada başlangıç run number'ını kaydet
  if (config.startFromRunNumber === null) {
    config.startFromRunNumber = runNumber;
    config.lastKnownRunNumber = runNumber;
    writeVersionConfig(config);
    console.log(`🎯 Başlangıç run number kaydedildi: #${runNumber}`);
    // İlk çalıştırmada base versiyonu döndür
    return config.baseVersion;
  }

  // Kaç build geçtiğini hesapla
  const buildsFromStart = runNumber - config.startFromRunNumber;

  let patch = config.baseVersion.patch + buildsFromStart;
  let minor = config.baseVersion.minor;
  let major = config.baseVersion.major;

  // Patch 99'u geçerse
  while (patch > 99) {
    patch -= 100;
    minor += 1;

    // Minor 9'u geçerse
    if (minor > 9) {
      minor = 0;
      major += 1;
    }
  }

  // Son run number'ı güncelle
  config.lastKnownRunNumber = runNumber;
  writeVersionConfig(config);

  return { major, minor, patch };
}

// Build info dosyası oluştur
function generateBuildInfo() {
  const gitInfo = getGitInfo();
  const version = calculateVersion(gitInfo.runNumber);
  const buildTime = new Date().toISOString();

  const buildInfo = {
    version: `${version.major}.${version.minor}.${version.patch}`,
    buildNumber: gitInfo.runNumber,
    commitSha: gitInfo.commitSha,
    buildTime: buildTime,
    environment: process.env.NODE_ENV || "production",
  };

  // JavaScript modülü olarak yaz
  const jsContent = `// Bu dosya otomatik oluşturulur - elle düzenlemeyin
export const BUILD_INFO = ${JSON.stringify(buildInfo, null, 2)};
`;

  fs.writeFileSync(buildInfoPath, jsContent);

  // Artık version.json kullanmıyoruz, version-config.json yeterli

  console.log(`✅ Build info oluşturuldu:`);
  console.log(`   Versiyon: v. ${buildInfo.version}`);
  console.log(`   Build: #${buildInfo.buildNumber}`);
  console.log(`   Commit: ${buildInfo.commitSha}`);
  console.log(`   Zaman: ${buildInfo.buildTime}`);

  return buildInfo;
}

// Script'i çalıştır
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBuildInfo();
}

export { generateBuildInfo };

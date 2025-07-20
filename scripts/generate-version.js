#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dosya yolları
const versionFilePath = path.join(__dirname, "../version.json");
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

// Versiyon hesapla
function calculateVersion(runNumber) {
  const baseVersion = { major: 1, minor: 7, patch: 32 };

  // Run number'a göre versiyon hesapla
  const totalBuilds = runNumber;

  let patch = baseVersion.patch + totalBuilds;
  let minor = baseVersion.minor;
  let major = baseVersion.major;

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

  // Version.json'ı da güncelle (local kullanım için)
  fs.writeFileSync(versionFilePath, JSON.stringify(version, null, 2));

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

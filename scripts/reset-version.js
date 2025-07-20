#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versionConfigPath = path.join(__dirname, "../version-config.json");

// Versiyon sistemini sıfırla
function resetVersionSystem(newBaseVersion) {
  const config = {
    baseVersion: newBaseVersion || { major: 1, minor: 7, patch: 34 },
    startFromRunNumber: null,
    lastKnownRunNumber: 0,
  };

  try {
    fs.writeFileSync(versionConfigPath, JSON.stringify(config, null, 2));
    console.log(`✅ Versiyon sistemi sıfırlandı!`);
    console.log(`   Yeni base versiyon: ${config.baseVersion.major}.${config.baseVersion.minor}.${config.baseVersion.patch}`);
    console.log(`   Bir sonraki GitHub Actions run'ında bu versiyondan başlayacak.`);
  } catch (error) {
    console.error("❌ Versiyon config yazılamadı:", error);
  }
}

// Komut satırı argümanlarını kontrol et
const args = process.argv.slice(2);
if (args.length >= 3) {
  const major = parseInt(args[0]);
  const minor = parseInt(args[1]);
  const patch = parseInt(args[2]);

  if (!isNaN(major) && !isNaN(minor) && !isNaN(patch)) {
    resetVersionSystem({ major, minor, patch });
  } else {
    console.log("❌ Geçersiz versiyon formatı!");
    console.log("Kullanım: node scripts/reset-version.js [major] [minor] [patch]");
    console.log("Örnek: node scripts/reset-version.js 1 7 34");
  }
} else {
  // Varsayılan versiyon ile sıfırla
  resetVersionSystem();
}

export { resetVersionSystem };

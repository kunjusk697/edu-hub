const fs = require("fs");
const path = require("path");

const RUNTIME_DIR = path.join(__dirname, "..", "..", "data", "runtime");

function ensureRuntimeDir() {
  if (!fs.existsSync(RUNTIME_DIR)) {
    fs.mkdirSync(RUNTIME_DIR, { recursive: true });
  }
}

function readJson(fileName, fallback) {
  ensureRuntimeDir();
  const filePath = path.join(RUNTIME_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(fileName, value) {
  ensureRuntimeDir();
  fs.writeFileSync(path.join(RUNTIME_DIR, fileName), `${JSON.stringify(value, null, 2)}\n`);
}

module.exports = {
  readJson,
  writeJson,
  RUNTIME_DIR,
};

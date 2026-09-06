#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const apiBase = (process.env.LE_MAM_API_URL || "").replace(/\/$/, "");
const target = path.join(__dirname, "..", "public", "js", "config.js");

const contents = `window.APP_CONFIG = {
  apiBase: "${apiBase}",
  appName: "Le Mam",
};
`;

fs.writeFileSync(target, contents);
console.log(`Wrote mobile config with apiBase="${apiBase || "(same origin)"}"`);

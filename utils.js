const fs = require("fs");

function safeReadJSON(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.warn(`⚠️ [Auto-Heal] ${path} was corrupted. Reinitializing...`);
    fs.writeFileSync(path, "[]", { encoding: "utf-8" });
    return [];
  }
}

function safeWriteJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { safeReadJSON, safeWriteJSON };

const { execSync } = require("child_process");

try {
  execSync("git add .");
  const timestamp = new Date().toISOString();
  execSync(`git commit -m "Auto update: ${timestamp}"`);
  execSync("git push");
  console.log("✅ Auto-pushed to GitHub at", timestamp);
} catch (err) {
  if (err.message.includes("nothing to commit")) {
    console.log("⚠️ Nothing new to commit.");
  } else {
    console.error("❌ Push failed:", err.message);
  }
}

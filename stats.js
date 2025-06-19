const fs = require("fs");
const path = require("path");
const chalk = new (require("chalk").Chalk)();

const LOGINS_FILE = path.join(__dirname, "data", "logins.json");

function showLoginStats() {
  let data;

  try {
    data = JSON.parse(fs.readFileSync(LOGINS_FILE, "utf-8"));
  } catch (err) {
    console.log(chalk.red("❌ Failed to read login logs."));
    return;
  }

  if (data.length === 0) {
    console.log(chalk.yellow("⚠️ No login data available."));
    return;
  }

  const total = data.length;
  const success = data.filter(l => l.success).length;
  const failed = total - success;

  const attemptMap = {};
  data.forEach(log => {
    const user = log.username;
    if (!attemptMap[user]) {
      attemptMap[user] = { total: 0, failed: 0 };
    }
    attemptMap[user].total++;
    if (!log.success) attemptMap[user].failed++;
  });

  console.log(chalk.cyan("\n📊 Login Statistics:"));
  console.log(chalk.green(`✅ Successful logins: ${success}`));
  console.log(chalk.red(`❌ Failed logins: ${failed}`));
  console.log(chalk.blue(`📁 Total login attempts: ${total}\n`));

  console.log(chalk.magenta("🔍 User-wise attempts (Top targets):"));
  Object.entries(attemptMap)
    .sort((a, b) => b[1].failed - a[1].failed)
    .forEach(([user, stats], i) => {
      console.log(`${i + 1}. ${user} → ${stats.total} total, ${stats.failed} failed`);
    });

  console.log("");
}

module.exports = { showLoginStats };

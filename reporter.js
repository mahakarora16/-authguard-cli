const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');
const chalk = new (require("chalk").Chalk)();

const LOGINS_FILE = path.join(__dirname, 'data', 'logins.json');

function exportLogsToCSV() {
  const logs = JSON.parse(fs.readFileSync(LOGINS_FILE, 'utf-8'));

  if (logs.length === 0) {
    console.log(chalk.yellow("⚠️ No login attempts found to export."));
    return;
  }

  const fields = ['username', 'success', 'time'];
  const opts = { fields };
  const csv = parse(logs, opts);

  const outputPath = path.join(__dirname, 'data', 'login_report.csv');
  fs.writeFileSync(outputPath, csv);

  console.log(chalk.green(`📄 Login report exported successfully to ${outputPath}`));
}

module.exports = { exportLogsToCSV };

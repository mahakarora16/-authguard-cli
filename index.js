const readline = require("readline-sync");
const chalk = new (require("chalk").Chalk)();

const { signup, login } = require("./auth");
const { exportLogsToCSV } = require("./reporter");
const { unlockBlockedUser } = require("./admin");
const { showLoginStats } = require("./stats"); // ✅ Include stats

console.log(chalk.green.bold("\n🔐 Welcome to AuthGuard CLI 🔐\n"));

while (true) {
  console.log(chalk.blue("\nChoose an option:"));
  console.log("1. Signup");
  console.log("2. Login");
  console.log("3. Export login log report 📄");
  console.log("4. Admin unlock system 🔓");
  console.log("5. Show login stats 📊");
  console.log("6. Exit");

  const choice = readline.question("Enter choice (1/2/3/4/5/6): ");

  if (choice === "1") {
    signup();
  } else if (choice === "2") {
    login();
  } else if (choice === "3") {
    exportLogsToCSV();
  } else if (choice === "4") {
    unlockBlockedUser();
  } else if (choice === "5") {
    showLoginStats();
  } else if (choice === "6") {
    console.log(chalk.yellow("\n👋 Goodbye!\n"));
    break;
  } else {
    console.log(chalk.red("❌ Invalid choice. Try again."));
  }
}


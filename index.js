const readline = require("readline-sync");
const chalk = new (require("chalk").Chalk)(); // ✅ Correct for Chalk v5+

const { signup, login } = require("./auth");

console.log(chalk.green.bold("\n🔐 Welcome to AuthGuard CLI 🔐\n"));

while (true) {
  console.log(chalk.blue("\nChoose an option:\n1. Signup\n2. Login\n3. Exit"));
  const choice = readline.question("Enter choice (1/2/3): ");

  if (choice === "1") {
    signup();
  } else if (choice === "2") {
    login();
  } else if (choice === "3") {
    console.log(chalk.yellow("\nGoodbye!\n"));
    break;
  } else {
    console.log(chalk.red("Invalid choice. Try again."));
  }
}

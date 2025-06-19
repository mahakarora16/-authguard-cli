const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const chalk = new (require("chalk").Chalk)();
const bcrypt = require("bcrypt");
const { detectBruteForce } = require("./detector");
const { safeReadJSON, safeWriteJSON } = require("./utils");

const USERS_FILE = path.join(__dirname, "data", "users.json");
const LOGINS_FILE = path.join(__dirname, "data", "logins.json");

const saltRounds = 10;

function signup() {
  const users = safeReadJSON(USERS_FILE);
  const username = readline.question("Choose a username: ");
  const password = readline.question("Choose a password: ", { hideEchoBack: true });

  if (users.find(u => u.username === username)) {
    console.log(chalk.red("❌ Username already exists."));
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  users.push({ username, password: hashedPassword, blocked: false });

  safeWriteJSON(USERS_FILE, users);
  console.log(chalk.green("✅ Signup successful!"));
}

function login() {
  const users = safeReadJSON(USERS_FILE);
  const logins = safeReadJSON(LOGINS_FILE);

  const username = readline.question("Username: ");
  const password = readline.question("Password: ", { hideEchoBack: true });

  const user = users.find(u => u.username === username);

  if (!user) {
    console.log(chalk.red("❌ User not found."));
    logins.push({ username, success: false, time: new Date().toISOString() });
  } else if (user.blocked) {
    console.log(chalk.red("🚫 This user is blocked due to multiple failed logins."));
    logins.push({ username, success: false, time: new Date().toISOString() });
  } else {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      console.log(chalk.green("✅ Login successful!"));
      logins.push({ username, success: true, time: new Date().toISOString() });
    } else {
      console.log(chalk.red("❌ Incorrect password."));
      logins.push({ username, success: false, time: new Date().toISOString() });
    }
  }

  detectBruteForce(username, logins, users);
  safeWriteJSON(LOGINS_FILE, logins);
  safeWriteJSON(USERS_FILE, users);
}

module.exports = { signup, login };

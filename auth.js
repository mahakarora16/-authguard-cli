const fs = require("fs");
const readline = require("readline-sync");
const bcrypt = require("bcrypt");
const chalk = require("chalk");

const USERS_FILE = "./data/users.json";
const LOGINS_FILE = "./data/logins.json";

function loadUsers() {
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function logAttempt(username, success) {
  const logs = JSON.parse(fs.readFileSync(LOGINS_FILE, "utf-8"));
  logs.push({
    username,
    time: new Date().toISOString(),
    success
  });
  fs.writeFileSync(LOGINS_FILE, JSON.stringify(logs, null, 2));
}

function signup() {
  const users = loadUsers();
  const username = readline.question("Choose username: ");
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    console.log(chalk.red("❌ Username already exists."));
    return;
  }

  const password = readline.questionNewPassword("Choose password: ", {
    min: 6,
    max: 20,
    confirmMessage: "Confirm password: ",
    unmatchMessage: "❌ Passwords do not match."
  });

  const hashed = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashed });
  saveUsers(users);

  console.log(chalk.green("✅ Signup successful!"));
}

function login() {
  const users = loadUsers();
  const username = readline.question("Username: ");
  const password = readline.question("Password: ", { hideEchoBack: true });

  const user = users.find(u => u.username === username);
  if (!user) {
    console.log(chalk.red("❌ User not found."));
    logAttempt(username, false);
    return;
  }

  const match = bcrypt.compareSync(password, user.password);
  if (match) {
    console.log(chalk.green("✅ Login successful!"));
    logAttempt(username, true);
  } else {
    console.log(chalk.red("❌ Incorrect password."));
    logAttempt(username, false);
  }
}

module.exports = { signup, login };

require("child_process").execSync("node autoPush.js");


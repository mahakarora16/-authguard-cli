const fs = require("fs");
const chalk = new (require("chalk").Chalk)();
const readline = require("readline-sync");
const { safeReadJSON, safeWriteJSON } = require("./utils");

const USERS_FILE = "./data/users.json";

function unlockBlockedUser() {
  const users = safeReadJSON(USERS_FILE);
  const blockedUsers = users.filter(user => user.blocked);

  if (blockedUsers.length === 0) {
    console.log(chalk.yellow("🚫 No users are currently blocked."));
    return;
  }

  console.log(chalk.blue("\n🔒 Blocked Users:"));
  blockedUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.username}`);
  });

  const choice = readline.question("Enter the number of the user to unblock (or press enter to cancel): ");
  const idx = parseInt(choice);

  if (!choice || isNaN(idx) || idx < 1 || idx > blockedUsers.length) {
    console.log(chalk.red("❌ Invalid selection. No user unblocked."));
    return;
  }

  const usernameToUnblock = blockedUsers[idx - 1].username;

  users.forEach(user => {
    if (user.username === usernameToUnblock) {
      user.blocked = false;
    }
  });

  safeWriteJSON(USERS_FILE, users);
  console.log(chalk.green(`✅ User '${usernameToUnblock}' has been unblocked.`));

  // Optional: Auto-push to GitHub
  try {
    require("child_process").execSync("node autoPush.js");
  } catch (err) {
    console.warn("⚠️ Auto-push failed:", err.message);
  }
}

module.exports = { unlockBlockedUser };

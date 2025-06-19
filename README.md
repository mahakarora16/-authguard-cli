# 🔐 AuthGuard CLI

A terminal-based cybersecurity tool built with **Node.js** that allows user signup, login, login monitoring, brute-force detection, admin-based unlocking, and report generation.

---

## 🚀 Features

- 🔑 **Signup & Login** system (username-password based)
- 🚨 **Brute-force attack detection**
- 🔓 **Admin unlock system** for blocked users
- 📄 **Export login attempts** to CSV
- 📊 (Upcoming) **Login statistics dashboard**
- ☁️ **Auto-push to GitHub** on activity
- 🧠 Smart data recovery for corrupted files

---

## 📦 Tech Stack

- **Node.js** (CLI-based)
- `readline-sync` for terminal input
- `chalk` for CLI colors
- `json2csv` for report generation
- `child_process` for auto-push
- Local `.json` file storage

---

## 🛠️ Usage

```bash
node index.js



# 📚 Library Management System

A modern **Library Management System** built with **React (TypeScript)**, **Vite**, and **TailwindCSS**. The system provides an interactive UI to manage books, members, and transactions with support for future backend integration.

---

## 🚀 Features

* 📖 **Book Management** – Add, update, delete, and search books
* 👤 **Member Management** – Register and manage library members
* 🔄 **Issue & Return** – Track book issues, due dates, and returns
* 📊 **Dashboard** – View total books, members, and borrowed statistics
* 🎨 **Modern UI** – Styled with TailwindCSS
* ⚡ **Fast Development** – Powered by Vite + React + TypeScript

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Styling:** TailwindCSS + PostCSS
* **State Management:** React hooks
* **Optional Backend:** Node.js + Express + MongoDB (future-ready)

---

## 📂 Project Structure

```
library_management/
│── public/               # Static assets
│── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page-level components
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
│── index.html            # HTML entry file
│── package.json          # Project metadata & dependencies
│── vite.config.ts        # Vite configuration
│── tailwind.config.ts    # Tailwind configuration
│── tsconfig.json         # TypeScript config
│── README.md             # Project documentation
```

---

## ⚡ Setup & Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/library_management.git
   cd library_management
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or if you’re using **bun** (since you have `bun.lockb`):

   ```bash
   bun install
   ```

3. **Run Development Server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   bun dev
   ```

   The app will be available at:
   👉 `http://localhost:5173`

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Preview Production Build**

   ```bash
   npm run preview
   ```

---

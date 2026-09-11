# 🛠️ Toolify - Full-Stack Developer Tools & Utility Platform

Toolify is a modern, high-performance web platform that brings together essential tools and web utilities under a unified interface. Built with a React + Vite frontend and a Java Spring Boot backend.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite%20%7C%20Tailwind-blue)
![Backend](https://img.shields.io/badge/Backend-Java%20%7C%20Spring%20Boot-orange)
![Build](https://img.shields.io/badge/Build-Maven-red)

---

## ✨ Key Features

- ⚡ **Lightning Fast React & Vite Client**: Modular UI architecture built using React 18, Vite for Instant HMR (Hot Module Replacement), and Tailwind CSS for custom dynamic styling.
- ☕ **Robust Java Spring Boot Backend**: High-performance RESTful API service powered by Java and Maven dependency management.
- 🎨 **Modern Design & Screens**: Clean design layout integrated from custom UI mockups (`stitch_screens`).
- 🔐 **Decoupled Architecture**: Independent frontend and backend modules allowing flexible deployment and scalablity.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Linting**: ESLint

### Backend
- **Language**: Java
- **Framework**: Spring Boot
- **Build Tool**: Maven (`pom.xml`)

---

## 📁 Repository Structure

```text
Toolify/
├── frontend/             # React + Vite client app
│   ├── src/              # React components, pages & state management
│   ├── public/           # Static web assets
│   ├── tailwind.config.js# Tailwind UI design configuration
│   └── vite.config.js    # Vite bundler configuration
│
├── backend/              # Java Spring Boot backend server
│   ├── src/main/         # Controllers, services & Java data models
│   ├── pom.xml           # Maven build & project dependencies
│   └── mvnw / mvnw.cmd   # Maven wrapper scripts
│
└── stitch_screens/       # Project UI mockups and design assets
```

---

## 🚀 Installation & Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Teja-vardhan67/Toolify.git
cd Toolify
```

### 2. Run Backend (Java Spring Boot)
```bash
cd backend
# On Windows
mvnw.cmd spring-boot:run

# On Linux/macOS
./mvnw spring-boot:run
```
The API server will launch at `http://localhost:8080`.

### 3. Run Frontend (React + Vite)
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to visit the [issues page](https://github.com/Teja-vardhan67/Toolify/issues).

---

## 👤 Author

**Teja Vardhan**
- GitHub: [@Teja-vardhan67](https://github.com/Teja-vardhan67)

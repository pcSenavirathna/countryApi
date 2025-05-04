# 🌍 Country Info Web Application

Welcome to **CountryInfoWeb** — your go-to full-stack app for exploring detailed information about countries worldwide! Search by name, filter by region, manage favorites, and dive into an interactive map for each country.

Built with 💙 React, Node.js, Express, and MongoDB.

---

## ✨ Features

- 🗺️ **Browse All Countries**: View country cards with key info like population, capital, and region.
- 🔍 **Search Functionality**: Instantly find countries by name.
- 🌐 **Filter by Region**: Narrow results down by continent or region (e.g., Europe, Asia).
- ❤️ **Favorite System**: Add/remove countries to your favorites list.
- 🔐 **Authentication**: Secure signup and login with JWT.
- 📌 **Interactive Country Detail Page**: View extended info and location via an embedded map.

---

## 🚀 Tech Stack

**Frontend**: React, Axios, TailwindCSS (optional)  
**Backend**: Node.js, Express  
**Database**: MongoDB  
**Authentication**: JWT  
**API Source**: [REST Countries API](https://restcountries.com/)

---

## 🧰 Prerequisites

Ensure you have installed:

- [Node.js](https://nodejs.org/) (v16+)
- npm or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

## ⚙️ Setup Instructions

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/your-username/countryinfoweb.git
cd countryinfoweb

### 2. 🧩 Install Dependencies
Install dependencies for both frontend and backend.

## Frontend:
cd countryinfoweb
npm install

## Backend:
cd ../backend
npm install
```

---
## 3. 📁 Configure Environment Variables
```bash
### Create the following .env files:

#### Frontend (countryinfoweb/.env):
REACT_APP_SERVER_URL=http://localhost:5000

#### Backend (backend/.env):
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000

```
---
## 4. 🔄 Run the Application Locally
```bash
### Start the backend server:
cd backend
npm start


### Start the frontend development server:
cd ../countryinfoweb
npm start

```


## 5. 📦 Build for Production
```bash
cd countryinfoweb
npm run build

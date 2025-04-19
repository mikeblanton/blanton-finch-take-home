# Finch Take-Home Project

This repository contains two applications: a **Backend** built with Express.js and a **Web App** built with React Router. Below are the installation and execution instructions for both.

---

## Backend

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Configuration

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Copy the `.env-template` file to `.env`:
   ```bash
   cp .env-template .env
   ```

3. Replace the placeholder values in `.env` with your own:
   - `FINCH_CLIENT_ID`: Your `client_id` from Finch.
   - `FINCH_CLIENT_SECRET`: Your `client_secret` from Finch. ***This would normally be stored securely in your backend***

### Installation

Install the dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The server will run at `http://localhost:3000` by default.

---

## Web App

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)

### Configuration

1. Navigate to the `web-app` directory:
   ```bash
   cd web-app
   ```

2. Copy the `.env-template` file to `.env`:
   ```bash
   cp .env-template .env
   ```

3. Replace the placeholder values in `.env` with your own:
   - `VITE_FINCH_CLIENT_ID`: Your `client_id` from Finch.

### Installation

Install the dependencies:
```bash
npm install
```

### Development

Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Notes

- Ensure the **Backend** is running before using the **Web App**, as the Web App depends on the API endpoints provided by the Backend.
- We are storing the Finch `client_secret` in a `.env` file. ***This would normally be stored securely in your backend.***
- We are storing the Finch `access_token` in the Browser session and passing it via the API request in the `x-finch-access-token` header. This would normally be stored securely in your backend once it is created and not returned to your front end.
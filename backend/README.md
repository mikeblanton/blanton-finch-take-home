# Backend

This is a generic Express.js application.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Configuration

Copy the `.env-template` file to `.env`. Replace the values with your own.

* `CLIENT_ID` - Your `client_id` from Finch
* `CLIENT_SECRET` - Your `client_secret` from Finch. ***This would normally be stored securely in your backend***

### Installation

2. Install dependencies:
  ```bash
  npm install
  ```

### Running the Application

To start the development server:
```bash
npm start
```

The server will be running at `http://localhost:3000` by default.

### Scripts

- `npm start`: Start the production server.

import express, { json } from 'express';
import Finch from '@tryfinch/finch-api';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const finch = new Finch({
  clientId: process.env.FINCH_CLIENT_ID,
  clientSecret: process.env.FINCH_CLIENT_SECRET,
});

// Middleware
app.use(json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

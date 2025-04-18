import express, { json } from 'express';
import cors from 'cors';
import Finch from '@tryfinch/finch-api';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(json());
app.use(cors());

const finch = new Finch({
  clientId: process.env.FINCH_CLIENT_ID,
  clientSecret: process.env.FINCH_CLIENT_SECRET,
});

// Routes
app.post('/finch/connect/sessions', async (req, res) => {
  try {
    const _createConnectSessionResponse = await finch.connect.sessions.new({
      products: ['company', 'directory', 'individual', 'employment'],
      customer_id: req.body.customer.customer_id,
      customer_name: req.body.customer.customer_name,
      customer_email: req.body.customer.customer_email,
      sandbox: 'finch',
    });
    console.log('Session created:', _createConnectSessionResponse);
    res.status(200).json(_createConnectSessionResponse);  
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.post('/finch/accessTokens/create', async (req, res) => {
  try {
    const { code } = req.body;
    const _createAccessTokenResponse = await finch.accessTokens.create({
      code,
    });
    console.log('Access token created:', _createAccessTokenResponse);
    res.status(200).json(_createAccessTokenResponse);
  } catch (error) {
    console.error('Error creating access token:', error);
    res.status(500).json({ error: 'Failed to create access token' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

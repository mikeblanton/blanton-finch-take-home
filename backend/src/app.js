import express, { json } from 'express';
import cors from 'cors';
import Finch from '@tryfinch/finch-api';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(json());
app.use(cors());

app.post('/finch/connect/sessions', async (req, res) => {
  try {
    const _client = new Finch({
      clientId: process.env.FINCH_CLIENT_ID,
      clientSecret: process.env.FINCH_CLIENT_SECRET,
    });

    const _createConnectSessionResponse = await _client.connect.sessions.new({
      products: ['company', 'directory', 'individual', 'employment'],
      customer_id: req.body.customer.customer_id,
      customer_name: req.body.customer.customer_name,
      customer_email: req.body.customer.customer_email,
      sandbox: 'finch',
    });
    console.log('Session created:', {_createConnectSessionResponse, customer: req.body});
    res.status(200).json(_createConnectSessionResponse);  
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json(error);
  }
});

app.post('/finch/accessTokens/create', async (req, res) => {
  try {
    const _client = new Finch({
      clientId: process.env.FINCH_CLIENT_ID,
      clientSecret: process.env.FINCH_CLIENT_SECRET,
    });

    const { code } = req.body;
    const _createAccessTokenResponse = await _client.accessTokens.create({
      code,
    });
    res.status(200).json(_createAccessTokenResponse);
  } catch (error) {
    console.error('Error creating access token:', error);
    res.status(500).json(error);
  }
});

app.get('/finch/hris/company/retrieve', async (req, res) => {
  try {
    const _accessToken = req.get('x-finch-access-token');

    const _client = new Finch({
      clientId: null,
      clientSecret: null,
      accessToken: _accessToken,
    })
    const _retrieveCompanyResponse = await _client.hris.company.retrieve();
    console.log('Company retrieved:', _retrieveCompanyResponse);
    res.status(200).json(_retrieveCompanyResponse);
  } catch (error) {
    console.error('Error retrieving company:', error);
    res.status(500).json(error);
  }
});

app.get('/finch/hris/directory/list', async (req, res) => {
  try {
    const _accessToken = req.get('x-finch-access-token');

    const _client = new Finch({
      clientId: null,
      clientSecret: null,
      accessToken: _accessToken,
    })
    const _listDirectoryResponse = await _client.hris.directory.list();
    console.log('Directory retrieved:', _listDirectoryResponse);
    res.status(200).json(_listDirectoryResponse);
  } catch (error) {
    console.error('Error retrieving directory:', error);
    res.status(500).json(error);
  }
});

app.get('/finch/hris/individuals/:individualId', async (req, res) => {
  try {
    const _accessToken = req.get('x-finch-access-token');

    const _client = new Finch({
      clientId: null,
      clientSecret: null,
      accessToken: _accessToken,
    })
    const _individuals = await _client.hris.individuals.retrieveMany({
      requests: [
        {individual_id: req.params.individualId}
      ],
    });
    console.log('Individual retrieved:', _individuals);
    res.status(200).json(_individuals);
  } catch (error) {
    console.error('Error retrieving individual:', error);
    res.status(500).json(error);
  }
});

app.get('/finch/hris/employments/:individualId', async (req, res) => {
  try {
    const _accessToken = req.get('x-finch-access-token');

    const _client = new Finch({
      clientId: null,
      clientSecret: null,
      accessToken: _accessToken,
    })
    const _employments = await _client.hris.employments.retrieveMany({
      requests: [
        {individual_id: req.params.individualId}
      ],
    });
    console.log('Employments retrieved:', _employments);
    res.status(200).json(_employments);
  } catch (error) {
    console.error('Error retrieving employment:', error);
    res.status(500).json(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

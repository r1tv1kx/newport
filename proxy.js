// proxy.js
// Simple local proxy for NVD API using undici.fetch for broad Node compatibility.
// Works both locally and on Vercel as a serverless function.

require('dotenv').config();
const express = require('express');
const { fetch } = require('undici'); // works with CommonJS
const app = express();

const PORT = process.env.PROXY_PORT || 3000;
const NVD_KEY = process.env.NVD_API_KEY;

if (!NVD_KEY) {
  console.error('ERROR: set NVD_API_KEY in environment or .env');
  process.exit(1);
}

app.get('/api/cves', async (req, res) => {
  try {
    // allow your frontend origin(s). Use specific origin in production.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Forward any query params (e.g. resultsPerPage, pubStartDate)
    const qp = new URLSearchParams(req.query).toString();
    const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0' + (qp ? `?${qp}` : '?resultsPerPage=10');

    const r = await fetch(url, {
      method: 'GET',
      headers: {
        'apiKey': NVD_KEY,
        'Accept': 'application/json'
      }
    });

    const text = await r.text();
    res.status(r.status).set('Content-Type', 'application/json').send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

// OPTIONS preflight for some clients
app.options('/api/cves', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.sendStatus(204);
});

// Export for Vercel serverless function
module.exports = app;

// Only listen if running locally (not on Vercel)
if (require.main === module) {
  app.listen(PORT, () => console.log(`NVD proxy listening at http://localhost:${PORT}/api/cves`));
}

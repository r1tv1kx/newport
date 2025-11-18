// api/cves.js
// Vercel serverless function for NVD API proxy

const { fetch } = require('undici');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const NVD_KEY = process.env.NVD_API_KEY;

    if (!NVD_KEY) {
      console.error('ERROR: NVD_API_KEY not set in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Forward any query params (e.g. resultsPerPage, pubStartDate)
    const qp = new URLSearchParams(req.query).toString();
    const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0' + (qp ? `?${qp}` : '?resultsPerPage=10');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apiKey': NVD_KEY,
        'Accept': 'application/json'
      }
    });

    const text = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
};


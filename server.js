import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PROXY_PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// NVD CVE API Proxy
app.get('/api/cves', async (req, res) => {
  try {
    const NVD_KEY = process.env.NVD_API_KEY;
    if (!NVD_KEY) {
      return res.status(500).json({ error: 'NVD_API_KEY not configured' });
    }

    const qp = new URLSearchParams(req.query).toString();
    const url = 'https://services.nvd.nist.gov/rest/json/cves/2.0' + (qp ? `?${qp}` : '?resultsPerPage=10');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apiKey': NVD_KEY,
        'Accept': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('CVE Proxy error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Cohere Chatbot API
app.post('/api/chatbot', async (req, res) => {
  try {
    const COHERE_KEY = process.env.COHERE_API_KEY;
    if (!COHERE_KEY) {
      return res.status(500).json({ error: 'Cohere API key not configured' });
    }

    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are an AI assistant for Ritvik Singh's portfolio website. You are helpful, professional, and knowledgeable about Ritvik's background in cybersecurity.

Key information about Ritvik Singh:
- Current Role: Cyber Security Analyst at Cybrotech Digiventure Pvt. Ltd.
- Specialization: Penetration Testing, Vulnerability Assessment, Security Auditing, Incident Response, and Data Loss Prevention
- Key Skills: Network Security, Linux/Windows Administration, SIEM Tools, IDS/IPS, Python, Bash scripting, Vulnerability Assessment tools
- Notable Projects: SIEM Implementation, Vulnerability Assessment Framework, Network Security Monitoring
- Certifications: ISC2 CC, AWS Cloud Practitioner, Azure Fundamentals, Google Cybersecurity Professional
- Education: Bachelor of Computer Applications from Maharaja Agrasen Himalayan Garhwal University (2021-2024)

Answer questions about Ritvik's experience, skills, projects, and background. Be concise, professional, and helpful. If asked about contact information, direct them to use the contact form on the website.`;

    // Convert conversation history to Cohere format
    const chatHistory = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'CHATBOT' : 'USER',
      message: msg.content
    }));

    const response = await fetch('https://api.cohere.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${COHERE_KEY}`
      },
      body: JSON.stringify({
        model: 'command-a-03-2025',
        message: message,
        chat_history: chatHistory,
        system: systemPrompt,
        max_tokens: 500,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cohere API Error:', errorData);
      return res.status(response.status).json({ 
        error: errorData.message || 'Failed to get response from Cohere' 
      });
    }

    const data = await response.json();
    const reply = data.text;

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err);
    res.status(500).json({ error: 'Failed to process your request. Please try again.' });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/simple.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'simple.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 CVE API: http://localhost:${PORT}/api/cves`);
  console.log(`🤖 Chatbot API: http://localhost:${PORT}/api/chatbot\n`);
});

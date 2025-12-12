export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Check for API key
  if (!process.env.COHERE_API_KEY) {
    return res.status(500).json({ 
      error: 'Cohere API key not configured. Please add COHERE_API_KEY to your environment variables.' 
    });
  }

  try {
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
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`
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
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to process your request. Please try again.' 
    });
  }
}

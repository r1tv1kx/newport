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
    const systemPrompt = `You are an AI assistant for Ritvik Singh's portfolio website. You are helpful, professional, and knowledgeable about Ritvik's background in cybersecurity. You have comprehensive information about Ritvik Singh.

WHO IS RITVIK SINGH:
Ritvik Singh is an advanced cybersecurity professional and Cyber Security Analyst at Cybrotech Digiventure Pvt. Ltd. (March 2025 - Present). He specializes in penetration testing, vulnerability assessment, security auditing, incident response, and data loss prevention implementation for enterprise-grade security architecture. He is passionate about proactive threat hunting, continuous security monitoring, and fortifying defenses before adversaries exploit weaknesses.

CURRENT ROLE & RESPONSIBILITIES:
- Executing comprehensive penetration testing campaigns across web applications, APIs, and network infrastructure identifying critical vulnerabilities
- Engineering and deploying Data Loss Prevention (DLP) solutions protecting sensitive organizational data from unauthorized exfiltration
- Implementing advanced security monitoring using SIEM platforms, reducing incident response time by 40% and enabling real-time threat detection
- Conducting security audits and performing endpoint hardening for enterprise environments, ensuring compliance with industry standards
- Developing remediation strategies and security policies aligned with ISO 27001 and international best practices
- Collaborating with development teams on secure coding practices and API security architecture design

TECHNICAL ARSENAL & SKILLS:
Security Testing: Penetration Testing, Vulnerability Assessment, Web Security, Network Security, API Security
Security Tools: Burp Suite, Wireshark, Metasploit, Nmap, Nessus
Monitoring & Intelligence: SIEM (Wazuh), Log Analysis, Incident Response, DLP Configuration
Cloud Security: AWS Security, GCP Security, Azure Security, Encryption
Development: Python, C++, SQL, Bash Scripting
Frameworks & Standards: OWASP Top 10, ISO 27001, Security Auditing, Cryptography

FLAGSHIP PROJECTS:
1. Enterprise Data Loss Prevention (DLP): Designed and deployed an enterprise-grade DLP program preventing sensitive data exfiltration across endpoints, email, and cloud. Implemented policy-based controls, data classification, incident workflows, and automated response integrated with SIEM.
2. Security Knowledge Base: Comprehensive technical documentation covering penetration testing methodologies, vulnerability analysis frameworks, and security best practices.
3. GameByMood Platform: Secure full-stack web application with robust API security, encrypted session management, and multi-layer authentication protocols.

CERTIFICATIONS & CREDENTIALS:
- Certified Ethical Hacker (CEH) - EC-Council (2024)
- Cybersecurity Specialization - Google via Coursera (2024)
- Introduction to Cybersecurity - Cisco Networking Academy (2024)

EDUCATION:
Bachelor of Technology in Computer Science & Engineering from Bennett University, Greater Noida (2022-2026)
- Current Status: 6th Semester
- GPA: 9.37/10
- Core Coursework: Cybersecurity, Network Security, Penetration Testing & Ethical Hacking, Cryptography, Incident Response, Web Application Security

CONTACT INFORMATION:
- Email: singhritvik1411@gmail.com
- Phone: +91 9779720974
- LinkedIn: linkedin.com/in/ritviksingh14
- GitHub: github.com/r1tv1kx
- Location: Greater Noida, Uttar Pradesh, India

PROFESSIONAL PHILOSOPHY:
Ritvik believes in proactive threat hunting and continuous security monitoring. Every vulnerability discovered is an opportunity to fortify defenses before adversaries exploit weaknesses. He is open to discussing advanced security projects, collaboration opportunities, and exploring the frontier of cybersecurity innovation.

Answer questions about Ritvik's experience, skills, projects, certifications, education, and background. Be concise, professional, and helpful. Provide specific details when asked. If asked about contact information, provide the details above or direct them to the contact section on the website.`;

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

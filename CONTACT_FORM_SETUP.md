# Contact Form Setup Instructions

## Option 1: Using PHP (Recommended for local server)

1. **If using a PHP server (XAMPP, WAMP, MAMP, etc.):**
   - The `send-email.php` file is already included
   - Place all files in your web server directory
   - Make sure PHP mail is configured on your server
   - The form will automatically use this endpoint

## Option 2: Using an Online Form Service (No setup needed)

The form currently falls back to opening your email client if the PHP backend is not available.

### To use a free online service instead:

1. **FormSubmit.co (Easiest - No registration needed first time):**
   - Open `script.js`
   - Find the fetch URL in the contact form handler
   - Replace `'send-email.php'` with `'https://formsubmit.co/ajax/singhritvik1411@gmail.com'`
   - On first submission, you'll receive a verification email
   - Click verify, and subsequent submissions will work automatically

2. **Web3Forms.com (Requires free API key):**
   - Sign up at https://web3forms.com
   - Get your free access key
   - Replace the endpoint in `script.js` with:
   ```javascript
   const response = await fetch('https://api.web3forms.com/submit', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
       body: JSON.stringify({
           access_key: 'YOUR_ACCESS_KEY_HERE',
           name: formData.name,
           email: formData.email,
           subject: formData.subject,
           message: formData.message
       })
   });
   ```

## Current Behavior

- **With PHP server:** Emails are sent directly via PHP mail()
- **Without PHP server:** Falls back to opening the default email client (mailto:)
- Both show "✓ SENT" message on success

## Testing

1. Fill out the contact form
2. Submit
3. Check your email at: singhritvik1411@gmail.com
4. If using mailto fallback, your email client should open with pre-filled information

## New Features Added

### Crazy Scroll Animations:
- 3D card tilt effects on hover
- Parallax scrolling for hero section
- Smooth reveal animations with stagger effect
- Magnetic button effects
- Dynamic particle background
- Smooth cursor trail
- Glitch effects on titles
- Section titles with glow and zoom effects

### Modern Design:
- Glassmorphism effects on all cards
- Gradient mesh backgrounds
- Floating orbs animation
- Dynamic color schemes
- Backdrop blur effects
- Professional gradient buttons
- Smooth transitions with cubic-bezier easing

Enjoy your new portfolio! 🚀

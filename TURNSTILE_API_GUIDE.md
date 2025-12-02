# Cloudflare Turnstile API Integration Guide

## Overview
Your React frontend is now properly configured to send Turnstile tokens. **You MUST verify these tokens server-side** - this is critical for security.

## Why Server-Side Verification is Required

⚠️ **IMPORTANT**: Client-side validation alone provides NO security. Attackers can:
- Forge tokens
- Bypass client-side checks
- Submit forms without completing the challenge

## Token Characteristics

- **Lifetime**: 5 minutes (300 seconds)
- **Usage**: Single-use only (cannot be validated twice)
- **Expiration**: Returns `timeout-or-duplicate` error if expired or reused

## Server-Side Implementation

### 1. API Endpoint Requirements

Your `/api/contact` endpoint needs to:
1. Receive the `turnstileToken` from the request body
2. Verify it with Cloudflare's API
3. Only process the form if verification succeeds

### 2. Verification API Call

**Endpoint**: `https://challenges.cloudflare.com/turnstile/v0/siteverify`

**Method**: POST

**Headers**:
- `Content-Type: application/json` OR `application/x-www-form-urlencoded`

**Body Parameters**:
```json
{
  "secret": "YOUR_SECRET_KEY",
  "response": "turnstile_token_from_frontend",
  "remoteip": "user_ip_address" // Optional but recommended
}
```

### 3. Example Implementation (Node.js/Express)

```javascript
app.post('/api/contact', async (req, res) => {
  const { name, email, message, turnstileToken } = req.body;

  // Verify Turnstile token
  const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  try {
    const turnstileResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: req.ip, // Optional
      }),
    });

    const turnstileData = await turnstileResponse.json();

    // Check if verification succeeded
    if (!turnstileData.success) {
      console.error('Turnstile verification failed:', turnstileData['error-codes']);
      return res.status(400).json({
        error: 'CAPTCHA verification failed',
        codes: turnstileData['error-codes']
      });
    }

    // Verification successful - process the form
    // ... send email, save to database, etc.

    res.json({ success: true, message: 'Form submitted successfully' });

  } catch (error) {
    console.error('Turnstile verification error:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
});
```

### 4. Response Format

**Success Response**:
```json
{
  "success": true,
  "challenge_ts": "2024-01-01T00:00:00.000Z",
  "hostname": "yourdomain.com",
  "error-codes": [],
  "action": "login",
  "cdata": "custom_data"
}
```

**Failure Response**:
```json
{
  "success": false,
  "error-codes": [
    "invalid-input-response",
    "timeout-or-duplicate"
  ]
}
```

### 5. Common Error Codes

| Error Code | Meaning |
|------------|---------|
| `missing-input-secret` | Secret key is missing |
| `invalid-input-secret` | Secret key is invalid |
| `missing-input-response` | Token is missing |
| `invalid-input-response` | Token is invalid or malformed |
| `timeout-or-duplicate` | Token expired (>5min) or already used |
| `internal-error` | Cloudflare internal error |

## Environment Variables Needed

### Frontend (.env)
```bash
VITE_TURNSTILE_SITE_KEY=0x4AAAAAACD5n90tqkQyeRDY
```

### Backend (.env)
```bash
TURNSTILE_SECRET_KEY=your_secret_key_here
```

⚠️ **NEVER expose the secret key in frontend code!**

## Security Best Practices

1. ✅ **Always verify server-side** - Never trust client-side tokens
2. ✅ **Use environment variables** - Never hardcode secret keys
3. ✅ **Log failed attempts** - Monitor for abuse
4. ✅ **Rate limit your API** - Add additional protection
5. ✅ **Include remoteip** - Helps Cloudflare detect abuse
6. ✅ **Handle errors gracefully** - Don't expose internal details

## Testing

### Development
- Use test keys from Cloudflare dashboard for development
- Test both success and failure scenarios
- Verify token expiration handling

### Production
- Use production keys from your Cloudflare dashboard
- Monitor verification success rates
- Set up alerts for high failure rates

## Additional Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [Server-side Validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Error Codes Reference](https://developers.cloudflare.com/turnstile/reference/error-codes/)

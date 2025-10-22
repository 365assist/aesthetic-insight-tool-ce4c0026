# n8n Workflow Security Documentation

## 🔒 Security Enhancements Applied

All webhook-triggered workflows have been updated with comprehensive security measures to address identified vulnerabilities.

### Changes Made

1. **API Key Authentication**
   - All webhooks now require `x-api-key` header for authentication
   - Unauthorized requests are rejected immediately
   - API keys should be stored in n8n environment variables as `WEBHOOK_API_KEY`

2. **Input Validation**
   - Comprehensive validation of all input fields
   - Type checking, length limits, and format validation
   - Special character filtering to prevent injection attacks
   - Sanitization of inputs before processing

3. **Protection Against:**
   - ✅ Unauthorized access and API abuse
   - ✅ SQL/NoSQL injection attacks
   - ✅ AI prompt injection
   - ✅ Email header injection
   - ✅ Data corruption from malformed inputs
   - ✅ Buffer overflow from oversized inputs

### Updated Workflows

- **1-lead-qualification.json** - Lead submission form with validation
- **2-support-triage.json** - Support ticket processing with security
- **5-udi-reporting.json** - UDI equipment event reporting secured
- **7-email-marketing.json** - Campaign trigger with authentication

## 📋 Setup Instructions

### 1. Generate Webhook API Key

Generate a secure random API key:

```bash
# Using OpenSSL
openssl rand -hex 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Configure n8n Environment

Add the API key to your n8n environment variables:

**Option A: Using n8n UI**
1. Go to Settings → Environment Variables
2. Add new variable: `WEBHOOK_API_KEY`
3. Value: Your generated API key
4. Save

**Option B: Using Docker Compose**
```yaml
# docker-compose.yml
services:
  n8n:
    environment:
      - WEBHOOK_API_KEY=your_generated_api_key_here
```

**Option C: Using .env file**
```bash
# .env
WEBHOOK_API_KEY=your_generated_api_key_here
```

### 3. Import Updated Workflows

1. Open n8n web interface
2. Go to Workflows
3. Click "Import from File"
4. Select each updated JSON file
5. Activate the workflows

### 4. Update Client Applications

All applications calling these webhooks must include the API key header:

```javascript
fetch('https://your-n8n-instance.com/webhook/lead-submission', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_webhook_api_key'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello'
  })
});
```

## 🔍 Validation Rules

### Lead Qualification
- **Name**: Required, 1-100 chars, letters/spaces/hyphens/apostrophes only
- **Email**: Required, valid format, max 255 chars
- **Phone**: Optional, max 20 chars if provided
- **Message**: Required, 1-5000 chars
- **Interest**: Optional, max 100 chars

### Support Triage
- **Email**: Required, valid format, max 255 chars
- **Subject**: Required, 1-200 chars
- **Message**: Required, 1-10000 chars

### UDI Reporting
- **Device Model**: Required, 1-100 chars
- **Serial Number**: Required, 1-50 chars
- **Error Code**: Optional, max 50 chars
- **Description**: Required, 1-5000 chars
- **Event Date**: Required, ISO 8601 format

### Email Marketing
- **Campaign Name**: Required, 1-100 chars

## 🚨 Error Responses

### Authentication Failure
```json
{
  "error": "Unauthorized - Invalid API key"
}
```

### Validation Failure
```json
{
  "error": "Validation failed: Name is required, Invalid email address"
}
```

## 🛡️ Security Best Practices

1. **Rotate API Keys Regularly**
   - Change webhook API keys every 90 days
   - Update all client applications after rotation

2. **Monitor Webhook Usage**
   - Review n8n execution logs regularly
   - Set up alerts for failed authentication attempts

3. **Rate Limiting**
   - Consider implementing rate limiting in n8n or at infrastructure level
   - Recommended: 100 requests per minute per IP

4. **HTTPS Only**
   - Always use HTTPS for webhook endpoints
   - Never send API keys over unencrypted connections

5. **Principle of Least Privilege**
   - Use different API keys for different workflows when possible
   - Rotate compromised keys immediately

## 📊 Testing

Test your webhooks with curl:

```bash
# Valid request
curl -X POST https://your-n8n-instance.com/webhook/lead-submission \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_webhook_api_key" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'

# Should fail - missing API key
curl -X POST https://your-n8n-instance.com/webhook/lead-submission \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'

# Should fail - invalid email
curl -X POST https://your-n8n-instance.com/webhook/lead-submission \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_webhook_api_key" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email"
  }'
```

## 📚 Additional Resources

- [n8n Security Best Practices](https://docs.n8n.io/hosting/security/)
- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [API Security Best Practices](https://owasp.org/www-project-api-security/)

## 🆘 Support

If you encounter issues with the updated workflows:

1. Check n8n execution logs for detailed error messages
2. Verify API key is correctly set in environment variables
3. Ensure client applications are sending the `x-api-key` header
4. Review validation rules match your data format

For further assistance, contact your development team or refer to n8n documentation.

---

*Last Updated: 2025-10-22*

# n8n AI Workflows for Aesthetic ProTools

This directory contains ready-to-import n8n workflow JSON files for automating business processes with AI.

## Workflows Included

1. **Lead Qualification & Follow-Up** (`1-lead-qualification.json`)
   - Analyzes contact form submissions with AI
   - Scores leads and routes to appropriate sales reps
   - Generates personalized follow-up emails

2. **Support Ticket Triage & Response** (`2-support-triage.json`)
   - Classifies support tickets automatically
   - Generates technical responses with high confidence
   - Escalates complex issues to specialists

3. **Shopify Product Sync** (`3-shopify-sync.json`)
   - Daily sync of Shopify products
   - AI-generated SEO content and meta tags
   - Clinical usage descriptions

4. **Training Personalization** (`4-training-personalization.json`)
   - Tracks member progress
   - AI-generated learning recommendations
   - Personalized next-step emails

5. **UDI Reporting Automation** (`5-udi-reporting.json`)
   - Assesses equipment events for FDA reporting
   - Pre-fills UDI report templates
   - Notifies compliance officers

6. **Competitive Intelligence** (`6-competitive-intelligence.json`)
   - Daily competitor website monitoring
   - AI analysis of market trends
   - Executive intelligence briefs

7. **Email Marketing Personalization** (`7-email-marketing.json`)
   - Customer segmentation with AI
   - Personalized email content generation
   - A/B test subject line creation

## Import Instructions

1. Open your n8n instance
2. Click "Workflows" → "Import from File"
3. Select the JSON file you want to import
4. Configure required credentials (see below)
5. Activate the workflow

## Required Credentials

Before using these workflows, configure the following credentials in n8n:

### Lovable AI Gateway
- **Type:** HTTP Header Auth
- **Name:** `lovableAiApi`
- **Header Name:** `Authorization`
- **Header Value:** `Bearer YOUR_LOVABLE_API_KEY`

### Supabase
- **Type:** Supabase API
- **Project URL:** Your Supabase project URL
- **API Key:** Your Supabase anon/service key

### Email (SMTP)
- **Type:** SMTP
- **Host:** Your SMTP server
- **Port:** 587 (or your provider's port)
- **Username:** Your email username
- **Password:** Your email password

### Shopify (for workflow #3)
- **Type:** Shopify API
- **Shop Subdomain:** Your shop name
- **Access Token:** Your Shopify API token

## Configuration Notes

### AI Model Selection
- Workflows use recommended models from the documentation
- `openai/gpt-5-mini` for classification/routing (cost-effective)
- `openai/gpt-5` for content generation (high quality)
- `google/gemini-2.5-flash` for multimodal tasks
- `google/gemini-2.5-flash-lite` for simple recommendations

### Database Tables
Ensure these Supabase tables exist:
- `contacts` - Lead information
- `support_tickets` - Support requests
- `products` - Product catalog
- `member_progress` - Training progress
- `udi_reports` - UDI compliance reports
- `competitive_intelligence` - Market analysis
- `email_campaigns` - Marketing campaigns
- `customers` - Customer database

### Webhook URLs
After importing, workflows with webhook triggers will generate URLs. Update your forms and integrations to point to these URLs.

## Testing

Test each workflow individually:
1. Use the "Execute Workflow" button in n8n
2. Send test data to webhook endpoints
3. Check execution logs for errors
4. Verify data is correctly stored in Supabase

## Monitoring

- Enable workflow execution history in n8n settings
- Set up error notifications via email or Slack
- Review AI response quality regularly
- Monitor token usage and costs

## Support

For detailed documentation, see `N8N_AI_WORKFLOWS.md` in the project root.

For issues or questions, contact the development team.

---

*Version: 1.0*  
*Last Updated: 2025-10-06*

# WhatsApp Business Integration Setup Guide

## Overview
This module integrates WhatsApp Business API to receive job and bursary submissions from the number **0716185262** (or 27716185262 in international format). Messages are automatically categorized and sent to admin for approval before being published on the site.

## Features
- ✅ Webhook endpoint to receive WhatsApp messages
- ✅ Automatic message categorization (bursary, career, learnership, business, general)
- ✅ Admin approval workflow
- ✅ Parse and edit submission data before approval
- ✅ Automatic opportunity creation after approval
- ✅ Message read receipts
- ✅ Security validation with webhook signatures

## Setup Instructions

### 1. Meta Developer Account Setup

1. **Go to Meta for Developers**: https://developers.facebook.com/
2. **Create an App**:
   - Click "My Apps" > "Create App"
   - Select "Business" as app type
   - Fill in app details (Youth Info Portal)
   - App ID: `843391168649905` (already configured)

3. **Add WhatsApp Product**:
   - In your app dashboard, click "Add Product"
   - Select "WhatsApp" > "Set Up"

4. **Get Access Token**:
   - Go to WhatsApp > Getting Started
   - Copy the temporary access token (valid for 24 hours)
   - For production, create a System User token:
     - Go to Business Settings > System Users
     - Create a system user
     - Generate token with `whatsapp_business_messaging` and `whatsapp_business_management` permissions

5. **Get Phone Number ID**:
   - In WhatsApp > API Setup
   - Copy the "Phone number ID"
   - Note: The test number can only message 5 numbers. For production, verify a business number.

### 2. Configure Environment Variables

Update `/backend/.env` with your WhatsApp credentials:

```env
# WhatsApp Business API Configuration
WHATSAPP_VERIFY_TOKEN=vibecoding
WHATSAPP_ACCESS_TOKEN=your_actual_access_token_here
WHATSAPP_APP_SECRET=your_app_secret_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here
```

**Where to find these values:**
- **WHATSAPP_VERIFY_TOKEN**: Use `vibecoding` (you set this yourself)
- **WHATSAPP_ACCESS_TOKEN**: From WhatsApp > API Setup in Meta dashboard
- **WHATSAPP_APP_SECRET**: App Dashboard > Settings > Basic > App Secret
- **WHATSAPP_PHONE_NUMBER_ID**: WhatsApp > API Setup > Phone number ID
- **WHATSAPP_BUSINESS_ACCOUNT_ID**: WhatsApp > API Setup > WhatsApp Business Account ID

### 3. Deploy Backend with Public URL

Your webhook endpoint needs to be publicly accessible. Options:

**Option A: ngrok (for development/testing)**
```bash
# Install ngrok
npm install -g ngrok

# Start your backend server
cd backend
node server.js

# In another terminal, expose port 5001
ngrok http 5001

# Copy the https URL (e.g., https://abc123.ngrok.io)
```

**Option B: Deploy to production**
- Deploy to Heroku, Railway, Render, or DigitalOcean
- Ensure HTTPS is enabled
- Note your public URL (e.g., https://youth-info-api.herokuapp.com)

### 4. Configure Webhook in Meta Dashboard

1. **Go to WhatsApp > Configuration** in your app dashboard
2. **Edit Callback URL**:
   - Callback URL: `https://your-domain.com/api/whatsapp/webhook`
   - Example with ngrok: `https://abc123.ngrok.io/api/whatsapp/webhook`
   - Verify token: `vibecoding` (must match WHATSAPP_VERIFY_TOKEN in .env)

3. **Subscribe to Webhook Fields**:
   - Check ✅ `messages` field
   - This sends incoming messages to your webhook

4. **Click "Verify and Save"**
   - Meta will send a GET request to verify your endpoint
   - Your server should respond with the challenge token

### 5. Test the Integration

1. **Start the backend server**:
```bash
cd backend
node server.js
```

2. **Send a test message**:
   - From WhatsApp, send a message to your business number
   - Message should come from `0716185262`
   - Check server logs for: `✅ Message saved from ...`

3. **View in Admin Dashboard**:
   - Login as admin: `admin@youthportal.co.za` / `admin123`
   - Go to: http://localhost:3001/admin/whatsapp
   - You should see the message listed as "Pending"

### 6. Approve Messages

In the WhatsApp Submissions admin page:

1. **View Details**: Click eye icon to see full message
2. **Edit**: Click edit icon to:
   - Parse the message into structured data
   - Add title, description, organization, etc.
   - Set deadline, contact info, requirements
3. **Approve**: Click green checkmark to:
   - Create an opportunity from the message
   - Publish it on the appropriate page
4. **Reject**: Click red X to reject the submission

## API Endpoints

### Webhook Endpoint
- `GET /api/whatsapp/webhook` - Webhook verification
- `POST /api/whatsapp/webhook` - Receive messages

### Admin Endpoints (require auth + admin role)
- `GET /api/whatsapp/submissions` - List all submissions
  - Query params: `status`, `category`, `page`, `limit`
- `GET /api/whatsapp/submissions/:id` - Get single submission
- `PUT /api/whatsapp/submissions/:id/parse` - Update parsed data
- `POST /api/whatsapp/submissions/:id/approve` - Approve and create opportunity
- `POST /api/whatsapp/submissions/:id/reject` - Reject submission
- `DELETE /api/whatsapp/submissions/:id` - Delete submission
- `GET /api/whatsapp/submissions/stats/overview` - Get statistics

## Message Categorization

Messages are automatically categorized based on keywords:

- **Bursary**: bursary, scholarship, nsfas, funding, study, university, college
- **Career**: job, career, employment, position, vacancy, hiring, recruit, work
- **Learnership**: learnership, apprentice, internship, training
- **Business**: business, entrepreneur, startup, grant, nyda, seda
- **General**: Default if no keywords match

## Database Schema

**WhatsAppSubmission Model**:
```javascript
{
  messageId: String,           // WhatsApp message ID
  senderPhone: String,          // 27716185262
  senderName: String,           // Contact name
  messageType: String,          // text, image, video, document
  messageContent: String,       // Message text
  mediaUrl: String,             // Media file ID if applicable
  category: String,             // bursary, career, etc.
  status: String,               // pending, approved, rejected
  timestamp: Date,              // Message timestamp
  opportunityId: ObjectId,      // Created opportunity (if approved)
  reviewedBy: ObjectId,         // Admin who reviewed
  reviewedAt: Date,             // Review timestamp
  reviewNotes: String,          // Admin notes
  parsedData: {                 // Structured data
    title: String,
    description: String,
    organization: String,
    location: String,
    deadline: Date,
    contactEmail: String,
    contactPhone: String,
    website: String,
    requirements: [String],
    amount: String
  }
}
```

## Security

- ✅ Webhook signature validation using HMAC-SHA256
- ✅ Only processes messages from specific phone number (0716185262)
- ✅ Admin authentication required for all management endpoints
- ✅ HTTPS required for webhook endpoint

## Troubleshooting

**Webhook not receiving messages:**
1. Check that callback URL is correct and accessible
2. Verify WHATSAPP_VERIFY_TOKEN matches in .env and Meta dashboard
3. Check server logs for webhook verification
4. Ensure `messages` field is subscribed in Meta dashboard
5. Check that sender number is 0716185262

**Messages not being saved:**
1. Check server logs for errors
2. Verify MongoDB connection
3. Check WhatsAppSubmission model is loaded
4. Ensure phone number format is correct (27716185262 or 716185262)

**Cannot approve submissions:**
1. Login as admin user
2. Check admin role is set correctly
3. Verify auth middleware is working
4. Check server logs for errors

## Production Checklist

Before going live:

- [ ] Get production WhatsApp Business Account
- [ ] Verify business phone number with Meta
- [ ] Generate permanent System User access token
- [ ] Deploy backend to production server with HTTPS
- [ ] Update webhook URL in Meta dashboard
- [ ] Test message flow end-to-end
- [ ] Set up monitoring and alerts
- [ ] Document message format guidelines for senders
- [ ] Train admins on approval workflow

## Support

For issues or questions:
- Check Meta's WhatsApp Business Platform docs: https://developers.facebook.com/docs/whatsapp
- Review server logs for error messages
- Contact development team

---

**Created**: November 26, 2025  
**Last Updated**: November 26, 2025

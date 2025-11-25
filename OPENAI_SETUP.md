# OpenAI Integration Guide

## Setup Complete! ✅

Your Youth Portal now uses **OpenAI GPT-4** for intelligent chatbot responses!

## Configuration

### Environment Variables

The OpenAI API key is stored in `backend/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**🔒 Security Note:** 
- Never commit this key to version control!
- The `.env` file is already in `.gitignore` to prevent accidental commits
- Keep your API key private and secure

### Models Used

Currently using **GPT-4** (the latest available model from OpenAI):
- GPT-5 has not been released yet
- GPT-4 is the most advanced model available
- Provides intelligent, context-aware responses

## Features Powered by OpenAI

### 1. Career Chatbot (`/api/chat/gpt`)
**Location:** Profile page → AI Chatbot tab

**Capabilities:**
- ✅ Personalized career guidance
- ✅ Bursary and scholarship advice
- ✅ CV and interview tips
- ✅ Learnership information
- ✅ Business funding guidance
- ✅ Context-aware conversations (maintains history)

**System Prompt:**
```
You are a helpful career advisor assistant for South African youth in the Eastern Cape.
Your role is to provide guidance on:
- Bursaries and scholarships
- Career opportunities and job hunting
- Learnerships and training programs
- Business funding and entrepreneurship
- CV writing and interview preparation
- Education and skills development
```

### 2. Medical Info Chatbot (`/api/chat/`)
**Location:** Medical Chat page

**Capabilities:**
- ✅ Mental health support information
- ✅ HIV/TB resources
- ✅ Reproductive health guidance
- ✅ Clinic and hospital information
- ✅ Emergency contacts
- ✅ Sensitive and non-judgmental responses

**System Prompt:**
```
You are a helpful medical information assistant for South African youth in the Eastern Cape.
Provide information about health services and resources.
Always remind users to consult healthcare professionals for diagnosis.
```

## API Configuration

### Model Settings

```javascript
{
  model: 'gpt-4',
  max_tokens: 500,
  temperature: 0.7
}
```

- **model**: `gpt-4` (latest available)
- **max_tokens**: 500 (approximately 375 words)
- **temperature**: 0.7 (balanced creativity and accuracy)

### Fallback Mechanism

If OpenAI API fails (quota exceeded, network error, etc.), the system automatically falls back to:
- ✅ Rule-based responses
- ✅ Pre-programmed helpful information
- ✅ No service interruption

## Usage

### Testing the Chatbots

1. **Career Chatbot:**
   ```bash
   # Login to the portal
   # Navigate to Profile → AI Chatbot tab
   # Ask questions like:
   - "How can I find bursaries?"
   - "Help me prepare for an interview"
   - "What is a learnership?"
   ```

2. **Medical Chatbot:**
   ```bash
   # Navigate to Medical Chat page
   # Ask questions like:
   - "Where can I get mental health support?"
   - "Information about HIV testing"
   - "Reproductive health services"
   ```

### API Testing with curl

**Career Chatbot:**
```powershell
$token = "your-jwt-token"
$body = @{
  message = "How do I apply for bursaries?"
  history = @()
} | ConvertTo-Json

curl -X POST http://localhost:5001/api/chat/gpt `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d $body
```

**Medical Chatbot:**
```powershell
$body = @{
  message = "Mental health support"
  history = @()
} | ConvertTo-Json

curl -X POST http://localhost:5001/api/chat/ `
  -H "Content-Type: application/json" `
  -d $body
```

## Response Format

### Career Chatbot Response
```json
{
  "message": "AI-generated response text...",
  "model": "gpt-4",
  "usage": {
    "prompt_tokens": 150,
    "completion_tokens": 200,
    "total_tokens": 350
  }
}
```

### Medical Chatbot Response
```json
{
  "reply": "AI-generated response text...",
  "model": "gpt-4",
  "usage": {
    "prompt_tokens": 180,
    "completion_tokens": 220,
    "total_tokens": 400
  }
}
```

## Cost Management

### Token Usage
- Average query: ~350 tokens
- GPT-4 pricing (as of 2024):
  - Input: $0.03 per 1K tokens
  - Output: $0.06 per 1K tokens
- Estimated cost per conversation: ~$0.02-0.05

### Rate Limits
- Free tier: Limited requests per minute
- Monitor usage in OpenAI dashboard
- Fallback responses prevent service interruption

### Monitoring

Check backend console logs:
```
🤖 GPT Chat request from: Nathan Richard
📝 Message: How do I find bursaries?
🚀 Calling OpenAI API with GPT-4...
✅ OpenAI response received
```

Error logs:
```
❌ OPENAI_API_KEY not configured
⚠️ OpenAI quota exceeded, using fallback responses
```

## Troubleshooting

### API Key Not Working

1. **Check .env file:**
   ```powershell
   Get-Content backend\.env | Select-String "OPENAI"
   ```

2. **Verify key format:**
   - Should start with `sk-proj-`
   - No spaces or line breaks
   - Properly loaded by dotenv

3. **Test the key:**
   ```powershell
   cd backend
   node -e "require('dotenv').config(); console.log(process.env.OPENAI_API_KEY)"
   ```

### Rate Limit Errors

If you see "429 Too Many Requests":
- Wait a few minutes
- System automatically uses fallback responses
- Check your OpenAI dashboard for quota

### Model Not Available

If GPT-4 is not available on your account:
- Change `model: 'gpt-4'` to `model: 'gpt-3.5-turbo'`
- GPT-3.5-turbo is faster and cheaper
- Still provides excellent responses

## Upgrading to GPT-5 (When Available)

When GPT-5 is released:

1. Update the model in `backend/routes/chat.js`:
   ```javascript
   const completion = await openai.chat.completions.create({
     model: 'gpt-5', // Change from 'gpt-4'
     messages: messages,
     max_tokens: 500,
     temperature: 0.7,
   });
   ```

2. Test thoroughly with sample queries

3. Monitor costs (new models may have different pricing)

## Security Best Practices

✅ **DO:**
- Keep API key in .env file
- Add .env to .gitignore
- Use environment variables in production
- Monitor usage regularly
- Set up billing alerts in OpenAI dashboard

❌ **DON'T:**
- Commit API keys to Git
- Share keys publicly
- Hardcode keys in source code
- Expose keys in client-side code

## Next Steps

1. ✅ API key configured
2. ✅ OpenAI package installed
3. ✅ GPT-4 integration complete
4. ✅ Fallback mechanisms in place

**Ready to use!** Restart your backend server and test the chatbots! 🚀

### Restart Backend
```powershell
cd backend
node server.js
```

### Test the Chatbot
1. Login to the portal
2. Go to Profile → AI Chatbot tab
3. Ask: "How can I find bursaries in Eastern Cape?"
4. Watch the magic happen! ✨

## Support

For issues:
- Check backend console logs
- Verify .env configuration
- Test with simple queries first
- Monitor OpenAI dashboard for usage/errors

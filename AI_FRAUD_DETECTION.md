# AI Fraud Detection for Admin Dashboard 🔒🤖

## Overview

The Admin Dashboard now includes an **AI-powered fraud detection system** to help identify and flag potentially fraudulent or scam opportunities before they reach youth users.

## Features ✨

### 1. **Verify Button**
- Located in the "Pending Approval" tab
- Click "Verify" next to any pending opportunity
- AI analyzes the posting for fraud indicators

### 2. **Risk Assessment**
The system provides:
- **Risk Level**: LOW, MEDIUM, or HIGH
- **Risk Score**: 0-100 (higher = more suspicious)
- **Specific Flags**: List of concerning elements detected
- **Analysis**: Detailed explanation of findings
- **Recommendations**: Actions admin should take

### 3. **Visual Indicators**
- 🟢 **LOW RISK** - Green badge (appears legitimate)
- 🟡 **MEDIUM RISK** - Yellow badge (some concerns, verify manually)
- 🔴 **HIGH RISK** - Red badge (likely fraud, reject recommended)

### 4. **Quick Rejection**
- HIGH risk postings have a "Reject as Fraud" button
- Auto-populates rejection reason with fraud details
- One-click fraud prevention

## What the AI Checks 🔍

### AI-Powered Analysis (GPT-4)
When OpenAI API is configured, the system uses GPT-4 to analyze:
1. **Unrealistic Promises** - "too good to be true" offers
2. **Payment Requests** - upfront fees, registration costs
3. **Poor Quality** - spelling errors, unprofessional writing
4. **Suspicious Contact Info** - personal emails, fake phone numbers
5. **Vague Details** - missing organization info, unclear descriptions
6. **Pressure Tactics** - urgent deadlines, "act now" language
7. **Fake Organizations** - non-existent companies
8. **Application Process** - suspicious or missing application methods
9. **Requirements** - unrealistic or inappropriate qualifications

### Rule-Based Fallback
If AI is unavailable, the system uses rule-based detection:
- Scam keyword detection ("easy money", "no experience", "guaranteed income", etc.)
- Missing critical information (organization, contact details)
- Personal email domains (gmail, yahoo, hotmail)
- Very short/vague descriptions
- ALL CAPS titles (aggressive marketing)
- Unrealistic salary promises
- Fee-based requirements

## How to Use 📖

### Step 1: Access Pending Opportunities
1. Login as Admin
2. Navigate to Admin Dashboard
3. Go to "Pending Approval" tab

### Step 2: Run Fraud Check
1. Find an opportunity to verify
2. Click the **"Verify"** button
3. Wait for AI analysis (5-10 seconds)

### Step 3: Review Results
1. Risk level badge appears in "Fraud Check" column
2. Click the badge to view detailed analysis
3. Review:
   - Risk score and level
   - Specific flags detected
   - AI analysis explanation
   - Recommended actions

### Step 4: Take Action
**For LOW Risk:**
- ✅ Likely legitimate
- Proceed with standard approval
- Still verify organization independently

**For MEDIUM Risk:**
- ⚠️ Some concerns detected
- Review flags carefully
- Verify organization details
- Contact poster for clarification if needed
- Approve with caution or reject

**For HIGH Risk:**
- 🚨 Multiple fraud indicators
- **Recommended**: Reject immediately
- Click "Reject as Fraud" for quick rejection
- System auto-fills fraud details in rejection reason

## Example Fraud Indicators

### 🚩 Common Red Flags Detected:

1. **"No experience needed - earn R10,000/week!"**
   - Flags: Unrealistic promises, "easy money"
   - Risk: HIGH

2. **"Pay R500 registration fee to apply"**
   - Flags: Upfront payment required
   - Risk: HIGH
   - ⚠️ **Legitimate opportunities NEVER require payment**

3. **Contact: johndoe@gmail.com**
   - Flags: Personal email, not company domain
   - Risk: MEDIUM

4. **Very short description with ALL CAPS TITLE**
   - Flags: Poor quality, aggressive marketing
   - Risk: MEDIUM

5. **"Training opportunity - bring your ID and R200 for materials"**
   - Flags: Fee requirement
   - Risk: HIGH

## Technical Details 🔧

### Backend Endpoint
```
POST /api/admin/opportunities/:id/fraud-check
```

**Response Format:**
```json
{
  "riskLevel": "HIGH",
  "riskScore": 85,
  "flags": [
    "Upfront payment required",
    "Using personal email",
    "Unrealistic salary promises"
  ],
  "analysis": "This posting shows multiple fraud indicators...",
  "recommendations": [
    "Verify organization exists",
    "Check official website",
    "Contact organization directly"
  ],
  "usedAI": true,
  "model": "gpt-4"
}
```

### AI Configuration

**Model**: GPT-4 (OpenAI)
**Temperature**: 0.3 (factual, consistent)
**Max Tokens**: 800
**Fallback**: Rule-based detection if API unavailable

### Environment Setup

Ensure `.env` file has:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

If not configured, system automatically uses rule-based detection.

## Benefits for Admins 🎯

1. **Faster Review** - AI pre-screens postings
2. **Catch Subtle Scams** - Detects patterns humans might miss
3. **Consistent Standards** - Same criteria applied to all
4. **Education** - Learn common fraud tactics
5. **User Protection** - Prevent youth from encountering scams
6. **Documented Decisions** - Fraud analysis saved for reference

## Best Practices ✅

### Do's:
- ✅ Run fraud check on ALL pending opportunities
- ✅ Read the full analysis, not just the risk level
- ✅ Verify HIGH risk postings independently
- ✅ Use fraud check as ONE tool, not the only tool
- ✅ Still apply human judgment

### Don'ts:
- ❌ Don't blindly trust LOW risk ratings
- ❌ Don't approve without basic verification
- ❌ Don't ignore MEDIUM risk warnings
- ❌ Don't share fraud detection logic with bad actors

## Fraud Check Workflow

```
Pending Opportunity Submitted
         ↓
Admin clicks "Verify"
         ↓
AI Analyzes Content
         ↓
    Risk Assessment
         ↓
   ┌──────┴──────┐
   │             │
LOW/MEDIUM     HIGH
   │             │
Verify +       Reject
Manual         as Fraud
Review           ↓
   ↓           Denied
Approve/
Reject
```

## Statistics & Monitoring

The fraud detection system logs:
- Total fraud checks performed
- Risk level distribution
- Flags most commonly detected
- Approval/rejection rates by risk level

Admins can use this data to:
- Identify trending scam tactics
- Improve fraud detection rules
- Train stakeholders on legitimate posting practices

## Common Scam Types in South Africa

### 1. Fake Training Programs
**Red Flags:**
- "Guaranteed job after training"
- "Pay R500-R2000 for course"
- No accredited institution affiliation
- Pressure to register immediately

### 2. Pyramid Schemes
**Red Flags:**
- "Recruit others to earn"
- "Work from home, unlimited income"
- Focus on recruitment over actual work
- Vague product/service descriptions

### 3. Advance Fee Fraud
**Red Flags:**
- "Pay processing fee to get hired"
- "Send ID copy and R200 for uniform"
- "Registration fee refundable after 3 months"
- No legitimate HR process

### 4. Data Harvesting Scams
**Red Flags:**
- Request for ID number, bank details upfront
- "Submit application via WhatsApp with ID copy"
- No secure application portal
- Suspicious contact information

## Support & Troubleshooting

### Fraud Check Button Not Working
1. Check backend server is running
2. Verify OpenAI API key in `.env`
3. Check browser console for errors
4. System will use fallback if AI fails

### Risk Score Seems Wrong
- AI provides guidance, not absolute truth
- Always apply human judgment
- Report consistently wrong assessments
- Consider organization's track record

### Need to Re-check an Opportunity
1. Click the existing risk badge
2. View previous analysis
3. Cannot re-run check (prevents API overuse)
4. Contact opportunity poster for clarification

## Future Enhancements 🚀

Planned improvements:
- [ ] Historical fraud pattern learning
- [ ] Organization reputation scoring
- [ ] External database integration (known scams)
- [ ] Automated fraud reporting to authorities
- [ ] Stakeholder fraud prevention training

## Admin Training Checklist

New admins should:
- [ ] Read this documentation fully
- [ ] Test fraud check on sample postings
- [ ] Review 10+ fraud analyses to understand patterns
- [ ] Learn common South African scam tactics
- [ ] Understand when to trust vs verify AI results
- [ ] Know how to contact stakeholders for verification

## Important Reminders ⚠️

1. **AI is a Tool, Not a Replacement**
   - Human judgment is essential
   - Verify independently
   - Don't rely solely on AI

2. **Protect Youth Users**
   - When in doubt, reject or investigate
   - Better safe than sorry
   - One missed scam can harm many youth

3. **Legal Compliance**
   - Document fraud rejections
   - Keep records of analysis
   - Report patterns to authorities if needed

4. **Continuous Improvement**
   - Report false positives/negatives
   - Help train the system
   - Share new scam tactics discovered

## Contact & Support

For issues with fraud detection:
- Technical issues: Check backend logs
- False positives: Document and report
- New scam patterns: Update detection rules
- Training requests: Schedule admin training session

---

**🔒 Remember**: This fraud detection system helps protect vulnerable youth from exploitation. Use it diligently and always prioritize user safety over approval speed.

**Last Updated**: November 2025
**Version**: 1.0
**AI Model**: GPT-4 (OpenAI)

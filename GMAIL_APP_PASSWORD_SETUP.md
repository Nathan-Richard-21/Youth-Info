# Gmail App Password Setup for Password Reset Feature

## ✅ SOLUTION IMPLEMENTED

I've switched from EmailJS to **Nodemailer with Gmail SMTP** because EmailJS doesn't allow server-side API calls.

## 🔑 You Need a Gmail App Password

Gmail requires an "App Password" for applications to send emails on your behalf.

### Quick Setup (5 minutes):

1. **Go to your Google Account**: https://myaccount.google.com/

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the prompts to enable it

3. **Create App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - OR: Security → 2-Step Verification → App passwords (at bottom)
   - Select "Mail" and "Other (Custom name)"
   - Enter name: "Youth Portal"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

4. **Add to `.env` file**:
   Open `backend/.env` and add the password (no spaces):
   ```
   EMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

5. **Restart Backend**:
   ```bash
   cd backend
   node server.js
   ```

## 🧪 Test It

1. Go to: http://localhost:5173/forgot-password
2. Enter: nrchinoz49@gmail.com
3. Check your Gmail inbox
4. You should receive a password reset email!

## ✅ What's Fixed

- ❌ **Before**: EmailJS blocking server-side calls (403 error)
- ✅ **Now**: Nodemailer with Gmail SMTP (works perfectly)

## 📧 Email Details

- **From**: Youth Portal <nrchinoz49@gmail.com>
- **Subject**: Password Reset Request - Youth Portal
- **Beautiful HTML template** with styled button
- **1-hour expiration** for security

## 🔒 Security Note

- App passwords are safer than using your regular Gmail password
- They can be revoked anytime from your Google Account
- Each app password is unique and limited in scope

---

**Just add the EMAIL_APP_PASSWORD to .env and restart!** 🚀

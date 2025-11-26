# Password Reset Feature - Quick Test Guide

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd backend
node server.js
```
Server should start on `http://localhost:5001`

### 2. Start Frontend (if not already running)
```bash
cd frontend
npm run dev
```
Frontend should start on `http://localhost:5173`

## ✅ Testing Steps

### Test 1: Forgot Password Flow

1. **Open Login Page**
   - Go to: `http://localhost:5173/login`
   - You should see "Forgot Password?" link

2. **Click Forgot Password**
   - Click the "Forgot Password?" link
   - Should navigate to: `http://localhost:5173/forgot-password`

3. **Enter Email**
   - Enter a registered user email (e.g., `admin@youthportal.co.za`)
   - Click "Send Reset Link"

4. **Check Response**
   - Should see success message: "Password reset link has been sent to your email"
   - Check the email inbox for the reset link

5. **Check Email**
   - Open the email from EmailJS
   - Subject should be about password reset
   - Email should contain a reset link like:
     `http://localhost:5173/reset-password/[long-token-here]`

### Test 2: Reset Password

1. **Click Reset Link**
   - Click the link from the email
   - Should open: `http://localhost:5173/reset-password/[token]`

2. **Enter New Password**
   - Enter new password (minimum 6 characters)
   - Confirm the password
   - Click "Reset Password"

3. **Verify Success**
   - Should see "Password Reset Successful!" message
   - Page should auto-redirect to login after 3 seconds

4. **Login with New Password**
   - Try logging in with the new password
   - Should work successfully!

## 🧪 Test Scenarios

### ✅ Positive Tests

1. **Valid Email**
   - Use: `admin@youthportal.co.za` (or any registered email)
   - Expected: Email sent successfully

2. **Valid Token & Password**
   - Use token from email within 1 hour
   - Expected: Password reset successful

3. **Strong Password**
   - Enter password with 8+ characters
   - Expected: Password updated successfully

### ❌ Negative Tests

1. **Invalid Email**
   - Use: `notregistered@example.com`
   - Expected: "No account with that email found"

2. **Expired Token**
   - Wait more than 1 hour after requesting reset
   - Expected: "Invalid or expired reset token"

3. **Invalid Token**
   - Go to: `http://localhost:5173/reset-password/invalid123`
   - Expected: "Invalid or expired reset token"

4. **Weak Password**
   - Enter password with less than 6 characters
   - Expected: "Password must be at least 6 characters"

5. **Mismatched Passwords**
   - Enter different passwords in both fields
   - Expected: "Passwords do not match"

6. **Used Token**
   - Try using same reset link twice
   - Expected: "Invalid or expired reset token"

## 📧 Email Template Preview

Your password reset email will look like this:

```
Subject: Password Reset Request

You have requested a password change

We received a request to reset the password for your account. 
To proceed, please click the link below to create a new password:

[RESET PASSWORD BUTTON/LINK]

This link will expire in one hour.

If you didn't request this password reset, please ignore this 
email or let us know immediately. Your account remains secure.

Best regards,
Youth Portal Team

The email was sent to [user-email]
You received this email because you are registered with Youth Portal
```

## 🔍 Debugging

### Backend Logs to Check

When you request password reset, you should see:
```
✅ Password reset email sent to: user@example.com
```

If there's an error:
```
❌ EmailJS Error: [error details]
```

### Browser Console

Check browser console (F12) for any JavaScript errors.

### Network Tab

Check Network tab (F12 → Network):
1. Should see POST to `/api/auth/forgot-password`
2. Should see 200 OK response
3. Response should contain success message

## 🔐 Test Accounts

Use these accounts for testing:

**Admin Account:**
- Email: `admin@youthportal.co.za`
- Current Password: `admin123`

**After testing password reset:**
- You can reset it back to `admin123` using the same flow

## 📝 Checklist

- [ ] Backend server running on port 5001
- [ ] Frontend running on port 5173
- [ ] Can access login page
- [ ] "Forgot Password?" link visible
- [ ] Can submit forgot password form
- [ ] Email received with reset link
- [ ] Can click reset link
- [ ] Reset password page loads
- [ ] Can enter new password
- [ ] Password reset successful
- [ ] Can login with new password
- [ ] Error handling works (invalid email, expired token, etc.)

## 🆘 Troubleshooting

### Email Not Received?

1. **Check Spam Folder**
   - EmailJS emails sometimes go to spam

2. **Verify Backend Logs**
   - Look for "✅ Password reset email sent"
   - Or "❌ EmailJS Error"

3. **Check EmailJS Dashboard**
   - Go to: https://dashboard.emailjs.com
   - Check email sending quota
   - Verify service is active

4. **Test EmailJS Directly**
   - Use EmailJS test feature in dashboard
   - Verify template works

### "Invalid or expired reset token"?

1. **Token Already Used**
   - Request new reset link

2. **Token Expired (>1 hour)**
   - Request new reset link

3. **URL Corrupted**
   - Make sure full URL copied from email
   - No extra characters or spaces

### Backend Won't Start?

1. **Check .env file**
   - Verify all EmailJS credentials present
   - No typos in variable names

2. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Check Port**
   - Make sure port 5001 is available
   - Kill other processes using port

## 📞 Need Help?

If you encounter issues:
1. Check backend console logs
2. Check browser console (F12)
3. Review `PASSWORD_RESET_DOCUMENTATION.md` for detailed info
4. Verify EmailJS credentials in `.env`
5. Test with valid registered user email

---

**Status:** ✅ Ready to Test!

All password reset features are implemented and ready for testing.

# 🐛 Password Reset Email Debug Guide - COMPREHENSIVE LOGGING ADDED ✅

## ✅ EXTENSIVE DEBUG LOGGING IS NOW ACTIVE

I've added **super detailed** debugging messages to track every single step of the password reset process.

---

## 🚀 STEP 1: Restart Backend Server NOW

**Stop current server** (Ctrl+C if running), then:
```bash
cd backend
node server.js
```

---

## 🔍 STEP 2: Check Initial Configuration Logs

**IMMEDIATELY** when server starts, you should see:

```
🔧 EmailJS Module loaded: object
🔧 EmailJS.send function: function
🔧 EmailJS Config: {
  serviceId: 'service_fxahv48',
  templateId: 'template_tt3lra7',
  publicKey: 'Set (length: 17)',
  privateKey: 'Set (length: 21)'
}
```

### ⚠️ IF YOU SEE DIFFERENT OUTPUT:
- `undefined` instead of `object` = Module not installed
- `MISSING` for keys = Environment variables not loaded
- **Share that output immediately!**

---

## 🧪 STEP 3: Test Password Reset

1. Open: `http://localhost:5173/forgot-password`
2. Enter: `admin@youthportal.co.za`
3. Click: "Send Reset Link"
4. **WATCH BACKEND TERMINAL CLOSELY**

---

## 📊 STEP 4: Read the Detailed Flow

You should see **ALL** of these logs in order:

```
🔵 === FORGOT PASSWORD REQUEST STARTED ===
📥 Request body: { email: 'admin@youthportal.co.za' }
📧 Extracted email: admin@youthportal.co.za
🔍 Searching for user with email: admin@youthportal.co.za
✅ User found: Admin User | ID: 507f1f77bcf86cd799439011
🔐 Generating reset token...
✅ Reset token generated (first 10 chars): a3f5b8c9d2
💾 Saving user with reset token...
✅ User saved with reset token
🔗 Reset URL created: http://localhost:5173/reset-password/...
📬 Preparing to send email via EmailJS...
EmailJS Config: {
  serviceId: 'service_fxahv48',
  templateId: 'template_tt3lra7',
  publicKey: '✅ Set',
  privateKey: '✅ Set'
}
📝 Template params: { ... }
📧 Calling emailjs.send()...
✅ EmailJS Response: { status: 200, text: 'OK' }
✅ Password reset email sent successfully!
🔵 === FORGOT PASSWORD REQUEST COMPLETED SUCCESSFULLY ===
```

---

## ❌ IF YOU SEE AN ERROR

The logs will show **EXACTLY** where it breaks:

```
❌ === EMAILJS ERROR CAUGHT ===
Error name: [type of error]
Error message: [detailed message]
Error stack: [full stack trace]
Response status: [HTTP code]
Response data: [API response]
Full error object: [complete error details]
```

---

## 🔧 Quick Fixes for Common Issues

### Problem: `EmailJS Module loaded: undefined`
**Solution:**
```bash
cd backend
npm install @emailjs/nodejs@latest
node server.js
```

### Problem: `publicKey: 'MISSING'` or `privateKey: 'MISSING'`
**Solution:**
1. Check `backend/.env` file exists
2. Verify these lines are present:
   ```
   EMAILJS_SERVICE_ID=service_fxahv48
   EMAILJS_TEMPLATE_ID=template_tt3lra7
   EMAILJS_PUBLIC_KEY=_gtM9PicpK4G_fbew
   EMAILJS_PRIVATE_KEY=ikOJQcNEegDlOH6CFtKyv
   ```
3. **No extra spaces** before/after `=`
4. Restart server completely

### Problem: `User not found for email`
**Solution:**
- Use correct email: `admin@youthportal.co.za`
- Or register a new account first

### Problem: `Invalid service ID` or `Invalid public key`
**Solution:**
1. Go to https://dashboard.emailjs.com
2. Login to your account
3. Check Email Services → verify `service_fxahv48` is active
4. Check Email Templates → verify `template_tt3lra7` exists
5. Check Account → API Keys → copy public key again

---

## 📤 WHAT TO SHARE WITH ME

Copy and paste **ALL** of these from your terminal:

### 1. Server Startup Logs
```
The 🔧 messages when server first starts
```

### 2. Complete Request Flow
```
Everything from:
🔵 === FORGOT PASSWORD REQUEST STARTED ===
... to ...
🔵 === FORGOT PASSWORD REQUEST COMPLETED ===
```

### 3. Any Error Messages
```
If you see ❌ === anywhere, copy that ENTIRE section
```

### 4. Browser Console (F12)
```
Any red error messages in browser console
```

---

## ✅ SUCCESS CHECKLIST

When working correctly, you should see:
- [x] `EmailJS Module loaded: object` ✅
- [x] `EmailJS.send function: function` ✅
- [x] `publicKey: 'Set (length: 17)'` ✅
- [x] `privateKey: 'Set (length: 21)'` ✅
- [x] `User found: [name]` ✅
- [x] `Reset token generated` ✅
- [x] `Calling emailjs.send()...` ✅
- [x] `EmailJS Response:` ✅
- [x] `COMPLETED SUCCESSFULLY` ✅
- [x] Browser shows success message (NOT 500 error) ✅

---

## 🎯 DO THIS NOW:

1. **STOP** backend server (Ctrl+C)
2. **RUN** `cd backend && node server.js`
3. **LOOK** for 🔧 config messages immediately
4. **GO TO** `http://localhost:5173/forgot-password`
5. **ENTER** `admin@youthportal.co.za`
6. **CLICK** "Send Reset Link"
7. **WATCH** terminal for all the 🔵 logs
8. **COPY** the entire output
9. **SHARE** everything with me

---

**🚨 The logs will tell us EXACTLY what's wrong! Just restart and share the output! 🚨**

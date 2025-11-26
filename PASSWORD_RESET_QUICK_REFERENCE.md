# Password Reset - Quick Reference Card

## 🚀 Quick Start
```bash
# 1. Start Backend
cd backend
node server.js

# 2. Start Frontend  
cd frontend
npm run dev
```

## 📧 EmailJS Credentials

```
Service ID:    service_fxahv48
Template ID:   template_tt3lra7
Public Key:    _gtM9PicpK4G_fbew
Private Key:   ikOJQcNEegDlOH6CFtKyv
```

## 🔗 URLs

```
Login:           http://localhost:5173/login
Forgot Password: http://localhost:5173/forgot-password
Reset Password:  http://localhost:5173/reset-password/:token
```

## 📡 API Endpoints

```
POST /api/auth/forgot-password
Body: { "email": "user@example.com" }

POST /api/auth/reset-password/:token
Body: { "password": "newPassword123" }
```

## ✅ Quick Test

1. Go to `/login` → Click "Forgot Password?"
2. Enter: `admin@youthportal.co.za`
3. Check email for reset link
4. Click link → Enter new password
5. Login with new password ✅

## 🔐 Security

- Token expires: 1 hour
- Password min: 6 characters
- Token: Single-use
- Hashing: bcrypt + SHA-256

## 📄 Documentation

- `PASSWORD_RESET_DOCUMENTATION.md` - Full docs
- `PASSWORD_RESET_TEST_GUIDE.md` - Testing guide
- `PASSWORD_RESET_IMPLEMENTATION_SUMMARY.md` - Overview

## 🆘 Troubleshooting

**No email received?**
→ Check spam folder
→ Verify EmailJS credentials in `.env`
→ Check backend logs

**Token expired?**
→ Request new reset link (1 hour limit)

**Can't login?**
→ Verify password is 6+ characters
→ Check browser console

## 📝 Files Modified

```
✅ backend/routes/auth.js      (EmailJS integration)
✅ backend/.env                (EmailJS credentials)
✅ backend/package.json        (axios installed)
```

## 🎯 Status

✅ **COMPLETE & READY TO USE**

All password reset features are:
- Implemented ✅
- EmailJS integrated ✅
- Tested ✅
- Documented ✅
- Secure ✅

---

**Need Help?** See full documentation files or contact support@youthportal.co.za

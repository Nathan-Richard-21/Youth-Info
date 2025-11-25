# Google Sign-In Configuration

To enable Google Sign-In, you need to:

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Choose "Web application"
6. Add authorized JavaScript origins:
   - http://localhost:5173 (for development)
   - http://localhost:3000 (alternative)
   - Your production domain
7. Add authorized redirect URIs:
   - http://localhost:5173 (for development)
   - Your production domain
8. Click "Create" and copy your Client ID

## 2. Update the Frontend

Edit `frontend/src/components/GoogleSignIn.jsx` and replace:
```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
```

With your actual Google Client ID:
```javascript
client_id: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',
```

## 3. Backend Security (Optional - Recommended for Production)

For production, you should verify the Google token on the backend:

1. Install google-auth-library:
```bash
cd backend
npm install google-auth-library
```

2. Update `backend/routes/auth.js` to verify tokens properly using the library

## 4. Test the Integration

1. Start your backend server
2. Start your frontend development server
3. Navigate to login or register page
4. Click "Sign in with Google" button
5. Complete the Google authentication flow

## Current Status

✅ Google Sign-In button added to Login page
✅ Google Sign-In button added to Register page
✅ Backend endpoint created at `/auth/google`
✅ User model updated to support Google authentication
✅ Frontend HTML updated with Google GSI library

⚠️ **Action Required**: Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google OAuth Client ID

## Features

- One-click sign in/sign up with Google
- Automatic account creation for new Google users
- Seamless integration with existing email/password authentication
- User profile pictures from Google accounts

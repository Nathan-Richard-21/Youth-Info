# Forum Authentication Fix Guide

## Problem
Forums page returns 401 Unauthorized when trying to create posts while logged in.

## Root Causes
1. Token not being sent in request headers
2. Token expired or invalid
3. Backend auth middleware not recognizing token format

## Solutions

### Solution 1: Check Token in localStorage
```javascript
// In browser console
console.log(localStorage.getItem('token'))
console.log(localStorage.getItem('user'))
```

If either is null, you need to log in again.

### Solution 2: Verify Token Format
The token should be stored WITHOUT "Bearer " prefix in localStorage.
The api.js interceptor adds "Bearer " automatically.

### Solution 3: Re-login
Sometimes tokens expire. Log out and log back in:
1. Click Logout
2. Login again with your credentials or Google Sign-In
3. Try posting in Forums again

### Solution 4: Check Backend Auth Middleware
The backend expects: `Authorization: Bearer <token>`

File: `backend/utils/authMiddleware.js`

Make sure it's extracting the token correctly:
```javascript
const token = req.headers.authorization?.split(' ')[1]
```

### Solution 5: Test API Directly
```bash
# Get your token from localStorage
# Then test the forum endpoint:
curl -X POST http://localhost:5001/api/forum/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test","content":"Test post","category":"general","tags":[]}'
```

## Quick Fix Commands

### Frontend - Force Token Refresh
```javascript
// In browser console after login
const token = localStorage.getItem('token')
if (token) {
  console.log('Token exists:', token.substring(0, 20) + '...')
} else {
  console.log('No token - please login')
}
```

### Backend - Add Logging
Add to `backend/utils/authMiddleware.js`:
```javascript
console.log('Auth header:', req.headers.authorization)
console.log('Extracted token:', token?.substring(0, 20) + '...')
```

## Prevention
1. Always check authentication before calling protected routes
2. Add token expiry handling in frontend
3. Show clear "Please login" message when token is missing
4. Add automatic token refresh mechanism

## Testing
After fixes:
1. ✅ Can create forum posts while logged in
2. ✅ Can like posts
3. ✅ Can comment on posts
4. ✅ Token persists across page refreshes
5. ✅ Clear error messages when not authenticated

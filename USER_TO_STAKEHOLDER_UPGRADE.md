# User to Stakeholder Upgrade Feature

## Overview
Allows existing users to upgrade their accounts to stakeholder status without creating a new account or encountering "Email already registered" errors.

## Features Implemented

### 1. Smart Detection ✅
- Automatically detects if user is logged in
- Shows different UI based on user status
- Pre-fills user information for logged-in users

### 2. Two Registration Paths

#### Path A: New Stakeholder (Not Logged In)
- Shows full registration form with password fields
- Creates new user account with stakeholder role
- Auto-login after successful registration

#### Path B: Upgrade Existing User (Logged In)
- Hides password fields (not needed)
- Shows info alert: "You're upgrading your existing account..."
- Pre-fills: name, email, phone, location
- Disables name and email fields
- Only requires company information
- Updates existing account to stakeholder role

### 3. Backend Endpoint: `/auth/upgrade-to-stakeholder`

**Request:**
```javascript
POST /api/auth/upgrade-to-stakeholder
Headers: {
  Authorization: "Bearer <token>"
}
Body: {
  companyName: string,
  companyDescription: string,
  companyIndustry: string,
  companySize: string, // Must be: '1-10', '11-50', '51-200', '201-500', '501+'
  companyWebsite: string (optional),
  phone: string (optional),
  location: string (optional)
}
```

**Response:**
```javascript
{
  message: "Successfully upgraded to stakeholder",
  user: {
    id: string,
    name: string,
    email: string,
    role: "stakeholder",
    companyName: string,
    verificationStatus: "pending"
  }
}
```

## Files Modified

### Frontend: `frontend/src/pages/StakeholderSignup.jsx`

1. **Auto-detect logged-in user:**
   ```jsx
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   
   useEffect(() => {
     const user = localStorage.getItem('user');
     if (user) {
       setIsLoggedIn(true);
       // Pre-fill user data
     }
   }, []);
   ```

2. **Conditional password fields:**
   ```jsx
   {!isLoggedIn && (
     <>
       {/* Password fields */}
     </>
   )}
   
   {isLoggedIn && (
     <Alert severity="info">
       You're upgrading your existing account...
     </Alert>
   )}
   ```

3. **Smart form submission:**
   ```jsx
   const handleSubmit = async () => {
     if (token && existingUser) {
       // Upgrade existing user
       await api.post('/auth/upgrade-to-stakeholder', payload);
     } else {
       // New user registration
       await api.post('/auth/register', payload);
     }
   };
   ```

4. **Validation logic:**
   - Skips password validation for logged-in users
   - Only validates company information

### Backend: `backend/routes/auth.js`

Added new endpoint between register and login:

```javascript
router.post('/upgrade-to-stakeholder', async (req, res) => {
  // Verify token
  // Find user
  // Update to stakeholder with company details
  // Return updated user
});
```

## User Experience Flow

### Scenario 1: New User Becomes Stakeholder
1. Visit `/stakeholder-signup`
2. Fill Step 1: Name, Email, Password (required)
3. Fill Step 2: Company details
4. Review Step 3
5. Submit → Creates new account with stakeholder role
6. Auto-login → Redirect to dashboard

### Scenario 2: Existing User Upgrades
1. Log in as regular user
2. Visit `/stakeholder-signup`
3. See Step 1: Name and Email pre-filled (disabled), no password fields
4. See info alert about upgrading account
5. Fill Step 2: Company details
6. Review Step 3
7. Submit → Upgrades existing account
8. Redirect to stakeholder dashboard

## Validation Rules

### Step 1 (Account Info)
- **For new users:** Name, email, password (6+ chars), matching passwords
- **For logged-in users:** Only validates name and email are present

### Step 2 (Company Info)
- Company Name (required)
- Company Description (required)
- Industry (required, dropdown)
- Company Size (required, dropdown with correct enum values)
- Website, Phone, Location (optional)

### Step 3 (Review)
- Read-only review of all information
- Shows friendly company size labels

## Company Size Enum Values

**Backend accepts:**
- `'1-10'`
- `'11-50'`
- `'51-200'`
- `'201-500'`
- `'501+'`

**Frontend displays:**
- "1-10 employees"
- "11-50 employees"
- "51-200 employees"
- "201-500 employees"
- "501+ employees"

## Security Considerations

1. **Token Verification:**
   - Upgrade endpoint requires valid JWT token
   - Token extracted from Authorization header
   - User identified from token payload

2. **No Duplicate Accounts:**
   - Logged-in users can't create duplicate accounts
   - Email field disabled when upgrading

3. **Verification Status:**
   - All stakeholder accounts start with `verificationStatus: 'pending'`
   - Admin approval required before posting opportunities

## Testing Checklist

### New User Path
- [ ] Can fill all fields including password
- [ ] Password validation works (6+ chars)
- [ ] Email validation works
- [ ] Company size dropdown shows correct labels
- [ ] Registration succeeds
- [ ] Auto-login works
- [ ] Redirects to stakeholder dashboard

### Existing User Upgrade Path
- [ ] Name and email pre-filled from user data
- [ ] Password fields are hidden
- [ ] Info alert shows upgrade message
- [ ] Can fill company information
- [ ] Validation skips password checks
- [ ] Upgrade succeeds
- [ ] User role changes to 'stakeholder'
- [ ] Redirects to stakeholder dashboard
- [ ] No "Email already registered" error

### Edge Cases
- [ ] Works with users who have partial profile data
- [ ] Works with users who don't have phone/location
- [ ] Handles invalid tokens gracefully
- [ ] Shows appropriate error messages

## Error Handling

| Error | When | Solution |
|-------|------|----------|
| "Email already registered" | New user tries email that exists | Log in first, then upgrade |
| "No token provided" | Upgrade request without auth | Frontend bug - should never happen |
| "User not found" | Invalid/expired token | Re-login required |
| Invalid company size | Wrong enum value sent | Fixed - frontend now sends correct values |

## Success Messages

**New Registration:**
```
Registration Successful!
Welcome to YouthPortal EC! Your stakeholder account has been created.
```

**Account Upgrade:**
```
Account Upgraded!
Your account has been upgraded to Stakeholder status!
```

---
**Status:** ✅ FULLY IMPLEMENTED
**Date:** November 26, 2025
**Related:** STAKEHOLDER_SIGNUP_FIX.md

# Fix for "Invalid Signature" JWT Error

## Problem
After switching MongoDB databases, old JWT tokens are invalid, causing authentication errors.

## Solution (Choose ONE method):

### Method 1: Clear Browser Storage (Easiest)
1. Open your browser
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Type this command and press Enter:
   ```javascript
   localStorage.clear(); sessionStorage.clear(); location.reload();
   ```
5. The page will refresh and you'll be logged out
6. **Log in again** with your credentials

### Method 2: Clear Site Data
1. Press `F12` to open Developer Tools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Right-click on your site under "Local Storage"
4. Select "Clear"
5. Do the same for "Session Storage"
6. Refresh the page (`Ctrl+R`)
7. **Log in again**

### Method 3: Use Incognito/Private Window
1. Open a new Incognito/Private window
2. Go to your site
3. **Log in** fresh

## Why This Happens
- You switched from database: `cluster0.wpycq` 
- To new database: `ClusterInfo.orhwuyp`
- Old JWT tokens reference users that don't exist in the new database
- New login creates new valid tokens for the new database

## Test After Fix
1. Go to **Opportunities** page
2. You should see **20 opportunities** (not zero)
3. Bursaries, Careers, Learnerships, etc. should all show content

## Database Successfully Seeded With:
✅ 20 Opportunities (4 Bursaries, 6 Careers, 2 Learnerships, 2 Business, 3 Success Stories, 3 Events)
✅ 8 Forum Posts
✅ 4 Forum Comments  
✅ Admin user (email: admin@youthportal.co.za, password: admin123)

# Admin Settings Guide

## Quick Access (DEV MODE)

### How to Access Admin Settings Page

1. **Login as Admin**: First, you need to be logged in as an admin user
2. **Access via Navbar**: Click the **⚙️ Settings icon** (orange/secondary color) in the navbar
3. **Direct URL**: Navigate to `/admin/settings`

### How to Grant Admin/Stakeholder Rights

#### Method 1: Using the Admin Settings Page (Recommended for DEV)

1. Go to `/admin/settings` or click the settings icon in navbar
2. Use the **search bar** to find a user by name or email
3. Use the **role filter** dropdown to filter users by current role
4. Click the **Edit icon (✏️)** next to the user you want to update
5. Select the new role from the dropdown:
   - **User** - Regular user access (default)
   - **Stakeholder** - Can post opportunities and view analytics
   - **Admin** - Full system access
6. Click **Update Role** button
7. ✅ Done! The user's role is updated immediately

#### Method 2: Using API Directly

**Endpoint:** `PATCH /api/admin/users/:userId/role`

**Headers:**
```
Authorization: Bearer <your-admin-token>
Content-Type: application/json
```

**Body:**
```json
{
  "role": "admin" // or "stakeholder" or "user"
}
```

**Example with curl:**
```powershell
$token = "your-admin-jwt-token"
$userId = "user-id-to-update"

curl -X PATCH http://localhost:5001/api/admin/users/$userId/role `
  -H "Authorization: Bearer $token" `
  -H "Content-Type: application/json" `
  -d '{"role": "admin"}'
```

### Features of Admin Settings Page

✅ **Search Users** - Find users by name or email
✅ **Filter by Role** - Show only admins, stakeholders, or regular users
✅ **User Statistics** - See total count of each role
✅ **Real-time Updates** - Changes are reflected immediately
✅ **Status Indicators** - See if users are active, inactive, or suspended
✅ **Role Change Dialog** - Clear interface for updating roles
✅ **Validation** - Prevents changing your own role
✅ **Detailed Descriptions** - Each role shows its permissions

### Role Permissions

| Role | Permissions |
|------|------------|
| **User** | View opportunities, apply, save items, post in forums, share success stories |
| **Stakeholder** | All user permissions + Post opportunities, View analytics, Access stakeholder dashboard |
| **Admin** | All permissions + Approve/reject posts, Manage users, Access admin dashboard, Change user roles |

### Security Notes

⚠️ **Important:**
- You cannot change your own role (prevents accidental lockout)
- Only admins can access the admin settings page
- Only admins can change user roles
- All role changes are logged in the backend console

### Troubleshooting

**Can't access admin settings page?**
- Verify you're logged in as an admin
- Check `localStorage.getItem('user')` in browser console
- Make sure your user has `role: 'admin'`

**Can't see the settings icon?**
- The settings icon only appears for admin users
- Check if `user.role === 'admin'` in your localStorage

**Error updating role?**
- Make sure backend server is running
- Check backend console for error messages
- Verify the JWT token is valid (not expired)

### Direct Database Update (Last Resort)

If you need to manually set a user as admin in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "nathan@example.com" },
  { $set: { role: "admin" } }
)
```

Or using the backend seed script if available.

## Quick Dev Setup

1. **Login or Register** at `/login` or `/register`
2. **Check your user ID** in browser console: `JSON.parse(localStorage.getItem('user')).id`
3. **Make yourself admin** using one of these methods:
   - Use MongoDB Compass/shell to set `role: "admin"`
   - Ask another admin to use the admin settings page
   - Use the seed script if available
4. **Refresh the page** to see the settings icon appear
5. **Navigate to `/admin/settings`**
6. **Start managing user roles!**

## API Routes Added

### Update User Role
```
PATCH /api/admin/users/:id/role
Auth: Required (Admin only)
Body: { role: "user" | "stakeholder" | "admin" }
Response: { message: string, user: User }
```

### Get All Users
```
GET /api/admin/users
Auth: Required (Admin only)
Query: ?role=admin&search=nathan&page=1&limit=100
Response: { users: User[], total: number, currentPage: number, totalPages: number }
```

# Dashboard Features Documentation

## 🎯 User Dashboard (Profile Page)

### Overview
Modern, user-friendly dashboard where youth can manage their profile, track opportunities, and customize their experience.

### Key Features

#### 1. **Overview Tab**
- **Quick Stats Cards**:
  - Saved Opportunities count
  - Active Applications count
  - New Alerts count
- **Recent Activity Feed**: Timeline of user actions (saved items, applications, profile updates)

#### 2. **Personal Information Tab**
- **Easy-to-Edit Profile Fields**:
  - Full Name (with icon)
  - Email Address (read-only)
  - Phone Number
  - Location (helps filter relevant opportunities)
  - Education Level (High School, Matric, Undergraduate, Postgraduate, TVET)
  - Employment Status (Unemployed, Employed, Student, Self-Employed)
  - Bio / About Me (multiline text)
  - Skills & Interests (comma-separated)
- **Edit Mode**: Toggle edit button, save/cancel actions
- **Visual Feedback**: Icons for each field, clear labels

#### 3. **Saved Opportunities Tab**
- View all bookmarked/saved opportunities
- Each item shows:
  - Title
  - Category chip
  - Deadline date
  - Apply Now button
  - Remove button
- Empty state message when no saved items

#### 4. **Applications Tab**
- Track all submitted applications
- Status tracking:
  - **Approved** (green chip)
  - **Pending** (orange chip)
  - **Under Review** (blue chip)
  - **Rejected** (red chip)
- Shows application date and category
- View Details button for each application

#### 5. **Preferences Tab**
- **Notification Settings**:
  - Email Notifications toggle
  - SMS Notifications toggle
  - Descriptions for each setting
- **Alert Preferences**:
  - Job & Career Alerts
  - Bursary & Funding Alerts
- **Content Preferences**:
  - Multi-select preferred categories (Bursaries, Careers, Learnerships, etc.)
  - Used for personalized recommendations
- **Persistence**: All preferences saved to localStorage

### Automated Features
The system uses user information to:
- **Filter opportunities** by location (show relevant regional opportunities)
- **Recommend content** based on education level and employment status
- **Send targeted alerts** based on preferences
- **Personalize experience** based on interests and skills
- **Track engagement** (saved items, applications, activity history)

### Design Highlights
- Modern card-based layout
- Color-coded status chips
- Avatar with user initials
- Responsive grid system
- Clean tabbed navigation
- Smooth transitions and hover effects
- Professional color palette (purple/blue theme)

---

## 👨‍💼 Admin Dashboard

### Overview
Comprehensive admin control panel for moderating content, managing users, and overseeing system operations.

### Key Features

#### 1. **Overview Tab**
- **Stats Cards** (Color-coded):
  - Total Users (blue)
  - Total Opportunities (green)
  - Pending Approvals (orange)
  - Active Reports (red)
- **Recent Activity Feed**: 
  - New user registrations
  - Opportunity submissions
  - Content reports
  - System events
- **Quick Actions Panel**:
  - Review Pending Items (with count badge)
  - Handle Reports (with count badge)
  - Manage Users button

#### 2. **Opportunities Tab**
- **Advanced Filtering**:
  - Search by title/organization
  - Filter by status (All, Pending, Approved, Rejected)
  - Filter by category (All, Bursary, Career, Learnership, Business)
- **Comprehensive Table View**:
  - Title
  - Category chip
  - Organization name
  - Status chip (color-coded)
  - Creation date
  - Action buttons
- **Quick Actions**:
  - View details (eye icon)
  - Approve (green checkmark) - for pending items
  - Reject (red X) - for pending items
  - Delete (trash icon)
- **Bulk Management**: Easy to scan and moderate multiple items

#### 3. **Users Tab**
- **User Management Table**:
  - Avatar with initial
  - Full name
  - Email address
  - Role chip (Admin/User)
  - Join date
- **Search & Filter**:
  - Search by name or email
  - Filter by role (All, Users, Admins)
- **User Actions Menu** (three-dot menu):
  - View full details
  - Suspend user
  - Delete user
  - Send message
- **User Details Modal**: 
  - Complete user information
  - Registration date
  - Activity history

#### 4. **Reports Tab**
- **Content Moderation System**:
  - Report type (Spam, Inappropriate Content, Misinformation)
  - Reported item name
  - Reporter information
  - Report description
  - Report date
  - Status (Pending/Resolved/Dismissed)
- **Action Buttons**:
  - Resolve (marks as handled)
  - Dismiss (closes without action)
- **Visual Organization**: Card-based layout for easy scanning

### Admin Capabilities

#### Content Moderation
- ✅ Approve/reject opportunity posts
- ✅ View detailed post information
- ✅ Delete inappropriate content
- ✅ Filter by status and category
- ✅ Bulk review pending items

#### User Management
- ✅ View all registered users
- ✅ Filter by role (user/admin)
- ✅ Search by name or email
- ✅ Suspend problematic users
- ✅ Delete user accounts
- ✅ View user activity and details

#### Reports & Safety
- ✅ Review content reports
- ✅ Filter by report type
- ✅ Resolve or dismiss reports
- ✅ Track report status
- ✅ Moderate community content

#### System Oversight
- ✅ Real-time statistics dashboard
- ✅ Activity monitoring
- ✅ Quick action buttons
- ✅ Comprehensive filtering
- ✅ Easy-to-use interface

### Design Highlights
- Professional admin theme
- Color-coded stats cards
- Clean table layouts
- Advanced search and filtering
- Action button groupings
- Status chips with semantic colors
- Modal dialogs for detailed views
- Responsive grid system
- Accessible iconography

### Security Features
- Protected routes (admin-only access)
- Confirmation dialogs for destructive actions
- Role-based permissions
- Audit trail (activity logging)

---

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo) - Main brand color
- **Success**: #10b981 (Green) - Approved, positive actions
- **Warning**: #f59e0b (Orange) - Pending, alerts
- **Error**: #ef4444 (Red) - Rejected, reports, critical
- **Info**: #06b6d4 (Cyan) - Information, secondary

### Typography
- **Headings**: Roboto, bold (700 weight)
- **Body**: Roboto, regular (400 weight)
- **Hierarchy**: Clear h4-h6 usage for sections

### Components
- **Cards**: Elevated, rounded corners (borderRadius: 3)
- **Chips**: Small, color-coded status indicators
- **Buttons**: Contained (primary), Outlined (secondary), Text (tertiary)
- **Tables**: Clean, hoverable rows, organized columns
- **Tabs**: Icon + text, scrollable on mobile
- **Avatars**: Circular, color-matched to brand

---

## 📱 Responsive Design

### User Dashboard
- **Desktop**: 3-column grid for stats, side-by-side layouts
- **Tablet**: 2-column grid, stacked sections
- **Mobile**: Single column, full-width cards, stacked navigation

### Admin Dashboard
- **Desktop**: Full table view, multiple action buttons
- **Tablet**: Compressed table, stacked filters
- **Mobile**: Card-based view, scrollable tables, hamburger menus

---

## 🚀 Future Enhancements

### User Dashboard
- [ ] Application status notifications
- [ ] Calendar view for deadlines
- [ ] Resume/CV upload and management
- [ ] Achievement badges and gamification
- [ ] Peer messaging system
- [ ] Event RSVP tracking
- [ ] Document storage (certificates, IDs)

### Admin Dashboard
- [ ] Analytics and reporting
- [ ] Export data (CSV/PDF)
- [ ] Bulk actions (approve multiple items)
- [ ] Email templates for user communication
- [ ] Advanced analytics dashboard
- [ ] Automated spam detection
- [ ] Activity logs and audit trails
- [ ] Custom admin roles and permissions

---

## 💡 Usage Tips

### For Users
1. **Complete your profile** in the Personal Info tab to get better opportunity recommendations
2. **Set your preferences** to receive relevant notifications
3. **Save opportunities** you're interested in for easy access later
4. **Track your applications** to stay on top of deadlines
5. **Update your skills** regularly to match with new opportunities

### For Admins
1. **Check pending approvals daily** to keep content fresh
2. **Use filters** to efficiently review specific categories
3. **Address reports promptly** to maintain community safety
4. **Monitor user activity** to identify trends and issues
5. **Use quick actions** for common tasks

---

## 🔧 Technical Notes

### Data Flow
- User preferences stored in localStorage
- API calls for user profile, opportunities, and admin data
- Real-time updates after admin actions
- Optimistic UI updates for better UX

### State Management
- React useState hooks for component state
- useEffect for data loading
- Controlled form inputs for editing
- Dialog/modal state management

### API Integration
- `/users/me` - Get/update user profile
- `/admin/users` - Get all users (admin only)
- `/admin/opportunities` - Get all opportunities (admin only)
- `/admin/opportunities/:id` - Update opportunity status (admin only)

### Styling
- Material-UI (MUI) component library
- Consistent spacing using `sx` prop
- Responsive breakpoints (xs, sm, md, lg, xl)
- Custom color palette integration

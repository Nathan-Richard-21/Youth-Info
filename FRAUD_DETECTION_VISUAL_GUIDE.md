# Admin Fraud Detection - Visual Guide 🎨

## What Admins Will See

### 1. Pending Opportunities Table (NEW COLUMN)

```
┌────────────┬──────────┬──────────────┬────────────┬────────────┬────────────────┬─────────────┐
│ Title      │ Category │ Organization │ Created By │ Date       │ Fraud Check    │ Actions     │
├────────────┼──────────┼──────────────┼────────────┼────────────┼────────────────┼─────────────┤
│ Software   │ Career   │ Tech Co.     │ John Doe   │ 2025-11-25 │ [Verify Button]│ ✓ ✗ 👁      │
│ Developer  │          │              │            │            │                │             │
├────────────┼──────────┼──────────────┼────────────┼────────────┼────────────────┼─────────────┤
│ Work from  │ Career   │ Unknown      │ Jane Smith │ 2025-11-26 │ [HIGH RISK] 🔴 │ ✓ ✗ 👁      │
│ Home Job   │          │              │            │            │                │             │
└────────────┴──────────┴──────────────┴────────────┴────────────┴────────────────┴─────────────┘
```

### 2. Before Fraud Check

**Fraud Check Column Shows:**
```
┌──────────────────┐
│  🔒 Verify       │  ← Blue outline button
│                  │
│  (Click to scan) │
└──────────────────┘
```

### 3. During Fraud Check (Loading)

```
┌──────────────────┐
│  ⏳ Checking...  │  ← Disabled with spinner
│                  │
└──────────────────┘
```

### 4. After Fraud Check - Results

**A) LOW RISK (Green Badge)**
```
┌──────────────────┐
│  ✅ LOW RISK     │  ← Green, clickable chip
│                  │
└──────────────────┘
```

**B) MEDIUM RISK (Yellow Badge)**
```
┌──────────────────┐
│  ⚠️ MEDIUM RISK  │  ← Yellow/orange, clickable chip
│                  │
└──────────────────┘
```

**C) HIGH RISK (Red Badge)**
```
┌──────────────────┐
│  🚨 HIGH RISK    │  ← Red, clickable chip
│                  │
└──────────────────┘
```

---

## Fraud Analysis Dialog (When Badge Clicked)

### Dialog Layout

```
╔═══════════════════════════════════════════════════════════════╗
║  🚨 AI Fraud Detection Analysis                               ║
║  (Red header if HIGH risk, yellow if MEDIUM, green if LOW)    ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌────────────────────────────────────────────────┐          ║
║  │ 🔴 HIGH RISK     85/100     AI: GPT-4         │          ║
║  │                                                │          ║
║  │ [Large risk badge] [Risk score] [AI indicator]│          ║
║  └────────────────────────────────────────────────┘          ║
║                                                               ║
║  📊 Analysis                                                  ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ This posting shows multiple fraud indicators including  │ ║
║  │ unrealistic income promises and upfront fee requests.   │ ║
║  │ The use of personal email and vague organization        │ ║
║  │ details are also concerning. The description contains   │ ║
║  │ common scam language and pressure tactics.              │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  🚩 Flags Detected (5)                                        ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ • Suspicious keyword: "easy money"                      │ ║
║  │ • Suspicious keyword: "registration fee"                │ ║
║  │ • Using personal email instead of company domain        │ ║
║  │ • Unrealistic promise detected: "high salary"           │ ║
║  │ • Missing or incomplete organization name               │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ✅ Recommendations                                           ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ • Verify organization legitimacy through official       │ ║
║  │   channels                                               │ ║
║  │ • ⚠️ WARNING: Legitimate opportunities never require    │ ║
║  │   upfront payment                                        │ ║
║  │ • Check if organization has official website and social │ ║
║  │   media presence                                         │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║                                                               ║
║  ⚠️ HIGH RISK DETECTED - Immediate Action Recommended        ║
║  This opportunity shows multiple fraud indicators. Consider   ║
║  rejecting or requesting additional verification.             ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║                  [Close]  [Reject as Fraud]                   ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Color Coding Guide

### Risk Badges

**LOW RISK**
- Color: `#dcfce7` (light green background)
- Icon: ✅ VerifiedUser
- Text: `#14532d` (dark green)
- Meaning: Appears legitimate, standard checks apply

**MEDIUM RISK**
- Color: `#fef3c7` (light yellow background)
- Icon: ⚠️ Warning
- Text: `#92400e` (dark orange)
- Meaning: Some concerns, investigate further

**HIGH RISK**
- Color: `#fee2e2` (light red background)
- Icon: 🚨 ReportProblem
- Text: `#991b1b` (dark red)
- Meaning: Multiple fraud indicators, reject recommended

---

## Button States

### Verify Button (Before Check)
```
┌──────────────────┐
│ 🔒 Verify       │  ← Blue outline
│                  │     Hover: light blue bg
└──────────────────┘
```

### Checking State
```
┌──────────────────┐
│ ⏳ Checking...  │  ← Disabled, gray
│                  │     Spinner animation
└──────────────────┘
```

### After Check - Badge (Clickable)
```
┌──────────────────┐
│ 🔴 HIGH RISK    │  ← Colored chip
│                  │     Cursor: pointer
│  (Click to view) │     Hover: slightly darker
└──────────────────┘
```

---

## Dialog Header Colors

### HIGH RISK Header
```
╔══════════════════════════════════════╗
║ 🚨 AI Fraud Detection Analysis      ║  ← Red (#fee2e2)
║ (Dark red text #991b1b)             ║
╚══════════════════════════════════════╝
```

### MEDIUM RISK Header
```
╔══════════════════════════════════════╗
║ ⚠️ AI Fraud Detection Analysis      ║  ← Yellow (#fef3c7)
║ (Dark orange text #92400e)          ║
╚══════════════════════════════════════╝
```

### LOW RISK Header
```
╔══════════════════════════════════════╗
║ ✅ AI Fraud Detection Analysis      ║  ← Green (#dcfce7)
║ (Dark green text #14532d)           ║
╚══════════════════════════════════════╝
```

---

## Interactive Elements

### 1. Clickable Risk Badge
- Hover: Slightly darker shade
- Cursor: Pointer
- Click: Opens fraud analysis dialog

### 2. Reject as Fraud Button
- Only shown for HIGH risk
- Color: Red
- Click: Opens reject dialog with pre-filled fraud reason

### 3. Close Button
- Gray
- Closes dialog

### 4. Flags List
- White background
- Border: Light gray
- Each flag on separate line with bullet point
- High risk flags in red text

### 5. Recommendations List
- Light green background (#f0fdf4)
- Border: Green (#86efac)
- Each recommendation on separate line
- Important warnings highlighted

---

## Example Scenarios

### Scenario 1: Checking New Posting

**Step 1:** Admin sees new pending opportunity
```
Work from Home - Earn R15,000/week!  [Verify Button]
```

**Step 2:** Clicks "Verify"
```
Work from Home - Earn R15,000/week!  [⏳ Checking...]
```

**Step 3:** Results appear (5-10 seconds)
```
Work from Home - Earn R15,000/week!  [🔴 HIGH RISK]
```

**Step 4:** Admin clicks HIGH RISK badge
```
Dialog opens showing:
- Risk Score: 92/100
- Flags: 6 detected
- Analysis: "Multiple fraud indicators..."
- Recommendation: Reject immediately
```

**Step 5:** Admin clicks "Reject as Fraud"
```
Reject dialog opens with pre-filled reason:
"FRAUD RISK DETECTED (AI Score: 92/100)
Flags: easy money, registration fee, personal email..."
```

### Scenario 2: Legitimate Opportunity

**Step 1:** Verify button clicked
```
Software Developer at Tech Corp  [Verify Button]
```

**Step 2:** Results
```
Software Developer at Tech Corp  [✅ LOW RISK]
```

**Step 3:** Click badge to review
```
Dialog shows:
- Risk Score: 12/100
- Flags: No obvious red flags detected
- Analysis: "Appears legitimate..."
- Recommendation: Standard verification
```

**Step 4:** Admin proceeds with normal approval

---

## Mobile/Responsive View

On smaller screens:
- Table scrolls horizontally
- Fraud check column still visible
- Dialog is full-width
- Buttons stack vertically if needed

---

## Accessibility

### Icons
- ✅ VerifiedUser - LOW risk (green check shield)
- ⚠️ Warning - MEDIUM risk (yellow triangle)
- 🚨 ReportProblem - HIGH risk (red exclamation)
- 🔒 Security - Verify button icon

### Colors
- High contrast for readability
- Color + icons (not color alone)
- Clear text labels

### Interactions
- Keyboard accessible
- Screen reader friendly
- Tooltip on hover (button titles)

---

## Admin Experience Flow

```
1. Open Admin Dashboard
   ↓
2. See "Pending Approval" tab with count badge
   ↓
3. View table with NEW "Fraud Check" column
   ↓
4. Click "Verify" on suspicious posting
   ↓
5. Wait 5-10 seconds (loading spinner)
   ↓
6. See colored risk badge appear
   ↓
7. Click badge to view details
   ↓
8. Review AI analysis:
   - Risk score
   - Specific flags
   - Recommendations
   ↓
9. Make decision:
   - LOW: Approve with checks
   - MEDIUM: Investigate
   - HIGH: Reject as fraud
   ↓
10. Click action button
    ↓
11. Opportunity handled safely!
```

---

**🎨 This visual guide shows exactly what admins will see when using the fraud detection feature.**

**Key Takeaway**: Clear visual indicators (colors, icons, badges) make it easy for admins to quickly identify and handle risky postings.

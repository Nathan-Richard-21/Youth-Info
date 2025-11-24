# Bilingual Translation System (English / isiXhosa)

## Overview
The YouthPortal EC application now supports bilingual content in **English** and **isiXhosa**. Users can toggle between languages using the translate button in the header.

## Implementation Details

### 1. **Translation Files**
Located in `frontend/src/constants/`:
- **`content.en.js`** - English translations for all static content
- **`translations.xh.js`** - isiXhosa translations for all static content

Both files follow the same structure:
```javascript
export const content/translations = {
  nav: { ... },
  home: { ... },
  bursaries: { ... },
  careers: { ... },
  // ... other sections
}
```

### 2. **Language Context**
Located in `frontend/src/context/LanguageContext.jsx`

**Purpose**: Provides global language state management across the application.

**Features**:
- Stores current language preference in localStorage
- Provides `toggleLanguage()` function to switch between English and isiXhosa
- Exposes `content` object with translations for the current language
- Boolean helpers: `isEnglish`, `isXhosa`

**Usage in Components**:
```javascript
import { useLanguage } from '../context/LanguageContext'

const MyComponent = () => {
  const { content, toggleLanguage, language } = useLanguage()
  
  return (
    <div>
      <h1>{content.home.heroTitle}</h1>
      <button onClick={toggleLanguage}>
        {language === 'en' ? 'Switch to isiXhosa' : 'Tshintshela kuIsiNgesi'}
      </button>
    </div>
  )
}
```

### 3. **Language Toggle Button**
Located in the NavBar header (desktop and mobile views).

**Features**:
- Icon button with translate icon (🌐)
- Tooltip showing "Switch to isiXhosa" or "Tshintshela kuIsiNgesi"
- Instantly updates all translated content across the site
- Persists language choice in localStorage

### 4. **Updated Components**

#### Already Updated:
- ✅ **NavBar** - Navigation links, login/logout buttons
- ✅ **HomePage** - Hero section, stats, categories, featured opportunities, CTA

#### Still Need Translation Integration:
- ⚠️ Bursaries page
- ⚠️ Careers page
- ⚠️ Learnerships page
- ⚠️ BusinessFunding page
- ⚠️ MedicalChat page
- ⚠️ SuccessStories page
- ⚠️ Events page
- ⚠️ Forums page
- ⚠️ ResumeBuilder page
- ⚠️ KnowledgeBase page
- ⚠️ Login page
- ⚠️ Register page
- ⚠️ Profile page
- ⚠️ AdminDashboard page
- ⚠️ Footer component

## How to Add Translations to New Components

### Step 1: Import the Language Hook
```javascript
import { useLanguage } from '../context/LanguageContext'
```

### Step 2: Get Content from Context
```javascript
const MyComponent = () => {
  const { content } = useLanguage()
  
  // Now use content.sectionName.propertyName
}
```

### Step 3: Replace Hardcoded Strings
**Before:**
```javascript
<Typography>Welcome to YouthPortal</Typography>
```

**After:**
```javascript
<Typography>{content.home.heroTitle}</Typography>
```

### Step 4: Add Translation Keys if Missing
If you need new translation keys, add them to **both** files:

**content.en.js:**
```javascript
export const content = {
  mySection: {
    title: 'My Title',
    description: 'My Description'
  }
}
```

**translations.xh.js:**
```javascript
export const translations = {
  mySection: {
    title: 'Isihloko Sam',
    description: 'Inkcazo Yam'
  }
}
```

## Testing the Translation System

1. **Start the frontend server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open browser**: Navigate to `http://localhost:3001`

3. **Test language toggle**:
   - Click the translate icon (🌐) in the header
   - The page content should instantly switch between English and isiXhosa
   - Refresh the page - language preference should persist

4. **Verify localStorage**:
   - Open browser DevTools → Application → Local Storage
   - Check for `language` key with value `'en'` or `'xh'`

## Translation Keys Reference

### Navigation (`content.nav`)
- `home`, `bursaries`, `careers`, `learnerships`, `businessFunding`, `medicalChat`, `successStories`, `events`, `forums`, `login`, `signup`, `profile`, `logout`

### Home Page (`content.home`)
- `heroTitle`, `heroSubtitle`, `exploreBtn`, `getStartedBtn`
- `statsTitle1`, `statsTitle2`, `statsTitle3`, `statsTitle4`
- `categoriesTitle`, `categoriesSubtitle`
- `featuredTitle`, `featuredSubtitle`
- `ctaTitle`, `ctaSubtitle`, `ctaBtn`
- `deadline`, `learnMore`, `applyNow`

### Categories (`content.categories`)
- `bursariesTitle`, `bursariesDesc`
- `careersTitle`, `careersDesc`
- `learnershipsTitle`, `learnershipsDesc`
- `businessTitle`, `businessDesc`
- `medicalTitle`, `medicalDesc`
- `successTitle`, `successDesc`
- `eventsTitle`, `eventsDesc`
- `forumsTitle`, `forumsDesc`

### Additional Sections
See `content.en.js` for complete list of available translation keys for:
- Bursaries page
- Careers page
- Learnerships page
- Business Funding page
- Medical Chat page
- Success Stories page
- Events page
- Forums page
- Resume Builder page
- Knowledge Base page
- Auth pages (Login/Register)
- Profile page
- Admin Dashboard

## Benefits

1. **Accessibility**: Serves isiXhosa-speaking youth in Eastern Cape
2. **User Experience**: Seamless language switching without page reload
3. **Maintainability**: All translations centralized in constant files
4. **Performance**: No API calls needed for static content
5. **Persistence**: Language preference saved across sessions

## Future Enhancements

- [ ] Add more South African languages (Zulu, Afrikaans, etc.)
- [ ] Integrate with backend for dynamic content translations
- [ ] Add RTL (Right-to-Left) support if needed
- [ ] Implement translation management system for easier updates
- [ ] Add language detection based on browser settings

## Technical Notes

- **Context Provider**: Wraps entire app in `App.jsx`
- **Storage**: Uses `localStorage` for persistence
- **Default Language**: English (`'en'`)
- **Language Codes**: `'en'` (English), `'xh'` (isiXhosa)
- **No Dependencies**: Pure React Context API, no external i18n libraries

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LanguageProvider } from './context/LanguageContext'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ChatbotWidget from './components/ChatbotWidget'
import HomePage from './pages/HomePage'
import Bursaries from './pages/Bursaries'
import Careers from './pages/Careers'
import Learnerships from './pages/Learnerships'
import BusinessFunding from './pages/BusinessFunding'
import MedicalChat from './pages/MedicalChat'
import SuccessStories from './pages/SuccessStories'
import Events from './pages/Events'
import Forums from './pages/Forums'
import ResumeBuilder from './pages/ResumeBuilder'
import KnowledgeBase from './pages/KnowledgeBase'
import FAQ from './pages/FAQ'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/ProfileNew'
import AdminDashboard from './pages/AdminDashboardNew'
import AdminPostPortal from './pages/AdminPostPortal'
import AdminSettings from './pages/AdminSettings'
import StakeholderDashboard from './pages/StakeholderDashboard';
import StakeholderSignup from './pages/StakeholderSignup';
import StakeholderPostJob from './pages/StakeholderPostJob';
import Opportunities from './pages/Opportunities'
import TermsAndPrivacy from './pages/TermsAndPrivacy'

const theme = createTheme({
  palette: {
    primary: { 
      main: '#0047AB', // ELIDZ Blue
      light: '#1E90FF',
      dark: '#003380',
      contrastText: '#ffffff'
    },
    secondary: { 
      main: '#FF8C00', // ELIDZ Orange
      light: '#FFA500',
      dark: '#FF6900',
      contrastText: '#ffffff'
    },
    success: { main: '#10b981' },
    info: { main: '#1E90FF' },
    warning: { main: '#FFA500' },
    error: { main: '#ef4444' },
    background: { 
      default: '#f8fafc', 
      paper: '#ffffff' 
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#64748b'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 71, 171, 0.1)',
    '0 4px 16px rgba(0, 71, 171, 0.12)',
    '0 6px 20px rgba(0, 71, 171, 0.14)',
    '0 8px 24px rgba(0, 71, 171, 0.16)',
    '0 10px 28px rgba(0, 71, 171, 0.18)',
    '0 12px 32px rgba(0, 71, 171, 0.20)',
    '0 14px 36px rgba(0, 71, 171, 0.22)',
    '0 16px 40px rgba(0, 71, 171, 0.24)',
    '0 18px 44px rgba(0, 71, 171, 0.26)',
    '0 20px 48px rgba(0, 71, 171, 0.28)',
    '0 22px 52px rgba(0, 71, 171, 0.30)',
    '0 24px 56px rgba(0, 71, 171, 0.32)',
    '0 26px 60px rgba(0, 71, 171, 0.34)',
    '0 28px 64px rgba(0, 71, 171, 0.36)',
    '0 30px 68px rgba(0, 71, 171, 0.38)',
    '0 32px 72px rgba(0, 71, 171, 0.40)',
    '0 34px 76px rgba(0, 71, 171, 0.42)',
    '0 36px 80px rgba(0, 71, 171, 0.44)',
    '0 38px 84px rgba(0, 71, 171, 0.46)',
    '0 40px 88px rgba(0, 71, 171, 0.48)',
    '0 42px 92px rgba(0, 71, 171, 0.50)',
    '0 44px 96px rgba(0, 71, 171, 0.52)',
    '0 46px 100px rgba(0, 71, 171, 0.54)',
    '0 48px 104px rgba(0, 71, 171, 0.56)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 71, 171, 0.25)',
            transform: 'translateY(-2px)'
          }
        },
        contained: {
          background: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #003380 0%, #0047AB 100%)'
          }
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF6900 0%, #FF5500 100%)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 71, 171, 0.12)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0, 71, 171, 0.2)',
            transform: 'translateY(-4px)'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8
        }
      }
    }
  }
})

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/bursaries" element={<Bursaries />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/learnerships" element={<Learnerships />} />
              <Route path="/business-funding" element={<BusinessFunding />} />
              <Route path="/medical-chat" element={<MedicalChat />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/events" element={<Events />} />
              <Route path="/forums" element={<Forums />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stakeholder-signup" element={<StakeholderSignup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/post" element={<AdminPostPortal />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/stakeholder" element={<StakeholderDashboard />} />
              <Route path="/stakeholder-dashboard" element={<StakeholderDashboard />} />
              <Route path="/stakeholder/post-job" element={<StakeholderPostJob />} />
              <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
            </Routes>
          </main>
          <Footer />
          <ChatbotWidget />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

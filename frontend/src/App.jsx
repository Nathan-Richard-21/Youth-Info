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
    primary: { main: '#6366f1' },
    secondary: { main: '#f59e0b' },
    success: { main: '#10b981' },
    background: { default: '#f8fafc', paper: '#ffffff' }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  },
  shape: { borderRadius: 12 }
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

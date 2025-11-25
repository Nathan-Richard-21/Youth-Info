import React, { useEffect, useRef } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const GoogleSignIn = ({ mode = 'signin' }) => {
  const navigate = useNavigate()
  const googleButtonRef = useRef(null)

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '589331877946-qu8ctgb0qa4btj5pipttpgjkralbd36p.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: false,
      })

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: 'outline',
          size: 'large',
          width: googleButtonRef.current?.offsetWidth || 400,
          text: mode === 'signin' ? 'signin_with' : 'signup_with',
        }
      )
    }
  }, [mode])

  const handleCredentialResponse = async (response) => {
    try {
      console.log('🔐 Google Sign-In: Processing credential...')
      const res = await api.post('/auth/google', {
        credential: response.credential
      })
      
      console.log('✅ Google Sign-In successful, token received')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      console.log('Token and user saved to localStorage')
      
      // Redirect to home page instead of opportunities
      navigate('/')
    } catch (err) {
      console.error('❌ Google Sign-In error:', err)
      alert(err.response?.data?.message || 'Google Sign-In failed')
    }
  }

  return (
    <Box>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>
      <Box ref={googleButtonRef} sx={{ width: '100%' }} />
    </Box>
  )
}

export default GoogleSignIn

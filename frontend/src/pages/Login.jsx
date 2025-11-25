import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'
import GoogleSignIn from '../components/GoogleSignIn'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      console.log('🔐 Logging in...')
      const res = await api.post('/auth/login', { email, password })
      console.log('✅ Login successful, token received')
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      console.log('Token and user saved to localStorage')
      
      // Redirect to home page after successful login
      nav('/')
    } catch (err) {
      console.error('❌ Login error:', err)
      setErr(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Box maxWidth={480} mx="auto" mt={4} px={2}>
      <Typography variant="h5" mb={2} textAlign="center">Login to YouthPortal</Typography>
      
      <GoogleSignIn mode="signin" />
      
      <form onSubmit={submit}>
        <TextField 
          label="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          fullWidth 
          margin="normal"
          required
        />
        <TextField 
          label="Password" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          type="password" 
          fullWidth 
          margin="normal"
          required
        />
        {err && <Typography color="error" mt={1}>{err}</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          Login
        </Button>
        <Box mt={1} textAlign="center">
          <Link to="/forgot-password" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.875rem' }}>
            Forgot Password?
          </Link>
        </Box>
      </form>
      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
            Sign up here
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login

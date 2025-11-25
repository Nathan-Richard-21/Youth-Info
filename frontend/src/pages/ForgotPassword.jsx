import React, { useState } from 'react'
import { TextField, Button, Box, Typography, Container, Paper, Alert, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import api from '../api'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/forgot-password', { email })
      setSuccess(true)
      // In development, show the reset URL
      if (response.data.resetUrl) {
        alert(`Reset link (DEV MODE): ${response.data.resetUrl}`)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <EmailIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Check Your Email
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Didn't receive the email? Check your spam folder or try again.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" component={Link} to="/login">
              Back to Login
            </Button>
            <Button variant="contained" onClick={() => setSuccess(false)}>
              Try Again
            </Button>
          </Box>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
          Forgot Password?
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal"
            autoFocus
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Remember your password?{' '}
              <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default ForgotPassword

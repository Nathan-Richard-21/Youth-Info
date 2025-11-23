import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      nav('/opportunities')
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Box maxWidth={480} mx="auto">
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={submit}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} fullWidth margin="normal" />
        <TextField label="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" fullWidth margin="normal" />
        {err && <Typography color="error">{err}</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Box>
  )
}

export default Login

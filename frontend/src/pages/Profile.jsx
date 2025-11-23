import React, { useEffect, useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import api from '../api'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/users/me')
        setUser(res.data)
      } catch (err) {
        console.error(err)
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const save = async () => {
    try {
      const res = await api.put('/users/me', user)
      setUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      alert('Saved')
    } catch (err) { alert('Save failed') }
  }

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please login.</div>

  return (
    <Box maxWidth={600} mx="auto">
      <Typography variant="h5" mb={2}>Your Profile</Typography>
      <TextField label="Name" fullWidth margin="normal" value={user.name || ''} onChange={e=>setUser({...user, name: e.target.value})} />
      <TextField label="Bio" fullWidth margin="normal" value={user.bio || ''} onChange={e=>setUser({...user, bio: e.target.value})} />
      <TextField label="Location" fullWidth margin="normal" value={user.location || ''} onChange={e=>setUser({...user, location: e.target.value})} />
      <TextField label="Phone" fullWidth margin="normal" value={user.phone || ''} onChange={e=>setUser({...user, phone: e.target.value})} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={save}>Save</Button>
    </Box>
  )
}

export default Profile

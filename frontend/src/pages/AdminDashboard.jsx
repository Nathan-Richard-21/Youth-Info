import React, { useEffect, useState } from 'react'
import { Typography, Box, Paper, Button, List, ListItem, ListItemText } from '@mui/material'
import api from '../api'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [opps, setOpps] = useState([])

  useEffect(()=>{ load() }, [])
  const load = async ()=>{
    try{
      const u = await api.get('/admin/users')
      setUsers(u.data)
      const o = await api.get('/admin/opportunities')
      setOpps(o.data)
    }catch(err){ console.error(err) }
  }

  const setStatus = async (id, status) => {
    try{
      await api.put(`/admin/opportunities/${id}/status`, { status })
      load()
    }catch(err){ alert('Action failed') }
  }

  return (
    <Box>
      <Typography variant="h5">Admin Dashboard</Typography>
      <Paper sx={{ p: 2, mt:2 }}>
        <Typography variant="h6">Users</Typography>
        <List>
          {users.map(u => (
            <ListItem key={u._id}><ListItemText primary={u.name} secondary={u.email} /></ListItem>
          ))}
        </List>
      </Paper>
      <Paper sx={{ p: 2, mt:2 }}>
        <Typography variant="h6">Opportunities</Typography>
        <List>
          {opps.map(o => (
            <ListItem key={o._id} secondaryAction={<>
              <Button onClick={()=>setStatus(o._id,'approved')}>Approve</Button>
              <Button onClick={()=>setStatus(o._id,'rejected')}>Reject</Button>
            </>}>
              <ListItemText primary={`${o.title} (${o.category})`} secondary={`${o.status} — ${o.description || ''}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default AdminDashboard

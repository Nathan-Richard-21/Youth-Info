import React, { useState } from 'react'
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'
import api from '../api'

const Chatbot = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const send = async () => {
    if (!message) return
    const mine = { from: 'me', text: message }
    setMessages(prev => [...prev, mine])
    setMessage('')
    try {
      const res = await api.post('/chat', { message })
      const reply = { from: 'bot', text: res.data.reply, data: res.data.data }
      setMessages(prev => [...prev, reply])
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong.' }])
    }
  }

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h5" mb={2}>Medical Information Chat 🏥</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Ask about mental health, HIV/TB, reproductive health, clinics, substance abuse, sexual health, vaccinations, or emergency contacts.
      </Typography>
      <Paper sx={{ p: 2, minHeight: 300 }}>
        <List>
          {messages.map((m, i) => (
            <ListItem key={i} alignItems="flex-start">
              <ListItemText primary={m.from === 'me' ? 'You' : 'Medical Assistant'} secondary={m.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <TextField fullWidth value={message} onChange={e=>setMessage(e.target.value)} placeholder="Ask about mental health, HIV, clinics, etc." />
        <Button variant="contained" onClick={send}>Send</Button>
      </Box>
    </Box>
  )
}

export default Chatbot

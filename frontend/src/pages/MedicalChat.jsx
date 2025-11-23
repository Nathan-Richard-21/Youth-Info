import React, { useState, useRef, useEffect } from 'react'
import { Box, Container, TextField, Button, Paper, Typography, Chip, Avatar, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import api from '../api'

const MedicalChat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Medical Info Chat! 🏥\n\nI can help with:\n\n• Mental health support\n• HIV & TB information\n• Reproductive health\n• Clinic & hospital info\n• Substance abuse help\n• Sexual health\n• Vaccinations\n• Emergency contacts\n\nWhat would you like to know about?' }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickTopics = [
    'Mental health', 
    'HIV/TB info', 
    'Reproductive health', 
    'Find a clinic', 
    'Emergency contacts', 
    'Vaccinations'
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text = message) => {
    if (!text.trim()) return
    const userMsg = { from: 'me', text }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setLoading(true)
    
    try {
      const res = await api.post('/chat', { message: text })
      const botMsg = { from: 'bot', text: res.data.reply }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTopic = (topic) => {
    send(topic)
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#ec4899', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocalHospitalIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Medical Information Chat</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Get confidential health info & support</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Chat Messages */}
          <Box sx={{ p: 3, height: 500, overflowY: 'auto', bgcolor: '#f8fafc' }}>
            {messages.map((m, i) => (
              <Box 
                key={i} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {m.from === 'bot' && (
                  <Avatar sx={{ bgcolor: '#ec4899', mr: 1 }}>
                    <LocalHospitalIcon />
                  </Avatar>
                )}
                <Paper 
                  sx={{ 
                    p: 2, 
                    maxWidth: '70%',
                    bgcolor: m.from === 'me' ? '#6366f1' : 'white',
                    color: m.from === 'me' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                    {m.text}
                  </Typography>
                </Paper>
                {m.from === 'me' && (
                  <Avatar sx={{ bgcolor: '#6366f1', ml: 1 }}>U</Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#ec4899' }}><LocalHospitalIcon /></Avatar>
                <Typography variant="body2" color="text.secondary">Typing...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Topics */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>Quick topics:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickTopics.map((topic, i) => (
                <Chip 
                  key={i} 
                  label={topic} 
                  onClick={() => handleQuickTopic(topic)}
                  clickable
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 1, bgcolor: 'white' }}>
            <TextField 
              fullWidth 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && send()}
              placeholder="Type your question..."
              variant="outlined"
              disabled={loading}
            />
            <Button 
              variant="contained" 
              onClick={() => send()}
              disabled={!message.trim() || loading}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Paper>

        {/* Disclaimer */}
        <Paper sx={{ p: 2, mt: 3, bgcolor: '#fef3c7' }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            ⚠️ Important Notice
          </Typography>
          <Typography variant="body2">
            This chatbot provides general health information only. For medical emergencies, call 10177 or visit your nearest hospital. Always consult healthcare professionals for medical advice.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default MedicalChat

import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, Tab, Tabs, CircularProgress, Alert } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import api from '../api'

const Events = () => {
  const [tabValue, setTabValue] = useState(0)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?category=event&limit=50&sort=-createdAt')
      setEvents(response.data.opportunities)
      setError('')
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/opportunities/${eventId}/apply`, {
        message: 'I would like to register for this event.'
      })
      alert('Registration submitted successfully!')
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Please log in to register for events.')
      } else {
        alert('Failed to register. Please try again.')
      }
    }
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#06b6d4', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarTodayIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Events Calendar</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Workshops, fairs, training & networking events</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h5" fontWeight={600} mb={4}>Upcoming Events in Eastern Cape</Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : events.length === 0 ? (
          <Alert severity="info">No events available at the moment. Check back soon!</Alert>
        ) : (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} md={6} key={event._id}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                      {event.subcategory && (
                        <Chip label={event.subcategory} size="small" sx={{ bgcolor: '#06b6d4', color: 'white' }} />
                      )}
                      {event.startDate && (
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {new Date(event.startDate).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </Typography>
                      )}
                      {event.isFeatured && <Chip label="Featured" size="small" color="primary" />}
                      {event.isUrgent && <Chip label="Limited Spots" size="small" color="error" />}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>{event.title}</Typography>
                    {event.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">{event.location}</Typography>
                      </Box>
                    )}
                    <Typography variant="body2" paragraph>{event.description}</Typography>
                    {event.organization && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Organizer:</strong> {event.organization}
                      </Typography>
                    )}
                    {event.startDate && event.endDate && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Duration:</strong> {new Date(event.startDate).toLocaleDateString('en-ZA')} - {new Date(event.endDate).toLocaleDateString('en-ZA')}
                      </Typography>
                    )}
                    {event.deadline && (
                      <Typography variant="body2" color="error.main" sx={{ mt: 1, fontWeight: 600 }}>
                        Registration closes: {new Date(event.deadline).toLocaleDateString('en-ZA')}
                      </Typography>
                    )}
                    {event.views > 0 && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        {event.views} views
                      </Typography>
                    )}
                  </CardContent>
                  <Box sx={{ px: 2, pb: 2 }}>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ bgcolor: '#06b6d4' }}
                      onClick={() => handleRegister(event._id)}
                    >
                      Register / RSVP
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default Events

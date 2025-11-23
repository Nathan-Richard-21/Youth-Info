import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, Tab, Tabs } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const Events = () => {
  const [tabValue, setTabValue] = useState(0)

  const events = [
    { title: 'Career Fair 2025', date: '2025-12-05', location: 'Nelson Mandela Bay Stadium, PE', type: 'Career Fair', description: 'Meet 50+ employers, attend workshops, get CV reviews', organizer: 'EC Dept of Labour' },
    { title: 'Youth Entrepreneurship Workshop', date: '2025-11-28', location: 'East London ICC', type: 'Workshop', description: 'Learn business plan writing, pitching, and funding options', organizer: 'NYDA' },
    { title: 'Tech Skills Bootcamp', date: '2025-12-10', location: 'Nelson Mandela University', type: 'Training', description: '3-day coding bootcamp for beginners - Free!', organizer: 'Code4CT' },
    { title: 'NSFAS Application Help Session', date: '2025-11-25', location: 'Walter Sisulu University', type: 'Info Session', description: 'Get help completing your NSFAS application', organizer: 'WSU Financial Aid' },
    { title: 'Mental Health Awareness Day', date: '2025-12-01', location: 'Online (Zoom)', type: 'Webinar', description: 'Youth mental health resources and support', organizer: 'SADAG' },
    { title: 'Job Readiness Training', date: '2025-12-08', location: 'Mthatha Town Hall', type: 'Workshop', description: 'Interview skills, CV writing, professional etiquette', organizer: 'Harambee Youth' }
  ]

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

        <Grid container spacing={3}>
          {events.map((event, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={event.type} size="small" sx={{ bgcolor: '#06b6d4', color: 'white' }} />
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      {new Date(event.date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>{event.title}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">{event.location}</Typography>
                  </Box>
                  <Typography variant="body2" paragraph>{event.description}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Organizer:</strong> {event.organizer}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button variant="contained" fullWidth sx={{ bgcolor: '#06b6d4' }}>Register / RSVP</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Events

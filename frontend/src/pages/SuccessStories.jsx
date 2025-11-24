import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Avatar, Chip, Button, CircularProgress, Alert } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import api from '../api'

const SuccessStories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?category=success-story&limit=50')
      setStories(response.data.opportunities || [])
    } catch (err) {
      setError('Failed to load success stories')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#8b5cf6', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Success Stories</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Be inspired by Eastern Cape youth who made it</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} mb={4}>Real stories from real youth in Eastern Cape</Typography>

            {stories.length === 0 ? (
              <Alert severity="info">No success stories available yet.</Alert>
            ) : (
              <Grid container spacing={4}>
                {stories.map((story) => (
                  <Grid item xs={12} md={6} key={story._id}>
                    <Card sx={{ height: '100%', '&:hover': { boxShadow: 8 } }}>
                      {story.imageUrl && (
                        <CardMedia component="img" height="200" image={story.imageUrl} alt={story.title}
                          onError={(e) => e.target.style.display = 'none'} />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, flexWrap: 'wrap' }}>
                          {story.subcategory && <Chip label={story.subcategory} size="small" color="secondary" />}
                          {story.location && <Chip label={story.location} size="small" variant="outlined" />}
                          {story.featured && <Chip label="Featured" size="small" color="primary" />}
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {story.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {story.description}
                        </Typography>
                        {story.organization && (
                          <Typography variant="caption" color="text.secondary">
                            {story.organization}
                          </Typography>
                        )}
                        {story.views > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                            {story.views} views
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>

      <Box sx={{ bgcolor: '#f5f3ff', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Got Your Own Success Story?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Share your journey and inspire others in the Eastern Cape youth community
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" sx={{ bgcolor: '#8b5cf6' }}>Share Your Story</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SuccessStories

import React from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Avatar, Chip, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const SuccessStories = () => {
  const stories = [
    { 
      name: 'Thabo Mthembu', 
      title: 'From Bursary to Software Engineer', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Received NSFAS bursary to study Computer Science at Nelson Mandela University. Now working as a software developer at Amazon Web Services in Cape Town.',
      tags: ['Bursary', 'IT Career'],
      location: 'Port Elizabeth'
    },
    { 
      name: 'Nomsa Zwane', 
      title: 'Young Entrepreneur Success with NYDA Grant', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Started a catering business with R50k NYDA grant. Now employs 8 people and caters for corporate events across Eastern Cape.',
      tags: ['Business', 'NYDA Grant'],
      location: 'East London'
    },
    { 
      name: 'Sipho Ndlovu', 
      title: 'Learnership to Permanent Job', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Completed Eskom Engineering Learnership and was offered a permanent position. Working towards becoming a certified electrician.',
      tags: ['Learnership', 'Engineering'],
      location: 'Mthatha'
    },
    { 
      name: 'Zanele Khumalo', 
      title: 'Teaching the Next Generation', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Funded by Funza Lushaka bursary to become a teacher. Now inspiring Grade 10 learners at her former high school in Mdantsane.',
      tags: ['Bursary', 'Teaching'],
      location: 'Mdantsane'
    },
    { 
      name: 'Luthando Gqomo', 
      title: 'Overcoming Challenges Through Mentorship', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Connected with a mentor through YouthPortal EC. Received guidance on CV writing and interview skills, landed internship at Standard Bank.',
      tags: ['Mentorship', 'Career'],
      location: 'Grahamstown'
    },
    { 
      name: 'Akhona Mahlangu', 
      title: 'Fashion Designer Wins Competition', 
      image: 'https://via.placeholder.com/400x250?text=Success+Story',
      story: 'Won SAB Foundation Social Innovation Award for sustainable fashion startup. R450k prize money helped scale the business across SA.',
      tags: ['Competition', 'Business'],
      location: 'East London'
    }
  ]

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
        <Typography variant="h5" fontWeight={600} mb={4}>Real stories from real youth in Eastern Cape</Typography>

        <Grid container spacing={4}>
          {stories.map((story, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 8 } }}>
                <CardMedia component="img" height="200" image={story.image} alt={story.name} />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: '#8b5cf6', mr: 2 }}>{story.name[0]}</Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>{story.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{story.location}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
                    {story.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {story.story}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {story.tags.map((tag, j) => (
                      <Chip key={j} label={tag} size="small" color="secondary" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

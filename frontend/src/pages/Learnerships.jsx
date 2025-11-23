import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Paper } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ForumIcon from '@mui/icons-material/Forum'

const Learnerships = () => {
  const learnerships = [
    { title: 'IT Systems Support Learnership', provider: 'FET College EC', duration: '18 months', level: 'NQF 5', stipend: 'R3,500/month', requirements: 'Matric with IT', forum: true },
    { title: 'Electrical Engineering Learnership', provider: 'Eskom Academy', duration: '24 months', level: 'NQF 4', stipend: 'R6,000/month', requirements: 'N3 Electrical or Matric Maths & Science', forum: true },
    { title: 'Business Administration NQF 4', provider: 'Services SETA', duration: '12 months', level: 'NQF 4', stipend: 'R3,000/month', requirements: 'Matric', forum: false },
    { title: 'Hospitality Services Learnership', provider: 'CATHSSETA', duration: '12 months', level: 'NQF 3', stipend: 'R2,800/month', requirements: 'Grade 10+', forum: false },
    { title: 'Project Management Learnership', provider: 'MICT SETA', duration: '18 months', level: 'NQF 5', stipend: 'R5,000/month', requirements: 'Diploma/Degree', forum: true },
    { title: 'Retail Management Learnership', provider: 'W&R SETA', duration: '12 months', level: 'NQF 4', stipend: 'R4,000/month', requirements: 'Matric, retail experience', forum: true }
  ]

  return (
    <Box>
      <Box sx={{ bgcolor: '#f59e0b', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Learnerships</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Learn while you earn - Gain skills & qualifications</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Paper sx={{ p: 3, mb: 4, bgcolor: '#fffbeb' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>What is a Learnership?</Typography>
          <Typography variant="body1">
            A learnership combines practical work experience with structured learning, leading to a nationally recognized qualification. You earn a stipend while gaining hands-on skills in your field. Perfect for youth starting their careers!
          </Typography>
        </Paper>

        <Typography variant="h5" fontWeight={600} mb={3}>{learnerships.length} Learnerships Available</Typography>

        <Grid container spacing={3}>
          {learnerships.map((learn, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={learn.level} size="small" color="warning" />
                    <Chip label={learn.duration} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>{learn.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Provider:</strong> {learn.provider}
                  </Typography>
                  <Typography variant="body1" color="success.main" fontWeight={600} gutterBottom>
                    Stipend: {learn.stipend}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Requirements:</strong> {learn.requirements}
                  </Typography>
                  {learn.forum && (
                    <Chip icon={<ForumIcon />} label="Forum Available" size="small" color="secondary" variant="outlined" sx={{ mt: 1 }} />
                  )}
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="warning">Apply Now</Button>
                  {learn.forum && <Button startIcon={<ForumIcon />}>Discuss</Button>}
                  <Button>Save</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#fef3c7', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            🎓 Want to Learn More?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join learnership forums to connect with current learners and alumni
          </Typography>
          <Button variant="contained" color="warning">Browse Forums</Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Learnerships

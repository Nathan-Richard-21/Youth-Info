import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Chip, Paper, Tabs, Tab } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BusinessIcon from '@mui/icons-material/Business'
import ForumIcon from '@mui/icons-material/Forum'

const Careers = () => {
  const [tabValue, setTabValue] = useState(0)
  const [location, setLocation] = useState('')

  const jobs = [
    { title: 'Junior Software Developer', company: 'TechCorp SA', location: 'Port Elizabeth', type: 'Internship', salary: 'R8,000 - R12,000/month', posted: '2 days ago', forum: true },
    { title: 'Retail Sales Assistant', company: 'Shoprite Checkers', location: 'East London', type: 'Full-time', salary: 'R5,500/month', posted: '1 week ago', forum: true },
    { title: 'Graduate Trainee Program', company: 'ABSA Bank', location: 'Multiple Locations', type: 'Graduate Program', salary: 'Competitive', posted: '3 days ago', forum: true },
    { title: 'Call Center Agent', company: 'Telkom', location: 'East London', type: 'Full-time', salary: 'R6,000 - R8,000/month', posted: '5 days ago', forum: false },
    { title: 'Junior Accountant', company: 'Deloitte', location: 'Port Elizabeth', type: 'Entry Level', salary: 'R15,000/month', posted: '1 day ago', forum: true },
    { title: 'Marketing Intern', company: 'Coca-Cola', location: 'East London', type: 'Internship', salary: 'R4,000/month', posted: '1 week ago', forum: false }
  ]

  const internships = [
    { title: 'IT Support Intern', company: 'MTN', location: 'Port Elizabeth', duration: '12 months', stipend: 'R3,500/month', posted: '2 days ago' },
    { title: 'Finance Internship', company: 'Standard Bank', location: 'East London', duration: '6 months', stipend: 'R5,000/month', posted: '4 days ago' },
    { title: 'Engineering Learnership', company: 'Eskom', location: 'Multiple', duration: '18 months', stipend: 'R6,000/month', posted: '1 week ago' }
  ]

  const current = tabValue === 0 ? jobs : internships

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: '#10b981', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WorkIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Career Opportunities</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Jobs, internships & graduate programs for youth</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs & Filters */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Jobs & Opportunities" />
            <Tab label="Internships & Learnerships" />
          </Tabs>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth placeholder="Search jobs or companies..." />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)}>
                  <MenuItem value="">All Locations</MenuItem>
                  <MenuItem value="Port Elizabeth">Port Elizabeth</MenuItem>
                  <MenuItem value="East London">East London</MenuItem>
                  <MenuItem value="Mthatha">Mthatha</MenuItem>
                  <MenuItem value="Grahamstown">Grahamstown</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Job Type">
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Graduate">Graduate Program</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      {/* Job Listings */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>{current.length} Opportunities Found</Typography>

        <Grid container spacing={3}>
          {tabValue === 0 && jobs.map((job, i) => (
            <Grid item xs={12} key={i}>
              <Card sx={{ '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>{job.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                        <BusinessIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">{job.company}</Typography>
                        <LocationOnIcon fontSize="small" color="action" sx={{ ml: 2 }} />
                        <Typography variant="body2" color="text.secondary">{job.location}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip label={job.type} size="small" color="primary" />
                      <Typography variant="body2" color="text.secondary" mt={1}>{job.posted}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1" color="success.main" fontWeight={600} mb={1}>
                    {job.salary}
                  </Typography>
                  {job.forum && (
                    <Chip icon={<ForumIcon />} label="Active Forum Discussion" size="small" color="secondary" variant="outlined" />
                  )}
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button variant="contained">Apply Now</Button>
                  <Button variant="outlined">View Details</Button>
                  {job.forum && <Button startIcon={<ForumIcon />}>Join Forum</Button>}
                  <Button>Save</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

          {tabValue === 1 && internships.map((intern, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Chip label="Internship" size="small" color="secondary" sx={{ mb: 2 }} />
                  <Typography variant="h6" fontWeight={600} gutterBottom>{intern.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company:</strong> {intern.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Location:</strong> {intern.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Duration:</strong> {intern.duration}
                  </Typography>
                  <Typography variant="body1" color="success.main" fontWeight={600}>
                    {intern.stipend}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" fullWidth>Apply</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            💼 Need Career Guidance?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join career forums, build your resume, and get mentorship
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="success">Career Forums</Button>
            <Button variant="outlined" color="success">Resume Builder</Button>
            <Button variant="contained" color="success">Find a Mentor</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Careers

import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Chip, Paper } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import SearchIcon from '@mui/icons-material/Search'

const Bursaries = () => {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [field, setField] = useState('')

  const bursaries = [
    { title: 'National Student Financial Aid Scheme (NSFAS)', provider: 'Government', amount: 'Full tuition + allowances', deadline: '2025-12-31', level: 'Tertiary', field: 'All Fields', requirements: 'SA citizen, household income < R350k' },
    { title: 'Thuthuka Bursary Fund', provider: 'SAICA', amount: 'Full tuition', deadline: '2025-11-30', level: 'University', field: 'Accounting', requirements: 'Academic merit, financial need' },
    { title: 'Eskom Tertiary Education Support Programme', provider: 'Eskom', amount: 'R50,000 - R90,000/year', deadline: '2025-12-15', level: 'University', field: 'Engineering, Science', requirements: 'Maths 60%+, English 60%+' },
    { title: 'Funza Lushaka Bursary Programme', provider: 'Dept of Education', amount: 'Full tuition + stipend', deadline: '2026-01-15', level: 'University', field: 'Teaching', requirements: 'Teaching degree, work back 1 year per year' },
    { title: 'Standard Bank Learning Programme', provider: 'Standard Bank', amount: 'Full tuition', deadline: '2025-12-01', level: 'University', field: 'Finance, IT, Business', requirements: 'Academic merit, leadership' },
    { title: 'Sasol Bursary Programme', provider: 'Sasol', amount: 'R60,000 - R100,000/year', deadline: '2025-11-25', level: 'University', field: 'Engineering, Science', requirements: 'Maths 65%+, Science 65%+' },
    { title: 'Allan Gray Orbis Foundation Scholarship', provider: 'Allan Gray', amount: 'Full fees + allowance', deadline: '2025-10-31', level: 'Grade 12, University', field: 'All Fields', requirements: 'Entrepreneurial spirit, leadership' },
    { title: 'Transnet Bursary Scheme', provider: 'Transnet', amount: 'R70,000 - R120,000/year', deadline: '2025-12-10', level: 'University', field: 'Engineering, Logistics', requirements: 'Maths 60%+, citizen' }
  ]

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: '#6366f1', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Bursaries & Scholarships</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Fund your education with financial aid opportunities</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField 
                fullWidth 
                placeholder="Search bursaries..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Level" value={level} onChange={e => setLevel(e.target.value)}>
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="Grade 12">Grade 12</MenuItem>
                <MenuItem value="University">University</MenuItem>
                <MenuItem value="Tertiary">Tertiary</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Field of Study" value={field} onChange={e => setField(e.target.value)}>
                <MenuItem value="">All Fields</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Accounting">Accounting</MenuItem>
                <MenuItem value="Teaching">Teaching</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button variant="contained" fullWidth>Filter</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Bursary Cards */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={600}>{bursaries.length} Bursaries Available</Typography>
          <Button variant="outlined">Sort By: Deadline</Button>
        </Box>

        <Grid container spacing={3}>
          {bursaries.map((b, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip label={b.level} size="small" color="primary" />
                    <Chip label={`Deadline: ${new Date(b.deadline).toLocaleDateString()}`} size="small" variant="outlined" />
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>{b.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Provider:</strong> {b.provider}
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight={600} gutterBottom>
                    {b.amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Field:</strong> {b.field}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Requirements:</strong> {b.requirements}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button variant="contained" fullWidth>Apply Now</Button>
                  <Button variant="outlined">Save</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Info Box */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
            📚 Need Help with Applications?
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
            Check out our application tips and resume builder to improve your chances
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" color="success">Application Tips</Button>
            <Button variant="contained" color="success">Resume Builder</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Bursaries

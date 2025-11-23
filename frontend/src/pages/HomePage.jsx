import React from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions, Chip, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ForumIcon from '@mui/icons-material/Forum'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const HomePage = () => {
  const categories = [
    { title: 'Bursaries & Scholarships', icon: <SchoolIcon sx={{ fontSize: 40 }} />, path: '/bursaries', color: '#6366f1', desc: 'Find funding for your education' },
    { title: 'Career Opportunities', icon: <WorkIcon sx={{ fontSize: 40 }} />, path: '/careers', color: '#10b981', desc: 'Jobs, internships & more' },
    { title: 'Learnerships', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, path: '/learnerships', color: '#f59e0b', desc: 'Learn while you earn' },
    { title: 'Business Funding', icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />, path: '/business-funding', color: '#ef4444', desc: 'Grants & startup support' },
    { title: 'Medical Chat', icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />, path: '/medical-chat', color: '#ec4899', desc: 'Health info & support' },
    { title: 'Success Stories', icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />, path: '/success-stories', color: '#8b5cf6', desc: 'Get inspired by peers' },
    { title: 'Events Calendar', icon: <CalendarTodayIcon sx={{ fontSize: 40 }} />, path: '/events', color: '#06b6d4', desc: 'Workshops & meetups' },
    { title: 'Community Forums', icon: <ForumIcon sx={{ fontSize: 40 }} />, path: '/forums', color: '#f97316', desc: 'Connect & discuss' }
  ]

  const stats = [
    { label: 'Active Opportunities', value: '1,250+' },
    { label: 'Registered Users', value: '8,500+' },
    { label: 'Success Stories', value: '340+' },
    { label: 'Partner Organizations', value: '75+' }
  ]

  const featuredOpps = [
    { title: 'National Student Financial Aid Scheme (NSFAS)', category: 'Bursary', deadline: '2025-12-31', type: 'bursary' },
    { title: 'Eastern Cape Youth Employment Program', category: 'Career', deadline: '2025-11-30', type: 'career' },
    { title: 'NYDA Business Grant (R10k - R100k)', category: 'Funding', deadline: '2025-12-15', type: 'business' }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" fontWeight={700} gutterBottom>
                Unlock Your Future in Eastern Cape
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                Discover bursaries, careers, learnerships, business funding, and support tailored for youth. Your journey to success starts here.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={Link} to="/bursaries" variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f3f4f6' } }}>
                  Explore Opportunities
                </Button>
                <Button component={Link} to="/register" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  Get Started Free
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Grid container spacing={3} textAlign="center">
            {stats.map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Typography variant="h4" color="primary" fontWeight={700}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Categories Grid */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          Explore Opportunities & Resources
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
          Everything you need to succeed in one place
        </Typography>
        
        <Grid container spacing={3}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card 
                component={Link} 
                to={cat.path} 
                sx={{ 
                  height: '100%', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ color: cat.color, mb: 2 }}>{cat.icon}</Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>{cat.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{cat.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Opportunities */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Featured Opportunities
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Don't miss out on these trending opportunities
          </Typography>
          
          <Grid container spacing={3}>
            {featuredOpps.map((opp, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card>
                  <CardContent>
                    <Chip label={opp.category} size="small" color="primary" sx={{ mb: 2 }} />
                    <Typography variant="h6" fontWeight={600} gutterBottom>{opp.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Deadline: {new Date(opp.deadline).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={`/${opp.type === 'business' ? 'business-funding' : opp.type === 'bursary' ? 'bursaries' : 'careers'}`} size="small">Learn More</Button>
                    <Button size="small" color="primary">Apply Now</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Ready to Start Your Journey?
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Join thousands of Eastern Cape youth achieving their dreams
        </Typography>
        <Button component={Link} to="/register" variant="contained" size="large">
          Create Free Account
        </Button>
      </Container>
    </Box>
  )
}

export default HomePage

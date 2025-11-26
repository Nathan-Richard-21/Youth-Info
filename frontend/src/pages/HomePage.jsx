import React from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions, Chip, Paper, Fade, Zoom } from '@mui/material'
import { Link } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ForumIcon from '@mui/icons-material/Forum'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BusinessIcon from '@mui/icons-material/Business';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GroupsIcon from '@mui/icons-material/Groups';
import { useLanguage } from '../context/LanguageContext'

const HomePage = () => {
  const { content } = useLanguage()

  const categories = [
    { title: content.categories.bursariesTitle, icon: <SchoolIcon sx={{ fontSize: 40 }} />, path: '/bursaries', color: '#6366f1', desc: content.categories.bursariesDesc },
    { title: content.categories.careersTitle, icon: <WorkIcon sx={{ fontSize: 40 }} />, path: '/careers', color: '#10b981', desc: content.categories.careersDesc },
    { title: content.categories.learnershipsTitle, icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, path: '/learnerships', color: '#f59e0b', desc: content.categories.learnershipsDesc },
    { title: content.categories.businessTitle, icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />, path: '/business-funding', color: '#ef4444', desc: content.categories.businessDesc },
    { title: content.categories.medicalTitle, icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />, path: '/medical-chat', color: '#ec4899', desc: content.categories.medicalDesc },
    { title: content.categories.successTitle, icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />, path: '/success-stories', color: '#8b5cf6', desc: content.categories.successDesc },
    { title: content.categories.eventsTitle, icon: <CalendarTodayIcon sx={{ fontSize: 40 }} />, path: '/events', color: '#06b6d4', desc: content.categories.eventsDesc },
    { title: content.categories.forumsTitle, icon: <ForumIcon sx={{ fontSize: 40 }} />, path: '/forums', color: '#f97316', desc: content.categories.forumsDesc }
  ]

  const stats = [
    { label: content.home.statsTitle1, value: '1,250+' },
    { label: content.home.statsTitle2, value: '8,500+' },
    { label: content.home.statsTitle3, value: '340+' },
    { label: content.home.statsTitle4, value: '75+' }
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
                {content.home.heroTitle}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
                {content.home.heroSubtitle}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button component={Link} to="/bursaries" variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f3f4f6' } }}>
                  {content.home.exploreBtn}
                </Button>
                <Button component={Link} to="/register" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                  {content.home.getStartedBtn}
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

      {/* Stakeholder CTA Section - NEW */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Paper 
            elevation={8}
            sx={{ 
              p: 6, 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease',
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {/* Animated Background Circles */}
            <Box sx={{ 
              position: 'absolute', 
              top: -50, 
              right: -50, 
              width: 200, 
              height: 200, 
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              animation: 'pulse 3s infinite'
            }} />
            <Box sx={{ 
              position: 'absolute', 
              bottom: -30, 
              left: -30, 
              width: 150, 
              height: 150, 
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              animation: 'pulse 3s infinite 1s'
            }} />

            <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ fontSize: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      Are You an Employer?
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.95 }}>
                      Post Jobs & Connect with Talented Youth
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <RocketLaunchIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Post Unlimited Jobs</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GroupsIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Access 8,500+ Youth</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">Advanced Analytics</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Button
                  component={Link}
                  to="/stakeholder-signup"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    '&:hover': {
                      bgcolor: '#f3f4f6',
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  startIcon={<BusinessIcon />}
                >
                  Join as Stakeholder
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.9 }}>
                  Free to get started • No credit card required
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.1; }
            50% { transform: scale(1.1); opacity: 0.2; }
          }
        `}
      </style>

      {/* Categories Grid */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" gutterBottom>
          {content.home.categoriesTitle}
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
          {content.home.categoriesSubtitle}
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
            {content.home.featuredTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {content.home.featuredSubtitle}
          </Typography>
          
          <Grid container spacing={3}>
            {featuredOpps.map((opp, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card>
                  <CardContent>
                    <Chip label={opp.category} size="small" color="primary" sx={{ mb: 2 }} />
                    <Typography variant="h6" fontWeight={600} gutterBottom>{opp.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {content.home.deadline}: {new Date(opp.deadline).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button component={Link} to={`/${opp.type === 'business' ? 'business-funding' : opp.type === 'bursary' ? 'bursaries' : 'careers'}`} size="small">{content.home.learnMore}</Button>
                    <Button size="small" color="primary">{content.home.applyNow}</Button>
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
          {content.home.ctaTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          {content.home.ctaSubtitle}
        </Typography>
        <Button component={Link} to="/register" variant="contained" size="large">
          {content.home.ctaBtn}
        </Button>
      </Container>
    </Box>
  )
}

export default HomePage

import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions, Chip, Paper, Fade, Zoom, Avatar, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import SchoolIcon from '@mui/icons-material/School'
import WorkIcon from '@mui/icons-material/Work'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ForumIcon from '@mui/icons-material/Forum'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BusinessIcon from '@mui/icons-material/Business'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import GroupsIcon from '@mui/icons-material/Groups'
import StarIcon from '@mui/icons-material/Star'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useLanguage } from '../context/LanguageContext'

const HomePage = () => {
  const { content } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const categories = [
    { title: content.categories.bursariesTitle, icon: <SchoolIcon sx={{ fontSize: 48 }} />, path: '/bursaries', color: '#0047AB', desc: content.categories.bursariesDesc, bgGradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' },
    { title: content.categories.careersTitle, icon: <WorkIcon sx={{ fontSize: 48 }} />, path: '/careers', color: '#FF8C00', desc: content.categories.careersDesc, bgGradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)' },
    { title: content.categories.learnershipsTitle, icon: <TrendingUpIcon sx={{ fontSize: 48 }} />, path: '/learnerships', color: '#0047AB', desc: content.categories.learnershipsDesc, bgGradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' },
    { title: content.categories.businessTitle, icon: <BusinessCenterIcon sx={{ fontSize: 48 }} />, path: '/business-funding', color: '#FF8C00', desc: content.categories.businessDesc, bgGradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)' },
    { title: content.categories.medicalTitle, icon: <LocalHospitalIcon sx={{ fontSize: 48 }} />, path: '/medical-chat', color: '#0047AB', desc: content.categories.medicalDesc, bgGradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' },
    { title: content.categories.successTitle, icon: <EmojiEventsIcon sx={{ fontSize: 48 }} />, path: '/success-stories', color: '#FF8C00', desc: content.categories.successDesc, bgGradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)' },
    { title: content.categories.eventsTitle, icon: <CalendarTodayIcon sx={{ fontSize: 48 }} />, path: '/events', color: '#0047AB', desc: content.categories.eventsDesc, bgGradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' },
    { title: content.categories.forumsTitle, icon: <ForumIcon sx={{ fontSize: 48 }} />, path: '/forums', color: '#FF8C00', desc: content.categories.forumsDesc, bgGradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)' }
  ]

  const stats = [
    { label: content.home.statsTitle1, value: '1,250+', icon: <SchoolIcon />, color: '#0047AB' },
    { label: content.home.statsTitle2, value: '8,500+', icon: <GroupsIcon />, color: '#FF8C00' },
    { label: content.home.statsTitle3, value: '340+', icon: <WorkIcon />, color: '#0047AB' },
    { label: content.home.statsTitle4, value: '75+', icon: <CalendarTodayIcon />, color: '#FF8C00' }
  ]

  const featuredOpps = [
    { title: 'National Student Financial Aid Scheme (NSFAS)', category: 'Bursary', deadline: '2025-12-31', type: 'bursary', gradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' },
    { title: 'Eastern Cape Youth Employment Program', category: 'Career', deadline: '2025-11-30', type: 'career', gradient: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)' },
    { title: 'NYDA Business Grant (R10k - R100k)', category: 'Funding', deadline: '2025-12-15', type: 'business', gradient: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)' }
  ]

  const features = [
    { icon: <CheckCircleIcon sx={{ fontSize: 40 }} />, title: 'Verified Opportunities', desc: 'All opportunities are verified and up-to-date' },
    { icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />, title: 'AI-Powered Matching', desc: 'Get personalized opportunity recommendations' },
    { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: 'Community Support', desc: 'Connect with peers and mentors' },
    { icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />, title: 'Career Growth', desc: 'Resources to accelerate your success' }
  ]

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section with Animated Background */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 50%, #FF8C00 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 8s ease infinite',
          color: 'white', 
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80") center/cover',
            opacity: 0.15,
            mixBlendMode: 'overlay'
          }
        }}
      >
        {/* Animated Particles */}
        <Box className="particles-bg">
          {[...Array(15)].map((_, i) => (
            <Box
              key={i}
              className="particle"
              sx={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                background: i % 2 === 0 ? '#FF8C00' : '#ffffff'
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontWeight: 900, 
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      mb: 2,
                      textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                      lineHeight: 1.1
                    }}
                  >
                    {content.home.heroTitle}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.95,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                      fontWeight: 500,
                      fontSize: { xs: '1.1rem', md: '1.3rem' }
                    }}
                  >
                    {content.home.heroSubtitle}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      component={Link} 
                      to="/bursaries" 
                      variant="contained" 
                      size="large"
                      sx={{ 
                        bgcolor: '#FF8C00',
                        color: '#ffffff',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        boxShadow: '0 8px 24px rgba(255, 140, 0, 0.4)',
                        '&:hover': { 
                          bgcolor: '#FF6900',
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 32px rgba(255, 140, 0, 0.5)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                      startIcon={<RocketLaunchIcon />}
                    >
                      {content.home.exploreBtn}
                    </Button>
                    <Button 
                      component={Link} 
                      to="/register" 
                      variant="outlined" 
                      size="large"
                      sx={{ 
                        color: 'white', 
                        borderColor: 'white',
                        borderWidth: 2,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        '&:hover': { 
                          borderColor: '#FF8C00',
                          bgcolor: 'rgba(255, 140, 0, 0.15)',
                          borderWidth: 2,
                          transform: 'translateY(-4px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {content.home.getStartedBtn}
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5}>
              <Zoom in={isVisible} timeout={1200}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
                      animation: 'pulse 3s ease-in-out infinite',
                      borderRadius: '50%'
                    }
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" 
                    alt="Youth Success"
                    style={{
                      width: '100%',
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                      transform: 'perspective(1000px) rotateY(-5deg)',
                      animation: 'float 6s ease-in-out infinite'
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 10 }}>
        <Paper 
          elevation={8} 
          sx={{ 
            p: 4, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '3px solid #FF8C00',
            boxShadow: '0 12px 40px rgba(0, 71, 171, 0.15)'
          }}
        >
          <Grid container spacing={3} textAlign="center">
            {stats.map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Fade in={isVisible} timeout={1000 + i * 200}>
                  <Box>
                    <Box sx={{ 
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: `${stat.color}15`,
                      color: stat.color,
                      mb: 1
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 900,
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 0.5
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            fontWeight={800} 
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #0047AB 0%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Choose ELIDZ-STP Youth Portal?
          </Typography>
          <Box className="section-divider" sx={{ background: 'linear-gradient(90deg, #0047AB 0%, #FF8C00 100%)' }} />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            Your gateway to endless opportunities
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Fade in={isVisible} timeout={1200 + i * 150}>
                <Card 
                  className="hover-lift"
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #0047AB15 0%, #1E90FF15 100%)' : 'linear-gradient(135deg, #FF8C0015 0%, #FF690015 100%)',
                    border: `2px solid ${i % 2 === 0 ? '#0047AB20' : '#FF8C0020'}`,
                    borderRadius: 4
                  }}
                >
                  <Box 
                    sx={{ 
                      color: i % 2 === 0 ? '#0047AB' : '#FF8C00',
                      mb: 2,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Typography 
          variant="h3" 
          textAlign="center" 
          fontWeight={800} 
          sx={{ mb: 2, color: '#0047AB' }}
        >
          Explore Opportunities & Resources
        </Typography>
        <Typography 
          variant="h6" 
          textAlign="center" 
          sx={{ mb: 6, color: '#000' }}
        >
          Everything you need to succeed in one place
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/bursaries"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#0047AB',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <SchoolIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Bursaries & Scholarships
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Find funding for your education
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/careers"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#FF8C00',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <WorkIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Career Opportunities
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Jobs, internships & more
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/learnerships"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#0047AB',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <TrendingUpIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Learnerships
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Learn while you earn
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/business-funding"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#FF8C00',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <BusinessCenterIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Business Funding
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Grants & startup support
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/medical-chat"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#0047AB',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Medical Chat
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Health info & support
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/events"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#FF8C00',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Events Calendar
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Workshops & meetups
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/forums"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#0047AB',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <ForumIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Community Forums
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Connect & discuss
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box 
              component={Link} 
              to="/success-stories"
              sx={{ 
                display: 'block',
                textDecoration: 'none',
                bgcolor: '#FF8C00',
                p: 4,
                borderRadius: 2,
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-10px)' }
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 60, color: '#fff', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                Success Stories
              </Typography>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Get inspired
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stakeholder CTA Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Zoom in={isVisible} timeout={1500}>
          <Paper 
            elevation={12}
            sx={{ 
              p: { xs: 4, md: 6 },
              borderRadius: 5,
              background: 'linear-gradient(135deg, #0047AB 0%, #003380 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              border: '4px solid #FF8C00',
              '&:hover': {
                transform: 'translateY(-8px)',
                transition: 'transform 0.4s ease',
                boxShadow: '0 24px 72px rgba(0, 71, 171, 0.5)'
              },
              transition: 'all 0.4s ease'
            }}
          >
            {/* Animated Background Circles */}
            <Box sx={{ 
              position: 'absolute', 
              top: -80, 
              right: -80, 
              width: 250, 
              height: 250, 
              borderRadius: '50%',
              background: 'rgba(255,140,0,0.15)',
              animation: 'pulse 4s infinite'
            }} />
            <Box sx={{ 
              position: 'absolute', 
              bottom: -50, 
              left: -50, 
              width: 180, 
              height: 180, 
              borderRadius: '50%',
              background: 'rgba(255,140,0,0.1)',
              animation: 'pulse 4s infinite 2s'
            }} />

            <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      bgcolor: '#FF8C00',
                      mr: 3,
                      boxShadow: '0 8px 24px rgba(255,140,0,0.5)'
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 50, color: '#ffffff' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight={900} gutterBottom sx={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
                      Are You an Employer?
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Post Jobs & Connect with Talented Youth
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <RocketLaunchIcon sx={{ mr: 2, fontSize: 32, color: '#FF8C00' }} />
                      <Typography variant="body1" fontWeight={600}>Post Unlimited Jobs</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <GroupsIcon sx={{ mr: 2, fontSize: 32, color: '#FF8C00' }} />
                      <Typography variant="body1" fontWeight={600}>Access 8,500+ Youth</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <TrendingUpIcon sx={{ mr: 2, fontSize: 32, color: '#FF8C00' }} />
                      <Typography variant="body1" fontWeight={600}>Advanced Analytics</Typography>
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
                    bgcolor: '#FF8C00',
                    color: '#ffffff',
                    px: 5,
                    py: 2.5,
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    borderRadius: 4,
                    textTransform: 'none',
                    boxShadow: '0 12px 32px rgba(255,140,0,0.5)',
                    '&:hover': {
                      bgcolor: '#FF6900',
                      transform: 'scale(1.08)',
                      boxShadow: '0 16px 48px rgba(255,140,0,0.6)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  startIcon={<BusinessIcon sx={{ fontSize: 28 }} />}
                >
                  Join as Stakeholder
                </Button>
                <Typography variant="caption" display="block" sx={{ mt: 2, opacity: 0.95, fontWeight: 600 }}>
                  Free to get started • No credit card required
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </Container>

      {/* Featured Opportunities */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h3" 
            fontWeight={800} 
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #0047AB 0%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.home.featuredTitle}
          </Typography>
          <Box className="section-divider" sx={{ background: 'linear-gradient(90deg, #0047AB 0%, #FF8C00 100%)' }} />
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            {content.home.featuredSubtitle}
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {featuredOpps.map((opp, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Fade in={isVisible} timeout={1400 + i * 200}>
                <Card 
                  className="hover-lift"
                  sx={{
                    background: opp.gradient,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -50,
                      right: -50,
                      width: 150,
                      height: 150,
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '50%'
                    }
                  }}
                >
                  <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" spacing={1} mb={2}>
                      <Chip 
                        label={opp.category} 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 700,
                          backdropFilter: 'blur(10px)'
                        }} 
                      />
                      <Chip 
                        icon={<StarIcon sx={{ color: '#FF8C00 !important' }} />}
                        label="Featured" 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 700,
                          backdropFilter: 'blur(10px)'
                        }} 
                      />
                    </Stack>
                    <Typography variant="h5" fontWeight={700} gutterBottom sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                      {opp.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.95 }}>
                      {content.home.deadline}: <strong>{new Date(opp.deadline).toLocaleDateString()}</strong>
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ position: 'relative', zIndex: 1, px: 2, pb: 2 }}>
                    <Button 
                      component={Link} 
                      to={`/${opp.type === 'business' ? 'business-funding' : opp.type === 'bursary' ? 'bursaries' : 'careers'}`}
                      size="large"
                      fullWidth
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        fontWeight: 700,
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.3)'
                        }
                      }}
                    >
                      {content.home.learnMore}
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h3" 
              fontWeight={800} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #0047AB 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              How It Works
            </Typography>
            <Box className="section-divider" sx={{ background: 'linear-gradient(90deg, #0047AB 0%, #FF8C00 100%)' }} />
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Get started in 3 simple steps
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Fade in={isVisible} timeout={1600}>
                <Box textAlign="center">
                  <Box 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'white',
                      fontSize: '3rem',
                      fontWeight: 900,
                      boxShadow: '0 8px 24px rgba(0,71,171,0.3)'
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom color="#0047AB">
                    Create Your Profile
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sign up for free and complete your profile with your skills, education, and career goals.
                  </Typography>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={4}>
              <Fade in={isVisible} timeout={1800}>
                <Box textAlign="center">
                  <Box 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'white',
                      fontSize: '3rem',
                      fontWeight: 900,
                      boxShadow: '0 8px 24px rgba(255,140,0,0.3)'
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom color="#FF8C00">
                    Explore Opportunities
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Browse thousands of bursaries, jobs, learnerships, and business funding opportunities.
                  </Typography>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={4}>
              <Fade in={isVisible} timeout={2000}>
                <Box textAlign="center">
                  <Box 
                    sx={{ 
                      width: 100, 
                      height: 100, 
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      color: 'white',
                      fontSize: '3rem',
                      fontWeight: 900,
                      boxShadow: '0 8px 24px rgba(0,71,171,0.3)'
                    }}
                  >
                    3
                  </Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom color="#0047AB">
                    Apply & Succeed
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Apply directly through our platform and get support from our community and resources.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h3" 
              fontWeight={800} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #0047AB 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Success Stories
            </Typography>
            <Box className="section-divider" sx={{ background: 'linear-gradient(90deg, #0047AB 0%, #FF8C00 100%)' }} />
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Hear from youth who found their path
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Zoom in={isVisible} timeout={1800}>
                <Card 
                  className="hover-lift"
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #0047AB 0%, #1E90FF 100%)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[1,2,3,4,5].map((star) => (
                        <StarIcon key={star} sx={{ color: '#FF8C00', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "Thanks to ELIDZ-STP Youth Portal, I found a bursary that covered my entire engineering degree. Now I'm working at a top company!"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#0047AB', mr: 2 }}>TM</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Thando Mkhize</Typography>
                        <Typography variant="caption" color="text.secondary">Mechanical Engineer</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom in={isVisible} timeout={2000}>
                <Card 
                  className="hover-lift"
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #FF8C00 0%, #FF6900 100%)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[1,2,3,4,5].map((star) => (
                        <StarIcon key={star} sx={{ color: '#FF8C00', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "I got my first job through this portal! The application process was easy and the support was amazing."
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#FF8C00', mr: 2 }}>SN</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Sipho Ndlovu</Typography>
                        <Typography variant="caption" color="text.secondary">IT Developer</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom in={isVisible} timeout={2200}>
                <Card 
                  className="hover-lift"
                  sx={{ 
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, #0047AB 0%, #1E90FF 100%)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {[1,2,3,4,5].map((star) => (
                        <StarIcon key={star} sx={{ color: '#FF8C00', fontSize: 20 }} />
                      ))}
                    </Box>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                      "The NYDA business grant I found here helped me start my own business. Forever grateful!"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#0047AB', mr: 2 }}>LM</Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700}>Luyanda Majola</Typography>
                        <Typography variant="caption" color="text.secondary">Business Owner</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)',
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80") center/cover',
            opacity: 0.1,
            mixBlendMode: 'overlay'
          }
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" fontWeight={900} gutterBottom sx={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            {content.home.ctaTitle}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: '#ffffff', fontWeight: 500, opacity: 0.95 }}>
            {content.home.ctaSubtitle}
          </Typography>
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            size="large"
            sx={{
              bgcolor: '#0047AB',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 800,
              borderRadius: 4,
              boxShadow: '0 12px 32px rgba(0,71,171,0.4)',
              '&:hover': {
                bgcolor: '#003380',
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 48px rgba(0,71,171,0.5)'
              },
              transition: 'all 0.3s ease'
            }}
            startIcon={<RocketLaunchIcon />}
          >
            {content.home.ctaBtn}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage

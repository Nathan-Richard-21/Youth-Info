import React from 'react'
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #0047AB 0%, #003380 100%)', 
        color: 'white', 
        py: 8, 
        mt: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF8C00 0%, #FF6900 50%, #FF8C00 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient-shift 3s ease infinite'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src="/ELIDZ-STP LOGO.png" 
                alt="ELIDZ-STP Logo" 
                style={{ 
                  height: '60px', 
                  marginRight: '12px',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                }} 
              />
              <Box>
                <Typography variant="h6" gutterBottom fontWeight={800} sx={{ lineHeight: 1.2 }}>
                  ELIDZ-STP
                </Typography>
                <Typography variant="body2" sx={{ color: '#FF8C00', fontWeight: 600 }}>
                  Youth Portal
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 2, lineHeight: 1.6 }}>
              East London Industrial Development Zone - Science & Technology Park empowering Eastern Cape youth with opportunities, resources, and support for a brighter future.
            </Typography>
            <Box>
              <IconButton 
                sx={{ 
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 140, 0, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 140, 0, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
                  },
                  transition: 'all 0.3s ease',
                  mr: 1
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 140, 0, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 140, 0, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
                  },
                  transition: 'all 0.3s ease',
                  mr: 1
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 140, 0, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 140, 0, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
                  },
                  transition: 'all 0.3s ease',
                  mr: 1
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 140, 0, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 140, 0, 0.2)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              fontWeight={700} 
              sx={{ 
                color: '#FF8C00',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  bgcolor: '#FF8C00'
                }
              }}
            >
              Opportunities
            </Typography>
            <MuiLink 
              component={Link} 
              to="/bursaries" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Bursaries
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/careers" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Careers
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/learnerships" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Learnerships
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/business-funding" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Business Funding
            </MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              fontWeight={700} 
              sx={{ 
                color: '#FF8C00',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  bgcolor: '#FF8C00'
                }
              }}
            >
              Resources
            </Typography>
            <MuiLink 
              component={Link} 
              to="/medical-chat" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Medical Chat
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/resume-builder" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Resume Builder
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/knowledge-base" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Knowledge Base
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/forums" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Forums
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/coach" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Career Coach
            </MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              fontWeight={700} 
              sx={{ 
                color: '#FF8C00',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  bgcolor: '#FF8C00'
                }
              }}
            >
              Community
            </Typography>
            <MuiLink 
              component={Link} 
              to="/success-stories" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Success Stories
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/events" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Events
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/faq" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Help Center
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/faq" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Contact Us
            </MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography 
              variant="subtitle1" 
              gutterBottom 
              fontWeight={700} 
              sx={{ 
                color: '#FF8C00',
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40px',
                  height: '2px',
                  bgcolor: '#FF8C00'
                }
              }}
            >
              About
            </Typography>
            <MuiLink 
              component={Link} 
              to="/faq" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              About Us
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/faq" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              FAQ
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/terms-and-privacy" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Terms & Privacy
            </MuiLink>
            <MuiLink 
              component={Link} 
              to="/faq" 
              sx={{ 
                color: 'rgba(255,255,255,0.85)', 
                display: 'block', 
                mb: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: '#FF8C00',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Contact Support
            </MuiLink>
          </Grid>
        </Grid>
        
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255, 140, 0, 0.2)', 
            mt: 5, 
            pt: 4, 
            textAlign: 'center' 
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mb: 1 }}>
            © 2025 ELIDZ-STP Youth Portal. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#FF8C00', fontWeight: 600 }}>
            Empowering Eastern Cape Youth | Powered by ELIDZ Science & Technology Park
          </Typography>
        </Box>
      </Container>

      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  )
}

export default Footer

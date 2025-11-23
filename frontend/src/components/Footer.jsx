import React from 'react'
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>YouthPortal EC</Typography>
            <Typography variant="body2" color="grey.400" mb={2}>
              Empowering Eastern Cape youth with opportunities, resources, and support for a brighter future.
            </Typography>
            <Box>
              <IconButton color="inherit" size="small"><FacebookIcon /></IconButton>
              <IconButton color="inherit" size="small"><TwitterIcon /></IconButton>
              <IconButton color="inherit" size="small"><InstagramIcon /></IconButton>
              <IconButton color="inherit" size="small"><LinkedInIcon /></IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Opportunities</Typography>
            <MuiLink component={Link} to="/bursaries" color="grey.400" display="block" mb={1}>Bursaries</MuiLink>
            <MuiLink component={Link} to="/careers" color="grey.400" display="block" mb={1}>Careers</MuiLink>
            <MuiLink component={Link} to="/learnerships" color="grey.400" display="block" mb={1}>Learnerships</MuiLink>
            <MuiLink component={Link} to="/business-funding" color="grey.400" display="block" mb={1}>Business Funding</MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Resources</Typography>
            <MuiLink component={Link} to="/medical-chat" color="grey.400" display="block" mb={1}>Medical Chat</MuiLink>
            <MuiLink component={Link} to="/resume-builder" color="grey.400" display="block" mb={1}>Resume Builder</MuiLink>
            <MuiLink component={Link} to="/knowledge-base" color="grey.400" display="block" mb={1}>Knowledge Base</MuiLink>
            <MuiLink component={Link} to="/forums" color="grey.400" display="block" mb={1}>Forums</MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>Community</Typography>
            <MuiLink component={Link} to="/success-stories" color="grey.400" display="block" mb={1}>Success Stories</MuiLink>
            <MuiLink component={Link} to="/events" color="grey.400" display="block" mb={1}>Events</MuiLink>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>Partners</MuiLink>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>Contact Us</MuiLink>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight={600}>About</Typography>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>About Us</MuiLink>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>Privacy Policy</MuiLink>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>Terms of Service</MuiLink>
            <MuiLink href="#" color="grey.400" display="block" mb={1}>Help Center</MuiLink>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="grey.400">
            © 2025 YouthPortal EC. All rights reserved. | Empowering Eastern Cape Youth
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer

import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { Box, useMediaQuery, useTheme } from '@mui/material'

const NavBar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState(null)
  const token = localStorage.getItem('token')
  
  const logout = () => { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const pages = [
    { label: 'Bursaries', path: '/bursaries' },
    { label: 'Careers', path: '/careers' },
    { label: 'Learnerships', path: '/learnerships' },
    { label: 'Business Funding', path: '/business-funding' },
    { label: 'Medical Chat', path: '/medical-chat' },
    { label: 'Success Stories', path: '/success-stories' },
    { label: 'Events', path: '/events' },
    { label: 'Forums', path: '/forums' }
  ]

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', color: 'primary.main', borderBottom: '1px solid #e5e7eb' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 0, fontWeight: 700, mr: 4 }} component={Link} to="/" style={{ color: '#6366f1', textDecoration: 'none' }}>
          YouthPortal EC
        </Typography>
        
        {isMobile ? (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MenuIcon /></IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {pages.map(p => <MenuItem key={p.path} component={Link} to={p.path} onClick={() => setAnchorEl(null)}>{p.label}</MenuItem>)}
              {token ? (
                <>
                  <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                  <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={() => setAnchorEl(null)}>Login</MenuItem>
                  <MenuItem component={Link} to="/register" onClick={() => setAnchorEl(null)}>Sign Up</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {pages.map(p => <Button key={p.path} component={Link} to={p.path} sx={{ color: 'text.primary', textTransform: 'none' }}>{p.label}</Button>)}
            </Box>
            {token ? (
              <>
                <Button component={Link} to="/profile" variant="outlined" sx={{ mr: 1 }}>Profile</Button>
                <Button onClick={logout} variant="text">Logout</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="outlined" sx={{ mr: 1 }}>Login</Button>
                <Button component={Link} to="/register" variant="contained">Sign Up</Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

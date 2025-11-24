import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate'
import { Link, useNavigate } from 'react-router-dom'
import { Box, useMediaQuery, useTheme, Tooltip } from '@mui/material'
import { useLanguage } from '../context/LanguageContext'

const NavBar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [anchorEl, setAnchorEl] = useState(null)
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role === 'admin'
  const { content, toggleLanguage, language } = useLanguage()
  
  const logout = () => { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const pages = [
    { label: content.nav.bursaries, path: '/bursaries' },
    { label: content.nav.careers, path: '/careers' },
    { label: content.nav.learnerships, path: '/learnerships' },
    { label: content.nav.businessFunding, path: '/business-funding' },
    { label: content.nav.medicalChat, path: '/medical-chat' },
    { label: content.nav.successStories, path: '/success-stories' },
    { label: content.nav.events, path: '/events' },
    { label: content.nav.forums, path: '/forums' }
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
            <Tooltip title={language === 'en' ? 'Switch to isiXhosa' : 'Tshintshela kuIsiNgesi'}>
              <IconButton onClick={toggleLanguage} color="primary">
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}><MenuIcon /></IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {pages.map(p => <MenuItem key={p.path} component={Link} to={p.path} onClick={() => setAnchorEl(null)}>{p.label}</MenuItem>)}
              {token ? (
                <>
                  <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>{content.nav.profile}</MenuItem>
                  {isAdmin && <MenuItem component={Link} to="/admin" onClick={() => setAnchorEl(null)}>Admin Dashboard</MenuItem>}
                  <MenuItem onClick={() => { logout(); setAnchorEl(null); }}>{content.nav.logout}</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={() => setAnchorEl(null)}>{content.nav.login}</MenuItem>
                  <MenuItem component={Link} to="/register" onClick={() => setAnchorEl(null)}>{content.nav.signup}</MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {pages.map(p => <Button key={p.path} component={Link} to={p.path} sx={{ color: 'text.primary', textTransform: 'none' }}>{p.label}</Button>)}
            </Box>
            <Tooltip title={language === 'en' ? 'Switch to isiXhosa' : 'Tshintshela kuIsiNgesi'}>
              <IconButton onClick={toggleLanguage} color="primary" sx={{ mr: 1 }}>
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            {token ? (
              <>
                <Button component={Link} to="/profile" variant="outlined" sx={{ mr: 1 }}>{content.nav.profile}</Button>
                {isAdmin && <Button component={Link} to="/admin" variant="outlined" sx={{ mr: 1 }}>Admin</Button>}
                <Button onClick={logout} variant="text">{content.nav.logout}</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" variant="outlined" sx={{ mr: 1 }}>{content.nav.login}</Button>
                <Button component={Link} to="/register" variant="contained">{content.nav.signup}</Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

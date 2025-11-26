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
import SettingsIcon from '@mui/icons-material/Settings'
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
  const isStakeholder = user.role === 'stakeholder'
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
    { label: 'FAQ', path: '/faq' },
    { label: content.nav.medicalChat, path: '/medical-chat' },
    { label: content.nav.successStories, path: '/success-stories' },
    { label: content.nav.events, path: '/events' },
    { label: content.nav.forums, path: '/forums' },
    { label: language === 'en' ? 'Terms & Privacy' : 'Imiqathango Nobumfihlo', path: '/terms-and-privacy' }
  ]

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'linear-gradient(90deg, #0047AB 0%, #1E90FF 50%, #FF8C00 100%)',
        color: 'white',
        borderBottom: '3px solid #FF8C00',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 16px rgba(0, 71, 171, 0.2)'
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            mr: 4,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          <img 
            src="/ELIDZ-STP LOGO.png" 
            alt="ELIDZ-STP Logo" 
            style={{ 
              height: '50px', 
              marginRight: '12px',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
            }} 
          />
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                lineHeight: 1.2,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              ELIDZ-STP
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#FF8C00',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', md: '0.75rem' },
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Youth Portal
            </Typography>
          </Box>
        </Box>
        
        {isMobile ? (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title={language === 'en' ? 'Switch to isiXhosa' : 'Tshintshela kuIsiNgesi'}>
              <IconButton 
                onClick={toggleLanguage} 
                sx={{ 
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { bgcolor: 'rgba(255, 140, 0, 0.2)' }
                }}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            {isAdmin && (
              <Tooltip title="Admin Settings (DEV)">
                <IconButton 
                  component={Link} 
                  to="/admin/settings" 
                  sx={{ 
                    color: '#FF8C00',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    ml: 1,
                    '&:hover': { bgcolor: 'rgba(255, 140, 0, 0.2)' }
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton 
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                ml: 1,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 71, 171, 0.2)'
                }
              }}
            >
              {pages.map(p => (
                <MenuItem 
                  key={p.path} 
                  component={Link} 
                  to={p.path} 
                  onClick={() => setAnchorEl(null)}
                  sx={{ 
                    '&:hover': { 
                      bgcolor: 'rgba(0, 71, 171, 0.08)',
                      color: '#0047AB'
                    }
                  }}
                >
                  {p.label}
                </MenuItem>
              ))}
              {token ? (
                <>
                  <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>{content.nav.profile}</MenuItem>
                  {isAdmin && <MenuItem component={Link} to="/admin" onClick={() => setAnchorEl(null)}>Admin Dashboard</MenuItem>}
                  {isStakeholder && <MenuItem component={Link} to="/stakeholder" onClick={() => setAnchorEl(null)}>Stakeholder Dashboard</MenuItem>}
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
            <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
              {pages.map(p => (
                <Button 
                  key={p.path} 
                  component={Link} 
                  to={p.path} 
                  sx={{ 
                    color: 'white', 
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 1.5,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      color: '#FF8C00',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </Box>
            <Tooltip title={language === 'en' ? 'Switch to isiXhosa' : 'Tshintshela kuIsiNgesi'}>
              <IconButton 
                onClick={toggleLanguage} 
                sx={{ 
                  mr: 1,
                  color: '#FF8C00',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(255, 140, 0, 0.2)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            {token ? (
              <>
                <Button 
                  component={Link} 
                  to="/profile" 
                  variant="outlined" 
                  sx={{ 
                    mr: 1,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: '#FF8C00',
                      bgcolor: 'rgba(255, 140, 0, 0.1)',
                      color: '#FF8C00'
                    }
                  }}
                >
                  {content.nav.profile}
                </Button>
                {isAdmin && (
                  <>
                    <Button 
                      component={Link} 
                      to="/admin" 
                      variant="outlined" 
                      sx={{ 
                        mr: 1,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: '#FF8C00',
                          bgcolor: 'rgba(255, 140, 0, 0.1)',
                          color: '#FF8C00'
                        }
                      }}
                    >
                      Admin
                    </Button>
                    <Tooltip title="Admin Settings (DEV)">
                      <IconButton 
                        component={Link} 
                        to="/admin/settings" 
                        sx={{ 
                          mr: 1,
                          color: '#FF8C00',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': { bgcolor: 'rgba(255, 140, 0, 0.2)' }
                        }}
                      >
                        <SettingsIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                {isStakeholder && (
                  <Button 
                    component={Link} 
                    to="/stakeholder" 
                    variant="outlined" 
                    sx={{ 
                      mr: 1,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: '#FF8C00',
                        bgcolor: 'rgba(255, 140, 0, 0.1)',
                        color: '#FF8C00'
                      }
                    }}
                  >
                    Dashboard
                  </Button>
                )}
                <Button 
                  onClick={logout} 
                  variant="text"
                  sx={{ 
                    color: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(239, 68, 68, 0.2)',
                      color: '#FF8C00'
                    }
                  }}
                >
                  {content.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="outlined" 
                  sx={{ 
                    mr: 1,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: '#FF8C00',
                      bgcolor: 'rgba(255, 140, 0, 0.1)',
                      color: '#FF8C00'
                    }
                  }}
                >
                  {content.nav.login}
                </Button>
                <Button 
                  component={Link} 
                  to="/register" 
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF6900 0%, #FF5500 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 140, 0, 0.5)'
                    }
                  }}
                >
                  {content.nav.signup}
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

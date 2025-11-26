import React, { useEffect, useState } from 'react'
import { 
  TextField, Button, Box, Typography, Container, Paper, Grid, Avatar, 
  Card, CardContent, Chip, Divider, Tab, Tabs, List, ListItem, ListItemText,
  ListItemIcon, IconButton, Alert, CircularProgress, Switch, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent,
  DialogActions, TextareaAutosize
} from '@mui/material'
import { 
  Person, Email, Phone, LocationOn, School, Work, Edit, Save, 
  Cancel, Notifications, Security, Dashboard, History, Bookmark,
  TrendingUp, Business, Settings, Delete, OpenInNew, Chat, Send, AutoAwesome
} from '@mui/icons-material'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'
import { useNavigate } from 'react-router-dom'
import AICareerAssistant from '../components/AICareerAssistant'

// 🟢🟢🟢 PROFILENEW.JSX - UPDATED WITH AI CAREER ASSISTANT 🟢🟢🟢
console.log('🟢🟢🟢 ProfileNew.jsx LOADED - AI Career Assistant Integration 🟢🟢🟢')

const Profile = () => {
  console.log('🟢 ProfileNew component rendering')
  const { content } = useLanguage()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [editedUser, setEditedUser] = useState({})
  const [savedOpportunities, setSavedOpportunities] = useState([])
  const [applications, setApplications] = useState([])
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    bursaryAlerts: true,
    preferredCategories: []
  })

  // Chatbot state
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const [userRes, savedRes, appsRes] = await Promise.all([
        api.get('/users/me'),
        api.get('/users/me/saved'),
        api.get('/users/me/applications')
      ])
      
      setUser(userRes.data)
      setEditedUser(userRes.data)
      setSavedOpportunities(savedRes.data || [])
      setApplications(appsRes.data || [])
      
      if (userRes.data.preferences) {
        setPreferences(userRes.data.preferences)
      }
    } catch (err) {
      console.error('Error loading user data:', err)
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.')
        navigate('/login')
      }
    } finally { 
      setLoading(false) 
    }
  }

  const handleSave = async () => {
    try {
      const res = await api.put('/users/me', editedUser)
      setUser(res.data)
      setEditedUser(res.data)
      localStorage.setItem('user', JSON.stringify(res.data))
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (err) { 
      alert('Failed to save profile. Please try again.') 
    }
  }

  const handleCancel = () => {
    setEditedUser(user)
    setEditing(false)
  }

  const handleRemoveSaved = async (oppId) => {
    if (!confirm('Remove this opportunity from saved?')) return
    try {
      await api.delete(`/opportunities/${oppId}/save`)
      setSavedOpportunities(savedOpportunities.filter(o => o._id !== oppId))
      alert('Removed from saved')
    } catch (err) {
      alert('Failed to remove')
    }
  }

  const handleApplyFromProfile = (opp) => {
    // If external URL, open it
    if (opp.applyUrl) {
      window.open(opp.applyUrl, '_blank')
    } else {
      // Navigate to the category page
      navigate(`/${opp.category}`)
    }
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setChatLoading(true)

    try {
      // Call OpenAI API via backend
      const response = await api.post('/chat/gpt', {
        message: chatInput,
        history: chatMessages
      })
      
      const botMessage = { role: 'assistant', content: response.data.message }
      setChatMessages(prev => [...prev, botMessage])
    } catch (err) {
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }
      setChatMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'under review': return 'info'
      case 'rejected': return 'error'
      default: return 'default'
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Alert severity="error">Failed to load user data. Please try again.</Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, bgcolor: 'primary.main', opacity: 0.1 }} />
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar 
              src={user.picture || ''} 
              sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight={700}>{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={user.role || 'User'} color="primary" size="small" />
                {user.educationLevel && <Chip label={user.educationLevel} size="small" variant="outlined" />}
              </Box>
            </Box>
            {!editing ? (
              <Button variant="contained" startIcon={<Edit />} onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" startIcon={<Save />} onClick={handleSave}>Save</Button>
                <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancel}>Cancel</Button>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => {
              console.log('🔵 Tab changed to:', v)
              setActiveTab(v)
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<Dashboard />} label="Dashboard" />
            <Tab icon={<Person />} label="Profile Info" />
            <Tab icon={<Bookmark />} label={`Saved (${savedOpportunities.length})`} />
            <Tab icon={<TrendingUp />} label={`Applications (${applications.length})`} />
            <Tab 
              icon={<AutoAwesome />} 
              label="✨ AI Career Assistant" 
              sx={{ 
                fontWeight: 700,
                color: 'primary.main',
                '&.Mui-selected': {
                  color: 'primary.main',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                }
              }}
            />
            <Tab icon={<Settings />} label="Settings" />
          </Tabs>
        </Paper>

        {console.log('🔵 Current activeTab:', activeTab)}

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12} md={4} key="saved-card">
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Bookmark sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Saved</Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="primary.main">
                    {savedOpportunities.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Saved opportunities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} key="applied-card">
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="h6">Applied</Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="success.main">
                    {applications.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active applications
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} key="opportunities-card">
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Notifications sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="h6">Opportunities</Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="warning.main">
                    {savedOpportunities.length + applications.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total tracked
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} key="recent-activity">
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Applications
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {applications.length === 0 ? (
                    <Alert severity="info">No applications yet</Alert>
                  ) : (
                    <List>
                      {applications.slice(0, 5).map((app, idx) => (
                        <ListItem key={app._id || idx}>
                          <ListItemIcon><TrendingUp color="success" /></ListItemIcon>
                          <ListItemText 
                            primary={`Applied to ${app.opportunity?.title || 'Opportunity'}`}
                            secondary={new Date(app.createdAt).toLocaleDateString()}
                          />
                          <Chip 
                            label={app.status || 'Pending'} 
                            size="small" 
                            color={getStatusColor(app.status)}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Personal Information
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={editedUser.name || ''}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  disabled={!editing}
                  InputProps={{ startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  value={editedUser.email || ''}
                  disabled
                  InputProps={{ startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={editedUser.phone || ''}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  disabled={!editing}
                  InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={editedUser.location || ''}
                  onChange={(e) => setEditedUser({...editedUser, location: e.target.value})}
                  disabled={!editing}
                  InputProps={{ startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Education Level"
                  value={editedUser.educationLevel || ''}
                  onChange={(e) => setEditedUser({...editedUser, educationLevel: e.target.value})}
                  disabled={!editing}
                  InputProps={{ startAdornment: <School sx={{ mr: 1, color: 'text.secondary' }} /> }}
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="high-school">High School</MenuItem>
                  <MenuItem value="matric">Matric</MenuItem>
                  <MenuItem value="undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="postgraduate">Postgraduate</MenuItem>
                  <MenuItem value="tvet">TVET</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Employment Status"
                  value={editedUser.employmentStatus || ''}
                  onChange={(e) => setEditedUser({...editedUser, employmentStatus: e.target.value})}
                  disabled={!editing}
                  InputProps={{ startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} /> }}
                >
                  <MenuItem value="">Select...</MenuItem>
                  <MenuItem value="unemployed">Unemployed</MenuItem>
                  <MenuItem value="employed">Employed</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="self-employed">Self-Employed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio / About Me"
                  value={editedUser.bio || ''}
                  onChange={(e) => setEditedUser({...editedUser, bio: e.target.value})}
                  disabled={!editing}
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself, your goals, and interests..."
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Saved Opportunities ({savedOpportunities.length})
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            {savedOpportunities.length === 0 ? (
              <Alert severity="info">You haven't saved any opportunities yet.</Alert>
            ) : (
              <Grid container spacing={2}>
                {savedOpportunities.map(opp => (
                  <Grid item xs={12} key={opp._id}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={8}>
                            <Typography variant="h6" fontWeight={600}>
                              {opp.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {opp.organization}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                              <Chip label={opp.category} size="small" color="primary" />
                              {opp.closingDate && (
                                <Chip 
                                  label={`Closes: ${new Date(opp.closingDate).toLocaleDateString()}`} 
                                  size="small" 
                                  variant="outlined" 
                                />
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button 
                              variant="contained" 
                              size="small"
                              onClick={() => handleApplyFromProfile(opp)}
                              endIcon={opp.applyUrl ? <OpenInNew /> : null}
                            >
                              Apply
                            </Button>
                            <IconButton 
                              color="error" 
                              size="small"
                              onClick={() => handleRemoveSaved(opp._id)}
                            >
                              <Delete />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              My Applications ({applications.length})
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            {applications.length === 0 ? (
              <Alert severity="info">You haven't applied to any opportunities yet.</Alert>
            ) : (
              <Grid container spacing={2}>
                {applications.map(app => (
                  <Grid item xs={12} key={app._id}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={9}>
                            <Typography variant="h6" fontWeight={600}>
                              {app.opportunity?.title || 'Opportunity'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {app.opportunity?.organization || 'Organization'}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                              <Chip 
                                label={app.opportunity?.category || 'General'} 
                                size="small" 
                                color="primary" 
                              />
                              <Chip 
                                label={app.status || 'Pending'} 
                                size="small" 
                                color={getStatusColor(app.status)}
                              />
                              <Chip 
                                label={`Applied: ${new Date(app.createdAt).toLocaleDateString()}`} 
                                size="small" 
                                variant="outlined" 
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
                            <Chip 
                              label={app.status || 'Under Review'} 
                              color={getStatusColor(app.status)}
                              sx={{ fontWeight: 600 }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        )}

        {/* AI Career Assistant Tab - REPLACED OLD CHATBOT */}
        {activeTab === 4 && (
          <Grid container spacing={3}>
            {console.log('🟢🟢🟢 AI CAREER ASSISTANT TAB RENDERING! 🟢🟢🟢')}
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
                  🚀 AI Career Assistant - NEW & IMPROVED!
                </Typography>
                <Typography variant="body1" color="white" sx={{ opacity: 0.95 }}>
                  Click the button below to access 10 powerful career tools: CV creation, interview prep, study plans, and more!
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              {console.log('🟢 Rendering AICareerAssistant component with user:', user)}
              <AICareerAssistant user={user} />
            </Grid>
          </Grid>
        )}

        {activeTab === 5 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Notification Settings
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <FormControlLabel
              control={<Switch checked={preferences.emailNotifications} onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)} />}
              label="Email Notifications"
            />
            <FormControlLabel
              control={<Switch checked={preferences.jobAlerts} onChange={(e) => handlePreferenceChange('jobAlerts', e.target.checked)} />}
              label="Job Alerts"
            />
            <FormControlLabel
              control={<Switch checked={preferences.bursaryAlerts} onChange={(e) => handlePreferenceChange('bursaryAlerts', e.target.checked)} />}
              label="Bursary Alerts"
            />
          </Paper>
        )}
      </Container>
    </Box>
  )
}

const handlePreferenceChange = () => {}

export default Profile

import React, { useEffect, useState } from 'react'
import { 
  TextField, Button, Box, Typography, Container, Paper, Grid, Avatar, 
  Card, CardContent, Chip, Divider, Tab, Tabs, List, ListItem, ListItemText,
  ListItemIcon, IconButton, Alert, CircularProgress, Switch, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material'
import { 
  Person, Email, Phone, LocationOn, School, Work, Edit, Save, 
  Cancel, Notifications, Security, Dashboard, History, Bookmark,
  TrendingUp, Business, Settings
} from '@mui/icons-material'
import api from '../api'
import { useLanguage } from '../context/LanguageContext'

const Profile = () => {
  const { content } = useLanguage()
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

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const res = await api.get('/users/me')
      setUser(res.data)
      setEditedUser(res.data)
      
      // Load user's saved opportunities and applications (mock data for now)
      setSavedOpportunities([
        { id: 1, title: 'NSFAS Bursary 2026', category: 'Bursary', savedDate: '2025-11-20', deadline: '2025-12-31' },
        { id: 2, title: 'EC Youth Employment Program', category: 'Career', savedDate: '2025-11-19', deadline: '2025-11-30' },
        { id: 3, title: 'NYDA Business Grant', category: 'Funding', savedDate: '2025-11-18', deadline: '2025-12-15' }
      ])
      
      setApplications([
        { id: 1, title: 'NSFAS Bursary 2026', status: 'Under Review', appliedDate: '2025-11-15', category: 'Bursary' },
        { id: 2, title: 'Software Developer Internship', status: 'Approved', appliedDate: '2025-11-10', category: 'Career' },
        { id: 3, title: 'Youth Learnership Programme', status: 'Pending', appliedDate: '2025-11-05', category: 'Learnership' }
      ])
      
      // Load user preferences from localStorage or API
      const savedPrefs = localStorage.getItem('userPreferences')
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs))
      }
    } catch (err) {
      console.error(err)
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

  const handlePreferenceChange = (key, value) => {
    const newPrefs = { ...preferences, [key]: value }
    setPreferences(newPrefs)
    localStorage.setItem('userPreferences', JSON.stringify(newPrefs))
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
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
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="warning">Please login to view your profile.</Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Paper elevation={0} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar 
                sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}
              >
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {user.name || 'User'}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user.email}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label={user.role === 'admin' ? 'Administrator' : 'User'} color="primary" size="small" />
                <Chip label={`Joined ${new Date(user.createdAt).toLocaleDateString()}`} variant="outlined" size="small" />
              </Box>
            </Grid>
            <Grid item>
              {!editing ? (
                <Button 
                  variant="contained" 
                  startIcon={<Edit />}
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>

        {/* Tabs Navigation */}
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<Dashboard />} iconPosition="start" label="Overview" />
            <Tab icon={<Person />} iconPosition="start" label="Personal Info" />
            <Tab icon={<Bookmark />} iconPosition="start" label="Saved Opportunities" />
            <Tab icon={<History />} iconPosition="start" label="Applications" />
            <Tab icon={<Settings />} iconPosition="start" label="Preferences" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Quick Stats */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Bookmark sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6">Saved</Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {savedOpportunities.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Opportunities saved
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Notifications sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="h6">Alerts</Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} color="warning.main">
                    5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    New opportunities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Activity
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    <ListItem>
                      <ListItemIcon><Bookmark color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Saved NSFAS Bursary 2026" 
                        secondary="2 days ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><TrendingUp color="success" /></ListItemIcon>
                      <ListItemText 
                        primary="Applied for Software Developer Internship" 
                        secondary="1 week ago"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Edit color="info" /></ListItemIcon>
                      <ListItemText 
                        primary="Updated profile information" 
                        secondary="2 weeks ago"
                      />
                    </ListItem>
                  </List>
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
                  label="Education Level"
                  value={editedUser.educationLevel || ''}
                  onChange={(e) => setEditedUser({...editedUser, educationLevel: e.target.value})}
                  disabled={!editing}
                  select
                  InputProps={{ startAdornment: <School sx={{ mr: 1, color: 'text.secondary' }} /> }}
                >
                  <MenuItem value="high-school">High School</MenuItem>
                  <MenuItem value="matric">Matric</MenuItem>
                  <MenuItem value="undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="postgraduate">Postgraduate</MenuItem>
                  <MenuItem value="tvet">TVET College</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Employment Status"
                  value={editedUser.employmentStatus || ''}
                  onChange={(e) => setEditedUser({...editedUser, employmentStatus: e.target.value})}
                  disabled={!editing}
                  select
                  InputProps={{ startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} /> }}
                >
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills & Interests"
                  value={editedUser.skills || ''}
                  onChange={(e) => setEditedUser({...editedUser, skills: e.target.value})}
                  disabled={!editing}
                  placeholder="e.g., Programming, Design, Business Management..."
                  helperText="Separate skills with commas"
                />
              </Grid>
            </Grid>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Saved Opportunities
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            {savedOpportunities.length === 0 ? (
              <Alert severity="info">You haven't saved any opportunities yet.</Alert>
            ) : (
              <Grid container spacing={2}>
                {savedOpportunities.map(opp => (
                  <Grid item xs={12} key={opp.id}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs>
                            <Typography variant="h6" fontWeight={600}>
                              {opp.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip label={opp.category} size="small" color="primary" />
                              <Chip label={`Deadline: ${new Date(opp.deadline).toLocaleDateString()}`} size="small" variant="outlined" />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Button variant="contained" size="small">Apply Now</Button>
                            <Button variant="outlined" size="small" sx={{ ml: 1 }}>Remove</Button>
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
              My Applications
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            {applications.length === 0 ? (
              <Alert severity="info">You haven't applied to any opportunities yet.</Alert>
            ) : (
              <Grid container spacing={2}>
                {applications.map(app => (
                  <Grid item xs={12} key={app.id}>
                    <Card variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs>
                            <Typography variant="h6" fontWeight={600}>
                              {app.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip label={app.category} size="small" color="primary" />
                              <Chip 
                                label={app.status} 
                                size="small" 
                                color={getStatusColor(app.status)}
                              />
                              <Chip 
                                label={`Applied: ${new Date(app.appliedDate).toLocaleDateString()}`} 
                                size="small" 
                                variant="outlined" 
                              />
                            </Box>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" size="small">View Details</Button>
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

        {activeTab === 4 && (
          <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Notification Preferences
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Notification Settings</Typography>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={preferences.emailNotifications}
                      onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                    />
                  }
                  label="Email Notifications"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                  Receive updates about opportunities via email
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={preferences.smsNotifications}
                      onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                    />
                  }
                  label="SMS Notifications"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                  Receive urgent updates via SMS
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Alert Preferences</Typography>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={preferences.jobAlerts}
                      onChange={(e) => handlePreferenceChange('jobAlerts', e.target.checked)}
                    />
                  }
                  label="Job & Career Alerts"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                  Get notified about new job and career opportunities
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch 
                      checked={preferences.bursaryAlerts}
                      onChange={(e) => handlePreferenceChange('bursaryAlerts', e.target.checked)}
                    />
                  }
                  label="Bursary & Funding Alerts"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
                  Get notified about new bursaries and funding opportunities
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Content Preferences</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select categories you're interested in to get personalized recommendations
                </Typography>
                
                <FormControl fullWidth>
                  <InputLabel>Preferred Categories</InputLabel>
                  <Select
                    multiple
                    value={preferences.preferredCategories}
                    onChange={(e) => handlePreferenceChange('preferredCategories', e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="Bursaries">Bursaries</MenuItem>
                    <MenuItem value="Careers">Careers</MenuItem>
                    <MenuItem value="Learnerships">Learnerships</MenuItem>
                    <MenuItem value="Business Funding">Business Funding</MenuItem>
                    <MenuItem value="Events">Events</MenuItem>
                    <MenuItem value="Workshops">Workshops</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" fullWidth>
                  Save Preferences
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default Profile

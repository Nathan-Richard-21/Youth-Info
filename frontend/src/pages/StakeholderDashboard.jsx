import React, { useState, useEffect } from 'react'
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, TextField, 
  MenuItem, Chip, Alert, CircularProgress, Table, TableHead, TableBody, 
  TableRow, TableCell, Paper, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, Divider, Avatar, Badge, LinearProgress, FormControl,
  InputLabel, Select
} from '@mui/material'
import { 
  BusinessCenter, Add, Edit, Delete, Visibility, Send, CheckCircle, 
  Cancel, AccessTime, TrendingUp, Description, GetApp, Notes, Work
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const StakeholderDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [myOpportunities, setMyOpportunities] = useState([])
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [applications, setApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [showApplicationDialog, setShowApplicationDialog] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (user.role !== 'stakeholder' && user.role !== 'admin') {
      alert('Access denied. Stakeholder account required.')
      navigate('/')
      return
    }
    loadMyOpportunities()
    loadAnalytics()
  }, [])

  const loadMyOpportunities = async () => {
    try {
      setLoading(true)
      const response = await api.get('/stakeholder/opportunities')
      setMyOpportunities(response.data || [])
    } catch (err) {
      console.error('Error loading opportunities:', err)
      setError('Failed to load opportunities')
    } finally {
      setLoading(false)
    }
  }

  const loadAnalytics = async () => {
    try {
      const response = await api.get('/stakeholder/analytics')
      setAnalytics(response.data)
    } catch (err) {
      console.error('Error loading analytics:', err)
    }
  }

  const loadApplications = async (opportunityId) => {
    try {
      setLoading(true)
      const response = await api.get(`/stakeholder/applications/${opportunityId}`)
      setApplications(response.data || [])
      setSelectedOpportunity(myOpportunities.find(o => o._id === opportunityId))
    } catch (err) {
      console.error('Error loading applications:', err)
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const viewApplication = async (applicationId) => {
    try {
      const response = await api.get(`/stakeholder/application/${applicationId}`)
      setSelectedApplication(response.data)
      setNotes(response.data.notes || '')
      setShowApplicationDialog(true)
    } catch (err) {
      console.error('Error loading application:', err)
      setError('Failed to load application details')
    }
  }

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await api.put(`/stakeholder/application/${applicationId}/status`, { status })
      setSuccess(`Application ${status} successfully!`)
      loadApplications(selectedOpportunity._id)
      setShowApplicationDialog(false)
      loadAnalytics()
    } catch (err) {
      setError('Failed to update application status')
    }
  }

  const saveNotes = async () => {
    if (!selectedApplication) return
    try {
      await api.post(`/stakeholder/application/${selectedApplication._id}/notes`, { notes })
      setSuccess('Notes saved successfully!')
      setSelectedApplication({ ...selectedApplication, notes })
    } catch (err) {
      setError('Failed to save notes')
    }
  }

  const handleDelete = async (oppId) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    
    try {
      await api.delete(`/stakeholder/opportunities/${oppId}`)
      setSuccess('Opportunity deleted successfully!')
      loadMyOpportunities()
      loadAnalytics()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete')
    }
  }

  const getStatusChip = (status) => {
    const colors = {
      'pending': 'warning',
      'under-review': 'info',
      'approved': 'success',
      'rejected': 'error',
      'withdrawn': 'default'
    }
    const icons = {
      'pending': <AccessTime />,
      'under-review': <Visibility />,
      'approved': <CheckCircle />,
      'rejected': <Cancel />,
      'withdrawn': <Cancel />
    }
    return <Chip label={status} color={colors[status]} size="small" icon={icons[status]} />
  }

  const filteredApplications = statusFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === statusFilter)

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            <BusinessCenter sx={{ mr: 1, verticalAlign: 'middle' }} />
            Stakeholder Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Post and manage your organization's opportunities and applications
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

        {/* Analytics Cards */}
        {analytics && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Opportunities</Typography>
                      <Typography variant="h3" fontWeight={700}>{analytics.totalOpportunities}</Typography>
                    </Box>
                    <Work sx={{ fontSize: 48, opacity: 0.3 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography color="text.secondary" variant="body2">Total Applications</Typography>
                      <Typography variant="h3" fontWeight={700} color="primary">{analytics.totalApplications}</Typography>
                    </Box>
                    <Description sx={{ fontSize: 48, color: '#e0e0e0' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" variant="body2">Pending Review</Typography>
                  <Typography variant="h3" fontWeight={700} color="warning.main">
                    {analytics.statusBreakdown?.pending || 0}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(analytics.statusBreakdown?.pending / analytics.totalApplications) * 100 || 0} 
                    color="warning"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" variant="body2">Approved</Typography>
                  <Typography variant="h3" fontWeight={700} color="success.main">
                    {analytics.statusBreakdown?.approved || 0}
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(analytics.statusBreakdown?.approved / analytics.totalApplications) * 100 || 0} 
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            <Tab label="My Opportunities" />
            <Tab label="Applications" disabled={!selectedOpportunity} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Box>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<Add />} 
              onClick={() => navigate('/stakeholder/post-job')}
              sx={{ mb: 3 }}
            >
              Post New Opportunity
            </Button>

            {/* Opportunities Grid */}
            <Grid container spacing={3}>
              {loading ? (
                <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                  <CircularProgress />
                </Grid>
              ) : myOpportunities.length === 0 ? (
                <Grid item xs={12}>
                  <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Work sx={{ fontSize: 64, color: '#e0e0e0', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No opportunities posted yet
                    </Typography>
                    <Button 
                      variant="contained" 
                      startIcon={<Add />}
                      onClick={() => navigate('/stakeholder/post-job')}
                      sx={{ mt: 2 }}
                    >
                      Post Your First Opportunity
                    </Button>
                  </Paper>
                </Grid>
              ) : (
                myOpportunities.map((opp) => (
                  <Grid item xs={12} md={6} key={opp._id}>
                    <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" fontWeight={700}>
                            {opp.title}
                          </Typography>
                          <Box>
                            <IconButton size="small" onClick={() => navigate(`/stakeholder/post-job?edit=${opp._id}`)}>
                              <Edit />
                            </IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDelete(opp._id)}>
                              <Delete />
                            </IconButton>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Chip label={opp.category} size="small" color="primary" />
                          <Chip label={opp.location} size="small" />
                          {opp.allowInternalApplication && <Chip label="Internal Application" size="small" color="success" />}
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {opp.description?.substring(0, 150)}...
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Deadline: {new Date(opp.deadline).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Badge 
                            badgeContent={analytics?.opportunityBreakdown?.find(o => o.opportunityId === opp._id)?.applicationCount || 0} 
                            color="primary"
                          >
                            <Button 
                              size="small"
                              variant="outlined"
                              startIcon={<Visibility />}
                              onClick={() => {
                                loadApplications(opp._id)
                                setActiveTab(1)
                              }}
                            >
                              View Applications
                            </Button>
                          </Badge>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        )}

        {/* Applications Tab */}
        {activeTab === 1 && selectedOpportunity && (
          <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Applications for: {selectedOpportunity.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {applications.length} total application{applications.length !== 1 && 's'}
              </Typography>

              <FormControl sx={{ minWidth: 200, mt: 2 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Filter by Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="small"
                >
                  <MenuItem value="all">All Applications</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="under-review">Under Review</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : filteredApplications.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Description sx={{ fontSize: 64, color: '#e0e0e0', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No applications found
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {filteredApplications.map((app) => (
                  <Grid item xs={12} key={app._id}>
                    <Paper sx={{ p: 3, '&:hover': { bgcolor: '#f8fafc' } }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                            {app.user?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h6" fontWeight={600}>
                            {app.user?.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {app.user?.email} • Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {getStatusChip(app.status)}
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => viewApplication(app._id)}
                          >
                            View Details
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Application Details Dialog */}
        <Dialog 
          open={showApplicationDialog} 
          onClose={() => setShowApplicationDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedApplication && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" fontWeight={700}>
                    Application Details
                  </Typography>
                  {getStatusChip(selectedApplication.status)}
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                {/* Applicant Info */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Applicant Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">Name</Typography>
                      <Typography variant="body1">{selectedApplication.user?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{selectedApplication.user?.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{selectedApplication.user?.phone || 'N/A'}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="text.secondary">Location</Typography>
                      <Typography variant="body1">{selectedApplication.user?.location || 'N/A'}</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* CV Download */}
                {selectedApplication.user?.cvUrl && (
                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      startIcon={<GetApp />}
                      href={`http://localhost:3000${selectedApplication.user.cvUrl}`}
                      target="_blank"
                      fullWidth
                    >
                      Download CV
                    </Button>
                  </Box>
                )}

                {/* Cover Letter */}
                {selectedApplication.coverLetter && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Cover Letter
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {selectedApplication.coverLetter}
                      </Typography>
                    </Paper>
                  </Box>
                )}

                {/* Custom Answers */}
                {selectedApplication.answers && selectedApplication.answers.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Question Answers
                    </Typography>
                    {selectedApplication.answers.map((item, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Q: {item.question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                          A: {item.answer}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Additional Documents */}
                {selectedApplication.documents && selectedApplication.documents.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Additional Documents
                    </Typography>
                    <Grid container spacing={1}>
                      {selectedApplication.documents.map((doc, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Button
                            variant="outlined"
                            startIcon={<GetApp />}
                            href={`http://localhost:5001${doc.url}`}
                            target="_blank"
                            fullWidth
                            size="small"
                          >
                            {doc.name} ({doc.type})
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Notes */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Notes sx={{ mr: 1 }} /> Review Notes
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your review notes here..."
                    variant="outlined"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={saveNotes}
                    sx={{ mt: 1 }}
                  >
                    Save Notes
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowApplicationDialog(false)}>
                  Close
                </Button>
                {selectedApplication.status === 'pending' && (
                  <>
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'rejected')}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="contained" 
                      color="success"
                      onClick={() => updateApplicationStatus(selectedApplication._id, 'approved')}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  )
}

export default StakeholderDashboard

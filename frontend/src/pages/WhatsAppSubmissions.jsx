import React, { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Button, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Grid, Card, CardContent, Tabs, Tab, Alert, CircularProgress,
  FormControl, InputLabel, Select, MenuItem, Divider
} from '@mui/material'
import {
  CheckCircle, Cancel, Visibility, Edit, Delete, WhatsApp,
  TrendingUp, Pending, Done, Close
} from '@mui/icons-material'
import api from '../api'

const WhatsAppSubmissions = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ byStatus: [], pendingByCategory: [] })
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [detailsDialog, setDetailsDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [categoryFilter, setCategoryFilter] = useState('')
  
  const [parsedData, setParsedData] = useState({
    title: '',
    description: '',
    organization: '',
    location: 'Eastern Cape',
    deadline: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    requirements: '',
    amount: ''
  })

  useEffect(() => {
    loadSubmissions()
    loadStats()
  }, [statusFilter, categoryFilter])

  const loadSubmissions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        ...(statusFilter && { status: statusFilter }),
        ...(categoryFilter && { category: categoryFilter }),
        limit: 50
      })
      const response = await api.get(`/whatsapp/submissions?${params}`)
      setSubmissions(response.data.submissions || [])
    } catch (error) {
      console.error('Error loading submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await api.get('/whatsapp/submissions/stats/overview')
      setStats(response.data)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleViewDetails = (submission) => {
    setSelectedSubmission(submission)
    setDetailsDialog(true)
  }

  const handleEdit = (submission) => {
    setSelectedSubmission(submission)
    setParsedData({
      title: submission.parsedData?.title || '',
      description: submission.parsedData?.description || submission.messageContent,
      organization: submission.parsedData?.organization || submission.senderName,
      location: submission.parsedData?.location || 'Eastern Cape',
      deadline: submission.parsedData?.deadline ? new Date(submission.parsedData.deadline).toISOString().split('T')[0] : '',
      contactEmail: submission.parsedData?.contactEmail || '',
      contactPhone: submission.parsedData?.contactPhone || submission.senderPhone,
      website: submission.parsedData?.website || '',
      requirements: submission.parsedData?.requirements?.join(', ') || '',
      amount: submission.parsedData?.amount || ''
    })
    setEditDialog(true)
  }

  const handleSaveParsedData = async () => {
    try {
      await api.put(`/whatsapp/submissions/${selectedSubmission._id}/parse`, {
        parsedData: {
          ...parsedData,
          requirements: parsedData.requirements.split(',').map(r => r.trim()).filter(r => r),
          deadline: parsedData.deadline || null
        }
      })
      alert('Data saved successfully')
      setEditDialog(false)
      loadSubmissions()
    } catch (error) {
      alert('Failed to save data')
    }
  }

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this submission and create an opportunity?')) return

    try {
      await api.post(`/whatsapp/submissions/${id}/approve`, {
        notes: 'Approved via WhatsApp integration'
      })
      alert('Submission approved and opportunity created!')
      loadSubmissions()
      loadStats()
      setDetailsDialog(false)
    } catch (error) {
      alert('Failed to approve submission')
    }
  }

  const handleReject = async (id) => {
    const notes = prompt('Reason for rejection (optional):')
    
    try {
      await api.post(`/whatsapp/submissions/${id}/reject`, {
        notes: notes || 'Rejected by admin'
      })
      alert('Submission rejected')
      loadSubmissions()
      loadStats()
      setDetailsDialog(false)
    } catch (error) {
      alert('Failed to reject submission')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this submission?')) return

    try {
      await api.delete(`/whatsapp/submissions/${id}`)
      alert('Submission deleted')
      loadSubmissions()
      loadStats()
    } catch (error) {
      alert('Failed to delete submission')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      approved: 'success',
      rejected: 'error',
      published: 'info'
    }
    return colors[status] || 'default'
  }

  const getCategoryColor = (category) => {
    const colors = {
      bursary: 'primary',
      career: 'success',
      learnership: 'info',
      business: 'warning',
      general: 'default'
    }
    return colors[category] || 'default'
  }

  const pendingCount = stats.byStatus.find(s => s._id === 'pending')?.count || 0
  const approvedCount = stats.byStatus.find(s => s._id === 'approved')?.count || 0
  const rejectedCount = stats.byStatus.find(s => s._id === 'rejected')?.count || 0

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WhatsApp sx={{ fontSize: 40, mr: 2, color: '#25D366' }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                WhatsApp Submissions
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Review and approve messages from 0716185262
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Pending Review</Typography>
                    <Typography variant="h3" fontWeight={700}>{pendingCount}</Typography>
                  </Box>
                  <Pending sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Approved</Typography>
                    <Typography variant="h3" fontWeight={700}>{approvedCount}</Typography>
                  </Box>
                  <Done sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, bgcolor: 'error.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Rejected</Typography>
                    <Typography variant="h3" fontWeight={700}>{rejectedCount}</Typography>
                  </Box>
                  <Close sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="bursary">Bursary</MenuItem>
                  <MenuItem value="career">Career</MenuItem>
                  <MenuItem value="learnership">Learnership</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={loadSubmissions}
                sx={{ height: 56 }}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Submissions Table */}
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : submissions.length === 0 ? (
            <Box sx={{ p: 8, textAlign: 'center' }}>
              <WhatsApp sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No submissions found
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Sender</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Message Preview</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission._id} hover>
                      <TableCell>
                        {new Date(submission.timestamp).toLocaleString('en-ZA')}
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {submission.senderName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {submission.senderPhone}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={submission.category}
                          size="small"
                          color={getCategoryColor(submission.category)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 300 }}>
                          {submission.messageContent.substring(0, 100)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={submission.status}
                          size="small"
                          color={getStatusColor(submission.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(submission)}
                          color="primary"
                        >
                          <Visibility />
                        </IconButton>
                        {submission.status === 'pending' && (
                          <>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(submission)}
                              color="info"
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleApprove(submission._id)}
                              color="success"
                            >
                              <CheckCircle />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleReject(submission._id)}
                              color="error"
                            >
                              <Cancel />
                            </IconButton>
                          </>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(submission._id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Details Dialog */}
        <Dialog open={detailsDialog} onClose={() => setDetailsDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Submission Details
            <Chip
              label={selectedSubmission?.status}
              size="small"
              color={getStatusColor(selectedSubmission?.status)}
              sx={{ ml: 2 }}
            />
          </DialogTitle>
          <DialogContent dividers>
            {selectedSubmission && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Sender</Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedSubmission.senderName} ({selectedSubmission.senderPhone})
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Category</Typography>
                  <Chip label={selectedSubmission.category} size="small" color={getCategoryColor(selectedSubmission.category)} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                  <Typography variant="body2">
                    {new Date(selectedSubmission.timestamp).toLocaleString('en-ZA')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Message</Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5', mt: 1 }}>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                      {selectedSubmission.messageContent}
                    </Typography>
                  </Paper>
                </Grid>
                {selectedSubmission.parsedData && Object.keys(selectedSubmission.parsedData).length > 0 && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Parsed Data
                    </Typography>
                    <Grid container spacing={1}>
                      {selectedSubmission.parsedData.title && (
                        <Grid item xs={12}>
                          <Typography variant="caption" color="text.secondary">Title:</Typography>
                          <Typography variant="body2">{selectedSubmission.parsedData.title}</Typography>
                        </Grid>
                      )}
                      {selectedSubmission.parsedData.organization && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Organization:</Typography>
                          <Typography variant="body2">{selectedSubmission.parsedData.organization}</Typography>
                        </Grid>
                      )}
                      {selectedSubmission.parsedData.location && (
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Location:</Typography>
                          <Typography variant="body2">{selectedSubmission.parsedData.location}</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}
                {selectedSubmission.reviewNotes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">Review Notes</Typography>
                    <Typography variant="body2">{selectedSubmission.reviewNotes}</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            {selectedSubmission?.status === 'pending' && (
              <>
                <Button onClick={() => handleEdit(selectedSubmission)} startIcon={<Edit />}>
                  Edit
                </Button>
                <Button
                  onClick={() => handleApprove(selectedSubmission._id)}
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircle />}
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(selectedSubmission._id)}
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                >
                  Reject
                </Button>
              </>
            )}
            <Button onClick={() => setDetailsDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Edit Submission Data</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={parsedData.title}
                  onChange={(e) => setParsedData({ ...parsedData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={parsedData.description}
                  onChange={(e) => setParsedData({ ...parsedData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Organization"
                  value={parsedData.organization}
                  onChange={(e) => setParsedData({ ...parsedData, organization: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={parsedData.location}
                  onChange={(e) => setParsedData({ ...parsedData, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Deadline"
                  value={parsedData.deadline}
                  onChange={(e) => setParsedData({ ...parsedData, deadline: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  value={parsedData.amount}
                  onChange={(e) => setParsedData({ ...parsedData, amount: e.target.value })}
                  placeholder="e.g., R50,000 per year"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  type="email"
                  value={parsedData.contactEmail}
                  onChange={(e) => setParsedData({ ...parsedData, contactEmail: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={parsedData.contactPhone}
                  onChange={(e) => setParsedData({ ...parsedData, contactPhone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={parsedData.website}
                  onChange={(e) => setParsedData({ ...parsedData, website: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Requirements (comma separated)"
                  value={parsedData.requirements}
                  onChange={(e) => setParsedData({ ...parsedData, requirements: e.target.value })}
                  placeholder="e.g., Matric certificate, ID document, Proof of income"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveParsedData} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default WhatsAppSubmissions

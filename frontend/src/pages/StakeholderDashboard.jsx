import React, { useState, useEffect } from 'react'
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, TextField, 
  MenuItem, Chip, Alert, CircularProgress, Table, TableHead, TableBody, 
  TableRow, TableCell, Paper, Tabs, Tab, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton
} from '@mui/material'
import { 
  BusinessCenter, Add, Edit, Delete, Visibility, Send, CheckCircle, 
  Cancel, AccessTime 
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import api from '../api'

const StakeholderDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [myOpportunities, setMyOpportunities] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentOppId, setCurrentOppId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: 'career',
    subcategory: '',
    description: '',
    organization: '',
    location: '',
    closingDate: '',
    applyUrl: '',
    requirements: [],
    benefits: []
  })
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
  }, [])

  const loadMyOpportunities = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?createdBy=' + user.id)
      setMyOpportunities(response.data.opportunities || [])
    } catch (err) {
      console.error('Error loading opportunities:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || !formData.description || !formData.organization || !formData.closingDate) {
      setError('Please fill all required fields')
      return
    }

    try {
      setLoading(true)
      
      const payload = {
        ...formData,
        status: 'pending', // Always pending for stakeholder posts
        requirements: formData.requirements.filter(r => r.trim()),
        benefits: formData.benefits.filter(b => b.trim())
      }

      if (editMode && currentOppId) {
        await api.put(`/opportunities/${currentOppId}`, payload)
        setSuccess('Opportunity updated and sent for approval!')
      } else {
        await api.post('/opportunities', payload)
        setSuccess('Opportunity submitted for admin approval!')
      }

      // Reset form
      setFormData({
        title: '',
        category: 'career',
        subcategory: '',
        description: '',
        organization: '',
        location: '',
        closingDate: '',
        applyUrl: '',
        requirements: [],
        benefits: []
      })
      setShowForm(false)
      setEditMode(false)
      setCurrentOppId(null)
      loadMyOpportunities()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit opportunity')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (opp) => {
    setFormData({
      title: opp.title || '',
      category: opp.category || 'career',
      subcategory: opp.subcategory || '',
      description: opp.description || '',
      organization: opp.organization || '',
      location: opp.location || '',
      closingDate: opp.closingDate ? new Date(opp.closingDate).toISOString().split('T')[0] : '',
      applyUrl: opp.applyUrl || '',
      requirements: opp.requirements || [],
      benefits: opp.benefits || []
    })
    setCurrentOppId(opp._id)
    setEditMode(true)
    setShowForm(true)
  }

  const handleDelete = async (oppId) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    
    try {
      await api.delete(`/opportunities/${oppId}`)
      alert('Opportunity deleted')
      loadMyOpportunities()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete')
    }
  }

  const getStatusChip = (status) => {
    const colors = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'error'
    }
    const icons = {
      'pending': <AccessTime />,
      'approved': <CheckCircle />,
      'rejected': <Cancel />
    }
    return <Chip label={status} color={colors[status]} size="small" icon={icons[status]} />
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            <BusinessCenter sx={{ mr: 1, verticalAlign: 'middle' }} />
            Stakeholder Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Post and manage your organization's opportunities
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2">Total Posted</Typography>
                <Typography variant="h4" fontWeight={700}>{myOpportunities.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2">Pending Approval</Typography>
                <Typography variant="h4" fontWeight={700} color="warning.main">
                  {myOpportunities.filter(o => o.status === 'pending').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2">Live Opportunities</Typography>
                <Typography variant="h4" fontWeight={700} color="success.main">
                  {myOpportunities.filter(o => o.status === 'approved').length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => { setShowForm(true); setEditMode(false); }}
          sx={{ mb: 3 }}
        >
          Post New Opportunity
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {/* Opportunities Table */}
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Closing Date</TableCell>
                <TableCell>Views</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : myOpportunities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary">No opportunities posted yet</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                myOpportunities.map((opp) => (
                  <TableRow key={opp._id}>
                    <TableCell>{opp.title}</TableCell>
                    <TableCell><Chip label={opp.category} size="small" /></TableCell>
                    <TableCell>{opp.organization}</TableCell>
                    <TableCell>{getStatusChip(opp.status)}</TableCell>
                    <TableCell>{new Date(opp.closingDate).toLocaleDateString()}</TableCell>
                    <TableCell>{opp.views || 0}</TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleEdit(opp)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(opp._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        {/* Form Dialog */}
        <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="md" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {editMode ? 'Edit Opportunity' : 'Post New Opportunity'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Opportunity Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <MenuItem value="career">Career</MenuItem>
                    <MenuItem value="bursary">Bursary</MenuItem>
                    <MenuItem value="learnership">Learnership</MenuItem>
                    <MenuItem value="business">Business Funding</MenuItem>
                    <MenuItem value="event">Event</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subcategory (Optional)"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    placeholder="e.g., no-matric, undergraduate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Organization Name"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="date"
                    label="Closing Date"
                    name="closingDate"
                    value={formData.closingDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Application URL (External Link)"
                    name="applyUrl"
                    value={formData.applyUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/apply"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Leave blank to use internal application system
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : editMode ? 'Update' : 'Submit for Approval'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  )
}

export default StakeholderDashboard

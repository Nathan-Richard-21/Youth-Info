import React, { useEffect, useState } from 'react'
import { 
  Box, Container, Typography, Grid, Card, CardContent, Button, Tabs, Tab,
  Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  CircularProgress, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemText, Divider
} from '@mui/material'
import { 
  Dashboard as DashboardIcon, People, WorkOutline, ReportProblem,
  CheckCircle, Cancel, Visibility, Edit, Delete, Block, Check, Security, Warning, VerifiedUser
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import api from '../api'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [pendingOpportunities, setPendingOpportunities] = useState([])
  const [selectedOpp, setSelectedOpp] = useState(null)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [viewingOpp, setViewingOpp] = useState(null)
  const [fraudCheckLoading, setFraudCheckLoading] = useState(null)
  const [fraudResults, setFraudResults] = useState({})
  const [showFraudDialog, setShowFraudDialog] = useState(false)
  const [currentFraudAnalysis, setCurrentFraudAnalysis] = useState(null)
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (user.role !== 'admin') {
      alert('Access denied. Admin only.')
      navigate('/')
      return
    }
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [statsRes, usersRes, oppsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users?limit=100'),
        api.get('/admin/opportunities?limit=100')
      ])
      
      setStats(statsRes.data)
      setUsers(usersRes.data.users || [])
      setOpportunities(oppsRes.data.opportunities || [])
      
      // Filter pending opportunities
      const pending = (oppsRes.data.opportunities || []).filter(o => o.status === 'pending')
      setPendingOpportunities(pending)
    } catch (err) {
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (oppId) => {
    try {
      await api.post(`/admin/opportunities/${oppId}/approve`)
      alert('Opportunity approved!')
      loadDashboardData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve')
    }
  }

  const handleReject = async () => {
    try {
      await api.post(`/admin/opportunities/${selectedOpp}/reject`, { rejectionReason: rejectReason })
      alert('Opportunity rejected')
      setShowRejectDialog(false)
      setRejectReason('')
      setSelectedOpp(null)
      loadDashboardData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject')
    }
  }

  const handleSuspendUser = async (userId) => {
    const reason = prompt('Enter suspension reason:')
    if (!reason) return
    
    try {
      await api.patch(`/admin/users/${userId}/suspend`, { reason })
      alert('User suspended')
      loadDashboardData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to suspend user')
    }
  }

  const handleActivateUser = async (userId) => {
    try {
      await api.patch(`/admin/users/${userId}/activate`)
      alert('User activated')
      loadDashboardData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to activate user')
    }
  }

  const handleDeleteOpportunity = async (oppId) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    
    try {
      await api.delete(`/admin/opportunities/${oppId}`)
      alert('Opportunity deleted')
      loadDashboardData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete')
    }
  }

  const handleViewOpportunity = (opp) => {
    setViewingOpp(opp)
    setShowViewDialog(true)
  }

  const handleFraudCheck = async (oppId) => {
    try {
      setFraudCheckLoading(oppId)
      const response = await api.post(`/admin/opportunities/${oppId}/fraud-check`)
      setFraudResults(prev => ({ ...prev, [oppId]: response.data }))
      setCurrentFraudAnalysis(response.data)
      setShowFraudDialog(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to perform fraud check')
    } finally {
      setFraudCheckLoading(null)
    }
  }

  const getRiskColor = (riskLevel) => {
    switch(riskLevel) {
      case 'LOW': return 'success'
      case 'MEDIUM': return 'warning'
      case 'HIGH': return 'error'
      default: return 'default'
    }
  }

  const getRiskIcon = (riskLevel) => {
    switch(riskLevel) {
      case 'LOW': return <VerifiedUser />
      case 'MEDIUM': return <Warning />
      case 'HIGH': return <ReportProblem />
      default: return <Security />
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users, opportunities, and platform content
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Total Users</Typography>
                    <Typography variant="h4" fontWeight={700}>{stats.totalUsers || 0}</Typography>
                  </Box>
                  <People sx={{ fontSize: 48, color: 'primary.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Opportunities</Typography>
                    <Typography variant="h4" fontWeight={700}>{stats.totalOpportunities || 0}</Typography>
                  </Box>
                  <WorkOutline sx={{ fontSize: 48, color: 'success.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Pending Approval</Typography>
                    <Typography variant="h4" fontWeight={700} color="warning.main">{stats.pendingApprovals || 0}</Typography>
                  </Box>
                  <ReportProblem sx={{ fontSize: 48, color: 'warning.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2">Active Reports</Typography>
                    <Typography variant="h4" fontWeight={700} color="error.main">{stats.activeReports || 0}</Typography>
                  </Box>
                  <ReportProblem sx={{ fontSize: 48, color: 'error.main', opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Users by Role Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Users by Role
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.usersByRole || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(stats.usersByRole || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0047AB', '#FF8C00', '#10b981', '#f59e0b'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Opportunities by Category Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Opportunities by Category
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.opportunitiesByCategory || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(stats.opportunitiesByCategory || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#0ea5e9'][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Opportunities by Status Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Opportunities by Status
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={stats.opportunitiesByStatus || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(stats.opportunitiesByStatus || []).map((entry, index) => {
                        const colors = {
                          'approved': '#10b981',
                          'pending': '#f59e0b',
                          'rejected': '#ef4444',
                          'expired': '#6b7280'
                        }
                        return <Cell key={`cell-${index}`} fill={colors[entry.name] || '#6366f1'} />
                      })}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
            <Tab label={`Pending Approval (${pendingOpportunities.length})`} />
            <Tab label={`Users (${users.length})`} />
            <Tab label={`All Opportunities (${opportunities.length})`} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Opportunities Pending Approval</Typography>
            {pendingOpportunities.length === 0 ? (
              <Alert severity="info">No pending opportunities</Alert>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Fraud Check</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOpportunities.map((opp) => (
                    <TableRow key={opp._id}>
                      <TableCell>{opp.title}</TableCell>
                      <TableCell><Chip label={opp.category} size="small" /></TableCell>
                      <TableCell>{opp.organization}</TableCell>
                      <TableCell>{opp.createdBy?.name || 'Unknown'}</TableCell>
                      <TableCell>{new Date(opp.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {fraudResults[opp._id] ? (
                          <Chip 
                            icon={getRiskIcon(fraudResults[opp._id].riskLevel)}
                            label={`${fraudResults[opp._id].riskLevel} RISK`}
                            color={getRiskColor(fraudResults[opp._id].riskLevel)}
                            size="small"
                            onClick={() => {
                              setCurrentFraudAnalysis(fraudResults[opp._id])
                              setShowFraudDialog(true)
                            }}
                            sx={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={fraudCheckLoading === opp._id ? <CircularProgress size={16} /> : <Security />}
                            onClick={() => handleFraudCheck(opp._id)}
                            disabled={fraudCheckLoading === opp._id}
                            sx={{ textTransform: 'none' }}
                          >
                            {fraudCheckLoading === opp._id ? 'Checking...' : 'Verify'}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton color="success" size="small" onClick={() => handleApprove(opp._id)} title="Approve">
                          <CheckCircle />
                        </IconButton>
                        <IconButton color="error" size="small" onClick={() => { setSelectedOpp(opp._id); setShowRejectDialog(true); }} title="Reject">
                          <Cancel />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleViewOpportunity(opp)} title="View Details">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Registered Users</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell><Chip label={u.role} size="small" color={u.role === 'admin' ? 'secondary' : 'default'} /></TableCell>
                    <TableCell>
                      <Chip 
                        label={u.isSuspended ? 'Suspended' : 'Active'} 
                        size="small" 
                        color={u.isSuspended ? 'error' : 'success'}
                      />
                    </TableCell>
                    <TableCell>{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {u.isSuspended ? (
                        <IconButton color="success" size="small" onClick={() => handleActivateUser(u._id)}>
                          <Check />
                        </IconButton>
                      ) : (
                        <IconButton color="warning" size="small" onClick={() => handleSuspendUser(u._id)}>
                          <Block />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">All Opportunities</Typography>
              <Alert severity="info" sx={{ py: 0 }}>
                💡 Use the <strong>Fraud Check</strong> to verify any suspicious postings
              </Alert>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Fraud Check</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow key={opp._id}>
                    <TableCell>{opp.title}</TableCell>
                    <TableCell><Chip label={opp.category} size="small" /></TableCell>
                    <TableCell>
                      <Chip 
                        label={opp.status} 
                        size="small" 
                        color={opp.status === 'approved' ? 'success' : opp.status === 'rejected' ? 'error' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>{opp.views || 0}</TableCell>
                    <TableCell>{opp.applications || 0}</TableCell>
                    <TableCell>{new Date(opp.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {fraudResults[opp._id] ? (
                        <Chip 
                          icon={getRiskIcon(fraudResults[opp._id].riskLevel)}
                          label={`${fraudResults[opp._id].riskLevel} RISK`}
                          color={getRiskColor(fraudResults[opp._id].riskLevel)}
                          size="small"
                          onClick={() => {
                            setCurrentFraudAnalysis(fraudResults[opp._id])
                            setShowFraudDialog(true)
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={fraudCheckLoading === opp._id ? <CircularProgress size={16} /> : <Security />}
                          onClick={() => handleFraudCheck(opp._id)}
                          disabled={fraudCheckLoading === opp._id}
                          sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                        >
                          {fraudCheckLoading === opp._id ? 'Checking...' : 'Verify'}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={() => handleViewOpportunity(opp)} title="View Details">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" onClick={() => navigate(`/admin/post?edit=${opp._id}`)} title="Edit">
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteOpportunity(opp._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onClose={() => setShowRejectDialog(false)}>
          <DialogTitle>Reject Opportunity</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Rejection Reason"
              fullWidth
              multiline
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowRejectDialog(false)}>Cancel</Button>
            <Button onClick={handleReject} variant="contained" color="error">Reject</Button>
          </DialogActions>
        </Dialog>

        {/* View Opportunity Dialog */}
        <Dialog 
          open={showViewDialog} 
          onClose={() => setShowViewDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ bgcolor: '#0047AB', color: '#fff' }}>
            Opportunity Details
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {viewingOpp && (
              <Box>
                {/* Image */}
                {viewingOpp.imageUrl && (
                  <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <img 
                      src={viewingOpp.imageUrl.startsWith('http') ? viewingOpp.imageUrl : `http://localhost:5001${viewingOpp.imageUrl}`} 
                      alt={viewingOpp.title}
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '400px', 
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        console.error('Failed to load image:', viewingOpp.imageUrl)
                        e.target.style.display = 'none'
                      }}
                    />
                  </Box>
                )}

                {/* Title */}
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#0047AB' }}>
                  {viewingOpp.title}
                </Typography>

                {/* Status and Category Chips */}
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`Status: ${viewingOpp.status}`}
                    color={viewingOpp.status === 'approved' ? 'success' : viewingOpp.status === 'rejected' ? 'error' : 'warning'}
                    size="small"
                  />
                  <Chip 
                    label={`Category: ${viewingOpp.category}`}
                    color="primary"
                    size="small"
                  />
                  {viewingOpp.subcategory && (
                    <Chip 
                      label={viewingOpp.subcategory}
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#FF8C00' }}>
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {viewingOpp.description}
                  </Typography>
                </Box>

                {/* Details Grid */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {viewingOpp.organization && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Organization</Typography>
                      <Typography variant="body1" fontWeight={600}>{viewingOpp.organization}</Typography>
                    </Grid>
                  )}
                  {viewingOpp.location && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Location</Typography>
                      <Typography variant="body1" fontWeight={600}>{viewingOpp.location}</Typography>
                    </Grid>
                  )}
                  {viewingOpp.deadline && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Deadline</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(viewingOpp.deadline).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  )}
                  {viewingOpp.closingDate && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Closing Date</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {new Date(viewingOpp.closingDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  )}
                  {viewingOpp.employmentType && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Employment Type</Typography>
                      <Typography variant="body1" fontWeight={600}>{viewingOpp.employmentType}</Typography>
                    </Grid>
                  )}
                  {viewingOpp.salary && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Salary</Typography>
                      <Typography variant="body1" fontWeight={600}>{viewingOpp.salary}</Typography>
                    </Grid>
                  )}
                  {viewingOpp.amount && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">Amount</Typography>
                      <Typography variant="body1" fontWeight={600}>{viewingOpp.amount}</Typography>
                    </Grid>
                  )}
                </Grid>

                {/* Application Link */}
                {viewingOpp.applyUrl && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">Application Link</Typography>
                    <Typography variant="body1">
                      <a href={viewingOpp.applyUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0047AB' }}>
                        {viewingOpp.applyUrl}
                      </a>
                    </Typography>
                  </Box>
                )}

                {/* Internal Application */}
                {viewingOpp.allowInternalApplication && (
                  <Box sx={{ mb: 2 }}>
                    <Alert severity="info">
                      This opportunity accepts internal applications through the platform
                    </Alert>
                  </Box>
                )}

                {/* Application Questions */}
                {viewingOpp.applicationQuestions && viewingOpp.applicationQuestions.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#FF8C00' }}>
                      Application Questions
                    </Typography>
                    {viewingOpp.applicationQuestions.map((q, index) => (
                      <Box key={index} sx={{ mb: 1, pl: 2 }}>
                        <Typography variant="body2">
                          {index + 1}. {q.question} {q.required && <span style={{ color: 'red' }}>*</span>}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Type: {q.type}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Required Documents */}
                {viewingOpp.requiredDocuments && viewingOpp.requiredDocuments.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#FF8C00' }}>
                      Required Documents
                    </Typography>
                    {viewingOpp.requiredDocuments.map((doc, index) => (
                      <Box key={index} sx={{ mb: 1, pl: 2 }}>
                        <Typography variant="body2">
                          • {doc.name} {doc.required && <span style={{ color: 'red' }}>*</span>}
                        </Typography>
                        {doc.description && (
                          <Typography variant="caption" color="text.secondary">
                            {doc.description}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}

                {/* Stats */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Views</Typography>
                      <Typography variant="h6" fontWeight={700}>{viewingOpp.views || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Applications</Typography>
                      <Typography variant="h6" fontWeight={700}>{viewingOpp.applications || 0}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Created By</Typography>
                      <Typography variant="body1">{viewingOpp.createdBy?.name || 'Unknown'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Created At</Typography>
                      <Typography variant="body1">
                        {new Date(viewingOpp.createdAt).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Rejection Reason */}
                {viewingOpp.status === 'rejected' && viewingOpp.rejectionReason && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight={600}>Rejection Reason:</Typography>
                    <Typography variant="body2">{viewingOpp.rejectionReason}</Typography>
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            {viewingOpp && viewingOpp.status === 'pending' && (
              <>
                <Button 
                  onClick={() => {
                    setShowViewDialog(false)
                    handleApprove(viewingOpp._id)
                  }} 
                  variant="contained" 
                  color="success"
                  startIcon={<CheckCircle />}
                >
                  Approve
                </Button>
                <Button 
                  onClick={() => {
                    setShowViewDialog(false)
                    setSelectedOpp(viewingOpp._id)
                    setShowRejectDialog(true)
                  }} 
                  variant="contained" 
                  color="error"
                  startIcon={<Cancel />}
                >
                  Reject
                </Button>
              </>
            )}
            <Button onClick={() => setShowViewDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Fraud Analysis Dialog */}
        <Dialog 
          open={showFraudDialog} 
          onClose={() => setShowFraudDialog(false)} 
          maxWidth="md" 
          fullWidth
        >
          <DialogTitle sx={{ 
            bgcolor: currentFraudAnalysis?.riskLevel === 'HIGH' ? '#fee2e2' : 
                     currentFraudAnalysis?.riskLevel === 'MEDIUM' ? '#fef3c7' : '#dcfce7',
            color: currentFraudAnalysis?.riskLevel === 'HIGH' ? '#991b1b' : 
                   currentFraudAnalysis?.riskLevel === 'MEDIUM' ? '#92400e' : '#14532d'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {currentFraudAnalysis && getRiskIcon(currentFraudAnalysis.riskLevel)}
              <Typography variant="h6" fontWeight={700}>
                AI Fraud Detection Analysis
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            {currentFraudAnalysis && (
              <Box sx={{ py: 2 }}>
                {/* Risk Level Badge */}
                <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Chip 
                    icon={getRiskIcon(currentFraudAnalysis.riskLevel)}
                    label={`${currentFraudAnalysis.riskLevel} RISK`}
                    color={getRiskColor(currentFraudAnalysis.riskLevel)}
                    size="large"
                    sx={{ fontSize: '1rem', fontWeight: 700, px: 2, py: 3 }}
                  />
                  <Box>
                    <Typography variant="h4" fontWeight={700} color="text.primary">
                      {currentFraudAnalysis.riskScore}/100
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Risk Score
                    </Typography>
                  </Box>
                  {currentFraudAnalysis.usedAI && (
                    <Chip 
                      label={`AI: ${currentFraudAnalysis.model || 'GPT-4'}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  )}
                </Box>

                {/* Analysis */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#0047AB' }}>
                    📊 Analysis
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: '#f8fafc' }}>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                      {currentFraudAnalysis.analysis}
                    </Typography>
                  </Paper>
                </Box>

                {/* Flags Detected */}
                {currentFraudAnalysis.flags && currentFraudAnalysis.flags.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#FF8C00' }}>
                      🚩 Flags Detected ({currentFraudAnalysis.flags.length})
                    </Typography>
                    <List sx={{ bgcolor: '#fff', border: '1px solid #e5e7eb', borderRadius: 1 }}>
                      {currentFraudAnalysis.flags.map((flag, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText 
                              primary={flag}
                              primaryTypographyProps={{ 
                                variant: 'body2',
                                color: currentFraudAnalysis.riskLevel === 'HIGH' ? 'error' : 'text.primary'
                              }}
                            />
                          </ListItem>
                          {index < currentFraudAnalysis.flags.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Recommendations */}
                {currentFraudAnalysis.recommendations && currentFraudAnalysis.recommendations.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#10b981' }}>
                      ✅ Recommendations
                    </Typography>
                    <List sx={{ bgcolor: '#f0fdf4', border: '1px solid #86efac', borderRadius: 1 }}>
                      {currentFraudAnalysis.recommendations.map((rec, index) => (
                        <React.Fragment key={index}>
                          <ListItem>
                            <ListItemText 
                              primary={rec}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          {index < currentFraudAnalysis.recommendations.length - 1 && <Divider />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Warning for High Risk */}
                {currentFraudAnalysis.riskLevel === 'HIGH' && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight={600}>
                      ⚠️ HIGH RISK DETECTED - Immediate Action Recommended
                    </Typography>
                    <Typography variant="body2">
                      This opportunity shows multiple fraud indicators. Consider rejecting or requesting additional verification from the poster.
                    </Typography>
                  </Alert>
                )}

                {currentFraudAnalysis.error && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      {currentFraudAnalysis.error}
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFraudDialog(false)}>Close</Button>
            {currentFraudAnalysis?.riskLevel === 'HIGH' && (
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => {
                  setShowFraudDialog(false)
                  // Auto-populate reject dialog with fraud concerns
                  const fraudReason = `FRAUD RISK DETECTED (AI Score: ${currentFraudAnalysis.riskScore}/100)\n\nFlags: ${currentFraudAnalysis.flags.join(', ')}\n\nThis posting has been flagged by our AI fraud detection system.`
                  setRejectReason(fraudReason)
                  setShowRejectDialog(true)
                }}
              >
                Reject as Fraud
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default AdminDashboard

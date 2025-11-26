import React, { useEffect, useState } from 'react'
import { 
  Typography, Box, Paper, Button, Container, Grid, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Chip, Avatar, IconButton, TextField, InputAdornment, Tab, Tabs,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  FormControl, InputLabel, Alert, CircularProgress, Divider, Badge,
  Menu, ListItemIcon, ListItemText
} from '@mui/material'
import {
  Search, FilterList, MoreVert, CheckCircle, Cancel, Pending,
  Person, Work, School, Business, Report, Visibility, Delete,
  TrendingUp, Group, Assignment, Flag, Edit, Block, Email,
  Phone, LocationOn, CalendarToday, Dashboard as DashboardIcon, Add, Tooltip
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import api from '../api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [reports, setReports] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOpportunities: 0,
    pendingApprovals: 0,
    activeReports: 0
  })
  
  // Filters and search
  const [userSearch, setUserSearch] = useState('')
  const [oppSearch, setOppSearch] = useState('')
  const [oppStatusFilter, setOppStatusFilter] = useState('all')
  const [oppCategoryFilter, setOppCategoryFilter] = useState('all')
  const [userRoleFilter, setUserRoleFilter] = useState('all')
  const [verificationFilter, setVerificationFilter] = useState('all')
  
  // Dialog states
  const [selectedItem, setSelectedItem] = useState(null)
  const [detailsDialog, setDetailsDialog] = useState(false)
  const [actionDialog, setActionDialog] = useState(false)
  const [actionType, setActionType] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load real data from API
      const usersRes = await api.get('/admin/users')
      const oppsRes = await api.get('/admin/opportunities')
      
      setUsers(usersRes.data || [])
      setOpportunities(oppsRes.data || [])
      
      // Mock reports data
      setReports([
        { 
          id: 1, 
          type: 'Spam', 
          reportedItem: 'Fake Bursary Posting', 
          reportedBy: 'John Doe', 
          date: '2025-11-20',
          status: 'pending',
          description: 'This looks like a scam bursary with fake contact details'
        },
        { 
          id: 2, 
          type: 'Inappropriate Content', 
          reportedItem: 'Offensive Forum Post', 
          reportedBy: 'Jane Smith', 
          date: '2025-11-19',
          status: 'resolved',
          description: 'User posted inappropriate content in careers forum'
        },
        { 
          id: 3, 
          type: 'Misinformation', 
          reportedItem: 'Incorrect Medical Info', 
          reportedBy: 'Mike Johnson', 
          date: '2025-11-18',
          status: 'pending',
          description: 'Medical chatbot provided incorrect health information'
        }
      ])
      
      // Calculate stats
      setStats({
        totalUsers: usersRes.data?.length || 0,
        totalOpportunities: oppsRes.data?.length || 0,
        pendingApprovals: (oppsRes.data?.filter(o => o.status === 'pending').length || 0) + 
                         (usersRes.data?.filter(u => u.role === 'stakeholder' && u.verificationStatus === 'pending').length || 0),
        activeReports: 2 // Mock value
      })
      
    } catch (err) {
      console.error('Error loading dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpportunityAction = async (id, status) => {
    try {
      await api.patch(`/admin/opportunities/${id}`, { status })
      loadDashboardData()
      setActionDialog(false)
      setSelectedItem(null)
    } catch (err) {
      alert('Action failed. Please try again.')
    }
  }

  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'suspend') {
        await api.patch(`/admin/users/${userId}/suspend`, { reason: 'Suspended by admin' })
        alert('User suspended successfully')
      } else if (action === 'activate') {
        await api.patch(`/admin/users/${userId}/activate`)
        alert('User activated successfully')
      } else if (action === 'delete') {
        if (window.confirm('Are you sure you want to delete this user?')) {
          await api.delete(`/admin/users/${userId}`)
          alert('User deleted successfully')
        }
      }
      loadDashboardData()
      setAnchorEl(null)
    } catch (err) {
      alert('Action failed. Please try again.')
    }
  }

  const handleVerificationAction = async (userId, status) => {
    try {
      await api.patch(`/admin/users/${userId}/verification`, { verificationStatus: status })
      alert(`Stakeholder ${status === 'verified' ? 'approved' : 'rejected'} successfully`)
      loadDashboardData()
    } catch (err) {
      alert('Action failed. Please try again.')
    }
  }

  const handleReportAction = (reportId, action) => {
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: action === 'resolve' ? 'resolved' : 'dismissed' } : r
    ))
    alert(`Report ${action}d successfully`)
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'success'
      case 'pending': return 'warning'
      case 'rejected': return 'error'
      case 'resolved': return 'success'
      default: return 'default'
    }
  }

  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase().includes(userSearch.toLowerCase()) || 
     u.email?.toLowerCase().includes(userSearch.toLowerCase())) &&
    (userRoleFilter === 'all' || u.role === userRoleFilter) &&
    (verificationFilter === 'all' || u.verificationStatus === verificationFilter)
  )

  const filteredOpportunities = opportunities.filter(o => 
    (o.title?.toLowerCase().includes(oppSearch.toLowerCase()) ||
     o.organization?.toLowerCase().includes(oppSearch.toLowerCase())) &&
    (oppStatusFilter === 'all' || o.status === oppStatusFilter) &&
    (oppCategoryFilter === 'all' || o.category === oppCategoryFilter)
  )

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage users, moderate content, and oversee system operations
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            component={Link}
            to="/admin/post"
          >
            Post New Opportunity
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Users</Typography>
                    <Typography variant="h3" fontWeight={700}>{stats.totalUsers}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <Group />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Opportunities</Typography>
                    <Typography variant="h3" fontWeight={700}>{stats.totalOpportunities}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <Assignment />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, bgcolor: 'warning.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Pending Approvals</Typography>
                    <Typography variant="h3" fontWeight={700}>{stats.pendingApprovals}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <Pending />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, bgcolor: 'error.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Active Reports</Typography>
                    <Typography variant="h3" fontWeight={700}>{stats.activeReports}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <Flag />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs Navigation */}
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, v) => setActiveTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<DashboardIcon />} iconPosition="start" label="Overview" />
            <Tab icon={<Assignment />} iconPosition="start" label={`Opportunities (${opportunities.length})`} />
            <Tab icon={<Group />} iconPosition="start" label={`Users (${users.length})`} />
            <Tab icon={<Flag />} iconPosition="start" label={`Reports (${stats.activeReports})`} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Recent Activity */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Activity
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}><Person /></Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={500}>New user registered</Typography>
                      <Typography variant="body2" color="text.secondary">John Doe joined 2 hours ago</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main' }}><Assignment /></Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={500}>New opportunity posted</Typography>
                      <Typography variant="body2" color="text.secondary">NSFAS Bursary 2026 pending approval</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'error.main' }}><Flag /></Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={500}>Content reported</Typography>
                      <Typography variant="body2" color="text.secondary">User reported spam content 5 hours ago</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Quick Actions */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    startIcon={<CheckCircle />}
                    onClick={() => setActiveTab(1)}
                    fullWidth
                  >
                    Review Pending ({stats.pendingApprovals})
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Flag />}
                    onClick={() => setActiveTab(3)}
                    fullWidth
                  >
                    Handle Reports ({stats.activeReports})
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<Group />}
                    onClick={() => setActiveTab(2)}
                    fullWidth
                  >
                    Manage Users
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeTab === 1 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                Manage Opportunities
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search opportunities..."
                  value={oppSearch}
                  onChange={(e) => setOppSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={oppStatusFilter}
                    onChange={(e) => setOppStatusFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={oppCategoryFilter}
                    onChange={(e) => setOppCategoryFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="bursary">Bursary</MenuItem>
                    <MenuItem value="career">Career</MenuItem>
                    <MenuItem value="learnership">Learnership</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                    <TableCell><strong>Organization</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Created</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOpportunities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Alert severity="info">No opportunities found</Alert>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOpportunities.map((opp) => (
                      <TableRow key={opp._id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {opp.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={opp.category} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{opp.organization || 'N/A'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={opp.status} 
                            size="small" 
                            color={getStatusColor(opp.status)}
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(opp.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small"
                            onClick={() => {
                              setSelectedItem(opp)
                              setDetailsDialog(true)
                            }}
                          >
                            <Visibility />
                          </IconButton>
                          {opp.status === 'pending' && (
                            <>
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => handleOpportunityAction(opp._id, 'approved')}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleOpportunityAction(opp._id, 'rejected')}
                              >
                                <Cancel />
                              </IconButton>
                            </>
                          )}
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                Manage Users
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="all">All Roles</MenuItem>
                    <MenuItem value="user">Users</MenuItem>
                    <MenuItem value="stakeholder">Stakeholders</MenuItem>
                    <MenuItem value="admin">Admins</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <Select
                    value={verificationFilter}
                    onChange={(e) => setVerificationFilter(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="all">All Verification Status</MenuItem>
                    <MenuItem value="pending">Pending Approval</MenuItem>
                    <MenuItem value="verified">Verified</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>User</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                    <TableCell><strong>Verification</strong></TableCell>
                    <TableCell><strong>Joined</strong></TableCell>
                    <TableCell align="right"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Alert severity="info">No users found</Alert>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user._id} hover>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {user.name || 'Unknown'}
                              </Typography>
                              {user.companyName && (
                                <Typography variant="caption" color="text.secondary">
                                  {user.companyName}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.role} 
                            size="small" 
                            color={user.role === 'admin' ? 'error' : user.role === 'stakeholder' ? 'info' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          {user.role === 'stakeholder' && (
                            <Chip 
                              label={user.verificationStatus || 'pending'} 
                              size="small" 
                              color={
                                user.verificationStatus === 'verified' ? 'success' :
                                user.verificationStatus === 'rejected' ? 'error' : 'warning'
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {user.role === 'stakeholder' && user.verificationStatus === 'pending' && (
                            <>
                              <Tooltip title="Approve Stakeholder">
                                <IconButton 
                                  size="small" 
                                  color="success"
                                  onClick={() => handleVerificationAction(user._id, 'verified')}
                                >
                                  <CheckCircle />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reject Stakeholder">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleVerificationAction(user._id, 'rejected')}
                                >
                                  <Cancel />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          <IconButton 
                            size="small"
                            onClick={() => {
                              setSelectedItem(user)
                              setDetailsDialog(true)
                            }}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget)
                              setSelectedItem(user)
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Content Reports
            </Typography>
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              {reports.map((report) => (
                <Grid item xs={12} key={report.id}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Flag color="error" />
                            <Typography variant="h6" fontWeight={600}>
                              {report.reportedItem}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {report.description}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <Chip label={report.type} size="small" color="error" variant="outlined" />
                            <Chip 
                              label={report.status} 
                              size="small" 
                              color={getStatusColor(report.status)}
                            />
                            <Chip 
                              label={`Reported by: ${report.reportedBy}`} 
                              size="small" 
                              variant="outlined"
                            />
                            <Chip 
                              label={new Date(report.date).toLocaleDateString()} 
                              size="small" 
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                        {report.status === 'pending' && (
                          <Grid item>
                            <Button 
                              variant="contained" 
                              size="small" 
                              color="success"
                              onClick={() => handleReportAction(report.id, 'resolve')}
                              sx={{ mr: 1 }}
                            >
                              Resolve
                            </Button>
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => handleReportAction(report.id, 'dismiss')}
                            >
                              Dismiss
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Details Dialog */}
        <Dialog 
          open={detailsDialog} 
          onClose={() => setDetailsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedItem?.title || selectedItem?.name || 'Details'}
          </DialogTitle>
          <DialogContent>
            {selectedItem && (
              <Box sx={{ pt: 2 }}>
                {selectedItem.email ? (
                  // User details
                  <>
                    <Typography variant="body1" gutterBottom><strong>Email:</strong> {selectedItem.email}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Role:</strong> {selectedItem.role}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Joined:</strong> {new Date(selectedItem.createdAt).toLocaleDateString()}</Typography>
                  </>
                ) : (
                  // Opportunity details
                  <>
                    <Typography variant="body1" gutterBottom><strong>Category:</strong> {selectedItem.category}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Organization:</strong> {selectedItem.organization || 'N/A'}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Status:</strong> {selectedItem.status}</Typography>
                    <Typography variant="body1" gutterBottom><strong>Description:</strong></Typography>
                    <Typography variant="body2" color="text.secondary">{selectedItem.description || 'No description provided'}</Typography>
                  </>
                )}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* User Actions Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleUserAction(selectedItem?._id, 'suspend')}>
            <ListItemIcon><Block fontSize="small" /></ListItemIcon>
            <ListItemText>Suspend User</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleUserAction(selectedItem?._id, 'delete')}>
            <ListItemIcon><Delete fontSize="small" /></ListItemIcon>
            <ListItemText>Delete User</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon><Email fontSize="small" /></ListItemIcon>
            <ListItemText>Send Message</ListItemText>
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  )
}

export default AdminDashboard

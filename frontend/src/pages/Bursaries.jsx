import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Chip, Paper, CircularProgress, Alert } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import SearchIcon from '@mui/icons-material/Search'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EventIcon from '@mui/icons-material/Event'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import api from '../api'
import { formatDate, isExpiringSoon } from '../utils/dateUtils'
import QuickApplyDialog from '../components/QuickApplyDialog'

const Bursaries = () => {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('')
  const [field, setField] = useState('')
  const [bursaries, setBursaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savedBursaries, setSavedBursaries] = useState(new Set())
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedBursary, setSelectedBursary] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchBursaries()
    if (token) fetchSavedBursaries()
  }, [])

  const fetchBursaries = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({
        category: 'bursary',
        ...(search && { search }),
        ...(level && { subcategory: level }),
        page: 1,
        limit: 50
      })
      const response = await api.get(`/opportunities?${params}`)
      setBursaries(response.data.opportunities || [])
    } catch (err) {
      console.error('Error fetching bursaries:', err)
      setError('Failed to load bursaries. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const fetchSavedBursaries = async () => {
    try {
      const response = await api.get('/users/me/saved')
      const savedIds = new Set(response.data.map(opp => opp._id))
      setSavedBursaries(savedIds)
    } catch (err) {
      console.error('Error fetching saved bursaries:', err)
    }
  }

  const handleFilter = () => {
    fetchBursaries()
  }

  const handleSave = async (bursaryId) => {
    if (!token) {
      alert('Please login to save bursaries')
      return
    }
    try {
      if (savedBursaries.has(bursaryId)) {
        await api.delete(`/opportunities/${bursaryId}/save`)
        setSavedBursaries(prev => {
          const newSet = new Set(prev)
          newSet.delete(bursaryId)
          return newSet
        })
      } else {
        await api.post(`/opportunities/${bursaryId}/save`)
        setSavedBursaries(prev => new Set(prev).add(bursaryId))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save bursary')
    }
  }

  const handleApply = (bursary) => {
    if (!token) {
      alert('Please login to apply')
      return
    }
    
    // Check if opportunity allows internal application (our platform)
    if (bursary.allowInternalApplication) {
      setSelectedBursary(bursary)
      setShowApplyDialog(true)
    }
    // If has external URL, redirect there
    else if (bursary.applyUrl) {
      window.open(bursary.applyUrl, '_blank')
    } 
    // Fallback to website if available
    else if (bursary.website) {
      window.open(bursary.website, '_blank')
    } 
    // No application method available
    else {
      alert('No application method available for this opportunity')
    }
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: '#6366f1', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Bursaries & Scholarships</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Fund your education with financial aid opportunities</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Filters */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField 
                fullWidth 
                placeholder="Search bursaries..." 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Level" value={level} onChange={e => setLevel(e.target.value)}>
                <MenuItem value="">All Levels</MenuItem>
                <MenuItem value="Grade 12">Grade 12</MenuItem>
                <MenuItem value="University">University</MenuItem>
                <MenuItem value="Tertiary">Tertiary</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField select fullWidth label="Field of Study" value={field} onChange={e => setField(e.target.value)}>
                <MenuItem value="">All Fields</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Accounting">Accounting</MenuItem>
                <MenuItem value="Teaching">Teaching</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={1}>
              <Button variant="contained" fullWidth onClick={handleFilter}>Filter</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Bursary Cards */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        ) : (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight={600}>{bursaries.length} Bursaries Available</Typography>
            </Box>

            {bursaries.length === 0 ? (
              <Alert severity="info">No bursaries found. Try adjusting your filters.</Alert>
            ) : (
              <Grid container spacing={3}>
                {bursaries.map((b) => (
                  <Grid item xs={12} md={6} key={b._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                      {b.imageUrl && (
                        <Box
                          component="img"
                          src={b.imageUrl}
                          alt={b.title}
                          sx={{ height: 180, objectFit: 'cover' }}
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {b.subcategory && <Chip label={b.subcategory} size="small" color="primary" />}
                            {b.featured && <Chip label="Featured" size="small" color="secondary" />}
                            {b.urgent && <Chip label="Urgent" size="small" color="error" />}
                            {isExpiringSoon(b.closingDate) && <Chip label="Closing Soon" size="small" color="warning" />}
                          </Box>
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{b.title}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Provider:</strong> {b.organization}
                        </Typography>
                        {b.closingDate && (
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                            <EventIcon fontSize="small" color="action" />
                            <Typography variant="body2" color={isExpiringSoon(b.closingDate) ? 'error.main' : 'text.secondary'}>
                              Closes: {formatDate(b.closingDate)}
                              {isExpiringSoon(b.closingDate) && ' (Closing Soon!)'}
                            </Typography>
                          </Box>
                        )}
                        {b.amount && (
                          <Typography variant="body2" color="success.main" fontWeight={600} gutterBottom>
                            {b.amount} {b.fundingType && `(${b.fundingType})`}
                          </Typography>
                        )}
                        {b.location && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Location:</strong> {b.location}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {b.description}
                        </Typography>
                        {b.views > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {b.views} views • {b.applications || 0} applications
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          onClick={() => handleApply(b)}
                          endIcon={<OpenInNewIcon />}
                        >
                          Apply Now
                        </Button>
                        <Button 
                          variant="outlined" 
                          onClick={() => handleSave(b._id)}
                          startIcon={savedBursaries.has(b._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        >
                          {savedBursaries.has(b._id) ? 'Saved' : 'Save'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>

      {/* Info Box */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight={600} gutterBottom textAlign="center">
            📚 Need Help with Applications?
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" mb={3}>
            Check out our application tips and resume builder to improve your chances
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="outlined" color="success">Application Tips</Button>
            <Button variant="contained" color="success">Resume Builder</Button>
          </Box>
        </Container>
      </Box>

      {/* Quick Apply Dialog */}
      <QuickApplyDialog
        open={showApplyDialog}
        onClose={() => {
          setShowApplyDialog(false)
          setSelectedBursary(null)
        }}
        opportunity={selectedBursary}
        user={user}
      />
    </Box>
  )
}

export default Bursaries

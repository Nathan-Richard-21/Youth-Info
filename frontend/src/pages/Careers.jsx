import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, TextField, MenuItem, Chip, Paper, Tabs, Tab, CircularProgress, Alert } from '@mui/material'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BusinessIcon from '@mui/icons-material/Business'
import EventIcon from '@mui/icons-material/Event'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import api from '../api'
import QuickApplyDialog from '../components/QuickApplyDialog'

const Careers = () => {
  const [subcategory, setSubcategory] = useState('')
  const [location, setLocation] = useState('')
  const [search, setSearch] = useState('')
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [savedCareers, setSavedCareers] = useState(new Set())
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchCareers()
    if (token) fetchSavedCareers()
  }, [subcategory])

  const fetchCareers = async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams({
        category: 'career',
        ...(search && { search }),
        ...(location && { location }),
        ...(subcategory && { subcategory }),
        page: 1,
        limit: 50
      })
      const response = await api.get(`/opportunities?${params}`)
      setCareers(response.data.opportunities || [])
    } catch (err) {
      console.error('Error fetching careers:', err)
      setError('Failed to load career opportunities')
    } finally {
      setLoading(false)
    }
  }

  const fetchSavedCareers = async () => {
    try {
      const response = await api.get('/users/me/saved')
      const savedIds = new Set(response.data.map(opp => opp._id))
      setSavedCareers(savedIds)
    } catch (err) {
      console.error('Error fetching saved careers:', err)
    }
  }

  const handleSave = async (careerId) => {
    if (!token) {
      alert('Please login to save opportunities')
      return
    }
    try {
      if (savedCareers.has(careerId)) {
        await api.delete(`/opportunities/${careerId}/save`)
        setSavedCareers(prev => {
          const newSet = new Set(prev)
          newSet.delete(careerId)
          return newSet
        })
      } else {
        await api.post(`/opportunities/${careerId}/save`)
        setSavedCareers(prev => new Set(prev).add(careerId))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save')
    }
  }

  const handleApply = (job) => {
    if (!token) {
      alert('Please login to apply')
      return
    }
    
    // Check if opportunity allows internal application (our platform)
    if (job.allowInternalApplication) {
      setSelectedCareer(job)
      setShowApplyDialog(true)
    }
    // If has external URL, redirect there
    else if (job.applyUrl) {
      window.open(job.applyUrl, '_blank')
    } 
    // Fallback to website if available
    else if (job.website) {
      window.open(job.website, '_blank')
    } 
    // No application method available
    else {
      alert('No application method available for this opportunity')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const isExpiringSoon = (dateString) => {
    if (!dateString) return false
    const closingDate = new Date(dateString)
    const today = new Date()
    const daysUntilClose = Math.ceil((closingDate - today) / (1000 * 60 * 60 * 24))
    return daysUntilClose <= 7 && daysUntilClose > 0
  }

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ bgcolor: '#10b981', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WorkIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Career Opportunities</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Jobs, internships & graduate programs for youth</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabs & Filters */}
      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth placeholder="Search jobs or companies..." value={search} onChange={e => setSearch(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && fetchCareers()} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Education Level" value={subcategory} onChange={e => setSubcategory(e.target.value)}>
                  <MenuItem value="">All Levels</MenuItem>
                  <MenuItem value="no-matric">No Matric Required</MenuItem>
                  <MenuItem value="matric">Matric</MenuItem>
                  <MenuItem value="diploma">Diploma</MenuItem>
                  <MenuItem value="degree">Degree</MenuItem>
                  <MenuItem value="postgraduate">Postgraduate</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                  <MenuItem value="graduate-program">Graduate Program</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField select fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)}>
                  <MenuItem value="">All Locations</MenuItem>
                  <MenuItem value="Port Elizabeth">Port Elizabeth</MenuItem>
                  <MenuItem value="East London">East London</MenuItem>
                  <MenuItem value="Mthatha">Mthatha</MenuItem>
                  <MenuItem value="Grahamstown">Grahamstown</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" onClick={fetchCareers} fullWidth>Search Opportunities</Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Job Listings */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>{careers.length} Opportunities Found</Typography>

            {careers.length === 0 ? (
              <Alert severity="info">No career opportunities found. Try adjusting your filters.</Alert>
            ) : (
              <Grid container spacing={3}>
                {careers.map((job) => (
                  <Grid item xs={12} key={job._id}>
                    <Card sx={{ '&:hover': { boxShadow: 4 } }}>
                      {job.imageUrl && (
                        <Box
                          component="img"
                          src={job.imageUrl}
                          alt={job.title}
                          sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>{job.title}</Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1, flexWrap: 'wrap' }}>
                              <BusinessIcon fontSize="small" color="action" />
                              <Typography variant="body2" color="text.secondary">{job.organization}</Typography>
                              {job.location && (
                                <>
                                  <LocationOnIcon fontSize="small" color="action" sx={{ ml: 2 }} />
                                  <Typography variant="body2" color="text.secondary">{job.location}</Typography>
                                </>
                              )}
                            </Box>
                            {job.closingDate && (
                              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                                <EventIcon fontSize="small" color="action" />
                                <Typography variant="body2" color={isExpiringSoon(job.closingDate) ? 'error.main' : 'text.secondary'}>
                                  Closes: {formatDate(job.closingDate)}
                                  {isExpiringSoon(job.closingDate) && ' (Closing Soon!)'}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            {job.employmentType && <Chip label={job.employmentType} size="small" color="primary" sx={{ mb: 1 }} />}
                            {job.subcategory && <Chip label={job.subcategory} size="small" sx={{ ml: 1, mb: 1 }} />}
                            {job.featured && <Chip label="Featured" size="small" color="secondary" sx={{ ml: 1, mb: 1 }} />}
                            {job.urgent && <Chip label="Urgent" size="small" color="error" sx={{ ml: 1, mb: 1 }} />}
                            {isExpiringSoon(job.closingDate) && <Chip label="Closing Soon" size="small" color="warning" sx={{ ml: 1, mb: 1 }} />}
                          </Box>
                        </Box>
                        {job.salary && (
                          <Typography variant="body1" color="success.main" fontWeight={600} mb={1}>
                            {job.salary}
                          </Typography>
                        )}
                        {job.experience && (
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            <strong>Experience:</strong> {job.experience}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          mb: 1
                        }}>
                          {job.description}
                        </Typography>
                        {job.views > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {job.views} views • {job.applications || 0} applications
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button 
                          variant="contained" 
                          onClick={() => handleApply(job)}
                          endIcon={<OpenInNewIcon />}
                        >
                          Apply Now
                        </Button>
                        <Button 
                          variant="outlined"
                          onClick={() => handleSave(job._id)}
                          startIcon={savedCareers.has(job._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        >
                          {savedCareers.has(job._id) ? 'Saved' : 'Save'}
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

      {/* CTA */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            💼 Need Career Guidance?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join career forums, build your resume, and get mentorship
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="success">Career Forums</Button>
            <Button variant="outlined" color="success">Resume Builder</Button>
            <Button variant="contained" color="success">Find a Mentor</Button>
          </Box>
        </Container>
      </Box>

      {/* Quick Apply Dialog */}
      <QuickApplyDialog
        open={showApplyDialog}
        onClose={() => {
          setShowApplyDialog(false)
          setSelectedCareer(null)
        }}
        opportunity={selectedCareer}
        user={user}
      />
    </Box>
  )
}

export default Careers

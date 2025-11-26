import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Paper, Tabs, Tab, CircularProgress, Alert } from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ForumIcon from '@mui/icons-material/Forum'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EventIcon from '@mui/icons-material/Event'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import api from '../api'
import { formatDate, isExpiringSoon } from '../utils/dateUtils'
import QuickApplyDialog from '../components/QuickApplyDialog'

const BusinessFunding = () => {
  const [tabValue, setTabValue] = useState(0)
  const [funding, setFunding] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(new Set())
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedFunding, setSelectedFunding] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchFunding()
    if (token) fetchSaved()
  }, [])

  const fetchFunding = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?category=business&limit=50')
      setFunding(response.data.opportunities || [])
    } catch (err) {
      setError('Failed to load business funding opportunities')
    } finally {
      setLoading(false)
    }
  }

  const fetchSaved = async () => {
    try {
      const response = await api.get('/users/me/saved')
      setSaved(new Set(response.data.map(o => o._id)))
    } catch (err) {
      console.error(err)
    }
  }

  const handleSave = async (id) => {
    if (!token) return alert('Please login')
    try {
      if (saved.has(id)) {
        await api.delete(`/opportunities/${id}/save`)
        setSaved(prev => { const n = new Set(prev); n.delete(id); return n })
      } else {
        await api.post(`/opportunities/${id}/save`)
        setSaved(prev => new Set(prev).add(id))
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed')
    }
  }

  const handleApply = async (opportunity) => {
    if (!token) return alert('Please login')
    
    // Check if opportunity allows internal application (our platform)
    if (opportunity.allowInternalApplication) {
      setSelectedFunding(opportunity)
      setShowApplyDialog(true)
    }
    // If has external URL, redirect there
    else if (opportunity.applyUrl) {
      window.open(opportunity.applyUrl, '_blank')
    } 
    // Fallback to website if available
    else if (opportunity.website) {
      window.open(opportunity.website, '_blank')
    } 
    // No application method available
    else {
      alert('No application method available for this opportunity')
    }
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#ef4444', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BusinessCenterIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Business Funding</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Grants, loans & competitions for young entrepreneurs</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ borderRadius: 3 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Grants & Loans" />
            <Tab label="Competitions" />
          </Tabs>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>{funding.length} Funding Opportunities</Typography>
            {funding.length === 0 ? (
              <Alert severity="info">No business funding opportunities available.</Alert>
            ) : (
              <Grid container spacing={3}>
                {funding.map((g) => (
                  <Grid item xs={12} md={6} key={g._id}>
                    <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                      {g.imageUrl && (
                        <Box component="img" src={g.imageUrl} alt={g.title}
                          sx={{ height: 180, width: '100%', objectFit: 'cover' }}
                          onError={(e) => e.target.style.display = 'none'} />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          {g.fundingType && <Chip label={g.fundingType} size="small" color="success" />}
                          {g.subcategory && <Chip label={g.subcategory} size="small" color="primary" />}
                          {g.featured && <Chip label="Featured" size="small" color="secondary" />}
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{g.title}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Provider:</strong> {g.organization}
                        </Typography>
                        {g.amount && (
                          <Typography variant="h5" color="success.main" fontWeight={700} gutterBottom>
                            {g.amount}
                          </Typography>
                        )}
                        {g.location && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Location:</strong> {g.location}
                          </Typography>
                        )}
                        {g.closingDate && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                            <EventIcon fontSize="small" color="action" />
                            <Typography variant="body2" color={isExpiringSoon(g.closingDate) ? 'error' : 'text.secondary'}>
                              <strong>Closes:</strong> {formatDate(g.closingDate)}
                              {isExpiringSoon(g.closingDate) && ' ⚠️ Closing Soon!'}
                            </Typography>
                          </Box>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{
                          overflow: 'hidden', textOverflow: 'ellipsis',
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                        }}>
                          {g.description}
                        </Typography>
                        {g.views > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {g.views} views • {g.applications || 0} applications
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button 
                          variant="contained" 
                          color="error" 
                          onClick={() => handleApply(g)}
                          endIcon={g.applyUrl ? <OpenInNewIcon /> : null}
                        >
                          Apply
                        </Button>
                        <Button onClick={() => handleSave(g._id)}
                          startIcon={saved.has(g._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
                          {saved.has(g._id) ? 'Saved' : 'Save'}
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

      <Box sx={{ bgcolor: '#fef2f2', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            💡 Need Help with Your Business Plan?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Access resources, templates, and mentorship from successful entrepreneurs
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="error">Business Plan Templates</Button>
            <Button variant="outlined" color="error">Join Entrepreneur Forum</Button>
            <Button variant="contained" color="error">Find a Mentor</Button>
          </Box>
        </Container>
      </Box>

      {/* Quick Apply Dialog */}
      <QuickApplyDialog
        open={showApplyDialog}
        onClose={() => {
          setShowApplyDialog(false)
          setSelectedFunding(null)
        }}
        opportunity={selectedFunding}
        user={user}
      />
    </Box>
  )
}

export default BusinessFunding

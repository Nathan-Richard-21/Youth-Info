import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Paper, CircularProgress, Alert } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import ForumIcon from '@mui/icons-material/Forum'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import EventIcon from '@mui/icons-material/Event'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import api from '../api'
import { formatDate, isExpiringSoon } from '../utils/dateUtils'
import QuickApplyDialog from '../components/QuickApplyDialog'

const Learnerships = () => {
  const [learnerships, setLearnerships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(new Set())
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [selectedLearnership, setSelectedLearnership] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchLearnerships()
    if (token) fetchSaved()
  }, [])

  const fetchLearnerships = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?category=learnership&limit=50')
      setLearnerships(response.data.opportunities || [])
    } catch (err) {
      setError('Failed to load learnerships')
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

  const handleApply = async (learnership) => {
    if (!token) return alert('Please login')
    
    // Check if opportunity allows internal application (our platform)
    if (learnership.allowInternalApplication) {
      setSelectedLearnership(learnership)
      setShowApplyDialog(true)
    }
    // If has external URL, redirect there
    else if (learnership.applyUrl) {
      window.open(learnership.applyUrl, '_blank')
    } 
    // Fallback to website if available
    else if (learnership.website) {
      window.open(learnership.website, '_blank')
    } 
    // No application method available
    else {
      alert('No application method available for this opportunity')
    }
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#f59e0b', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Learnerships</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Learn while you earn - Gain skills & qualifications</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Paper sx={{ p: 3, mb: 4, bgcolor: '#fffbeb' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>What is a Learnership?</Typography>
          <Typography variant="body1">
            A learnership combines practical work experience with structured learning, leading to a nationally recognized qualification. You earn a stipend while gaining hands-on skills in your field. Perfect for youth starting their careers!
          </Typography>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>{learnerships.length} Learnerships Available</Typography>

            {learnerships.length === 0 ? (
              <Alert severity="info">No learnerships available at the moment.</Alert>
            ) : (
              <Grid container spacing={3}>
                {learnerships.map((learn) => (
                  <Grid item xs={12} md={6} key={learn._id}>
                    <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                      {learn.imageUrl && (
                        <Box component="img" src={learn.imageUrl} alt={learn.title}
                          sx={{ height: 180, width: '100%', objectFit: 'cover' }}
                          onError={(e) => e.target.style.display = 'none'} />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                          {learn.subcategory && <Chip label={learn.subcategory} size="small" color="warning" />}
                          {learn.featured && <Chip label="Featured" size="small" color="secondary" />}
                          {learn.urgent && <Chip label="Urgent" size="small" color="error" />}
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{learn.title}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          <strong>Provider:</strong> {learn.organization}
                        </Typography>
                        {learn.location && (
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Location:</strong> {learn.location}
                          </Typography>
                        )}
                        {learn.closingDate && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                            <EventIcon fontSize="small" color="action" />
                            <Typography variant="body2" color={isExpiringSoon(learn.closingDate) ? 'error' : 'text.secondary'}>
                              <strong>Closes:</strong> {formatDate(learn.closingDate)}
                              {isExpiringSoon(learn.closingDate) && ' ⚠️ Closing Soon!'}
                            </Typography>
                          </Box>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{ 
                          overflow: 'hidden', textOverflow: 'ellipsis', 
                          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' 
                        }}>
                          {learn.description}
                        </Typography>
                        {learn.views > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                            {learn.views} views • {learn.applications || 0} applications
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button 
                          variant="contained" 
                          color="warning" 
                          onClick={() => handleApply(learn)}
                          endIcon={learn.applyUrl ? <OpenInNewIcon /> : null}
                        >
                          Apply Now
                        </Button>
                        <Button onClick={() => handleSave(learn._id)}
                          startIcon={saved.has(learn._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
                          {saved.has(learn._id) ? 'Saved' : 'Save'}
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

      <Box sx={{ bgcolor: '#fef3c7', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            🎓 Want to Learn More?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Join learnership forums to connect with current learners and alumni
          </Typography>
          <Button variant="contained" color="warning">Browse Forums</Button>
        </Container>
      </Box>

      {/* Quick Apply Dialog */}
      <QuickApplyDialog
        open={showApplyDialog}
        onClose={() => {
          setShowApplyDialog(false)
          setSelectedLearnership(null)
        }}
        opportunity={selectedLearnership}
        user={user}
      />
    </Box>
  )
}

export default Learnerships

import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Card, CardContent, CardActions, Grid, Chip, Container, Alert } from '@mui/material'
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import api from '../api'
import QuickApplyDialog from '../components/QuickApplyDialog'

const Opportunities = () => {
  const [opps, setOpps] = useState([])
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load user data
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    load()
  }, [category])

  const load = async () => {
    try {
      const params = {}
      if (category) params.category = category
      if (search) params.search = search
      const res = await api.get('/opportunities', { params })
      setOpps(res.data)
    } catch (err) { console.error(err) }
  }

  const handleSearch = () => { load() }

  const handleQuickApply = (opp) => {
    if (!user) {
      alert('Please log in to apply for opportunities')
      return
    }
    
    if (!opp.allowInternalApplication) {
      // External link
      if (opp.externalLink) {
        window.open(opp.externalLink, '_blank')
      } else {
        alert('This opportunity does not have an application link')
      }
      return
    }

    // Internal application
    setSelectedOpportunity(opp)
    setShowApplyDialog(true)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3} fontWeight={700}>Youth Opportunities</Typography>
      
      {!user && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Log in to apply for opportunities with our Quick Apply feature!
        </Alert>
      )}
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField 
          select 
          label="Category" 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Bursaries">Bursaries & Scholarships</MenuItem>
          <MenuItem value="Jobs">Career & Jobs</MenuItem>
          <MenuItem value="Business Funding">Business Funding</MenuItem>
          <MenuItem value="Learnerships">Learnerships</MenuItem>
          <MenuItem value="Internships">Internships</MenuItem>
          <MenuItem value="Events">Events</MenuItem>
        </TextField>
        
        <TextField 
          label="Search" 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          placeholder="Search opportunities..."
          sx={{ flexGrow: 1 }}
        />
        
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>

      {opps.length === 0 && <Typography>No opportunities found. Check back soon!</Typography>}

      <Grid container spacing={3}>
        {opps.map(opp => (
          <Grid item xs={12} md={6} lg={4} key={opp._id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': { boxShadow: 6 },
              transition: 'all 0.3s ease'
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {opp.title}
                  </Typography>
                  {opp.allowInternalApplication && (
                    <Chip 
                      label="Quick Apply" 
                      size="small" 
                      color="success" 
                      icon={<CheckCircleIcon />}
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={opp.category} size="small" color="primary" />
                  {opp.location && <Chip label={opp.location} size="small" variant="outlined" />}
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {opp.description?.substring(0, 120)}...
                </Typography>
                
                {opp.deadline && (
                  <Typography variant="caption" display="block" color="text.secondary">
                    Deadline: {new Date(opp.deadline).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={() => {/* View details */}}
                >
                  Learn More
                </Button>
                <Button 
                  size="small" 
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => handleQuickApply(opp)}
                >
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Apply Dialog */}
      {selectedOpportunity && (
        <QuickApplyDialog
          open={showApplyDialog}
          onClose={() => {
            setShowApplyDialog(false)
            setSelectedOpportunity(null)
          }}
          opportunity={selectedOpportunity}
          user={user}
        />
      )}
    </Container>
  )
}

export default Opportunities

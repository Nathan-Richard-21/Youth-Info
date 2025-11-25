import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, MenuItem, Card, CardContent, CardActions, Grid, Chip, Container } from '@mui/material'
import api from '../api'

const Opportunities = () => {
  const [opps, setOpps] = useState([])
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => { load() }, [category])

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" mb={3}>Youth Opportunities</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField 
          select 
          label="Category" 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="bursary">Bursaries & Scholarships</MenuItem>
          <MenuItem value="career">Career & Jobs</MenuItem>
          <MenuItem value="business">Business Funding</MenuItem>
          <MenuItem value="other">Other</MenuItem>
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
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{opp.title}</Typography>
                <Chip label={opp.category} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {opp.description || 'No description available'}
                </Typography>
                {opp.expiry && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Expires: {new Date(opp.expiry).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <Button size="small">Apply</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Opportunities

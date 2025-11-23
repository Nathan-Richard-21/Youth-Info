import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardActions, Button, Chip, Paper, Tabs, Tab } from '@mui/material'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import ForumIcon from '@mui/icons-material/Forum'

const BusinessFunding = () => {
  const [tabValue, setTabValue] = useState(0)

  const grants = [
    { title: 'NYDA Grant (R10k - R100k)', provider: 'National Youth Development Agency', amount: 'R10,000 - R100,000', type: 'Grant', requirements: '18-35 years, business plan, SA citizen', forum: true },
    { title: 'SEDA Small Business Grant', provider: 'SEDA', amount: 'Up to R50,000', type: 'Grant', requirements: 'Registered business, <1 year old', forum: true },
    { title: 'Eastern Cape Development Corporation Funding', provider: 'ECDC', amount: 'R50,000 - R5M', type: 'Loan', requirements: 'Business in EC, viable business plan', forum: false },
    { title: 'National Empowerment Fund', provider: 'NEF', amount: 'R250k - R75M', type: 'Loan', requirements: '51% Black owned, business plan', forum: true }
  ]

  const competitions = [
    { title: 'SAB Foundation Social Innovation Awards', prize: 'R450,000', deadline: '2025-12-15', category: 'Social Enterprise' },
    { title: 'Eastern Cape Youth Entrepreneur Competition', prize: 'R100,000', deadline: '2025-11-30', category: 'All Sectors' },
    { title: 'Standard Bank Top Women Competition', prize: 'R350,000 + mentorship', deadline: '2026-01-20', category: 'Women Entrepreneurs' }
  ]

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
        {tabValue === 0 && (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>{grants.length} Funding Opportunities</Typography>
            <Grid container spacing={3}>
              {grants.map((g, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                    <CardContent>
                      <Chip label={g.type} size="small" color={g.type === 'Grant' ? 'success' : 'primary'} sx={{ mb: 2 }} />
                      <Typography variant="h6" fontWeight={600} gutterBottom>{g.title}</Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Provider:</strong> {g.provider}
                      </Typography>
                      <Typography variant="h5" color="success.main" fontWeight={700} gutterBottom>
                        {g.amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Requirements:</strong> {g.requirements}
                      </Typography>
                      {g.forum && (
                        <Chip icon={<ForumIcon />} label="Discuss in Forum" size="small" color="secondary" variant="outlined" sx={{ mt: 2 }} />
                      )}
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="error">Apply</Button>
                      {g.forum && <Button startIcon={<ForumIcon />}>Forum</Button>}
                      <Button>Save</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {tabValue === 1 && (
          <>
            <Typography variant="h5" fontWeight={600} mb={3}>{competitions.length} Active Competitions</Typography>
            <Grid container spacing={3}>
              {competitions.map((c, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Chip label={c.category} size="small" color="warning" sx={{ mb: 2 }} />
                      <Typography variant="h6" fontWeight={600} gutterBottom>{c.title}</Typography>
                      <Typography variant="h4" color="error.main" fontWeight={700} gutterBottom>
                        {c.prize}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Deadline:</strong> {new Date(c.deadline).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" color="error" fullWidth>Enter Competition</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
    </Box>
  )
}

export default BusinessFunding

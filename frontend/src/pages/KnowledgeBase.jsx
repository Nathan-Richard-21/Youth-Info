import React, { useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Chip, TextField, InputAdornment, Button } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'

const KnowledgeBase = () => {
  const [search, setSearch] = useState('')

  const categories = [
    {
      title: 'Bursary & Scholarship Applications',
      articles: [
        { title: 'How to Apply for NSFAS Step-by-Step', views: 1250 },
        { title: 'Writing a Motivational Letter for Bursaries', views: 890 },
        { title: 'Common NSFAS Application Mistakes to Avoid', views: 670 },
        { title: 'Alternative Bursaries When NSFAS is Not Approved', views: 520 }
      ]
    },
    {
      title: 'Career & Job Hunting',
      articles: [
        { title: 'How to Write a Winning CV (SA Format)', views: 2100 },
        { title: 'Interview Tips for First-Time Job Seekers', views: 1580 },
        { title: 'Your Rights as a Young Worker in SA', views: 430 },
        { title: 'Negotiating Your First Salary', views: 780 }
      ]
    },
    {
      title: 'Entrepreneurship & Business',
      articles: [
        { title: 'NYDA Grant Application Guide 2025', views: 950 },
        { title: 'Writing a Business Plan (Free Template)', views: 1120 },
        { title: 'Registering Your Business with CIPC', views: 670 },
        { title: 'Marketing Your Business on a Low Budget', views: 540 }
      ]
    },
    {
      title: 'Student Life & Study Skills',
      articles: [
        { title: 'Time Management for University Students', views: 830 },
        { title: 'How to Fund Your Studies Without NSFAS', views: 1200 },
        { title: 'Choosing the Right Course for You', views: 920 },
        { title: 'Managing Stress During Exams', views: 740 }
      ]
    },
    {
      title: 'Mental Health & Wellness',
      articles: [
        { title: 'Dealing with Anxiety and Depression', views: 1450 },
        { title: 'Free Mental Health Resources in EC', views: 680 },
        { title: 'Building Self-Confidence as a Young Person', views: 530 },
        { title: 'When and How to Seek Professional Help', views: 420 }
      ]
    }
  ]

  return (
    <Box>
      <Box sx={{ bgcolor: '#7c3aed', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <MenuBookIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Knowledge Base</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Guides, articles & tips for youth success</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 10 }}>
        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 3, boxShadow: 3 }}>
          <TextField 
            fullWidth 
            placeholder="Search articles, guides, tips..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h5" fontWeight={600} mb={4}>Browse by Category</Typography>

        {categories.map((cat, i) => (
          <Accordion key={i} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>{cat.title}</Typography>
              <Chip label={`${cat.articles.length} articles`} size="small" sx={{ ml: 2 }} />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {cat.articles.map((article, j) => (
                  <Grid item xs={12} md={6} key={j}>
                    <Card sx={{ '&:hover': { bgcolor: '#f8fafc', cursor: 'pointer' } }}>
                      <CardContent>
                        <Typography variant="body1" fontWeight={600} gutterBottom>
                          {article.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {article.views} views
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <Box sx={{ bgcolor: '#f5f3ff', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Can't Find What You're Looking For?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Ask the community in our forums or contact support
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" sx={{ color: '#7c3aed', borderColor: '#7c3aed' }}>Browse Forums</Button>
            <Button variant="contained" sx={{ bgcolor: '#7c3aed' }}>Contact Support</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default KnowledgeBase

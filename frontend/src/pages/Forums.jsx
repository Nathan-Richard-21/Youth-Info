import React from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Chip, Paper } from '@mui/material'
import ForumIcon from '@mui/icons-material/Forum'
import CommentIcon from '@mui/icons-material/Comment'
import PersonIcon from '@mui/icons-material/Person'

const Forums = () => {
  const forums = [
    { title: 'Bursary Application Help', category: 'Bursaries', posts: 342, members: 1250, lastActive: '2 hours ago', description: 'Get help with NSFAS and other bursary applications' },
    { title: 'Job Hunting Tips & Experiences', category: 'Careers', posts: 587, members: 2100, lastActive: '30 minutes ago', description: 'Share job opportunities, interview experiences, CV tips' },
    { title: 'Learnership Discussions', category: 'Learnerships', posts: 215, members: 680, lastActive: '1 hour ago', description: 'Connect with current and past learners' },
    { title: 'Entrepreneur Corner', category: 'Business', posts: 428, members: 950, lastActive: '3 hours ago', description: 'Business ideas, funding experiences, mentorship' },
    { title: 'University Life & Study Tips', category: 'Education', posts: 763, members: 3200, lastActive: '15 minutes ago', description: 'Campus life, study hacks, exam prep' },
    { title: 'Mental Health Support Group', category: 'Wellness', posts: 521, members: 1450, lastActive: '1 hour ago', description: 'Safe space for mental health discussions' }
  ]

  const recentTopics = [
    { title: 'Has anyone received NSFAS confirmation yet?', forum: 'Bursaries', replies: 23, views: 145, author: 'Thabo M.', time: '2 hours ago' },
    { title: 'Passed Standard Bank interview - AMA!', forum: 'Careers', replies: 45, views: 320, author: 'Nomsa Z.', time: '4 hours ago' },
    { title: 'NYDA grant application tips?', forum: 'Business', replies: 18, views: 92, author: 'Sipho K.', time: '6 hours ago' }
  ]

  return (
    <Box>
      <Box sx={{ bgcolor: '#f97316', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ForumIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Community Forums</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Connect, discuss & support each other</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        {/* Forum Categories */}
        <Typography variant="h5" fontWeight={600} mb={3}>Browse Forums</Typography>
        <Grid container spacing={3} mb={6}>
          {forums.map((forum, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Chip label={forum.category} size="small" color="warning" sx={{ mb: 1 }} />
                      <Typography variant="h6" fontWeight={600}>{forum.title}</Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: '#f97316' }}>
                      <ForumIcon />
                    </Avatar>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {forum.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{forum.posts}</strong> Posts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>{forum.members}</strong> Members
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Last active: {forum.lastActive}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button variant="contained" fullWidth color="warning">View Forum</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Topics */}
        <Typography variant="h5" fontWeight={600} mb={3}>Recent Discussions</Typography>
        <Paper>
          {recentTopics.map((topic, i) => (
            <Box key={i} sx={{ p: 3, borderBottom: i < recentTopics.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {topic.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Chip label={topic.forum} size="small" />
                    <Typography variant="body2" color="text.secondary">
                      by {topic.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.time}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right', minWidth: 100 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                    <CommentIcon fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={600}>{topic.replies}</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {topic.views} views
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>

      <Box sx={{ bgcolor: '#fff7ed', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Join the Conversation
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Sign up to post, reply, and connect with thousands of EC youth
          </Typography>
          <Button variant="contained" color="warning">Create Account</Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Forums

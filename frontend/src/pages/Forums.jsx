import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Chip, Paper, CircularProgress, Alert, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import ForumIcon from '@mui/icons-material/Forum'
import CommentIcon from '@mui/icons-material/Comment'
import PersonIcon from '@mui/icons-material/Person'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddIcon from '@mui/icons-material/Add'
import api from '../api'

const Forums = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general', tags: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/forum/posts?limit=20&sort=-createdAt')
      setPosts(response.data.posts)
      setError('')
    } catch (err) {
      console.error('Error fetching forum posts:', err)
      setError('Failed to load forum posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in title and content')
      return
    }

    console.log('📝 Creating forum post...')
    console.log('Token in localStorage:', localStorage.getItem('token') ? 'EXISTS' : 'MISSING')
    console.log('User in localStorage:', localStorage.getItem('user'))

    try {
      setSubmitting(true)
      const tagsArray = newPost.tags.split(',').map(t => t.trim()).filter(t => t)
      console.log('Sending POST request to /forum/posts')
      const response = await api.post('/forum/posts', {
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        tags: tagsArray
      })
      console.log('✅ Post created successfully:', response.data)
      setCreateDialogOpen(false)
      setNewPost({ title: '', content: '', category: 'general', tags: '' })
      fetchPosts()
      alert('Post created successfully!')
    } catch (err) {
      console.error('❌ Forum post error:', err)
      console.error('Error response:', err.response?.data)
      console.error('Error status:', err.response?.status)
      if (err.response?.status === 401) {
        const errorMsg = err.response?.data?.message || ''
        if (errorMsg.includes('User not found')) {
          // Old token format - need to re-login
          alert('⚠️ Your login session is using an old token format. Please logout and login again to fix this.\n\nClick OK to logout now.')
          localStorage.clear()
          window.location.href = '/login'
        } else {
          alert('Authentication failed. Your session may have expired. Please log out and log in again.')
        }
      } else {
        alert('Failed to create post: ' + (err.response?.data?.message || err.message))
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleLike = async (postId) => {
    try {
      await api.post(`/forum/posts/${postId}/like`)
      fetchPosts()
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Please log in to like posts.')
      }
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      bursaries: 'primary',
      careers: 'success',
      learnerships: 'info',
      business: 'warning',
      'success-stories': 'secondary',
      general: 'default',
      advice: 'error'
    }
    return colors[category] || 'default'
  }

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>Recent Discussions</Typography>
          <Button 
            variant="contained" 
            color="warning" 
            startIcon={<AddIcon />}
            onClick={() => setCreateDialogOpen(true)}
          >
            New Post
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : posts.length === 0 ? (
          <Alert severity="info">No posts yet. Be the first to start a discussion!</Alert>
        ) : (
          <Paper>
            {posts.map((post, i) => (
              <Box key={post._id} sx={{ p: 3, borderBottom: i < posts.length - 1 ? '1px solid #e5e7eb' : 'none', '&:hover': { bgcolor: '#fafafa' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                      {post.isPinned && <Chip label="📌 Pinned" size="small" color="warning" />}
                      <Chip label={post.category} size="small" color={getCategoryColor(post.category)} />
                      {post.tags && post.tags.map((tag, j) => (
                        <Chip key={j} label={tag} size="small" variant="outlined" />
                      ))}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ cursor: 'pointer' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Typography variant="body2" color="text.secondary">
                        by {post.author?.username || 'Anonymous'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(post.createdAt).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                        <CommentIcon fontSize="small" color="action" />
                        <Typography variant="body2" fontWeight={600}>{post.commentCount || 0}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="body2">{post.views || 0}</Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<ThumbUpOutlinedIcon />}
                        onClick={() => handleLike(post._id)}
                      >
                        {post.likes?.length || 0}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Paper>
        )}
      </Container>

      {/* Create Post Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              placeholder="What would you like to discuss?"
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newPost.category}
                label="Category"
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              >
                <MenuItem value="general">General</MenuItem>
                <MenuItem value="bursaries">Bursaries</MenuItem>
                <MenuItem value="careers">Careers</MenuItem>
                <MenuItem value="learnerships">Learnerships</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="success-stories">Success Stories</MenuItem>
                <MenuItem value="advice">Advice</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={6}
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              placeholder="Share your thoughts..."
            />
            <TextField
              label="Tags (comma separated)"
              fullWidth
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              placeholder="e.g. NSFAS, tips, help"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreatePost} variant="contained" color="warning" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>

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

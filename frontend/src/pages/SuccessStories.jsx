import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Avatar, Chip, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ShareIcon from '@mui/icons-material/Share'
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '../api'

const SuccessStories = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [newStory, setNewStory] = useState({
    title: '',
    description: '',
    location: '',
    organization: ''
  })

  const isLoggedIn = !!localStorage.getItem('token')

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await api.get('/opportunities?category=success-story&limit=50')
      setStories(response.data.opportunities || [])
    } catch (err) {
      setError('Failed to load success stories')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) {
      console.log('❌ No file selected')
      return
    }

    console.log('📁 File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2)
    })

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', file.type)
      alert('Please upload an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.log('❌ File too large:', file.size)
      alert('Image size should be less than 5MB')
      return
    }

    try {
      setUploadingImage(true)
      console.log('⬆️ Starting image upload...')
      
      const formData = new FormData()
      formData.append('image', file)
      
      console.log('📤 FormData created, sending request to /upload/image')

      const response = await api.post('/upload/image', formData)
      
      console.log('✅ Upload response:', response.data)
      
      // Handle both 'url' and 'imageUrl' fields from response
      const uploadedUrl = response.data.url || response.data.imageUrl
      
      if (!uploadedUrl) {
        throw new Error('No URL returned from server')
      }
      
      setImageUrl(uploadedUrl)
      console.log('✅ Image uploaded successfully:', uploadedUrl)
      alert('Image uploaded successfully!')
    } catch (err) {
      console.error('❌ Image upload error:', err)
      console.error('Error response:', err.response)
      console.error('Error data:', err.response?.data)
      alert('Failed to upload image: ' + (err.response?.data?.message || err.message))
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = () => {
    setImageUrl('')
  }

  const handleShareStory = async () => {
    console.log('\n========================================');
    console.log('🚀 SHARE STORY FUNCTION CALLED');
    console.log('========================================');
    console.log('isLoggedIn:', isLoggedIn);
    console.log('Token exists:', !!localStorage.getItem('token'));
    console.log('User in localStorage:', localStorage.getItem('user'));
    console.log('newStory data:', JSON.stringify(newStory, null, 2));
    
    if (!isLoggedIn) {
      console.log('❌ User not logged in - redirecting');
      alert('Please log in to share your success story.')
      window.location.href = '/login'
      return
    }

    if (!newStory.title.trim() || !newStory.description.trim()) {
      console.log('❌ Validation failed - missing title or description');
      alert('Please fill in at least the title and description.')
      return
    }

    try {
      setSubmitting(true)
      console.log('\n📝 Preparing to submit success story...');
      
      // Set closing date to 1 year from now (success stories don't really expire)
      const closingDate = new Date()
      closingDate.setFullYear(closingDate.getFullYear() + 1)
      console.log('📅 Closing date set to:', closingDate.toISOString());
      
      const storyData = {
        title: newStory.title.trim(),
        description: newStory.description.trim(),
        category: 'success-story',
        location: newStory.location.trim() || 'Eastern Cape',
        organization: newStory.organization.trim() || 'Community Member',
        closingDate: closingDate.toISOString(),
        requirements: [],
        tags: ['success', 'inspiration', 'youth'],
        imageUrl: imageUrl || undefined // Add image URL if uploaded
      }
      
      console.log('\n📤 Sending POST request to /opportunities');
      console.log('Data to send:');
      console.log(JSON.stringify(storyData, null, 2));
      
      const response = await api.post('/opportunities', storyData)
      
      console.log('\n✅ SUCCESS! Response received:');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(response.data, null, 2));
      console.log('========================================\n');
      
      alert('Your success story has been submitted! It will be reviewed by our team before being published.')
      setShareDialogOpen(false)
      setNewStory({ title: '', description: '', location: '', organization: '' })
      setImageUrl('') // Reset image
      fetchStories()
    } catch (err) {
      console.error('\n❌❌❌ ERROR SUBMITTING STORY ❌❌❌');
      console.error('Error object:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      console.error('Response headers:', err.response?.headers);
      console.error('========================================\n');
      
      if (err.response?.status === 401) {
        const msg = err.response?.data?.message || 'Authentication failed'
        alert('⚠️ Authentication Error\n\n' + msg + '\n\nPlease try logging in again.')
      } else {
        const errorMsg = err.response?.data?.message || err.message
        const errors = err.response?.data?.errors
        const details = err.response?.data?.details
        
        let alertMsg = 'Failed to submit your story:\n\n' + errorMsg
        
        if (details && details.length > 0) {
          alertMsg += '\n\nValidation errors:'
          details.forEach(d => {
            alertMsg += `\n- ${d.field}: ${d.message}`
          })
        }
        
        alert(alertMsg)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <Box 
        sx={{ 
          bgcolor: '#8b5cf6', 
          color: 'white', 
          py: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/succesfulwomen.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
            mixBlendMode: 'overlay'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Success Stories</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Be inspired by Eastern Cape youth who made it</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight={600} mb={4}>Real stories from real youth in Eastern Cape</Typography>

            {stories.length === 0 ? (
              <Alert severity="info">No success stories available yet.</Alert>
            ) : (
              <Grid container spacing={4}>
                {stories.map((story) => (
                  <Grid item xs={12} md={6} key={story._id}>
                    <Card sx={{ height: '100%', '&:hover': { boxShadow: 8 } }}>
                      {story.imageUrl && (
                        <CardMedia 
                          component="img" 
                          height="200" 
                          image={story.imageUrl.startsWith('http') ? story.imageUrl : `http://localhost:5001${story.imageUrl}`} 
                          alt={story.title}
                          onError={(e) => {
                            console.error('Failed to load image:', story.imageUrl)
                            e.target.style.display = 'none'
                          }} 
                        />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1, flexWrap: 'wrap' }}>
                          {story.subcategory && <Chip label={story.subcategory} size="small" color="secondary" />}
                          {story.location && <Chip label={story.location} size="small" variant="outlined" />}
                          {story.featured && <Chip label="Featured" size="small" color="primary" />}
                        </Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {story.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {story.description}
                        </Typography>
                        {story.organization && (
                          <Typography variant="caption" color="text.secondary">
                            {story.organization}
                          </Typography>
                        )}
                        {story.views > 0 && (
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                            {story.views} views
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>

      <Box sx={{ bgcolor: '#f5f3ff', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Got Your Own Success Story?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Share your journey and inspire others in the Eastern Cape youth community
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              sx={{ bgcolor: '#8b5cf6' }}
              startIcon={<ShareIcon />}
              onClick={() => setShareDialogOpen(true)}
            >
              Share Your Story
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Share Story Dialog */}
      <Dialog 
        open={shareDialogOpen} 
        onClose={() => setShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShareIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>Share Your Success Story</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Tell us about your journey! Your story will inspire other young people in Eastern Cape.
          </Typography>

          {/* Image Upload Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              Add a Photo (Optional)
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Upload an image to make your story more engaging
            </Typography>
            
            {imageUrl ? (
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Box
                  component="img"
                  src={`http://localhost:5001${imageUrl}`}
                  alt="Story image"
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '2px solid #e0e0e0'
                  }}
                />
                <IconButton
                  onClick={removeImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={uploadingImage ? <CircularProgress size={20} /> : <ImageIcon />}
                disabled={uploadingImage}
                sx={{ py: 2, mb: 2 }}
              >
                {uploadingImage ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            )}
          </Box>
          
          <TextField
            label="Story Title"
            fullWidth
            margin="normal"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            placeholder="e.g., From Unemployed to Software Developer"
            required
          />
          
          <TextField
            label="Your Story"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={newStory.description}
            onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
            placeholder="Tell us about your journey, challenges you faced, how you overcame them, and where you are now..."
            required
          />
          
          <TextField
            label="Location (Optional)"
            fullWidth
            margin="normal"
            value={newStory.location}
            onChange={(e) => setNewStory({ ...newStory, location: e.target.value })}
            placeholder="e.g., East London, Port Elizabeth"
          />
          
          <TextField
            label="Organization/Company (Optional)"
            fullWidth
            margin="normal"
            value={newStory.organization}
            onChange={(e) => setNewStory({ ...newStory, organization: e.target.value })}
            placeholder="e.g., Your current company or institution"
          />
          
          {!isLoggedIn && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              You need to be logged in to share your story. Click "Submit" to be redirected to login.
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setShareDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleShareStory}
            disabled={submitting}
            sx={{ bgcolor: '#8b5cf6' }}
          >
            {submitting ? 'Submitting...' : 'Submit Story'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SuccessStories

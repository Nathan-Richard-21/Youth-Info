import React, { useState, useEffect } from 'react'
import {
  Box, Container, Paper, Typography, TextField, Button, Grid,
  FormControl, InputLabel, Select, MenuItem, Chip, Alert,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Stepper, Step, StepLabel, Divider, Card, CardContent, Switch,
  FormControlLabel, Autocomplete
} from '@mui/material'
import {
  Add, Save, Cancel, Preview, Delete, Edit, Image as ImageIcon,
  AttachFile, CalendarToday, LocationOn, Work, School, Business
} from '@mui/icons-material'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const AdminPostPortal = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    category: 'bursary',
    subcategory: '',
    
    // Organization
    organization: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    
    // Location & Eligibility
    location: '',
    eligibility: '',
    requirements: [],
    
    // Dates
    deadline: '',
    startDate: '',
    endDate: '',
    
    // Financial (for bursaries/funding)
    amount: '',
    fundingType: '',
    
    // Employment (for careers)
    employmentType: '',
    salary: '',
    experience: '',
    
    // Media
    imageUrl: '',
    attachments: [],
    
    // Tags
    tags: [],
    keywords: [],
    
    // Status
    featured: false,
    urgent: false
  })
  
  const [requirement, setRequirement] = useState('')
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [previewDialog, setPreviewDialog] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  
  const steps = ['Basic Information', 'Details & Requirements', 'Dates & Location', 'Review & Publish']
  
  const categories = [
    { value: 'bursary', label: 'Bursary', icon: <School /> },
    { value: 'career', label: 'Career/Job', icon: <Work /> },
    { value: 'learnership', label: 'Learnership', icon: <School /> },
    { value: 'business', label: 'Business Funding', icon: <Business /> },
    { value: 'event', label: 'Event', icon: <CalendarToday /> },
    { value: 'success-story', label: 'Success Story', icon: <ImageIcon /> }
  ]
  
  const subcategories = {
    bursary: ['Undergraduate', 'Postgraduate', 'TVET', 'High School', 'Other'],
    career: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Volunteer'],
    learnership: ['Technical', 'Business', 'Healthcare', 'Engineering', 'Other'],
    business: ['Grant', 'Loan', 'Competition', 'Incubator', 'Other']
  }
  
  const locations = [
    'Eastern Cape', 'Nelson Mandela Bay', 'Buffalo City', 'Port Elizabeth',
    'East London', 'Mthatha', 'Grahamstown', 'Queenstown', 'Uitenhage',
    'Port Alfred', 'Online/Remote', 'National', 'Other'
  ]
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }
  
  const addRequirement = () => {
    if (requirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirement.trim()]
      }))
      setRequirement('')
    }
  }
  
  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }
  
  const addTag = () => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }))
      setTag('')
    }
  }
  
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }))
  }
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }
    
    try {
      setUploadingImage(true)
      setError('')
      
      const formDataUpload = new FormData()
      formDataUpload.append('image', file)
      
      const response = await api.post('/upload/image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Set the image URL from backend
      const imageUrl = `http://localhost:5001${response.data.imageUrl}`
      handleChange('imageUrl', imageUrl)
      setImageFile(file)
      setSuccess('Image uploaded successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Image upload error:', err)
      setError(err.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }
  
  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }))
    setImageFile(null)
  }
  
  const validateStep = (step) => {
    switch(step) {
      case 0:
        if (!formData.title || !formData.description || !formData.category) {
          setError('Please fill in all required fields')
          return false
        }
        if (formData.title.length < 10) {
          setError('Title must be at least 10 characters')
          return false
        }
        if (formData.description.length < 50) {
          setError('Description must be at least 50 characters')
          return false
        }
        break
      case 1:
        if (!formData.organization) {
          setError('Organization name is required')
          return false
        }
        break
      case 2:
        if (!formData.location) {
          setError('Location is required')
          return false
        }
        if (formData.deadline && new Date(formData.deadline) < new Date()) {
          setError('Deadline cannot be in the past')
          return false
        }
        break
    }
    setError('')
    return true
  }
  
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1)
    }
  }
  
  const handleBack = () => {
    setActiveStep(prev => prev - 1)
    setError('')
  }
  
  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Final validation
      if (!validateStep(activeStep)) {
        setLoading(false)
        return
      }
      
      const response = await api.post('/admin/opportunities', formData)
      
      setSuccess('Opportunity posted successfully!')
      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post opportunity')
    } finally {
      setLoading(false)
    }
  }
  
  const renderStepContent = () => {
    switch(activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  label="Category"
                >
                  {categories.map(cat => (
                    <MenuItem key={cat.value} value={cat.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {cat.icon}
                        {cat.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {subcategories[formData.category] && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={formData.subcategory}
                    onChange={(e) => handleChange('subcategory', e.target.value)}
                    label="Subcategory"
                  >
                    {subcategories[formData.category].map(sub => (
                      <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., NSFAS Bursary 2026 Application"
                helperText={`${formData.title.length}/200 characters`}
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={6}
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Provide a detailed description of the opportunity..."
                helperText={`${formData.description.length} characters (minimum 50)`}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Feature Image
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<ImageIcon />}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading...' : 'Upload Image'}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <TextField
                    fullWidth
                    label="Or enter Image URL"
                    value={formData.imageUrl}
                    onChange={(e) => handleChange('imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    size="small"
                  />
                </Box>
                {formData.imageUrl && (
                  <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        border: '1px solid #ddd'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        setError('Failed to load image')
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'error.dark' }
                      }}
                      onClick={removeImage}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        )
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Organization & Contact Details</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Organization Name"
                value={formData.organization}
                onChange={(e) => handleChange('organization', e.target.value)}
                placeholder="e.g., NSFAS, NYDA, Company Name"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="https://organization.com"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                placeholder="info@organization.com"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Phone"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                placeholder="+27 00 000 0000"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Requirements & Eligibility</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="General Eligibility"
                value={formData.eligibility}
                onChange={(e) => handleChange('eligibility', e.target.value)}
                placeholder="Who can apply? Any specific criteria..."
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements List
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder="Add a requirement..."
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                  />
                  <Button variant="outlined" onClick={addRequirement}>
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.requirements.map((req, index) => (
                    <Chip
                      key={index}
                      label={req}
                      onDelete={() => removeRequirement(index)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            
            {(formData.category === 'bursary' || formData.category === 'business') && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    value={formData.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    placeholder="e.g., R10,000 - R100,000"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Funding Type</InputLabel>
                    <Select
                      value={formData.fundingType}
                      onChange={(e) => handleChange('fundingType', e.target.value)}
                      label="Funding Type"
                    >
                      <MenuItem value="Full">Full Funding</MenuItem>
                      <MenuItem value="Partial">Partial Funding</MenuItem>
                      <MenuItem value="Variable">Variable</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
            
            {formData.category === 'career' && (
              <>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Type</InputLabel>
                    <Select
                      value={formData.employmentType}
                      onChange={(e) => handleChange('employmentType', e.target.value)}
                      label="Employment Type"
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Salary Range"
                    value={formData.salary}
                    onChange={(e) => handleChange('salary', e.target.value)}
                    placeholder="e.g., R15,000 - R25,000 per month"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Experience Required"
                    value={formData.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                    placeholder="e.g., 2-3 years, Entry Level, Graduate"
                  />
                </Grid>
              </>
            )}
          </Grid>
        )
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Location & Important Dates</Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                options={locations}
                value={formData.location}
                onChange={(e, value) => handleChange('location', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Location"
                    placeholder="Select or type location"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                          {params.InputProps.startAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Application Deadline"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Tags & Keywords (for search)</Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add tags for better searchability..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button variant="outlined" onClick={addTag}>
                    Add Tag
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.tags.map((t, index) => (
                    <Chip
                      key={index}
                      label={t}
                      onDelete={() => removeTag(t)}
                      color="secondary"
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Special Flags</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) => handleChange('featured', e.target.checked)}
                  />
                }
                label="Featured Opportunity"
              />
              <Typography variant="caption" display="block" color="text.secondary">
                Will appear in featured section on homepage
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.urgent}
                    onChange={(e) => handleChange('urgent', e.target.checked)}
                  />
                }
                label="Urgent/Closing Soon"
              />
              <Typography variant="caption" display="block" color="text.secondary">
                Will show urgent badge to users
              </Typography>
            </Grid>
          </Grid>
        )
      
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review Your Posting</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={600} color="primary">
                      {formData.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2 }}>
                      <Chip label={formData.category} color="primary" size="small" />
                      {formData.subcategory && (
                        <Chip label={formData.subcategory} variant="outlined" size="small" />
                      )}
                      {formData.featured && (
                        <Chip label="Featured" color="success" size="small" />
                      )}
                      {formData.urgent && (
                        <Chip label="Urgent" color="error" size="small" />
                      )}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="body1" paragraph>
                      {formData.description}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">Organization</Typography>
                    <Typography variant="body2">{formData.organization || 'N/A'}</Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                    <Typography variant="body2">{formData.location || 'N/A'}</Typography>
                  </Grid>
                  
                  {formData.deadline && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Deadline</Typography>
                      <Typography variant="body2">{new Date(formData.deadline).toLocaleDateString()}</Typography>
                    </Grid>
                  )}
                  
                  {formData.amount && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Amount</Typography>
                      <Typography variant="body2">{formData.amount}</Typography>
                    </Grid>
                  )}
                  
                  {formData.salary && (
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
                      <Typography variant="body2">{formData.salary}</Typography>
                    </Grid>
                  )}
                  
                  {formData.requirements.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Requirements</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.requirements.map((req, i) => (
                          <Chip key={i} label={req} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Grid>
                  )}
                  
                  {formData.tags.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Tags</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.tags.map((tag, i) => (
                          <Chip key={i} label={tag} size="small" color="secondary" />
                        ))}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
            
            <Alert severity="info">
              This opportunity will be published immediately with "Approved" status since you are an admin.
            </Alert>
          </Box>
        )
    }
  }
  
  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={700}>
              Post New Opportunity
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => navigate('/admin')}
            >
              Cancel
            </Button>
          </Box>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          <Box sx={{ minHeight: '400px', mb: 4 }}>
            {renderStepContent()}
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={<Save />}
                >
                  {loading ? 'Publishing...' : 'Publish Opportunity'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default AdminPostPortal

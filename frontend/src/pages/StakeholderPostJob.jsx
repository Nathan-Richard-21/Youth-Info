import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Divider,
  Chip,
  Alert,
  Card,
  CardContent,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import api from '../api';

const categories = [
  'Bursaries',
  'Learnerships',
  'Internships',
  'Jobs',
  'Events',
  'Volunteer Work',
  'Business Funding'
];

const questionTypes = [
  { value: 'text', label: 'Short Text Answer' },
  { value: 'textarea', label: 'Long Text Answer' },
  { value: 'choice', label: 'Multiple Choice' }
];

const StakeholderPostJob = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Jobs',
    location: '',
    deadline: '',
    externalLink: '',
    allowInternalApplication: true,
    applicationQuestions: [],
    requiredDocuments: [],
    imageUrl: ''
  });

  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'text',
    required: true,
    options: []
  });

  const [newOption, setNewOption] = useState('');

  const [newDocument, setNewDocument] = useState({
    name: '',
    description: '',
    required: true
  });

  const steps = ['Basic Information', 'Application Questions', 'Required Documents', 'Preview'];

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'allowInternalApplication' ? checked : value
    });
  };

  // Image Upload Handlers
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      e.target.value = ''; // Reset input
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', file);

      console.log('📤 Uploading image:', file.name, file.type, file.size);

      const response = await api.post('/upload/image', formDataToSend);

      console.log('📥 Upload response:', response.data);

      // Backend returns imageUrl, not url
      const imageUrl = response.data.imageUrl;
      
      setFormData({
        ...formData,
        imageUrl: `http://localhost:5001${imageUrl}` // Add full URL
      });
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
      e.target.value = ''; // Reset input for next upload
    } catch (err) {
      console.error('Upload error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to upload image');
      e.target.value = ''; // Reset input on error
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      imageUrl: ''
    });
  };

  // Question Management
  const handleQuestionChange = (field, value) => {
    setNewQuestion({ ...newQuestion, [field]: value });
  };

  const addOption = () => {
    if (newOption.trim()) {
      setNewQuestion({
        ...newQuestion,
        options: [...newQuestion.options, newOption.trim()]
      });
      setNewOption('');
    }
  };

  const removeOption = (index) => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter((_, i) => i !== index)
    });
  };

  const addQuestion = () => {
    if (newQuestion.question.trim()) {
      if (newQuestion.type === 'choice' && newQuestion.options.length < 2) {
        setError('Multiple choice questions must have at least 2 options');
        return;
      }
      
      setFormData({
        ...formData,
        applicationQuestions: [...formData.applicationQuestions, { ...newQuestion }]
      });
      
      setNewQuestion({
        question: '',
        type: 'text',
        required: true,
        options: []
      });
      setError('');
    }
  };

  const removeQuestion = (index) => {
    setFormData({
      ...formData,
      applicationQuestions: formData.applicationQuestions.filter((_, i) => i !== index)
    });
  };

  // Document Management
  const handleDocumentChange = (field, value) => {
    setNewDocument({ ...newDocument, [field]: value });
  };

  const addDocument = () => {
    if (newDocument.name.trim()) {
      setFormData({
        ...formData,
        requiredDocuments: [...formData.requiredDocuments, { ...newDocument }]
      });
      
      setNewDocument({
        name: '',
        description: '',
        required: true
      });
    }
  };

  const removeDocument = (index) => {
    setFormData({
      ...formData,
      requiredDocuments: formData.requiredDocuments.filter((_, i) => i !== index)
    });
  };

  // Navigation
  const handleNext = () => {
    // Validate current step
    if (activeStep === 0) {
      if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.deadline) {
        setError('Please fill in all required fields');
        return;
      }
    }
    
    setError('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Submit
  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Map form data to backend schema
      const categoryMap = {
        'Bursaries': 'bursary',
        'Learnerships': 'learnership',
        'Internships': 'career',
        'Jobs': 'career',
        'Events': 'event',
        'Volunteer Work': 'career',
        'Business Funding': 'business'
      };

      const submissionData = {
        title: formData.title,
        description: formData.description,
        category: categoryMap[formData.category] || 'career',
        subcategory: formData.category, // Store original selection as subcategory
        location: formData.location,
        deadline: formData.deadline,
        closingDate: formData.deadline, // Use deadline as closingDate (required field)
        applyUrl: formData.externalLink || undefined,
        allowInternalApplication: formData.allowInternalApplication,
        applicationQuestions: formData.applicationQuestions,
        requiredDocuments: formData.requiredDocuments,
        imageUrl: formData.imageUrl || undefined
      };

      console.log('📤 Submitting opportunity:', submissionData);

      const response = await api.post('/stakeholder/opportunities', submissionData);
      setSuccess('Opportunity posted successfully!');
      
      setTimeout(() => {
        navigate('/stakeholder-dashboard');
      }, 2000);
    } catch (err) {
      console.error('❌ Submit error:', err);
      setError(err.response?.data?.message || 'Failed to post opportunity');
    } finally {
      setLoading(false);
    }
  };

  // Step Content Renderers
  const renderBasicInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          label="Opportunity Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Software Developer Internship"
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          required
          multiline
          rows={6}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide detailed information about the opportunity..."
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: '#0047AB', fontWeight: 600 }}>
          Feature Image (Optional)
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
          Add an eye-catching image to make your opportunity stand out
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<ImageIcon />}
            disabled={uploadingImage}
            sx={{
              bgcolor: '#FF8C00',
              color: '#fff',
              '&:hover': {
                bgcolor: '#FF6900'
              }
            }}
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
            size="small"
            label="Or enter Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
            sx={{ flex: 1, minWidth: '250px' }}
          />
        </Box>

        {formData.imageUrl && (
          <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
            <Box
              component="img"
              src={formData.imageUrl}
              alt="Preview"
              sx={{
                maxWidth: '300px',
                maxHeight: '200px',
                borderRadius: 2,
                border: '2px solid #0047AB',
                display: 'block'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                setError('Failed to load image. Please check the URL.');
              }}
            />
            <IconButton
              onClick={removeImage}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: '#FF8C00',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#FF6900'
                }
              }}
              size="small"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., East London, Eastern Cape"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          required
          type="date"
          label="Application Deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="External Application Link (Optional)"
          name="externalLink"
          value={formData.externalLink}
          onChange={handleChange}
          placeholder="https://example.com/apply"
          disabled={formData.allowInternalApplication}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.allowInternalApplication}
              onChange={handleChange}
              name="allowInternalApplication"
              color="primary"
            />
          }
          label="Allow applications through our platform (LinkedIn-style)"
        />
        <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4 }}>
          When enabled, candidates can apply directly with custom questions and documents
        </Typography>
      </Grid>
    </Grid>
  );

  const renderQuestions = () => (
    <Box>
      {!formData.allowInternalApplication && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Enable internal applications in Step 1 to add custom questions
        </Alert>
      )}

      {formData.allowInternalApplication && (
        <>
          <Typography variant="h6" gutterBottom>
            Add Custom Questions
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Create questions that applicants must answer when applying
          </Typography>

          <Card variant="outlined" sx={{ p: 3, mb: 3, bgcolor: '#f8fafc' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Question"
                  value={newQuestion.question}
                  onChange={(e) => handleQuestionChange('question', e.target.value)}
                  placeholder="e.g., Why are you interested in this position?"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Answer Type"
                  value={newQuestion.type}
                  onChange={(e) => handleQuestionChange('type', e.target.value)}
                >
                  {questionTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newQuestion.required}
                      onChange={(e) => handleQuestionChange('required', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Required"
                />
              </Grid>

              {newQuestion.type === 'choice' && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Add option"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addOption()}
                    />
                    <Button variant="outlined" onClick={addOption}>
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {newQuestion.options.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        onDelete={() => removeOption(index)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addQuestion}
                >
                  Add Question
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Questions List */}
          {formData.applicationQuestions.length > 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Added Questions ({formData.applicationQuestions.length})
              </Typography>
              {formData.applicationQuestions.map((q, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {index + 1}. {q.question} {q.required && <Chip label="Required" size="small" color="error" />}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Type: {questionTypes.find(t => t.value === q.type)?.label}
                      </Typography>
                      {q.type === 'choice' && (
                        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {q.options.map((opt, i) => (
                            <Chip key={i} label={opt} size="small" variant="outlined" />
                          ))}
                        </Box>
                      )}
                    </Box>
                    <IconButton color="error" onClick={() => removeQuestion(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  const renderDocuments = () => (
    <Box>
      {!formData.allowInternalApplication && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Enable internal applications in Step 1 to add required documents
        </Alert>
      )}

      {formData.allowInternalApplication && (
        <>
          <Typography variant="h6" gutterBottom>
            Required Documents
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Specify documents that applicants must upload (CV is automatically included)
          </Typography>

          <Card variant="outlined" sx={{ p: 3, mb: 3, bgcolor: '#f8fafc' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Document Name"
                  value={newDocument.name}
                  onChange={(e) => handleDocumentChange('name', e.target.value)}
                  placeholder="e.g., Cover Letter, ID Copy, Portfolio"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newDocument.required}
                      onChange={(e) => handleDocumentChange('required', e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Required"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Description"
                  value={newDocument.description}
                  onChange={(e) => handleDocumentChange('description', e.target.value)}
                  placeholder="Brief description of what this document should contain"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addDocument}
                >
                  Add Document
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Documents List */}
          {formData.requiredDocuments.length > 0 && (
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Required Documents ({formData.requiredDocuments.length})
              </Typography>
              {formData.requiredDocuments.map((doc, index) => (
                <Card key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {doc.name} {doc.required && <Chip label="Required" size="small" color="error" />}
                      </Typography>
                      {doc.description && (
                        <Typography variant="body2" color="text.secondary">
                          {doc.description}
                        </Typography>
                      )}
                    </Box>
                    <IconButton color="error" onClick={() => removeDocument(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  const renderPreview = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Review your opportunity before posting
        </Typography>
        <Typography variant="caption">
          Make sure all information is correct. You can edit it later from your dashboard.
        </Typography>
      </Alert>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={700}>
            {formData.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={formData.category} color="primary" size="small" />
            <Chip label={formData.location} size="small" />
            <Chip label={`Deadline: ${new Date(formData.deadline).toLocaleDateString()}`} size="small" />
          </Box>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {formData.description}
          </Typography>
          {formData.externalLink && (
            <Typography variant="body2" color="primary">
              External Link: {formData.externalLink}
            </Typography>
          )}
        </CardContent>
      </Card>

      {formData.allowInternalApplication && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Application Process
          </Typography>
          
          {formData.applicationQuestions.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Custom Questions ({formData.applicationQuestions.length})
              </Typography>
              {formData.applicationQuestions.map((q, i) => (
                <Typography key={i} variant="body2" sx={{ ml: 2, mb: 1 }}>
                  {i + 1}. {q.question} {q.required && '(Required)'}
                </Typography>
              ))}
            </Box>
          )}

          {formData.requiredDocuments.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Required Documents ({formData.requiredDocuments.length})
              </Typography>
              {formData.requiredDocuments.map((doc, i) => (
                <Typography key={i} variant="body2" sx={{ ml: 2, mb: 1 }}>
                  • {doc.name} {doc.required && '(Required)'}
                </Typography>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/stakeholder-dashboard')}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Post New Opportunity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create a job posting with custom application questions
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Paper sx={{ p: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 400 }}>
          {activeStep === 0 && renderBasicInfo()}
          {activeStep === 1 && renderQuestions()}
          {activeStep === 2 && renderDocuments()}
          {activeStep === 3 && renderPreview()}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Post Opportunity'}
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StakeholderPostJob;

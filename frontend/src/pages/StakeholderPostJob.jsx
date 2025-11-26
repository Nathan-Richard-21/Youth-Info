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
  ArrowBack as ArrowBackIcon
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

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Jobs',
    location: '',
    deadline: '',
    externalLink: '',
    allowInternalApplication: true,
    applicationQuestions: [],
    requiredDocuments: []
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
      const response = await api.post('/stakeholder/opportunities', formData);
      setSuccess('Opportunity posted successfully!');
      
      setTimeout(() => {
        navigate('/stakeholder-dashboard');
      }, 2000);
    } catch (err) {
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

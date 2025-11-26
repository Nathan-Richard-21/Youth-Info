import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Typography, Box, Stepper, Step, StepLabel, Grid, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Chip, Alert, LinearProgress,
  IconButton, Divider, Paper
} from '@mui/material';
import {
  Close, CheckCircle, AttachFile, Send, Description, Person, Email,
  Phone, School, Work
} from '@mui/icons-material';
import api from '../api';

const QuickApplyDialog = ({ open, onClose, opportunity, user }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    coverLetter: '',
    answers: {},
    additionalDocuments: []
  });

  const steps = ['Review Info', 'Answer Questions', 'Submit'];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (questionId, answer) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer }
    }));
  };

  const handleFileUpload = async (event, docName) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentName', docName);

    try {
      const response = await api.post('/applications/upload-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setFormData(prev => ({
        ...prev,
        additionalDocuments: [
          ...prev.additionalDocuments,
          { name: docName, url: response.data.url, fileName: file.name }
        ]
      }));
    } catch (err) {
      setError('Failed to upload document');
    }
  };

  const validateStep = (step) => {
    if (step === 1 && opportunity.applicationQuestions) {
      // Check required questions are answered
      const unanswered = opportunity.applicationQuestions.filter(
        q => q.required && !formData.answers[q._id]
      );
      if (unanswered.length > 0) {
        setError('Please answer all required questions');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Prepare answers array
      const answersArray = Object.entries(formData.answers).map(([questionId, answer]) => {
        const question = opportunity.applicationQuestions?.find(q => q._id === questionId);
        return {
          question: question?.question || '',
          answer: answer
        };
      });

      const applicationData = {
        opportunity: opportunity._id,
        coverLetter: formData.coverLetter,
        resume: user.cvUrl, // Auto-attach saved CV
        answers: answersArray,
        documents: formData.additionalDocuments
      };

      await api.post('/applications', applicationData);
      setSuccess(true);

      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to show new application
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Review Your Information
            </Typography>

            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Name:</strong> {user.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Box>
                </Grid>
                {user.phone && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Phone sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Phone:</strong> {user.phone}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {user.educationLevel && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <School sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Education:</strong> {user.educationLevel}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {user.employmentStatus && (
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Work sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2">
                        <strong>Employment:</strong> {user.employmentStatus}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {user.cvUrl ? (
              <Alert severity="success" sx={{ mb: 3 }}>
                <strong>CV Attached:</strong> {user.cvFileName || 'Your CV'}
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ mb: 3 }}>
                No CV uploaded. We recommend uploading a CV in your profile for faster applications.
              </Alert>
            )}

            <TextField
              fullWidth
              multiline
              rows={6}
              label="Cover Letter (Optional)"
              placeholder="Why are you interested in this opportunity?"
              value={formData.coverLetter}
              onChange={(e) => handleChange('coverLetter', e.target.value)}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Application Questions
            </Typography>

            {opportunity.applicationQuestions && opportunity.applicationQuestions.length > 0 ? (
              <Grid container spacing={3}>
                {opportunity.applicationQuestions.map((question, index) => (
                  <Grid item xs={12} key={question._id || index}>
                    <FormControl fullWidth>
                      <FormLabel>
                        {index + 1}. {question.question}
                        {question.required && <span style={{ color: 'red' }}> *</span>}
                      </FormLabel>

                      {question.type === 'text' && (
                        <TextField
                          fullWidth
                          required={question.required}
                          value={formData.answers[question._id] || ''}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          sx={{ mt: 1 }}
                        />
                      )}

                      {question.type === 'textarea' && (
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          required={question.required}
                          value={formData.answers[question._id] || ''}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          sx={{ mt: 1 }}
                        />
                      )}

                      {question.type === 'choice' && (
                        <RadioGroup
                          value={formData.answers[question._id] || ''}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          sx={{ mt: 1 }}
                        >
                          {question.options?.map((option, idx) => (
                            <FormControlLabel
                              key={idx}
                              value={option}
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">No additional questions for this opportunity.</Alert>
            )}

            {/* Required Documents */}
            {opportunity.requiredDocuments && opportunity.requiredDocuments.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Required Documents
                </Typography>
                <Grid container spacing={2}>
                  {opportunity.requiredDocuments.map((doc, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {doc.name} {doc.required && <span style={{ color: 'red' }}>*</span>}
                            </Typography>
                            {doc.description && (
                              <Typography variant="caption" color="text.secondary">
                                {doc.description}
                              </Typography>
                            )}
                          </Box>
                          <input
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            style={{ display: 'none' }}
                            id={`doc-upload-${index}`}
                            type="file"
                            onChange={(e) => handleFileUpload(e, doc.name)}
                          />
                          <label htmlFor={`doc-upload-${index}`}>
                            <Button component="span" startIcon={<AttachFile />} size="small">
                              Upload
                            </Button>
                          </label>
                        </Box>
                        {formData.additionalDocuments.find(d => d.name === doc.name) && (
                          <Chip
                            label={formData.additionalDocuments.find(d => d.name === doc.name).fileName}
                            size="small"
                            color="success"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {success ? (
              <>
                <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Application Submitted!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your application has been sent successfully. You'll hear back soon!
                </Typography>
              </>
            ) : (
              <>
                <Send sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Ready to Submit?
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Review your application one last time before submitting.
                </Typography>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', textAlign: 'left', mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Summary:</Typography>
                  <Typography variant="body2">✓ Profile information included</Typography>
                  {user.cvUrl && <Typography variant="body2">✓ CV attached</Typography>}
                  {formData.coverLetter && <Typography variant="body2">✓ Cover letter provided</Typography>}
                  {opportunity.applicationQuestions && (
                    <Typography variant="body2">
                      ✓ {Object.keys(formData.answers).length} questions answered
                    </Typography>
                  )}
                  {formData.additionalDocuments.length > 0 && (
                    <Typography variant="body2">
                      ✓ {formData.additionalDocuments.length} documents uploaded
                    </Typography>
                  )}
                </Paper>
              </>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Quick Apply
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {opportunity.title}
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!success && (
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        {loading && <LinearProgress sx={{ mt: 2 }} />}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          {activeStep > 0 && (
            <Button onClick={handleBack} disabled={loading}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext} disabled={loading}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={<Send />}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default QuickApplyDialog;

import React, { useState } from 'react';
import {
  Container, Paper, Typography, TextField, Button, Box, Grid,
  MenuItem, Alert, Stepper, Step, StepLabel, LinearProgress,
  Chip, IconButton, CircularProgress
} from '@mui/material';
import {
  Business, Email, Phone, Language, LocationOn, Description,
  Upload, CheckCircle, ArrowBack, ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const StakeholderSignup = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Account Info (Step 1)
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Company Info (Step 2)
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    companyIndustry: '',
    companySize: '',
    location: '',
    phone: '',
    
    // Verification (Step 3)
    role: 'stakeholder'
  });

  const steps = ['Account Information', 'Company Details', 'Review & Submit'];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing',
    'Retail', 'Hospitality', 'Construction', 'Agriculture', 'Mining',
    'Government', 'Non-Profit', 'Other'
  ];

  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501+ employees'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.name || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError('Please enter a valid email address');
          return false;
        }
        return true;

      case 1:
        if (!formData.companyName || !formData.companyDescription || 
            !formData.companyIndustry || !formData.companySize) {
          setError('Please fill in all required company details');
          return false;
        }
        return true;

      default:
        return true;
    }
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
      // Map form fields to backend expected field names
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'stakeholder',
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        companyIndustry: formData.companyIndustry,
        companySize: formData.companySize,
        companyWebsite: formData.companyWebsite,
        companyPhone: formData.phone, // Map phone to companyPhone
        companyLocation: formData.location // Map location to companyLocation
      };

      const response = await api.post('/auth/register', payload);

      setSuccess(true);
      
      // Auto-login after registration
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setTimeout(() => {
          window.location.href = '/stakeholder-dashboard'; // Force full page reload
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Create Your Stakeholder Account
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Join our platform to post job opportunities and connect with talented youth
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Person Name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@company.com"
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                helperText="Minimum 6 characters"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Company Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Tell us about your organization
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                required
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Acme Corporation"
                InputProps={{
                  startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Description"
                required
                multiline
                rows={4}
                value={formData.companyDescription}
                onChange={(e) => handleChange('companyDescription', e.target.value)}
                placeholder="Brief description of your company and what you do..."
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Industry"
                required
                value={formData.companyIndustry}
                onChange={(e) => handleChange('companyIndustry', e.target.value)}
              >
                {industries.map(industry => (
                  <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Company Size"
                required
                value={formData.companySize}
                onChange={(e) => handleChange('companySize', e.target.value)}
              >
                {companySizes.map(size => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website (Optional)"
                value={formData.companyWebsite}
                onChange={(e) => handleChange('companyWebsite', e.target.value)}
                placeholder="https://www.company.com"
                InputProps={{
                  startAdornment: <Language sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="043 123 4567"
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="East London, Eastern Cape"
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Review Your Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please review your details before submitting
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Account Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2"><strong>Name:</strong> {formData.name}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {formData.email}</Typography>
                </Box>

                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Company Details
                </Typography>
                <Typography variant="body2"><strong>Company:</strong> {formData.companyName}</Typography>
                <Typography variant="body2"><strong>Industry:</strong> {formData.companyIndustry}</Typography>
                <Typography variant="body2"><strong>Size:</strong> {formData.companySize}</Typography>
                {formData.location && (
                  <Typography variant="body2"><strong>Location:</strong> {formData.location}</Typography>
                )}
                {formData.companyWebsite && (
                  <Typography variant="body2"><strong>Website:</strong> {formData.companyWebsite}</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Alert severity="info">
                Your account will be reviewed and verified within 24-48 hours. 
                You'll receive an email notification once approved.
              </Alert>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Registration Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome to YouthPortal EC! Your stakeholder account has been created.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Redirecting you to your dashboard...
          </Typography>
          <CircularProgress sx={{ mt: 2 }} />
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Business sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Become a Stakeholder
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Post opportunities and connect with talented Eastern Cape youth
            </Typography>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Step Content */}
          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} /> : <CheckCircle />}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForward />}
              >
                Next
              </Button>
            )}
          </Box>

          {/* Loading Bar */}
          {loading && <LinearProgress sx={{ mt: 2 }} />}

          {/* Already have account */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button onClick={() => navigate('/login')} sx={{ textTransform: 'none' }}>
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StakeholderSignup;

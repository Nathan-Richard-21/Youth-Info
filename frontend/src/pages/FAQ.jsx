import React, { useState } from 'react';
import {
  Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails,
  TextField, Button, Paper, Grid, Card, CardContent, Chip, Alert,
  Fade, Zoom, InputAdornment, CircularProgress, Divider
} from '@mui/material';
import {
  ExpandMore, Search, Email, Phone, Person, Message, Send,
  CheckCircle, Help, Security, Verified, School, Work, Psychology,
  Phone as PhoneIcon, Shield, Lightbulb, TrendingUp
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import api from '../api';

const FAQ = () => {
  const { content } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState('faq1');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Use translated FAQ data from content
  const faqData = content.faq.questions.map((q, index) => ({
    id: `faq${index + 1}`,
    question: q.question,
    answer: q.answer,
    icon: [
      <Search sx={{ color: '#6366f1' }} />,
      <CheckCircle sx={{ color: '#10b981' }} />,
      <Person sx={{ color: '#f59e0b' }} />,
      <School sx={{ color: '#8b5cf6' }} />,
      <Psychology sx={{ color: '#ec4899' }} />,
      <Shield sx={{ color: '#ef4444' }} />,
      <Work sx={{ color: '#06b6d4' }} />,
      <Lightbulb sx={{ color: '#f97316' }} />,
      <Verified sx={{ color: '#14b8a6' }} />,
      <PhoneIcon sx={{ color: '#3b82f6' }} />
    ][index],
    category: q.category,
    color: [
      '#6366f1', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899',
      '#ef4444', '#06b6d4', '#f97316', '#14b8a6', '#3b82f6'
    ][index]
  }));

  const categories = [...new Set(faqData.map(faq => faq.category))];

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleContactChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
    setSubmitError('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setSubmitError(content.faq.requiredFields);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitError(content.faq.invalidEmail);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      // TODO: Replace with actual API endpoint when ready
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // In production, call: await api.post('/contact', contactForm);
      
      setSubmitSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(content.faq.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Zoom in={true} timeout={1000}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
                }}
              >
                <Help sx={{ fontSize: 50, color: 'white' }} />
              </Box>
            </Zoom>
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {content.faq.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
              {content.faq.subtitle}
            </Typography>

            {/* Search Bar */}
            <Paper
              elevation={3}
              sx={{
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden'
              }}
            >
              <TextField
                fullWidth
                placeholder={content.faq.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#6366f1' }} />
                    </InputAdornment>
                  ),
                  sx: { py: 2 }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' }
                  }
                }}
              />
            </Paper>
          </Box>
        </Fade>

        {/* Category Chips */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
          {categories.map((category, index) => (
            <Zoom in={true} timeout={800 + index * 100} key={category}>
              <Chip
                label={category}
                sx={{
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  fontSize: '0.9rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e5e7eb',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            </Zoom>
          ))}
        </Box>

        {/* FAQ Accordions */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                  📚 {content.faq.allQuestions}
                </Typography>

                {filteredFAQs.length === 0 ? (
                  <Alert severity="info" sx={{ borderRadius: 3 }}>
                    {content.faq.noResults}
                  </Alert>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <Zoom in={true} timeout={600 + index * 100} key={faq.id}>
                      <Accordion
                        expanded={expanded === faq.id}
                        onChange={handleAccordionChange(faq.id)}
                        sx={{
                          mb: 2,
                          borderRadius: 3,
                          overflow: 'hidden',
                          boxShadow: expanded === faq.id
                            ? '0 8px 32px rgba(0,0,0,0.12)'
                            : '0 2px 8px rgba(0,0,0,0.08)',
                          '&:before': { display: 'none' },
                          border: expanded === faq.id ? `2px solid ${faq.color}` : '2px solid transparent',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMore sx={{ color: faq.color }} />}
                          sx={{
                            py: 2,
                            px: 3,
                            background: expanded === faq.id
                              ? `${faq.color}10`
                              : 'white',
                            '&:hover': {
                              background: `${faq.color}08`
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: `${faq.color}15`,
                                flexShrink: 0
                              }}
                            >
                              {faq.icon}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.05rem' }}>
                                {faq.question}
                              </Typography>
                              <Chip
                                label={faq.category}
                                size="small"
                                sx={{
                                  mt: 0.5,
                                  height: 20,
                                  fontSize: '0.7rem',
                                  bgcolor: `${faq.color}20`,
                                  color: faq.color,
                                  fontWeight: 600
                                }}
                              />
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ lineHeight: 1.8, pl: 7 }}
                          >
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Zoom>
                  ))
                )}
              </Box>
            </Fade>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={5}>
            <Fade in={true} timeout={1200}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                  position: 'sticky',
                  top: 100
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    mb: 3,
                    boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <Message sx={{ fontSize: 30, color: 'white' }} />
                </Box>

                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {content.faq.contactTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {content.faq.contactSubtitle}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {submitSuccess && (
                  <Zoom in={true}>
                    <Alert
                      severity="success"
                      icon={<CheckCircle />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      <strong>{content.faq.successMessage}</strong>
                      <br />
                      {content.faq.successSubMessage}
                    </Alert>
                  </Zoom>
                )}

                {submitError && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSubmitError('')}>
                    {submitError}
                  </Alert>
                )}

                <form onSubmit={handleContactSubmit}>
                  <TextField
                    fullWidth
                    required
                    label={content.faq.contactName}
                    value={contactForm.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    required
                    type="email"
                    label={content.faq.contactEmail}
                    value={contactForm.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label={content.faq.contactPhone}
                    value={contactForm.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label={content.faq.contactSubject}
                    value={contactForm.subject}
                    onChange={(e) => handleContactChange('subject', e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={4}
                    label={content.faq.contactMessage}
                    placeholder={content.faq.contactPlaceholder}
                    value={contactForm.message}
                    onChange={(e) => handleContactChange('message', e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        boxShadow: '0 6px 24px rgba(99, 102, 241, 0.5)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {submitting ? content.faq.sending : content.faq.sendMessage}
                  </Button>
                </form>

                {/* Quick Contact Info */}
                <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #e5e7eb' }}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    📞 {content.faq.quickContact}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {content.faq.quickEmail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {content.faq.quickPhone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {content.faq.quickHours}
                  </Typography>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>

        {/* Help Cards */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom sx={{ mb: 4 }}>
            🚀 {content.faq.helpTitle}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={1000}>
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Psychology sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {content.faq.aiAssistantTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    {content.faq.aiAssistantDesc}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#6366f1',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                    href="/profile"
                  >
                    {content.faq.aiAssistantBtn}
                  </Button>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={1100}>
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 32px rgba(236, 72, 153, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Help sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {content.faq.knowledgeBaseTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    {content.faq.knowledgeBaseDesc}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#ec4899',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                    href="/knowledge-base"
                  >
                    {content.faq.knowledgeBaseBtn}
                  </Button>
                </Card>
              </Zoom>
            </Grid>

            <Grid item xs={12} md={4}>
              <Zoom in={true} timeout={1200}>
                <Card
                  sx={{
                    borderRadius: 4,
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 32px rgba(16, 185, 129, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Message sx={{ fontSize: 50, mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {content.faq.communityTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    {content.faq.communityDesc}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: '#10b981',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                    href="/forums"
                  >
                    {content.faq.communityBtn}
                  </Button>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;

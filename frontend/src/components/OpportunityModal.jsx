import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Paper,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useLanguage } from '../context/LanguageContext';
import api from '../api';

const OpportunityModal = ({ open, onClose, opportunity, type = 'bursary' }) => {
  const { language, content } = useLanguage();
  const [loadingTips, setLoadingTips] = useState(false);
  const [tips, setTips] = useState(null);
  const [error, setError] = useState(null);

  if (!opportunity) return null;

  const handleGetTips = async () => {
    setLoadingTips(true);
    setError(null);
    
    try {
      const prompt = `Generate specific application tips for this ${type} opportunity:
      
Title: ${opportunity.title || opportunity.name}
Provider: ${opportunity.provider || opportunity.company || opportunity.organization}
Requirements: ${opportunity.requirements || opportunity.eligibility || 'Not specified'}
Deadline: ${opportunity.deadline || 'Not specified'}

Please provide:
1. 3-5 specific tips for applying successfully
2. Key requirements to focus on
3. Common mistakes to avoid
4. How to stand out in the application

Keep it practical, actionable, and youth-friendly. Format in clear bullet points.`;

      const response = await api.post('/chat', { message: prompt });
      setTips(response.data.reply);
    } catch (err) {
      console.error('Error getting tips:', err);
      setError(language === 'xh' 
        ? 'Kukho impazamo yokufumana iingcebiso. Nceda uzame kwakhona.'
        : 'Error getting tips. Please try again.');
    } finally {
      setLoadingTips(false);
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'bursary':
        return <SchoolIcon sx={{ fontSize: 40, color: '#0047AB' }} />;
      case 'career':
      case 'job':
        return <WorkIcon sx={{ fontSize: 40, color: '#FF8C00' }} />;
      case 'learnership':
        return <WorkIcon sx={{ fontSize: 40, color: '#0047AB' }} />;
      case 'business':
        return <BusinessIcon sx={{ fontSize: 40, color: '#FF8C00' }} />;
      default:
        return <InfoIcon sx={{ fontSize: 40, color: '#0047AB' }} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return language === 'xh' ? 'Ayichazwanga' : 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString(language === 'xh' ? 'xh-ZA' : 'en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          maxHeight: '90vh'
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: type === 'career' || type === 'business' 
            ? 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)'
            : 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)',
          color: 'white',
          position: 'relative',
          pb: 3
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pr: 5 }}>
          <Box
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 1.5,
              backdropFilter: 'blur(10px)'
            }}
          >
            {getIcon()}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              {opportunity.title || opportunity.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {opportunity.category && (
                <Chip
                  label={opportunity.category}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }}
                />
              )}
              {opportunity.type && (
                <Chip
                  label={opportunity.type}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)'
                  }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        {/* Provider/Company Info */}
        {(opportunity.provider || opportunity.company || opportunity.organization) && (
          <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <BusinessIcon sx={{ color: '#0047AB' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {language === 'xh' ? 'Umboneleli' : 'Provider'}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {opportunity.provider || opportunity.company || opportunity.organization}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        )}

        {/* Key Details Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
          {/* Deadline */}
          {opportunity.deadline && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2, border: '1px solid #FFB74D' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarTodayIcon sx={{ color: '#FF8C00', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {language === 'xh' ? 'Umhla wokugqibela' : 'Deadline'}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatDate(opportunity.deadline)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Location */}
          {opportunity.location && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2, border: '1px solid #64B5F6' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon sx={{ color: '#0047AB', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {language === 'xh' ? 'Indawo' : 'Location'}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {opportunity.location}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Amount/Stipend */}
          {(opportunity.amount || opportunity.stipend || opportunity.salary) && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2, border: '1px solid #81C784' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {language === 'xh' ? 'Isixa' : 'Amount'}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {opportunity.amount || opportunity.stipend || opportunity.salary}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Level/Field */}
          {(opportunity.level || opportunity.field || opportunity.fieldOfStudy) && (
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 2, border: '1px solid #BA68C8' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SchoolIcon sx={{ color: '#9C27B0', fontSize: 20 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {language === 'xh' ? 'Inqanaba/Intsimi' : 'Level/Field'}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {opportunity.level || opportunity.field || opportunity.fieldOfStudy}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        {opportunity.description && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#0047AB' }}>
              {language === 'xh' ? 'Inkcazo' : 'Description'}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', whiteSpace: 'pre-line' }}>
              {opportunity.description}
            </Typography>
          </Box>
        )}

        {/* Requirements */}
        {(opportunity.requirements || opportunity.eligibility) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#0047AB' }}>
              {language === 'xh' ? 'Iimfuno' : 'Requirements'}
            </Typography>
            <Paper elevation={0} sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {opportunity.requirements || opportunity.eligibility}
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Additional Info */}
        {opportunity.additionalInfo && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#0047AB' }}>
              {language === 'xh' ? 'Ulwazi olongezelelweyo' : 'Additional Information'}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary', whiteSpace: 'pre-line' }}>
              {opportunity.additionalInfo}
            </Typography>
          </Box>
        )}

        {/* Contact/Link */}
        {(opportunity.link || opportunity.contactEmail || opportunity.phone) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#0047AB' }}>
              {language === 'xh' ? 'Unxibelelwano' : 'Contact'}
            </Typography>
            <Stack spacing={1}>
              {opportunity.link && (
                <Typography variant="body2">
                  <strong>{language === 'xh' ? 'Iwebhsayithi:' : 'Website:'}</strong>{' '}
                  <a href={opportunity.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0047AB' }}>
                    {opportunity.link}
                  </a>
                </Typography>
              )}
              {opportunity.contactEmail && (
                <Typography variant="body2">
                  <strong>{language === 'xh' ? 'I-imeyile:' : 'Email:'}</strong> {opportunity.contactEmail}
                </Typography>
              )}
              {opportunity.phone && (
                <Typography variant="body2">
                  <strong>{language === 'xh' ? 'Ifowuni:' : 'Phone:'}</strong> {opportunity.phone}
                </Typography>
              )}
            </Stack>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* AI Tips Section */}
        <Box>
          {!tips && !loadingTips && (
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<AutoAwesomeIcon />}
              onClick={handleGetTips}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                  boxShadow: '0 6px 24px rgba(102, 126, 234, 0.5)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {language === 'xh' ? '✨ Ndinikeze iingcebiso zokufaka isicelo' : '✨ Give me application tips'}
            </Button>
          )}

          {loadingTips && (
            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2, textAlign: 'center' }}>
              <CircularProgress size={40} sx={{ color: '#667eea', mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                {language === 'xh' 
                  ? 'Ndivela iingcebiso ezilungiselelwe wena...'
                  : 'Generating personalized tips...'}
              </Typography>
            </Paper>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {tips && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                border: '2px solid #667eea',
                borderRadius: 2
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <AutoAwesomeIcon sx={{ color: '#667eea' }} />
                <Typography variant="h6" fontWeight={700} sx={{ color: '#667eea' }}>
                  {language === 'xh' ? 'Iingcebiso zokufaka isicelo' : 'Application Tips'}
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {tips}
              </Typography>
              <Button
                size="small"
                onClick={handleGetTips}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                {language === 'xh' ? 'Fumana iingcebiso ezintsha' : 'Get new tips'}
              </Button>
            </Paper>
          )}
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            color: 'text.secondary'
          }}
        >
          {language === 'xh' ? 'Vala' : 'Close'}
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            // Handle apply action
            if (opportunity.link) {
              window.open(opportunity.link, '_blank');
            }
          }}
          sx={{
            background: type === 'career' || type === 'business'
              ? 'linear-gradient(135deg, #FF8C00 0%, #FF6900 100%)'
              : 'linear-gradient(135deg, #0047AB 0%, #1E90FF 100%)',
            color: 'white',
            px: 4,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,71,171,0.4)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {language === 'xh' ? 'Faka isicelo' : 'Apply Now'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OpportunityModal;

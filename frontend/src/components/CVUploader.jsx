import React, { useState } from 'react';
import {
  Box, Paper, Typography, Button, IconButton, Alert, LinearProgress,
  Chip, Tooltip
} from '@mui/material';
import {
  CloudUpload, Delete, Download, Description, CheckCircle, Error
} from '@mui/icons-material';
import api from '../api';

const CVUploader = ({ user, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    // Upload file
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await api.post('/users/upload-cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('CV uploaded successfully!');
      if (onUploadSuccess) {
        onUploadSuccess(response.data);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload CV. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your CV?')) return;

    try {
      await api.delete('/users/delete-cv');
      setSuccess('CV deleted successfully');
      if (onUploadSuccess) {
        onUploadSuccess({ cvUrl: null, cvFileName: null });
      }
    } catch (err) {
      setError('Failed to delete CV');
    }
  };

  const handleDownload = () => {
    if (user.cvUrl) {
      window.open(user.cvUrl, '_blank');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '2px dashed #e0e0e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Description sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Your CV/Resume
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Upload your CV to apply quickly to opportunities
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {user.cvUrl ? (
        <Box
          sx={{
            p: 2,
            bgcolor: '#f8fafc',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {user.cvFileName || 'CV.pdf'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Uploaded {user.cvUploadedAt ? new Date(user.cvUploadedAt).toLocaleDateString() : 'recently'}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Tooltip title="Download CV">
              <IconButton onClick={handleDownload} color="primary">
                <Download />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete CV">
              <IconButton onClick={handleDelete} color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <input
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="cv-upload"
            type="file"
            onChange={handleFileSelect}
            disabled={uploading}
          />
          <label htmlFor="cv-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
              disabled={uploading}
              size="large"
            >
              {uploading ? 'Uploading...' : 'Upload CV'}
            </Button>
          </label>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </Typography>
        </Box>
      )}

      {uploading && <LinearProgress sx={{ mt: 2 }} />}

      <Box sx={{ mt: 2, p: 2, bgcolor: '#fff3cd', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary">
          💡 <strong>Tip:</strong> Keep your CV updated to apply faster to opportunities.
          Your CV will be pre-attached when you apply through our platform.
        </Typography>
      </Box>
    </Paper>
  );
};

export default CVUploader;

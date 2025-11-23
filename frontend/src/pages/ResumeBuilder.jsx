import React, { useState } from 'react'
import { Box, Container, Typography, Paper, TextField, Button, Grid, Stepper, Step, StepLabel, Chip } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'

const ResumeBuilder = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Personal Details', 'Education', 'Experience', 'Skills', 'Review & Download']

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    experience: '',
    skills: ''
  })

  const handleNext = () => setActiveStep(prev => prev + 1)
  const handleBack = () => setActiveStep(prev => prev - 1)

  return (
    <Box>
      <Box sx={{ bgcolor: '#3b82f6', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DescriptionIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Resume Builder</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Create a professional CV in minutes</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>Education</Typography>
              <TextField 
                fullWidth 
                multiline 
                rows={6} 
                label="List your education (schools, qualifications, dates)"
                value={formData.education}
                onChange={e => setFormData({...formData, education: e.target.value})}
                placeholder="Example:&#10;Matric - East London High School (2023)&#10;Subjects: Maths (70%), English (75%), Life Sciences (68%)"
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>Work Experience</Typography>
              <TextField 
                fullWidth 
                multiline 
                rows={6} 
                label="List your work experience, internships, volunteer work"
                value={formData.experience}
                onChange={e => setFormData({...formData, experience: e.target.value})}
                placeholder="Example:&#10;Retail Assistant - Shoprite (Dec 2023 - Feb 2024)&#10;- Assisted customers&#10;- Managed stock"
              />
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>Skills & Competencies</Typography>
              <TextField 
                fullWidth 
                multiline 
                rows={6} 
                label="List your skills"
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                placeholder="Example:&#10;- Computer literacy (MS Office)&#10;- Good communication&#10;- Team player&#10;- Problem solving"
              />
            </Box>
          )}

          {activeStep === 4 && (
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom mb={3}>Resume Preview</Typography>
              <Paper sx={{ p: 3, bgcolor: '#f8fafc' }}>
                <Typography variant="h5" fontWeight={700}>{formData.fullName || 'Your Name'}</Typography>
                <Typography variant="body2" color="text.secondary">{formData.email} | {formData.phone}</Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>{formData.location}</Typography>
                
                <Typography variant="h6" fontWeight={600} mt={2}>Education</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{formData.education || 'No education added'}</Typography>
                
                <Typography variant="h6" fontWeight={600} mt={2}>Experience</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{formData.experience || 'No experience added'}</Typography>
                
                <Typography variant="h6" fontWeight={600} mt={2}>Skills</Typography>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{formData.skills || 'No skills added'}</Typography>
              </Paper>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button variant="contained" size="large" startIcon={<DownloadIcon />}>
                  Download as PDF
                </Button>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, mt: 3, bgcolor: '#eff6ff' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>💡 CV Tips</Typography>
          <Typography variant="body2">
            • Keep it to 2 pages maximum<br/>
            • Use bullet points for easy reading<br/>
            • Highlight achievements, not just duties<br/>
            • Tailor your CV for each application<br/>
            • Proofread for spelling and grammar
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default ResumeBuilder

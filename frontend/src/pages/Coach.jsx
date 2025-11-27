import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Zoom,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle
} from '@mui/material';
import {
  PlayCircle,
  Psychology,
  EmojiEvents,
  Lightbulb,
  CheckCircle,
  Star,
  Close,
  TipsAndUpdates,
  School,
  WorkOutline,
  Groups,
  RecordVoiceOver
} from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

const Coach = () => {
  const { content } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Master Your Interview Skills',
      description: 'Learn essential interview techniques, body language, and how to answer tough questions with confidence.',
      youtubeId: 'guUOmfq303s',
      thumbnail: 'https://img.youtube.com/vi/guUOmfq303s/maxresdefault.jpg',
      duration: '15:30',
      category: 'Interview Skills',
      level: 'Beginner',
      color: '#6366f1',
      tips: [
        'Prepare strong answers to common questions',
        'Practice good body language and eye contact',
        'Research the company beforehand',
        'Ask thoughtful questions at the end',
        'Follow up with a thank-you email'
      ]
    },
    {
      id: 2,
      title: 'Professional Communication Strategies',
      description: 'Discover how to communicate effectively in professional settings, from emails to presentations.',
      youtubeId: 'sjTxmq68RXU',
      thumbnail: 'https://img.youtube.com/vi/sjTxmq68RXU/maxresdefault.jpg',
      duration: '12:45',
      category: 'Communication',
      level: 'Intermediate',
      color: '#ec4899',
      tips: [
        'Use clear and concise language',
        'Listen actively and ask clarifying questions',
        'Adapt your style to your audience',
        'Be confident but respectful',
        'Practice active listening techniques'
      ]
    }
  ];

  const coachingTopics = [
    {
      icon: <Psychology />,
      title: 'Interview Preparation',
      description: 'Master the art of interviews with proven techniques',
      color: '#6366f1'
    },
    {
      icon: <RecordVoiceOver />,
      title: 'Communication Skills',
      description: 'Learn to express yourself clearly and confidently',
      color: '#ec4899'
    },
    {
      icon: <EmojiEvents />,
      title: 'Career Success',
      description: 'Build habits that lead to long-term success',
      color: '#f59e0b'
    },
    {
      icon: <Groups />,
      title: 'Networking',
      description: 'Connect with professionals and build relationships',
      color: '#10b981'
    }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVideo(null);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={800}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'white',
                  color: '#667eea',
                  margin: '0 auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}
              >
                <School fontSize="large" />
              </Avatar>
              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                🎓 Career Coach
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  maxWidth: 700,
                  margin: '0 auto',
                  mb: 4,
                  opacity: 0.95,
                  fontWeight: 400
                }}
              >
                Level up your career with expert guidance. Watch, learn, and succeed!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Chip
                  icon={<PlayCircle />}
                  label={`${videos.length} Video Lessons`}
                  sx={{
                    bgcolor: 'white',
                    color: '#667eea',
                    fontWeight: 700,
                    fontSize: '1rem',
                    py: 2.5,
                    px: 1
                  }}
                />
                <Chip
                  icon={<Star />}
                  label="Expert Tips Included"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    py: 2.5,
                    px: 1,
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Coaching Topics Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ mb: 5 }}
        >
          🚀 What You'll Learn
        </Typography>
        <Grid container spacing={3}>
          {coachingTopics.map((topic, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={500 + index * 100}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${topic.color}40`,
                      borderColor: topic.color
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Avatar
                      sx={{
                        width: 70,
                        height: 70,
                        bgcolor: `${topic.color}15`,
                        color: topic.color,
                        margin: '0 auto',
                        mb: 2
                      }}
                    >
                      {topic.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {topic.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Video Lessons Section */}
      <Box sx={{ bgcolor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            🎬 Featured Video Lessons
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6, maxWidth: 600, margin: '0 auto', mb: 6 }}
          >
            Watch these expert-led videos to master essential career skills
          </Typography>

          <Grid container spacing={4}>
            {videos.map((video, index) => (
              <Grid item xs={12} md={6} key={video.id}>
                <Fade in timeout={800 + index * 200}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 48px ${video.color}40`
                      }
                    }}
                    onClick={() => handleVideoClick(video)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="280"
                        image={video.thumbnail}
                        alt={video.title}
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)'
                          }
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconButton
                          sx={{
                            bgcolor: 'white',
                            width: 80,
                            height: 80,
                            '&:hover': {
                              bgcolor: video.color,
                              color: 'white',
                              transform: 'scale(1.1)'
                            },
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <PlayCircle sx={{ fontSize: 50 }} />
                        </IconButton>
                      </Box>
                      <Chip
                        label={video.duration}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          fontWeight: 700,
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={video.category}
                          size="small"
                          sx={{
                            bgcolor: `${video.color}15`,
                            color: video.color,
                            fontWeight: 700
                          }}
                        />
                        <Chip
                          label={video.level}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                      <Typography variant="h5" fontWeight={700} gutterBottom>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {video.description}
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PlayCircle />}
                        fullWidth
                        sx={{
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: 700,
                          background: `linear-gradient(135deg, ${video.color} 0%, ${video.color}dd 100%)`,
                          '&:hover': {
                            background: video.color
                          }
                        }}
                      >
                        Watch Now
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Success Tips Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            p: 5
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: 'white',
                color: '#f59e0b',
                mr: 2
              }}
            >
              <TipsAndUpdates fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                💡 Quick Success Tips
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.95 }}>
                Apply these tips to stand out in any interview
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Research the company thoroughly"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Prepare specific examples of your achievements"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Practice your answers out loud"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dress professionally and arrive early"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ask thoughtful questions about the role"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Follow up with a thank-you email"
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Video Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ p: 3, borderBottom: '2px solid #f0f0f0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {selectedVideo?.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={selectedVideo?.category}
                  size="small"
                  sx={{
                    bgcolor: `${selectedVideo?.color}15`,
                    color: selectedVideo?.color,
                    fontWeight: 700
                  }}
                />
                <Chip
                  label={selectedVideo?.level}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedVideo && (
            <>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  width: '100%'
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Box sx={{ p: 4 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedVideo.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Lightbulb sx={{ color: selectedVideo.color }} />
                  Key Takeaways
                </Typography>
                <List>
                  {selectedVideo.tips.map((tip, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: selectedVideo.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={tip}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Coach;

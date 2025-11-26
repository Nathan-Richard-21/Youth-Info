import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, Button, IconButton, TextField, Paper, Avatar,
  Chip, Fade, Zoom, CircularProgress, Tooltip
} from '@mui/material';
import {
  AutoAwesome, Description, Update, Article, CalendarMonth,
  Lightbulb, MenuBook, Psychology, Business, Search, Close,
  ThumbUp, Send, ContentCopy, Refresh
} from '@mui/icons-material';
import api from '../api';

// 🟢🟢🟢 AI CAREER ASSISTANT COMPONENT - UPDATED VERSION 🟢🟢🟢
console.log('🟢🟢🟢 AICareerAssistant.jsx FILE LOADED 🟢🟢🟢')

const AICareerAssistant = ({ user }) => {
  console.log('🟢 AICareerAssistant component rendering, user:', user)
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Debug log
  useEffect(() => {
    console.log('🚀🚀🚀 AI Career Assistant Mounted!', { user, isOpen });
    try {
      // Test that all dependencies are available
      if (!user) {
        console.warn('⚠️⚠️⚠️ User prop is undefined');
      } else {
        console.log('✅ User data available:', user.name, user.email)
      }
    } catch (err) {
      console.error('❌❌❌ AI Career Assistant Error:', err);
      setError(err.message);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 10 AI Action Buttons - Personalized for Youth
  const aiActions = [
    {
      id: 'create-cv',
      icon: <Description />,
      label: 'Create My CV',
      color: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      prompt: `Create a professional CV using my information:
Name: ${user?.name || 'User'}
Email: ${user?.email || ''}
Location: ${user?.location || 'Eastern Cape'}
Education: ${user?.education || 'High School Graduate'}
Skills: ${user?.skills?.join(', ') || 'Communication, Teamwork'}

Please create a well-structured, professional CV that highlights my strengths.`,
      description: 'Generate a professional CV from your profile'
    },
    {
      id: 'update-cv',
      icon: <Update />,
      label: 'Update My CV',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      prompt: 'Help me update my existing CV with new skills, experience, and qualifications. What should I add or improve?',
      description: 'Improve your CV with new achievements'
    },
    {
      id: 'motivation-letter',
      icon: <Article />,
      label: 'Motivational Letter',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      prompt: `Write a professional motivational letter for me. My details:
Name: ${user?.name || 'User'}
Education: ${user?.education || 'High School'}
Interests: ${user?.interests?.join(', ') || 'Technology, Business'}

I'm applying for opportunities in the Eastern Cape. Make it passionate and professional.`,
      description: 'Draft a compelling motivational letter'
    },
    {
      id: 'learning-plan',
      icon: <CalendarMonth />,
      label: '30-Day Learning',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      prompt: 'Create a structured 30-day learning plan to help me build valuable skills for my career. Include daily goals and actionable tasks.',
      description: 'Get a personalized learning roadmap'
    },
    {
      id: 'community-projects',
      icon: <Lightbulb />,
      label: 'Community Ideas',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      prompt: `Give me community project ideas for the Eastern Cape that I can start with limited resources. Focus on youth empowerment, education, or tech.`,
      description: 'Discover impactful project ideas'
    },
    {
      id: 'study-timetable',
      icon: <MenuBook />,
      label: 'Weekly Study Plan',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      prompt: 'Create a weekly study timetable that balances my subjects, revision time, breaks, and personal development. Make it realistic and effective.',
      description: 'Organize your study schedule'
    },
    {
      id: 'interview-prep',
      icon: <Psychology />,
      label: 'Interview Prep',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      prompt: 'Help me prepare for job interviews. Give me common questions, strong sample answers, and confidence-building tips.',
      description: 'Master your next interview'
    },
    {
      id: 'start-business',
      icon: <Business />,
      label: 'Start a Business',
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      prompt: 'Guide me step-by-step on how to start my own business in South Africa. Cover idea validation, registration, funding, and marketing basics.',
      description: 'Launch your entrepreneurial journey'
    },
    {
      id: 'company-research',
      icon: <Search />,
      label: 'Company Research',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      prompt: 'Help me research companies before my interview. What should I know about their mission, values, culture, and recent news?',
      description: 'Prepare for company interviews'
    },
    {
      id: 'rejection-feedback',
      icon: <ThumbUp />,
      label: 'Improve After Rejection',
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      prompt: 'I got rejected from an opportunity. Analyze possible reasons and give me constructive tips to improve my CV, interview skills, and overall application.',
      description: 'Turn rejection into growth'
    }
  ];

  const handleActionClick = async (action) => {
    setSelectedAction(action);
    setInputMessage(action.prompt);
    
    // Add user message
    const userMsg = {
      type: 'user',
      content: action.label,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Send to AI - USE /chat/gpt for CAREER assistant (not /chat which is medical)
    setLoading(true);
    try {
      const response = await api.post('/chat/gpt', { 
        message: action.prompt,
        context: {
          userName: user?.name,
          userEmail: user?.email,
          userLocation: user?.location,
          userEducation: user?.education,
          userSkills: user?.skills
        }
      });

      const botMsg = {
        type: 'bot',
        content: response.data.message, // GPT endpoint returns 'message' not 'reply'
        action: action.label,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg = {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setInputMessage('');
      setSelectedAction(null);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMsg = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    setLoading(true);
    try {
      const response = await api.post('/chat/gpt', { 
        message: inputMessage,
        context: {
          userName: user?.name,
          userEmail: user?.email,
          userLocation: user?.location,
          userEducation: user?.education,
          userSkills: user?.skills
        }
      });

      const botMsg = {
        type: 'bot',
        content: response.data.message, // GPT endpoint returns 'message' not 'reply'
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg = {
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const handleNewChat = () => {
    setMessages([]);
    setSelectedAction(null);
  };

  // Show error if component crashed
  if (error) {
    return (
      <Paper sx={{ p: 3, bgcolor: '#fee2e2', borderRadius: 3 }}>
        <Typography color="error" fontWeight={600}>
          ❌ AI Assistant Error: {error}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Check browser console (F12) for details
        </Typography>
      </Paper>
    );
  }

  if (!isOpen) {
    console.log('🟢 Rendering CLOSED state - showing Launch button')
    return (
      <Zoom in={true}>
        <Button
          variant="contained"
          size="large"
          startIcon={<AutoAwesome />}
          onClick={() => {
            console.log('🟢🟢🟢 LAUNCH BUTTON CLICKED! 🟢🟢🟢')
            setIsOpen(true)
          }}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)',
            color: 'white',
            py: 2,
            px: 4,
            borderRadius: 4,
            fontSize: '1.1rem',
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 50%, #d97706 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 48px rgba(99, 102, 241, 0.5)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          🚀 Launch AI Career Assistant
        </Button>
      </Zoom>
    );
  }

  console.log('🟢 Rendering OPEN state - showing full chat interface')
  return (
    <Fade in={isOpen}>
      <Paper 
        elevation={8}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >
        {/* Header */}
        <Box sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          p: 3,
          color: 'white',
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: 'white', 
                color: '#6366f1',
                width: 56,
                height: 56,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              }}>
                <AutoAwesome fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  AI Career Assistant
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Hey {user?.name?.split(' ')[0] || 'there'}! 👋 Let's boost your career together
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={() => setIsOpen(false)}
              sx={{ color: 'white' }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Action Buttons - Scrollable Grid */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '2px solid #e5e7eb',
          background: 'white'
        }}>
          <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={2}>
            🎯 Quick Actions - Click to get started
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 1.5,
            maxHeight: '200px',
            overflowY: 'auto',
            pr: 1,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#6366f1',
              borderRadius: '10px',
            }
          }}>
            {aiActions.map((action) => (
              <Tooltip key={action.id} title={action.description} arrow>
                <Button
                  variant="outlined"
                  onClick={() => handleActionClick(action)}
                  disabled={loading}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    borderColor: action.color,
                    color: action.color,
                    background: `${action.color}08`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.5,
                    '&:hover': {
                      background: action.gradient,
                      color: 'white',
                      borderColor: action.color,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 12px ${action.color}40`
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  {action.icon}
                  <Typography variant="caption" fontWeight={600}>
                    {action.label}
                  </Typography>
                </Button>
              </Tooltip>
            ))}
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box sx={{
          height: '400px',
          overflowY: 'auto',
          p: 3,
          background: '#fafafa',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#6366f1',
            borderRadius: '10px',
          }
        }}>
          {messages.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <AutoAwesome sx={{ fontSize: 64, color: '#6366f1', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} color="text.secondary" gutterBottom>
                Ready to level up your career? 🚀
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click any button above to get personalized AI assistance
              </Typography>
            </Box>
          )}

          {messages.map((msg, index) => (
            <Fade in={true} key={index}>
              <Box sx={{
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}>
                {msg.type === 'bot' && (
                  <Avatar sx={{ 
                    bgcolor: '#6366f1', 
                    mr: 1.5,
                    width: 40,
                    height: 40
                  }}>
                    <AutoAwesome />
                  </Avatar>
                )}
                <Box sx={{ maxWidth: '75%' }}>
                  {msg.action && (
                    <Chip 
                      label={msg.action}
                      size="small"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: msg.type === 'user' 
                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        : 'white',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      position: 'relative'
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        lineHeight: 1.6
                      }}
                    >
                      {msg.content}
                    </Typography>
                    {msg.type === 'bot' && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <IconButton 
                          size="small"
                          onClick={() => handleCopyMessage(msg.content)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Paper>
                </Box>
                {msg.type === 'user' && (
                  <Avatar sx={{ 
                    bgcolor: '#ec4899', 
                    ml: 1.5,
                    width: 40,
                    height: 40
                  }}>
                    {user?.name?.charAt(0) || 'U'}
                  </Avatar>
                )}
              </Box>
            </Fade>
          ))}

          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: '#6366f1' }}>
                <AutoAwesome />
              </Avatar>
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="text.secondary">
                    AI is thinking...
                  </Typography>
                </Box>
              </Paper>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          p: 2, 
          borderTop: '2px solid #e5e7eb',
          background: 'white',
          display: 'flex',
          gap: 1,
          alignItems: 'center'
        }}>
          {messages.length > 0 && (
            <Tooltip title="Start new conversation">
              <IconButton 
                onClick={handleNewChat}
                color="primary"
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          )}
          <TextField
            fullWidth
            placeholder="Ask me anything about your career..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#f8fafc'
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || loading}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              }
            }}
          >
            <Send />
          </Button>
        </Box>
      </Paper>
    </Fade>
  );
};

export default AICareerAssistant;

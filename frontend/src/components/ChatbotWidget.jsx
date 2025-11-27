import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { generateContextualResponse, generateGreeting, getPageHelp } from '../constants/contextualChatbot';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null); // User data
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { language } = useLanguage();

  // Get user data from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        console.log('Could not parse user data');
      }
    }
  }, []);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = generateGreeting(user, language);
      const currentPage = location.pathname.replace('/', '') || 'home';
      const pageHelp = getPageHelp(currentPage, language);
      
      setMessages([{
        type: 'bot',
        text: `${welcomeMessage}\n\n${pageHelp}`,
        timestamp: new Date()
      }]);
    }
  }, [language, location.pathname]); // Update when language or page changes

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 600));

    // Get current page from location
    const currentPage = location.pathname.replace('/', '') || 'home';
    
    // Get contextual response
    const result = generateContextualResponse(userInput, currentPage, user, language);
    
    const botMessage = {
      type: 'bot',
      text: result.response,
      timestamp: new Date(),
      responseType: result.type
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  // Quick action buttons based on current page and language
  const getQuickActions = () => {
    // Get current page from location
    const currentPage = location.pathname.replace('/', '') || 'home';
    
    const pageSpecific = {
      home: {
        en: ['What can I do here?', 'How do I get started?', 'Where are the bursaries?', 'Find me a job'],
        xh: ['Ndingenza ntoni apha?', 'Ndiqala njani?', 'Ziphi iibhasari?', 'Ndifunele umsebenzi']
      },
      bursaries: {
        en: ['How do I apply?', 'What documents do I need?', 'Help with this page', 'What is NSFAS?'],
        xh: ['Ndifaka njani isicelo?', 'Ndifuna maxwebhu aphi?', 'Nceda ngeli phepha', 'Yintoni i-NSFAS?']
      },
      learnerships: {
        en: ['What is a learnership?', 'How do I apply?', 'Do I get paid?', 'What fields are available?'],
        xh: ['Yintoni ilearnership?', 'Ndifaka njani isicelo?', 'Ndiyahlawulwa?', 'Ngamacandelo aphi?']
      },
      careers: {
        en: ['How do I find a job?', 'CV tips please', 'Help with this page', 'Interview advice'],
        xh: ['Ndiwufumana njani umsebenzi?', 'Iingcebiso ze-CV', 'Nceda ngeli phepha', 'Iingcebiso zodliwano-ndlebe']
      },
      'business-funding': {
        en: ['How do I get funding?', 'What is NYDA?', 'Help with this page', 'Start a business'],
        xh: ['Ndiyifumana njani inkxaso?', 'Yintoni i-NYDA?', 'Nceda ngeli phepha', 'Qalisa ishishini']
      },
      'medical-chat': {
        en: ['What can I ask here?', 'Find a clinic', 'Help with this page', 'Emergency numbers'],
        xh: ['Ndingazibuza ntoni apha?', 'Fumana ikliniki', 'Nceda ngeli phepha', 'Iinombolo zongxamiseko']
      },
      forums: {
        en: ['How do I post?', 'Join a discussion', 'Help with this page', 'Find mentors'],
        xh: ['Ndifaka njani isithuba?', 'Joyina ingxoxo', 'Nceda ngeli phepha', 'Fumana abaluleki']
      },
      events: {
        en: ['What events are coming?', 'How do I register?', 'Help with this page', 'Events near me'],
        xh: ['Yimicimbi ephi ezayo?', 'Ndibhalisa njani?', 'Nceda ngeli phepha', 'Imicimbi kufutshane']
      }
    };

    const defaultActions = {
      en: ['Help with this page', 'How to navigate', 'How to apply', 'What is this?'],
      xh: ['Nceda ngeli phepha', 'Indlela yokuhamba', 'Indlela yokufaka isicelo', 'Yintoni le?']
    };

    const lang = language === 'xh' ? 'xh' : 'en';
    return pageSpecific[currentPage]?.[lang] || defaultActions[lang];
  };

  const clearChat = () => {
    const currentPage = location.pathname.replace('/', '') || 'home';
    const welcomeMessage = generateGreeting(user, language);
    const pageHelp = getPageHelp(currentPage, language);
    
    setMessages([{
      type: 'bot',
      text: `${welcomeMessage}\n\n${pageHelp}`,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="chatbot-widget">
      {/* Chat Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label={language === 'xh' ? 'Vula incoko' : 'Open chat'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!isOpen && <span className="chatbot-badge">?</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div>
                <h3>{language === 'xh' ? 'Umncedi weYouth Portal' : 'Youth Portal Assistant'}</h3>
                <span className="chatbot-status">
                  <span className="status-dot"></span>
                  {language === 'xh' ? 'Uyafumaneka' : 'Online'}
                </span>
              </div>
            </div>
            <button 
              className="chatbot-clear"
              onClick={clearChat}
              title={language === 'xh' ? 'Sula incoko' : 'Clear chat'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                {message.type === 'bot' && (
                  <div className="message-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" />
                      <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="chatbot-quick-actions">
              <p className="quick-actions-title">
                {language === 'xh' ? 'Imibuzo eqhelekileyo:' : 'Quick questions:'}
              </p>
              <div className="quick-actions-buttons">
                {getQuickActions().map((question, index) => (
                  <button
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chatbot-input"
              placeholder={language === 'xh' ? 'Bhala umbuzo wakho...' : 'Type your question...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              className="chatbot-send"
              disabled={!inputValue.trim()}
              aria-label={language === 'xh' ? 'Thumela umyalezo' : 'Send message'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;

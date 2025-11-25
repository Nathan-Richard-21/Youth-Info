import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { generateSmartResponse, conversationState } from '../constants/smartChatbot';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { language } = useLanguage();

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
      const welcomeMessage = language === 'xh'
        ? `Molo! 👋 Wamkelekile kwiYouth Portal.\n\nNdingakunceda njani namhlanje? Ungandibuza:\n🎓 Iikosi kunye noqeqesho\n🚀 Ukuqalisa ishishini\n💰 Inkxaso-mali (NSFAS)\n💼 Imisebenzi\n🏥 Impilo\n📄 I-CV uncedo`
        : `Hello! 👋 Welcome to the Youth Portal.\n\nHow can I help you today? You can ask me about:\n🎓 Courses and training\n🚀 Starting a business\n💰 Funding (NSFAS, bursaries)\n💼 Jobs and careers\n🏥 Health and wellbeing\n📄 CV and application help\n\nJust ask me anything!`;
      
      setMessages([{
        type: 'bot',
        text: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [language]); // Update welcome message when language changes

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
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get current page from location
    const currentPage = location.pathname.replace('/', '') || 'home';
    
    // Get smart bot response with page context
    const result = generateSmartResponse(userInput, currentPage);
    
    // Add conversation to history
    conversationState.addToHistory(userInput, result.response);
    
    const botMessage = {
      type: 'bot',
      text: result.response,
      timestamp: new Date(),
      flow: result.flow,
      step: result.step,
      isPageInfo: result.isPageInfo // Flag if it's page-specific info
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
        en: ['Help me get started', 'What opportunities are available?', 'How do I create a CV?', 'Tell me about bursaries'],
        xh: ['Ndincede ndiqalise', 'Ngamathuba aphi akhoyo?', 'Ndenza njani i-CV?', 'Ndithethe ngeebursaries']
      },
      bursaries: {
        en: ['How do I apply?', 'What documents do I need?', 'Who qualifies for bursaries?', 'Tell me about NSFAS'],
        xh: ['Ndifaka njani isicelo?', 'Ndifuna maxwebhu aphi?', 'Ngubani ofaneleka?', 'Ndithethe nge-NSFAS']
      },
      learnerships: {
        en: ['What are learnerships?', 'How do I apply?', 'What fields are available?', 'Do I get paid?'],
        xh: ['Zintoni iilearnerships?', 'Ndifaka njani isicelo?', 'Ngamacandelo aphi akhoyo?', 'Ndiyahlawulwa?']
      },
      careers: {
        en: ['How do I find a job?', 'Interview tips please', 'What about my first job?', 'How to apply'],
        xh: ['Ndiwufumana njani umsebenzi?', 'Iingcebiso zodliwano-ndlebe', 'Ngomsebenzi wam wokuqala?', 'Ndifaka njani isicelo']
      },
      'resume-builder': {
        en: ['What goes in a CV?', 'CV writing tips', 'What if I have no experience?', 'How long should it be?'],
        xh: ['Ndifaka ntoni kwi-CV?', 'Iingcebiso zokubhala i-CV', 'Ukuba andinayo intoni?', 'Ithatha ixesha elingakanani?']
      },
      opportunities: {
        en: ['How do I apply?', 'What types of jobs?', 'Help me search', 'Application tips'],
        xh: ['Ndifaka njani isicelo?', 'Zintoni iintlobo zemisebenzi?', 'Ndincede ndikhangele', 'Iingcebiso zesicelo']
      },
      'business-funding': {
        en: ['How do I get funding?', 'What do I need?', 'Tell me about grants', 'Business plan help'],
        xh: ['Ndiyifumana njani inkxaso-mali?', 'Ndifuna ntoni?', 'Ndithethe ngezibonelelo', 'Uncedo ngesicwangciso']
      }
    };

    const defaultActions = {
      en: ['Help with this page', 'Tell me about CVs', 'What bursaries are available?', 'How do I apply?'],
      xh: ['Nceda ngeli phepha', 'Ndithethe ngee-CV', 'Zikhona iibursary eziphi?', 'Ndifaka njani isicelo?']
    };

    const lang = language === 'xh' ? 'xh' : 'en';
    return pageSpecific[currentPage]?.[lang] || defaultActions[lang];
  };

  const clearChat = () => {
    const welcomeMessage = language === 'xh'
      ? 'Molo! Ndingakunceda njani namhlanje? Ungandibuza nantoni na malunga neli phepha okanye nayiphi na into enxulumene neYouth Portal.'
      : 'Hello! How can I help you today? You can ask me anything about this page or the Youth Portal.';
    
    setMessages([{
      type: 'bot',
      text: welcomeMessage,
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

// ============================================================================
// CONVERSATION MEMORY & USER PROFILE MANAGEMENT
// ============================================================================

// User conversation history and profile storage
export const conversationManager = {
  userProfile: {
    name: null,
    age: null,
    location: null,
    educationLevel: null,
    interests: [],
    previousQuestions: [],
    applicationStatus: {},
    bookmarkedOpportunities: [],
    documentationStatus: {},
    emotionalState: null,
    businessProfile: {
      businessType: null,
      timeCommitment: null,
      startingCapital: null,
      customerBase: null,
      location: null,
      step: 0  // Track which step of business flow
    }
  },
  
  conversationHistory: [],
  
  // Extract user information from messages
  extractUserInfo: (message) => {
    const info = {};
    
    // Age extraction (e.g., "I'm 20 years old", "20-year-old")
    const ageMatch = message.match(/(\d{1,2})[\s-]?(?:years?|yrs?|old|yaun)/i);
    if (ageMatch) info.age = parseInt(ageMatch[1]);
    
    // Location extraction (e.g., "from Mthatha", "in Port Elizabeth", "Butterworth area")
    const locations = ['mthatha', 'port elizabeth', 'gqeberha', 'east london', 'butterworth', 'cape town', 'johannesburg', 'durban', 'bloemfontein', 'polokwane'];
    locations.forEach(loc => {
      if (message.toLowerCase().includes(loc)) info.location = loc;
    });
    
    // Education level (e.g., "engineering student", "completed matric", "Grade 12", "university")
    const eduMatch = message.match(/(?:studying|student|studying|completed|passed|failed|grade|matric|university|college|highschool|secondary|learner)\s+([^.,]+)/i);
    if (eduMatch) info.educationLevel = eduMatch[1].trim();
    
    // Name extraction (e.g., "My name is John", "I'm Thabo")
    const nameMatch = message.match(/(?:my name is|i'?m|call me)\s+([A-Z][a-z]+)/i);
    if (nameMatch) info.name = nameMatch[1];
    
    // Emotional state detection
    const stressKeywords = ['stress', 'pressure', 'worried', 'anxious', 'depressed', 'sad', 'overwhelmed'];
    const enthusiasmKeywords = ['excited', 'happy', 'great', 'awesome', 'motivated'];
    const frustrationKeywords = ['frustrated', 'angry', 'annoyed', 'irritated'];
    
    if (stressKeywords.some(kw => message.toLowerCase().includes(kw))) {
      info.emotionalState = 'stressed';
    } else if (enthusiasmKeywords.some(kw => message.toLowerCase().includes(kw))) {
      info.emotionalState = 'enthusiastic';
    } else if (frustrationKeywords.some(kw => message.toLowerCase().includes(kw))) {
      info.emotionalState = 'frustrated';
    }
    
    return info;
  },
  
  // Update user profile with extracted info
  updateProfile: (extractedInfo) => {
    if (extractedInfo.name) conversationManager.userProfile.name = extractedInfo.name;
    if (extractedInfo.age) conversationManager.userProfile.age = extractedInfo.age;
    if (extractedInfo.location) conversationManager.userProfile.location = extractedInfo.location;
    if (extractedInfo.educationLevel) conversationManager.userProfile.educationLevel = extractedInfo.educationLevel;
    if (extractedInfo.emotionalState) conversationManager.userProfile.emotionalState = extractedInfo.emotionalState;
  },
  
  // Store conversation in history
  addToHistory: (userMessage, botResponse) => {
    conversationManager.conversationHistory.push({
      timestamp: new Date(),
      user: userMessage,
      bot: botResponse,
      userProfile: { ...conversationManager.userProfile }
    });
    
    // Keep only last 20 messages to avoid memory overload
    if (conversationManager.conversationHistory.length > 20) {
      conversationManager.conversationHistory = conversationManager.conversationHistory.slice(-20);
    }
  },
  
  // Generate context-aware follow-up
  generateFollowUp: () => {
    const profile = conversationManager.userProfile;
    const followUps = [];
    
    if (profile.name && !profile.emotionalState) {
      followUps.push(`By the way ${profile.name}, is there anything specific you're looking for today?`);
    } else if (profile.emotionalState === 'stressed') {
      followUps.push(`I notice you might be feeling pressured. Remember, I'm here to help make this process easier. What's your main concern right now?`);
    } else if (profile.emotionalState === 'frustrated') {
      followUps.push(`I understand this can be frustrating. Let's break it down into smaller steps. What would help most?`);
    } else if (profile.emotionalState === 'enthusiastic') {
      followUps.push(`That's great energy! Let's channel that into getting you the best opportunities. What should we focus on?`);
    }
    
    if (profile.location) {
      followUps.push(`I can help you find opportunities specifically in ${profile.location}. Would that be helpful?`);
    }
    
    if (profile.educationLevel) {
      followUps.push(`Since you're ${profile.educationLevel}, I can suggest programs that fit your situation.`);
    }
    
    if (profile.previousQuestions.length > 0) {
      const lastQuestion = profile.previousQuestions[profile.previousQuestions.length - 1];
      followUps.push(`Last time we discussed ${lastQuestion}. Do you need more details on that, or shall we explore something else?`);
    }
    
    return followUps.length > 0 ? followUps[Math.floor(Math.random() * followUps.length)] : null;
  },
  
  // Check if user is returning and generate personalized welcome
  generatePersonalizedWelcome: () => {
    const profile = conversationManager.userProfile;
    const history = conversationManager.conversationHistory;
    
    if (!profile.name) {
      return "Welcome! 👋 What's your name, so I can help you better?";
    }
    
    if (history.length > 0) {
      const lastInteraction = history[history.length - 1];
      const timeSinceLastChat = new Date() - new Date(lastInteraction.timestamp);
      const hoursSince = Math.floor(timeSinceLastChat / (1000 * 60 * 60));
      
      let greeting = `Welcome back, ${profile.name}! 👋`;
      
      if (hoursSince < 1) {
        greeting += `\n\nQuickly back, I see! 😊 `;
      } else if (hoursSince < 24) {
        greeting += `\n\nNice to see you again! `;
      } else {
        greeting += `\n\nIt's been ${hoursSince < 24 ? 'a bit' : Math.floor(hoursSince / 24) + ' days'} since we last chatted. `;
      }
      
      // Recall previous context
      if (profile.previousQuestions.length > 0) {
        const lastTopic = profile.previousQuestions[profile.previousQuestions.length - 1];
        greeting += `\n\nWe were discussing **${lastTopic}** last time. Would you like to continue with that, or explore something new?`;
      } else {
        greeting += `\n\nWhat can I help you with today?`;
      }
      
      return greeting;
    }
    
    return `Hello ${profile.name}! 👋 Nice to meet you! How can I assist you today?`;
  }
};

// ============================================================================
// INTENT RECOGNITION SYSTEM - STRICT TOPIC-BASED ROUTING
// ============================================================================

/**
 * Topic Categories and their Keywords
 * This system identifies the PRIMARY TOPIC of user's question
 * to ensure correct response routing
 */
const topicKeywords = {
  BUSINESS: {
    keywords: ['start business', 'business idea', 'make money', 'entrepreneur', 'side hustle', 
               'own business', 'startup', 'business plan', 'business funding', 'sell', 'selling',
               'products', 'services', 'business tips', 'how to start', 'create business',
               'business opportunity', 'small business', 'entrepreneurship', 'business model',
               'start a business', 'begin a business', 'launch', 'my own business', 'business startup',
               'getting into business', 'how do i start', 'setting up business', 'start selling'],
    category: 'Business Startup'
  },
  FUNDING: {
    keywords: ['nsfas', 'bursary', 'scholarship', 'financial aid', 'study money', 'tuition fees',
               'funding for studies', 'bursaries', 'grants', 'study grant', 'educational funding',
               'fund my studies', 'pay for university', 'afford university', 'student funding',
               'government aid', 'study support', 'sponsor', 'scholarship application', 'nsfas application',
               'financial assistance', 'pay for school', 'fund education'],
    category: 'Bursaries/Funding (NSFAS)'
  },
  COURSES: {
    keywords: ['course', 'study', 'learnership', 'training', 'qualification', 'what should i study',
               'which course', 'career path', 'education', 'degree', 'diploma', 'certificate',
               'study path', 'career guidance', 'what to study', 'field of study', 'career advice',
               'educational program', 'training program', 'what career', 'find a course', 'courses available',
               'study options', 'educational options', 'learning', 'coursework'],
    category: 'Learnerships/Courses'
  },
  JOBS: {
    keywords: ['job', 'employment', 'work', 'intern', 'internship', 'interview', 'cv', 'resume',
               'cover letter', 'apply for job', 'career', 'hiring', 'recruitment', 'opportunity',
               'finding work', 'get hired', 'job search', 'job application', 'recruitment process',
               'interview tips', 'job interview', 'work experience', 'looking for work', 'job openings',
               'employment opportunities', 'career opportunities', 'work opportunities'],
    category: 'Jobs/Employment'
  },
  HEALTH: {
    keywords: ['sick', 'unwell', 'health', 'medical', 'clinic', 'hospital', 'feeling ill', 'disease',
               'symptom', 'pain', 'doctor', 'nurse', 'emergency', 'mental health', 'stress',
               'depression', 'anxiety', 'suicidal', 'help me', 'feeling sad', 'feeling alone',
               'not feeling well', 'healthcare', 'illness', 'headache', 'fever', 'pneumonia',
               'emotional', 'counseling', 'therapy', 'psychological', 'struggling'],
    category: 'Health/Medical'
  },
  CV: {
    keywords: ['cv', 'resume', 'cover letter', 'profile', 'linkedin', 'application letter',
               'how to write cv', 'cv format', 'what to include', 'cv tips', 'resume help',
               'cv template', 'linkedin profile', 'portfolio', 'write a cv', 'cv writing',
               'application', 'job application', 'how to apply'],
    category: 'CV/Resume Help'
  }
};

/**
 * Identifies the PRIMARY TOPIC/INTENT of the user's question
 * Returns the topic category to ensure correct response routing
 */
const identifyPrimaryTopic = (question) => {
  const normalizedQ = question.toLowerCase().trim();
  let topicScores = {};
  
  // Score each topic based on keyword matches
  Object.keys(topicKeywords).forEach(topic => {
    const keywords = topicKeywords[topic].keywords;
    let score = 0;
    
    keywords.forEach(keyword => {
      if (normalizedQ.includes(keyword)) {
        score += 10; // Exact keyword match = 10 points
      }
    });
    
    if (score > 0) {
      topicScores[topic] = score;
    }
  });
  
  // Return the topic with highest score, or null if no match
  const topicWithHighestScore = Object.keys(topicScores).reduce((prev, current) => 
    topicScores[prev] > topicScores[current] ? prev : current, null
  );
  
  return topicWithHighestScore ? {
    topic: topicWithHighestScore,
    category: topicKeywords[topicWithHighestScore].category,
    confidence: topicScores[topicWithHighestScore]
  } : null;
};

/**
 * Validates if response matches the identified topic
 * PREVENTS topic mismatch (e.g., NSFAS info for business questions)
 */
const validateResponseTopic = (identifiedTopic, responseTopicKeywords) => {
  if (!identifiedTopic) return true; // No identified topic = allow any response
  
  const responseKeywords = responseTopicKeywords || [];
  const normalizedResponse = (responseKeywords.join(' ')).toLowerCase();
  
  // Check if response keywords are relevant to identified topic
  const topicKeywordsStr = topicKeywords[identifiedTopic.topic].keywords.join(' ');
  
  let matchCount = 0;
  topicKeywords[identifiedTopic.topic].keywords.forEach(keyword => {
    if (normalizedResponse.includes(keyword)) matchCount++;
  });
  
  return matchCount > 0; // Valid if at least one keyword matches
};

/**
 * Generates clarification message when topic is ambiguous
 */
const generateClarificationMessage = (language = 'en') => {
  if (language === 'xh') {
    return `Ndifuna ukuqinisekisa ukuba ndikuze ndikunceda ngalungile! Uyibuza ngantoni?

• 🚀 Ukuqalisa ubhizinisi wakho
• 🎓 Inkxaso-mali yesifundo (NSFAS)
• 💼 Ukufumana umsebenzi okanye i-learnership
• 📚 Iikhausi kunye nosiqeqesho
• 🏥 Izempilo okanye ucwangciso lwesifo
• 📄 Uncedo ngeCV okanye iResume

Ndichaze enye, kwaye ndiza kukukunceda ngolunga!`;
  }
  
  return `I want to make sure I give you the right information! Are you asking about:

• 🚀 Starting your own business
• 🎓 Funding for your studies (NSFAS)
• 💼 Finding a job or learnership
• 📚 Courses and training
• 🏥 Health or medical concerns
• 📄 Help with CV or Resume

Please let me know which one, and I'll give you detailed help!`;
};

// Chatbot Knowledge Base - Questions and Answers in English and Xhosa

export const CHATBOT_DATA = {
  // General Questions
  general: {
    en: [
      {
        keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'hola', 'sup', 'yo'],
        answer: "Hello! 👋 Welcome to the Youth Portal. I'm here to help you navigate the platform and answer your questions in both English and isiXhosa. How can I assist you today?"
      },
      {
        keywords: ['help', 'assist', 'support', 'need help', 'can you help', 'assistance'],
        answer: "I'm here to help! You can ask me about:\n\n📄 CVs & Resumes - How to write, what to include\n💰 Bursaries - Available funding, how to apply\n📚 Learnerships - Training programs, requirements\n💼 Careers - Job searching, interview tips\n🎯 Opportunities - Finding jobs and internships\n📅 Events - Upcoming workshops and webinars\n💬 Forums - Community discussions\n🏢 Business Funding - Startup grants and loans\n📖 How to use any page on this portal\n\nJust type your question! I can answer in English or isiXhosa."
      },
      {
        keywords: ['thank', 'thanks', 'thank you', 'appreciate', 'thx'],
        answer: "You're very welcome! 😊 I'm always here if you need anything else. Don't hesitate to ask - whether it's about opportunities, applications, or how to use the portal. Good luck with your journey!"
      },
      {
        keywords: ['language', 'translate', 'xhosa', 'english', 'change language', 'switch language', 'isixhosa'],
        answer: "🌍 You can switch between English and isiXhosa using the language toggle button in the navigation bar at the top of the page.\n\nI can respond in both languages! You can ask questions in English or isiXhosa, and I'll answer in the same language you're using. The entire portal is bilingual to serve you better."
      },
      {
        keywords: ['who are you', 'what are you', 'bot', 'chatbot', 'your name'],
        answer: "I'm the Youth Portal Assistant! 🤖 I'm here 24/7 to help you:\n• Navigate the portal\n• Find opportunities\n• Learn about CVs and applications\n• Understand requirements\n• Get page-specific help\n\nI work completely in your browser - no backend needed! I can answer in English or isiXhosa."
      },
      {
        keywords: ['how', 'what', 'when', 'where', 'why', 'who'],
        answer: "I can help answer many questions! Try asking me about:\n\n• 'How do I apply for a bursary?'\n• 'What should I include in my CV?'\n• 'When are applications open?'\n• 'Where can I find job opportunities?'\n• 'Why do I need a cover letter?'\n• 'Who can apply for learnerships?'\n\nBe specific and I'll do my best to help! 😊"
      }
    ],
    xh: [
      {
        keywords: ['molo', 'molweni', 'sawubona', 'hello', 'hi', 'bhota', 'yho'],
        answer: "Molo! 👋 Wamkelekile kwiYouth Portal. Ndilapha ukukunceda ukuba uhambe kule platform kwaye ndiphendule imibuzo yakho ngesiNgesi nangesiXhosa. Ndingakunceda njani namhlanje?"
      },
      {
        keywords: ['nceda', 'help', 'ndifuna uncedo', 'ndicela uncedo', 'ungandinceda', 'ndincede'],
        answer: "Ndilapha ukukunceda! Ungandiphendula malunga:\n\n📄 Ii-CV kunye neeResumes - Indlela yokubhala, ukufaka ntoni\n💰 Iibursaries - Inkxaso-mali ekhoyo, indlela yokufaka isicelo\n📚 Iilearnerships - Iinkqubo zoqeqesho, iimfuno\n💼 Imisebenzi - Ukukhangela umsebenzi, iingcebiso zodliwano-ndlebe\n🎯 Amathuba - Ukufumana imisebenzi kunye ne-internships\n📅 Iziganeko - Iindibano kunye neewebinars ezizayo\n💬 Iiforum - Iingxoxo zoluntu\n🏢 Inkxaso-mali yeShishini - Izibonelelo kunye neemali-mboleko zokuqalisa\n📖 Indlela yokusebenzisa naliphi na iphepha kule portal\n\nNdibuze umbuzo wakho! Ndingaphendula ngesiNgesi okanye ngesiXhosa."
      },
      {
        keywords: ['enkosi', 'ndiyabulela', 'thank', 'bawo', 'siyabulela'],
        answer: "Wamkelekile kakhulu! 😊 Ndisoloko lapha ukuba ufuna enye into. Ungalibali ukubuza - nokuba kumalunga namathuba, izicelo, okanye indlela yokusebenzisa iportal. Hamba kakuhle kuhambo lwakho!"
      },
      {
        keywords: ['ulwimi', 'language', 'tshintsha ulwimi', 'xhosa', 'english', 'guqula ulwimi', 'isixhosa'],
        answer: "🌍 Ungatshintsha phakathi kwesiNgesi nesiXhosa usebenzisa iqhosha lokutshintsha ulwimi kwibar yokuhamba phezulu ephepha.\n\nNdingaphendula ngeelwimi zombini! Ungabuza imibuzo ngesiNgesi okanye ngesiXhosa, kwaye ndiza kuphendula ngolwimi ofana nolo usebenzisayo. Yonke iportal inelwimi ezimbini ukukunceda ngcono."
      },
      {
        keywords: ['ungubani', 'uyintoni', 'igama lakho', 'bot', 'chatbot'],
        answer: "NdinguMncedi weYouth Portal! 🤖 Ndilapha 24/7 ukukunceda:\n• Hamba kwiportal\n• Fumana amathuba\n• Funda ngee-CV kunye nezicelo\n• Qonda iimfuno\n• Fumana uncedo oluthile lwephepha\n\nNdisebenza ngokupheleleyo kwibhrawuza yakho - akukho backend ifunekayo! Ndingaphendula ngesiNgesi okanye ngesiXhosa."
      },
      {
        keywords: ['njani', 'yintoni', 'nini', 'phi', 'kutheni', 'ngubani'],
        answer: "Ndingakunceda ndiphendule imibuzo emininzi! Zama ukundibuza malunga:\n\n• 'Ndifaka njani isicelo sebursary?'\n• 'Ndifaka ntoni kwi-CV yam?'\n• 'Zivulwa nini izicelo?'\n• 'Ndingawafumana phi amathuba omsebenzi?'\n• 'Kutheni ndifuna ileta yokugubungela?'\n• 'Ngubani onokufaka isicelo leelearnerships?'\n\nBa nento ethile kwaye ndiza kwenza konke endinakho ukukunceda! 😊"
      }
    ]
  },

  // CV and Resume Questions
  cvResume: {
    en: [
      {
        keywords: ['cv', 'resume', 'curriculum vitae', 'what is cv', 'cv needed', 'need cv'],
        answer: "📄 A CV (Curriculum Vitae) or Resume is a document that showcases your:\n• Personal information\n• Education background\n• Work experience\n• Skills and competencies\n• Achievements and awards\n• References\n\nIt's essential for job, bursary, and learnership applications. Use our **Resume Builder** page to create a professional CV easily! 🎯"
      },
      {
        keywords: ['cv sections', 'what include cv', 'cv content', 'cv parts', 'cv structure', 'cv format'],
        answer: "✅ Essential CV Sections:\n\n1. **Personal Details**: Name, contact info, email, address\n2. **Personal Statement**: Brief intro about yourself (3-4 lines)\n3. **Education**: Schools, qualifications, dates, grades\n4. **Work Experience**: Jobs, internships, volunteering (most recent first)\n5. **Skills**: Technical, soft skills, languages, computer skills\n6. **Achievements**: Awards, projects, accomplishments\n7. **References**: 2-3 contactable references\n\n💡 Visit our **Resume Builder** page to create yours step-by-step!"
      },
      {
        keywords: ['cv tips', 'good cv', 'cv advice', 'improve cv', 'better cv', 'cv help', 'cv writing'],
        answer: "🌟 Top CV Tips:\n\n✅ Keep it 1-2 pages maximum\n✅ Use clear, professional font (Arial, Calibri)\n✅ Start with most recent experience\n✅ Use bullet points for easy reading\n✅ Include numbers (e.g., 'Managed team of 5 people')\n✅ Tailor it to each application\n✅ Check spelling and grammar carefully\n✅ Save as PDF to preserve formatting\n✅ Use action verbs: 'Managed', 'Developed', 'Led'\n❌ Don't include photo (unless requested)\n❌ Don't lie or exaggerate\n\nUse our Resume Builder tool for professional formatting! 🎯"
      },
      {
        keywords: ['cover letter', 'covering letter', 'application letter', 'motivation letter'],
        answer: "📝 **Cover Letter Guide:**\n\nA cover letter is a 1-page letter introducing yourself to employers.\n\n**Structure:**\n1. Your details and date (top)\n2. Employer's details\n3. Opening: 'Dear [Name]' or 'Dear Hiring Manager'\n4. **First paragraph**: Which job you're applying for and where you saw it\n5. **Middle paragraph(s)**: Why you're perfect for the role (match your skills to job requirements)\n6. **Final paragraph**: Thank them, express interest in interview\n7. Closing: 'Yours sincerely' (if name known) or 'Yours faithfully'\n\n**Tips:**\n• Personalize for each job\n• Show enthusiasm\n• Keep it professional\n• Maximum 1 page\n• Match tone to company culture"
      },
      {
        keywords: ['no experience', 'no work experience', 'first cv', 'student cv', 'never worked'],
        answer: "🎓 **CV Without Work Experience:**\n\nDon't worry! Focus on:\n\n✅ **Education**: Detail your subjects, grades, achievements\n✅ **School Projects**: Group work, presentations, research\n✅ **Volunteer Work**: Community service, church, NGOs\n✅ **Leadership**: Sports teams, class representative, clubs\n✅ **Skills**: Computer literacy, languages, soft skills\n✅ **Achievements**: Academic awards, competitions, certificates\n✅ **Hobbies**: That show relevant skills\n\n**Transferable Skills to Highlight:**\n• Teamwork (group projects)\n• Communication (presentations)\n• Problem-solving\n• Time management (balancing studies)\n• Leadership\n\nCheck our **Learnerships** page for entry-level opportunities! 🚀"
      },
      {
        keywords: ['references', 'referees', 'who reference', 'reference letter'],
        answer: "👥 **CV References Guide:**\n\n**Who to use as references:**\n✅ Teachers/Lecturers\n✅ Previous employers/supervisors\n✅ Community leaders\n✅ Volunteer coordinators\n✅ Sports coaches\n✅ Mentors\n\n❌ **Don't use:** Family members, friends\n\n**What to include:**\n• Full name and title\n• Organization/Institution\n• Phone number and email\n• Relationship to you\n\n**Important:**\n• Always ask permission first!\n• Choose people who know you well\n• Tell them when you're applying\n• Give them a copy of your CV\n• Keep them updated\n\nYou can write 'References available on request' if space is limited."
      },
      {
        keywords: ['skills', 'what skills', 'cv skills', 'soft skills', 'hard skills', 'technical skills'],
        answer: "💪 **Skills for Your CV:**\n\n**Technical/Hard Skills:**\n• Microsoft Office (Word, Excel, PowerPoint)\n• Computer literacy\n• Social media management\n• Data entry\n• Languages (be specific: fluent, conversational, basic)\n• Industry-specific software\n• Driving license\n\n**Soft Skills:**\n• Communication (written & verbal)\n• Teamwork & collaboration\n• Problem-solving\n• Time management\n• Leadership\n• Adaptability\n• Critical thinking\n• Customer service\n• Attention to detail\n• Work ethic\n\n**How to Show Skills:**\n✅ Don't just list them - prove them!\n✅ Example: 'Strong teamwork - Collaborated with 4 classmates on year-end project'\n✅ Use in work experience descriptions\n✅ Mention in achievements section"
      }
    ],
    xh: [
      {
        keywords: ['cv', 'resume', 'curriculum vitae', 'yintoni cv', 'ndifuna cv'],
        answer: "📄 I-CV (Curriculum Vitae) okanye iResume luxwebhu olubonisa:\n• Iinkcukacha zakho zobuqu\n• Imvelaphi yakho yemfundo\n• Amava omsebenzi\n• Izakhono nezakhono\n• Impumelelo kunye namabhaso\n• Izalathiso\n\nIbalulekile kwizicelo zemisebenzi, iibursary, kunye neelearnerships. Sebenzisa iphepha lethu le**Resume Builder** ukwenza i-CV yobuchwephesha ngokulula! 🎯"
      },
      {
        keywords: ['cv sections', 'ndifaka ntoni cv', 'cv content', 'iinxalenye cv', 'isakhiwo cv'],
        answer: "✅ Amacandelo abalulekileyo e-CV:\n\n1. **Iinkcukacha Zobuqu**: Igama, ulwazi loqhagamshelwano, i-imeyile, idilesi\n2. **Ingxelo Yobuqu**: Intshayelelo emfutshane ngawe (imigca emi-3-4)\n3. **Imfundo**: Izikolo, iziqinisekiso, imihla, amanqaku\n4. **Amava Omsebenzi**: Imisebenzi, ii-internships, ukuzivol unta (yakutshanje kuqala)\n5. **Izakhono**: Ezobugcisa, izakhono ezithambileyo, iilwimi, izakhono zekhompyuter\n6. **Impumelelo**: Amabhaso, iiprojekthi, impumelelo\n7. **Izalathiso**: Izalathiso ezi-2-3 ezinokuqhagamshelwa\n\n💡 Tyelela iphepha lethu le**Resume Builder** ukwenza eyakho ngokwenyathelo ngenyathelo!"
      },
      {
        keywords: ['cv tips', 'cv elungileyo', 'icebiso cv', 'phucula cv', 'cv encono', 'uncedo cv'],
        answer: "🌟 Iingcebiso eziphezulu ze-CV:\n\n✅ Yigcine kumaphepha ayi-1-2 ubuninzi\n✅ Sebenzisa ifonti ecacileyo, yobuchwephesha (Arial, Calibri)\n✅ Qala ngamava akutshanje\n✅ Sebenzisa amanqaku amnye ukufunda lula\n✅ Bandakanya amanani (umz., 'Walawula iqela labantu aba-5')\n✅ Yenze ifaneleke kwisicelo ngasinye\n✅ Khangela upelo negrama ngononophelo\n✅ Gcina njenge-PDF ukugcina ifomathi\n✅ Sebenzisa izenzi zesenzo: 'Walawula', 'Waphuhlisa', 'Wakhokela'\n❌ Musa ukubandakanya umfanekiso (ngaphandle kokuba uceliwe)\n❌ Musa ukuxoka okanye ugqithise\n\nSebenzisa isixhobo sethu seResume Builder ukufomatha ngokwengcali! 🎯"
      },
      {
        keywords: ['ileta yokugubungela', 'cover letter', 'ileta yesicelo', 'ileta yokukhuthaza'],
        answer: "📝 **Isikhokelo seleta yokuGubungela:**\n\nIleta yokugubungela lileta le-1 iphepha elikusazisa kubaqeshi.\n\n**Isakhiwo:**\n1. Iinkcukacha zakho nomhla (phezulu)\n2. Iinkcukacha zomqeshi\n3. Ukuvula: 'Mnumzana/Nkosikazi [Igama]' okanye 'Mnumzana/Nkosikazi Ohloniphekileyo'\n4. **Umhlathi wokuqala**: Nguwuphi umsebenzi ofaka isicelo kuwo kwaye wawubona phi\n5. **Umhlathi phakathi**: Kutheni ulungele ngokugqibeleleyo kule ndima (thelekisa izakhono zakho neemfuno zomsebenzi)\n6. **Umhlathi wokugqibela**: Babulelemele, bonakalise umdla kudliwano-ndlebe\n7. Ukuvala: 'Ozithobayo' (ukuba igama liyaziwa) okanye 'Ongathembekanga'\n\n**Iingcebiso:**\n• Yenza ibe yomntu ngamnye umsebenzi\n• Bonisa umdla\n• Yigcine isenziwa ngobuchule\n• Iphepha eli-1 eliphezulu\n• Hambelana nesimo senkcubeko yenkampani"
      },
      {
        keywords: ['akukho mava', 'akukho mava omsebenzi', 'cv yokuqala', 'cv yomfundi', 'andikaze ndisebenze'],
        answer: "🎓 **I-CV Ngaphandle kwaMava oMsebenzi:**\n\nMusa ukuxhalaba! Gxila kwi:\n\n✅ **Imfundo**: Chaza izifundo zakho, amanqaku, impumelelo\n✅ **Iiprojekthi Zesikolo**: Umsebenzi weqela, iintetho, uphando\n✅ **Umsebenzi wamaVolontiya**: Inkonzo yoluntu, icawa, ii-NGO\n✅ **Ubunkokeli**: Amaqela ezemidlalo, ummeli weklasi, iiklabhu\n✅ **Izakhono**: Ukufunda nokubhala ngekhompyuter, iilwimi, izakhono ezithambileyo\n✅ **Impumelelo**: Amabhaso emfundo, ukhuphiswano, iziqinisekiso\n✅ **Izinto Ezikuthandayo**: Ezibonisa izakhono ezifanelekileyo\n\n**Izakhono eziguqukayo ukuze uqaqambise:**\n• Ukusebenza ngeqela (iiprojekthi zeqela)\n• Unxibelelwano (iintetho)\n• Ukusombulula iingxaki\n• Ulawulo lwexesha (ukulinganisela izifundo)\n• Ubunkokeli\n\nKhangela iphepha lethu lee**Learnerships** ngamathuba enqanaba lokungena! 🚀"
      },
      {
        keywords: ['izalathiso', 'izalathisi', 'ngubani isalathiso', 'ileta yesalathiso'],
        answer: "👥 **Isikhokelo sezalathiso ze-CV:**\n\n**Ngubani ongasebenzisa njengezalathiso:**\n✅ Ootitshala/Abafundisi-ntsapho\n✅ Abaqeshi bangaphambili/abalawuli\n✅ Iinkokeli zoluntu\n✅ Abaququzeleli bamavolontiya\n✅ Abaqeqeshi bezemidlalo\n✅ Abacebisi\n\n❌ **Musa ukusebenzisa:** Amalungu osapho, abahlobo\n\n**Kufuneka ubandakanye ntoni:**\n• Igama elipheleleyo nesihloko\n• Umbutho/Iziko\n• Inombolo yomnxeba ne-imeyile\n• Ubudlelwane kuwe\n\n**Okubalulekileyo:**\n• Soloko ucela imvume kuqala!\n• Khetha abantu abakwaziyo kakuhle\n• Babaxelele xa ufaka isicelo\n• Banike ikopi ye-CV yakho\n• Bahlaziye\n\nUngabhala 'Izalathiso ziyafumaneka kwisicelo' ukuba indawo imfutshane."
      }
    ]
  },

  // Page-Specific Help
  pages: {
    home: {
      en: {
        keywords: ['home', 'homepage', 'main page', 'what this page', 'page', 'where am i'],
        answer: "🏠 **Welcome to the Home Page!**\n\nThis is your starting point - your dashboard to success!\n\n**What You'll Find Here:**\n📌 **Featured Opportunities** - Latest jobs, bursaries, learnerships\n🎯 **Quick Access** - Jump to any section instantly\n📢 **Latest Updates** - News and announcements\n🌟 **Success Stories** - Get inspired\n💡 **Getting Started Guide** - New here? Start here!\n\n**Where to Go:**\n• **Looking for funding?** → Bursaries page\n• **Want to study while working?** → Learnerships page\n• **Need a job?** → Opportunities & Careers pages\n• **Building your CV?** → Resume Builder\n• **Starting a business?** → Business Funding\n• **Want to learn?** → Knowledge Base & Events\n\n**Pro Tips:**\n✅ Create an account to save opportunities\n✅ Check back daily for new postings\n✅ Complete your profile for personalized matches\n✅ Use the chat (that's me!) anytime you need help\n\n**Language:** Switch between English and isiXhosa using the button in the top menu!\n\nWhat would you like to explore today?"
      },
      xh: {
        keywords: ['home', 'ikhaya', 'iphepha eliyintloko', 'leliphi iphepha', 'iphepha', 'ndiphi'],
        answer: "🏠 **Wamkelekile kwiPhepha laseKhaya!**\n\nEli liqonga lakho lokuqala - ideshibhodi yakho yempumelelo!\n\n**Oya kuFumana ntoni Apha:**\n📌 **AmaThuba aQaqambisiweyo** - Imisebenzi yakutshanje, iibursaries, iilearnerships\n🎯 **Ukufikelela okuKhawulezayo** - Tsiba kuyo nayiphi na icandelo ngokukhawuleza\n📢 **Uhlaziyo lwaKutshanje** - Iindaba nezaziso\n🌟 **AmaBali eMpumelelo** - Khuthazeka\n💡 **ISikhokelo sokuQala** - Ungutsha apha? Qala apha!\n\n**Uya Kuphi:**\n• **Ufuna inkxaso-mali?** → Iphepha leeBursaries\n• **Ufuna ukufunda usasebenza?** → Iphepha leeLearnerships\n• **Ufuna umsebenzi?** → Amaphepha amaThuba kunye neMisebenzi\n• **Wakha i-CV?** → I-Resume Builder\n• **Qala ishishini?** → Inkxaso-mali yeShishini\n• **Ufuna ukufunda?** → Isiseko soLwazi kunye neZiganeko\n\n**Iingcebiso ezilungileyo:**\n✅ Yenza i-akhawunti ukugcina amathuba\n✅ Khangela kwakhona mihla le ngokuthumela okutsha\n✅ Gcwalisa iprofayile yakho ukuze ufumane ukuthelekiswa okwenzelwe wena\n✅ Sebenzisa incoko (ndingomnye!) nangaliphi na ixesha ufuna uncedo\n\n**Ulwimi:** Tshintsha phakathi kwesiNgesi nesiXhosa usebenzisa iqhosha kwimenyu ephezulu!\n\nUngathanda ukuphonononga ntoni namhlanje?"
      }
    },
    opportunities: {
      en: {
        keywords: ['opportunities', 'opportunity page', 'what opportunities'],
        answer: "This is the Opportunities page where you can discover various career and development opportunities including:\n• Job openings\n• Internships\n• Volunteer positions\n• Training programs\n\nBrowse through the listings and click on any opportunity for more details!"
      },
      xh: {
        keywords: ['amathuba', 'iphepha lamathuba', 'ngamathuba'],
        answer: "Eli liphepha lamaThuba apho unokufumanisa khona amathuba ahlukeneyo omsebenzi nophuhliso kuquka:\n• Izithuba zemisebenzi\n• Ii-internships\n• Izikhundla zamavolontiya\n• Iinkqubo zoqeqesho\n\nKhangela uluhlu kwaye ucofe nakuwuphi na ithuba ukuze ufumane iinkcukacha ezingakumbi!"
      }
    },
    bursaries: {
      en: {
        keywords: ['bursaries', 'bursary page', 'financial aid', 'scholarships'],
        answer: "Welcome to the Bursaries page! Here you can find financial assistance for your education:\n• View available bursaries\n• Check eligibility requirements\n• Learn about application processes\n• Find deadlines and important dates\n\nScroll through to find bursaries that match your field of study!"
      },
      xh: {
        keywords: ['iibursary', 'iphepha leebursary', 'uncedo lwemali', 'iibursary zemfundo'],
        answer: "Wamkelekile kwiphepha leeBursary! Apha unokufumana uncedo lwezemali lwemfundo yakho:\n• Jonga iibursary ezikhoyo\n• Khangela iimfuno zokufaneleka\n• Funda ngeenkqubo zokufaka izicelo\n• Fumana imihla yokuvala kunye nemihla ebalulekileyo\n\nSkrila ukuze ufumane iibursary ezihambelana nenqanaba lakho lokufunda!"
      }
    },
    learnerships: {
      en: {
        keywords: ['learnerships', 'learnership page', 'training', 'skills development'],
        answer: "You're on the Learnerships page! Learnerships combine theoretical learning with practical workplace experience:\n• Browse available learnership programs\n• Learn about different industries\n• Check requirements and qualifications needed\n• Apply directly to programs\n\nLearnerships are a great way to gain skills while earning!"
      },
      xh: {
        keywords: ['iilearnerships', 'iphepha leelearnerships', 'uqeqesho', 'uphuhliso lwezakhono'],
        answer: "Usekwiphepha leeLearnerships! Iilearnerships zidibanisa ukufunda kwethiyori kunye namava asebenzayo endaweni yomsebenzi:\n• Khangela iinkqubo zeelearnerships ezikhoyo\n• Funda ngamashishini ahlukeneyo\n• Khangela iimfuno kunye neziqinisekiso ezifunekayo\n• Faka isicelo ngqo kwiinkqubo\n\nIilearnerships ziyindlela entle yokufumana izakhono ngelixa uzuza!"
      }
    },
    careers: {
      en: {
        keywords: ['careers', 'career page', 'jobs', 'employment'],
        answer: "This is the Careers section where you can:\n• Explore different career paths\n• Get career guidance and advice\n• Learn about various industries\n• Find resources for career development\n• Access job search tools\n\nTake your time to explore different career options!"
      },
      xh: {
        keywords: ['imisebenzi', 'iphepha lemisebenzi', 'umsebenzi', 'ingqesho'],
        answer: "Eli licandelo leeMisebenzi apho ungakwazi:\n• Uphonononge iindlela ezahlukeneyo zemisebenzi\n• Fumana isikhokelo kunye neengcebiso zemisebenzi\n• Funda ngamashishini ahlukeneyo\n• Fumana izixhobo zophuhliso lomsebenzi\n• Fikelela izixhobo zokukhangela umsebenzi\n\nThabatha ixesha lakho ukuphonononga ukhetho lwemisebenzi olwahlukeneyo!"
      }
    },
    'resume-builder': {
      en: {
        keywords: ['resume builder', 'cv builder', 'create resume', 'build cv'],
        answer: "Welcome to the Resume Builder! This tool helps you create a professional CV step by step:\n• Fill in your personal information\n• Add your education history\n• List your work experience\n• Highlight your skills\n• Download your completed CV\n\nFollow the form and create an impressive resume!"
      },
      xh: {
        keywords: ['resume builder', 'cv builder', 'yenza resume', 'akha cv'],
        answer: "Wamkelekile kwiResume Builder! Esi sixhobo sikunceda wenze i-CV yobuchwephesha ngokwenyathelo ngenyathelo:\n• Gcwalisa iinkcukacha zakho zobuqu\n• Yongeza imbali yakho yemfundo\n• Dwelisa amava akho omsebenzi\n• Qaqambisa izakhono zakho\n• Khuphela i-CV yakho egqityiweyo\n\nLandela ifom kwaye wenze i-resume eyothusayo!"
      }
    },
    events: {
      en: {
        keywords: ['events', 'event page', 'workshops', 'webinars'],
        answer: "You're viewing the Events page! Stay updated with:\n• Upcoming workshops and seminars\n• Webinars and online sessions\n• Career fairs and exhibitions\n• Networking events\n• Important dates and registrations\n\nCheck back regularly for new events!"
      },
      xh: {
        keywords: ['iziganeko', 'iphepha leziganeko', 'iindibano', 'iiwebinar'],
        answer: "Ujonga iphepha lezIziganeko! Hlala uhlaziyiwe nge:\n• Iindibano zeeworkshop kunye neeseminar ezizayo\n• Iiwebinar kunye neeseshoni ze-intanethi\n• Iifeyari zemisebenzi kunye nemiboniso\n• Iziganeko zothungelwano\n• Imihla ebalulekileyo kunye nobhaliso\n\nKhangela rhoqo iziganeko ezintsha!"
      }
    },
    forums: {
      en: {
        keywords: ['forums', 'forum page', 'discussions', 'community'],
        answer: "Welcome to the Forums! This is your community space to:\n• Discuss topics with other youth\n• Share experiences and advice\n• Ask questions and get answers\n• Connect with peers\n• Learn from others' experiences\n\nJoin the conversation and engage with the community!"
      },
      xh: {
        keywords: ['iiforum', 'iphepha leeforum', 'iingxoxo', 'uluntu'],
        answer: "Wamkelekile kwiiForums! Esi sisithuba sakho soluntu:\n• Xoxa ngezihloko nabanye abatsha\n• Wabelane ngamava neengcebiso\n• Buza imibuzo kwaye ufumane iimpendulo\n• Qhagamshela noontanga\n• Funda kumava wabanye\n\nNgenela incoko kwaye uzibandakanye noluntu!"
      }
    },
    'business-funding': {
      en: {
        keywords: ['business funding', 'startup funding', 'entrepreneur', 'business grants'],
        answer: "This is the Business Funding page for aspiring entrepreneurs! Find:\n• Startup funding opportunities\n• Business grants and loans\n• Investment programs\n• Requirements for funding applications\n• Resources for business planning\n\nExplore funding options to start or grow your business!"
      },
      xh: {
        keywords: ['inkxaso-mali yeshishini', 'inkxaso-mali yokuqalisa', 'usomashishini', 'izibonelelo zeshishini'],
        answer: "Eli liphepha leNkxaso-mali yeShishini loosomashishini abanethemba! Fumana:\n• Amathuba enkxaso-mali yokuqalisa\n• Izibonelelo zeshishini kunye neemali-mboleko\n• Iinkqubo zotyalo-mali\n• Iimfuno zezicelo zenkxaso-mali\n• Izixhobo zokucwangcisa ishishini\n\nPhonononga ukhetho lwenkxaso-mali ukuqalisa okanye ukukhulisa ishishini lakho!"
      }
    },
    'knowledge-base': {
      en: {
        keywords: ['knowledge base', 'resources', 'guides', 'information'],
        answer: "You're in the Knowledge Base! Access helpful resources including:\n• How-to guides\n• FAQs (Frequently Asked Questions)\n• Educational articles\n• Tips and best practices\n• Downloadable resources\n\nSearch or browse to find the information you need!"
      },
      xh: {
        keywords: ['isiseko solwazi', 'izixhobo', 'izikhokelo', 'ulwazi'],
        answer: "Usekwiisiseko soLwazi! Fikelela kwizixhobo eziluncedo eziquka:\n• Izikhokelo zendlela yokwenza\n• Imibuzo eBuzwa Rhoqo\n• Amanqaku emfundo\n• Iingcebiso kunye neendlela ezilungileyo\n• Izixhobo ezikhutshelwayo\n\nKhangela okanye ukhangele ukufumana ulwazi oludingayo!"
      }
    },
    'success-stories': {
      en: {
        keywords: ['success stories', 'testimonials', 'inspiration', 'stories'],
        answer: "Welcome to Success Stories! Read inspiring stories from:\n• Youth who found opportunities through the portal\n• Career success journeys\n• Educational achievements\n• Entrepreneurship wins\n\nGet motivated by real success stories from people like you!"
      },
      xh: {
        keywords: ['amabali empumelelo', 'ubungqina', 'inkuthazo', 'amabali'],
        answer: "Wamkelekile kumaBali eMpumelelo! Funda amabali akhuthazayo avela:\n• Ulutsha olufumene amathuba ngeportal\n• Uhambo lwempumelelo yomsebenzi\n• Impumelelo yezemfundo\n• Uloyiso lwezoshishino\n\nKhuthazwa ngamabali empumelelo okwenene avela kubantu abafana nawe!"
      }
    },
    profile: {
      en: {
        keywords: ['profile', 'my profile', 'account', 'settings'],
        answer: "This is your Profile page where you can:\n• View and edit your personal information\n• Update your skills and experience\n• Manage your applications\n• Track your progress\n• Adjust your preferences\n\nKeep your profile updated for the best experience!"
      },
      xh: {
        keywords: ['iprofayile', 'iprofayile yam', 'i-akhawunti', 'iisetingi'],
        answer: "Eli liphepha lakho leProfayile apho ungakwazi:\n• Jonga kwaye uhlele iinkcukacha zakho zobuqu\n• Hlaziya izakhono kunye namava akho\n• Lawula izicelo zakho\n• Landela inkqubela yakho\n• Lungisa izinto ozikhethayo\n\nGcina iprofayile yakho ihlaziyiwe ukuze ufumane amava angcono!"
      }
    },
    login: {
      en: {
        keywords: ['login', 'sign in', 'log in'],
        answer: "This is the Login page. Enter your credentials to access your account and unlock all features:\n• Save your progress\n• Apply to opportunities\n• Track applications\n• Access personalized content\n\nDon't have an account? Click 'Register' to create one!"
      },
      xh: {
        keywords: ['ngena', 'login', 'sign in'],
        answer: "Eli liphepha lokuNgena. Ngenisa iinkcukacha zakho zokungena ukuze ufikelele kwi-akhawunti yakho kwaye uvule zonke izinto:\n• Gcina inkqubela yakho\n• Faka isicelo kumathuba\n• Landela izicelo\n• Fikelela kumxholo owenzelwe wena\n\nAkunayo i-akhawunti? Cofa 'Bhalisa' ukwenza enye!"
      }
    },
    register: {
      en: {
        keywords: ['register', 'sign up', 'create account'],
        answer: "Welcome to the Registration page! Create your account to:\n• Access all portal features\n• Save opportunities and applications\n• Build your profile\n• Receive personalized recommendations\n\nFill in the form to get started on your journey!"
      },
      xh: {
        keywords: ['bhalisa', 'register', 'yenza i-akhawunti'],
        answer: "Wamkelekile kwiphepha loBhaliso! Yenza i-akhawunti yakho ukuze:\n• Ufikelele kuzo zonke iimpawu zeportal\n• Gcina amathuba kunye nezicelo\n• Akha iprofayile yakho\n• Ufumane iingcebiso ezenzelwe wena\n\nGcwalisa ifom ukuze uqalise uhambo lwakho!"
      }
    }
  },

  // Personalized & Contextual Questions
  personalized: {
    en: [
      {
        keywords: ['engineering student', 'mthatha', 'bursary', '20', 'year old'],
        answer: "🎓 **Welcome Engineering Student from Mthatha!**\n\nGreat to hear you're looking for funding! As an engineering student, here's your path:\n\n**Bursaries for Engineers:**\n• NSFAS - Top choice for full coverage\n• Eskom Bursary - Specifically for engineering\n• Sasol - Energy sector support\n• Anglo American - Mining/engineering\n• ABET - Construction engineering\n• BAE Systems\n• Deloitte\n\n**Action Steps:**\n1. Visit our **Bursaries page** to explore all options\n2. Check eligibility for each (most need 70%+ average)\n3. Gather documents: ID, academic records, income proof\n4. Apply to 5-10 bursaries (don't put all eggs in one basket)\n5. Follow up regularly\n\n**Engineering-Specific Tips:**\n✅ Highlight any science/math achievements\n✅ Show passion for engineering\n✅ Mention any projects or design competitions\n✅ List computer skills (AutoCAD, programming, etc.)\n\n**Nearby Opportunities in Mthatha:**\n• Contact Eastern Cape Youth Development Agency (EYDA)\n• Check with Mthatha General Hospital (technical programs)\n• Local municipalities offer bursaries\n\nDon't give up - there's funding available! 💪"
      },
      {
        keywords: ['nsfas', 'don\'t know', 'what to do', 'apply'],
        answer: "🏛️ **Quick Guide to NSFAS:**\n\nNFSAS (National Student Financial Aid Scheme) is SA's government bursary program.\n\n**Step-by-Step:**\n\n1. **Go to www.nsfas.org.za**\n2. **Click 'Apply Now'**\n3. **Create account** with your email and cellphone\n4. **Fill application form** - Basic info, study plans, family income\n5. **Upload documents:**\n   • ID copy (yours & parents)\n   • Latest school/college results\n   • Proof of income (payslip, SASSA grant)\n   • Acceptance letter from university/college\n6. **Submit** (keep your reference number!)\n\n**Timeline:**\n• Applications open: July-December\n• Processing: Takes 6-8 weeks\n• Results: December onwards\n\n**Pro Tips:**\n✅ Apply before August for better chances\n✅ Accuracy matters - double-check all info\n✅ Answer income questions honestly\n✅ Keep copies of everything\n✅ Check your email regularly for updates\n\n**Worried?**\n• NSFAS prioritizes applicants with SASSA grants\n• If family income under R350k, chances are good\n• Your academic records matter - aim for 60%+\n\n**Still struggling?** Call NSFAS: 0800 067 327 (toll-free)"
      },
      {
        keywords: ['saved bursary', 'remind', 'closing', 'deadline'],
        answer: "⏰ **Reminder Feature - Coming Soon!**\n\nWhile we're adding a full reminder system, here's what you can do NOW:\n\n**Save Bursaries You Like:**\n• Visit our **Bursaries page**\n• Click 'Save' on bursaries you're interested in\n• These appear in your **Profile** under 'Saved Opportunities'\n\n**Create Your Own Reminders:**\n• Write down deadlines in your phone calendar\n• Add alerts 2 weeks before deadline\n• Add another alert 1 week before\n\n**Our Upcoming Feature:**\n📲 We're building email reminders!\n• You'll get alerts 2 weeks before deadline\n• And again 3 days before\n• Personalized to YOUR saved opportunities\n\n**In the meantime:**\n✅ Check your Saved Opportunities weekly\n✅ Set phone reminders for each deadline\n✅ Join our Forums - members post reminders!\n✅ Subscribe to notifications (enable in Settings)\n\n**Hot Tip:** Most bursaries close in August-September. Mark those NOW! 🎯"
      },
      {
        keywords: ['last time', 'what did we discuss', 'previous', 'remember'],
        answer: "🧠 **Your Conversation History:**\n\nRight now, I can see our current chat, but I don't have access to previous conversations.\n\n**To Remember Important Stuff:**\n\n📝 **Create Your Profile & Save Progress:**\n• Log into your account (or create one)\n• Visit **My Profile**\n• Add your details, goals, opportunities you're interested in\n• Save bursaries and jobs\n• Take notes\n\n🔖 **Save Opportunities:**\n• Found a bursary you like? Click 'Save'\n• Found a job? Click 'Save'\n• They appear in your **Saved Opportunities** anytime\n\n💬 **Use Forums:**\n• Post your situation in our **Forums**\n• Community members will help and remember\n• Start a thread about your journey\n\n**What We Discussed:**\nIf you tell me your situation again, I can help! For example:\n- \"I'm looking for engineering bursaries\"\n- \"I need help with my CV\"\n- \"Where can I find internships?\"\n\n**Coming Soon:** Personal assistant features where I'll remember you better! 🚀"
      },
      {
        keywords: ['stressed', 'worried', 'exams', 'afford university', 'anxiety'],
        answer: "🤝 **You're Not Alone - We've Got You!**\n\nFeeling stressed about exams AND money? Many students feel this way. Let's tackle both:\n\n**For Exam Stress:**\n\n✅ **Study Tips:**\n• Take 5-min breaks every 25 mins\n• Study hardest subject when freshest\n• Form study group with classmates\n• Practice past papers\n• Get 8+ hours sleep (it helps!)\n\n✅ **Mental Health:**\n• Speak to school counselor (free!)\n• Try deep breathing when stressed\n• Exercise - even 20-min walk helps\n• Eat properly, drink water\n• Talk to friends/family\n\n⚠️ **Crisis Support:**\n• Feeling very down? Call: 0800 567 567 (24/7)\n• There's always someone to listen\n\n**For Money Worries:**\n\n💰 **Immediate Funding:**\n• NSFAS - Your best bet for full coverage\n• University hardship funds - Talk to your admin office\n• University bursaries - Check with your institution\n• Department of Education provincial bursaries\n\n💼 **While Studying:**\n• Part-time work/tutoring\n• Internships (paid)\n• Gig economy (online work)\n• Learnerships\n\n**Your Action Plan:**\n1. Apply to NSFAS NOW (www.nsfas.org.za)\n2. Check your university's financial aid office\n3. Browse our Bursaries page for more options\n4. Talk to your parents about the stress\n5. Take care of your mental health\n\n**Remember:** Getting good grades helps you qualify for MORE bursaries! So studying helps both problems! 💪\n\n**Need more help?** Chat with us anytime!"
      },
      {
        keywords: ['hiv testing', 'butterworth'],
        answer: "🏥 **HIV Testing in Butterworth:**\n\n**Butterworth Hospital:**\n• Phone: 047 401 9000\n• Services: FREE HIV testing\n• Hours: Weekdays 7:30 AM - 4:00 PM\n• Walk-ins welcome\n\n**Youth-Friendly Clinics Near Butterworth:**\n• Butterworth Government Clinic (main clinic)\n• Community Health Centers\n• Mobile testing clinics (ask hospital)\n\n**What to Know:**\n✅ Testing is FREE for youth\n✅ NO parental consent needed\n✅ Results confidential\n✅ Same-day or next-day results (usually)\n✅ Counseling provided\n\n**If Positive:**\n✅ Don't panic - HIV is manageable\n✅ Free ARV treatment at clinics\n✅ Can live normal, healthy life\n✅ Immediate counseling available\n✅ Connect with support groups\n\n**Before You Go:**\n• Bring ID\n• Ask any questions\n• Counselor will explain everything\n• No judgment - they've helped many people\n\n**Emergency Numbers:**\n• AIDS Helpline: 0800 012 322\n• General: 10111\n\n**Want to Chat More About Health?**\n👉 Visit our **Medical Info Chat** for health questions in our health section!"
      },
      {
        keywords: ['never finish', 'applications', 'what am i missing', 'incomplete'],
        answer: "📝 **Why You're Not Finishing Applications (And How to Fix It!):**\n\n**Common Reasons:**\n\n1. **Missing Documents**\n   ❌ Don't have certified ID copy\n   ❌ Don't have latest academic records\n   ❌ No proof of income\n   ❌ No CV ready\n   \n   ✅ **Fix:** Create a folder with ALL documents ready BEFORE applying\n\n2. **Complex/Confusing Forms**\n   ❌ Questions are confusing\n   ❌ Too many fields\n   ❌ Don't understand what they want\n   \n   ✅ **Fix:** Read ALL instructions first. Ask for help at your school\n\n3. **Weak Motivation Letter**\n   ❌ Don't know what to write\n   ❌ Too long or too short\n   ❌ Too generic\n   \n   ✅ **Fix:** Use our tips:\n      • Show you've researched the bursary\n      • Explain why YOU specifically\n      • Show passion and commitment\n      • Keep to 1 page\n\n4. **Poor CV**\n   ❌ No CV ready\n   ❌ CV looks bad\n   ❌ Missing info\n   \n   ✅ **Fix:** Use our **Resume Builder** to create professional CV\n\n5. **Procrastination**\n   ❌ \"I'll do it tomorrow\"\n   ❌ Miss deadline\n   ❌ Rushed application (rejected)\n   \n   ✅ **Fix:** Set phone reminder 2 weeks before deadline\n\n**Your Completion Checklist:**\n\n□ Found opportunity on our **Bursaries page**\n□ Checked eligibility (can you apply?)\n□ Gathered all documents\n□ Created/updated your CV\n□ Written motivation letter (saved in document)\n□ Re-read all instructions carefully\n□ Filled application form completely\n□ Attached all required documents\n□ Proofread everything\n□ Note down reference number\n□ Keep copies (email to yourself)\n□ SUBMIT!\n\n**Pro Tips:**\n✅ Do this on a quiet day (not rushed)\n✅ Complete one application fully before moving to next\n✅ Have friend or teacher review before submitting\n✅ Save drafts!\n✅ Don't rush - quality over speed\n\n**Still Stuck?**\n• Go to **Resume Builder** - we help with CV\n• Visit **Forums** - ask community for help\n• Chat with us more\n\nYou've got this! 💪"
      },
      {
        keywords: ['failed matric', 'didn\'t pass', 'no matric', 'help', 'opportunities'],
        answer: "💪 **Not All Doors Close - You Have Options!**\n\nFailing matric doesn't mean the end. Many successful people didn't pass first time!\n\n**Immediate Options:**\n\n1. **Re-write Matric:**\n   • Re-take exams through your provincial department\n   • Many people pass second time!\n   • Free or cheap through government\n   • Can apply for adult education programs\n   • Takes 1 year\n\n2. **TVET Colleges (Technical Vocational Education):**\n   ✅ Don't need matric (some subjects enough)\n   ✅ Focus on practical skills\n   ✅ N-diplomas (equivalent to matric)\n   ✅ Learnerships while studying\n   ✅ FREE or very cheap (NSFAS covers)\n   ✅ Go straight into jobs or university!\n   \n   **Programs:**\n   • Engineering, building, electrical\n   • Business, ICT, hospitality\n   • Nursing, health services\n   • Agriculture, marine\n\n3. **Apprenticeships:**\n   ✅ Learn while earning!\n   ✅ Get paid salary\n   ✅ Gain real-world experience\n   ✅ No matric needed\n   ✅ Get certification\n\n4. **Skills Programs:**\n   • Short courses (3-6 months)\n   • Learn specific skill\n   • Get certificate\n   • Enter workforce\n\n**Funding Available:**\n💰 NSFAS covers TVET fully!\n💰 Apprenticeships are PAID\n💰 Skills programs often free\n\n**Where to Find These:**\n• Visit our **Learnerships page** - many options\n• Visit our **Opportunities page** - entry-level jobs\n• Check provincial education department\n• TVET colleges near you:\n  - Eastern Cape TVET colleges (multiple campuses)\n  - Free information sessions\n\n**Your Action Plan:**\n1. Decide: Re-write matric? Or try TVET/apprenticeship?\n2. Research programs that interest you\n3. Apply (most accept from September)\n4. Check our sites for funding\n\n**Real Talk:** Many top companies now hire TVET graduates over matric-only students because they have SKILLS!\n\n**You're Still Young** - You have time and options! 🚀"
      },
      {
        keywords: ['new opportunities', 'this month', 'what\'s new', 'this week'],
        answer: "🎯 **Fresh Opportunities This Month:**\n\n**How to Find Latest Opportunities:**\n\n📱 **Visit Our Pages Regularly:**\n• **Bursaries page** - Updated weekly\n• **Opportunities page** - New jobs daily\n• **Learnerships page** - Rolling intake\n• **Events page** - Upcoming workshops\n\n🔔 **Get Alerts:**\n• Sign up for email notifications (Settings)\n• Choose which categories interest you\n• Get alerts for new opportunities\n\n💾 **Save Opportunities:**\n• Find something good? Click 'Save'\n• Appears in your profile under 'Saved'\n• Apply whenever ready (before deadline)\n\n**Trending Right Now:**\n\n🎓 **Bursaries:**\n• Most open August-September\n• NSFAS accepting applications\n• Company bursaries (Eskom, Sasol, etc.)\n• Check our **Bursaries page**\n\n💼 **Jobs & Internships:**\n• Summer internships closing soon\n• Graduate programs starting\n• Entry-level positions\n• Check **Opportunities page**\n\n📚 **Learnerships:**\n• 12-month programs\n• Paid while learning\n• Rolling intake year-round\n• Check **Learnerships page**\n\n🎤 **Events This Month:**\n• CV workshops\n• Interview preparation\n• Networking events\n• Check **Events page**\n\n**Pro Tip:**\n✅ Set calendar alerts for:\n   • NSFAS opens: July\n   • Most bursaries close: August-September\n   • University intake: October-November\n   • New Year internships: December-January\n\n**Don't Miss Out:** Bookmark our pages and check weekly! The best opportunities go fast. ⚡\n\nWant specific help? Ask about bursaries, jobs, learnerships, or anything else!"
      },
      {
        keywords: ['hurting myself', 'thinking of hurting', 'suicide', 'depressed', 'hopeless', 'can\'t take it'],
        answer: "❤️ **PLEASE LISTEN - You're Not Alone & Help Is Available NOW**\n\n**If You're In Immediate Danger:**\n☎️ **CALL NOW:** 0800 567 567 (24/7 Suicide Crisis Line)\n☎️ **EMERGENCY:** 112 (ambulance)\n☎️ **POLICE:** 10111\n\n**Don't Wait - Call Now if:**\n• You're thinking of hurting yourself\n• You have a plan to hurt yourself\n• You can't stop thinking about death\n• You feel hopeless or trapped\n• You've attempted before\n\n---\n\n**What's Happening:**\n\nThese feelings are real, but they're NOT permanent. They feel overwhelming right now, but they WILL pass with help.\n\n✅ You're brave for saying this\n✅ Help works - people recover\n✅ You deserve to live\n✅ Your pain matters and we want to help\n\n---\n\n**Get Help Immediately:**\n\n**Crisis Lines (24/7, Free):**\n• **Suicide Crisis:** 0800 567 567\n• **AIDS Helpline:** 0800 012 322 (also mental health)\n• **Childline:** 0800 055 555\n• **Mental Health Crisis:** 086 001 8030\n\n**In Person:**\n• Your nearest clinic/hospital (emergency room)\n• School counselor (tomorrow morning)\n• Trusted adult: parent, teacher, coach, pastor\n• Hospital emergency: Mthatha General or any hospital\n\n**Tell Someone:**\n• A parent or guardian\n• Your best friend\n• A teacher you trust\n• Your school counselor\n• ANY trusted adult\n\nDon't suffer alone.\n\n---\n\n**Why This Matters:**\n\nYou're young with your whole life ahead. Bursary stress, exam anxiety, family problems - these are TEMPORARY. They feel huge now but they're not worth your life.\n\n**People Who've Been Here:**\n• Survived and thrived\n• Got bursaries\n• Passed exams\n• Found success\n• Built meaningful lives\n\nYou can too. ✨\n\n---\n\n**After Crisis Support:**\n\nOnce safe, follow up with:\n• Government clinic (free counseling)\n• Support groups\n• Ongoing therapy\n• Your school\n• Forums on our platform (peer support)\n\n**We're Here Too:**\n If you want to chat more (once safe), I'm available anytime.\n\n---\n\n**REMEMBER:** This is temporary. You matter. Your life has value. Get help NOW. 💙\n\n**CALL: 0800 567 567 NOW**"
      },
      {
        keywords: ['course', 'what course', 'what should i apply', 'course recommendation', 'which course', 'study path', 'career path'],
        answer: "🎓 **What Courses Should You Apply To?**\n\nGreat question! Let's figure out what fits you best.\n\n**To give you the best recommendations, I'd like to know:**\n\n1️⃣ **What is the highest grade or qualification you have so far?** (e.g., Grade 12, National Certificate, Diploma, or Other)\n\n2️⃣ **Which subjects or topics do you enjoy or feel strongest in?** (e.g., Math, Science, Languages, Business, Art, Tech)\n\n3️⃣ **What kind of work sounds more appealing to you?** (e.g., Working with people, Working with computers, Working with tools/hands-on, or Creative work)\n\n4️⃣ **Do you prefer a shorter course (6–12 months) or a longer one (2–4 years)?**\n\n5️⃣ **Do you need low-cost or free options, or can you pay some fees?**\n\n6️⃣ **Which town or province are you in, or where would you like to study?**\n\n**Just answer these questions one by one and I'll suggest courses that match YOUR profile!** 💡"
      }
    ],
    xh: [
      {
        keywords: ['umfundi wobugcisa', 'mthatha', 'ibursary', 'uneminyaka-20'],
        answer: "🎓 **Wamkelekile Umfundi weEngineering evela eMthatha!**\n\nKusimela ukuva ufuna uncedo lwezemali! Njengomfundi wobugcisa, nantsi indlela yakho:\n\n**Iibursary zeEngineering:**\n• I-NSFAS - Enye yezinto ezikuhle kunazo zonke\n• I-Eskom Bursary - Ngqo kwibugcisa\n• I-Sasol - Inkxaso yesektara yesighamu\n• I-Anglo American - Iinkomponi zomgwebi/ibugcisa\n• I-ABET - Ibugcisa bowakho\n• BAE Systems\n• Deloitte\n\n**Amanyathelo eSenzo:**\n1. Tyelela iphepha lethu leeBursary ukukhangela zonke iinketho\n2. Khangela ukufaneleka kwaloku nokuye (uninzi ufuna 70%+)\n3. Qokelela amaXwebhu: I-ID, iziphumo zemfundo, ubungqina bengeniso\n4. Faka isicelo kwiibursary ezi-5-10 (Ungafaki onke amazondo kwinto enye)\n5. Landela rhoqo\n\n**Iingcebiso zeEngineering:**\n✅ Bonisa naliphi na impumelelo yeZayensi/Izibalo\n✅ Bonisa intshayelelo kwibugcisa\n✅ Khulula naliphi na iprojekthi okanye iimidlalo yoQeqesho\n✅ Rhela izakhono zekhompyuter (AutoCAD, programming, njl.)\n\n**Amathuba Akufupi eMthatha:**\n• Qhagamshelana ne-Eastern Cape Youth Development Agency (EYDA)\n• Khangela kwi-Mthatha General Hospital (iinkqubo zentekhnoloji)\n• Iimunisipaliti zakusasa zibonelela iibursary\n\nUngalibali - kukhona inkxaso-mali ekhoyo! 💪"
      },
      {
        keywords: ['nsfas', 'andazi', 'njani ndiwenza', 'faka isicelo'],
        answer: "🏛️ **uMgabelo oMfutshane wokuNgena kwe-NSFAS:**\n\nI-NSFAS (National Student Financial Aid Scheme) yinkqubo yebursary yikarhulumente yeSewula Afrika.\n\n**Inyathelo-inyathelo:**\n\n1. **Yiya ku-www.nsfas.org.za**\n2. **Cofa 'Apply Now'**\n3. **Yenza i-akhawunti** ngencwadi yakho ye-imeyile nesellulowe\n4. **Gcwalisa ifom yesicelo** - Ulwazi olwaneleyo, iinkqubo zokufunda, inkela yumzi\n5. **Ngenisa amaXwebhu:**\n   • Ikopi ye-ID (yakho kunye nabazali)\n   • Iziphumo zemfundo zamva nje/zeKholeji\n   • Ubungqina bengeniso (isalari, i-SASSA grant)\n   • Ileta yokuqinisekiso evela kwiYunivesithi/Ikholeji\n6. **Ngenisa** (Gcina inombolo yakho yereferensi!)\n\n**Ixesha:**\n• Izicelo zivulwa: Junaja-Nzulanyana\n• Ulungelelwaniso: Kumashwebosha ama-6-8\n• Iziphumo: Nzulanyana kunye nenxalenye\n\n**Iingcebiso Ezikuhle:\nngani**\n✅ Faka isicelo ngaphambi kuka-Agasti uphumo oluthandekayo\n✅ Ukuchula kuyabaluleka - Khangela konke kwakho\n✅ Phendula imibuzo yengeniso ngothembile\n✅ Gcina iikopi zazo zonke\n✅ Khangela i-imeyile sakho rhoqo uphumo\n\n**Ukoyikwa?**\n• I-NSFAS iphakamisa abanikezi be-SASSA grant\n• Ukuba inkela yumzi ingaphantsi kwe-R350k, amathuba asemahle\n• Iziphumo zakho zemfundo ibalulekile - Zama ukufumana 60%+ ingaphezu\n\n**Ukwanele ukhutshwa?** Biza i-NSFAS: 0800 067 327 (inombolo engakhokhwayo)"
      },
      {
        keywords: ['course', 'yiphi na icourse', 'ngubani ecourseini', 'icourse ethi', 'iindlela zokufunda'],
        answer: "🎓 **Yiphi iCourse Okufaka Isicelo?**\n\nYe gcinileyo! Masizobuze imibuzo ethile malunga nokufumaneka kwakho.\n\n**Ukuze ndikuze ndikuphakamisele iingcebiso ezilungileyo, ndingamfuna ukuba:**\n\n1️⃣ **Yiphakamiso elaphezulu okanye isiqinisekiso osifumene kade?** (umzekelo: Imathriculation, National Certificate, Diploma, okanye Enye)\n\n2️⃣ **Yiziphi izifundo okanye izihloko oziyithandayo okanye ozisisikhusela kakhulu?** (umzekelo: Izibalo, iSayensi, iilwimi, iBusiness, iArt, iThekhnoloji)\n\n3️⃣ **Yiphi into yomsebenzi ekanokuba linempumelelo kwakho?** (umzekelo: Ukushela nabantu, Ukushela nekhompyuter, Ukushela ngezithutha/uxwebhu, okanye umsebenzeli onjenje)\n\n4️⃣ **Ingaba ufuna icourse emfutshane (iinyanga ezi-6–12) okanye enyo ende (iminyaka emi-2–4)?**\n\n5️⃣ **Ingaba ufuna iinketho ezintalanga okanye zakubhalelwe mahala, okanye unakho imali yokubhala?**\n\n6️⃣ **Usekuphi ecityin okanye eprovincini, okanye uphi apho ungathanda ukufunda?**\n\n**Phendula imibuzo imi kuqala kwaye ndiza kukuphakamisa iicourse ezifanayo neprofile yakho!** 💡"
      }
    ]
  },

  // Bursaries and Funding
  funding: {
    en: [
      {
        keywords: ['bursary', 'bursaries', 'scholarship', 'financial aid', 'funding', 'study funding'],
        answer: "💰 **Bursaries & Financial Aid:**\n\nBursaries are grants that help fund your education. They cover:\n• Tuition fees\n• Accommodation\n• Textbooks and study materials\n• Living expenses (sometimes)\n\n**Types of Bursaries:**\n🎓 Full bursaries - Cover everything\n📚 Partial bursaries - Cover some costs\n💼 Company bursaries - Often require you to work for them after\n🏛️ Government bursaries - NSFAS, provincial bursaries\n\n**Visit our Bursaries page** to browse available opportunities!\n\n**Important:** Start looking early - applications open months before academic year!"
      },
      {
        keywords: ['bursary apply', 'how apply bursary', 'bursary application', 'apply for bursary'],
        answer: "📝 **How to Apply for a Bursary:**\n\n**Step 1: Research**\n• Visit our Bursaries page\n• Check eligibility requirements\n• Note closing dates\n\n**Step 2: Gather Documents**\n• Certified ID copy\n• Latest academic results\n• Proof of income (parents/guardians)\n• CV\n• Motivation letter\n• Proof of residence\n\n**Step 3: Application**\n• Complete application form carefully\n• Attach all required documents\n• Write strong motivation letter\n• Submit before deadline\n\n**Step 4: Follow Up**\n• Keep confirmation/reference number\n• Check email regularly\n• Respond quickly to requests\n\n**Top Tips:**\n✅ Apply to multiple bursaries\n✅ Start early\n✅ Check requirements carefully\n✅ Keep copies of everything"
      },
      {
        keywords: ['bursary requirements', 'bursary eligibility', 'who qualify bursary', 'bursary criteria'],
        answer: "✅ **Bursary Requirements (Typical):**\n\n**Academic:**\n• Minimum 60-70% average (varies)\n• Specific subjects passed\n• Consistent academic record\n\n**Financial:**\n• Family income below R350,000 - R600,000 per year (varies)\n• Proof of financial need\n\n**Other Criteria:**\n• South African citizen/permanent resident\n• Accepted at accredited university/college\n• Studying specific field (engineering, teaching, etc.)\n• Age requirements (usually under 25-30)\n\n**Special Bursaries For:**\n• People with disabilities\n• Students from rural areas\n• Women in STEM\n• Orphans\n\n⚠️ Requirements differ per bursary - always read carefully!\n\n**Check our Bursaries page** for specific opportunities."
      },
      {
        keywords: ['nsfas', 'national student financial aid', 'government bursary'],
        answer: "🏛️ **NSFAS (National Student Financial Aid Scheme):**\n\n**What it covers:**\n• Full tuition fees\n• Accommodation\n• Transport allowance\n• Books and living expenses\n\n**Who qualifies:**\n• SA citizen\n• Family income under R350,000/year\n• SASSA grant recipients automatically qualify\n• Studying at public university/TVET college\n• Passed grade 12 (or equivalent)\n\n**How to apply:**\n1. Create account on www.nsfas.org.za\n2. Complete online application\n3. Upload supporting documents\n4. Submit before closing date (usually Sept-Dec)\n\n**Documents needed:**\n• ID copies (yours and parents)\n• Proof of income\n• Academic records\n\n**Important:** NSFAS is a bursary (not loan) if you pass your courses!"
      },
      {
        keywords: ['business funding', 'startup funding', 'entrepreneur', 'business grants', 'business loan'],
        answer: "🏢 **Business Funding for Youth:**\n\n**Types of Funding:**\n\n1. **Grants** (Don't pay back)\n• National Youth Development Agency (NYDA)\n• Small Enterprise Development Agency (SEDA)\n• Provincial youth funds\n\n2. **Loans** (Pay back with interest)\n• NYDA loans (low interest)\n• Micro-lenders\n• Bank loans\n\n3. **Incubators/Accelerators**\n• Training + funding + mentorship\n\n**Who can apply:**\n• Age 18-35 (usually)\n• SA citizen\n• Registered business (or ready to register)\n• Viable business plan\n\n**What you need:**\n📋 Business plan (essential!)\n💡 Clear business idea\n💰 Proof of some own contribution\n📊 Market research\n📄 Financial projections\n\n**Funding amounts:**\n• R1,000 - R100,000 (youth grants)\n• R100,000 - R1 million (loans)\n\n**Visit our Business Funding page** for opportunities!"
      },
      {
        keywords: ['how get funding business', 'startup money', 'business loan apply'],
        answer: "💼 **How to Get Business Funding:**\n\n**Step 1: Prepare Your Business**\n• Register your business\n• Get tax number\n• Open business bank account\n\n**Step 2: Create Business Plan**\nMust include:\n• Executive summary\n• Business description\n• Market analysis\n• Products/services\n• Marketing strategy\n• Financial projections (3-5 years)\n• Management structure\n\n**Step 3: Research Funders**\n• Visit our Business Funding page\n• Check eligibility\n• Choose suitable programs\n\n**Step 4: Apply**\n• Complete application forms\n• Attach business plan\n• Provide financial statements\n• Submit supporting documents\n\n**Step 5: Pitch/Interview**\n• Be prepared to present your business\n• Know your numbers\n• Show passion and commitment\n\n**Success Tips:**\n✅ Be realistic with projections\n✅ Show you've invested own money\n✅ Demonstrate market research\n✅ Have backup plan\n✅ Be patient - process takes time"
      }
    ],
    xh: [
      {
        keywords: ['ibursary', 'iibursary', 'isibonelelo', 'uncedo lwezemali', 'inkxaso-mali', 'inkxaso-mali yokufunda'],
        answer: "💰 **Iibursary kunye noNcedo lwezemali:**\n\nIibursary zizibonelelo ezinceda ukuxhasa imfundo yakho. Zigubungela:\n• Imirhumo yokufunda\n• Indawo yokuhlala\n• Iincwadi kunye nezixhobo zokufunda\n• Iindleko zokuphila (ngamanye amaxesha)\n\n**Iintlobo zeeBursary:**\n🎓 Iibursary ezipheleleyo - Zigubungela yonke into\n📚 Iibursary eziyinxalenye - Zigubungela ezinye iindleko\n💼 Iibursary zeenkampani - Zihlala zifuna ukuba usebenzele kuzo emva koko\n🏛️ Iibursary zikarhulumente - I-NSFAS, iibursary zephondo\n\n**Tyelela iphepha lethu leeBursary** ukukhangela amathuba akhoyo!\n\n**Okubalulekileyo:** Qala ukukhangela kwangoko - izicelo zivulwa kwiinyanga ngaphambi konyaka wezemfundo!"
      },
      {
        keywords: ['faka isicelo bursary', 'ndifaka njani isicelo bursary', 'isicelo sebursary', 'faka isicelo sebursary'],
        answer: "📝 **Indlela yokuFaka iSicelo seBursary:**\n\n**Inyathelo 1: Uphando**\n• Tyelela iphepha lethu leeBursary\n• Khangela iimfuno zokufaneleka\n• Phawula imihla yokuvala\n\n**Inyathelo 2: Qokelela amaXwebhu**\n• Ikopi ye-ID eqinisekisiweyo\n• Iziphumo zemfundo zamva nje\n• Ubungqina bengeniso (abazali/abagcini)\n• I-CV\n• Ileta yenkuthazo\n• Ubungqina bendawo yokuhlala\n\n**Inyathelo 3: ISicelo**\n• Gcwalisa ifom yesicelo ngononophelo\n• Qhom onke amaxwebhu afunekayo\n• Bhala ileta yenkuthazo enamandla\n• Ngenisa ngaphambi komhla wokuvala\n\n**Inyathelo 4: Landela**\n• Gcina inombolo yokuqinisekisa/yereferensi\n• Khangela i-imeyile rhoqo\n• Phendula ngokukhawuleza kwizicelo\n\n**Iingcebiso eziphezulu:**\n✅ Faka isicelo kwiibursary ezininzi\n✅ Qala kwangoko\n✅ Khangela iimfuno ngononophelo\n✅ Gcina iikopi zazo zonke izinto"
      },
      {
        keywords: ['iimfuno zebursary', 'ukufaneleka bursary', 'ngubani ofanelekela bursary', 'iikhrayitheriya zebursary'],
        answer: "✅ **Iimfuno zeeBursary (Eziqhelekileyo):**\n\n**Zemfundo:**\n• Umndilili omncinci 60-70% (uyahluka)\n• Izifundo ezithile ziphumelele\n• Irekhodi yezemfundo engaguqukiyo\n\n**Yezemali:**\n• Ingeniso yosapho ingaphantsi kwe-R350,000 - R600,000 ngonyaka (iyahluka)\n• Ubungqina bemfuneko yezemali\n\n**Ezinye iiKhrayitheriya:**\n• Ummi woMzantsi Afrika/umhlali osisigxina\n• Wamkelwe kwidyunivesithi/ikoleji eqinisekisiweyo\n• Ufunda inqanaba elithile (ubunjineli, ukufundisa, njl.)\n• Iimfuno zeminyaka (ngokuqhelekileyo ngaphantsi kwe-25-30)\n\n**Iibursary eziKhethekileyo:**\n• Abantu abakhubazekileyo\n• Abafundi abavela kwiindawo zasemaphandleni\n• Abafazi kwi-STEM\n• Iinkedama\n\n⚠️ Iimfuno zahluka ngokwebursary - soloko ufunda ngononophelo!\n\n**Khangela iphepha lethu leeBursary** ngamathuba athile."
      },
      {
        keywords: ['nsfas', 'uncedo lwezemali lwabafundi besikhigo', 'ibursary karhulumente'],
        answer: "🏛️ **I-NSFAS (National Student Financial Aid Scheme):**\n\n**Igubungela ntoni:**\n• Imirhumo yokufa pheleleyo\n• Indawo yokuhlala\n• Isabelo sendlela\n• Iincwadi neendleko zokuphila\n\n**Ngubani ofanelekayo:**\n• Ummi woMzantsi Afrika\n• Ingeniso yosapho ingaphantsi kwe-R350,000/ngonyaka\n• Abafumani isibonelelo se-SASSA bafaneleka ngokuzenzekelayo\n• Ufunda kwidyunivesithi yoluntu/ikoleji ye-TVET\n• Uphumelele ibanga le-12 (okanye okulingana)\n\n**Indlela yokufaka isicelo:**\n1. Yenza i-akhawunti ku-www.nsfas.org.za\n2. Gcwalisa isicelo se-intanethi\n3. Layisha amaxwebhu axhasayo\n4. Ngenisa ngaphambi komhla wokuvala (ngokuqhelekileyo Sept-Dec)\n\n**Amaxwebhu afunekayo:**\n• Iikopi ze-ID (eyakho kunye neabazali)\n• Ubungqina bengeniso\n• Iirekhodi zemfundo\n\n**Okubalulekileyo:** I-NSFAS yibursary (ayiyomali-mboleko) ukuba uphumelela izifundo zakho!"
      },
      {
        keywords: ['inkxaso-mali yeshishini', 'inkxaso-mali yokuqalisa', 'usomashishini', 'izibonelelo zeshishini', 'imali-mboleko yeshishini'],
        answer: "🏢 **Inkxaso-mali yeShishini kuluTsha:**\n\n**Iintlobo zeNkxaso-mali:**\n\n1. **Izibonelelo** (Awuhlawuli)\n• I-National Youth Development Agency (NYDA)\n• I-Small Enterprise Development Agency (SEDA)\n• Iingxowa-mali zolutsha zephondo\n\n2. **Iimali-mboleko** (Uhlawula kunye nenzala)\n• Iimali-mboleko ze-NYDA (inzala ephantsi)\n• Abaholisi abancinci\n• Iimali-mboleko zebhanki\n\n3. **Ii-Incubators/Accelerators**\n• Uqeqesho + inkxaso-mali + ubulungiseleli\n\n**Ngubani onokufaka isicelo:**\n• Iminyaka 18-35 (ngokuqhelekileyo)\n• Ummi woMzantsi Afrika\n• Ishishini elibhalisiweyo (okanye lilungele ukubhalisa)\n• Isicwangciso seshishini esinokwenzeka\n\n**Ufuna ntoni:**\n📋 Isicwangciso seshishini (sibalulekile!)\n💡 Ingcinga yeshishini ecacileyo\n💰 Ubungqina bokuba ugalelo lwakho\n📊 Uphando lwemarike\n📄 Uqikelelo lwezemali\n\n**Izixa zenkxaso-mali:**\n• R1,000 - R100,000 (izibonelelo zolutsha)\n• R100,000 - R1 million (iimali-mboleko)\n\n**Tyelela iphepha lethu leNkxaso-mali yeShishini** ngamathuba!"
      }
    ]
  },

  // Jobs and Applications
  employment: {
    en: [
      {
        keywords: ['job', 'work', 'employment', 'find job', 'looking for job', 'get job'],
        answer: "💼 **Finding Jobs:**\n\n**Where to look:**\n• **Our portal**: Opportunities page\n• Job websites: PNet, Indeed, CareerJunction\n• Company websites (careers section)\n• LinkedIn\n• Newspapers\n• Recruitment agencies\n• Walk-ins (hand deliver CV)\n\n**Job Types:**\n📋 Permanent - Full-time, long-term\n⏰ Contract - Fixed period (6 months, 1 year)\n💡 Internship - Training position\n🎓 Learnership - Study + work\n👔 Part-time - Few hours/days per week\n🏠 Remote/Work from home\n\n**Tips:**\n✅ Check our Opportunities & Careers pages daily\n✅ Set up job alerts\n✅ Network (tell people you're looking)\n✅ Update CV regularly\n✅ Apply to many positions\n✅ Don't give up!"
      },
      {
        keywords: ['apply job', 'how apply', 'job application', 'apply online', 'submit application'],
        answer: "📝 **How to Apply for Jobs:**\n\n**Step 1: Read Job Ad Carefully**\n• Check you meet requirements\n• Note closing date\n• Understand the role\n• Research the company\n\n**Step 2: Prepare Documents**\n• Update CV (tailor to job)\n• Write cover letter\n• Get certified copies (ID, qualifications)\n• Prepare references\n\n**Step 3: Complete Application**\n• Fill all required fields\n• Attach correct documents\n• Double-check spelling\n• Use professional email address\n\n**Step 4: Submit**\n• Before closing date\n• Keep confirmation/proof\n• Note reference number\n\n**Step 5: Follow Up**\n• Wait 1-2 weeks\n• Send polite email/call\n• Be patient\n\n**Top Mistakes to Avoid:**\n❌ Generic CV and cover letter\n❌ Spelling/grammar errors\n❌ Missing documents\n❌ Late application\n❌ Inappropriate email address (use professional one!)\n❌ Not following instructions"
      },
      {
        keywords: ['interview tips', 'job interview', 'interview preparation', 'prepare interview'],
        answer: "🎯 **Job Interview Tips:**\n\n**Before the Interview:**\n✅ Research the company thoroughly\n✅ Know the job description\n✅ Prepare answers to common questions\n✅ Plan your outfit (professional!)\n✅ Know exact location and time\n✅ Arrive 10-15 minutes early\n✅ Bring: Extra CVs, ID, certificates, notebook, pen\n\n**During the Interview:**\n✅ Greet with firm handshake\n✅ Smile and maintain eye contact\n✅ Sit up straight\n✅ Listen carefully to questions\n✅ Answer clearly and honestly\n✅ Give examples from experience\n✅ Ask thoughtful questions\n✅ Show enthusiasm\n✅ Be yourself!\n\n**Common Questions:**\n• Tell me about yourself\n• Why do you want this job?\n• What are your strengths/weaknesses?\n• Where do you see yourself in 5 years?\n• Why should we hire you?\n• Do you have questions for us?\n\n**After Interview:**\n✅ Thank them for their time\n✅ Send thank-you email within 24hrs\n✅ Wait for feedback (1-2 weeks)\n\n**What to Wear:**\n👔 Men: Neat pants, shirt, closed shoes\n👗 Women: Neat dress/skirt/pants, blouse, closed shoes\n❌ Avoid: Jeans, sneakers, too much jewelry, strong perfume"
      },
      {
        keywords: ['no experience', 'first job', 'entry level', 'never worked', 'youth job'],
        answer: "🌱 **Getting Your First Job:**\n\n**Build Experience:**\n✅ Volunteer work (shows commitment)\n✅ Internships (check our Opportunities page)\n✅ Learnerships (paid training - see our Learnerships page!)\n✅ Part-time/casual work\n✅ Freelance/side hustles\n✅ Community projects\n\n**What Employers Look For:**\n• Willingness to learn\n• Good attitude\n• Reliability\n• Basic skills (communication, computer literacy)\n• Ability to follow instructions\n\n**Skills to Highlight:**\n• School projects (teamwork, research)\n• Sports (teamwork, dedication)\n• Volunteering (responsibility)\n• Computer skills\n• Languages\n\n**Entry-Level Job Types:**\n📞 Call center agent\n🛒 Retail assistant\n📦 Warehouse work\n🍔 Hospitality (waiter, kitchen)\n🏢 Admin/receptionist\n👶 Childcare\n📚 Tutoring\n\n**Tips:**\n✅ Start with any job - gain experience\n✅ Show eagerness to learn\n✅ Be reliable and punctual\n✅ Network - tell everyone you're looking\n✅ Check our Learnerships page - perfect for beginners!"
      },
      {
        keywords: ['learnership', 'learnerships', 'what learnership', 'learnership apply'],
        answer: "📚 **Learnerships Explained:**\n\nA learnership combines:\n• Theoretical learning (classroom/online)\n• Practical workplace experience\n• Get paid while learning!\n• Recognized qualification\n\n**Benefits:**\n✅ Earn while you learn (stipend)\n✅ Gain work experience\n✅ Get recognized qualification\n✅ No upfront costs\n✅ Possible permanent job after\n\n**Duration:** Usually 12-24 months\n\n**Fields Available:**\n• Business Administration\n• Accounting\n• IT\n• Hospitality\n• Retail\n• Engineering\n• Health & Safety\n• Marketing\n• HR\n\n**Requirements:**\n• Grade 12 (usually)\n• SA citizen\n• Meet specific criteria\n• Unemployed (usually)\n• Age 18-35 (usually)\n\n**How to Apply:**\n1. Visit our **Learnerships page**\n2. Choose your field\n3. Check requirements\n4. Submit application with CV\n5. Attend assessment/interview\n\n**Perfect for:** School leavers, career changers, skill seekers!"
      },
      {
        keywords: ['internship', 'intern', 'what internship', 'internship apply'],
        answer: "💡 **Internships Explained:**\n\nInternships are temporary work placements for students/graduates to gain experience.\n\n**Types:**\n🎓 Graduate internship - After completing studies\n📚 In-service training - During studies (vacation work)\n🏢 Work-integrated learning - Part of qualification\n\n**Duration:** 3-12 months (usually)\n\n**Benefits:**\n✅ Real work experience\n✅ Learn industry skills\n✅ Build CV\n✅ Make contacts/network\n✅ Often leads to permanent job\n✅ Some are paid (stipend)\n\n**Requirements:**\n• Studying towards or completed qualification\n• Specific field of study\n• Good academic record\n• SA citizen\n\n**Where to Find:**\n• Our Opportunities page\n• University career centers\n• Company websites\n• LinkedIn\n• Government departments\n\n**Application Tips:**\n✅ Apply early (very competitive)\n✅ Tailor CV to field\n✅ Show enthusiasm\n✅ Highlight relevant coursework\n✅ Include academic transcript\n\n**Note:** Some unpaid, but experience is valuable!"
      },
      {
        keywords: ['salary', 'pay', 'wage', 'how much', 'earn', 'money'],
        answer: "💰 **Understanding Salary & Pay:**\n\n**Salary Types:**\n• **Gross Salary** - Before deductions (tax, UIF, etc.)\n• **Net Salary** - Take-home pay (after deductions)\n• **CTC** (Cost to Company) - Total cost including benefits\n\n**Payment Frequency:**\n📅 Monthly - Once per month\n📅 Bi-weekly - Every 2 weeks\n📅 Weekly - Every week\n⏰ Hourly - Per hour worked\n\n**Entry-Level Salaries** (approx):\n• Retail: R3,000 - R6,000/month\n• Call center: R4,000 - R8,000/month\n• Admin: R5,000 - R10,000/month\n• Internships: R3,000 - R6,000/month\n• Learnerships: R2,500 - R5,000/month\n\n**Negotiating Salary:**\n✅ Research industry standards\n✅ Know your worth\n✅ Be realistic (especially first job)\n✅ Consider benefits (medical aid, pension)\n✅ Don't accept/reject immediately - ask for time\n\n**Benefits to Consider:**\n• Medical aid\n• Pension/Provident fund\n• Transport allowance\n• Performance bonuses\n• Study opportunities\n• Leave days\n\n⚠️ **Red Flag:** Job asking YOU to pay money - likely scam!"
      },
      {
        keywords: ['work rights', 'employee rights', 'labor rights', 'contract', 'employment contract'],
        answer: "⚖️ **Your Work Rights (South Africa):**\n\n**Employment Contract:**\n✅ Must be in writing\n✅ Must include: job title, duties, salary, working hours, leave, notice period\n✅ Read carefully before signing!\n✅ Keep a copy\n\n**Your Rights:**\n✅ Fair pay (at/above minimum wage)\n✅ Safe working environment\n✅ Leave: 21 days annual, sick leave, maternity leave\n✅ No unfair discrimination\n✅ Join a union\n✅ UIF registration (unemployment insurance)\n\n**Working Hours:**\n• Maximum 45 hours per week (usually)\n• Overtime must be paid extra\n• Rest breaks required\n\n**Probation Period:**\n• Usually 3-6 months\n• Employer assesses your performance\n• Easier to terminate during probation\n\n**Notice Period:**\n• 1 week (under 6 months employment)\n• 2 weeks (6 months - 1 year)\n• 4 weeks (over 1 year)\n\n**If You Have Problems:**\n• Talk to HR/manager first\n• Keep records/evidence\n• Contact CCMA (Commission for Conciliation, Mediation & Arbitration)\n• Seek advice from Department of Labour\n\n⚠️ **Scam Warning:** Real jobs don't ask for payment!"
      }
    ],
    xh: [
      {
        keywords: ['umsebenzi', 'ingqesho', 'fumana umsebenzi', 'ndikhangela umsebenzi', 'ndifuna umsebenzi'],
        answer: "💼 **Ukufumana iMisebenzi:**\n\n**Apho unokukhangela:**\n• **Iportal yethu**: Iphepha lamaThuba\n• Iiwebhusayithi zemisebenzi: PNet, Indeed, CareerJunction\n• Iiwebhusayithi zeenkampani (icandelo lemisebenzi)\n• LinkedIn\n• Amaphephandaba\n• Ii-arhente zokuqesha\n• Hamba uyongenisa i-CV\n\n**Iintlobo zeMisebenzi:**\n📋 Isisigxina - Ixesha elipheleleyo, ixesha elide\n⏰ Ikhontrakthi - Ixesha elimisiweyo (iinyanga ezi-6, unyaka o-1)\n💡 I-Internship - Isikhundla soqeqesho\n🎓 I-Learnership - Funda + sebenza\n👔 Ixesha elithile - Iiyure ezimbalwa/iintsuku ngeveki\n🏠 Ekude/Sebenza ekhaya\n\n**Iingcebiso:**\n✅ Khangela amaphepha ethu amaThuba kunye neMisebenzi mihla le\n✅ Misela izilumkiso zemisebenzi\n✅ Network (xelela abantu ukuba uyakhangela)\n✅ Hlaziya i-CV rhoqo\n✅ Faka isicelo kwizikhundla ezininzi\n✅ Musa ukunikela!"
      },
      {
        keywords: ['faka isicelo somsebenzi', 'ndifaka njani isicelo', 'isicelo somsebenzi', 'faka isicelo kwi-intanethi'],
        answer: "📝 **Indlela yokuFaka iSicelo soMsebenzi:**\n\n**Inyathelo 1: Funda iNtengiso yoMsebenzi ngononophelo**\n• Khangela ukuba uhlangabezana neemfuno\n• Phawula umhla wokuvala\n• Qonda indima\n• Phanda ngenkampani\n\n**Inyathelo 2: Lungiselela amaXwebhu**\n• Hlaziya i-CV (yenze ifaneleke nomsebenzi)\n• Bhala ileta yokugubungela\n• Fumana iikopi eziqinisekisiweyo (ID, iziqinisekiso)\n• Lungiselela izalathiso\n\n**Inyathelo 3: Gcwalisa iSicelo**\n• Gcwalisa onke amasimi afunekayo\n• Qhomagela amaxwebhu achanekileyo\n• Khangela upelo kabini\n• Sebenzisa idilesi ye-imeyile yobuchw ephesha\n\n**Inyathelo 4: Ngenisa**\n• Ngaphambi komhla wokuvala\n• Gcina isiqinisekiso/ubungqina\n• Phawula inombolo yereferensi\n\n**Inyathelo 5: Landela**\n• Linda iiveki ezi-1-2\n• Thumela i-imeyile enembeko/ucingo\n• Yiba nomonde\n\n**Iimpazamo eziphezulu ukuze uziphepe:**\n❌ I-CV jikelele kunye neleta yokugubungela\n❌ Iimpazamo zopelo/negrama\n❌ Amaxwebhu alahlekileyo\n❌ Isicelo esifike emva kwexesha\n❌ Idilesi ye-imeyile engafanelekanga\n❌ Ukungalandeli imiyalelo"
      },
      {
        keywords: ['iingcebiso zodliwanondlebe', 'udliwano-ndlebe lomsebenzi', 'ukulungiselela udliwano-ndlebe', 'lungiselela udliwano-ndlebe'],
        answer: "🎯 **Iingcebiso zoDliwano-ndlebe loMsebenzi:**\n\n**Ngaphambi kodliwano-ndlebe:**\n✅ Phanda ngenkampani ngokucoseleleyo\n✅ Yazi inkcazo yomsebenzi\n✅ Lungiselela iimpendulo kwimibuzo eqhelekileyo\n✅ Cwangcisa isinxibo sakho (ngokwengcali!)\n✅ Yazi indawo echanekileyo nexesha\n✅ Fika kwimizuzu eyi-10-15 kwangoko\n✅ Zisa: Ii-CV ezongezelelekileyo, ID, iziqinisekiso, incwadi, ipeleni\n\n**Ngexesha lodliwano-ndlebe:**\n✅ Bulisa ngesandla esomeleleyo\n✅ Ncuma kwaye ugcine ukujonga emehlweni\n✅ Hlala uthe nkqo\n✅ Mamela imibuzo ngononophelo\n✅ Phendula ngokucacileyo nangokwenyaniso\n✅ Nika imizekelo evela kumava\n✅ Buza imibuzo ecingisisekileyo\n✅ Bonisa umdla\n✅ Yiba nguwe!\n\n**Imibuzo eqhelekileyo:**\n• Ndithethe ngawe\n• Kutheni ufuna lo msebenzi?\n• Zeziphi izinto ozintle kuzo/ezibuthathaka?\n• Uzibona phi kwiminyaka emi-5?\n• Kutheni kufuneka sikuqeshe?\n• Unemibuzo kuthi?\n\n**Emva kodliwano-ndlebe:**\n✅ Babulelemele ngexesha labo\n✅ Thumela i-imeyile yokubulela kwiiyure ezingama-24\n✅ Linda impendulo (iiveki ezi-1-2)"
      },
      {
        keywords: ['akukho mava', 'umsebenzi wokuqala', 'inqanaba lokungena', 'andikaze ndisebenze', 'umsebenzi wolutsha'],
        answer: "🌱 **Ukufumana uMsebenzi wakho wokuQala:**\n\n**Yakha aMava:**\n✅ Umsebenzi wamavolontiya (ubonisa uzibophelelo)\n✅ Ii-internships (khangela iphepha lethu lamaThuba)\n✅ Iilearnerships (uqeqesho oluhlawulelwayo - jonga iphepha lethu leeLearnerships!)\n✅ Ixesha elithile/umsebenzi wethutyana\n✅ Ukuziqeshela/imisebenzi yasecaleni\n✅ Iiprojekthi zoluntu\n\n**Abaqeshi bakhangela ntoni:**\n• Ukuzimisela ukufunda\n• Isimo sengqondo esilungileyo\n• Ukuthembeka\n• Izakhono ezisisiseko (unxibelelwano, ukufunda nokubhala ngekhompyuter)\n• Ukukwazi ukulandela imiyalelo\n\n**Iintlobo zeMisebenzi yeNqanaba lokuNgena:**\n📞 I-arhente yeziko lokufowuna\n🛒 Umncedisi wevenkile\n📦 Umsebenzi wendlu yokugcina impahla\n🍔 Ubungeni (iwebhitara, ikhitshi)\n🏢 Ulawulo/umamkeli\n👶 Ukhathalelo lwabantwana\n📚 Ukufundisa\n\n**Iingcebiso:**\n✅ Qala nanawuphi na umsebenzi - fumana amava\n✅ Bonisa umdla wokufunda\n✅ Yiba nethemba kwaye ufike ngexesha\n✅ Network - xelela wonke umntu ukuba uyakhangela\n✅ Khangela iphepha lethu leeLearnerships - ligqibelele kubaqalayo!"
      }
    ]
  },

  // Technical/Platform Questions
  platform: {
    en: [
      {
        keywords: ['use', 'navigate', 'find', 'where', 'how', 'page'],
        answer: "🧭 **How to Use the Youth Portal:**\n\n**Navigation:**\n• **Top Menu**: Access all sections\n• **Home**: Overview and featured opportunities\n• **Opportunities**: Browse all available positions\n• **Bursaries**: Financial aid for studies\n• **Learnerships**: Paid training programs\n• **Careers**: Job resources and guidance\n• **Resume Builder**: Create professional CV\n• **Events**: Workshops and webinars\n• **Forums**: Community discussions\n• **Business Funding**: Startup grants\n• **Knowledge Base**: Guides and FAQs\n• **Success Stories**: Inspiration from others\n\n**Features:**\n✅ Create profile (Login/Register)\n✅ Save opportunities\n✅ Track applications\n✅ Switch languages (EN/XH)\n✅ Chat with me anytime!\n\n**Tips:**\n💡 Check Opportunities page daily\n💡 Complete your profile for better matches\n💡 Set up alerts for new postings\n💡 Bookmark important pages"
      },
      {
        keywords: ['not working', 'error', 'problem', 'bug', 'broken', 'issue'],
        answer: "🔧 **Troubleshooting:**\n\n**Try these steps:**\n1️⃣ **Refresh** the page (Ctrl+R or Cmd+R)\n2️⃣ **Clear cache**:\n   • Chrome: Ctrl+Shift+Delete\n   • Settings → Privacy → Clear browsing data\n3️⃣ **Check internet** connection\n4️⃣ **Try different browser** (Chrome, Firefox, Edge)\n5️⃣ **Update browser** to latest version\n6️⃣ **Disable ad blockers** temporarily\n7️⃣ **Try incognito/private** mode\n\n**Still not working?**\n• Note exact error message\n• Take screenshot if possible\n• Contact support\n• Tell me what's not working - I might help!\n\n**Common Issues:**\n❌ Page won't load → Check internet\n❌ Can't login → Reset password\n❌ Form won't submit → Check all required fields\n❌ File won't upload → Check file size/format"
      },
      {
        keywords: ['account', 'register', 'sign up', 'login', 'profile', 'create account'],
        answer: "👤 **Account & Profile:**\n\n**Creating Account:**\n1. Click **'Register'** (top right)\n2. Fill in details (name, email, password)\n3. Verify email (check inbox)\n4. Complete profile\n\n**Why Create Account?**\n✅ Save favorite opportunities\n✅ Track your applications\n✅ Get personalized recommendations\n✅ Access saved CVs\n✅ Receive notifications\n✅ Build your profile\n\n**Profile Tips:**\n• Add profile photo\n• Complete all sections\n• Update regularly\n• Keep contact info current\n• Highlight skills and experience\n\n**Login Issues?**\n• Forgot password → Click 'Forgot Password'\n• Check email for reset link\n• Use correct email address\n• Check caps lock\n\n**Privacy:**\n🔒 Your data is secure\n🔒 We don't share personal info\n🔒 You control what's visible"
      },
      {
        keywords: ['app', 'mobile', 'phone', 'smartphone', 'download'],
        answer: "📱 **Mobile Access:**\n\nThe Youth Portal works on any device!\n\n**Access on Phone:**\n✅ Open your mobile browser (Chrome, Safari)\n✅ Visit the portal website\n✅ Everything works - no app needed!\n✅ Fully responsive design\n\n**Mobile Tips:**\n• Bookmark the site for quick access\n• Works on any smartphone or tablet\n• Same features as desktop\n• Chat with me on mobile too!\n\n**Add to Home Screen:**\n📱 **Android**: Menu → Add to Home Screen\n📱 **iPhone**: Share button → Add to Home Screen\n\nThis creates an app-like icon on your phone!"
      },
      {
        keywords: ['safe', 'scam', 'legitimate', 'trust', 'real', 'legit'],
        answer: "🛡️ **Safety & Avoiding Scams:**\n\n**This Portal is Safe:**\n✅ Official youth opportunity platform\n✅ We verify opportunities\n✅ Free to use - NO charges!\n✅ Secure data protection\n\n**⚠️ Warning Signs of Scams:**\n❌ Asking you to PAY for job/application\n❌ Too good to be true (\"Earn R10,000/week from home!\")\n❌ Poor grammar/spelling in ads\n❌ No company details/address\n❌ Pressure to decide immediately\n❌ Requests for bank details upfront\n❌ Interviews via WhatsApp only\n❌ \"Processing fees\" or \"registration fees\"\n\n**Stay Safe:**\n✅ Never pay for job applications\n✅ Research companies before applying\n✅ Meet in public places for interviews\n✅ Don't share bank details until hired\n✅ Trust your instincts\n✅ Verify opportunities\n✅ Report suspicious listings\n\n**Real Jobs:**\n• Have proper company details\n• Clear job descriptions\n• Professional communication\n• Reasonable requirements\n• Free application process"
      },
      {
        keywords: ['contact', 'support', 'help desk', 'email', 'phone', 'reach'],
        answer: "📞 **Contact & Support:**\n\n**Get Help:**\n💬 **Chat with me!** I'm here 24/7\n📧 **Email**: Check contact page for support email\n🏢 **Visit**: Check for physical office details\n\n**I Can Help With:**\n• Navigating the portal\n• Understanding opportunities\n• CV and application advice\n• Page-specific guidance\n• General questions\n\n**For Technical Issues:**\n• Describe the problem clearly\n• Include browser/device info\n• Screenshots help!\n• Note any error messages\n\n**Response Times:**\n• Me (chatbot): Instant! 🚀\n• Support team: 1-2 business days (usually)\n\n**Before Contacting:**\n✅ Try troubleshooting steps\n✅ Check FAQ/Knowledge Base\n✅ Ask me first - I might know!\n\n**Available:**\n⏰ Me: 24/7\n⏰ Support: Business hours (check portal)"
      }
    ],
    xh: [
      {
        keywords: ['sebenzisa', 'hamba', 'fumana', 'phi', 'njani', 'iphepha'],
        answer: "🧭 **Indlela yokuSebenzisa iYouth Portal:**\n\n**UkuHamba:**\n• **IMenuu ephezulu**: Fikelela kuzo zonke iicandelo\n• **IKhaya**: Imbonakalo kunye namathuba aqaqambisiweyo\n• **AmaThuba**: Khangela zonke izikhundla ezikhoyo\n• **Iibursaries**: Uncedo lwezemali lwezifundo\n• **Iilearnerships**: Iinkqubo zoqeqesho ezihlawulwayo\n• **Imisebenzi**: Izixhobo zomsebenzi kunye nesikhokelo\n• **I-Resume Builder**: Yenza i-CV yobuchwephesha\n• **Iziganeko**: Iindibano kunye neewebinars\n• **Iiforum**: Iingxoxo zoluntu\n• **Inkxaso-mali yeShishini**: Izibonelelo zokuqalisa\n• **Isiseko soLwazi**: Izikhokelo kunye nemibuzo eBuzwa Rhoqo\n• **AmaBali eMpumelelo**: Inkuthazo evela kwabanye\n\n**Iimpawu:**\n✅ Yenza iprofayile (Ngena/Bhalisa)\n✅ Gcina amathuba\n✅ Landela izicelo\n✅ Tshintsha iilwimi (EN/XH)\n✅ Thetha nam nangaliphi na ixesha!\n\n**Iingcebiso:**\n💡 Khangela iphepha lamaThuba mihla le\n💡 Gcwalisa iprofayile yakho ukuze ufumane ukuthelekiswa okungcono\n💡 Misela izilumkiso zokuthumela okutsha\n💡 Bookmark amaphepha abalulekileyo"
      },
      {
        keywords: ['ayisebenzi', 'imposiso', 'ingxaki', 'isiphene', 'yaphukile', 'umbandela'],
        answer: "🔧 **Ukusombulula iNgxaki:**\n\n**Zama la manyathelo:**\n1️⃣ **Hlaziya** iphepha (Ctrl+R okanye Cmd+R)\n2️⃣ **Sula i-cache**:\n   • Chrome: Ctrl+Shift+Delete\n   • Iisetingi → Ubumfihlo → Sula idatha yokukhangela\n3️⃣ **Khangela** uqhagamshelwano lwe-intanethi\n4️⃣ **Zama ibhrawuza eyahlukileyo** (Chrome, Firefox, Edge)\n5️⃣ **Hlaziya ibhrawuza** kuhlobo lwakutshanje\n6️⃣ **Khubaza abathinteli bokuphefumlela** okwethutyana\n7️⃣ **Zama** imo yobumfihlo\n\n**Isasebenzi?**\n• Phawula umyalezo wempazamo\n• Thatha umfanekiso weskrini ukuba kunokwenzeka\n• Qhagamshelana nenkxaso\n• Ndixelele ukuba yintoni engasebenziyo - ndinganceda!\n\n**Iingxaki eziqhelekileyo:**\n❌ Iphepha alilayishi → Khangela i-intanethi\n❌ Andikwazi ukungena → Setha kwakhona iphasiwedi\n❌ Ifom ayingenisi → Khangela onke amasimi afunekayo\n❌ Ifayile ayilayishi → Khangela ubungakanani/ifomathi yefayile"
      },
      {
        keywords: ['akhawunti', 'bhalisa', 'ngena', 'iprofayile', 'yenza i-akhawunti'],
        answer: "👤 **I-Akhawunti kunye neProfayile:**\n\n**UkuYenza i-Akhawunti:**\n1. Cofa **'Bhalisa'** (ekunene phezulu)\n2. Gcwalisa iinkcukacha (igama, i-imeyile, iphasiwedi)\n3. Qinisekisa i-imeyile (khangela ibhokisi yokungenisa)\n4. Gcwalisa iprofayile\n\n**Kutheni uYenza i-Akhawunti?**\n✅ Gcina amathuba athandekayo\n✅ Landela izicelo zakho\n✅ Fumana iingcebiso ezenzelwe wena\n✅ Fikelela kwii-CV ezigciniweyo\n✅ Fumana izaziso\n✅ Akha iprofayile yakho\n\n**Iingcebiso zeProfayile:**\n• Yongeza umfanekiso weprofayile\n• Gcwalisa onke amacandelo\n• Hlaziya rhoqo\n• Gcina ulwazi loqhagamshelwano lwakutshanje\n• Qaqambisa izakhono namava\n\n**Iingxaki zokuNgena?**\n• Ulibele iphasiwedi → Cofa 'Ulibele iPhasiwedi'\n• Khangela i-imeyile yekh onkco lokusetha kwakhona\n• Sebenzisa idilesi ye-imeyile echanekileyo\n• Khangela i-caps lock\n\n**Ubumfihlo:**\n🔒 Idatha yakho ikhuselekile\n🔒 Asabelani ngolwazi lobuqu\n🔒 Ulawula ukuba yintoni ebonakalayo"
      }
    ]
  }
};

// ============================================================================
// MEDICAL HEALTH CONCERNS - Intelligent Detection & Response
// ============================================================================
const isMedicalConcern = (question) => {
  const medicalKeywords = [
    'sick', 'ill', 'feeling ill', 'unwell', 'pain', 'hurt', 'fever', 'cough', 'cold',
    'headache', 'stomach', 'nausea', 'vomit', 'diarrhea', 'rash', 'itchy', 'allergy',
    'asthma', 'diabetes', 'hiv', 'aids', 'tb', 'tuberculosis', 'covid', 'corona',
    'depression', 'anxiety', 'stressed', 'mental health', 'suicide', 'self harm',
    'pregnant', 'pregnancy', 'periods', 'menstrual', 'sexual health', 'std', 'sti',
    'clinic', 'hospital', 'doctor', 'health', 'medical', 'emergency', 'ambulance',
    'medicine', 'medication', 'treatment', 'symptoms', 'disease', 'infection',
    'wellness', 'health concern', 'health issue', 'feeling bad', 'not well'
  ];
  
  const questionLower = question.toLowerCase();
  return medicalKeywords.some(keyword => questionLower.includes(keyword));
};

const handleMedicalConcern = (question, language) => {
  const questionLower = question.toLowerCase();
  const lang = language === 'xh' ? 'xh' : 'en';
  
  // Emergency detection
  const isEmergency = /emergency|ambulance|dying|unconscious|severe|critical|bleeding|accident|poison/i.test(questionLower);
  
  if (lang === 'xh') {
    if (isEmergency) {
      return `🚨 **ISIGALELO SOMPHAKAMO!** 🚨\n\nUkuba oku kunemba kumphakamo, ndixa uxolo, kwaye kudingeka uncedo ngokukhawuleza!\n\n**BANDISELELA NGOKU:**\n🚑 Ambulance: **10177**\n📱 Cell Emergency: **112**\n☎️ Police: **10177**\n💬 WhatsApp: **0716 000 911** (Limpopo Emergency)\n\n**Ezinye iinombolo zolutsalelo:**\n• Netcare 911: 011 921 911\n• ER24: 084 124\n• Khululekela Crisis Line: 0800 000 000\n• Rape Crisis: 021 447 9762\n\nUkuba unendlela yokuqhagamshelwa, sithi siyacela undikhuphe ngoku kunye nomntu omkulu okanye umuntu awuthetha nabo.\n\n💙 **Uyinxiwele.** Ayinabutsho ukucela uncedo.`;
    }
    
    return `😔 Uxolo ukuzwa ukuba awuva kakuhle.\n\nSinexabiso eliphakamileyo lokunika incwadi ngokunqaba ekuseni:\n\n**Xa kufuneka uncedo ngomzantsi wezempilo:**\n✅ Yaya kwikliniki eseduze kwakho (Isinqumo Senqatha)\n✅ Qhagamshelana nenombolo yesikhululo-zempokonko: **0800 000 000** (Khululekela)\n✅ SMS i-\"HELP\" kwi-31393 (Molo - Mental Health Support)\n✅ Qhagamshelana nomthakathi wakho okanye umzali\n\n**Iyunithi yethu yemedical yeYouth Portal:**\n🏥 Sine-dedicated na **Medical Chat Assistance** section\n📱 Ungathumela imibuzo ngezempilo kunye nexabiso\n💊 Ulwazi nge-common illnesses, symptoms, kunye nokukhethwa kweliniko\n🆘 Inombolo zokusisikela kunye nezomphakamo\n💚 Izixwebhu zemental health support\n\n**Malunga nawe:**\n• Akukho intoni emasacele uncedo\n• Iindlela ezininzi zokuphila kakuhle\n• Ubuhle bakho buyabaluleka\n• Uncedo lwemimoya liwumphumela omhle\n\nUngafiki kwi-Medical Chat Assistance section ngoku ukufumana ulwazi olubhaliwe kunye nemimoya.\n\nHamba kakuhle 💙`;
  }
  
  // English version
  if (isEmergency) {
    return `🚨 **MEDICAL EMERGENCY!** 🚨\n\nIf this is a real emergency, please get help immediately!\n\n**CALL NOW:**\n🚑 Ambulance: **10177**\n📱 Emergency Cell: **112**\n☎️ Police: **10177**\n💬 WhatsApp: **0716 000 911**\n\n**Other Emergency Numbers:**\n• Netcare 911: 011 921 911\n• ER24: 084 124\n• Khululekela Crisis Line: 0800 000 000\n• Rape Crisis: 021 447 9762\n• SAPS: 0861 472 277\n\nIf possible, ask an adult or trusted person for help immediately.\n\n💙 **You matter. Help is available.**`;
  }
  
  return `😔 I'm sorry to hear you're not feeling well.\n\nWe take your health very seriously:\n\n**For Medical Concerns:**\n✅ Visit a clinic near you (best option)\n✅ Call our support line: **0800 000 000** (Khululekela - free, confidential)\n✅ SMS \"HELP\" to **31393** (Mental health support)\n✅ Talk to a trusted adult or family member\n\n**Our Medical Chat Assistance:**\n🏥 We have a dedicated **Medical Chat Assistance** section with:\n📱 Ask health questions and get guidance\n💊 Information on common illnesses and symptoms\n🆘 When to visit a clinic - Emergency warning signs\n📍 Local clinic & hospital locations in Eastern Cape\n💚 Mental health support resources & crisis numbers\n🛡️ Sexual health & reproductive information\n\n**Remember:**\n• Your health is important\n• Getting help is a sign of strength\n• Mental health is part of overall wellness\n• You deserve to feel better\n\n**🔗 Visit Medical Chat Assistance now** for professional guidance and resources.\n\nOr ask me:\n• \"Where's the nearest clinic?\"\n• \"What are these symptoms?\"\n• \"How do I deal with stress?\"\n• \"Mental health support\"\n\n💙 You're not alone. Support is always available.`;
};

// ============================================================================
// BUSINESS STARTUP FLOW - Multi-step Business Guidance
// ============================================================================
const isBusinessQuestion = (question) => {
  const businessKeywords = [
    'business', 'startup', 'entrepreneur', 'start business', 'own business',
    'side hustle', 'make money', 'income', 'self employed', 'sell', 'business idea',
    'sell products', 'services', 'online business', 'ecommerce', 'trading',
    'business plan', 'business funding', 'business grant', 'business loan',
    'how to start', 'business tips', 'entrepreneurship', 'small business',
    'create business', 'business opportunity', 'employment'
  ];
  
  const questionLower = question.toLowerCase();
  return businessKeywords.some(keyword => questionLower.includes(keyword));
};

// Check if user is responding to business flow question
const isBusinessFlowResponse = (question) => {
  const profile = conversationManager.userProfile;
  const questionLower = question.toLowerCase().trim(); // FIX: Define questionLower here
  
  // Only if we're in business flow and waiting for answer
  if (profile.businessProfile.step === 0) return false; // Not in flow yet
  
  // Check if this is a short answer (likely response to our question)
  const isShortAnswer = question.trim().split(/\s+/).length <= 5;
  
  // Business type responses - COMPREHENSIVE list
  const businessTypes = ['food', 'products', 'services', 'online', 'creative', 'catering', 
                         'clothes', 'clothing', 'tutoring', 'cleaning', 'art', 'music', 'ecommerce',
                         'hairdressing', 'repairs', 'selling', 'baking', 'cooking', 'crafts',
                         'reselling', 'retail', 'freelance', 'photography', 'design', 'writing',
                         'consulting', 'coaching', 'training', 'web', 'digital', 'social media'];
  
  // Time commitment responses  
  const timeCommitments = ['side', 'hustle', 'full time', 'main', 'income', 'not sure', 'part time',
                          'fulltime', 'parttime', 'temporary', 'permanent'];
  
  // Capital responses
  const capitalAmounts = ['500', '1000', '2000', '5000', 'nothing', 'r100', 'r200', 'r300', 
                         'less than', 'free', 'no money', 'small', 'large', 'some', 'little',
                         'zero', 'minimal', 'lots', 'plenty', 'substantial'];
  
  // Customer responses
  const customerResponses = ['yes', 'no', 'maybe', 'people', 'interested', 'friends', 'family',
                            'sure', 'possibly', 'uncertain', 'some', 'already', 'have'];
  
  // Location responses
  const locations = ['mthatha', 'port elizabeth', 'east london', 'butterworth', 'cape town',
                     'johannesburg', 'durban', 'bloemfontein', 'eastern cape', 'gauteng',
                     'kzn', 'online', 'home', 'town', 'area', 'province', 'city', 'country',
                     'gqeberha', 'western cape', 'limpopo', 'mpumalanga', 'free state', 'kwazulu'];
  
  if (profile.businessProfile.step === 1) {
    return isShortAnswer && businessTypes.some(bt => questionLower.includes(bt));
  } else if (profile.businessProfile.step === 2) {
    return isShortAnswer && timeCommitments.some(tc => questionLower.includes(tc));
  } else if (profile.businessProfile.step === 3) {
    return isShortAnswer && capitalAmounts.some(ca => questionLower.includes(ca));
  } else if (profile.businessProfile.step === 4) {
    return isShortAnswer && customerResponses.some(cr => questionLower.includes(cr));
  } else if (profile.businessProfile.step === 5) {
    return isShortAnswer && locations.some(loc => questionLower.includes(loc));
  }
  
  return false;
};

const handleBusinessFlowStep = (question, language) => {
  const profile = conversationManager.userProfile;
  const lang = language === 'xh' ? 'xh' : 'en';
  const questionLower = question.toLowerCase().trim();
  
  const step = profile.businessProfile.step;
  
  // STEP 1: Business Type
  if (step === 1) {
    if (questionLower.includes('food') || questionLower.includes('catering') || questionLower.includes('baking') || questionLower.includes('cooking')) {
      profile.businessProfile.businessType = 'Food Business';
    } else if (questionLower.includes('product') || questionLower.includes('cloth') || questionLower.includes('resell') || questionLower.includes('craft') || questionLower.includes('retail')) {
      profile.businessProfile.businessType = 'Products';
    } else if (questionLower.includes('service') || questionLower.includes('clean') || questionLower.includes('tutoring') || questionLower.includes('repair') || questionLower.includes('salon') || questionLower.includes('hair')) {
      profile.businessProfile.businessType = 'Services';
    } else if (questionLower.includes('online') || questionLower.includes('ecommerce') || questionLower.includes('web') || questionLower.includes('digital') || questionLower.includes('social')) {
      profile.businessProfile.businessType = 'Online Business';
    } else if (questionLower.includes('creative') || questionLower.includes('art') || questionLower.includes('music') || questionLower.includes('design') || questionLower.includes('photo') || questionLower.includes('writing')) {
      profile.businessProfile.businessType = 'Creative';
    } else {
      profile.businessProfile.businessType = question;
    }
    
    profile.businessProfile.step = 2;
    
    if (lang === 'xh') {
      return `✅ **Great! ${profile.businessProfile.businessType} business - excellent choice!**\n\n**UMBUZO 2: Ixesha lokwenza umsebenzi?**\n\n• **Side hustle** - Ixesha elithile ilanga, ngexesha lokufunda okanye umsebenzi\n• **Main income** - Umsebenzi wakho onkulu\n• **Not sure yet** - Uyibharoti ingenela\n\n**Khetha enye okanye ndichaze:**`;
    }
    
    return `✅ **Perfect! A ${profile.businessProfile.businessType} business - great choice!**\n\n**QUESTION 2: How much time will you commit?**\n\n• **Side Hustle** - Few hours a week while studying/working\n• **Main Income** - Your main focus and income source  \n• **Not Sure Yet** - Still exploring\n\n**Which sounds like you?**`;
  }
  
  // STEP 2: Time Commitment
  else if (step === 2) {
    if (questionLower.includes('side')) {
      profile.businessProfile.timeCommitment = 'Side Hustle';
    } else if (questionLower.includes('main')) {
      profile.businessProfile.timeCommitment = 'Main Income';
    } else {
      profile.businessProfile.timeCommitment = 'Not Sure Yet';
    }
    
    profile.businessProfile.step = 3;
    
    if (lang === 'xh') {
      return `✅ **${profile.businessProfile.timeCommitment} - Eyobuntu!**\n\n**UMBUZO 3: Zimali zokuqalisa?**\n\n• **Less than R500** - Kancinci uncwadi ekuseni\n• **R500 - R2,000** - Imisebenzi yombini\n• **R2,000 - R5,000** - Iingwamane\n• **More than R5,000** - Imasebenzi enkulu\n• **Nothing right now** - Ndifuna uncedo lokufumana\n\n**Zingaphi izimali zakho?**`;
    }
    
    return `✅ **${profile.businessProfile.timeCommitment} - Perfect!**\n\n**QUESTION 3: How much can you invest to start?**\n\n• **Less than R500** - Very minimal investment\n• **R500 - R2,000** - Small startup costs\n• **R2,000 - R5,000** - Moderate budget\n• **More than R5,000** - Substantial investment\n• **Nothing right now** - Need funding help\n\n**What's your budget?**`;
  }
  
  // STEP 3: Starting Capital
  else if (step === 3) {
    if (questionLower.includes('500') && !questionLower.includes('2')) {
      profile.businessProfile.startingCapital = 'Less than R500';
    } else if (questionLower.includes('500') || questionLower.includes('1000') || questionLower.includes('2000')) {
      profile.businessProfile.startingCapital = 'R500-R2,000';
    } else if (questionLower.includes('2000') || questionLower.includes('5000')) {
      profile.businessProfile.startingCapital = 'R2,000-R5,000';
    } else if (questionLower.includes('more') || questionLower.includes('5000')) {
      profile.businessProfile.startingCapital = 'More than R5,000';
    } else {
      profile.businessProfile.startingCapital = 'No money - Need funding';
    }
    
    profile.businessProfile.step = 4;
    
    if (lang === 'xh') {
      return `✅ **${profile.businessProfile.startingCapital} - Ayisembili!**\n\n**UMBUZO 4: Unabamuntu abavumayo ukuba bazali?**\n\n• **Yes** - Ndikwazileyo ndithi abantu beza\n• **No** - Indibana kodwa abakakholelwa\n• **Maybe** - Andazi kodwa indinokuba nengcebu\n\n**Khetha enye:**`;
    }
    
    return `✅ **${profile.businessProfile.startingCapital} - Got it!**\n\n**QUESTION 4: Do you already have interested customers?**\n\n• **Yes** - I have people interested\n• **No** - Still need to find customers\n• **Maybe** - Not sure yet\n\n**What's your situation?**`;
  }
  
  // STEP 4: Customer Base
  else if (step === 4) {
    if (questionLower.includes('yes') || questionLower.includes('people')) {
      profile.businessProfile.customerBase = 'Yes - Have interested people';
    } else if (questionLower.includes('no')) {
      profile.businessProfile.customerBase = 'No - Need to find customers';
    } else {
      profile.businessProfile.customerBase = 'Maybe - Still exploring';
    }
    
    profile.businessProfile.step = 5;
    
    if (lang === 'xh') {
      return `✅ **${profile.businessProfile.customerBase} - Lula na!**\n\n**UMBUZO 5: Iphi indawo yakho?**\n\nNdifuna ukwazi apho ukuba ndingakuhumba amathuba asesikhundleni sakho:\n\n• **Town/City** - Mthatha, Port Elizabeth, East London, Butterworth, noma?\n• **Province** - Eastern Cape, Gauteng, KZN, noma?\n• **Online** - Siphakame kwi-intanethi\n\n**Phi ukusuka?**`;
    }
    
    return `✅ **${profile.businessProfile.customerBase} - Excellent!**\n\n**QUESTION 5: Where are you based?**\n\nThis helps me find local support programs and resources for you:\n\n• **Town/City** - Mthatha, Port Elizabeth, East London, Butterworth, etc?\n• **Province** - Eastern Cape, Gauteng, KZN, etc?\n• **Online** - Operating from home online\n\n**Where are you?**`;
  }
  
  // STEP 5: Location - Generate Final Plan
  else if (step === 5) {
    // Extract location
    const locations = ['mthatha', 'port elizabeth', 'gqeberha', 'east london', 'butterworth', 'cape town', 'johannesburg', 'durban'];
    let foundLocation = null;
    locations.forEach(loc => {
      if (questionLower.includes(loc)) foundLocation = loc;
    });
    
    profile.businessProfile.location = foundLocation || question.trim();
    profile.businessProfile.step = 0; // Business flow complete
    
    // Generate action plan
    return generateBusinessActionPlan(profile.businessProfile, language);
  }
};

const generateBusinessActionPlan = (businessProfile, language) => {
  const lang = language === 'xh' ? 'xh' : 'en';
  
  if (lang === 'xh') {
    return `✅ **ISICWANGCISO SAKHO SEBHIZINISI**\n\n📋 **Ulwazi lwakho:**\n• Ubhizinisi: ${businessProfile.businessType}\n• Ixesha: ${businessProfile.timeCommitment}\n• Izimali: ${businessProfile.startingCapital}\n• Abamuntu: ${businessProfile.customerBase}\n• Indawo: ${businessProfile.location}\n\n🎯 **AMANYATHELO OKUQALA:**\n\n**1️⃣ Xulo umvavanyo wakho**\n• Thetha abantu aba-3-5 abazali bazali\n• Buza: "Uzali unokuthi ur weya izinto zam?"\n• Mamela ngononophelo iingcebiso\n\n**2️⃣ Qala ngombalwa**\n• Zama ukuthengisa kumhlobo / umzali okokuqala\n• Funda ukuba ayintoni eyasebenza\n• Bhandeza intsha ngokweziphakamiso\n\n**3️⃣ Fumana inkxaso-mali**\n• NYDA Ibonelelo: Kude R50,000\n• SEDA: Uncedo lokubhala isicwangciso\n• Iinkampani zophondo: Ezisekela lutsha\n\n**4️⃣ Bhala isicwangciso seshishini**\n• Yintoni oyithengisa\n• Ngubani oweza\n• Indlela ayenza imali\n• Inkohliso yokuqala\n\n**5️⃣ Lindela iithuthuzelo**\n• Thumela izicelo\n• Qhagamshelwa neengcebiso\n• Qulunqa umsebenzi wakho\n\n💡 **Iingcebiso eziphezulu:**\n• Qala nangoku\n• Sebenzisa uthuli wolwandle\n• Hlala ucingileyo\n• Ukubila intsha kunye neemali\n\n**Ndingakunceda njani ngoku?** Ndingasiza:\n• Isicwangciso seshishini\n• Amafom e-NYDA\n• Iingcebiso zokuqala`;
  }
  
  return `✅ **YOUR BUSINESS STARTUP PLAN**\n\n📋 **Your Profile:**\n• Business Type: ${businessProfile.businessType}\n• Time Commitment: ${businessProfile.timeCommitment}\n• Starting Capital: ${businessProfile.startingCapital}\n• Customer Base: ${businessProfile.customerBase}\n• Location: ${businessProfile.location}\n\n🎯 **YOUR FIRST STEPS:**\n\n**1️⃣ Validate Your Idea**\n• Talk to 3-5 people who could be customers\n• Ask: "Would you actually pay for this?"\n• Listen carefully to their feedback\n\n**2️⃣ Start Small & Test**\n• Try selling to friends/family first\n• Learn what works\n• Make improvements based on feedback\n\n**3️⃣ Find Funding**\n• NYDA Grant: Up to R50,000\n• SEDA Support: Free business plan help\n• Provincial programs: Youth-focused\n\n**4️⃣ Create Your Business Plan**\n• What you sell\n• Who buys\n• How you make money\n• Startup costs\n\n**5️⃣ Get Local Support**\n• Apply for grants\n• Connect with mentors\n• Build your network\n\n💡 **Top Tips:**\n• Start NOW - don't wait for perfect conditions\n• Use what you have\n• Stay focused and disciplined\n• Track money carefully\n• Learn as you go\n\n**How can I help next?** I can assist with:\n• Writing your business plan\n• NYDA application forms\n• Marketing ideas\n• Finding local resources in ${businessProfile.location}\n\n**What would help most right now?** 🚀`;
};

const handleBusinessQuestion = (question, language) => {
  const profile = conversationManager.userProfile;
  const lang = language === 'xh' ? 'xh' : 'en';
  const questionLower = question.toLowerCase().trim();
  
  // Check if user is responding to business flow
  if (isBusinessFlowResponse(question)) {
    return handleBusinessFlowStep(question, language);
  }
  
  // ============ CONTEXT-AWARE RESPONSES (Check conversation history) ============
  // If business flow was completed, provide SPECIFIC help based on user's request
  if (profile.businessProfile.step === 0 && profile.businessProfile.businessType) {
    // User asking for STARTUP TIPS
    if (questionLower.includes('startup tip') || questionLower.includes('first step') || 
        questionLower.includes('how to begin') || questionLower.includes('where to begin') ||
        questionLower.includes('begin') || questionLower.includes('start')) {
      
      if (lang === 'xh') {
        return `🚀 **IINGCEBISO ZOKUQALA IBHIZINISI YAKHO**\n\nRhodlulela ngokukhawuleza! Naph iikhadi eziyi-7 zokuqalisa:\n\n**1️⃣ XAKO NGOKU (Iyeke ukuli namhlanje)**\n• Yenza isigqibiselo-ndlela (asikho imali ekufunekayo)\n• Xula ides ngabamuntu aba-10\n• Bhala izinto ezikhulu ezifunekayo\n• Abhala isicwangciso esibhaliwe\n\n**2️⃣ FUMANA IMALI**\n• NYDA Ibonelelo: Kude kwi-R50,000 (abantu abakude ku-35)\n• SEDA: Isicwangciso sesakhono sokubhala ikhosi\n• Provincial Programs: Ukucwangcisa yokufumana\n• Bank Loans: UStandard Bank Start Smart, Nedbank Thrive\n\n**3️⃣ MAQELA AKHO**\n• Zala ixela lokuthengisa kubantu aba-5 okokuqala\n• Thola indlela yokuthengisa\n• Funda ukuba yintoni eyasebenza\n• Bhandeza kuquka iingcebiso\n\n**4️⃣ ISICWANGCISO SESHISHINI**\n• Yintoni oyithengisa\n• Ngubani oweza\n• Indlela ayenza imali\n• Inkohliso yokuqala\n\n**5️⃣ IBHULOHO YEBHIZINISI**\n• Sakhela isithathu seshishini\n• Funda kwabathengisi\n• Qulunqa isithako sekhwaliti\n• Qhagamshelwa nenkunzi\n\n**6️⃣ IBHELILI EBANZI**\n• Google (Mastering SEO)\n• Facebook/Instagram\n• WhatsApp\n• Word of mouth\n\n**7️⃣ IBAHLI YEMALI**\n• Landela imali\n• Lazi umali oyifumnene\n• Qaphela iincwadi\n• Ukuthwala inkolelo\n\n**Ndingakunceda njani ngoko?** Ndingasiza ku:\n• Ibhuziselo lesicwangciso seshishini\n• NYDA/SEDA amafom\n• Iingcebiso zokuqalisa esizindele`;
      }
      
      return `🚀 **YOUR STARTUP TIPS - 7 QUICK WINS**\n\nLet's move fast! Here are the exact first steps:\n\n**1️⃣ START IMMEDIATELY (Don't wait for perfect conditions)**\n• Test your idea with zero money\n• Validate with 10 real people\n• Write down what you need\n• Create a simple written plan\n\n**2️⃣ FIND YOUR FIRST CUSTOMERS**\n• Sell to 5 people first\n• Learn what actually sells\n• Make improvements\n• Build word-of-mouth\n\n**3️⃣ SECURE FUNDING**\n• **NYDA Grant**: Up to R50,000 (under 35 years)\n• **SEDA**: Free business mentoring\n• **Provincial Programs**: Youth support\n• **Bank Loans**: Standard Bank Start Smart, Nedbank Thrive\n\n**4️⃣ BUILD YOUR BUSINESS PLAN** (3 pages max)\n• What you sell\n• Who buys it\n• How you make money\n• What you need to start\n\n**5️⃣ CREATE YOUR OFFER**\n• Make it simple first\n• Get one product/service perfect\n• Price it right\n• Test with friends\n\n**6️⃣ SPREAD THE WORD**\n• WhatsApp: Send 20 messages today\n• Facebook: Post photos/updates\n• Instagram: Show your work\n• Friends: Tell everyone\n\n**7️⃣ TRACK YOUR MONEY**\n• Write down every expense\n• Know your profit\n• Save some for reinvestment\n• Keep records\n\n**NEXT ACTIONS:**\n✅ Choose your first customer\n✅ Decide your first offering\n✅ Set your first price\n✅ Make your first sale TODAY\n\n**What would help most?** I can:\n• Write your business plan with you\n• Help with NYDA application\n• Create a pricing strategy\n• Plan your marketing\n\n**Let's get started! 🚀** What's your biggest challenge right now?`;
    }
    
    // User asking for BUSINESS PLAN help
    if (questionLower.includes('business plan') || questionLower.includes('plan') ||
        questionLower.includes('write') || questionLower.includes('create plan')) {
      
      if (lang === 'xh') {
        return `📋 **ISICWANGCISO SESHISHINI - IITHEBULA EZILULA (3 IPHEPHA)**\n\n**IBHELUFA 1: IINKCUKACHA ZESHISHINI**\nIgama: ${profile.businessProfile.businessType} Business\nUmhlali: ${profile.name || 'Your name'}\nIndawo: ${profile.businessProfile.location || 'Your location'}\nUmsebenzi: ${profile.businessProfile.businessType}\n\n**IBHELUFA 2: ISICWANGCISO**\n\nYintoni oyithengisa?\n• Ibiwo: [Your product/service name]\n• Inkcazo: [Quick description]\n• Inqwelo: [Price]\n\nNgubani oweza?\n• Abantu abaphakamileyo (25-50)\n• Abantu abakhulu (50-75)\n• Abantu abakhulu abantu (75+)\n• Isazi\n• Imali\n\n**IBHELUFA 3: IZIMALI**\nInkomoni yokuqala: ${profile.businessProfile.startingCapital}\nIzinga loseyinti kunyanga: ???\n\n**Ndingakunceda ngamanye amaxesha ku:\n• Ibhuziselo: Naph lesicwangciso esiphakamileyo\n• Ibhuziselo: Naph isichazi-mandla\n• Iqela: Naph iikhadi zesiyazi`
      }
      
      return `📋 **WRITE YOUR BUSINESS PLAN - SIMPLE 3-PAGE FORMAT**\n\nHere's the exact template:\n\n**PAGE 1: THE BASICS**\n\nBusiness Name: ${profile.businessProfile.businessType} Business\nYour Name: ${profile.name || 'Your Name'}\nLocation: ${profile.businessProfile.location || 'Your City'}\nBusiness Type: ${profile.businessProfile.businessType}\n\n**PAGE 2: YOUR OFFER**\n\nWhat You Sell:\n• Name: [Product/Service]\n• Description: [1 sentence]\n• Price: R??? per unit\n\nWho Buys:\n• Age: 18-35\n• Location: Your area\n• Problem you solve: ???\n• Why they buy: ???\n\n**PAGE 3: THE MONEY**\n\nStartup Costs: ${profile.businessProfile.startingCapital}\n• Equipment/Stock: R???\n• Marketing: R???\n• Other: R???\n\nHow You Make Money:\n• Sales per month: ??? units\n• Income: ??? × R??? = R???\n• Costs: R???\n• Profit: R???\n\n**QUICK TIPS:**\n✅ Keep it simple - 3 pages max\n✅ Be realistic about numbers\n✅ Focus on one product first\n✅ Show why customers will buy\n✅ Prove you've talked to customers\n\n**Want help filling this in?** Tell me:\n• Your exact product/service\n• Who your customers are\n• Your pricing\n• Your monthly income goal\n\n**I'll help you write it! 📝**`;
    }
    
    // User asking for FUNDING help
    if (questionLower.includes('funding') || questionLower.includes('money') || 
        questionLower.includes('grant') || questionLower.includes('loan') ||
        questionLower.includes('nyda') || questionLower.includes('seda')) {
      
      if (lang === 'xh') {
        return `💰 **IBHONELELO YIMALI - IINDAWO ZOKUKHANGELA**\n\n**IPHASIDE YE-NYDA (National Youth Development Agency)**\nIimali: Kude kwi-R50,000\nIbakala: 18-35 unyaka\nYini: Izobuyekezelelo yebhizinisi\nIndlela: www.nyda.gov.za\n\n**IPHASIDE YE-SEDA (Small Enterprise Development Agency)**\nIimali: R0 (Inconjuwe okukhaliwe)\nYini: Isikweleti se-business, uncedo lokupela\nIndlela: www.seda.org.za\n\n**IIPROGRAMI ZEPHONDO (Eastern Cape)**\n• Youth Enterprise Development (Umsebenzi weentsha)\n• Small Business Support (Incedisano yebhizinisi\n• Cooperative Development (Inkunzi yoluntu)\nIndlela: Visit ecprov.gov.za\n\n**IIBHANKI ZABANTU ABASHA**\n• Standard Bank Start Smart: Kude ku-R50,000\n• Nedbank Thrive: Kude ku-R100,000\n• ABSA Uplift: Kude ku-R50,000\n\n**IZICWANGCISO ZACHOLULO (NGOs)**\n• Ashoka University\n• Khumbulani Youth Center\n• Business Linkage Centre\n\n**AMANQANQI AMAPHUCU**\n1. Bhala isicwangciso seshishini esiqiqe\n2. Fumana inombolo yomuntu omdala (mentor)\n3. Thumela isicelo + isicwangciso\n4. Lindela ingxelo (Iveki 2-4)\n5. Xamkela imali\n\n**Ndingakunceda ngamanye amaxesha ku:**\n• Ibhuziselo lezicelo\n• Iisicwangciso\n• Iiphakelo\n\n**Uyilumkile na?** Ndingasiza ngoku!`;
      }
      
      return `💰 **FUNDING OPTIONS - EXACT SOURCES**\n\n**🏛️ NYDA GRANT (National Youth Development Agency)**\nAmount: Up to R50,000\nAge: 18-35 years old\nWhat: Business startup grant\nWebsite: www.nyda.gov.za\nSteps:\n1. Create a business plan\n2. Register on NYDA website\n3. Upload documents\n4. Wait 2-4 weeks\n5. Get approval & funds\n\n**🏢 SEDA (Small Enterprise Development Agency)**\nCost: FREE - No money needed\nWhat: Free business mentoring & training\nWebsite: www.seda.org.za\nLocation: Regional offices in EC\nBenefit: Help write business plan\n\n**🌍 PROVINCIAL PROGRAMS (Eastern Cape)**\nContact: ecprov.gov.za\nPrograms:\n• Youth Enterprise Development\n• Small Business Fund\n• Cooperative Support\n\n**🏦 BANK LOANS (Youth-Friendly)**\n• Standard Bank Start Smart: Up to R50,000\n• Nedbank Thrive: Up to R100,000\n• ABSA Uplift: Up to R50,000\n• FNB Springboard: Up to R30,000\n\n**📊 APPLICATION STEPS:**\n1. ✅ Complete business plan\n2. ✅ Get mentor/reference letter\n3. ✅ Gather documents (ID, proof of address)\n4. ✅ Submit application\n5. ✅ Follow up after 2 weeks\n6. ✅ Receive funds (usually 4-6 weeks)\n\n**MY HELP:**\n• I can guide your business plan\n• I can explain each requirement\n• I can suggest best option for you\n\n**Ready to apply?** Tell me:\n• Which funding interests you?\n• Any questions about requirements?\n• Need help with the plan first?\n\n**Let's get you funded! 💰**`;
    }
    
    // User asking for MARKETING help
    if (questionLower.includes('market') || questionLower.includes('sell') || 
        questionLower.includes('customer') || questionLower.includes('promote') ||
        questionLower.includes('advertise') || questionLower.includes('social media')) {
      
      if (lang === 'xh') {
        return `📢 **ISICWANGCISO SOKUTHENGISELWA - IZINDLELA EZILINGANISIWE**\n\n**1️⃣ FACEBOOK & INSTAGRAM (KUDE)**\n• Bhala iifoto zeintsha yakho\n• Thumela iifoto okomhla\n• Buza imibuzo (50% ekuseni, 50% ethweshu)\n• Thumela kumhlobo ongu-5 ngosuku\n• Bonka iikhomenti (Thuseni, bonka imibuzo)\n\n**2️⃣ WHATSAPP (KUDE KAKUHLE)**\n• Thekelela ixela \"Molo! Ndinokuthengisa [product]\"\n• Thumela kumhlobo ongu-20 ngosuku\n• Faka iifoto\n• Thumela izibonelelo\n\n**3️⃣ IXELA-NEXELA (INYE ENYE)**\n• Thetha abantu abayi-10 ngosuku\n• Bhekisa kumhlobo enye\n• Boleka kumhlobo enye abaza\n• Biza umsebenzi omtsha\n\n**4️⃣ IKHOMYUNITI (EKUSENI NEXELA)**\n• Thekelela iithebula kwisitoreji\n• Bonka kwigazi lesitini\n• Nika iisampul kumuntu enye\n• Bonka kumhlobo\n\n**5️⃣ IZIFANISO (INZUZO)\n• Quba iifoto zenkosi yakho\n• Bonka isitili\n• Thumela kumuntu onye omva kwakunye\n• Faka ingcebiso/izibonelelo\n\n**IZINTO EKUFUNEKAYO:**\n• Iintloko ezingcono (R50)\n• Iigqabu ezingcono (R100)\n• Izifaniso ezingcono (R200)\n• Isithako esing (R???)\n\n**INDAWO YOKUQALA:**\n✅ Thetha abamhlobo aba-20\n✅ Bonka kumhlobo onye\n✅ Thumela WhatsApp kumuntu enye\n✅ Fumana umuntu omtsha\n✅ Biza umsebenzi omtsha\n\n**Ndingakunceda njani?** Ndingasiza ku:\n• Ibhuziselo leikhomyuniti\n• Iigcebiso zefoto\n• Iigcebiso zesithako\n\n**Qalani ngoku! 📸 Thumela umuntu enye ngamkela!**`;
      }
      
      return `📢 **MARKETING YOUR BUSINESS - ZERO BUDGET TACTICS**\n\n**🎯 THE 5 FASTEST WAYS TO GET YOUR FIRST CUSTOMERS:**\n\n**1️⃣ TELL YOUR FRIENDS (Week 1)**\n• Message 20 friends on WhatsApp\n• Send: "Hey! I'm now selling [product]. Interested?"\n• Include 2-3 photos\n• Ask them to share with others\n• Target: Get 3 sales this week\n\n**2️⃣ FACEBOOK & INSTAGRAM (Ongoing)**\n• Post a photo of your product daily\n• Caption: \"Now available! DM for orders\"\n• Ask questions in comments\n• Reply to everyone within 1 hour\n• Use hashtags: #YouthBusiness #LocalBusiness\n• Target: 10 followers → 1-2 sales\n\n**3️⃣ WORD OF MOUTH (Fastest)**\n• Tell 5 people per day\n• Give them a business card or flyer\n• Offer a small discount for referrals\n• Ask them to tell friends\n• Target: 10 people/week\n\n**4️⃣ LOCAL COMMUNITY (Best ROI)**\n• Post flyers in your neighborhood\n• Give samples at the local store\n• Talk to 10 people in person\n• Attend local markets/events\n• Target: 5-10 sales/week\n\n**5️⃣ GOOGLE (Longer term)**\n• Create Google Business profile\n• Ask customers to rate you\n• Post updates weekly\n• Respond to reviews\n• Target: Passive sales\n\n**💡 MARKETING BUDGET HACK:**\n• Budget R500: Print 100 flyers\n• Budget R1000: Better photos + more flyers\n• Budget R2000: Small ads on Facebook\n• Budget R5000: Local radio ad\n\n**WEEK 1 ACTION PLAN:**\n✅ Day 1: Message 20 friends\n✅ Day 2: Create Facebook page\n✅ Day 3: Print 20 flyers\n✅ Day 4: Post 5 photos\n✅ Day 5: Tell 10 people in person\n✅ Day 6: Share with online groups\n✅ Day 7: Collect feedback\n\n**TRACK YOUR RESULTS:**\n• Count messages sent\n• Count responses\n• Count actual sales\n• Track your cost per customer\n• Repeat what works\n\n**Need help?** Tell me:\n• What photos do you have?\n• What's your budget?\n• What's your target customer?\n• Where do they hang out?\n\n**Let's get you customers TODAY! 🚀**`;
    }
  }
  
  // Not in flow, start it
  if (profile.businessProfile.step === 0) {
    profile.businessProfile.step = 1;
    
    if (lang === 'xh') {
      return `🚀 **Iyee! Umava omnandi wokubumba eshishineni!**\n\nUkuqala inqwelo yebhizinisi kunokuba ukuguqula iimpilo. Masiyi ngolandela ingcebu ekuthile ukuze azi nokuqala.\n\n**Ndiza kuzama imibuzo embalwa, emva koko ndiza kusikela ekubeni siyiseko sokuqala:**\n\n**📋 UMBUZO 1: Ng osesebenziswa kukubani ibaleleyo inkosi?**\n• Ukuthengisa imikhiqizo (iimpahla, ukutya, imikhiqizo ethembelelekayo)\n• Ukunikeza izibonelelo (ukugqoba iintloko, ukufundisa, ukulungisa)\n• Ubhizinisi bolwandle (olawandle, i-e-commerce)\n• Umsebenzi omgeni (ubugcisa, umculo, umdali)\n• Ubhizinisi bokutya (ukuthengisa ukutya, isikhwama sekofu)\n• Enye into\n\n**Uyithanda ntoni? Ndibuze umbuzo wakho!** 💡`;
    }
    
    return `🚀 **That's an exciting goal! Starting a business can be life-changing.**\n\nLet's break it down into simple steps so you know exactly where to begin. I'll ask a few quick questions, then suggest practical first actions.\n\n**Let's start with these questions:**\n\n**📋 QUESTION 1: What kind of business are you thinking?**\n• **Products** - Clothing, food, crafts, reselling\n• **Services** - Hairdressing, tutoring, repairs, cleaning\n• **Online Business** - Social media, e-commerce, digital products\n• **Creative Work** - Art, music, design, photography\n• **Food Business** - Catering, baking, cooking\n• **Other** - Share your idea!\n\n**Tell me what appeals to you!** 💡`;
  }
  
  // Already completed flow, just give general business help
  if (lang === 'xh') {
    return `Olo umsebenzi weshishini! 🏢 Ndingakunceda:\n• Isicwangciso seshishini\n• Iibhediyuli zezinto okufunekayo\n• Indlela yokukhangela imali\n• Iingcebiso zokuqalisa\n\n**Yintoni oyifuna ngoku?**`;
  }
  
  return `Great question about business! 🏢 I can help with:\n• Business planning\n• Funding applications\n• Startup tips\n• Finding local resources\n\n**What specific help do you need?**`;
};

// Detect and parse course answers from user input
const parseCourseAnswers = (question) => {
  // Check if this looks like course answers (contains grade, subject, work type info)
  const gradeMatch = question.match(/(grade\s*\d+|grade\s*9|grade\s*10|grade\s*11|grade\s*12|national\s*certificate|diploma|n\d)/i);
  const hasMultipleCommas = (question.match(/,/g) || []).length >= 3;
  const hasCourseKeywords = /subject|math|science|computer|people|tool|hand|creative|work|course|study|year|month|free|pay|location|province|town/i.test(question);
  
  return gradeMatch && hasMultipleCommas && hasCourseKeywords;
};

// Extract course information from user answer
const extractCourseInfo = (question) => {
  const parts = question.split(/[,;]/);
  let extracted = {};
  
  if (parts.length >= 6) {
    extracted.grade = parts[0]?.trim() || 'Not specified';
    extracted.subjects = parts[1]?.trim() || 'Not specified';
    extracted.workType = parts[2]?.trim() || 'Not specified';
    extracted.duration = parts[3]?.trim() || 'Not specified';
    extracted.budget = parts[4]?.trim() || 'Not specified';
    extracted.location = parts[5]?.trim() || 'Not specified';
  } else if (parts.length >= 3) {
    // Try to map fewer answers
    extracted.subjects = parts[0]?.trim() || 'Not specified';
    extracted.workType = parts[1]?.trim() || 'Not specified';
    extracted.location = parts[parts.length - 1]?.trim() || 'Not specified';
  }
  
  return extracted;
};

// Generate highly accurate course recommendations based on exact user answers
const generateAccurateCourseRecommendations = (courseInfo) => {
  const subjectsLower = courseInfo.subjects?.toLowerCase() || '';
  const workLower = courseInfo.workType?.toLowerCase() || '';
  const durationLower = courseInfo.duration?.toLowerCase() || '';
  const budgetLower = courseInfo.budget?.toLowerCase() || '';
  
  let recommendations = [];
  let selectedFields = [];
  
  // MATH & SCIENCE = ENGINEERING
  if (subjectsLower.includes('math') || subjectsLower.includes('science') || subjectsLower.includes('physics') || subjectsLower.includes('chemistry')) {
    selectedFields.push('engineering');
  }
  
  // COMPUTER WORK = IT
  if (workLower.includes('computer') || workLower.includes('tech') || workLower.includes('coding') || workLower.includes('programming') || subjectsLower.includes('computer')) {
    selectedFields.push('it');
  }
  
  // PEOPLE WORK = HEALTHCARE/SOCIAL
  if (workLower.includes('people') || workLower.includes('help') || workLower.includes('social') || workLower.includes('care') || workLower.includes('health')) {
    selectedFields.push('healthcare');
  }
  
  // TOOLS/HANDS-ON = TRADES
  if (workLower.includes('tool') || workLower.includes('hand') || workLower.includes('practical') || workLower.includes('craft') || workLower.includes('mechanic') || workLower.includes('electrical')) {
    selectedFields.push('trades');
  }
  
  // CREATIVE = ARTS & DESIGN
  if (workLower.includes('creative') || workLower.includes('art') || subjectsLower.includes('art') || subjectsLower.includes('design') || workLower.includes('music') || workLower.includes('visual')) {
    selectedFields.push('creative');
  }
  
  // BUSINESS = BUSINESS & ADMIN
  if (subjectsLower.includes('business') || workLower.includes('office') || workLower.includes('admin') || workLower.includes('manage') || subjectsLower.includes('economics')) {
    selectedFields.push('business');
  }
  
  // Generate recommendations for selected fields
  selectedFields.forEach(field => {
    if (field === 'engineering') {
      recommendations.push({
        type: '⚙️ ENGINEERING & TECHNOLOGY',
        courses: '• Mechanical Engineering • Electrical Engineering • Civil Engineering • Software Engineering • Mining Engineering • Automotive Engineering',
        duration: durationLower.includes('short') ? '2-3 years (N-Diploma)' : '3-4 years (Bachelor\'s)',
        bursaries: 'NSFAS • Eskom • Sasol • Transnet • Anglo American • Department of Public Works • BAE Systems',
        colleges: 'Eastern Cape TVET Colleges • Nelson Mandela University • Walter Sisulu University • Cape Peninsula University of Technology',
        salary: 'R25,000 - R45,000+ per month (entry level to mid-career)'
      });
    }
    
    if (field === 'it') {
      recommendations.push({
        type: '💻 INFORMATION TECHNOLOGY',
        courses: '• Web Development • Cyber Security • IT Support • Database Administration • Cloud Computing • Mobile App Development • Data Science',
        duration: durationLower.includes('short') ? '6-12 months (Bootcamp/Certificate)' : '2-3 years (Diploma)',
        bursaries: 'NSFAS • Microsoft Azure • Google Cloud • Amazon AWS • IBM • SAP • Coursera scholarships',
        colleges: 'Eastern Cape TVET Colleges • Online (Coursera, Udacity, Codecademy) • DSD IT Academy • 4Geeks Academy',
        salary: 'R20,000 - R40,000+ per month (growing demand)'
      });
    }
    
    if (field === 'healthcare') {
      recommendations.push({
        type: '🏥 HEALTHCARE & SOCIAL SERVICES',
        courses: '• Nursing (Professional & Enrolled) • Social Work • Psychology • Community Health • Counseling • Occupational Therapy • Radiography',
        duration: durationLower.includes('short') ? '1-2 years (Certificate)' : '3-4 years (Professional)',
        bursaries: 'NSFAS • Department of Health • Red Cross • WHO • Médecins Sans Frontières • Nursing Colleges',
        colleges: 'Eastern Cape TVET Colleges • Walter Sisulu University • Nelson Mandela University • University of Fort Hare',
        salary: 'R22,000 - R50,000+ per month (critical shortage - high demand)'
      });
    }
    
    if (field === 'trades') {
      recommendations.push({
        type: '🔧 TRADES & CRAFTSMANSHIP',
        courses: '• Electrical Installation • Plumbing • Welding • HVAC • Carpentry • Bricklaying • Motor Mechanics • Heavy Equipment Operation',
        duration: 'Typically 1-3 years (Apprenticeships & Learnerships)',
        bursaries: 'SETA Learnerships (PAID) • NSFAS • Department of Labour • Construction Education & Training Authority',
        colleges: 'Eastern Cape TVET Colleges • Artisan Development Centers • Construction Training Centers • Sector-Specific Providers',
        salary: 'R18,000 - R35,000+ per month (highly demanded skills)'
      });
    }
    
    if (field === 'creative') {
      recommendations.push({
        type: '🎨 CREATIVE & DESIGN',
        courses: '• Graphic Design • Video Production • Animation • Digital Marketing • Photography • Fashion Design • Music Production • Game Development',
        duration: durationLower.includes('short') ? '6-12 months (Certificate)' : '2-3 years (Diploma)',
        bursaries: 'NSFAS • Arts & Culture Fund • Creative Industries Fund • Adobe Scholarships • Online Platforms',
        colleges: 'Eastern Cape TVET Colleges • Online (Skillshare, Behance, CreativeLive) • Private Design Schools • University programs',
        salary: 'R15,000 - R45,000+ per month (portfolio-dependent)'
      });
    }
    
    if (field === 'business') {
      recommendations.push({
        type: '💼 BUSINESS & ADMINISTRATION',
        courses: '• Business Administration • Office Management • Marketing • Human Resources • Project Management • Accounting • Supply Chain',
        duration: durationLower.includes('short') ? '1 year (Certificate)' : '3 years (Diploma/Degree)',
        bursaries: 'NSFAS • Sage • SAP • Standard Bank • Absa • Deloitte • PwC Graduate Programs',
        colleges: 'Eastern Cape TVET Colleges • Nelson Mandela University • University of Technology • Business Colleges',
        salary: 'R18,000 - R40,000+ per month'
      });
    }
  });
  
  // If no specific match, add general recommendations
  if (selectedFields.length === 0) {
    recommendations.push({
      type: '📚 GENERAL LEARNING PATHWAYS',
      courses: '• General Education • Skills Training • Certificate Programs • Entry-Level Certifications',
      duration: 'Flexible - 6 months to 3 years',
      bursaries: 'NSFAS • Provincial Training Grants • NGO Bursaries',
      colleges: 'Eastern Cape TVET Colleges • Local Training Centers • Community Centers',
      salary: 'Starting: R12,000 - R20,000+ (improves with specialization)'
    });
  }
  
  // Build comprehensive response
  let response = `✅ **PERSONALIZED COURSE RECOMMENDATIONS FOR YOU**\n\n`;
  response += `📋 **Your Profile:**\n`;
  response += `   • Education: ${courseInfo.grade}\n`;
  response += `   • Interests: ${courseInfo.subjects}\n`;
  response += `   • Work Style: ${courseInfo.workType}\n`;
  response += `   • Duration: ${courseInfo.duration}\n`;
  response += `   • Budget: ${courseInfo.budget}\n`;
  response += `   • Location: ${courseInfo.location}\n\n`;
  
  response += `🎯 **COURSES THAT MATCH YOUR PROFILE:**\n\n`;
  
  recommendations.forEach((rec, idx) => {
    response += `**${idx + 1}. ${rec.type}**\n`;
    response += `   📚 Courses: ${rec.courses}\n`;
    response += `   ⏱️ Duration: ${rec.duration}\n`;
    response += `   💰 Funding: ${rec.bursaries}\n`;
    response += `   🏫 Where: ${rec.colleges}\n`;
    response += `   💵 Salary Range: ${rec.salary}\n\n`;
  });
  
  response += `**🚀 YOUR ACTION PLAN:**\n\n`;
  response += `1. **Research** - Check colleges & course requirements\n`;
  response += `2. **Apply for Funding** - Visit our Bursaries page (deadlines: Aug-Sept)\n`;
  response += `3. **Build Your CV** - Use our Resume Builder\n`;
  response += `4. **Submit Applications** - Apply to 5-10 programs\n`;
  response += `5. **Track Progress** - Use Opportunities page for updates\n\n`;
  
  response += `💡 **PRO TIPS:**\n`;
  response += `• Apply EARLY - Most bursaries close August-September\n`;
  response += `• Apply to MULTIPLE programs - Increases your chances\n`;
  response += `• Check NSFAS first - Available for most fields if family income under R350,000\n`;
  response += `• Get high grades - 70%+ improves bursary eligibility\n`;
  response += `• Include portfolio for creative fields\n\n`;
  
  response += `❓ **Need Help?** Ask me:\n`;
  response += `• "Which bursary should I apply for?"\n`;
  response += `• "How do I apply for [course name]?"\n`;
  response += `• "What are the requirements?"\n`;
  response += `• "How do I write a good motivation letter?"\n`;
  
  return response;
};

// Intelligent semantic matching - analyzes meaning, not just keywords
const semanticScore = (question, keywords) => {
  const qWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  let totalScore = 0;
  let matchCount = 0;
  
  keywords.forEach(keyword => {
    const kwLower = keyword.toLowerCase().trim();
    if (!kwLower) return;
    
    // 1. EXACT PHRASE MATCH (Highest - 100 points)
    if (question.toLowerCase().includes(kwLower)) {
      totalScore += 100;
      matchCount++;
      return;
    }
    
    // 2. MULTI-WORD KEYWORD MATCHING
    const kwWords = kwLower.split(/\s+/).filter(w => w.length > 0);
    
    // If all words in keyword appear in question
    const allWordsMatch = kwWords.every(kw => 
      qWords.some(qw => qw.includes(kw) || qw === kw)
    );
    if (allWordsMatch && kwWords.length > 1) {
      totalScore += 80;
      matchCount++;
      return;
    }
    
    // 3. INDIVIDUAL WORD MATCHING
    let wordMatches = 0;
    kwWords.forEach(kw => {
      qWords.forEach(qw => {
        if (kw.length > 3 && qw === kw) {
          wordMatches += 25; // Exact word match
        } else if (kw.length > 3 && qw.includes(kw)) {
          wordMatches += 15; // Partial match
        }
      });
    });
    
    if (wordMatches > 0) {
      totalScore += wordMatches;
      matchCount++;
    }
  });
  
  return { score: totalScore, matches: matchCount };
};

// Helper function to find matching answer with SMART semantic analysis
export const findAnswer = (question, language, currentPage = 'home') => {
  const normalizedQuestion = question.toLowerCase().trim();
  const lang = language === 'xh' ? 'xh' : 'en';
  
  // ====== STEP 0: IDENTIFY PRIMARY TOPIC/INTENT ======
  const identifiedTopic = identifyPrimaryTopic(question);
  
  // ====== STEP 0.5: PRIORITY CHECK FOR ACTIVE BUSINESS FLOW ======
  // If user is in the middle of business flow, handle that FIRST
  // This prevents single-word answers like "clothing" from being misidentified as other topics
  const profile = conversationManager.userProfile;
  if (profile.businessProfile.step > 0 && profile.businessProfile.step < 6) {
    if (isBusinessFlowResponse(question)) {
      const businessFlowResponse = handleBusinessFlowStep(question, language);
      conversationManager.addToHistory(question, businessFlowResponse);
      return businessFlowResponse;
    }
  }
  
  // ====== STEP 1: Extract User Information & Update Profile ======
  const extractedInfo = conversationManager.extractUserInfo(question);
  conversationManager.updateProfile(extractedInfo);
  if (normalizedQuestion.length > 3) {
    conversationManager.userProfile.previousQuestions.push(normalizedQuestion);
  }
  
  // ====== HELPER: Find best match from array of Q&A items with improved scoring ======
  const findBestMatch = (items, minScore = 20) => {
    if (!items || !Array.isArray(items)) return null;
    
    let bestMatch = null;
    let bestScore = 0;
    let bestItem = null;
    
    items.forEach(item => {
      if (!item.keywords || !Array.isArray(item.keywords)) return;
      const { score, matches } = semanticScore(normalizedQuestion, item.keywords);
      
      // Prioritize by score, then by matches count
      if (score > bestScore || (score === bestScore && matches > (bestMatch?.matches || 0))) {
        bestScore = score;
        bestMatch = { score, matches };
        bestItem = item;
      }
    });
    
    // Return match ONLY if score meets threshold
    return (bestScore >= minScore && bestItem) ? bestItem : null;
  };
  
  // ====== STEP 2: GREETING DETECTION ======
  const greetingKeywords = ['hello', 'hi', 'hey', 'molo', 'molweni', 'yo', 'sup', 'greetings', 'good morning', 'good afternoon', 'good evening'];
  const isGreeting = greetingKeywords.some(kw => normalizedQuestion.includes(kw));
  
  if (isGreeting && normalizedQuestion.length < 20) {
    const greetingResponse = lang === 'xh'
      ? `Molo! 👋 Wamkelekile. Ndilapha ukukunceda. Ungandiwbuza ngemalunga:\n• 🎓 Iibursary kunye Iilearnerships\n• 🚀 Ukuqalisa ibhizinisi\n• 💼 Ukufumana umsebenzi\n• 🏥 Izempilo\n• 📄 Uncedo ngeCV\n\nUngathi ntoni?`
      : `Hello! 👋 Welcome! I'm here to help. You can ask me about:\n• 🎓 Bursaries & Learnerships\n• 🚀 Starting a business\n• 💼 Finding jobs\n• 🏥 Health & wellness\n• 📄 CV & resumes\n\nWhat's on your mind?`;
    conversationManager.addToHistory(question, greetingResponse);
    return greetingResponse;
  }
  
  // ====== STEP 2.5: FEEDBACK/COMPLAINT DETECTION ======
  // Handle when user says answer didn't match their question
  const feedbackKeywords = [
    "doesn't correspond", "doesnt correspond", "not what i asked", "wrong answer",
    "that's not right", "not right", "incorrect", "wrong", "not related", "off topic",
    "not answering my question", "didn't answer", "didn't help", "unclear", "confusing",
    "not what i meant", "you didn't understand", "misunderstood", "you missed it", "rephrase"
  ];
  
  const isFeedback = feedbackKeywords.some(kw => normalizedQuestion.includes(kw));
  
  if (isFeedback) {
    const previousQuestion = conversationManager.conversationHistory[conversationManager.conversationHistory.length - 2]?.user || '';
    
    if (lang === 'xh') {
      return `Uxolo! Ndibuye kwindlela eyoyiyo. 🙏\n\n**Umbuzokuqala wakho:** "${previousQuestion}"\n\nNdiza kuphendula ngcono. Ndicela:\n• **Ichaze umbuzo wakho ngakumbi** - Yintoni elifike okufunekayo?\n• **Umhlobo wokugqiba** - Uyikrokela ngawo na?\n• **Incwadi yohlwayelo** - Ibaliwe iindikeyithi ozifunayo?\n\n**Ndiza kusikhaya ngokuthola icebo elungile!** 💡`;
    }
    
    return `I apologize for the mismatch! 🙏\n\n**Your original question:** "${previousQuestion}"\n\nLet me get this right. Could you help clarify:\n• **Be more specific** - What exactly do you need?\n• **Give context** - What's your situation?\n• **Add keywords** - Include specific terms related to what you're asking\n\n**I'll find the perfect answer for you!** 💡\n\nOr try asking:\n• Different wording of your question\n• One specific aspect at a time\n• Your background/situation first`;
  }
  
  // ====== STEP 3: MEDICAL CONCERN DETECTION (HIGHEST PRIORITY) ======
  if (isMedicalConcern(normalizedQuestion)) {
    const medicalResponse = handleMedicalConcern(normalizedQuestion, language);
    conversationManager.addToHistory(question, medicalResponse);
    return medicalResponse;
  }
  
  // ====== STEP 4: TOPIC-BASED STRICT ROUTING ======
  // BUSINESS QUESTIONS - NEVER RETURN FUNDING/NSFAS INFO
  if (identifiedTopic && identifiedTopic.topic === 'BUSINESS') {
    const businessResponse = handleBusinessQuestion(normalizedQuestion, language);
    conversationManager.addToHistory(question, businessResponse);
    return businessResponse;
  }
  
  // HEALTH QUESTIONS - NEVER RETURN FUNDING/BUSINESS INFO
  if (identifiedTopic && identifiedTopic.topic === 'HEALTH') {
    const healthResponse = handleMedicalConcern(normalizedQuestion, language);
    conversationManager.addToHistory(question, healthResponse);
    return healthResponse;
  }
  
  // FUNDING QUESTIONS - ONLY funding-specific responses
  if (identifiedTopic && identifiedTopic.topic === 'FUNDING') {
    if (CHATBOT_DATA.funding && CHATBOT_DATA.funding[lang]) {
      const match = findBestMatch(CHATBOT_DATA.funding[lang], 15);
      if (match && match.answer) {
        conversationManager.addToHistory(question, match.answer);
        return match.answer;
      }
    }
  }
  
  // COURSES/LEARNERSHIPS - NEVER RETURN FUNDING/BUSINESS INFO
  if (identifiedTopic && identifiedTopic.topic === 'COURSES') {
    if (CHATBOT_DATA.opportunities && CHATBOT_DATA.opportunities[lang]) {
      const match = findBestMatch(CHATBOT_DATA.opportunities[lang], 15);
      if (match && match.answer) {
        conversationManager.addToHistory(question, match.answer);
        return match.answer;
      }
    }
    const oppResponse = handleOpportunityFlow(normalizedQuestion, language);
    conversationManager.addToHistory(question, oppResponse);
    return oppResponse;
  }
  
  // CV/RESUME - NEVER RETURN FUNDING/BUSINESS INFO
  if (identifiedTopic && identifiedTopic.topic === 'CV') {
    if (CHATBOT_DATA.cvResume && CHATBOT_DATA.cvResume[lang]) {
      const match = findBestMatch(CHATBOT_DATA.cvResume[lang], 15);
      if (match && match.answer) {
        conversationManager.addToHistory(question, match.answer);
        return match.answer;
      }
    }
  }
  
  // JOBS/EMPLOYMENT - NEVER RETURN FUNDING/BUSINESS INFO
  if (identifiedTopic && identifiedTopic.topic === 'JOBS') {
    if (CHATBOT_DATA.employment && CHATBOT_DATA.employment[lang]) {
      const match = findBestMatch(CHATBOT_DATA.employment[lang], 15);
      if (match && match.answer) {
        conversationManager.addToHistory(question, match.answer);
        return match.answer;
      }
    }
    if (CHATBOT_DATA.cvResume && CHATBOT_DATA.cvResume[lang]) {
      const match = findBestMatch(CHATBOT_DATA.cvResume[lang], 15);
      if (match && match.answer) {
        conversationManager.addToHistory(question, match.answer);
        return match.answer;
      }
    }
  }
  
  // ====== STEP 5: Course Answer Detection ======
  if (parseCourseAnswers(normalizedQuestion)) {
    const courseInfo = extractCourseInfo(normalizedQuestion);
    const courseResponse = generateAccurateCourseRecommendations(courseInfo);
    conversationManager.addToHistory(question, courseResponse);
    return courseResponse;
  }
  
  // ====== STEP 6: Check personalized/contextual questions FIRST ======
  if (CHATBOT_DATA.personalized && CHATBOT_DATA.personalized[lang]) {
    const match = findBestMatch(CHATBOT_DATA.personalized[lang], 25);
    if (match && match.answer) {
      let personalizedResponse = match.answer;
      if (conversationManager.userProfile.name) {
        personalizedResponse = personalizedResponse.replace(/\buser\b/gi, conversationManager.userProfile.name);
      }
      conversationManager.addToHistory(question, personalizedResponse);
      return personalizedResponse;
    }
  }

  // ====== STEP 7: Check general questions ======
  if (CHATBOT_DATA.general && CHATBOT_DATA.general[lang]) {
    const match = findBestMatch(CHATBOT_DATA.general[lang], 20);
    if (match && match.answer) {
      conversationManager.addToHistory(question, match.answer);
      return match.answer;
    }
  }

  // ====== STEP 8: Check platform questions ======
  if (CHATBOT_DATA.platform && CHATBOT_DATA.platform[lang]) {
    const match = findBestMatch(CHATBOT_DATA.platform[lang], 20);
    if (match && match.answer) {
      conversationManager.addToHistory(question, match.answer);
      return match.answer;
    }
  }

  // ====== STEP 9: Check page-specific questions ======
  if (currentPage && CHATBOT_DATA.pages[currentPage]) {
    const pageData = CHATBOT_DATA.pages[currentPage][lang];
    if (pageData) {
      const { score } = semanticScore(normalizedQuestion, pageData.keywords);
      if (score >= 20) {
        conversationManager.addToHistory(question, pageData.answer);
        return pageData.answer;
      }
    }
  }

  // ====== STEP 10: AMBIGUITY RESOLUTION ======
  // If no clear match, ask user to clarify
  if (!identifiedTopic || identifiedTopic.confidence < 20) {
    const clarificationMsg = generateClarificationMessage(lang);
    conversationManager.addToHistory(question, clarificationMsg);
    return clarificationMsg;
  }

  // ====== STEP 11: Smart Fallback - Intelligent Guiding System ======
  let contextAwareResponse = generateSmartFallback(normalizedQuestion, language, currentPage);
  conversationManager.addToHistory(question, contextAwareResponse);
  return contextAwareResponse;
};

// ============================================================================
// SMART FALLBACK FOR UNCLEAR QUESTIONS
// ============================================================================
const generateSmartFallback = (question, language, currentPage) => {
  const profile = conversationManager.userProfile;
  const lang = language === 'xh' ? 'xh' : 'en';
  
  // Check if user is asking unclear question (single words, "idk", "maybe", "help")
  const isUnclear = /^(idk|dunno|maybe|um|uh|help|what|stuff|things|anything|no idea)$/i.test(question);
  const isVeryShort = question.trim().split(/\s+/).length <= 2;
  
  if (isUnclear || (isVeryShort && !profile.businessProfile.step)) {
    if (lang === 'xh') {
      return `Ayintsi! Masiyi ngolandela into eyoyiyo. 😊\n\n**Uyikrokela ngasentla:**\n\n• 🎓 **Ukufunda kunye noNkxaso-mali** (Iibursary, Iilearnerships)\n• 🚀 **Ukwenza Imali** (Ukuqalisa ubhizinisi, Ukufumana umsebenzi)\n• 🏥 **Isigumbo-nogqwagwane** (Ukungaziwa kakuhle, Uxinzelelo lwengcinga)\n• 💡 **Enye into?** (Xelela ulwazi oludingayo!)\n\n**Khetha enye, ndiza kunceda ngolunga!** 👉`;
    }
    
    return `No problem! Let's find you the right help. 😊\n\nAre you mostly thinking about:\n\n• 🎓 **Studying & Funding** (Bursaries, Learnerships)\n• 🚀 **Making Money** (Starting a business, Finding a job)\n• 🏥 **Health & Wellness** (Feeling unwell, Mental health)\n• 💡 **Something else?** (Just tell me what you need!)\n\nPick one, and we'll dive in! 👉`;
  }
  
  // Check if looking for opportunities/career
  if (/opportunity|job|career|work|employ|recruit|what should i do|path/.test(question)) {
    if (lang === 'xh') {
      return `Ayoba! Uyikhangela amathuba. 🎯\n\nNdiza kukunceda ufumane izinto ezifanelekela kwiprrofayile yakho.\n\n**Masiyi ngolandela:**\n• Ibanga lokupakama: Grade 9, 10, 11, okanye 12?\n• Yeyiphi indawo oyicinga:\n  - 💻 I-Tech / Ikhompyuter\n  - 🛠️ Izakhono-zokusebenza\n  - 👥 Abantu\n  - 📊 Iindleko / Ubhizinisi\n  - 🎨 Ubugcisa / Imdali\n\n**Ndichaze ibanga okanye indawo, ndiza kukukhangela izinto ezihle!**`;
    }
    
    return `Great! You're looking for opportunities. 🎯\n\nLet me find the perfect matches for you.\n\n**Quick questions:**\n• What's your highest grade completed?\n  - Grade 9, 10, 11, or 12?\n• Which area interests you most?\n  - 💻 Tech & Computers\n  - 🛠️ Hands-on & Practical\n  - 👥 Working with People\n  - 📊 Numbers & Business\n  - 🎨 Creative & Design\n\n**Tell me, and I'll find your best options!**`;
  }
  
  // Check if asking about bursaries/funding
  if (/bursary|funding|grant|loan|money|financial|support|pay for|afford/.test(question)) {
    if (lang === 'xh') {
      return `💰 **Iibursary kunye noNkxaso-mali!**\n\nEkuleni kunye ne-NSFAS zikhona! Ndilapha ukukunceda.\n\n**Iyiphi into endifuna ukwazi?**\n• "Ngubani onokufaka isicelo i-NSFAS?"\n• "Iibhursary ezimbalwa ezikhoyo?"\n• "Indlela yokuqalisa isicelo?"\n• "Zenzekelani ukuba andikwazi kuya kwikoloji?"\n\n**Buza noko, ndiza kukunceda ngolunga!** 💡`;
    }
    
    return `💰 **Bursaries & Funding!**\n\nThere's money available! I'm here to help you find it.\n\n**What would you like to know?**\n• "Who can apply for NSFAS?"\n• "What bursaries are available?"\n• "How do I start the application?"\n• "What if I didn't pass my exams?"\n\n**Ask anything, and I'll guide you!** 💡`;
  }
  
  // Check if asking about learnerships
  if (/learnership|training|apprentice|paid.*training|earn.*learn/.test(question)) {
    if (lang === 'xh') {
      return `📚 **Iilearnerships - Ufunde Kanti Unipakamele!**\n\nAyoba! Iqela lokuqeqeshwa okuhlawulelwayo. 🎯\n\n**Ndingakunceda:**\n• "Uthini i-learnership?"\n• "Ngubani onokufaka isicelo?"\n• "Ini imithwalo elungileyo?"\n• "Ndifumana aphi i-learnership yama-IT?"\n\n**Buza umbuzo wakho, ndiza kwanelisa ngolunga!** 💡`;
    }
    
    return `📚 **Learnerships - Earn While You Learn!**\n\nPaid training is a game-changer. 🎯\n\n**I can help with:**\n• "What exactly is a learnership?"\n• "Who can apply?"\n• "What fields are available?"\n• "How do I find IT learnerships?"\n\n**Ask your question, and I'll help you find a match!** 💡`;
  }
  
  // Check if asking about CV/Resume
  if (/cv|resume|profile|application|letter|cover letter|linkedin/.test(question)) {
    if (lang === 'xh') {
      return `📄 **CV kunye neResume!**\n\nNdingakunceda:\n• Isakhiwo se-CV elungile\n• Ukufaka ntoni kwicandelo ngalinye\n• Indlela yokubhala inkcazo enobunzima\n• Iingcebiso zokubaluleka\n• Ifomathi yobuchwephesha\n\n**Ndingakunceda njani?** 💡`;
    }
    
    return `📄 **CV & Resume Help!**\n\nI can assist with:\n• CV structure and format\n• What to include in each section\n• How to write compelling descriptions\n• Tips for standing out\n• Professional formatting\n\n**What do you need help with?** 💡`;
  }
  
  // Generic contextual fallback
  if (lang === 'xh') {
    return `Umbuzo wakho uyinteresting! 🤔\n\nNdingakunceda ngcono ukuba undichaze:\n• **Yintoni into endifuna ukwazi?** (Career, Health, Business, Bursary, etc)\n• **Indawo oyisuka kuyo?** (Mthatha, Port Elizabeth, East London, njl)\n• **Ubingu-sisimu sokufunda?** (Grade 12, Completed, njl)\n\n**Ngoko ndinokubhala iingcebiso ezimvumiselwe kwiprrofayile yakho.** 💡\n\nOkanye khetha enye:\n• 🎓 Ukufunda & Iibursary\n• 🚀 Ukuqalisa Ubhizinisi\n• 🏥 Izempilo\n• 💼 Imisebenzi`;
  }
  
  return `That's an interesting question! 🤔\n\nTo give you the best help, I'd like to know:\n• **What's your main goal?** (Career, Health, Business, Bursary, etc)\n• **Where are you based?** (Your city/town)\n• **What's your education level?** (Grade 12, Completed, etc)\n\n**With that info, I can give you personalized suggestions.** 💡\n\nOr pick one of these:\n• 🎓 Studying & Bursaries\n• 🚀 Starting a Business\n• 🏥 Health & Wellness\n• 💼 Finding Work`;
};

// ============================================================================
// OPPORTUNITY & COURSE GUIDANCE FLOW - INTELLIGENT MULTI-STEP
// ============================================================================
const handleOpportunityFlow = (question, language) => {
  const profile = conversationManager.userProfile;
  const lang = language === 'xh' ? 'xh' : 'en';
  
  // Initialize opportunity flow if not already done
  if (profile.opportunityFlow === undefined) {
    profile.opportunityFlow = { step: 0, grade: null, interest: null, courses: [] };
  }
  
  const flow = profile.opportunityFlow;
  
  // STEP 1: Ask for grade
  if (flow.step === 0) {
    flow.step = 1;
    
    if (lang === 'xh') {
      return `Ayoba! Uyiplanile kwizakho. 🎓 Ufumane amathuba efanelekela kwiprrofayile yakho.\n\n**Ibanga elingezanzi olipakamile lokho okupakamile?**\n• Grade 9\n• Grade 10\n• Grade 11\n• Grade 12\n• Enye (Ihighlighted, diploma, njl)\n\n**Ndichaze ibanga lakho:**`;
    }
    
    return `Awesome! Planning your future is a big step. 🎓 To find the perfect opportunities for you, I just need a quick picture of your situation.\n\n**What's the highest grade you've completed?**\n• Grade 9\n• Grade 10\n• Grade 11\n• Grade 12\n• Other (Diploma, Higher Cert, etc?)\n\n**Tell me your grade:**`;
  }
  
  // STEP 2: Ask for interest area
  else if (flow.step === 1) {
    // Extract and save grade
    if (/grade\s*9|nine/.test(question)) flow.grade = 'Grade 9';
    else if (/grade\s*10|ten/.test(question)) flow.grade = 'Grade 10';
    else if (/grade\s*11|eleven/.test(question)) flow.grade = 'Grade 11';
    else if (/grade\s*12|twelve|matric|passed/.test(question)) flow.grade = 'Grade 12';
    else flow.grade = question.trim();
    
    flow.step = 2;
    
    if (lang === 'xh') {
      return `✅ **${flow.grade} - Excellent!**\n\n**Ngamanye amaxesha ezileyo ezikhangela?**\n\n• 💻 **I-Tech & Khompyuter** - IT, Web, Coding, App Dev\n• 🛠️ **Izakhono-zokusebenza** - Electrical, Plumbing, Mechanic, Welding\n• 👥 **Abantu** - Nursing, Social Work, Teaching, Counseling\n• 📊 **Izindleko & Ubhizinisi** - Business, Accounting, HR, Admin\n• 🎨 **Ubugcisa & Umdali** - Design, Art, Music, Media, Video\n\n**Khetha enye:**`;
    }
    
    return `✅ **${flow.grade} - Great!**\n\n**Which of these areas sounds most interesting to you?**\n\n• 💻 **Tech & Computers** - IT, Web, Coding, App Dev\n• 🛠️ **Hands-on & Practical** - Electrical, Plumbing, Mechanic, Welding\n• 👥 **Working with People** - Nursing, Social Work, Teaching, Counseling\n• 📊 **Numbers & Business** - Business, Accounting, HR, Admin\n• 🎨 **Creative & Design** - Design, Art, Music, Media, Video\n\n**Pick one:**`;
  }
  
  // STEP 3: Generate recommendations
  else if (flow.step === 2) {
    // Extract and save interest
    if (/tech|computer|coding|it|web|app|software|cyber|programming/.test(question)) {
      flow.interest = 'Tech & IT';
    } else if (/practical|electrical|plumbing|mechanic|hand|tool|craft|trade|welding|fitting/.test(question)) {
      flow.interest = 'Trades & Practical';
    } else if (/people|nursing|social|teaching|health|help|care|counsel|psychology/.test(question)) {
      flow.interest = 'People-Focused';
    } else if (/business|accounting|finance|number|admin|hr|manage|office/.test(question)) {
      flow.interest = 'Business & Admin';
    } else if (/creative|art|design|music|visual|media|photo|draw|animation|video/.test(question)) {
      flow.interest = 'Creative & Design';
    } else {
      flow.interest = 'Tech & IT'; // Default
    }
    
    flow.step = 3;
    return generateOpportunityRecommendations(flow.grade, flow.interest, lang);
  }
  
  // If already completed flow, ask if they want more info
  else if (flow.step === 3) {
    if (lang === 'xh') {
      return `Unemibuzo ethile malunga nale ndlela? Okanye ndingakunceda ngento enye? 💡`;
    }
    return `Do you have questions about any of these paths? Or can I help with something else? 💡`;
  }
  
  return `Let me help you find the perfect opportunity! What's your main interest?`;
};

// Generate detailed opportunity recommendations
const generateOpportunityRecommendations = (grade, interest, lang) => {
  const recommendations = {
    'Tech & IT': {
      en: `🎯 **Path 1: IT Learnership (NQF Level 5)**
Duration: 12-18 months (PAID!)
Funding: NSFAS & Company Bursaries
Where: Port Elizabeth IT Hub, Online, East London Tech Centre
Salary Potential: R15,000 - R25,000 starting
Companies: Microsoft, Google, Vodacom, MTN

🎯 **Path 2: Software Development (Diploma)**
Duration: 3 years
Funding: NSFAS, Microsoft Scholarships, Google Cloud
Where: Buffalo City TVET College, Nelson Mandela University
Salary Potential: R20,000 - R40,000+
Entry: Grade 12 + Math preferred

🎯 **Path 3: Cybersecurity (Certificate)**
Duration: 6-12 months
Funding: Coursera, Udacity, Online Bursaries
Where: Online (Flexible)
Salary Potential: R18,000 - R30,000+
Entry: No specific requirements`,
      xh: `🎯 **Indlela 1: I-IT Learnership (NQF Level 5)**
Ixesha: Iinyanga ezi-12-18 (UBLUNGULELWA!)
Inkxaso-mali: NSFAS & Company Bursaries
Aphi: Port Elizabeth IT Hub, Online, East London
Indenero: R15,000 - R25,000 kuqala
Iinkampani: Microsoft, Google, Vodacom, MTN

🎯 **Indlela 2: Software Development (Diploma)**
Ixesha: Iminyaka emi-3
Inkxaso-mali: NSFAS, Microsoft, Google
Aphi: Buffalo City TVET, Nelson Mandela University
Indenero: R20,000 - R40,000+
Iimfuno: Grade 12 + Mathematics

🎯 **Indlela 3: Cybersecurity (Certificate)**
Ixesha: Iinyanga ezi-6-12
Inkxaso-mali: Coursera, Udacity, Online
Aphi: Online (Inokuyenzwa ngaxeshanye)
Indenero: R18,000 - R30,000+
Iimfuno: Akukho ekhulunyeni`
    },
    'Trades & Practical': {
      en: `🎯 **Path 1: Electrical Installation Learnership**
Duration: 24 months (PAID!)
Funding: SETA Learnership (You earn while learning!)
Where: Eastern Cape TVET Colleges
Salary During: R4,000 - R6,000/month
After: R25,000 - R45,000+
Entry: Grade 10+

🎯 **Path 2: Plumbing Apprenticeship**
Duration: 12-24 months
Funding: SETA, Department of Labour
Where: Local Training Centres, Port Elizabeth
Salary During: R3,500 - R5,500/month
After: R20,000 - R40,000+

🎯 **Path 3: Welding & Metal Work**
Duration: 12 months
Funding: NSFAS, SETA, Local Grants
Where: Technical Colleges
Salary Potential: R12,000 - R25,000+
Entry: Grade 9+, Physical fitness required`,
      xh: `🎯 **Indlela 1: Electrical Installation Learnership**
Ixesha: Iinyanga ezi-24 (UBLUNGULELWA!)
Inkxaso-mali: SETA (Ubipakamele ukufunda!)
Aphi: Eastern Cape TVET
Indenero eXeshanye: R4,000 - R6,000/month
Kamva: R25,000 - R45,000+
Iimfuno: Grade 10+

🎯 **Indlela 2: Plumbing Apprenticeship**
Ixesha: Iinyanga ezi-12-24
Inkxaso-mali: SETA
Aphi: Local Training Centres, Port Elizabeth
Indenero eXeshanye: R3,500 - R5,500/month
Kamva: R20,000 - R40,000+

🎯 **Indlela 3: Welding & Metal**
Ixesha: Iinyanga ezi-12
Inkxaso-mali: NSFAS, SETA
Aphi: Technical Colleges
Indenero: R12,000 - R25,000+
Iimfuno: Grade 9+`
    },
    'People-Focused': {
      en: `🎯 **Path 1: Nursing (Professional Nurse)**
Duration: 4 years
Funding: NSFAS (High priority!)
Where: Walter Sisulu University, TVET Colleges
Salary Potential: R22,000 - R50,000+
Entry: Grade 12 + Life Sciences & English
Very high demand!

🎯 **Path 2: Social Work**
Duration: 3 years (Bachelor)
Funding: NSFAS, NGO Bursaries
Where: Nelson Mandela University, University of Fort Hare
Salary Potential: R18,000 - R35,000+
Entry: Grade 12 + English

🎯 **Path 3: Counselling & Psychology (Diploma)**
Duration: 2-3 years
Funding: NSFAS, Bursaries
Where: Universities & TVET Colleges
Salary Potential: R20,000 - R40,000+
Entry: Grade 12 + Psychology interest`,
      xh: `🎯 **Indlela 1: Nursing (Professional Nurse)**
Ixesha: Iminyaka emi-4
Inkxaso-mali: NSFAS (High priority!)
Aphi: Walter Sisulu University, TVET
Indenero: R22,000 - R50,000+
Iimfuno: Grade 12 + Life Sciences
Kumiselekile kakhulu!

🎯 **Indlela 2: Social Work**
Ixesha: Iminyaka emi-3
Inkxaso-mali: NSFAS, NGO
Aphi: Nelson Mandela University, Fort Hare
Indenero: R18,000 - R35,000+
Iimfuno: Grade 12 + English

🎯 **Indlela 3: Counselling & Psychology (Diploma)**
Ixesha: Iminyaka emi-2-3
Inkxaso-mali: NSFAS
Aphi: Universities & TVET
Indenero: R20,000 - R40,000+
Iimfuno: Grade 12 + Interest in Psychology`
    },
    'Business & Admin': {
      en: `🎯 **Path 1: Business Administration (Diploma)**
Duration: 2-3 years
Funding: NSFAS
Where: TVET Colleges, Universities
Salary Potential: R18,000 - R35,000+
Entry: Grade 12
Skills: Communication, Problem-solving, Organization

🎯 **Path 2: Accounting (National Certificate)**
Duration: 3 years
Funding: NSFAS, SAICA
Where: TVET, Colleges, Open Universities
Salary Potential: R20,000 - R45,000+
Entry: Grade 12 + Mathematics
High demand in all industries!

🎯 **Path 3: Project Management (Certificate)**
Duration: 6-12 months
Funding: Online, Coursera, LinkedIn Learning
Where: Online (Flexible, study at your pace)
Salary Potential: R25,000 - R50,000+
Entry: Any background welcome`,
      xh: `🎯 **Indlela 1: Business Administration (Diploma)**
Ixesha: Iminyaka emi-2-3
Inkxaso-mali: NSFAS
Aphi: TVET, Universities
Indenero: R18,000 - R35,000+
Iimfuno: Grade 12
Izakhono: Communication, Problem-solving

🎯 **Indlela 2: Accounting (National Certificate)**
Ixesha: Iminyaka emi-3
Inkxaso-mali: NSFAS, SAICA
Aphi: TVET, Colleges, Open Universities
Indenero: R20,000 - R45,000+
Iimfuno: Grade 12 + Mathematics
Kumiselekile kakhulu!

🎯 **Indlela 3: Project Management (Certificate)**
Ixesha: Iinyanga ezi-6-12
Inkxaso-mali: Online, Coursera
Aphi: Online (Funda ngokuthe nkanya)
Indenero: R25,000 - R50,000+
Iimfuno: Akukho ekhulunyeni`
    },
    'Creative & Design': {
      en: `🎯 **Path 1: Graphic Design (Diploma)**
Duration: 2-3 years
Funding: NSFAS, Creative Funds
Where: TVET Colleges, Design Schools, Online
Salary Potential: R15,000 - R40,000+
Entry: Grade 12 + Portfolio
Growing field with high demand!

🎯 **Path 2: Digital Marketing (Certificate)**
Duration: 6-12 months
Funding: Coursera, LinkedIn Learning, Google Digital Garage
Where: Online (Flexible)
Salary Potential: R16,000 - R35,000+
Entry: No prerequisites, anyone can start
Very marketable skill!

🎯 **Path 3: Video Production & Animation (Diploma)**
Duration: 1-2 years
Funding: Online Scholarships, NSFAS
Where: Online, Local Studios, Universities
Salary Potential: R18,000 - R45,000+
Entry: Grade 10+, passion for creativity`,
      xh: `🎯 **Indlela 1: Graphic Design (Diploma)**
Ixesha: Iminyaka emi-2-3
Inkxaso-mali: NSFAS, Creative Funds
Aphi: TVET, Design Schools, Online
Indenero: R15,000 - R40,000+
Iimfuno: Grade 12 + Portfolio
Inzulu ekuthuthuka ngokukhawuleza!

🎯 **Indlela 2: Digital Marketing (Certificate)**
Ixesha: Iinyanga ezi-6-12
Inkxaso-mali: Coursera, LinkedIn, Google
Aphi: Online (Funda ngokuthe nkanya)
Indenero: R16,000 - R35,000+
Iimfuno: Akukho ekhulunyeni
Izakhono ezikhuriwe!

🎯 **Indlela 3: Video Production & Animation**
Ixesha: Iminyaka enye-2
Inkxaso-mali: Online Scholarships, NSFAS
Aphi: Online, Studios, Universities
Indenero: R18,000 - R45,000+
Iimfuno: Grade 10+, love for creativity`
    }
  };
  
  const baseResponse = recommendations[interest]?.[lang] || recommendations['Tech & IT'][lang];
  
  if (lang === 'xh') {
    return `✅ **IINGCEBISO EZIFANELEKELA KUWE**\n\n${baseResponse}\n\n🚀 **ISICWANGCISO SAKHO SOKUQALA:**\n\n• **Iviki elinye**: Khangela iimfuno kwiphepha lethu lamathuba\n• **Iviki lesibini**: Qalisa i-NSFAS application (www.nsfas.org.za)\n• **Inyanga**: Faka isicelo kwiiprogramu ezi-3-5 ukuze zingeze izinto\n\n**Ngubani na enye into oyifuna ukunazi malunga nale indlela?** 💡`;
  }
  
  return `✅ **YOUR TOP OPPORTUNITIES**\n\n${baseResponse}\n\n🚀 **YOUR ACTION PLAN:**\n\n• **This week**: Check the requirements on our Opportunities page\n• **Next week**: Start your NSFAS application (www.nsfas.org.za)\n• **This month**: Apply to 3-5 programmes to increase your chances\n\n**Want to know more about any of these paths?** 💡`;
};

// Get page key from pathname
export const getPageKey = (pathname) => {
  // Remove leading slash and convert to lowercase
  const path = pathname.replace(/^\//, '').toLowerCase();
  
  // Map routes to page keys
  const pageMap = {
    '': 'home',
    'home': 'home',
    'opportunities': 'opportunities',
    'bursaries': 'bursaries',
    'learnerships': 'learnerships',
    'careers': 'careers',
    'resume-builder': 'resume-builder',
    'events': 'events',
    'forums': 'forums',
    'business-funding': 'business-funding',
    'knowledge-base': 'knowledge-base',
    'success-stories': 'success-stories',
    'profile': 'profile',
    'login': 'login',
    'register': 'register',
    'chatbot': 'home',
    'medical-chat': 'home'
  };
  
  return pageMap[path] || 'home';
};

// ============================================================================
// ADVANCED FEATURES: Conversation Recall, Deadline Tracking, Opportunity Matching
// ============================================================================

export const advancedChatbotFeatures = {
  // Recall previous conversation
  recallConversation: (topics = null) => {
    const history = conversationManager.conversationHistory;
    if (history.length === 0) return null;
    
    let relevantMessages = history;
    if (topics && Array.isArray(topics)) {
      relevantMessages = history.filter(msg => 
        topics.some(topic => msg.user.toLowerCase().includes(topic.toLowerCase()))
      );
    }
    
    if (relevantMessages.length === 0) return null;
    
    const summary = relevantMessages.map(msg => `• ${msg.user}`).join('\n');
    return `Here's what we discussed:\n\n${summary}`;
  },
  
  // Track application deadlines
  deadlineTracker: {
    deadlines: [],
    
    addDeadline: (opportunityName, deadline, type = 'bursary') => {
      advancedChatbotFeatures.deadlineTracker.deadlines.push({
        name: opportunityName,
        deadline: new Date(deadline),
        type: type,
        alertSent: false
      });
    },
    
    checkUpcomingDeadlines: (daysUntil = 7) => {
      const today = new Date();
      const upcoming = [];
      
      advancedChatbotFeatures.deadlineTracker.deadlines.forEach(item => {
        const daysLeft = Math.floor((item.deadline - today) / (1000 * 60 * 60 * 24));
        if (daysLeft > 0 && daysLeft <= daysUntil && !item.alertSent) {
          upcoming.push({
            ...item,
            daysLeft: daysLeft
          });
          item.alertSent = true;
        }
      });
      
      return upcoming;
    },
    
    generateDeadlineAlert: (language = 'en') => {
      const upcoming = advancedChatbotFeatures.deadlineTracker.checkUpcomingDeadlines();
      if (upcoming.length === 0) return null;
      
      if (language === 'xh') {
        let alert = `🚨 **IVALA LIKWABAFILEYO!**\n\n`;
        upcoming.forEach(item => {
          alert += `⏰ **${item.name}** - Zivulwa kwiintsuku ezi-${item.daysLeft}\n`;
        });
        alert += `\n**Ndibu, yenza ngoku!** 💨`;
        return alert;
      }
      
      let alert = `🚨 **UPCOMING DEADLINE ALERTS!**\n\n`;
      upcoming.forEach(item => {
        alert += `⏰ **${item.name}** - Closes in ${item.daysLeft} days\n`;
      });
      alert += `\n**Don't miss out - act now!** 💨`;
      return alert;
    }
  },
  
  // Intelligent opportunity matching based on user profile
  opportunityMatcher: {
    matchOpportunities: (opportunities = []) => {
      const profile = conversationManager.userProfile;
      const matches = [];
      
      opportunities.forEach(opp => {
        let matchScore = 0;
        
        // Location match
        if (profile.location && opp.location && 
            profile.location.toLowerCase() === opp.location.toLowerCase()) {
          matchScore += 30;
        }
        
        // Age match
        if (profile.age && opp.ageRange) {
          if (profile.age >= opp.ageRange.min && profile.age <= opp.ageRange.max) {
            matchScore += 25;
          }
        }
        
        // Education level match
        if (profile.educationLevel && opp.requiredEducation) {
          if (opp.requiredEducation.toLowerCase().includes(profile.educationLevel.toLowerCase())) {
            matchScore += 25;
          }
        }
        
        // Interest match
        if (profile.interests.length > 0 && opp.tags) {
          const interestMatches = profile.interests.filter(interest =>
            opp.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
          );
          matchScore += interestMatches.length * 10;
        }
        
        if (matchScore > 0) {
          matches.push({
            ...opp,
            matchScore: Math.min(matchScore, 100)
          });
        }
      });
      
      return matches.sort((a, b) => b.matchScore - a.matchScore);
    }
  },
  
  // Emotional support based on detected emotion
  emotionalSupport: {
    getEmpathyResponse: (emotion, language = 'en') => {
      const responses = {
        stressed: {
          en: `I can see you're feeling under pressure right now. 💙 That's completely normal - many young people go through this!\n\n**Here's what might help:**\n• Break down big tasks into smaller steps\n• Focus on one thing at a time\n• Take breaks when you need them\n• Remember: There's no rush to figure everything out\n\nLet's tackle this together. **What's your main concern right now?** I can help make it manageable.`,
          xh: `Ndibona ukuba uxinzelelo kwangoku. 💙 Oku kuqhelekile - abantu abatsha abaninzi badubula koku!\n\n**Oku kunokukunceda:**\n• Yikola izinto ezinkulu ibe yimiqolo emincinci\n• Xuba indlela enye ngexesha\n• Zisulele ixesha ukuba ufuna\n• Khumbula: Akukho kubanga kukhawulezana\n\nSa sizenze ngabanye. **Yintoni enkulu ekubangela uxinzelelo?** Ndingoyenza ilula.`
        },
        frustrated: {
          en: `I understand this is frustrating. 😔 It's okay to feel frustrated when things aren't going smoothly.\n\n**Let's simplify:**\n• What's the exact problem?\n• What have you already tried?\n• What would make this easier for you?\n\n**I'm here to help make sense of this.** Let's break it down together.`,
          xh: `Ndiqonda ukuba oku kunoxinzelelo. 😔 Kulungile ukuva ubuthathaka xa izinto azikho ngqo.\n\n**Siyenze ilula:**\n• Yintoni inxaki ekhulunyeni?\n• Yintoni oyizamile kwaye?\n• Yintoni enokoyenza ilula?\n\n**Ndilapha ukukunceda. Silandele. Siyiyenzile ilula ngabanye.**`
        },
        enthusiastic: {
          en: `I love your energy! 🚀 That enthusiasm will take you far!\n\n**Let's channel that into action:**\n• What opportunity excites you most?\n• What's the first step you want to take?\n• How can I help you move forward?\n\n**Your positive attitude is already half the battle.** Let's make it happen!`,
          xh: `Ndiyathanda umdla wakho! 🚀 Lo mdla uya kukukwaza kude!\n\n**Siwenze yumsebenzi:**\n• Iliphi na ithuba elinkuthandisa kakhulu?\n• Yintoni enqanawa yokuqala oyifuna ukwenza?\n• Ndingakunceda njani ukuqhubeka?\n\n**Isimo sakho esihle sesivumelwane neshumi elimbalwa. Siyenzele oku!**`
        }
      };
      
      return responses[emotion]?.[language] || null;
    }
  },
  
  // Purpose identification - determine what user wants
  identifyPurpose: (message) => {
    const purposes = {
      searching: /(?:look|search|find|browse|explore|discover|show me)/i,
      applying: /(?:apply|application|submit|register|apply for|want to apply)/i,
      health: /(?:health|medical|sick|doctor|clinic|emergency|mental|stress|suicide)/i,
      guidance: /(?:how|guide|help|teach|explain|tell me|advice|tips|suggest)/i,
      business: /(?:business|startup|entrepreneur|idea|business plan|funding)/i,
      course: /(?:course|study|career|degree|diploma|learnership|training)/i
    };
    
    let detectedPurposes = [];
    for (const [purpose, regex] of Object.entries(purposes)) {
      if (regex.test(message)) {
        detectedPurposes.push(purpose);
      }
    }
    
    return detectedPurposes.length > 0 ? detectedPurposes : ['general'];
  }
};

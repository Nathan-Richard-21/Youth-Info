// ============================================================================
// SMART CHATBOT WITH CONVERSATION FLOW & STATE MANAGEMENT
// ============================================================================

/**
 * Conversation State Manager
 * Tracks the current conversation flow, user responses, and context
 */
export const conversationState = {
  currentFlow: null, // 'courses', 'business', 'health', 'funding', 'job', 'cv'
  currentStep: 0,
  collectedData: {},
  lastTopic: null,
  lastQuestion: null,
  lastResponse: null,
  conversationHistory: [],
  currentPage: 'home', // Track which page user is on
  userProfile: {
    name: null,
    age: null,
    location: null,
    education: null,
    interests: [],
  },

  // Update current page
  setCurrentPage(page) {
    this.currentPage = page || 'home';
    console.log('📍 Smart Chatbot: User is now on page:', this.currentPage);
  },

  // Reset conversation state
  reset() {
    this.currentFlow = null;
    this.currentStep = 0;
    this.collectedData = {};
  },

  // Check if user is answering a follow-up question
  isInFlow() {
    return this.currentFlow !== null && this.currentStep > 0;
  },

  // Move to next step in conversation
  nextStep() {
    this.currentStep++;
  },

  // Store collected data
  storeData(key, value) {
    this.collectedData[key] = value;
  },

  // Add to conversation history
  addToHistory(userMsg, botMsg) {
    this.conversationHistory.push({
      user: userMsg,
      bot: botMsg,
      timestamp: new Date(),
      flow: this.currentFlow,
      step: this.currentStep
    });
    this.lastQuestion = userMsg;
    this.lastResponse = botMsg;
  }
};

/**
 * Intent Recognition - Identifies what the user wants
 */
export const intentRecognition = {
  // Keywords for each intent
  intents: {
    courses: {
      keywords: ['course', 'study', 'what should i study', 'what courses', 'apply to', 
                 'which course', 'career path', 'education', 'degree', 'diploma', 
                 'what to study', 'study options', 'programme', 'qualification'],
      variations: ['what course', 'which course', 'what should i apply']
    },
    business: {
      keywords: ['start business', 'business idea', 'begin business', 'own business',
                 'entrepreneur', 'side hustle', 'make money', 'startup', 'sell',
                 'business plan', 'how to start', 'create business', 'launch business'],
      variations: ['start a business', 'starting business', 'want to start']
    },
    funding: {
      keywords: ['nsfas', 'bursary', 'scholarship', 'funding', 'financial aid',
                 'pay for university', 'afford university', 'study money', 'grants',
                 'sponsor', 'tuition fees', 'student funding'],
      variations: ['how to fund', 'funding my studies', 'nsfas application']
    },
    jobs: {
      keywords: ['job', 'work', 'employment', 'intern', 'internship', 'hiring',
                 'career', 'recruitment', 'find work', 'looking for work', 'get hired'],
      variations: ['find a job', 'looking for job', 'job opportunities']
    },
    health: {
      keywords: ['sick', 'ill', 'depression', 'anxiety', 'stress', 'mental health',
                 'feeling sad', 'suicidal', 'help me', 'clinic', 'hospital', 'doctor',
                 'health', 'medical', 'unwell', 'pain', 'symptom'],
      variations: ['i feel sick', 'feeling depressed', 'mental health help']
    },
    cv: {
      keywords: ['cv', 'resume', 'cover letter', 'application letter', 'write cv',
                 'cv help', 'cv tips', 'how to write', 'cv format', 'cv template'],
      variations: ['help with cv', 'write a cv', 'cv writing']
    }
  },

  // Identify intent from user message
  identify(message) {
    const lowerMsg = message.toLowerCase().trim();
    
    // Check if user is in a conversation flow
    if (conversationState.isInFlow()) {
      return conversationState.currentFlow;
    }

    // Match against keywords
    let bestMatch = null;
    let highestScore = 0;

    for (const [intent, data] of Object.entries(this.intents)) {
      let score = 0;
      
      // Check keywords
      for (const keyword of data.keywords) {
        if (lowerMsg.includes(keyword)) {
          score += 2;
        }
      }

      // Check variations
      for (const variation of data.variations) {
        if (lowerMsg.includes(variation)) {
          score += 3;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = intent;
      }
    }

    // If no strong match, return null
    return highestScore >= 2 ? bestMatch : null;
  }
};

/**
 * Conversation Flows - Multi-step guided conversations
 */
export const conversationFlows = {
  
  // COURSES FLOW - "What courses should I apply to?"
  courses: {
    intro: `Good question! Let's figure out what fits you. I'll ask a few quick questions about your subjects, interests, and goals, then I'll suggest courses you can look at and where to apply. 😊

Let's start:`,
    
    steps: [
      {
        question: "**What is the highest grade or qualification you have so far?**\n(For example: Grade 12, Grade 11, Diploma, Matric with exemption)",
        field: 'education',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**Which subjects or topics do you enjoy or feel strongest in?**\n(For example: Math, Science, Languages, Art, etc.)",
        field: 'subjects',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      },
      {
        question: "**What kind of work sounds more like you?**\n\n1️⃣ Working with people (teaching, nursing, sales)\n2️⃣ Working with computers (IT, programming, design)\n3️⃣ Working with tools/hands-on (engineering, mechanics)\n4️⃣ Something creative (art, media, writing)\n\nJust type the number or describe it!",
        field: 'workType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**Do you prefer a shorter course (6–12 months) or a longer one (2–4 years)?**\n(Just say 'short' or 'long', or tell me your preference)",
        field: 'duration',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**Do you need low-cost or free options, or can you pay some fees?**\n(Be honest - this helps me find the right fit!)",
        field: 'budget',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**Which town or province are you in, or where would you like to study?**\n(For example: Port Elizabeth, East London, Mthatha, Eastern Cape)",
        field: 'location',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      }
    ],

    generateResponse: (data) => {
      const { education, subjects, workType, duration, budget, location } = data;
      
      let response = `### Based on what you shared:\n\n`;
      response += `📚 **Your highest grade:** ${education}\n`;
      response += `💡 **Interests:** ${subjects}\n`;
      response += `🎯 **Work style:** ${workType}\n`;
      response += `⏱️ **Preferred length:** ${duration}\n`;
      response += `💰 **Budget:** ${budget}\n`;
      response += `📍 **Location:** ${location}\n\n`;

      response += `---\n\n### 🎓 Here are some course types to explore:\n\n`;

      // Smart course recommendations based on work type
      const workTypeLower = workType.toLowerCase();
      if (workTypeLower.includes('people') || workTypeLower.includes('1')) {
        response += `**1. Social Work / Community Development**\n`;
        response += `- Duration: 3-4 years (Degree) or 1 year (Certificate)\n`;
        response += `- Where: Nelson Mandela University, Walter Sisulu University\n`;
        response += `- Funding: NSFAS, Government bursaries\n\n`;

        response += `**2. Teaching / Education**\n`;
        response += `- Duration: 4 years (B.Ed) or 1 year (PGCE)\n`;
        response += `- Where: Rhodes University, WSU, UFH\n`;
        response += `- Funding: FUNZA Lushaka Bursary (fully funded)\n\n`;
      } else if (workTypeLower.includes('computer') || workTypeLower.includes('2')) {
        response += `**1. Information Technology**\n`;
        response += `- Duration: 12-18 months (Learnership) or 3 years (Diploma)\n`;
        response += `- Where: Buffalo City TVET, Port Elizabeth TVET, Online\n`;
        response += `- Funding: NSFAS, Company bursaries (Microsoft, Google)\n\n`;

        response += `**2. Software Development**\n`;
        response += `- Duration: 3 years (Diploma/Degree)\n`;
        response += `- Where: Nelson Mandela University, CPUT\n`;
        response += `- Funding: NSFAS, Tech bursaries\n\n`;
      } else if (workTypeLower.includes('tools') || workTypeLower.includes('hands') || workTypeLower.includes('3')) {
        response += `**1. Engineering (Mechanical/Electrical)**\n`;
        response += `- Duration: 4 years (Degree) or 3 years (Diploma)\n`;
        response += `- Where: Nelson Mandela University, CPUT\n`;
        response += `- Funding: NSFAS, ESKOM, Transnet bursaries\n\n`;

        response += `**2. Artisan Training (Plumbing, Electrical, Welding)**\n`;
        response += `- Duration: 2-3 years (Apprenticeship)\n`;
        response += `- Where: TVET Colleges, Industry training\n`;
        response += `- Funding: SETA funding, Company sponsorship\n\n`;
      } else if (workTypeLower.includes('creative') || workTypeLower.includes('4')) {
        response += `**1. Graphic Design / Multimedia**\n`;
        response += `- Duration: 2-3 years (Diploma)\n`;
        response += `- Where: CPUT, Private colleges, Online\n`;
        response += `- Funding: NSFAS, Design bursaries\n\n`;

        response += `**2. Media Studies / Journalism**\n`;
        response += `- Duration: 3 years (Degree)\n`;
        response += `- Where: Rhodes University, Nelson Mandela University\n`;
        response += `- Funding: NSFAS, Media bursaries\n\n`;
      }

      response += `---\n\n### 📋 I can also show you:\n\n`;
      response += `✅ Links to colleges/universities that offer these courses\n`;
      response += `✅ Bursary or funding options (including NSFAS)\n`;
      response += `✅ Tips on how to apply (deadlines, documents, etc.)\n`;
      response += `✅ Alternative courses if these don't fit\n\n`;
      
      response += `**What would you like to know more about?** 💬\n`;
      response += `(You can ask about specific courses, funding, or application tips!)`;

      return response;
    }
  },

  // BUSINESS FLOW - "I want to start a business"
  business: {
    intro: `That's an exciting goal! 🚀 Let's break it into simple steps so you know where to start. I'll ask a few quick questions and then suggest practical first actions you can take.

Let's begin:`,
    
    steps: [
      {
        question: "**What kind of business are you thinking about?**\n(For example: selling products, offering services, online business, food business, etc.)",
        field: 'businessType',
        validate: (answer) => answer.length > 3,
        extract: (answer) => answer.trim()
      },
      {
        question: "**Is this a side hustle while you study/work, or do you want it to become your main income?**\n(Just say 'side hustle' or 'main income')",
        field: 'timeCommitment',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**How much money (if any) can you start with?**\n(Be honest - even 'R0' is fine! Many successful businesses started with nothing)",
        field: 'startingCapital',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**Do you already have any customers or people who said they would buy from you?**\n(Yes/No, or tell me about them)",
        field: 'customerBase',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**Which town or area are you based in?**\n(So I can show you local programmes/support)",
        field: 'location',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      }
    ],

    generateResponse: (data) => {
      const { businessType, timeCommitment, startingCapital, customerBase, location } = data;
      
      let response = `### Based on what you shared:\n\n`;
      response += `💼 **Business type:** ${businessType}\n`;
      response += `⏰ **Time:** ${timeCommitment}\n`;
      response += `💰 **Starting budget:** ${startingCapital}\n`;
      response += `👥 **Customers:** ${customerBase}\n`;
      response += `📍 **Location:** ${location}\n\n`;

      response += `---\n\n### 🎯 Here are your FIRST STEPS:\n\n`;

      response += `**1. Write down a simple business idea** 📝\n`;
      response += `Answer these 3 questions:\n`;
      response += `- What exactly will you sell?\n`;
      response += `- Who will buy it? (be specific: students, parents, businesses?)\n`;
      response += `- Why would they choose YOU instead of someone else?\n\n`;

      response += `**2. Talk to potential customers** 💬\n`;
      response += `- Find 3-5 people who could be your customers\n`;
      response += `- Ask if they would ACTUALLY PAY for this\n`;
      response += `- Find out how much they'd be willing to pay\n\n`;

      response += `**3. Start small - TEST your idea** 🧪\n`;
      response += `- Don't spend a lot of money upfront\n`;
      response += `- Try with a few customers first\n`;
      response += `- Learn what works and what doesn't\n`;
      response += `- Adjust based on feedback\n\n`;

      response += `**4. Check local support programmes** 🏢\n`;
      if (location.toLowerCase().includes('eastern cape') || 
          location.toLowerCase().includes('port elizabeth') ||
          location.toLowerCase().includes('east london')) {
        response += `In ${location}, check:\n`;
        response += `- Eastern Cape Development Corporation (ECDC)\n`;
        response += `- NYDA (National Youth Development Agency)\n`;
        response += `- SEDA (Small Enterprise Development Agency)\n`;
        response += `- Local municipality youth programmes\n\n`;
      } else {
        response += `- NYDA (National Youth Development Agency)\n`;
        response += `- SEDA (Small Enterprise Development Agency)\n`;
        response += `- Local municipality youth programmes\n`;
        response += `- Business incubators in your area\n\n`;
      }

      // Additional advice based on starting capital
      if (startingCapital.includes('0') || startingCapital.toLowerCase().includes('no') || 
          startingCapital.toLowerCase().includes('nothing')) {
        response += `\n💡 **Starting with little/no money?**\n`;
        response += `- Offer services instead of products (no upfront cost)\n`;
        response += `- Use social media for free marketing\n`;
        response += `- Look for "cash on delivery" suppliers\n`;
        response += `- Apply for youth funding (NYDA, small grants)\n\n`;
      }

      response += `---\n\n`;
      response += `**Ready to take action?** I can help you with:\n`;
      response += `✅ Finding funding sources\n`;
      response += `✅ Writing a simple business plan\n`;
      response += `✅ Marketing ideas on a budget\n`;
      response += `✅ Legal requirements (registration, permits)\n\n`;
      
      response += `**What would you like help with next?** 🚀`;

      return response;
    }
  },

  // HEALTH FLOW - "I feel sick" / "I have depression"
  health: {
    intro: `I'm sorry you're not feeling well. 💙 Your health and wellbeing are important. Let me help you get the right support.

First, let me understand better:`,
    
    steps: [
      {
        question: "**What are you experiencing right now?**\n(Mental health concerns, physical symptoms, or both? It's okay to share)",
        field: 'concern',
        validate: (answer) => answer.length > 3,
        extract: (answer) => answer.toLowerCase().trim()
      }
    ],

    generateResponse: (data) => {
      const { concern } = data;
      let response = '';

      // Detect if it's mental health or physical health
      const mentalHealthKeywords = ['depression', 'anxiety', 'stress', 'suicidal', 'sad', 'lonely', 'hopeless', 'mental'];
      const isMentalHealth = mentalHealthKeywords.some(kw => concern.includes(kw));

      if (isMentalHealth) {
        response += `### 💚 Mental Health Support\n\n`;
        response += `You're **not alone**, and reaching out is a sign of strength. Here's immediate help:\n\n`;

        response += `**🆘 CRISIS SUPPORT (24/7):**\n`;
        response += `- **Suicide Crisis Line:** 0800 567 567 (SADAG)\n`;
        response += `- **Lifeline:** 0861 322 322\n`;
        response += `- **SMS "HELP" to 31393** (Free counseling)\n\n`;

        response += `**📞 ONGOING SUPPORT:**\n`;
        response += `- **SADAG (Depression & Anxiety):** 0800 567 567\n`;
        response += `- **FAMSA Eastern Cape:** 043 743 5111\n`;
        response += `- Visit your nearest clinic for FREE counseling\n`;
        response += `- Talk to a trusted adult, teacher, or religious leader\n\n`;

        response += `**🏥 LOCAL CLINICS:**\n`;
        response += `Most public clinics offer mental health services:\n`;
        response += `- Confidential counseling\n`;
        response += `- Psychiatric evaluation if needed\n`;
        response += `- Medication if prescribed\n`;
        response += `- Support groups\n\n`;

        response += `**💪 WHAT YOU CAN DO NOW:**\n`;
        response += `1. Call one of the numbers above - they're free and confidential\n`;
        response += `2. Talk to someone you trust\n`;
        response += `3. Visit our Medical Chat for more resources\n`;
        response += `4. Remember: What you're feeling is real, and help is available\n\n`;

        response += `**Remember:** Mental health is part of overall health. Getting help is brave and necessary. 💙\n\n`;
      } else {
        response += `### 🏥 Medical Support\n\n`;
        response += `**IMMEDIATE ACTIONS:**\n\n`;

        // Check for emergency symptoms
        const emergencyKeywords = ['chest pain', 'cant breathe', 'severe pain', 'bleeding', 'unconscious', 'seizure'];
        const isEmergency = emergencyKeywords.some(kw => concern.includes(kw));

        if (isEmergency) {
          response += `⚠️ **THIS SOUNDS URGENT:**\n`;
          response += `- **Call 10177 (Ambulance) NOW**\n`;
          response += `- Or go to the nearest hospital emergency room\n`;
          response += `- Don't wait - this needs immediate attention\n\n`;
        }

        response += `**1. Visit a Clinic or Doctor** 🏥\n`;
        response += `- Find your nearest clinic\n`;
        response += `- Bring your ID for registration\n`;
        response += `- Most services at public clinics are FREE\n\n`;

        response += `**2. Emergency Contacts** 🚨\n`;
        response += `- **Ambulance:** 10177\n`;
        response += `- **Emergency:** 082 911\n`;
        response += `- **Poison Control:** 0861 555 777\n\n`;

        response += `**3. Healthcare Helplines** 📞\n`;
        response += `- **Eastern Cape Dept of Health:** 0800 032 364\n`;
        response += `- **HIV/TB Hotline:** 0800 012 322\n\n`;

        response += `**🔗 More Help Available:**\n`;
        response += `Visit our **Medical Chat Assistance** page for:\n`;
        response += `- Clinic locations near you\n`;
        response += `- Common symptoms guide\n`;
        response += `- Sexual health information\n`;
        response += `- Vaccination services\n\n`;
      }

      response += `---\n\n`;
      response += `**I'm here if you need more information.** You can ask me:\n`;
      response += `- "Where's the nearest clinic?"\n`;
      response += `- "Tell me about [specific condition]"\n`;
      response += `- "Mental health resources"\n\n`;
      response += `💙 **Take care of yourself. You matter.**`;

      return response;
    }
  }
};

/**
 * Smart Response Generator
 * Handles conversation flow and generates appropriate responses
 */
export const generateSmartResponse = (userMessage, currentPage = 'home') => {
  const state = conversationState;
  const lowerMsg = userMessage.toLowerCase().trim();
  
  // Update current page in state
  state.setCurrentPage(currentPage);

  // ===== PAGE-SPECIFIC QUESTION DETECTION =====
  // Check if user is asking about the current page they're on
  const pageKeywords = {
    home: ['this page', 'home page', 'main page', 'where am i', 'what is this'],
    opportunities: ['opportunities', 'this page', 'what opportunities', 'how to apply here'],
    bursaries: ['bursaries', 'this page', 'financial aid here', 'scholarships here'],
    learnerships: ['learnerships', 'this page', 'training here', 'apprenticeships'],
    careers: ['careers', 'this page', 'jobs here', 'career guidance'],
    'resume-builder': ['resume builder', 'this page', 'cv builder', 'build cv'],
    events: ['events', 'this page', 'workshops', 'webinars here'],
    forums: ['forums', 'this page', 'discussions', 'community'],
    'business-funding': ['business funding', 'this page', 'startup funding', 'entrepreneur'],
    'knowledge-base': ['knowledge base', 'this page', 'resources', 'guides'],
    'success-stories': ['success stories', 'this page', 'testimonials'],
    profile: ['profile', 'my profile', 'account', 'settings']
  };

  // Check if asking about current page
  const isAskingAboutPage = pageKeywords[currentPage]?.some(kw => lowerMsg.includes(kw));
  
  if (isAskingAboutPage && !state.isInFlow()) {
    return {
      response: getPageDescription(currentPage),
      flow: null,
      isPageInfo: true
    };
  }

  // Handle confirmation responses (yes, yeah, sure, ok)
  const confirmations = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'alright', 'continue', 'go ahead'];
  const isConfirmation = confirmations.some(conf => lowerMsg === conf || lowerMsg.startsWith(conf));

  // Handle negations (no, nah, not really)
  const negations = ['no', 'nah', 'nope', 'not really', 'cancel', 'stop'];
  const isNegation = negations.some(neg => lowerMsg === neg || lowerMsg.startsWith(neg));

  // If user wants to cancel
  if (isNegation && state.isInFlow()) {
    state.reset();
    return {
      response: `No problem! Let me know if you need help with something else. I can help with:

🎓 Courses and training
🚀 Starting a business
💰 Funding (NSFAS, bursaries)
💼 Jobs and careers
🏥 Health and wellbeing
📄 CV and application help

What would you like to know about?`,
      flow: null
    };
  }

  // Check if we're in an active conversation flow
  if (state.isInFlow()) {
    const flow = conversationFlows[state.currentFlow];
    const currentStepIndex = state.currentStep - 1;
    const currentStepData = flow.steps[currentStepIndex];

    // If user just confirmed to continue (after seeing intro)
    if (isConfirmation && currentStepIndex === -1) {
      state.nextStep();
      return {
        response: flow.steps[0].question,
        flow: state.currentFlow,
        step: state.currentStep
      };
    }

    // Validate and store the answer
    if (currentStepData && currentStepData.validate(userMessage)) {
      const extractedValue = currentStepData.extract(userMessage);
      state.storeData(currentStepData.field, extractedValue);

      // Check if this was the last question
      if (state.currentStep >= flow.steps.length) {
        // Generate final response
        const finalResponse = flow.generateResponse(state.collectedData);
        state.reset(); // Reset flow after completion
        
        return {
          response: finalResponse,
          flow: null,
          completed: true
        };
      } else {
        // Move to next question
        state.nextStep();
        const nextQuestion = flow.steps[state.currentStep - 1].question;
        
        return {
          response: `Got it! ✅\n\n${nextQuestion}`,
          flow: state.currentFlow,
          step: state.currentStep
        };
      }
    } else {
      // Invalid answer
      return {
        response: `I didn't quite get that. ${currentStepData.question}`,
        flow: state.currentFlow,
        step: state.currentStep
      };
    }
  }

  // Identify intent for new conversations
  const intent = intentRecognition.identify(userMessage);

  if (intent && conversationFlows[intent]) {
    // Start new conversation flow
    state.currentFlow = intent;
    state.currentStep = 0;
    state.collectedData = {};

    const flow = conversationFlows[intent];
    
    return {
      response: `${flow.intro}\n\n**Ready to start?** (Just say 'yes' when you're ready!)`,
      flow: intent,
      step: 0
    };
  }

  // If no intent matched and not in flow, ask for clarification
  return {
    response: `I want to make sure I give you the right information! Are you asking about:

🚀 **Starting your own business**
🎓 **Funding for your studies (NSFAS)**
💼 **Finding a job or learnership**
📚 **Courses and training**
🏥 **Health or medical concerns**
📄 **Help with CV or Resume**

Please let me know which one, and I'll give you detailed help!`,
    flow: null,
    needsClarification: true
  };
};

/**
 * Get description for current page
 */
const getPageDescription = (page) => {
  const descriptions = {
    home: `🏠 **Welcome to the Home Page!**

This is your starting point - your dashboard to all opportunities!

**What You'll Find Here:**
📌 **Featured Opportunities** - Latest jobs, bursaries, learnerships
🎯 **Quick Access** - Jump to any section instantly
📢 **Latest Updates** - News and announcements
🌟 **Success Stories** - Get inspired by others
💡 **Getting Started** - New here? Perfect place to start!

**Where to Go Next:**
• **Looking for funding?** → Bursaries page
• **Want to study while working?** → Learnerships page
• **Need a job?** → Opportunities & Careers pages
• **Building your CV?** → Resume Builder
• **Starting a business?** → Business Funding
• **Want to learn?** → Knowledge Base & Events

**Language:** Switch between English and isiXhosa using the button in the top menu!

What would you like to explore today?`,

    opportunities: `💼 **Opportunities Page**

This is where you discover career and development opportunities:
• **Job Openings** - Full-time, part-time, contract
• **Internships** - Gain work experience
• **Volunteer Positions** - Build your CV
• **Training Programs** - Develop new skills

**How to Use This Page:**
✅ Browse through listings
✅ Click on opportunities for details
✅ Check requirements carefully
✅ Save interesting opportunities
✅ Apply directly through the platform

**Tips:**
• Check back daily for new postings
• Apply to multiple opportunities
• Read requirements carefully
• Prepare your CV in advance

Need help with applications? Just ask me!`,

    bursaries: `💰 **Bursaries Page**

Find financial assistance for your education here!

**What's Available:**
• **NSFAS** - Government student funding
• **Company Bursaries** - Private sector funding
• **Provincial Bursaries** - Regional support
• **Field-Specific** - Engineering, teaching, health, etc.

**How It Works:**
1. Browse available bursaries
2. Check eligibility requirements
3. Note application deadlines
4. Prepare required documents
5. Submit applications

**Key Information:**
📅 **Deadlines:** Most close August-September
💵 **Coverage:** Tuition, accommodation, books, living costs
📋 **Requirements:** Academic records, financial need, specific qualifications

**Need Help?** Ask me:
• "How do I apply for NSFAS?"
• "Which bursaries am I eligible for?"
• "What documents do I need?"`,

    learnerships: `📚 **Learnerships Page**

Learn while you earn!

**What Are Learnerships?**
Combination of:
• Theoretical learning (classroom)
• Practical workplace experience
• Monthly stipend (you get paid!)
• Recognized qualification

**Benefits:**
✅ Earn while you learn
✅ Gain work experience
✅ Get qualified
✅ Often leads to permanent employment
✅ No upfront costs

**Popular Fields:**
• Business Administration
• IT & Technology
• Engineering & Technical
• Hospitality & Tourism
• Retail & Wholesale
• Health & Safety

**Duration:** Usually 12-24 months

**How to Apply:**
Browse available programs, check requirements, and apply directly!

Want to know more? Ask me anything about learnerships!`,

    careers: `🎯 **Careers Page**

Your career guidance center!

**What You'll Find:**
• **Career Paths** - Explore different careers
• **Industry Information** - Learn about sectors
• **Skills Development** - What you need to succeed
• **Job Search Tools** - Resources for finding work
• **Interview Tips** - Ace your interviews
• **Career Advice** - Professional guidance

**Popular Career Categories:**
• Technology & IT
• Healthcare & Medicine
• Engineering & Technical
• Business & Finance
• Creative & Design
• Education & Training

**Getting Started:**
1. Explore career options
2. Assess your skills and interests
3. Research requirements
4. Plan your path
5. Take action!

**Need Guidance?** Ask me:
• "What career suits me?"
• "How do I get into [field]?"
• "What qualifications do I need?"`,

    'resume-builder': `📄 **Resume Builder**

Create a professional CV step-by-step!

**This Tool Helps You:**
✅ Structure your CV properly
✅ Fill in all sections correctly
✅ Format professionally
✅ Download ready-to-use CV
✅ Save and edit anytime

**CV Sections Included:**
• Personal Information
• Professional Summary
• Education History
• Work Experience
• Skills & Competencies
• Achievements & Awards
• References

**Pro Tips:**
• Keep it to 1-2 pages
• Use professional language
• Highlight relevant experience
• Update regularly
• Tailor to each application

**Need Help?** Ask me:
• "What should I include in my CV?"
• "How do I write with no experience?"
• "CV tips for [industry]?"

Let's build your perfect CV!`,

    events: `📅 **Events Page**

Stay updated with upcoming opportunities!

**What's Here:**
• **Workshops** - Skills development sessions
• **Webinars** - Online learning events
• **Career Fairs** - Meet employers
• **Networking Events** - Build connections
• **Training Sessions** - Learn new skills
• **Info Sessions** - Learn about opportunities

**Benefits of Attending:**
✅ Learn new skills
✅ Network with professionals
✅ Discover opportunities
✅ Get career advice
✅ Meet potential employers
✅ Build your CV

**How to Participate:**
1. Browse upcoming events
2. Check dates and times
3. Register early (spaces limited!)
4. Prepare questions
5. Attend and engage

Check back regularly - new events added weekly!`,

    forums: `💬 **Forums Page**

Your community discussion space!

**What You Can Do:**
• **Ask Questions** - Get help from peers
• **Share Experiences** - Help others learn
• **Discuss Topics** - Career, education, life
• **Connect with Peers** - Build your network
• **Get Advice** - Learn from experiences
• **Share Success** - Inspire others

**Popular Topics:**
• Application Tips
• Interview Experiences
• Bursary Success Stories
• Study Advice
• Career Guidance
• Life Challenges

**Community Guidelines:**
✅ Be respectful and kind
✅ Stay on topic
✅ Help others
✅ Share constructive advice
✅ Report inappropriate content

**Getting Started:**
1. Browse existing discussions
2. Create your profile
3. Post your question
4. Engage with responses
5. Help others too!

Join the conversation - you're not alone!`,

    'business-funding': `🚀 **Business Funding Page**

Resources for aspiring entrepreneurs!

**Funding Options:**
• **NYDA Grants** - Up to R50,000
• **SEDA Support** - Free mentorship
• **Bank Loans** - Various amounts
• **Angel Investors** - Private funding
• **Incubators** - Training + funding
• **Government Programs** - Provincial support

**What You Need:**
📋 Business Plan (essential!)
💡 Clear business idea
💰 Some own contribution
📊 Market research
📄 Financial projections

**Application Process:**
1. Develop your business idea
2. Write business plan
3. Research funding options
4. Prepare documents
5. Submit applications
6. Present your pitch

**We Can Help With:**
• Business plan writing
• Funding applications
• Pitch preparation
• Market research

Ready to start? Ask me anything about starting your business!`,

    'knowledge-base': `📚 **Knowledge Base**

Your learning resource center!

**What's Available:**
• **How-To Guides** - Step-by-step instructions
• **FAQs** - Common questions answered
• **Articles** - In-depth information
• **Templates** - CV, cover letters, etc.
• **Checklists** - Stay organized
• **Resources** - Useful links and tools

**Popular Topics:**
• Application Processes
• CV Writing
• Interview Preparation
• Study Tips
• Career Planning
• Financial Aid

**How to Use:**
1. Search for your topic
2. Browse by category
3. Read relevant articles
4. Download templates
5. Ask me if unclear!

**Quick Access:**
Type what you're looking for, and I'll help you find it!

What information do you need?`,

    'success-stories': `🌟 **Success Stories**

Get inspired by real success stories!

**Featured Stories:**
• Youth who found opportunities
• Bursary recipients
• Job success stories
• Business startups
• Educational achievements
• Career transformations

**Why Read These?**
✅ Get motivated
✅ Learn from experiences
✅ See what's possible
✅ Find practical tips
✅ Know you're not alone
✅ Discover pathways

**Common Themes:**
• Started with nothing
• Faced challenges
• Never gave up
• Found right opportunity
• Worked hard
• Achieved goals

**Your Story:**
You could be featured here next! Keep working towards your goals.

**Need Inspiration?**
Browse the stories and see how others made it!

What kind of success story interests you?`,

    profile: `👤 **Your Profile**

Manage your account and track progress!

**What You Can Do:**
• **Personal Info** - View and edit details
• **Saved Opportunities** - Access saved items
• **Applications** - Track your applications
• **Progress** - See your journey
• **Settings** - Adjust preferences
• **Documents** - Store important files

**Keep Updated:**
✅ Complete all sections
✅ Update contact information
✅ Add new skills
✅ Track applications
✅ Save interesting opportunities

**Privacy:**
🔒 Your data is secure
🔒 Control what's visible
🔒 Manage your privacy settings

**Profile Tips:**
• Add a profile photo
• Complete all sections
• Keep information current
• Update achievements
• Track your progress

Need help with your profile? Just ask!`
  };

  return descriptions[page] || descriptions.home;
};

export default {
  conversationState,
  intentRecognition,
  conversationFlows,
  generateSmartResponse
};

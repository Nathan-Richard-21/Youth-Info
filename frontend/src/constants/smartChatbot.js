/// ============================================================================
// SMART CHATBOT WITH CONVERSATION FLOW & STATE MANAGEMENT (FINAL INTERRUPT FIX)
// ============================================================================

/**
 * Conversation State Manager
 * Tracks the current conversation flow, user responses, and context
 */
export const conversationState = {
  currentFlow: null, // 'courses', 'business', 'health', 'funding', 'job', 'cv'
  currentStep: 0, // 0-indexed position in the steps array
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
  },

  // Reset conversation state
  reset() {
    this.currentFlow = null;
    this.currentStep = 0;
    this.collectedData = {};
  },

  // Check if user is answering a follow-up question
  isInFlow() {
    return this.currentFlow !== null; 
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
                  'what to study', 'study options', 'programme', 'qualification', 'courses to apply'],
      variations: ['what course', 'which course', 'what should i apply']
    },
    business: {
      keywords: ['start business', 'business idea', 'begin business', 'own business',
                  'entrepreneur', 'side hustle', 'make money', 'startup', 'sell',
                  'business plan', 'how to start', 'create business', 'launch business', 'where should i begin'],
      variations: ['start a business', 'starting business', 'want to start', 'start business where']
    },
    funding: {
      keywords: ['nsfas', 'bursary', 'scholarship', 'funding', 'financial aid',
                  'pay for university', 'afford university', 'study money', 'grants',
                  'sponsor', 'tuition fees', 'student funding', 'about bursaries', 'tell me about bursaries'],
      variations: ['how to fund', 'funding my studies', 'nsfas application']
    },
    jobs: {
      keywords: ['job', 'work', 'employment', 'intern', 'internship', 'hiring',
                  'career', 'recruitment', 'find work', 'looking for work', 'get hired', 'opportunities', 'what opportunities are available', 'help me get started'],
      variations: ['find a job', 'looking for job', 'job opportunities', 'get started']
    },
    health: {
      keywords: ['sick', 'ill', 'depression', 'anxiety', 'stress', 'mental health',
                  'feeling sad', 'suicidal', 'help me', 'clinic', 'hospital', 'doctor',
                  'health', 'medical', 'unwell', 'pain', 'symptom'],
      variations: ['i feel sick', 'feeling depressed', 'mental health help', 'what should i do']
    },
    cv: {
      keywords: ['cv', 'resume', 'cover letter', 'application letter', 'write cv',
                  'cv help', 'cv tips', 'how to write', 'cv format', 'cv template', 'create a cv', 'create cv', 'how do i create a cv'],
      variations: ['help with cv', 'write a cv', 'cv writing', 'how do i create a cv']
    },
    apply_guidance: {
      keywords: ['how to apply', 'help me apply', 'application steps', 'guide me to apply', 
                  'apply for', 'applying for', 'application process', 'step by step apply'],
      variations: ['how do i apply', 'what are the steps to apply', 'guide me through application']
    },
    info: {
      keywords: ['what is this page', 'this page', 'what are learnerships', 'what are opportunities',
                  'eligible', 'who can apply', 'themes', 'problem areas',
                  'fields available', 'sectors', 'get paid', 'stipend', 'compensation'],
      variations: ['tell me about', 'explain', 'how it works', 'what can i do here']
    }
  },

  // Identify intent from user message
  identify(message) {
    let lowerMsg = message.toLowerCase().trim();
    lowerMsg = lowerMsg.replace('bursaris', 'bursaries'); 

    // We do NOT check isInFlow here, as we need to see if a NEW intent interrupts the flow
    let bestMatch = null;
    let highestScore = 0;

    for (const [intent, data] of Object.entries(this.intents)) {
      let score = 0;
      
      for (const keyword of data.keywords) {
        if (lowerMsg.includes(keyword)) {
          score += 2;
        }
      }

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

    return highestScore >= 2 ? bestMatch : null;
  }
};

/**
 * Conversation Flows - Multi-step guided conversations
 */
export const conversationFlows = {
  
  // COURSES FLOW - "What courses should I apply to?"
  courses: {
    intro: `Good question! Let's figure out what fits you. I'll ask a few quick questions about your subjects, interests, and goals, then I'll suggest courses you can look at and where to apply.`,
    
    steps: [
      {
        question: "**1. What is the highest grade or qualification you have so far?**\n(E.g., Grade 12, Grade 11, Diploma, Matric with exemption)",
        field: 'education',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**2. Which subjects or topics do you enjoy or feel strongest in?**\n(E.g., Math, Science, Languages, Art, etc.)",
        field: 'subjects',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      },
      {
        question: "**3. What kind of work sounds more like you?**\n\n1️⃣ Working with **people** (teaching, nursing)\n2️⃣ Working with **computers** (IT, programming)\n3️⃣ Working with **tools** (engineering, mechanics)\n4️⃣ Something **creative** (art, writing)\n\n(Type the number or the word, e.g., '3' or 'tools')",
        field: 'workType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**4. Do you prefer a shorter course (6–12 months) or a longer one (2–4 years)?**\n(Type 'short' or 'long')",
        field: 'duration',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**5. Do you need low-cost or free options, or can you pay some fees?**\n(Type 'low-cost' or 'pay fees')",
        field: 'budget',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**6. Which town or province are you in, or where would you like to study?**\n(E.g., Port Elizabeth, East London, Mthatha, Eastern Cape)",
        field: 'location',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      }
    ],

    generateResponse: (data) => {
      const { education, subjects, workType, duration, budget } = data;
      
      let response = `### 🎓 Course Recommendations\n\n`;
      response += `Based on what you shared (Highest Grade: **${education}**, Interests: **${subjects}**, Preferred Length: **${duration}**), here are some course types to explore:\n\n`;

      const workTypeLower = workType.toLowerCase();
      if (workTypeLower.includes('people') || workTypeLower.includes('1')) {
        response += `**1. Education or Social Sciences** (If you like working with people)\n`;
        response += `**2. Public Relations or HR** (If you enjoy communication)\n\n`;
      } else if (workTypeLower.includes('computer') || workTypeLower.includes('2')) {
        response += `**1. Information Technology (IT)** or **Software Development** (If you like computers)\n`;
        response += `**2. Digital Marketing** or **Graphic Design** (If you enjoy creative computer work)\n\n`;
      } else if (workTypeLower.includes('tools') || workTypeLower.includes('3')) {
        response += `**1. Artisan Trades** (e.g., Plumbing, Electrical, Welding) via a TVET college\n`;
        response += `**2. Engineering** (e.g., Mechanical, Civil) at a University of Technology\n\n`;
      } else if (workTypeLower.includes('creative') || workTypeLower.includes('4')) {
        response += `**1. Media Studies or Journalism** (If you like writing/media)\n`;
        response += `**2. Graphic Design or Fine Art** (If you are visual and creative)\n\n`;
      } else {
        response += `**1. Business Management** or **Administration** (General skills applicable everywhere)\n`;
        response += `**2. Financial Management** or **Accounting** (If you are good with numbers)\n\n`;
      }

      response += `---\n\n### 📋 I can also show you:\n\n`;
      response += `✅ Links to colleges/universities that offer these courses\n`;
      response += `✅ Bursary or funding options (including NSFAS)\n`;
      response += `✅ Tips on how to apply (deadlines, documents, etc.)\n`;
      
      response += `\n**What would you like to know more about?** 💬\n`;
      response += `(Ask about specific courses, funding, or application tips!)`;

      return response;
    }
  },

  // BUSINESS FLOW - "I want to start a business"
  business: {
    intro: `That’s an exciting goal! 🚀 Let’s break it into simple steps so you know where to start. I'll ask a few quick questions and then suggest practical first actions you can take.`,
    
    steps: [
      {
        question: "**1. What kind of business are you thinking about?**\n(E.g., selling products, offering services, or something online?)",
        field: 'businessType',
        validate: (answer) => answer.length > 3,
        extract: (answer) => answer.trim()
      },
      {
        question: "**2. Is this a side hustle while you study/work, or do you want it to become your main income?**\n(Type 'side hustle' or 'main income')",
        field: 'timeCommitment',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**3. How much money (if any) can you start with?**\n(E.g., 'R500', 'R0', 'nothing')",
        field: 'startingCapital',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**4. Do you already have any customers or people who said they would buy from you?**\n(Type 'yes' or 'no')",
        field: 'customerBase',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**5. Which town or area are you based in?**\n(So I can show you local programmes/support.)",
        field: 'location',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      }
    ],

    generateResponse: (data) => {
      const { businessType, timeCommitment, startingCapital, customerBase, location } = data;
      
      let response = `### 🚀 Business Startup Plan\n\n`;
      response += `Based on what you shared (Type: **${businessType}**, Time: **${timeCommitment}**, Budget: **${startingCapital}**), here are good first steps:\n\n`;

      response += `**1. Write down a simple business idea** 📝\n`;
      response += `Answer these 3 questions: What exactly will you sell? Who will buy it? Why would they choose YOU?\n\n`;

      response += `**2. Talk to potential customers** 💬\n`;
      response += `Talk to at least **3–5 people** who could be customers and ask if they would actually pay for this.\n\n`;

      response += `**3. Start small - TEST your idea** 🧪\n`;
      response += `Start small: test your idea with a few customers instead of spending a lot of money upfront.\n\n`;

      response += `**4. Check local youth business support programmes** 🏢\n`;
      response += `Check for local funding (e.g., **NYDA youth funds**, **SEDA small business agencies**, or **entrepreneurship training**).\n\n`;

      response += `---\n\n`;
      response += `**What would you like help with next?** 🚀\n`;
      response += `1️⃣ Finding funding sources\n2️⃣ Writing a simple business plan\n3️⃣ Legal requirements (registration, permits)\n`;
      
      return response;
    }
  },

  // HEALTH FLOW (Immediate Answer Only) - "I feel sick"
  health: {
    intro: `I'm here to help! 💙 Your health and wellbeing matter. I can guide you to the right resources.\n\nWe have a dedicated **Medical Chat Assistance** tool where you can access health information and connect with support services.\n\nLet me ask you a few quick questions to better direct you:`,
    
    steps: [
      {
        question: "**Are you experiencing a physical health issue (like pain, illness, or symptoms) or an emotional/mental health concern (like stress, anxiety, or depression)?**\n\n1️⃣ Physical health issue\n2️⃣ Emotional/mental health concern\n3️⃣ Both\n\n(Type the number or describe your concern)",
        field: 'healthType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      },
      {
        question: "**How urgent is your situation?**\n\n1️⃣ It's an emergency - I need immediate help\n2️⃣ It's serious but not life-threatening\n3️⃣ It's ongoing but manageable\n\n(Type the number or describe the urgency)",
        field: 'urgency',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      }
    ],

    generateResponse: (data) => {
      const { healthType, urgency } = data;
      let response = `### 🏥 Health & Support Resources\n\n`;
      
      const isEmergency = urgency.includes('1') || urgency.includes('emergency') || urgency.includes('immediate');
      
      if (isEmergency) {
        response += `**⚠️ EMERGENCY SUPPORT - ACT NOW:**\n\n`;
        response += `📞 **Call 10111** (Police/Emergency)\n`;
        response += `📞 **Call 112** (Ambulance)\n`;
        response += `📞 **Call 0800 567 567** (Suicide Crisis Line - 24/7)\n\n`;
      }

      const mentalHealthKeywords = ['emotional', 'mental', 'stress', 'anxiety', 'depression', 'sad', '2'];
      const isMentalHealth = mentalHealthKeywords.some(kw => healthType.includes(kw));

      if (isMentalHealth || healthType.includes('2') || healthType.includes('3')) {
        response += `**🧠 Mental Health & Emotional Support:**\n`;
        response += `📱 **Free Crisis Lines (24/7):**\n`;
        response += `• SADAG: **0800 567 567**\n`;
        response += `• Childline: **0800 055 555**\n`;
        response += `• AIDS Helpline: **0800 012 322**\n\n`;
        response += `🏥 **Free Counseling:**\n`;
        response += `• Local Government Clinic\n`;
        response += `• Community Mental Health Centers\n`;
        response += `• School/University Counselor\n\n`;
      }

      if (!isMentalHealth || healthType.includes('1') || healthType.includes('3')) {
        response += `**💊 Physical Health Support:**\n`;
        response += `🏥 **Where to Go:**\n`;
        response += `• Government Clinic (FREE)\n`;
        response += `• Hospital Emergency Room\n`;
        response += `• Local Health Center\n\n`;
      }

      response += `**Next Steps:**\n1. Visit **Medical Chat Assistance** page for local services\n2. If it's an emergency, call immediately\n3. Visit forums for peer support\n\n`;
      response += `You deserve support. We're here for you. 💙`;

      return response;
    }
  },
  
  // FUNDING FLOW - "Tell me about bursaries"
  funding: {
    intro: `That's great! Finding funding is key. I can give you a quick summary of bursaries and NSFAS, and then point you to the right section on our platform.`,
    
    steps: [
      {
        question: "**1. Are you looking for funding for a university degree, a college diploma, or a TVET course?**\n(Type 'university', 'college', or 'TVET')",
        field: 'studyType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
    ],
    generateResponse: (data) => {
      const { studyType } = data;
      let response = `### 💰 Bursaries & Financial Aid\n\n`;

      response += `Based on your interest in **${studyType}** funding, here's what you need to know:\n\n`;
      
      response += `**1. NSFAS (National Student Financial Aid Scheme)**\n`;
      response += `   - **Target:** Students from poor and working-class backgrounds.\n`;
      response += `   - **Covers:** Tuition, accommodation, books, and allowances for University and TVET College students.\n\n`;
      
      response += `**2. Company & Sector Bursaries**\n`;
      response += `   - **Target:** Students in high-demand fields (like Engineering, IT, Teaching).\n`;
      response += `   - **Benefit:** Often covers more than NSFAS and sometimes guarantees a job after graduation.\n\n`;
      
      response += `---\n\n`;
      response += `**🔗 Next Step:**\n`;
      response += `You can find all active funding opportunities, deadlines, and application links on our **Bursaries Page**.\n\n`;
      response += `**What would you like to do next?**\n`;
      response += `1️⃣ Tips on how to apply for NSFAS\n2️⃣ List of high-demand bursaries\n3️⃣ Go back to the main menu`;

      return response;
    }
  },

  // JOBS/OPPORTUNITIES FLOW - "What opportunities are available?" / "Help me get started"
  jobs: {
    intro: `That's what this platform is for! I can show you what opportunities are available right now and match them to your skills.`,
    
    steps: [
      {
        question: "**1. Are you looking for a job, an internship, a learnership, or a volunteer position?**\n(Type 'job', 'internship', 'learnership', or 'volunteer')",
        field: 'opportunityType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
      {
        question: "**2. What is your highest qualification?**\n(E.g., Grade 12, NQF Level 4, Diploma in IT)",
        field: 'qualification',
        validate: (answer) => answer.length > 2,
        extract: (answer) => answer.trim()
      },
    ],
    generateResponse: (data) => {
      const { opportunityType, qualification } = data;
      let response = `### 💼 Available Opportunities\n\n`;

      response += `Based on your request for a **${opportunityType}** with a **${qualification}**, here are the categories you should explore on the **Opportunities Page**:\n\n`;
      
      response += `* **For Jobs:** Filter by **Entry-Level Positions** in high-growth sectors. Your ${qualification} is a good starting point!\n`;
      response += `* **For Internships:** Search for companies that have a structured **Graduate/Internship Programme**.\n`;
      response += `* **For Learnerships:** Look for learnerships in **Business Admin** or a technical trade that matches your skills.\n`;
      
      response += `---\n\n`;
      response += `**🔗 Next Step:**\n`;
      response += `Go to the **Opportunities Page** and use the filters to see the latest listings.\n\n`;
      response += `**What would you like to do next?**\n`;
      response += `1️⃣ Check current learnership deadlines\n2️⃣ Tips on writing a CV for these roles\n3️⃣ Go back to the main menu`;

      return response;
    }
  },

  // CV FLOW - "How do I create a CV?"
  cv: {
    intro: `Building a great CV is the first step to getting hired! I can guide you through the process and make sure you have all the essential parts.`,
    
    steps: [
      {
        question: "**1. Are you building a CV for your first job (no experience), or do you have some work experience already?**\n(Type 'first job' or 'experienced')",
        field: 'experienceLevel',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.trim()
      },
    ],
    generateResponse: (data) => {
      const { experienceLevel } = data;
      let response = `### 📄 CV Creation Assistance\n\n`;

      response += `Since you are at the **${experienceLevel}** stage, here are the **5 Essential Sections** your CV must include:\n\n`;
      
      response += `1. **Contact Details**\n2. **Personal Summary**\n3. **Education**\n`;
      
      if (experienceLevel.toLowerCase().includes('first job') || experienceLevel.toLowerCase().includes('no experience')) {
          response += `4. **Skills & Achievements** (Focus on school projects, volunteer work, computer skills).\n`;
          response += `5. **References** (State "Available upon request.")\n`;
          response += `\n**Tip:** Focus on your **Skills** and **Attitude**! Companies hire for potential.\n\n`;
      } else {
          response += `4. **Work Experience** (List duties and achievements).\n`;
          response += `5. **Skills & Competencies** (Technical and soft skills).\n`;
          response += `\n**Tip:** Tailor your summary and duties to match the job description you are applying for!\n\n`;
      }
      
      response += `---\n\n`;
      response += `**🔗 Next Step:**\n`;
      response += `Use our **Resume Builder Tool** for step-by-step guidance and professional templates.\n\n`;
      response += `**What would you like to do next?**\n`;
      response += `1️⃣ Strong example of a Personal Summary\n2️⃣ List of soft skills to include\n3️⃣ Go back to the main menu`;

      return response;
    }
  },

  // APPLY GUIDANCE FLOW - "How do I apply?" / "Help me apply"
  apply_guidance: {
    intro: `I can guide you through the application process! To start, which type of opportunity are you interested in?`,
    
    steps: [
      {
        question: "**1. What type of opportunity are you looking to apply for?**\n(Type 'job', 'learnership', or 'bursary')",
        field: 'opportunityType',
        validate: (answer) => answer.length > 0,
        extract: (answer) => answer.toLowerCase().trim()
      }
    ],
    generateResponse: (data) => {
      const { opportunityType } = data;
      let response = `### 📋 Application Guide\n\n`;
      
      if (opportunityType.includes('job')) {
        response += `**Jobs Application - 3 Steps:**\n\n`;
        response += `**Step 1: Prepare Your CV**\n`;
        response += `- Use the Resume Builder on this platform\n`;
        response += `- Tailor it to match the job description\n`;
        response += `- Ensure accuracy (no typos or spelling errors)\n`;
        response += `- Save as PDF format\n\n`;
        
        response += `**Step 2: Register/Create Profile**\n`;
        response += `- Set up your portal account if you don't have one\n`;
        response += `- Verify your email address\n`;
        response += `- Complete your profile with contact details\n\n`;
        
        response += `**Step 3: Submit Application**\n`;
        response += `- Find the job listing on the Opportunities Page\n`;
        response += `- Click "Apply" button\n`;
        response += `- Attach your CV and any required documents\n`;
        response += `- Follow any company-specific instructions\n\n`;
        
      } else if (opportunityType.includes('learnership') || opportunityType.includes('internship')) {
        response += `**Learnership/Internship Application - 3 Steps:**\n\n`;
        response += `**Step 1: Check Eligibility & Fields**\n`;
        response += `- Verify age requirements (usually 18-35)\n`;
        response += `- Check academic qualifications\n`;
        response += `- Ensure your interests match the learnership sector\n\n`;
        
        response += `**Step 2: Gather Documents**\n`;
        response += `- ID (or birth certificate)\n`;
        response += `- Recent academic records/certificates\n`;
        response += `- Your CV (highlighting relevant skills)\n`;
        response += `- Any technical certifications or licenses\n\n`;
        
        response += `**Step 3: Complete Application**\n`;
        response += `- Visit the Learnerships Page\n`;
        response += `- Fill out the registration form completely\n`;
        response += `- Upload all required documents\n`;
        response += `- Submit before the deadline\n\n`;
        
      } else if (opportunityType.includes('bursary')) {
        response += `**Bursary Application - 3 Steps:**\n\n`;
        response += `**Step 1: Check Financial Criteria**\n`;
        response += `- Review income/asset limits\n`;
        response += `- Check academic requirements (usually 60%+ for entry, 70%+ for continuation)\n`;
        response += `- Verify field of study eligibility\n\n`;
        
        response += `**Step 2: Gather Parent/Guardian Documents**\n`;
        response += `- Your parent/guardian's ID\n`;
        response += `- Income proof (pay slip, IRP5, business financials)\n`;
        response += `- Your academic records/certificates\n`;
        response += `- Your CV and personal statement\n\n`;
        
        response += `**Step 3: Apply (NSFAS First)**\n`;
        response += `- Start with NSFAS at www.nsfas.org.za (if eligible)\n`;
        response += `- Apply to company bursaries on the Bursaries Page\n`;
        response += `- Submit all applications before deadlines\n`;
        response += `- Keep copies for follow-up\n\n`;
      }
      
      response += `---\n\n`;
      response += `**✅ Pro Tips:**\n`;
      response += `- **Submit early:** Don't wait until the deadline\n`;
      response += `- **Follow instructions:** Complete ALL required fields\n`;
      response += `- **Keep records:** Save confirmation numbers and dates\n`;
      response += `- **Follow up:** Email after 2 weeks if no response\n\n`;
      
      response += `**What would you like to do next?**\n`;
      response += `1️⃣ Help me build my CV\n2️⃣ Find specific opportunities\n3️⃣ Go back to the main menu`;

      return response;
    }
  }
};

// --- KNOWLEDGE BASE INTEGRATION (YouthPortal Opportunities) ---

const youthPortalKnowledge = {
    // Factual data derived from the site's primary opportunities document.
    "learnerships": {
        intro: "Structured learning opportunities on the portal focus primarily on innovation in high-demand sectors. These include: Manufacturing, Agriculture (including agro-processing), ICT and Electronics, Renewable Energy, and Automotive.",
        apply: "**Multi-Step Application Process:**\n1. **Check Eligibility** - Verify you meet the age, qualification, and sector requirements\n2. **Gather Documents** - Collect ID, academic records, CV, and any certifications\n3. **Complete Registration** - Create your portal account if not already registered\n4. **Submit Application** - Fill out the official application form with all required details\n5. **Follow Up** - Monitor your email for confirmation and next steps",
        fields: "The key focus sectors are: Manufacturing, Agriculture, ICT and Electronics, Renewable Energy, and Automotive.",
        paid: "While learnerships and internships offer stipends, major innovation challenges often offer cash prizes. Winning solutions in each category receive substantial cash rewards (like R100,000) and incubation support."
    },
    "themes": {
        summary: "The main thematic problem areas you can address are: 1. Skills Portal Solutions, 2. Interactive App Development, 3. AI-powered Funding Applications, and 4. EC Youth Information Portal Enhancement."
    },
    "eligibility": {
        summary: "The target audience is Youth aged 18-35 years living in the region. This includes tech entrepreneurs, students, early-stage startups, and unemployed youth."
    }
};

/**
 * Handles contextual lookups for quick user questions.
 * ENHANCED: Now uses currentPage to fetch real component context
 */
const handleQuickAnswer = (userMessage, currentPage) => {
    const lowerMsg = userMessage.toLowerCase();
    const knowledge = youthPortalKnowledge;

    // HIGHEST PRIORITY: Check for page context questions
    if (lowerMsg.includes('this page') || lowerMsg.includes('what is here') || lowerMsg.includes('tell me about this page') || lowerMsg.includes('what can i do here')) {
        // Use getPageDescription to fetch real component context based on current page
        const contextualInfo = getPageDescription(currentPage);
        return contextualInfo;
    }

    // HIGH PRIORITY: Check for application guidance keywords - trigger apply_guidance flow
    if (lowerMsg.includes('how to apply') || lowerMsg.includes('help me apply') || 
        lowerMsg.includes('application steps') || lowerMsg.includes('guide me to apply') ||
        lowerMsg.includes('apply for')) {
        // Return special marker to trigger apply_guidance flow instead of quick answer
        return {
            isFlowTrigger: true,
            flowName: 'apply_guidance',
            message: `I can guide you through the application process! To start, **which type of opportunity are you looking for?**\n\n📌 **Job** | 📋 **Learnership/Internship** | 🎓 **Bursary**`
        };
    }

    // 2. Check for learnership/opportunity specific questions
    if (lowerMsg.includes('learnership') || lowerMsg.includes('internship') || lowerMsg.includes('opportunity')) {
        if (lowerMsg.includes('what are') || lowerMsg.includes('what is')) {
            return `### What are Learnerships/Opportunities?\n${knowledge.learnerships.intro}`;
        }
        if (lowerMsg.includes('field') || lowerMsg.includes('sector')) {
            return `### Available Fields\n${knowledge.learnerships.fields}`;
        }
        if (lowerMsg.includes('paid') || lowerMsg.includes('stipend') || lowerMsg.includes('salary')) {
            return `### Compensation\n${knowledge.learnerships.paid}`;
        }
    }
    
    // 3. Check for general thematic info
    if (lowerMsg.includes('theme') || lowerMsg.includes('problem area')) {
        return `### Thematic Areas\n${knowledge.themes.summary}`;
    }
    if (lowerMsg.includes('eligible') || lowerMsg.includes('who can apply') || lowerMsg.includes('requirements')) {
        return `### Eligibility\n${knowledge.eligibility.summary}`;
    }

    // 4. Default fallback
    return null; // Will use the default greeting if no match
};

/**
 * TASK 1: Get component context from actual React component files
 * Maps page names to component files and extracts metadata
 */
const getComponentContext = (pageName) => {
    // Normalize page name - handle empty string for home
    const normalizedPage = !pageName || pageName === '' ? 'home' : pageName.toLowerCase();
    
    // Map page names to component metadata
    const componentMetadata = {
        'home': {
            title: 'Home - Youth Portal',
            emoji: '🏠',
            description: 'Welcome to the Youth Portal - Your one-stop platform for education, careers, funding, and personal development.',
            quickQuestions: [
                'What can I do here?',
                'How do I get started?',
                'Where do I find opportunities?',
                'How do I apply for bursaries?'
            ],
            features: [
                'Access all portal features and opportunities',
                'Find jobs, internships, and career guidance',
                'Apply for bursaries and financial aid',
                'Build your professional CV with our builder',
                'Connect with other youth in our forums',
                'Learn from success stories of peers'
            ]
        },
        'opportunities': {
            title: 'Job Opportunities & Internships',
            emoji: '💼',
            description: 'Browse and apply for job listings, internships, and career opportunities across various sectors. Filter by your interests and location.',
            quickQuestions: [
                'What job opportunities are available?',
                'Are there internships available?',
                'Which companies are hiring?',
                'How do I filter opportunities?',
                'What qualifications do employers want?'
            ],
            features: [
                'Browse current job listings and internships',
                'Filter by sector (IT, Finance, Engineering, etc)',
                'View job descriptions and requirements',
                'Apply directly to opportunities',
                'Save opportunities for later',
                'Track your applications'
            ]
        },
        'bursaries': {
            title: 'Bursaries & Financial Aid',
            emoji: '💰',
            description: 'Explore financial assistance for your education. Find bursaries, scholarships, and funding options including NSFAS, corporate bursaries, and government grants.',
            quickQuestions: [
                'What bursaries are available?',
                'What are the eligibility requirements?',
                'Tell me about NSFAS',
                'Are there deadline dates I should know about?',
                'What documents do I need?'
            ],
            features: [
                'View all available bursaries and scholarships',
                'Check eligibility requirements for each',
                'Filter by qualification level or field of study',
                'See application deadlines and dates',
                'Get links to bursary websites',
                'Save bursaries you\'re interested in',
                'Learn about NSFAS, corporate, and government bursaries'
            ]
        },
        'learnerships': {
            title: 'Learnerships & Training Programs',
            emoji: '📚',
            description: 'Discover structured learning opportunities combining theoretical education with practical workplace experience. Get paid while you learn!',
            quickQuestions: [
                'What are learnerships?',
                'What fields/sectors are available?',
                'Do you get paid during a learnership?',
                'What are the requirements?',
                'What is the difference between an internship and learnership?'
            ],
            features: [
                'Browse available learnership programs',
                'Learn about different industries and sectors',
                'Understand requirements and qualifications',
                'Apply directly to learnership programs',
                'Find out about salary/stipend information',
                'Get training and practical experience',
                'Build your resume while earning'
            ]
        },
        'careers': {
            title: 'Career Guidance & Paths',
            emoji: '🎯',
            description: 'Explore different career paths, get personalized career guidance, and learn about various industries to help you make informed career decisions.',
            quickQuestions: [
                'What career paths are available?',
                'How do I choose the right career?',
                'What industries can I work in?',
                'How do I develop my career?',
                'What skills do I need?'
            ],
            features: [
                'Discover different career paths and options',
                'Get personalized career guidance',
                'Learn about various industries',
                'Understand job requirements and salaries',
                'Get career development resources',
                'Access interview preparation tips',
                'Find mentorship opportunities'
            ]
        },
        'resume-builder': {
            title: 'CV & Resume Builder',
            emoji: '📄',
            description: 'Create a professional CV step-by-step with our guided builder. Get professional formatting templates and download your completed resume.',
            quickQuestions: [
                'How do I create a CV using this tool?',
                'What should I include in my CV?',
                'Do you have CV templates?',
                'How do I download my CV?',
                'Can I edit my CV after creating it?'
            ],
            features: [
                'Step-by-step CV creation wizard',
                'Add personal information and contact details',
                'Include education history and achievements',
                'List work experience and skills',
                'Professional formatting templates',
                'Download your CV as PDF',
                'Get CV writing tips and best practices'
            ]
        },
        'business-funding': {
            title: 'Business Funding & Grants',
            emoji: '🚀',
            description: 'Find startup funding, business grants, loans, and resources for aspiring entrepreneurs. Access funding opportunities from government and private organizations.',
            quickQuestions: [
                'Where can I get business funding?',
                'What grants are available for startups?',
                'What are the eligibility requirements?',
                'Are there free resources for entrepreneurs?',
                'How much funding can I get?'
            ],
            features: [
                'Explore startup funding opportunities',
                'Access business grants and loans',
                'Learn about investment programs',
                'Get business planning resources',
                'Find entrepreneurship training',
                'Connect with mentors and investors',
                'Download business templates and guides'
            ]
        },
        'events': {
            title: 'Events & Workshops',
            emoji: '📅',
            description: 'Stay updated with upcoming workshops, seminars, webinars, and networking events designed to help your personal and professional development.',
            quickQuestions: [
                'What events are coming up?',
                'How do I register for an event?',
                'Are there free workshops available?',
                'When is the next webinar?',
                'What topics are covered?'
            ],
            features: [
                'View upcoming workshops and seminars',
                'Attend webinars and online sessions',
                'Join networking events',
                'Career fairs and job exhibitions',
                'Professional development workshops',
                'Register for events easily',
                'Receive event reminders'
            ]
        },
        'forums': {
            title: 'Community Forums',
            emoji: '💬',
            description: 'Connect with other youth, share experiences, ask questions, and learn from peers. Discuss topics like careers, education, and opportunities.',
            quickQuestions: [
                'How do I post in the forum?',
                'What topics can I discuss?',
                'How do I ask for help?',
                'Can I share my experience or success story?',
                'How do I reply to posts?'
            ],
            features: [
                'Join discussions with other youth',
                'Share your experiences and advice',
                'Ask questions and get community help',
                'Connect with peers in your field',
                'Read and learn from others',
                'Build your professional network',
                'Find mentors and supporters'
            ]
        },
        'knowledge-base': {
            title: 'Knowledge Base & Resources',
            emoji: '📚',
            description: 'Access a comprehensive collection of educational guides, FAQs, articles, tips, and downloadable resources for your career and education.',
            quickQuestions: [
                'What resources are available?',
                'How do I find a specific guide?',
                'Do you have FAQs?',
                'Can I download resources?',
                'What topics are covered?'
            ],
            features: [
                'Browse how-to guides and tutorials',
                'Find answers to frequently asked questions',
                'Read educational articles',
                'Access tips and best practices',
                'Download templates and resources',
                'Learn about the portal features',
                'Get industry insights and trends'
            ]
        },
        'success-stories': {
            title: 'Success Stories & Testimonials',
            emoji: '🌟',
            description: 'Read inspiring stories from youth who achieved their goals through the portal. Get motivated by real experiences from peers like you.',
            quickQuestions: [
                'What success stories are featured?',
                'Can I submit my own story?',
                'How have others succeeded?',
                'What can I learn from these stories?',
                'Are there stories in my field?'
            ],
            features: [
                'Read inspiring success stories',
                'Learn from real peer experiences',
                'Get motivated for your journey',
                'Submit your own success story',
                'Filter stories by category',
                'Connect with successful peers',
                'Find inspiration for your goals'
            ]
        },
        'profile': {
            title: 'Your Profile',
            emoji: '👤',
            description: 'Manage your account, track your progress, save opportunities, and customize your portal experience. Keep your information updated.',
            quickQuestions: [
                'How do I update my profile?',
                'How do I track my progress?',
                'How do I change my password?',
                'Where are my saved opportunities?',
                'How do I manage my preferences?'
            ],
            features: [
                'Update your personal information',
                'View your profile completeness',
                'Track your applications and progress',
                'Access your saved opportunities',
                'Manage privacy settings',
                'Change your password',
                'Customize your preferences'
            ]
        },
        'medical-chat': {
            title: 'Medical Chat & Health Support',
            emoji: '🏥',
            description: 'Access health information and get support for medical questions. Connect with health professionals and find resources for your health needs.',
            quickQuestions: [
                'What health topics can I ask about?',
                'How do I get medical advice?',
                'Where can I find clinics near me?',
                'Can I chat with a health professional?',
                'What should I do in an emergency?'
            ],
            features: [
                'Access health information and resources',
                'Chat with health professionals',
                'Find clinics and healthcare facilities',
                'Get emergency contact information',
                'Learn about health services',
                'Access mental health resources',
                'Find STI/HIV testing centers'
            ]
        }
    };

    return componentMetadata[normalizedPage] || componentMetadata['home'];
};

/**
 * TASK 2: Get page description with dynamic component context
 * Fetches real component data based on current page
 */
const getPageDescription = (page) => {
    // Get real component context
    const componentContext = getComponentContext(page);
    
    if (componentContext) {
        let response = `${componentContext.emoji} **${componentContext.title}**\n\n`;
        response += `${componentContext.description}\n\n`;
        response += `### On this page, you can:\n`;
        componentContext.features.forEach((feature, index) => {
            response += `${index + 1}. ${feature}\n`;
        });
        response += `\n### Quick questions I can answer:\n`;
        componentContext.quickQuestions.forEach((q) => {
            response += `• ${q}\n`;
        });
        return response;
    }

    return `Welcome! How can I help you navigate this page?`;
};

/**
 * Smart Response Generator
 * Main function that processes user messages and generates appropriate responses
 */
export const generateSmartResponse = (userMessage, currentPage = 'home') => {
  const state = conversationState;
  const lowerMsg = userMessage.toLowerCase().trim();
  
  state.setCurrentPage(currentPage);
  
  // --- Check for Global Navigation / Cancellation ---
  
  const negations = ['no', 'nah', 'nope', 'cancel', 'stop', 'main menu', 'menu', '3'];
  const isNegation = negations.some(neg => lowerMsg === neg || lowerMsg.startsWith(neg));
  const defaultGreeting = `Hello! 👋 Welcome to the Youth Portal.\n\nHow can I help you today? You can ask me about:\n🎓 Courses and training\n🚀 Starting a business\n💰 Funding (NSFAS, bursaries)\n💼 Jobs and careers\n🏥 Health and wellbeing\n📄 CV and application help\n\nJust ask me anything!`;

  if (isNegation || lowerMsg === 'hello' || lowerMsg === 'hey') {
    state.reset();
    state.addToHistory(userMessage, defaultGreeting);
    return { response: defaultGreeting, flow: null };
  }

  // --- Check for Interrupt (New Intent while in an Active Flow) ---

  const newIntent = intentRecognition.identify(userMessage);

  if (state.isInFlow() && newIntent && newIntent !== state.currentFlow) {
    // INTERRUPT: The user is asking a brand new question
    state.reset(); // Clear the old flow state

    // Check if this is a quick info request
    if (newIntent === 'info') {
        const infoResponse = handleQuickAnswer(userMessage, state.currentPage);
        if (infoResponse) {
            state.addToHistory(userMessage, infoResponse);
            return { response: infoResponse, flow: null };
        }
    }

    // Process the new intent immediately
    const flow = conversationFlows[newIntent];
    if (flow) {
        state.currentFlow = newIntent;
        state.currentStep = 0;
        
        if (newIntent === 'health' && lowerMsg.includes('i feel sick')) {
             const healthResponse = `${flow.intro} Just look for the headline **Medical Chat Assistance**.`;
             state.addToHistory(userMessage, healthResponse);
             state.reset(); 
             return { response: healthResponse, flow: null };
        } else if (flow.steps.length > 0) {
            const firstQuestion = flow.steps[0].question;
            const botResponse = `⚠️ **Interrupt Detected!** I've stopped the previous conversation. Starting the **${newIntent.toUpperCase()}** flow now.\n\n${flow.intro}\n\nLet's start:\n\n${firstQuestion}`;
            state.addToHistory(userMessage, botResponse);
            return { response: firstQuestion, flow: newIntent, step: state.currentStep };
        }
    }
  }

  // --- Active Flow Continuation ---

  if (state.isInFlow() && conversationFlows[state.currentFlow]) {
    const flow = conversationFlows[state.currentFlow];
    const currentStepIndex = state.currentStep;

    if (currentStepIndex < flow.steps.length) {
      const currentStepData = flow.steps[currentStepIndex];

      // Validate and store the answer
      if (currentStepData.validate(userMessage)) {
        const extractedValue = currentStepData.extract(userMessage);
        state.storeData(currentStepData.field, extractedValue);

        // Check if this was the last question
        if (state.currentStep >= flow.steps.length - 1) {
          const finalResponse = flow.generateResponse(state.collectedData);
          state.reset();
          state.addToHistory(userMessage, finalResponse);
          return { response: finalResponse, flow: null, completed: true };
        } else {
          // Move to next question
          state.nextStep();
          const nextQuestion = flow.steps[state.currentStep].question;
          
          const botResponse = `Got it! ✅\n\n${nextQuestion}`;
          state.addToHistory(userMessage, nextQuestion);
          return { response: nextQuestion, flow: state.currentFlow, step: state.currentStep };
        }
      } else {
        // Invalid answer - repeat the current question
        const botResponse = `I didn't quite get that. Please provide a more complete answer for: ${currentStepData.question}`;
        state.addToHistory(userMessage, botResponse);
        return { response: botResponse, flow: state.currentFlow, step: state.currentStep };
      }
    }
  }
  
  // --- Start New Flow (If no interrupt and no active flow) ---

  if (newIntent) {
    // --- 1. Handle Quick Info Lookup & Flow Triggers (The 'info' and 'apply_guidance' intents) ---
    if (newIntent === 'info' || newIntent === 'apply_guidance') {
        const quickResponse = handleQuickAnswer(userMessage, state.currentPage);
        if (quickResponse) {
            // Check if this is a flow trigger
            if (quickResponse.isFlowTrigger) {
                const flowName = quickResponse.flowName;
                const flow = conversationFlows[flowName];
                if (flow && flow.steps.length > 0) {
                    state.currentFlow = flowName;
                    state.currentStep = 0;
                    state.collectedData = {};
                    const firstQuestion = flow.steps[0].question;
                    const botResponse = `${flow.intro}\n\nLet's start:\n\n${firstQuestion}`;
                    state.addToHistory(userMessage, botResponse);
                    return { response: botResponse, flow: flowName, step: state.currentStep };
                }
            }
            // Regular quick answer
            state.addToHistory(userMessage, quickResponse);
            return { response: quickResponse, flow: null };
        }
    }

    if (conversationFlows[newIntent]) {
      // Start new flow immediately
      state.currentFlow = newIntent;
      state.currentStep = 0;
      state.collectedData = {};

      const flow = conversationFlows[newIntent];
      
      // --- 2. Handle Health/Emergency Direct Answer ---
      if (newIntent === 'health' && lowerMsg.includes('i feel sick')) {
           const healthResponse = `${flow.intro} Just look for the headline **Medical Chat Assistance**.`;
           state.addToHistory(userMessage, healthResponse);
           state.reset(); 
           return { response: healthResponse, flow: null };
      }

      // --- 3. Start Multi-Step Flow ---
      if (flow.steps.length > 0) {
          const firstQuestion = flow.steps[0].question;
          const botResponse = `${flow.intro}\n\nLet's start:\n\n${firstQuestion}`;
          state.addToHistory(userMessage, firstQuestion);
          return { response: firstQuestion, flow: newIntent, step: state.currentStep };
      }
    }
  }
  
  // --- Default Clarification ---

  state.addToHistory(userMessage, defaultGreeting);
  return {
    response: defaultGreeting,
    flow: null,
    needsClarification: true
  };
};


export default {
  conversationState,
  intentRecognition,
  conversationFlows,
  generateSmartResponse
};


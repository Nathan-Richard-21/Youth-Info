// ============================================================================
// CONTEXTUAL YOUTH PORTAL ASSISTANT
// Smart, page-aware chatbot that helps users navigate and understand the portal
// ============================================================================

/**
 * Page Context Definitions
 * Defines what the assistant knows about each page
 */
export const pageContexts = {
  home: {
    en: {
      description: "You're on the home page. From here you can explore all opportunities available to youth in Eastern Cape.",
      features: [
        "Browse bursaries and scholarships",
        "Find job opportunities and internships",
        "Explore learnerships and training programs",
        "Access business funding information",
        "Get health support through Medical Chat",
        "Join community forums",
        "View success stories"
      ],
      quickHelp: "I can help you navigate to any section or explain what each opportunity type means."
    },
    xh: {
      description: "Ukwiphepha lasekhaya. Apha ungaphonononga onke amathuba afumanekayo kulutsha lwaseMpuma Koloni.",
      features: [
        "Khangela iibhasari nezibonelelo",
        "Fumana amathuba emisebenzi kunye nokuqeqeshela",
        "Phonononga iilearnerships kunye neenkqubo zoqeqesho",
        "Fikelela ulwazi lwenkxaso yeshishini",
        "Fumana inkxaso yempilo ngeNcoko yezeMpilo",
        "Joyina iiforum zoluntu",
        "Jonga amabali empumelelo"
      ],
      quickHelp: "Ndingakunceda uye nakuphi na icandelo okanye ndicacise ukuba yintoni uhlobo ngalunye lwethuba."
    }
  },

  bursaries: {
    en: {
      description: "You're on the Bursaries & Scholarships page. Here you can find financial aid for your education.",
      features: [
        "Search bursaries by field of study",
        "Filter by education level (Grade 12, University, etc.)",
        "View application deadlines",
        "See requirements for each bursary",
        "Apply directly through the portal"
      ],
      quickHelp: "Ask me about specific bursaries, how to apply, or what documents you need."
    },
    xh: {
      description: "Ukwiphepha lweIibhasari neZibonelelo. Apha ungafumana uncedo lwemali yemfundo yakho.",
      features: [
        "Khangela iibhasari ngentsimi yokufunda",
        "Hlola ngenqanaba lemfundo (iGrade 12, iYunivesithi, njl.)",
        "Jonga imihla yokugqibela yokufaka izicelo",
        "Bona iimfuno zebhasi nganye",
        "Faka isicelo ngqo kwiportal"
      ],
      quickHelp: "Ndibuze ngeebhasari ezithile, indlela yokufaka isicelo, okanye maxwebhu ofuna wona."
    }
  },

  careers: {
    en: {
      description: "You're on the Careers page. Find jobs, internships, and graduate programs.",
      features: [
        "Search by job type (Full-time, Internship, Graduate Program)",
        "Filter by location",
        "View company profiles",
        "See salary ranges and benefits",
        "Apply with one click"
      ],
      quickHelp: "Ask me about specific jobs, how to prepare for interviews, or CV tips."
    },
    xh: {
      description: "Ukwiphepha leMisebenzi. Fumana imisebenzi, ukuqeqeshela, neenkqubo zabafundi.",
      features: [
        "Khangela ngohlobo lomsebenzi (Ixesha elipheleleyo, Ukuqeqeshela, Inkqubo yabafundi)",
        "Hlola ngendawo",
        "Jonga iiprofayile zeenkampani",
        "Bona imimandla yomvuzo kunye neenzuzo",
        "Faka isicelo ngokucofa kanye"
      ],
      quickHelp: "Ndibuze ngemisebenzi ethile, indlela yokulungiselela udliwano-ndlebe, okanye iingcebiso ze-CV."
    }
  },

  learnerships: {
    en: {
      description: "You're on the Learnerships page. Learn while you earn with structured training programs.",
      features: [
        "Find learnerships in various fields",
        "See duration and stipend information",
        "Understand NQF levels and qualifications",
        "Learn about application requirements",
        "Connect with current learners in forums"
      ],
      quickHelp: "Ask me what a learnership is, which fields are available, or how to apply."
    },
    xh: {
      description: "Ukwiphepha lweLearnerships. Funda ngelixa uzuza ngeenkqubo zoqeqesho ezicwangcisiweyo.",
      features: [
        "Fumana iilearnerships kumacandelo ahlukeneyo",
        "Bona ulwazi lwexesha kunye nesibonelelo",
        "Qonda amanqanaba eNQF kunye neziqinisekiso",
        "Funda ngeemfuno zokufaka isicelo",
        "Qhagamshelana nabafundi bangoku kwiiforum"
      ],
      quickHelp: "Ndibuze ukuba yintoni ilearnership, ngamacandelo aphi akhoyo, okanye indlela yokufaka isicelo."
    }
  },

  'business-funding': {
    en: {
      description: "You're on the Business Funding page. Find grants, loans, and support for young entrepreneurs.",
      features: [
        "Browse business grants and loans",
        "Find entrepreneurship competitions",
        "Access business development programs",
        "Learn about NYDA funding",
        "Get mentorship opportunities"
      ],
      quickHelp: "Ask me about specific funding options, how to start a business, or what documents you need."
    },
    xh: {
      description: "Ukwiphepha lweNkxaso yeShishini. Fumana izibonelelo, iimali-mboleko, nenkxaso yoosomashishana abatsha.",
      features: [
        "Khangela izibonelelo zeshishini neemali-mboleko",
        "Fumana ukhuphiswano lwezamashishana",
        "Fikelela kwiinkqubo zophuhliso lweshishini",
        "Funda ngemali ye-NYDA",
        "Fumana amathuba okufundiswa"
      ],
      quickHelp: "Ndibuze ngokhetho oluthile lwenkxaso, indlela yokuqalisa ishishini, okanye maxwebhu ofuna wona."
    }
  },

  'medical-chat': {
    en: {
      description: "You're on the Medical Chat page. Get confidential health information and support.",
      features: [
        "Access mental health resources",
        "Get HIV/TB information",
        "Find reproductive health support",
        "Locate clinics and hospitals",
        "Emergency contact numbers",
        "Substance abuse help"
      ],
      quickHelp: "Ask me about specific health topics or where to find help."
    },
    xh: {
      description: "Ukwiphepha leNcoko yezeMpilo. Fumana ulwazi lwempilo oluyimfihlo nenkxaso.",
      features: [
        "Fikelela kwizixhobo zempilo yengqondo",
        "Fumana ulwazi lwe-HIV/TB",
        "Fumana inkxaso yempilo yokuzala",
        "Fumana iikliniki nezibhedlele",
        "Iinombolo zonxibelelwano lwangxamiseko",
        "Uncedo lokuxhaphaza iziyobisi"
      ],
      quickHelp: "Ndibuze ngezihloko ezithile zempilo okanye apho ufumana uncedo."
    }
  },

  forums: {
    en: {
      description: "You're on the Community Forums page. Connect with other youth, share experiences, and get advice.",
      features: [
        "Join topic-based discussions",
        "Ask questions to the community",
        "Share your success stories",
        "Get advice from peers",
        "Connect with mentors"
      ],
      quickHelp: "Ask me how to create a post, join a discussion, or find specific topics."
    },
    xh: {
      description: "Ukwiphepha leeForum zoLuntu. Qhagamshelana nolunye ulutsha, yabelana ngamava, kwaye ufumane iingcebiso.",
      features: [
        "Joyina iingxoxo ezisekelwe kwizihloko",
        "Buza imibuzo kuluntu",
        "Yabelana ngamabali akho empumelelo",
        "Fumana iingcebiso kubontanga",
        "Qhagamshelana nabaluleki"
      ],
      quickHelp: "Ndibuze indlela yokudala isithuba, ukujoyina ingxoxo, okanye ukufumana izihloko ezithile."
    }
  },

  events: {
    en: {
      description: "You're on the Events Calendar page. Find workshops, career fairs, and networking events.",
      features: [
        "Browse upcoming events",
        "Register for workshops",
        "Find career fairs",
        "See event locations and dates",
        "Get event reminders"
      ],
      quickHelp: "Ask me about specific events, how to register, or what's happening near you."
    },
    xh: {
      description: "Ukwiphepha leKhalenda yeMicimbi. Fumana iindibano, iifairs zomsebenzi, kunye nemicimbi yothethwano.",
      features: [
        "Khangela imicimbi ezayo",
        "Bhalisa kwiindibano",
        "Fumana iifairs zomsebenzi",
        "Bona iindawo nemihla yemicimbi",
        "Fumana izikhumbuzo zemicimbi"
      ],
      quickHelp: "Ndibuze ngemicimbi ethile, indlela yokubhalisa, okanye into eyenzekayo kufutshane nawe."
    }
  },

  'success-stories': {
    en: {
      description: "You're on the Success Stories page. Get inspired by youth who found their path.",
      features: [
        "Read inspiring success stories",
        "Learn from others' journeys",
        "Share your own success story",
        "Filter by category (education, business, career)",
        "Connect with featured youth"
      ],
      quickHelp: "Ask me about specific success stories or how to share your own."
    },
    xh: {
      description: "Ukwiphepha lweAmabali eMpumelelo. Fumanisa ugqatso kulutsha olufumene indlela yalo.",
      features: [
        "Funda amabali empumelelo akhuthazayo",
        "Funda kuhambo lwabanye",
        "Yabelana ngebali lakho lempumelelo",
        "Hlola ngokweqonga (imfundo, ishishini, umsebenzi)",
        "Qhagamshelana nolutsha olubonakaliyo"
      ],
      quickHelp: "Ndibuze ngamabali athile empumelelo okanye indlela yokwabelana ngowakho."
    }
  },

  opportunities: {
    en: {
      description: "You're viewing an opportunity. Here you can see details and apply.",
      features: [
        "View detailed requirements",
        "Check application deadlines",
        "See contact information",
        "Save for later",
        "Apply directly"
      ],
      quickHelp: "Ask me about the requirements, application process, or similar opportunities."
    },
    xh: {
      description: "Ujonga ithuba. Apha ungabona iinkcukacha kwaye ufake isicelo.",
      features: [
        "Jonga iimfuno ezinzulu",
        "Jonga imihla yokugqibela yokufaka izicelo",
        "Bona ulwazi lonxibelelwano",
        "Gcina ukuze ujonga kamva",
        "Faka isicelo ngqo"
      ],
      quickHelp: "Ndibuze ngeemfuno, inkqubo yokufaka isicelo, okanye amathuba afanayo."
    }
  }
};

/**
 * Common Questions & Answers
 */
export const commonQuestions = {
  en: {
    navigation: {
      keywords: ['how do i', 'where is', 'find', 'navigate', 'go to', 'access', 'where can i'],
      responses: {
        bursaries: "To find bursaries, click on 'Bursaries' in the top menu. You can search and filter by field of study and education level.",
        careers: "For job opportunities, click on 'Careers' in the menu. You can filter by job type and location.",
        learnerships: "To explore learnerships, click 'Learnerships' in the menu. These are earn-while-you-learn programs.",
        business: "For business funding, click 'Business Funding' in the menu to see grants and loan options.",
        health: "To access health support, click 'Medical Chat' for confidential health information.",
        forums: "To connect with others, click 'Forums' in the menu to join community discussions.",
        events: "To see upcoming events, click 'Events' in the menu."
      }
    },
    
    application: {
      keywords: ['how to apply', 'apply', 'application', 'submit', 'apply for'],
      response: "To apply for any opportunity:\n1. Click on the opportunity you're interested in\n2. Read all requirements carefully\n3. Prepare your documents (ID, CV, certificates)\n4. Click the 'Apply' button\n5. Fill in the application form\n6. Submit and wait for confirmation\n\nNeed help with your CV? I can guide you through that too!"
    },
    
    requirements: {
      keywords: ['what do i need', 'requirements', 'documents', 'qualify', 'eligible'],
      response: "Most opportunities require:\n• Valid South African ID\n• Updated CV\n• Academic records/certificates\n• Proof of residence\n• Motivational letter (for some)\n\nSpecific requirements vary by opportunity. Check each listing for details."
    },
    
    account: {
      keywords: ['register', 'sign up', 'create account', 'login', 'profile'],
      response: "To create an account:\n1. Click 'Sign Up' in the top right\n2. Fill in your details\n3. Verify your email\n4. Complete your profile\n\nWith an account, you can save opportunities, track applications, and get personalized recommendations!"
    },
    
    cv: {
      keywords: ['cv', 'resume', 'curriculum vitae', 'how to write'],
      response: "A good CV includes:\n• Personal details\n• Education history\n• Work experience (or skills if no experience)\n• Achievements\n• References\n\nKeep it to 2 pages, use clear formatting, and tailor it to each opportunity. Would you like specific CV tips?"
    }
  },
  
  xh: {
    navigation: {
      keywords: ['ndiyifumana njani', 'iphi', 'fumana', 'ndingaya phi', 'fikelela', 'ndingaya kuphi'],
      responses: {
        bursaries: "Ukufumana iibhasari, cofa 'Iibhasari' kwimenyu ephezulu. Ungakhangela kwaye uhlole ngentsimi yokufunda neqondo lemfundo.",
        careers: "Ngamathuba emisebenzi, cofa 'Imisebenzi' kwimenyu. Ungahlola ngohlobo lomsebenzi nendawo.",
        learnerships: "Ukuphonononga iilearnerships, cofa 'Ukufunda nokusebenza' kwimenyu. Ezi ziinkqubo zokufunda ngelixa uzuza.",
        business: "Ngenkxaso yeshishini, cofa 'Inkxaso yeShishini' kwimenyu ukubona izibonelelo neemali-mboleko.",
        health: "Ukufikelela kwinkxaso yempilo, cofa 'Incoko yezeMpilo' ngolwazi lwempilo oluyimfihlo.",
        forums: "Ukuqhagamshelana nabanye, cofa 'Iiforum' kwimenyu ukujoyina iingxoxo zoluntu.",
        events: "Ukubona imicimbi ezayo, cofa 'Imicimbi' kwimenyu."
      }
    },
    
    application: {
      keywords: ['ndifaka njani isicelo', 'faka isicelo', 'isicelo', 'ngenisa', 'ndifake isicelo'],
      response: "Ukufaka isicelo ngalo naliphi na ithuba:\n1. Cofa kwithuba onomdla kulo\n2. Funda zonke iimfuno ngononophelo\n3. Lungiselela amaxwebhu akho (ID, CV, izatifikethi)\n4. Cofa iqhosha elithi 'Faka isicelo'\n5. Gcwalisa ifomu yesicelo\n6. Ngenisa kwaye ulinde isiqinisekiso\n\nUfuna uncedo nge-CV yakho? Ndingakukhokela kuloo nto!"
    },
    
    requirements: {
      keywords: ['ndifuna ntoni', 'iimfuno', 'amaxwebhu', 'kufaneleka', 'bafanelekile'],
      response: "Amathuba amaninzi afuna:\n• I-ID yaseMzantsi Afrika esebenzayo\n• I-CV ehlaziyiweyo\n• Iirekhodi zemfundo/izatifikethi\n• Ubungqina bokuhlala\n• Ileta yenkuthazo (kwezinye)\n\nIimfuno ezithile ziyahluka ngethuba. Khangela uluhlu ngalunye ngeenkcukacha."
    },
    
    account: {
      keywords: ['bhalisa', 'yenza iakhawunti', 'ngena', 'iprofayile'],
      response: "Ukwenza iakhawunti:\n1. Cofa 'Bhalisa' kwikona ephezulu ngasekunene\n2. Gcwalisa iinkcukacha zakho\n3. Qinisekisa i-imeyile yakho\n4. Gqibezela iprofayile yakho\n\nNgeakhawunti, ungagcina amathuba, ulandelele izicelo, kwaye ufumane iingcebiso ezilungiselelwe wena!"
    },
    
    cv: {
      keywords: ['i-cv', 'incwadi yomsebenzi', 'ndibhale njani'],
      response: "I-CV elungileyo iquka:\n• Iinkcukacha zobuqu\n• Imbali yemfundo\n• Amava omsebenzi (okanye izakhono ukuba awunayo)\n• Impumelelo\n• Iireferensi\n\nYigcine kumaphepha ama-2, sebenzisa ukufomatha okucacileyo, kwaye uyilungelelanise kwithuba ngalinye. Ungathanda iingcebiso ezithile ze-CV?"
    }
  }
};

/**
 * Generate personalized greeting based on user data
 */
export const generateGreeting = (user, language = 'en') => {
  const time = new Date().getHours();
  let greeting = '';
  
  if (language === 'xh') {
    if (time < 12) greeting = 'Molo';
    else if (time < 18) greeting = 'Molo';
    else greeting = 'Molo';
    
    if (user && user.name) {
      return `${greeting}, ${user.name}! 👋 Ndingakunceda njani namhlanje?`;
    }
    return `${greeting}! 👋 Wamkelekile kwiYouth Portal. Ndingakunceda njani?`;
  } else {
    if (time < 12) greeting = 'Good morning';
    else if (time < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    if (user && user.name) {
      return `${greeting}, ${user.name}! 👋 How can I help you today?`;
    }
    return `${greeting}! 👋 Welcome to the Youth Portal. How can I help you?`;
  }
};

/**
 * Get page-specific help
 */
export const getPageHelp = (page, language = 'en') => {
  const context = pageContexts[page];
  if (!context) {
    page = 'home'; // Default to home
  }
  
  const pageInfo = pageContexts[page][language];
  let response = `📍 ${pageInfo.description}\n\n`;
  response += `**${language === 'en' ? 'What you can do here:' : 'Ongakwenza apha:'}**\n`;
  pageInfo.features.forEach((feature, index) => {
    response += `${index + 1}. ${feature}\n`;
  });
  response += `\n💡 ${pageInfo.quickHelp}`;
  
  return response;
};

/**
 * Find answer to user question
 */
export const findAnswer = (question, page, user, language = 'en') => {
  const questionLower = question.toLowerCase();
  const qa = commonQuestions[language];
  
  // Check for page-specific questions
  if (questionLower.includes('this page') || questionLower.includes('eli phepha') || 
      questionLower.includes('what is this') || questionLower.includes('yintoni le')) {
    return getPageHelp(page, language);
  }
  
  // Check for navigation questions
  if (qa.navigation.keywords.some(kw => questionLower.includes(kw))) {
    // Check which page they're asking about
    for (const [key, response] of Object.entries(qa.navigation.responses)) {
      if (questionLower.includes(key) || questionLower.includes(key.replace('-', ' '))) {
        return response;
      }
    }
    // General navigation help
    return language === 'en' 
      ? "You can navigate using the menu at the top. Which section would you like to visit? (Bursaries, Careers, Learnerships, Business Funding, Medical Chat, Forums, Events, Success Stories)"
      : "Ungasebenzisa imenyu ephezulu ukuhamba. Leliphi icandelo ongathanda ukulindwendwela? (Iibhasari, Imisebenzi, Iilearnerships, Inkxaso yeShishini, Incoko yezeMpilo, Iiforum, Imicimbi, Amabali eMpumelelo)";
  }
  
  // Check for application questions
  if (qa.application.keywords.some(kw => questionLower.includes(kw))) {
    return qa.application.response;
  }
  
  // Check for requirements questions
  if (qa.requirements.keywords.some(kw => questionLower.includes(kw))) {
    return qa.requirements.response;
  }
  
  // Check for account questions
  if (qa.account.keywords.some(kw => questionLower.includes(kw))) {
    return qa.account.response;
  }
  
  // Check for CV questions
  if (qa.cv.keywords.some(kw => questionLower.includes(kw))) {
    return qa.cv.response;
  }
  
  // Default response with page context
  return language === 'en'
    ? `I'm here to help you navigate the Youth Portal and answer your questions about ${page === 'home' ? 'opportunities' : page}.\n\nYou can ask me:\n• How to navigate to different sections\n• How to apply for opportunities\n• What documents you need\n• Help with your CV\n• About this page\n\nWhat would you like to know?`
    : `Ndilapha ukukunceda uhambise iYouth Portal kwaye ndiphendule imibuzo yakho malunga ${page === 'home' ? 'namathuba' : 'ne' + page}.\n\nUngandibza:\n• Indlela yokuhambisa kumacandelo ahlukeneyo\n• Indlela yokufaka isicelo ngamathuba\n• Ngamaxwebhu ofuna wona\n• Uncedo nge-CV yakho\n• Ngeli phepha\n\nUngathanda ukwazi ntoni?`;
};

/**
 * Generate contextual response
 */
export const generateContextualResponse = (userMessage, currentPage, user, language = 'en') => {
  // Clean up page name
  const page = currentPage.replace('/', '') || 'home';
  
  // If it's a greeting, respond with personalized greeting
  const greetings = ['hello', 'hi', 'hey', 'molo', 'molweni', 'sawubona'];
  if (greetings.some(g => userMessage.toLowerCase().trim() === g)) {
    return {
      response: generateGreeting(user, language),
      type: 'greeting'
    };
  }
  
  // Find and return appropriate answer
  const response = findAnswer(userMessage, page, user, language);
  
  return {
    response,
    type: 'answer',
    page
  };
};

export default {
  pageContexts,
  commonQuestions,
  generateGreeting,
  getPageHelp,
  findAnswer,
  generateContextualResponse
};

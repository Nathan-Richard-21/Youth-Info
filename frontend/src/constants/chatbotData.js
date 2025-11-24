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

// Helper function to find matching answer with improved matching
export const findAnswer = (question, language, currentPage = 'home') => {
  const normalizedQuestion = question.toLowerCase().trim();
  const lang = language === 'xh' ? 'xh' : 'en';
  
  // Helper to check if keywords match - improved matching
  const matchesKeywords = (keywords) => {
    return keywords.some(keyword => {
      const normalizedKeyword = keyword.toLowerCase();
      // Check if any word in the question matches any word in the keyword
      const questionWords = normalizedQuestion.split(/\s+/);
      const keywordWords = normalizedKeyword.split(/\s+/);
      
      return keywordWords.some(kw => 
        questionWords.some(qw => qw.includes(kw) || kw.includes(qw))
      );
    });
  };

  // 1. Check page-specific questions first
  if (currentPage && CHATBOT_DATA.pages[currentPage]) {
    const pageData = CHATBOT_DATA.pages[currentPage][lang];
    if (pageData && matchesKeywords(pageData.keywords)) {
      return pageData.answer;
    }
  }

  // 2. Check all categories
  const categories = [
    CHATBOT_DATA.general[lang],
    CHATBOT_DATA.cvResume[lang],
    CHATBOT_DATA.funding[lang],
    CHATBOT_DATA.employment[lang],
    CHATBOT_DATA.platform[lang]
  ];

  for (const category of categories) {
    for (const item of category) {
      if (matchesKeywords(item.keywords)) {
        return item.answer;
      }
    }
  }

  // 3. Default response with page-specific context
  if (lang === 'xh') {
    const pageInfo = currentPage !== 'home' ? `\n\nUsekwiphepha: ${currentPage}. Ungandibuza ngeli phepha!` : '';
    return `Uxolo, andiqondi ngokupheleleyo umbuzo wakho. Ungandiphendula malunga:\n• Indlela yokusebenzisa eli phepha\n• Iinkcukacha malunga ne-CVs kunye ne-resumes\n• Ii-bursaries kunye namathuba\n• Ii-learnerships kunye nemisebenzi\n• Ukufaka izicelo\n• Iingcebiso zomsebenzi${pageInfo}\n\nNceda uzame ukubuza umbuzo wakho ngendlela eyahlukileyo okanye cofa omnye wamaqhosha angezantsi!`;
  }
  
  const pageInfo = currentPage !== 'home' ? `\n\nYou're on the ${currentPage} page. Feel free to ask me about it!` : '';
  return `I'm sorry, I don't fully understand your question. You can ask me about:\n• How to use this page\n• Information about CVs and resumes\n• Bursaries and opportunities\n• Learnerships and careers\n• How to apply\n• Job tips${pageInfo}\n\nPlease try rephrasing your question or click one of the quick action buttons below!`;
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

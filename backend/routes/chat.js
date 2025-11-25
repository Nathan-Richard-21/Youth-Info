const express = require('express');
const router = express.Router();
const { auth } = require('../utils/authMiddleware');

// GPT-powered career chatbot
router.post('/gpt', auth, async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Generate helpful response (mock for now, can integrate OpenAI later)
    const response = generateCareerResponse(message);
    return res.json({ message: response });
  } catch (err) {
    console.error('GPT Chat error:', err);
    res.status(500).json({ message: 'Sorry, I encountered an error. Please try again.' });
  }
});

// Generate career advice responses
function generateCareerResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('bursary') || lowerMessage.includes('scholarship')) {
    return `Great question about bursaries! Here are some tips:

1. **NSFAS**: Apply for the National Student Financial Aid Scheme if you're from a household earning less than R350,000/year
2. **Corporate Bursaries**: Companies like Sasol, Eskom, Anglo American offer bursaries
3. **Start Early**: Most open applications July-August
4. **Requirements**: Good academic record (60%+), financial need

Check our Bursaries page regularly for new opportunities!`;
  }
  
  if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
    return `CV Tips for South African Youth:

✅ **Keep it concise**: 1-2 pages maximum
✅ **Include**: Contact details, education, skills, work experience
✅ **Highlight achievements**: Use numbers where possible
✅ **Proofread**: No typos!
✅ **Tailor it**: Customize for each application

Use our Resume Builder tool!`;
  }
  
  if (lowerMessage.includes('interview')) {
    return `Interview Success Tips:

🎯 **Preparation**:
- Research the company
- Practice common questions
- Prepare your own questions

💼 **During Interview**:
- Dress professionally
- Arrive 10 minutes early
- Make eye contact and smile
- Use STAR method for examples

🤝 **Follow-up**:
- Send thank-you email within 24 hours

Good luck! 💪`;
  }
  
  if (lowerMessage.includes('learnership')) {
    return `Learnerships combine theory + practical work:

📚 **Benefits**:
- Earn while you learn
- Gain real work experience
- Nationally recognized qualification
- No student debt

🔍 **How to find**: Check our Learnerships page!

Popular fields: IT, Engineering, Finance, Healthcare`;
  }
  
  if (lowerMessage.includes('business') || lowerMessage.includes('funding')) {
    return `Business Funding Opportunities:

💰 **Government Support**:
- SEDA (Small Enterprise Development)
- NEF (National Empowerment Fund)
- IDC (Industrial Development Corp)

🚀 **Youth Programs**:
- Youth Enterprise Development Fund
- Awethu Project

Check our Business Funding page!`;
  }
  
  return `Hi! I'm your career assistant! 👋

I can help with:
🎓 Bursaries & Scholarships
💼 Career opportunities
📚 Learnerships
💰 Business Funding
📄 CV & Interview tips

What would you like to know?`;
}

// Medical info chatbot - interactive Q&A for health topics
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'No message' });
  const text = message.toLowerCase();
  
  // Mental health resources
  if (text.includes('mental') || text.includes('depression') || text.includes('anxiety') || text.includes('stress')) {
    return res.json({ reply: 'Mental Health Support:\n\n• SADAG (South African Depression and Anxiety Group): 0800 567 567\n• Lifeline: 0861 322 322\n• FAMSA Eastern Cape: 043 743 5111\n• Free counselling at local clinics\n\nYou can also visit youth-friendly clinics for confidential mental health support.' });
  }
  
  // HIV/TB information
  if (text.includes('hiv') || text.includes('aids') || text.includes('tb') || text.includes('tuberculosis')) {
    return res.json({ reply: 'HIV & TB Services:\n\n• Free HIV testing at all public clinics\n• ARV treatment available at designated clinics\n• TB screening and treatment programs\n• Eastern Cape Department of Health Hotline: 0800 032 364\n\nVisit your nearest clinic for confidential testing and treatment. All services are free.' });
  }
  
  // Reproductive health
  if (text.includes('pregnancy') || text.includes('contraception') || text.includes('family planning') || text.includes('pregnant')) {
    return res.json({ reply: 'Reproductive Health Services:\n\n• Free contraceptives at all clinics\n• Antenatal care for pregnant women\n• Youth-friendly clinics with confidential services\n• Family planning counselling\n\nAll public health facilities offer free reproductive health services for youth.' });
  }
  
  // General clinic info
  if (text.includes('clinic') || text.includes('hospital') || text.includes('doctor')) {
    return res.json({ reply: 'Healthcare Facilities:\n\n• Find your nearest clinic or hospital\n• Most services are free at public facilities\n• Bring your ID for registration\n• Emergency: 10177 or 082 911\n\nYouth-friendly services are available at designated clinics with trained staff for young people.' });
  }
  
  // Substance abuse
  if (text.includes('drug') || text.includes('alcohol') || text.includes('substance') || text.includes('addiction')) {
    return res.json({ reply: 'Substance Abuse Support:\n\n• SANCA Eastern Cape: 043 722 4456\n• Al-Anon/Alateen: 0861 435 722\n• Free rehabilitation programs available\n• Support groups in communities\n\nConfidential help is available. Reach out to start your recovery journey.' });
  }
  
  // Sexual health
  if (text.includes('sti') || text.includes('std') || text.includes('sexual health')) {
    return res.json({ reply: 'Sexual Health Information:\n\n• Free STI testing and treatment at clinics\n• Confidential services for youth\n• PrEP and PEP available for HIV prevention\n• Condoms distributed free at clinics\n\nVisit any public clinic for confidential testing and treatment.' });
  }
  
  // Vaccination
  if (text.includes('vaccine') || text.includes('vaccination') || text.includes('immunization')) {
    return res.json({ reply: 'Vaccination Services:\n\n• Free vaccinations at all clinics\n• COVID-19 vaccines available (12+ years)\n• Catch-up programs for missed childhood vaccines\n• HPV vaccine for girls and boys\n\nBring your vaccination card to your nearest clinic.' });
  }
  
  // Emergency
  if (text.includes('emergency') || text.includes('urgent') || text.includes('crisis')) {
    return res.json({ reply: 'Emergency Contacts:\n\n• Ambulance: 10177\n• Emergency: 082 911\n• Police: 10111\n• Rape Crisis: 021 447 9762\n• Suicide Crisis Line: 0800 567 567\n\nFor life-threatening emergencies, call immediately or go to your nearest hospital.' });
  }
  
  // Default/menu
  return res.json({ reply: 'Welcome to Medical Info Chat! 🏥\n\nI can help with:\n\n• Mental health support\n• HIV & TB information\n• Reproductive health\n• Clinic & hospital info\n• Substance abuse help\n• Sexual health\n• Vaccinations\n• Emergency contacts\n\nWhat would you like to know about?' });
});

module.exports = router;

import React, { useState, useRef, useEffect } from 'react'
import { Box, Container, TextField, Button, Paper, Typography, Chip, Avatar, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import api from '../api'

// Knowledge Base for FAQ
const knowledgeBase = [
  // Emergency Contacts
  { keywords: ['emergency', 'ambulance', 'call'], answer: '🚨 EMERGENCY CONTACTS\n\n• Emergency (Cell): 112\n• Ambulance: 10177\n• Police: 10111\n• Suicide Crisis: 0800 567 567\n• AIDS Helpline: 0800 012 322\n• Childline: 0800 055 555\n• GBV Helpline: 0800 428 428' },
  
  // HIV & TB
  { keywords: ['hiv', 'test', 'testing'], answer: 'HIV TESTING\n\nWhere can I get FREE HIV testing?\nAll government clinics and hospitals. No cost, no parental consent needed for youth.\n\nHIV symptoms?\nFever, headache, rash, swollen glands. Only testing confirms HIV status.' },
  { keywords: ['pep'], answer: 'WHAT IS PEP?\n\nEmergency HIV prevention - must start within 72 hours of exposure. Go to any clinic/hospital immediately.\n\nDon\'t wait. Act fast!' },
  { keywords: ['prep'], answer: 'WHAT IS PREP?\n\nDaily pill to prevent HIV - reduces risk by 90%. Available at most clinics.\n\nAsk about it at your clinic!' },
  { keywords: ['arv', 'treatment'], answer: 'FREE ARVs (HIV TREATMENT)\n\nWhere to get FREE ARVs?\nAll government clinics. Treatment is completely free.\n\nOnce on treatment, you can live a normal, healthy life!' },
  { keywords: ['tb', 'tuberculosis', 'cough'], answer: 'TB vs HIV\n\nTB = curable lung infection. HIV = manageable virus. Both have FREE treatment at clinics.\n\nTB symptoms?\nCough 2+ weeks, chest pain, fever, weight loss, night sweats.\n\nGet tested at any clinic!' },
  
  // Pregnancy & Reproductive Health
  { keywords: ['contraception', 'pregnant', 'pregnancy'], answer: 'PREGNANCY & CONTRACEPTION\n\nWhere to get contraception without parents?\nAll government clinics - confidential and free for youth.\n\nBest ways to prevent pregnancy?\n• Implant (3 years)\n• IUD (3-5 years)\n• Injection (3 months)\n• Pills\n• Condoms\n\nAll FREE at clinics!' },
  { keywords: ['i think i\'m pregnant', 'pregnant what to do'], answer: 'I THINK I\'M PREGNANT - WHAT TO DO?\n\nGet FREE test at any clinic.\n\nOptions available:\n1. Continue pregnancy\n2. Safe abortion (legal & free)\n3. Adoption\n\nYou have choices. Your right to confidential care.' },
  { keywords: ['sti', 'sexually transmitted'], answer: 'STI INFORMATION\n\nWhere to get STI testing/treatment?\nAll government clinics - FREE and confidential.\n\nHow to prevent STIs?\n• Condoms every time\n• Regular testing\n• Limit partners\n• Communication\n\nHave an STI? Get tested and treated FREE. Inform partners. Use condoms.' },
  { keywords: ['condom'], answer: 'HOW TO USE CONDOMS CORRECTLY\n\n✓ Check expiry date\n✓ Roll on erect penis\n✓ Leave space at tip\n✓ Use water-based lube only\n\nCondoms are FREE at all clinics!' },
  
  // Mental Health
  { keywords: ['depression', 'depressed', 'mental health'], answer: 'MENTAL HEALTH SUPPORT\n\nFeeling depressed - where to get help?\n• Clinic counselors\n• Helplines\n• Trusted adults\n• Treatment available\n\nFree mental health counseling?\nGovernment clinics, hospitals, helplines - all free.' },
  { keywords: ['anxiety', 'panic', 'panic attack'], answer: 'ANXIETY & PANIC ATTACKS\n\nWhat to do:\n1. Deep breathing\n2. Find a safe space\n3. Remind yourself it will pass\n4. Get counseling\n\nThis is treatable. You\'re not alone!' },
  { keywords: ['suicide', 'suicidal'], answer: 'SUICIDE CRISIS - GET HELP NOW!\n\n☎️ Call: 0800 567 567\n\nTake it seriously. Listen, don\'t leave alone, get immediate help.\n\nYour life matters. Help is available 24/7.' },
  { keywords: ['stress', 'exam', 'anxiety'], answer: 'MANAGING STRESS & EXAM ANXIETY\n\n✓ Exercise regularly\n✓ Sleep 8+ hours\n✓ Eat healthy food\n✓ Take breaks\n✓ Talk to someone\n✓ Deep breathing exercises\n\nYou can do this!' },
  
  // Substance Abuse
  { keywords: ['drug', 'drugs', 'substance', 'addiction'], answer: 'SUBSTANCE ABUSE - GET HELP\n\nHow to stop using drugs?\n1. Admit problem\n2. Tell trusted adult\n3. Go to clinic\n4. Call helpline: 0800 12 13 14\n\nIt\'s never too late to get help!' },
  { keywords: ['dangers', 'drug use', 'harm'], answer: 'DANGERS OF DRUG USE\n\n⚠️ Brain damage\n⚠️ School dropout\n⚠️ Health problems\n⚠️ Addiction\n⚠️ Legal issues\n⚠️ Poverty\n\nChoose yourself. Choose help.' },
  { keywords: ['addiction help', 'addiction', 'rehab'], answer: 'WHERE TO GET HELP FOR ADDICTION\n\n• Clinics\n• Harmony Clinic (East London)\n• Support groups\n• Helplines\n\nFree services available.' },
  
  // Vaccinations
  { keywords: ['vaccine', 'vaccination', 'hpv'], answer: 'VACCINATIONS FOR TEENS\n\nWhat vaccines do teens need?\n• HPV (cancer prevention)\n• Tdap\n• Flu shot\n\nAll FREE at clinics!\n\nWhat is HPV vaccine?\nPrevents cervical cancer - free for ages 9-26. Get before sexually active.' },
  { keywords: ['safe', 'vaccine safety'], answer: 'ARE VACCINES SAFE?\n\nYES! Vaccines are safe.\n\n✓ Extensively tested\n✓ Mild side effects normal\n✓ Benefits outweigh risks\n\nProtect yourself today!' },
  
  // Clinics & Hospitals
  { keywords: ['clinic', 'hospital', 'where'], answer: 'KEY HOSPITALS IN EASTERN CAPE\n\n• Mthatha General: 047 502 4000\n• Butterworth Hospital: 047 401 9000\n• Frere Hospital (EL): 043 709 2111\n• PE Provincial: 041 392 3911\n• Frontier Hospital: 045 808 4600\n\nClinic hours?\nWeekdays: 7:30 AM - 4:00 PM (call to confirm)' },
  { keywords: ['pay', 'cost', 'free'], answer: 'DO I HAVE TO PAY?\n\nNO - FREE for youth!\n\n✓ HIV/TB testing\n✓ Contraception\n✓ Vaccines\n✓ Mental health\n✓ Emergencies\n\nYour health is important.' },
  { keywords: ['youth friendly', 'youth-friendly'], answer: 'YOUTH-FRIENDLY CLINICS\n\nWhat are they?\nSpecial areas for youth - confidential, non-judgmental, shorter waits.\n\nWhere are they?\n• Emalangeni (Lusikisiki)\n• Chatty (PE)\n• Lingomso (Mdantsane)\n• Palmerton (Lusikisiki)\n\nCan I go without parents?\nYES - your right to confidential healthcare!' },
  
  // Crisis & Abuse
  { keywords: ['abuse', 'abused'], answer: 'BEING ABUSED - GET TO SAFETY\n\n☎️ Call police: 10111\n☎️ GBV helpline: 0800 428 428\n\nGet to safety first. Help is available. You deserve protection.' },
  { keywords: ['pressured', 'sex', 'sexual'], answer: 'PRESSURED INTO SEX?\n\nYou have the RIGHT to say NO!\n\n1. Leave the situation\n2. Tell a trusted adult\n3. Call Childline: 0800 055 555\n\nYour body, your choice!' },
  { keywords: ['sexual assault', 'rape', 'assault'], answer: 'SEXUAL ASSAULT - WHERE TO REPORT\n\n☎️ Police: 10111\n☎️ Hospital emergency\n☎️ GBV helpline: 0800 428 428\n\nAll confidential. You\'re not alone. Justice is possible.' },
  
  // Health Rights
  { keywords: ['rights', 'privacy', 'confidential'], answer: 'YOUR HEALTH RIGHTS\n\n✓ Confidential care - parents not told without permission\n✓ Free services - testing, contraception, counseling\n✓ Privacy - your medical information protected\n✓ Respect - treated with dignity\n✓ Information - understand your health choices\n✓ Safety - protection from abuse\n✓ Make decisions - about your own body' },
]

// Function to find best matching answer
const findAnswer = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase()
  
  for (let qa of knowledgeBase) {
    for (let keyword of qa.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return qa.answer
      }
    }
  }
  
  return null
}

const MedicalChat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Eastern Cape Youth Health Chatbot! 🏥\n\nI can help with:\n\n• Emergency contacts\n• HIV & TB information\n• Pregnancy & reproductive health\n• Mental health support\n• Substance abuse help\n• Vaccinations\n• Finding clinics & hospitals\n• Health rights & abuse support\n\nWhat would you like to know about?' }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickTopics = [
    'Emergency contacts', 
    'HIV/TB info', 
    'Contraception', 
    'Mental health',
    'Find a clinic', 
    'My health rights'
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text = message) => {
    if (!text.trim()) return
    const userMsg = { from: 'me', text }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setLoading(true)
    
    try {
      // Try to find answer from local knowledge base first
      const localAnswer = findAnswer(text)
      if (localAnswer) {
        const botMsg = { from: 'bot', text: localAnswer }
        setMessages(prev => [...prev, botMsg])
      } else {
        // Fall back to API if no local answer found
        const res = await api.post('/chat', { message: text })
        const botMsg = { from: 'bot', text: res.data.reply }
        setMessages(prev => [...prev, botMsg])
      }
    } catch (err) {
      // Use local answer if API fails
      const localAnswer = findAnswer(text)
      const botMsg = { from: 'bot', text: localAnswer || 'Sorry, I don\'t have information about that. Please try another question or visit your local clinic for personalized advice.' }
      setMessages(prev => [...prev, botMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickTopic = (topic) => {
    send(topic)
  }

  return (
    <Box>
      <Box sx={{ bgcolor: '#ec4899', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocalHospitalIcon sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>Medical Information Chat</Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>Get confidential health info & support</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Chat Messages */}
          <Box sx={{ p: 3, height: 500, overflowY: 'auto', bgcolor: '#f8fafc' }}>
            {messages.map((m, i) => (
              <Box 
                key={i} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                {m.from === 'bot' && (
                  <Avatar sx={{ bgcolor: '#ec4899', mr: 1 }}>
                    <LocalHospitalIcon />
                  </Avatar>
                )}
                <Paper 
                  sx={{ 
                    p: 2, 
                    maxWidth: '70%',
                    bgcolor: m.from === 'me' ? '#6366f1' : 'white',
                    color: m.from === 'me' ? 'white' : 'text.primary'
                  }}
                >
                  <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                    {m.text}
                  </Typography>
                </Paper>
                {m.from === 'me' && (
                  <Avatar sx={{ bgcolor: '#6366f1', ml: 1 }}>U</Avatar>
                )}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#ec4899' }}><LocalHospitalIcon /></Avatar>
                <Typography variant="body2" color="text.secondary">Typing...</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Topics */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
            <Typography variant="body2" color="text.secondary" mb={1}>Quick topics:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickTopics.map((topic, i) => (
                <Chip 
                  key={i} 
                  label={topic} 
                  onClick={() => handleQuickTopic(topic)}
                  clickable
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          {/* Input */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 1, bgcolor: 'white' }}>
            <TextField 
              fullWidth 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && send()}
              placeholder="Type your question..."
              variant="outlined"
              disabled={loading}
            />
            <Button 
              variant="contained" 
              onClick={() => send()}
              disabled={!message.trim() || loading}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Paper>

        {/* Disclaimer */}
        <Paper sx={{ p: 2, mt: 3, bgcolor: '#fef3c7' }}>
          <Typography variant="body2" fontWeight={600} gutterBottom>
            ⚠️ Important Notice
          </Typography>
          <Typography variant="body2">
            This chatbot provides general health information only. For medical emergencies, call 10177 or visit your nearest hospital. Always consult healthcare professionals for medical advice.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default MedicalChat

import React, { useState } from 'react'
import {
  Box, Container, Typography, Paper, Tabs, Tab, Divider, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon,
  ListItemText, Chip, Button
} from '@mui/material'
import {
  ExpandMore, Check, Security, Gavel, Info, Policy, Lock,
  Visibility, Share, Cookie, Update, Email
} from '@mui/icons-material'
import { useLanguage } from '../context/LanguageContext'

const TermsAndPrivacy = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { language } = useLanguage()

  const content = {
    en: {
      pageTitle: 'Terms & Privacy',
      pageSubtitle: 'Your rights, our commitments',
      termsTab: 'Terms & Conditions',
      privacyTab: 'Privacy Policy',
      lastUpdated: 'Last Updated',
      date: 'November 26, 2025',
      
      // Terms & Conditions
      terms: {
        title: 'Terms and Conditions',
        intro: 'Welcome to Youth Info Portal. By accessing and using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully.',
        
        sections: [
          {
            title: '1. Acceptance of Terms',
            icon: <Gavel />,
            content: [
              'By creating an account or using our services, you confirm that you are at least 13 years old or have parental consent.',
              'You agree to provide accurate, current, and complete information during registration.',
              'You are responsible for maintaining the confidentiality of your account credentials.',
              'You agree to accept responsibility for all activities that occur under your account.'
            ]
          },
          {
            title: '2. Use of Services',
            icon: <Check />,
            content: [
              'Our platform provides information about bursaries, careers, learnerships, and business opportunities in the Eastern Cape.',
              'You may use our services for personal, non-commercial purposes only.',
              'You agree not to reproduce, duplicate, copy, sell, or exploit any portion of the service without express written permission.',
              'We reserve the right to modify, suspend, or discontinue any part of our services at any time.'
            ]
          },
          {
            title: '3. User Responsibilities',
            icon: <Info />,
            content: [
              'You must not post false, inaccurate, misleading, or fraudulent content.',
              'You must not upload viruses or malicious code.',
              'You must not harass, abuse, or harm other users.',
              'You must not violate any local, provincial, national, or international law.',
              'You must not impersonate any person or entity or falsely state your affiliation with a person or entity.'
            ]
          },
          {
            title: '4. Intellectual Property',
            icon: <Policy />,
            content: [
              'All content on Youth Info Portal, including text, graphics, logos, and software, is owned by us or our licensors.',
              'You may not copy, modify, distribute, or create derivative works without permission.',
              'User-generated content remains the property of the user but grants us a license to use it on our platform.',
              'Trademarks and service marks displayed are the property of their respective owners.'
            ]
          },
          {
            title: '5. Third-Party Links',
            icon: <Share />,
            content: [
              'Our platform may contain links to third-party websites or services.',
              'We are not responsible for the content, privacy policies, or practices of third-party sites.',
              'Access to third-party links is at your own risk.',
              'We do not endorse or assume any responsibility for third-party content or services.'
            ]
          },
          {
            title: '6. Disclaimer of Warranties',
            icon: <Security />,
            content: [
              'Our services are provided "as is" and "as available" without warranties of any kind.',
              'We do not guarantee that our services will be uninterrupted, secure, or error-free.',
              'We do not warrant the accuracy, completeness, or usefulness of any information.',
              'You use our services at your own risk.'
            ]
          },
          {
            title: '7. Limitation of Liability',
            icon: <Info />,
            content: [
              'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
              'Our total liability shall not exceed the amount paid by you, if any, for using our services.',
              'Some jurisdictions do not allow limitations on liability, so these limitations may not apply to you.'
            ]
          },
          {
            title: '8. Changes to Terms',
            icon: <Update />,
            content: [
              'We reserve the right to modify these terms at any time.',
              'Changes will be posted on this page with an updated revision date.',
              'Continued use of our services after changes constitutes acceptance of the new terms.',
              'We encourage you to review these terms periodically.'
            ]
          },
          {
            title: '9. Contact Information',
            icon: <Email />,
            content: [
              'For questions about these Terms and Conditions, please contact us:',
              'Email: support@youthportal.co.za',
              'Phone: 041 123 4567',
              'Address: Eastern Cape, South Africa'
            ]
          }
        ]
      },

      // Privacy Policy
      privacy: {
        title: 'Privacy Policy',
        intro: 'Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use Youth Info Portal.',
        
        sections: [
          {
            title: '1. Information We Collect',
            icon: <Visibility />,
            content: [
              'Personal Information: Name, email address, phone number, date of birth, ID number (for applications).',
              'Profile Information: Education level, location, interests, career preferences.',
              'Usage Data: Pages visited, time spent, links clicked, device information.',
              'Application Data: Information you provide when applying for opportunities.',
              'Communication Data: Messages sent through our chat or forum features.'
            ]
          },
          {
            title: '2. How We Use Your Information',
            icon: <Check />,
            content: [
              'To provide and maintain our services.',
              'To process your applications for opportunities.',
              'To send you notifications about new opportunities matching your profile.',
              'To improve our platform and user experience.',
              'To communicate with you about updates, security alerts, and support.',
              'To detect, prevent, and address technical issues or fraud.',
              'To comply with legal obligations and protect rights.'
            ]
          },
          {
            title: '3. Information Sharing',
            icon: <Share />,
            content: [
              'Opportunity Providers: When you apply, we share relevant information with the organization.',
              'Service Providers: We may use third-party companies for analytics, hosting, and support.',
              'Legal Requirements: We may disclose information if required by law or to protect rights.',
              'Business Transfers: In case of merger or acquisition, your information may be transferred.',
              'We do not sell your personal information to third parties.'
            ]
          },
          {
            title: '4. Data Security',
            icon: <Lock />,
            content: [
              'We use industry-standard security measures to protect your information.',
              'Data is encrypted in transit using SSL/TLS protocols.',
              'Access to personal information is restricted to authorized personnel only.',
              'We regularly review and update our security practices.',
              'However, no method of transmission over the internet is 100% secure.',
              'You are responsible for maintaining the security of your account credentials.'
            ]
          },
          {
            title: '5. Your Rights',
            icon: <Policy />,
            content: [
              'Access: You can request a copy of your personal information.',
              'Correction: You can update or correct your information in your profile.',
              'Deletion: You can request deletion of your account and personal data.',
              'Objection: You can object to certain processing of your information.',
              'Portability: You can request your data in a structured, machine-readable format.',
              'Withdraw Consent: You can withdraw consent for optional data processing.',
              'To exercise these rights, contact us at privacy@youthportal.co.za'
            ]
          },
          {
            title: '6. Cookies and Tracking',
            icon: <Cookie />,
            content: [
              'We use cookies and similar technologies to enhance user experience.',
              'Essential Cookies: Required for basic site functionality.',
              'Analytics Cookies: Help us understand how users interact with our platform.',
              'Preference Cookies: Remember your settings and preferences.',
              'You can control cookies through your browser settings.',
              'Disabling cookies may limit functionality of our services.'
            ]
          },
          {
            title: '7. Children\'s Privacy',
            icon: <Security />,
            content: [
              'Our services are intended for users aged 13 and above.',
              'Users under 18 should have parental consent to use our platform.',
              'We do not knowingly collect information from children under 13.',
              'If we discover such collection, we will delete the information promptly.',
              'Parents can contact us to review, delete, or stop collection of their child\'s information.'
            ]
          },
          {
            title: '8. Data Retention',
            icon: <Update />,
            content: [
              'We retain your information for as long as your account is active.',
              'After account deletion, some information may be retained for legal or legitimate business purposes.',
              'Application data may be retained for record-keeping requirements.',
              'You can request deletion of your data at any time.',
              'Anonymized data may be retained for analytics purposes.'
            ]
          },
          {
            title: '9. International Transfers',
            icon: <Share />,
            content: [
              'Your information may be transferred to servers located outside South Africa.',
              'We ensure adequate safeguards are in place for such transfers.',
              'We comply with applicable data protection laws regarding international transfers.'
            ]
          },
          {
            title: '10. Changes to Privacy Policy',
            icon: <Update />,
            content: [
              'We may update this Privacy Policy from time to time.',
              'Changes will be posted on this page with a new "Last Updated" date.',
              'Significant changes will be communicated via email or notification.',
              'We encourage you to review this policy periodically.'
            ]
          },
          {
            title: '11. Contact Us',
            icon: <Email />,
            content: [
              'For questions about this Privacy Policy or our data practices:',
              'Email: privacy@youthportal.co.za',
              'Phone: 041 123 4567',
              'Address: Eastern Cape, South Africa',
              'Data Protection Officer: dpo@youthportal.co.za'
            ]
          }
        ]
      }
    },

    xh: {
      pageTitle: 'Imiqathango Nabucala',
      pageSubtitle: 'Amalungelo akho, izibophelelo zethu',
      termsTab: 'Imiqathango Neemeko',
      privacyTab: 'Umgaqo-nkqubo Wabucala',
      lastUpdated: 'Uhlaziywe Okugqibela',
      date: 'Novemba 26, 2025',
      
      // Terms & Conditions in isiXhosa
      terms: {
        title: 'Imiqathango Neemeko',
        intro: 'Wamkelekile kwiYouth Info Portal. Ngokufikelela kwaye usebenzise iqonga lethu, uyavuma ukuboshwa yile Miqathango Neemeko. Nceda uyifunde ngononophelo.',
        
        sections: [
          {
            title: '1. Ukwamkelwa Kwemiqathango',
            icon: <Gavel />,
            content: [
              'Ngokudala i-akhawunti okanye ukusebenzisa iinkonzo zethu, uyaqinisekisa ukuba uneminyaka eli-13 ubudala okanye unayo imvume yabazali.',
              'Uyavuma ukubonelela ngolwazi oluchanileyo, olukhoyo, nolupheleleyo ngexesha lokubhalisa.',
              'Unoxanduva lokugcina imfihlo yeziqinisekiso ze-akhawunti yakho.',
              'Uyavuma ukwamkela uxanduva lwayo yonke imisebenzi eyenzekayo phantsi kwe-akhawunti yakho.'
            ]
          },
          {
            title: '2. Ukusetyenziswa Kweenkonzo',
            icon: <Check />,
            content: [
              'Iqonga lethu libonelela ngolwazi malunga nezibonelelo zemfundo, imisebenzi, ukufundiswa, namathuba oshishino eMpuma Koloni.',
              'Unokusebenzisa iinkonzo zethu ngeenjongo zobuqu ezingezorhwebo kuphela.',
              'Uyavuma ukungaphindi, ukungaphinda-phinda, ukukopa, ukuthengisa, okanye ukuxhaphaza naliphi na inxalenye yenkonzo ngaphandle kwemvume ebhaliweyo.',
              'Sigcina ilungelo lokulungisa, ukunqumamisa, okanye ukuyeka naliphi na inxalenye yeenkonzo zethu nangaliphi na ixesha.'
            ]
          },
          {
            title: '3. Iimbopheleleko Zabasebenzisi',
            icon: <Info />,
            content: [
              'Akufanele uthumele umxholo obubuxoki, ongachananga, olahlekisayo, okanye obuqhophololo.',
              'Akufanele ulayishe iintsholongwane okanye ikhowudi enonya.',
              'Akufanele uxhaphaze, ugxeke, okanye wonzakalise abanye abasebenzisi.',
              'Akufanele waphule nawuphi na umthetho wendawo, wephondo, wesizwe, okanye wamazwe ngamazwe.',
              'Akufanele uzenze umntu okanye umbutho okanye ubuxokise ngobudlelwane bakho nomntu okanye umbutho.'
            ]
          },
          {
            title: '4. Ipropathi Yobukrelekrele',
            icon: <Policy />,
            content: [
              'Lonke ulwazi kwiYouth Info Portal, kubandakanya umbhalo, imizobo, iilogo, kunye nesoftware, yeyethu okanye yabanikezeli belayisensi.',
              'Awunakukopa, ukulungisa, ukusasaza, okanye ukudala imisebenzi ephuma ngaphandle kwemvume.',
              'Umxholo owenziwe ngumsebenzisi uhlala uyipropathi yomsebenzisi kodwa usinika ilayisensi yokuwusebenzisa kwiqonga lethu.',
              'Iimpawu zorhwebo kunye neempawu zenkonzo ezibonisiweyo ziyipropathi yabanini bazo.'
            ]
          },
          {
            title: '5. Amakhonkco Abantu Besithathu',
            icon: <Share />,
            content: [
              'Iqonga lethu linokuba namakhonkco kwiwebhusayithi okanye iinkonzo zabantu besithathu.',
              'Asinoxanduva lomxholo, imigaqo-nkqubo yabucala, okanye iindlela zabantu besithathu.',
              'Ukufikelela kumakhonkco abantu besithathu kumngcipheko wakho.',
              'Asikuxhasi okanye sithabathe nawuphi na uxanduva lomxholo okanye iinkonzo zabantu besithathu.'
            ]
          },
          {
            title: '6. Ukuchasa Iziqinisekiso',
            icon: <Security />,
            content: [
              'Iinkonzo zethu zibonelelwa "njengoko zinjalo" kunye "njengoko zifumaneka" ngaphandle kweziqinisekiso zalo naluphi na uhlobo.',
              'Asiqinisekisi ukuba iinkonzo zethu azisayi kuphazanyiswa, zikhuselekile, okanye azinampazamo.',
              'Asiqinisekisi ukuchaneka, ukuphelela, okanye ukuba luncedo kolwazi.',
              'Usebenzisa iinkonzo zethu kumngcipheko wakho.'
            ]
          },
          {
            title: '7. Umda Woxanduva',
            icon: <Info />,
            content: [
              'Asiyi kuba noxanduva lwamonzakalo angathanga ngqo, awehlelayo, akhethekileyo, awumphumo, okanye owohlwayo.',
              'Uxanduva lwethu lupheleleyo alufanele ludlule isixa esihlanjiweyo nguwe, ukuba ikho, ngokusebenzisa iinkonzo zethu.',
              'Ezinye iindawo azivumeli imida kuxanduva, ngoko ezi mida zisenokungasebenzi kuwe.'
            ]
          },
          {
            title: '8. Utshintsho Kwimiqathango',
            icon: <Update />,
            content: [
              'Sigcina ilungelo lokulungisa le miqathango nangaliphi na ixesha.',
              'Utshintsho luya kuthi lwafakwe kule phepha kunye nomhla ohlaziyiweyo.',
              'Ukuqhubeka nokusebenzisa iinkonzo zethu emva kotshintsho kuthetha ukwamkelwa kwemiqathango emitsha.',
              'Siyakukhuthaza ukuba uhlole le miqathango ngamaxesha athile.'
            ]
          },
          {
            title: '9. Ulwazi Loqhagamshelwano',
            icon: <Email />,
            content: [
              'Ngeemibuzo malunga nale Miqathango Neemeko, nceda uqhagamshelane nathi:',
              'I-imeyili: support@youthportal.co.za',
              'Umnxeba: 041 123 4567',
              'Idilesi: Empuma Koloni, Mzantsi Afrika'
            ]
          }
        ]
      },

      // Privacy Policy in isiXhosa
      privacy: {
        title: 'Umgaqo-nkqubo Wabucala',
        intro: 'Ubucala bakho bubalulekile kuthi. Lo Mgaqo-nkqubo Wabucala ucacisa indlela esiqokelela ngayo, esisebenzisa ngayo, esityhila ngayo, kunye nokukhusela ulwazi lwakho xa usebenzisa iYouth Info Portal.',
        
        sections: [
          {
            title: '1. Ulwazi Esiqokelelayo',
            icon: <Visibility />,
            content: [
              'Ulwazi Lobuqu: Igama, idilesi ye-imeyili, inombolo yomnxeba, umhla wokuzalwa, inombolo ye-ID (kwizicelo).',
              'Ulwazi Lweprofayili: Inqanaba lemfundo, indawo, umdla, ukhetho lomsebenzi.',
              'Idatha Yokusetyenziswa: Amaphepha atyeleleyo, ixesha elichithiweyo, amakhonkco acofiweyo, ulwazi lwesixhobo.',
              'Idatha Yesicelo: Ulwazi olunikayo xa ufaka isicelo samathuba.',
              'Idatha Yonxibelelwano: Imiyalezo ethunyelwe ngoncedo lwethu lwencoko okanye iforamu.'
            ]
          },
          {
            title: '2. Indlela Esisebenzisa Ngayo Ulwazi Lwakho',
            icon: <Check />,
            content: [
              'Ukubonelela nokugcina iinkonzo zethu.',
              'Ukuqhuba izicelo zakho zamathuba.',
              'Ukuthuthela izaziso malunga namathuba amatsha ahambelana neprofayile yakho.',
              'Ukuphucula iqonga lethu namava omsebenzisi.',
              'Ukunxibelelana nawe malunga nohlaziyo, izilumkiso zokhuseleko, kunye nenkxaso.',
              'Ukufumanisa, ukuthintela, kunye nokujongana neemiba zobugcisa okanye ubuqhophololo.',
              'Ukuthobela izibophelelo zomthetho kunye nokukhusela amalungelo.'
            ]
          },
          {
            title: '3. Ukwabelana Ngolwazi',
            icon: <Share />,
            content: [
              'Ababoneleli Bamathuba: Xa ufaka isicelo, sabelana ngolwazi olufanelekileyo nombutho.',
              'Ababoneleli Beenkonzo: Sinokusebenzisa iinkampani zabantu besithathu zokuhlalutya, ukusingatha, kunye nenkxaso.',
              'Iimfuno Zomthetho: Sinokutyhila ulwazi ukuba kufunwa ngumthetho okanye ukukhusela amalungelo.',
              'Ukudluliselwa Kweshishini: Kwimeko yokuhlanganiswa okanye ukufunyanwa, ulwazi lwakho lunokudluliselwa.',
              'Asithengisi ulwazi lwakho lobuqu kubantu besithathu.'
            ]
          },
          {
            title: '4. Ukhuseleko Lwedatha',
            icon: <Lock />,
            content: [
              'Sisebenzisa amanyathelo okhuseleko omgangatho weshishini ukukhusela ulwazi lwakho.',
              'Idatha ibethelwe xa ihamba kusetyenziswa iiprothokholi ze-SSL/TLS.',
              'Ukufikelela kulwazi lobuqu kuqheliswe kubasebenzi abanegunyazisiweyo kuphela.',
              'Sihlola rhoqo kwaye sihlaziye iindlela zethu zokhuseleko.',
              'Noko ke, akukho ndlela yokudlulisela nge-intanethi ikhuseleke ngama-100%.',
              'Unoxanduva lokugcina ukhuseleko lweziqinisekiso ze-akhawunti yakho.'
            ]
          },
          {
            title: '5. Amalungelo Akho',
            icon: <Policy />,
            content: [
              'Ukufikelela: Unokucela ikopi yolwazi lwakho lobuqu.',
              'Ukulungisa: Unokuhlaziya okanye ukulungisa ulwazi lwakho kwiprofayile yakho.',
              'Ukucinywa: Unokucela ukucinywa kwe-akhawunti yakho kunye nedatha yobuqu.',
              'Ukuchasa: Unokuchasa ukuqhutywa okuthile kolwazi lwakho.',
              'Ukuphatheka: Unokucela idatha yakho kwifomathi eyakhiweyo, efundwa ngumatshini.',
              'Ukurhoxisa Imvume: Unokurhoxa imvume yokuqhuba idatha ekunokukhethwa kuyo.',
              'Ukusebenzisa la malungelo, qhagamshelana nathi ku privacy@youthportal.co.za'
            ]
          },
          {
            title: '6. Iikhukhi Nokulandelela',
            icon: <Cookie />,
            content: [
              'Sisebenzisa iikhukhi kunye nobuchwepheshe obufanayo ukuphucula amava omsebenzisi.',
              'Iikhukhi Ezibalulekileyo: Ziyafuneka ukusebenza okusisiseko kwesayithi.',
              'Iikhukhi Zokuhlalutya: Zisinceda siqonde indlela abasebenzisi abasebenzisa ngayo iqonga lethu.',
              'Iikhukhi Zokhetho: Zikhumbula izicwangciso kunye nezinto ozikhethayo.',
              'Unokuwulawula ulawulo lweekhukhi ngesethingi yesiphequluli sakho.',
              'Ukuvala iikhukhi kunokunciphisa ukusebenza kweenkonzo zethu.'
            ]
          },
          {
            title: '7. Ubucala Babantwana',
            icon: <Security />,
            content: [
              'Iinkonzo zethu zenzelwe abasebenzisi abaneminyaka eli-13 nangaphezulu.',
              'Abasebenzisi abangaphantsi kweminyaka eli-18 kufuneka babe nemvume yabazali yokusebenzisa iqonga lethu.',
              'Asiqokeleli ngabom ulwazi kubantwana abangaphantsi kweminyaka eli-13.',
              'Ukuba sifumanisa ukuqokelelwa okunjalo, siya kulucima ulwazi ngokukhawuleza.',
              'Abazali banokuqhagamshelana nathi ukuhlola, ukucima, okanye ukumisa ukuqokelelwa kolwazi lomntwana wabo.'
            ]
          },
          {
            title: '8. Ukugcinwa Kwedatha',
            icon: <Update />,
            content: [
              'Sigcina ulwazi lwakho ixesha elide njengoko i-akhawunti yakho isebenza.',
              'Emva kokucinywa kwe-akhawunti, olunye ulwazi lunokugcinwa ngeenjongo zomthetho okanye zeshishini elizinzileyo.',
              'Idatha yesicelo inokugcinwa ngeenjongo zokugcina iirekhodi.',
              'Unokucela ukucinywa kwedatha yakho nangaliphi na ixesha.',
              'Idatha engaziwa inokugcinwa ngeenjongo zokuhlalutya.'
            ]
          },
          {
            title: '9. Ukudluliselwa Kwamazwe Ngamazwe',
            icon: <Share />,
            content: [
              'Ulwazi lwakho lunokudluliselwa kwiiseva ezikumazwe angaphandle koMzantsi Afrika.',
              'Siqinisekisa ukuba kukho ukhuseleko olufanelekileyo olukhoyo lokudluliselwa okunjalo.',
              'Sithobela imithetho yokhuselo lwedatha esebenzayo malunga nokudluliselwa kwamazwe ngamazwe.'
            ]
          },
          {
            title: '10. Utshintsho Kumgaqo-nkqubo Wabucala',
            icon: <Update />,
            content: [
              'Singahlaziya lo Mgaqo-nkqubo Wabucala ngamaxesha athile.',
              'Utshintsho luya kufakwa kule phepha kunye nomhla omtsha "Ohlaziywe Okugqibela".',
              'Utshintsho olubalulekileyo luya kunxityelelwa nge-imeyili okanye isaziso.',
              'Siyakukhuthaza ukuba uhlole lo mgaqo-nkqubo ngamaxesha athile.'
            ]
          },
          {
            title: '11. Qhagamshelana Nathi',
            icon: <Email />,
            content: [
              'Ngeemibuzo malunga nalo Mgaqo-nkqubo Wabucala okanye iindlela zethu zedatha:',
              'I-imeyili: privacy@youthportal.co.za',
              'Umnxeba: 041 123 4567',
              'Idilesi: Empuma Koloni, Mzantsi Afrika',
              'Igosa Lokukhusela Idatha: dpo@youthportal.co.za'
            ]
          }
        ]
      }
    }
  }

  const currentContent = content[language]
  const activeContent = activeTab === 0 ? currentContent.terms : currentContent.privacy

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 6 }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ fontSize: 48, mr: 2 }} />
            <Box>
              <Typography variant="h3" fontWeight={700}>
                {currentContent.pageTitle}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                {currentContent.pageSubtitle}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Last Updated Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            icon={<Update />}
            label={`${currentContent.lastUpdated}: ${currentContent.date}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Tabs */}
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                py: 2,
                fontSize: '1rem',
                fontWeight: 600
              }
            }}
          >
            <Tab
              icon={<Gavel />}
              iconPosition="start"
              label={currentContent.termsTab}
            />
            <Tab
              icon={<Lock />}
              iconPosition="start"
              label={currentContent.privacyTab}
            />
          </Tabs>
        </Paper>

        {/* Content */}
        <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {activeContent.title}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
            {activeContent.intro}
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sections */}
          {activeContent.sections.map((section, index) => (
            <Accordion
              key={index}
              elevation={0}
              sx={{
                mb: 2,
                '&:before': { display: 'none' },
                border: '1px solid #e0e0e0',
                borderRadius: '12px !important',
                overflow: 'hidden'
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#eeeeee' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: 'primary.main' }}>
                    {section.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {section.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <List>
                  {section.content.map((item, idx) => (
                    <ListItem key={idx} sx={{ alignItems: 'flex-start', py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                        <Check color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: 'body1',
                          sx: { fontSize: '1rem', lineHeight: 1.7 }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>

        {/* Contact Card */}
        <Card
          sx={{
            mt: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Email sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {language === 'en' ? 'Questions or Concerns?' : 'Imibuzo Okanye Inkxalabo?'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              {language === 'en' 
                ? 'Our team is here to help. Contact us anytime.'
                : 'Iqela lethu lilapha ukunceda. Qhagamshelana nathi nangaliphi na ixesha.'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: '#f5f5f5' } }}
                startIcon={<Email />}
              >
                support@youthportal.co.za
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                041 123 4567
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default TermsAndPrivacy

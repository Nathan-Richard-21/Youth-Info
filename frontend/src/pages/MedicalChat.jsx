import React, { useState, useRef, useEffect } from 'react'
import { Box, Container, TextField, Button, Paper, Typography, Chip, Avatar, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ClearIcon from '@mui/icons-material/Clear'

const knowledgeBase = [
  {
    keywords: ['emergency', 'ambulance', 'call', 'help now', 'urgent', '112', '10177'],
    answer: `🚨 EMERGENCY CONTACTS – SOUTH AFRICA

IMMEDIATE LIFE THREAT (Struggling to breathe, Unconscious, Severe bleeding, Overdose, Seizure):
• Emergency (Cell): 112
• Ambulance: 10177
• Police: 10111

🧠 MENTAL HEALTH CRISIS (24/7):
• Suicide Crisis Line: 0800 567 567
• Childline (under 18): 0800 055 555

🦠 HEALTH INFO LINES:
• AIDS Helpline: 0800 012 322

🟣 ABUSE OR VIOLENCE:
• GBV Command Centre: 0800 428 428

All lines are FREE, confidential and available 24/7.`
  },

  {
    keywords: ['hiv', 'aids', 'what is hiv', 'hiv info'],
    answer: `🦠 WHAT IS HIV/AIDS?

HIV = Human Immunodeficiency Virus. With treatment (ARVs), you can live a normal life.

📋 KEY FACTS:
• HIV is manageable with daily pills
• You can study, work, have relationships, have children
• Undetectable = Cannot transmit HIV (U=U)

🔄 HOW HIV SPREADS:
• Unprotected sex (vaginal, anal, oral)
• Sharing injection needles
• Mother-to-baby (birth, breastfeeding)

❌ HOW HIV DOES NOT SPREAD:
• Kissing, hugging, handshakes
• Sharing food, drinks, toilets
• Mosquitoes
• Coughing, sneezing

💡 With treatment, people with HIV live as long as HIV-negative people.`
  },

  {
    keywords: ['can i get hiv from kissing', 'kissing hiv', 'hugging', 'casual contact'],
    answer: `❓ CAN I GET HIV FROM KISSING OR HUGGING?

NO—100% SAFE.

HIV is NOT in saliva, sweat, tears, or spit. You CANNOT get HIV from:
• Kissing (even deep kissing)
• Hugging
• Handshakes
• Sharing cups, food
• Sharing beds
• Toilet seats
• Mosquitoes
• Coughing/sneezing

✅ Show support: Hug a friend with HIV. Stigma hurts more than the virus.`
  },

  {
    keywords: ['hiv test', 'hiv testing', 'where to test', 'get tested'],
    answer: `🧪 HIV TESTING – WHAT YOU NEED TO KNOW

WHERE:
• All government clinics (FREE)
• Public hospitals (FREE)
• No appointment needed

HOW:
• Quick finger-prick blood test OR saliva test
• Results in 15–20 minutes
• Brief counseling before and after

YOUR RIGHTS:
• Completely FREE
• You do NOT need parents' permission
• Everything is CONFIDENTIAL
• Staff are trained & non-judgmental

⏰ WINDOW PERIOD:
HIV takes 2–6 weeks to show on a test. If recently exposed, ask about PEP or test again after 3 months.

🆘 GET TESTED:
• After unprotected sex
• After condom breaks
• If partner is HIV+
• If unsure status`
  },

  {
    keywords: ['hiv symptoms', 'hiv signs', 'flu like', 'sick'],
    answer: `📋 HIV SYMPTOMS – WHAT TO KNOW

Most people have NO symptoms for years. That's why testing matters.

🤒 ACUTE HIV (2-4 weeks after exposure):
• Fever
• Headache, body aches
• Sore throat
• Rash
• Swollen glands
• Nausea, diarrhea
• Fatigue

⚠️ These go away even without treatment, BUT virus is still active.

😐 ASYMPTOMATIC PHASE (5-10 years):
You feel healthy, but HIV multiplies inside. You can pass it to others.

🧪 ONLY TESTING CONFIRMS HIV STATUS.`
  },

  {
    keywords: ['pep', 'post-exposure', 'emergency', 'after sex'],
    answer: `💊 PEP (POST-EXPOSURE PROPHYLAXIS) – EMERGENCY HIV PREVENTION

PEP is emergency medication to prevent HIV AFTER possible exposure.

⏰ TIMING IS CRITICAL:
• Must start within 72 hours (3 days)
• Earlier is better (within 2 hours ideal)
• After 72 hours, won't work

📋 WHEN TO GET PEP:
• Unprotected sex
• Condom broke/slipped
• Sexual assault
• Needle injury

📍 WHERE:
Any government clinic or hospital emergency—COMPLETELY FREE

PROCESS:
• Blood test (confirm HIV-negative)
• 28 days of ARV pills
• Follow-up testing at 6 weeks and 3 months

Don't wait. Go immediately!`
  },

  {
    keywords: ['hiv treatment', 'arv', 'antiretroviral', 'medication'],
    answer: `💊 HIV TREATMENT (ARVs) – FREE AT ALL CLINICS

ARV = Medicine that stops HIV from multiplying.

✅ KEY FACTS:
• Start IMMEDIATELY after diagnosis
• 1-3 pills per day
• Lifelong treatment
• ALL FREE at clinics
• No cost whatsoever

🎯 GOALS:
• Reduce viral load to UNDETECTABLE
• Undetectable = Cannot transmit HIV (U=U)
• Restore immune system
• Live a normal, long life

⚠️ SIDE EFFECTS (usually mild):
• Nausea, diarrhea (first 2 weeks, usually pass)
• Headache, dizziness
• Fatigue
• Tell clinic if severe—they can adjust

✅ WITH TREATMENT:
• Normal lifespan
• Can work, study, date, marry
• Can have HIV-negative children (transmission <1%)

Adherence (taking pills every day) is KEY!`
  },

  {
    keywords: ['tb', 'tuberculosis', 'cough', 'night sweats'],
    answer: `😷 TUBERCULOSIS (TB) – WHAT YOU NEED TO KNOW

TB is a bacterial infection affecting lungs. HIGHLY CURABLE with medicine.

📋 SYMPTOMS:
• Persistent cough (2+ weeks)
• Fever (afternoon/evening)
• Night sweats (soaking bedsheets)
• Chest pain
• Weight loss
• Loss of appetite
• Tiredness

🔄 HOW TB SPREADS:
Airborne via coughing, sneezing (close contact in crowded rooms)
NOT spread through food, water, handshakes

⚠️ HIGHER RISK IF:
• HIV positive (25x higher risk)
• Crowded living
• Poor nutrition
• Close contact with TB patient

🧪 TESTING:
• Sputum test (cough up mucus)
• Chest X-ray
• All FREE at clinics

💊 TREATMENT:
• 6 months of tablets (FREE)
• TB IS CURABLE with complete treatment

🆘 GET TESTED IF:
Cough 2+ weeks, fever, night sweats, weight loss`
  },

  {
    keywords: ['contraception', 'birth control', 'prevent pregnancy'],
    answer: `🤰 CONTRACEPTION OPTIONS – ALL FREE AT CLINICS

You have many safe options. ALL FREE. NO PARENTAL PERMISSION NEEDED.

💊 IMPLANT (3 years):
• Rod under arm skin
• 99.95% effective
• Remove anytime
• Best if: Forgetful, want longest protection

🔷 IUD (3-5 years):
• Device in womb
• 99.2% effective
• Remove anytime
• Best if: Want 3+ years

💉 INJECTION (3 months):
• Shot every 12 weeks
• 99.7% effective
• Best if: Don't remember daily

💊 PILLS (91% effective):
• Take daily at same time
• Stop anytime
• Best if: Want flexibility

🛡️ CONDOMS (82-98%):
• Only prevents STIs + HIV + pregnancy
• FREE at ALL clinics
• Use EVERY time

📍 GET CONTRACEPTION:
Walk into ANY clinic. Ask nurse. No judgment, no cost. Your body, your choice!`
  },

  {
    keywords: ['pregnant', 'pregnancy', 'i think im pregnant', 'test'],
    answer: `🤰 I THINK I'M PREGNANT – WHAT TO DO

First: Get a FREE pregnancy test at ANY clinic or hospital.

📋 TESTING:
• Results in 10 minutes
• You do NOT need parents' permission
• Confidential
• Completely free

🔍 YOUR OPTIONS (All explained without judgment):

**OPTION 1: CONTINUE PREGNANCY**
• Free antenatal care (check-ups)
• Birth preparation
• Delivery support
• Parenting support

**OPTION 2: SAFE LEGAL ABORTION**
• Legal in South Africa up to 20 weeks
• 100% FREE
• Medical or surgical options
• You don't need anyone's permission
• No judgment from staff

**OPTION 3: ADOPTION**
• Give birth, agency places baby
• Full counseling support

📍 GET COUNSELING:
All clinics have pregnancy counselors to help YOU decide.

You have choices. Your body, your decision.`
  },

  {
    keywords: ['abortion', 'safe abortion', 'termination', 'top'],
    answer: `🔷 SAFE LEGAL ABORTION IN SOUTH AFRICA

Abortion is LEGAL and FREE.

✅ FACTS:
• Legal up to 12 weeks (some facilities up to 20)
• Your decision alone
• 100% FREE at public facilities
• Confidential
• Safe medical procedure
• NO judgment from staff

📋 OPTIONS:
• Medical abortion (pills) – taken at home
• Surgical abortion (procedure) – at clinic/hospital

📍 WHERE:
• Government clinic
• Public hospital
• Specialized abortion clinic

🧪 PROCESS:
1. Pregnancy test
2. Counseling
3. Medical check-up
4. Procedure or pills
5. Follow-up care

⚠️ SIDE EFFECTS:
• Cramping, bleeding (normal)
• Nausea (for pills)
• Mild fever (sometimes)
• If heavy bleeding/fever, go to hospital

This is your choice, your right, your healthcare.`
  },

  {
    keywords: ['depression', 'depressed', 'sad', 'not happy'],
    answer: `💭 DEPRESSION – YOU'RE NOT ALONE

Depression is more than feeling sad. It's a medical condition that's treatable.

📋 SIGNS:
• Persistent sadness (2+ weeks)
• Loss of interest in things you enjoyed
• Sleep changes (too much/little)
• Eating changes (too much/little)
• Extreme fatigue
• Difficulty concentrating
• Feeling worthless
• Thoughts of death

⚠️ CAUSES:
• Loss or grief
• Stress (school, relationships, money)
• Trauma
• Hormonal changes
• Often no clear cause

✅ HELP IS AVAILABLE:
• Clinic counselors (FREE)
• Hospital mental health services (FREE)
• Therapists (some free via clinics)
• Medication if needed

📍 WHERE:
• Any clinic – ask for counselor
• School counselor
• Crisis line: 0800 567 567

You can get better. Reach out today.`
  },

  {
    keywords: ['anxiety', 'panic', 'panic attack', 'worried', 'nervous'],
    answer: `😰 ANXIETY & PANIC ATTACKS

Anxiety = worry affecting daily life. Panic attack = sudden intense fear.

📋 ANXIETY SIGNS:
• Constant worry
• Restlessness
• Sleep problems
• Muscle tension
• Can't concentrate
• Avoiding situations

🔺 PANIC ATTACK SIGNS:
• Sudden intense fear
• Rapid heartbeat
• Shortness of breath
• Chest pain/tightness
• Dizziness
• Shaking, sweating
• Fear of losing control

⏰ PANIC ATTACKS:
• Peak within 10 minutes
• Last 20-30 minutes
• NOT dangerous (just feels like it)

🧘 WHAT TO DO:
1. Find safe space
2. Slow breathing: In (4 sec) → Hold (4) → Out (6)
3. Ground yourself: Name 5 see, 4 hear, 3 feel, 2 smell, 1 taste
4. Remind yourself: "This will pass. I'm safe."

✅ HELP:
• Therapy
• Breathing exercises
• Meditation
• Medication if needed
• All FREE at clinics`
  },

  {
    keywords: ['suicide', 'suicidal', 'kill myself', 'hurt myself', 'end it'],
    answer: `🚨 SUICIDAL THOUGHTS – GET HELP NOW

If thinking about harming yourself, your life is valuable. Help is available RIGHT NOW.

☎️ CALL IMMEDIATELY:
• Suicide Crisis Line: 0800 567 567 (24/7)
• Childline: 0800 055 555
• Emergency: 10177

✅ WHAT TO DO:
1. Call crisis line NOW
2. Tell a trusted adult (parent, teacher, friend)
3. Go to hospital if in danger
4. Remove objects that could harm you
5. Stay with someone

💬 WHAT TO SAY:
"I'm having thoughts of hurting myself. I need help."

💛 WHY TO STAY:
• Pain is temporary; suicide is permanent
• Feelings WILL change with help
• People love you
• Future possibilities you can't see yet
• Mental health IS treatable
• Your story isn't over

📋 AFTER CRISIS:
• Ongoing therapy
• Medication if needed
• Support groups
• Safety planning

You matter. Your life matters.`
  },

  {
    keywords: ['stress', 'exam anxiety', 'exam stress', 'overwhelmed'],
    answer: `📚 MANAGING STRESS & EXAM ANXIETY

Stress is normal, but intense stress needs management.

📋 STRESS SIGNS:
• Sleep problems
• Can't concentrate
• Irritability
• Headaches, stomach pain
• Worry that won't stop
• Loss of appetite

✅ HEALTHY MANAGEMENT:
• Study in 25-45 min blocks with breaks
• Exercise 30 min daily (walk, run, sports)
• Sleep 7-9 hours nightly
• Eat regular, healthy meals
• Drink water
• Limit caffeine (especially after 2 PM)
• Talk to someone
• Deep breathing: 4 in, hold 4, out 6

🧘 GROUNDING:
• Box breathing: 4-4-4-4
• Progressive muscle relaxation
• 5-4-3-2-1 senses (name 5 see, 4 hear, 3 feel, 2 smell, 1 taste)
• Free meditation apps

🔺 GET HELP IF:
Stress prevents functioning for weeks:
• School counselor
• Clinic mental health
• Crisis line: 0800 567 567

You can manage this.`
  },

  {
    keywords: ['drugs', 'drug', 'substance abuse', 'addiction', 'high'],
    answer: `🚫 SUBSTANCE ABUSE – GET HELP

Using drugs/alcohol can quickly become a problem for young people.

📋 SUBSTANCES:
• Alcohol
• Marijuana/dagga
• Mandrax
• Heroin
• Cocaine
• Meth
• Pills (misused)
• Inhalants (glue, petrol)

⚠️ SIGNS OF PROBLEM USE:
• Using more than planned
• Can't stop
• Spending lots of money
• Missing school/work
• Using alone
• Hiding use
• Mood changes
• Physical health declining
• Risky behavior

🧠 DANGER FOR YOUTH:
Brain develops until age 25. Drugs disrupt development. Can cause:
• Brain damage (permanent)
• Memory, learning problems
• Mental illness
• Addiction
• School dropout
• Legal problems

✅ GET HELP:
• Tell trusted adult
• Clinic (ask for substance abuse)
• Helpline: 0800 12 13 14
• Rehab if available
• Support group

Recovery is possible.`
  },

  {
    keywords: ['alcohol', 'drinking', 'binge', 'drunk'],
    answer: `🍺 ALCOHOL & YOUTH

Alcohol affects developing brain significantly.

📋 SHORT-TERM EFFECTS:
• Bad judgment
• Poor decisions
• Risky sex
• Risky driving
• Injuries, accidents
• Blackouts (memory loss)
• Alcohol poisoning

⚠️ LONG-TERM EFFECTS:
• Brain damage
• Liver damage
• Sleep problems
• Depression, anxiety
• Addiction
• School/work problems

💪 YOUTH AT HIGHER RISK:
Brains still developing (until age 25)
Addiction develops faster

⚠️ ALCOHOL POISONING SIGNS:
• Confusion
• Unconsciousness
• Slow breathing
• Low temperature
→ CALL 10177 IMMEDIATELY

✅ SAFER CHOICES:
• Don't drink
• If you do: Eat first, drink water between, stay with friends, don't drive

Get support if concerned.`
  },

  {
    keywords: ['marijuana', 'dagga', 'cannabis', 'weed', 'pot'],
    answer: `🚬 MARIJUANA/DAGGA – FACTS FOR YOUTH

Legal for adults in private, but youth use carries risks.

⚠️ EFFECTS ON DEVELOPING BRAIN:
• Impaired memory, learning
• Reduced concentration
• Motivation loss
• Mental health issues (depression, anxiety, psychosis)
• Addiction possible
• Brain changes can be permanent

📊 RISKS FOR YOUTH:
Before age 25 (when brain develops):
• IQ reduction (up to 8 points if young)
• Loss of motivation
• School dropout
• Job loss

🔄 CAN YOU GET ADDICTED?
Yes. About 1 in 11 users dependent. Higher in youth (1 in 6).

Signs:
• Use more than intended
• Can't cut down
• Neglect other activities
• Continue despite problems

✅ GET HELP:
• Talk to counselor
• Visit clinic
• Call: 0800 12 13 14

Your health matters.`
  },

  {
    keywords: ['consent', 'sexual consent', 'pressure', 'say no', 'no to sex'],
    answer: `🛑 CONSENT – YOUR RIGHT TO SAY NO

You have the ABSOLUTE right to say NO to sex, anytime, anywhere.

📋 WHAT IS CONSENT:
• Clear YES (not silence)
• Enthusiastic (you WANT to)
• Informed (you understand)
• Voluntary (no pressure)
• Can be withdrawn anytime
• Specific to each act

❌ NOT CONSENT:
• Silence/not saying no
• You're drunk/high
• Pressure, guilt, threats
• Someone in authority
• Past yes ≠ today's yes
• Yes to kissing ≠ yes to sex

🛡️ YOUR RIGHT:
Say NO without explanation.
Don't owe anyone sex.
Your body is yours alone.

⚠️ IF PRESSURED:
• Leave
• Tell trusted adult
• Call Childline: 0800 055 555
• Go to clinic if anything happened

Respect is non-negotiable.`
  },

  {
    keywords: ['sexual assault', 'rape', 'sexual abuse', 'assault'],
    answer: `🚨 SEXUAL ASSAULT – GET HELP IMMEDIATELY

If raped/assaulted, it is NOT your fault.

📞 CALL NOW:
• Police: 10111
• GBV Command Centre: 0800 428 428
• Ambulance: 10177
• Crisis Line: 0800 567 567

📍 GO TO HOSPITAL:
Get to nearest emergency NOW for:
• Medical care
• PEP (HIV prevention, within 72 hours)
• Emergency contraception (within 72 hours)
• Evidence collection (within 48 hours)
• Counseling
• All FREE

✅ YOUR RIGHTS:
• To be believed
• Support person present
• Report or not (your choice)
• Confidentiality
• Counseling
• Legal aid

💪 AFTER:
• Therapy (trauma support)
• Medical follow-up
• Legal support
• Safety planning

You did nothing wrong. You deserve support.`
  },

  {
    keywords: ['sti', 'sexually transmitted', 'std', 'infection', 'discharge'],
    answer: `🦠 STI (SEXUALLY TRANSMITTED INFECTIONS)

STIs are infections passed during sex. Many have NO symptoms.

📋 COMMON STIs:
• Chlamydia, gonorrhea (curable with antibiotics)
• Herpes (manageable, not curable)
• HPV (preventable with vaccine, can cause cancer)
• Syphilis (curable with antibiotics)
• Trichomoniasis (curable)

😐 OFTEN NO SYMPTOMS:
Many don't know they have STI. Testing matters.

🤒 POSSIBLE SYMPTOMS:
• Unusual discharge
• Burning/pain urinating
• Sores, blisters, warts
• Itching
• Lower abdominal pain
• Pain during sex

🧪 TESTING:
• FREE at all clinics
• Confidential
• No parents' permission
• Simple urine or swab

✅ TREATMENT:
• Most curable with antibiotics
• Some manageable (herpes, HPV)
• PARTNER must also get treated
• Don't have sex until both treated

🛡️ PREVENTION:
• Condoms every time
• Limit partners
• Regular testing
• Talk with partners

Don't ignore symptoms. Get tested!`
  },

  {
    keywords: ['sleep', 'insomnia', 'sleep problems', 'cant sleep'],
    answer: `😴 SLEEP & YOUTH HEALTH

Sleep is critical for physical and mental health.

📊 HOW MUCH:
• Teens need 8–10 hours per night
• Many get 6–7 (not enough!)
• Poor sleep affects school, mood, health

💪 WHY SLEEP MATTERS:
• Brain development (until age 25)
• Memory, learning
• Immune system
• Mood regulation
• Metabolism, weight
• Skin health
• School performance

⚠️ SIGNS OF SLEEP DEPRIVATION:
• Can't wake up
• Falling asleep in class
• Poor grades
• Mood problems (irritable, depressed)
• Frequent sickness
• Can't concentrate

✅ SLEEP TIPS:
• Set regular bedtime/wake (even weekends)
• NO phones 30 min before bed
• Keep room cool, dark, quiet
• Exercise during day (not before bed)
• Limit caffeine (after 2 PM)
• Avoid heavy meals before bed
• Relax (read, breathe, meditation)

If problems persist, talk to health worker.`
  },

  {
    keywords: ['exercise', 'physical activity', 'fitness', 'sports', 'workout'],
    answer: `🏃 EXERCISE & YOUTH HEALTH

Physical activity is crucial for body and mind.

📊 RECOMMENDED:
• 60 minutes moderate-intensity daily
• Mix cardio (running, dancing) & strength (weights, sports)
• Flexibility (stretching, yoga)

✅ BENEFITS:
• Strong bones, muscles
• Healthy weight
• Better mood (less depression/anxiety)
• Better sleep
• Better school grades
• Confidence
• Social connections
• Prevent chronic diseases

📋 IDEAS:
• Team sports (soccer, netball, basketball)
• Individual (running, swimming, tennis)
• Dancing
• Walking
• Gym, home workouts
• Cycling
• Martial arts

💡 START SMALL:
Don't need to be fit to start. Any movement is better.

Find something you ENJOY!`
  },

  {
    keywords: ['nutrition', 'eating', 'diet', 'food', 'healthy eating'],
    answer: `🥗 NUTRITION & HEALTHY EATING

Food is fuel for body and brain.

📊 BALANCED DIET:
• Fruits & vegetables (½ plate)
• Whole grains (brown rice, whole wheat)
• Protein (meat, beans, eggs, nuts)
• Healthy fats (oil, avocado, nuts)
• Dairy (milk, yogurt, cheese)
• Water (main drink)

⚠️ LIMIT:
• Sugary drinks (soda, energy drinks)
• Fast food (high salt, sugar, fat)
• Fried foods
• Alcohol
• Too much salt

✅ EATING TIPS:
• Eat breakfast (even small snack)
• Pack lunch/snacks for school
• Home-cooked meals when possible
• Drink water throughout day
• Don't skip meals

💡 REMEMBER:
Food = medicine. Healthy eating = better mood, energy, skin, grades, health.

If struggling with eating/body image, talk to someone.`
  },

  {
    keywords: ['puberty', 'period', 'periods', 'menstruation', 'development'],
    answer: `👧➡️👩 PUBERTY & DEVELOPMENT CHANGES

Puberty is NORMAL. Your body is changing—all OK.

📋 FEMALE PUBERTY (ages 8-14):
• Breast development
• Pubic & underarm hair
• Growth spurt
• Wider hips
• Periods start
• Mood swings
• Oily skin, acne possible

📋 MALE PUBERTY (ages 9-15):
• Testicle & penis growth
• Pubic, underarm, chest, facial hair
• Voice deepens (cracks first)
• Growth spurt
• Muscle development
• Acne possible
• Mood swings
• Wet dreams

⏰ TIMELINE:
Each person different. Some early, some late—all NORMAL.

📋 PERIODS:
• First period: Age 10-15
• Usually every 21-35 days
• Lasts 3-7 days
• Can be heavy, light, regular, irregular at first
• Normal to have cramps

✅ PERIOD PRODUCTS:
• Pads (FREE at clinics)
• Tampons
• Menstrual cup

💡 QUESTIONS?
Ask parent, nurse, doctor, trusted adult. No question too embarrassing.

You're NORMAL. Your body is NORMAL.`
  },

  {
    keywords: ['relationships', 'dating', 'boyfriend', 'girlfriend', 'love', 'breaking up'],
    answer: `💞 RELATIONSHIPS & DATING

Relationships are part of growing up.

📋 HEALTHY SIGNS:
• Respect each other
• Trust
• Honesty
• Support goals
• Talk about feelings
• Space for friends/family
• No pressure
• Equal decisions

❌ RED FLAGS:
• Controlling
• Checks phone/social media
• Isolates you
• Pressure for sex
• Anger problems
• Criticism, put-downs
• Jealousy
• Hitting, pushing, threats

✅ HEALTHY BOUNDARIES:
• Can say no to sex
• Can have friends (opposite sex)
• Time alone/family
• Deserve respect
• Can break up

💔 BREAKING UP:
• OK to end relationship
• Do in person if safe
• Honest but kind
• Don't ghost
• Sadness is normal
• Talk to friends/family
• Time heals

If in unhealthy relationship:
• Tell someone trusted
• Call GBV: 0800 428 428
• Plan safety
• Get support

Healthy love = patient, kind, respectful.`
  },

  {
    keywords: ['rights', 'privacy', 'confidential', 'parental permission'],
    answer: `📜 YOUR HEALTH RIGHTS

You have strong legal rights to confidential healthcare.

✅ YOUR RIGHTS:
• Confidentiality (staff can't tell parents/partners without permission)
• Free services (HIV/TB, contraception, pregnancy, mental health, STI, vaccines)
• Privacy (see counselor alone)
• Respect (treated with dignity, no discrimination)
• Information (clear explanations)
• Choice (decisions about your body)
• Safety (protected from abuse)

🔒 CONFIDENTIALITY MEANS:
Staff cannot tell:
• Your parents
• Your partner
• Friends
• School
• Anyone without permission

EXCEPTIONS:
• Immediate danger
• Child abuse
• Court order

✅ NO PARENTAL PERMISSION NEEDED:
• HIV testing
• Contraception
• STI testing
• Pregnancy testing
• Abortion
• Mental health counseling
• Substance abuse help

🛡️ IF RIGHTS VIOLATED:
• Ask for clinic manager
• Call Childline: 0800 055 555
• Call GBV: 0800 428 428

Your healthcare = YOUR RIGHT.`
  },

  {
    keywords: ['clinic', 'hospital', 'health center', 'where to go', 'nearest clinic'],
    answer: `📍 FINDING A CLINIC OR HOSPITAL

WHERE TO GET FREE HEALTHCARE:
• Government clinics (primary care)
• Public hospitals (all services)
• ALL FREE—no payment needed

🏥 EASTERN CAPE CLINICS:
• East London: Frere Hospital, Cecilia Makiwane
• Mdantsane: Local clinics, Youth Centers
• Mthatha: Mthatha General Hospital
• Gqeberha/PE: PE Provincial Hospital, Chatty Clinic
• Butterworth: Butterworth Hospital
• Lusikisiki: Emalangeni, Palmerton Clinics

📍 HOW TO FIND:
• Ask at taxi rank: "Where's nearest clinic?"
• Google Maps: Search "clinic" or "hospital"
• Ask neighbor

✅ AT CLINICS—ALL FREE:
• HIV/TB testing & treatment
• Contraception & pregnancy
• STI testing & treatment
• Mental health counseling
• General medical care
• Vaccinations
• Wound care

Walk in anytime. Ask for what you need. No judgment!`
  },

  {
    keywords: ['condom', 'how to use', 'use condom'],
    answer: `🛡️ HOW TO USE CONDOMS CORRECTLY

Condoms prevent pregnancy AND STIs/HIV. FREE at clinics.

📋 BEFORE:
• Check expiry date
• Make sure packet isn't torn
• Open carefully (don't use teeth)

1️⃣ PUTTING ON:
• Penis must be fully hard
• Pinch tip (leaves space for semen)
• Roll down to BASE
• Make sure on properly

2️⃣ DURING SEX:
• Use from START to FINISH
• Use water-based lubricant only (NOT oil-based)
• Check hasn't slipped

3️⃣ AFTER:
• Hold base while pulling out (before softening)
• Tie in knot, wrap in tissue, throw in bin (NOT toilet)
• Never reuse

⚠️ IF BREAKS/SLIPS:
• Go to clinic immediately
• Emergency contraception (within 72 hours)
• PEP for HIV risk (within 72 hours)

✅ PRACTICE MAKES PERFECT:
Try before you need it!

Condoms = PROTECTION. Get them FREE anytime.`
  }
]

const youthCommonQuestions = [
  'Can I get HIV from kissing my partner?',
  'Where can I get a free pregnancy test?',
  'What are the signs of depression?',
  'Where can I get free HIV testing in my area?',
  'Is abortion legal and free in South Africa?',
  'What are the side effects of contraception?',
  'How do I know if I have TB?',
  'My friend thinks they have been assaulted - what do I do?',
  'How do I tell my partner I have HIV?',
  'What is PEP and when do I need it?',
  'How do I use a condom correctly?',
  'What are my health rights as a young person?',
  'What are STI symptoms and how do I get tested?',
  'I am struggling with substance abuse - where can I get help?',
  'What do I do if I am having suicidal thoughts?'
]

const quickTopics = [
  'Emergency contacts',
  'HIV/TB info',
  'Contraception',
  'Mental health',
  'Find a clinic',
  'Health rights',
  'Substance abuse'
]

const findAnswer = (userMessage) => {
  const lower = userMessage.toLowerCase()
  for (let qa of knowledgeBase) {
    for (let keyword of qa.keywords) {
      if (lower.includes(keyword.toLowerCase())) return qa.answer
    }
  }
  return null
}

const MedicalChat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Welcome to Eastern Cape Youth Health Chatbot! 🏥\n\nI provide GENERAL HEALTH INFORMATION ONLY (not diagnosis/treatment).\n\nI can help with:\n• Emergency contacts\n• HIV/TB information\n• Sexual & reproductive health\n• Contraception & pregnancy\n• Mental health support\n• Substance abuse help\n• Finding clinics & hospitals\n• Your health rights\n• Wellness (sleep, exercise, nutrition, puberty, relationships)\n\nWhat health question can I help with?'
    }
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const pushBotMessage = (text) => {
    setMessages(prev => [...prev, { from: 'bot', text }])
  }

  const send = async (text = message) => {
    if (!text.trim()) return
    const trimmed = text.trim()
    const lower = trimmed.toLowerCase()

    setMessages(prev => [...prev, { from: 'me', text: trimmed }])
    setMessage('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 400))

    try {
      if (lower.includes('find clinic') || lower.includes('clinic near') || lower.includes('hospital')) {
        pushBotMessage('📍 Which area are you in?\n\nExamples: East London, Mdantsane, Mthatha, Gqeberha, Port Elizabeth')
      } else {
        const answer = findAnswer(trimmed)
        if (answer) {
          pushBotMessage(answer)
        } else {
          pushBotMessage('Sorry, I don\'t have information about that.\n\n✅ I can help with:\n• Emergency contacts\n• HIV/TB\n• Contraception\n• Mental health\n• Substance abuse\n• Sexual health\n• STIs\n• Health rights\n• Wellness\n\nPlease ask a health question from these topics.')
        }
      }
    } catch (err) {
      pushBotMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f9ff' }}>
      <Box sx={{ bgcolor: '#ec4899', color: 'white', py: 3, boxShadow: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalHospitalIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Youth Health Chatbot
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Eastern Cape Health Information for Young People
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Box sx={{ p: 3, minHeight: 500, maxHeight: 600, overflowY: 'auto', bgcolor: '#f8fafc' }}>
            {messages.map((m, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', mb: 2 }}>
                {m.from === 'bot' && <Avatar sx={{ bgcolor: '#ec4899', mr: 2 }}><LocalHospitalIcon /></Avatar>}
                <Paper sx={{ p: 2, maxWidth: '65%', bgcolor: m.from === 'me' ? '#6366f1' : 'white', color: m.from === 'me' ? 'white' : '#1f2937', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {m.text}
                  </Typography>
                </Paper>
                {m.from === 'me' && <Avatar sx={{ bgcolor: '#6366f1', ml: 2 }}>U</Avatar>}
              </Box>
            ))}
            {loading && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#ec4899' }}><LocalHospitalIcon /></Avatar>
                <CircularProgress size={24} sx={{ color: '#ec4899' }} />
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white', maxHeight: 250, overflowY: 'auto' }}>
            <Typography variant="body2" fontWeight={600} mb={1.5} sx={{ color: '#ec4899' }}>
              💡 Quick Topics:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {quickTopics.map((t, i) => (
                <Chip key={i} label={t} onClick={() => send(t)} variant="outlined" color="primary" size="small" />
              ))}
            </Box>

            <Typography variant="body2" fontWeight={600} mb={1.5} sx={{ color: '#ec4899' }}>
              👥 Youth Common Asked Questions:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {youthCommonQuestions.map((q, i) => (
                <Chip key={i} label={q} onClick={() => send(q)} variant="outlined" color="primary" size="small" />
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', display: 'flex', gap: 1 }}>
            <TextField fullWidth value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder="Type your question..." variant="outlined" disabled={loading} size="small" />
            <Button variant="contained" onClick={() => send()} disabled={!message.trim() || loading} endIcon={<SendIcon />} sx={{ bgcolor: '#ec4899' }}>
              Send
            </Button>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, mt: 3, bgcolor: '#fef3c7', borderLeft: '4px solid #f59e0b' }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#92400e' }}>
            ⚠️ Medical Disclaimer
          </Typography>
          <Typography variant="body2" sx={{ color: '#78350f' }}>
            This is GENERAL HEALTH INFO ONLY. NOT a substitute for professional medical advice. For emergencies: 112 or 10177. Always consult healthcare professionals.
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}

export default MedicalChat
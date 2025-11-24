const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Import models
const User = require('./models/User');
const Opportunity = require('./models/Opportunity');
const ForumPost = require('./models/ForumPost');
const ForumComment = require('./models/ForumComment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Nate:Nathan@2001@clusterinfo.orhwuyp.mongodb.net/youthportal';

// Demo opportunities data
const demoOpportunities = [
  {
    title: 'NSFAS Bursary 2026 Application',
    description: 'The National Student Financial Aid Scheme (NSFAS) is calling for applications from eligible students who need financial assistance to study at public universities and TVET colleges. NSFAS provides comprehensive funding covering tuition, accommodation, transport, and living allowances.',
    category: 'bursary',
    subcategory: 'Undergraduate',
    organization: 'NSFAS',
    contactEmail: 'info@nsfas.org.za',
    website: 'https://www.nsfas.org.za',
    location: 'National',
    eligibility: 'South African citizens with household income below R350,000 per year',
    requirements: ['South African ID', 'Matric certificate', 'Proof of household income', 'University acceptance letter'],
    deadline: '2026-01-31',
    amount: 'Full funding',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    tags: ['bursary', 'undergraduate', 'national', 'full-funding'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Software Developer - Permanent Position',
    description: 'Leading tech company in Port Elizabeth is seeking an experienced Software Developer to join our dynamic team. You will work on cutting-edge projects, developing web and mobile applications using modern technologies. Great opportunity for career growth and development.',
    category: 'career',
    subcategory: 'IT & Technology',
    organization: 'TechSolutions PE',
    contactEmail: 'careers@techsolutions.co.za',
    contactPhone: '041-123-4567',
    website: 'https://www.techsolutions.co.za',
    location: 'Port Elizabeth',
    eligibility: 'Degree/Diploma in Computer Science or related field',
    requirements: ['3+ years experience', 'JavaScript, React, Node.js', 'Git version control', 'Problem-solving skills'],
    employmentType: 'Full-time',
    salary: 'R25,000 - R40,000',
    experience: '3-5 years',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    tags: ['career', 'software', 'developer', 'it', 'port-elizabeth'],
    status: 'approved'
  },
  {
    title: 'Artisan Learnership Programme 2026',
    description: 'Join our comprehensive Artisan Learnership Programme where you will receive theoretical training combined with practical workplace experience. This 24-month programme covers various trades including electrical, plumbing, and fitting. Upon completion, you will receive a nationally recognized qualification.',
    category: 'learnership',
    subcategory: 'Technical',
    organization: 'Skills Development Authority',
    contactEmail: 'learnerships@sda.org.za',
    contactPhone: '043-987-6543',
    location: 'East London',
    eligibility: 'Grade 12 certificate, ages 18-35',
    requirements: ['Matric with Math and Science', 'South African ID', 'Clean criminal record'],
    startDate: '2026-02-01',
    deadline: '2026-01-15',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
    tags: ['learnership', 'artisan', 'technical', 'east-london'],
    status: 'approved',
    urgent: true
  },
  {
    title: 'NYDA Business Grant - Up to R100,000',
    description: 'The National Youth Development Agency offers grants to young entrepreneurs to start or expand their businesses. This is a non-refundable grant designed to support youth-owned businesses in various sectors. Successful applicants receive business mentorship and support services.',
    category: 'business',
    subcategory: 'Grant',
    organization: 'NYDA',
    contactEmail: 'grants@nyda.gov.za',
    website: 'https://www.nyda.gov.za',
    location: 'Eastern Cape',
    eligibility: 'South African youth aged 18-35 with a viable business idea',
    requirements: ['Business plan', 'SA ID', 'Proof of address', 'Bank statements'],
    deadline: '2026-03-31',
    amount: 'Up to R100,000',
    fundingType: 'Grant',
    imageUrl: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    tags: ['business', 'grant', 'nyda', 'entrepreneur', 'eastern-cape'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Nursing Assistant Position - Livingstone Hospital',
    description: 'Livingstone Hospital in Port Elizabeth is seeking compassionate and dedicated Nursing Assistants to join our healthcare team. This is an excellent opportunity to start your career in healthcare while making a difference in patients\' lives.',
    category: 'career',
    subcategory: 'Healthcare',
    organization: 'Livingstone Hospital',
    contactEmail: 'hr@livingstone.gov.za',
    contactPhone: '041-405-2911',
    location: 'Port Elizabeth',
    eligibility: 'Nursing Assistant Certificate',
    requirements: ['Registered with SANC', 'Basic computer literacy', 'Good communication skills'],
    employmentType: 'Full-time',
    salary: 'R12,000 - R18,000',
    experience: '0-2 years',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
    tags: ['career', 'nursing', 'healthcare', 'hospital', 'port-elizabeth'],
    status: 'approved'
  },
  {
    title: 'Digital Marketing Internship - 12 Months',
    description: 'Exciting 12-month internship opportunity in digital marketing. You will learn about social media marketing, content creation, SEO, and digital advertising while working on real campaigns for local businesses. Includes monthly stipend and potential for permanent placement.',
    category: 'career',
    subcategory: 'Internship',
    organization: 'Digital Edge Marketing',
    contactEmail: 'internships@digitaledge.co.za',
    location: 'Nelson Mandela Bay',
    eligibility: 'Marketing/Communications degree or diploma',
    requirements: ['Marketing qualification', 'Basic social media knowledge', 'Creative mindset'],
    employmentType: 'Internship',
    salary: 'R5,000 stipend',
    experience: '0-1 years',
    startDate: '2026-02-01',
    deadline: '2026-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['internship', 'marketing', 'digital', 'social-media'],
    status: 'approved'
  },
  {
    title: 'Rhodes University Postgraduate Bursaries',
    description: 'Rhodes University offers competitive bursaries for postgraduate students pursuing Masters and Doctoral degrees. These bursaries cover tuition fees and provide a monthly living allowance to enable full-time study. Priority given to research in fields aligned with national development priorities.',
    category: 'bursary',
    subcategory: 'Postgraduate',
    organization: 'Rhodes University',
    contactEmail: 'postgrad@ru.ac.za',
    website: 'https://www.ru.ac.za',
    location: 'Grahamstown',
    eligibility: 'Excellent academic record, admission to postgraduate programme',
    requirements: ['Honours degree', 'Research proposal', 'Academic transcripts', 'Reference letters'],
    deadline: '2026-02-28',
    amount: 'R80,000 - R150,000 per year',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    tags: ['bursary', 'postgraduate', 'masters', 'phd', 'research'],
    status: 'approved'
  },
  {
    title: 'Buffalo City Youth Employment Programme',
    description: 'Buffalo City Municipality launches its annual Youth Employment Programme offering temporary work opportunities across various municipal departments. Participants gain valuable work experience while earning an income. Programme duration is 12 months with comprehensive training.',
    category: 'career',
    subcategory: 'Government Programme',
    organization: 'Buffalo City Municipality',
    contactEmail: 'youth@buffalocity.gov.za',
    location: 'Buffalo City',
    eligibility: 'Unemployed youth aged 18-35 residing in Buffalo City',
    requirements: ['SA ID', 'Matric certificate', 'Proof of residence', 'No previous municipal employment'],
    startDate: '2026-04-01',
    deadline: '2026-02-15',
    salary: 'R3,500 monthly stipend',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
    tags: ['career', 'youth', 'government', 'buffalo-city', 'temporary'],
    status: 'approved'
  },
  // SUCCESS STORIES
  {
    title: 'From Unemployed to Tech Entrepreneur - Sipho\'s Journey',
    description: 'Sipho Mthembu, 28, from Mdantsane was unemployed for 3 years after completing his IT diploma. After joining our platform, he found a learnership at a local tech company. Two years later, he launched his own software development startup that now employs 5 young developers. "The platform connected me with opportunities I never knew existed. The forums helped me learn from others\' experiences, and the mentorship program was life-changing," says Sipho. His company now builds apps for local businesses in the Eastern Cape.',
    category: 'success-story',
    subcategory: 'Entrepreneurship',
    organization: 'Youth Portal Success',
    location: 'East London',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    tags: ['success', 'entrepreneur', 'tech', 'inspiration', 'east-london'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Nursing Dream Achieved: Nomvula\'s Story',
    description: 'Nomvula Dlomo from Port Elizabeth always dreamed of becoming a nurse but lacked funding. Through this platform, she discovered the Department of Health nursing bursary. Today, she\'s a qualified professional nurse at Livingstone Hospital. "I was about to give up on my dream until I found the bursary listing here. The application tips helped me write a strong motivation letter. Now I\'m living my dream and helping others in my community," she shares. Nomvula now mentors aspiring nurses through the platform.',
    category: 'success-story',
    subcategory: 'Healthcare',
    organization: 'Youth Portal Success',
    location: 'Port Elizabeth',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    tags: ['success', 'nursing', 'healthcare', 'bursary', 'inspiration'],
    status: 'approved'
  },
  {
    title: 'Trading Business Flourishes with NYDA Grant',
    description: 'Thando Ngubane, 24, used to sell vegetables door-to-door in Mthatha. After finding the NYDA grant on this platform and getting guidance from the business forums, she applied and received R75,000. She now runs a thriving fresh produce store employing 3 staff members. "The platform didn\'t just show me the grant - the community helped me write my business plan and prepare for the interview. I\'m now giving back by mentoring other young entrepreneurs," says Thando.',
    category: 'success-story',
    subcategory: 'Business',
    organization: 'Youth Portal Success',
    location: 'Mthatha',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    tags: ['success', 'business', 'nyda', 'entrepreneur', 'grant'],
    featured: true,
    status: 'approved'
  },
  // EVENTS
  {
    title: 'Youth Employment Expo 2026 - Port Elizabeth',
    description: 'Join us for the biggest youth employment event of the year! Meet 50+ employers actively hiring, attend CV writing workshops, participate in mock interviews, and network with industry professionals. Free entry for all youth aged 18-35. Bring multiple copies of your CV. Companies attending include Transnet, Standard Bank, Shoprite, MTN, and many more. Workshops run throughout the day on topics like interview skills, personal branding, and career planning.',
    category: 'event',
    subcategory: 'Career Fair',
    organization: 'EC Department of Labour',
    contactEmail: 'events@labour.gov.za',
    contactPhone: '041-506-5000',
    location: 'Boardwalk Convention Centre, Port Elizabeth',
    startDate: '2026-02-15',
    endDate: '2026-02-15',
    deadline: '2026-02-10',
    eligibility: 'Youth aged 18-35',
    requirements: ['ID document', 'CV copies', 'Professional attire recommended'],
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    tags: ['event', 'career', 'expo', 'networking', 'port-elizabeth'],
    featured: true,
    urgent: true,
    status: 'approved'
  },
  {
    title: 'Entrepreneurship Bootcamp - Buffalo City',
    description: '5-day intensive bootcamp for aspiring entrepreneurs. Learn business planning, financial management, marketing, and how to pitch to investors. Guest speakers include successful local entrepreneurs and business coaches. Limited to 30 participants. Includes meals and certificate of completion. Topics covered: business model canvas, market research, financial projections, digital marketing, funding sources, and legal requirements for business registration.',
    category: 'event',
    subcategory: 'Workshop',
    organization: 'Buffalo City Business Hub',
    contactEmail: 'bootcamp@bcbh.co.za',
    location: 'East London ICC',
    startDate: '2026-03-10',
    endDate: '2026-03-14',
    deadline: '2026-02-28',
    eligibility: 'Ages 18-35 with business idea',
    requirements: ['Business idea pitch', 'Commitment to attend all 5 days'],
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    tags: ['event', 'entrepreneurship', 'workshop', 'business', 'bootcamp'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'Skills Development Summit - Eastern Cape',
    description: 'Annual summit bringing together SETAs, training providers, employers, and youth. Discover learnership opportunities, meet training providers, learn about skills in demand, and attend career guidance sessions. Panel discussions on future of work, 4IR skills, and youth unemployment solutions. Exhibition area with 40+ exhibitors. Perfect for anyone looking to upskill or change careers.',
    category: 'event',
    subcategory: 'Conference',
    organization: 'Eastern Cape Skills Development Forum',
    contactEmail: 'summit@ecsdf.org.za',
    location: 'ICC East London',
    startDate: '2026-04-20',
    endDate: '2026-04-21',
    deadline: '2026-04-15',
    eligibility: 'Open to all',
    requirements: ['Online registration'],
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    tags: ['event', 'skills', 'development', 'learnerships', 'conference'],
    status: 'approved'
  },
  // MORE BURSARIES
  {
    title: 'Mandela Rhodes Scholarship 2026',
    description: 'Prestigious scholarship for African students demonstrating academic excellence and leadership potential. Covers full tuition, accommodation, and living expenses for postgraduate studies at participating universities. Recipients join a network of scholars and receive ongoing mentorship. The scholarship emphasizes reconciliation, entrepreneurial leadership, and building Africa\'s future.',
    category: 'bursary',
    subcategory: 'Postgraduate',
    organization: 'Mandela Rhodes Foundation',
    contactEmail: 'scholarships@mandelarhodes.org',
    website: 'https://www.mandelarhodes.org',
    location: 'South Africa',
    eligibility: 'African citizens, under 30 years, exceptional academic record',
    requirements: ['Honours degree or equivalent', 'Leadership track record', 'Academic transcripts', 'Reference letters', 'Motivation essay'],
    deadline: '2026-02-28',
    amount: 'Full scholarship + stipend',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    tags: ['bursary', 'postgraduate', 'prestigious', 'leadership', 'full-funding'],
    featured: true,
    status: 'approved'
  },
  {
    title: 'TVET College Bursary - NSFAS',
    description: 'NSFAS funding specifically for TVET college students pursuing National Certificates. Covers registration, tuition, accommodation, transport, and personal allowance. Available for all NC(V) and Report 191 programmes. Students must be from households with combined income below R350,000 per year.',
    category: 'bursary',
    subcategory: 'TVET',
    organization: 'NSFAS',
    contactEmail: 'info@nsfas.org.za',
    website: 'https://www.nsfas.org.za',
    location: 'National',
    eligibility: 'SA citizens, household income below R350k',
    requirements: ['SA ID', 'TVET acceptance letter', 'Proof of household income'],
    deadline: '2026-01-31',
    amount: 'Full funding package',
    fundingType: 'Full',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
    tags: ['bursary', 'tvet', 'nsfas', 'national', 'full-funding'],
    status: 'approved'
  },
  // MORE CAREERS
  {
    title: 'Customer Service Representatives - Multiple Positions',
    description: 'Fast-growing call center in East London hiring 20 customer service representatives. Full training provided. Great entry-level opportunity for matriculants with good communication skills. Shift work with attractive shift allowances. Performance bonuses available. Career progression to team leader roles.',
    category: 'career',
    subcategory: 'Customer Service',
    organization: 'ConnectEC Call Centre',
    contactEmail: 'recruitment@connectec.co.za',
    contactPhone: '043-743-5000',
    location: 'East London',
    eligibility: 'Matric certificate, good English',
    requirements: ['Matric', 'Computer literacy', 'Clear communication', 'Available for shifts'],
    employmentType: 'Full-time',
    salary: 'R7,500 - R9,500',
    experience: 'Entry level',
    imageUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800',
    tags: ['career', 'customer-service', 'call-centre', 'entry-level', 'east-london'],
    urgent: true,
    status: 'approved'
  },
  {
    title: 'Retail Management Graduate Programme',
    description: '12-month graduate development programme with leading retail chain. Rotate through store operations, inventory management, customer service, and team leadership. Guaranteed placement as Assistant Store Manager upon completion. Excellent opportunity to fast-track your retail career.',
    category: 'career',
    subcategory: 'Retail',
    organization: 'Shoprite Holdings',
    contactEmail: 'graduates@shoprite.co.za',
    location: 'Eastern Cape - Various Stores',
    eligibility: 'Degree/Diploma in Retail, Business, or related field',
    requirements: ['Relevant qualification', 'Driver\'s license', 'Willingness to relocate', 'Leadership potential'],
    employmentType: 'Full-time',
    salary: 'R12,000 + benefits',
    experience: 'Graduate',
    startDate: '2026-03-01',
    deadline: '2026-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    tags: ['career', 'graduate', 'retail', 'management', 'training'],
    status: 'approved'
  },
  // MORE LEARNERSHIPS
  {
    title: 'Automotive Mechanic Learnership',
    description: 'Learn automotive repair and maintenance while earning. Combination of theoretical training at FET College and practical experience at our workshops. Covers engine mechanics, electrical systems, diagnostics, and customer service. Trade test upon completion leading to qualified artisan status.',
    category: 'learnership',
    subcategory: 'Technical',
    organization: 'AutoSkills SA',
    contactEmail: 'learnerships@autoskills.co.za',
    location: 'Port Elizabeth',
    eligibility: 'Matric with Maths and Science',
    requirements: ['Grade 12', 'Maths & Science pass', 'Driver\'s license (learner acceptable)', 'Passion for vehicles'],
    startDate: '2026-02-01',
    deadline: '2026-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    tags: ['learnership', 'automotive', 'mechanic', 'technical', 'artisan'],
    status: 'approved'
  },
  // MORE BUSINESS FUNDING
  {
    title: 'Small Enterprise Development Agency (SEDA) Funding',
    description: 'SEDA provides non-financial and financial support to small enterprises. Services include business development, mentorship, training, and access to markets. Co-funding available for qualifying businesses. Focus on manufacturing, agro-processing, and technology sectors.',
    category: 'business',
    subcategory: 'Grant',
    organization: 'SEDA',
    contactEmail: 'funding@seda.org.za',
    website: 'https://www.seda.org.za',
    location: 'Eastern Cape',
    eligibility: 'Registered SMEs, black-owned businesses',
    requirements: ['Business registration', 'Business plan', 'Financial statements', 'Market analysis'],
    deadline: '2026-03-31',
    amount: 'Up to R200,000',
    fundingType: 'Co-funding',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    tags: ['business', 'funding', 'seda', 'sme', 'grant'],
    status: 'approved'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
    console.log('\nChecking for admin user...');
    let adminUser = await User.findOne({ email: 'admin@youthportal.co.za' });
    
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@youthportal.co.za',
        password: hashedPassword,
        role: 'admin',
        isActive: true
      });
      console.log('✓ Admin user created (email: admin@youthportal.co.za, password: admin123)');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Check if opportunities already exist
    const existingOppsCount = await Opportunity.countDocuments();
    
    if (existingOppsCount > 0) {
      console.log(`\n${existingOppsCount} opportunities already exist in database.`);
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise(resolve => {
        readline.question('Do you want to clear and re-seed? (yes/no): ', resolve);
      });
      readline.close();
      
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        await Opportunity.deleteMany({});
        console.log('✓ Cleared existing opportunities');
      } else {
        console.log('Keeping existing opportunities');
        mongoose.connection.close();
        return;
      }
    }

    // Insert demo opportunities
    console.log('\nSeeding demo opportunities...');
    const opportunities = await Opportunity.insertMany(
      demoOpportunities.map(opp => ({
        ...opp,
        createdBy: adminUser._id,
        views: Math.floor(Math.random() * 500) + 50,
        applications: Math.floor(Math.random() * 50)
      }))
    );
    
    console.log(`✓ Successfully created ${opportunities.length} demo opportunities`);
    
    // Seed forum posts
    console.log('\nSeeding forum posts...');
    const forumPosts = await ForumPost.insertMany([
      {
        title: 'NSFAS Application Tips - What Worked for Me',
        content: 'Hi everyone! I successfully got my NSFAS funding approved and wanted to share some tips that helped me:\n\n1. Apply EARLY - don\'t wait until the deadline\n2. Make sure all your documents are certified copies\n3. Double-check your household income calculation\n4. Keep your application reference number safe\n5. Check your email regularly for updates\n\nHappy to answer any questions!',
        category: 'bursaries',
        author: adminUser._id,
        tags: ['nsfas', 'bursary', 'application', 'tips'],
        views: 245,
        likes: [adminUser._id],
        lastActivity: new Date()
      },
      {
        title: 'Anyone else struggling to find entry-level jobs?',
        content: 'I graduated 6 months ago with a Business Admin diploma and I\'ve applied to over 50 jobs with no luck. Most require "2-3 years experience" even for entry-level positions. How did you get your first job? Any advice would be appreciated.',
        category: 'careers',
        author: adminUser._id,
        tags: ['job-search', 'entry-level', 'advice'],
        views: 189,
        likes: [],
        lastActivity: new Date()
      },
      {
        title: 'Starting a Food Business - Need Advice',
        content: 'I want to start a small catering business from home. I have R10,000 saved up. Is this enough to start? What licenses do I need? Has anyone here started a food business? Would love to hear your experiences and advice!',
        category: 'business',
        author: adminUser._id,
        tags: ['entrepreneurship', 'food-business', 'startup', 'advice'],
        views: 156,
        likes: [adminUser._id],
        lastActivity: new Date()
      },
      {
        title: 'Best Way to Prepare for Interviews?',
        content: 'I have my first ever job interview next week for a retail position. I\'m so nervous! What should I wear? What questions should I prepare for? Any interview tips would be really helpful. Thanks in advance!',
        category: 'careers',
        author: adminUser._id,
        tags: ['interview', 'career-advice', 'retail'],
        views: 134,
        likes: [],
        lastActivity: new Date()
      },
      {
        title: 'Artisan Learnerships Worth It?',
        content: 'I\'m considering applying for an electrical learnership but I\'m not sure if it\'s worth the 2 years. Can anyone who\'s done an artisan learnership share their experience? Is it easy to find work afterwards? What are the salaries like?',
        category: 'learnerships',
        author: adminUser._id,
        tags: ['learnership', 'artisan', 'electrical', 'career-path'],
        views: 98,
        likes: [adminUser._id],
        lastActivity: new Date()
      },
      {
        title: 'Success Story: From Unemployed to Business Owner!',
        content: 'Just wanted to share my journey to inspire others. 2 years ago I was unemployed and depressed. I found a NYDA grant opportunity on this platform, applied, and got R50k to start a car wash. Today my business has 4 employees and we\'re profitable! Don\'t give up - opportunities are out there. Keep applying and believing in yourself! 💪',
        category: 'success-stories',
        author: adminUser._id,
        tags: ['success', 'inspiration', 'nyda', 'entrepreneur'],
        views: 312,
        likes: [adminUser._id],
        isPinned: true,
        lastActivity: new Date()
      },
      {
        title: 'How to Write a CV with No Experience?',
        content: 'I\'m fresh out of matric and have no work experience. How do I write a CV when I have nothing to put? Should I include my high school subjects? Volunteer work? Help please!',
        category: 'general',
        author: adminUser._id,
        tags: ['cv', 'resume', 'advice', 'entry-level'],
        views: 167,
        likes: [],
        lastActivity: new Date()
      },
      {
        title: 'Rhodes University vs NMMU for Computer Science?',
        content: 'I got accepted to both Rhodes and NMMU for Computer Science. Which one is better for job prospects in Eastern Cape? Also considering the bursary opportunities at each. Anyone studying CS at either university?',
        category: 'bursaries',
        author: adminUser._id,
        tags: ['university', 'computer-science', 'advice'],
        views: 92,
        likes: [],
        lastActivity: new Date()
      }
    ]);
    
    console.log(`✓ Successfully created ${forumPosts.length} forum posts`);
    
    // Add some comments to forum posts
    const comments = await ForumComment.insertMany([
      {
        post: forumPosts[0]._id,
        author: adminUser._id,
        content: 'Great tips! I would also add - make sure your cellphone number is correct on your application. NSFAS will call you!',
        likes: [adminUser._id]
      },
      {
        post: forumPosts[1]._id,
        author: adminUser._id,
        content: 'Same struggle here. I found volunteering helped me get some experience. Also try internships - they usually don\'t require experience.',
        likes: []
      },
      {
        post: forumPosts[2]._id,
        author: adminUser._id,
        content: 'You\'ll need a health certificate from your municipality and possibly a food handler\'s certificate. Budget around R2000 for licenses and permits.',
        likes: [adminUser._id]
      },
      {
        post: forumPosts[3]._id,
        author: adminUser._id,
        content: 'Be yourself and be honest. Research the company before the interview. Dress smart casual for retail. Prepare examples of when you showed good customer service (even from school or home). Good luck!',
        likes: []
      }
    ]);
    
    console.log(`✓ Successfully created ${comments.length} forum comments`);
    
    console.log('\n=== Seed Summary ===');
    console.log(`Total Opportunities: ${opportunities.length}`);
    console.log(`  - Bursaries: ${opportunities.filter(o => o.category === 'bursary').length}`);
    console.log(`  - Careers: ${opportunities.filter(o => o.category === 'career').length}`);
    console.log(`  - Learnerships: ${opportunities.filter(o => o.category === 'learnership').length}`);
    console.log(`  - Business Funding: ${opportunities.filter(o => o.category === 'business').length}`);
    console.log(`  - Success Stories: ${opportunities.filter(o => o.category === 'success-story').length}`);
    console.log(`  - Events: ${opportunities.filter(o => o.category === 'event').length}`);
    console.log(`  - Featured: ${opportunities.filter(o => o.featured).length}`);
    console.log(`  - Urgent: ${opportunities.filter(o => o.urgent).length}`);
    console.log(`Forum Posts: ${forumPosts.length}`);
    console.log(`Forum Comments: ${comments.length}`);
    
    console.log('\n✓ Database seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('  Email: admin@youthportal.co.za');
    console.log('  Password: admin123');
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed
seedDatabase();
